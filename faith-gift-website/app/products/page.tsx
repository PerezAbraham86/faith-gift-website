import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Products"
          title="Custom Christian gifts for home, prayer, and family"
          description="Browse the first product categories. Each card uses placeholder imagery now and can later connect to real products, photos, and checkout."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} actionLabel="View or customize" />
          ))}
        </div>
      </div>
    </section>
  );
}
