import { ChatIcon, StoreIcon, TruckIcon } from "@/components/icons";

const services = [
  { icon: TruckIcon, title: "Envíos a todo Colombia", body: "Despachamos desde Bucaramanga." },
  { icon: ChatIcon, title: "Pedido por WhatsApp", body: "Sin registro ni formularios." },
  { icon: StoreIcon, title: "Recoge en la tienda", body: "Cra 35 #48-67, Cabecera." },
];

export function ServiceStrip() {
  return (
    <section aria-label="Cómo comprar" className="border-y border-white/10 bg-grape-900/60">
      <ul className="mx-auto grid max-w-7xl divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:px-6">
        {services.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-center gap-4 py-5 sm:justify-center sm:px-6">
            <Icon className="size-6 shrink-0 text-gum-yellow" />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-cream/55">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
