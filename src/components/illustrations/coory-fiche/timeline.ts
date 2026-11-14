/* eslint-disable @typescript-eslint/ban-ts-comment -- copie exacte de l'original */
// @ts-nocheck -- copie à l'identique du JavaScript d'origine, voir plus bas.
/**
 * L'ÉTAT DE L'ILLUSTRATION ILL-03 « FICHE SPORTIF » À L'INSTANT t (boucle de 12 s).
 *
 * ⚠ Le corps de `computeFrame` est une COPIE EXACTE du corps de
 * `renderVals()` dans `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-03/logic.original.js`.
 * Seules trois choses ont changé, parce que `this` n'existe plus ici :
 *  - `this.L` est devenu la constante `L` (12 s) ;
 *  - l'instant vient du paramètre `time`, ramené dans la boucle (`time % L`),
 *    comme l'original le faisait pour son `debugT` ;
 *  - l'échelle vient du paramètre `scale`, et la référence DOM (`wrapRef`)
 *    n'est plus renvoyée : c'est le composant qui la pose.
 * Pour corriger une valeur, corriger l'original puis recopier.
 *
 * Note : l'original calcule aussi `floatTf` (la carte « Repères » annoncée
 * dans la documentation), mais son gabarit ne l'utilise pas et la carte
 * n'existe pas au rendu. On garde la ligne, sans rien afficher.
 */
const L = 12;

export function computeFrame(time: number, scale: number) {
    const t = time % L;
    const cl = x => Math.max(0, Math.min(1, x)), ease = x => 1 - Math.pow(1 - cl(x), 3);
    const tab = t < 4 ? 1 : t < 8 ? 2 : 3;
    const pos = { 1: [100, 138], 2: [242, 118], 3: [364, 128] }[tab];
    const panel = i => ({ op: tab === i ? 1 : 0, tf: tab === i ? 'translateY(0)' : 'translateY(10px)' });
    const filled = Math.round(ease((t - .5) / 1.2) * 4);
    const segs = Array.from({ length: 12 }, (_, i) => i < filled ? '#7C5CFA' : '#ECECF2');
    const R = [
      ['mar.', '17', '07:00', 'Footing ', '45 min', 'Running', '#6E7BF2', '#4A55C8'],
      ['jeu.', '19', '18:30', 'Circuit Hyrox · Collective', '', 'Hyrox', '#F2B23A', '#C98A12'],
      ['sam.', '21', '09:00', 'Sortie longue ', '80 min', 'Running', '#6E7BF2', '#4A55C8'],
    ];
    const rows = R.map((r, i) => { const on = tab === 2 && t >= 4.25 + i * .25; return { d: r[0], n: r[1], h: r[2], a: r[3], b: r[4], k: r[5], dc: r[6], tc: r[7], op: on ? 1 : 0, tf: on ? 'translateY(0)' : 'translateY(8px)' }; });
    const amt = tab === 3 ? 120 * ease((t - 8.3) / 1) : 0;
    const paid = amt.toFixed(2).replace('.', ',') + '\u00A0€';
    const on = i => tab === i;
    return {
      scaleTf: `scale(${scale})`,
      indLeft: pos[0] + 'px', indW: pos[1] + 'px',
      c1: on(1) ? '#1C1C28' : '#6B6E7B', w1: on(1) ? 600 : 400,
      c2: on(2) ? '#1C1C28' : '#6B6E7B', w2: on(2) ? 600 : 400,
      c3: on(3) ? '#1C1C28' : '#6B6E7B', w3: on(3) ? 600 : 400,
      p1: panel(1), p2: panel(2), p3: panel(3), segs, rows, paid,
      floatTf: `translateY(${(4 * Math.sin(t / 6 * 2 * Math.PI)).toFixed(2)}px)`,
    };
}

export type FicheFrame = ReturnType<typeof computeFrame>;
