import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { SERVICES } from "@/lib/data/services";

/**
 * GET /api/views
 * Devuelve un mapa { serviceId: views } con las vistas de todos los
 * anuncios conocidos (incluye los que aún tienen 0 vistas).
 */
export async function GET() {
  try {
    const rows = await db.serviceView.findMany();

    const counts: Record<string, number> = {};
    for (const service of SERVICES) counts[service.id] = 0;
    for (const row of rows) counts[row.serviceId] = row.views;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("[api/views] GET", error);
    return NextResponse.json(
      { counts: {}, error: "No se pudieron cargar las vistas" },
      { status: 500 },
    );
  }
}
