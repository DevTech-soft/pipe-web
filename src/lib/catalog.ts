import type { StaticImageData } from "next/image";

import clienteTarrito from "@/assets/images/cliente-tarrito.webp";
import feastables from "@/assets/images/feastables.webp";
import monstruTarritos from "@/assets/images/monstru-tarritos.webp";
import paraiso from "@/assets/images/paraiso-del-dulce.webp";
import ramenHot from "@/assets/images/ramen-hot.webp";
import ramoFerrero from "@/assets/images/ramo-ferrero.webp";
import ramoGrado from "@/assets/images/ramo-grado.webp";
import ramoRosas from "@/assets/images/ramo-rosas.webp";
import romantizando from "@/assets/images/romantizando.webp";

/**
 * Catálogo tipado. Hoy vive en código; cuando haya panel de administración se
 * reemplaza por una base de datos o CMS manteniendo estos tipos.
 */

export type CategorySlug =
  | "gomitas"
  | "pipe-tarritos"
  | "chocolates"
  | "importados"
  | "mexicanos"
  | "asiaticos"
  | "americanos"
  | "colombianos"
  | "acidos"
  | "bebidas"
  | "combos"
  | "detalles"
  | "flores"
  | "lovers";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  /** Foto de portada; las categorías con foto se destacan en el inicio. */
  image?: StaticImageData;
  /** Punto de la foto que debe quedar visible al recortarla (object-position). */
  imageFocus?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  image: StaticImageData | string;
  /** Punto de la foto que debe quedar visible al recortarla (object-position). */
  imageFocus?: string;
  /** Precio en COP. Opcional mientras los precios se confirman. */
  price?: number;
  badge?: string;
  featured?: boolean;
};

export const categories: Category[] = [
  { slug: "pipe-tarritos", name: "Pipe Tarritos", blurb: "Tu tarro armado con las gomitas que elijas.", image: romantizando },
  { slug: "asiaticos", name: "Asiáticos", blurb: "Buldak, Samyang y snacks coreanos.", image: ramenHot },
  { slug: "importados", name: "Importados", blurb: "Lo que no llega al supermercado.", image: paraiso },
  { slug: "chocolates", name: "Chocolates", blurb: "Feastables y ediciones limitadas.", image: feastables },
  { slug: "gomitas", name: "Gomitas", blurb: "Ositos, aros y gusanitos a granel.", image: clienteTarrito, imageFocus: "75% 92%" },
  { slug: "flores", name: "Flores", blurb: "Ramos con rosas, peluches y chocolates.", image: ramoRosas },
  { slug: "detalles", name: "Detalles", blurb: "Regalos para grados y cumpleaños.", image: ramoGrado },
  { slug: "mexicanos", name: "Mexicanos", blurb: "Enchilados, tamarindo y chamoy." },
  { slug: "americanos", name: "Americanos", blurb: "Los dulces virales de TikTok." },
  { slug: "colombianos", name: "Colombianos", blurb: "Los clásicos de siempre." },
  { slug: "acidos", name: "Ácidos", blurb: "Para los que aguantan la cara de limón." },
  { slug: "bebidas", name: "Bebidas", blurb: "Sodas y bebidas importadas." },
  { slug: "combos", name: "Combos Mex", blurb: "Combos de dulces mexicanos para compartir." },
  { slug: "lovers", name: "Lovers", blurb: "Sorpresas para esa persona especial." },
];

export const products: Product[] = [
  {
    id: "pt-001",
    slug: "pipe-tarrito-clasico",
    name: "Pipe Tarrito clásico",
    category: "pipe-tarritos",
    description: "Tarro lleno de gomitas surtidas: ositos, aros, fresitas y gusanitos ácidos.",
    image: clienteTarrito,
    imageFocus: "75% 92%",
    badge: "Favorito",
    featured: true,
  },
  {
    id: "pt-002",
    slug: "monstru-tarritos",
    name: "Monstru Tarritos",
    category: "pipe-tarritos",
    description: "Edición Halloween: ojos, colmillos y gomitas monstruosas en tres tamaños.",
    image: monstruTarritos,
    badge: "Temporada",
    featured: true,
  },
  {
    id: "as-001",
    slug: "buldak-ramen-picante",
    name: "Buldak · Ramen picante",
    category: "asiaticos",
    description: "El ramen coreano más picante del mundo. ¿Aguantas el reto?",
    image: ramenHot,
    badge: "Picante",
    featured: true,
  },
  {
    id: "im-001",
    slug: "kit-importados",
    name: "Kit de importados",
    category: "importados",
    description: "Ramen, dulces americanos y chuches virales en un solo antojo.",
    image: paraiso,
    featured: true,
  },
  {
    id: "ch-001",
    slug: "feastables-peanut-butter",
    name: "Feastables Peanut Butter",
    category: "chocolates",
    description: "El chocolate de MrBeast relleno de mantequilla de maní. Edición limitada.",
    image: feastables,
    badge: "Edición limitada",
    featured: true,
  },
  {
    id: "fl-001",
    slug: "ramo-ferrero-peluche",
    name: "Ramo Ferrero + peluche",
    category: "flores",
    description: "Ramo blanco con bombones Ferrero Rocher, flores secas y osito de grado.",
    image: ramoFerrero,
    featured: true,
  },
  {
    id: "fl-002",
    slug: "ramo-rosas-rojas",
    name: "Ramo de rosas rojas",
    category: "flores",
    description: "Rosas rojas con nube de gypsophila y coronita. Para enamorar.",
    image: ramoRosas,
  },
  {
    id: "de-001",
    slug: "ramo-de-grado",
    name: "Ramo de grado",
    category: "detalles",
    description: "Flores en los colores favoritos, peluche con birrete y banda Class 2025.",
    image: ramoGrado,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(price?: number) {
  if (price === undefined) return null;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}
