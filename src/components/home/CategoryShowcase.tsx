import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/catalog";
import { SectionHeading } from "./SectionHeading";

/** Posición en la grilla de 4 columnas: una grande, cuatro sencillas y dos anchas. */
const layout = [
  "col-span-2 row-span-2 aspect-square sm:aspect-auto",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "col-span-2 aspect-[16/10] sm:aspect-[2/1]",
  "col-span-2 aspect-[16/10] sm:aspect-[2/1]",
];

export function CategoryShowcase() {
  const withPhoto = categories.filter((c) => c.image);
  const rest = categories.filter((c) => !c.image);

  return (
    <section id="categorias" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Categorías" title="Elige por antojo">
          Del ramen más picante de Corea a las gomitas a granel de toda la vida.
        </SectionHeading>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {withPhoto.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.04} className={layout[i]}>
              <Link
                href={`/catalogo?categoria=${c.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-grape-900"
              >
                {c.image && (
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                    style={{ objectPosition: c.imageFocus }}
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] [@media(hover:hover)]:group-hover:scale-[1.05]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <h3 className={`font-display font-extrabold tracking-tight ${i === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>
                      {c.name}
                    </h3>
                    <p className={`mt-1 text-sm text-cream/75 ${i === 0 ? "" : "hidden sm:block"}`}>{c.blurb}</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-ink transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5">
                    <ArrowIcon className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-cream/55">También tenemos:</span>
          {rest.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo?categoria=${c.slug}`}
              className="pressable rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-cream/85 hover:border-cream/50 hover:text-cream"
            >
              {c.name}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
