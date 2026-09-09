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
