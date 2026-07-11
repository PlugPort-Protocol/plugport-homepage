import { SplitHeading } from "../primitives/split-heading";

const SHELLS = [
  {
    name: "mongo",
    color: "var(--color-mongo)",
    prompt: "> ",
    lines: [
      "mongosh mongodb://prod",
      "db.orders.find({ status: 'paid' })",
      "// no proof of state",
    ],
  },
  {
    name: "sql",
    color: "var(--color-sql)",
    prompt: "$ ",
    lines: [
      "psql -h prod postgres",
      "SELECT * FROM orders WHERE paid;",
      "-- trust the replica?",
    ],
  },
  {
    name: "redis",
    color: "var(--color-redis)",
    prompt: "> ",
    lines: [
      "redis-cli -h prod",
      "GET session:9f2e",
      "# who wrote this key?",
    ],
  },
];

export function ProtocolChaos() {
  return (
    <section
      id="problem"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
      aria-labelledby="problem-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          the problem
        </p>
        <SplitHeading
          as="h2"
          id="problem-title"
          className="text-4xl font-semibold text-foreground sm:text-6xl"
        >
          Three worlds. Three drivers. Zero proof.
        </SplitHeading>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Modern stacks juggle document stores, relational engines and caches —
          each with its own protocol, its own auth, and no shared notion of
          truth.
        </p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {SHELLS.map((s) => (
          <div
            key={s.name}
            className="group relative overflow-hidden rounded-lg border border-hairline bg-surface/60 backdrop-blur transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/60">
                isolated
              </span>
            </div>
            <div className="p-4 font-mono text-[12.5px] leading-relaxed">
              {s.lines.map((l, i) => (
                <div key={i} className={i === 2 ? "text-muted-foreground/70" : "text-foreground"}>
                  <span style={{ color: s.color }}>{s.prompt}</span>
                  {l.startsWith("> ") || l.startsWith("$ ") ? l.slice(2) : l}
                </div>
              ))}
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-px opacity-60"
              style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
