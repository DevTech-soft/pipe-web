import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Lilita_One } from "next/font/google";

import { BagDrawer } from "@/components/bag/BagDrawer";
import { BagProvider } from "@/components/bag/BagProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const lilita = Lilita_One({ variable: "--font-lilita", weight: "400", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Dulces importados en Bucaramanga`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "dulces importados",
    "gomitas",
    "dulces mexicanos",
    "ramen picante",
    "Buldak",
    "tienda de dulces Bucaramanga",
    "ramos de flores",
    "regalos Bucaramanga",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#16081f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-scroll-behavior="smooth" className={`${lilita.variable} ${bricolage.variable} ${figtree.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <BagProvider>
          <p className="bg-gum-yellow px-4 py-2 text-center text-sm font-semibold text-ink">
            Enviamos a todo Colombia<span className="hidden sm:inline"> · Pedidos por WhatsApp al {site.whatsappDisplay}</span>
          </p>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
