# Worklog — LONGIVET · Sitio Web Servicios Veterinarios (énfasis en Geriatría)

> Documento de coordinación entre agentes. Todo agente DEBE leer este archivo antes de trabajar y agregar su sección al finalizar (sin sobrescribir).

---

Task ID: 1
Agent: Orquestador principal (Z.ai Code)
Task: Fundaciones del proyecto LONGIVET: análisis de requerimientos (DOCX adjunto + referencia zoomies.cr), tokens de diseño, layout/SEO, datos compartidos y esquema Prisma.

Work Log:
- Analizado el DOCX adjunto "Diseño Web Servicios Veterinarios": paleta cromática oficial, leyes UX (Hick, Fitts, Miller, Jakob), arquitectura de información, JSON-LD.
- Verificado proyecto base: Next.js 16 + TS + Tailwind 4 + shadcn/ui completo + Prisma/SQLite + framer-motion + zod.
- Lanzada generación de 7 imágenes IA placeholder en background (log: /tmp/imggen.log) → /public/images/.
- Creados tokens de marca en src/app/globals.css (paleta del DOCX).
- Creado src/lib/site.ts con configuración compartida (teléfonos, dirección, horarios, enlaces nav).
- Creado prisma/schema.prisma con modelo Appointment y hecho `db push`.
- Creado src/app/layout.tsx con metadata SEO en español, fuente Plus Jakarta Sans, JSON-LD VeterinaryCare y skip-link de accesibilidad.
- Creado src/app/icon.svg (isotipo pata-corazón).

Stage Summary:
- PALETA OFICIAL (del DOCX — usar SIEMPRE tokens semánticos, nunca hex hardcodeados en componentes):
  * primary = azul médico profundo #0D3B66 | secondary = verde salvia #2A9D8F
  * background cálido arena | destructive = coral #E63946 (SOLO urgencias)
  * brand-gold #E9C46A para acentos "senior/áureo"
  * Modo oscuro implementado vía tokens.
- CONTRATO DE DISEÑO: componentes con clases semánticas (bg-background, bg-card, text-foreground, text-muted-foreground, bg-primary, bg-secondary, border-border...). Radios generosos (rounded-2xl/3xl). Iconos lucide-react lineales. Tipografía: Plus Jakarta Sans (--font-sans).
- ACCESIBILIDAD (obligatorio): HTML semántico, aria-label/expanded/live, foco visible, contraste AA, targets táctiles ≥44px, textos alt descriptivos, sr-only donde aplique.
- RUTAS: TODO en la ruta "/" (single page con secciones ancla). API routes permitidas bajo /api/*.
- Imágenes placeholder: /public/images/hero-senior-dog.png, gallery-1..5.png, senior-comfort.png (el cliente las reemplazará con los MISMOS nombres).
- DB: SQLite en /home/z/my-project/db/custom.db, modelo Appointment (código de confirmación LV-XXXXXX, único por fecha+franja).
