/* eslint-disable @typescript-eslint/ban-ts-comment, prefer-const -- copie exacte de l'original */
// @ts-nocheck -- copie à l'identique du JavaScript d'origine, voir plus bas.
/**
 * L'ÉTAT DE L'ILLUSTRATION CooryDashboardLight À L'INSTANT t (boucle de 14 s).
 *
 * ⚠ Le corps de `computeFrame` est une COPIE EXACTE du corps de
 * `renderVals()` dans `CLAUDE_DESIGN_TO_CODE_HANDOFF/source/CooryDashboardLight/logic.original.js`.
 * Aucun nombre, aucune couleur, aucune durée n'a été touché. Seules quatre
 * choses ont changé, et uniquement parce que `this` n'existe plus ici :
 *  - `this.state.t` est devenu le paramètre `time` ;
 *  - `this.state.scale` est devenu le paramètre `scale` ;
 *  - la référence DOM (`wrapRef` / `wrap`) n'est plus renvoyée : c'est
 *    le composant qui la pose ;
 *  - la première ligne, qui démarrait l'horloge, est partie dans
 *    `useLoopClock`.
 * Pour corriger une valeur, corriger l'original puis recopier : ne jamais
 * « arranger » ce fichier à la main.
 *
 * Le contrôle des types est coupé sur ce fichier : c'est du JavaScript
 * d'origine (tuples hétérogènes, index de chaînes), et le typer obligerait à
 * le réécrire. Le composant, lui, est typé.
 */
export function computeFrame(time: number, scale: number) {
    const t = time, ease = x => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    const eur = n => n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + '\u00A0€';
    const I = {
      home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 11a3 3 0 1 0 0-6M22 20c0-3-2-5-5-5',
      doc: 'M6 3h9l4 4v14H6zM9 12h7M9 16h7', calc: 'M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01', book: 'M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z',
      spark: 'M12 3l2 5.5L19.5 10 14 12l-2 6-2-6-5.5-2L10 8.5z', list: 'M4 6l2 2 3-3M11 7h9M4 13l2 2 3-3M11 14h9M11 20h9', folder: 'M3 6h6l2 2h10v11H3z', bell: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
    };
    const popOpen = t >= 2.45 && t < 7.7;
    const aiActive = t >= 2.25 && t < 7.7;
    const nav1 = [['home', 'Tableau de bord', 1], ['cal', 'Agenda'], ['users', 'Sportifs'], ['doc', 'Programmes'], ['calc', 'Comptabilité'], ['book', 'Bibliothèque']].map(([i, tt, on]) => ({ t: tt, ic: I[i], bg: on ? '#F1EEFF' : 'transparent', c: on ? '#1C1C28' : '#4A4D5A' }));
    const nav2 = [['spark', 'Assistant IA'], ['list', 'Tâches'], ['folder', 'Documents'], ['bell', 'Notifications', '15']].map(([i, tt, b], k) => ({ t: tt, ic: I[i], hasBadge: !!b, badge: b || '', bg: k === 0 && aiActive ? '#F6F3FF' : 'transparent', c: k === 0 && aiActive ? '#7C5CFA' : '#4A4D5A' }));
    const PROMPT = 'Ajoute une séance seuil pour Lucas lundi à 18:00 et relance Sophie pour sa facture.';
    const nChars = t < 2.7 ? 0 : Math.min(PROMPT.length, Math.floor((t - 2.7) / 2.3 * PROMPT.length));
    const typing = t >= 2.6 && t < 5.1;
    const added = t >= 6.3 && t < 13.4, sophieDone = t >= 6.9 && t < 13.4, lucasDone = t >= 9.05 && t < 13.4, paid = t >= 10.1 && t < 13.4;
    const tasks = [
      { t: 'Préparer le bloc 2 du programme de Lucas', s: 'En retard · Lucas Janssens', late: true, done: lucasDone, pop: t >= 9.05 && t < 9.4 },
      { t: 'Relancer Sophie pour la facture d’octobre', s: 'Aujourd’hui · Sophie Lambert', done: sophieDone, pop: t >= 6.9 && t < 7.25 },
    ].map(k => ({ t: k.t, s: k.done ? 'Fait · à l’instant' : k.s, sc: k.done ? '#22A45D' : '#6B6E7B', ex: k.late && !k.done ? 'inline' : 'none', cbg: k.done ? '#22A45D' : '#FFFFFF', cb: k.done ? '#22A45D' : '#D5D6DE', op: k.done ? 1 : 0, ctf: k.pop ? 'scale(1.18)' : 'scale(1)', td: k.done ? 'line-through' : 'none', top: k.done ? .55 : 1 }));
    const open = 2 - (sophieDone ? 1 : 0) - (lucasDone ? 1 : 0);
    const payP = t < 10.1 ? 0 : t < 13.4 ? ease((t - 10.1) / 1.1) : 1 - ease((t - 13.4) / .5);
    const cash = 3395 + 120 * payP;
    const BV = [86, 12, 10, 4, 4, 4, 4];
    const bars = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => ({ d, h: (i === 4 ? 6 + 50 * payP : BV[i]) + 'px', c: i === 0 || (i === 4 && payP > .05) ? '#B8A6FF' : '#E3E0F2', lc: i === 4 ? '#1C1C28' : '#9A9DAA', fw: i === 4 ? 700 : 400 }));
    const MON = [['07:00', 'Nadia El Amrani · Coaching force', 'Musculation', '#E5384F'], ['12:15', 'Emma Laurent · Renfo coureur', 'Running', '#6E7BF2'], ['17:30', 'Maxime Lemoine · Coaching hybride', 'Hybride', '#16A79A'], ['18:00', 'Lucas Janssens · Seuil · 55 min', 'Running', '#7C5CFA', 1], ['19:00', 'Small group Hyrox · Collective · 2 inscrits', 'Hyrox', '#C98A12']];
    const glow = t >= 6.3 && t < 8.6;
    let idx = 0;
    const mon = MON.map(([h, d, tag, col, isNew]) => {
      const show = !isNew || added; const pos = show ? idx++ : idx;
      return { h, d, tag, tc: isNew ? '#7C5CFA' : col, dot: isNew ? '#7C5CFA' : (col === '#C98A12' ? '#F2B23A' : col), isNew: !!isNew, top: (isNew && !added ? pos * 62 - 10 : pos * 62) + 'px', op: show ? 1 : 0, tf: isNew && !added ? 'scale(.96)' : 'scale(1)', bg: isNew ? (glow ? '#EEE9FF' : '#F7F5FF') : 'transparent' };
    });
    const progP = lucasDone ? 1 : 0;
    const progs = [['AV', 'Anaïs VDB', 'Prépa HYROX Bruxelles', 'Sem. 1/12', 1 / 12], ['IB', 'Inès Benali', 'Prépa Hyrox Bruxelles · bloc 1', 'Sem. 3/12', 3 / 12], ['LJ', 'Lucas Janssens', progP ? 'Coaching hybride · bloc 2' : 'Coaching hybride · bloc 1', progP ? 'Sem. 4/12' : 'Sem. 3/12', progP ? 4 / 12 : 3 / 12]].map(([i, n, s, w, p], k) => ({ i, n, s, w, pw: Math.round(p * 100) + '%', bb: k < 2 ? '1px solid #EEEEF3' : 'none', abg: k === 2 ? '#F1EEFF' : '#F4F4F8', ac: k === 2 ? '#7C5CFA' : '#4A4D5A' }));
    const R = [[5.5, 'Séance ajoutée · lun. 16 nov. · 18:00', 'Lucas Janssens · Seuil · 55 min'], [6.1, 'Relance envoyée à Sophie Lambert', 'Facture d’octobre · 65,00 €']];
    const replies = R.filter(r => t >= r[0] - .01 || true).map(([at, tt, s]) => ({ t: tt, s, op: t >= at ? 1 : 0, tf: t >= at ? 'translateY(0)' : 'translateY(6px)' }));
    let cx = 1240, cy = 700, curOp = t < .3 || t > 13.6 ? 0 : 1;
    if (t >= 1 && t < 7.7) { cx = 1300; cy = 84; }
    if (t >= 7.7 && t < 10.6) { cx = 786; cy = 214; }
    if (t >= 10.6) { cx = 1150; cy = 640; }
    const click = (t >= 2.15 && t < 2.4) || (t >= 8.9 && t < 9.15);
    const ripple = (t >= 2.2 && t < 2.6) || (t >= 8.95 && t < 9.35);
    return {
      scaleTf: `scale(${scale})`,
      nav1, nav2, tasks, taskCount: String(open), taskBadgeBg: open ? '#F1EEFF' : '#EAF8EF', taskBadgeC: open ? '#7C5CFA' : '#1F8A4C',
      cashTxt: eur(cash), cashSub: `${eur(cash).replace('\u00A0€', '')} € HTVA · ${payP > .5 ? 7 : 6} paiements`, cashPlan: payP > .5 ? '595,00 € prévus (10 séances)' : '715,00 € prévus (11 séances)', bars,
      payOp: paid ? 1 : 0, payTf: paid ? 'translateY(0)' : 'translateY(5px)',
      mon, monCount: added ? 5 : 4, progs,
      paidN: payP > .5 ? 11 : 10, paidTxt: eur(3825 + 120 * payP), dueN: payP > .5 ? 21 : 22, lateN: 12, dueTxt: eur(1430 - 120 * payP),
      aiBg: aiActive ? '#6A48F2' : '#7C5CFA', aiTf: click && t < 3 ? 'scale(.95)' : 'scale(1)', aiSh: aiActive ? '0 0 0 4px rgba(124,92,250,.18)' : 'none',
      popOp: popOpen ? 1 : 0, popTf: popOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(.97)',
      typed: PROMPT.slice(0, nChars), caretOp: typing && Math.floor(t * 3) % 2 === 0 ? 1 : typing ? .35 : 0,
      thinking: t >= 5.1 && t < 5.5, dots: [0, 1, 2].map(i => (Math.floor(t * 8) + i) % 3 === 0 ? 1 : .3), replies,
      curX: cx + 'px', curY: cy + 'px', curOp, curTf: click ? 'scale(.86)' : 'scale(1)', ripTf: ripple ? 'scale(1.6)' : 'scale(.4)', ripOp: ripple ? 1 : 0,
    };
  }

export type Frame = ReturnType<typeof computeFrame>;
