import { BestSellers } from "@/components/home/BestSellers";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { GiftsSection } from "@/components/home/GiftsSection";
import { Hero } from "@/components/home/Hero";
import { SeasonBanner } from "@/components/home/SeasonBanner";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { VisitSection } from "@/components/home/VisitSection";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CandyStore",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.whatsapp}`,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ServiceStrip />
      <CategoryShowcase />
      <BestSellers />
      <SeasonBanner />
      <GiftsSection />
      <VisitSection />
    </>
  );
}
