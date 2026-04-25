import { CategoryTiles } from "@/components/category-tiles";
import { DealOfTheDay } from "@/components/deal-of-the-day";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import { TrustBar } from "@/components/trust-bar";
import { ProductRail } from "@/features/products/components/product-rail";
import {
  getNewArrivals,
  getTopRated,
  getTrending,
} from "@/features/products/queries";

const siteUrl = "https://bhalow.com";

function HomeJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Bhalow",
      url: siteUrl,
      logo: `${siteUrl}/opengraph-image`,
      sameAs: [
        "https://instagram.com/bhalow",
        "https://facebook.com/bhalow",
        "https://twitter.com/bhalow",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Bhalow",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage() {
  const [newArrivals, trending, topRated] = await Promise.all([
    getNewArrivals(),
    getTrending(),
    getTopRated(),
  ]);

  return (
    <>
      <SiteHeader />
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <CategoryTiles />
        <ProductRail
          id="new-arrivals"
          title="New arrivals"
          viewAllHref="/new"
          products={newArrivals}
          prioritizeFirst
        />
        <ProductRail
          id="trending"
          title="Trending now"
          viewAllHref="/trending"
          products={trending}
        />
        <DealOfTheDay />
        <ProductRail
          id="top-rated"
          title="Top rated"
          viewAllHref="/top-rated"
          products={topRated}
        />
        <TrustBar />
        <Newsletter />
      </main>
      <SiteFooter />
      <HomeJsonLd />
    </>
  );
}
