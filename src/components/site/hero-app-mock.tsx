import Image from "next/image";
import { Fragment, type ComponentType, type SVGProps } from "react";
import { Bell, Folder, Mail } from "lucide-react";
import { CalendarIcon, FileIcon } from "@/components/site/icons";
import { getContent, type Locale } from "@/lib/content";

/* Le jeu mélange des glyphes lucide et les icônes dessinées du dossier
   `public/svg-icons`, qui n'ont pas le même type. Le dénominateur commun est
   un composant SVG. */
type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

/** Les quatre entrées de la barre latérale, dans l'ordre de la copie. */
const NAV_ICONS: Glyph[] = [Mail, FileIcon, CalendarIcon, Folder];

/** Les trois temps du flux, de gauche à droite. */
const STEP_ICONS: Glyph[] = [Mail, FileIcon, Bell];

/**
 * Le mock du logiciel, au centre du hero.
 *
 * Il ne prétend pas être une application qui tourne : il montre la forme de
 * ce que l'agence livre, et il raconte un scénario en trois temps — une
 * demande arrive, un devis part, une relance se fait seule. Entièrement
 * décoratif, donc masqué aux technologies d'assistance : rien ici n'est un
 * lien ni une commande.
 *
 * Toutes les dimensions sont en `em` contre une taille de police exprimée en
 * unités de conteneur, donc le panneau entier s'échelonne d'un bloc avec le
 * plateau au lieu de se recomposer à chaque point de rupture.
 */
export function HeroAppMock({ locale }: { locale: Locale }) {
  const { mock } = getContent(locale).hero;

  /* Les deux mots que le texte met en avant. Ils viennent de la copie et non
     du balisage, pour que la traduction puisse en choisir d'autres. */
  const emphasise = (text: string, words: readonly string[]) => {
    const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, i) =>
      words.includes(part) ? (
        <b key={i}>{part}</b>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  };

  return (
    <div aria-hidden className="hero-app">
      {/* ---------------------------- Barre latérale --------------------- */}
      {/* Le curseur. Il entre par le bas du panneau, monte jusqu'à
          « Demandes clients », clique, puis s'efface. C'est lui qui ouvre la
          séquence : le reste du tableau de bord se remplit derrière son
          clic, comme si quelqu'un venait de lancer le programme. */}
      <span className="hero-app-cursor">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 3.2 19 12.4l-5.6.7 3 5.9-2.4 1.2-3-6-3.5 3.9z" />
        </svg>
      </span>

      <aside className="hero-app-side">
        <div className="hero-app-brand">
          <Image src="/synode-mark.png" alt="" width={48} height={48} />
          <span>{mock.appName}</span>
        </div>

        <nav className="hero-app-nav">
          {mock.nav.map((label, i) => {
            const Glyph = NAV_ICONS[i];
            return (
              <span
                key={label}
                className={
                  i === 0 ? "hero-app-nav-row is-active" : "hero-app-nav-row"
                }
              >
                {Glyph && <Glyph />}
                <i>{label}</i>
              </span>
            );
          })}
        </nav>
      </aside>

      {/* ------------------------------ Panneau -------------------------- */}
      <div className="hero-app-main">
        <div className="hero-app-head">
          <h3 className="hero-app-title">
            {mock.title.split("\n").map((line, i, all) => (
              <Fragment key={i}>
                {line}
                {i < all.length - 1 && <br />}
              </Fragment>
            ))}
          </h3>

          {/* L'état du système, en vert : ce qui tourne tourne. */}
          <span className="hero-app-status">
            <i />
            {mock.badge}
          </span>
        </div>

        {/* Le flux. Une étape s'allume, la flèche se trace, la suivante
            s'allume : c'est la séquence qui raconte l'automatisation, pas
            les trois icônes prises séparément. */}
        <div className="hero-app-flow">
          {mock.steps.map((label, i) => {
            const Glyph = STEP_ICONS[i];
            return (
              <Fragment key={label}>
                {i > 0 && (
                  <span className="hero-app-arrow" style={{ "--a": i - 1 } as React.CSSProperties}>
                    <svg viewBox="0 0 36 12" fill="none">
                      <path
                        d="M1 6h30"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M26 1.5 31.5 6 26 10.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}

                <span
                  className="hero-app-step"
                  style={{ "--s": i } as React.CSSProperties}
                >
                  <span className="hero-app-step-disc">
                    {Glyph && <Glyph />}
                    {/* La pastille verte ne concerne que le devis : c'est
                        l'étape où quelque chose est validé. */}
                    {i === 1 && (
                      <span className="hero-app-check">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="m5 12.5 4.5 4.5L19 7.5"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                  <span className="hero-app-step-label">
                    <b>{i + 1}.</b> {label}
                  </span>
                </span>
              </Fragment>
            );
          })}
        </div>

        {/* --------------------------- Deux cartes ---------------------- */}
        <div className="hero-app-bottom">
          <div className="hero-app-card hero-app-example">
            <span className="hero-app-card-title">{mock.caseLabel}</span>
            <p>{emphasise(mock.caseText, mock.caseEmphasis)}</p>

            {/* Le devis, posé de travers derrière le texte. */}
            <span className="hero-app-doc">
              <b>{mock.docLabel}</b>
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="hero-app-card hero-app-gain">
            <span className="hero-app-card-title">{mock.gainLabel}</span>
            <span className="hero-app-chart-value">{mock.gainValue}</span>

            <span className="hero-app-chart">
              <svg viewBox="0 0 120 44" fill="none" preserveAspectRatio="none">
                <path
                  className="hero-app-chart-area"
                  d="M0 36C14 36 20 30 32 27s16 4 28 1 18-16 34-20 26-4 26-4V44H0z"
                  fill="url(#heroGain)"
                />
                <path
                  className="hero-app-chart-line"
                  d="M0 36c14 0 20-6 32-9s16 4 28 1 18-16 34-20 26-4 26-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="heroGain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a7ce0" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0a7ce0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
