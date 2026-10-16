import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-12 sm:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[1.6rem] font-bold leading-snug text-sumi sm:text-[2rem]">
        {title}
      </h2>
      {lead && (
        <p className="jp-body mt-3 max-w-[640px] text-[0.95rem] text-sumi-soft">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
