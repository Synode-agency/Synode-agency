import { Check, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceSketch } from "@/lib/service-pages";
import type { Locale } from "@/lib/content";

/**
 * LES VISUELS DU GABARIT DES PAGES SERVICES.
 *
 * Trois composants, utilisés aux mêmes endroits sur les six pages :
 * `ServiceSketch` dans « Qu'est-ce que… », `ServiceFlow` dans « Comment ça
 * fonctionne », `ServiceCore` dans la bande bleu nuit. Aucun n'est
 * interactif : ce sont des dessins faits de blocs et de filets, rendus côté
 * serveur. Pas de 3D, pas de dégradé, pas de forme abstraite.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * `ServiceSketch` a un dessin distinct par service, choisi par `kind` (le
 * `visual` de la famille). Le cas 0, celui des agents, n'y est plus : cette
 * page montre un agent au travail sur toute la largeur de la section, dans
 * `AgentStory`. Des pages qui montreraient le même schéma avec plusieurs
 * jeux d'étiquettes ne diraient plus rien : c'est justement ce dessin qui fait
 * la différence entre un agent, un flux, une application et un pipeline de
 * données. Les quatre autres blocs, eux, sont volontairement identiques
 * partout : c'est ce qui tient les six pages dans le même système.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Tous les textes viennent de `service-pages.ts`. Aucun libellé n'est écrit
 * ici, sinon il échapperait à la traduction.
 */

/** Le petit schéma de la section « Qu'est-ce que… ». Un dessin par service. */
export function ServiceSketch({ kind, data, locale }: { kind: number; data: ServiceSketch; locale: Locale }) {
  const fr = locale === "fr";
  const label = fr ? "Schéma simplifié du fonctionnement" : "Simplified diagram of how it works";

  return (
    <figure className={`svc-sketch svc-sketch--${kind}`} aria-label={label}>
      <div className="svc-sketch-body" aria-hidden>
        {/* ---- 1 · Une chaîne d'étapes ---- */}
        {kind === 1 && (
          <ol className="sk-chain">
            <li className="is-start">{data.lead}</li>
            {data.nodes.map(node => <li key={node}>{node}</li>)}
            <li className="is-end"><Check />{data.out}</li>
          </ol>
        )}

        {/* ---- 2 · Deux systèmes et ce qui circule entre eux ---- */}
        {kind === 2 && (
          <div className="sk-link">
            <span className="sk-box">{data.lead}</span>
            <ul className="sk-rows">
              {data.nodes.map(node => <li key={node}><i />{node}<i /></li>)}
            </ul>
            <span className="sk-box">{data.out}</span>
          </div>
        )}

        {/* ---- 3 · Une application et ses écrans ---- */}
        {kind === 3 && (
          <div className="sk-app">
            <div className="sk-app-bar"><i /><i /><i /></div>
            <div className="sk-app-body">
              <ul className="sk-app-nav">
                {data.nodes.map(node => <li key={node}>{node}</li>)}
              </ul>
              <div className="sk-app-main">
                <span className="sk-app-title">{data.lead}</span>
                <span className="sk-app-row" />
                <span className="sk-app-row" />
                <span className="sk-app-row sk-app-row--short" />
                <span className="sk-app-done"><Check />{data.out}</span>
              </div>
            </div>
          </div>
        )}

        {/* ---- 4 · Des sources, un traitement, une lecture ---- */}
        {kind === 4 && (
          <div className="sk-data">
            <span className="sk-pill sk-pill--in">{data.lead}</span>
            <ol className="sk-steps">
              {data.nodes.map((node, i) => <li key={node}><em>{i + 1}</em>{node}</li>)}
            </ol>
            <div className="sk-bars">
              {[38, 62, 48, 76, 58, 90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
            </div>
            <span className="sk-pill sk-pill--out"><Check />{data.out}</span>
          </div>
        )}

        {/* ---- 5 · Une progression ---- */}
        {kind === 5 && (
          <div className="sk-path">
            <span className="sk-pill sk-pill--in">{data.lead}</span>
            <ol className="sk-levels">
              {data.nodes.map((node, i) => (
                <li key={node}>
                  <strong>{node}</strong>
                  <span className="sk-gauge"><i style={{ width: `${((i + 1) / data.nodes.length) * 100}%` }} /></span>
                </li>
              ))}
            </ol>
            <span className="sk-pill sk-pill--out"><Check />{data.out}</span>
          </div>
        )}
      </div>
      <figcaption><ShieldCheck aria-hidden />{data.note}</figcaption>
    </figure>
  );
}

/** Les cinq temps de « Comment ça fonctionne ». Même forme sur les six pages. */
export function ServiceFlow({ steps, locale }: { steps: { title: string; text: string }[]; locale: Locale }) {
  const fr = locale === "fr";
  return (
    <ol className="svc-flow" aria-label={fr ? "Les étapes du fonctionnement" : "The steps involved"}>
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="svc-flow-mark" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** La bande bleu nuit : ce qui reste au centre, et ce qui s'y branche. */
export function ServiceCore({ centre, chips, icon: Icon, locale }: { centre: string; chips: string[]; icon: LucideIcon; locale: Locale }) {
  const fr = locale === "fr";
  const half = Math.ceil(chips.length / 2);
  return (
    <div className="svc-core" role="img" aria-label={fr ? `${centre}, relié à : ${chips.join(", ")}.` : `${centre}, connected to: ${chips.join(", ")}.`}>
      <ul className="svc-core-row" aria-hidden>
        {chips.slice(0, half).map(chip => <li key={chip}>{chip}</li>)}
      </ul>
      <span className="svc-core-hub" aria-hidden>
        <Icon />
        <strong>{centre}</strong>
      </span>
      <ul className="svc-core-row" aria-hidden>
        {chips.slice(half).map(chip => <li key={chip}>{chip}</li>)}
      </ul>
    </div>
  );
}

