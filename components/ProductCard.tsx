import { Button } from "@/components/Button";

type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  actionLabel?: string;
};

export function ProductCard({
  title,
  description,
  price,
  actionLabel = "Customize",
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-sand/70 bg-linen shadow-soft">
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-cream via-white/50 to-sand">
        <div className="rounded-full border border-gold/40 px-5 py-3 font-serif text-sm text-gold-dark">
          Placeholder image
        </div>
      </div>
      <div className="p-6">
        <p className="font-serif text-xl font-semibold text-cocoa">{title}</p>
        <p className="mt-3 min-h-16 text-sm leading-6 text-clay">{description}</p>
        <p className="mt-4 text-sm font-semibold text-gold-dark">{price}</p>
        <Button href="/build-a-gift-box" variant="secondary" className="mt-5 w-full">
          {actionLabel}
        </Button>
      </div>
    </article>
  );
}
