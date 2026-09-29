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

---

Task ID: 2-c
Agent: fullstack-developer (faq)
Task: FAQ ultra completa con búsqueda y categorías
Work Log:
- Leído worklog (contrato de diseño/tokens), globals.css y site.ts antes de programar.
- Creado src/data/faq.ts: interfaz FaqItem, 6 categorías tipadas (as const) y 24 preguntas/respuestas en español CR, tono cálido-profesional, 2-4 oraciones accionables. Distribución: Citas 4 · Geriatría 4 · Servicios 5 · Precios 4 · Urgencias 4 · Antes de tu visita 3. Sin teléfonos hardcodeados (referencias genéricas «línea de guardia», «nuestro equipo»); horarios/comerciales solo como texto de contenido.
- Cobertura completa de los temas pedidos: agendar (web/WhatsApp/tel), horarios + llegadas tarde, urgencias sin cita, cancelación sin costo con 24h, edad senior (perros ~7, grandes ~5, gatos ~10), chequeo cada 6 meses con hemograma/bioquímica/presión/movilidad/dental + laboratorio interno mismo día, señales de alerta + disfunción cognitiva, artritis/dolor con plan multimodal, consulta general vs geriátrica, rehabilitación (cinta subacuática/láser), odontología con sedación monitorizada, sala felina sin estrés, paliativo con escala HHHHHM y despedida digna, formas de pago (efectivo/tarjeta/transferencia/SINPE Móvil) + factura con IVA, Plan Integral Senior, descuentos (2ª mascota 10 %, adopción senior 15 %), presupuesto previo + seguros, qué es urgencia, guardia nocturna, auxilios durante el traslado, triage <5 min, preparación (ayuno 4h/agua/historial/muestra fresca), transporte de perros grandes y mascotas nerviosas.
- Creado src/components/faq/faq-section.tsx ("use client", export default FaqSection): sección #faq con aria-labelledby="titulo-faq", banda bg-brand-sand dark:bg-background py-20/24, kicker pill bg-brand-teal-soft, h2 text-3xl md:text-5xl font-extrabold text-brand-navy dark:text-foreground.
- Búsqueda en vivo: Input shadcn h-[52px] rounded-full con Search a la izquierda, label visible «Buscar en las preguntas», botón X (size-11, aria-label «Limpiar búsqueda») que aparece solo con texto y devuelve el foco al input; normalización sin tildes para que «atencion» encuentre «atención».
- Filtros: chips h-11 (≥44px) «Todas» + 6 categorías con aria-pressed, iconos lucide (CalendarClock, HeartPulse, Stethoscope, CreditCard, Siren, ClipboardList); activa bg-brand-navy text-white (dark: bg-primary), inactiva bg-card border hover:border-brand-teal.
- Contador <p aria-live="polite"> «Mostrando X de 24 preguntas» con singular/plural; Radix Accordion (single collapsible) max-w-3xl con items bg-card rounded-2xl, trigger font-semibold text-brand-navy dark:text-foreground + Badge de categoría oculto en móvil, content text-muted-foreground leading-relaxed.
- Estado vacío con SearchX + botón teal (bg-brand-teal-dark, AA con blanco 5.1:1) «Preguntar por WhatsApp» → site.whatsappHref, target _blank rel noopener noreferrer, aria-label completo.
- Cierre con gradiente from-brand-teal-soft to-background (dark: from-accent to-card) y botones «Agendar cita» (#agendar) y «Ver el Programa Senior» (#programa-senior).
- JSON-LD FAQPage renderizado vía <script type="application/ld+json"> con las 24 Question/acceptedAnswer, inLanguage es-CR.
- Hidratación determinista: sin Math.random/Date; estado inicial «Todas» + búsqueda vacía; useMemo para filtrado. tsconfig estricto OK, eslint sin errores (bun run lint limpio).
Stage Summary:
- EXPORTS: src/data/faq.ts → FaqItem (interface), faqCategories (readonly tuple ×6), FaqCategory (type), faqItems (FaqItem[] ×24). src/components/faq/faq-section.tsx → default FaqSection.
- INTEGRACIÓN: <FaqSection /> va en la ruta "/" entre #equipo y #contacto (la nav ya apunta a #faq); los anclas #agendar y #programa-senior deben existir en otras secciones (IDs usados por los botones de cierre).
- Los datos del FAQ alimentan tanto la UI como el JSON-LD desde faqItems: si se agregan preguntas, actualizar también el texto «de 24» no hace falta (el contador usa faqItems.length dinámicamente).
- Búsqueda insensitive a tildes/mayúsculas y matchea q + a + categoría; accesibilidad: aria-live en contador, aria-pressed en chips, label visible, targets ≥44px, foco visible vía tokens globales.

---
Task ID: 2-a
Agent: frontend-styling-expert
Task: CrisisBar + Navbar + MobileStickyBar + Footer triangular
Work Log:
- Leí worklog.md (contrato de diseño), globals.css (tokens), site.ts, brand/logo.tsx, layout.tsx y ui/sheet.tsx|button.tsx|input.tsx antes de escribir código.
- Creado src/components/layout/crisis-bar.tsx: cintillo NO sticky bg-brand-coral, min-h-10 (~40px), max-w-7xl centrado, puntito con animate-ping aislado (reduced-motion lo neutraliza), PhoneCall, mensaje con parte larga hidden sm:inline, enlace tel: como pastilla blanca con texto brand-coral-dark (aria-label "Llamar a urgencias veterinarias") porque blanco sobre coral da 4.17:1 y falla AA. role="region" aria-label="Aviso de urgencias".
- Creado src/components/layout/navbar.tsx ("use client"): sticky top-0 z-50; estado scrolled con listener pasivo + requestAnimationFrame y cleanup en useEffect return (>8px → bg-background/85 backdrop-blur-xl border-b shadow-sm, si no bg-transparent); IntersectionObserver con rootMargin "-40% 0px -55% 0px" que setea aria-current="true" en la sección visible; logo <a href="#inicio" aria-label="LONGIVET — ir al inicio">; nav desktop píldoras h-11 con navLinks; CTA "Agendar cita" teal h-11 rounded-full con CalendarCheck → #agendar; móvil: botón hamburguesa 48px (aria-expanded, aria-controls="menu-movil") que abre Sheet side="right" (shadcn) con SheetTitle/SheetDescription sr-only en español, enlaces h-12 text-lg con ChevronRight separados por divide-y, y 2 botones apilados ("Agendar cita" teal + "Llamar urgencias 24/7" outline coral con texto brand-coral-dark por AA); todos los enlaces internos usan SheetClose asChild → el sheet cierra al navegar; safe-area en el footer del sheet.
- Creado src/components/layout/mobile-sticky-bar.tsx: nav fixed bottom-0 z-40 md:hidden aria-label="Acciones rápidas"; grid-cols-3 bg-card/95 backdrop-blur-lg border-t pb-[env(safe-area-inset-bottom)]; 3 acciones min-h-14 (56px) icono+label text-[11px]: Llamar (tel, Phone, brand-navy), WhatsApp (site.whatsappHref target _blank rel noopener, glifo WhatsApp inline SVG, brand-emerald), Agendar (#agendar, CalendarCheck, pastilla full-height bg-secondary); aria-labels descriptivos por enlace.
- Creado src/components/layout/footer.tsx ("use client", por el mini-form con useToast): patrón triangular claro→oscuro con capas absolutas clip-path polygon (brand-navy 82/66%, teal 56/42%, teal-soft 30/18%, sand 13/5% sobre base brand-navy-deep) ocultas en móvil (fondo sólido brand-navy-deep); decoración: LogoMark gigante rotado opacity-5 a la derecha + patron-puntos text-white/10 acotado con clip-path, ambos aria-hidden y pointer-events-none; grid md:grid-cols-2 lg:grid-cols-12 gap-10 py-14 (en md de 768px, 12 columnas con gap-10 dejaban celdas de ~86px: se apila a 2 columnas y los col-span se aplican solo desde lg); col1 (lg:col-span-4): texto brand-navy sobre panel brand-sand/95 rounded-3xl translúcido (blindaje AA también en ultrawide, donde las bandas % de viewport se desalinean del contenedor max-w-7xl), doble Logo según breakpoint (light en móvil / dark en md+), misión geriátrica y badges pill «Fear Free», «Certificación AHTA», «+12 años»; cols 2-3 (lg:col-span-2): h3 Servicios/Explora con enlaces min-h-11, text-white/90, subrayado animado (after: scale-x) y focus-visible:outline-white; col4 (lg:col-span-4): contacto con MapPin/Phone/Mail/WhatsappIcon (iconos text-brand-gold), horarios de site.hours, 3 botones circulares size-11 (44px) outline blanco Facebook/Instagram/Music2 con aria-label + "(se abre en una pestaña nueva)", mini-form boletín (label sr-only, Input email h-11 rounded-full, botón Suscribirme bg-brand-gold text-brand-navy AA sobre fondo navy) que hace preventDefault y dispara toast useToast "¡Gracias! / Te avisaremos de novedades..."; barra inferior border-t border-white/15 flex-col sm:flex-row con © 2026, enlaces legales href="#" con aria-label y "Hecho con ♥" (Heart fill-rose-300 por contraste sobre navy).
- Editado SOLO un string en src/components/ui/sheet.tsx: sr-only "Close" → "Cerrar" (contrato de texto accesible 100% en español; sin cambios de lógica).
- Ejecuté `bun run lint` (eslint .): 0 errores y 0 warnings en todo el proyecto. `tsc --noEmit` no reporta errores en src/ (los 4 existentes están en examples/ y skills/, andamiaje ajeno).
Stage Summary:
- Archivos creados: src/components/layout/crisis-bar.tsx, navbar.tsx, mobile-sticky-bar.tsx, footer.tsx (+1 string en ui/sheet.tsx).
- Exports: `CrisisBar`, `Navbar`, `MobileStickyBar`, `Footer` (todos sin props); además `WhatsappIcon({className})` exportado desde mobile-sticky-bar.tsx y reutilizado en el footer.
- Decisiones de AA documentadas: (1) banda teal del footer usa brand-teal-dark porque blanco sobre brand-teal = 3.3:1 (falla AA); (2) col.1 clara usa panel sand translúcido para blindar contraste del texto navy a cualquier ancho; (3) teléfono del cintillo va en pastilla blanca/coral-dark; (4) botón "Suscribirme" en brand-gold (blanco sobre teal también fallaba); (5) grid del pie md:grid-cols-2 → lg:grid-cols-12 por columnas de ~86px en 768px.
- PARA ENSAMBLAR page.tsx/layout: orden recomendado <CrisisBar/> justo antes de <Navbar/> (el cintillo fluye, la navbar es sticky y queda arriba al hacer scroll); <MobileStickyBar/> al final del body; el main necesita padding inferior en móvil para no quedar tapado (p. ej. pb-20 md:pb-0 o un spacer h-20 md:hidden, porque la barra mide ~68px + safe-area); la navbar/observer asume que existen las secciones #inicio #servicios #galeria #programa-senior #equipo #faq y el CTA apunta a #agendar.
- Sin scroll horizontal (clip-path en capas absolutas dentro de overflow-hidden); prefers-reduced-motion respetado vía globals.css; sin hex crudo: todo con tokens de marca.

---
Task ID: 2-d
Agent: full-stack-developer
Task: Módulo «Agendar cita» — asistente multipaso (4 pasos) + API real con Prisma.

Work Log:
- Creado src/lib/booking.ts (compartido cliente/servidor, sin db ni SDK): services (6 con id/label/desc/priceHint, sin iconos), vets (4), morningSlots/afternoonSlots, appointmentSchema (zod v4 con mensajes es-CR), AppointmentInput, formatFechaLarga (es-CR, UTC-safe, documentado solo-cliente) y generarCodigo (LV-XXXXXX de A-Z2-9 vía crypto, solo-servidor).
- Creado GET /api/availability: valida formato YYYY-MM-DD y fechas pasadas (hoy via America/Costa_Rica + en-CA); domingo → { ok, closed: true, taken: [] }; consulta Prisma appointments con status ≠ CANCELADA → taken: string[]; try/catch → 500. force-dynamic.
- Creado POST /api/appointments: safeParse con mapeo issues → fieldErrors (400); verificación de franja libre (findUnique date_timeSlot) → 409 con mensaje exacto; crea con status CONFIRMADA y code generarCodigo() con reintento 3x ante colisión P2002 de code (detecta meta.target); si la franja existía CANCELADA reutiliza el registro (update) por la restricción única; carrera concurrente P2002 de date/timeSlot → 409. Devuelve 201 { ok, code, appointment }.
- Creado src/components/booking/booking-section.tsx ("use client"): sección #agendar con panel sticky (card bg-primary con pasos post-reserva BadgeCheck/MessageCircle/CalendarClock, nota de urgencia con Siren + tel emergencyPhoneHref, enlaces rápidos tel/WhatsApp) y asistente en card lg:col-span-3.
- Asistente: header ol de 4 pasos (círculos 40px con estados actual/teal, completado/navy+Check, pendiente/muted), aria-live sr-only "Paso X de 4", progressbar con aria-valuenow y fill bg-brand-teal; transiciones framer-motion con MotionConfig reducedMotion="user".
- Paso 1: petName, species radio-cards (Dog/Cat/PawPrint, has-[:checked]), raza, edad (select → number|null) y selector de servicio en radio-cards con pill de precio (md:2 cols). Paso 2: vets radio-cards sm:2 cols con avatar gradiente navy→teal e iniciales. Paso 3: 21 chips de día (scroll-x, snap, scrollbar-fina, domingos disabled+aria-disabled+title, activo aria-pressed bg-brand-navy) + fetch availability (fetch relativa, no-store) con skeletons, grupos Mañana/Tarde (grid-cols-4, 48px, ocupados disabled+line-through+title, seleccionado bg-brand-teal), mensaje domingos con Info y error con botón Reintentar. Paso 4: tutorName/email/phone/notes con contador, Checkbox consent, resumen bg-brand-sand (dl) y submit h-12 bg-brand-teal con Loader2.
- Validación por paso manual (mensajes es-CR inline aria-invalid+aria-describedby); Enter en pasos 1-3 solo avanza (form onSubmit preventDefault); 409 → toast sonner + salto a paso 3 + refresco de availability; 400 → fieldErrors marcados; fallo red → toast genérico.
- Éxito: reemplazo con framer-motion (círculo emerald/15, Check con pathLength animado, h3 con primer nombre, pill código bg-brand-navy font-mono, dl con formatFechaLarga, botones WhatsApp wa.me prellenado y "Agendar otra cita" con reset total). Hidratación segura: días generados en useEffect post-mount; formatFechaLarga solo tras interacción.
- FIX INCIDENTAL (fuera de alcance pero bloqueante): typo preexistente en src/app/globals.css línea 193 — `. patron-puntos` con espacio rompía el parseo CSS y devolvía 500 en TODAS las rutas; corregido a `.patron-puntos`. (Turbopack mantuvo el error cacheado hasta un cambio real de contenido.)
- Verificado: bun run lint limpio, tsc --noEmit sin errores en mis archivos, suite curl de ambos endpoints (400/200 closed/201/409/taken) y limpieza de la cita de prueba (DB quedó sin filas de test).

Stage Summary:
- Endpoints: GET /api/availability?date=YYYY-MM-DD → 400 | { ok, closed, taken[] } ; POST /api/appointments → 201 { ok, code, appointment{date,timeSlot,service,petName,tutorName} } | 400 { ok, error:'Datos inválidos', fieldErrors } | 409 { ok, error } | 500 { ok, error }.
- Contrato del asistente: src/components/booking/booking-section.tsx exporta default BookingSection (client component) — importarlo en page.tsx dentro del layout de secciones; requiere <Toaster/> de sonner ya montado en el layout raíz.
- API de disponibilidad: franjas = timeSlotsAm/Pm de site.ts = morningSlots/afternoonSlots de booking.ts (idénticas). Domingo cerrado. Slots ocupados = appointments con status ≠ CANCELADA para ese date.
- Código de confirmación: LV-XXXXXX (A-Z, 2-9, sin 0/1), único; colisión → retry 3x. Reglas de la 409: el mensaje exacto es "Lo sentimos, esa franja acaba de ser reservada. Elige otro horario."
- globals.css: REGLA para todos los agentes — el selector de utilidad `.patron-puntos` ya está corregido; no reescribir el archivo con versiones viejas en cache/edición concurrente (validar con curl antes de commit).

---
Task ID: 3 (orquestador)
Agent: Z.ai Code (orquestador principal)
Task: Componentes propios, ensamblado de page.tsx y verificación E2E completa.

Work Log:
- Creado src/components/brand/logo.tsx (LogoMark + Logo con tone dark/light).
- Creado Reveal (framer-motion, respeta prefers-reduced-motion) y 8 secciones: hero.tsx (dual-path Hick, tarjetas flotantes, micro-stats), stats-strip.tsx (banda navy), services.tsx (8 tarjetas, geriatria destacada), senior-program.tsx (criterios senior + 3 planes con destacadado), triage.tsx (8 síntomas, veredicto crítico/moderado con aria-live y role=alert), team.tsx (E-E-A-T con cédulas), testimonials.tsx (banda navy), contact.tsx (info + Maps/Waze + tarjeta urgencias).
- Ensambblado src/app/page.tsx: CrisisBar → Navbar → main (Hero, Stats, Services, Gallery, SeniorProgram, Triage, Team, Testimonials, FAQ, Booking, Contact) → Footer → spacer 76px móvil → MobileStickyBar. min-h-screen flex-col para footer pegado abajo.
- Regeneradas las 7 imágenes IA en foreground (CLI whitelist: hero a 1344x768). public/images/README.md documenta cómo el cliente reemplaza las fotos sin tocar código.
- Correcciones: keyframes floaty movidos a globals.css (style jsx no válido en RSC); typo desticado→eliminado en senior-program; guión suave invisible en contact; hero Image 1344x768.
- Verificación agent-browser (desktop 1280/1440 + móvil 375):
  * Título y meta correctos; cero errores de consola; cero errores en dev.log (solo EADDRINUSE de intento duplicado de arranque).
  * Triage: crítico → role=alert "Riesgo vital"; moderado → tarjeta ámbar "Requiere evaluación en 24h". ✓
  * FAQ: búsqueda "artritis" → 2/24; categoría Urgencias → 4/24; combinadas → 0 con estado vacío disponible; limpiar búsqueda funciona. ✓
  * Booking E2E: paso 1 (Rocko/perro/10–12/geriatria) → paso 2 (Dra. Solís) → paso 3 (domingos disabled, availability en vivo) → paso 4 → confirmación → código LV-K6T86A en pantalla y fila CONFIRMADA en SQLite con todos los campos correctos. Repost sin ageYears → 400 con fieldErrors (zod OK). Availability reflejó "taken":["09:00"]. DB limpiada tras la prueba.
  * Móvil 375px: barra sticky con 3 targets, sin overflow horizontal, Sheet con 6 enlaces + 2 CTAs, footer sólido navy #092a4a, spacer evita tapar contenido.
  * Footer desktop 1440: bandas triangulares sand → teal-soft → teal-dark → navy → navy-deep con contraste AA por zona, pata gigante watermark, boletín dorado.
Stage Summary:
- SITIO 100% FUNCIONAL Y VERIFICADO EN NAVEGADOR (desktop + móvil). Lista para reemplazo de imágenes por el cliente (mismos nombres en /public/images/).
- Sin errores de lint ni runtime. El servidor dev quedó corriendo en el puerto 3000.
- Sugerencias siguientes (para cron webDevReview): modo oscuro con toggle (tokens ya listos), testimonios en marquee, blog senior, internacionalización EN, fotos reales del cliente.

---
Task ID: cron-2026-09-10-0335
Agent: Z.ai Code (webDevReview ronda 2)
Task: QA general + modo oscuro + detalles UX + sección Recursos.

Work Log:
- QA inicial: HTTP 200, 0 errores de página/consola, dev.log limpio (solo EADDRINUSE histórico), APIs respondiendo.
- MODO OSCURO: creado theme-provider.tsx (next-themes, attribute=class, default light, disableTransitionOnChange) y theme-toggle.tsx (iconos Sun/Moon intercambiados por CSS → sin estado de montaje, sin desajuste de hidratación, cumple regla react-hooks/set-state-in-effect). Integrado en Navbar desktop (junto al CTA) y en el Sheet móvil (fila «Apariencia del sitio»). Logo adaptado con dark:text-foreground. Tokens dark ya existían.
- Ajuste dark: Testimonials ahora bg-primary dark:bg-brand-navy (el teal saturado de dark era demasiado intenso para una banda de texto largo; navy mantiene solemnidad).
- UX DETAILS (src/components/layout/ux-details.tsx): ScrollProgress (barra 4px gradiente teal→gold, rAF+passive, aria-hidden) y BackToTop (aparece a los 600px, bottom adaptado por breakpoint para no chocar con barra móvil). Montados en page.tsx.
- CONTADORES ANIMADOS: stats-strip convertido a client con framer-motion animate + useInView(once). Formato normalizado a punto de miles tico («8.500» — CLDR es-CR usa espacio fino y se corrige). Texto accesible equivalente en sr-only para lectores de pantalla.
- SECCIÓN RECURSOS (#recursos, entre Testimonios y FAQ): 3 guías clínicas expandibles (señales de dolor felino, adaptación de casa para artrosis, escala de calidad de vida HHHHHM) con tag, tiempo de lectura, lista práctica y CTA WhatsApp. Accordion accesible (verificado data-state=open y contenido). Añade E-E-A-T y valor SEO.
- Pulido hero: decorativos reposicionados fuera del borde de la imagen con /80 (evitaba el «rectángulo blanco» asomando).
- Verificación agent-browser: dark hero/booking/FAQ correctos (colores computados validados: muted #9db0c0, foreground #e6edf3), contadores «+12 | 8.500+ | 94 % | 5» tras animación, menú móvil con toggle, sin overflow, lint 0 errores.
Stage Summary:
- NUEVO: modo oscuro completo con persistencia, ScrollProgress, BackToTop, contadores animados, sección #recursos con 3 guías reales.
- El sitio mantiene QA verde en light y dark, desktop y móvil.
- Riesgos/pendientes sugeridos para próxima ronda: revisar galería en dark (overlay ya ok visualmente pero no se capturó de cerca), considera añadir «Recursos» al nav si crece, fotos reales del cliente siguen pendientes (README en /public/images), OGA image width/height en layout dicen 1440x720 y el archivo real es 1344x768 (corregir al subir las fotos definitivas).

---

Task ID: 5-b
Agent: full-stack-developer
Task: (1) Preselección de servicio desde tarjetas de #servicios hacia el asistente de reserva; (2) Triage → «Enviar resumen por WhatsApp»; (3) Badge en vivo «Abierto ahora / Cerrado» en contacto y footer.

Work Log:
- Leído worklog.md (contrato de diseño/tokens), site.ts, booking.ts, services.tsx, triage.tsx, contact.tsx, booking-section.tsx (completo), footer.tsx y globals.css antes de programar.
- src/lib/booking.ts: añadidos `ServicioReservableId` (type = union de ids de `services`), `serviceMapFromCatalog` (Readonly<Record<string, ServicioReservableId>> con los 8 títulos EXACTOS del catálogo de services.tsx → ids reservables: Geriatría y medicina senior→geriatria, Manejo del dolor y movilidad→dolor, Medicina interna→geriatria, Medicina preventiva→preventivo, Diagnóstico por imagen→diagnostico, Laboratorio clínico→diagnostico, Odontología veterinaria→odontologia, Cuidado paliativo y duelo→paliativo), helper `servicioReservableDeCatalogo(titulo)` (null-safe) y `EVENTO_PRESELECCION_SERVICIO = "longivet:preseleccionar-servicio"`.
- services.tsx: convertido a "use client" (necesario para dispatch). El enlace «Agendar» de cada tarjeta sigue siendo <a href="#agendar"> (semántica/teclado/scroll suave nativo) y añade onClick que dispara `window.dispatchEvent(new CustomEvent("longivet:preseleccionar-servicio", { detail: { serviceId } }))` SOLO si hay mapeo. aria-label dinámico «Agendar {título en minúsculas} y continuar con la reserva». Target táctil subido a min-h-[44px].
- booking-section.tsx: (a) importado EVENTO_PRESELECCION_SERVICIO; (b) nuevo estado `servicioDestacado`; (c) useEffect [] con listener de window que: valida el id contra `services` (desconocido → ignora), setConfirmacion(null) si había confirmación en pantalla, setPaso(1), setErrores({}), setForm prev.service = id, setServicioDestacado(id) y `toast.success("Servicio seleccionado: {label} — continúa con tu reserva", { description: "Revisa los datos de tu mascota y elige el día de tu cita." })`; cleanup con removeEventListener al desmontar. (d) useEffect sobre servicioDestacado con setTimeout 2200 ms para apagar el destello (limpia su timer). (e) La radio-card del servicio en el paso 1 recibe `border-brand-teal bg-brand-teal-soft ring-2 ring-brand-teal ring-offset-2 ring-offset-card` mientras está destacada (~2 s). No hay scroll manual: lo hace el ancla + scroll-behavior smooth (el scrollIntoView existente de tarjetaRef queda intacto).
- FIX nec (bloqueante, dentro de booking-section.tsx): el layout solo monta el Toaster de RADIX (ui/toaster, para useToast del footer); los toasts de sonner que ya emitía el asistente (409, éxito) NO se veían. Monté `<Toaster />` de ui/sonner dentro de BookingSection (`position="top-center" closeButton`), theme-aware vía next-themes. Así se ve el toast de preselección y quedan reparados los toasts preexistentes de sonner.
- triage.tsx: helper puro `construirResumenWhatsApp(seleccion, textoVeredicto)` → texto plano «Hola LONGIVET, hice el triaje en su web para mi mascota. Signos marcados: {lista en minúscula inicial, separada por comas}. Orientación del triaje: {texto del veredicto} ¿Me pueden orientar?» (sin nombre de mascota, por privacidad). `whatsappResumenHref` en useMemo ([seleccion, veredicto]) → `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(...)}`. Nuevo botón/enlace h-12 (48px) «Enviar resumen por WhatsApp» (MessageCircle, target _blank, rel noopener noreferrer, aria-label con aviso de pestaña nueva) en AMBOS veredictos: en crítico queda como secundario tras «Llamar urgencias ya» (que sigue siendo primario) + microcopy «Si estás en camino, escríbenos: … la llamada sigue siendo la vía más rápida.»; en moderado acompaña a «Agendar consulta» (flex-col sm:flex-row, ambos flex-1). El genérico «Guía por WhatsApp» (whatsappHref) del crítico fue REEMPLAZADO por este resumen (evita dos botones de WhatsApp). Los botones solo existen con veredicto; sin veredicto el href useMemo devuelve "" y no se renderiza nada (hydration-safe: veredicto inicial = null).
- src/lib/horario.ts (nuevo): función pura `estadoHorario(now: Date): EstadoHorario` (+ tipos `ModoHorario` "abierto"|"guardia"|"cerrado", interface { abierto, modo, etiqueta, detalle }). Zona America/Costa_Rica con patrón en-CA (fecha YYYY-MM-DD → getUTCDay, igual que generarDias del booking) + Intl en-GB hourCycle h23 para hora/minuto. Lógica: lun–vie 8:00–18:00 y sáb 9:00–14:00 → abierto («Abierto ahora», detalle «Cerramos hoy a las 6:00 p. m./2:00 p. m. · Urgencias por teléfono las 24 h.»); domingo → abierto:false, modo "guardia", etiqueta «Guardia telefónica activa» (ámbar); fuera de franja → «Cerrado · abre {hoy|mañana|lunes|sábado} {hora}» con `proximaApertura()`. Horarios espejados en constantes documentadas (APERTURA_LUN_VIE/CIERRE_LUN_VIE/APERTURA_SAB/CIERRE_SAB) porque site.hours guarda texto de presentación no computable — comentario de mantenimiento vinculado a site.hours.
- src/components/sections/open-now-badge.tsx (nuevo, "use client", export `OpenNowBadge({className})`): render inicial = esqueleto neutro aria-hidden (mismo tamaño, sin Date); en useEffect calcula estado + setInterval 60 s (limpia interval). Pill h-8 rounded-full border px-3 text-xs font-semibold: dot verde brand-emerald animate-pulse (abierto), ámbar brand-gold estático (guardia), rojo suave destructive/70 (cerrado); role="status" + aria-live="polite" anuncian cambios; title + sr-only con el detalle completo; truncate + max-w-full contra overflow en móviles.
- contact.tsx: OpenNowBadge montado en el h3 «Horarios de consulta» (h3 ahora flex flex-wrap; badge con ml-auto, wrap limpio en móvil). contact.tsx sigue siendo RSC (import de un client component es válido).
- footer.tsx: OpenNowBadge en la columna 4, fila propia sobre el heading HORARIOS (div flex flex-wrap items-center justify-between). Override className="border-white/30 bg-white/10 text-white" (tailwind-merge lo deja ganar) para AA sobre el navy del pie; también viste el esqueleto inicial.
- Hidratación revisada: cero Date/new Date() en render inicial de servidor; los únicos usos están dentro de useEffect (badge) o tras interacción (formatFechaLarga). Verificado en SSR HTML: 8 aria-labels nuevos, 4 trazas de skeleton (2 badges × 2), 0 ocurrencias de «Enviar resumen por WhatsApp» ni «Guardia telefónica activa» (aparecen solo en cliente).
- Verificación: `bun run lint` 0 errores/0 warnings; `bunx tsc --noEmit` sin errores en src/ (único error preexistente en skills/, andamiaje ajeno); GET / → 200 y dev.log limpio (solo compiles).

Stage Summary:
- CONTRATO DEL EVENTO (fuente: src/lib/booking.ts): nombre `EVENTO_PRESELECCION_SERVICIO = "longivet:preseleccionar-servicio"`; `CustomEvent<{ serviceId: ServicioReservableId }>`; emisor: enlace «Agendar» de cada tarjeta de services.tsx; consumidor único: useEffect de booking-section.tsx (paso 1 + form.service + toast sonner + ring 2.2 s). Si se agregan tarjetas al catálogo, añadir su título a `serviceMapFromCatalog` (títulos EXACTOS, documentado con warning en booking.ts).
- EXPORTS nuevos: booking.ts → `ServicioReservableId`, `serviceMapFromCatalog`, `servicioReservableDeCatalogo`, `EVENTO_PRESELECCION_SERVICIO`; horario.ts → `ModoHorario`, `EstadoHorario`, `estadoHorario(now)`; open-now-badge.tsx → `OpenNowBadge` (client, prop opcional className; montado en contact.tsx y footer.tsx — reutilizable en cualquier parte).
- IMPORTANTE: los toasts de sonner requieren el <Toaster/> de ui/sonner; ahora está montado dentro de BookingSection (el layout sigue montando el de radix para useToast del footer). Cualquier otro componente que quiera usar `toast()` de sonner funcionará porque BookingSection está siempre presente en "/".
- Mensaje exacto del toast de preselección: «Servicio seleccionado: {label} — continúa con tu reserva». Mensaje exacto del WhatsApp de triaje: «Hola LONGIVET, hice el triaje en su web para mi mascota. Signos marcados: {…}. Orientación del triaje: {…} ¿Me pueden orientar?» → wa.me/50688887654 (site.whatsappNumber).
- En crítico el orden/ jerarquía queda: (1) Llamar urgencias ya (bg-brand-coral), (2) Enviar resumen por WhatsApp (outline coral) + microcopy «Si estás en camino, escríbenos…» — WhatsApp nunca es la única vía.
- OpenNowBadge: refresco 60 s; estados/tonos verde pulsante · ámbar guardia (solo domingo) · rojo suave; aria-live="polite"; skeleton hasta el primer effect (cero mismatch). Horarios fuente: site.hours (lun–vie 8:00–18:00, sáb 9:00–14:00, dom guardia), espejados en horario.ts con comentario de mantenimiento.

---
Task ID: 5-a
Agent: frontend-styling-expert
Task: Lightbox fullscreen para la galería (#galeria) + testimonios en marquee infinito + botón flotante de WhatsApp (escritorio).

Work Log:
- Leído worklog.md (contrato de diseño/tokens/AA), globals.css, showcase-gallery.tsx, testimonials.tsx, reveal.tsx, page.tsx, site.ts, ux-details.tsx y mobile-sticky-bar.tsx antes de programar.
- LIGHTBOX (showcase-gallery.tsx): nuevo estado lightboxOpen + refs (expandButtonRef/closeButtonRef/dialogRef/draggingRef). Se abre con click/tap sobre la diapositiva activa (onClick + guard draggingRef para ignorar el click sintetizado tras un swipe) y con botón explícito «Ampliar imagen» (Maximize2, aria-label «Ampliar imagen: {título}», aria-haspopup="dialog", absolute top-4 right-4 z-30, size-11→sm:size-12, opacity-0 que aparece con group-hover/viewer y SIEMPRE con focus-visible). Render vía createPortal a document.body protegido con `typeof document === "undefined" ? null : …` (en SSR no renderiza nada → verificado: 0 apariciones de role="dialog" en el HTML del servidor; al estar cerrado el portal queda vacío → sin desajuste de hidratación).
- Lightbox UI: overlay fixed inset-0 z-[90] bg-brand-navy-deep/95 backdrop-blur-md; role="dialog" aria-modal="true" aria-label «Imagen ampliada: {título}»; contenido interior con fade + scale 0.96→1 (framer-motion, duration 0 con reducedMotion reutilizando el hook useSyncExternalStore ya existente); imagen next/image fill sizes="100vw" object-contain; contador «n de 6» (tabular-nums + sr-only "Imagen"); caption abajo con aria-live="polite" (tag dorado brand-gold + título + descripción); prev/next ChevronLeft/Right size-12 (48 px) también visibles en móvil; cerrar X size-12 aria-label «Cerrar imagen ampliada»; clic en el fondo cierra (capa absolute + pointer-events-none en el layout salvo controles).
- Teclado y foco: listener global de keydown montado SOLO mientras lightboxOpen (Esc cierra, ←/→ navegan, con preventDefault); al abrir, foco al botón cerrar (useEffect [lightboxOpen]); focus trap simple en onKeyDown del dialogo (Tab/Shift+Tab cicla entre los botones del lightbox vía querySelectorAll("button:not([disabled])")); al cerrar, el foco vuelve al botón «Ampliar imagen» (expandButtonRef.focus() dentro de closeLightbox).
- Scroll lock: overflow="hidden" en document.body con restauración del valor previo en el cleanup (solo con lightboxOpen).
- Autoplay: la condición autoplayOn ahora incluye && !lightboxOpen → la barra de progreso se congela y al cerrar retoma el ciclo restante (misma lógica mid-cycle existente).
- Móvil en lightbox: drag (ambos ejes) con dragConstraints 0 y dragElastic 0.25; swipe vertical >96 px cierra, horizontal >60 px navega (handleLightboxDragEnd); drag desactivado con reducedMotion. El slide del visor ganó cursor-zoom-in, onDragStart y onClick.
- TESTIMONIOS (testimonials.tsx reescrito, ahora "use client"): banda bg-primary dark:bg-brand-navy, kicker 4,9/5 y título intactos + hint «Pasa el cursor o el foco sobre las historias para pausarlas». 6 testimonios (se conservan los 3 originales y se suman: Bruno · schnauzer 14 con enfermedad renal — Familia Solano; Miko · siamés 12 con hipertiroidismo — Ivannia G.; Dulce · cocker 9 con otitis crónica/dental — Randall y Priscila), tono cálido es-CR. Marquee: pista única flex w-max animate-marquee con DOS listas idénticas (ul flex gap-6 pr-6 cada una → el padding-right hace que -50 % = exactamente un juego = bucle sin salto), cards w-[22rem] max-w-[85vw] shrink-0 con el mismo estilo (bg-white/[0.07] ring-white/15, Quote dorado, estrellas role="img", cita, nombre, mascota·edad); segunda lista aria-hidden="true"; bordes difuminados con [mask-image:linear-gradient(...)] y bleed -mx-4 sm:-mx-6. Pausa con hover:[animation-play-state:paused] y focus-within:[animation-play-state:paused]. prefers-reduced-motion detectado SSR-safe con useSyncExternalStore (server snapshot false → sin mismatch) → renderiza grid estático grid md:grid-cols-3 con Reveal, sin marquee.
- globals.css: añadidos a @layer utilities (mismo patrón que @keyframes floaty) `.animate-marquee { animation: marquee 40s linear infinite; }` + @keyframes marquee { from translateX(0) → to translateX(-50%) }. Verificado en el CSS servido: keyframes, utility y las variantes play-state compilan.
- WHATSAPP FLOTANTE (nuevo src/components/layout/floating-whatsapp.tsx, "use client", export FloatingWhatsapp): a fija h-14 (56 px) bottom-6 right-6 z-40 hidden md:flex, bg-[#25d366] (único hex arbitrario, permitido por la tarea) con icono+texto en text-brand-navy-deep, sombra xl + ring sutil; aparece tras 500 px de scroll (listener pasivo + rAF, mismo patrón de ux-details) con AnimatePresence (opacity/y/scale); pill expandible al hover Y al foco (max-w-14 → max-w-[17rem] con transition-[max-width,...], texto «¿Consultamos tu caso?» con opacity retardada, whitespace-nowrap, overflow-hidden); href=site.whatsappHref target _blank rel noopener noreferrer; aria-label «Escríbenos por WhatsApp (se abre en una pestaña nueva)»; reutiliza WhatsappIcon de mobile-sticky-bar. En móvil no se monta visualmente (MobileStickyBar ya cubre WhatsApp).
- COLISIÓN RESUELTA: BackToTop (ux-details.tsx) estaba en md:bottom-6 md:right-6 = misma esquina que el nuevo botón. Edité UNA clase: md:bottom-6 → md:bottom-24, quedando en escritorio WhatsApp abajo (24–80 px) y BackToTop encima (96–140 px, 16 px de aire); en móvil BackToTop sigue en bottom-[5.5rem] right-4 sin conflicto (WhatsApp es hidden).
- page.tsx: SOLO import de FloatingWhatsapp + etiqueta <FloatingWhatsapp /> junto a <BackToTop /> (con comentario).
- Verificación sin navegador: bun run lint → 0 errores/0 warnings; tsc --noEmit sin errores en src/; curl / → HTTP 200 con compilación limpia y dev.log sin errores; en el HTML SSR constatan: animate-marquee, botón «Ampliar imagen», 6 testimonios (cada nombre ×2 por la pista duplicada), aria-label de WhatsApp; role="dialog" NO aparece en SSR (portal correcto).
Stage Summary:
- EXPORTS: src/components/layout/floating-whatsapp.tsx → FloatingWhatsapp (sin props). showcase-gallery.tsx sigue exportando default ShowcaseGallery y testimonials.tsx export Testimonials (firmas sin cambios; testimonials ahora es "use client").
- Archivos tocados: src/components/gallery/showcase-gallery.tsx (lightbox + botón ampliar + guard de drag), src/components/sections/testimonials.tsx (reescrito marquee), src/app/globals.css (+utility animate-marquee + @keyframes marquee), src/components/layout/floating-whatsapp.tsx (nuevo), src/components/layout/ux-details.tsx (1 clase: BackToTop md:bottom-24), src/app/page.tsx (1 import + 1 etiqueta).
- Decisiones AA: (1) blanco sobre #25d366 da 1.97:1 → icono/texto del botón WhatsApp en brand-navy-deep = 7.4:1 (el hex #25d366 es el permitido por la tarea como verde de marca); (2) botón «Ampliar imagen» opacity-0 pero focus-visible:opacity-100 y target ≥44 px; (3) lightbox con aria-modal + focus trap + foco inicial en «Cerrar» + retorno de foco; (4) marquee: lista original legible, duplicada aria-hidden, pausa por hover y foco, y grid estático de 3 columnas bajo prefers-reduced-motion (SSR-safe, sin mismatch); (5) listeners de teclado del lightbox solo existen con el diálogo abierto; (6) scroll del body bloqueado/restaurado.
- Nota de hidratación: el único acceso a document en render está protegido por typeof document; los estados de scroll/matchMedia arrancan en false y se resuelven post-hidratación (idéntico a BackToTop/galería previos).
- QA visual pendiente del orquestador: probar lightbox (abrir por botón y por click en imagen, Esc/←/→, Tab cicla, swipe vertical cierra, autoplay reanuda al cerrar) y el pill de WhatsApp al hover/foco; verificar que BackToTop en desktop quedó legible sobre el botón verde.

---

Task ID: cron-2026-09-10-0343 (ronda 3, orquestador)
Agent: Z.ai Code (webDevReview + QA + fixes AA)
Task: QA integral con agent-browser (desktop/móvil/dark), corrección de bugs de accesibilidad/contraste y verificación E2E de las mejoras 5-a/5-b.

Work Log:
- QA inicial: HTTP 200, 0 errores de consola, dev.log limpio, 10 secciones ancla presentes con alturas sanas; lint 0 errores.
- FIX metadata: openGraph image dims 1440x720 → 1344x768 (el archivo real; riesgo pendiente del worklog anterior).
- FIX DARK GALERÍA (bug confirmado del worklog previo): bg-brand-sand sin variante dark dejaba texto muted-oscuro sobre arena ilegible → dark:bg-card en la sección, dark:bg-accent en el kicker, dark:text-foreground en el h2, dark:opacity en miniaturas. Verificado en navegador.
- FIX AA «flip de --primary en dark» (teal #2a9d8f + blanco = 3.3:1): bandas/paneles grandes → dark:bg-brand-navy en booking-section (panel sticky), senior-program (plan destacado), stats-strip (banda). Chip activo del FAQ → dark:bg-brand-teal-dark + white (5.15:1).
- FIX AA botones teal+blanco (3.3:1) → brand-teal-dark (5.15:1 con hover a brand-teal, patrón ya documentado): ui/button.tsx variante default (global, dark), navbar CTA desktop/Sheet, hero CTA principal, mobile-sticky-bar pastilla Agendar, submit del wizard, «Confirmar por WhatsApp», pasos/slots activos, badge «Nuestra especialidad», hovers de botones outline en senior-program y triage.
- VERIFICADO EN NAVEGADOR (5-a): lightbox abre por botón «Ampliar imagen» y click en slide; «2 de 6» → ArrowRight → «3 de 6»; Esc cierra, body overflow restaurado, foco devuelto al botón originador; caption dorada + contador + prev/next 48px; autoplay pausado con lightbox abierto. Marquee de testimonios: 2 pistas (duplicada aria-hidden), 6 historias ×2, movimiento verificado con 2 capturas, pausa hover/focus, microcopy visible; en reduced-motion grid estático. WhatsApp flotante: aparece tras 500px, 56px bottom-6 right-6, BackToTop movido a md:bottom-24 (sin solape, cajas verificadas); en móvil display:none.
- VERIFICADO EN NAVEGADOR (5-b): preselección — click en «Agendar manejo del dolor…» de #servicios → scroll a #agendar + toast sonner «Servicio seleccionado: Manejo del dolor y movilidad…» + radio value="dolor" checked (serviceMapFromCatalog + CustomEvent longivet:preseleccionar-servicio). Triage — veredicto moderado + enlace wa.me/50688887654?text=… con signos y veredicto prellenados (en crítico la llamada sigue siendo primaria). OpenNowBadge — «Abierto ahora. Cerramos hoy a las 6:00 p. m.» a las mié 2:11 p. m. CR, montado en contacto y footer, interval 60s, hydration-safe.
- Móvil 375px: crisis bar compacta sin overflow, CTA teal-dark, barra sticky 69px, WhatsApp flotante oculto (hidden md:flex), lightbox/marquee operativos.
- Estado final: lint 0, consola 0 errores, DB con 0 filas (sin basura de prueba), servidor 200.

Stage Summary:
- El sitio pasa QA en light/dark × desktop/móvil. Accesibilidad AA reforzada: ya NO existe texto blanco sobre brand-teal claro en ningún CTA (regla: blanco solo sobre brand-teal-dark #1f7a70, brand-navy o más oscuros).
- Contrato actualizado para futuros agentes: en dark, primary=teal → NUNCA uses bg-primary con texto blanco pequeño sin dark:bg-brand-navy o dark:bg-brand-teal-dark; los botones shadcn default ya lo resuelven globalmente.
- Nuevos artefactos: lightbox portal en showcase-gallery, marquee en testimonials (+keyframes en globals.css), floating-whatsapp.tsx, horario.ts + open-now-badge.tsx, serviceMapFromCatalog/EVENTO_PRESELECCION_SERVICIO en booking.ts, <Toaster/> de sonner montado dentro de BookingSection (el layout solo tiene el Toaster radix — si otra sección necesita toasts sonner, montar el suyo o moverlo al layout).
- Pendientes sugeridos: fotos reales del cliente (README en /public/images), probar wizard E2E completo tras los cambios de botones (submit ahora teal-dark), valorar montar Toaster sonner en layout si crece su uso.

---

Task ID: 2 (PIVOT COMPLETO)
Agent: Orquestador principal (Z.ai Code)
Task: PIVOT del proyecto: de LONGIVET (veterinaria) a "Vecinos y Servicios · Condominio La Rueda" — guía comercial comunitaria tipo guía turística con híper-buscador, carrusel visible, FAQ, mapa del sitio y categorías predefinidas. Datos editables a mano en el código por el usuario.

Work Log:
- Reciclado: eliminados components/{booking,gallery,faq,sections,layout,brand}, src/data, lib/{site,booking,horario}.ts, api/{appointments,availability}, imágenes veterinarias.
- Fundamentos NUEVOS escritos y verificados en disco:
  * src/app/globals.css — paleta guía turística: pine #12433c (primary), teal #2a9d8f, terracotta #e76f51 (CTA), gold #e9c46a, cream #fbf7ef (fondo), ink #23312d. Colores por categoría (--cat-alimentos/-hogar/-salud/-belleza/-educacion/-mascotas/-comercio/-transporte + -soft) mapeados en @theme inline → utilidades bg-brand-*, text-brand-*, bg-cat-*, font-display (Fraunces).
  * src/app/layout.tsx — metadata es-CR (title/description/openGraph), fuentes Plus Jakarta Sans + Fraunces (--font-display), JSON-LD @graph (Organization, WebSite+SearchAction, ItemList servicios, ItemList categorías), skip-link, Toaster radix.
  * src/app/icon.svg — isotipo: libro abierto + pin de guía turística (terracotta/pine/teal/gold).
  * src/app/sitemap.ts y src/app/manifest.ts — actualizados a SITE.
  * src/lib/site-config.ts — SITE { name, community, legalName, url, tagline, description, admin{phone,whatsapp,email}, anchors[8] } + telHref(phone) + waHref(phone, msg).
  * src/lib/data/services.ts ★ARCHIVO EDITABLE POR EL USUARIO★ — CATEGORIES (8 predefinidas con icon/label/description), CATEGORY_IDS, CategoryId, CategoryFilter, CAT_CLASSES vía categoryUi(id) → { label, description, icon, classes{badge,soft,solid,text,border} }; interface ServiceListing { id, title, tagline?, category, keywords[], images[], phone, whatsapp?, schedule?, location?, description, featured? }; SERVICES = 14 anuncios ejemplo; helpers: getFeaturedServices(), getServicesByCategory(cat), categoryCounts(), getServiceById(id), searchServices(query, category) → {service,score}[] (normaliza tildes, tokens AND, pesos: título 10, keywords 7, categoría 5, tagline 4, descripción 2, bonos prefijo/inicio/exacto).
  * src/lib/data/faq.ts — FAQ_ITEMS (18 preguntas) + FAQ_CATEGORY_IDS/LABELS (general|publicar|buscar|contacto).
  * src/lib/text.ts — normalizeText, tokenize (>=2 letras), highlightParts(text, query) → HighlightPart[].
  * src/lib/search-store.ts — zustand useSearchStore { query, category, setQuery, setCategory, clear } + scrollToSection(id).
  * src/components/brand/logo.tsx — LogoMark/Logo (libro+pin, tone dark|light, compact).
  * src/components/safe-image.tsx — SafeImage (next/image + onError → /images/placeholder.svg). USO OBLIGATORIO.
  * public/images/placeholder.svg (respaldo) + public/images/README.md (instrucciones para el usuario).
  * Generación IA en background de 14 imágenes (hero-guia.png + svc-*.png) — log: /home/z/imggen2.log, marcador ALL_IMAGES_DONE.
  * prisma/schema.prisma — reset sin modelos (los datos viven en el código). DB no usada por ahora.
- Instalado: embla-carousel-autoplay (embla-carousel-react ya estaba).
- Lanzados 4 subagentes en PARALELO: 2-a shell visual, 2-b buscador+directorio, 2-c carrusel+categorías, 2-d FAQ+mapa del sitio.

Stage Summary:
- NUEVA APP: "Vecinos y Servicios · Condominio La Rueda" (una sola ruta "/" con anclas: inicio, buscador, destacados, categorías, servicios, faq, mapa, anunciate).
- Regla de oro: cero hex en componentes (tokens bg-brand-*/bg-cat-*), SafeImage siempre, copy es-CR cálido de guía vecinal, Fitts ≥44px, Miller ≤7 opciones visibles, Hick 2 CTAs, Jakob patrones familiares, prefers-reduced-motion respetado.
- CONTRATOS compartidos (NO redefinir): ServiceDialog props { service: ServiceListing|null; open: boolean; onOpenChange: (open:boolean)=>void } en src/components/site/service-dialog.tsx (agente 2-b); ServiceCard { service, priority? } en service-card.tsx (2-b); HighlightText { text, query } en highlight-text.tsx (2-b).
- Propiedad de archivos: 2-a → site/{navbar,hero,footer,announce-strip,mobile-sticky-bar}.tsx · 2-b → site/{search-section,directory-section,service-card,service-dialog,highlight-text}.tsx · 2-c → site/{service-carousel,categories-section}.tsx · 2-d → site/{faq-section,site-map-section}.tsx · Orquestador → page.tsx, layout, globals, datos, QA final.
- Pendiente orquestador: ensamblar page.tsx, lint, QA agent-browser desktop/móvil, worklog final, cron webDevReview 15 min.

---

Task ID: 2-d
Agent: frontend-styling-expert
Task: Sección FAQ (búsqueda en vivo + tabs de categoría + JSON-LD FAQPage) y Mapa del sitio (índice visual tipo guía turística con acceso directo al directorio y a las fichas).

Work Log:
- Leído worklog (sección "Task ID: 2 (PIVOT COMPLETO)"), globals.css (tokens bg-brand-*/bg-cat-*, utilidades patron-puntos/scrollbar-fina/texto-marca/animate-floaty) y contratos reales en disco: services.ts (SERVICES/CATEGORIES/categoryUi/categoryCounts/getServicesByCategory), faq.ts (18 ítems, 4 categorías), site-config.ts (SITE.anchors[8], waHref), search-store.ts (setCategory + scrollToSection), text.ts (normalizeText/tokenize) y ui/{accordion,button,badge,input}.tsx.
- Creado src/components/site/faq-section.tsx ('use client', export function FaqSection): section#faq max-w-4xl; encabezado centrado con eyebrow "Resolvemos dudas" (bg-brand-terracotta-soft/text-brand-terracotta-dark); buscador h-12 rounded-2xl con icono Search y aria-label, filtra por normalizeText(pregunta+respuesta) exigiendo TODOS los tokens (AND); tabs scrollables "Todas"+general/publicar/buscar/contacto con aria-pressed, badge de conteo y activo bg-brand-pine text-brand-cream; Accordion single collapsible con items card redondeados, trigger font-medium text-left + mini badge neutral (bg-muted/text-muted-foreground, text-[10px] uppercase, hidden sm:inline-block) y respuesta text-muted-foreground leading-relaxed; contador aria-live="polite" ("N preguntas" + " para «query»" si hay búsqueda); estado vacío con HelpCircle + "No encontramos esa pregunta." + CTA WhatsApp waHref(SITE.admin.whatsapp, "Hola, tengo una pregunta sobre la guía de vecinos:") min-h-11 rounded-full; JSON-LD FAQPage dentro de la sección con las 18 preguntas SIEMPRE completas (constante a nivel de módulo, independiente de filtros); entrada framer-motion (3 bloques escalonados) desactivada con useReducedMotion.
- Creado src/components/site/site-map-section.tsx ('use client', export function SiteMapSection): section#mapa max-w-7xl; panel rounded-[2rem] border-2 border-brand-pine/10 bg-card con decoración patron-puntos (esquina sup. der., text-brand-pine/10) + icono Map gigante opacity-5 rotado; grid lg:grid-cols-[1fr_1.2fr_1.6fr] con divisores de mapa (lg:border-l lg:border-dashed en columnas 2 y 3): (1) Secciones: nav con los 8 SITE.anchors, iconos mapeados inicio→Home/buscador→Search/destacados→Star/categorías→LayoutGrid/servicios→BookOpen/faq→HelpCircle/mapa→Map/anunciate→Megaphone, filas min-h-11 hover:bg-accent; (2) Categorías: 8 botones con punto bg-cat-{id} + label + conteo categoryCounts(), onClick setCategory(cat.id)+scrollToSection('servicios'), aria-label "Filtrar directorio por {label}"; (3) Índice A–Z: grupos por categoría con encabezado uppercase text-[11px] font-bold text-cat-{id}, servicios ordenados localeCompare('es'), botones min-h-11 con ArrowUpRight visible en group-hover y group-focus-visible, bloque max-h-[420px] overflow-y-auto scrollbar-fina pr-2; ServiceDialog al final del section con estado local {selected: ServiceListing|null, open} y contrato EXACTO {service, open, onOpenChange}.
- Pie del panel: píldora MapPin "Estás en: Inicio" (bg-brand-gold-soft text-brand-pine, sin emoji) + totales dinámicos "{SERVICES.length} anuncios · {CATEGORIES.length} categorías · {FAQ_ITEMS.length} preguntas"; micro-acentos texto-marca en "A–Z" y animate-floaty en el icono del estado vacío de FAQ; whileInView reduced-motion-safe en ambos módulos.
- Verificación (sin dev/build/lint, según reglas): parseo TSX OK de ambos archivos y type-check aislado (tsconfig propio en /tmp, solo mis 2 archivos) → 0 errores; único diagnóstico esperado TS2307 service-dialog (archivo del agente 2-b, en paralelo).

Stage Summary:
- 2 archivos nuevos creados y nada más tocado: src/components/site/faq-section.tsx (export FaqSection) y src/components/site/site-map-section.tsx (export SiteMapSection). Cero hex, solo tokens (bg-brand-*/text-brand-*/bg-cat-*/text-cat-* + semánticos shadcn), copy es-CR cálido, botones ≥ h-11, listas largas con max-h + overflow-y-auto + scrollbar-fina.
- DESVIACIÓN AA documentada: el CTA WhatsApp del estado vacío usa bg-brand-teal-dark en vez del bg-brand-teal literal del spec — blanco sobre #2a9d8f da 3.3:1 (falla AA de texto normal) y el worklog ya fijó el patrón "blanco solo sobre teal-dark (#1f7a70, 5.15:1)". Tab activo bg-brand-pine/text-brand-cream = 10.4:1 y badges bg-muted/text-muted-foreground = 4.8:1 (AA OK); los encabezados text-cat-{id} del índice A–Z siguen el patrón del design system como etiquetas de leyenda (los nombres de anuncio quedan en text-foreground AA).
- Dependencia externa: ServiceDialog se SOLO importa de "@/components/site/service-dialog" (agente 2-b); TS no compilará el proyecto completo hasta que ese archivo exista — contrato respetado al pie de la letra.
- Sync de estado: los botones de categoría del mapa escriben en useSearchStore (setQuery/setCategory compartidos con buscador, directorio y sección categorías de 2-b/2-c) y hacen scroll a #servicios, así el mapa funciona como atajo real del directorio.
- Pendiente para QA del orquestador: montar <FaqSection/> y <SiteMapSection/> en page.tsx (después de Directorio, antes de Anúnciate), validar anclas #faq/#mapa y probar en móvil el scroll horizontal de tabs.

---

Task ID: 2-a
Agent: frontend-styling-expert
Task: Shell visual de la guía — Navbar sticky, Hero guía turística, Footer triangular, AnnounceStrip y MobileStickyBar.

Work Log:
- Leído worklog.md (sección Task ID: 2 PIVOT COMPLETO), globals.css (tokens brand/cat, patron-puntos, texto-marca, animate-floaty), site-config.ts, search-store.ts, data/services.ts, brand/logo.tsx, safe-image.tsx y ui/sheet.tsx antes de escribir código.
- Creado src/components/site/navbar.tsx ("use client", export Navbar): sticky top-0 z-50; barra superior fina (hidden sm:block) bg-brand-pine-deep con "Guía comunitaria · Condominio La Rueda" + tel de administración (telHref, hover dorado); barra principal max-w-7xl con Logo tone="dark" → #inicio, nav central hidden lg:flex con los 5 enlaces pedidos (derivados por filtro de SITE.anchors: Destacados/Categorías/Directorio/Preguntas/Mapa), botón Search (scrollToSection('buscador')) y CTA "Anúnciate" (hidden sm:inline-flex, scrollToSection('anunciate')); fondo transparente → bg-card/90 backdrop-blur-md border-b shadow-sm con listener de scroll pasivo (>8px) y cleanup; móvil: hamburguesa h-11 w-11 (aria-expanded, Menu/X) que abre Sheet side="right" controlado (onOpenChange) con Logo, SheetTitle/Description sr-only, las 8 SITE.anchors con iconos lucide por id (Home/Search/Star/LayoutGrid/BookOpen/CircleHelp/Map/Megaphone), CTA "Anúnciate en la guía" h-12, botones Llamar/WhatsApp y cierre con onClick={() => setOpen(false)} en cada enlace ancla; footer del sheet con safe-area-inset-bottom.
- Creado src/components/site/hero.tsx ("use client", export Hero): section#inicio con blobs difusos (bg-brand-teal-soft / bg-brand-terracotta-soft blur-3xl opacity-60) + capa patron-puntos text-brand-pine/10; grid lg:grid-cols-2; columna izquierda con framer-motion stagger fade-up (variants tipados, useReducedMotion → initial={false} desactiva todo movimiento), badge pill MapPin, h1 font-display con "vecino" en texto-marca, copy es-CR exacto, 2 CTAs (Hick) h-12 rounded-full y mini-stats en <motion.dl> (SERVICES.length/CATEGORIES.length/100% vecinos con BookOpen/LayoutGrid/HeartHandshake, dt sr-only); columna derecha: tarjeta aspect-[4/3] rotate-1 border-4 border-white shadow-2xl con SafeImage hero-guia.png (fill, priority, sizes 50vw/100vw) + píldora "Edición 2026 · La Rueda" bg-white/90, y 2 badges flotantes animate-floaty (hidden sm:flex para no desbordar en móvil; segundo con style animationDelay "1.5s"): mini card Pet Spa Guau & Miau con SafeImage svc-mascotas.png (h-12 w-12 sin fill) + Star fill-brand-gold, y píldora bg-brand-pine con Phone + "+506 8888-1001".
- Creado src/components/site/footer.tsx ("use client", export Footer): REQUISITO FIRMA — banda decorativa aria-hidden h-14 md:h-20 con 3 capas absolutas inset-0: gradiente base linear-gradient(90deg, cream→gold→teal→pine→pine-deep) vía var(--brand-*) en style inline + 2 capas con clip-path polygon de picos triangulares (gold→teal→pine y teal→pine→pine-deep) → montañas del crema al pino profundo; cuerpo bg-brand-pine-deep con grid md:grid-cols-2 lg:grid-cols-4: (1) Logo light + tagline + "Hecha por vecinos, para vecinos."; (2) "Explora" con las 8 anclas (h3 font-display text-brand-gold, enlaces min-h-11 hover:text-brand-gold); (3) "Categorías" con 8 botones que hacen setCategory(cat.id) + scrollToSection('servicios') vía useSearchStore y píldora de categoryCounts() (aria-hidden + count incluido en aria-label); (4) "Administración" con tel/WhatsApp(waHref prellenado)/mailto/horario; barra inferior border-t border-white/10 con © año dinámico, disclaimer informativo y enlaces #faq/#mapa.
- Creado src/components/site/announce-strip.tsx ("use client", export AnnounceStrip): section#anunciate con panel rounded-[2rem] border-brand-gold/50 bg-gradient-to-br from-brand-gold-soft via-card to-brand-teal-soft y BookMarked gigante opacity-10 decorativo; eyebrow pill terracotta-soft, h2 font-display, copy exacto; <ol> de 3 pasos (Miller) en grid sm:grid-cols-3 con números font-display text-brand-terracotta: (1) chips de los 6 datos del anuncio en bg-brand-pine-soft, (2) botón WhatsApp h-11 bg-brand-teal-dark con waHref(SITE.admin.whatsapp, mensaje completo de publicación), (3) píldora "100% gratis" bg-brand-gold-soft.
- Creado src/components/site/mobile-sticky-bar.tsx ("use client", export MobileStickyBar): nav fixed bottom-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t con paddingBottom env(safe-area-inset-bottom); grid-cols-3 divide-x: Buscar (scrollToSection('buscador') + setTimeout 450ms → focus preventScroll en #input-buscador, temporizador limpiado en unmount via useRef), Directorio (#servicios) y WhatsApp (<a> waHref target _blank); acciones min-h-[56px] active:bg-accent con aria-labels descriptivos.
- Verificación: tsc --noEmit → 0 errores en mis 5 archivos (los errores restantes son andamiaje ajeno: examples/, skills/, page.tsx viejo pendiente de reensamblar por el orquestador y service-dialog de 2-b aún no escrito). Grep de hex en mis archivos → 0 (solo var(--brand-*) permitido en styles inline del footer). Sin dev/build/lint ni installs, según reglas.

Stage Summary:
- Archivos creados (únicos, en src/components/site/): navbar.tsx → Navbar(), hero.tsx → Hero(), footer.tsx → Footer(), announce-strip.tsx → AnnounceStrip(), mobile-sticky-bar.tsx → MobileStickyBar(). Todos "use client", sin props, listos para page.tsx.
- Contraste AA (1 desviación documentada): los CTAs sólidos usan los tokens OSCUROS como base — bg-brand-terracotta-dark (4.7:1 con blanco) y bg-brand-teal-dark (5.15:1) — en lugar de bg-brand-terracotta/bg-brand-teal base (3.09:1 y 3.35:1 con blanco, fallan AA). Hover hace darkening con hover:brightness-90 (mantiene AA, respeta la intención "oscurecer al hover" del spec y el precedente del worklog "blanco solo sobre -dark"). Si el orquestador prefiere el spec literal, es un cambio de 3 classNames.
- Notas de integración: (1) el main necesita padding inferior en móvil (~72px + safe-area, ej. pb-20 md:pb-0) para que MobileStickyBar no tape contenido; (2) las secciones #buscador (input id="input-buscador"), #anunciate, #destacados, #categorias, #servicios, #faq y #mapa deben existir para que navbar/footer/hero funcionen (scroll-margin-top ya está en globals.css); (3) hero depende de /images/hero-guia.png y /images/svc-mascotas.png (en generación; SafeImage cae al placeholder si faltan); (4) sin scroll horizontal: blobs/clip-paths dentro de overflow-hidden/aria-hidden.
- UX: Miller (5 enlaces desktop, 8 en sheet, 3 pasos), Hick (1 CTA por barra + 2 en hero), Fitts (todo ≥44px, barra móvil 56px), Jakob (hamburguesa a la derecha, tel/wa visibles), prefers-reduced-motion respetado (useReducedMotion + neutralización global de globals.css), transiciones duration-200.

---
Task ID: 2-c
Agent: frontend-styling-expert
Task: Carrusel de destacados (estilo portada de guía turística, embla + autoplay accesible) y sección de 8 categorías predefinidas + tarjeta "Ver todo el directorio".

Work Log:
- Leído worklog (sección "Task ID: 2 (PIVOT COMPLETO)": paleta, contratos y propiedad de archivos), globals.css (tokens brand-pine/teal/terracotta/gold/cream + cat-* y utilidades patron-puntos/texto-marca/animate-floaty/scrollbar-fina), services.ts (ServiceListing, CATEGORIES, CategoryId, categoryUi, getFeaturedServices, categoryCounts, SERVICES), site-config.ts (telHref), search-store.ts (useSearchStore, scrollToSection), safe-image.tsx y package.json (embla-carousel-react/embla-carousel-autoplay 8.6, framer-motion 12, zustand 5, lucide 0.525).
- Creado src/components/site/service-carousel.tsx ('use client', export function ServiceCarousel): <section id="destacados" aria-label="Servicios destacados"> + container max-w-7xl py-16 md:py-20 (px-4 sm:px-6 lg:px-8). Encabezado flex-wrap justify-between items-end: eyebrow pill bg-brand-gold-soft text-brand-pine con icono Map, h2 font-display text-3xl md:text-4xl text-brand-pine "Lo que nuestros vecinos ofrecen", sub muted-foreground; a la derecha controles prev/next h-11 w-11 rounded-full border-border bg-card shadow-sm hover:border-brand-teal hover:text-brand-teal-dark, ChevronLeft/Right, aria-label "Destacado anterior/siguiente".
- embla: useEmblaCarousel(options, plugins) con { loop: true, align: "start", slidesToScroll: 1 } y Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false }). Autoplay SOLO si !prefers-reduced-motion: estado reducedMotion con window.matchMedia + listener "change" (sync inicial + cleanup); options/plugins en useMemo → el cambio de plugins dispara reInit limpio de embla v8 (autoplay se retira sin recargar).
- Region accesible: div role="region" aria-roledescription="carrusel" aria-label="Servicios destacados de los vecinos" con onKeyDown (ArrowLeft/ArrowRight → scrollPrev/scrollNext, preventDefault, guard si ServiceDialog está abierto para no interferir con el portal). Cada slide: role="group" aria-roledescription="diapositiva" aria-label="Destacado {i+1} de {n}: {title}". Viewport overflow-hidden ref={emblaRef}; container flex gap-4 md:gap-6; slides basis-full sm:basis-[72%] lg:basis-[55%] xl:basis-[38%] shrink-0 min-w-0 pl-[2px].
- Tarjeta guía turística h-[430px] md:h-[480px] rounded-[1.75rem] overflow-hidden border-border bg-card shadow-xl group: SafeImage fill object-cover sizes "(min-width: 1280px) 38vw, (min-width: 640px) 72vw, 100vw", priority solo índice 0, transition-transform duration-700 group-hover:scale-105; velo bg-linear-to-t from-black/75 via-black/25 to-black/10 (nombre Tailwind v4 de bg-gradient-to-t); badge categoría categoryUi().classes.solid con icono h-3.5; píldora "Destacado" bg-brand-gold/95 text-brand-pine text-[10px] font-bold uppercase con Star; abajo título font-display text-2xl md:text-[1.7rem] drop-shadow-md, tagline text-white/90 line-clamp-2, chip tel <a href={telHref(phone)}> bg-white/15 backdrop-blur-sm con Phone y {phone sin "+506 "} (teléfonoCorto()), píldora "Ver detalles" h-11 rounded-full bg-white text-brand-pine → group-hover:bg-brand-gold/text-brand-pine-deep.
- PATRÓN "stretched button" por accesibilidad: la tarjeta entera se abre con un <button> absoluto inset-0 z-10 aria-label "Ver detalles de {title}" (foco con outline dorado interior focus-visible:outline-2 -outline-offset-4 outline-brand-gold); el contenido es pointer-events-none (solo el chip tel es pointer-events-auto) y la píldora visible "Ver detalles" es decorativa aria-hidden. Evita botón anidado en botón (HTML inválido) sin perder el aria-label pedido.
- Dots: botones h-2.5 rounded-full (activo w-8 bg-brand-teal, inactivo w-2.5 bg-brand-pine/20 hover:bg-brand-pine/40) con aria-label "Ir al destacado {n}" + aria-current="true" y after:-inset-2 para ampliar el área táctil sin cambiar el visual (Fitts); sincronizados con emblaApi.on("select")/("reInit") + off en cleanup + lectura inicial; contador "{i+1} / {n}" font-display text-sm text-brand-pine tabular-nums (aria-hidden); hint "Desliza para explorar →" text-xs muted md:hidden.
- Animación de entrada framer-motion fade-up (initial opacity 0 y 24 / whileInView / viewport once margin -80px) con reducedMotion → sin desplazamiento y duration 0.
- ServiceDialog montado al final con el contrato EXACTO { service: selected, open, onOpenChange: setOpen }; importado de "@/components/site/service-dialog" (NO creado aquí; lo escribe 2-b en paralelo).
- Creado src/components/site/categories-section.tsx ('use client', export function CategoriesSection): <section id="categorias" aria-label="Categorías de la guía">, decoración patron-puntos aria-hidden text-brand-pine/10 en lg; encabezado centrado: eyebrow bg-brand-teal-soft text-brand-teal-dark con Compass "Categorías predefinidas", h2 font-display "Explora la guía por categoría", sub "Ocho rutas claras para encontrar lo que necesitas, sin perderte."
- Grid sm:grid-cols-2 lg:grid-cols-4 gap-4 (mt-10 md:mt-12) con 9 celdas: 8 categorías (CATEGORIES + categoryUi) + tarjeta "Todas las categorías". Tarjeta categoría = <button> h-full min-h-[150px] rounded-2xl border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-transparent focus-visible:ring-2 del color de la cat (focus-visible:outline-hidden para no duplicar indicadores); icono en rounded-2xl p-3 con classes.soft + icono h-6 w-6 classes.text; label font-display text-lg text-brand-pine con group-hover color de cat; description line-clamp-2; pie pill "{n} anuncio(s)" (singular/plural es-CR) classes.soft+classes.text + ArrowRight group-hover:translate-x-1 group-hover:text-brand-teal. onClick setCategory(cat.id) + scrollToSection("servicios"); aria-label "Ver {n} anuncios de {label}".
- Mapas locales literales RING_POR_CATEGORIA / HOVER_TEXT_POR_CATEGORIA (Record<CategoryId, string>) con las clases completas "focus-visible:ring-cat-*" y "group-hover:text-cat-*" para que Tailwind las detecte en el código fuente (no se pueden componer dinámicamente en runtime y no debía tocarse services.ts).
- Tarjeta extra: border-dashed border-border bg-brand-cream-deep/40, LayoutGrid en bg-brand-pine-soft, label "Todas las categorías" (hover teal-dark), sub "{SERVICES.length} anuncios en total", pill "Explorar todo" bg-brand-pine-soft, onClick setCategory('todas') + scroll, aria-label "Ver todo el directorio: {n} anuncios en total".
- Stagger framer-motion whileInView por tarjeta (delay index*0.06) anulado con prefers-reduced-motion (duration 0, delay 0, sin y); uses useSearchStore (selector setCategory) + scrollToSection; cero hex en ambos archivos (solo clases de gradiente black/* pedidas por la spec).

Stage Summary:
- ARCHIVOS CREADOS (solo los 2 asignados): src/components/site/service-carousel.tsx → export function ServiceCarousel() · src/components/site/categories-section.tsx → export function CategoriesSection(). Ningún otro archivo tocado; ServiceDialog y ServiceCard NO creados (solo importados según contrato; el archivo service-dialog.tsx lo entrega 2-b en paralelo — hasta entonces tsc/lint marcarán el import como pendiente, es lo esperado).
- Imports respetando la lista permitida: "@/lib/data/services" (ServiceListing, CATEGORIES, CategoryId, categoryUi, getFeaturedServices, categoryCounts, SERVICES), "@/lib/site-config" (telHref), "@/lib/search-store" (useSearchStore, scrollToSection), "@/components/site/service-dialog" (ServiceDialog), "@/components/safe-image" (SafeImage), "@/lib/utils" (cn), lucide-react, framer-motion, embla-carousel-react, embla-carousel-autoplay.
- Accesibilidad del carrusel completa: aria-roledescription="carrusel"/"diapositiva", labels de slides "Destacado {i+1} de {n}: {title}", dots con aria-label "Ir al destacado {n}" + aria-current, flechas ←/→ en la sección, prev/next con aria-label, autoplay DESACTIVADO con prefers-reduced-motion (matchMedia reactivo, no solo CSS), SafeImage siempre con alt descriptivo, foco visible en todos los controles, botones ≥ h-11 (dots con hit-area extendida via after:-inset-2).
- Categorías: tokens bg-cat-{id}-soft/text-cat-{id} via categoryUi, ring de foco y hover de título con el color de cada categoría, Miller 8+1 opciones, Fitts min-h-[150px] + targets generosos, scrollToSection("servicios") sincroniza con el buscador/directorio vía store compartido.
- DEVIACIONES menores documentadas: (1) "Ver detalles" visible es un span decorativo + botón invisible que cubre la tarjeta (mismo aria-label, evita interactivo anidado); (2) el chip de teléfono es enlace tel: real ("toca y contacta directo"); (3) bg-linear-to-t y backdrop-blur-sm (nombres canónicos Tailwind v4 de bg-gradient-to-t y backdrop-blur); (4) en la tarjeta extra la píldora del pie dice "Explorar todo" para no duplicar el sub con el conteo; (5) decoración patron-puntos en #categorias y iconos Map/Compass en eyebrows como toque de guía turística.
- Pendiente orquestador: QA visual (móvil/desktop) cuando 2-b entregue service-dialog; verificar contraste del chip tel sobre fotos claras si se cambian las imágenes.
---
Task ID: 2-b
Agent: frontend-styling-expert
Task: Buscador + Directorio (corazón del sitio): HighlightText, ServiceDialog (ficha completa), ServiceCard, SearchSection (híper-buscador) y DirectorySection. 5 archivos 'use client' en src/components/site/, contratos compartidos respetados.

Work Log:
- Leído worklog (sección Task ID: 2 PIVOT COMPLETO) y verificados en disco los contratos reales: services.ts (ServiceListing, CATEGORIES, categoryUi, searchServices, categoryCounts), text.ts (highlightParts), site-config.ts (SITE, telHref, waHref), search-store.ts (zustand + scrollToSection), safe-image.tsx, ui/{dialog,badge,button,input}, hooks/use-toast, globals.css (tokens brand-*/cat-*, scrollbar-fina, patron-puntos).
- Creado src/components/site/highlight-text.tsx — HighlightText({ text, query }): highlightParts + <mark className="rounded px-0.5 bg-brand-gold/60 text-brand-ink text-brand-ink">; sin query devuelve el texto tal cual; render con fragmentos.
- Creado src/components/site/service-dialog.tsx — CONTRATO EXACTO: ServiceDialogProps { service: ServiceListing|null; open; onOpenChange } + ServiceDialog. Dialog controlado p-0 overflow-hidden max-w-lg md:max-w-2xl rounded-3xl; si service es null no renderiza DialogContent (sin crash). Galería: embla useEmblaCarousel({ loop: true }) sin autoplay cuando hay >1 imagen (aspect-[16/9], SafeImage fill cover, flechas h-11 w-11 bg-white/90 text-brand-pine aria-label "Imagen anterior/siguiente", dots clickeables aria-label "Ir a imagen N"), imagen única si hay 1. Cuerpo p-6 md:p-8 scrollable (max-h-[90vh] flex): badge categoría categoryUi(.badge + icono h-3.5), DialogTitle font-display text-2xl md:text-3xl text-brand-pine con HighlightText si hay query, DialogDescription = tagline (fallback categoría·comunidad para aria-describedby), descripción, filas Clock/MapPin opcionales, chips keywords (Badge outline, máx 8, primera con HighlightText según query del store), botones grid sm:grid-cols-3 gap-3: "Llamar {phone}" (telHref, bg-primary h-12), "WhatsApp" solo si service.whatsapp (bg-brand-teal h-12, waHref con mensaje precargado), "Copiar número" (outline h-12, Copy→Check 2s + toast "Número copiado"/phone, navigator.clipboard con try/catch). DialogClose propio h-11 w-11 bg-white/90 (showCloseButton={false} del preset).
- Creado src/components/site/service-card.tsx — ServiceCard({ service, priority? }): article flex h-full rounded-2xl border bg-card hover:shadow-lg hover:-translate-y-0.5; imagen aspect-[16/10] SafeImage fill cover (priority + sizes 25vw/33vw/100vw si priority), badge categoría .solid absolute left-3 top-3, píldora "Destacado" bg-brand-gold right-3 top-3 con Star h-3; cuerpo: h3 font-display text-lg con HighlightText (query del store), tagline line-clamp-1, descripción line-clamp-2, chips 3 keywords .badge hidden md:flex; pie border-t: <a> teléfono h-11 rounded-full ghost con "+506 " recortado (stopPropagation) + botón "Ver detalles" h-11 bg-brand-pine text-brand-cream hover:bg-brand-pine-deep; wrapper role="button" tabIndex={0} aria-haspopup="dialog" aria-label="Ver detalles de {title}" con onKeyDown Enter/Space (guard event.target); dialog con useState interno { selected } → ServiceDialog open={!!selected}.
- Creado src/components/site/search-section.tsx — HÍPER-BUSCADOR: section#buscador aria-label, eyebrow bg-brand-teal-soft "Híper-buscador vecinal", h2 "¿Qué necesitas hoy?", caja max-w-2xl con Input#input-buscador h-14 md:h-16 pl-14 pr-12 border-2 border-brand-pine/15 focus-visible:border-brand-teal shadow-lg shadow-brand-pine/5, icono Search left-4, botón limpiar X h-11 w-11 aria-label "Limpiar búsqueda" (devuelve foco al input); estado local + debounce 150ms (useRef timer, cleanup) sincronizado con useSearchStore.setQuery (y efecto de sync inverso para el input del directorio); 6 sugerencias (pan/plomero/uñas/yoga/taxi/frutas) h-10; filtros "Todas"+8 categorías con icono+count (categoryCounts), aria-pressed, activo .solid o bg-brand-pine text-brand-cream; resultados useMemo(searchServices(query, category)), contador aria-live="polite" ("N resultado(s) para «query»" / "N anuncio(s)"), grid sm:2/lg:3 max-h-[760px] overflow-y-auto scrollbar-fina; estado inicial panel dashed bg-brand-cream-deep/40 "Empieza a escribir…", estado vacío SearchX + CTA "¿Ofreces este servicio? Anúnciate" → scrollToSection('anunciate'); framer-motion fade+y con useReducedMotion.
- Creado src/components/site/directory-section.tsx — section#servicios max-w-7xl: eyebrow terracotta "Directorio completo", h2 "Todos los servicios y productos"; barra sticky top-[88px] z-20 bg-background/90 backdrop-blur con input h-11 value=store.query onChange=setQuery (mismo store que el buscador) + pills compactas Todas+8 con counts aria-pressed; grid sm:2/lg:3/xl:4 gap-4 md:gap-6 de ServiceCard (priority en los 4 primeros); contador aria-live; estado vacío con botón "Limpiar filtros" → store.clear(); entrada con whileInView + stagger sutil (índice % 4) respetando useReducedMotion.
- Verificación: `tsc --noEmit` del proyecto — 0 errores en src/components/site/* y librerías compartidas (los 22 errores restantes son residuos del proyecto anterior LONGIVET en src/app/page.tsx + examples/skills, a reemplazar por el orquestador). No se ejecutó dev/build/lint ni se instalaron paquetes.

Stage Summary:
- 5 archivos creados (solo los asignados; ningún otro archivo tocado): site/{highlight-text,service-dialog,service-card,search-section,directory-section}.tsx.
- Contratos respetados AL EXACTO para agentes paralelos: HighlightText({text,query}); ServiceDialogProps { service: ServiceListing|null; open: boolean; onOpenChange: (open:boolean)=>void } — ServiceCard y el carrusel (2-c) lo usan con { service, open, onOpenChange } sin cambios; ServiceCard({service, priority?}).
- Accesibilidad: aria-live en contadores, aria-pressed en filtros, roles/labels en galería y tarjeta, foco visible global, contraste AA con tokens (text-white solo sobre .solid oscuros), prefers-reduced-motion vía useReducedMotion + neutralizador global de globals.css.
- Cero hex (solo tokens brand-*/cat-*/semánticos); SafeImage SIEMPRE (nunca next/image directo); botones ≥ h-11 (sugerencias y pills compactas h-10 según spec); listas con scrollbar-fina.
- Desviaciones menores documentadas: (1) grid de contacto sm:grid-cols-2 cuando el anuncio no tiene WhatsApp (evita hueco en cols de 3); (2) en ServiceDialog el título también usa HighlightText (query vacía = texto plano, sin riesgo); (3) toast de error amable si clipboard falla; (4) pills compactas del directorio h-10 (paridad con chips de sugerencia de la spec); (5) resplandor decorativo bg-brand-teal-soft blur-3xl tras la caja del buscador.
- Pendiente orquestador: reemplazar page.tsx (aún importa componentes LONGIVET), ensamblar <SearchSection /> y <DirectorySection /> en "/" y QA visual.

---

Task ID: 3 (ensamblado) + 4 (QA)
Agent: Orquestador principal (Z.ai Code)
Task: Ensamblar page.tsx, corregir lint, y QA end-to-end con agent-browser (desktop 1440px + móvil 375px).

Work Log:
- Escrito src/app/page.tsx: orden Navbar → Hero(#inicio) → SearchSection(#buscador) → ServiceCarousel(#destacados) → CategoriesSection(#categorias) → DirectorySection(#servicios) → FaqSection(#faq) → SiteMapSection(#mapa) → AnnounceStrip(#anunciate) → Footer + espaciador móvil (h-[72px] md:hidden) + MobileStickyBar; main#contenido con pb-20 md:pb-0.
- Lint: 2 errores react-hooks/set-state-in-effect en safe-image.tsx y service-dialog.tsx → corregidos con patrón React "ajuste en render" (previous props) sin efectos. bun run lint: LIMPIO.
- Corregido sr-only "Close" → "Cerrar" en src/components/ui/dialog.tsx (consistencia i18n; el Sheet ya estaba en español).
- Diagnóstico de generación de imágenes: tamaño 1440x720 inválido (API exige múltiplos de 32px) → hero cambiado a 1344x768; script relanzado con setsid (log /home/z/imggen2.log).
- QA agent-browser verificada en disco/pantalla:
  * GET / → 200; title correcto; 0 errores JS de página (agent-browser errors vacío).
  * Búsqueda en vivo: "pan" → "1 resultado para «pan»" (Panadería Doña Marta); "plomeria" SIN tilde → resalta "Plomería" (normalización + highlight OK); combinación query+categoría = AND correcto.
  * Ficha ServiceDialog: badge categoría, título resaltado, horario/ubicación, keywords chips, botones Llamar/WhatsApp/Copiar — correcto.
  * Carrusel: botón "Destacado siguiente" funciona, dots sincronizados, contador 1/6.
  * FAQ: 18 preguntas, tabs con conteos, búsqueda "whatsapp" → "6 preguntas para «whatsapp»".
  * Footer triangular: gradiente crema→gold→teal→pino con capas clip-path — EXACTO al requisito del usuario.
  * Móvil 375px: hero apilado, menú Sheet (8 anclas + CTA + contacto), barra fija "Buscar" enfoca #input-buscador (id verificado), sin overflow horizontal (375=375), footer sin solapamiento (espaciador 72px funciona).
  * BUG de QA detectado y aclarado: un Sheet sin cerrar en la sesión de prueba retenía el foco (focus trap de Radix) — no es bug de producto; Escape lo cierra y el foco funciona.

Stage Summary:
- SITIO COMPLETO Y FUNCIONAL: "Vecinos y Servicios · Condominio La Rueda" con híper-buscador (normaliza tildes, multi-token, resaltado), carrusel con autoplay+reduced-motion, 8 categorías predefinidas con colores, directorio sincronizado vía zustand, 18 FAQ con FAQPage JSON-LD, mapa del sitio interactivo, flujo "Anúnciate" y footer triangular.
- Pendiente: imágenes IA en generación (background); al terminar verificar hero/carrusel con fotos reales.
- Contrato para futuros agentes: los datos se editan SOLO en src/lib/data/services.ts y src/lib/data/faq.ts (documentado en el propio archivo).

---

Task ID: 5 (cierre de fase)
Agent: Orquestador principal (Z.ai Code)
Task: Completar imágenes placeholder, QA final con fotos reales, robots.txt y cierre de la fase de lanzamiento.

Work Log:
- Imágenes: el sandbox mataba los procesos en background → relanzado como subagente general-purpose ejecutando el script EN PRIMER PLANO; resultado 14/14 PNG (hero-guia + 13 svc-*) en /public/images/, log ALL_IMAGES_DONE, 0 FAIL (algunas con reintento por 429).
- robots.ts añadido (allow all + sitemap).
- Verificación SEO: GET / con 3 bloques JSON-LD (@graph Organization/WebSite+SearchAction/ItemList×2 + FAQPage del componente), /sitemap.xml 200, /manifest.webmanifest 200, title es-CR correcto.
- QA visual final con imágenes reales: hero con ilustración plana de comunidad (panadería/crafts/pet shop/vecinos), carrusel con fotos (panadería, verduras, carpintería), badges "DESTACADO" dorados, contador 1/6, chips de teléfono.
- bun run lint: LIMPIO. GET / → 200. agent-browser cerrado.

Stage Summary:
- LANZAMIENTO COMPLETO: "Vecinos y Servicios · Condominio La Rueda" 100% funcional en / (ruta única + anclas).
- Arquitectura final: datos editables en src/lib/data/services.ts (14 anuncios ejemplo, 8 categorías) y faq.ts (18 preguntas); store zustand sincroniza buscador/filtros; SafeImage con fallback; SafeImage/placeholder.svg para futuras fotos del usuario.
- Próximos pasos sugeridos (para el cron webDevReview): pulir detalles visuales (hover de tarjetas, transiciones), añadir contador de visitas por anuncio si se desea backend, o modo oscuro opcional.

---

Task ID: cron-r1 (webDevReview — ronda 1)
Agent: Orquestador principal (Z.ai Code)
Task: Revisión automática programada: QA del sitio estable → nuevas features fullstack (vistas + favoritos), deep-link ?q=, atajo "/", y pulido de estilo (scroll-spy, compartir, numeración de guía).

Work Log:
- QA inicial: 0 errores JS, 22/22 imágenes OK, consola limpia, APIs 200 → proyecto ESTABLE, se pasa a desarrollo de features.
- FEATURE A — Contador de vistas (fullstack):
  * prisma/schema.prisma: modelo ServiceView { serviceId @id, views, updatedAt } + índice por views; bun run db:push OK (Prisma Client v6.19.2 generado).
  * GET /api/views → mapa { serviceId: views } (incluye todos los ids conocidos en 0).
  * POST /api/views/[serviceId] → upsert +1; rechaza ids desconocidos con 404 "Anuncio desconocido".
  * src/lib/views-store.ts: zustand + singleton de promesa useViewCounts() (carga única) y registerView() (POST y actualización en vivo del store).
  * UI: chip "👁 N vistas" sobre la imagen en tarjetas (solo si >0) y en la ficha; registerView se dispara al ABRIR la ficha (ajuste en render, sin efectos).
- FEATURE B — Favoritos del vecino:
  * src/lib/favorites-store.ts: zustand + persist (localStorage "vecinos-larueda-favoritos").
  * Corazón en tarjetas (esquina inferior derecha, aria-pressed, stopPropagation) y en la ficha (junto al cierre, se rellena terracotta).
  * Filtro "Favoritos (n)" en la barra sticky del directorio con estado vacío propio ("Aún no guardas favoritos…").
- FEATURE C — Deep-link y atajo:
  * search-section: soporte ?q= y #buscador?q= (activa el SearchAction del JSON-LD) — aplica búsqueda, desplaza y enfoca el input (defer 300ms para hidratación).
  * Atajo de teclado "/" (ignora inputs/textareas y modificadores) + pista <kbd>/</kbd> visible cuando el input está vacío y sin foco (solo desktop).
- FEATURE D — Pulido de estilo:
  * Navbar: scroll-spy con IntersectionObserver (franja -30%/-60%) — enlace activo con subrayado teal + aria-current; menú móvil resalta la sección activa con punto teal.
  * Ficha: botón "Compartir" (Web Share API con fallback clipboard + toast "Enlace copiado"); comparte URL /?q={título}#buscador → el vecino que lo recibe aterriza con la búsqueda hecha.
  * Categorías: numeración tipo guía 01–08 en font-display gigante con opacidad al hover.
- VERIFICACIÓN (browser + API, todo OK):
  * GET /api/views devuelve mapa completo; POST suma (panadería 0→1); POST id desconocido → 404.
  * /?q=yoga#buscador → input="yoga", foco en input, "1 resultado para «yoga»".
  * Corazón → aria-pressed=true + localStorage persistido ["yoga-larueda"]; filtro Favoritos → "1 anuncio favorito".
  * Ficha abierta → chip "1 vista" visible y API yoga-larueda:1; botón Compartir presente.
  * Scroll-spy: al llegar a #faq el nav resalta "Preguntas".
  * bun run lint: LIMPIO tras todos los cambios.

Stage Summary:
- NUEVAS CAPACIDADES: métricas de vistas (Prisma/SQLite), favoritos locales con filtro, deep-links de búsqueda compatibles con SEO SearchAction, atajo "/", compartir anuncios, scroll-spy y numeración de guía.
- Decisiones: cada apertura de ficha = 1 vista (sin guard anti-spam por sesión, se puede añadir después); favoritos 100% locales (sin backend, privacidad por diseño).
- Riesgos/pendientes: probar navigator.share en dispositivo real (en desktop usó fallback clipboard OK); el contador del directorio prioriza query sobre favoritos en su texto (menor).
- Siguiente ronda sugerida: ordenar directorio (A-Z/destacados), "copiar enlace" también en tarjetas, o modo oscuro opcional.

---

Task ID: cron-r2 (webDevReview — ronda 2)
Agent: Orquestador principal (Z.ai Code)
Task: QA completo con agent-browser (desktop 1440 + móvil 375), corrección de bug de sincronización de buscadores, nuevas features (orden del directorio, compartir desde tarjetas, píldora "Nuevo") y pulido de estilo.

Work Log:
- QA inicial: lint LIMPIO, GET / → 200, APIs de vistas 200 (POST id desconocido → 404 correcto), sitemap/manifest 200, 0 errores JS. Todas las secciones renderizan (hero, buscador, carrusel, categorías, directorio, FAQ, mapa del sitio, anúnciate, footer triangular). Ficha ServiceDialog abre con galería, contador de vistas, WhatsApp, compartir. Móvil 375px sin overflow horizontal. Scroll-spy OK. → Proyecto ESTABLE, se pasó a desarrollo.
- BUG ENCONTRADO Y CORREGIDO (sync de buscadores): al vaciar un input programáticamente (autocompletado del navegador, form.reset(), automatizaciones), React deduplica el evento input con su value tracker y onChange NO se dispara → los dos buscadores (héroe y directorio) quedaban desincronizados (reproducido en QA: fill("pan") + fill("") dejaba el store en "pan"). FIX: nuevo hook src/hooks/use-native-input-sync.ts que escucha el evento `input` NATIVO del campo y notifica el valor al estado; aplicado a #input-buscador (handleInput con useCallback estable) y al input del directorio (setQuery). Verificado en vivo: fill("yoga") + fill("") ahora limpia ambos inputs y el store.
- FEATURE — Orden del directorio (src/components/site/directory-section.tsx): Select shadcn "Ordenar el directorio" en la barra sticky con 3 modos: "Destacados primero" (default), "Orden A → Z" (localeCompare es) y "Más vistos" (usa viewCounts de /api/views con desempate alfabético). Verificado en navegador: A→Z lista los 14 anuncios alfabéticamente; Más vistos pone primero Panadería (2 vistas) y Yoga (1 vista).
- FEATURE — Compartir desde las tarjetas: extraída la lógica a src/lib/share.ts (listingShareUrl + shareListing → Web Share API con fallback a portapapeles, devuelve "shared"/"copied"/"cancelled"/"failed"); ServiceDialog refactorizado para usarla y ServiceCard añadió botón de icono Share2 (h-11 w-11, aria-label, stopPropagation) en el pie entre el teléfono y "Ver detalles", con toast "Enlace copiado"/"No se pudo compartir". Verificado: clic → toast correcto (en headless sin permisos de portapapeles muestra el fallo amable).
- FEATURE — Píldora "Nuevo": campo opcional `isNew?: boolean` en ServiceListing (documentado en la cabecera de src/lib/data/services.ts como parte de la guía de edición para el usuario) + píldora teal con icono Sparkles junto al título en ServiceCard. Marcados como isNew: Repostería by Yozenia y Delivery Veloz La Rueda (ejemplos visibles).
- PULIDO DE ESTILO: hover de tarjeta ahora resalta borde (hover:border-brand-teal/50), el título transiciona a brand-teal-dark, "Ver detalles" lleva ChevronRight que se desliza al hover del grupo; teléfono de la tarjeta con whitespace-nowrap (evitaba wrap a 2 líneas con el nuevo botón); Select integrado al estilo de los chips (rounded-full, h-10, hover teal).
- VERIFICACIÓN FINAL: bun run lint LIMPIO; tsc sin errores en src/ (solo residuos preexistentes en skills/); regresiones OK: deep-link /?q=yoga#buscador aplica búsqueda + foco, atajo "/" enfoca el buscador, 8 anclas presentes, título es-CR correcto, 0 errores JS de página, móvil 375 sin overflow.

Stage Summary:
- CORREGIDO el único bug real detectado (desincronización de buscadores ante cambios programáticos de input — afecta también a autofill real de navegadores).
- NUEVO: orden del directorio (Destacados / A-Z / Más vistos), compartir anuncios desde las tarjetas, píldora "Nuevo" con campo isNew documentado en el archivo de datos, y refinamientos visuales de tarjetas.
- Estado del proyecto: COMPLETO Y ESTABLE — guía comunitaria con híper-buscador sincronizado, carrusel, categorías, directorio ordenable, favoritos, vistas (backend), FAQ, mapa del sitio y flujo Anúnciate.
- Riesgos/pendientes menores: probar navigator.share en dispositivo real (en headless usó fallback); el texto del contador del directorio prioriza query sobre favoritos (cosmético); datos se editan SOLO en src/lib/data/services.ts y faq.ts.
- Siguiente ronda sugerida: modo oscuro opcional, paginación/infinite scroll si el directorio crece de ~30 anuncios, o estadísticas de "más buscados" por categoría.
