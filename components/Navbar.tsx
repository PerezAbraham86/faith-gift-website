import Link from "next/link";
import { Button } from "@/components/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/build-a-gift-box", label: "Build" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand/60 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl font-semibold text-cocoa">
          Faith Gift Co.
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-clay transition hover:text-gold-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button href="/build-a-gift-box" className="hidden sm:inline-flex">
          Customize
        </Button>
      </nav>
      <div className="flex gap-4 overflow-x-auto border-t border-sand/50 px-4 py-3 md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 text-sm font-medium text-clay">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
