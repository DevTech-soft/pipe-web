type Props = {
  className?: string;
  color?: string;
};

/** Osito de goma del logo, en SVG para que escale sin perder calidad. */
export function GummyBear({ className, color = "var(--color-gum-red)" }: Props) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <g fill={color}>
        <circle cx="17" cy="9" r="7" />
        <circle cx="47" cy="9" r="7" />
        <ellipse cx="32" cy="20" rx="17" ry="14" />
        <ellipse cx="32" cy="48" rx="19" ry="20" />
        <ellipse cx="11" cy="40" rx="7" ry="9" transform="rotate(-25 11 40)" />
        <ellipse cx="53" cy="40" rx="7" ry="9" transform="rotate(25 53 40)" />
        <ellipse cx="18" cy="64" rx="9" ry="7" />
        <ellipse cx="46" cy="64" rx="9" ry="7" />
      </g>
      <g fill="#fff" opacity="0.45">
        <ellipse cx="25" cy="14" rx="5" ry="3" transform="rotate(-20 25 14)" />
        <ellipse cx="24" cy="40" rx="4" ry="7" transform="rotate(-15 24 40)" />
      </g>
      <g fill="#12051c" opacity="0.55">
        <circle cx="26" cy="20" r="2" />
        <circle cx="38" cy="20" r="2" />
        <ellipse cx="32" cy="25" rx="3" ry="2" />
      </g>
    </svg>
  );
}
