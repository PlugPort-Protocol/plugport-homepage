import type { ReactNode } from "react";

const SOCIAL_LINKS = {
  x: "https://x.com/gPlugPort",
  github: "https://github.com/PlugPort-Protocol/plugport",
} as const;

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">PlugPort</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The verifiable multi-protocol database. Built on MonadDb.
          </p>
          <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <ProtoDot color="var(--color-mongo)" label="mongo" />
            <ProtoDot color="var(--color-sql)" label="sql" />
            <ProtoDot color="var(--color-redis)" label="redis" />
          </div>
          <div className="mt-5 flex items-center gap-2">
            <SocialLink href={SOCIAL_LINKS.x} label="PlugPort on X">
              <XIcon />
            </SocialLink>
            <SocialLink href={SOCIAL_LINKS.github} label="PlugPort on GitHub">
              <GitHubIcon />
            </SocialLink>
          </div>
        </div>
        <FooterCol
          title="Product"
          links={[
            { label: "Features", href: "#solution" },
            { label: "Architecture", href: "#architecture" },
            { label: "Verification", href: "#verification" },
            { label: "Pricing", href: "#" },
          ]}
        />
        <FooterCol
          title="Developers"
          links={[
            { label: "Docs", href: "https://wiki.plugport.wtf/" },
            { label: "SDKs", href: "#" },
            { label: "CLI", href: "#" },
            { label: "Changelog", href: "#" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Blog", href: "#" },
            { label: "Community", href: "#" },
            { label: "Security", href: "#" },
            { label: "Contact", href: "#" },
          ]}
        />
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} plugport · all state roots reserved</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-verified" />
            all systems verified
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-foreground/80 transition-colors hover:text-foreground">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProtoDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
      {label}
    </span>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface-2/60 text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
