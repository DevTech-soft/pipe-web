"use client";

import { useEffect, useRef, useState } from "react";

import { useBag } from "@/components/bag/BagProvider";
import { BagIcon, CheckIcon } from "@/components/icons";
import type { Product } from "@/lib/catalog";

const LAYER = "col-start-1 row-start-1 flex items-center justify-center gap-2 transition-[opacity,filter] ease-out";

/**
 * Agrega a la bolsa con un estado "Agregado" breve. Es el único punto de
 * compra de la tienda: tarjetas y páginas no saben qué pasa después.
 */
export function AddToBagButton({
  product,
  label = "Agregar",
  className = "",
}: {
  product: Product;
  label?: string;
  className?: string;
}) {
  const { add } = useBag();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    add(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Agregar ${product.name} a la bolsa`}
      className={`pressable grid h-11 rounded-full px-5 text-sm font-semibold ${
        added ? "bg-gum-red text-cream" : "bg-ink text-paper hover:bg-grape-800"
      } ${className}`}
    >
      <span aria-live="polite" className="sr-only">
        {added ? `${product.name} agregado a la bolsa` : ""}
      </span>
      <span
        aria-hidden
        className={`${LAYER} ${added ? "opacity-0 blur-[2px] duration-150" : "opacity-100 duration-200 delay-100"}`}
      >
        <BagIcon className="size-4" />
        {label}
      </span>
      <span
        aria-hidden
        className={`${LAYER} ${added ? "opacity-100 duration-200 delay-100" : "opacity-0 blur-[2px] duration-150"}`}
      >
        <CheckIcon className="size-4" />
        Agregado
      </span>
    </button>
  );
}
