import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { SERVICES } from "@/lib/data/services";

/**
 * POST /api/views/[serviceId]
 * Incrementa en 1 el contador de vistas del anuncio (upsert) y devuelve
 * el total actualizado. Los ids desconocidos se rechazan para no
 * inflar la tabla con basura.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ serviceId: string }> },
) {
  const { serviceId } = await params;

  if (!SERVICES.some((service) => service.id === serviceId)) {
    return NextResponse.json(
      { error: "Anuncio desconocido" },
      { status: 404 },
    );
  }

  try {
    const row = await db.serviceView.upsert({
      where: { serviceId },
      update: { views: { increment: 1 } },
      create: { serviceId, views: 1 },
    });

    return NextResponse.json({ serviceId, views: row.views });
  } catch (error) {
    console.error("[api/views] POST", error);
    return NextResponse.json(
      { error: "No se pudo registrar la vista" },
      { status: 500 },
    );
  }
}
