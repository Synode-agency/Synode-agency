/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck -- copie à l'identique du JavaScript d'origine, voir plus bas.
/**
 * L'ÉTAT DE L'ILLUSTRATION CooryDesktopMobile À L'INSTANT t (boucle de 26 s).
 *
 * ⚠ Le corps de `computeFrame` est une COPIE EXACTE du corps de
 * `renderVals()` dans `CLAUDE_DESIGN_TO_CODE_HANDOFF/source/CooryDesktopMobile/logic.original.js`.
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
    const t = time, cl = x => Math.max(0, Math.min(1, x)), e = x => { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }, seg = (a, b) => e((t - a) / (b - a)), inr = (a, b) => t >= a && t < b;
    const path = K => { if (t <= K[0][0]) return K[0]; for (let i = 1; i < K.length; i++) if (t <= K[i][0]) { const a = K[i - 1], b = K[i], p = e((t - a[0]) / (b[0] - a[0])); return [0, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p]; } return K[K.length - 1]; };
    const eur = v => v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + '\u00A0€';
    // desktop
    const agenda = inr(2.15, 9.75), modal = inr(3.6, 6.4), added = inr(6.5, 9.75), glow = inr(6.5, 8.6), tasks = inr(11.55, 25.4);
    const [, cx, cy] = path([[0, 520, 300], [.8, 520, 300], [1.9, 40, 118], [2.3, 40, 118], [3.3, 400, 190], [3.7, 400, 190], [5.4, 508, 360], [6.5, 508, 360], [7.6, 330, 150], [8.7, 330, 150], [9.4, 40, 98], [10.7, 40, 98], [11.2, 40, 287], [11.6, 40, 287], [12.3, 200, 425], [14.8, 200, 425], [15.2, 360, 243], [17.6, 360, 243], [18.4, 420, 320], [25.3, 420, 320], [26, 520, 300]]);
    const press = inr(2.0, 2.15) || inr(3.4, 3.58) || inr(6.2, 6.38) || inr(9.55, 9.72) || inr(11.35, 11.52) || inr(12.55, 12.72) || inr(15.25, 15.42) ? .82 : 1;
    const DT = 'Coaching force', nD = Math.floor(cl((t - 4.0) / 1.1) * DT.length);
    const NAV = [['Tableau de bord', 'M3 11l9-7 9 7v9H3z'], ['Agenda', 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4'], ['Sportifs', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6'], ['Programmes', 'M6 3h9l4 4v14H6zM9 12h7M9 16h7'], ['Comptabilité', 'M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01'], ['Bibliothèque', 'M4 5h7v15H4zM13 5h7v15h-7z'], ['Assistant IA', 'M12 3l2 5.5L19.5 10 14 12l-2 6-2-6-5.5-2L10 8.5z'], ['Tâches', 'M4 7h3M10 7h10M4 12h3M10 12h10M4 17h3M10 17h10']];
    const on = agenda ? 1 : tasks ? 7 : 0;
    const nav = NAV.map(([n, ic], i) => ({ t: n, ic, mt: i === 6 ? '14px' : '0', bg: i === on ? '#F1EEFF' : ((i === 1 && inr(1.8, 2.15)) || (i === 0 && inr(9.4, 9.75)) || (i === 7 && inr(11.2, 11.55)) ? '#F6F4FF' : 'transparent'), c: i === on ? '#7C5CFA' : '#4A4D5A' }));
    const R = '#E0304A', V = '#7B7BFA', Y = '#FDC254', G = '#27C9B5';
    const EV = [[['Nadia E.', 7, R], ['Yanis K.', 8.25, R], ['Emma L.', 12.25, V], ['Lucas J.', 15.5, G]], [['Inès B.', 7, Y], ['Chloé M.', 8.25, R], ['Thomas P.', 12.25, V], ['Antoine M.', 13.5, R], ['Mehdi O.', 14.75, Y]], [['Thomas P.', 9, R, 1, 1], ['Léa V.', 12.25, Y], ['Manon', 15.5, R]], [['Nadia E.', 7, R], ['Chloé M.', 8.25, R], ['Thomas P.', 12.25, V], ['Maxime L.', 15, G]], [['Mobilité & gainage', 7, R], ['Yanis K.', 8.25, R], ['Emma L.', 12.25, V], ['Lucas J.', 14.5, G]], [['Run club', 8.5, V, 1.5], ['Circuit Hyrox', 10, Y, 1.25]], []];
    const fmt = h => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0');
    const cols = EV.map((list, d) => ({ bg: d === 4 ? '#F6F3FF' : (d % 2 ? '#FAFAFC' : '#FFFFFF'), slot: d === 2 && inr(3.0, 3.7) ? 1 : 0, ev: list.map(([n, h, c, dur, isNew]) => ({ n, time: fmt(h), c, tc: c === Y ? '#1C1C28' : '#FFFFFF', top: ((h - 7) * 28 + 2) + 'px', h: ((dur || 1) * 28 - 4) + 'px', op: isNew && !added ? 0 : 1, tf: isNew && !added ? 'scale(.9)' : 'scale(1)', sh: isNew && glow ? '0 0 0 2px #FFFFFF,0 0 0 4px #7C5CFA' : 'none' })) }));
    // phone
    const menu = inr(1.75, 2.95) || inr(10.8, 11.9), compta = inr(2.95, 11.9), ai = inr(12.8, 25.4), s1 = inr(4.35, 5.5), s2 = inr(5.55, 7.75), saved = inr(7.9, 13.3);
    const [, px, py] = path([[0, 120, 200], [1.0, 120, 200], [1.5, 22, 47], [1.9, 22, 47], [2.5, 60, 198], [2.9, 60, 198], [3.9, 166, 391], [4.5, 166, 391], [5.1, 80, 333], [5.6, 80, 333], [7.2, 98, 395], [10.2, 98, 395], [10.5, 22, 47], [10.9, 22, 47], [11.4, 60, 94], [11.8, 60, 94], [12.3, 176, 47], [12.8, 176, 47], [13.2, 100, 380], [16.0, 100, 380], [16.3, 170, 392], [16.8, 170, 392], [19.8, 98, 282], [21, 98, 282]]);
    const tapP = inr(1.55, 1.75) || inr(2.75, 2.95) || inr(4.15, 4.35) || inr(5.3, 5.5) || inr(7.5, 7.7) || inr(10.7, 10.9) || inr(11.6, 11.8) || inr(12.6, 12.8) || inr(16.45, 16.65) || inr(20.55, 20.75) ? .72 : 1;
    const AM = '120', nA = Math.floor(cl((t - 6.2) / .6) * AM.length);
    const k = seg(8.0, 9.0) * (t < 11.9 ? 1 : 0);
    const PM = [['Tableau de bord', NAV[0][1]], ['Agenda', NAV[1][1]], ['Sportifs', NAV[2][1]], ['Programmes', NAV[3][1]], ['Comptabilité', NAV[4][1]], ['Bibliothèque', NAV[5][1]]];
    const pmOn = inr(2.6, 2.95) || inr(10.8, 11.6) ? 4 : 0;
    const BH = [[40, 8], [55, 14], [68, 10], [62, 18]];
    const bars = BH.map(([h, d]) => ({ h: h + '%', d: d + '%', c: '#CDBFFD' })).concat([{ h: (80 + 18 * k) + '%', d: '12%', c: '#7C5CFA' }]);
    const typ = (s, a, b) => s.slice(0, Math.floor(cl((t - a) / (b - a)) * s.length)), blink = Math.floor(t * 3) % 2 === 0 ? 1 : 0;
    const LN = 'Préparation course', TN = 'Envoyer le plan de course à Emma', listMade = t >= 14.5, taskMade = t >= 17.5;
    const nl = typ(LN, 13.0, 14.1), nt = typ(TN, 15.6, 17.1);
    const UP = 'Crée un programme running de 12 semaines pour Emma, avec repères, mesures et allures.', sent = t >= 16.6, ct = typ(UP, 13.3, 16.1);
    const xv = {
      tkOp: seg(11.55, 11.9),
      tiles: [['Aujourd’hui', 2, '#7C5CFA'], ['À venir', 0, '#16161F'], ['Toutes', taskMade ? 3 : 2, '#16161F', 1], ['Terminées', 0, '#8A8D9A']].map(([tt, n, ic, sel]) => ({ t: tt, n: String(n), ic, bg: sel ? '#F4F1FF' : '#FFFFFF', b: sel ? '#9F8BFB' : '#ECECF2' })),
      lists: [['Programmes', '1', '#7B7BFA'], ['Facturation', '1', '#FDC254'], ['Fiches sportifs', '0', '#27C9B5'], ['Bibliothèque', '0', '#E0304A']].concat(listMade ? [[LN, taskMade ? '1' : '0', '#A78BFA', 1]] : []).map(([tt, n, c, isNew]) => ({ t: tt, n, c, bg: isNew && (inr(14.5, 16) || inr(17.5, 19)) ? '#F1EEFF' : 'transparent' })),
      liShow: inr(12.75, 14.5), liText: nl || 'Nom de la liste', liC: nl ? '#1C1C28' : '#9A9DAA', liCaret: blink,
      tCount: (taskMade ? 3 : 2) + ' tâches',
      tasks: [['Préparer le bloc 2 du programme de Lucas', 'LJ', 'Lucas Janssens', '#7B7BFA', 'Programmes'], ['Relancer Sophie pour la facture d’octobre', 'SL', 'Sophie Lambert', '#FDC254', 'Facturation']].concat(taskMade ? [[TN, 'EL', 'Emma Laurent', '#A78BFA', LN, 1]] : []).map(([tt, i, p, c, l, isNew]) => ({ t: tt, i, p, c, l, bg: isNew && inr(17.5, 19.5) ? '#F6F3FF' : '#FFFFFF' })),
      ntText: nt || 'Nouvelle tâche', ntC: nt ? '#1C1C28' : '#9A9DAA', ntCaret: inr(15.4, 17.45) ? blink : 0,
      aiOp: ai ? 1 : 0, aiTf: ai ? 'translateY(0)' : 'translateY(12px)', aiEmpty: sent ? 0 : 1,
      ubOp: sent ? 1 : 0, ubTf: sent ? 'translateY(0)' : 'translateY(6px)',
      thOp: inr(16.8, 17.9) ? 1 : 0, dots: '•••'.slice(0, 1 + Math.floor(t * 4) % 3),
      cardOp: t >= 17.9 ? 1 : 0, cardTf: t >= 17.9 ? 'translateY(0)' : 'translateY(8px)',
      blocs: [['Sem. 1–4', 'Base', 'EF 6:00/km', '#27C9B5', 18.2], ['Sem. 5–8', 'Développement', 'Seuil 5:05/km', '#7B7BFA', 18.55], ['Sem. 9–12', 'Affûtage', 'VMA 4:25/km', '#E0304A', 18.9]].map(([s, tt, a, c, at]) => ({ s, t: tt, a, c, op: t >= at ? 1 : 0, tf: t >= at ? 'translateX(0)' : 'translateX(-6px)' })),
      infoOp: t >= 19.3 ? 1 : 0,
      cpBg: t >= 20.75 ? '#22A45D' : inr(20.55, 20.75) ? '#3A3A48' : '#16161F', cpText: t >= 20.75 ? '✓ Programme créé' : 'Créer le programme', cpTf: inr(20.55, 20.72) ? 'scale(.97)' : 'scale(1)',
      cmpText: !sent && ct ? ct : 'Demande à l’assistant…', cmpC: !sent && ct ? '#1C1C28' : '#9A9DAA', cmpB: inr(13.1, 16.6) ? '#C9BCFF' : '#ECECF2', cmpCaret: inr(13.1, 16.5) ? blink : 0,
    };
    return {
      scaleTf: `scale(${scale})`,
      path: agenda ? 'agenda' : tasks ? 'taches' : '', nav, isDash: !agenda && !tasks, isAgenda: agenda, isTasks: tasks, ...xv, agOp: seg(2.15, 2.5),
      upcoming: [['07:00', 'Nadia El Amrani · Coaching force', 'Musculation', R], ['08:15', 'Yanis Khelifi · Coaching force', 'Musculation', R], ['12:15', 'Emma Laurent · Renfo coureur', 'Running', V], ['17:30', 'Lucas Janssens · Coaching hybride', 'Hybride', G], ['19:00', 'Small group Hyrox · 2 inscrits', 'Hyrox', '#C98A12']].map(([h, n, tag, c]) => ({ h, n, tag, c })),
      days: ['Lun|9', 'Mar|10', 'Mer|11', 'Jeu|12', 'Ven|13', 'Sam|14', 'Dim|15'].map((s, i) => { const [l, n] = s.split('|'); return { l, n, c: i === 4 ? '#7C5CFA' : '#4A4D5A' }; }),
      hours: [...Array(10)].map((_, i) => ({ t: String(8 + i).padStart(2, '0'), top: ((i + 1) * 28 - 4) + 'px' })),
      cols, nsBg: '#16161F',
      mDim: modal ? .32 : 0, mOp: modal ? 1 : 0, mTf: modal ? 'translateY(0) scale(1)' : 'translateY(10px) scale(.97)',
      dTitle: nD ? DT.slice(0, nD) : 'Ex. : Coaching force', dTitleC: nD ? '#1C1C28' : '#9A9DAA', dTitleB: inr(3.8, 5.3) ? '#C9BCFF' : '#ECECF2', dCaret: inr(3.8, 5.3) && Math.floor(t * 3) % 2 === 0 ? 1 : 0,
      mFields: [{ l: 'Date', v: '11/11/2026' }, { l: 'Heure', v: '09:00' }, { l: 'Durée', v: '60 min' }],
      dCreateBg: inr(6.2, 6.4) ? '#3A3A48' : '#16161F', dCreateTf: inr(6.2, 6.38) ? 'scale(.96)' : 'scale(1)',
      curTf: `translate(${cx}px,${cy}px) scale(${press})`,
      pTitle: ai ? 'Assistant IA' : compta ? 'Comptabilité' : 'Tableau de bord', burgerTf: inr(1.55, 1.75) ? 'scale(.9)' : 'scale(1)',
      dashOp: compta || ai ? 0 : 1, comptaOp: compta ? 1 : 0,
      menuOp: menu ? 1 : 0, menuTf: menu ? 'translateX(0)' : 'translateX(-14px)',
      pmenu: PM.map(([n, ic], i) => ({ t: n, ic, bg: i === pmOn ? '#F1EEFF' : 'transparent', c: i === pmOn ? '#7C5CFA' : '#4A4D5A' })),
      result: '+' + eur(3220 + 120 * k), resC: inr(8.0, 10) ? '#1F8A4C' : '#1C1C28', gained: eur(3825 + 120 * k), week: eur(3395 + 120 * k), bars,
      fabTf: inr(4.15, 4.35) ? 'scale(.9)' : 'scale(1)',
      pDim: s1 || s2 ? .32 : 0, s1Tf: s1 ? 'translateY(0)' : 'translateY(105%)', s2Tf: s2 ? 'translateY(0)' : 'translateY(105%)', npBg: inr(5.3, 5.5) ? '#F1EEFF' : 'transparent',
      amt: nA ? AM.slice(0, nA) : 'Ex. : 3 000', amtC: nA ? '#1C1C28' : '#9A9DAA', amtB: inr(6.0, 7.2) ? '#C9BCFF' : '#ECECF2', pCaret: inr(6.0, 7.2) && Math.floor(t * 3) % 2 === 0 ? 1 : 0,
      saveBg: inr(7.5, 7.75) ? '#3A3A48' : '#16161F', saveTf: inr(7.5, 7.7) ? 'scale(.97)' : 'scale(1)',
      toastOp: inr(8.0, 10.2) ? 1 : 0, toastMt: inr(8.0, 10.2) ? '0px' : '-8px',
      tapTf: `translate(${px}px,${py}px) scale(${tapP})`, tapOp: inr(1.1, 7.85) || inr(10.25, 13.3) || inr(16.1, 16.75) || inr(19.9, 20.9) ? 1 : 0,
      saved,
    };
  }

export type Frame = ReturnType<typeof computeFrame>;
