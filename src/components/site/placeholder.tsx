/**
 * Un emplacement réservé, assumé comme tel.
 *
 * Il sert partout où la matière manque encore : les sections de la landing qui
 * attendent un vrai cas d'usage, de vrais chiffres ou un vrai outil gratuit,
 * et le corps des pages de service.
 *
 * Il est volontairement visible plutôt que discret. Un bloc vide se confond
 * avec un bug ; un bloc qui dit ce qu'il attend est une liste de choses à
 * faire, posée là où elles iront. Et il vaut mieux qu'un texte inventé, qui
 * finirait publié par accident.
 *
 * `data-placeholder` le rend repérable d'un `grep` avant la mise en ligne.
 */
export function Placeholder({
  label,
  text,
  note,
}: {
  label: string;
  text: string;
  note?: string;
}) {
  return (
    <div
      data-placeholder
      className="rounded-[var(--r-sm)] border border-dashed border-[color-mix(in_oklab,var(--brand)_35%,transparent)] bg-[color-mix(in_oklab,var(--brand)_4%,transparent)] px-[clamp(1.1rem,2.2vw,2rem)] py-[clamp(1.4rem,2.6vw,2.4rem)]"
    >
      <span className="eyebrow text-brand">{label}</span>
      <p className="mt-2 max-w-[56ch] text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
        {text}
      </p>
      {note && (
        <p className="mt-2 max-w-[56ch] text-[length:var(--fs-small)] leading-[var(--lh-body)] font-light text-text-mono">
          {note}
        </p>
      )}
    </div>
  );
}
