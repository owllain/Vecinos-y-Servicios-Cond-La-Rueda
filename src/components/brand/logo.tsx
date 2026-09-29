import { cn } from "@/lib/utils";

/**
 * Marca de "Vecinos y Servicios": un libro abierto con un pin de guía
 * turística sobre el lomo. Colores vía tokens de marca (sin hex fijos).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Logo: libro abierto con pin de guía"
      className={cn("h-10 w-10", className)}
    >
      <path
        d="M32 7c-5 0-9 4-9 9 0 6.6 9 14.8 9 14.8S41 22.6 41 16c0-5-4-9-9-9z"
        fill="var(--brand-terracotta)"
      />
      <circle cx="32" cy="16" r="3.4" fill="var(--brand-cream)" />
      <path
        d="M10 39c6.5-3.4 13.5-3.4 20 0v13.5c-6.5-3.4-13.5-3.4-20 0z"
        fill="var(--brand-pine)"
      />
      <path
        d="M54 39c-6.5-3.4-13.5-3.4-20 0v13.5c6.5-3.4 13.5-3.4 20 0z"
        fill="var(--brand-teal)"
      />
      <rect
        x="31"
        y="37.6"
        width="2"
        height="15"
        rx="1"
        fill="var(--brand-gold)"
      />
    </svg>
  );
}

/**
 * Logotipo completo: marca + texto. tone="light" para usar sobre
 * fondos oscuros (footer, navbar sólido pino, etc.).
 */
export function Logo({
  className,
  tone = "dark",
  compact = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-tight",
            compact ? "text-base" : "text-lg",
            tone === "dark" ? "text-brand-pine" : "text-brand-cream",
          )}
        >
          Vecinos y Servicios
        </span>
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-brand-teal-dark" : "text-brand-gold",
          )}
        >
          Condominio La Rueda
        </span>
      </span>
    </span>
  );
}
