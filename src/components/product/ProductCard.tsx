import Image from "next/image";

import { formatPrice, getCategory, type Product } from "@/lib/catalog";
import { AddToBagButton } from "./AddToBagButton";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const price = formatPrice(product.price);

  return (
    <article className="group flex flex-col text-ink">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          placeholder={typeof product.image === "string" ? "empty" : "blur"}
          style={{ objectPosition: product.imageFocus }}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-4">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{category.name}</span>
        )}
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink/65">{product.description}</p>
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-ink/80">{price ?? "Precio por WhatsApp"}</span>
          <AddToBagButton product={product} className="w-full sm:w-auto" />
        </div>
      </div>
    </article>
  );
}
