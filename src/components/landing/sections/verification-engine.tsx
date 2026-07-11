import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitHeading } from "../primitives/split-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VerificationEngine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = treeRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap) return;

    const nodes = svg.querySelectorAll<SVGElement>("[data-node]");
    const edges = svg.querySelectorAll<SVGPathElement>("[data-edge]");

    gsap.set(nodes, { scale: 0, transformOrigin: "center", opacity: 0 });
    edges.forEach((e) => {
      const len = e.getTotalLength();
      e.style.strokeDasharray = `${len}`;
      e.style.strokeDashoffset = `${len}`;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    });
    tl.to(edges, { strokeDashoffset: 0, duration: 1, ease: "power2.out", stagger: 0.08 }, 0);
    tl.to(nodes, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.05 }, 0.2);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      id="verification"
      ref={wrapRef}
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
      aria-labelledby="verify-title"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-square w-full max-w-[520px]">
          <svg
            ref={treeRef}
            viewBox="0 0 500 500"
            className="h-full w-full text-foreground/60"
            aria-hidden="true"
          >
            {/* edges */}
            <path data-edge d="M250,80 L120,200" stroke="currentColor" strokeOpacity="0.4" fill="none" />
            <path data-edge d="M250,80 L380,200" stroke="currentColor" strokeOpacity="0.4" fill="none" />
            <path data-edge d="M120,200 L60,340" stroke="currentColor" strokeOpacity="0.3" fill="none" />
            <path data-edge d="M120,200 L180,340" stroke="currentColor" strokeOpacity="0.3" fill="none" />
            <path data-edge d="M380,200 L320,340" stroke="currentColor" strokeOpacity="0.3" fill="none" />
            <path data-edge d="M380,200 L440,340" stroke="currentColor" strokeOpacity="0.3" fill="none" />

            {/* root */}
            <g data-node transform="translate(250 80)">
              <rect x="-56" y="-18" width="112" height="36" rx="6" fill="#0f1220" stroke="#10b981" />
              <text textAnchor="middle" dy="4" fill="#10b981" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
                STATE ROOT
              </text>
            </g>
            {/* mid */}
            {[
              { x: 120, y: 200, l: "0x7f3a" },
              { x: 380, y: 200, l: "0xc02e" },
            ].map((n) => (
              <g key={n.l} data-node transform={`translate(${n.x} ${n.y})`}>
                <rect x="-42" y="-14" width="84" height="28" rx="4" fill="#0f1220" stroke="currentColor" strokeOpacity="0.5" />
                <text textAnchor="middle" dy="3.5" fill="currentColor" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  {n.l}
                </text>
              </g>
            ))}
            {/* leaves */}
            {[
              { x: 60, y: 340, l: "a1", c: "#10b981" },
              { x: 180, y: 340, l: "b2", c: "#60a5fa" },
              { x: 320, y: 340, l: "c3", c: "#f87171" },
              { x: 440, y: 340, l: "d4", c: "#10b981" },
            ].map((n) => (
              <g key={n.l} data-node transform={`translate(${n.x} ${n.y})`}>
                <rect x="-24" y="-24" width="48" height="48" rx="4" fill="#0f1220" stroke={n.c} strokeOpacity="0.7" />
                <circle cx="0" cy="0" r="4" fill={n.c} />
              </g>
            ))}
            {/* leaf labels */}
            <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="currentColor" fillOpacity="0.5">
              <text x="60" y="390" textAnchor="middle">mongo</text>
              <text x="180" y="390" textAnchor="middle">sql</text>
              <text x="320" y="390" textAnchor="middle">redis</text>
              <text x="440" y="390" textAnchor="middle">mongo</text>
            </g>
          </svg>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--color-verified)" }}>
            verification engine
          </p>
          <SplitHeading as="h2" id="verify-title" className="text-4xl font-semibold sm:text-5xl">
            Every write becomes a proof.
          </SplitHeading>
          <p className="mt-5 max-w-md text-muted-foreground">
            Under the hood, PlugPort commits every operation into a Merkle
            Patricia Trie on MonadDb. Any client, any protocol, can request a
            cryptographic proof for the exact state they read.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { k: "Merkle Patricia Trie", v: "state commitment" },
              { k: "AES-256-GCM", v: "at-rest encryption" },
              { k: "ECDH key sharing", v: "private collections" },
              { k: "SIWE + RBAC", v: "on-chain access" },
            ].map((f) => (
              <div key={f.k} className="rounded-lg border border-hairline bg-surface/60 p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {f.v}
                </div>
                <div className="mt-1 text-sm font-medium">{f.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
