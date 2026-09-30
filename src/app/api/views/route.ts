import { NextResponse } from "next/server";

import { SERVICES } from "@/lib/data/services";
import { getAllViews } from "@/lib/views-storage";

/**
 * GET /api/views
 * Devuelve un mapa { serviceId: views } con las vistas de todos los
 * anuncios conocidos (incluye los que aún tienen 0 vistas) desde el JSON.
 */
export async function GET() {
  try {
    const storedViews = await getAllViews();

    const counts: Record<string, number> = {};
    for (const service of SERVICES) counts[service.id] = storedViews[service.id] ?? 0;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("[api/views] GET", error);
    return NextResponse.json(
      { counts: {}, error: "No se pudieron cargar las vistas" },
      { status: 500 },
    );
  }
}
