type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-clay">{description}</p> : null}
    </div>
  );
}
