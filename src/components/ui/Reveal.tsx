"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos, para escalonar elementos hermanos (30–80 ms). */
  delay?: number;
  as?: "div" | "li" | "section";
};

/** Aparición al entrar en pantalla, una sola vez. Solo transform, opacity y blur. */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: "translateY(18px)", filter: "blur(6px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Tag>
  );
}
