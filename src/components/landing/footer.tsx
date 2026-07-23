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

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
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
