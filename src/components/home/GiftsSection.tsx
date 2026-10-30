import Image from "next/image";

import ramoFerrero from "@/assets/images/ramo-ferrero.webp";
import ramoGrado from "@/assets/images/ramo-grado.webp";
import ramoRosas from "@/assets/images/ramo-rosas.webp";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

const gifts = [
  { image: ramoRosas, title: "Rosas rojas", body: "Con gypsophila y coronita" },
  { image: ramoGrado, title: "Ramo de grado", body: "Peluche con birrete y banda" },
  { image: ramoFerrero, title: "Ferrero + peluche", body: "Bombones y flores secas" },
];

export function GiftsSection() {
  return (
    <section id="regalos" className="bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col items-start gap-8 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading tone="dark" eyebrow="Regalos y flores" title="Un detalle armado a la medida">
              Flores en sus colores favoritos, peluches, chocolates y dulces, con nuestra floristería aliada{" "}
              {site.florist.name}. Cuéntanos la ocasión y el presupuesto, y te mandamos opciones.
            </SectionHeading>
            <Reveal className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink("¡Hola Pipe Gomitas! Quiero armar un regalo. La ocasión es: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex h-13 items-center gap-2 rounded-full bg-ink px-7 font-semibold text-paper hover:bg-grape-800"
              >
                <WhatsAppIcon className="size-4" />
                Cotizar un regalo
              </a>
              <a
                href={site.florist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink/70 underline underline-offset-4 hover:text-ink"
              >
                Ver {site.florist.handle}
              </a>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {gifts.map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 0.06} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-paper-2">
                    <Image src={g.image} alt={g.title} fill placeholder="blur" sizes="(min-width: 640px) 22vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="pt-3">
                    <span className="block font-display font-bold">{g.title}</span>
                    <span className="text-sm text-ink/60">{g.body}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
