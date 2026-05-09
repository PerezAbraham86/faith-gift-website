import { Button } from "@/components/Button";

type PackageCardProps = {
  title: string;
  description: string;
  price: string;
};

export function PackageCard({ title, description, price }: PackageCardProps) {
  return (
    <article className="rounded-lg border border-sand/70 bg-linen p-6 shadow-soft">
      <div className="flex h-36 items-center justify-center rounded-md bg-gradient-to-br from-cream to-sand/70">
        <span className="font-serif text-5xl text-gold-dark">+</span>
      </div>
      <div className="mt-5">
        <p className="font-serif text-xl font-semibold text-cocoa">{title}</p>
        <p className="mt-3 text-sm leading-6 text-clay">{description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gold-dark">{price}</span>
          <Button href="/build-a-gift-box" className="px-4 py-2 text-xs">
            Build
          </Button>
        </div>
      </div>
    </article>
  );
}
