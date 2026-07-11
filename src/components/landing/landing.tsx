import { useLenis } from "@/hooks/use-lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Nav } from "./nav";
import { BackgroundLayer } from "./background-layer";
import { Hero } from "./hero/hero";
import { ProtocolChaos } from "./sections/protocol-chaos";
import { Solution } from "./sections/solution";
import { Architecture } from "./sections/architecture";
import { ProtocolSwitcher } from "./sections/protocol-switcher";
import { VerificationEngine } from "./sections/verification-engine";
import { DevExperience } from "./sections/dev-experience";
import { Performance } from "./sections/performance";
import { IntegrationsMarquee } from "./sections/integrations-marquee";
import { DocsCta } from "./sections/docs-cta";
import { Footer } from "./footer";

export function Landing() {
  const reduced = useReducedMotion();
  useLenis(!reduced);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <BackgroundLayer />
      <Nav />
      <main id="main">
        <Hero />
        <ProtocolChaos />
        <Solution />
        <Architecture />
        <ProtocolSwitcher />
        <VerificationEngine />
        <DevExperience />
        <Performance />
        <IntegrationsMarquee />
        <DocsCta />
      </main>
      <Footer />
    </div>
  );
}
