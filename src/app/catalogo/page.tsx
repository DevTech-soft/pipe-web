import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { getCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Gomitas, Pipe Tarritos, dulces mexicanos, ramen coreano, chocolates importados y ramos. Arma tu bolsa y pide por WhatsApp con envío a todo Colombia.",
};

export default function CatalogPage({ searchParams }: PageProps<"/catalogo">) {
  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
        <header className="mb-8 flex flex-col gap-3">
          <span className="animate-rise text-sm font-semibold uppercase tracking-[0.16em] text-gum-red">Tienda</span>
          <h1
            className="animate-rise font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight"
            style={{ animationDelay: "60ms" }}
          >
            Todo el antojo
          </h1>
          <p className="animate-rise max-w-xl text-lg text-ink/65" style={{ animationDelay: "120ms" }}>
            Agrega lo que quieras a tu bolsa y envíanos el pedido por WhatsApp. Te confirmamos precios y
            disponibilidad al instante.
          </p>
        </header>
        <Suspense fallback={<CatalogBrowser />}>
          <CatalogFromParams searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function CatalogFromParams({ searchParams }: Pick<PageProps<"/catalogo">, "searchParams">) {
  const { categoria } = await searchParams;
  const initial = typeof categoria === "string" ? getCategory(categoria)?.slug : undefined;
  return <CatalogBrowser key={initial ?? "all"} initialCategory={initial} />;
}
