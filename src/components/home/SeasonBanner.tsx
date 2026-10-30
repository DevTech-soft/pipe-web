import Image from "next/image";

import concurso from "@/assets/images/concurso-disfraces.webp";
import monstruTarritos from "@/assets/images/monstru-tarritos.webp";
import { AddToBagButton } from "@/components/product/AddToBagButton";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct } from "@/lib/catalog";

/**
 * Campaña de temporada. Para cambiarla (Navidad, Amor y Amistad…) se edita
 * este objeto, el producto enlazado y las dos imágenes.
 */
const season = {
  eyebrow: "Halloween · hasta el 31 de octubre",
  title: "Monstru Tarritos",
  body: "Gomitas con ojos, colmillos y dientes de vampiro en tres tamaños. Y el 31 ven disfrazado a la tienda: los mejores disfraces se llevan premios.",
  productId: "pt-002",
};

export function SeasonBanner() {
  const product = getProduct(season.productId);

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#1d0b2c] ring-1 ring-lime/25 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-5 p-8 sm:p-12 lg:p-16">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">{season.eyebrow}</span>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-tight">
            {season.title}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-cream/70 text-pretty">{season.body}</p>
          {product && (
            <AddToBagButton
              product={product}
              label="Agregar a la bolsa"
              className="mt-2 !h-13 !bg-lime !px-7 !text-base !text-ink"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="relative aspect-[9/14] overflow-hidden rounded-2xl">
            <Image src={monstruTarritos} alt="Monstru Tarritos de Halloween" fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[9/14] overflow-hidden rounded-2xl">
            <Image src={concurso} alt="Afiche del concurso de disfraces" fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
