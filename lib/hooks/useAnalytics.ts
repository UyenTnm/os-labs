"use client";

import { useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface AnalyticsEvent {
  event_type: "view" | "click" | "scroll" | "conversion";
  section_name: string;
  duration_ms?: number;
  scroll_depth?: number;
  metadata?: Record<string, any>;
}

let sessionId: string | null = null;
let sessionStartTime: number = Date.now();

async function getOrCreateSessionId() {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);

    const supabase = createClient();

    try {
      const { error } = await supabase.from("sessions").insert({
        session_id: sessionId,
        user_id: "unknown",
        started_at: new Date().toISOString(),
      });

      if (error) {
        console.error("[Analytics] Failed to create session:", error);
      }
    } catch (err) {
      console.error("[Analytics] Unexpected error:", err);
    }
  }

  return sessionId;
}

export function useAnalytics() {
  const sectionName = useRef<string>("");
  const sectionStartTime = useRef<number>(0);
  const maxScrollDepth = useRef<number>(0);

  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const supabase = createClient();
      const sessionId = await getOrCreateSessionId();

      await supabase.from("analytics_events").insert({
        ...event,
        session_id: sessionId,
        timestamp: new Date(),
      });

      console.log("[Analytics] Tracked event:", event);
    } catch (error) {
      console.error("[Analytics] Failed to track event:", error);
    }
  }, []);

  const trackSectionView = useCallback(
    (section: string) => {
      sectionName.current = section;
      sectionStartTime.current = Date.now();
      maxScrollDepth.current = 0;

      trackEvent({
        event_type: "view",
        section_name: section,
      });
    },
    [trackEvent],
  );

  const trackSectionClick = useCallback(
    (section: string, target?: string) => {
      const duration = Date.now() - sectionStartTime.current;

      trackEvent({
        event_type: "click",
        section_name: section,
        duration_ms: duration,
        metadata: { target },
      });
    },
    [trackEvent],
  );

  const trackScroll = useCallback(
    (section: string, scrollDepth: number) => {
      if (scrollDepth > maxScrollDepth.current) {
        maxScrollDepth.current = scrollDepth;

        trackEvent({
          event_type: "scroll",
          section_name: section,
          scroll_depth: scrollDepth,
        });
      }
    },
    [trackEvent],
  );

  const trackConversion = useCallback(
    (formData: Record<string, any>) => {
      trackEvent({
        event_type: "conversion",
        section_name: "contact",
        metadata: {
          email: formData.email ? "provided" : "not_provided",
          form_fields: Object.keys(formData).length,
        },
      });
    },
    [trackEvent],
  );

  // Track session end on unmount or page leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionId) {
        const duration = Date.now() - sessionStartTime;
        navigator.sendBeacon(
          "/api/analytics/end-session",
          JSON.stringify({
            session_id: sessionId,
            duration_ms: duration,
          }),
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return {
    trackEvent,
    trackSectionView,
    trackSectionClick,
    trackScroll,
    trackConversion,
  };
}
