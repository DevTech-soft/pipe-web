import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { featuredProducts } from "@/lib/catalog";
import { SectionHeading } from "./SectionHeading";

export function BestSellers() {
  return (
    <section id="productos" className="bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading tone="dark" eyebrow="Lo más pedido" title="Los que más se llevan">
            Agrégalos a tu bolsa y envíanos el pedido completo en un solo mensaje.
          </SectionHeading>
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Ver toda la tienda
            <ArrowIcon className="size-4 transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">
          {featuredProducts.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
