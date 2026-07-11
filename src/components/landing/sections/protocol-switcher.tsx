import { useState } from "react";
import { SplitHeading } from "../primitives/split-heading";

type ResultRow = { k: string; v: string; accent?: boolean };
type Protocol = {
  id: "mongo" | "sql" | "redis";
  label: string;
  color: string;
  code: string;
  result: ResultRow[];
};

const PROTOCOLS: Protocol[] = [
  {
    id: "mongo",
    label: "MongoDB",
    color: "var(--color-mongo)",
    code: `// Node.js — plug in mongosh-compatible driver
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://plugport:27017");
const orders = client.db("shop").collection("orders");

await orders.insertOne({
  id: "ord_9f2e",
  total: 12800,
  paid: true,
});

// each write returns a verifiable state root
const { proof } = await orders.plugport.lastProof();`,
    result: [
      { k: "state_root", v: "0x7f3a…c02e", accent: true },
      { k: "protocol", v: "mongo-wire · 5.x" },
      { k: "latency_ms", v: "3.1" },
      { k: "verified", v: "true", accent: true },
    ],
  },
  {
    id: "sql",
    label: "SQL",
    color: "var(--color-sql)",
    code: `-- psql, mysql, or any Postgres driver
INSERT INTO orders (id, total, paid)
VALUES ('ord_9f2e', 12800, true);

-- Joins run on the unified engine
SELECT o.id, u.email, o.total
FROM orders o
LEFT JOIN users u ON u.id = o.user_id
WHERE o.paid = true;

-- proof travels with the result set
SELECT plugport.state_proof();`,
    result: [
      { k: "state_root", v: "0x7f3a…c02e", accent: true },
      { k: "protocol", v: "postgres · 15 wire" },
      { k: "join", v: "hash · left" },
      { k: "verified", v: "true", accent: true },
    ],
  },
  {
    id: "redis",
    label: "Redis",
    color: "var(--color-redis)",
    code: `# redis-cli or ioredis — RESP3 compatible
> SET session:9f2e '{"uid":42,"role":"admin"}'
OK

> GET session:9f2e
"{\\"uid\\":42,\\"role\\":\\"admin\\"}"

# Pub/Sub bridges to HTTP Server-Sent Events
> SUBSCRIBE audit:writes
# GET /api/v1/redis/stream?channel=audit:writes

> PLUGPORT.PROOF session:9f2e`,
    result: [
      { k: "state_root", v: "0x7f3a…c02e", accent: true },
      { k: "protocol", v: "resp3 · 7.x" },
      { k: "sse_bridge", v: "on" },
      { k: "verified", v: "true", accent: true },
    ],
  },
] as const;

export function ProtocolSwitcher() {
  const [active, setActive] = useState<(typeof PROTOCOLS)[number]["id"]>("mongo");
  const current = PROTOCOLS.find((p) => p.id === active)!;

  return (
    <section
      id="features"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
      aria-labelledby="features-title"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            drivers you already use
          </p>
          <SplitHeading as="h2" id="features-title" className="max-w-2xl text-4xl font-semibold sm:text-5xl">
            Same code. New guarantees.
          </SplitHeading>
        </div>
        <div
          role="tablist"
          aria-label="Select a protocol"
          className="inline-flex rounded-md border border-hairline bg-surface p-1"
        >
          {PROTOCOLS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              onClick={() => setActive(p.id)}
              className={`relative rounded-[5px] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                active === p.id
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ background: p.color, boxShadow: active === p.id ? `0 0 10px ${p.color}` : "none" }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* code */}
        <div className="overflow-hidden rounded-lg border border-hairline bg-surface/70 backdrop-blur">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: current.color, boxShadow: `0 0 10px ${current.color}` }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {current.id} · client
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60">via plugport</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-foreground/90">
            <code>{current.code}</code>
          </pre>
        </div>

        {/* response */}
        <div className="overflow-hidden rounded-lg border border-hairline bg-surface/70 backdrop-blur">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              response · proof
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                borderColor: "color-mix(in oklab, var(--color-verified) 40%, transparent)",
                color: "var(--color-verified)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-verified" />
              verified
            </span>
          </div>
          <dl className="divide-y divide-hairline">
            {current.result.map((r) => (
              <div key={r.k} className="flex items-center justify-between px-5 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {r.k}
                </dt>
                <dd
                  className={`font-mono text-[12.5px] ${
                    r.accent ? "text-verified" : "text-foreground"
                  }`}
                  style={r.accent ? { color: "var(--color-verified)" } : undefined}
                >
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
