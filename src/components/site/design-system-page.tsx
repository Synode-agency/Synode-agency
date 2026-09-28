import { ArrowRight } from "lucide-react";
import { Panel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import type { Locale } from "@/lib/content";

/**
 * La page du design system.
 *
 * Elle n'est pas une documentation écrite à côté du site : elle est rendue
 * par le site lui-même, avec les mêmes classes et les mêmes jetons. Si une
 * valeur change dans `globals.css`, cette page change avec. Une
 * documentation qui peut mentir sur son propre produit ne sert à rien.
 *
 * Les contrastes affichés sont des mesures réelles, calculées une fois selon
 * la formule WCAG et recopiées ici. Ce sont les valeurs limites du système :
 * elles disent pourquoi une couleur ne peut pas bouger, pas qu'elle est
 * jolie.
 *
 * ⚠ Cette page est utile à l'équipe, pas au visiteur : elle est exclue de
 * l'indexation dans son fichier de route.
 */
export function DesignSystemPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <Shell locale={locale}>
      <Panel tone="plain" id="top">
        <Lede
          as="h1"
          kicker="Design system"
          title={fr ? "Un système,\n^pas une charte." : "A system,\n^not a style sheet."}
          text={
            fr
              ? "Tout le site se compose avec ce qui suit. Cette page est rendue par le site lui-même : si une valeur change dans la feuille de style, elle change ici aussi."
              : "The whole site is built from what follows. This page is rendered by the site itself: if a value changes in the stylesheet, it changes here too."
          }
        />
      </Panel>

      {/* ------------------------------------------------- Le principe */}
      <Panel tone="quiet" id="principe">
        <Lede
          kicker={fr ? "Le principe" : "The principle"}
          title={fr ? "Chaque section est\n^une carte posée." : "Every section is\n^a card on a surface."}
          text={
            fr
              ? "Une page Synode est une colonne de panneaux blancs sur un fond teinté. Le fond ne se voit que dans les interstices, et c'est cet écart qui donne au site sa profondeur. Il n'y a rien d'autre à apprendre : deux classes, .deck et .panel, composent tout."
              : "A Synode page is a column of white panels on a tinted ground. The ground only shows in the gaps, and that gap is what gives the site its depth. There is nothing else to learn: two classes, .deck and .panel, build everything."
          }
        />
      </Panel>

      {/* ------------------------------------------------- La couleur */}
      <Panel id="couleur">
        <Lede
          kicker={fr ? "Couleur" : "Colour"}
          title={fr ? "Trois valeurs,\n^et tout le reste en dérive." : "Three values,\n^everything else derives."}
          text={
            fr
              ? "Chaque paire texte sur fond a été mesurée avant d'être écrite. Les ratios ci-dessous sont les limites du système, pas des décorations : ils disent ce qui ne peut pas bouger."
              : "Every text-on-background pair was measured before it was written. The ratios below are the system's limits, not decoration: they say what cannot move."
          }
        />

        <div className="ds-swatches">
          {[
            { name: "background", hex: "#F2F1F1", note: fr ? "Le fond. Point exact où le bleu passe encore 4,5:1 en texte." : "The ground. The exact point where blue still clears 4.5:1 as text." },
            { name: "surface", hex: "#FFFFFF", note: fr ? "La carte. 1,13:1 contre le fond, assez pour se détacher." : "The card. 1.13:1 against the ground, enough to read as an object." },
            { name: "foreground", hex: "#464444", note: "8,58:1 / 9,67:1" },
            { name: "muted-foreground", hex: "#605D5D", note: "5,78:1 / 6,52:1" },
            { name: "text-mono", hex: "#6B6868", note: fr ? "4,90:1 — la plus claire qui passe partout." : "4.90:1 — the lightest that passes everywhere." },
            { name: "brand", hex: "#0067EA", note: "5,09:1" },
            { name: "brand-hover", hex: "#0051B7", note: "7,34:1" },
            { name: "accent", hex: "#E4EDFB", note: fr ? "Fond de pastille. 7,89:1 avec accent-foreground." : "Chip background. 7.89:1 with accent-foreground." },
          ].map((s) => (
            <div key={s.name} className="ds-swatch">
              <span className="ds-swatch-chip" style={{ background: s.hex }} aria-hidden />
              <span className="ds-swatch-name">--{s.name}</span>
              <span className="ds-swatch-hex">{s.hex}</span>
              <span className="ds-swatch-note">{s.note}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ------------------------------------------------- Les tons de panneau */}
      <Panel id="tons" tone="plain">
        <Lede
          kicker={fr ? "Tons de panneau" : "Panel tones"}
          title={fr ? "Quatre tons,\n^et deux ne servent qu'une fois." : "Four tones,\n^two of them once only."}
          text={
            fr
              ? "Le panneau d'encre et le panneau bleu n'apparaissent qu'UNE FOIS par page. Une page où trois panneaux sont colorés n'a plus de point d'appui, et la couleur cesse de vouloir dire quelque chose."
              : "The ink panel and the blue panel appear ONCE per page. A page with three coloured panels has no anchor left, and the colour stops meaning anything."
          }
        />
        <div className="ds-tones">
          <div className="panel ds-tone"><span className="ds-tone-label">.panel</span></div>
          <div className="panel panel--quiet ds-tone"><span className="ds-tone-label">.panel--quiet</span></div>
          <div className="panel panel--ink ds-tone"><span className="ds-tone-label">.panel--ink</span></div>
          <div className="panel panel--brand ds-tone"><span className="ds-tone-label">.panel--brand</span></div>
        </div>
      </Panel>

      {/* ------------------------------------------------- Typographie */}
      <Panel id="typographie" tone="quiet">
        <Lede
          kicker={fr ? "Typographie" : "Type"}
          title={fr ? "Une famille,\n^dix corps." : "One family,\n^ten sizes."}
          text={
            fr
              ? "Anodina, pour les titres comme pour le texte. La différence se fait par le corps et la graisse, jamais par un changement de police : deux familles mal appariées font plus amateur qu'une seule tenue fermement."
              : "Anodina, for headings and for running text. The difference comes from size and weight, never from a change of face: two badly paired families look more amateur than one held firmly."
          }
        />
        <ul className="rows ds-type">
          {[
            ["--fs-display", "2,5 → 5,5rem", fr ? "Titre de page" : "Page title"],
            ["--fs-h2", "1,875 → 3,5rem", fr ? "Titre de section" : "Section title"],
            ["--fs-h3", "1,25 → 1,75rem", fr ? "Titre de bloc" : "Block title"],
            ["--fs-h4", "1,06 → 1,31rem", fr ? "Titre de tuile" : "Tile title"],
            ["--fs-lead", "1,125 → 1,375rem", fr ? "Chapeau de section" : "Section lead"],
            ["--fs-body", "1 → 1,125rem", fr ? "Texte courant" : "Body copy"],
            ["--fs-small", "0,875rem", fr ? "Texte secondaire" : "Secondary text"],
            ["--fs-label", "0,8125rem", fr ? "Chapeau" : "Kicker"],
            ["--fs-micro", "0,75rem", fr ? "Mention, pastille" : "Caption, badge"],
            ["--fs-button", "0,9375rem", fr ? "Bouton" : "Button"],
          ].map(([token, size, use]) => (
            <li key={token}>
              <div className="row row--split">
                <span className="ds-token">{token}</span>
                <span className="row-text">
                  {size} · {use}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {/* ------------------------------------------------- Rayons */}
      <Panel id="rayons">
        <Lede
          kicker={fr ? "Rayons" : "Radii"}
          title={fr ? "Cinq valeurs,\n^une seule règle." : "Five values,\n^one rule."}
          text={
            fr
              ? "Un contenu prend toujours un rayon plus petit que son contenant. Deux rayons égaux emboîtés font une bavure optique le long de l'angle."
              : "Content always takes a smaller radius than its container. Two equal radii nested make an optical smear along the corner."
          }
        />
        <div className="ds-radii">
          {[
            ["--r-xs", "10px", fr ? "Puces, tuiles d'icône" : "Chips, icon tiles"],
            ["--r-sm", "16px", fr ? "Cartes internes, champs" : "Inner cards, fields"],
            ["--r-lg", "28px", fr ? "Panneaux de section" : "Section panels"],
            ["--r-panel", "40px", fr ? "Le hero" : "The hero"],
            ["--r-pill", "∞", fr ? "Boutons, pastilles" : "Buttons, badges"],
          ].map(([token, px, use]) => (
            <div key={token} className="ds-radius">
              <span className="ds-radius-box" style={{ borderRadius: `var(${token})` }} aria-hidden />
              <span className="ds-token">{token}</span>
              <span className="ds-swatch-note">
                {px} · {use}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ------------------------------------------------- Composants */}
      <Panel id="composants" tone="quiet">
        <Lede
          kicker={fr ? "Composants" : "Components"}
          title={fr ? "Ce avec quoi\n^on compose." : "What we build with."}
        />

        <div className="ds-demo">
          <h3 className="ds-demo-title">{fr ? "Boutons" : "Buttons"}</h3>
          <p className="ds-demo-note">
            {fr
              ? "Deux, et pas un troisième. Une page n'a jamais deux boutons pleins."
              : "Two, and no third. A page never has two filled buttons."}
          </p>
          <div className="btn-row">
            <span className="btn btn--primary">
              {fr ? "Réserver un échange" : "Book a call"}
              <ArrowRight aria-hidden />
            </span>
            <span className="btn btn--ghost">{fr ? "Voir les cas d'usage" : "See the use cases"}</span>
          </div>
        </div>

        <div className="ds-demo">
          <h3 className="ds-demo-title">{fr ? "Tuiles" : "Tiles"}</h3>
          <p className="ds-demo-note">
            {fr
              ? "La carte à l'intérieur d'un panneau. Fond plutôt qu'ombre : deux ombres emboîtées font de la boue."
              : "The card inside a panel. A fill rather than a shadow: two nested shadows make mud."}
          </p>
          <div className="tile-grid tile-grid--3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="tile">
                <span className="tile-title">{fr ? `Titre ${i}` : `Title ${i}`}</span>
                <span className="tile-text">
                  {fr
                    ? "Une phrase de démonstration, à la longueur d'une vraie."
                    : "A demo sentence, about as long as a real one."}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ds-demo">
          <h3 className="ds-demo-title">{fr ? "Pastilles d'état" : "Status badges"}</h3>
          <p className="ds-demo-note">
            {fr
              ? "Le visiteur doit savoir ce qu'il regarde avant de le regarder."
              : "A visitor has to know what they are looking at before they look at it."}
          </p>
          <div className="btn-row">
            <span className="badge badge--wip">{fr ? "Outil interne" : "Internal tool"}</span>
            <span className="badge badge--demo">{fr ? "Démonstration" : "Demo"}</span>
            <span className="badge badge--live">{fr ? "Projet client" : "Client project"}</span>
          </div>
        </div>

        <div className="ds-demo">
          <h3 className="ds-demo-title">{fr ? "Emplacement réservé" : "Placeholder"}</h3>
          <p className="ds-demo-note">
            {fr
              ? "Volontairement visible. Un emplacement qu'on ne voit pas est un emplacement qu'on oublie de remplir."
              : "Deliberately visible. A placeholder nobody sees is one nobody remembers to fill."}
          </p>
          <div className="todo">
            <span className="todo-label">{fr ? "À compléter" : "To complete"}</span>
            <p>
              {fr
                ? "Ce bloc attend une information réelle. Il est affiché en clair plutôt que masqué."
                : "This block is waiting for real information. It is shown plainly rather than hidden."}
            </p>
          </div>
        </div>
      </Panel>

      {/* ------------------------------------------------- Accessibilité */}
      <Panel id="accessibilite" tone="ink">
        <Lede
          kicker={fr ? "Accessibilité" : "Accessibility"}
          title={fr ? "Ce qui n'est\n^pas négociable." : "What is not\n^up for debate."}
          text={
            fr
              ? "Ces règles ne sont pas un supplément qu'on ajoute à la fin. Elles font partie du système, au même titre qu'une couleur."
              : "These are not an extra bolted on at the end. They are part of the system, exactly like a colour."
          }
        />
        <ul className="rows">
          {(fr
            ? [
                ["Contraste", "4,5:1 minimum pour le texte courant, 3:1 pour les grands titres. Mesuré, pas estimé."],
                ["Focus", "Un contour visible sur tout ce qui se focalise, inversé en blanc sur les panneaux colorés."],
                ["Cible tactile", "44px minimum sur tout ce qui se touche."],
                ["Mouvement", "Toute animation se coupe sous prefers-reduced-motion."],
                ["Clavier", "Un lien d'évitement en premier élément focalisable, sur chaque page."],
              ]
            : [
                ["Contrast", "4.5:1 minimum for body text, 3:1 for large headings. Measured, not guessed."],
                ["Focus", "A visible ring on anything focusable, inverted to white on coloured panels."],
                ["Touch target", "44px minimum on anything tappable."],
                ["Motion", "Every animation stops under prefers-reduced-motion."],
                ["Keyboard", "A skip link as the first focusable element, on every page."],
              ]
          ).map(([t, d]) => (
            <li key={t}>
              <div className="row row--split">
                <span className="row-title">{t}</span>
                <span className="row-text">{d}</span>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </Shell>
  );
}
