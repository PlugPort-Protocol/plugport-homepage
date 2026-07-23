import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { MagneticButton } from "../primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HERO_VIDEO_SRC = "/hero-section.mp4";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-24 text-center short:pb-10 short:pt-20">
        <div className="mb-6 short:mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verified" />
          </span>
          multi-protocol · verifiable · on MonadDb
        </div>

        <h1
          ref={headlineRef}
          className="text-balance text-[clamp(2.5rem,7.2vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.8)]"
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
          <MagneticButton href="https://wiki.plugport.wtf/" variant="primary">
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
            className="!border-white/25 !bg-white/10 !text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md hover:!bg-white/18 hover:!text-white"
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
