"use client";

import { useEffect, useState } from "react";
import { ServiceDialog } from "@/components/site/service-dialog";
import { SERVICES, type ServiceListing } from "@/lib/data/services";

export function SharedServiceHandler() {
  const [shared, setShared] = useState<ServiceListing | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("anuncio");
    if (id) {
      const svc = SERVICES.find((s) => s.id === id);
      if (svc) {
        setShared(svc);
      }
    }
  }, []);

  return (
    <ServiceDialog
      service={shared}
      open={!!shared}
      onOpenChange={(open) => {
        if (!open) {
          setShared(null);
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("anuncio");
          window.history.replaceState({}, "", newUrl.toString());
        }
      }}
    />
  );
}
