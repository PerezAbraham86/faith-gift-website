import { SectionHeader } from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-sand/70 bg-linen p-5 shadow-soft">
          <div className="flex min-h-80 items-center justify-center rounded-md bg-gradient-to-br from-cream to-sand">
            <p className="max-w-xs text-center font-serif text-3xl text-cocoa">A home business built with prayer and care</p>
          </div>
        </div>
        <div className="self-center">
          <SectionHeader eyebrow="Our story" title="Faith-filled gifts made for real homes" />
          <p className="mt-6 text-lg leading-8 text-clay">
            We are building a Christian family business from home, creating faith-filled gifts that
            bring Scripture, peace, prayer, and family memories into everyday spaces.
          </p>
          <p className="mt-5 leading-7 text-clay">
            Every product idea begins with the same hope: to help someone feel remembered, encouraged,
            and surrounded by God&apos;s word in the rooms where life actually happens.
          </p>
        </div>
      </div>
    </section>
  );
}
