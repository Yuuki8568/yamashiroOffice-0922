import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { MobileCta } from "../components/site/mobile-cta";
import { Hero } from "../components/site/sections/hero";
import { Worries } from "../components/site/sections/worries";
import { WorkExamples } from "../components/site/sections/work-examples";
import { Projects } from "../components/site/sections/projects";
import { DemoEntry } from "../components/site/sections/demo-entry";
import { Services } from "../components/site/sections/services";
import { Pricing } from "../components/site/sections/pricing";
import { FdeAbout } from "../components/site/sections/fde-about";
import { Profile } from "../components/site/sections/profile";
import { Strengths } from "../components/site/sections/strengths";
import { Philosophy } from "../components/site/sections/philosophy";
import { Flow } from "../components/site/sections/flow";
import { FdeExperience } from "../components/site/sections/fde-experience";
import { FitCheck } from "../components/site/sections/fit-check";
import { Moyamoya } from "../components/site/sections/moyamoya";
import { Security } from "../components/site/sections/security";
import { StoreSection } from "../components/site/sections/store";
import { Faq } from "../components/site/sections/faq";
import { Contact } from "../components/site/sections/contact";

function Index() {
  return (
    <div className="min-h-screen bg-washi">
      <SiteHeader />
      <main>
        <Hero />
        <Worries />
        <WorkExamples />
        <Projects />
        <DemoEntry />
        <Services />
        <Pricing />
        <FdeAbout />
        <Profile />
        <Strengths />
        <Philosophy />
        <Flow />
        <FdeExperience />
        <FitCheck />
        <Moyamoya />
        <Security />
        <StoreSection />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}

export default Index;
