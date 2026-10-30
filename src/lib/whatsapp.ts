import { site } from "./site";
import type { Product } from "./catalog";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type Delivery = "tienda" | "envio";

export function bagOrderMessage(
  lines: { product: Product; quantity: number }[],
  delivery: Delivery,
  note: string,
) {
  const items = lines.map((l) => `• ${l.quantity} × ${l.product.name}`).join("\n");
  const how =
    delivery === "tienda" ? "Lo recojo en la tienda (Cabecera)." : "Necesito envío a domicilio.";
  const extra = note.trim() ? `\nNota: ${note.trim()}` : "";
  return `¡Hola Pipe Gomitas! Quiero hacer este pedido:\n\n${items}\n\n${how}${extra}\n\n¿Me confirman precios y disponibilidad?`;
}
