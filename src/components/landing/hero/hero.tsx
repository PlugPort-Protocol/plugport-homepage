import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { MagneticButton } from "../primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HERO_VIDEO_SRC = "/hero-section.mp4";

/** Story beats — the seven-step hero narrative. */
const BEATS = [
  { label: "01", text: "Three protocols. Three worlds." },
  { label: "02", text: "Wire streams begin routing." },
  { label: "03", text: "Packets converge on the port." },
  { label: "04", text: "Translation layer engages." },
  { label: "05", text: "MonadDb writes the state." },
  { label: "06", text: "Merkle proof anchors the truth." },
  { label: "07", text: "Verified data leaves the core." },
] as const;

const BEAT_INTERVAL_MS = 2800;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    // Ensure autoplay works after hydration / visibility changes
    const tryPlay = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked; muted + playsInline covers most cases */
      });
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveBeat((i) => (i + 1) % BEATS.length);
    }, BEAT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    if (!headline || !sub || !cta) return;

    const split = new SplitType(headline, { types: "words,chars", tagName: "span" });
    const chars = split.chars ?? [];

    if (reduced) {
      gsap.set([sub, cta], { opacity: 1, y: 0 });
      gsap.set(chars, { opacity: 1, y: 0 });
      return () => {
        split.revert();
      };
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

    return () => {
      intro.kill();
      split.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      aria-label="PlugPort — the verifiable database port"
    >
      {/* Full-bleed video background — covers all viewports */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroPoster />
        {!reduced && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          />
        )}
      </div>

      {/* Readability overlays: darken + vignette so white type stays legible */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,14,0.72) 0%, rgba(6,8,14,0.45) 38%, rgba(6,8,14,0.55) 62%, rgba(6,8,14,0.88) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 42%, rgba(6,8,14,0.25) 0%, rgba(6,8,14,0.55) 55%, rgba(6,8,14,0.85) 100%)",
        }}
      />

      {/* Foreground content — high-contrast over video */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-28 pt-24 text-center short:pb-24 short:pt-20">
        <div className="mb-6 short:mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:text-[11px] sm:tracking-[0.18em]">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verified" />
          </span>
          {/* Shorter label on narrow screens so the pill stays one line */}
          <span className="whitespace-nowrap sm:hidden">verifiable · on MonadDb</span>
          <span className="hidden whitespace-nowrap sm:inline">
            multi-protocol · verifiable · on MonadDb
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-balance text-[clamp(2.5rem,7.2vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.8)]"
        >
          One protocol port. Every database. Verifiable by default.
        </h1>

        <p
          ref={subRef}
          className="mt-7 short:mt-4 max-w-2xl text-balance text-base text-white/90 sm:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]"
        >
          PlugPort speaks MongoDB, SQL and Redis natively — then anchors every
          write with Merkle-proof integrity on MonadDb. Familiar drivers,
          cryptographic trust.
        </p>

        <div
          ref={ctaRef}
          className="mt-9 short:mt-4 flex flex-wrap items-center justify-center gap-3 short:gap-2"
        >
          <MagneticButton
            href="https://wiki.plugport.wtf/"
            variant="primary"
            className="min-w-[12.75rem]"
          >
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
          <MagneticButton
            href="#architecture"
            variant="secondary"
            className="min-w-[12.75rem] !border-white/25 !bg-white/10 !text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md hover:!bg-white/18 hover:!text-white"
          >
            See the architecture
          </MagneticButton>
        </div>

        <div className="mt-14 short:mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          <ProtoDot color="var(--color-mongo)" label="mongo" />
          <span className="opacity-40">·</span>
          <ProtoDot color="var(--color-sql)" label="sql" />
          <span className="opacity-40">·</span>
          <ProtoDot color="var(--color-redis)" label="redis" />
        </div>
      </div>

      {/* Seven story beats — desktop timeline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 short:bottom-4 z-10 mx-auto hidden max-w-6xl px-6 md:block"
        aria-hidden="true"
      >
        <div className="flex items-end justify-between border-t border-white/15 pt-4">
          {BEATS.map((b, i) => {
            const active = i === activeBeat;
            return (
              <div
                key={b.label}
                data-beat
                data-active={active ? "true" : "false"}
                className="group flex flex-col items-start gap-1.5 opacity-40 transition-opacity duration-300 data-[active=true]:opacity-100"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {b.label}
                </span>
                <span className="max-w-[14ch] text-left text-[11px] font-medium leading-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
                  {b.text}
                </span>
                <span
                  className={`mt-1 block h-px w-8 transition-colors duration-300 ${
                    active ? "bg-primary" : "bg-white/30"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile beats: fixed-height strip + step dots (no layout jump) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
        aria-hidden="true"
      >
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2.5">
          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {BEATS.map((b, i) => (
              <span
                key={b.label}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeBeat
                    ? "w-4 bg-primary"
                    : "w-1 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Fixed-height text slot so cycling never shifts layout */}
          <div className="relative h-9 w-full overflow-hidden text-center">
            {BEATS.map((b, i) => (
              <p
                key={b.label}
                className={`absolute inset-x-0 top-0 px-1 text-[12px] font-medium leading-snug text-white/90 transition-all duration-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] ${
                  i === activeBeat
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1.5 opacity-0"
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] tabular-nums tracking-wider text-white/55">
                  {b.label}
                </span>
                {b.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
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
    <div className="absolute inset-0 bg-[oklch(0.12_0.02_265)]">
      <div
        className="absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, #10b98144, #60a5fa44, #f8717144, #10b98144)",
        }}
      />
    </div>
  );
}
