import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Isotipo de LONGIVET: una pata con corazón"
    >
      <defs>
        <linearGradient id="logo-lv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a9d8f" />
          <stop offset="1" stopColor="#0d3b66" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-lv)" />
      <g fill="#ffffff">
        <ellipse cx="22" cy="22" rx="5.2" ry="7" transform="rotate(-18 22 22)" />
        <ellipse cx="42" cy="22" rx="5.2" ry="7" transform="rotate(18 42 22)" />
        <ellipse cx="13" cy="33" rx="4.6" ry="6.2" transform="rotate(-40 13 33)" />
        <ellipse cx="51" cy="33" rx="4.6" ry="6.2" transform="rotate(40 51 33)" />
        <path d="M32 30c7 0 13.5 5.4 13.5 12.2 0 4.6-3.4 7.8-7.6 7.8-2.6 0-4.3-1-5.9-1s-3.3 1-5.9 1c-4.2 0-7.6-3.2-7.6-7.8C18.5 35.4 25 30 32 30z" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** dark = texto oscuro para fondos claros · light = texto blanco para fondos oscuros */
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight",
            tone === "dark"
              ? "text-brand-navy dark:text-foreground"
              : "text-white"
          )}
        >
          LONGI<span className="text-brand-teal">VET</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
            tone === "dark"
              ? "text-muted-foreground"
              : "text-white/70"
          )}
        >
          Geriatría veterinaria
        </span>
      </span>
    </span>
  );
}
