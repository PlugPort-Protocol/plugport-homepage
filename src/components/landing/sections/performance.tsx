import { Counter } from "../primitives/counter";
import { SplitHeading } from "../primitives/split-heading";

const METRICS = [
  { label: "ops / second", to: 1420000, suffix: "", format: "compact" as const },
  { label: "p99 latency", to: 2.4, suffix: " ms", decimals: 1 },
  { label: "proof size", to: 384, suffix: " B" },
  { label: "protocols in one port", to: 4 },
];

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export function Performance() {
  return (
    <section
      id="performance"
      className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-40"
      aria-labelledby="perf-title"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            performance
          </p>
          <SplitHeading as="h2" id="perf-title"          className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Cryptographic trust, without the tax.
          </SplitHeading>
          <p className="mt-5 max-w-md text-muted-foreground">
            PlugPort's core is built for throughput. Proofs are compact,
            batched, and cached — so verification never becomes a bottleneck.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col justify-between bg-surface/70 p-6 sm:p-8">
              <dd className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {m.label}
              </dd>
              <dt className="mt-6 text-3xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl lg:text-5xl">
                {m.format === "compact" ? (
                  <FormattedCounter to={m.to} suffix={m.suffix ?? ""} />
                ) : (
                  <Counter to={m.to} suffix={m.suffix ?? ""} decimals={m.decimals ?? 0} />
                )}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FormattedCounter({ to, suffix }: { to: number; suffix: string }) {
  // Render as compact using our Counter by scaling internally
  // Fallback: static formatted number after animation
  return (
    <span className="tabular-nums">
      <Counter to={to} />
      {/* invisible replaced final label for accuracy */}
      <span className="sr-only">{formatCompact(to)}{suffix}</span>
    </span>
  );
}
