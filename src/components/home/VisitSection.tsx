import Image from "next/image";

import estantes from "@/assets/images/tienda-estantes.webp";
import tiendaRamen from "@/assets/images/tienda-ramen.webp";
import { PinIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

export function VisitSection() {
  return (
    <section id="visitanos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visítanos" title="Ven a escoger en persona">
          Pasillos de tarros de gomitas, estantes de ramen coreano y bebidas importadas.
        </SectionHeading>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={tiendaRamen} alt="Clientes eligiendo ramen en la tienda" fill placeholder="blur" sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={estantes} alt="Estantes con dulces importados" fill placeholder="blur" sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover object-bottom" />
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col overflow-hidden rounded-2xl bg-grape-900 ring-1 ring-white/10">
            <iframe
              title="Mapa de Pipe Gomitas en Google Maps"
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-60 w-full flex-1 invert-[0.9] hue-rotate-180 saturate-[0.6] lg:h-auto"
            />
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex gap-3">
                <PinIcon className="mt-1 size-5 shrink-0 text-gum-yellow" />
                <address className="not-italic">
                  <span className="block font-display text-2xl font-bold tracking-tight">{site.address.street}</span>
                  <span className="text-cream/65">
                    {site.address.neighborhood}, {site.address.city}, {site.address.region}
                  </span>
                </address>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex h-12 items-center rounded-full bg-gum-yellow px-6 font-semibold text-ink hover:bg-[#ffe270]"
                >
                  Cómo llegar
                </a>
                <a
                  href={whatsappLink("¡Hola Pipe Gomitas! ¿Qué horario tienen hoy?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex h-12 items-center gap-2 rounded-full border border-cream/20 px-6 font-semibold hover:border-cream/50"
                >
                  <WhatsAppIcon className="size-4" />
                  Preguntar horario
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
