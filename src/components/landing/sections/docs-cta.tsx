import { MagneticButton } from "../primitives/magnetic-button";
import { SplitHeading } from "../primitives/split-heading";

export function DocsCta() {
  return (
    <section
      id="docs"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
      aria-labelledby="docs-title"
    >
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/70 p-10 backdrop-blur sm:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(37,99,235,0.2), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(16,185,129,0.14), transparent 60%)",
          }}
        />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              ship it
            </p>
            <SplitHeading as="h2" id="docs-title" className="text-4xl font-semibold sm:text-5xl">
              Plug in. Prove everything.
            </SplitHeading>
            <p className="mt-4 max-w-lg text-muted-foreground">
              The docs walk you through your first verified insert in under five
              minutes — from local dev to production on MonadDb.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="#docs" variant="primary">
              Read the docs
            </MagneticButton>
            <MagneticButton href="#" variant="secondary">
              Star on GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
