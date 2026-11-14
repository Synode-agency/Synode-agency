/* eslint-disable @typescript-eslint/ban-ts-comment -- copie exacte de l'original */
// @ts-nocheck -- copie à l'identique du JavaScript d'origine, voir plus bas.
/**
 * L'ÉTAT DES ILLUSTRATIONS ILL-04 À ILL-08 À L'INSTANT T (secondes).
 *
 * ⚠ Le corps de `computeFrame` est une COPIE EXACTE du corps de
 * `renderVals()` dans `COORY_DESIGN_TO_CODE_HANDOFF/source/planche/logic.original.js` :
 * mêmes modulos (8 / 10 / 7 / 8 / 9,5 s), mêmes aides (`cl`, `e`, `fm`,
 * `inr`), mêmes valeurs. Seules deux lignes ont changé, parce que `this`
 * n'existe plus ici :
 *  - `T` vient du paramètre `time` (c'est `useLoopClock` qui gère l'horloge
 *    et le `debugT`) ;
 *  - la valeur `dbg3` est retirée : elle ne servait qu'à transmettre le
 *    `debugT` de la planche à ILL-03, qui a ici sa propre horloge et son
 *    propre `debugT`.
 * Les cinq illustrations partagent ce calcul, comme dans la planche ; chacune
 * n'en lit que sa part (`i4`, `i5`…).
 * Pour corriger une valeur, corriger l'original puis recopier : ne jamais
 * « arranger » ce fichier à la main.
 */
export function computeFrame(time: number) {
    const T = time;
    const cl = x => Math.max(0, Math.min(1, x)), e = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const fm = v => v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + '\u00A0€';
    const inr = (t, a, b) => t >= a && t < b;
    // ILL-04 agenda (8 s)
    const t4 = T % 8;
    const col = i => ({ left: `calc(30px + (100% - 30px) * ${i} / 3 + 4px)`, w: 'calc((100% - 30px) / 3 - 8px)' });
    const ev = (c, h, d, t, s, bg, fg, extra) => ({ ...col(c), top: ((h - 6) * 30 + 2) + 'px', h: (d * 30 - 4) + 'px', t, s, bg, c: fg, op: 1, tf: 'none', sh: 'none', ...(extra || {}) });
    const newOn = t4 >= 2.6 && t4 < 7.6;
    const evs = [
      ev(0, 7, 1.3, 'Mobilité & gainage', '07:00', '#E0304A', '#FFFFFF'), ev(0, 8.25, 1.3, 'Yanis K.', '08:15', '#E0304A', '#FFFFFF'), ev(0, 12.25, 1.3, 'Emma L.', '12:15', '#7B7BFA', '#14142A'),
      ev(1, 8.5, 1.5, 'Run club du samedi', '08:30 · 1h30', '#7B7BFA', '#14142A'), ev(1, 10, 1.25, 'Circuit Hyrox', '10:00 · 1h15', '#FDC254', '#2A1F05'),
      ev(2, 7, 1.3, 'Thomas P.', '07:00', '#27C9B5', '#062A25', { op: newOn ? 1 : 0, tf: newOn ? 'scale(1)' : 'scale(.9)', sh: inr(t4, 2.6, 4.8) ? '0 0 0 3px rgba(39,201,181,.35)' : 'none' }),
    ];
    const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, i) => ({ l, n: String(9 + i), bg: i === 5 ? '#7C5CFA' : i >= 4 ? '#26262C' : 'transparent', c: '#FFFFFF' }));
    const hours = [...Array(10)].map((_, i) => ({ t: String(6 + i).padStart(2, '0'), top: (i * 30) + 'px' }));
    // ILL-05 programme (10 s)
    const t5 = T % 10, wk = t5 < 7.2 ? Math.floor(t5 / 2.4) : 2, pub = t5 >= 7.8 && t5 < 9.7;
    const RUN = '#6E7BF2', HYR = '#E09B1C', MUS = '#E5384F', BG = { [RUN]: '#EEF0FE', [HYR]: '#FFF6E5', [MUS]: '#FDECEF' };
    const W5 = [
      [['Endurance', RUN, 'Running', '40 min · Z2'], ['Force bas du corps', MUS, 'Musculation', 'Squat 4 × 6'], ['Circuit stations', HYR, 'Hyrox', 'Run 1 km @6:00'], ['Sortie longue', RUN, 'Running', '60 min · Z2']],
      [['Endurance', RUN, 'Running', '45 min · Z2'], ['Force haut du corps', MUS, 'Musculation', 'DC 4 × 6'], ['Ergomètres', HYR, 'Hyrox', 'Rameur 4 × 500 m'], ['Sortie longue', RUN, 'Running', '70 min · Z2']],
      [['Fractionné', RUN, 'Running', '6 × 800 m'], ['Force bas du corps', MUS, 'Musculation', 'Squat 5 × 5'], ['Course compromise', HYR, 'Hyrox', 'AMRAP 25 min'], ['Sortie longue', RUN, 'Running', '80 min · Z2']],
    ];
    const DN = ['Lun', 'Mar', 'Ven', 'Dim'], OFF = [0, 1, 4, 6], ST = [9, 16, 23];
    const fadeK = cl(((t5 % 2.4)) / .35), daysVis = t5 >= 7.2 ? 1 : fadeK;
    // ILL-06 compta (7 s)
    const t6 = T % 7, k6 = e(cl((t6 - .6) / 1.1)), back = t6 > 6.4 ? e(cl((t6 - 6.4) / .5)) : 0, k = k6 * (1 - back);
    const toastOn = inr(t6, 1.8, 5.2);
    // ILL-07 notifications (8 s)
    const t7 = T % 8, paid = t7 >= 7.4 ? 0 : [1.4, 2.4, 3.4].filter(x => t7 >= x).length;
    const R7 = [['YK', 'Yanis Khelifi', 'Ven 6 · 08:15 · Coaching force'], ['SL', 'Sophie Lambert', 'Jeu 5 · 18:00 · Remise en forme'], ['CM', 'Chloé Martin', 'Jeu 5 · 08:15 · Remise en forme'], ['NA', 'Nadia El Amrani', 'Jeu 5 · 07:00 · Coaching force']];
    // ILL-08 assistant (9.5 s)
    const t8 = T % 9.5, P = "Prépare une semaine d'affûtage pour Anaïs";
    const typed = P.slice(0, Math.floor(cl((t8 - .8) / 2.6) * P.length)), sent = t8 >= 4.1 && t8 < 9.1, created = t8 >= 7.6 && t8 < 9.1;
    const R8 = [['Endurance', '40 min · Z2', '#6E7BF2'], ['Fractionné court', '6 × 30 s', '#6E7BF2'], ['Ergomètres légers', '3 × 500 m', '#F2B23A'], ['Repos actif', 'Mobilité', '#16A79A']];
    return {
      week, hours,
      i4: { evs, slot: inr(t4, 1.6, 2.7) ? 1 : 0, fab: inr(t4, 1.1, 1.4) ? 'scale(.9)' : 'scale(1)' },
      i5: {
        weeks: [['Semaine 1', '9 – 15 nov.'], ['Semaine 2', '16 – 22 nov.'], ['Semaine 3', '23 – 29 nov.'], ['Semaine 4', 'allégée']].map(([t, d], i) => ({ t, d, bg: i === wk ? '#F1EEFF' : 'transparent', c: i === wk ? '#7C5CFA' : '#1C1C28' })),
        wTitle: 'Semaine ' + (wk + 1), wSub: (ST[wk]) + ' – ' + (ST[wk] + 6) + ' nov. · 4 séances',
        days: W5[wk].map(([t, c, disc, det], i) => ({ t, c, disc, det, n: String(i + 1), day: DN[i] + ' ' + (ST[wk] + OFF[i] > 30 ? ST[wk] + OFF[i] - 30 : ST[wk] + OFF[i]), bg: BG[c], op: String(cl(daysVis * 1.4 - i * .06)) })),
        pubBg: pub ? '#22A45D' : '#16161F', pubTx: pub ? '✓ Publié' : '↑ Publier', pubTf: inr(t5, 6.5, 6.75) ? 'scale(.95)' : 'scale(1)',
      },
      i6: {
        res: '+' + fm(8100 + 120 * k), resC: inr(t6, 1.6, 4) ? '#6EE0A2' : '#FFFFFF', gagne: fm(8705 + 120 * k),
        bars: [['A', 8, 6], ['S', 26, 8], ['O', 30, 7], ['N', 52 + 10 * k, 5]].map(([m, g, d], i) => ({ m, g: g + 'px', d: d + 'px', gc: i === 3 ? '#8E6CFA' : '#4B3A8F' })),
        toast: toastOn ? 1 : 0, toastTf: toastOn ? 'translateY(0)' : 'translateY(6px)',
      },
      i7: { unread: String(18 - paid), left: String(14 - paid), rows: R7.map(([i, n, s], j) => { const ok = j < paid; return { i, n, s, a: ok ? '✓ Encaissé' : '65,00 €', ac: ok ? '#1F8A4C' : '#1C1C28', bg: ok ? '#EAF8EF' : j === paid ? '#FAFAFC' : '#FFFFFF' }; }) },
      i8: {
        nav: [['⌂', 'Tableau de bord'], ['▦', 'Agenda'], ['☺', 'Sportifs'], ['▤', 'Programmes'], ['€', 'Comptabilité'], ['✦', 'Assistant IA']].map(([i, t], j) => ({ i, t, bg: j === 5 ? '#F1EEFF' : 'transparent', c: j === 5 ? '#7C5CFA' : '#4A4D5A', mt: j === 5 ? '10px' : '0' })),
        a: sent ? 0 : 1, b: sent ? 1 : 0, typed: typed || 'Demande à ton assistant…', txC: typed ? '#1C1C28' : '#9A9DAA', caret: (!sent && Math.floor(T * 3) % 2 === 0) ? 1 : 0,
        sendBg: t8 >= 3.4 ? '#7C5CFA' : '#D9D9E3', sendTf: inr(t8, 3.7, 3.95) ? 'scale(.88)' : 'scale(1)',
        think: inr(t8, 4.4, 5.3) ? 1 : 0, dots: '.'.repeat(1 + Math.floor(T * 4) % 3),
        card: t8 >= 5.3 ? 1 : 0, cardTf: t8 >= 5.3 ? 'translateY(0)' : 'translateY(8px)',
        rows: R8.map(([t, d, c], i) => ({ t, d, c, op: t8 >= 5.6 + i * .35 ? 1 : 0 })),
        btnOp: t8 >= 7 ? 1 : 0, btnBg: created ? '#22A45D' : '#16161F', btnC: '#FFFFFF', btnTx: created ? '✓ Programme créé' : 'Créer le programme', btnTf: inr(t8, 7.35, 7.6) ? 'scale(.96)' : 'scale(1)',
      },
    };
}

export type PlancheFrame = ReturnType<typeof computeFrame>;
