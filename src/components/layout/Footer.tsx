import Link from "next/link";

import { Wordmark } from "@/components/brand/Wordmark";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Link href="/" className="text-4xl">
            <Wordmark stacked />
          </Link>
          <p className="max-w-xs text-cream/60">
            Dulces importados, gomitas a granel y regalos con flores. Desde Bucaramanga para toda Colombia.
          </p>
          <div className="flex gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Pipe Gomitas"
              className="pressable grid size-11 place-items-center rounded-full border border-white/15 hover:border-cream/50"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Pipe Gomitas"
              className="pressable grid size-11 place-items-center rounded-full border border-white/15 hover:border-cream/50"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Categorías">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream/45">Tienda</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-cream/75">
            {categories.slice(0, 10).map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo?categoria=${c.slug}`} className="transition-colors hover:text-cream">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream/45">Contacto</h3>
          <address className="flex flex-col gap-2.5 text-sm not-italic text-cream/75">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              {site.address.street}, {site.address.neighborhood}
              <br />
              {site.address.city}, {site.address.region}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              WhatsApp {site.whatsappDisplay}
            </a>
            <a href={site.florist.url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              Floristería aliada {site.florist.handle}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-cream/40">
        © <CopyrightYear /> {site.name} · Bucaramanga, Colombia
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
