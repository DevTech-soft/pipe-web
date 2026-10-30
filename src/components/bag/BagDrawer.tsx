"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { getCategory } from "@/lib/catalog";
import { bagOrderMessage, whatsappLink, type Delivery } from "@/lib/whatsapp";
import { useBag } from "./BagProvider";

const drawerEase = [0.32, 0.72, 0, 1] as const;

export function BagDrawer() {
  const { lines, count, isOpen, close, setQuantity, clear } = useBag();
  const [delivery, setDelivery] = useState<Delivery>("tienda");
  const [note, setNote] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper text-ink shadow-2xl"
            initial={{ transform: "translateX(100%)" }}
            animate={{ transform: "translateX(0%)", transition: { duration: 0.45, ease: drawerEase } }}
            exit={{ transform: "translateX(100%)", transition: { duration: 0.28, ease: drawerEase } }}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 id="bag-title" className="font-display text-2xl font-bold tracking-tight">
                Tu bolsa {count > 0 && <span className="text-ink/45">({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Cerrar bolsa"
                className="pressable grid size-10 place-items-center rounded-full hover:bg-ink/5"
              >
                <CloseIcon className="size-5" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <p className="font-display text-xl font-bold">Tu bolsa está vacía</p>
                <p className="text-ink/60">Agrega productos y te armamos el pedido por WhatsApp.</p>
                <button
                  type="button"
                  onClick={close}
                  className="pressable mt-3 rounded-full bg-ink px-6 py-3 font-semibold text-paper"
                >
                  Seguir mirando
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="flex gap-4 py-4"
                      >
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-paper-2">
                          <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                            {getCategory(product.category)?.name}
                          </span>
                          <span className="truncate font-semibold">{product.name}</span>
                          <div className="mt-auto flex items-center gap-1">
                            <QtyButton label={`Quitar un ${product.name}`} onClick={() => setQuantity(product.id, quantity - 1)}>
                              <MinusIcon className="size-3.5" />
                            </QtyButton>
                            <span className="w-8 text-center font-semibold tabular-nums">{quantity}</span>
                            <QtyButton label={`Agregar otro ${product.name}`} onClick={() => setQuantity(product.id, quantity + 1)}>
                              <PlusIcon className="size-3.5" />
                            </QtyButton>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="flex flex-col gap-4 border-t border-ink/10 bg-paper-2/60 px-6 py-5">
                  <fieldset className="grid grid-cols-2 gap-2">
                    <legend className="mb-2 text-sm font-semibold">¿Cómo lo recibes?</legend>
                    <DeliveryOption value="tienda" current={delivery} onChange={setDelivery}>
                      Recojo en tienda
                    </DeliveryOption>
                    <DeliveryOption value="envio" current={delivery} onChange={setDelivery}>
                      Envío a domicilio
                    </DeliveryOption>
                  </fieldset>
                  <label className="flex flex-col gap-1.5 text-sm font-semibold">
                    Nota (opcional)
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ej: es para un regalo de cumpleaños"
                      className="rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-base font-normal outline-none focus:border-ink/50"
                    />
                  </label>
                  <a
                    href={whatsappLink(bagOrderMessage(lines, delivery, note))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable flex items-center justify-center gap-2 rounded-full bg-whatsapp py-4 font-semibold text-ink hover:brightness-105"
                  >
                    <WhatsAppIcon className="size-5" />
                    Enviar pedido por WhatsApp
                  </a>
                  <div className="flex items-center justify-between text-sm text-ink/55">
                    <span>Te confirmamos precios y disponibilidad en el chat.</span>
                    <button type="button" onClick={clear} className="shrink-0 underline underline-offset-2 hover:text-ink">
                      Vaciar
                    </button>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function QtyButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pressable grid size-8 place-items-center rounded-full border border-ink/15 hover:border-ink/40"
    >
      {children}
    </button>
  );
}

function DeliveryOption({
  value,
  current,
  onChange,
  children,
}: {
  value: Delivery;
  current: Delivery;
  onChange: (d: Delivery) => void;
  children: React.ReactNode;
}) {
  const checked = value === current;
  return (
    <label
      className={`pressable cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold ${
        checked ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/40"
      }`}
    >
      <input type="radio" name="delivery" value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {children}
    </label>
  );
}
