import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { FaqSection } from "@/components/site/faq-section";

export const metadata = {
  title: "Preguntas Frecuentes | Condominio La Rueda",
  description: "Encuentra respuestas a las preguntas más comunes sobre la guía de vecinos del Condominio La Rueda.",
};

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="contenido" className="flex-1 pb-20 md:pb-0 pt-24">
        <FaqSection />
      </main>
      <Footer />
      {/* Espacio para la barra fija móvil sin tapar el footer */}
      <div aria-hidden className="h-[72px] md:hidden" />
      <MobileStickyBar />
    </div>
  );
}
