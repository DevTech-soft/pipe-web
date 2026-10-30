"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { useBag } from "@/components/bag/BagProvider";
import { Wordmark } from "@/components/brand/Wordmark";
import { BagIcon } from "@/components/icons";

const links = [
  { href: "/catalogo", label: "Tienda" },
  { href: "/#categorias", label: "Categorías" },
  { href: "/#regalos", label: "Regalos y flores" },
  { href: "/#visitanos", label: "Visítanos" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="text-2xl" onClick={() => setMenuOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-cream/75 transition-colors hover:bg-white/5 hover:text-cream"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <BagButton />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="pressable grid size-11 place-items-center rounded-full hover:bg-white/5 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-cream transition-transform duration-200 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-cream transition-transform duration-200 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="border-t border-white/10 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-display text-xl font-bold text-cream"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function BagButton() {
  const { count, open } = useBag();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Abrir bolsa, ${count} ${count === 1 ? "producto" : "productos"}`}
      className="pressable relative flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-cream hover:bg-white/5"
    >
      <BagIcon className="size-5" />
      <span className="hidden sm:inline">Bolsa</span>
      <AnimatePresence initial={false} mode="popLayout">
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ opacity: 0, transform: "scale(0.6)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.8)", transition: { duration: 0.12 } }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.35 }}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-gum-yellow px-1.5 text-xs font-bold text-ink tabular-nums"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
