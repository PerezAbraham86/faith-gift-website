import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sand/70 bg-linen">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl font-semibold text-cocoa">Faith Gift Co.</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-clay">
            Custom faith-filled gifts for peaceful homes, prayer corners, family memories, and the
            people you love.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">Shop</p>
          <div className="mt-4 grid gap-2 text-sm text-clay">
            <Link href="/build-a-gift-box">Build a Gift Box</Link>
            <Link href="/products">Products</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">Connect</p>
          <div className="mt-4 grid gap-2 text-sm text-clay">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
