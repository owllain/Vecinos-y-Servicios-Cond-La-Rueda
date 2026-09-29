# Worklog — Vecinos y Servicios · Condominio La Rueda

> Documento de coordinación entre agentes. Todo agente DEBE leer este archivo antes de trabajar y agregar su sección al finalizar (sin sobrescribir).
>
> NOTA: el historial previo (proyecto LONGIVET y sus primeras fases) fue condensado y depurado el 2026 para reflejar ÚNICAMENTE el estado real verificado en disco. Los registros antiguos que afirmaban trabajos inexistentes fueron eliminados.

---

Task ID: 1
Agent: Orquestador principal (Z.ai Code)
Task: Reciclaje del proyecto LONGIVET → "Vecinos y Servicios · Condominio La Rueda": guía vecinal con carrusel + híper-buscador, FAQ, mapa del sitio, categorías predefinidas y datos editables en código.

Work Log:
- Verificado en disco el estado real de la implementación (la app ya estaba reciclada: paleta "guía turística" en globals.css, layout con Fraunces+Jakarta, JSON-LD, page.tsx con 9 secciones, 15 servicios de ejemplo en src/lib/data/services.ts con las 6 claves requeridas: título/categoría/palabras clave/imágenes/teléfono/descripción).
- APLICADO EL NUEVO REQUISITO DEL USUARIO: la guía es HECHA POR Y PARA LOS VECINOS, la ADMINISTRAN LOS VECINOS, y TODA solicitud —secretaría incluida— se hace ESCRIBIENDO AL GRUPO DE WHATSAPP.
- site-config.ts: eliminado bloque `admin` (teléfono/correo de administración); añadido `whatsappGroup: { url, label }` (URL provisional `https://chat.whatsapp.com/invito-vecinos-la-rueda` — REEMPLAZAR por el enlace real del grupo); nuevas utilidades `groupHref()`; eliminado `waHref()`; lema "La guía hecha por y para los vecinos".
- services.ts: eliminado el campo `whatsapp` por servicio (el CTA grupal es automático); comentarios actualizados para quien edite el archivo a mano.
- faq.ts: respuestas reescritas al modelo vecinal (quién administra, cómo publicar, cómo reportar…); NUEVAS preguntas "¿Cómo solicito un trámite de la secretaría?" y "¿Cómo me uno al grupo de WhatsApp?" → 20 preguntas en total (el JSON-LD FAQPage se regenera solo).
- navbar.tsx: barra superior con "Guía hecha por y para los vecinos" + enlace "Solicitudes por WhatsApp · secretaría incluida"; menú móvil con CTA verde "Grupo de WhatsApp de los vecinos".
- hero.tsx: badge "Hecha por y para los vecinos", copy con "la escriben y la administran los vecinos… secretaría incluidos", CTA secundario verde al grupo, píldora flotante "Solicitudes por WhatsApp · secretaría incluida", stats "100% vecinal".
- footer.tsx: columna "Grupo de WhatsApp de los vecinos" (checklist de lo que se puede pedir + botón "Unirme al grupo de WhatsApp"); eliminados teléfono/correo/horario de la antigua administración.
- service-dialog.tsx: CTA primario "Pedir por WhatsApp" → grupo; nota fija "Las solicitudes —secretaría incluida— se atienden escribiendo al grupo"; se conservan Llamar/Copiar/Compartir.
- service-card.tsx: botón verde "Pedir" (grupo) en el pie de cada tarjeta junto al teléfono del vecino y compartir.
- announce-strip.tsx: paso 2 "Escríbelo al grupo de WhatsApp" con botón al grupo; copy "publican los vecinos, la administran los vecinos".
- search-section.tsx: estado vacío con CTA verde "Pedirlo al grupo de WhatsApp" + "Anúnciate"; sub-copy apunta al grupo.
- faq-section.tsx y mobile-sticky-bar.tsx: CTAs al grupo.
- layout.tsx: JSON-LD Organization sin email/teléfono, con slogan y `sameAs` al grupo; keywords vecinales.

Stage Summary:
- CANAL ÚNICO DE SOLICITUD: grupo de WhatsApp (secretaría incluida). Fuente única del enlace: `SITE.whatsappGroup.url` en src/lib/site-config.ts — SOLO hay que reemplazar esa URL por la de invitación real del grupo y todo el sitio se actualiza.
- Los números de teléfono de los anuncios siguen visibles (campo requerido) con enlace tel:, pero el CTA de pedir apunta al grupo.
- ESLint: 0 errores/avisos. Dev server: GET / 200, /api/views 200, sin errores de runtime en dev.log.
- Verificado con agent-browser (1280px y 390px): hero, buscador ("pan" → resultado con Pedir al grupo), ficha (4 acciones + nota), FAQ (20 preguntas, acordeón secretaría OK), Anúnciate (paso 2 → grupo), footer (Unirme al grupo), menú móvil, barra fija móvil con WhatsApp→grupo, estado vacío del buscador con doble CTA. Consola sin errores.
- PENDIENTE PARA EL USUARIO: 1) reemplazar la URL provisional del grupo en src/lib/site-config.ts; 2) (opcional) reemplazar imágenes de ejemplo en /public/images/ por fotos reales manteniendo los nombres de archivo.
