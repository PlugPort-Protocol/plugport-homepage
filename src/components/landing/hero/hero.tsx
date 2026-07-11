import { lazy, Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { MagneticButton } from "../primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProtocolEngineScene = lazy(() =>
  import("./protocol-engine-scene").then((m) => ({ default: m.ProtocolEngineScene }))
);

const BEATS = [
  { at: 0.02, label: "01", text: "Three protocols. Three worlds." },
  { at: 0.16, label: "02", text: "Wire streams begin routing." },
  { at: 0.3, label: "03", text: "Packets converge on the port." },
  { at: 0.46, label: "04", text: "Translation layer engages." },
  { at: 0.62, label: "05", text: "MonadDb writes the state." },
  { at: 0.78, label: "06", text: "Merkle proof anchors the truth." },
  { at: 0.94, label: "07", text: "Verified data leaves the core." },
];

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const beats = beatsRef.current;
    if (!wrap || !pin || !headline || !sub || !cta || !beats) return;

    // Intro reveal
    const split = new SplitType(headline, { types: "words,chars", tagName: "span" });
    const chars = split.chars ?? [];

    if (reduced) {
      gsap.set([sub, cta], { opacity: 1, y: 0 });
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(chars, { yPercent: 120, opacity: 0, filter: "blur(10px)" });
    gsap.set(sub, { opacity: 0, y: 24, filter: "blur(6px)" });
    gsap.set(cta, { opacity: 0, y: 20 });

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.018,
      })
      .to(sub, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, "-=0.55")
      .to(cta, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55");

    // Scroll-scrubbed hero timeline
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      pin: pin,
      pinSpacing: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        // Update beat highlight
        const beatEls = beats.querySelectorAll<HTMLElement>("[data-beat]");
        let activeIdx = 0;
        for (let i = 0; i < BEATS.length; i++) {
          if (self.progress >= BEATS[i].at) activeIdx = i;
        }
        beatEls.forEach((el, i) => {
          el.dataset.active = i === activeIdx ? "true" : "false";
        });
      },
    });

    // Headline morphs toward end of scroll
    const morph = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    morph.to(headline, { scale: 0.92, y: -40, opacity: 0.4, ease: "none" }, 0);
    morph.to(sub, { opacity: 0, y: -20, ease: "none" }, 0);
    morph.to(cta, { opacity: 0, y: -20, ease: "none" }, 0);

    return () => {
      st.kill();
      morph.scrollTrigger?.kill();
      morph.kill();
      intro.kill();
      split.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: "420vh" }}
      aria-label="PlugPort — the verifiable database port"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* 3D canvas layer */}
        <div className="absolute inset-0" aria-hidden="true">
          <Suspense fallback={<HeroPoster />}>
            {!reduced && <ProtocolEngineScene progressRef={progressRef} />}
          </Suspense>
          {reduced && <HeroPoster />}
        </div>

        {/* Vignette + grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(10,13,20,0.82) 0%, rgba(10,13,20,0.6) 40%, rgba(10,13,20,0.9) 78%, rgba(10,13,20,1) 100%)",
          }}
        />


        {/* Foreground content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <div className="mb-6 short:mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verified" />
            </span>
            multi-protocol · verifiable · on MonadDb
          </div>

          <h1
            ref={headlineRef}
            className="text-balance text-[clamp(2.5rem,7.2vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground"
          >
            One protocol port. Every database. Verifiable by default.
          </h1>

          <p
            ref={subRef}
            className="mt-7 short:mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            PlugPort speaks MongoDB, SQL and Redis natively — then anchors every
            write with Merkle-proof integrity on MonadDb. Familiar drivers,
            cryptographic trust.
          </p>

          <div
            ref={ctaRef}
            className="mt-9 short:mt-4 flex flex-wrap items-center justify-center gap-3 short:gap-2"
          >
            <MagneticButton href="#docs" variant="primary">
              <span className="inline-flex items-center gap-2">
                Start building
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </MagneticButton>
            <MagneticButton href="#architecture" variant="secondary">
              See the architecture
            </MagneticButton>
          </div>

          <div className="mt-14 short:mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
            <ProtoDot color="var(--color-mongo)" label="mongo" />
            <span className="opacity-30">·</span>
            <ProtoDot color="var(--color-sql)" label="sql" />
            <span className="opacity-30">·</span>
            <ProtoDot color="var(--color-redis)" label="redis" />
          </div>
        </div>

        {/* Beat timeline (scroll story) */}
        <div
          ref={beatsRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 short:bottom-4 z-10 mx-auto hidden max-w-6xl px-6 md:block"
          aria-hidden="true"
        >
          <div className="flex items-end justify-between border-t border-hairline pt-4">
            {BEATS.map((b, i) => (
              <div
                key={b.label}
                data-beat
                data-active={i === 0 ? "true" : "false"}
                className="group flex flex-col items-start gap-1.5 opacity-40 transition-opacity duration-300 data-[active=true]:opacity-100"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {b.label}
                </span>
                <span className="max-w-[14ch] text-[11px] font-medium leading-tight text-foreground">
                  {b.text}
                </span>
                <span className="mt-1 block h-px w-8 bg-foreground/30 group-data-[active=true]:bg-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 md:hidden">
          scroll
        </div>
      </div>
    </section>
  );
}

function ProtoDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      />
      {label}
    </span>
  );
}

function HeroPoster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-[420px] w-[420px] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, #10b98133, #60a5fa33, #f8717133, #10b98133)",
        }}
      />
    </div>
  );
}
