"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  acrylicStandOptions,
  addOns,
  calendarOptions,
  candleScents,
  frameOptions,
  packageTypes,
  rosaryOptions,
  scriptureThemes,
} from "@/data/giftOptions";
import { Button } from "@/components/Button";

type ThemeName = keyof typeof scriptureThemes;

const fieldClass =
  "w-full rounded-md border border-sand bg-white/80 px-4 py-3 text-sm text-cocoa outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

function money(value: number) {
  return `$${value}`;
}

function optionLabel(option: { readonly name: string; readonly price: number }) {
  return option.price > 0 ? `${option.name} (+${money(option.price)})` : option.name;
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`grid gap-2 text-sm font-semibold text-cocoa ${className}`}>
      {label}
      {children}
    </label>
  );
}

function StepSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-sand/70 bg-linen p-5 shadow-soft sm:p-7">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
          {number}
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-cocoa">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-clay">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-b border-sand/70 py-3 last:border-b-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">{label}</p>
      <div className="mt-1 text-sm leading-6 text-cocoa">{value}</div>
    </div>
  );
}

export function GiftBoxBuilder() {
  const [packageName, setPackageName] = useState<string>(packageTypes[0].name);
  const [theme, setTheme] = useState<ThemeName>("Peace & Rest");
  const [verse, setVerse] = useState<string>(scriptureThemes["Peace & Rest"][0]);
  const [candleScent, setCandleScent] = useState<string>(candleScents[0]);
  const [acrylicStand, setAcrylicStand] = useState<string>(acrylicStandOptions[0].name);
  const [frame, setFrame] = useState<string>(frameOptions[0].name);
  const [calendar, setCalendar] = useState<string>(calendarOptions[0].name);
  const [rosary, setRosary] = useState<string>(rosaryOptions[0].name);
  const [prayerCard, setPrayerCard] = useState<string>("Include matching prayer card");
  const [personalization, setPersonalization] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const verses = scriptureThemes[theme];
  const selectedPackage = packageTypes.find((item) => item.name === packageName) ?? packageTypes[0];
  const selectedAcrylic = acrylicStandOptions.find((item) => item.name === acrylicStand) ?? acrylicStandOptions[0];
  const selectedFrame = frameOptions.find((item) => item.name === frame) ?? frameOptions[0];
  const selectedCalendar = calendarOptions.find((item) => item.name === calendar) ?? calendarOptions[0];
  const selectedRosary = rosaryOptions.find((item) => item.name === rosary) ?? rosaryOptions[0];
  const selectedAddOnItems = useMemo(
    () => addOns.filter((item) => selectedAddOns.includes(item.name)),
    [selectedAddOns],
  );

  const pricing = useMemo(() => {
    const optionTotal =
      selectedAcrylic.price + selectedFrame.price + selectedCalendar.price + selectedRosary.price;
    const addOnTotal = selectedAddOnItems.reduce((total, item) => total + item.price, 0);

    return {
      base: selectedPackage.price,
      options: optionTotal,
      addOns: addOnTotal,
      total: selectedPackage.price + optionTotal + addOnTotal,
    };
  }, [
    selectedAcrylic.price,
    selectedAddOnItems,
    selectedCalendar.price,
    selectedFrame.price,
    selectedPackage.price,
    selectedRosary.price,
  ]);

  function handleThemeChange(nextTheme: ThemeName) {
    setTheme(nextTheme);
    setVerse(scriptureThemes[nextTheme][0]);
  }

  function toggleAddOn(name: string) {
    setSelectedAddOns((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  const orderSummary = (
    <aside className="h-fit rounded-lg border border-sand/70 bg-white/75 p-5 shadow-soft lg:sticky lg:top-28 lg:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">Order summary</p>
      <p className="mt-4 font-serif text-5xl font-semibold text-cocoa">{money(pricing.total)}</p>
      <p className="mt-2 text-sm text-clay">Estimated custom order total</p>

      <div className="mt-6 rounded-md bg-linen p-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-clay">Package base</span>
          <span className="font-semibold text-cocoa">{money(pricing.base)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 text-sm">
          <span className="text-clay">Selected options</span>
          <span className="font-semibold text-cocoa">{money(pricing.options)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 text-sm">
          <span className="text-clay">Add-ons</span>
          <span className="font-semibold text-cocoa">{money(pricing.addOns)}</span>
        </div>
      </div>

      <div className="mt-4">
        <SummaryRow label="Package" value={selectedPackage.name} />
        <SummaryRow label="Scripture theme" value={theme} />
        <SummaryRow label="Verse" value={verse} />
        <SummaryRow label="Candle scent" value={candleScent} />
        <SummaryRow
          label="Decor options"
          value={
            <div className="grid gap-1">
              <span>{optionLabel(selectedAcrylic)}</span>
              <span>{optionLabel(selectedFrame)}</span>
              <span>{optionLabel(selectedCalendar)}</span>
              <span>{optionLabel(selectedRosary)}</span>
              <span>{prayerCard}</span>
            </div>
          }
        />
        <SummaryRow
          label="Add-ons"
          value={
            selectedAddOnItems.length > 0
              ? selectedAddOnItems.map((item) => `${item.name} (+${money(item.price)})`).join(", ")
              : "No add-ons selected"
          }
        />
      </div>

      <p className="mt-5 text-xs leading-5 text-clay">
        Final pricing can be confirmed after photos, personalization, and production details are reviewed.
      </p>
    </aside>
  );

  if (isSubmitted) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_23rem]">
        <div className="rounded-lg border border-sand/70 bg-linen p-6 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">Request received</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-cocoa">
            Your custom gift box request is ready to review.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-clay">
            This frontend-only confirmation shows what a customer will see after submitting. No
            payment, database entry, or email has been created yet.
          </p>
          <div className="mt-8 grid gap-4 rounded-lg border border-sand bg-white/60 p-5">
            <SummaryRow label="Package" value={selectedPackage.name} />
            <SummaryRow label="Scripture" value={`${theme}: ${verse}`} />
            <SummaryRow label="Personalization" value={personalization || "No personalization entered"} />
            <SummaryRow label="Gift message" value={giftMessage || "No gift message entered"} />
            <SummaryRow label="Estimated total" value={<span className="font-semibold">{money(pricing.total)}</span>} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setIsSubmitted(false)}>
              Edit Request
            </Button>
            <Button href="/products" variant="secondary">
              View Products
            </Button>
          </div>
        </div>
        {orderSummary}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_23rem]">
      <div className="grid gap-6">
        <StepSection
          number="1"
          title="Choose your package"
          description="Start with the gift size and occasion. Each package has a base price and included pieces."
        >
          <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
            <Field label="Package type">
              <select className={fieldClass} value={packageName} onChange={(event) => setPackageName(event.target.value)}>
                {packageTypes.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} - {money(item.price)}
                  </option>
                ))}
              </select>
            </Field>
            <div className="rounded-md border border-sand bg-white/60 p-4">
              <p className="font-serif text-xl font-semibold text-cocoa">{selectedPackage.name}</p>
              <p className="mt-2 text-sm leading-6 text-clay">{selectedPackage.description}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold-dark">
                What's included
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-clay">
                {selectedPackage.included.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </StepSection>

        <StepSection
          number="2"
          title="Select the Scripture and scent"
          description="Choose the message and candle scent that best fit the recipient."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Scripture theme">
              <select className={fieldClass} value={theme} onChange={(event) => handleThemeChange(event.target.value as ThemeName)}>
                {Object.keys(scriptureThemes).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Verse">
              <select className={fieldClass} value={verse} onChange={(event) => setVerse(event.target.value)}>
                {verses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Candle scent" className="md:col-span-2">
              <select className={fieldClass} value={candleScent} onChange={(event) => setCandleScent(event.target.value)}>
                {candleScents.map((scent) => (
                  <option key={scent}>{scent}</option>
                ))}
              </select>
            </Field>
          </div>
        </StepSection>

        <StepSection
          number="3"
          title="Choose keepsake options"
          description="Add home decor pieces, keepsakes, and prayer details. Options with upgrades update the estimate."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Acrylic stand option">
              <select className={fieldClass} value={acrylicStand} onChange={(event) => setAcrylicStand(event.target.value)}>
                {acrylicStandOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Frame option">
              <select className={fieldClass} value={frame} onChange={(event) => setFrame(event.target.value)}>
                {frameOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Calendar option">
              <select className={fieldClass} value={calendar} onChange={(event) => setCalendar(event.target.value)}>
                {calendarOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Rosary option">
              <select className={fieldClass} value={rosary} onChange={(event) => setRosary(event.target.value)}>
                {rosaryOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Prayer card option" className="md:col-span-2">
              <select className={fieldClass} value={prayerCard} onChange={(event) => setPrayerCard(event.target.value)}>
                <option>Include matching prayer card</option>
                <option>Include family prayer card</option>
                <option>No prayer card</option>
              </select>
            </Field>
          </div>
        </StepSection>

        <StepSection
          number="4"
          title="Personalize the gift"
          description="Add the details that make the gift feel specific to the person, home, or occasion."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Personalization text">
              <input
                className={fieldClass}
                value={personalization}
                onChange={(event) => setPersonalization(event.target.value)}
                placeholder="Family name, date, or short blessing"
              />
            </Field>
            <Field label="Photo upload placeholder">
              <input className={fieldClass} type="file" />
            </Field>
            <Field label="Gift message" className="md:col-span-2">
              <textarea
                className={`${fieldClass} min-h-32`}
                value={giftMessage}
                onChange={(event) => setGiftMessage(event.target.value)}
                placeholder="Write a note for the recipient"
              />
            </Field>
          </div>
        </StepSection>

        <StepSection
          number="5"
          title="Add final touches"
          description="Optional add-ons help turn a simple gift into a fuller keepsake package."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {addOns.map((addOn) => (
              <label
                key={addOn.name}
                className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-sand bg-white/60 px-4 py-3 text-sm text-cocoa transition hover:border-gold"
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 accent-gold"
                    checked={selectedAddOns.includes(addOn.name)}
                    onChange={() => toggleAddOn(addOn.name)}
                  />
                  {addOn.name}
                </span>
                <span className="shrink-0 font-semibold text-gold-dark">+{money(addOn.price)}</span>
              </label>
            ))}
          </div>
        </StepSection>

        <Button type="submit" className="w-full sm:w-auto">
          Submit Custom Order Request
        </Button>
      </div>

      {orderSummary}
    </form>
  );
}
