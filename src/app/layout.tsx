import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site-config";
import { SERVICES, CATEGORIES } from "@/lib/data/services";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} — La guía comercial de tu comunidad`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.legalName,
  keywords: [
    "vecinos y servicios",
    "condominio la rueda",
    "directorio comunitario",
    "servicios de vecinos",
    "emprendimientos del condominio",
    "guía comercial",
    "comercio local",
    "productos vecinos",
    "guía hecha por y para los vecinos",
    "grupo de WhatsApp de los vecinos",
    "comprar a vecinos",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: SITE.url,
    siteName: SITE.legalName,
    title: `${SITE.legalName} — La guía comercial de tu comunidad`,
    description: SITE.description,
    images: [
      {
        url: "/images/hero-guia.png",
        width: 1440,
        height: 720,
        alt: "Ilustración de la comunidad del Condominio La Rueda con pequeñas tiendas de vecinos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.legalName} — La guía comercial de tu comunidad`,
    description: SITE.description,
    images: ["/images/hero-guia.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "community",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1f1b" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Datos estructurados: organización, sitio con buscador y listado de servicios */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      slogan: SITE.tagline,
      description: SITE.description,
      // La guía la administran los vecinos; el canal oficial de contacto
      // y de solicitudes (secretaría incluida) es el grupo de WhatsApp.
      sameAs: [SITE.whatsappGroup.url],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.legalName,
      inLanguage: "es-CR",
      publisher: { "@id": `${SITE.url}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/#buscador?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/#directorio`,
      name: "Directorio de servicios y productos de los vecinos",
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        description: s.description,
        url: `${SITE.url}/#servicios`,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/#categorias`,
      name: "Categorías de la guía",
      numberOfItems: CATEGORIES.length,
      itemListElement: CATEGORIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        description: c.description,
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
