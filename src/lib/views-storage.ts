import fs from "node:fs/promises";
import path from "node:path";

/**
 * Almacenamiento liviano en archivo JSON para las vistas de servicios.
 * Reemplaza la base de datos interna (Prisma / SQLite) eliminando dependencias pesadas.
 */

const VIEWS_FILE_PATH = path.join(process.cwd(), "src", "data", "views.json");

// Cache en memoria para lecturas ultrarrápidas
let viewsCache: Record<string, number> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

/**
 * Lee el archivo JSON de vistas o retorna un objeto vacío si no existe aún.
 */
async function loadViews(): Promise<Record<string, number>> {
  if (viewsCache !== null) {
    return viewsCache;
  }

  try {
    const raw = await fs.readFile(VIEWS_FILE_PATH, "utf-8");
    viewsCache = JSON.parse(raw) as Record<string, number>;
  } catch {
    // Si no existe o da error de parseo, inicializarlo vacío
    viewsCache = {};
    await saveViews(viewsCache).catch(() => {});
  }

  return viewsCache;
}

/**
 * Guarda los conteos en el archivo JSON garantizando escrituras secuenciales y seguras.
 */
async function saveViews(data: Record<string, number>): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    try {
      const dir = path.dirname(VIEWS_FILE_PATH);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(VIEWS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("[views-storage] Error guardando views.json:", err);
    }
  });

  return writeQueue;
}

/**
 * Obtiene todas las vistas registradas.
 */
export async function getAllViews(): Promise<Record<string, number>> {
  return await loadViews();
}

/**
 * Incrementa en 1 la vista de un servicio específico y persiste el cambio.
 */
export async function incrementViewCount(serviceId: string): Promise<number> {
  const views = await loadViews();
  const current = views[serviceId] ?? 0;
  const updated = current + 1;
  views[serviceId] = updated;

  // Persistir en segundo plano (sin bloquear la respuesta si no es necesario)
  void saveViews(views);

  return updated;
}
