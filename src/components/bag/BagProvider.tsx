"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { getProduct, type Product } from "@/lib/catalog";

/**
 * Bolsa de pedido. Hoy termina en un mensaje de WhatsApp; cuando haya pasarela
 * de pago, el checkout consume estas mismas líneas.
 */

export type BagLine = { productId: string; quantity: number };

type BagAction =
  | { type: "add"; productId: string }
  | { type: "set"; productId: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: BagLine[] };

function bagReducer(lines: BagLine[], action: BagAction): BagLine[] {
  switch (action.type) {
    case "add": {
      const existing = lines.find((l) => l.productId === action.productId);
      if (existing) {
        return lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...lines, { productId: action.productId, quantity: 1 }];
    }
    case "set":
      return action.quantity <= 0
        ? lines.filter((l) => l.productId !== action.productId)
        : lines.map((l) => (l.productId === action.productId ? { ...l, quantity: action.quantity } : l));
    case "clear":
      return [];
    case "hydrate":
      return action.lines;
  }
}

const STORAGE_KEY = "pipe-gomitas:bag";

type BagContextValue = {
  lines: (BagLine & { product: Product })[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, dispatch] = useReducer(bagReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  // El primer guardado llegaría antes que la bolsa leída del navegador.
  const skipFirstSave = useRef(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "hydrate", lines: JSON.parse(saved) });
    } catch {
      // Sin almacenamiento disponible: la bolsa vive solo en esta visita.
    }
  }, []);

  useEffect(() => {
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {}
  }, [rawLines]);

  const add = useCallback((product: Product) => dispatch({ type: "add", productId: product.id }), []);
  const setQuantity = useCallback(
    (productId: string, quantity: number) => dispatch({ type: "set", productId, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<BagContextValue>(() => {
    const lines = rawLines.flatMap((line) => {
      const product = getProduct(line.productId);
      return product ? [{ ...line, product }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      clear,
    };
  }, [rawLines, isOpen, open, close, add, setQuantity, clear]);

  return (
    <BagContext value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </BagContext>
  );
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag debe usarse dentro de <BagProvider>");
  return ctx;
}
