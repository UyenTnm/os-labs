import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import LoginPage from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Add padding for fixed header */}
      <div className="pt-16 md:pt-20">
        <AnalyticsWrapper sectionName="hero">
          <Hero />
        </AnalyticsWrapper>
        <AnalyticsWrapper sectionName="services">
          <Services />
        </AnalyticsWrapper>
        <AnalyticsWrapper sectionName="portfolio">
          <Portfolio />
        </AnalyticsWrapper>
        <AnalyticsWrapper sectionName="process">
          <Process />
        </AnalyticsWrapper>
        <AnalyticsWrapper sectionName="pricing">
          <Pricing />
        </AnalyticsWrapper>
        <AnalyticsWrapper sectionName="contact">
          <Contact />
        </AnalyticsWrapper>
      </div>

      <Footer />
    </main>
  );
}
