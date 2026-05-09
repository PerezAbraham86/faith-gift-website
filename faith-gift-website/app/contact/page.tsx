import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";

const inputClass =
  "w-full rounded-md border border-sand bg-white/75 px-4 py-3 text-sm text-cocoa outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

export default function ContactPage() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Contact"
          title="Tell us about your gift idea"
          description="Use this placeholder form for custom order questions, product ideas, and early gift box requests."
        />
        <form className="rounded-lg border border-sand/70 bg-linen p-5 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-cocoa">
              Name
              <input className={inputClass} placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-cocoa">
              Email
              <input className={inputClass} type="email" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-cocoa sm:col-span-2">
              Order type
              <select className={inputClass}>
                <option>Custom gift box</option>
                <option>Product question</option>
                <option>Bulk family gifts</option>
                <option>Other</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-cocoa sm:col-span-2">
              Message
              <textarea className={`${inputClass} min-h-36`} placeholder="Share the occasion, recipient, Scripture, or gift idea." />
            </label>
          </div>
          <Button type="button" className="mt-6 w-full sm:w-auto">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
