"use client";

import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { categories, products, type CategorySlug } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";

export function CatalogBrowser({ initialCategory }: { initialCategory?: CategorySlug }) {
  const [active, setActive] = useState<CategorySlug | undefined>(initialCategory);
  // Al llegar a la página los productos esperan al encabezado; al filtrar aparecen de inmediato.
  const [filtered, setFiltered] = useState(false);
  const activeChip = useRef<HTMLButtonElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);

  // Centra el filtro activo moviendo solo la barra; scrollIntoView movería la página entera.
  useEffect(() => {
    const chip = activeChip.current;
    const bar = toolbar.current;
    if (!chip || !bar) return;
    bar.scrollLeft = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
  }, []);

  const select = (slug?: CategorySlug) => {
    setActive(slug);
    setFiltered(true);
    window.history.replaceState(null, "", slug ? `/catalogo?categoria=${slug}` : "/catalogo");
  };

  const visible = active ? products.filter((p) => p.category === active) : products;
  const activeCategory = categories.find((c) => c.slug === active);

  return (
    <>
      <div
        className="animate-rise sticky top-16 z-30 -mx-4 border-b border-ink/10 bg-paper/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6"
        style={{ animationDelay: "180ms" }}
      >
        <div ref={toolbar} className="relative flex gap-2 overflow-x-auto [scrollbar-width:none]" role="toolbar" aria-label="Filtrar por categoría">
          <Chip label="Todo" active={!active} onClick={() => select()} ref={!active ? activeChip : undefined} />
          {categories.map((c) => (
            <Chip
              key={c.slug}
              label={c.name}
              active={active === c.slug}
              onClick={() => select(c.slug)}
              ref={active === c.slug ? activeChip : undefined}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-ink/55">
        {activeCategory ? activeCategory.blurb : "Una selección de lo que hay en la tienda."} ·{" "}
        {visible.length} {visible.length === 1 ? "producto" : "productos"}
      </p>

      {visible.length > 0 ? (
        // La key reinicia la entrada escalonada cada vez que cambia el filtro.
        <ul key={active ?? "todo"} className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {visible.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(filtered ? 0 : 0.2) + (i % 4) * 0.04}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl bg-paper-2 px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-bold">Aún no subimos {activeCategory?.name.toLowerCase()}</h2>
          <p className="max-w-md text-ink/65">
            En la tienda hay mucho más de lo que ves aquí. Escríbenos y te mandamos fotos y precios.
          </p>
          <a
            href={whatsappLink(`¡Hola Pipe Gomitas! ¿Qué tienen en ${activeCategory?.name ?? "dulces"}?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper"
          >
            <WhatsAppIcon className="size-4" />
            Preguntar por {activeCategory?.name}
          </a>
        </div>
      )}
    </>
  );
}

function Chip({
  label,
  active,
  onClick,
  ref,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`pressable shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
        active ? "bg-ink text-paper" : "bg-paper-2 text-ink/75 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
