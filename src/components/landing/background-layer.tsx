export function BackgroundLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.14), transparent 70%), radial-gradient(ellipse 50% 30% at 100% 100%, rgba(16,185,129,0.08), transparent 70%), radial-gradient(ellipse 40% 30% at 0% 60%, rgba(239,68,68,0.05), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-[0.35]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
