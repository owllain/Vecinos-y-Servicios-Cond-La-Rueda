import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ServiceCarousel } from "@/components/site/service-carousel";
import { CategoriesSection } from "@/components/site/categories-section";
import { DirectorySection } from "@/components/site/directory-section";
import { SiteMapSection } from "@/components/site/site-map-section";
import { AnnounceStrip } from "@/components/site/announce-strip";
import { Footer } from "@/components/site/footer";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";

/**
 * Vecinos y Servicios · Condominio La Rueda
 * Guía comercial comunitaria — una sola página con secciones ancla:
 * inicio → buscador → destacados → categorías → directorio → faq → mapa → anúnciate
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="contenido" className="flex-1 pb-20 md:pb-0">
        {/* Portada de la guía con doble ruta (Ley de Hick) */}
        <Hero />

        {/* Carrusel de destacados estilo guía turística */}
        <ServiceCarousel />

        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          <hr className="border-border/60" />
        </div>

        {/* Categorías predefinidas (Ley de Miller) */}
        <CategoriesSection />

        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          <hr className="border-border/60" />
        </div>

        {/* Directorio completo con filtros sincronizados */}
        <DirectorySection />
        {/* Mapa del sitio: índice visual de la guía */}
        <SiteMapSection />
        {/* Cómo anunciar tu servicio (3 pasos) */}
        <AnnounceStrip />
      </main>
      <Footer />
      {/* Espacio para la barra fija móvil (Ley de Fitts) sin tapar el footer */}
      <div aria-hidden className="h-[72px] md:hidden" />
      <MobileStickyBar />
    </div>
  );
}
