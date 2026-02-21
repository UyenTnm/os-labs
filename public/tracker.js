(function () {
    const script = document.currentScript;
    const trackingId = script.getAttribute("data-id");

    let sessionId = localStorage.getItem("session_id");

    let visitorId = localStorage.getItem("analytics_visitor");

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("session_id", sessionId);
    }

    if (!trackingId) {
        console.error("No tracking_id");
        return;
    }

    if (!visitorId) {
        visitorId = "usr_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("analytics_visitor", visitorId)
    }

    function send(eventType) {
        fetch("http://localhost:3000/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tracking_id: trackingId,
                event_type: eventType,
                url: window.location.href,
                visitor_id: visitorId,
                session_id: sessionId,
                section_name,
                scroll_depth,
                timestamp: new Date().toISOString(),
            }),
        }).catch(err => console.error("Track error:", err));
    }

    // page view
    send("page_view");

    // click tracking
    document.addEventListener("click", () => {
        send("click");
    });

    console.log("Tracker loaded:", trackingId);

    console.log("SEND DATA:", {
        tracking_id: trackingId,
        event_type: eventType,
        url: window.location.href,
        visitor_id: visitorId,
        session_id: sessionId,
    });

})();
