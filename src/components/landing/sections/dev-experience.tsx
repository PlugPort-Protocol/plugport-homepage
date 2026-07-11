import { SplitHeading } from "../primitives/split-heading";

const STEPS = [
  { cmd: "npm i -g @plugport/cli", note: "install once" },
  { cmd: "plugport init my-app", note: "scaffold config" },
  { cmd: "plugport dev", note: "in-memory · all protocols on" },
  { cmd: "plugport deploy --monad", note: "verifiable in production" },
];

const SDKS = [
  { name: "Node.js", handle: "@plugport/node", accent: "var(--color-mongo)" },
  { name: "Python", handle: "plugport", accent: "var(--color-sql)" },
  { name: "Go", handle: "github.com/plugport/go", accent: "var(--color-redis)" },
  { name: "CLI", handle: "plugport", accent: "var(--color-primary)" },
];

export function DevExperience() {
  return (
    <section
      id="dx"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
      aria-labelledby="dx-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          developer experience
        </p>
        <SplitHeading as="h2" id="dx-title" className="text-4xl font-semibold sm:text-5xl">
          From zero to verifiable in four commands.
        </SplitHeading>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* terminal */}
        <div className="overflow-hidden rounded-lg border border-hairline bg-surface/80 backdrop-blur">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              zsh · plugport
            </span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-relaxed">
            {STEPS.map((s) => (
              <div key={s.cmd} className="mb-2 flex items-start gap-3">
                <span className="text-primary">$</span>
                <span className="flex-1 text-foreground">{s.cmd}</span>
                <span className="text-muted-foreground/70">{s.note}</span>
              </div>
            ))}
            <div className="mt-4 border-t border-hairline pt-3 text-[12px] text-muted-foreground">
              <span className="text-verified">✓</span> mongo · <span className="text-verified">✓</span> postgres · <span className="text-verified">✓</span> mysql · <span className="text-verified">✓</span> redis · <span className="text-verified">✓</span> http · <span className="text-verified">✓</span> sse
              <div className="mt-1">→ state root <span className="text-foreground">0x7f3a…c02e</span></div>
            </div>
          </div>
        </div>

        {/* sdks */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            {SDKS.map((s) => (
              <div
                key={s.name}
                className="group relative overflow-hidden rounded-lg border border-hairline bg-surface/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold tracking-tight">{s.name}</div>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.accent, boxShadow: `0 0 10px ${s.accent}` }}
                  />
                </div>
                <div className="mt-6 font-mono text-[12px] text-muted-foreground">{s.handle}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  <span className="h-px w-4 bg-foreground/30" />
                  ready
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            First-class SDKs plus a developer-friendly <span className="font-mono text-foreground">plugport</span> CLI.
            Or bring your own driver — the wire is standard.
          </p>
        </div>
      </div>
    </section>
  );
}
