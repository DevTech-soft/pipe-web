import { GummyBear } from "./GummyBear";

type Props = {
  className?: string;
  /** Apila "PIPE / GOMITAS" como en el logo original. */
  stacked?: boolean;
};

export function Wordmark({ className = "", stacked = false }: Props) {
  return (
    <span
      className={`inline-flex items-center font-brand leading-[0.85] tracking-wide ${className}`}
      aria-label="Pipe Gomitas"
    >
      <span aria-hidden="true" className={stacked ? "flex flex-col items-start" : "flex gap-[1.05em]"}>
        <span className="relative gum-text">
          PIPE
          <GummyBear className="absolute -right-[0.95em] -top-[0.15em] h-[0.95em] w-auto -rotate-12 drop-shadow-[0_0.05em_0_var(--color-gum-yellow)]" />
        </span>
        <span className="gum-text">GOMITAS</span>
      </span>
    </span>
  );
}
