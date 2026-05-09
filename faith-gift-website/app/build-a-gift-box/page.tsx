import { GiftBoxBuilder } from "@/components/GiftBoxBuilder";
import { SectionHeader } from "@/components/SectionHeader";

export default function BuildGiftBoxPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Custom order request"
          title="Build a faith-filled gift box"
          description="Choose the package, Scripture theme, personal touches, and add-ons. This first version collects the details before payment or database features are added."
        />
        <div className="mt-8">
          <GiftBoxBuilder />
        </div>
      </div>
    </section>
  );
}
