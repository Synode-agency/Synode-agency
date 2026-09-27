import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import { getContent, path, type Locale } from "@/lib/content";
import { capabilitiesOf, systems, type System } from "@/lib/solutions";

/**
 * Les quatre systèmes, sur la landing.
 *
 * C'est la section qui portait seize cartes de prestations. Seize cartes
 * lisent comme un catalogue, et un catalogue se compare au prix. Quatre
 * systèmes lisent comme une offre, et une offre se compare à un résultat.
 *
 * Chaque carte montre la chaîne des capacités qui la composent, dans
 * l'ordre où elles s'enchaînent. Ce n'est pas de la décoration : c'est la
 * seule chose qui rende visible qu'un système est un assemblage et non un
 * mot. Les quatre chaînes n'ont pas la même longueur, ce qui suffit à
 * différencier les cartes sans leur inventer de couleurs.
 */
export function SolutionsBand({ locale }: { locale: Locale }) {
  const { solutions } = getContent(locale);

  return (
    <section id="solutions" className="section-screen relative">

      <div className="container-page">
        <SectionHeading
          title={renderLines(solutions.title)}
          subtitle={solutions.body}
          align="left"
          className="reveal-left"
        />

        <div className="systems-grid">
          {systems(locale).map((system, i) => (
            <Reveal key={system.slug} delay={80 + i * 90} className="reveal-up">
              <SystemCard locale={locale} system={system} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Une carte système. Elle est un lien entier, pas une carte avec un lien
 * dedans : toute la surface est cliquable, et il n'y a qu'une seule cible
 * pour le clavier au lieu de deux qui mènent au même endroit.
 */
export function SystemCard({
  locale,
  system,
}: {
  locale: Locale;
  system: System;
}) {
  const { solutions } = getContent(locale);
  const caps = capabilitiesOf(locale, system);

  return (
    <Link href={path(locale, `/solutions/${system.slug}`)} className="system-card">
      <span className="system-family">{system.family}</span>

      <h3 className="system-title">{system.title}</h3>
      <p className="system-promise">{system.promise}</p>

      {/* La chaîne, en libellés COURTS. Elle portait les titres complets
          des capacités : « Agent de qualification de prospects » suivi de
          quatre autres de cette longueur se replie sur trois rangs et noie
          la carte. Un maillon se lit d'un coup d'œil ou ne sert à rien.

          `aria-hidden` : les mêmes capacités sont listées en clair, avec
          leur titre entier, sur la page du système. */}
      <span aria-hidden className="system-chain">
        {caps.map((c) => (
          <span key={c.slug} className="system-chain-link">
            {c.short}
          </span>
        ))}
      </span>

      <span className="system-go">
        {solutions.discoverLabel}
        <ArrowRight aria-hidden />
      </span>
    </Link>
  );
}
