import { SplitHeading } from "../primitives/split-heading";

export function Solution() {
  return (
    <section
      id="solution"
      className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-40"
      aria-labelledby="solution-title"
    >
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            the port
          </p>
          <SplitHeading
            as="h2"
            id="solution-title"
            className="text-3xl font-semibold sm:text-4xl lg:text-5xl"
          >
            One port. One proof. Every protocol.
          </SplitHeading>
          <p className="mt-5 max-w-md text-muted-foreground">
            PlugPort accepts the wire protocols developers already know, then
            translates every operation into a single verifiable document store
            anchored on MonadDb.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Native Mongo, Postgres, MySQL & Redis wire protocols",
              "Unified translation layer with a shared join engine",
              "Every write becomes a Merkle-anchored, provable state",
              "SIWE auth + on-chain RBAC out of the box",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "color-mix(in oklab, var(--color-verified) 20%, transparent)",
                    color: "var(--color-verified)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <ConvergenceDiagram />
        </div>
      </div>
    </section>
  );
}

function ConvergenceDiagram() {
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="wire" x1="0" x2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="core-g" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* grid rings */}
        {[80, 130, 180].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
          />
        ))}

        {/* wires from each protocol to core */}
        <path d="M60,80 C130,120 170,160 200,200" stroke="#10b981" strokeOpacity="0.6" fill="none" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M340,80 C270,120 230,160 200,200" stroke="#60a5fa" strokeOpacity="0.6" fill="none" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.4s" repeatCount="indefinite" />
        </path>
        <path d="M200,330 C200,270 200,240 200,200" stroke="#f87171" strokeOpacity="0.6" fill="none" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.8s" repeatCount="indefinite" />
        </path>

        {/* core */}
        <circle cx="200" cy="200" r="60" fill="url(#core-g)" />
        <circle cx="200" cy="200" r="28" fill="#0f1220" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="6" fill="#2563eb">
          <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* protocol pucks */}
        <ProtocolPuck x={60} y={80} color="#10b981" label="mongo" />
        <ProtocolPuck x={340} y={80} color="#60a5fa" label="sql" />
        <ProtocolPuck x={200} y={330} color="#f87171" label="redis" />
      </svg>
    </div>
  );
}

function ProtocolPuck({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="24" fill="#0f1220" stroke={color} strokeOpacity="0.8" />
      <circle cx={x} cy={y} r="5" fill={color} />
      <text
        x={x}
        y={y + 44}
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.65"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="2"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}
