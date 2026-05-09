import { Button } from "@/components/Button";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredPackages, productCategories } from "@/data/products";

const steps = [
  "Choose a package",
  "Choose a Scripture theme",
  "Personalize your gift",
  "Send with love",
];

export default function Home() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Christian gifts for everyday grace
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] text-cocoa sm:text-6xl lg:text-7xl">
              Faith-filled gifts for peaceful homes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-clay">
              Customize Scripture candles, acrylic stands, calendars, rosary boxes, and prayer gifts
              for the people you love.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/build-a-gift-box">Build a Gift Box</Button>
              <Button href="/products" variant="secondary">
                View Products
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-sand/70 bg-linen p-5 shadow-soft">
            <div className="flex min-h-96 items-center justify-center rounded-md bg-gradient-to-br from-white via-cream to-sand">
              <div className="max-w-xs text-center">
                <p className="font-serif text-4xl text-cocoa">Scripture + home + family</p>
                <p className="mt-4 text-sm leading-6 text-clay">
                  Placeholder product photography for candles, keepsake boxes, and acrylic stands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured packages"
            title="Ready-to-personalize gifts for meaningful moments"
            description="Start from a curated package, then choose the Scripture theme, keepsakes, and add-ons that fit the person receiving it."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredPackages.map((item) => (
              <PackageCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen/70 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader centered title="Shop by category" description="Faith-based pieces designed to feel personal, peaceful, and giftable." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <div key={category} className="rounded-lg border border-sand bg-cream p-5">
                <p className="font-serif text-xl font-semibold text-cocoa">{category}</p>
                <p className="mt-3 text-sm leading-6 text-clay">Custom options available for family, home, prayer, and remembrance.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader centered eyebrow="How it works" title="A simple path to a personal gift" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-sand/70 bg-white/55 p-5 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 font-serif text-xl font-semibold text-cocoa">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cocoa px-4 py-14 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">Social proof</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Loved by families and faith-filled homes</h2>
            <p className="mt-4 leading-7 text-linen">
              Customer stories and reviews will live here as the shop grows.
            </p>
          </div>
          <div className="rounded-lg border border-sand/30 bg-white/10 p-6">
            <p className="font-serif text-2xl">Follow our journey as we build a Christian family business from home.</p>
            <p className="mt-4 text-sm leading-6 text-linen">
              TikTok and YouTube updates can share behind-the-scenes making, packaging, prayerful
              product ideas, and family business milestones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
