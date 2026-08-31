import { SplitHeading } from "../primitives/split-heading";

const LAYERS = [
  {
    name: "Wire protocols",
    tag: "01 · edge",
    items: ["Mongo Wire", "Postgres FE/BE", "MySQL", "RESP (Redis)"],
    accent: "var(--color-primary)",
  },
  {
    name: "Translation layer",
    tag: "02 · core",
    items: ["Query planner", "Join engine (Hash · Left · Right · Cross)", "Type coercion", "Pub/Sub bridge → SSE"],
    accent: "var(--color-primary)",
  },
  {
    name: "Verification",
    tag: "03 · trust",
    items: ["SIWE auth", "PlugPortPrivateStore RBAC", "AES-256-GCM · ECDH sharing", "Merkle Patricia Trie"],
    accent: "var(--color-verified)",
  },
  {
    name: "MonadDb",
    tag: "04 · state",
    items: ["Blockchain-grade proofs", "Immutable state root", "Deterministic reads"],
    accent: "var(--color-primary)",
  },
];

export function Architecture() {
  return (
    <section
      id="architecture"
      className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-40"
      aria-labelledby="arch-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          architecture
        </p>
        <SplitHeading as="h2" id="arch-title"          className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Engineered top to bottom.
        </SplitHeading>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Four layers, one contract. Data enters as familiar protocols and
          leaves as verifiable state.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-4">
        {LAYERS.map((l, i) => (
          <div
            key={l.name}
            className="group relative flex flex-col bg-surface/70 p-6 transition-colors duration-300 hover:bg-surface-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {l.tag}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: l.accent, boxShadow: `0 0 10px ${l.accent}` }}
              />
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">{l.name}</h3>
            <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
              {l.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-px w-3 bg-foreground/25" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <span className="font-mono text-[11px] text-muted-foreground/60">
                → {i < LAYERS.length - 1 ? LAYERS[i + 1].name.toLowerCase() : "storage root"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
