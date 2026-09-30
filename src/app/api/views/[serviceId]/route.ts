import { NextResponse } from "next/server";

import { SERVICES } from "@/lib/data/services";
import { incrementViewCount } from "@/lib/views-storage";

/**
 * POST /api/views/[serviceId]
 * Incrementa en 1 el contador de vistas del anuncio y devuelve
 * el total actualizado en el archivo JSON.
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
    const views = await incrementViewCount(serviceId);

    return NextResponse.json({ serviceId, views });
  } catch (error) {
    console.error("[api/views] POST", error);
    return NextResponse.json(
      { error: "No se pudo registrar la vista" },
      { status: 500 },
    );
  }
}
