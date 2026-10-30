import Image from "next/image";
import Link from "next/link";

import fachada from "@/assets/images/fachada-noche.webp";
import paraiso from "@/assets/images/paraiso-del-dulce.webp";
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="flex flex-col items-start">
          <p className="animate-rise mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-gum-yellow">
            Tienda de dulces · Cabecera, Bucaramanga
          </p>

          <h1
            className="animate-rise font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-tight text-balance"
            style={{ animationDelay: "60ms" }}
          >
            Dulces importados que no encuentras en el súper.
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-cream/70 text-pretty"
            style={{ animationDelay: "120ms" }}
          >
            Gomitas a granel, ramen coreano, dulces mexicanos y los chocolates que ves en TikTok. Arma tu bolsa
            aquí y te confirmamos el pedido por WhatsApp. Enviamos a todo Colombia.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
            <Link
              href="/catalogo"
              className="pressable group inline-flex h-13 items-center gap-2 rounded-full bg-gum-yellow px-7 font-semibold text-ink hover:bg-[#ffe270]"
            >
              Ver la tienda
              <ArrowIcon className="size-4 transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappLink("¡Hola Pipe Gomitas! Quiero hacer un pedido.")}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex h-13 items-center gap-2 rounded-full border border-cream/20 px-7 font-semibold text-cream hover:border-cream/50"
            >
              <WhatsAppIcon className="size-4" />
              Escríbenos
            </a>
          </div>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-rise mt-10 inline-flex items-center gap-2 text-sm text-cream/55 transition-colors hover:text-cream"
            style={{ animationDelay: "240ms" }}
          >
            <InstagramIcon className="size-4" />
            <span>
              <strong className="font-semibold text-cream">{site.instagramFollowers}</strong> personas siguen{" "}
              {site.instagramHandle}
            </span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="spiral absolute -inset-16 -z-10 opacity-60" />
          <figure
            className="animate-rise relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
            style={{ animationDelay: "100ms" }}
          >
            <Image
              src={fachada}
              alt="Fachada de Pipe Gomitas de noche, con el letrero de neón"
              placeholder="blur"
              priority
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[50%_30%]"
            />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-ink/70 px-4 py-3 text-sm backdrop-blur-md">
              <span>
                <span className="block font-semibold">Nuestra tienda</span>
                <span className="text-cream/65">
                  {site.address.street}, {site.address.neighborhood}
                </span>
              </span>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold text-gum-yellow">
                Cómo llegar
              </a>
            </figcaption>
          </figure>
          <figure
            className="animate-rise absolute -left-6 top-10 hidden w-36 rotate-[-6deg] overflow-hidden rounded-2xl border-4 border-paper shadow-xl sm:block lg:-left-12 lg:w-44"
            style={{ animationDelay: "260ms" }}
          >
            <Image src={paraiso} alt="Clienta con ramen Buldak y dulces importados" placeholder="blur" sizes="176px" />
          </figure>
        </div>
      </div>
    </section>
  );
}
