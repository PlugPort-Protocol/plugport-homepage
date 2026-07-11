const LOGOS = [
  "mongosh", "psql", "mysql-cli", "redis-cli",
  "MongoDB Compass", "DBeaver", "TablePlus", "RedisInsight",
  "Prisma", "Drizzle", "SQLAlchemy", "ioredis",
  "SIWE", "MonadDb", "Node.js", "Python", "Go", "Rust",
];

export function IntegrationsMarquee() {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden border-y border-hairline bg-surface/40 py-16"
      aria-labelledby="integrations-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground" id="integrations-title">
            works with the tools you already use
          </p>
        </div>
      </div>
      <div
        className="relative mt-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap pr-10">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div
              key={`${l}-${i}`}
              className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-foreground/30" />
              {l}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
