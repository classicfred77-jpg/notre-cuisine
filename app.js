/* ============================================================
   NOTRE CUISINE — app.js
   Single-file logic. No framework. localStorage only.
   ============================================================ */
'use strict';

/* ===== Palettes par culture ================================== */
const PALETTES = {
  'italien':       { bg:'#F4E4D4', a:'#B83D2E', b:'#6B9A4A', c:'#5A1E1E', name:'Italien' },
  'méditerranéen': { bg:'#E2EBEF', a:'#6989A8', b:'#8FA644', c:'#3D5363', name:'Méditerranéen' },
  'français':      { bg:'#F4D9CC', a:'#7A2E2E', b:'#C4623F', c:'#5A1E1E', name:'Français' },
  'bistronomie':   { bg:'#EFE0D0', a:'#9C4A2E', b:'#D9923C', c:'#5A1E1E', name:'Bistronomie' },
  'antillais':     { bg:'#FCE3C2', a:'#D14525', b:'#3F8F4A', c:'#8B2D1F', name:'Antillais' },
  'international': { bg:'#F2D4C5', a:'#C4623F', b:'#7A2E2E', c:'#5A1E1E', name:'International' }
};

const RITUAL_PALETTES = {
  leger:   { from:'#F5C6B5', to:'#FAEFE0', accent:'#D55A39', deep:'#7A2E2E', name:'Léger' },
  profond: { from:'#7A2E2E', to:'#3A1414', accent:'#E8B4A0', deep:'#FAEFE0', name:'Profond' },
  drole:   { from:'#F0C879', to:'#FAEFE0', accent:'#8FA644', deep:'#5A4A1E', name:'Drôle' }
};

/* ===== Illustrations SVG ==================================== */
const ILLUS = {
  poisson: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><ellipse cx="42" cy="32" rx="32" ry="15" fill="${p.a}"/><path d="M 70 32 L 92 18 L 92 46 Z" fill="${p.a}"/><path d="M 36 18 Q 46 10 56 18 L 56 18 Q 46 22 36 18 Z" fill="${p.c}" opacity="0.85"/><path d="M 36 46 Q 46 54 56 46 L 56 46 Q 46 42 36 46 Z" fill="${p.c}" opacity="0.85"/><circle cx="22" cy="29" r="2.6" fill="#1F1814"/><circle cx="23" cy="28" r="0.9" fill="#FFF"/><path d="M 32 22 Q 30 32 32 42" stroke="${p.c}" fill="none" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/><circle cx="46" cy="26" r="1.7" fill="none" stroke="${p.c}" opacity="0.5" stroke-width="0.8"/><circle cx="52" cy="32" r="1.7" fill="none" stroke="${p.c}" opacity="0.5" stroke-width="0.8"/><circle cx="58" cy="27" r="1.7" fill="none" stroke="${p.c}" opacity="0.5" stroke-width="0.8"/><circle cx="62" cy="33" r="1.7" fill="none" stroke="${p.c}" opacity="0.5" stroke-width="0.8"/></svg>`,

  pates: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="56" rx="44" ry="3" fill="#000" opacity="0.07"/><path d="M 8 42 Q 50 64 92 42 L 92 36 Q 50 32 8 36 Z" fill="${p.a}"/><ellipse cx="50" cy="36" rx="42" ry="7" fill="${p.bg}"/><path d="M 16 34 Q 28 26 40 32 Q 52 38 64 30" fill="none" stroke="${p.c}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/><path d="M 26 40 Q 42 32 56 38 Q 72 44 86 36" fill="none" stroke="${p.c}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/><path d="M 20 38 Q 36 32 52 36 Q 68 42 84 38" fill="none" stroke="${p.c}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/><circle cx="38" cy="34" r="1.4" fill="#FFFAF0"/><circle cx="62" cy="32" r="1.4" fill="#FFFAF0"/><circle cx="74" cy="38" r="1.4" fill="#FFFAF0"/><ellipse cx="46" cy="28" rx="3.4" ry="1.6" fill="${p.b}" transform="rotate(30 46 28)"/><ellipse cx="72" cy="26" rx="3.4" ry="1.6" fill="${p.b}" transform="rotate(-22 72 26)"/></svg>`,

  riz: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><rect x="78" y="6" width="2.4" height="44" rx="1.2" fill="#5A1E1E" transform="rotate(20 78 6)"/><rect x="84" y="6" width="2.4" height="44" rx="1.2" fill="#5A1E1E" transform="rotate(20 84 6)"/><ellipse cx="50" cy="56" rx="44" ry="3" fill="#000" opacity="0.07"/><path d="M 10 40 Q 50 62 90 40 L 90 34 Q 50 30 10 34 Z" fill="${p.a}"/><ellipse cx="50" cy="34" rx="42" ry="7" fill="${p.bg}"/><ellipse cx="28" cy="34" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="34" cy="32" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="40" cy="34" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="46" cy="32" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="52" cy="34" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="58" cy="32" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="64" cy="34" rx="2" ry="1.2" fill="#FCFAF2"/><ellipse cx="70" cy="32" rx="2" ry="1.2" fill="#FCFAF2"/><circle cx="44" cy="30" r="2.6" fill="${p.b}"/><circle cx="56" cy="36" r="2.2" fill="${p.c}"/></svg>`,

  volaille: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="29" width="22" height="6" rx="3" fill="#FAEFE0"/><ellipse cx="6" cy="32" rx="4" ry="6" fill="#FAEFE0" stroke="#E8DCC0" stroke-width="0.6"/><ellipse cx="54" cy="34" rx="32" ry="22" fill="${p.a}"/><ellipse cx="48" cy="26" rx="10" ry="3" fill="${p.bg}" opacity="0.55"/><path d="M 30 24 Q 38 19 46 23" fill="none" stroke="${p.c}" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/><path d="M 52 22 Q 60 17 68 22" fill="none" stroke="${p.c}" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/><path d="M 70 28 Q 78 24 84 30" fill="none" stroke="${p.c}" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/><path d="M 32 44 Q 40 49 48 46" fill="none" stroke="${p.c}" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/><path d="M 58 47 Q 66 51 74 48" fill="none" stroke="${p.c}" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/></svg>`,

  viande: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><path d="M 14 16 Q 22 8 40 11 Q 60 6 80 14 Q 92 26 88 40 Q 82 56 60 56 Q 32 58 18 50 Q 6 38 14 16 Z" fill="${p.c}"/><path d="M 22 22 Q 38 26 50 22" fill="none" stroke="${p.bg}" stroke-width="2" opacity="0.7" stroke-linecap="round"/><path d="M 28 36 Q 50 32 72 38" fill="none" stroke="${p.bg}" stroke-width="2" opacity="0.7" stroke-linecap="round"/><path d="M 22 46 Q 42 50 60 46" fill="none" stroke="${p.bg}" stroke-width="2" opacity="0.7" stroke-linecap="round"/><ellipse cx="82" cy="20" rx="7" ry="3" fill="#FAEFE0"/><circle cx="82" cy="20" r="1.6" fill="#E8DCC0"/></svg>`,

  legumes: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="56" rx="44" ry="3" fill="#000" opacity="0.06"/><path d="M 10 36 Q 50 60 90 36 L 88 32 Q 50 28 12 32 Z" fill="#EFE5D4"/><ellipse cx="50" cy="32" rx="40" ry="6" fill="#DDD0B8"/><ellipse cx="30" cy="26" rx="9" ry="6" fill="${p.b}" transform="rotate(-20 30 26)"/><ellipse cx="50" cy="22" rx="11" ry="7" fill="#8FA644" transform="rotate(10 50 22)"/><ellipse cx="68" cy="26" rx="9" ry="6" fill="${p.b}" transform="rotate(25 68 26)"/><circle cx="42" cy="32" r="4" fill="#B83D2E"/><circle cx="42" cy="30" r="1" fill="${p.b}"/><ellipse cx="60" cy="34" rx="3" ry="2" fill="#3D5363"/><path d="M 70 30 Q 78 26 80 34 Q 80 38 72 36 Z" fill="#8FA644"/></svg>`,

  soupe: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><path d="M 38 14 Q 32 8 38 4" stroke="${p.a}" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/><path d="M 50 12 Q 44 6 50 2" stroke="${p.a}" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/><path d="M 62 14 Q 68 8 62 4" stroke="${p.a}" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/><path d="M 10 28 Q 50 58 90 28 L 90 24 Q 50 20 10 24 Z" fill="${p.c}"/><ellipse cx="50" cy="24" rx="40" ry="6" fill="${p.a}"/><ellipse cx="50" cy="24" rx="32" ry="4" fill="#D9923C"/><circle cx="34" cy="24" r="2.2" fill="${p.b}"/><circle cx="48" cy="22" r="2.6" fill="${p.b}"/><circle cx="64" cy="25" r="2.2" fill="${p.b}"/><ellipse cx="42" cy="26" rx="3" ry="1.4" fill="#FAEFE0" opacity="0.9"/><ellipse cx="56" cy="24" rx="3" ry="1.4" fill="#FAEFE0" opacity="0.9"/></svg>`,

  oeufs: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="36" rx="14" ry="18" fill="#FAEFE0" stroke="#E8DCC0" stroke-width="1.4"/><ellipse cx="27" cy="30" rx="3" ry="5" fill="#FFFFFF" opacity="0.5"/><ellipse cx="68" cy="42" rx="22" ry="10" fill="#FAEFE0"/><circle cx="68" cy="40" r="9" fill="#E8A93E"/><circle cx="65" cy="37" r="3" fill="#FFD174"/><path d="M 56 32 L 51 27 L 59 30 Z" fill="#FAEFE0" stroke="#E8DCC0" stroke-width="0.9"/><path d="M 81 36 L 86 30 L 84 38 Z" fill="#FAEFE0" stroke="#E8DCC0" stroke-width="0.9"/><path d="M 76 50 L 80 48" stroke="${p.c}" stroke-width="0.8" opacity="0.4"/></svg>`,

  petitdej: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><path d="M 14 16 Q 10 10 14 6" stroke="${p.c}" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/><path d="M 22 16 Q 26 10 22 6" stroke="${p.c}" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/><path d="M 8 24 L 8 52 Q 8 56 12 56 L 26 56 Q 30 56 30 52 L 30 24 Z" fill="#FAEFE0"/><ellipse cx="19" cy="24" rx="11" ry="3" fill="#4A2C1A"/><path d="M 30 30 L 36 30 L 36 44 L 30 44" fill="none" stroke="#FAEFE0" stroke-width="2.4"/><path d="M 46 50 Q 48 28 64 26 Q 80 28 84 38 Q 80 52 70 54 Q 56 56 46 50 Z" fill="#D9923C"/><path d="M 52 48 Q 56 38 62 36" stroke="${p.c}" stroke-width="1" fill="none" opacity="0.5"/><path d="M 60 50 Q 66 40 72 40" stroke="${p.c}" stroke-width="1" fill="none" opacity="0.5"/><circle cx="89" cy="48" r="3.2" fill="${p.a}"/><circle cx="93" cy="44" r="2.4" fill="#7A2E2E"/></svg>`,

  apero: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="14" width="88" height="40" rx="5" fill="#D9923C"/><line x1="20" y1="14" x2="20" y2="54" stroke="${p.c}" stroke-width="0.8" opacity="0.3"/><line x1="48" y1="14" x2="48" y2="54" stroke="${p.c}" stroke-width="0.8" opacity="0.3"/><line x1="76" y1="14" x2="76" y2="54" stroke="${p.c}" stroke-width="0.8" opacity="0.3"/><circle cx="14" cy="28" r="3" fill="#3D5363"/><circle cx="11" cy="38" r="3" fill="${p.b}"/><circle cx="18" cy="44" r="2.7" fill="#3D5363"/><rect x="30" y="22" width="11" height="11" fill="#FAEFE0"/><rect x="34" y="30" width="11" height="11" fill="#FAEFE0" opacity="0.8"/><ellipse cx="60" cy="28" rx="8" ry="5" fill="${p.c}"/><ellipse cx="66" cy="40" rx="7" ry="4" fill="${p.c}"/><circle cx="86" cy="28" r="3.5" fill="#B83D2E"/><circle cx="88" cy="42" r="3" fill="#B83D2E"/></svg>`,

  fourneau: (p) => `<svg viewBox="0 0 100 64" xmlns="http://www.w3.org/2000/svg"><rect x="78" y="32" width="20" height="4" rx="2" fill="#2A1F1A"/><ellipse cx="44" cy="36" rx="38" ry="14" fill="#2A1F1A"/><ellipse cx="44" cy="34" rx="34" ry="11" fill="${p.a}"/><circle cx="34" cy="34" r="4.2" fill="#D9923C"/><circle cx="46" cy="30" r="3.6" fill="#B83D2E"/><circle cx="54" cy="38" r="4" fill="#D9923C"/><circle cx="40" cy="40" r="3" fill="${p.b}"/><circle cx="60" cy="34" r="2.6" fill="#FAEFE0"/><ellipse cx="44" cy="28" rx="3" ry="1" fill="#FAEFE0" opacity="0.55"/></svg>`
};

function recipeIlluKey(r) {
  if (r.type === 'petit-dej') return 'petitdej';
  const name = r.nom.toLowerCase();
  const ing = r.ingredients.map(i => i.nom).join(' ').toLowerCase();

  if (/(soupe|\bpho\b|miso)/.test(name)) return 'soupe';
  if (/(apéro|planche|charcut)/.test(name)) return 'apero';
  if (/(saumon|cabillaud|\bbar\b|daurade|loup|thon|crevettes?|gambas|saint-jacques|palourdes|vongole|seiche|poisson|sardine)/.test(name)) return 'poisson';
  if (/(poulet|dinde|canard|pintade|magret|tajine|volaille|merguez|coq)/.test(name)) return 'volaille';
  if (/œufs?\s*(cocotte|brouillé|à la coque|bénédict)|avocat.*œuf|œuf.*avocat/.test(name)) return 'oeufs';
  if (/(bœuf|boeuf|agneau|veau|côtelette|côte de bœuf|\btartare\b|bavette|hachis|bourguignon|filet mignon de porc|carpaccio|bresaola|côte|chili)/.test(name)) return 'viande';
  if (/(spaghetti|tagliatelle|linguine|lasagne|carbonara|coquillette|gratin de pâtes|pad ?thaï|nouilles? de riz|\bpâtes\b)/.test(name)) return 'pates';
  if (/(risotto|riz |riz japonais|riz thaï|quinoa|bibimbap|poke bowl|buddha|polenta|onigiri)/.test(name)) return 'riz';
  if (/(salade|burrata|chèvre chaud|ratatouille|tarte fine)/.test(name)) return 'legumes';

  const txt = name + ' ' + ing;
  if (/(saumon|cabillaud|crevettes?|thon|gambas|poisson)/.test(txt)) return 'poisson';
  if (/(poulet|dinde|canard|magret|merguez)/.test(txt)) return 'volaille';
  if (/(bœuf|agneau|veau|porc|jambon|lardons)/.test(txt)) return 'viande';
  return 'fourneau';
}

function paletteForRecipe(r) {
  return PALETTES[r.culture] || PALETTES['international'];
}

function illuFor(r) {
  return ILLUS[recipeIlluKey(r)](paletteForRecipe(r));
}

/* ===== Recipes base =========================================
   85 recettes — petit-dej / déjeuner / dîner, modes kids/us/both
   ============================================================ */
const RECIPES = [
{ id:"pd01", nom:"Tartines beurre & confiture maison", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:5, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne tranché", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre demi-sel", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Confiture au choix", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Oranges à presser", qte:4, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Faire chauffer le grille-pain ou préchauffer le four à 220°C.","Toaster les 4 tranches de pain de campagne 2-3 min jusqu'à dorées et croustillantes mais pas brûlées.","Sortir le beurre 5 min avant pour qu'il soit pommade (plus facile à tartiner sans déchirer le pain).","Tartiner chaque tranche d'une couche généreuse de beurre demi-sel.","Étaler 1 c. à soupe de confiture sur le beurre.","Presser les oranges au presse-agrumes (manuel ou électrique). Filtrer si on n'aime pas la pulpe.","Servir le jus dans des verres bien froids et les tartines aussitôt."] },

{ id:"pd02", nom:"Porridge avoine, pomme & cannelle", mode:"both", type:"petit-dej", saison:["automne","hiver","printemps"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Flocons d'avoine", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait demi-écrémé", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pomme", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cannelle", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Miel", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Dans une casserole moyenne, verser 80g de flocons d'avoine et 40cl de lait demi-écrémé.","Porter à frémissement à feu moyen en remuant régulièrement à la cuillère en bois.","Quand ça frémit, baisser à feu doux. Cuire 5 min en remuant souvent pour éviter que ça accroche.","Pendant ce temps, laver, épépiner et râper grossièrement 1 pomme (avec ou sans peau selon préférence).","Hors du feu, ajouter la pomme râpée et 1 c. à café de cannelle. Mélanger.","Verser dans les bols. Arroser de 2 c. à café de miel.","Servir aussitôt, parsemer éventuellement de quelques amandes effilées."] },

{ id:"pd03", nom:"Œufs brouillés & pain grillé", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:10, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:20, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:5, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pain de mie complet", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Casser 6 œufs dans un bol. Ajouter 5cl de lait, sel et poivre. Battre à la fourchette (pas trop, juste pour mélanger).","Mettre le pain de mie dans le grille-pain pour qu'il soit prêt en même temps.","Dans une poêle anti-adhésive, faire fondre 20g de beurre à feu DOUX (l'astuce des œufs brouillés réussis : feu doux).","Verser les œufs. Attendre 30 sec sans toucher, puis ramener les bords vers le centre à la spatule.","Continuer doucement 2-3 min en mélangeant régulièrement. Les œufs doivent rester baveux, pas secs.","Hors du feu (la chaleur résiduelle finit la cuisson), ajouter la ciboulette ciselée.","Servir aussitôt sur les tartines beurrées."] },

{ id:"pd04", nom:"Pancakes complets, fruits rouges & sirop d'érable", mode:"kids", type:"petit-dej", saison:["été","automne","printemps"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Farine complète", qte:200, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Levure chimique", qte:1, unite:"sachet", rayon:"Épicerie sucrée" },
    { nom:"Sucre roux", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Fruits rouges (frais ou surgelés)", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Sirop d'érable", qte:10, unite:"cl", rayon:"Épicerie sucrée" }
  ],
  etapes:["Dans un saladier, mélanger 200g de farine complète, 1 sachet de levure et 30g de sucre roux.","Dans un autre bol, battre 2 œufs avec 25cl de lait. Verser progressivement dans la farine en fouettant pour éviter les grumeaux.","Laisser reposer la pâte 10 min (les pancakes seront plus moelleux).","Chauffer une poêle anti-adhésive à feu moyen. La graisser très légèrement avec un papier huilé.","Verser une louche de pâte (environ 1/2 louche pour des pancakes de 12 cm).","Cuire 1-2 min : quand des petites bulles se forment et éclatent en surface, c'est le moment de retourner.","Retourner à la spatule, cuire 1 min de plus.","Garder au chaud sous un linge propre. Continuer avec toute la pâte.","Servir avec les fruits rouges (préalablement décongelés ou frais) et un filet de sirop d'érable."] },

{ id:"pd05", nom:"Tartines avocat & œuf poché", mode:"us", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:2,
  ingredients:[
    { nom:"Pain au levain", qte:2, unite:"tranches épaisses", rayon:"Boulangerie" },
    { nom:"Avocat mûr", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Œufs extra-frais", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Citron", qte:0.5, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Piment d'Espelette", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Vinaigre blanc", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Toaster 2 tranches épaisses de pain au levain au grille-pain ou au four 3-4 min.","Couper l'avocat en deux, retirer le noyau. Vider la chair dans un bol, écraser à la fourchette.","Ajouter le jus d'1/2 citron, du sel, et 1 pincée de piment d'Espelette. Mélanger.","Préparer une casserole d'eau avec 1 c. à soupe de vinaigre blanc. Porter à frémissement (pas bouillir fort).","Casser chaque œuf dans une petite tasse (un par un). Faire tourner l'eau frémissante avec une cuillère pour former un tourbillon.","Verser délicatement l'œuf au centre du tourbillon. Cuire 3 min sans toucher (le blanc s'enroule autour du jaune).","Récupérer chaque œuf avec une écumoire, déposer sur du papier absorbant.","Tartiner les pains grillés d'avocat. Déposer un œuf poché sur chaque, parsemer de piment.","Servir aussitôt, fleur de sel et tour de poivre."] },

{ id:"pd06", nom:"Bircher muesli yaourt & fruits", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:5, difficulte:1,
  ingredients:[
    { nom:"Flocons d'avoine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Yaourt nature", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Pomme", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Raisins secs", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Amandes effilées", qte:20, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Miel", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["LA VEILLE AU SOIR : dans un bol, mélanger 60g de flocons d'avoine avec les 2 pots de yaourt nature. Couvrir, mettre au frigo toute la nuit (les flocons gonflent et deviennent crémeux).","Le matin : laver et râper 1 pomme (avec la peau).","Sortir le bol du frigo. Ajouter la pomme râpée, 30g de raisins secs et 20g d'amandes effilées.","Mélanger délicatement.","Ajouter 2 c. à café de miel et bien incorporer.","Répartir dans 2 bols ou verrines.","Servir frais. Astuce : on peut ajouter des fruits rouges, des graines de chia ou de la coco râpée."] },

{ id:"pd07", nom:"Smoothie bowl banane mangue granola", mode:"kids", type:"petit-dej", saison:["été","printemps"], culture:"international", temps:8, difficulte:1,
  ingredients:[
    { nom:"Banane", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Mangue surgelée", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Yaourt nature", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Granola", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Graines de chia", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Sortir la mangue surgelée du congélateur 5 min avant (elle se mixe mieux quand elle n'est pas en bloc dur).","Couper 2 bananes en rondelles.","Dans le blender, mettre les bananes, la mangue et les 2 pots de yaourt.","Mixer 30 sec à puissance maximum jusqu'à obtenir une texture épaisse type sorbet.","Si trop épais, ajouter 2-3 c. à soupe d'eau. Si trop liquide, ajouter 2 glaçons et remixer.","Verser dans 2 grands bols.","Parsemer 80g de granola en couche généreuse.","Saupoudrer 2 c. à café de graines de chia.","Servir immédiatement, le smoothie commence à fondre rapidement."] },

{ id:"pd08", nom:"Pain perdu brioche & miel", mode:"both", type:"petit-dej", saison:["automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Brioche rassise", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vanille en poudre", qte:1, unite:"pincée", rayon:"Épicerie sucrée" }
  ],
  etapes:["Battre 3 œufs dans une assiette creuse avec 20cl de lait et 1 pincée de vanille.","Couper la brioche rassise en tranches de 2cm d'épaisseur (la rassise prend mieux la trempette).","Tremper chaque tranche dans le mélange œuf-lait 10 sec par face (pas plus, sinon ça se déchire).","Faire fondre 30g de beurre dans une grande poêle à feu moyen.","Cuire les tranches 2-3 min par face jusqu'à dorées et croustillantes aux bords.","Renouveler avec le reste, en ajoutant un peu de beurre si besoin.","Pendant ce temps, faire tiédir 4 c. à soupe de miel au micro-ondes 15 sec pour qu'il devienne liquide.","Servir le pain perdu chaud, arroser de miel liquide."] },

{ id:"pd09", nom:"Yaourt grec, miel, noix & graines", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:3, difficulte:1,
  ingredients:[
    { nom:"Yaourt grec entier", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Cerneaux de noix", qte:40, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Graines de tournesol", qte:20, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Fruit de saison", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sortir le yaourt grec entier du frigo (la version entière est plus crémeuse, indispensable).","Verser dans 4 bols ou verrines.","Concasser grossièrement les 40g de cerneaux de noix avec le plat d'un couteau (pas hacher).","Préparer un fruit de saison : couper en lamelles ou cubes.","Sur chaque bol : 1 c. à soupe de miel, les noix concassées, 1 c. à café de graines de tournesol.","Couronner avec le fruit frais.","Servir aussitôt, idéalement le yaourt encore frais."] },

{ id:"pd10", nom:"Tartine fromage blanc, figues & amandes", mode:"us", type:"petit-dej", saison:["été","automne"], culture:"méditerranéen", temps:7, difficulte:1,
  ingredients:[
    { nom:"Pain au levain", qte:2, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Fromage blanc", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Figues fraîches", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Amandes torréfiées", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Miel de fleurs", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Toaster 2 tranches de pain au levain.","Pendant ce temps, laver et torréfier 30g d'amandes à sec dans une poêle 2-3 min en remuant (elles doivent embaumer).","Couper les figues en quartiers (en 4 ou 6 selon la taille).","Étaler généreusement le fromage blanc sur les toasts.","Disposer les quartiers de figue dessus.","Concasser grossièrement les amandes torréfiées, parsemer.","Arroser de 2 c. à café de miel de fleurs.","Servir aussitôt."] },

{ id:"pd11", nom:"Granola maison, lait & myrtilles", mode:"both", type:"petit-dej", saison:["printemps","été","automne"], culture:"international", temps:5, difficulte:1,
  ingredients:[
    { nom:"Granola", qte:120, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait demi-écrémé", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Myrtilles", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sortir le granola, le lait et les myrtilles.","Répartir 120g de granola dans 4 bols.","Verser 40cl de lait froid sur le granola, sans noyer.","Laver les myrtilles. Les répartir généreusement par-dessus (200g pour 4 bols).","Servir immédiatement avant que le granola ne ramollisse trop."] },

{ id:"pd12", nom:"Œufs à la coque & mouillettes", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:8, difficulte:1,
  ingredients:[
    { nom:"Œufs frais", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Sortir les œufs 10 min avant pour qu'ils soient à température ambiante (sinon ils craquent).","Porter une casserole d'eau à grosse ébullition.","Plonger délicatement les œufs avec une cuillère. Régler le minuteur sur 3 min 30 sec PILE.","Pendant ce temps, toaster 4 tranches de pain de campagne et les couper en bâtonnets de 2cm (mouillettes).","Beurrer chaque mouillette avec 30g de beurre.","À la fin du minuteur, sortir les œufs et les passer 5 sec sous l'eau froide pour stopper la cuisson.","Mettre dans les coquetiers, taper délicatement le sommet à la petite cuillère pour décoiffer.","Saler le jaune, servir aussitôt avec les mouillettes."] },

{ id:"pd13", nom:"Bowl chia, coco & mangue", mode:"both", type:"petit-dej", saison:["été","printemps"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Graines de chia", qte:6, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Lait de coco", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Mangue", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Noix de coco râpée", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Sirop d'agave", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["LA VEILLE OU 4h AVANT : dans un bol, mélanger 6 c. à soupe de graines de chia avec 40cl de lait de coco et 2 c. à café de sirop d'agave. Mettre au frigo, mélanger toutes les 30 min pendant 1h pour éviter les amas.","Le matin : la préparation doit être épaisse type pudding.","Couper la mangue en petits dés (chair seulement, sans noyau).","Répartir le pudding chia dans 4 bols.","Disposer les dés de mangue dessus.","Parsemer 30g de noix de coco râpée.","Servir frais."] },

{ id:"pd14", nom:"Tartines chèvre, miel & thym", mode:"us", type:"petit-dej", saison:["printemps","été","automne"], culture:"méditerranéen", temps:8, difficulte:1,
  ingredients:[
    { nom:"Baguette tradition", qte:0.5, unite:"pièce", rayon:"Boulangerie" },
    { nom:"Bûche de chèvre", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Miel de châtaignier", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Thym frais", qte:1, unite:"branche", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le grill du four à 220°C.","Couper la baguette en 2 dans la longueur, puis en 4 morceaux.","Toaster ces tranches 2 min au grill côté coupe vers le haut.","Pendant ce temps, couper la bûche de chèvre en rondelles épaisses (1cm).","Sortir les tranches, déposer 1-2 rondelles de chèvre sur chacune.","Repasser au grill 4 min : le fromage doit fondre et dorer.","Sortir, arroser chaque tartine d'1 c. à café de miel chaud.","Effeuiller le thym frais directement dessus.","Servir aussitôt."] },

{ id:"pd15", nom:"Œufs Bénédicte", mode:"us", type:"petit-dej", saison:["printemps","automne","hiver"], culture:"international", temps:25, difficulte:3,
  ingredients:[
    { nom:"Muffins anglais", qte:2, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Bacon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Œufs frais", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jaunes d'œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre clarifié", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:0.5, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre blanc", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préparer le beurre clarifié : faire fondre 100g de beurre, laisser reposer, retirer la mousse blanche en surface, garder le liquide clair doré.","Dans un bol au bain-marie (eau à frémissement, pas bouillante), battre 2 jaunes d'œufs avec 1 c. à soupe d'eau froide jusqu'à ce que le mélange double de volume (3-4 min).","Verser le beurre clarifié tiède EN FILET MINCE en fouettant en continu (comme une mayonnaise) jusqu'à obtenir une sauce épaisse et brillante. Ajouter le jus d'1/2 citron, sel, poivre. Réserver au tiède.","Pendant ce temps, faire revenir les 4 tranches de bacon dans une poêle à sec jusqu'à croustillantes (5 min).","Pocher les 4 œufs : eau frémissante + 1 c. à soupe de vinaigre, casser chaque œuf un par un dans un tourbillon, cuire 3 min, sortir à l'écumoire.","Toaster les muffins anglais coupés en 2.","Monter chaque assiette : 1/2 muffin + 1 tranche de bacon + 1 œuf poché + 1 belle cuillère de hollandaise. Servir aussitôt."] },

{ id:"dj01", nom:"Pâtes carbonara à la française", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tagliatelles fraîches", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Poivre noir", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à grosse ébullition (10g de sel par litre).","Pendant ce temps : dans une très grande poêle ou sauteuse, faire revenir 200g de lardons fumés à sec à feu moyen 5 min jusqu'à dorés et croustillants. Pas d'huile, ils rendent leur gras.","Dans un bol, casser 4 œufs entiers. Ajouter 20cl de crème fraîche, 80g de parmesan râpé, sel léger (parmesan déjà salé), POIVRE GÉNÉREUX. Battre à la fourchette.","Plonger 500g de tagliatelles fraîches dans l'eau bouillante. Cuire 3 min (al dente).","Sortir la poêle des lardons du feu. Égoutter les pâtes en gardant 1 louche d'eau de cuisson.","VERSER LES PÂTES DANS LA POÊLE DES LARDONS HORS DU FEU. C'est essentiel : si le mélange œuf est ajouté sur feu vif, on obtient des œufs brouillés.","Mélanger énergiquement 30 sec, puis verser le mélange œuf-crème-parmesan.","Continuer à mélanger 1 min HORS FEU : la chaleur résiduelle cuit doucement les œufs et nappe les pâtes d'une sauce crémeuse.","Si la sauce est trop épaisse, ajouter 1 c. à soupe d'eau de cuisson.","Servir aussitôt dans des assiettes très chaudes. Donner un dernier tour de poivre et un peu de parmesan supplémentaire."] },

{ id:"dj03", nom:"Wraps poulet caesar", mode:"kids", type:"diner", saison:["printemps","été"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tortillas de blé", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs de poulet", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Cœurs de romaine", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Parmesan en copeaux", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Mayonnaise", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Citron", qte:0.5, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Croûtons", qte:80, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Poêler le poulet émincé.","Préparer une caesar : mayo, moutarde, citron, parmesan râpé.","Émincer la romaine.","Garnir les tortillas, rouler serré, couper en deux."] },

{ id:"dj04", nom:"Croque-monsieur jambon-fromage", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:12, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Farine", qte:25, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C en mode grill.","Préparer la béchamel : faire fondre 40g de beurre, ajouter 25g de farine, mélanger 1 min. Verser 25cl de lait en fouettant. Cuire 3 min jusqu'à épaississement. Saler, poivrer, muscade.","Beurrer 12 tranches de pain de mie.","Monter chaque croque : pain (beurre vers le bas) + 1 c. à soupe de béchamel + 1 tranche de jambon + 1 belle pincée d'emmental + 1 c. à soupe de béchamel + pain (beurre vers le haut).","Saupoudrer du reste de béchamel sur le dessus de chaque croque.","Parsemer généreusement du reste d'emmental.","Enfourner sous le grill 10-12 min jusqu'à doré et coulant.","Servir aussitôt avec une salade verte vinaigrée."] },

{ id:"dj05", nom:"Lasagnes à la bolognaise", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"italien", temps:75, difficulte:2,
  ingredients:[
    { nom:"Feuilles de lasagne", qte:12, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Coulis de tomates", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:50, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:50, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 180°C.","Préparer la sauce bolognaise : émincer 1 oignon, 2 carottes en petits dés, 2 gousses d'ail. Suer dans 2 c. à soupe d'huile 8 min.","Ajouter 500g de bœuf haché. Émietter et cuire 6 min jusqu'à doré.","Ajouter 50cl de coulis de tomates, 1 c. à café d'herbes de Provence, sel, poivre. Mijoter 30 min à feu doux.","Pendant ce temps, préparer la béchamel : faire fondre 50g de beurre, ajouter 50g de farine, verser 50cl de lait en plusieurs fois en fouettant. Cuire jusqu'à épaississement (5 min). Saler, poivrer.","Beurrer un grand plat à gratin. Étaler 1 louche de bolo au fond.","Couches successives : feuilles de lasagne + bolo + béchamel + parmesan. Faire 4 couches.","Finir par béchamel + parmesan généreusement.","Enfourner 30 min : le dessus doit être bien doré et bouillonnant.","Laisser reposer 10 min hors du four avant de servir (le moelleux se stabilise). Servir avec une salade verte."] },

{ id:"dj06", nom:"Steak haché & purée maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 1kg de pommes de terre, les couper en cubes de 3cm.","Cuire à l'eau bouillante salée 25 min jusqu'à tendres (pointe couteau).","Pendant ce temps, sortir les steaks hachés 10 min avant pour qu'ils soient à température.","Égoutter les pdt, les passer au presse-purée.","Faire tiédir 20cl de lait. L'ajouter à la purée avec 60g de beurre, 1 pincée de muscade. Saler, poivrer.","Bien battre la purée pour qu'elle soit lisse et aérée.","Saler les steaks juste avant cuisson. Cuire 2 min par face dans une poêle bien chaude SANS matière grasse.","Servir : grande cuillère de purée + steak haché. Beurre supplémentaire ou ketchup à part."] },

{ id:"dj07", nom:"Pizza maison margherita", mode:"kids", type:"diner", saison:["été","printemps"], culture:"italien", temps:90, difficulte:2,
  ingredients:[
    { nom:"Farine T55", qte:500, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Levure boulangère fraîche", qte:15, unite:"g", rayon:"Crèmerie" },
    { nom:"Coulis de tomate", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Mozzarella di bufala", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic frais", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sel fin", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Pétrir farine, levure, eau tiède, sel, huile — laisser lever 1 h.","Étaler en disques fins.","Garnir de coulis, mozza déchirée, huile d'olive.","Four 8 min à 250°C, basilic à la sortie."] },

{ id:"dj08", nom:"Tarte fine courgette & chèvre", mode:"kids", type:"diner", saison:["été","printemps","automne"], culture:"français", temps:40, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bûche de chèvre", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Thym", qte:1, unite:"branche", rayon:"Fruits & Légumes" }
  ],
  etapes:["Étaler la pâte, piquer la surface.","Trancher les courgettes en rondelles fines.","Mélanger crème et œuf, étaler sur la pâte.","Disposer courgettes et chèvre, four 25 min à 200°C."] },

{ id:"dj09", nom:"Tortillas poulet & fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tortillas de blé", qte:8, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs de poulet", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Cheddar râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Oignon rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Paprika doux", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer poulet et légumes, faire revenir avec paprika.","Garnir les tortillas de poulet, fromage, crème.","Plier en deux.","Dorer 2 min par face à la poêle sèche."] },

{ id:"dj10", nom:"Salade composée poulet, avocat & œuf", mode:"both", type:"diner", saison:["printemps","été"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Salade mâche ou romaine", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Blancs de poulet", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Avocats", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire œufs durs 9 min, refroidir.","Poêler le poulet émincé.","Trancher avocats et tomates.","Dresser sur la salade, arroser de vinaigrette."] },

{ id:"dj11", nom:"Quiche lorraine & salade verte", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:50, difficulte:2,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:250, unite:"g", rayon:"Boucherie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Lait", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 180°C.","Foncer un moule à tarte de pâte brisée. Piquer le fond à la fourchette. Mettre du papier cuisson + haricots secs sur la pâte (cuisson à blanc).","Pré-cuire 10 min au four.","Pendant ce temps, faire revenir 250g de lardons fumés à sec dans une poêle 5 min. Égoutter sur papier absorbant.","Dans un saladier, battre 4 œufs entiers + 30cl de crème + 15cl de lait + 1 pincée de muscade. Saler très peu (lardons salés), poivrer.","Sortir le moule du four, retirer haricots et papier.","Répartir les lardons sur le fond.","Verser l'appareil œufs-crème.","Enfourner 35 min : la quiche doit être prise mais encore légèrement tremblotante au centre.","Laisser tiédir 5 min avant de servir avec une salade verte vinaigrée."] },

{ id:"dj12", nom:"Poulet rôti & frites maison", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:75, difficulte:1,
  ingredients:[
    { nom:"Poulet fermier", qte:1, unite:"pièce (1,5kg)", rayon:"Boucherie" },
    { nom:"Pommes de terre Bintje", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile de friture", qte:1, unite:"litre", rayon:"Épicerie salée" }
  ],
  etapes:["Beurrer le poulet, thym, ail dans la cavité.","Four 1 h à 200°C en arrosant.","Couper les pommes de terre en bâtonnets.","Frire en 2 bains : 160°C puis 180°C, sel à la sortie."] },

{ id:"dj13", nom:"Gratin de pâtes au thon", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:40, difficulte:1,
  ingredients:[
    { nom:"Coquillettes", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Thon au naturel", qte:2, unite:"boîtes (140g)", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pâtes al dente.","Battre œufs, crème, lait, sel, poivre.","Mélanger pâtes, thon égoutté, sauce.","Verser en plat, fromage dessus, four 20 min à 200°C."] },

{ id:"dj14", nom:"Chili con carne doux & riz", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"international", temps:50, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Haricots rouges", qte:2, unite:"boîtes", rayon:"Épicerie salée" },
    { nom:"Tomates concassées", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cumin", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Paprika fumé", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Suer oignons et poivrons, ajouter viande.","Verser tomates, haricots, épices doses douces.","Mijoter 30 min couvert.","Servir sur riz vapeur."] },

{ id:"dj15", nom:"Œufs cocotte aux épinards", mode:"both", type:"diner", saison:["printemps","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Œufs frais", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Épinards frais", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan râpé", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:20, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:1, unite:"gousse", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 180°C.","Laver 300g d'épinards frais, les essorer.","Hacher 1 gousse d'ail.","Dans une grande poêle, faire fondre 20g de beurre. Y faire tomber les épinards + ail à feu vif 3 min (ils réduisent beaucoup). Saler, poivrer.","Beurrer 4 ramequins. Répartir les épinards au fond.","Casser 1 œuf dans chaque ramequin sans casser le jaune.","Couvrir de 15cl de crème répartie (environ 3 c. à soupe par ramequin) et parsemer 10g de parmesan râpé par ramequin.","Placer les ramequins dans un plat. Verser de l'eau chaude dans le plat (bain-marie) jusqu'à mi-hauteur des ramequins.","Enfourner 10 min : le blanc doit être pris, le jaune encore coulant.","Servir aussitôt avec des mouillettes de pain grillé."] },

{ id:"dj16", nom:"Salade niçoise", mode:"us", type:"diner", saison:["été","printemps"], culture:"méditerranéen", temps:25, difficulte:1,
  ingredients:[
    { nom:"Thon en boîte de qualité", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivron vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Oignon rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Olives noires de Nice", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Anchois à l'huile", qte:8, unite:"filets", rayon:"Épicerie salée" },
    { nom:"Basilic", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Œufs durs 9 min, écaler.","Couper tomates, poivron, oignon en lamelles.","Dresser dans un grand plat, ajouter thon, anchois, olives.","Huile d'olive, basilic ciselé, servir frais."] },

{ id:"dj18", nom:"Buddha bowl quinoa & légumes rôtis", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"international", temps:40, difficulte:1,
  ingredients:[
    { nom:"Quinoa", qte:250, unite:"g", rayon:"Épicerie salée" },
    { nom:"Patate douce", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Brocoli", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pois chiches", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Avocat", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Tahin", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cumin", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Rôtir patate douce, brocoli, pois chiches au four, cumin, huile d'olive, 25 min à 200°C.","Cuire le quinoa 12 min.","Sauce : tahin + citron + eau + sel.","Dresser en bowls, avocat tranché, sauce."] },

{ id:"dj19", nom:"Tartare de bœuf & pommes grenailles", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Filet de bœuf coupé au couteau", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Cornichons", qte:6, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Jaunes d'œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Moutarde de Dijon", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Sauce Worcestershire", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Pommes grenailles", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Rôtir les grenailles au four 30 min, fleur de sel.","Mélanger échalotes hachées, câpres, cornichons, moutarde, Worcester.","Incorporer la viande, jaune d'œuf, ajuster.","Servir tout de suite avec les grenailles."] },

{ id:"dj20", nom:"Risotto champignons & parmesan", mode:"us", type:"diner", saison:["automne","hiver"], culture:"italien", temps:35, difficulte:2,
  ingredients:[
    { nom:"Riz arborio", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Champignons de Paris", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Suer échalote, nacrer le riz, déglacer au vin blanc.","Ajouter bouillon chaud louche par louche, remuer 18 min.","Sauter les champignons à part.","Hors feu : beurre, parmesan, champignons, persil."] },

{ id:"dj21", nom:"Salade lentilles, chèvre & tomates séchées", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"méditerranéen", temps:35, difficulte:1,
  ingredients:[
    { nom:"Lentilles vertes du Puy", qte:250, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bûche de chèvre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates séchées à l'huile", qte:80, unite:"g", rayon:"Épicerie salée" },
    { nom:"Roquette", qte:80, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre de Xérès", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pignons de pin", qte:30, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les lentilles 25 min, égoutter tiède.","Vinaigrette échalote-Xérès.","Émietter le chèvre, ajouter tomates séchées, roquette.","Mélanger, pignons torréfiés sur le dessus."] },

{ id:"dj22", nom:"Tartare de saumon, avocat & citron", mode:"us", type:"diner", saison:["printemps","été"], culture:"français", temps:20, difficulte:2,
  ingredients:[
    { nom:"Pavé de saumon extra-frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Avocats", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron jaune", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Couper saumon et avocat en petits dés.","Mélanger avec jus de citron, huile, câpres, ciboulette.","Saler, poivrer délicatement.","Servir dans un cercle, sur un toast grillé."] },

{ id:"dj27", nom:"Tagliatelles fraîches à la truffe", mode:"us", type:"diner", saison:["automne","hiver"], culture:"italien", temps:20, difficulte:2,
  ingredients:[
    { nom:"Tagliatelles fraîches aux œufs", qte:400, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre de qualité", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile de truffe", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Parmesan affiné 24 mois", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Truffe fraîche (ou en lamelles)", qte:15, unite:"g", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les tagliatelles al dente, garder de l'eau de cuisson.","Faire mousser le beurre avec 2 c. à soupe d'eau de cuisson.","Enrober les pâtes, parmesan râpé, mélanger vivement.","Râper la truffe dessus, filet d'huile, fleur de sel."] },

{ id:"dj28", nom:"Apéro dînatoire planche italienne", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Prosciutto di Parma", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Coppa", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Mozzarella di bufala", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Olives mélangées", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates cerises", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pesto vert", qte:1, unite:"pot", rayon:"Épicerie salée" },
    { nom:"Grissinis", qte:1, unite:"paquet", rayon:"Boulangerie" },
    { nom:"Ciabatta", qte:1, unite:"pièce", rayon:"Boulangerie" }
  ],
  etapes:["Trancher la mozza, parsemer de pesto.","Disposer charcuterie et fromages en éventail.","Olives et tomates en petits ramequins.","Pain et grissinis à côté, huile d'olive."] },

{ id:"dj29", nom:"Carpaccio bresaola & roquette", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"italien", temps:10, difficulte:1,
  ingredients:[
    { nom:"Bresaola en tranches", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Roquette", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Parmesan en copeaux", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pignons de pin", qte:30, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Disposer la bresaola en rosace dans l'assiette.","Couronner de roquette.","Copeaux de parmesan, pignons torréfiés.","Citron, huile d'olive, poivre du moulin."] },

{ id:"dj30", nom:"Salade de chèvre chaud sur toasts", mode:"both", type:"diner", saison:["automne","printemps","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Crottins de chèvre", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Mesclun", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Noix", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lardons", qte:120, unite:"g", rayon:"Boucherie" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de noix", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Toaster le pain, déposer un demi-crottin, miel.","Passer 3 min sous le grill.","Faire revenir les lardons.","Dresser sur le mesclun, vinaigrette, lardons, noix."] },

{ id:"dn01", nom:"Saumon rôti citron, riz & brocolis", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces (150g)", rayon:"Poissonnerie" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Brocolis", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C (chaleur tournante).","Laver et couper 2 brocolis en bouquets de taille égale.","Mettre les pavés de saumon sur une plaque tapissée de papier cuisson, côté peau dessous.","Arroser de 3 c. à soupe d'huile d'olive, saler, poivrer. Couper 2 citrons en quartiers, en placer autour.","Mettre les brocolis dans le panier vapeur OU lancer la cuisson à l'eau bouillante salée pour 6 min de cuisson croquante.","Cuire 400g de riz basmati en parallèle : eau bouillante salée pendant 11 min.","Enfourner le saumon 15 min : il doit être nacré à cœur, opaque sur les bords.","Servir : pavé de saumon, riz, brocolis croquants, quartier de citron, aneth ciselé sur le saumon."] },

{ id:"dn02", nom:"Cabillaud, écrasé pdt & haricots verts", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre rattes", qte:700, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Haricots verts", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 700g de pommes de terre rattes (entières si petites).","Cuire à l'eau bouillante salée 20 min jusqu'à tendres.","Pendant ce temps, équeuter 400g de haricots verts.","Cuire 8 min à l'eau bouillante salée, garder croquants.","Égoutter pdt, écraser à la fourchette avec 50g de beurre + 3 c. à soupe d'huile d'olive.","Saler-poivrer les pavés de cabillaud. Cuire 4 min côté peau + 3 min côté chair dans 1 c. à soupe d'huile.","Servir : écrasé pdt + haricots verts + cabillaud + quartier citron."] },

{ id:"dn04", nom:"Couscous merguez & poulet (doux)", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"méditerranéen", temps:60, difficulte:2,
  ingredients:[
    { nom:"Semoule moyenne", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Cuisses de poulet", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Merguez", qte:8, unite:"pièces", rayon:"Boucherie" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pois chiches", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Tomates concassées", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ras-el-hanout", qte:2, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Émincer 2 oignons. Couper 3 carottes en rondelles, 2 courgettes en cubes.","Dans une grande cocotte, chauffer 3 c. à soupe d'huile. Dorer les cuisses de poulet 5 min toutes faces. Réserver.","Suer oignons 5 min, ajouter ras-el-hanout (2 c. à café), mélanger 1 min.","Ajouter carottes, courgettes, 25cl de tomates concassées, 1 boîte de pois chiches égouttés et 50cl d'eau.","Remettre poulet, saler. Couvrir, mijoter 40 min à feu doux.","Pendant ce temps, faire dorer 8 merguez dans une poêle 10 min en les retournant.","Hydrater 400g de semoule selon paquet (eau salée + 2 c. à soupe d'huile).","Servir : semoule + bouillon de légumes + poulet + 2 merguez par personne."] },

{ id:"dn05", nom:"Boulettes de bœuf sauce tomate & spaghetti", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:45, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Spaghetti", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Coulis de tomates", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:50, unite:"g", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préparer la farce : dans un saladier, mélanger 500g de bœuf haché avec 1 œuf, 1 oignon haché finement, 2 gousses d'ail écrasées, 50g de chapelure préalablement trempée dans 5cl de lait, 1 c. à café d'origan, sel, poivre.","Pétrir 2 min à la main pour bien lier. Former 24-30 boulettes de la taille d'une grosse noix.","Dans une grande poêle, chauffer 3 c. à soupe d'huile d'olive à feu moyen-vif. Y dorer les boulettes 2 min de chaque face (4 faces) en les retournant délicatement. Les réserver.","Dans la même poêle, ajouter 2 gousses d'ail écrasées et 1 oignon haché. Suer 3 min.","Verser 50cl de coulis de tomates, 2 c. à café d'origan, 1 c. à café de sucre, sel, poivre. Mijoter 5 min.","Remettre les boulettes dans la sauce. Couvrir, mijoter 20 min à feu doux. Elles vont absorber la sauce et devenir tendres.","Pendant ce temps, cuire 400g de spaghetti dans une grande casserole d'eau salée pour 1 min de moins que le paquet (al dente).","Égoutter les pâtes en gardant 1 louche d'eau de cuisson.","Verser un peu de sauce sur les pâtes pour les colorer, mélanger.","Servir les pâtes dans les assiettes, déposer 4-5 boulettes par assiette, napper de sauce. Parsemer généreusement de parmesan râpé et de basilic frais ciselé."] },

{ id:"dn06", nom:"Émincé de dinde & pommes de terre sautées", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Aiguillettes de dinde", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 800g de pdt, couper en cubes de 2cm. Éponger.","Dans une poêle, sauter pdt 20 min dans 3 c. à soupe d'huile à feu moyen.","Pendant ce temps, saisir 500g d'aiguillettes de dinde 6 min en remuant. Réserver.","Dans la même poêle, suer 2 échalotes ciselées 2 min.","Déglacer avec 10cl de bouillon, ajouter 15cl de crème + 2 c. à café de moutarde. Mijoter 2 min.","Remettre la dinde dans la sauce 1 min.","Servir avec pdt sautées + persil ciselé."] },

{ id:"dn07", nom:"Hachis parmentier maison", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Bœuf haché", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C (chaleur tournante).","Éplucher 1kg de pommes de terre, les couper en gros cubes. Les mettre dans une casserole d'eau froide salée, porter à ébullition, cuire 20 min jusqu'à ce qu'elles soient tendres (pointe de couteau).","Pendant que les pommes de terre cuisent : émincer 2 oignons et 2 gousses d'ail.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen. Suer oignons 5 min jusqu'à translucides, ajouter l'ail 1 min.","Ajouter 600g de bœuf haché. L'émietter à la spatule. Saler, poivrer, ajouter persil ciselé. Cuire 8 min en remuant.","Égoutter les pommes de terre. Les écraser au presse-purée (ou à la fourchette). Ajouter 50g de beurre + 20cl de lait chaud + sel + poivre + 1 pincée de muscade. Bien mélanger : la purée doit être souple mais pas liquide.","Dans un plat à gratin beurré, étaler le mélange viande au fond.","Recouvrir d'une couche régulière de purée à la spatule. Strier la surface à la fourchette (esthétique + meilleure dorure).","Parsemer 100g de gruyère râpé.","Enfourner 20 min : le dessus doit être bien doré et bouillonnant aux bords.","Laisser tiédir 5 min avant de servir. Avec une salade verte vinaigrette."] },

{ id:"dn08", nom:"Blanquette de veau & riz", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Épaule de veau en cubes", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poireaux", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Jaunes d'œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Couper 800g d'épaule de veau en cubes.","Blanchir 5 min eau bouillante, rincer (la viande sera plus claire).","Dans une cocotte, mettre veau + 1L de bouillon de volaille + 1 oignon piqué de clous + bouquet garni + 3 carottes + 2 poireaux.","Mijoter 1h.","Pendant ce temps, sauter 300g de champignons en lamelles à part.","Cuire 300g de riz basmati 12 min.","Préparer la liaison : 25cl de crème + 2 jaunes + jus d'1 citron. Mélanger.","Hors feu, incorporer la liaison dans la cocotte (PAS bouillir sinon les œufs cuisent).","Ajouter champignons. Servir sur riz."] },

{ id:"dn09", nom:"Cuisses de poulet & ratatouille", mode:"both", type:"diner", saison:["été","printemps","automne"], culture:"méditerranéen", temps:75, difficulte:2,
  ingredients:[
    { nom:"Cuisses de poulet", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Aubergines", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivrons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 2 aubergines, 2 courgettes, 2 poivrons en cubes de 2cm. Émincer 2 oignons. Couper 6 tomates en quartiers.","Dans une grande cocotte allant au four, chauffer 4 c. à soupe d'huile à feu moyen-vif.","Saisir les cuisses de poulet côté peau 5 min jusqu'à dorées, retourner 3 min. Les retirer.","Dans la même cocotte, ajouter oignons et autres légumes. Cuire 8 min en remuant. Ajouter 4 gousses d'ail écrasées et 1 c. à soupe d'herbes de Provence.","Remettre les cuisses de poulet sur les légumes (côté peau vers le haut).","Ajouter 2 c. à soupe d'huile d'olive supplémentaire, saler.","Couvrir, enfourner 40 min. Les légumes confisent, le poulet est ultra-tendre.","Servir avec un bon pain de campagne pour saucer."] },

{ id:"dn10", nom:"Filet mignon de porc à la moutarde & tagliatelles", mode:"kids", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:40, difficulte:1,
  ingredients:[
    { nom:"Filet mignon de porc", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Tagliatelles", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Thym", qte:2, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 180°C.","Saler et poivrer 600g de filet mignon de porc entier. Saisir 3 min toutes faces dans 2 c. à soupe d'huile chaude.","Transférer sur plaque, enfourner 25 min. La viande doit rester légèrement rosée à cœur.","Pendant ce temps, cuire 400g de tagliatelles 9 min al dente.","Pendant la cuisson de la viande, émincer 2 échalotes.","Quand la viande est cuite, la sortir et la laisser reposer 5 min sous papier alu.","Dans la poêle de saisie, suer les échalotes, déglacer 10cl de vin blanc. Ajouter 25cl de crème + 3 c. à soupe de moutarde. Mijoter 3 min.","Trancher la viande en médaillons. Servir sur les pâtes, napper de sauce."] },

{ id:"dn11", nom:"Tajine poulet citron & olives", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"méditerranéen", temps:70, difficulte:2,
  ingredients:[
    { nom:"Cuisses de poulet", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Citrons confits", qte:2, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Olives violettes", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Gingembre frais", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Safran", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Coriandre fraîche", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Semoule fine", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 180°C.","Émincer 2 oignons, écraser 3 gousses d'ail, râper 1 morceau de gingembre (3cm).","Couper 2 citrons confits en petits dés.","Dans une cocotte allant au four, chauffer 3 c. à soupe d'huile. Saisir les 4 cuisses de poulet côté peau 5 min. Réserver.","Suer oignons + ail + gingembre + 1 pincée de safran 5 min.","Remettre poulet, ajouter citrons confits, 30cl d'eau, sel.","Couvrir, enfourner 40 min.","Ajouter 150g d'olives violettes 10 min avant la fin.","Cuire 300g de semoule fine en parallèle (eau bouillante salée + huile).","Servir : semoule + tajine + coriandre fraîche ciselée."] },

{ id:"dn12", nom:"Spaghetti bolognaise", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:50, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Tomates concassées", qte:80, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Concentré de tomate", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Carotte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Céleri branche", qte:1, unite:"branche", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Vin rouge", qte:10, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Émincer 1 oignon, 1 carotte, 1 branche de céleri en très petits dés (la 'soffritto').","Dans une grande sauteuse, chauffer 2 c. à soupe d'huile d'olive à feu moyen.","Suer le soffritto 8 min à feu doux jusqu'à fondant.","Ajouter 500g de bœuf haché. L'émietter à la spatule, cuire 8 min en remuant jusqu'à bien doré.","Déglacer avec 10cl de vin rouge, laisser évaporer 2 min.","Ajouter 80cl de tomates concassées, 2 c. à soupe de concentré de tomate, sel, poivre, 1 c. à café de sucre.","MIJOTER À FEU TRÈS DOUX 30 MIN (idéalement plus, 1h c'est l'idéal). Le secret d'une vraie bolognaise : le temps.","Cuire 400g de spaghetti al dente dans une grande casserole d'eau salée.","Égoutter, dresser dans des assiettes, napper de sauce. Parmesan râpé généreusement, basilic en fin."] },

{ id:"dn14", nom:"Tartiflette savoyarde", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Reblochon", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Préchauffer le four à 200°C.","Éplucher 1,2kg de pommes de terre. Les couper en rondelles de 5mm.","Cuire les pommes de terre à l'eau bouillante salée 12 min jusqu'à AL DENTE (encore un peu fermes, elles finiront au four).","Pendant ce temps, émincer 2 oignons. Dans une grande poêle, faire revenir 300g de lardons à sec 4 min, ajouter les oignons, cuire 8 min jusqu'à dorés.","Déglacer avec 10cl de vin blanc, laisser évaporer 2 min.","Beurrer un grand plat à gratin. Égoutter les pommes de terre.","Étaler une couche de pommes de terre, étaler 1/2 du mélange lardons-oignons, recommencer.","Verser 20cl de crème fraîche sur le dessus, saler, poivrer.","Couper le reblochon en deux dans le sens de l'épaisseur. Déposer les 2 demi-reblochons CROÛTE VERS LE HAUT sur le gratin.","Enfourner 25 min : le reblochon doit être complètement fondu et le dessus bien doré.","Servir IMMÉDIATEMENT avec une salade verte vinaigrée et un vin blanc savoyard."] },

{ id:"dn15", nom:"Magret de canard & purée de patate douce", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:35, difficulte:2,
  ingredients:[
    { nom:"Magrets de canard", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Patates douces", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Thym", qte:2, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Éplucher 1kg de patates douces, couper en cubes de 3cm.","Cuire à l'eau bouillante salée 18 min jusqu'à tendres. Égoutter.","Écraser au presse-purée avec 40g de beurre et 10cl de crème. Saler, poivrer. Réserver au chaud.","Quadriller la peau des 2 magrets de canard au couteau pointu (pour évacuer le gras).","Saler les magrets côté peau. Les déposer dans une poêle FROIDE, côté peau vers le bas.","Allumer à feu moyen-doux. Cuire 8 min : la graisse fond et la peau devient croustillante. Vider la graisse régulièrement.","Retourner les magrets côté chair, cuire 4 min de plus (rosé).","Sortir et laisser reposer 5 min sous papier alu.","Pendant ce temps, dans la même poêle (vidée du gras), faire un caramel : 2 c. à soupe de miel + 2 c. à soupe de vinaigre balsamique. Réduire 1 min.","Trancher les magrets en lamelles. Servir sur la purée, napper de sauce."] },

{ id:"dn16", nom:"Cabillaud à l'ail & légumes vapeur", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:30, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Brocoli", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper 2 courgettes et 3 carottes en bâtonnets de 7cm. Détailler 1 brocoli en bouquets.","Cuire à la vapeur 8 min, garder croquants.","Émincer 4 gousses d'ail.","Dans une grande poêle, chauffer 4 c. à soupe d'huile d'olive. Cuire 600g de cabillaud 4 min par face.","Pendant la cuisson, préparer la persillade : ail + persil ciselé + 1 filet d'huile.","Servir : légumes vapeur + cabillaud + persillade + quartier de citron."] },

{ id:"dn18", nom:"Poulet rôti du dimanche & légumes racines", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:1,
  ingredients:[
    { nom:"Poulet fermier", qte:1, unite:"pièce (1,8kg)", rayon:"Boucherie" },
    { nom:"Carottes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Panais", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Thym & romarin", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:1, unite:"tête", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sortir le poulet 30 min avant la cuisson (à température ambiante = mieux cuit).","Préchauffer le four à 200°C.","Beurrer le poulet généreusement (50g de beurre), saler, poivrer. Glisser 2 branches de thym + 2 branches de romarin + 4 gousses d'ail dans la cavité.","Éplucher carottes, panais, pdt. Les couper en gros morceaux. Disposer autour du poulet dans le plat.","Arroser les légumes d'huile, saler.","Enfourner 1h15 : arroser le poulet de son jus toutes les 20 min. Si la peau dore trop vite, couvrir d'alu.","Vérifier la cuisson : piquer la cuisse, le jus doit être clair. La viande doit se détacher facilement.","Sortir, laisser reposer 10 min sous alu (très important pour la jutosité).","Découper et servir avec les légumes confits."] },

{ id:"dn19", nom:"Bœuf bourguignon & tagliatelles", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge corsé", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons fumés", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons grelots", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Farine", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Tagliatelles", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["LA VEILLE : mariner 1kg de bœuf à braiser dans 75cl de vin rouge corsé avec 1 bouquet garni, 1 oignon en quartiers et 3 carottes en rondelles. Couvrir, frigo 12h.","Le jour J : sortir la viande, garder la marinade. Sécher la viande au papier absorbant.","Dans une cocotte, faire revenir 200g de lardons à sec 5 min. Réserver.","Dans la même cocotte, saisir la viande 5 min toutes faces dans le gras des lardons. Saupoudrer 30g de farine, mélanger 1 min.","Ajouter la marinade (filtrée) + 25cl de bouillon + bouquet garni. Porter à ébullition.","Couvrir, mijoter au four ou feu très doux 2h30. Vérifier toutes les 30 min, ajouter eau si besoin.","Pendant ce temps, sauter 400g de champignons en quartiers à part dans 30g de beurre 5 min.","Ajouter champignons et lardons dans la cocotte 30 min avant la fin.","Cuire 400g de tagliatelles 3 min dans une grande casserole d'eau salée.","Servir le bourguignon nappé sur les tagliatelles."] },

{ id:"dn20", nom:"Galettes de pdt & saumon fumé", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Saumon fumé", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 800g de pommes de terre, les râper grossièrement.","Mettre les pommes de terre râpées dans un torchon propre et ESSORER fortement au-dessus de l'évier pour extraire l'eau. C'est crucial pour la tenue.","Dans un saladier, mélanger les pommes de terre essorées avec 2 œufs battus, sel, poivre.","Chauffer 3 c. à soupe d'huile dans une grande poêle à feu moyen.","Former 4 grosses galettes (1 par personne) à la cuillère. Tasser dans la poêle.","Cuire 4 min par face jusqu'à dorée et croustillante. Renouveler si besoin pour 8 galettes au total.","Mélanger 15cl de crème fraîche avec un peu de citron et de poivre.","Dresser : galette + crème + saumon fumé + brins d'aneth.","Servir aussitôt avec un quartier de citron."] },

{ id:"dn21", nom:"Croque-madame & salade verte", mode:"kids", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Comté râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Farine", qte:25, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C grill.","Préparer une béchamel courte : faire fondre 30g de beurre, ajouter 25g de farine, verser 25cl de lait en fouettant. Cuire 3 min jusqu'à épaississement.","Beurrer 4 tranches de pain de mie. Monter croques : pain (beurre dessous) + 1 c. de béchamel + 1 tranche de jambon + 1 c. de béchamel + comté + pain (beurre dessus).","Saupoudrer du reste de comté.","Enfourner 8 min jusqu'à doré.","Pendant ce temps, cuire 4 œufs au plat dans une poêle beurrée à feu doux. Saler le blanc.","Préparer la salade vinaigrette à part.","Dresser : croque + œuf au plat dessus. Salade à côté."] },

{ id:"dn22", nom:"Pavé de saumon basse-T° & asperges", mode:"us", type:"diner", saison:["printemps"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Pavés de saumon", qte:2, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Asperges vertes", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 90°C.","Saler-poivrer 4 pavés de saumon. Arroser d'un filet d'huile d'olive.","Enfourner 18 min : ils restent nacrés et fondants.","Pendant ce temps, cuire 500g d'asperges vertes 6 min vapeur. Garder croquantes.","Faire fondre 60g de beurre jusqu'à coloration noisette. Hors feu, ajouter jus de citron + aneth ciselé.","Servir : asperges + saumon + beurre noisette nappé."] },

{ id:"dn23", nom:"Risotto à l'encre de seiche & gambas", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"italien", temps:40, difficulte:3,
  ingredients:[
    { nom:"Riz arborio", qte:280, unite:"g", rayon:"Épicerie salée" },
    { nom:"Gambas", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Encre de seiche", qte:2, unite:"sachets", rayon:"Épicerie salée" },
    { nom:"Bouillon de poisson", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Décortiquer les gambas en gardant les têtes pour le bouillon.","Faire revenir les têtes dans 1 c. à soupe d'huile 3 min. Verser 1L de bouillon de poisson, mijoter 10 min. Filtrer.","Dans une sauteuse, suer 1 échalote ciselée dans 2 c. à soupe d'huile.","Ajouter 280g de riz Arborio, nacrer 2 min.","Déglacer avec 10cl de vin blanc.","Verser le bouillon louche par louche, en remuant. Ajouter 2 sachets d'encre de seiche.","Cuire 18 min en remuant souvent.","Snacker les gambas 1 min par face dans 30g de beurre à part.","Mantecare le risotto : hors feu, ajouter beurre + parmesan. Dresser, gambas dessus, persil ail."] },

{ id:"dn24", nom:"Tartare de daurade aux agrumes", mode:"us", type:"diner", saison:["printemps","été"], culture:"méditerranéen", temps:20, difficulte:2,
  ingredients:[
    { nom:"Filets de daurade extra-frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Citron jaune", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pamplemousse rose", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Coriandre", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Piment d'Espelette", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Couper la daurade au couteau en petits dés.","Suprêmes de pamplemousse en quartiers.","Mélanger avec échalote, citrons, huile.","Dresser en cercle, coriandre, espelette."] },

{ id:"dn25", nom:"Côte de bœuf, frites maison & béarnaise", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:3,
  ingredients:[
    { nom:"Côte de bœuf", qte:1, unite:"pièce (1kg)", rayon:"Boucherie" },
    { nom:"Pommes de terre Bintje", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Jaunes d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre d'estragon", qte:5, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Estragon frais", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:5, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Sortir la côte de bœuf 1h avant pour qu'elle soit à température (essentiel).","Préchauffer le four à 200°C.","Préparer les frites : couper 800g de pdt en bâtonnets, éponger, frire dans bain à 150°C 8 min, refroidir, refrire à 180°C 4 min.","Sécher la côte de bœuf, saler, poivrer généreusement.","Saisir 3 min de chaque face dans une grande poêle bien chaude.","Enfourner 12 min total (saignant). Vérifier au thermomètre : 50°C à cœur = saignant.","REPOSER 10 MIN sous alu (crucial).","Pendant ce temps, béarnaise : réduction échalote + vinaigre + estragon. Hors feu, monter au beurre clarifié sur jaunes en bain-marie. Estragon ciselé en fin.","Trancher la côte. Servir avec frites + béarnaise."] },

{ id:"dn26", nom:"Saint-Jacques poêlées & risotto safran", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:40, difficulte:3,
  ingredients:[
    { nom:"Noix de Saint-Jacques", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Riz arborio", qte:280, unite:"g", rayon:"Épicerie salée" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Risotto safran : nacrer, vin, bouillon safrané louche par louche.","Sécher les Saint-Jacques, saisir 1 min par face dans beurre noisette.","Monter le risotto avec beurre et parmesan.","Dresser, Saint-Jacques sur le dessus."] },

{ id:"dn27", nom:"Filet de bar & écrasé de panais", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:35, difficulte:2,
  ingredients:[
    { nom:"Filets de bar", qte:2, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Panais", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vinaigre balsamique blanc", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Estragon", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire le panais 20 min, écraser avec beurre, crème.","Cuire les bars côté peau 4 min, 1 min retournés.","Beurre noisette + balsamique blanc en sauce.","Dresser, estragon."] },

{ id:"dn28", nom:"Pintade aux pruneaux & polenta crémeuse", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:75, difficulte:2,
  ingredients:[
    { nom:"Pintade en morceaux", qte:1, unite:"pièce (1,3kg)", rayon:"Boucherie" },
    { nom:"Pruneaux dénoyautés", qte:200, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Vin rouge", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon de volaille", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Polenta précuite", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lait", qte:50, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Saisir la pintade, retirer.","Suer échalotes, déglacer au vin, bouillon, pruneaux, mijoter 50 min.","Polenta : lait bouillant, semoule en pluie, beurre + parmesan.","Servir nappé."] },

{ id:"dn29", nom:"Magret de canard sauce poivre vert", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Magrets de canard", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes grenailles", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème liquide", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Poivre vert en saumure", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Cognac", qte:3, unite:"c. à soupe", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:10, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Rôtir 600g de grenailles 30 min : huile + sel + romarin.","Pendant ce temps, quadriller la peau des 2 magrets.","Magrets côté peau dans poêle FROIDE, allumer feu moyen. Cuire 8 min, vider le gras régulièrement.","Retourner, cuire 4 min côté chair. Reposer 5 min sous alu.","Dans la poêle (vidée), suer 1 échalote. Flamber 3 c. à soupe de cognac.","Déglacer 10cl de bouillon. Ajouter 20cl de crème + 2 c. à soupe de poivre vert en saumure. Mijoter 3 min.","Trancher magrets en lamelles. Servir avec grenailles, sauce nappée."] },

{ id:"dn30", nom:"Linguine aux vongole", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"italien", temps:30, difficulte:2,
  ingredients:[
    { nom:"Linguine", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Palourdes", qte:1, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Piment oiseau", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Faire dégorger les palourdes 1h dans eau salée.","Pâtes al dente.","Ouvrir les palourdes au vin blanc + ail + piment.","Sauter les pâtes dans le jus, persil ciselé."] },

{ id:"dn31", nom:"Carbonara romaine au guanciale", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:25, difficulte:2,
  ingredients:[
    { nom:"Spaghetti", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Guanciale", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Jaunes d'œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pecorino romano", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Poivre noir", qte:2, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Sauter le guanciale en lardons, garder le gras.","Cuire les pâtes al dente.","Mélanger jaunes, pecorino, poivre.","Hors feu : pâtes + guanciale + œufs, eau de cuisson, lustrer."] },

{ id:"dn32", nom:"Apéro dînatoire méditerranéen", mode:"us", type:"diner", saison:["été","printemps"], culture:"méditerranéen", temps:25, difficulte:1,
  ingredients:[
    { nom:"Houmous", qte:1, unite:"pot", rayon:"Épicerie salée" },
    { nom:"Tzatziki", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Feta", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Olives Kalamata", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pita", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Caviar d'aubergine", qte:1, unite:"pot", rayon:"Épicerie salée" },
    { nom:"Crevettes cuites", qte:200, unite:"g", rayon:"Poissonnerie" }
  ],
  etapes:["Couper concombre et tomates en sticks.","Tiédir les pitas 4 min au four.","Dresser bouchées, dips, fromages.","Huile d'olive, herbes, citron en quartiers."] },

{ id:"dn34", nom:"Côtelettes d'agneau & flageolets", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Côtelettes d'agneau", qte:8, unite:"pièces", rayon:"Boucherie" },
    { nom:"Flageolets cuits", qte:2, unite:"boîtes", rayon:"Épicerie salée" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Tomate", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner agneau ail-romarin-huile 30 min.","Suer ail haché, tomate concassée, flageolets, 15 min.","Griller les côtelettes 2 min par face.","Persillade au moment de servir."] },

{ id:"dn35", nom:"Burrata, tomates anciennes & basilic", mode:"us", type:"diner", saison:["été"], culture:"italien", temps:10, difficulte:1,
  ingredients:[
    { nom:"Burratas", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Tomates anciennes mélangées", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Basilic frais", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre balsamique vieilli", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Pain de campagne", qte:0.5, unite:"pièce", rayon:"Boulangerie" }
  ],
  etapes:["Sortir les burratas 30 min avant.","Couper 800g de tomates anciennes en quartiers irréguliers. Saler.","Disposer dans un grand plat de service.","Poser les 2 burratas entières au centre, les inciser à la dernière minute.","Arroser de 6 c. à soupe d'huile d'olive vierge + 2 c. à soupe de balsamique vieilli.","Parsemer fleur de sel + poivre + basilic frais en feuilles déchirées à la main.","Servir avec pain de campagne grillé."] },

{ id:"dn36", nom:"Soupe de poisson, rouille & croûtons", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"méditerranéen", temps:75, difficulte:3,
  ingredients:[
    { nom:"Soupe de poisson prête", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Poissons de roche", qte:1, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Tomate", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Fenouil", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Pain pour croûtons", qte:0.5, unite:"baguette", rayon:"Boulangerie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Pomme de terre cuite", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Jaune d'œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Gruyère râpé", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Dans une grande marmite, suer 2 oignons hachés dans 3 c. à soupe d'huile.","Ajouter 1L de soupe de poisson prête + 1kg de poissons de roche en morceaux + 2 tomates en quartiers + fenouil émincé + 1 dose de safran.","Cuire 20 min à feu moyen.","Mixer au mixeur plongeant, passer au chinois pour avoir une soupe lisse.","Pour la rouille : mixer 4 gousses d'ail + 1 pdt cuite + 1 jaune + monter à l'huile d'olive comme un aïoli.","Toaster 0,5 baguette en rondelles, frotter à l'ail.","Servir : soupe + croûtons + rouille + gruyère râpé à part."] },

{ id:"dn37", nom:"Loup en croûte de sel", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"méditerranéen", temps:50, difficulte:2,
  ingredients:[
    { nom:"Loup entier vidé", qte:1, unite:"pièce (1kg)", rayon:"Poissonnerie" },
    { nom:"Gros sel de Guérande", qte:1.5, unite:"kg", rayon:"Épicerie salée" },
    { nom:"Blancs d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Fenouil", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Mélanger 1,5kg de gros sel + 3 blancs d'œufs en pâte.","Vider le loup, garnir le ventre de fenouil émincé + 1 citron coupé + aneth.","Tasser une couche de pâte de sel sur plaque, déposer le poisson, recouvrir totalement.","Enfourner 30 min.","À table, casser la croûte avec le manche d'un grand couteau pour le show.","Lever les filets en évitant la peau. Arroser d'huile d'olive vierge. Servir."] },

{ id:"dn38", nom:"Risotto aux cèpes", mode:"us", type:"diner", saison:["automne"], culture:"italien", temps:40, difficulte:2,
  ingredients:[
    { nom:"Riz arborio", qte:280, unite:"g", rayon:"Épicerie salée" },
    { nom:"Cèpes frais", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Cèpes séchés", qte:30, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil plat", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Réhydrater cèpes secs, garder l'eau.","Sauter cèpes frais à part.","Nacrer riz, vin, bouillon + eau cèpes louche par louche.","Mantecare : beurre, parmesan, cèpes."] },

{ id:"qk01", nom:"Pâtes au pesto, tomates cerises & parmesan", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne ou fusilli", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pesto vert", qte:1, unite:"pot (190g)", rayon:"Épicerie salée" },
    { nom:"Tomates cerises", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à grosse ébullition (10g de sel par litre).","Pendant ce temps, laver les tomates cerises et les couper en deux dans le sens de la hauteur.","Plonger 500g de pâtes (penne ou fusilli) dans l'eau bouillante. Cuire selon le paquet (généralement 9-11 min) en mode al dente : sortir 1 min avant la fin indiquée.","Dans une grande sauteuse, chauffer 2 c. à soupe d'huile d'olive à feu vif. Y déposer les tomates cerises côté coupe vers le bas.","Ne pas bouger 2 min (elles caramélisent), puis remuer et cuire encore 3 min jusqu'à ce qu'elles éclatent légèrement et rendent leur jus. Saler, poivrer.","Baisser le feu à doux. Égoutter les pâtes en gardant 1 louche d'eau de cuisson.","Verser les pâtes dans la sauteuse avec les tomates. Ajouter le pot entier de pesto et 2 c. à soupe d'eau de cuisson.","Mélanger délicatement 30 sec sur feu doux : tout doit être enrobé.","Servir dans des assiettes chaudes, parsemer généreusement de parmesan râpé et finir d'un tour de poivre."] },

{ id:"qk02", nom:"Spaghetti ail, huile & piment doux", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:12, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Piment doux en flocons", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition (10g/L).","Pendant que l'eau chauffe : éplucher 6 gousses d'ail. Les émincer en lamelles fines (pas haché, c'est important pour la texture).","Plonger 500g de spaghetti dans l'eau bouillante. Cuire al dente (1 min de moins que le paquet).","Dans une grande sauteuse, verser 8 c. à soupe d'huile d'olive. Chauffer DOUCEMENT à feu doux. Y déposer l'ail émincé.","Faire blondir l'ail 3-4 min à feu doux SANS qu'il ne brûle (très important : s'il brunit, il devient amer). Il doit juste blondir et embaumer.","Hors du feu, ajouter 1 c. à café de piment en flocons.","Égoutter les spaghetti en gardant 1 louche d'eau de cuisson. Les verser directement dans la sauteuse.","Mélanger énergiquement avec 2 c. à soupe d'eau de cuisson : la sauce doit napper, brillante.","Hors feu, ajouter 60g de parmesan râpé et le persil ciselé.","Servir aussitôt dans des assiettes très chaudes."] },

{ id:"qk03", nom:"Penne saumon, courgettes & crème", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:25, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pavés de saumon", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Courgettes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, ciseler 1 échalote finement. Couper 3 courgettes en demi-rondelles. Couper 400g de saumon en cubes de 2cm.","Cuire 500g de penne 9 min al dente (1 min de moins que le paquet).","Dans une grande sauteuse, chauffer 2 c. à soupe d'huile. Suer l'échalote 2 min. Ajouter les courgettes, cuire 6 min en remuant souvent.","Ajouter les cubes de saumon, cuire 3 min à feu vif. Le saumon doit juste blanchir, pas être sec.","Verser 25cl de crème fraîche, le zeste et jus d'1 citron. Saler, poivrer. Mijoter 2 min.","Égoutter les pâtes, les verser dans la sauteuse. Mélanger 1 min.","Servir avec l'aneth ciselé sur le dessus."] },

{ id:"qk04", nom:"Pâtes au thon, citron & câpres", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Spaghetti ou linguine", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Thon à l'huile", qte:2, unite:"boîtes (140g)", rayon:"Épicerie salée" },
    { nom:"Câpres", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, presser 1 citron pour recueillir 3 c. à soupe de jus. Râper le zeste.","Émincer 2 gousses d'ail très finement. Égoutter les 2 boîtes de thon. Hacher 3 c. à soupe de câpres.","Cuire 500g de spaghetti 8 min al dente.","Dans une grande sauteuse, chauffer 3 c. à soupe d'huile à feu doux. Y faire blondir l'ail 1 min (sans brunir).","Hors du feu, ajouter le thon émietté, les câpres, le zeste et le jus de citron. Mélanger.","Égoutter les pâtes en gardant 1 louche d'eau. Verser dans la sauteuse, ajouter 3 c. à soupe d'eau de cuisson.","Remettre 30 sec sur feu doux pour homogénéiser. Persil ciselé en fin. Servir aussitôt."] },

{ id:"qk05", nom:"One-pot pasta tomates-mozzarella", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâtes courtes (fusilli)", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates cerises", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Mozzarella", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de légumes", qte:75, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon, écraser 3 gousses d'ail.","Dans une très grande sauteuse (assez pour contenir tous les ingrédients), verser 3 c. à soupe d'huile d'olive.","Tout mettre en même temps : 500g de pâtes courtes, l'oignon, l'ail, 500g de tomates cerises entières, 75cl de bouillon de légumes BRÛLANT, 1 c. à café de sel, du poivre, 4-5 feuilles de basilic.","Porter à ébullition à feu vif, puis baisser à feu moyen-vif. Cuire 10-12 min en remuant souvent à la spatule.","Le bouillon doit être presque entièrement absorbé et les pâtes al dente. Si trop sec, ajouter un peu d'eau bouillante.","Pendant les dernières 2 min, couper 250g de mozzarella en dés.","Quand les pâtes sont prêtes, COUPER LE FEU et ajouter la mozzarella en dés. Mélanger délicatement : elle va fondre dans la chaleur résiduelle.","Ajouter le reste du basilic frais déchiré, un filet d'huile d'olive et servir aussitôt dans la sauteuse à table."] },

{ id:"qk06", nom:"Penne au gorgonzola & noix", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Gorgonzola", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème liquide", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cerneaux de noix", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Poire mûre (option)", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Cuire 500g de penne 9 min al dente.","Pendant ce temps, couper 200g de gorgonzola en petits dés. Concasser 80g de cerneaux de noix.","Dans une grande sauteuse, verser 20cl de crème liquide. Chauffer doucement (PAS bouillir).","Ajouter les dés de gorgonzola, remuer doucement jusqu'à fonte complète (3 min).","Égoutter les pâtes en gardant 1 louche d'eau.","Verser dans la sauteuse, mélanger avec 2 c. à soupe d'eau de cuisson pour bien enrober.","Si voulu, peler et couper la poire en petits dés.","Servir aussitôt, parsemer de noix concassées et dés de poire crue."] },

{ id:"qk07", nom:"Saumon poêlé citron & courgettes", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon sans peau", qte:6, unite:"pièces (150g)", rayon:"Poissonnerie" },
    { nom:"Courgettes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Herbes (thym/aneth)", qte:1, unite:"branche", rayon:"Fruits & Légumes" }
  ],
  etapes:["Trancher les courgettes en rondelles, les sauter à l'huile et ail 8 min.","Poêler les pavés de saumon 3 min par face.","Arroser de citron en fin de cuisson.","Servir avec les courgettes, herbes."] },

{ id:"qk09", nom:"Cabillaud moutarde & écrasé pommes de terre", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Moutarde à l'ancienne", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pdt 15 min à l'eau salée, écraser avec beurre.","Nappage : moutarde + crème, en couche sur le cabillaud.","Four 12 min à 200°C.","Ciboulette sur le poisson."] },

{ id:"qk10", nom:"Truite poêlée aux amandes", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Filets de truite", qte:6, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Amandes effilées", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre vapeur", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pdt vapeur 15 min.","Toaster les amandes à sec.","Cuire les filets de truite 2 min par face au beurre noisette.","Citron, persil, amandes sur le poisson, servir."] },

{ id:"qk12", nom:"Escalopes de poulet pané maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Escalopes de poulet fines", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Chapelure", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Farine", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préparer 3 assiettes : farine, œufs battus, chapelure.","Passer les escalopes dans chacune, dans l'ordre.","Frire 3 min par face dans une poêle.","Salade vinaigrette, citron en quartiers."] },

{ id:"qk14", nom:"Poulet citronné aux herbes & pommes de terre", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:30, difficulte:1,
  ingredients:[
    { nom:"Cuisses ou pilons de poulet", qte:8, unite:"pièces", rayon:"Boucherie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre grenailles", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Origan séché", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Tout sur une plaque : poulet, grenailles entières, ail en chemise, citron en quartiers.","Arroser d'huile, sel, origan.","Four 30 min à 200°C en remuant à mi-cuisson.","Servir directement de la plaque."] },

{ id:"qk16", nom:"Boulettes de bœuf à la libanaise & boulgour", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:25, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Menthe fraîche", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Cumin", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Boulgour", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Yaourt grec", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mélanger viande, oignon haché, menthe ciselée, cumin, sel.","Former des boulettes, dorer à la poêle 8 min.","Cuire le boulgour selon paquet.","Sauce : yaourt + citron + sel. Servir tout ensemble."] },

{ id:"qk17", nom:"Burgers maison familial", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:25, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:6, unite:"pièces (150g)", rayon:"Boucherie" },
    { nom:"Pains à burger", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Cheddar en tranches", qte:6, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Tomate", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Oignon rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Sauces (ketchup/mayo)", qte:1, unite:"lot", rayon:"Épicerie salée" },
    { nom:"Pommes de terre pour frites", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Frites au four 25 min à 220°C, huile et sel.","Toaster les pains.","Cuire les steaks 2 min par face, fromage dessus en fin.","Monter : sauce, salade, tomate, steak, oignon, pain."] },

{ id:"qk18", nom:"Tacos bœuf maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:25, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Tortillas (12-15cm)", qte:12, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Maïs en boîte", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Tomate", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Cheddar râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Épices tacos (cumin/paprika)", qte:1, unite:"sachet", rayon:"Épicerie salée" }
  ],
  etapes:["Faire revenir le bœuf avec les épices et le maïs 10 min.","Tiédir les tortillas 3 min au four.","Couper salade en lanières, tomate en dés.","Garnir et plier : bœuf, fromage, crudités, crème."] },

{ id:"qk19", nom:"Crêpes salées jambon-fromage-œuf", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Pâte à crêpes salée", qte:1, unite:"litre (préparée)", rayon:"Crèmerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préparer ou utiliser pâte à crêpes (mélange farine-œufs-lait).","Faire les crêpes une à une, beurrer la poêle.","À mi-cuisson : casser un œuf, jambon, fromage. Plier en 4.","Servir avec salade vinaigrette."] },

{ id:"qk20", nom:"Quesadillas poulet-cheddar-maïs", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tortillas grandes", qte:12, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs de poulet", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Cheddar râpé", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Maïs", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Paprika", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon et couper 1 poivron rouge en dés.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen. Faire revenir oignon et poivron 5 min.","Ajouter 500g de poulet en lanières, 1 c. à café de paprika, sel, poivre. Cuire 8 min en remuant.","Poser 1 tortilla dans une poêle SÈCHE à feu moyen.","Étaler sur une moitié : 1/8e du mélange poulet, 1 c. à soupe de cheddar râpé, 1 c. à café de maïs, 1 c. à café de crème fraîche.","Replier la tortilla en chausson. Cuire 2 min, retourner avec une spatule large, encore 2 min.","Renouveler avec les autres. Garder au chaud sous papier alu.","Couper chacune en 3 parts, servir avec crème fraîche à part."] },

{ id:"qk21", nom:"Velouté de potimarron rapide", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Potimarron", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:0.5, unite:"pièce", rayon:"Boulangerie" },
    { nom:"Comté râpé", qte:120, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Éplucher 1,5kg de potimarron (la peau est comestible mais le velouté est plus lisse pelé). Le couper en cubes de 3cm.","Éplucher 300g de pommes de terre, couper en cubes.","Émincer 1 oignon.","Dans une grande casserole, chauffer 1 c. à soupe d'huile, suer l'oignon 3 min.","Ajouter potimarron et pommes de terre, couvrir d'eau ou bouillon (1L environ). Saler.","Porter à ébullition, baisser, mijoter 20 min jusqu'à ce que les légumes soient tendres.","Mixer au mixeur plongeant en sauce lisse. Ajouter 20cl de crème, rectifier sel/poivre.","Couper le pain de campagne en croûtons, dorer au four 5 min à 200°C.","Servir le velouté chaud avec croûtons et 120g de comté râpé à part."] },

{ id:"qk22", nom:"Omelette aux herbes & salade", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:12, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Herbes fraîches (persil, ciboulette, estragon)", qte:1, unite:"botte mélangée", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Battre 12 œufs dans un grand bol. Saler, poivrer.","Hacher 1 botte de mélange persil-ciboulette-estragon (utiliser les ciseaux pour la ciboulette).","Ajouter les herbes dans les œufs, mélanger.","Faire fondre 40g de beurre dans une grande poêle à feu moyen-vif.","Verser les œufs. Attendre 30 sec, puis ramener les bords vers le centre à la spatule pour laisser couler l'œuf cru sur les côtés.","Continuer 2 min : les œufs doivent encore être baveux au centre.","Plier l'omelette en 2 dans la poêle, faire glisser dans le plat.","Servir aussitôt avec une bonne salade verte vinaigrée et du pain frais."] },

{ id:"qk23", nom:"Frittata pommes de terre & épinards", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"italien", temps:25, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:10, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Épinards frais", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Pdt en rondelles, cuire à la poêle 10 min avec oignon.","Ajouter épinards 2 min.","Battre œufs + parmesan, verser dans la poêle.","Cuire 5 min à couvert, terminer 3 min sous le grill."] },

{ id:"qk24", nom:"Tartines complètes saumon, avocat & œuf", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pain au levain", qte:6, unite:"tranches épaisses", rayon:"Boulangerie" },
    { nom:"Saumon fumé", qte:300, unite:"g", rayon:"Poissonnerie" },
    { nom:"Avocats", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Fromage frais", qte:200, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 200°C.","Toaster 6 tranches épaisses de pain au levain.","Faire cuire 6 œufs : mollets (6 min eau bouillante puis bain glacé) OU pochés (eau frémissante vinaigrée, 3 min).","Couper 3 avocats en deux, écraser à la fourchette avec le jus d'1/2 citron, sel, poivre.","Étaler une couche de fromage frais sur chaque toast.","Tartiner l'avocat écrasé par-dessus.","Déposer 1-2 tranches de saumon fumé.","Décoiffer l'œuf mollet (ou poser le poché) sur le dessus.","Parsemer d'aneth ciselé, fleur de sel, tour de poivre. Servir."] },

{ id:"qk26", nom:"Soupe carottes & cumin", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"méditerranéen", temps:25, difficulte:1,
  ingredients:[
    { nom:"Carottes", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cumin moulu", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Bouillon de légumes", qte:1.2, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pain", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Éplucher 1kg de carottes, les couper en rondelles.","Éplucher 300g de pommes de terre, couper en cubes.","Émincer 1 oignon.","Dans une grande casserole, chauffer 1 c. à soupe d'huile, suer l'oignon 3 min.","Ajouter carottes et pdt, 1 c. à soupe de cumin, saler. Mélanger 1 min.","Verser 1,2L de bouillon, porter à ébullition, mijoter 20 min jusqu'à tendre.","Mixer au mixeur plongeant en velouté lisse. Ajouter 15cl de crème, rectifier.","Servir avec du pain de campagne grillé."] },

{ id:"qk27", nom:"Galettes complètes œuf-jambon-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Galettes de sarrasin", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préparer les galettes : poser 1 galette de sarrasin dans une poêle légèrement beurrée à feu moyen.","Quand elle commence à dorer dessous (1 min), casser un œuf en plein centre.","Déposer 1 tranche de jambon plié en 4 dessus, et 30g d'emmental râpé tout autour.","Saler et poivrer l'œuf. Cuire 2-3 min : le blanc doit prendre, le jaune rester coulant.","Replier les 4 côtés de la galette vers le centre pour former un carré laissant voir le jaune.","Faire glisser sur une assiette chaude.","Renouveler avec les 5 autres galettes.","Servir aussitôt avec une salade verte vinaigrée."] },

{ id:"qk28", nom:"Tarte tomate-moutarde-chèvre rapide", mode:"both", type:"diner", saison:["été","printemps","automne"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Tomates mûres", qte:5, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bûche de chèvre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde à l'ancienne", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Étaler la pâte feuilletée sur sa plaque (gardée sur le papier cuisson).","Étaler 3 c. à soupe de moutarde à l'ancienne sur le fond, en laissant 1 cm de bord.","Trancher 5 tomates mûres en rondelles de 5mm. Les disposer sur la moutarde en se chevauchant légèrement. Saler, poivrer.","Trancher la bûche de chèvre en rondelles. Disposer sur les tomates.","Parsemer 1 c. à café d'herbes de Provence, arroser de 2 c. à soupe d'huile d'olive.","Enfourner 25 min : la pâte doit être bien dorée, le chèvre doit fondre et brunir légèrement.","Sortir, laisser tiédir 5 min, couper en parts. Servir avec une salade verte."] },

{ id:"qk30", nom:"Croque-monsieur express au four", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:12, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental ou comté râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C en mode grill.","Beurrer 6 tranches de pain de mie. Tartiner 1 c. à café de crème fraîche sur chaque.","Disposer 1 tranche de jambon plié en 2 sur 6 tranches.","Parsemer 30g d'emmental ou comté râpé.","Recouvrir avec les 6 tranches restantes, beurre vers le haut.","Saupoudrer le dessus du reste de fromage râpé.","Enfourner sous le grill 8-10 min en surveillant : doit être bien doré et coulant.","Servir aussitôt avec une salade verte vinaigrée."] },

{ id:"fr01", nom:"Ratatouille provençale", mode:"both", type:"diner", saison:["été","automne"], culture:"français", temps:75, difficulte:1,
  ingredients:[
    { nom:"Aubergines", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivrons rouges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper 3 aubergines, 4 courgettes, 2 poivrons en cubes de 2cm. Émincer 2 oignons. Hacher 4 gousses d'ail. Couper 6 tomates en quartiers.","Cuire séparément CHAQUE légume (10 min) dans une grande poêle avec 2 c. à soupe d'huile par lot : aubergines, puis courgettes, puis poivrons.","Dans une cocotte, suer oignons + ail. Ajouter tomates + 1 c. à soupe d'herbes de Provence.","Quand les tomates sont compotées, réunir TOUS les légumes pré-cuits.","Mijoter 40 min couvert à feu doux. La ratatouille doit être moelleuse.","En fin, basilic ciselé. Servir tiède ou froid en accompagnement."] },

{ id:"fr02", nom:"Soupe au pistou provençale", mode:"both", type:"diner", saison:["été","printemps"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Haricots blancs frais", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Haricots verts", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vermicelles", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:1, unite:"gros bouquet", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:15, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Tremper 300g de haricots blancs frais 12h. Cuire 30 min dans eau salée.","Couper 300g de haricots verts, 2 courgettes en cubes, 3 pdt en dés.","Ajouter aux haricots blancs avec 3 tomates en quartiers, cuire 20 min.","Ajouter 100g de vermicelles, cuire 7 min de plus.","Pistou au mortier (ou robot) : 6 gousses d'ail + 1 gros bouquet de basilic + 100g de parmesan + 15cl d'huile d'olive.","Servir la soupe brûlante, le pistou à part : chacun en met dans son bol."] },

{ id:"fr03", nom:"Daube provençale au vin rouge", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser (paleron)", qte:1.2, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge corsé", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:5, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Olives noires de Nice", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Zeste d'orange", qte:1, unite:"orange", rayon:"Fruits & Légumes" },
    { nom:"Tagliatelles", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["LA VEILLE : mariner 1,2kg de bœuf en cubes dans 75cl de vin rouge + oignons + carottes + bouquet 12h.","Jour J : sortir, sécher. Garder marinade.","Saisir 200g de lardons + bœuf 5 min dans cocotte.","Filtrer marinade, ajouter à la cocotte avec bouquet garni et zeste d'orange.","Mijoter 3h à feu doux ou four 150°C.","Ajouter 150g d'olives 15 min avant la fin.","Cuire 400g de tagliatelles. Servir."] },

{ id:"fr04", nom:"Petits farcis provençaux", mode:"both", type:"diner", saison:["été","automne"], culture:"français", temps:75, difficulte:2,
  ingredients:[
    { nom:"Courgettes rondes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates rondes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Chair à saucisse", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Bœuf haché", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Mie de pain", qte:80, unite:"g", rayon:"Boulangerie" },
    { nom:"Lait", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Riz cuit", qte:200, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Évider 6 courgettes rondes et 6 tomates en gardant les chapeaux. Garder la pulpe.","Émincer 3 oignons, suer dans 3 c. à soupe d'huile 5 min.","Ajouter 500g de chair à saucisse + 300g de bœuf haché, cuire 5 min.","Mélanger avec mie trempée dans lait, 2 œufs, ail + persil hachés.","Cuire 200g de riz à part 12 min.","Garnir tomates et courgettes. Disposer sur lit de riz dans plat.","Four 50 min à 180°C en remettant les chapeaux à mi-cuisson."] },

{ id:"fr05", nom:"Pissaladière niçoise", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Pâte à pizza", qte:1, unite:"boule (400g)", rayon:"Crèmerie" },
    { nom:"Oignons", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Filets d'anchois à l'huile", qte:20, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Olives noires de Nice", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Émincer 1,5kg d'oignons en rondelles fines.","Dans une grande poêle, chauffer 4 c. à soupe d'huile d'olive à feu doux. Y faire fondre les oignons 45 MINUTES en remuant régulièrement.","Important : il faut qu'ils confisent doucement jusqu'à devenir une compote dorée presque brune. Saler en fin.","Étaler la pâte à pizza sur une plaque tapissée de papier cuisson huilé.","Égoutter les oignons sur passoire, étaler en couche régulière sur la pâte.","Disposer 20 filets d'anchois en croisillons (en losanges).","Parsemer 150g d'olives noires de Nice.","Quelques branches de thym, 2 c. à soupe d'huile d'olive sur le tout.","Enfourner 25 min jusqu'à la pâte dorée. Servir tiède en parts."] },

{ id:"fr06", nom:"Aïoli garni provençal", mode:"us", type:"diner", saison:["printemps","été"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Cabillaud (ou morue dessalée)", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Haricots verts", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Chou-fleur", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Ail", qte:8, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Jaunes d'œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 1kg de pdt + 6 carottes + 1 chou-fleur en bouquets + 400g de haricots verts SÉPARÉMENT à la vapeur.","Cuire 6 œufs durs 9 min, écaler.","Pocher 800g de cabillaud 8 min eau frémissante.","Aïoli : piler 8 gousses d'ail au mortier, ajouter 2 jaunes, monter en mayo épaisse avec 30cl d'huile d'olive.","Citron, sel.","Dresser le tout sur un grand plat : aïoli au centre."] },

{ id:"fr07", nom:"Tian de légumes à la provençale", mode:"both", type:"diner", saison:["été","printemps","automne"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Courgettes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aubergines", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Thym & romarin", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 180°C.","Émincer 2 oignons, 3 gousses d'ail. Suer dans le plat à gratin avec huile.","Trancher 3 courgettes, 2 aubergines, 4 tomates en rondelles fines.","Alterner les rondelles en quinconce sur les oignons.","Arroser d'huile + thym + romarin + sel.","Four 45 min à 180°C.","Parsemer 80g de parmesan 10 min avant la fin.","Servir tiède."] },

{ id:"fr08", nom:"Brandade de morue à la nîmoise", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Morue dessalée", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème liquide", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Lait", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pain de campagne", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Pocher 600g de morue dessalée dans lait 10 min. L'effeuiller à la fourchette.","Éplucher 500g de pdt, cuire à l'eau salée 20 min, écraser.","Travailler la morue avec ail haché + huile d'olive tiède (25cl) en émulsion à la spatule.","Incorporer la purée de pdt + 15cl de crème + citron.","Saler, rectifier. Servir avec pain de campagne grillé."] },

{ id:"fr09", nom:"Bourride sétoise", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:3,
  ingredients:[
    { nom:"Baudroie (lotte) en tronçons", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Fumet de poisson", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Pommes de terre", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Jaunes d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:20, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Carotte", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poireau", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pain de campagne", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Pocher 800g de lotte dans 1L de fumet 15 min.","Aïoli : 6 gousses d'ail au mortier + 3 jaunes, monter à l'huile d'olive (20cl) en émulsion serrée.","Lier le fumet réduit avec l'aïoli HORS FEU (sinon ça tranche).","Cuire 600g de pdt, carottes, poireaux à part.","Dresser : poisson + légumes + sauce + croûtons aillés."] },

{ id:"fr10", nom:"Anchoïade de Provence et crudités", mode:"us", type:"diner", saison:["printemps","été"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Filets d'anchois à l'huile", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Vinaigre de vin rouge", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crudités (fenouil, céleri, radis, endives)", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Mixer 200g d'anchois + 4 gousses d'ail + 1 c. à soupe de vinaigre + 15cl d'huile d'olive en sauce épaisse.","Couper 1,2kg de crudités (fenouil, céleri, radis, endives) en bâtonnets.","Toaster 1 baguette en tranches.","Servir : sauce au centre, crudités et pain autour. Chacun trempe."] },

{ id:"fr11", nom:"Quenelles de brochet sauce Nantua", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:3,
  ingredients:[
    { nom:"Quenelles de brochet nature", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre d'écrevisses", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche épaisse", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Concentré de tomate", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Riz pilaf", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Suer 2 échalotes ciselées dans 50g de beurre.","Flamber 5cl de cognac + 10cl de vin blanc.","Ajouter 80g de beurre d'écrevisses + 1 c. à soupe de concentré de tomate + 30cl de crème.","Réduire 10 min en sauce.","Poser 8 quenelles dans plat à gratin, napper de sauce.","Four 20 min à 180°C : elles gonflent.","Cuire 300g de riz pilaf. Servir."] },

{ id:"fr12", nom:"Gratin dauphinois traditionnel", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:90, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre Charlotte", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche entière", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Lait entier", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Gruyère râpé (option)", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 160°C (chaleur tournante).","Frotter l'intérieur d'un plat à gratin avec 1 gousse d'ail coupée en deux. Beurrer généreusement.","Éplucher 1,5kg de pommes de terre Charlotte. Les trancher en rondelles régulières de 3mm (mandoline si possible, sinon couteau bien aiguisé).","NE PAS LAVER les pommes de terre tranchées : leur amidon est nécessaire pour que la crème prenne.","Dans une casserole, verser 40cl de crème fraîche entière + 30cl de lait + 3 gousses d'ail écrasées + 1 pincée généreuse de muscade râpée + sel + poivre.","Porter à frémissement (pas bouillir). Quand ça fume, ajouter les rondelles de pommes de terre. Cuire 5 min en remuant doucement : la crème va s'infuser dans les pommes de terre.","Transférer délicatement dans le plat beurré, en formant des couches régulières. Verser toute la crème par-dessus.","Optionnel : parsemer 80g de gruyère râpé (recette puriste : pas de fromage).","Enfourner 1h15. La pointe du couteau doit pénétrer sans résistance. Le dessus doit être bien doré.","Laisser reposer 10 min hors du four avant de servir (la crème se raffermit). Servir avec une viande rôtie ou simplement une salade verte."] },

{ id:"fr13", nom:"Salade lyonnaise frisée, lardons & œuf poché", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Salade frisée", qte:1, unite:"grosse pièce", rayon:"Fruits & Légumes" },
    { nom:"Lardons fumés", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Œufs extra-frais", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Vinaigre de vin", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile de tournesol", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pocher les œufs : porter une grande casserole d'eau à frémissement. Ajouter 5 c. à soupe de vinaigre de vin. Casser chaque œuf dans une tasse.","Créer un tourbillon dans l'eau avec une cuillère. Verser l'œuf au centre. Cuire 3 min sans bouillir. Sortir à l'écumoire, réserver sur papier absorbant. Répéter pour les 6 œufs.","Dans une grande poêle, faire revenir 300g de lardons fumés à sec 5 min jusqu'à dorés et croustillants. Garder le gras.","Toaster 8 tranches de pain de campagne et les frotter avec 2 gousses d'ail (juste pour parfumer).","Préparer la vinaigrette : 6 c. à soupe d'huile + 5 c. à soupe de vinaigre de vin + 1 c. à café de moutarde + sel + poivre. Ajouter 2 c. à soupe du gras de lardons pour le côté gourmand.","Effeuiller 1 grosse frisée. Dans des assiettes individuelles, dresser : salade + lardons chauds + croûtons + œuf poché posé délicatement.","Verser un peu de vinaigrette sur chaque assiette. Tour de poivre. Servir aussitôt."] },

{ id:"fr14", nom:"Pommes de terre dauphine maison", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Eau", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:150, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Huile de friture", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 1kg de pdt à l'eau salée 25 min, écraser en purée très ferme avec sel + muscade.","Pâte à choux : porter 25cl d'eau + 100g de beurre + sel à ébullition. Hors feu, verser 150g de farine d'un coup, mélanger.","Remettre 1 min sur feu pour dessécher (la pâte se détache des bords).","Hors feu, ajouter 4 œufs un à un en mélangeant entre chaque.","Mélanger purée + pâte à choux.","Chauffer 1L d'huile à 180°C.","Former petites quenelles à 2 cuillères, frire 4 min dorées.","Égoutter, servir aussitôt."] },

{ id:"fr15", nom:"Cervelle de canut (fromage frais herbes)", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:10, difficulte:1,
  ingredients:[
    { nom:"Fromage blanc en faisselle", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ciboulette", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Cerfeuil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre de vin", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain de campagne", qte:1, unite:"pièce", rayon:"Boulangerie" }
  ],
  etapes:["Égoutter 500g de fromage blanc en faisselle 30 min pour qu'il soit bien ferme.","Pendant ce temps, émincer très finement 2 échalotes (au robot c'est plus rapide).","Hacher 1 botte de ciboulette, 1 botte de persil plat et 1/2 botte de cerfeuil aux ciseaux.","Écraser 2 gousses d'ail au presse-ail.","Verser le fromage blanc dans un grand saladier. Ajouter herbes + échalotes + ail + 4 c. à soupe d'huile d'olive + 1 c. à soupe de vinaigre.","Mélanger délicatement. Saler généreusement, poivrer.","Couvrir, mettre au frigo 1h MINIMUM pour que les saveurs se développent.","Servir bien frais avec du pain de campagne grillé."] },

{ id:"fr16", nom:"Tablier de sapeur (gras-double pané)", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:3,
  ingredients:[
    { nom:"Gras-double cuit", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Chapelure fine", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre clarifié", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Sauce gribiche (œufs durs + cornichons + câpres + persil)", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner gras-double dans vin blanc + moutarde 30 min.","Paner à l'anglaise : œuf battu puis chapelure.","Cuire au beurre clarifié 3 min par face, croustillant.","Servir avec sauce gribiche."] },

{ id:"fr17", nom:"Saucisson chaud en brioche lyonnais", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:75, difficulte:2,
  ingredients:[
    { nom:"Saucisson à cuire (Jésus)", qte:1, unite:"pièce (500g)", rayon:"Boucherie" },
    { nom:"Pâte à brioche", qte:1, unite:"pièce (500g)", rayon:"Boulangerie" },
    { nom:"Jaune d'œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre vapeur", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire le saucisson 30 min dans eau frémissante (pas bouillante).","Refroidir 10 min, peler la peau.","Enrouler dans la brioche étalée, dorer au jaune.","Four 35 min à 180°C, servir avec pdt vapeur."] },

{ id:"fr18", nom:"Pommes vapeur, beurre persillé & bavette grillée", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Bavette d'aloyau", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Pommes de terre vapeur (grenailles)", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre demi-sel", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil plat", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Pdt à la vapeur 20 min.","Beurre persillé : beurre + ail + persil hachés.","Bavette 2 min par face dans poêle très chaude, repos 5 min.","Trancher contre le grain, beurre persillé sur le tout."] },

{ id:"fr19", nom:"Choucroute garnie alsacienne", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:120, difficulte:2,
  ingredients:[
    { nom:"Choucroute crue", qte:1.5, unite:"kg", rayon:"Crèmerie" },
    { nom:"Lard fumé", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Saucisses de Strasbourg", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Saucisses fumées (Montbéliard)", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Palette demi-sel", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc Riesling", qte:50, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes de terre", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Baies de genièvre", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Saindoux ou graisse d'oie", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Sortir la choucroute crue, la rincer rapidement à l'eau froide (ôte l'excès d'acidité) et bien l'égoutter.","Dans une grande cocotte, faire fondre 80g de saindoux (ou graisse d'oie) à feu moyen.","Émincer 2 oignons, les suer 5 min jusqu'à translucides.","Disposer la moitié de la choucroute au fond. Déposer le lard fumé, la palette demi-sel et la moitié des baies de genièvre.","Recouvrir avec le reste de choucroute. Verser 50cl de vin blanc Riesling. Saler très légèrement (les viandes sont déjà salées).","Couvrir, cuire à feu doux 1h30 (ou four à 160°C, même temps).","Éplucher 8 pommes de terre, les ajouter sur le dessus de la choucroute 30 min avant la fin.","Pocher les saucisses fumées dans une casserole d'eau frémissante 12 min en parallèle (ne PAS bouillir, elles éclatent).","Cuire les saucisses de Strasbourg les 5 dernières minutes seulement.","Dresser : monticule de choucroute, viandes coupées en tranches, saucisses entières, pommes de terre. Moutarde forte à part."] },

{ id:"fr20", nom:"Baeckeoffe d'Alsace", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Agneau (épaule)", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Porc (échine)", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc Riesling", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mariner les 3 viandes dans le vin blanc + oignons + ail + bouquet 12h.","Pdt en rondelles, alterner avec viandes et marinade dans terrine.","Sceller le couvercle avec pâte de farine.","Four 3h à 160°C, ouvrir à table."] },

{ id:"fr21", nom:"Flammekueche (tarte flambée alsacienne)", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pâte à pain fine", qte:1, unite:"pièce (300g)", rayon:"Boulangerie" },
    { nom:"Fromage blanc", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche épaisse", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Oignon", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Lardons fumés", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Huile", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Étaler la pâte très finement sur plaque.","Mélanger fromage blanc + crème + sel + muscade, étaler.","Émincer oignons crus, disposer + lardons.","Four 12 min à 250°C, doré et croustillant."] },

{ id:"fr22", nom:"Coq au Riesling alsacien", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Poulet fermier en morceaux", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin blanc Riesling", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Spätzle ou nouilles fraîches", qte:500, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Dorer poulet, retirer.","Faire revenir lardons, échalotes, ajouter Riesling.","Remettre poulet, mijoter 50 min, ajouter champignons 15 min avant.","Crème en fin de cuisson, servir avec spätzle."] },

{ id:"fr23", nom:"Spätzle alsaciens au beurre", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Farine", qte:400, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:5, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Lait", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Pâte : farine, œufs, lait, sel, muscade, fouetter en lisse.","Faire tomber par tranches dans eau bouillante.","Égoutter dès qu'ils remontent.","Sauter au beurre noisette, fromage râpé."] },

{ id:"fr24", nom:"Bibeleskaes alsacien (fromage blanc-herbes)", mode:"both", type:"diner", saison:["printemps","été"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Fromage blanc", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ciboulette", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:1, unite:"gousse", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre en robe", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pdt en robe 30 min.","Égoutter fromage blanc + crème, ajouter herbes ciselées et échalote.","Sel, poivre, ail haché.","Servir pdt fendues avec le fromage frais dessus."] },

{ id:"fr25", nom:"Pâté lorrain en croûte", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:75, difficulte:3,
  ingredients:[
    { nom:"Échine de porc hachée", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Veau haché", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Pâte feuilletée", qte:2, unite:"rouleaux", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc d'Alsace", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Œuf (dorure)", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Quatre-épices", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner viandes + échalote + vin + épices 4h.","Étaler pâte sur plaque, garnir, refermer avec 2e pâte.","Dorer, faire cheminée d'évacuation.","Four 50 min à 180°C, servir chaud ou tiède."] },

{ id:"fr26", nom:"Carbonade flamande à la bière", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:150, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser", qte:1.2, unite:"kg", rayon:"Boucherie" },
    { nom:"Oignons", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bière brune (type Leffe)", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon de bœuf", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Cassonade", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Moutarde forte", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Tranches de pain d'épices", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Vinaigre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Frites maison", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir le bœuf, retirer.","Fondre oignons 20 min, déglacer bière, cassonade, vinaigre.","Remettre viande, pain d'épices moutardés sur le dessus, mijoter 2h30.","Servir avec frites."] },

{ id:"fr27", nom:"Galettes complètes bretonnes au sarrasin", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Farine de sarrasin", qte:300, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Eau", qte:60, unite:"cl", rayon:"Boissons" },
    { nom:"Sel", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre demi-sel", qte:50, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Dans un saladier, mélanger 300g de farine de sarrasin avec 1 c. à café de sel.","Ajouter 60cl d'eau froide en plusieurs fois, en fouettant énergiquement pour éviter les grumeaux.","Laisser reposer la pâte au frigo 1h MINIMUM (idéalement 2-3h pour une vraie texture).","Chauffer une grande poêle (idéalement crêpière) à feu moyen-fort. Beurrer avec 50g de beurre demi-sel à mesure.","Verser 1 louche de pâte au centre, étaler en mouvement circulaire avec le rateau (ou en inclinant la poêle).","Cuire 1-2 min : les bords se décollent et la pâte est sèche.","Casser 1 œuf au centre. Saler le blanc, ajouter 1 tranche de jambon repliée et 1 belle pincée d'emmental râpé tout autour.","Cuire 2-3 min : le blanc d'œuf doit prendre mais le jaune doit rester coulant.","Replier les 4 côtés de la galette vers le centre pour former un carré.","Faire glisser sur une assiette chaude. Servir aussitôt avec une salade verte. Renouveler pour les autres."] },

{ id:"fr28", nom:"Cotriade bretonne (soupe de poisson)", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Poissons variés (maquereau, congre, julienne)", qte:1.2, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Poireaux", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Thym & laurier", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre de cidre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain de campagne", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Suer poireaux, oignons, carottes au beurre.","Ajouter pdt + eau + bouquet, cuire 15 min.","Poissons en tronçons 10 min de plus.","Servir bouillon et croûtons d'abord, poissons et légumes ensuite."] },

{ id:"fr29", nom:"Coquilles Saint-Jacques à la bretonne", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Noix de Saint-Jacques", qte:18, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Crème fraîche épaisse", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre demi-sel", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Cidre brut", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Échalotes hachées au beurre, déglacer cidre puis vin.","Réduire de moitié, ajouter crème, mijoter 5 min.","Snacker les noix 1 min par face dans beurre noisette.","Dresser avec sauce et pdt, ciboulette."] },

{ id:"fr30", nom:"Poulet vallée d'Auge au camembert", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Cuisses de poulet", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Camembert", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Cidre brut", qte:50, unite:"cl", rayon:"Boissons" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pommes à cuire", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Saler et poivrer 6 cuisses de poulet.","Dans une grande cocotte, chauffer 40g de beurre à feu moyen-vif. Y dorer les cuisses 5 min de chaque côté. Réserver.","Dans la cocotte, suer 2 échalotes ciselées 3 min.","Flamber au calvados : verser 5cl de calvados, attention aux flammes, laisser brûler.","Déglacer avec 50cl de cidre brut, gratter le fond.","Remettre les cuisses, couvrir, mijoter 25 min à feu doux.","Pendant ce temps, éplucher et couper 4 pommes à cuire en quartiers.","Les ajouter à la cocotte 10 min avant la fin, qu'elles confisent dans le jus.","Couper le camembert ENTIER en dés. Hors feu, l'ajouter avec 25cl de crème fraîche. Mélanger jusqu'à ce que le camembert fonde en sauce onctueuse.","Servir avec du riz blanc ou des tagliatelles."] },

{ id:"fr31", nom:"Sole meunière aux pommes vapeur", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:2,
  ingredients:[
    { nom:"Soles parées", qte:4, unite:"pièces (300g)", rayon:"Poissonnerie" },
    { nom:"Farine", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Beurre demi-sel", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire pdt vapeur.","Fariner les soles, secouer l'excédent.","Cuire 4 min par face dans beurre mousseux.","Beurre noisette + citron + persil, napper le poisson."] },

{ id:"fr32", nom:"Marmite dieppoise (poissons cidre & crème)", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Filets de poissons blancs assortis", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Crevettes décortiquées", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Moules", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Cidre brut", qte:50, unite:"cl", rayon:"Boissons" },
    { nom:"Crème fraîche", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Poireaux", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Suer poireaux, carottes, échalotes au beurre.","Ajouter cidre, réduire de moitié.","Pocher poissons 5 min, crevettes 2 min, moules ouvertes à part puis ajoutées.","Crème, lier, rectifier."] },

{ id:"fr33", nom:"Tripes à la mode de Caen", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:300, difficulte:3,
  ingredients:[
    { nom:"Tripes nettoyées", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Pieds de veau", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Oignons", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Calvados", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Cidre brut", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper tripes en lanières, blanchir 15 min.","Couches dans cocotte : oignons, carottes, tripes, pieds, bouquet, calva, cidre.","Sceller avec pâte, cuire 5h à 150°C.","Servir bouillonnant avec pdt vapeur."] },

{ id:"fr34", nom:"Camembert rôti au four & pain", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Camembert fermier", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Calvados (option)", qte:3, unite:"c. à soupe", rayon:"Boissons" },
    { nom:"Pain de campagne", qte:1, unite:"pièce", rayon:"Boulangerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Inciser le dessus du camembert en croisillons.","Glisser ail et romarin, arroser miel + calva.","Four 15 min à 200°C, fondant.","Tremper le pain et la salade dedans."] },

{ id:"fr35", nom:"Œufs en meurette bourguignons", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:35, difficulte:2,
  ingredients:[
    { nom:"Œufs frais", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Vin rouge corsé", qte:50, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:1, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sauce meurette : lardons + oignons + champignons, fariner, déglacer vin, réduire 15 min.","Pocher les œufs dans eau vinaigrée 3 min.","Toaster pain, frotter à l'ail.","Dresser œuf sur croûton, napper de meurette."] },

{ id:"fr36", nom:"Coq au vin de Bourgogne", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:120, difficulte:2,
  ingredients:[
    { nom:"Poulet fermier en morceaux", qte:1.6, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge de Bourgogne", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons grelots", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Farine", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" }
  ],
  etapes:["Mariner poulet + vin + légumes 12h.","Faire dorer poulet, lardons, légumes, fariner.","Flamber cognac, déglacer vin de la marinade, mijoter 1h30.","Champignons en fin, servir avec pommes vapeur."] },

{ id:"fr37", nom:"Gougères bourguignonnes au gruyère", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Eau", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:150, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Jambon de Bayonne", qte:200, unite:"g", rayon:"Boucherie" }
  ],
  etapes:["Pâte à choux : eau + beurre + sel, farine d'un coup, dessécher.","Hors feu : œufs un à un + gruyère + muscade.","Former tas à la douille sur plaque, four 25 min à 180°C.","Servir avec salade et jambon."] },

{ id:"fr38", nom:"Bœuf bourguignon classique pour 6", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:210, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser (paleron, gîte)", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge de Bourgogne", qte:1, unite:"litre", rayon:"Boissons" },
    { nom:"Lardons fumés", qte:250, unite:"g", rayon:"Boucherie" },
    { nom:"Petits oignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Champignons de Paris", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Farine", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Cognac", qte:8, unite:"cl", rayon:"Boissons" },
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner viande au vin 12h avec carottes et oignons.","Égoutter, sécher, fariner et dorer.","Flamber cognac, ajouter marinade + lardons + bouquet, mijoter 3h.","Champignons + petits oignons glacés ajoutés, servir avec tagliatelles."] },

{ id:"fr39", nom:"Lentilles vertes du Puy aux saucisses", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Lentilles vertes du Puy", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Saucisses de Montbéliard", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Clous de girofle", qte:3, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les lentilles à l'eau avec oignon piqué de girofle, carottes, bouquet, 25 min.","Pocher saucisses 20 min à l'eau frémissante.","Lardons sautés à part.","Mélanger lentilles + lardons + jus, trancher saucisses sur le dessus."] },

{ id:"fr40", nom:"Aligot auvergnat (purée à la tomme)", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre Bintje", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Tomme fraîche de l'Aubrac", qte:600, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Saucisses fumées d'Auvergne", qte:6, unite:"pièces", rayon:"Boucherie" }
  ],
  etapes:["Cuire pdt, écraser en purée lisse.","Tomme en lamelles, ajouter à la purée chaude sur feu doux.","Travailler à la spatule longuement pour filer (5-8 min).","Ail, crème, beurre. Servir avec saucisses grillées."] },

{ id:"fr41", nom:"Truffade auvergnate (tomme & pommes de terre)", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:45, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Tomme fraîche d'Aubrac", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Pdt en dés, sauter à l'huile 20 min.","Ajouter lardons, ail, dorer.","Tomme en lamelles, fondre dans les pdt en remuant.","Persil ciselé, servir directement de la poêle."] },

{ id:"fr42", nom:"Cassoulet de Castelnaudary", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Haricots blancs lingots", qte:600, unite:"g", rayon:"Épicerie salée" },
    { nom:"Cuisses de canard confit", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Saucisses de Toulouse", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Échine de porc", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Couenne de porc", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Concentré de tomate", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Chapelure", qte:80, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Tremper haricots 12h. Cuire à l'eau aromatique 1h.","Faire revenir viandes séparément.","Monter le cassoulet : couches haricots/viandes dans la cassole.","Four 1h30 à 160°C, casser la croûte 4-5 fois, terminer doré."] },

{ id:"fr43", nom:"Confit de canard, pommes sarladaises", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Cuisses de canard confites", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre Bintje", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Graisse de canard", qte:4, unite:"c. à soupe", rayon:"Crèmerie" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt en dés, sauter à la graisse de canard 25 min.","Confit côté peau dans poêle 10 min, retourner 5 min.","Persillade ail-persil sur les pdt en fin.","Servir avec salade en vinaigrette."] },

{ id:"fr44", nom:"Magret de canard miel-vinaigre balsamique", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Magrets de canard", qte:3, unite:"pièces", rayon:"Boucherie" },
    { nom:"Miel de châtaignier", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes grenailles", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Quadriller la peau des magrets.","Pdt au four 30 min à 200°C avec huile et romarin.","Magret côté peau 8 min, retourner 3 min.","Déglacer miel + balsamique, glacer les magrets, trancher."] },

{ id:"fr45", nom:"Salade landaise (gésiers chauds, magret fumé)", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Mesclun + frisée", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Gésiers confits", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Magret de canard fumé", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Foies de volaille", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pignons de pin", qte:40, unite:"g", rayon:"Épicerie salée" },
    { nom:"Huile de noix", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre de Xérès", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Réchauffer gésiers à la poêle.","Poêler foies 2 min par face.","Vinaigrette huile de noix + Xérès.","Dresser salade, viandes, tomates, pignons."] },

{ id:"fr46", nom:"Pâté de pommes de terre du Berry", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:75, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pâte feuilletée", qte:2, unite:"rouleaux", rayon:"Crèmerie" },
    { nom:"Crème fraîche épaisse", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Trancher pdt fines, mélanger avec oignons revenus, persil, sel.","Foncer le moule de pâte, garnir, refermer.","Dorer, faire cheminée, four 50 min à 180°C.","À la sortie : verser crème + œufs battus par la cheminée."] },

{ id:"fr47", nom:"Garbure du Sud-Ouest (soupe potée)", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:120, difficulte:2,
  ingredients:[
    { nom:"Confit de canard", qte:2, unite:"cuisses", rayon:"Boucherie" },
    { nom:"Jambon de Bayonne couenné", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Chou vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Haricots blancs cuits", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Poireau", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Navets", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire jambon + bouquet dans 3L d'eau 30 min.","Légumes en gros morceaux, ajouter et cuire 40 min.","Confit + haricots 20 min de plus.","Servir bouillon avec croûtons, viandes et légumes à côté."] },

{ id:"fr48", nom:"Piperade basque aux œufs", mode:"kids", type:"diner", saison:["été","printemps","automne"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Poivrons rouges et verts", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:5, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon de Bayonne", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Piment d'Espelette", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Suer oignons, ajouter poivrons en lanières 15 min.","Tomates concassées, ail, espelette, mijoter 15 min.","Brouiller les œufs dans la piperade hors feu.","Servir avec jambon de Bayonne grillé."] },

{ id:"fr49", nom:"Poulet basquaise", mode:"both", type:"diner", saison:["été","automne","printemps"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Cuisses de poulet", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Poivrons rouges et verts", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Jambon de Bayonne", qte:100, unite:"g", rayon:"Boucherie" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Piment d'Espelette", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Riz long", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Dorer poulet, retirer.","Suer poivrons + oignons + ail + jambon, ajouter tomates.","Remettre poulet, vin blanc, espelette, mijoter 35 min.","Servir avec riz pilaf."] },

{ id:"fr50", nom:"Axoa de veau basque", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:75, difficulte:1,
  ingredients:[
    { nom:"Épaule de veau hachée gros", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Poivrons doux verts", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Piment d'Espelette", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Bouillon de volaille", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre vapeur", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir le veau, retirer.","Suer poivrons + oignons + ail 15 min.","Remettre viande, vin, bouillon, espelette, mijoter 45 min.","Servir avec pdt vapeur."] },

{ id:"fr51", nom:"Marmitako basque (thon-pommes de terre)", mode:"us", type:"diner", saison:["été","automne"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Thon frais", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Poivrons rouges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Vin blanc", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Piment d'Espelette", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Fumet de poisson", qte:50, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Suer oignons, poivrons, ail.","Pdt cassées (pas coupées) + tomates + vin + fumet + espelette, 25 min.","Thon en dés ajouté 5 min en fin.","Servir en assiette creuse."] },

{ id:"fr52", nom:"Chipirons à l'encre & riz noir", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:50, difficulte:3,
  ingredients:[
    { nom:"Petites seiches (chipirons)", qte:1, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Encre de seiche", qte:3, unite:"sachets", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivrons verts", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Piment d'Espelette", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Riz long", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Nettoyer les chipirons, garder corps.","Suer oignons + poivrons + ail, tomates concassées.","Chipirons + vin + encre, mijoter 25 min.","Servir sur riz pilaf, espelette."] },

{ id:"fr53", nom:"Pot-au-feu de bœuf traditionnel", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:240, difficulte:1,
  ingredients:[
    { nom:"Plat de côte", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Paleron", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Os à moelle", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Carottes", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poireaux", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Navets", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Céleri-rave", qte:0.5, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Oignon piqué de clous de girofle", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cornichons & moutarde", qte:1, unite:"lot", rayon:"Épicerie salée" }
  ],
  etapes:["Couvrir viandes d'eau froide, écumer puis ajouter bouquet et oignon, 2h30.","Légumes ajoutés progressivement (carottes 1h, poireaux 30 min, etc.).","Os à moelle 15 min avant fin.","Servir avec gros sel, cornichons, moutarde."] },

{ id:"fr54", nom:"Steak au poivre & frites maison", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Entrecôtes ou pavés", qte:4, unite:"pièces (200g)", rayon:"Boucherie" },
    { nom:"Poivre concassé", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon de bœuf", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre Bintje", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Frites en 2 bains : 150°C puis 180°C.","Enrober viandes de poivre, cuire 2 min par face.","Flamber cognac, déglacer bouillon, crème.","Servir avec frites bien chaudes."] },

{ id:"fr55", nom:"Soufflé au fromage classique", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:45, difficulte:3,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:50, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Comté râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Béchamel épaisse au beurre + farine + lait.","Hors feu : jaunes + fromages + muscade.","Blancs montés fermes, incorporer délicatement.","Moule beurré, four 30 min à 200°C sans ouvrir."] },

{ id:"fr56", nom:"Œufs cocotte aux truffes (ou champignons)", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:2,
  ingredients:[
    { nom:"Œufs extra-frais", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème fraîche épaisse", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Brisures de truffe (ou champignons sautés)", qte:30, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan râpé", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" }
  ],
  etapes:["Beurrer ramequins, sel et poivre au fond.","Crème + truffe au fond, casser un œuf dessus.","Parmesan, bain-marie au four 10 min à 180°C.","Servir avec mouillettes de pain grillé."] },

{ id:"fr57", nom:"Boudin noir aux pommes & purée", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Boudin noir", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Pommes Reinette", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" }
  ],
  etapes:["Purée traditionnelle.","Pommes en quartiers, sauter au beurre 10 min, flamber au calvados.","Cuire boudin 5 min par face à la poêle.","Servir boudin sur pommes, purée à côté."] },

{ id:"fr58", nom:"Vol-au-vent à la financière", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:50, difficulte:2,
  ingredients:[
    { nom:"Bouchées à la reine (vide-vol-au-vent)", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blanc de poulet", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Quenelles de veau", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Champignons de Paris", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon", qte:30, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Pocher poulet en dés.","Sauce blonde au beurre + farine + bouillon + vin + crème.","Ajouter poulet, quenelles, champignons sautés.","Garnir les bouchées tiédies au four, servir aussitôt."] },

{ id:"fr59", nom:"Crêpes salées complètes à la française", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Farine de froment", qte:300, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:60, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Beurre fondu", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Champignons", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pâte à crêpes : farine, œufs, lait, sel, beurre.","Cuire crêpes 1 min par face.","Garnir de jambon + champignons + fromage.","Plier et passer 2 min au four."] },

{ id:"fr60", nom:"Pintade rôtie aux marrons", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Pintade fermière", qte:1, unite:"pièce (1.5kg)", rayon:"Boucherie" },
    { nom:"Marrons en conserve", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc moelleux", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Thym", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:20, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Beurrer la pintade, four 200°C, 1h en arrosant.","Lardons + échalotes + marrons sautés ensemble.","Déglacer vin blanc, bouillon, mijoter 15 min.","Servir pintade découpée sur marrons."] },

{ id:"bi01", nom:"Œuf parfait, mousseline d'asperges", mode:"us", type:"diner", saison:["printemps"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Œufs extra-frais", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Asperges vertes", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème liquide", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cerfeuil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mettre 6 œufs dans un bain-marie thermostaté à 63°C. Cuire 45 min EXACTEMENT.","Pendant ce temps, écraser 600g d'asperges blanches préalablement épluchées et cuites 12 min vapeur.","Mixer en mousseline avec 100g de crème + 80g de beurre. Saler, poivrer. Passer au chinois pour finesse.","Sortir les œufs du bain-marie. Casser délicatement chacun dans une cuillère, glisser le contenu (blanc nacré + jaune coulant) sur la mousseline.","Râper le zeste d'1 citron. Effeuiller le cerfeuil.","Dresser : mousseline + œuf parfait + cerfeuil + zeste. Fleur de sel. Servir aussitôt."] },

{ id:"bi02", nom:"Velouté de petits pois à la menthe", mode:"us", type:"diner", saison:["printemps","été"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Petits pois frais ou surgelés", qte:800, unite:"g", rayon:"Surgelés" },
    { nom:"Menthe fraîche", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:80, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème liquide", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile de menthe (option)", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 échalote, suer 2 min dans 30g de beurre.","Ajouter 800g de petits pois (frais ou surgelés) + 80cl de bouillon de volaille. Cuire 10 min.","Effeuiller la menthe, en garder quelques feuilles entières pour la déco.","Mixer le velouté avec la menthe, passer au chinois fin (très important pour le velouté lisse).","Ajouter 20cl de crème, rectifier sel et poivre.","Servir avec filet d'huile de menthe + feuilles entières."] },

{ id:"bi03", nom:"Velouté de potimarron au foie gras", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Potimarron", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Foie gras mi-cuit", qte:120, unite:"g", rayon:"Boucherie" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Crème liquide", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Châtaignes cuites", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Éplucher 1,2kg de potimarron, le couper en cubes. Émincer 2 échalotes.","Suer les échalotes dans 30g de beurre. Ajouter le potimarron, cuire 5 min.","Couvrir d'1L de bouillon de volaille. Mijoter 20 min.","Mixer fin au mixeur plongeant. Ajouter 20cl de crème. Rectifier.","Couper 120g de foie gras mi-cuit en petits dés. Les répartir au fond des bols.","Verser le velouté brûlant dessus.","Concasser 100g de châtaignes cuites, parsemer. Tuile de pain grillé."] },

{ id:"bi04", nom:"Soupe à l'oignon gratinée", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:75, difficulte:1,
  ingredients:[
    { nom:"Oignons jaunes", qte:1.5, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Vin blanc sec", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon de bœuf", qte:1.5, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Comté ou Gruyère râpé", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain de campagne rassis", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Thym", qte:2, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 1,5kg d'oignons jaunes en rondelles fines.","Dans une grande cocotte, faire fondre 80g de beurre à feu doux.","Caraméliser les oignons 40 min en remuant régulièrement : ils doivent devenir bruns dorés (pas brûlés).","Déglacer avec 20cl de vin blanc, laisser évaporer 2 min.","Verser 1,5L de bouillon de bœuf chaud + thym. Mijoter 20 min.","Toaster 8 tranches de pain de campagne.","Verser la soupe dans des bols allant au four. Poser croûton, parsemer 300g de comté râpé.","Gratiner 8 min sous le grill jusqu'à coulant et doré. Servir BRÛLANT."] },

{ id:"bi05", nom:"Tartare de bœuf au couteau, condiments", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Filet de bœuf coupé au couteau", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Cornichons", qte:8, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Moutarde de Dijon", qte:3, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Sauce Worcestershire", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Jaunes d'œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Persil plat", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Frites maison", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Hacher 3 échalotes très finement (au couteau, pas au robot).","Hacher 8 cornichons et 3 c. à soupe de câpres égouttés.","Hacher 600g de filet de bœuf au couteau en très petits dés (pas au robot qui le hâche en pâte).","Dans un saladier, mélanger viande + échalotes + cornichons + câpres + 3 c. à café de moutarde + 1 c. à café de Worcestershire + 2 jaunes d'œufs.","Saler, poivrer, ajuster.","Préparer les frites maison : couper 1kg de pdt en bâtonnets, frire 2 bains.","Dresser le tartare au cercle dans des assiettes froides. Servir avec frites + persil."] },

{ id:"bi06", nom:"Carpaccio de bœuf, parmesan & roquette", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:15, difficulte:1,
  ingredients:[
    { nom:"Filet de bœuf", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Parmesan en bloc", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Roquette", qte:150, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pignons de pin", qte:40, unite:"g", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Mettre 400g de filet de bœuf au congélateur 1h (plus facile à trancher fin).","Trancher en lamelles très fines au couteau bien aiguisé.","Disposer en rosace dans des assiettes froides.","Saupoudrer fleur de sel + tour de poivre généreux.","Couvrir d'une chiffonnade de roquette.","Faire des copeaux de 100g de parmesan à l'économe.","Torréfier 40g de pignons à sec 2 min.","Arroser de 8 c. à soupe d'huile d'olive vierge + jus d'1 citron. Servir aussitôt."] },

{ id:"bi07", nom:"Tartare de saint-jacques aux agrumes", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:20, difficulte:2,
  ingredients:[
    { nom:"Noix de Saint-Jacques", qte:16, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Pamplemousse rose", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Orange", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Trancher 16 Saint-Jacques en lamelles fines.","Suprêmer 1 pamplemousse rose et 1 orange : peler à vif, sortir les segments.","Couper les suprêmes en petits dés en gardant le jus.","Mariner les Saint-Jacques 10 min dans jus de citron vert + 4 c. à soupe d'huile d'olive + sel.","Mélanger délicatement avec les dés d'agrumes.","Dresser au cercle dans assiettes froides.","Ciboulette ciselée + zeste de citron vert + fleur de sel. Servir aussitôt."] },

{ id:"bi08", nom:"Foie gras poêlé, figues rôties", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:20, difficulte:2,
  ingredients:[
    { nom:"Escalopes de foie gras frais", qte:4, unite:"pièces (80g)", rayon:"Boucherie" },
    { nom:"Figues fraîches", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain d'épices", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 8 figues fraîches en deux. Arroser de miel + balsamique, enfourner 8 min.","Toaster 4 tranches de pain d'épices.","Saler les 4 escalopes de foie gras juste avant cuisson.","Dans une poêle BIEN CHAUDE et SÈCHE, saisir le foie gras 1 min par face (il rend son gras, c'est normal).","Verser le gras (le garder pour autre chose).","Dresser : pain d'épices + foie gras + 2 demi-figues caramélisées. Fleur de sel."] },

{ id:"bi09", nom:"Joue de bœuf braisée au vin rouge", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:240, difficulte:2,
  ingredients:[
    { nom:"Joues de bœuf", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge corsé", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Céleri", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Concentré de tomate", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre rattes", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper 1,5kg de joues de bœuf en gros cubes. Saler, poivrer.","Dans une cocotte, dorer 200g de lardons 5 min, réserver. Saisir la viande dans le gras 5 min, retirer.","Émincer 3 oignons, couper 4 carottes en rondelles, 2 branches de céleri en dés (mirepoix).","Suer la mirepoix 8 min dans la cocotte. Ajouter 2 c. à soupe de concentré de tomate.","Remettre viande + lardons. Verser 75cl de vin rouge + bouquet garni.","Mijoter 3h30 au four 150°C ou feu très doux.","Cuire 1kg de rattes vapeur en fin.","Servir : joues fondantes + sauce réduite + rattes."] },

{ id:"bi10", nom:"Souris d'agneau confite, légumes glacés", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:240, difficulte:2,
  ingredients:[
    { nom:"Souris d'agneau", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Ail", qte:1, unite:"tête", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc moelleux", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Carottes nouvelles", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Navets nouveaux", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre grenailles", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Romarin", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 150°C.","Saler-poivrer 6 souris d'agneau, les saisir 5 min toutes faces dans une cocotte.","Ajouter 1 tête d'ail entière en chemise, 30cl de vin blanc moelleux, 50cl de bouillon, romarin.","Couvrir, enfourner 3h. La viande doit tomber de l'os.","Pendant ce temps, glacer 8 carottes nouvelles + 6 navets : eau + beurre + sucre + sel à couvert puis à découvert pour caraméliser.","Cuire 600g de grenailles 30 min au four ou vapeur.","En fin, écumer le jus, réduire en sauce.","Dresser : souris + légumes + sauce."] },

{ id:"bi11", nom:"Lapin à la moutarde et pâtes fraîches", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:75, difficulte:2,
  ingredients:[
    { nom:"Lapin en morceaux", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Moutarde à l'ancienne", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde forte", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème fraîche épaisse", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc sec", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Tagliatelles fraîches", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Badigeonner 1,5kg de lapin en morceaux avec 6 c. à soupe de moutarde (à l'ancienne + forte).","Saisir 5 min toutes faces dans une cocotte avec 2 c. à soupe d'huile.","Émincer 4 échalotes, suer 3 min.","Déglacer 20cl de vin blanc sec, gratter le fond.","Ajouter thym, mijoter 50 min couvert à feu doux.","Hors feu, ajouter 30cl de crème + 2 c. à soupe de moutarde restante. Bien mélanger.","Cuire 500g de tagliatelles fraîches 3 min.","Servir : lapin + sauce moutardée + tagliatelles + 40g de beurre."] },

{ id:"bi12", nom:"Suprême de volaille au vin jaune et morilles", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:60, difficulte:3,
  ingredients:[
    { nom:"Suprêmes de poulet", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Morilles séchées", qte:60, unite:"g", rayon:"Épicerie salée" },
    { nom:"Vin jaune du Jura", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Crème fraîche épaisse", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Riz long grain", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Réhydrater 60g de morilles séchées 30 min dans eau tiède. Filtrer le jus.","Cuire 300g de riz pilaf 18 min.","Saisir 4 suprêmes de poulet 4 min côté peau + 2 min côté chair dans 40g de beurre. Réserver au chaud.","Dans la poêle, suer 1 échalote.","Ajouter morilles + jus filtré + 20cl de vin jaune. Réduire de moitié.","Ajouter 30cl de crème, mijoter 5 min.","Remettre les suprêmes 3 min pour terminer.","Servir : riz + suprême + sauce morilles."] },

{ id:"bi13", nom:"Risotto aux champignons sauvages & parmesan", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Riz Carnaroli", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Champignons mélangés (cèpes, girolles, shiitake)", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Parmesan affiné", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sauter séparément 400g de champignons mélangés au beurre 5 min. Saler. Réserver.","Émincer 2 échalotes, suer dans 30g de beurre.","Ajouter 300g de riz Carnaroli, nacrer 2 min.","Déglacer 15cl de vin blanc.","Verser 1L de bouillon de volaille louche par louche, en remuant.","Cuire 18 min en remuant souvent.","Mantecare hors feu : 80g de beurre + 120g de parmesan.","Incorporer les champignons. Persil ciselé. Servir aussitôt."] },

{ id:"bi14", nom:"Cabillaud confit à l'huile, fenouil rôti", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Dos de cabillaud", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Huile d'olive vierge", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Fenouil", qte:2, unite:"bulbes", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 2 bulbes de fenouil en quartiers. Rôtir 25 min avec huile + sel.","Verser 40cl d'huile d'olive dans une petite cocotte. Chauffer à 60°C (thermomètre).","Plonger 800g de cabillaud, ajouter 4 gousses d'ail. Confire 12 min : le poisson reste nacré.","Sortir délicatement à l'écumoire.","Effeuiller l'aneth.","Dresser sur le fenouil, jus de citron + aneth + fleur de sel."] },

{ id:"bi15", nom:"Filet de bar au beurre nantais", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Filets de bar avec peau", qte:4, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre blanc", qte:5, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Vin blanc Muscadet", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre demi-sel froid", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème liquide", qte:5, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pommes de terre vapeur", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 1kg de pdt vapeur 20 min.","Réduction beurre blanc : ciseler 4 échalotes, réduire à sec dans 5cl de vinaigre + 10cl de Muscadet (presque évaporé).","Ajouter 5cl de crème. Hors feu, monter au fouet avec 200g de beurre demi-sel froid coupé en parcelles. Saler.","Cuire les 4 filets de bar côté peau 4 min, retourner 1 min.","Servir : bar + pdt + beurre nantais nappé."] },

{ id:"bi16", nom:"Tournedos Rossini", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:25, difficulte:3,
  ingredients:[
    { nom:"Tournedos de filet de bœuf", qte:4, unite:"pièces (180g)", rayon:"Boucherie" },
    { nom:"Foie gras frais", qte:4, unite:"escalopes (60g)", rayon:"Boucherie" },
    { nom:"Truffe noire", qte:20, unite:"g", rayon:"Épicerie salée" },
    { nom:"Madère", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Fond de veau", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pain de mie", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Toaster 4 tranches de pain de mie dans 40g de beurre dans une poêle.","Saisir 4 tournedos 2 min par face dans une poêle bien chaude. Repos.","Saler les 4 escalopes de foie gras, saisir 1 min par face à sec. Réserver.","Dans la poêle de saisie, déglacer 10cl de Madère, ajouter 15cl de fond de veau. Réduire.","Dresser : croûton + tournedos + foie gras + lamelles de truffe + sauce nappée."] },

{ id:"bi17", nom:"Pavé de saumon mi-cuit, écrasé de pommes de terre", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Pavés de saumon avec peau", qte:4, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Pommes de terre rattes", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive vierge", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Cuire 800g de rattes vapeur 20 min.","Écraser à la fourchette avec 8 c. à soupe d'huile d'olive + fleur de sel.","Saler les 4 pavés de saumon. Cuire côté peau 5 min dans une poêle peu beurrée, retourner 1 min (cœur mi-cuit).","Faire fondre 40g de beurre jusqu'à noisette. Hors feu, citron + aneth.","Dresser : écrasé + saumon + beurre noisette."] },

{ id:"bi18", nom:"Magret de canard sauce à l'orange", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Magrets de canard", qte:3, unite:"pièces", rayon:"Boucherie" },
    { nom:"Oranges", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Grand Marnier", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Sucre", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre de Xérès", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fond de veau", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes Anna ou rattes", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Cuire 1kg de rattes 30 min au four.","Quadriller la peau des 3 magrets. Saisir côté peau 7 min dans poêle froide à feu moyen, retourner 4 min. Repos.","Dans la poêle, réduction : zeste + jus de 3 oranges + 5cl de Grand Marnier + 3 c. à soupe de sucre + 3 c. à soupe de vinaigre Xérès.","Ajouter 15cl de fond de veau. Réduire 5 min, monter au beurre.","Trancher magrets. Servir : magret + sauce + rattes + suprêmes d'orange."] },

{ id:"bi19", nom:"Côte de veau, sauce au cidre & pommes", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Côtes de veau épaisses", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Cidre brut", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes Boskoop", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Polenta crémeuse", qte:200, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C. Pommes Anna : 1kg de pdt en rondelles fines, moule beurré, couches concentriques. 40 min au four.","Cuire 4 côtes de veau épaisses 4 min par face dans 30g de beurre. Repos sous alu.","Suer 3 échalotes ciselées dans la même poêle.","Ajouter 4 pommes Boskoop en quartiers, sauter 5 min.","Flamber 5cl de calvados.","Ajouter 30cl de cidre, réduire de moitié.","Ajouter 20cl de crème, mijoter 2 min.","Dresser : côte + pommes + sauce + Anna."] },

{ id:"bi20", nom:"Aile de raie aux câpres, beurre noisette", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Ailes de raie", qte:4, unite:"pièces (250g)", rayon:"Poissonnerie" },
    { nom:"Beurre demi-sel", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Câpres", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur 20 min.","Pocher 4 ailes de raie dans court-bouillon 8 min : eau + 1 oignon piqué + bouquet + sel.","Faire fondre 120g de beurre jusqu'à coloration noisette.","Hors feu, ajouter 4 c. à soupe de câpres + jus d'1 citron.","Dresser : raie + napper de beurre + persil + pdt."] },

{ id:"bi21", nom:"Carré d'agneau en croûte d'herbes", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Carrés d'agneau parés", qte:2, unite:"pièces (8 côtes)", rayon:"Boucherie" },
    { nom:"Mie de pain", qte:100, unite:"g", rayon:"Boulangerie" },
    { nom:"Persil + thym + romarin", qte:1, unite:"gros bouquet", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde forte", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes de terre nouvelles", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C. Cuire 800g de pommes nouvelles 25 min : huile + sel.","Mixer 100g de mie + 1 botte d'herbes (persil + thym + romarin) + 4 gousses d'ail + 80g de beurre en pommade verte.","Saisir les 2 carrés d'agneau parés 3 min toutes faces.","Badigeonner 2 c. à soupe de moutarde, appliquer la croûte en pressant.","Enfourner 12 min (rosé). Repos 5 min.","Couper en côtelettes. Servir avec pommes."] },

{ id:"bi22", nom:"Filet mignon en croûte de noisettes", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:45, difficulte:2,
  ingredients:[
    { nom:"Filets mignons de porc", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Noisettes torréfiées", qte:100, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Mie de pain", qte:80, unite:"g", rayon:"Boulangerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pommes Anna", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 1kg de pommes Anna au four 40 min : pdt fines en rondelles, beurre, sel.","Saisir 2 filets mignons toutes faces dans 30g de beurre. Badigeonner moutarde.","Mixer 100g de noisettes torréfiées + 80g de mie en croûte. Appliquer sur viande.","Enfourner 18 min à 200°C. Repos 5 min.","Suer 2 échalotes + jus de cuisson + 15cl de crème en sauce.","Trancher viande, servir avec Anna + sauce."] },

{ id:"bi23", nom:"Ravioles du Dauphiné à la crème de tomate confite", mode:"us", type:"diner", saison:["été","printemps","automne"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Ravioles du Dauphiné fraîches", qte:600, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates cerises confites", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Crème liquide", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:1, unite:"gousse", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Mixer 200g de tomates confites + 1 gousse d'ail + 25cl de crème en sauce lisse.","Chauffer dans une casserole.","Pocher 600g de ravioles 2 min dans eau frémissante salée.","Égoutter délicatement à l'écumoire.","Mélanger avec la sauce.","Parsemer 60g de parmesan + basilic ciselé + filet d'huile d'olive."] },

{ id:"bi24", nom:"Risotto au safran & gambas", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Riz Carnaroli", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Gambas", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Bouillon de volaille", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Décortiquer 12 gambas en gardant les têtes. Faire revenir les têtes 3 min, verser 1L de bouillon, mijoter 10 min, filtrer.","Infuser une dose de safran dans le bouillon chaud.","Émincer 1 échalote, suer dans 30g de beurre.","Ajouter 300g de riz Carnaroli, nacrer 2 min.","Déglacer 15cl de vin blanc.","Verser bouillon louche par louche en remuant, 18 min.","Snacker les gambas 1 min par face dans 30g de beurre.","Mantecare le risotto : beurre + parmesan. Dresser, gambas dessus."] },

{ id:"bi25", nom:"Caillette ardéchoise & salade", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:75, difficulte:3,
  ingredients:[
    { nom:"Chair à saucisse", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Foies de volaille", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Blettes (vertes)", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crépine de porc", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Effeuiller et hacher 600g de blettes (vertes uniquement).","Sauter 4 gousses d'ail hachées dans 2 c. à soupe d'huile.","Mélanger 500g de chair à saucisse + 200g de foies de volaille hachés + blettes + 1 œuf + sel.","Étendre la crépine, former 12 boulettes, envelopper chacune.","Disposer dans plat à gratin, four 45 min à 180°C.","Servir avec salade verte."] },

{ id:"bi26", nom:"Vichyssoise (soupe froide poireaux-pdt)", mode:"us", type:"diner", saison:["été","printemps"], culture:"bistronomie", temps:40, difficulte:1,
  ingredients:[
    { nom:"Poireaux (blancs)", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:80, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème fraîche épaisse", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 6 blancs de poireaux. Éplucher 500g de pdt en cubes.","Dans une casserole, suer poireaux dans 40g de beurre 5 min.","Ajouter pdt + 80cl de bouillon. Mijoter 20 min.","Mixer fin, passer au chinois.","Ajouter 30cl de crème, rectifier.","Refroidir, servir BIEN FROID avec ciboulette ciselée."] },

{ id:"bi27", nom:"Tatin d'endives au comté", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:50, difficulte:1,
  ingredients:[
    { nom:"Endives", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Comté affiné", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Jambon de Bayonne", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Mâche", qte:150, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 8 endives en deux. Dans un moule beurré, fondre 60g de beurre + 3 c. à soupe de sucre.","Caraméliser les endives côté coupe 15 min sur le feu.","Trancher 200g de comté en lamelles. Disposer sur les endives.","Recouvrir de pâte feuilletée, rentrer les bords.","Enfourner 25 min jusqu'à pâte dorée.","Retourner sur un plat. Servir avec jambon de Bayonne + mâche."] },

{ id:"bi28", nom:"Quiche aux poireaux & saumon", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:55, difficulte:1,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Poireaux", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Saumon frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Lait", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 180°C.","Foncer un moule de pâte brisée, piquer.","Émincer 4 poireaux. Fondre dans 40g de beurre 15 min jusqu'à compote.","Couper 400g de saumon en cubes crus.","Battre 4 œufs + 25cl de crème + 15cl de lait + aneth.","Étaler poireaux + saumon, verser appareil.","Enfourner 40 min. Servir tiède."] },

{ id:"bi29", nom:"Brochette de Saint-Jacques à la plancha", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Noix de Saint-Jacques", qte:16, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Lard fumé", qte:8, unite:"tranches fines", rayon:"Boucherie" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Riz à risotto crémeux", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bouillon", qte:80, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Risotto blanc en parallèle : suer 1 échalote, nacrer 300g de riz, vin blanc, bouillon louche par louche 18 min. Mantecare.","Enrouler chaque Saint-Jacques dans 1/2 tranche de lard fumé, embrocher (3 par brochette).","Plancha bien chaude, brochettes 2 min par face.","Citron, romarin. Servir avec risotto."] },

{ id:"bi30", nom:"Filet de bœuf en croûte (Wellington)", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:90, difficulte:3,
  ingredients:[
    { nom:"Filet de bœuf", qte:1, unite:"pièce (1kg)", rayon:"Boucherie" },
    { nom:"Pâte feuilletée", qte:2, unite:"rouleaux", rayon:"Crèmerie" },
    { nom:"Champignons de Paris", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Jambon de Parme", qte:8, unite:"tranches", rayon:"Boucherie" },
    { nom:"Moutarde", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Œuf (dorure)", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes Anna", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir 1kg de filet de bœuf 2 min toutes faces. Saler, badigeonner moutarde, refroidir.","Hacher 500g de champignons + 3 échalotes très fin. Sauter à sec jusqu'à évaporation (duxelles).","Étaler 8 tranches de jambon de Parme sur film, étaler la duxelles.","Enrouler la viande dans le jambon + duxelles. Envelopper dans pâte feuilletée.","Dorer à l'œuf battu, four 25 min à 220°C. Repos 10 min.","Pommes Anna en accompagnement. Trancher, servir."] },

{ id:"bi31", nom:"Cuisses de canard confites maison", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:180, difficulte:2,
  ingredients:[
    { nom:"Cuisses de canard fraîches", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Gros sel", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Graisse de canard", qte:1, unite:"kg", rayon:"Crèmerie" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Thym & laurier", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Pommes sarladaises", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Salade frisée", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saler 6 cuisses de canard 12h au gros sel (200g) avec ail + thym. Rincer, sécher.","Couvrir de 1kg de graisse de canard fondue dans cocotte.","Confire 90°C 2h30 : la viande doit tomber de l'os.","Sortir, garder dans la graisse 1 semaine MAX au frigo.","Pour servir : four 15 min à 200°C côté peau pour croustiller.","Pommes sarladaises + salade frisée."] },

{ id:"bi32", nom:"Pluma de cochon ibérique, purée de panais", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Pluma de cochon ibérique", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Panais", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Romarin", qte:2, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 800g de panais, couper en cubes. Cuire dans 30cl de lait + eau 20 min jusqu'à tendres.","Égoutter, mixer en purée avec 60g de beurre. Saler.","Saisir 800g de pluma de cochon 3 min par face dans poêle bien chaude avec romarin. Repos.","Trancher fin. Dresser sur purée. Fleur de sel."] },

{ id:"bi33", nom:"Selle d'agneau, légumes glacés", mode:"us", type:"diner", saison:["printemps","été"], culture:"bistronomie", temps:60, difficulte:3,
  ingredients:[
    { nom:"Selle d'agneau désossée", qte:1.2, unite:"kg", rayon:"Boucherie" },
    { nom:"Carottes nouvelles", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Navets nouveaux", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Petits pois frais", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Bouillon de volaille", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 180°C.","Saisir 1,2kg de selle d'agneau désossée 5 min toutes faces. Enfourner 20 min (rosé). Repos 10 min sous alu.","Pendant ce temps, glacer les légumes : 8 carottes + 6 navets + 200g d'oignons + eau + 80g de beurre + 2 c. à soupe de sucre + sel. Cuire couvert puis à découvert pour caraméliser.","Ajouter 300g de petits pois en fin 3 min.","Trancher selle, dresser avec légumes."] },

{ id:"bi34", nom:"Saumon en croûte de sel", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:45, difficulte:2,
  ingredients:[
    { nom:"Saumon entier vidé", qte:1.5, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Gros sel", qte:2, unite:"kg", rayon:"Épicerie salée" },
    { nom:"Blancs d'œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Aneth", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre blanc", qte:1, unite:"portion", rayon:"Crèmerie" }
  ],
  etapes:["Mélanger 2kg de gros sel + 4 blancs d'œufs en pâte.","Vider le saumon. Garnir le ventre d'aneth, citron en quartiers.","Sur plaque, étaler une couche de sel, déposer poisson, couvrir entièrement.","Four 30 min à 200°C.","À table, casser la croûte au manche de couteau.","Lever les filets en évitant la peau. Servir avec pdt vapeur + beurre blanc."] },

{ id:"bi35", nom:"Rougets en escabèche", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Rougets vidés", qte:8, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons rouges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre de Xérès", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Huile d'olive", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Thym & laurier", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Pain de campagne", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Saisir 8 rougets 3 min par face dans 1 c. à soupe d'huile. Réserver.","Émincer 3 carottes en rondelles, 2 oignons rouges en quartiers, 4 gousses d'ail.","Dans la même poêle, suer les légumes 5 min. Ajouter 15cl de vinaigre + 15cl de vin blanc + 10cl d'huile + thym.","Verser bouillant sur les poissons.","Refroidir, servir tiède ou froid avec pain grillé."] },

{ id:"bi36", nom:"Œuf mollet, mouillettes d'asperges & jambon cru", mode:"us", type:"diner", saison:["printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Asperges vertes", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Jambon Serrano", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Pain de campagne", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Pocher 6 œufs mollets 6 min, refroidir, écaler.","Cuire 600g d'asperges 5 min vapeur.","Toaster 0,5 baguette en tranches.","Dans des assiettes : œuf mollet décoiffé + asperges + lanières de jambon Serrano + pain.","Filet d'huile d'olive + fleur de sel. Servir aussitôt."] },

{ id:"bi37", nom:"Filet de turbot, sauce hollandaise", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:35, difficulte:3,
  ingredients:[
    { nom:"Filets de turbot", qte:4, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Jaunes d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre clarifié", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre blanc", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Asperges blanches", qte:600, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 600g d'asperges blanches 12 min vapeur.","Hollandaise : monter 3 jaunes au bain-marie avec 1 c. à soupe de vinaigre, puis 200g de beurre clarifié en filet, fouetter en sauce épaisse. Citron + sel.","Saisir 4 filets de turbot 4 min par face dans 30g de beurre.","Servir : asperges + turbot + nappage hollandaise."] },

{ id:"bi38", nom:"Médaillons de lotte, beurre safrané", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Lotte parée", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Fenouil", qte:1, unite:"bulbe", rayon:"Fruits & Légumes" },
    { nom:"Riz pilaf", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Réhydrater 1 dose de safran dans 1 c. à soupe d'eau chaude.","Couper 800g de lotte en médaillons de 2cm. Saler.","Saisir 3 min par face dans 30g de beurre.","Couper 1 fenouil en quartiers, rôtir à part 20 min à 200°C.","Dans la poêle du poisson, suer 2 échalotes ciselées + 10cl de vin blanc, réduire de moitié.","Ajouter 10cl de crème + safran. Monter au beurre.","Cuire 300g de riz pilaf en parallèle.","Servir : riz + lotte + sauce safranée + fenouil."] },

{ id:"bi39", nom:"Côtelettes de chevreuil, sauce grand veneur", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Côtelettes de chevreuil", qte:8, unite:"pièces", rayon:"Boucherie" },
    { nom:"Vin rouge corsé", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Fond de gibier", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Gelée de groseilles", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Purée de marrons", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Poivre noir", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Saisir 8 côtelettes de chevreuil 2 min par face dans poêle bien chaude. Repos.","Suer 3 échalotes. Verser 30cl de vin rouge + 25cl de fond de gibier + 3 c. à soupe de gelée de groseilles + 10cl de crème. Réduire 10 min.","Réchauffer 500g de purée de marrons.","Servir : marrons + côtelettes + sauce + poivre concassé."] },

{ id:"bi40", nom:"Pintade aux pruneaux & polenta crémeuse", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:75, difficulte:2,
  ingredients:[
    { nom:"Pintade en morceaux", qte:1.3, unite:"kg", rayon:"Boucherie" },
    { nom:"Pruneaux dénoyautés", qte:250, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Armagnac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Vin rouge", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Polenta précuite", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lait", qte:50, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Tremper 250g de pruneaux dans armagnac 1h.","Saisir 1,3kg de pintade en morceaux dans 30g de beurre 5 min.","Émincer 3 échalotes, suer 3 min.","Déglacer 25cl de vin rouge + 30cl de bouillon. Ajouter pruneaux. Mijoter 50 min.","Pour la polenta : 50cl de lait bouillant, verser 200g de polenta en pluie, cuire 5 min en remuant. Ajouter 60g de parmesan.","Servir : pintade + sauce + polenta crémeuse."] },

{ id:"bi41", nom:"Œufs Bénédicte au saumon fumé", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:3,
  ingredients:[
    { nom:"Muffins anglais", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Saumon fumé", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Œufs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jaunes d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre clarifié", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre blanc", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Hollandaise : monter 3 jaunes au bain-marie, ajouter 150g de beurre clarifié + citron.","Pocher 8 œufs 3 min eau vinaigrée frémissante.","Toaster 4 muffins anglais coupés en deux.","Sur chaque demi-muffin : saumon fumé + œuf poché + cuillère de hollandaise + aneth.","Servir aussitôt."] },

{ id:"bi42", nom:"Tarte fine pomme-andouille de Vire", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Pommes Reinette", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Andouille de Vire", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Moutarde à l'ancienne", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Calvados", qte:3, unite:"c. à soupe", rayon:"Boissons" },
    { nom:"Mâche", qte:150, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Étaler la pâte feuilletée, étaler 2 c. à soupe de moutarde sur le fond.","Trancher 3 pommes en rondelles fines. Disposer.","Trancher 200g d'andouille en lamelles fines. Disposer sur les pommes.","Enfourner 25 min jusqu'à pâte dorée.","Arroser de 3 c. à soupe de calvados juste avant de servir.","Salade de mâche à côté."] },

{ id:"bi43", nom:"Mille-feuille de saumon & avocat", mode:"us", type:"diner", saison:["printemps","été"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Saumon frais (sashimi)", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Avocats", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Mélange salade", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pain au levain grillé", qte:8, unite:"tranches", rayon:"Boulangerie" }
  ],
  etapes:["Trancher 400g de saumon extra-frais en lamelles très fines au congélateur (15 min avant).","Écraser 3 avocats à la fourchette avec jus de citron vert.","Au cercle : 1 couche saumon + 1 couche avocat + 1 couche saumon + 1 couche avocat.","Aneth + 1 filet d'huile d'olive + fleur de sel.","Servir aussitôt avec pain au levain grillé."] },

{ id:"bi44", nom:"Filet de canette aux cerises", mode:"us", type:"diner", saison:["été","printemps"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Filets de canette", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Cerises fraîches dénoyautées", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre balsamique", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Porto", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Sucre brun", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Polenta crémeuse", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Polenta crémeuse : 50cl de lait bouillant, verser 200g de polenta en pluie, cuire 5 min en remuant. Beurre + parmesan.","Saler 4 filets de canette. Cuire côté peau 5 min, côté chair 3 min. Repos.","Dans la poêle, sauce : 5cl de porto + 4 c. à soupe de balsamique + 2 c. à soupe de sucre + 300g de cerises. Réduire 8 min.","Monter au beurre.","Trancher canette, servir sur polenta avec cerises."] },

{ id:"bi45", nom:"Brochettes de cailles laquées au miel", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Cailles désossées", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Sauce soja", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Gingembre", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Polenta", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Salade", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mariner 6 cailles désossées 30 min : 4 c. à soupe de miel + 3 c. à soupe de sauce soja + 2 c. à soupe de balsamique + ail + gingembre.","Embrocher.","Four 18 min à 200°C en badigeonnant régulièrement de marinade.","Polenta crémeuse en parallèle.","Salade verte vinaigrée. Servir aussitôt, glaçage caramélisé."] },

{ id:"bi46", nom:"Cabillaud en croûte d'amandes, fenouil", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Dos de cabillaud", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Amandes effilées", qte:120, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Mie de pain", qte:50, unite:"g", rayon:"Boulangerie" },
    { nom:"Beurre fondu", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Fenouil", qte:3, unite:"bulbes", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Quartiers de 3 bulbes de fenouil, huile, rôtir 25 min.","Mixer 120g d'amandes effilées + 50g de mie + 50g de beurre fondu en croûte.","Cabillaud sur plaque. Étaler la croûte en couche épaisse.","Four 12 min à 200°C.","Citron + fenouil rôti à côté. Servir."] },

{ id:"bi47", nom:"Suprême de pintade au cidre", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:50, difficulte:2,
  ingredients:[
    { nom:"Suprêmes de pintade", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Cidre brut", qte:40, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes Reinette", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir 4 suprêmes de pintade côté peau 4 min + côté chair 3 min dans 30g de beurre.","Four 8 min à 180°C pour finir la cuisson.","Suer 3 échalotes, flamber 5cl de calvados.","Déglacer 40cl de cidre, réduire de moitié. Ajouter 25cl de crème, mijoter 3 min.","Couper 3 pommes Reinette en quartiers, sauter à part dans 30g de beurre 5 min.","Servir : suprême + sauce + pommes + écrasé de pdt."] },

{ id:"bi48", nom:"Tagliatelles aux truffes & jambon", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tagliatelles fraîches", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Truffe noire ou huile de truffe", qte:20, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon de Parme", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Beurre demi-sel", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan 24 mois", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 500g de tagliatelles fraîches 3 min.","Dans une grande sauteuse, faire fondre 100g de beurre demi-sel + 2 c. à soupe d'eau de cuisson en émulsion brillante.","Égoutter pâtes, mélanger au beurre.","Ajouter 100g de parmesan + jambon en lamelles. Mélanger.","Râper la truffe (15-20g) directement dans les assiettes.","Fleur de sel + tour de poivre. Servir aussitôt."] },

{ id:"bi49", nom:"Tatin de tomates au chèvre", mode:"both", type:"diner", saison:["été","automne"], culture:"bistronomie", temps:40, difficulte:1,
  ingredients:[
    { nom:"Tomates rondes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Chèvre frais", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre brun", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Thym frais", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 6 tomates en deux. Dans une poêle, faire fondre 30g de beurre + 3 c. à soupe de sucre + 2 c. à soupe de balsamique. Dorer les tomates côté coupe 5 min.","Transférer dans un moule. Émietter 200g de chèvre frais dessus.","Recouvrir de pâte feuilletée, rentrer les bords.","Enfourner 25 min jusqu'à pâte dorée.","Retourner sur un plat. Thym + filet d'huile d'olive.","Servir avec salade verte."] },

{ id:"bi50", nom:"Filet mignon en croûte d'épices", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:45, difficulte:2,
  ingredients:[
    { nom:"Filet mignon de porc", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Pain d'épices mixé", qte:80, unite:"g", rayon:"Boulangerie" },
    { nom:"Moutarde forte", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Miel", qte:1, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Quatre-épices", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes de terre rattes", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pommes Granny Smith", qte:2, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Saler 1 filet mignon de porc.","Badigeonner 3 c. à soupe de moutarde + 1 c. à soupe de miel + 1 c. à café de 4 épices.","Mixer 80g de pain d'épices, rouler le filet dedans.","Saisir 2 min toutes faces dans 1 c. à soupe d'huile.","Enfourner 22 min. Repos 5 min.","Cuire 800g de rattes vapeur en parallèle.","Couper 2 pommes en quartiers, sauter au beurre.","Trancher viande, dresser : rattes + pommes + médaillons."] },

{ id:"bi51", nom:"Crémeux d'avocat, gambas snackées", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:20, difficulte:1,
  ingredients:[
    { nom:"Avocats mûrs", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Gambas crues", qte:18, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Coriandre", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Piment d'Espelette", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Mixer avocats + citron vert + sel en crémeux.","Décortiquer gambas, snacker 1 min par face dans huile + ail.","Dresser crémeux au cercle, gambas dessus.","Coriandre, espelette."] },

{ id:"bi52", nom:"Crumble salé au saumon & légumes", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:45, difficulte:1,
  ingredients:[
    { nom:"Saumon en cubes", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Poireaux", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Farine", qte:120, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Suer poireaux et courgettes 10 min.","Ajouter saumon + crème + aneth, dans un plat.","Crumble : farine + beurre + parmesan, sabler.","Recouvrir, four 25 min à 200°C."] },

{ id:"bi53", nom:"Poulet farci aux herbes & polenta", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:75, difficulte:2,
  ingredients:[
    { nom:"Poulet fermier", qte:1.6, unite:"kg", rayon:"Boucherie" },
    { nom:"Herbes (persil, ciboulette, estragon)", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Mie de pain", qte:80, unite:"g", rayon:"Boulangerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Polenta crémeuse", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Farce : mie trempée + herbes hachées + ail + beurre.","Glisser sous la peau du poulet, four 1h à 200°C.","Polenta crémeuse en parallèle.","Servir tranché sur polenta."] },

{ id:"bi54", nom:"Risotto d'épeautre aux légumes du soleil", mode:"both", type:"diner", saison:["été","automne","printemps"], culture:"bistronomie", temps:50, difficulte:2,
  ingredients:[
    { nom:"Épeautre perlé", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Aubergines", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Tomates cerises", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de légumes", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire épeautre 35 min al dente.","Légumes en dés rôtis au four 25 min.","Mélanger céréale et légumes, parmesan.","Basilic ciselé."] },

{ id:"bi55", nom:"Poêlée de coques aux herbes", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:20, difficulte:1,
  ingredients:[
    { nom:"Coques fraîches", qte:1.5, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Vin blanc sec", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil + ciboulette", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Dégorger coques 1h eau salée.","Suer échalotes + ail au beurre.","Coques + vin, couvrir 5 min jusqu'à ouverture.","Herbes ciselées, servir avec pain."] },

{ id:"bi56", nom:"Filets de lieu, sauce verte aux herbes", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Filets de lieu jaune", qte:4, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Persil + cerfeuil + estragon", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Yaourt grec", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mixer herbes + yaourt + câpres + citron en sauce verte.","Poêler les filets 4 min par face au beurre.","Dresser sur pdt vapeur écrasées.","Napper de sauce verte."] },

{ id:"bi57", nom:"Échine de porc fumée aux choux & pdt", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:75, difficulte:1,
  ingredients:[
    { nom:"Échine de porc fumée", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Chou vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde forte", qte:1, unite:"pot", rayon:"Épicerie salée" },
    { nom:"Cumin", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire échine couverte d'eau 45 min.","Blanchir chou, suer oignons, ajouter chou et cumin.","Pdt cuites à part.","Trancher échine, servir avec chou et pdt, moutarde."] },

{ id:"bi58", nom:"Pissalat de Nice (anchoïade chaude) sur poisson", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Daurade royale entière", qte:1.2, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Filets d'anchois", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre nouvelles", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Olives noires", qte:100, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Pissalat : mixer anchois + ail + huile.","Cuire daurade au four 25 min à 200°C, citron dans ventre.","Pdt en robe à part.","Servir poisson nappé de pissalat tiède, olives."] },

{ id:"bi59", nom:"Côte de cochon ibérique, jus à la sauge", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Côtes de porc ibérique", qte:4, unite:"pièces (250g)", rayon:"Boucherie" },
    { nom:"Sauge fraîche", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc moelleux", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Fond de veau", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre Anna", qte:1, unite:"kg", rayon:"Fruits & Légumes" }
  ],
  etapes:["Côtes saisies 4 min par face au beurre + sauge + ail.","Repos sous papier.","Déglacer vin + fond, monter au beurre.","Pommes Anna au four à part, dresser."] },

{ id:"bi60", nom:"Salade tiède de gésiers, vinaigrette aux noix", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Gésiers de canard confits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Mesclun", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Foies de volaille", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Cerneaux de noix", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Pain de campagne", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Huile de noix", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre de Xérès", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Réchauffer gésiers à la poêle, poêler foies 2 min/face.","Toaster pain, frotter à l'ail.","Vinaigrette huile noix + Xérès + échalote.","Dresser mesclun, viandes chaudes, croûtons, noix."] },

{ id:"fq01", nom:"Tartines tomate-mozzarella-basilic", mode:"kids", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:10, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Mozzarella", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:1, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four position grill à 220°C.","Couper 4 tomates en rondelles épaisses (1cm). Émincer 1 gousse d'ail très finement.","Trancher 250g de mozzarella di bufala en rondelles de 5mm. Bien l'éponger au papier absorbant (sinon ça rend de l'eau).","Toaster 8 tranches de pain de campagne 2 min sous le grill jusqu'à dorées.","Frotter rapidement chaque toast avec une demi-gousse d'ail (juste pour parfumer).","Sur chaque toast, disposer 1 rondelle de tomate, 1 rondelle de mozza. Saler très légèrement, poivrer, arroser de quelques gouttes d'huile d'olive.","Passer 3 min sous le grill : la mozza doit juste commencer à fondre.","Sortir, ajouter quelques feuilles de basilic frais déchirées à la main. Servir aussitôt."] },

{ id:"fq02", nom:"Tartines chèvre-figue-miel", mode:"us", type:"diner", saison:["été","automne"], culture:"bistronomie", temps:10, difficulte:1,
  ingredients:[
    { nom:"Pain au levain", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Bûche de chèvre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Figues fraîches", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Roquette", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Noix concassées", qte:60, unite:"g", rayon:"Épicerie sucrée" }
  ],
  etapes:["Préchauffer le four à 200°C en mode grill.","Toaster 8 tranches de pain au levain 2 min jusqu'à dorées.","Trancher 200g de bûche de chèvre en 8 rondelles épaisses.","Couper 6 figues fraîches en quartiers (en 4).","Disposer 1 rondelle de chèvre sur chaque toast. Passer 3 min sous le grill : le chèvre doit fondre et commencer à brunir.","Sortir, déposer 3 quartiers de figue par toast.","Arroser de 1/2 c. à café de miel chaud par toast. Concasser 60g de cerneaux de noix, parsemer.","Servir avec une chiffonnade de roquette à côté, vinaigrée au balsamique."] },

{ id:"fq03", nom:"Salade composée poulet-maïs-tomate", mode:"kids", type:"diner", saison:["printemps","été"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet cuits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Maïs en boîte", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Œufs durs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Vinaigrette", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Pour les œufs durs : porter une casserole d'eau à ébullition, plonger les œufs, cuire 9 min. Refroidir aussitôt sous l'eau froide. Écaler et couper en 4.","Couper 4 tomates en quartiers. Couper 400g de blancs de poulet cuits (restes ou pochés à l'eau salée 12 min) en morceaux.","Laver et essorer une salade (mélange laitue + mâche).","Dans un grand saladier de service, disposer la salade au fond.","Ajouter les tomates, les œufs durs, le poulet en gros morceaux.","Préparer la vinaigrette : 1 c. à café de moutarde + 1 c. à soupe de vinaigre + 3 c. à soupe d'huile + sel + poivre. Bien émulsionner au fouet.","Verser sur la salade au moment de servir. Mélanger délicatement."] },

{ id:"fq04", nom:"Tabouleh menthe-citron express", mode:"both", type:"diner", saison:["printemps","été"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Semoule fine", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citrons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Menthe", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Mettre 300g de semoule fine dans un grand saladier. Ajouter 4 c. à soupe d'huile d'olive et le jus de 2 citrons. Mélanger.","Couvrir d'1 verre d'eau tiède. Couvrir d'un torchon, laisser gonfler 15 min. La semoule absorbe et devient tendre.","Pendant ce temps : couper 4 tomates en très petits dés (en gardant le jus). Couper 1 concombre en dés.","Hacher finement 1 botte de menthe et 1 botte de persil (utiliser ciseaux pour aller vite).","Aérer la semoule à la fourchette.","Ajouter tomates (avec leur jus), concombre, herbes. Saler, poivrer généreusement.","Bien mélanger. Goûter, rectifier l'acidité (rajouter du citron si besoin).","Servir bien frais, idéalement après 30 min au frigo pour que les saveurs se développent."] },

{ id:"fq05", nom:"Sandwich club poulet-bacon-avocat", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pain de mie complet", qte:12, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Blancs de poulet cuits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Bacon", qte:8, unite:"tranches", rayon:"Boucherie" },
    { nom:"Avocat", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:8, unite:"feuilles", rayon:"Fruits & Légumes" },
    { nom:"Mayonnaise", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Faire griller 4 tranches de bacon dans une poêle à sec 5 min jusqu'à croustillantes. Égoutter sur papier absorbant.","Pendant ce temps, toaster 12 tranches de pain de mie complet.","Couper 2 avocats en deux, vider la chair, écraser avec le jus d'1/2 citron.","Couper 2 tomates en rondelles fines.","Pocher 4 morceaux de blanc de poulet à l'eau bouillante salée 10 min OU utiliser des restes. Émincer.","Étaler 1 c. à café de mayonnaise sur chaque toast.","Monter chaque sandwich : pain + salade + poulet, pain du milieu, pain + avocat + bacon + tomate, pain.","Piquer avec 4 cure-dents, couper en 4 triangles. Servir avec des chips ou frites."] },

{ id:"fq06", nom:"Omelette aux 4 fromages", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:10, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Comté râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Chèvre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Bleu", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Emmental", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Casser 10 œufs dans un grand bol. Ajouter sel et poivre, battre à la fourchette (juste pour mélanger).","Préparer les 4 fromages : râper 80g de comté et 80g d'emmental, émietter 60g de bleu, couper 80g de chèvre en petits dés.","Dans une grande poêle anti-adhésive, faire fondre 40g de beurre à feu DOUX.","Verser les œufs. Attendre 30 sec, puis ramener doucement les bords vers le centre à la spatule, en laissant les œufs liquides couler sur les côtés.","Quand les œufs sont encore baveux au centre (3 min), parsemer les 4 fromages en bande au centre.","Laisser fondre 30 sec, puis replier l'omelette en deux à la spatule.","Faire glisser sur un plat de service. Parsemer la ciboulette ciselée. Servir aussitôt."] },

{ id:"fq07", nom:"Pâtes au citron & parmesan", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Linguine", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Citrons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition. Y cuire 500g de linguine pour 1 min de moins que le paquet (al dente, finition à la poêle).","Pendant ce temps : râper le zeste de 2 citrons (uniquement la partie jaune, l'amère blanche est à éviter). Presser le jus.","Râper 100g de parmesan au fur et à mesure.","Dans une grande sauteuse, faire fondre 80g de beurre à feu doux. Ajouter 10cl de crème, ne pas faire bouillir.","Égoutter les pâtes en gardant 1 louche d'eau de cuisson. Les verser dans la sauteuse.","Ajouter le jus de citron, le zeste, 80g de parmesan, 3 c. à soupe d'eau de cuisson. Mélanger énergiquement 1 min : la sauce nappe les pâtes.","Hors feu, ajouter le basilic ciselé et le reste de parmesan.","Servir aussitôt dans des assiettes très chaudes. Tour de poivre du moulin."] },

{ id:"fq08", nom:"Pâtes au jambon & petits pois", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:18, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Petits pois surgelés", qte:300, unite:"g", rayon:"Surgelés" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, ciseler 1 échalote. Couper 6 tranches de jambon en lanières.","Cuire 500g de penne 9 min al dente.","Décongeler 300g de petits pois (les plonger 3 min dans l'eau bouillante des pâtes, les sortir à l'écumoire).","Dans une grande sauteuse, faire fondre 30g de beurre. Suer l'échalote 2 min.","Ajouter le jambon, 25cl de crème fraîche. Mijoter 3 min.","Ajouter les petits pois, mélanger 1 min.","Égoutter les pâtes, les verser dans la sauteuse. Mélanger avec 60g de parmesan. Servir aussitôt."] },

{ id:"fq09", nom:"Pâtes alla puttanesca", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Anchois à l'huile", qte:10, unite:"filets", rayon:"Épicerie salée" },
    { nom:"Olives noires", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Câpres", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Piment doux", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, écraser 4 gousses d'ail. Hacher 10 filets d'anchois à l'huile.","Cuire 500g de spaghetti al dente.","Dans une grande sauteuse, faire fondre les anchois dans 4 c. à soupe d'huile à feu doux : ils se désagrègent en 2 min.","Ajouter l'ail, faire blondir 1 min (PAS brûler).","Ajouter 40cl de tomates concassées, 150g d'olives noires dénoyautées, 3 c. à soupe de câpres, 1 c. à café de piment doux. Mijoter 10 min.","Égoutter les pâtes, les verser dans la sauteuse. Mélanger 1 min.","Parsemer de persil ciselé. Servir."] },

{ id:"fq10", nom:"Croque-monsieur au comté", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:12, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Comté râpé", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four en mode grill à 220°C.","Dans un bol, mélanger 15cl de crème fraîche, 2 c. à café de moutarde, et 150g de comté râpé. Saler très légèrement (jambon et fromage le sont déjà), poivrer.","Beurrer légèrement un côté de 12 tranches de pain de mie. Disposer 4 tranches beurre vers le BAS sur une plaque tapissée de papier cuisson.","Sur chaque tranche, étaler une couche du mélange crémeux. Déposer 1 tranche de jambon repliée. Étaler à nouveau du mélange.","Recouvrir avec une seconde tranche de pain (beurre vers le haut). On obtient 4 croques montés.","Étaler généreusement le reste du mélange crémeux sur les dessus.","Parsemer du reste de comté râpé sur le dessus.","Enfourner au grill 10 min en surveillant : le dessus doit être bien doré.","Servir aussitôt avec une salade verte vinaigrette. Astuce : on peut ajouter un œuf au plat dessus pour un croque-madame."] },

{ id:"fq11", nom:"Croque-jambon-tomate", mode:"kids", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Origan séché", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 220°C en mode grill.","Couper 2 tomates en rondelles fines.","Beurrer 4 tranches de pain de mie sur une face.","Monter chaque croque : pain (beurre vers le bas) + 1 tranche de jambon + rondelles de tomate + 1 belle pincée d'emmental + 1 pincée d'origan + 1 tranche pain (beurre vers le haut).","Saupoudrer le dessus du reste d'emmental.","Enfourner 8-10 min sous le grill jusqu'à doré et fondant.","Servir aussitôt avec une salade verte."] },

{ id:"fq12", nom:"Œufs au plat & jambon, pdt sautées", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon blanc", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 800g de pommes de terre. Les couper en dés de 1,5cm. Les éponger au papier absorbant.","Dans une grande poêle, chauffer 60g de beurre à feu moyen. Y faire sauter les pdt 18 min en remuant régulièrement, jusqu'à dorées et tendres.","Pendant la dernière minute, ajouter 2 gousses d'ail hachées.","Pendant ce temps, dans une autre poêle, cuire 8 œufs au plat à feu doux dans 1 c. à café de beurre. Saler le blanc.","Réchauffer les 4 tranches de jambon dans la poêle des œufs en fin.","Servir : pdt sautées + œuf au plat + jambon + persil ciselé."] },

{ id:"fq13", nom:"Frittata courgettes-féta-menthe", mode:"us", type:"diner", saison:["printemps","été"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:10, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Féta", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Menthe", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four position grill à 220°C.","Couper 2 courgettes en rondelles fines. Émincer 2 gousses d'ail.","Dans une grande poêle allant au four, chauffer 4 c. à soupe d'huile d'olive. Sauter ail + courgettes 8 min jusqu'à tendres mais avec encore du croquant.","Casser 10 œufs dans un bol, battre à la fourchette avec sel et poivre.","Émietter 200g de féta. Hacher 1/2 botte de menthe.","Ajouter féta et menthe aux œufs.","Verser le mélange œufs sur les courgettes dans la poêle. Cuire 5 min à feu doux couvert (les œufs prennent par le dessous).","Enfourner 3 min sous le grill pour finir le dessus.","Démouler sur une planche, couper en parts. Servir tiède."] },

{ id:"fq14", nom:"Saumon poêlé express, haricots verts", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Haricots verts", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 500g de haricots verts à l'eau bouillante salée 8 min. Égoutter, garder croquants.","Pendant ce temps, presser 1 citron et zester.","Hacher 2 gousses d'ail. Ciseler le persil.","Dans une grande poêle, chauffer 1 c. à soupe d'huile à feu moyen. Cuire les pavés de saumon côté peau 5 min, retourner 1 min (cœur nacré).","Réserver le saumon sur un plat chaud.","Dans la même poêle, faire fondre 50g de beurre jusqu'à coloration noisette. Hors feu, ajouter ail + jus de citron + zeste + persil.","Servir : haricots verts + saumon + beurre noisette nappé."] },

{ id:"fq15", nom:"Cabillaud poêlé aux herbes", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Herbes (persil, ciboulette, estragon)", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 400g de riz basmati : 1 volume riz / 1,5 volume eau salée, couvert à feu doux 12 min, repos 5 min.","Pendant ce temps, hacher 1 botte d'herbes mélangées (persil, ciboulette, estragon).","Presser 1 citron.","Dans une grande poêle, chauffer 30g de beurre à feu moyen. Cuire 700g de dos de cabillaud 4 min par face. Saler en fin.","Retirer le poisson, garder au chaud.","Dans la poêle, faire fondre 30g de beurre supplémentaire jusqu'à coloration noisette.","Hors feu, ajouter le jus de citron et les herbes hachées.","Servir : riz + cabillaud + herbes en beurre noisette."] },

{ id:"fq16", nom:"Filets de poulet citronné express", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Aiguillettes de poulet", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 400g de riz basmati en parallèle.","Presser 2 citrons.","Émincer 3 gousses d'ail.","Dans une grande poêle, chauffer 50g de beurre à feu moyen-vif.","Saisir 600g d'aiguillettes de poulet 5 min en remuant, jusqu'à dorées.","Baisser à feu moyen. Ajouter ail haché et jus de citron. Cuire 2 min en remuant.","Hors feu, ajouter persil ciselé et 1 noix de beurre supplémentaire pour lustrer.","Servir sur le riz."] },

{ id:"fq17", nom:"Steak haché à la moutarde", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre vapeur", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 2 échalotes.","Cuire les pdt vapeur 20 min en parallèle.","Dans une poêle, saisir les 4 steaks hachés 2 min par face à feu vif. Réserver au chaud.","Dans la même poêle, suer les échalotes 2 min.","Déglacer avec 10cl de bouillon, gratter le fond.","Ajouter 15cl de crème + 3 c. à soupe de moutarde. Mijoter 2 min.","Napper les steaks. Servir avec les pdt vapeur."] },

{ id:"fq18", nom:"Boulettes bœuf sauce tomate express", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Mie de pain", qte:60, unite:"g", rayon:"Boulangerie" },
    { nom:"Œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Coulis de tomate", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Origan", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Spaghetti", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Dans un saladier, mélanger 600g de bœuf haché + 1 œuf + 60g de chapelure + 1 oignon haché + 2 gousses d'ail écrasées + sel + poivre. Pétrir 2 min.","Former 16 boulettes de la taille d'une grosse noix.","Dans une grande sauteuse, chauffer 3 c. à soupe d'huile à feu moyen-vif. Dorer les boulettes 4 min sur toutes les faces. Réserver.","Cuire 400g de spaghetti al dente en parallèle.","Dans la sauteuse, ajouter 40cl de coulis de tomates + 1 c. à café d'origan. Remettre les boulettes. Mijoter 10 min.","Servir les spaghetti dans des assiettes, 4 boulettes + sauce. Parmesan."] },

{ id:"fq19", nom:"Côtes de porc moutarde", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Côtes de porc", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Moutarde forte", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pdt vapeur 20 min.","Émincer 1 échalote.","Saisir 4 côtes de porc 4 min par face dans une poêle bien chaude. Saler, poivrer. Réserver.","Dans la même poêle, suer l'échalote 2 min, déglacer 10cl de vin blanc.","Ajouter 20cl de crème + 3 c. à soupe de moutarde forte. Mijoter 2 min.","Napper les côtes. Servir avec pdt vapeur."] },

{ id:"fq20", nom:"Aiguillettes basquaise express", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Aiguillettes de poulet", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Poivrons mélangés", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates concassées", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Piment d'Espelette", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 2 poivrons rouges et 1 poivron vert en lanières. Émincer 1 oignon.","Dans une grande poêle, chauffer 3 c. à soupe d'huile à feu moyen. Faire revenir poivrons + oignon 8 min.","Ajouter 600g d'aiguillettes de poulet, cuire 6 min à feu vif en remuant.","Verser 25cl de tomates concassées, 1 c. à café de piment d'Espelette, sel. Mijoter 5 min.","Cuire 400g de riz basmati en parallèle 12 min.","Hacher 3 gousses d'ail et 1 botte de persil pour la persillade en fin.","Servir : riz + sauce basquaise + persillade."] },

{ id:"fq21", nom:"Poêlée pdt-lardons-fromage", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Lardons", qte:250, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Comté râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 1kg de pommes de terre, les couper en dés de 2cm. Bien éponger.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen. Sauter les pdt 18 min en remuant.","Émincer 1 oignon.","À la fin de la cuisson des pdt, ajouter 250g de lardons + oignon. Cuire 5 min jusqu'à lardons dorés.","Hors feu, parsemer 150g de comté râpé sur le tout. Couvrir 1 min : le fromage fond.","Parsemer persil ciselé. Servir directement de la poêle."] },

{ id:"fq22", nom:"Galettes de pdt râpées au gruyère", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 1kg de pommes de terre, les râper grossièrement. Mettre dans un torchon, essorer fortement au-dessus de l'évier.","Ciseler 1 échalote et 1 botte de persil.","Dans un saladier, mélanger pdt + 2 œufs + 150g de gruyère râpé + échalote + persil + sel + poivre.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen.","Former 8 galettes à la cuillère, tasser dans la poêle.","Cuire 4 min par face jusqu'à dorées et croustillantes. Renouveler en 2 fournées.","Servir aussitôt avec une salade verte."] },

{ id:"fq23", nom:"Quiche express tomate-feta", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Tomates cerises", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Féta", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Origan", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C grill.","Étaler la pâte brisée dans un moule à tarte, piquer le fond.","Couper 400g de tomates cerises en deux. Émietter 200g de féta.","Disposer tomates + féta sur la pâte.","Battre 4 œufs + 20cl de crème + 1 c. à café d'origan + sel + poivre.","Verser sur la garniture.","Enfourner 18 min jusqu'à pâte dorée et tarte prise.","Tiédir 5 min avant de couper. Servir avec une salade verte."] },

{ id:"fq24", nom:"Tarte fine champignons-thym", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Champignons", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 200°C.","Étaler la pâte feuilletée sur sa plaque, piquer.","Couper 400g de champignons en lamelles. Émincer 2 gousses d'ail.","Dans une poêle, chauffer 2 c. à soupe d'huile. Sauter champignons + ail 5 min à feu vif jusqu'à rendus leur eau et redorés.","Étaler 15cl de crème sur la pâte, parsemer champignons + thym effeuillé.","Saupoudrer 60g de parmesan.","Enfourner 18 min jusqu'à pâte dorée.","Servir tiède."] },

{ id:"fq25", nom:"Soupe à l'oignon express", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Oignons", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Bouillon de bœuf", qte:1.2, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Pain de campagne", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Comté râpé", qte:200, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Émincer 6 oignons en rondelles fines.","Dans une grande cocotte, faire fondre 60g de beurre à feu doux.","Faire blondir les oignons 12 min en remuant souvent (ils doivent ramollir et brunir).","Déglacer avec 10cl de vin blanc, laisser évaporer 1 min.","Verser 1,2L de bouillon de bœuf chaud. Mijoter 5 min.","Toaster 6 tranches de pain de campagne.","Verser la soupe dans des bols allant au four. Poser un croûton sur chaque, parsemer généreusement 200g de comté râpé.","Passer 3 min sous le grill à 220°C jusqu'à fromage doré et bouillonnant.","Servir IMMÉDIATEMENT (attention c'est brûlant)."] },

{ id:"fq26", nom:"Velouté carotte-orange-gingembre", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Carottes", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oranges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Gingembre", qte:1, unite:"morceau", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Coriandre", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 800g de carottes, les couper en rondelles. Râper 1 morceau de gingembre.","Dans une casserole, suer 1 échalote ciselée dans 1 c. à soupe d'huile 2 min.","Ajouter carottes + gingembre, mélanger 1 min.","Verser 1L de bouillon + jus de 2 oranges. Saler.","Porter à ébullition, mijoter 15 min jusqu'à tendres.","Mixer fin au mixeur plongeant.","Ajouter 15cl de crème, rectifier sel/poivre.","Servir avec coriandre ciselée."] },

{ id:"fq27", nom:"Velouté poireaux-pommes de terre", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Poireaux", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 1kg de poireaux (garder les blancs et début du vert). Les couper en rondelles, bien les rincer (souvent terreux).","Éplucher 400g de pommes de terre, couper en cubes.","Dans une casserole, faire fondre 40g de beurre. Suer les poireaux 5 min sans coloration.","Ajouter pdt + 1L de bouillon. Saler, poivrer.","Mijoter 15 min jusqu'à pdt tendres.","Mixer au mixeur plongeant. Ajouter 15cl de crème.","Servir avec ciboulette ciselée."] },

{ id:"fq28", nom:"Œufs cocotte rapides aux herbes", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Herbes mélangées", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Comté râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Préchauffer le four à 180°C.","Beurrer 4 ramequins. Hacher 1 botte d'herbes mélangées.","Dans chaque ramequin : 1 c. à soupe de crème + 2 œufs + 20g de comté + herbes + sel + poivre.","Mettre les ramequins dans un plat, verser de l'eau chaude jusqu'à mi-hauteur (bain-marie).","Enfourner 8 min : blanc pris, jaune coulant.","Servir avec mouillettes de pain grillées et beurrées."] },

{ id:"fq29", nom:"Salade niçoise express", mode:"both", type:"diner", saison:["printemps","été"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Thon en boîte", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Œufs durs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Olives noires", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Anchois", qte:6, unite:"filets", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 4 œufs durs 9 min, refroidir, écaler.","Couper 4 tomates en quartiers. Couper 1 poivron en lanières.","Sur un grand plat, dresser de la salade. Disposer thon égoutté, œufs en quartiers, tomates, poivron, olives, anchois.","Parsemer basilic ciselé.","Arroser de 6 c. à soupe d'huile d'olive vierge, sel, poivre. Pas de vinaigre (puriste : la vraie niçoise n'en a pas)."] },

{ id:"fq30", nom:"Salade fenouil-orange-olives", mode:"us", type:"diner", saison:["hiver","printemps"], culture:"méditerranéen", temps:15, difficulte:1,
  ingredients:[
    { nom:"Fenouil", qte:2, unite:"bulbes", rayon:"Fruits & Légumes" },
    { nom:"Oranges", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Olives noires", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Menthe", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 2 bulbes de fenouil très finement (mandoline si possible).","Suprêmer 3 oranges : peler à vif, sortir les segments en passant le couteau entre les membranes.","Disposer fenouil et suprêmes dans un saladier.","Ajouter 100g d'olives noires.","Arroser de 4 c. à soupe d'huile d'olive et du jus d'1 citron. Saler avec fleur de sel.","Mélanger délicatement, parsemer menthe ciselée. Servir frais."] },

{ id:"fq31", nom:"Salade lentilles-vinaigrette-fines herbes", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Lentilles vertes", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre de Xérès", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Persil + ciboulette", qte:1, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Lentilles 20 min à l'eau, égoutter tièdes.","Vinaigrette échalote + moutarde + Xérès + huile.","Mélanger.","Herbes."] },

{ id:"fq32", nom:"Salade chèvre chaud-noix-pomme", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Mesclun", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crottins de chèvre", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Noix", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Pommes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pain", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Huile de noix", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 220°C.","Toaster 4 tranches de pain. Déposer 1 demi-crottin sur chaque, arroser de 1/2 c. à café de miel.","Enfourner 4 min jusqu'à doré.","Pendant ce temps, éplucher et couper 2 pommes en quartiers, puis en tranches.","Dans une poêle, faire revenir 1 c. à soupe d'huile + pommes 3 min jusqu'à dorées.","Mélanger 4 c. à soupe d'huile de noix + 2 c. à soupe de balsamique.","Sur un lit de mesclun, dresser : crottins chauds + pommes tièdes + noix concassées.","Arroser de vinaigrette. Servir aussitôt."] },

{ id:"fq33", nom:"Spaghetti tomate-basilic frais", mode:"kids", type:"diner", saison:["printemps","été"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Couper 800g de tomates en cubes. Émincer 3 gousses d'ail.","Cuire 500g de spaghetti 8 min al dente.","Dans une grande sauteuse, chauffer 6 c. à soupe d'huile d'olive. Suer ail 1 min, ajouter tomates en cubes 6 min jusqu'à compote.","Égoutter les pâtes, les verser dans la sauce. Mélanger 30 sec.","Hors feu, ajouter le basilic frais en feuilles + parmesan.","Servir aussitôt."] },

{ id:"fq34", nom:"Pâtes pesto rosso (tomates séchées)", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates séchées", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pignons", qte:60, unite:"g", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Cuire 500g de penne 9 min al dente.","Pendant ce temps, mixer 150g de tomates séchées + 60g de pignons + 2 gousses d'ail + 6 c. à soupe d'huile d'olive en pesto rouge épais.","Égoutter les pâtes en gardant 1 louche d'eau.","Mélanger les pâtes au pesto rouge + 2 c. à soupe d'eau de cuisson.","Parsemer parmesan + basilic. Servir."] },

{ id:"fq35", nom:"Linguine aux courgettes & menthe", mode:"both", type:"diner", saison:["printemps","été"], culture:"italien", temps:18, difficulte:1,
  ingredients:[
    { nom:"Linguine", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Courgettes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Menthe", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, couper 3 courgettes en rubans à l'économe.","Cuire 500g de linguine 8 min al dente.","Dans une grande sauteuse, chauffer 5 c. à soupe d'huile d'olive. Suer 2 gousses d'ail 1 min, ajouter rubans de courgettes 5 min.","Zester et presser 1 citron.","Égoutter les pâtes, les verser dans la sauteuse avec zeste + jus + 2 c. à soupe d'eau de cuisson.","Hors feu, ajouter menthe ciselée + 80g de parmesan. Servir."] },

{ id:"fq36", nom:"Wraps poulet-pesto-roquette", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:8, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs de poulet cuits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Pesto", qte:1, unite:"pot", rayon:"Épicerie salée" },
    { nom:"Roquette", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Mozza fraîche", qte:150, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Réchauffer les tortillas 30 sec au micro-ondes sous un torchon humide OU 1 min dans une poêle sèche.","Étaler 1 c. à soupe de pesto sur chaque tortilla.","Émincer 400g de poulet cuit. Couper 2 tomates en dés. Couper 150g de mozza en lamelles.","Sur chaque tortilla : poulet + mozza + tomate + roquette.","Rouler serré. Servir aussitôt ou snacker 1 min par face dans poêle sèche pour le fromage fondu."] },

{ id:"fq37", nom:"Wraps thon-maïs-mayo", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:8, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Thon en boîte", qte:240, unite:"g", rayon:"Épicerie salée" },
    { nom:"Maïs", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Mayonnaise", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Salade", qte:8, unite:"feuilles", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Dans un bol, mélanger 240g de thon en boîte (égoutté) + 1 boîte de maïs (égouttée) + 5 c. à soupe de mayonnaise + jus d'1 citron + sel + poivre.","Réchauffer les tortillas 30 sec au micro-ondes.","Sur chaque tortilla : 2 feuilles de salade + une louche de mélange thon.","Rouler serré. Couper en 2 en biais. Servir."] },

{ id:"fq38", nom:"Bagels saumon-fromage frais", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Bagels", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Saumon fumé", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Fromage frais", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Couper les bagels en 2 et les toaster (4 min au grill ou grille-pain).","Sur chaque demi-bagel, étaler généreusement le fromage frais.","Disposer 50g de saumon fumé replié.","Parsemer aneth ciselé, câpres, tour de poivre.","Arroser de quelques gouttes de citron. Servir aussitôt."] },

{ id:"fq39", nom:"Pita kebab poulet maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pains pita", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Émincés de poulet", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Yaourt grec", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cumin + paprika", qte:2, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 500g d'émincés de poulet. Les mariner 10 min dans 2 c. à café de cumin + 2 c. à café de paprika + 2 c. à soupe d'huile + sel.","Dans une poêle, saisir le poulet 5 min à feu vif.","Mélanger 200g de yaourt grec + 1 c. à soupe de jus de citron + sel pour la sauce.","Couper 2 tomates en dés, laver et émincer la salade.","Tiédir les 4 pains pita au four ou grille-pain 1 min.","Ouvrir chaque pita en demi-poche. Garnir : salade + tomates + poulet + sauce yaourt.","Servir aussitôt avec quartier de citron."] },

{ id:"fq40", nom:"Bowl saumon fumé-quinoa", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Saumon fumé", qte:300, unite:"g", rayon:"Poissonnerie" },
    { nom:"Quinoa cuit", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Avocat", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pousses d'épinards", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 400g de quinoa : 1 volume quinoa / 2 volumes d'eau salée, 12 min couvert, repos 5 min.","Couper 300g de saumon fumé en lanières. Couper 2 avocats en dés (avec citron pour éviter qu'ils noircissent). Couper 1 concombre en dés. Effeuiller 100g de pousses d'épinards.","Dans 4 bols, disposer quinoa au fond.","Dresser harmonieusement : pousses d'épinards + saumon + avocat + concombre.","Mélanger 4 c. à soupe d'huile d'olive + jus d'1 citron + sel + poivre. Arroser chaque bol.","Servir frais."] },

{ id:"fq41", nom:"Œuf mollet, mouillettes, salade", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Sel + poivre", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Préparer une casserole d'eau bouillante salée. Plonger 6 œufs, cuire 6 min EXACTEMENT.","Refroidir aussitôt dans bain glacé, écaler.","Toaster 6 tranches de pain de campagne, beurrer généreusement (40g de beurre demi-sel).","Couper en mouillettes (bâtonnets de 2cm).","Laver et essorer une belle salade verte. Vinaigrette : 1 c. à café moutarde + 1 c. à soupe vinaigre + 3 c. à soupe huile.","Dans des assiettes : salade + œuf mollet décoiffé.","Mouillettes à part. Saler, poivrer. Servir aussitôt."] },

{ id:"fq42", nom:"Poêlée poulet-courgettes-tomates", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Riz", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 300g de riz basmati en parallèle.","Couper 500g de blancs de poulet en cubes. Couper 2 courgettes en cubes. Couper 300g de tomates cerises en deux.","Dans une grande poêle, chauffer 4 c. à soupe d'huile d'olive. Saisir le poulet 5 min en remuant.","Ajouter courgettes + 3 gousses d'ail, cuire 5 min.","Ajouter tomates + 1 c. à café d'herbes de Provence + sel + poivre. Cuire 5 min.","Servir sur le riz."] },

{ id:"fq43", nom:"Riz aux légumes & lardons", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Petits pois surgelés", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:0.8, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Cuire 400g de riz : 1 volume riz / 1,5 volume bouillon, 12 min couvert.","Pendant ce temps, émincer 1 oignon, couper 2 carottes en petits dés.","Dans une poêle, chauffer 1 c. à soupe d'huile + 200g de lardons à sec 3 min. Ajouter oignon + carottes, suer 5 min.","Décongeler 200g de petits pois au micro-ondes ou les ajouter directement aux dernières minutes.","Mélanger riz cuit + légumes + lardons + 30g de beurre.","Servir bien chaud."] },

{ id:"fq44", nom:"Tortilla espagnole pdt-oignon", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Sel", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 600g de pdt, couper en rondelles fines. Émincer 2 oignons.","Dans une grande poêle anti-adhésive, chauffer 10cl d'huile d'olive. Cuire pdt + oignons + sel 12 min à couvert, en remuant souvent.","Dans un grand bol, battre 8 œufs avec sel.","Égoutter les pdt sur passoire pour évacuer l'huile en excès.","Mélanger pdt aux œufs.","Reverser dans la poêle huilée à feu moyen. Cuire 4 min jusqu'à doré dessous.","Faire glisser sur une assiette, retourner la tortilla dans la poêle pour cuire l'autre face 4 min.","Faire glisser sur planche, couper en parts. Servir tiède ou froid."] },

{ id:"fq45", nom:"Quiche express jambon-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Gruyère râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C grill.","Foncer un moule à tarte de pâte brisée. Piquer.","Couper 6 tranches de jambon en lanières. Parsemer + 200g de gruyère râpé.","Battre 4 œufs + 25cl de crème + sel + poivre + muscade.","Verser sur le jambon.","Enfourner 18 min jusqu'à doré et pris.","Servir tiède avec salade."] },

{ id:"fq46", nom:"Pâtes au saumon fumé & crème", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Saumon fumé", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Porter une casserole d'eau salée à ébullition. Cuire 500g de tagliatelles 9 min al dente.","Pendant ce temps, émincer 1 échalote. Couper 200g de saumon fumé en lanières.","Dans une grande sauteuse, faire fondre 30g de beurre. Suer l'échalote 2 min.","Ajouter 25cl de crème, mijoter 3 min.","Ajouter saumon fumé + jus d'1 citron, mélanger.","Égoutter les pâtes, les verser dans la sauteuse. Mélanger 30 sec.","Aneth ciselé. Servir."] },

{ id:"fq47", nom:"Pâtes ail-huile-piment-anchois", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Anchois", qte:8, unite:"filets", rayon:"Épicerie salée" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Piment doux", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition. Cuire 500g de spaghetti 8 min al dente.","Dans une grande sauteuse, verser 8 c. à soupe d'huile à feu doux. Ajouter 8 filets d'anchois à l'huile, écraser à la spatule jusqu'à fondus (2 min).","Ajouter 6 gousses d'ail émincées, faire blondir 1 min SANS brûler.","Sortir du feu, ajouter 1 c. à café de piment doux.","Égoutter les pâtes, les verser dans la sauteuse. Mélanger énergiquement.","Persil ciselé. Servir."] },

{ id:"fq48", nom:"Crêpes salées roulées jambon-béchamel", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Crêpes salées", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Béchamel", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Champignons", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C grill.","Préparer 30cl de béchamel : faire fondre 30g de beurre, ajouter 25g farine + 30cl lait en fouettant. Cuire 3 min.","Couper 200g de champignons en lamelles, sauter 5 min dans 1 c. à soupe d'huile.","Sur chaque crêpe : 1 tranche de jambon + champi + 1 c. à soupe de béchamel. Rouler.","Disposer dans un plat à gratin beurré. Verser le reste de béchamel.","Parsemer 150g d'emmental râpé.","Enfourner 12 min jusqu'à doré bouillonnant. Servir."] },

{ id:"fq49", nom:"Soupe vermicelle-poulet", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Bouillon de volaille", qte:1.5, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Vermicelles", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Blanc de poulet cuit", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Cive", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter 1,5L de bouillon de volaille à frémissement.","Couper 2 carottes en petits dés.","Ajouter carottes au bouillon, cuire 10 min.","Ajouter 200g de vermicelles + 300g de poulet cuit effiloché. Cuire 5 min.","Cive ciselée en fin.","Servir bien chaud avec quartier de citron à part."] },

{ id:"fq50", nom:"Velouté champignons-crème", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Champignons de Paris", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 2 échalotes, couper 600g de champignons en lamelles.","Dans une casserole, faire fondre 30g de beurre. Suer échalotes 2 min.","Ajouter champignons, cuire 8 min à feu vif jusqu'à rendus leur eau.","Verser 1L de bouillon, mijoter 5 min.","Mixer au mixeur plongeant.","Ajouter 20cl de crème, persil ciselé. Servir."] },

{ id:"fq51", nom:"Tortilla wraps mexicaine express", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Maïs", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Haricots rouges", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Cheddar râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Épices tex-mex", qte:1, unite:"sachet", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon, couper 1 poivron en dés.","Dans une poêle, chauffer 2 c. à soupe d'huile. Saisir 500g de bœuf haché + épices tex-mex 6 min.","Ajouter 1 boîte de maïs + 1 boîte de haricots rouges, mélanger 3 min.","Tiédir 6 tortillas. Couper 2 tomates en dés.","Garnir chaque tortilla : bœuf + fromage + tomate + crudités. Rouler.","Servir aussitôt."] },

{ id:"fq52", nom:"Œufs brouillés saumon fumé", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:10, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Saumon fumé", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pain", qte:6, unite:"tranches", rayon:"Boulangerie" }
  ],
  etapes:["Toaster 6 tranches de pain de campagne.","Casser 10 œufs dans un bol. Battre avec 10cl de crème, sel.","Dans une poêle à feu DOUX, faire fondre 40g de beurre. Verser les œufs.","Brouiller doucement à la spatule, ils doivent rester crémeux (3 min).","Hors feu, ajouter 200g de saumon fumé en lanières.","Servir aussitôt sur les tartines beurrées. Ciboulette ciselée."] },

{ id:"fq53", nom:"Polenta crémeuse aux herbes", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Polenta précuite", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lait", qte:60, unite:"cl", rayon:"Crèmerie" },
    { nom:"Bouillon", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Herbes", qte:1, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter 60cl de lait + 40cl de bouillon à frémissement.","Verser 300g de polenta précuite EN PLUIE en fouettant énergiquement.","Cuire 5 min à feu doux en remuant constamment : la polenta doit épaissir.","Hors feu, ajouter 60g de beurre + 100g de parmesan + 1 botte d'herbes ciselées.","Mélanger jusqu'à crémeux.","Servir aussitôt (la polenta fige rapidement)."] },

{ id:"fq54", nom:"Penne aux brocolis & ricotta", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:18, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Brocolis", qte:500, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ricotta", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Piment doux", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Couper 500g de brocolis en bouquets.","Cuire 500g de penne 7 min puis ajouter brocolis 5 min dans la même eau.","Pendant ce temps, dans une sauteuse, chauffer 5 c. à soupe d'huile + 3 gousses d'ail haché 1 min.","Égoutter pâtes + brocolis. Verser dans la sauteuse.","Hors feu, ajouter 250g de ricotta + 80g de parmesan + 1 pincée de piment + un peu d'eau de cuisson.","Mélanger jusqu'à crémeux. Servir."] },

{ id:"fq55", nom:"Salade pâtes-poulet-tomates", mode:"kids", type:"diner", saison:["printemps","été"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Blanc de poulet cuit", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Mozza billes", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette balsamique", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 400g de penne 10 min al dente. Refroidir sous l'eau froide.","Couper 400g de poulet cuit, 300g de tomates cerises en 2, 200g de mozza en billes coupées en 2.","Mélanger dans un saladier.","Vinaigrette balsamique : 4 c. à soupe d'huile d'olive + 2 c. à soupe de balsamique + sel + poivre.","Mélanger à la salade. Basilic ciselé.","Mettre au frais 15 min. Servir."] },

{ id:"fq56", nom:"Soupe minute légumes surgelés", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Mélange légumes surgelés", qte:800, unite:"g", rayon:"Surgelés" },
    { nom:"Bouillon", qte:1.2, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 1 oignon.","Dans une casserole, chauffer 1 c. à soupe d'huile + oignon 3 min.","Ajouter 800g de mélange légumes surgelés + 1,2L de bouillon. Cuire 12 min.","Mixer au mixeur plongeant.","Ajouter 15cl de crème.","Servir avec persil ciselé."] },

{ id:"fq57", nom:"Pâtes fraîches au beurre & sauge", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:10, difficulte:1,
  ingredients:[
    { nom:"Pâtes fraîches", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre demi-sel", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Sauge fraîche", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Noisettes", qte:40, unite:"g", rayon:"Épicerie sucrée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Cuire 500g de pâtes fraîches 3 min.","Pendant ce temps, dans une sauteuse, faire fondre 100g de beurre demi-sel à feu moyen jusqu'à coloration noisette.","Ajouter 1/2 botte de sauge fraîche, faire frire 30 sec.","Égoutter les pâtes, les verser dans la sauteuse.","Mélanger avec 100g de parmesan.","Concasser 40g de noisettes torréfiées, parsemer. Servir."] },

{ id:"fq58", nom:"Tartare de tomates au basilic", mode:"us", type:"diner", saison:["été"], culture:"méditerranéen", temps:15, difficulte:1,
  ingredients:[
    { nom:"Tomates anciennes", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Basilic", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre balsamique", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain", qte:6, unite:"tranches", rayon:"Boulangerie" }
  ],
  etapes:["Couper 800g de tomates anciennes en petits dés. Les mettre dans une passoire, saler, laisser dégorger 10 min.","Pendant ce temps, ciseler 1 échalote très finement.","Toaster 6 tranches de pain.","Dans un saladier, mélanger tomates égouttées + échalote + 2 c. à soupe de câpres + basilic ciselé.","Arroser de 6 c. à soupe d'huile d'olive + 2 c. à soupe de balsamique.","Dresser au cercle dans chaque assiette. Pain grillé à côté. Servir frais."] },

{ id:"fq59", nom:"Filets de cabillaud à la moutarde", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:60, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C grill.","Mélanger 3 c. à soupe de moutarde + 15cl de crème + sel + poivre.","Disposer 700g de dos de cabillaud sur plaque tapissée.","Étaler le mélange moutarde-crème sur chaque pavé.","Parsemer 60g de chapelure + 1 noisette de beurre sur chaque.","Enfourner 12 min grill jusqu'à doré.","Cuire 800g de pdt vapeur en parallèle.","Servir."] },

{ id:"fq60", nom:"Pavé de bœuf, sauce roquefort", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pavés de bœuf", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Roquefort", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cognac", qte:3, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt en cubes sautées en parallèle 18 min.","Émincer 1 échalote.","Saisir 4 pavés de bœuf 2 min par face dans poêle bien chaude. Réserver.","Dans la poêle, suer échalote 1 min, flamber 3cl de cognac.","Ajouter 20cl de crème + 120g de roquefort émietté. Mijoter 3 min jusqu'à roquefort fondu.","Napper les pavés. Servir avec pdt sautées."] },

{ id:"pd16", nom:"Pain perdu brioche aux fruits rouges", mode:"both", type:"petit-dej", saison:["printemps","été"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Brioche tranches épaisses", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Lait", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Sucre", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vanille", qte:1, unite:"pincée", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Fruits rouges mélangés", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Sucre glace", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" }
  ],
  etapes:["La veille : couper la brioche rassise en tranches de 2cm.","Battre 3 œufs + 25cl de lait + 3 c. à soupe de sucre + 1 pincée de vanille.","Tremper chaque tranche 10 sec par face.","Faire fondre 30g de beurre dans une poêle à feu moyen. Cuire les tranches 2 min par face jusqu'à dorées.","Décongeler les fruits rouges si surgelés.","Dresser le pain perdu, ajouter fruits rouges, saupoudrer 2 c. à soupe de sucre glace.","Arroser de 4 c. à soupe de miel chaud. Servir."] },

{ id:"pd17", nom:"French toast au sirop d'érable & bacon", mode:"kids", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pain de mie épais", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cannelle", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Bacon", qte:8, unite:"tranches", rayon:"Boucherie" },
    { nom:"Sirop d'érable", qte:10, unite:"cl", rayon:"Épicerie sucrée" }
  ],
  etapes:["Faire griller 8 tranches de bacon à sec dans une poêle 5 min jusqu'à croustillantes.","Battre 3 œufs + 20cl de lait + 1 pincée de cannelle.","Tremper rapidement chaque tranche de pain de mie épais dans le mélange.","Faire fondre 40g de beurre dans une grande poêle. Cuire le pain perdu 2 min par face.","Servir : 2 tranches par personne + sirop d'érable + bacon."] },

{ id:"pd18", nom:"Tartines beurre salé & confiture maison", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:8, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne tranches", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre demi-sel", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Confiture de fruits", qte:100, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Pommes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Café", qte:4, unite:"tasses", rayon:"Boissons" }
  ],
  etapes:["Toaster 6 tranches de pain de campagne au grille-pain ou four 3 min.","Beurrer généreusement de beurre demi-sel pommade (80g pour les 6 tranches).","Étaler 100g de confiture de fruits au choix.","Couper 2 pommes en tranches fines.","Servir avec café au lait, jus d'orange ou thé."] },

{ id:"pd19", nom:"Granola maison aux fruits secs", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Flocons d'avoine", qte:100, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Amandes", qte:40, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Raisins secs", qte:40, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Banane", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Yaourt grec", qte:4, unite:"pots", rayon:"Crèmerie" }
  ],
  etapes:["Verser 100g de flocons d'avoine dans une casserole avec 40cl de lait. Cuire 5 min à feu doux en remuant.","Ajouter 4 c. à soupe de miel, mélanger.","Couper 2 bananes en rondelles.","Concasser 40g d'amandes.","Répartir le porridge dans 4 bols. Garnir : yaourt grec dessus, bananes, amandes, raisins secs.","Servir tiède."] },

{ id:"pd20", nom:"Bowl açaï banane", mode:"us", type:"petit-dej", saison:["printemps","été"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Açaï surgelé", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Banane", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Lait d'amande", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Granola", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Myrtilles", qte:150, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Coco râpée", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" }
  ],
  etapes:["Mixer 200g d'açaï surgelé + 2 bananes + 30cl de lait d'amande + miel en sorbet épais.","Si trop épais, ajouter 1-2 c. à soupe de lait.","Verser dans 4 bols.","Couper 1 banane en rondelles.","Disposer : granola en bande, banane, myrtilles, coco râpée.","Servir immédiatement."] },

{ id:"pd21", nom:"Œufs Florentine (épinards-mornay)", mode:"us", type:"petit-dej", saison:["printemps","automne","hiver"], culture:"français", temps:20, difficulte:2,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Épinards frais", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Gruyère", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Muffins anglais", qte:3, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Pour la mornay : faire fondre 60g de beurre, ajouter 30g de farine, mélanger. Verser 30cl de lait en fouettant. Cuire 3 min. Hors feu : 100g de gruyère + muscade.","Faire tomber 400g d'épinards frais 3 min dans 30g de beurre. Égoutter.","Pocher 6 œufs dans eau frémissante vinaigrée 3 min.","Toaster 3 muffins anglais coupés en deux.","Sur chaque demi-muffin : épinards + œuf poché + mornay généreuse.","Gratiner 3 min sous le grill. Servir aussitôt."] },

{ id:"pd22", nom:"Smoothie épinards-banane-citron", mode:"us", type:"petit-dej", saison:["printemps","été","automne"], culture:"international", temps:5, difficulte:1,
  ingredients:[
    { nom:"Épinards frais", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Banane", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pomme", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Yaourt grec", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Gingembre", qte:1, unite:"morceau", rayon:"Fruits & Légumes" }
  ],
  etapes:["Tout au blender : 100g d'épinards lavés + 2 bananes + jus d'1 citron + 1 pomme + 150g de yaourt grec + 20cl de lait + 1 morceau de gingembre.","Mixer 1 min à puissance max jusqu'à homogène et lisse.","Si trop épais, ajouter eau ou lait. Goûter, rectifier (miel si besoin).","Verser dans 4 verres avec glaçons.","Servir aussitôt."] },

{ id:"pd23", nom:"Œufs sur le plat & jambon, pain frotté", mode:"kids", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:10, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon blanc", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Pain de campagne", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four ou le grille-pain.","Toaster 6 tranches de pain de campagne.","Couper 2 tomates en rondelles. Frotter rapidement chaque toast d'une demi-gousse d'ail et 1/2 tomate.","Faire fondre 40g de beurre dans une poêle à feu moyen. Cuire 6 œufs au plat (saler le blanc).","Réchauffer 4 tranches de jambon dans la même poêle 30 sec.","Dresser : pain + jambon + œuf au plat. Servir aussitôt."] },

{ id:"pd24", nom:"Crêpes sucrées Suzette express", mode:"kids", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Crêpes nature", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Oranges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Grand Marnier (option)", qte:3, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Presser 2 oranges, zester.","Plier les 8 crêpes en triangles (en 4).","Dans une grande poêle, faire fondre 60g de beurre. Ajouter 4 c. à soupe de sucre + jus d'orange + zeste. Caraméliser 3 min jusqu'à sirop.","Plonger les crêpes pliées dans le caramel, retourner 30 sec chaque.","Optionnel : flamber 3 c. à soupe de Grand Marnier.","Servir aussitôt avec une boule de glace vanille."] },

{ id:"pd25", nom:"Pancakes ricotta-citron", mode:"us", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Ricotta", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Farine", qte:100, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Sirop d'érable", qte:5, unite:"cl", rayon:"Épicerie sucrée" }
  ],
  etapes:["Râper le zeste d'1 citron et presser le jus.","Séparer les blancs des jaunes des 4 œufs.","Mélanger 250g de ricotta + jaunes + 15cl de lait + 100g de farine + 2 c. à soupe de sucre + zeste.","Monter les blancs en neige ferme.","Incorporer délicatement les blancs au mélange ricotta.","Faire fondre 40g de beurre dans une poêle.","Cuire des petits pancakes (1 louche) 2 min par face.","Servir avec sirop d'érable + jus de citron."] },

{ id:"fw01", nom:"Daube avignonnaise au vin de Provence", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Bœuf à braiser", qte:1.2, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge Côtes-du-Rhône", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Olives noires", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Zeste d'orange", qte:1, unite:"orange", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner viande au vin 12h.","Saisir, lardons, légumes, mijoter 3h.","Olives + zeste 15 min en fin.","Tagliatelles."] },

{ id:"fw02", nom:"Pieds de cochon panés", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:3,
  ingredients:[
    { nom:"Pieds de cochon précuits", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Pdt vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Sauce gribiche", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Pocher 4 pieds de cochon précuits 30 min dans bouillon. Égoutter, refroidir.","Préchauffer le four à 200°C.","Badigeonner les pieds de moutarde.","Préparer panure à l'anglaise : farine, 2 œufs battus, 200g de chapelure.","Paner chaque pied.","Faire fondre 80g de beurre dans une poêle, dorer les pieds 5 min par face.","Cuire 800g de pdt vapeur en parallèle.","Servir : pied pané + pdt + sauce gribiche."] },

{ id:"fw03", nom:"Tripoux d'Auvergne", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:240, difficulte:3,
  ingredients:[
    { nom:"Tripes de mouton", qte:1, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin blanc", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pdt", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Tripes nettoyées, ficelées.","Cuire 4h dans bouillon aromatique.","Réduire, sauce.","Pdt vapeur."] },

{ id:"fw04", nom:"Poularde demi-deuil aux truffes", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:3,
  ingredients:[
    { nom:"Poularde", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Lamelles de truffe", qte:30, unite:"g", rayon:"Épicerie salée" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poireaux", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon de volaille", qte:1.5, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 200°C.","Glisser des lamelles de truffe sous la peau de 1 poularde.","Beurrer la poularde, sel.","Couvrir d'1,5L de bouillon de volaille + carottes + poireaux dans une grande cocotte.","Pocher 1h, en arrosant régulièrement.","Sauce suprême : prélever 30cl de bouillon, ajouter 20cl de crème + 40g de beurre.","Servir poularde + légumes + sauce."] },

{ id:"fw05", nom:"Saumon en papillote provençale", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Courgettes", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates cerises", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Couper 1 courgette et 300g de tomates cerises en julienne / morceaux.","Pour chaque pavé : papier sulfurisé, légumes en lit, saumon, 1 quartier de citron, herbes, huile, sel.","Sceller chaque papillote en pliant les bords.","Enfourner 18 min.","Servir directement dans les papillotes."] },

{ id:"fw06", nom:"Filets de bar en papillote, fenouil-citron", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Filets de bar", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Fenouil", qte:1, unite:"bulbe", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Olives noires", qte:60, unite:"g", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Thym", qte:4, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Émincer 1 fenouil très finement.","Pour chaque papillote : papier sulfurisé, fenouil en lit, filet de bar, citron en rondelles, olives, thym, huile.","Sceller en pliant les bords.","Enfourner 12 min.","Ouvrir à table."] },

{ id:"fw07", nom:"Coquilles Saint-Jacques au safran", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Saint-Jacques", qte:16, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Riz pilaf", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Pour le risotto safran : suer 1 échalote, nacrer 280g de riz Carnaroli, déglacer 15cl de vin, ajouter 1L de bouillon safrané louche par louche 18 min. Mantecare : beurre + parmesan.","Sécher les 16 Saint-Jacques au papier.","Saisir 1 min par face dans 30g de beurre noisette.","Dresser : risotto + Saint-Jacques + jus de cuisson."] },

{ id:"fw08", nom:"Pavé de cabillaud, sauce vierge", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:25, difficulte:2,
  ingredients:[
    { nom:"Dos de cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Tomates", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive vierge", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper 3 tomates en très petits dés, presser le jus d'1 citron.","Émincer 4 feuilles de basilic.","Préparer sauce vierge : tomates en dés + citron + 10cl d'huile d'olive + basilic + câpres + sel.","Cuire 700g de cabillaud 4 min par face dans poêle huilée.","Cuire 800g de pdt vapeur en parallèle.","Servir : cabillaud + pdt + sauce vierge."] },

{ id:"fw09", nom:"Lapin chasseur", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Lapin en morceaux", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Champignons", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Tomates", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pâtes fraîches", qte:500, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Couper 1 lapin en morceaux. Émincer 2 oignons.","Saisir le lapin 5 min toutes faces dans une cocotte. Flamber 5cl de cognac.","Sortir le lapin. Suer oignons.","Ajouter 400g de champignons en quartiers + 3 tomates en dés + 25cl de vin blanc + bouquet garni.","Remettre lapin. Mijoter 1h.","Cuire 500g de tagliatelles fraîches.","Servir lapin + sauce + tagliatelles."] },

{ id:"fw10", nom:"Souris d'agneau aux herbes de Provence", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Souris d'agneau", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Ail", qte:1, unite:"tête", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Herbes de Provence", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Olives noires", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pdt grenailles", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 150°C.","Saisir 6 souris d'agneau 5 min toutes faces.","Ajouter 1 tête d'ail entière + 30cl de vin blanc + 40cl de tomates + 2 c. à soupe d'herbes de Provence.","Couvrir, enfourner 2h30.","Ajouter 100g d'olives noires 15 min avant la fin.","Servir avec 800g de grenailles rôties."] },

{ id:"fw11", nom:"Daube de joue de porc cidre", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Joues de porc", qte:1.2, unite:"g", rayon:"Boucherie" },
    { nom:"Cidre brut", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes Reinette", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir 1,2kg de joues de porc + 200g de lardons.","Émincer 3 oignons + 4 carottes, suer 8 min.","Déglacer 75cl de cidre + bouquet garni.","Mijoter 2h30 doux.","Ajouter 4 pommes en quartiers 20 min en fin.","Cuire 800g de pdt vapeur. Servir."] },

{ id:"fw12", nom:"Pintade aux pommes & calvados", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:75, difficulte:2,
  ingredients:[
    { nom:"Pintade en morceaux", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Pommes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Calvados", qte:8, unite:"cl", rayon:"Boissons" },
    { nom:"Cidre", qte:25, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Saisir 4 cuisses de pintade dans 30g de beurre 5 min côté peau. Réserver.","Émincer 3 échalotes, suer 3 min.","Couper 6 pommes en quartiers, ajouter à la cocotte avec calvados flambé (8cl).","Déglacer 25cl de cidre.","Remettre pintade. Mijoter 35 min couvert.","Ajouter 20cl de crème, mijoter 5 min.","Servir avec pdt vapeur."] },

{ id:"fw13", nom:"Faux-filet aux échalotes confites", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:40, difficulte:2,
  ingredients:[
    { nom:"Faux-filet", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vin rouge", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Fond de veau", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Sucre", qte:1, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Préchauffer le four à 220°C. Cuire 800g de pdt vapeur 18 min.","Émincer 400g d'échalotes. Confire dans 50g de beurre + 1 c. à café de sucre 30 min à feu doux jusqu'à brunes.","Saler 800g de faux-filet. Saisir 3 min par face dans poêle bien chaude. Réserver.","Déglacer 20cl de vin rouge + 15cl de fond. Réduire.","Monter au beurre. Incorporer les échalotes confites.","Trancher faux-filet, napper, servir avec pdt."] },

{ id:"fw14", nom:"Côte de bœuf à l'os, sel de Guérande", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:40, difficulte:2,
  ingredients:[
    { nom:"Côte de bœuf", qte:1.2, unite:"kg", rayon:"Boucherie" },
    { nom:"Gros sel", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Tempérer 1h.","Pdt rôties + ail + romarin 30 min.","Côte 12 min total au four 220°C, repos 10 min.","Beurre maître d'hôtel, trancher."] },

{ id:"fw15", nom:"Coq au vin rouge", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:120, difficulte:2,
  ingredients:[
    { nom:"Coq en morceaux", qte:1.8, unite:"kg", rayon:"Boucherie" },
    { nom:"Vin rouge", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mariner 1,8kg de coq en morceaux 12h dans 75cl de vin rouge + carottes + oignons + bouquet.","Sécher la viande. Saisir 5 min dans une cocotte avec 200g de lardons.","Fariner légèrement (2 c. à soupe).","Déglacer avec la marinade filtrée, mijoter 1h30 couvert.","Sauter 300g de champignons + 300g de petits oignons à part.","Les ajouter à la cocotte 20 min avant la fin.","Cuire 800g de pdt vapeur. Servir."] },

{ id:"fw16", nom:"Andouillette grillée à la moutarde", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Andouillettes", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Moutarde forte", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Frites maison", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 1kg de pdt en bâtonnets pour frites : 2 bains à 150 puis 180°C.","Pendant ce temps, piquer 4 andouillettes. Badigeonner de moutarde forte.","Cuire au grill 12 min en retournant.","Salade vinaigrée à part.","Servir andouillettes + frites + moutarde + salade."] },

{ id:"fw17", nom:"Boudin blanc aux pommes", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Boudins blancs", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes Reinette", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Purée", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Éplucher 1kg de pdt, cuire 20 min eau salée. Écraser avec 20cl de lait + 60g de beurre + muscade.","Couper 4 pommes en quartiers. Sauter dans 30g de beurre 8 min.","Flamber 5cl de calvados sur les pommes.","Ajouter 10cl de crème, mélanger.","Cuire 6 boudins blancs 5 min par face dans poêle peu beurrée.","Servir : boudin + pommes + purée."] },

{ id:"fw18", nom:"Cervelle d'agneau aux câpres", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:30, difficulte:3,
  ingredients:[
    { nom:"Cervelle d'agneau", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Câpres", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cervelle dégorgée et pochée 5 min.","Beurre noisette + câpres + citron.","Persil ciselé.","Pdt vapeur."] },

{ id:"fw19", nom:"Pommes Dauphine maison", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pâte à choux (eau + beurre + farine + œufs)", qte:1, unite:"portion", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Huile friture", qte:1, unite:"litre", rayon:"Épicerie salée" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Purée + pâte à choux.","Former quenelles.","Frire à 180°C.","Servir."] },

{ id:"fw20", nom:"Aiguillettes de canard, sauce miel-balsamique", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:2,
  ingredients:[
    { nom:"Aiguillettes de canard", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes grenailles", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Rôtir 800g de grenailles 30 min : huile + sel.","Saisir 700g d'aiguillettes de canard 3 min par face dans 1 c. à soupe d'huile. Repos.","Dans la poêle, suer 1 échalote.","Ajouter 3 c. à soupe de miel + 3 c. à soupe de balsamique. Caraméliser 2 min.","Monter avec 40g de beurre.","Trancher aiguillettes. Dresser avec grenailles, napper."] },

{ id:"fw21", nom:"Magret en croûte d'épices", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Magrets de canard", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Mélange 4 épices", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fond de canard", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre Anna", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C. Pommes Anna 40 min.","Quadriller 2 magrets.","Côté peau dans poêle froide, allumer feu moyen. Cuire 7 min, retourner 4 min.","Mélanger 2 c. à soupe de miel + 2 c. à soupe de vinaigre + 2 c. à soupe d'épices.","Badigeonner les magrets, glacer 1 min sous le grill.","Trancher, servir avec Anna + sauce fond + vinaigre."] },

{ id:"fw22", nom:"Filets de sole meunière", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:2,
  ingredients:[
    { nom:"Filets de sole", qte:8, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Farine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur.","Fariner 4 filets de sole, secouer l'excès.","Cuire dans 100g de beurre mousseux 2 min par face.","Beurre noisette : 30g de beurre + citron + persil hors feu.","Servir sole + pdt + beurre noisette."] },

{ id:"fw23", nom:"Rougets entiers au four, herbes", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Rougets", qte:6, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Thym + romarin", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes vapeur", qte:600, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Vider 6 rougets. Glisser dans le ventre : citron en quartiers, ail, thym, romarin.","Disposer sur plaque, huile d'olive + sel.","Cuire 800g de pdt vapeur en parallèle.","Enfourner les rougets 18 min.","Servir avec pdt + citron."] },

{ id:"fw24", nom:"Brandade de morue parmentier", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Morue dessalée", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:40, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Pocher morue.","Pdt cuites, écrasées.","Mélanger morue + pdt + ail + huile + crème.","Chapelure + four 15 min."] },

{ id:"fw25", nom:"Lapin à la moutarde rôti", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:75, difficulte:1,
  ingredients:[
    { nom:"Lapin entier en morceaux", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Moutarde", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Pdt vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Badigeonner moutarde + thym.","Four 1h à 180°C.","Sauce : jus + crème + moutarde.","Pdt vapeur."] },

{ id:"fw26", nom:"Quiche au saumon-épinards", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Saumon frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Épinards", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Gruyère", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 180°C.","Foncer un moule de pâte brisée, piquer.","Émincer 4 poireaux, fondre dans 30g de beurre 12 min jusqu'à compote.","Couper 400g de saumon en cubes.","Battre 4 œufs + 25cl de crème + 15cl de lait + aneth ciselé + sel + poivre.","Étaler poireaux + saumon dans la pâte. Verser l'appareil.","Parsemer 80g de gruyère.","Enfourner 35 min. Servir tiède avec salade."] },

{ id:"fw27", nom:"Tartiflette montagnarde", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Reblochon", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Lardons", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Pdt 20 min cuites.","Lardons + oignons + vin.","Plat : pdt + lardons + reblochon coupé en deux.","Four 25 min à 200°C."] },

{ id:"fw28", nom:"Croûte aux morilles", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:45, difficulte:3,
  ingredients:[
    { nom:"Morilles séchées", qte:50, unite:"g", rayon:"Épicerie salée" },
    { nom:"Volaille (suprêmes)", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Crème", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin jaune (option)", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pain brioché", qte:4, unite:"tranches", rayon:"Boulangerie" }
  ],
  etapes:["Réhydrater morilles, garder jus.","Volaille saisie.","Échalote + jus + crème + morilles.","Sur croûte de brioche grillée."] },

{ id:"fw29", nom:"Pâté en croûte maison", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:240, difficulte:3,
  ingredients:[
    { nom:"Pâte brisée", qte:500, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Veau haché", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Porc haché", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Foies de volaille", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pistaches", qte:50, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Gelée", qte:1, unite:"sachet", rayon:"Épicerie salée" }
  ],
  etapes:["Farce : viandes + cognac + œufs + pistaches + sel + poivre.","Foncer moule, garnir, refermer pâte.","Four 1h30 à 180°C.","Gelée par cheminée, repos 12h."] },

{ id:"fw30", nom:"Filets de hareng-pommes-vinaigre", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Filets de hareng marinés", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignons rouges", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette moutarde", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt vapeur, tiédir.","Couper en tranches.","Hareng + oignon + vinaigrette.","Ciboulette."] },

{ id:"fw31", nom:"Andouille de Vire grillée, écrasé pdt", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Andouille de Vire", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde à l'ancienne", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt 20 min, écraser au beurre.","Andouille tranchée, grillée 5 min.","Moutarde à part.","Salade."] },

{ id:"fw32", nom:"Soupe de poisson niçoise", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Poissons de roche", qte:1, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Fenouil", qte:1, unite:"bulbe", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Croûtons", qte:200, unite:"g", rayon:"Boulangerie" },
    { nom:"Rouille", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Gruyère", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Suer oignons, fenouil, tomates.","Poisson 30 min, mixer, passer.","Safran, croûtons.","Rouille et gruyère à table."] },

{ id:"fw33", nom:"Cassolette d'escargots de Bourgogne", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Escargots", qte:36, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:8, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Beurre persillé : beurre pommade + ail + persil hachés.","Escargots dans cassolettes.","Beurre persillé dessus.","Four 8 min à 220°C, pain grillé."] },

{ id:"fw34", nom:"Tarte aux fruits de mer", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Crevettes", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Moules cuites", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Saumon", qte:200, unite:"g", rayon:"Poissonnerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Comté", qte:80, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Foncer.","Fruits de mer.","Œufs + crème + aneth + sel.","Four 35 min à 180°C."] },

{ id:"fw35", nom:"Tatin de pommes de terre", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:50, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt précuites tranchées.","Beurre + sucre dans moule, lardons + pdt.","Pâte sur le tout.","Four 25 min à 200°C, retourner."] },

{ id:"fw36", nom:"Soupe à la châtaigne", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:50, difficulte:2,
  ingredients:[
    { nom:"Châtaignes cuites", qte:600, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bouillon de volaille", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Lardons", qte:100, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Suer oignon + lardons.","Châtaignes + bouillon 20 min.","Mixer, crémer.","Dresser."] },

{ id:"fw37", nom:"Salade gourmande sud-ouest", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Mesclun", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Foies de volaille", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Gésiers confits", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Magret fumé", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Tomates cerises", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pignons", qte:40, unite:"g", rayon:"Épicerie salée" },
    { nom:"Vinaigrette noix", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Foies poêlés 2 min/face.","Gésiers tiédis.","Dresser mesclun + viandes + tomates.","Vinaigrette."] },

{ id:"fw38", nom:"Filet de saumon en croûte d'agrumes", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:2,
  ingredients:[
    { nom:"Filet de saumon", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Orange", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pamplemousse", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Mie de pain", qte:100, unite:"g", rayon:"Boulangerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mixer mie + beurre + zestes + aneth.","Saumon sur plaque, garnir croûte.","Four 18 min à 200°C.","Suprêmes d'agrumes."] },

{ id:"fw39", nom:"Confit de canard maison", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Cuisses de canard", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Sel", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Graisse de canard", qte:800, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Thym + laurier", qte:1, unite:"bouquet", rayon:"Fruits & Légumes" },
    { nom:"Pdt grenailles", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saler cuisses 12h, rincer.","Confire dans graisse 2h30 à 90°C.","Conserver ou utiliser.","Faire croustiller 15 min, grenailles sarladaises."] },

{ id:"fw40", nom:"Filet mignon en croûte de tapenade", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:40, difficulte:2,
  ingredients:[
    { nom:"Filets mignons de porc", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Tapenade", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Œuf jaune", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Ratatouille", qte:1, unite:"portion", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir filets, refroidir.","Tapenade, envelopper de pâte.","Dorer, four 22 min à 200°C.","Ratatouille."] },

{ id:"bi61", nom:"Tartare de saumon mariné citron-aneth", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:20, difficulte:2,
  ingredients:[
    { nom:"Filet de saumon extra-frais", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Saumon en dés citronné.","Échalote, câpres, aneth, huile.","Dresser au cercle.","Pain grillé."] },

{ id:"bi62", nom:"Soufflé au comté", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Comté affiné", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:50, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Béchamel.","Hors feu : jaunes + comté.","Blancs montés, incorporer.","Four 30 min à 200°C."] },

{ id:"bi63", nom:"Pavé de daurade royale, beurre vanille", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Pavés de daurade", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Vanille", qte:1, unite:"gousse", rayon:"Épicerie sucrée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Riz pilaf", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Échalote + vin réduit, vanille fendue.","Monter au beurre.","Daurade côté peau 4 min + 1 min.","Riz, napper."] },

{ id:"bi64", nom:"Pluma ibérique aux figues", mode:"us", type:"diner", saison:["été","automne"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Pluma de cochon", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Figues fraîches", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vinaigre balsamique", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Polenta", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Lait", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Polenta crémeuse.","Figues rôties miel + balsamique 8 min.","Pluma 3 min/face, repos.","Trancher sur polenta + figues."] },

{ id:"bi65", nom:"Saumon mi-cuit à la framboise", mode:"us", type:"diner", saison:["été","printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Framboises", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre framboise", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Mâche", qte:150, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Saumon à l'unilatéral 5 min.","Coulis : framboises + sucre + vinaigre.","Mâche en bouquet.","Dresser, napper de coulis."] },

{ id:"bi66", nom:"Risotto encre de seiche & calamars", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Riz Carnaroli", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Calamars nettoyés", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Encre de seiche", qte:2, unite:"sachets", rayon:"Épicerie salée" },
    { nom:"Bouillon poisson", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Vin blanc", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Nacrer riz, vin, bouillon avec encre.","Calamars en anneaux sautés à part.","Mantecare.","Persil."] },

{ id:"bi67", nom:"Pintade au foie gras & raisins", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:75, difficulte:3,
  ingredients:[
    { nom:"Pintade", qte:1.5, unite:"kg", rayon:"Boucherie" },
    { nom:"Foie gras frais", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Raisins blancs", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Vin blanc moelleux", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Farcir pintade de foie gras.","Cognac flambé, vin, raisins.","Four 1h à 180°C.","Crème en sauce."] },

{ id:"bi68", nom:"Côte de veau, sauce aux morilles", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:40, difficulte:3,
  ingredients:[
    { nom:"Côtes de veau", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Morilles séchées", qte:40, unite:"g", rayon:"Épicerie salée" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vin jaune", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Polenta", qte:200, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Réhydrater morilles.","Polenta crémeuse.","Côtes 4 min/face.","Sauce morilles + vin jaune + crème."] },

{ id:"bi69", nom:"Tartare de bœuf-betterave", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Filet de bœuf", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Betterave cuite", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Moutarde", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile noix", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pain", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Bœuf et betterave en petits dés.","Mélanger avec condiments.","Dresser au cercle.","Pain grillé."] },

{ id:"bi70", nom:"Filet de bar en croûte de pistaches", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Filets de bar", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Pistaches non salées", qte:100, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Mie de pain", qte:60, unite:"g", rayon:"Boulangerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mixer pistaches + mie + beurre + persil.","Bar côté peau saisi, croûte sur le dessus.","Four 10 min à 200°C.","Pdt vapeur, citron."] },

{ id:"fv01", nom:"Pot-au-feu express", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Bœuf braisé", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Carottes", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poireaux", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Navet", qte:2, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Os à moelle", qte:2, unite:"pièces", rayon:"Boucherie" }
  ],
  etapes:["LA VEILLE : couper 1,2kg de bœuf en gros cubes. Mariner dans 75cl de vin rouge avec carottes en rondelles, 3 oignons en quartiers, ail, herbes, zeste d'orange.","Jour J : sortir le bœuf, sécher au papier. Garder la marinade.","Dans une cocotte, faire revenir 200g de lardons 4 min. Réserver.","Saisir la viande dans le gras des lardons 5 min toutes faces. Saler.","Filtrer la marinade, la verser. Ajouter bouquet garni + lardons + zeste d'orange.","Mijoter 3h à feu très doux ou four 150°C. Vérifier régulièrement.","Ajouter 150g d'olives noires 15 min avant la fin.","Cuire 500g de tagliatelles 9 min al dente.","Servir la daube sur les tagliatelles."] },

{ id:"fv02", nom:"Daube de joue de bœuf au porto", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:180, difficulte:2,
  ingredients:[
    { nom:"Joues de bœuf", qte:1.2, unite:"g", rayon:"Boucherie" },
    { nom:"Porto rouge", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Vin rouge", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner au porto 4h.","Saisir, échalotes, vin + bouillon.","Mijoter 2h30.","Champignons en fin, tagliatelles."] },

{ id:"fv03", nom:"Carré d'agneau persillé", mode:"us", type:"diner", saison:["printemps"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Carrés d'agneau", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Mie", qte:100, unite:"g", rayon:"Boulangerie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes nouvelles", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Persillade : mie + persil + ail + beurre.","Saisir carrés, moutarde + persillade.","Four 12 min à 220°C.","Pommes nouvelles."] },

{ id:"fv04", nom:"Côte de porc à la sauge", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Côtes de porc", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Sauge fraîche", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes Reinette", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt sautées en parallèle.","Côtes saisies au beurre + sauge 4 min/face.","Pommes en quartiers ajoutées.","Servir ensemble."] },

{ id:"fv05", nom:"Cuisses de poulet sauce moutarde-miel", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:50, difficulte:1,
  ingredients:[
    { nom:"Cuisses de poulet", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Moutarde", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Bouillon", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mariner poulet moutarde + miel + thym 15 min.","Cuisses + pdt sur plaque.","Four 40 min à 200°C, arroser.","Sauce bouillon + reste marinade."] },

{ id:"fv06", nom:"Émincé de bœuf-roquefort", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Bavette de bœuf", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Roquefort", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cognac", qte:3, unite:"cl", rayon:"Boissons" },
    { nom:"Pâtes fraîches", qte:500, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Pâtes 3 min.","Bavette en lanières 3 min.","Échalote, cognac flambé, crème + roquefort.","Mélanger avec pâtes."] },

{ id:"fv07", nom:"Filets de poulet farcis chèvre-épinards", mode:"both", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:40, difficulte:2,
  ingredients:[
    { nom:"Blancs de poulet", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Chèvre frais", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Épinards", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Bouillon", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Épinards fondus + ail.","Inciser poulet, farcir chèvre + épinards.","Saisir, four 20 min à 200°C.","Pdt vapeur."] },

{ id:"fv08", nom:"Veau Marengo", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Veau en cubes", qte:1, unite:"g", rayon:"Boucherie" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Saisir veau, oignons, tomates.","Vin + bouquet, mijoter 1h.","Champignons en fin.","Riz."] },

{ id:"fv09", nom:"Boulettes au paprika & riz", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Paprika doux", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Boulettes formées.","Dorer, oignon + paprika.","Tomates + crème, mijoter 20 min.","Riz."] },

{ id:"fv10", nom:"Médaillons de veau, sauce champignons", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Médaillons de veau", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Champignons", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Cognac", qte:3, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Pâtes fraîches", qte:500, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Médaillons 3 min/face.","Champignons + échalote.","Cognac flambé + crème.","Pâtes."] },

{ id:"fv11", nom:"Mouton bourguignon", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:180, difficulte:2,
  ingredients:[
    { nom:"Épaule de mouton", qte:1.2, unite:"g", rayon:"Boucherie" },
    { nom:"Vin rouge", qte:60, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Carottes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Petits oignons", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir mouton + lardons.","Légumes + vin, 2h30.","Champignons en fin.","Pdt vapeur."] },

{ id:"fv12", nom:"Saucisses-pommes de terre boulangères", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Saucisses fumées", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouillon", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Pdt + oignons en rondelles dans plat.","Bouillon + thym + beurre.","Saucisses sur le dessus.","Four 50 min à 180°C."] },

{ id:"fv13", nom:"Cabillaud rôti, sauce verte", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Persil + ciboulette + estragon", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:10, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sauce verte au mixer.","Cabillaud rôti 12 min à 200°C.","Pdt vapeur.","Napper sauce verte."] },

{ id:"fv14", nom:"Sauté de veau aux olives", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Sauté de veau", qte:1, unite:"g", rayon:"Boucherie" },
    { nom:"Olives vertes", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Tomates concassées", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pâtes", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Saisir veau.","Oignons + tomates + vin + bouquet, 1h.","Olives + citron 15 min en fin.","Pâtes."] },

{ id:"fv15", nom:"Filet mignon aux pruneaux", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:45, difficulte:2,
  ingredients:[
    { nom:"Filets mignons", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pruneaux", qte:250, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Vin rouge", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes Anna", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Tremper pruneaux dans vin.","Pommes Anna au four.","Filets saisis, four 18 min à 200°C.","Sauce pruneaux + crème."] },

{ id:"fv16", nom:"Coquilles Saint-Jacques au curry doux", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Saint-Jacques", qte:16, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Curry doux", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Lait de coco", qte:20, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Riz pilaf.","Échalote + curry + vin + lait coco.","Saint-Jacques 1 min/face.","Sauce, dresser."] },

{ id:"fv17", nom:"Pavé de bœuf, sauce poivre vert", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:2,
  ingredients:[
    { nom:"Pavés de bœuf", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Poivre vert en saumure", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cognac", qte:4, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Frites maison", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Frites.","Pavés 2 min/face.","Échalote, cognac flambé, crème + poivre.","Frites + napper."] },

{ id:"fv18", nom:"Cassoulet express en cocotte", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:1,
  ingredients:[
    { nom:"Haricots blancs en boîte", qte:3, unite:"boîtes", rayon:"Épicerie salée" },
    { nom:"Cuisses de canard confit", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Saucisses de Toulouse", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Tomates concassées", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Chapelure", qte:60, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Suer lardons + oignons + ail + tomates.","Haricots + confit + saucisses.","Mijoter 30 min.","Chapelure, gratiner 25 min."] },

{ id:"fv19", nom:"Brochettes de poulet citron-thym", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet en cubes", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pic à brochettes", qte:8, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner 20 min.","Embrocher.","Griller 12 min retourner.","Riz à part."] },

{ id:"fv20", nom:"Galettes de pommes de terre & jambon", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Comté râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Ciboulette", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Râper pdt.","Mélanger + œufs + jambon + fromage + ciboulette.","Cuire en galettes 4 min/face.","Servir."] },

{ id:"fv21", nom:"Soupe de poissons façon bouillabaisse", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:75, difficulte:3,
  ingredients:[
    { nom:"Poissons mélangés", qte:1.5, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Fenouil", qte:1, unite:"bulbe", rayon:"Fruits & Légumes" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Pastis", qte:3, unite:"cl", rayon:"Boissons" },
    { nom:"Rouille", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Suer légumes + ail.","Poissons + safran + pastis + eau, 40 min.","Mixer, passer.","Croûtons rouille à part."] },

{ id:"fv22", nom:"Civet de lapin au sang", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:120, difficulte:3,
  ingredients:[
    { nom:"Lapin en morceaux + sang", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Vin rouge", qte:75, unite:"cl", rayon:"Boissons" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Petits oignons", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Champignons", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Saisir lapin + lardons.","Vin + légumes + bouquet 1h30.","Lier au sang hors feu.","Tagliatelles."] },

{ id:"fv23", nom:"Tartine fromage à raclette gratinée", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Fromage à raclette", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Cornichons", qte:6, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Toaster pain.","Jambon + raclette dessus.","Grill 5 min jusqu'à fondu.","Cornichons + salade."] },

{ id:"fv24", nom:"Steak haché-frites maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Huile friture", qte:80, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 220°C.","Éplucher 1kg de pommes de terre, couper en bâtonnets épais. Éponger au torchon.","Étaler en une couche sur plaque tapissée. Arroser de 3 c. à soupe d'huile, sel. Cuire 25 min en retournant.","Pendant ce temps, sortir les steaks 10 min avant cuisson.","Saler les steaks juste avant cuisson. Saisir 2 min par face dans poêle SANS matière grasse.","Préparer beurre maître d'hôtel : 30g de beurre pommade + persil + jus de citron + sel.","Préparer salade vinaigrette.","Dresser : steak + beurre maître d'hôtel + frites + salade."] },

{ id:"fv25", nom:"Sole grenobloise", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:2,
  ingredients:[
    { nom:"Filets de sole", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Câpres", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron pelé à vif", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Croûtons", qte:80, unite:"g", rayon:"Boulangerie" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur 18 min.","Fariner 8 filets de sole (60g de farine + sel), tapoter pour ôter l'excès.","Dans une grande poêle, faire fondre 60g de beurre à feu moyen.","Cuire les filets 2 min par face, en 2 fournées si besoin. Réserver au chaud.","Dans la même poêle, faire fondre 40g de beurre supplémentaire jusqu'à coloration noisette.","Hors feu, ajouter jus de 2 citrons + persil ciselé.","Napper le poisson. Servir avec pdt."] },

{ id:"fv26", nom:"Filet de truite, beurre aux amandes", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Filets de truite", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Amandes effilées", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur 18 min.","Fariner légèrement 4 filets de truite, secouer.","Dans une grande poêle, faire fondre 80g de beurre. Cuire les filets 3 min par face.","Pendant ce temps, torréfier 80g d'amandes effilées 2 min à sec dans une autre poêle.","Réserver le poisson au chaud.","Dans la poêle du poisson, ajouter les amandes + jus d'1 citron.","Napper le poisson, persil ciselé. Servir avec pdt."] },

{ id:"fv27", nom:"Pintade au chou", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:75, difficulte:1,
  ingredients:[
    { nom:"Pintade en morceaux", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Chou vert", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Lardons", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Bouillon", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir pintade.","Lardons + oignons + chou.","Vin + bouillon, 1h.","Pdt vapeur."] },

{ id:"fv28", nom:"Saucisse de Toulouse aux lentilles", mode:"both", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:60, difficulte:1,
  ingredients:[
    { nom:"Saucisses de Toulouse", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Lentilles vertes", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Lentilles 25 min.","Lardons + oignon + carottes.","Saucisses cuites 20 min.","Mélanger."] },

{ id:"fv29", nom:"Côte de veau, sauce moutarde-estragon", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Côtes de veau", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Estragon", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Risotto blanc", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Risotto.","Côtes 4 min/face.","Vin + crème + moutarde + estragon.","Napper."] },

{ id:"fv30", nom:"Aile de raie au beurre noir", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:2,
  ingredients:[
    { nom:"Ailes de raie", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Vinaigre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur en parallèle.","Pendant ce temps, couper en lanières 400g de hareng mariné. Émincer 2 oignons rouges en rondelles.","Préparer vinaigrette : 1 c. à café de moutarde + 1 c. à soupe de vinaigre + 3 c. à soupe d'huile.","Disposer pdt en rondelles tièdes dans le plat de service.","Couvrir de hareng + oignons.","Arroser de vinaigrette.","Parsemer ciboulette. Servir tiède ou froid."] },

{ id:"fv31", nom:"Magret aux poires & roquefort", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Magrets", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Poires", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Roquefort", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Vin rouge", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Miel", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Polenta", qte:200, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Polenta crémeuse.","Magrets 7+4 min.","Poires sautées + roquefort + miel + vin.","Trancher, dresser."] },

{ id:"fv32", nom:"Salade aux gésiers & raisins", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Mesclun", qte:250, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Gésiers confits", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Raisins blancs", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Cerneaux de noix", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Vinaigrette de noix", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Croûtons", qte:100, unite:"g", rayon:"Boulangerie" }
  ],
  etapes:["Réchauffer gésiers.","Dresser mesclun + raisins + noix.","Gésiers chauds.","Vinaigrette."] },

{ id:"fv33", nom:"Cuisses de canard confit-pommes de terre", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Cuisses confites", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes grenailles", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Grenailles à la graisse de canard.","Confit croustillant côté peau 12 min.","Persillade.","Salade."] },

{ id:"fv34", nom:"Brochet beurre blanc", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:35, difficulte:3,
  ingredients:[
    { nom:"Brochet (ou sandre)", qte:800, unite:"g", rayon:"Poissonnerie" },
    { nom:"Échalotes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Vinaigre", qte:5, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:5, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Beurre blanc : réduction échalotes-vin-vinaigre, monter au beurre froid.","Brochet poché 12 min.","Pdt vapeur.","Napper."] },

{ id:"fv35", nom:"Œufs mimosa", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Œufs durs", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Mayonnaise", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Œufs durs 9 min, écaler.","Couper en 2, sortir jaunes.","Jaunes + mayo + moutarde, garnir blancs.","Jaune restant râpé dessus + persil. Salade."] },

{ id:"fv36", nom:"Brochettes de boeuf citron-romarin", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Boeuf en cubes", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Romarin", qte:4, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Brochettes", qte:8, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Riz", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon.","Couper 1L de châtaignes cuites en morceaux.","Dans une casserole, suer 1 oignon + 100g de lardons dans 1 c. à soupe d'huile 5 min.","Ajouter châtaignes + 1L de bouillon de volaille. Mijoter 20 min.","Mixer au mixeur plongeant. Ajouter 20cl de crème.","Servir bien chaud."] },

{ id:"fv37", nom:"Quenelles de volaille, sauce Nantua", mode:"us", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:3,
  ingredients:[
    { nom:"Quenelles de volaille", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre d'écrevisses", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Concentré de tomate", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Riz", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Sauce Nantua : beurre + crème + concentré + vin.","Quenelles au four 25 min dans sauce.","Riz pilaf.","Servir bouillonnant."] },

{ id:"fv38", nom:"Mouclade charentaise", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Moules", qte:2, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:20, unite:"cl", rayon:"Boissons" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Curry doux", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Safran", qte:1, unite:"dose", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Moules au vin blanc 5 min.","Échalotes + curry + safran + crème.","Mélanger.","Pain à part."] },

{ id:"fv39", nom:"Filets de daurade aux artichauts", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Filets de daurade", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Cœurs d'artichauts", qte:400, unite:"g", rayon:"Surgelés" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Artichauts sautés 10 min.","Daurade côté peau 4 min + 1 min.","Sauce vin + beurre.","Aneth."] },

{ id:"fv40", nom:"Cervelle de canut, pommes vapeur & jambon", mode:"us", type:"diner", saison:["printemps","été"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Fromage blanc", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Herbes mélangées", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:1, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Vinaigre", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Jambon de Bayonne", qte:6, unite:"tranches", rayon:"Boucherie" }
  ],
  etapes:["Mélanger fromage + herbes + ail + huile + vinaigre.","Pdt vapeur.","Jambon en lanières.","Servir ensemble."] },

{ id:"fv41", nom:"Filets de cabillaud à la crème de fenouil", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"français", temps:30, difficulte:2,
  ingredients:[
    { nom:"Dos de cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Fenouil", qte:2, unite:"bulbes", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Fenouil sauté 15 min.","Échalote + vin + crème, mixer en sauce.","Cabillaud poêlé 4 min/face.","Pdt + napper."] },

{ id:"fv42", nom:"Côte de cochon panée à la milanaise", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Côtes de porc fines", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:200, unite:"g", rayon:"Épicerie salée" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre clarifié", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Spaghetti tomate", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Aplatir côtes.","Panure œuf + chapelure-parmesan.","Cuire au beurre 3 min/face.","Citron + spaghetti."] },

{ id:"fv43", nom:"Petit salé aux lentilles", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:1,
  ingredients:[
    { nom:"Petit salé (palette demi-sel)", qte:1, unite:"g", rayon:"Boucherie" },
    { nom:"Lentilles vertes", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Carottes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Clous girofle", qte:3, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Bouquet garni", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Dessaler petit salé.","Cuire avec légumes + bouquet 1h.","Lentilles 25 min en parallèle.","Mélanger, vinaigre."] },

{ id:"fv45", nom:"Filet mignon, sauce camembert", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:40, difficulte:2,
  ingredients:[
    { nom:"Filets mignons de porc", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Camembert", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Cidre", qte:15, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes Anna", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Éplucher 1kg de pdt, trancher en rondelles fines à la mandoline.","Beurrer un moule à manqué. Étaler les rondelles en cercles concentriques, beurre + sel entre chaque couche.","Enfourner 40 min jusqu'à doré.","Pendant ce temps, saisir 2 filets mignons (préalablement salés-poivrés) 3 min toutes faces.","Transférer au four 15 min avec les pdt.","Reposer 5 min sous alu.","Sauce : 2 échalotes hachées + 15cl de cidre + 20cl de crème + camembert en dés. Fondre.","Trancher filets en médaillons. Servir avec pdt et sauce camembert."] },

{ id:"fv46", nom:"Quiche aux courgettes-feta", mode:"both", type:"diner", saison:["printemps","été","automne"], culture:"méditerranéen", temps:55, difficulte:1,
  ingredients:[
    { nom:"Pâte brisée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Courgettes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Feta", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Menthe", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pignons", qte:40, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Courgettes en rondelles, sauter.","Pâte foncée, courgettes + feta.","Œufs + crème + menthe.","Pignons, four 35 min à 180°C."] },

{ id:"fv47", nom:"Tarte tomate-moutarde-fromage", mode:"both", type:"diner", saison:["été","automne"], culture:"français", temps:40, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Tomates", qte:6, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Moutarde", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Étaler la pâte feuilletée, étaler 3 c. à soupe de moutarde sur le fond.","Râper 150g d'emmental, en parsemer 100g sur la moutarde.","Couper 6 tomates en rondelles. Disposer en rosace.","Saler les tomates, parsemer 1 c. à café d'herbes de Provence + reste du fromage.","Arroser de 3 c. à soupe d'huile d'olive.","Enfourner 25 min jusqu'à pâte dorée.","Servir tiède avec salade verte."] },

{ id:"fv48", nom:"Côtelettes d'agneau persillade", mode:"both", type:"diner", saison:["printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Côtelettes d'agneau", qte:8, unite:"pièces", rayon:"Boucherie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 800g de pdt vapeur 18 min.","Préparer persillade : hacher 4 gousses d'ail + 1 botte de persil + 3 c. à soupe d'huile d'olive.","Saler 8 côtelettes d'agneau juste avant cuisson.","Dans une grande poêle bien chaude avec 50g de beurre, cuire les côtelettes 2 min par face (saignant).","Hors feu, badigeonner de persillade.","Servir aussitôt avec pdt vapeur et reste de persillade à part."] },

{ id:"fv49", nom:"Lapin au cidre & pommes", mode:"both", type:"diner", saison:["automne","hiver"], culture:"français", temps:90, difficulte:2,
  ingredients:[
    { nom:"Lapin en morceaux", qte:1, unite:"pièce", rayon:"Boucherie" },
    { nom:"Cidre brut", qte:50, unite:"cl", rayon:"Boissons" },
    { nom:"Pommes", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Lardons", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir lapin + lardons.","Échalotes + cidre + thym, 50 min.","Pommes 20 min en fin.","Crème, dresser."] },

{ id:"fv50", nom:"Pavé de saumon au beurre d'agrumes", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Orange", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pamplemousse", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Riz pilaf", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Riz pilaf.","Beurre d'agrumes : zestes + jus + beurre.","Saumon côté peau 4+1 min.","Napper."] },

{ id:"bx01", nom:"Asperges sauce mousseline", mode:"us", type:"diner", saison:["printemps"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Asperges blanches", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Jaunes d'œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre clarifié", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème montée", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Asperges 12 min vapeur.","Hollandaise : jaunes au bain-marie, beurre, citron.","Incorporer crème montée.","Napper."] },

{ id:"bx02", nom:"Velouté de cèpes & foie gras", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:45, difficulte:3,
  ingredients:[
    { nom:"Cèpes frais", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Foie gras", qte:80, unite:"g", rayon:"Boucherie" },
    { nom:"Bouillon volaille", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Suer échalotes + cèpes.","Bouillon 15 min, mixer, crémer.","Dés de foie gras au fond.","Verser velouté brûlant."] },

{ id:"bx03", nom:"Carpaccio Saint-Jacques truffe", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:15, difficulte:2,
  ingredients:[
    { nom:"Saint-Jacques", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Truffe noire", qte:15, unite:"g", rayon:"Épicerie salée" },
    { nom:"Huile noisette", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Mâche", qte:100, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Trancher Saint-Jacques très fin.","Dresser en rosace.","Huile noisette, fleur de sel.","Truffe râpée, mâche, citron."] },

{ id:"bx04", nom:"Ravioles ouvertes aux gambas", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Pâtes lasagnes fraîches", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Gambas", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vin blanc", qte:10, unite:"cl", rayon:"Boissons" },
    { nom:"Ciboulette", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Pâtes en carrés 12 cm.","Sauce gambas + vin + crème.","Cuire pâtes 2 min, gambas snackées.","Monter : pâte + gambas + sauce + pâte."] },

{ id:"bx05", nom:"Bavette de bœuf, échalotes au vin rouge", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Bavette", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Échalotes", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vin rouge", qte:30, unite:"cl", rayon:"Boissons" },
    { nom:"Fond de veau", qte:15, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Sucre", qte:1, unite:"c. à café", rayon:"Épicerie sucrée" },
    { nom:"Pommes Anna", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Échalotes confites 30 min.","Pommes Anna au four.","Bavette 2 min/face.","Sauce vin + fond, beurre."] },

{ id:"bx06", nom:"Œufs parfaits, mouillettes truffées", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:60, difficulte:3,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain brioché", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Truffe", qte:20, unite:"g", rayon:"Épicerie salée" },
    { nom:"Sel + poivre", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Œufs à 63°C 45 min.","Pain en mouillettes au beurre.","Râper truffe dessus.","Œuf cassé sur les mouillettes."] },

{ id:"bx07", nom:"Cabillaud confit, écrasé de fenouil", mode:"us", type:"diner", saison:["printemps","automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Cabillaud", qte:700, unite:"g", rayon:"Poissonnerie" },
    { nom:"Huile d'olive", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Fenouil", qte:3, unite:"bulbes", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cabillaud confit dans huile à 60°C 15 min.","Fenouil cuit, écrasé au beurre.","Citron + aneth.","Dresser."] },

{ id:"bx08", nom:"Filet mignon aux pommes & calvados", mode:"both", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:40, difficulte:2,
  ingredients:[
    { nom:"Filets mignons", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes Reinette", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Calvados", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pdt vapeur.","Filets saisis, four 18 min.","Pommes sautées, calvados flambé, crème.","Trancher."] },

{ id:"bx09", nom:"Daurade royale au four & légumes du soleil", mode:"us", type:"diner", saison:["été","automne"], culture:"bistronomie", temps:35, difficulte:1,
  ingredients:[
    { nom:"Daurade entière", qte:1.2, unite:"kg", rayon:"Poissonnerie" },
    { nom:"Tomates", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivrons", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:10, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Légumes en dés rôtis 20 min.","Daurade sur les légumes.","Four 18 min à 200°C.","Servir ensemble."] },

{ id:"bx10", nom:"Souris d'agneau à la fleur d'oranger", mode:"us", type:"diner", saison:["printemps"], culture:"bistronomie", temps:180, difficulte:2,
  ingredients:[
    { nom:"Souris d'agneau", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Eau de fleur d'oranger", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pdt grenailles", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:1, unite:"tête", rayon:"Fruits & Légumes" }
  ],
  etapes:["Saisir souris.","Eau orange + miel + ail + citron + eau.","3h à 150°C couvert.","Pdt rôties autour."] },

{ id:"bx11", nom:"Tartare de daurade aux agrumes", mode:"us", type:"diner", saison:["printemps","été"], culture:"bistronomie", temps:20, difficulte:2,
  ingredients:[
    { nom:"Filets de daurade", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Orange", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Daurade en petits dés.","Suprêmes d'agrumes.","Mélanger + échalote + aneth + huile.","Cercle, dresser."] },

{ id:"bx12", nom:"Lasagnes ouvertes courgettes-saumon", mode:"us", type:"diner", saison:["printemps","été"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Pâtes lasagnes fraîches", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Saumon frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Courgettes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pâtes 3 min.","Courgettes en rubans, saumon en cubes.","Sauce crème + citron + aneth.","Monter en lasagne ouverte."] },

{ id:"bx13", nom:"Pavé de bœuf, sauce truffée", mode:"us", type:"diner", saison:["automne","hiver"], culture:"bistronomie", temps:30, difficulte:2,
  ingredients:[
    { nom:"Pavés de bœuf", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Brisures de truffe", qte:30, unite:"g", rayon:"Épicerie salée" },
    { nom:"Crème", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cognac", qte:3, unite:"cl", rayon:"Boissons" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes Dauphine", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pommes Dauphine.","Pavés 2 min/face.","Échalote + cognac + crème + truffe.","Napper."] },

{ id:"bx14", nom:"Cuisses de canard, chutney de figues", mode:"us", type:"diner", saison:["été","automne"], culture:"bistronomie", temps:60, difficulte:2,
  ingredients:[
    { nom:"Cuisses de canard", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Figues fraîches", qte:8, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre balsamique", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre brun", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Échalotes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Polenta", qte:200, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuisses 45 min à 180°C.","Chutney figues + vinaigre + sucre + échalote 15 min.","Polenta crémeuse.","Dresser."] },

{ id:"bx15", nom:"Pavé saumon basse T°, beurre yuzu", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:30, difficulte:3,
  ingredients:[
    { nom:"Pavés saumon", qte:4, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Yuzu (ou citron + pamplemousse)", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:100, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Riz japonais", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Saumon à 50°C four 20 min.","Beurre yuzu : échalote + jus yuzu + beurre.","Riz vapeur.","Napper."] },

{ id:"bx16", nom:"Côte de veau pochée, sauce gribiche", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:60, difficulte:3,
  ingredients:[
    { nom:"Côtes de veau", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Bouillon", qte:1, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Œufs durs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Cornichons", qte:80, unite:"g", rayon:"Épicerie salée" },
    { nom:"Câpres", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Herbes", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile", qte:10, unite:"cl", rayon:"Épicerie salée" }
  ],
  etapes:["Pocher côtes 30 min.","Gribiche : œufs + condiments + huile.","Légumes vapeur.","Servir avec gribiche."] },

{ id:"bx17", nom:"Pétoncles à la plancha", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pétoncles", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:3, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pain", qte:0.5, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Plancha bien chaude.","Pétoncles 1 min/face.","Beurre + ail + persil.","Citron + pain."] },

{ id:"bx18", nom:"Filet mignon, sauce poivre & cognac", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"bistronomie", temps:35, difficulte:2,
  ingredients:[
    { nom:"Filets mignons de porc", qte:2, unite:"pièces", rayon:"Boucherie" },
    { nom:"Poivre concassé", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Cognac", qte:5, unite:"cl", rayon:"Boissons" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Pdt rattes", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Filets dans poivre.","Saisir, four 18 min.","Cognac flambé + crème.","Pdt + napper."] },

{ id:"bx19", nom:"Brochettes Saint-Jacques-lard fumé", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"bistronomie", temps:25, difficulte:2,
  ingredients:[
    { nom:"Saint-Jacques", qte:12, unite:"pièces", rayon:"Poissonnerie" },
    { nom:"Lard fumé", qte:12, unite:"tranches", rayon:"Boucherie" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Risotto blanc", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Risotto.","Enrouler chaque SJ dans lard, embrocher.","Plancha 2 min/face.","Citron + risotto."] },

{ id:"bx20", nom:"Tarte fine asperges-jambon cru", mode:"us", type:"diner", saison:["printemps"], culture:"bistronomie", temps:25, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Asperges vertes", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Jambon de Parme", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Mâche", qte:100, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Pâte étalée, piquée, four 12 min à 200°C.","Asperges blanchies en biseau.","Disposer + parmesan, four 8 min.","Jambon, mâche, huile."] }
,

{ id:"kd01", nom:"Nuggets de poulet maison panés", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Aiguillettes de poulet", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Cornflakes émiettés", qte:120, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Farine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Paprika doux", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ketchup + mayo", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Frites au four", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préparer 3 assiettes creuses : une avec la farine (60g + 1 c. à café de sel), une avec les 2 œufs battus à la fourchette, une avec les cornflakes finement écrasés (mettre dans un sac congélation et écraser au rouleau) mélangés au paprika.","Couper les aiguillettes de poulet en morceaux de 4-5 cm. Les éponger avec du papier absorbant pour qu'ils soient bien secs (sinon la panure n'adhère pas).","Préchauffer le four à 220°C (chaleur tournante) et y enfourner directement les frites surgelées sur une plaque pour qu'elles cuisent en parallèle 25 min.","Paner chaque morceau : d'abord dans la farine (bien tapoter pour ôter l'excès), puis dans l'œuf battu (tremper complètement), puis dans les cornflakes (presser fermement pour les faire adhérer).","Chauffer 4 c. à soupe d'huile dans une grande poêle à feu moyen-vif. L'huile est prête quand un morceau de pain y dore en 30 sec.","Déposer les nuggets sans les serrer (en 2 fournées si besoin). Cuire 3-4 min sans toucher jusqu'à belle coloration dorée, retourner avec une pince, encore 3-4 min de l'autre côté.","Égoutter sur du papier absorbant pour ôter l'excédent de gras.","Servir aussitôt avec les frites brûlantes, ketchup et mayonnaise. Compter 6-8 nuggets par personne."] },

{ id:"kd02", nom:"Tarte flambée express (Flammekueche)", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte fine à pizza", qte:1, unite:"rouleau", rayon:"Boulangerie" },
    { nom:"Fromage blanc", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Oignon", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Lardons fumés", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Huile", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 250°C (le plus fort possible, chaleur tournante si disponible).","Émincer les 2 oignons en rondelles très fines (mandoline si possible). Important : ils restent CRUS, c'est ce qui fait la signature.","Dans un bol, mélanger 250g de fromage blanc, 10cl de crème fraîche, 1 pincée de muscade, sel et poivre. La crème doit être fluide mais pas liquide.","Étaler la pâte à pizza directement sur la plaque tapissée de papier cuisson, en cherchant à l'avoir LA PLUS FINE possible (presque transparente).","Badigeonner toute la pâte de la crème, sans laisser de bord vide.","Répartir les oignons crus de manière homogène, puis parsemer les lardons fumés.","Enfourner 10-12 min : la pâte doit dorer aux bords et devenir croustillante, les oignons doivent commencer à brunir.","Sortir, laisser tiédir 2 min (la pâte se raffermit). Couper en parts au couteau ou à la roulette.","Servir avec une salade verte vinaigrette à part. Idéalement accompagné d'un Riesling ou d'un Gewurztraminer."] },

{ id:"kd03", nom:"Spätzle express au gruyère", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Spätzle frais", qte:600, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Gruyère râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Porter une grande casserole d'eau salée (10g de sel par litre) à grosse ébullition.","Pendant que l'eau chauffe : dans une grande poêle, faire revenir 150g de lardons fumés à sec (sans matière grasse) pendant 5 min jusqu'à dorés et croustillants. Ajouter 1 échalote ciselée, cuire 2 min.","Plonger les spätzle dans l'eau bouillante. Ils sont cuits dès qu'ils remontent à la surface (1-2 min seulement). Égoutter.","Verser les spätzle directement dans la poêle des lardons. Ajouter 80g de beurre en parcelles, remuer 1 min pour bien enrober.","Hors du feu, saupoudrer généreusement de 200g de gruyère râpé. Mélanger pour le faire fondre dans la chaleur résiduelle.","Servir dans des assiettes chaudes. Parsemer de persil ciselé et donner un tour de poivre du moulin.","Astuce : on peut remplacer les lardons par des champignons sautés pour une version végé."] },

{ id:"kd04", nom:"Hamburger express maison & frites au four", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Buns à hamburger", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Cheddar", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Tomate", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:4, unite:"feuilles", rayon:"Fruits & Légumes" },
    { nom:"Oignon rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ketchup + mayo + moutarde", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Pommes de terre coupées", qte:1, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C (chaleur tournante). Couper les pommes de terre en bâtonnets épais comme un doigt. Les éponger soigneusement au torchon (très important pour qu'elles soient croustillantes).","Étaler les frites en une seule couche sur une plaque tapissée de papier cuisson. Verser 3 c. à soupe d'huile, saler, mélanger à la main pour bien enrober. Enfourner 25 min en retournant à mi-cuisson.","Pendant que les frites cuisent : sortir les steaks hachés du frigo 10 min avant pour qu'ils soient à température ambiante. Émincer 1 oignon rouge en fines rondelles. Couper la tomate en 4 rondelles épaisses. Laver et essorer la salade.","Préparer les sauces dans 3 ramequins : ketchup, mayonnaise, moutarde.","À 5 min de la fin des frites, chauffer une poêle (idéalement en fonte) à feu vif sans matière grasse. Saler généreusement les steaks juste avant cuisson.","Déposer les steaks dans la poêle bien chaude. NE PAS LES BOUGER pendant 2 min (une croûte se forme, c'est ce qui donne le goût).","Retourner les steaks. Déposer aussitôt une tranche de cheddar sur chaque steak. Cuire encore 2 min (le fromage commence à fondre).","Pendant les 2 dernières minutes : ouvrir les buns et les toaster légèrement dans une autre poêle ou directement dans le grille-pain.","Monter chaque burger : base + sauce + 1 feuille de salade + steak-cheddar + rondelles d'oignon + rondelle de tomate + chapeau du bun.","Servir IMMÉDIATEMENT avec les frites brûlantes, salières et sauces sur la table."] },

{ id:"kd05", nom:"Cordon bleu poulet-jambon-comté", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Escalopes de poulet fines", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Jambon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Comté", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Farine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Aplatir les escalopes de poulet avec un rouleau à pâtisserie (entre 2 feuilles de papier cuisson) jusqu'à 5-6 mm d'épaisseur uniforme.","Saler et poivrer légèrement chaque face. Au centre de chaque escalope, poser 1 tranche de jambon repliée puis 1 tranche de comté.","Replier l'escalope en deux pour enfermer la garniture. Sceller les bords en appuyant ou avec un cure-dent (à retirer avant de servir).","Préparer 3 assiettes : farine (60g, salée), 2 œufs battus, 150g chapelure.","Paner : farine (tapoter) → œuf (tremper complètement) → chapelure (presser fermement, double passage pour plus de croquant).","Dans une grande poêle, faire fondre 60g de beurre à feu moyen. Quand il mousse, ajouter les cordons bleus.","Cuire 4 min de chaque côté jusqu'à belle coloration dorée. Si la panure brunit trop vite, baisser le feu.","Vérifier la cuisson : le poulet doit être cuit à cœur (entailler discrètement pour vérifier qu'il n'est plus rosé).","Servir avec une salade verte vinaigrette ou des légumes vapeur. Quartier de citron sur la table."] },

{ id:"kd06", nom:"Hot-dogs maison chou-moutarde", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Saucisses de Strasbourg", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pains à hot-dog", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Chou rouge râpé", qte:300, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Vinaigre", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Ketchup", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Cornichons", qte:4, unite:"pièces", rayon:"Épicerie salée" }
  ],
  etapes:["Râper le chou rouge très finement (au couteau ou robot). Le mettre dans un saladier avec 1 c. à café de sel et 2 c. à soupe de vinaigre. Bien mélanger et laisser dégorger 10 min : il devient plus tendre et perd son amertume.","Pendant ce temps, porter une casserole d'eau à ébullition (sans bouillir fort). Plonger les saucisses de Strasbourg 5 min en eau frémissante (PAS bouillante, sinon elles éclatent).","Préchauffer le four à 180°C. Mettre les pains à hot-dog directement dans le four 3 min pour les tiédir et les ouvrir légèrement.","Égoutter le chou en le pressant entre les mains pour ôter l'excès d'eau.","Sortir les pains et les inciser sur le dessus. Tartiner l'intérieur de moutarde.","Y déposer une saucisse, puis une bonne cuillère de chou rouge mariné.","Finir avec un trait de ketchup en zigzag et 2-3 rondelles de cornichons.","Servir aussitôt avec des chips ou une salade verte. Compter 1 à 2 hot-dogs par personne."] },

{ id:"kd07", nom:"Mac and cheese gratiné au comté", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Macaroni", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Comté râpé", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Cheddar râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:50, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:40, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Chapelure", qte:50, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée (10g/L) à ébullition. Y cuire les macaronis 9 minutes (1 min de moins que le paquet, ils finiront au four).","Pendant ce temps, préparer la béchamel : faire fondre 60g de beurre à feu moyen dans une casserole. Ajouter 40g de farine en une fois, remuer 1 min jusqu'à obtenir un roux blond.","Verser 50cl de lait froid en plusieurs fois, en fouettant énergiquement après chaque ajout pour éviter les grumeaux.","Continuer à feu moyen en remuant au fouet jusqu'à épaississement (3-4 min). Ajouter sel, poivre, 1 belle pincée de muscade râpée.","Hors du feu, ajouter 200g de comté râpé et 100g de cheddar râpé en remuant jusqu'à ce qu'ils fondent. Garder 50g de chaque pour gratiner.","Égoutter les pâtes (garder 2 c. à soupe d'eau de cuisson). Les mélanger délicatement à la sauce dans un plat à gratin beurré.","Préchauffer le four position grill à 220°C.","Parsemer le dessus du reste de fromage et de 50g de chapelure pour une croûte croustillante.","Enfourner sous le grill 8 min : la surface doit être bien dorée et grésillante.","Laisser tiédir 5 min hors du four avant de servir (la béchamel se raffermit)."] },

{ id:"kd08", nom:"Coquillettes au jambon-béchamel", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Coquillettes", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Farine", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Emmental râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition. Y plonger les coquillettes pour 7 min (al dente, elles finiront au four).","Pendant ce temps, faire fondre 50g de beurre dans une casserole à feu moyen.","Ajouter 30g de farine et remuer 1 min pour un roux.","Verser 40cl de lait froid d'un coup, fouetter énergiquement, porter à frémissement en remuant. Cuire 3 min jusqu'à épaississement crémeux.","Ajouter sel, poivre, 1 pincée de muscade. Couper le feu.","Couper les 6 tranches de jambon blanc en lanières (1 cm de large).","Égoutter les pâtes. Les mélanger à la béchamel dans le plat à gratin beurré. Ajouter le jambon.","Parsemer 150g d'emmental râpé sur le dessus.","Enfourner sous le grill (220°C) 8 min jusqu'à dorée bouillonnant.","Laisser tiédir 3 min avant de servir."] },

{ id:"kd09", nom:"Gnocchis aux 4 fromages", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Gnocchis frais", qte:600, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Gorgonzola", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Comté", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Mozza", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition.","Pendant ce temps, dans une sauteuse à feu doux, verser 25cl de crème liquide. Ne pas faire bouillir.","Couper le gorgonzola, le comté et la mozzarella en petits dés. Les ajouter dans la crème tiède.","Remuer doucement à la spatule, le fromage va fondre en 3-4 min en sauce onctueuse.","Si la sauce épaissit trop, ajouter 2 c. à soupe de lait. Saler très légèrement (les fromages sont déjà salés). Poivrer généreusement.","Plonger les gnocchis frais dans l'eau bouillante. Ils sont cuits dès qu'ils remontent (1-2 min).","Les égoutter avec une écumoire et les verser directement dans la sauteuse de sauce. Mélanger délicatement 30 sec.","Servir aussitôt dans des assiettes chaudes. Parsemer généreusement de parmesan râpé et donner un tour de poivre."] },

{ id:"kd10", nom:"Sloppy Joe au bun", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Bœuf haché", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Buns", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Coulis de tomate", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Cheddar", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Ketchup", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sauce Worcestershire", qte:2, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer finement 1 oignon et 2 gousses d'ail.","Dans une grande poêle ou sauteuse, chauffer 2 c. à soupe d'huile à feu moyen. Suer l'oignon 3 min jusqu'à translucide, ajouter l'ail 1 min.","Ajouter 600g de bœuf haché. L'écraser à la spatule pour qu'il s'émiette. Cuire 5 min en remuant souvent jusqu'à ce qu'il soit bien doré.","Verser 30cl de coulis de tomate, 3 c. à soupe de ketchup, 2 c. à café de Worcestershire, sel, poivre, 1 c. à café de paprika fumé si vous en avez.","Mijoter à feu doux 10-12 min. La sauce doit s'épaissir et devenir onctueuse (pas liquide).","Toaster les buns dans le grille-pain ou une poêle sèche 1 min de chaque côté.","Ouvrir chaque bun, déposer une grosse cuillère du mélange bœuf-sauce qui dépasse abondamment.","Poser une tranche de cheddar par-dessus, refermer avec le chapeau du bun.","Servir tout de suite avec des serviettes en papier : c'est gras, ça coule, c'est le but ! Idéal avec des chips ou de la salade de chou."] },

{ id:"kd11", nom:"Penne tomate-jambon-mozza", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Coulis tomate", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Jambon blanc", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Mozza billes", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Porter une grande casserole d'eau salée à ébullition. Y cuire les penne 9 min (al dente, vérifier 1 min avant la fin du paquet).","Pendant ce temps, émincer finement 1 oignon et 2 gousses d'ail. Couper les 4 tranches de jambon en petits dés (1cm).","Dans une grande sauteuse, chauffer 3 c. à soupe d'huile d'olive à feu moyen. Faire blondir l'oignon 3 min, ajouter l'ail 1 min.","Verser 40cl de coulis de tomate, 1 c. à café d'origan séché, sel, poivre. Mijoter 8 min : la sauce s'épaissit légèrement.","Ajouter les dés de jambon dans la sauce, mélanger 1 min.","Égoutter les pâtes en gardant 2 c. à soupe d'eau de cuisson. Les verser dans la sauteuse, mélanger 30 sec.","Ajouter 200g de billes de mozzarella (égouttées) coupées en deux. Mélanger délicatement hors feu pour qu'elles commencent à fondre mais restent fondantes.","Servir aussitôt dans des assiettes chaudes. Parsemer de basilic frais ciselé et de parmesan râpé."] },

{ id:"kd12", nom:"Cheeseburger sur pain brioché", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pains briochés à burger", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Cheddar", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Bacon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Tomate", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Sauce burger", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Salade iceberg", qte:4, unite:"feuilles", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C pour les frites en parallèle (25 min).","Faire griller les 4 tranches de bacon dans une poêle à sec à feu moyen 5 min jusqu'à croustillantes. Réserver sur papier absorbant.","Couper la tomate en rondelles épaisses, laver la salade iceberg.","Dans la même poêle (chaude, avec le gras du bacon), saler les steaks juste avant de les déposer. Cuire 2 min sans bouger à feu vif.","Retourner les steaks, déposer aussitôt 1 tranche de cheddar sur chacun. Cuire 2 min de plus.","Pendant ce temps, ouvrir les pains briochés. Les beurrer légèrement et les toaster côté mie dans une autre poêle 1 min.","Préparer chaque burger : base brioche + sauce burger + salade iceberg + steak-cheddar + bacon croustillant + rondelle de tomate + chapeau.","Servir aussitôt, le brioché doit être encore tiède et les frites brûlantes."] },

{ id:"kd13", nom:"Burrito bœuf-haricots-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tortillas grandes", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Bœuf haché", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Haricots rouges", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Cheddar râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomate", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Salade", qte:6, unite:"feuilles", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Épices mexicaines", qte:1, unite:"sachet", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon, couper 2 tomates en petits dés, laver et essorer la salade.","Égoutter et rincer 1 boîte de haricots rouges.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen. Suer l'oignon 3 min, ajouter 500g de bœuf haché émietté.","Cuire en remuant 5 min jusqu'à doré. Ajouter 1 sachet d'épices mexicaines (ou : 1 c. à café cumin + 1 c. à café paprika + 0,5 c. à café piment), sel, poivre. Cuire 1 min.","Ajouter les haricots rouges égouttés, mélanger 3 min. La préparation doit être épaisse, pas liquide. Si elle l'est, prolonger la cuisson.","Chauffer les 6 tortillas dans une poêle sèche 30 sec par face OU 20 sec au micro-ondes sous un torchon humide.","Sur chaque tortilla, étaler 1 c. à soupe de crème fraîche au centre. Ajouter une portion de mélange bœuf-haricots, 1 c. à soupe de cheddar râpé, dés de tomate, salade en lanières.","Rouler en repliant d'abord les deux côtés vers l'intérieur puis en roulant du bas vers le haut, comme un cigare fermé.","Servir aussitôt avec le reste de cheddar et crème à part."] },

{ id:"kd14", nom:"Pizza margherita express maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte à pizza", qte:2, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Coulis tomate", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Mozza", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Basilic", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 250°C (température MAX). Si vous avez une pierre à pizza, l'y mettre dès maintenant.","Saupoudrer le plan de travail de farine. Étaler chaque pâte à pizza au rouleau ou aux mains en disque de 30 cm, le PLUS FIN possible.","Émincer 2 gousses d'ail très finement.","Étaler 25cl de coulis de tomate en couche fine sur les 2 pâtes (laisser 1 cm de bord). Parsemer l'ail et arroser de 3 c. à soupe d'huile d'olive.","Saler légèrement le coulis. Disposer 150g de mozzarella par pizza, en morceaux déchirés à la main (pas tranchés, c'est meilleur).","Enfourner directement (sur pierre ou plaque) 8-10 min : les bords doivent gonfler et brunir, le fromage doit bouillonner.","Sortir, parsemer de basilic frais déchiré à la main (pas couper, sinon il noircit), un filet d'huile d'olive et un tour de poivre.","Couper en 8 parts à la roulette, servir aussitôt."] },

{ id:"kd15", nom:"Quesadilla bœuf-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:18, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:8, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Bœuf haché", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Cheddar râpé", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Paprika", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Émincer 1 oignon et couper 1 poivron rouge en petits dés.","Dans une grande poêle, chauffer 2 c. à soupe d'huile à feu moyen. Faire revenir oignon et poivron 5 min.","Ajouter 400g de bœuf haché. L'émietter à la spatule. Saupoudrer 1 c. à café de paprika doux, sel, poivre. Cuire 6 min en remuant jusqu'à doré.","Préparer chaque quesadilla : poser 1 tortilla sur le plan de travail, sur la moitié étaler de la garniture bœuf, parsemer de cheddar râpé (30g par quesadilla). Refermer en pliant en deux comme un croissant.","Dans une poêle SÈCHE bien chaude, déposer 1 quesadilla pliée. Cuire 2 min sans toucher, retourner avec une pince ou large spatule, encore 2 min. La tortilla doit être dorée et le fromage doit avoir fondu.","Renouveler avec les autres quesadillas. Garder au chaud sous une feuille d'alu pendant les suivantes.","Couper chaque quesadilla en 3 parts (comme une pizza).","Servir avec de la crème fraîche en pot et éventuellement une salade de tomates en accompagnement."] },

{ id:"kd16", nom:"Pâtes à la sauce milanaise (jambon de Parme)", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:18, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon de Parme", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Coulis tomate", qte:30, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Basilic", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 500g de spaghetti al dente 8 min.","Dans une poêle, suer 1 oignon dans 2 c. à soupe d'huile.","Ajouter 30cl de coulis tomate + 15cl de crème + sel + poivre. Mijoter 5 min.","Couper 6 tranches de jambon de Parme en lanières, ajouter en fin (1 min).","Égoutter pâtes, mélanger à la sauce.","Parmesan + basilic. Servir."] },

{ id:"kd17", nom:"Risotto crémeux jambon & petits pois", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Riz Arborio", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon blanc", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Petits pois surgelés", qte:300, unite:"g", rayon:"Surgelés" },
    { nom:"Bouillon", qte:80, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Parmesan", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Suer 1 échalote dans 30g de beurre.","Ajouter 300g de riz Arborio, nacrer 2 min.","Verser 80cl de bouillon louche par louche en remuant, 15 min.","Ajouter 300g de petits pois surgelés + 4 tranches de jambon en dés. Mijoter 5 min.","Mantecare hors feu : 20g de beurre + 80g de parmesan.","Servir aussitôt."] },

{ id:"kd18", nom:"Gratin de macaronis au jambon", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Macaroni", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Jambon", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Crème", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Emmental", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 220°C grill.","Cuire 500g de macaroni 7 min al dente.","Mélanger 40cl de crème + 2 œufs + muscade + 100g d'emmental.","Dans un plat à gratin beurré : pâtes + 200g de jambon en dés + appareil + 100g d'emmental sur le dessus.","Enfourner 12 min grill jusqu'à doré bouillonnant.","Servir."] },

{ id:"kd19", nom:"Crêpes farcies poulet-béchamel", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Crêpes salées prêtes", qte:8, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Blancs de poulet cuits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Champignons", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Béchamel rapide", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Emmental", qte:150, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Préchauffer le four à 200°C grill.","Sauter 200g de champignons en lamelles 5 min.","Préparer béchamel rapide : 30g beurre + 25g farine + 30cl lait, cuire 3 min.","Mélanger 400g de poulet cuit effiloché + champi + béchamel.","Garnir 8 crêpes, rouler.","Disposer dans plat à gratin. Parsemer 150g d'emmental.","Enfourner 10 min grill. Servir."] },

{ id:"kd20", nom:"Tortillas roulées poulet-cheddar", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs poulet", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Cheddar", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Avocat", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Citron vert", qte:1, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Émincer 400g de blancs de poulet. Sauter 5 min dans 1 c. à soupe d'huile.","Couper 2 avocats en deux, écraser avec jus de citron vert.","Sur chaque tortilla : poulet + cheddar râpé + avocat + 1 c. à café de crème fraîche.","Rouler serré.","Snacker 2 min par face dans une poêle sèche pour fromage fondu et tortilla croustillante.","Couper en biais, servir."] },

{ id:"kd21", nom:"Poulet pané au cornflakes", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Blancs poulet", qte:600, unite:"g", rayon:"Boucherie" },
    { nom:"Cornflakes", qte:150, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Farine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Huile", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Ketchup", qte:1, unite:"portion", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C. Cuire 800g de pdt vapeur 20 min.","Aplatir 600g de blancs de poulet entre 2 feuilles de papier cuisson au rouleau.","Préparer 3 assiettes : farine, 2 œufs battus, cornflakes finement mixés.","Paner chaque escalope dans chaque assiette en pressant.","Cuire dans 5 c. à soupe d'huile chaude 4 min par face.","Servir avec pdt vapeur + ketchup."] },

{ id:"kd22", nom:"Tartine méga raclette", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne", qte:8, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Fromage à raclette", qte:400, unite:"g", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Bacon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Cornichons", qte:100, unite:"g", rayon:"Épicerie salée" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C grill.","Toaster 8 tranches de pain de campagne 2 min sous le grill.","Couvrir chaque tranche de jambon (la moitié) + bacon coupé en lanières.","Trancher 400g de raclette en fines lamelles. Déposer généreusement sur le tout.","Grill 5-6 min jusqu'à fondu et doré.","Servir avec cornichons + salade vinaigrée."] },

{ id:"kd23", nom:"Cordon bleu de dinde", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Escalopes de dinde", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Jambon", qte:4, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Farine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Chapelure", qte:150, unite:"g", rayon:"Épicerie salée" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Pommes vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Aplatir 4 escalopes de dinde au rouleau.","Au centre de chaque : 1 tranche de jambon + 1 tranche d'emmental. Replier en deux.","Préparer panure : farine, œufs battus, chapelure.","Paner.","Cuire 50g de beurre dans une poêle, dorer 3 min par face.","Cuire 800g de pdt vapeur en parallèle.","Servir avec pdt."] },

{ id:"kd24", nom:"Saucisses & purée express", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Saucisses fumées", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Éplucher 1kg de pdt, cuire 20 min à l'eau salée jusqu'à tendres.","Écraser au presse-purée avec 60g de beurre + 20cl de lait chaud + sel + muscade.","Pendant ce temps, piquer 6 saucisses fumées et cuire 10 min à la poêle.","Servir : purée + saucisse + moutarde."] },

{ id:"kd25", nom:"Penne sauce tomate-saucisses", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Saucisses de Toulouse", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Coulis tomate", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Parmesan", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Origan", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire 500g de penne 9 min al dente.","Pendant ce temps, retirer la peau de 4 saucisses de Toulouse, émietter la chair.","Dorer la chair 5 min avec 1 oignon haché + 2 gousses d'ail.","Ajouter 40cl de coulis tomate + origan. Mijoter 10 min.","Égoutter pâtes, mélanger à la sauce.","Parmesan râpé. Servir."] },

{ id:"kd26", nom:"Wraps frittés mozza-jambon", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Tortillas", qte:6, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Mozza", qte:250, unite:"g", rayon:"Crèmerie" },
    { nom:"Jambon de Parme", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Tomates séchées", qte:80, unite:"g", rayon:"Épicerie salée" },
    { nom:"Roquette", qte:100, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Préparer chaque wrap : 1 tortilla + 1 tranche de jambon de Parme + 30g de mozza en lamelles + tomates séchées + roquette.","Plier en chausson.","Chauffer 3 c. à soupe d'huile dans une poêle.","Cuire chaque wrap 2 min par face jusqu'à doré et fromage fondu.","Couper en biais, servir aussitôt."] },

{ id:"kd27", nom:"Pâtes crémeuses au saumon", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:18, difficulte:1,
  ingredients:[
    { nom:"Tagliatelles", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Saumon frais", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Crème", qte:25, unite:"cl", rayon:"Crèmerie" },
    { nom:"Échalote", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Aneth", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Porter eau salée à ébullition. Cuire 500g de tagliatelles 9 min al dente.","Couper 400g de saumon en cubes. Émincer 1 échalote.","Sauter saumon + échalote dans 30g de beurre 5 min.","Ajouter 25cl de crème + jus d'1 citron. Mijoter 3 min.","Égoutter pâtes, mélanger à la sauce.","Aneth ciselé. Servir."] },

{ id:"kd28", nom:"Bagel poulet-cheddar-cornichons", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:1,
  ingredients:[
    { nom:"Bagels", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs poulet cuits", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Cheddar", qte:4, unite:"tranches", rayon:"Crèmerie" },
    { nom:"Cornichons", qte:6, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Salade", qte:4, unite:"feuilles", rayon:"Fruits & Légumes" },
    { nom:"Mayonnaise", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Moutarde", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Toaster 4 bagels coupés en 2.","Sur 4 demis : 1 c. à soupe de mayo + 1 feuille de salade + 1 tranche de poulet cuit + 1 tranche de cheddar + 2 cornichons en rondelles.","Refermer avec les 4 autres demis.","Servir aussitôt avec chips."] },

{ id:"kd29", nom:"Croque-monsieur XXL au comté", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:18, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:16, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:8, unite:"tranches", rayon:"Boucherie" },
    { nom:"Comté râpé", qte:300, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C (mode grill ou chaleur tournante grill).","Râper 300g de comté à la main pour des copeaux qui fondent bien (éviter le pré-râpé sous sachet qui contient de l'anti-mottant).","Dans un bol, mélanger 15cl de crème fraîche + 2 œufs battus + 200g du comté râpé + sel + poivre + 1 pincée de muscade.","Beurrer légèrement un côté de 8 tranches de pain de mie. Les disposer beurre vers le BAS sur la plaque du four.","Sur chacune, étaler une bonne cuillère du mélange crémeux au fromage. Déposer 1 tranche de jambon blanc replié en deux.","Étaler à nouveau du mélange. Refermer avec les 8 tranches restantes de pain (côté beurré vers le HAUT).","Étaler généreusement le reste du mélange sur le dessus de chaque croque. Parsemer du reste de comté râpé.","Enfourner au grill 10-12 min : surveiller car ça brûle vite. Le dessus doit être bien doré, presque caramélisé.","Sortir, laisser tiédir 2 min (le fromage est lave). Servir avec une salade verte vinaigrette à part."] },

{ id:"kd30", nom:"Naans poulet tikka simplifiés", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Naans", qte:4, unite:"pièces", rayon:"Boulangerie" },
    { nom:"Blancs poulet en cubes", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Yaourt grec", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates concassées", qte:25, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Crème", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Tikka masala", qte:1, unite:"sachet", rayon:"Épicerie salée" },
    { nom:"Coriandre", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Mélanger 150g de yaourt grec + 2 c. à café de tikka masala + sel + 1 gousse d'ail.","Couper 500g de blancs de poulet en cubes. Mariner 10 min.","Saisir le poulet 5 min dans 1 c. à soupe d'huile.","Ajouter 25cl de tomates concassées + 10cl de crème. Mijoter 8 min.","Tiédir 4 naans au four 3 min à 180°C.","Garnir : naan + poulet sauce + coriandre.","Servir aussitôt."] },

{ id:"kd31", nom:"Tartiflette express", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pommes de terre déjà cuites", qte:1, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Reblochon", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Lardons", qte:250, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc", qte:5, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Préchauffer le four à 220°C.","Émincer 2 oignons en rondelles fines.","Si vos pommes de terre sont crues : les éplucher et trancher en rondelles de 5mm puis cuire 12 min vapeur. Si déjà cuites (la veille ou en vente sous vide), passer à l'étape suivante directement.","Dans une grande poêle, faire revenir 250g de lardons 4 min à sec, ajouter les oignons, cuire 5 min jusqu'à fondants.","Déglacer avec 5cl de vin blanc, gratter le fond pour récupérer les sucs. Laisser évaporer.","Beurrer un plat à gratin. Disposer une couche de pommes de terre, une couche de lardons-oignons, recommencer.","Verser 15cl de crème fraîche sur toute la surface, saler et poivrer.","Couper le reblochon ENTIER en 2 dans le sens de l'épaisseur (croûte vers le haut). Déposer les 2 demi-reblochon, croûte au-dessus, sur le gratin.","Enfourner 15-20 min : le reblochon doit avoir totalement fondu et le dessus doit dorer.","Servir immédiatement avec une salade verte ou un vin blanc savoyard."] },

{ id:"kd32", nom:"Empanadas express bœuf-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"international", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:2, unite:"rouleaux", rayon:"Crèmerie" },
    { nom:"Bœuf haché", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cheddar râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Olives noires", qte:60, unite:"g", rayon:"Épicerie salée" },
    { nom:"Œuf", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Paprika", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Préchauffer le four à 200°C.","Sauter 400g de bœuf haché + 1 oignon haché + 1 c. à café de paprika 6 min.","Hors feu, ajouter 60g d'olives noires + 150g de cheddar râpé.","Étaler les 2 pâtes feuilletées. Découper des cercles de 10cm avec un bol.","Au centre de chaque cercle : 1 c. à soupe de farce. Replier en chausson, sceller les bords à la fourchette.","Dorer à l'œuf battu.","Enfourner 15 min jusqu'à dorés. Servir."] },

{ id:"kd33", nom:"Cuisses de poulet rôties au four", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Cuisses de poulet", qte:6, unite:"pièces", rayon:"Boucherie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Ail", qte:4, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Thym", qte:3, unite:"branches", rayon:"Fruits & Légumes" },
    { nom:"Pdt vapeur", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:1, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 200°C.","Cuire 800g de pdt vapeur 15 min.","Badigeonner 6 cuisses de poulet de 40g de beurre fondu + thym + ail haché.","Disposer sur plaque. Enfourner 18 min.","Quartier de citron au moment de servir. Pdt à côté."] },

{ id:"kd34", nom:"Gratin de pâtes thon-crème", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Coquillettes", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Thon", qte:2, unite:"boîtes", rayon:"Épicerie salée" },
    { nom:"Crème", qte:30, unite:"cl", rayon:"Crèmerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Gruyère", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Tomates concassées", qte:20, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Préchauffer le four à 220°C grill.","Cuire 500g de coquillettes 7 min al dente.","Mélanger 2 boîtes de thon égoutté + 30cl de crème + 2 œufs + 20cl de tomates concassées.","Dans plat à gratin beurré : pâtes + mélange thon + 150g de gruyère.","Grill 8 min jusqu'à doré.","Persil ciselé. Servir."] },

{ id:"kd35", nom:"Tortilla espagnole pdt-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"méditerranéen", temps:20, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:10, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pommes de terre déjà cuites", qte:600, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Comté râpé", qte:150, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:6, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Persil", qte:0.3, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire 600g de pdt en cubes 15 min vapeur si pas déjà cuites.","Émincer 1 oignon, faire revenir avec pdt 5 min dans 6cl d'huile.","Battre 10 œufs + 150g de comté + sel + persil.","Verser sur les pdt-oignon dans la poêle.","Cuire 5 min à feu moyen.","Retourner avec une grande assiette, cuire 4 min de l'autre côté.","Couper en parts, servir tiède."] }
];

/* ===== Rituels base ========================================== */
const RITUALS = [
  /* Légers (20) */
  { id:"l01", cat:"leger", text:"Dis-lui une chose qu'elle/il fait mieux que personne." },
  { id:"l02", cat:"leger", text:"Préparer un café/thé ensemble et le boire 10 min sans téléphone." },
  { id:"l03", cat:"leger", text:"Un baiser. Au moins 6 secondes." },
  { id:"l04", cat:"leger", text:"Choisis une chanson, danse dans la cuisine — 2 minutes." },
  { id:"l05", cat:"leger", text:"Écris un mot doux, glisse-le dans son sac." },
  { id:"l06", cat:"leger", text:"Une attention spontanée — un petit geste qu'il/elle aime." },
  { id:"l07", cat:"leger", text:"Prends-le/la dans tes bras sans rien dire pendant 30 secondes." },
  { id:"l08", cat:"leger", text:"Un fou rire ensemble — partagez une vidéo qui tue." },
  { id:"l09", cat:"leger", text:"Compliment du jour, sincère, le plus précis possible." },
  { id:"l10", cat:"leger", text:"Apporte-lui quelque chose avant qu'il/elle le demande." },
  { id:"l11", cat:"leger", text:"Massage des mains — 3 minutes, sans interrompre." },
  { id:"l12", cat:"leger", text:"Un cadeau improvisé avec ce qu'il y a sous la main." },
  { id:"l13", cat:"leger", text:"Choisir ensemble un projet de week-end à deux." },
  { id:"l14", cat:"leger", text:"Coucher tôt — mais pas pour dormir." },
  { id:"l15", cat:"leger", text:"Se regarder dans les yeux 1 minute. Sans rien dire." },
  { id:"l16", cat:"leger", text:"Ce soir : dîner aux chandelles à la maison." },
  { id:"l17", cat:"leger", text:"Préparer un petit plateau et la/le surprendre." },
  { id:"l18", cat:"leger", text:"Trois choses pour lesquelles tu lui es reconnaissant·e — à voix haute." },
  { id:"l19", cat:"leger", text:"Cuisiner une seule recette ensemble — chacun une partie." },
  { id:"l20", cat:"leger", text:"Sortir marcher 20 min après dîner, main dans la main." },

  /* Profonds (30) */
  { id:"p01", cat:"profond", text:"« Si on devait recommencer ailleurs — où, et pourquoi ? »" },
  { id:"p02", cat:"profond", text:"« Qu'est-ce qui te fait peur dans cinq ans ? »" },
  { id:"p03", cat:"profond", text:"« Quel souvenir d'enfance te touche encore aujourd'hui ? »" },
  { id:"p04", cat:"profond", text:"« Qu'est-ce que j'ai fait récemment qui t'a vraiment ému·e ? »" },
  { id:"p05", cat:"profond", text:"« Quelle est ta plus grande fierté de l'année ? »" },
  { id:"p06", cat:"profond", text:"« Si tu avais 6 mois pour toi seul·e — tu en ferais quoi ? »" },
  { id:"p07", cat:"profond", text:"« À quel moment de notre vie tu reviendrais ? »" },
  { id:"p08", cat:"profond", text:"« Qu'est-ce que tu n'oses pas me demander ? »" },
  { id:"p09", cat:"profond", text:"« Quelle conversation aimerais-tu avoir avec un de tes parents aujourd'hui ? »" },
  { id:"p10", cat:"profond", text:"« Si tu pouvais effacer un regret — lequel ? »" },
  { id:"p11", cat:"profond", text:"Partager un secret que tu n'as jamais raconté." },
  { id:"p12", cat:"profond", text:"« Quelle promesse veux-tu qu'on se fasse pour l'an prochain ? »" },
  { id:"p13", cat:"profond", text:"« Quel rêve tu n'as jamais essayé de poursuivre ? »" },
  { id:"p14", cat:"profond", text:"« Ta version de la maison idéale dans 10 ans — décris-la-moi. »" },
  { id:"p15", cat:"profond", text:"Raconte le jour où tu as su que c'était nous." },
  { id:"p16", cat:"profond", text:"« Qu'est-ce qui te manque le plus quand on est séparé·e·s ? »" },
  { id:"p17", cat:"profond", text:"« Quelle est la dernière chose qui t'a vraiment bouleversé·e ? »" },
  { id:"p18", cat:"profond", text:"Décris précisément ce que tu aimes physiquement chez l'autre." },
  { id:"p19", cat:"profond", text:"« Qu'a-t-on évité de se dire ces derniers mois ? »" },
  { id:"p20", cat:"profond", text:"« Quel est le dernier livre/film qui t'a parlé de nous ? »" },
  { id:"p21", cat:"profond", text:"« Une seule chose à transmettre à nos enfants — laquelle ? »" },
  { id:"p22", cat:"profond", text:"Partage le rêve récurrent qui te marque." },
  { id:"p23", cat:"profond", text:"« Qu'est-ce que tu aimerais qu'on ose plus souvent ? »" },
  { id:"p24", cat:"profond", text:"« Quel souvenir de nous emporterais-tu si tu devais tout oublier ? »" },
  { id:"p25", cat:"profond", text:"« À quoi penses-tu quand tu n'as rien à faire ? »" },
  { id:"p26", cat:"profond", text:"« Qui t'a le plus appris — et que t'a-t-il dit ? »" },
  { id:"p27", cat:"profond", text:"« Qu'est-ce qui me rend différent·e des autres pour toi ? »" },
  { id:"p28", cat:"profond", text:"Faire la liste de 5 choses qu'on a réussies ensemble." },
  { id:"p29", cat:"profond", text:"« Quel paysage tu voudrais voir avant de mourir ? »" },
  { id:"p30", cat:"profond", text:"« Et s'il nous restait 6 mois — on ferait quoi demain ? »" },

  /* Drôles (10) */
  { id:"d01", cat:"drole", text:"Imite ma manière de râler. Sans pitié." },
  { id:"d02", cat:"drole", text:"On se note l'un l'autre sur 10. Façon Top Chef." },
  { id:"d03", cat:"drole", text:"Trouve un surnom ridicule pour moi ce soir." },
  { id:"d04", cat:"drole", text:"Rejouons la première fois qu'on s'est rencontrés — version exagérée." },
  { id:"d05", cat:"drole", text:"Karaoké sauvage à la maison. 3 chansons chacun, jury sévère." },
  { id:"d06", cat:"drole", text:"On échange nos rôles pendant 1 heure — toi tu fais moi." },
  { id:"d07", cat:"drole", text:"Concours du pire compliment possible (mais au 1er degré)." },
  { id:"d08", cat:"drole", text:"Inventons un slogan publicitaire pour notre couple." },
  { id:"d09", cat:"drole", text:"Dis-moi 3 choses bizarres que tu m'as cachées." },
  { id:"d10", cat:"drole", text:"Post-it des défauts mutuels. Sérieux : qui rit perd." }
];

/* ===== Utilitaires ========================================== */
const DAYS = [
  { key:"lundi", label:"Lundi" },
  { key:"mardi", label:"Mardi" },
  { key:"mercredi", label:"Mercredi" },
  { key:"jeudi", label:"Jeudi" },
  { key:"vendredi", label:"Vendredi" },
  { key:"samedi", label:"Samedi" },
  { key:"dimanche", label:"Dimanche" }
];

const MEAL_SLOTS = [
  { key:"petit-dej", label:"Petit-déjeuner" },
  { key:"diner", label:"Dîner" }
];

const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week: weekNo };
}

function getWeekKey(date) {
  const { year, week } = getISOWeek(date);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function getWeekDates(date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return DAYS.map((_, i) => {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    return dd;
  });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getSaison(date) {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "printemps";
  if (m >= 6 && m <= 8) return "été";
  if (m >= 9 && m <= 11) return "automne";
  return "hiver";
}

function formatDate(d) {
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]}`;
}

function formatDateFull(d) {
  return `${DAYS[(d.getDay() + 6) % 7].label} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`;
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/* ===== Seeded RNG (mulberry32) =============================== */
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffleSeeded(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ===== État (localStorage) =================================== */
const STORE_KEY = 'notre-cuisine-v1';

const State = {
  data: null,
  makeFresh() {
    return {
      v: 4,
      modeOverride: null,
      regen: {},
      swaps: {},
      checked: {},
      ritualsDone: {},
      ritualsSkipped: {},
      userRecipes: [],
      servingsKids: 6,
      servingsUs: 4,
      weekOffset: 0
    };
  },
  migrate(d) {
    if (!d || typeof d !== 'object') return this.makeFresh();
    if (!d.userRecipes) d.userRecipes = [];
    if (d.weekOffset === undefined) d.weekOffset = 0;
    if (!d.regen) d.regen = {};
    if (!d.swaps) d.swaps = {};
    if (!d.checked) d.checked = {};
    if (!d.ritualsDone) d.ritualsDone = {};
    if (!d.ritualsSkipped) d.ritualsSkipped = {};
    if ((d.v || 1) < 3) {
      d.swaps = {};
      d.regen = {};
      d.checked = {};
    }
    if (!d.servingsKids) d.servingsKids = d.servings || 6;
    if (!d.servingsUs) d.servingsUs = 4;
    delete d.servings;
    if (!('householdCode' in d)) d.householdCode = null;
    if (!('lastSyncedAt' in d)) d.lastSyncedAt = 0;
    if (d.swaps && typeof d.swaps === 'object') {
      const userIds = new Set((d.userRecipes || []).map(r => r.id));
      const validId = (id) => userIds.has(id) || RECIPES.some(r => r.id === id);
      for (const wkKey of Object.keys(d.swaps)) {
        const wk = d.swaps[wkKey];
        if (!wk || typeof wk !== 'object') { delete d.swaps[wkKey]; continue; }
        for (const slot of Object.keys(wk)) {
          if (!validId(wk[slot])) delete wk[slot];
        }
        if (Object.keys(wk).length === 0) delete d.swaps[wkKey];
      }
    }
    d.v = 4;
    return d;
  },
  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        this.data = this.migrate(JSON.parse(raw));
      } else {
        this.data = this.makeFresh();
      }
    } catch (e) {
      this.data = this.makeFresh();
    }
  },
  save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch(e) {}
  },
  reset() {
    this.data = this.makeFresh();
    this.save();
  }
};

/* ===== Date effective (avec offset semaine) =================== */
function effectiveDate() {
  const now = new Date();
  const off = (State.data && State.data.weekOffset) || 0;
  if (off === 0) return now;
  const d = new Date(now);
  d.setDate(now.getDate() + off * 7);
  return d;
}

/* ===== Mode (auto par parité ISO) ============================ */
function autoModeFor(date) {
  const { week } = getISOWeek(date);
  return (week % 2 === 0) ? 'kids' : 'us';
}

function currentMode() {
  if (State.data.modeOverride === 'kids' || State.data.modeOverride === 'us') {
    return State.data.modeOverride;
  }
  return autoModeFor(new Date());
}

function setMode(mode) {
  State.data.modeOverride = mode;
  State.save();
  document.body.classList.toggle('mode-us', mode === 'us');
  document.body.classList.toggle('mode-kids', mode === 'kids');
  const toggle = document.getElementById('mode-toggle');
  toggle.dataset.mode = mode;
  toggle.querySelectorAll('.mode-toggle-btn').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.mode === mode);
  });
  document.getElementById('hero-mode-label').textContent = mode === 'kids' ? 'la tribu' : 'nous deux';
  renderAll();
}

/* ===== Génération semaine ==================================== */
function allRecipes() {
  const user = (State.data && State.data.userRecipes) || [];
  return RECIPES.concat(user);
}

function eligible(meal, mode, saison) {
  return allRecipes().filter(r =>
    r.type === meal &&
    (r.mode === mode || r.mode === 'both') &&
    r.saison.includes(saison)
  );
}

const QUICK_THRESHOLD = 20;

function slotsForDay(dayIdx) {
  return dayIdx >= 5 ? ['petit-dej', 'midi', 'diner'] : ['petit-dej', 'diner'];
}

function generateWeek(weekKey, mode, saison) {
  const baseSeed = hashString(weekKey + ':' + mode);
  const regenCount = State.data.regen[weekKey + ':' + mode] || 0;
  const rng = mulberry32(baseSeed + regenCount * 7919);

  const week = {};
  const usedIds = new Set();
  const swaps = State.data.swaps[weekKey + ':' + mode] || {};

  const pdPool = shuffleSeeded(eligible('petit-dej', mode, saison), rng);
  DAYS.forEach((day, idx) => {
    const slotKey = day.key + '-petit-dej';
    let chosenId = null;
    if (swaps[slotKey] && findRecipe(swaps[slotKey])) {
      chosenId = swaps[slotKey];
    } else {
      let pick = pdPool.find(r => !usedIds.has(r.id));
      if (!pick) pick = pdPool[idx % pdPool.length];
      chosenId = pick ? pick.id : null;
    }
    if (chosenId) usedIds.add(chosenId);
    week[slotKey] = chosenId;
  });

  const allDiner = eligible('diner', mode, saison);
  const quickDiner = shuffleSeeded(allDiner.filter(r => r.temps <= QUICK_THRESHOLD), rng);
  const longDiner = shuffleSeeded(allDiner.filter(r => r.temps > QUICK_THRESHOLD), rng);

  DAYS.forEach((day, idx) => {
    const isWeekend = idx >= 5;
    const slots = isWeekend ? ['midi', 'diner'] : ['diner'];

    slots.forEach(slot => {
      const slotKey = day.key + '-' + slot;
      let chosenId = null;
      if (swaps[slotKey] && findRecipe(swaps[slotKey])) {
        chosenId = swaps[slotKey];
      } else if (!isWeekend) {
        let pick = quickDiner.find(r => !usedIds.has(r.id));
        if (!pick) pick = quickDiner[idx % Math.max(1, quickDiner.length)];
        if (!pick) pick = allDiner[idx % allDiner.length];
        chosenId = pick ? pick.id : null;
      } else {
        let pick = longDiner.find(r => !usedIds.has(r.id));
        if (!pick) pick = quickDiner.find(r => !usedIds.has(r.id));
        if (!pick) pick = allDiner[idx % allDiner.length];
        chosenId = pick ? pick.id : null;
      }
      if (chosenId) usedIds.add(chosenId);
      week[slotKey] = chosenId;
    });
  });

  return week;
}

function regenerateWeek(weekKey, mode) {
  const k = weekKey + ':' + mode;
  State.data.regen[k] = (State.data.regen[k] || 0) + 1;
  delete State.data.swaps[k];
  delete State.data.checked[k];
  State.save();
}

function swapMeal(weekKey, mode, slotKey, saison) {
  const k = weekKey + ':' + mode;
  if (!State.data.swaps[k]) State.data.swaps[k] = {};
  const week = generateWeek(weekKey, mode, saison);
  const currentId = week[slotKey];
  const isPetitDej = slotKey.endsWith('-petit-dej');
  const isMidi = slotKey.endsWith('-midi');
  const isDinerWeekday = !isPetitDej && !isMidi && (() => {
    const day = slotKey.split('-')[0];
    const idx = DAYS.findIndex(d => d.key === day);
    return idx < 5;
  })();
  const queryType = isPetitDej ? 'petit-dej' : 'diner';
  let candidates = eligible(queryType, mode, saison).filter(r => r.id !== currentId);
  if (isDinerWeekday) {
    const quick = candidates.filter(r => r.temps <= QUICK_THRESHOLD);
    if (quick.length > 0) candidates = quick;
  }
  if (candidates.length === 0) return;
  const usedInWeek = new Set(Object.values(week));
  const fresh = candidates.filter(r => !usedInWeek.has(r.id));
  const pool = fresh.length > 0 ? fresh : candidates;
  const rng = mulberry32(hashString(k + ':' + slotKey + ':' + Date.now()));
  const pick = pool[Math.floor(rng() * pool.length)];
  State.data.swaps[k][slotKey] = pick.id;
  State.save();
}

function findRecipe(id) {
  return allRecipes().find(r => r.id === id);
}

/* ===== Rendu Menus =========================================== */
function renderMenus() {
  const now = effectiveDate();
  const realNow = new Date();
  const mode = currentMode();
  const weekKey = getWeekKey(now);
  const saison = getSaison(now);
  const week = generateWeek(weekKey, mode, saison);
  const dates = getWeekDates(now);

  const { week: wno } = getISOWeek(now);
  document.getElementById('stat-week').textContent = String(wno).padStart(2,'0');
  document.getElementById('stat-recipes').textContent = '16';
  document.getElementById('stat-saison').textContent = saison.charAt(0).toUpperCase();
  document.getElementById('hero-mode-label').textContent = mode === 'kids' ? 'la tribu' : 'nous deux';
  document.getElementById('hero-sub').textContent = mode === 'kids'
    ? '5 dîners express + week-end complet, pour la maisonnée.'
    : '5 dîners express + week-end complet, plus libres.';

  document.getElementById('brand-date').textContent = formatDateFull(realNow);

  const off = State.data.weekOffset || 0;
  const navLabel = off === 0 ? 'Cette semaine' : off === 1 ? 'Semaine prochaine' : off === -1 ? 'Semaine dernière' : (off > 0 ? `Dans ${off} sem.` : `Il y a ${-off} sem.`);
  document.getElementById('week-nav-label').textContent = navLabel;

  const container = document.getElementById('days-container');
  container.innerHTML = '';

  DAYS.forEach((day, idx) => {
    const d = dates[idx];
    const isToday = isSameDay(d, realNow);
    const card = document.createElement('article');
    card.className = 'day-card' + (isToday ? ' today' : '');
    card.innerHTML = `
      <div class="day-head">
        <div class="day-name">${day.label.slice(0,1)}<em>${day.label.slice(1)}</em>${isToday ? '<span class="today-tag">Aujourd\'hui</span>' : ''}</div>
        <div class="day-date">${formatDate(d)}</div>
      </div>
    `;

    const daySlots = slotsForDay(idx).map(s =>
      s === 'petit-dej' ? { key:'petit-dej', label:'Petit-déjeuner' }
      : s === 'midi' ? { key:'midi', label:'Déjeuner' }
      : { key:'diner', label:'Dîner' }
    );
    daySlots.forEach(slot => {
      const slotKey = day.key + '-' + slot.key;
      const recipeId = week[slotKey];
      const r = findRecipe(recipeId);
      const row = document.createElement('div');
      row.className = 'meal-row';
      if (r) {
        const pal = paletteForRecipe(r);
        row.innerHTML = `
          <div class="meal-illu" style="background: ${pal.bg}; --cul-a: ${pal.a}; --cul-b: ${pal.b}">${illuFor(r)}</div>
          <div class="meal-content">
            <span class="meal-type">${slot.label}</span>
            <div class="meal-name">${r.nom}</div>
            <div class="meal-meta">
              <span class="m-time">${r.temps}′</span>
              <span class="m-diff">${'●'.repeat(r.difficulte)}${'○'.repeat(3-r.difficulte)}</span>
              <span class="culture-chip" style="--cul: ${pal.a}"><span class="culture-dot"></span>${pal.name}</span>
            </div>
          </div>
          <button class="swap-btn" data-slot="${slotKey}" aria-label="Remplacer ce plat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M8 21H3v-5"/><path d="m20 16-4 4-4-4"/></svg>
          </button>
        `;
      } else {
        row.innerHTML = `
          <div class="meal-illu empty"></div>
          <div class="meal-content">
            <span class="meal-type">${slot.label}</span>
            <div class="meal-name muted">—</div>
          </div>
          <span></span>
        `;
      }
      if (r) {
        row.addEventListener('click', (ev) => {
          if (ev.target.closest('.swap-btn')) return;
          openSheet(r.id);
        });
      }
      const swapBtn = row.querySelector('.swap-btn');
      swapBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        swapMeal(weekKey, mode, slotKey, saison);
        renderAll();
        toast('Plat remplacé.');
      });
      card.appendChild(row);
    });

    container.appendChild(card);
  });
}

/* ===== Rendu Courses ========================================= */
function renderCourses() {
  const now = effectiveDate();
  const mode = currentMode();
  const weekKey = getWeekKey(now);
  const saison = getSaison(now);
  const week = generateWeek(weekKey, mode, saison);

  const checkedKey = weekKey + ':' + mode;
  if (!State.data.checked[checkedKey]) State.data.checked[checkedKey] = {};

  const aggregator = new Map();
  const norm = (s) => s.toLowerCase().trim().replace(/s$/, '');
  Object.entries(week).forEach(([slotKey, rid]) => {
    if (slotKey.endsWith('-petit-dej')) return;
    const r = findRecipe(rid);
    if (!r) return;
    r.ingredients.forEach(ing => {
      const key = norm(ing.nom) + '|' + norm(ing.unite) + '|' + ing.rayon;
      if (aggregator.has(key)) {
        const ex = aggregator.get(key);
        ex.qte = round2(ex.qte + ing.qte);
      } else {
        aggregator.set(key, { nom: ing.nom, qte: ing.qte, unite: ing.unite, rayon: ing.rayon });
      }
    });
  });

  const RAYONS_ORDER = ['Fruits & Légumes','Boucherie','Poissonnerie','Crèmerie','Boulangerie','Épicerie salée','Épicerie sucrée','Surgelés','Boissons','Hygiène'];
  const byRayon = new Map();
  RAYONS_ORDER.forEach(r => byRayon.set(r, []));
  aggregator.forEach(v => {
    if (!byRayon.has(v.rayon)) byRayon.set(v.rayon, []);
    byRayon.get(v.rayon).push(v);
  });

  const container = document.getElementById('rayons-container');
  container.innerHTML = '';
  let totalItems = 0;
  let doneItems = 0;

  RAYONS_ORDER.forEach(rayon => {
    const items = byRayon.get(rayon) || [];
    if (items.length === 0) return;
    items.sort((a,b) => a.nom.localeCompare(b.nom, 'fr'));

    const section = document.createElement('div');
    section.className = 'rayon-section';
    section.dataset.rayon = rayon;
    section.innerHTML = `
      <div class="rayon-head">
        <h3><span class="rayon-dot"></span>${rayon}</h3>
      </div>
      <div class="ing-check-list"></div>
    `;
    const list = section.querySelector('.ing-check-list');

    items.forEach(it => {
      const key = norm(it.nom) + '|' + it.rayon;
      const isChecked = !!State.data.checked[checkedKey][key];
      totalItems++;
      if (isChecked) doneItems++;
      const row = document.createElement('div');
      row.className = 'ing-check' + (isChecked ? ' checked' : '');
      row.innerHTML = `
        <div class="checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div class="ing-check-label"><span class="qty">${formatQty(scaleQty(it.qte))} ${fmtUnit(it.unite, scaleQty(it.qte))}</span>${it.nom}</div>
      `;
      row.addEventListener('click', () => {
        if (State.data.checked[checkedKey][key]) {
          delete State.data.checked[checkedKey][key];
        } else {
          State.data.checked[checkedKey][key] = true;
        }
        State.save();
        renderCourses();
      });
      list.appendChild(row);
    });

    container.appendChild(section);
  });

  document.getElementById('courses-done').textContent = doneItems;
  document.getElementById('courses-total').textContent = totalItems;
  const pct = totalItems ? Math.round(doneItems / totalItems * 100) : 0;
  document.getElementById('progress-fill').style.width = pct + '%';

  document.getElementById('courses-empty').classList.toggle('hidden', totalItems > 0);
}

function formatQty(n) {
  if (Math.abs(n - Math.round(n)) < 0.01) return String(Math.round(n));
  return n.toFixed(1).replace(/\.0$/, '');
}

function round2(n) { return Math.round(n * 100) / 100; }

function getServings() {
  if (!State.data) return 6;
  const mode = currentMode();
  return mode === 'kids' ? (State.data.servingsKids || 6) : (State.data.servingsUs || 4);
}

function scaleQty(rawQty) {
  return round2(rawQty * (getServings() / 4));
}

const _UNIT_PLURALS = {
  'pièce':'pièces','tranche':'tranches','gousse':'gousses','boîte':'boîtes',
  'botte':'bottes','sachet':'sachets','branche':'branches','cube':'cubes',
  'tige':'tiges','morceau':'morceaux','brin':'brins','paquet':'paquets',
  'cuisse':'cuisses','filet':'filets','pavé':'pavés','crottin':'crottins',
  'magret':'magrets','pot':'pots','baguette':'baguettes','côte':'côtes',
  'rouleau':'rouleaux','feuille':'feuilles','tête':'têtes','litre':'litres',
  'dose':'doses','poignée':'poignées','portion':'portions','noix':'noix',
  'boule':'boules','pincée':'pincées'
};
const _UNIT_SINGS = Object.fromEntries(Object.entries(_UNIT_PLURALS).map(([s,p]) => [p,s]));

function fmtUnit(unit, qty) {
  if (!unit) return '';
  const want = qty >= 2 ? 'plural' : 'singular';
  for (const [sg, pl] of Object.entries(_UNIT_PLURALS)) {
    if (unit === sg) return want === 'plural' ? pl : sg;
    if (unit === pl) return want === 'plural' ? pl : sg;
    if (unit.startsWith(sg + ' ')) return (want === 'plural' ? pl : sg) + unit.slice(sg.length);
    if (unit.startsWith(pl + ' ')) return (want === 'plural' ? pl : sg) + unit.slice(pl.length);
  }
  return unit;
}

function hexA(hex, alpha) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0,2), 16);
  const g = parseInt(c.slice(2,4), 16);
  const b = parseInt(c.slice(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ===== Rendu Calendrier ====================================== */
function ritualForDate(date) {
  const seed = hashString(dateKey(date));
  const rng = mulberry32(seed);
  const pattern = [
    'leger','profond','drole','leger','profond','profond','leger'
  ];
  const dayIdx = ((date.getDay() + 6) % 7);
  const cat = pattern[dayIdx];
  const pool = RITUALS.filter(r => r.cat === cat);
  const pick = pool[Math.floor(rng() * pool.length)];
  return pick;
}

const RITUAL_ORNAMENT = {
  leger: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M 40 64 C 16 48 14 32 20 22 C 26 14 36 16 40 26 C 44 16 54 14 60 22 C 66 32 64 48 40 64 Z" fill="currentColor"/></svg>`,
  profond: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="34" y="36" width="12" height="32" rx="2" fill="currentColor" opacity="0.85"/><rect x="32" y="34" width="16" height="4" rx="1" fill="currentColor"/><path d="M 40 8 C 32 18 32 26 38 30 C 44 26 46 24 44 16 C 42 12 40 12 40 8 Z" fill="currentColor"/><ellipse cx="40" cy="34" rx="14" ry="3" fill="currentColor" opacity="0.35"/></svg>`,
  drole: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="14" fill="currentColor"/><g stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="40" y1="6" x2="40" y2="16"/><line x1="40" y1="64" x2="40" y2="74"/><line x1="6" y1="40" x2="16" y2="40"/><line x1="64" y1="40" x2="74" y2="40"/><line x1="14" y1="14" x2="22" y2="22"/><line x1="58" y1="58" x2="66" y2="66"/><line x1="14" y1="66" x2="22" y2="58"/><line x1="58" y1="22" x2="66" y2="14"/></g></svg>`
};

function renderCalendrier() {
  const today = new Date();
  const r = ritualForDate(today);
  const todayKey = dateKey(today);
  const done = !!State.data.ritualsDone[todayKey];
  const skipped = !!State.data.ritualsSkipped[todayKey];

  const card = document.getElementById('ritual-today');
  card.classList.toggle('done', done);
  card.classList.remove('leger','profond','drole');
  card.classList.add(r.cat);

  const ornament = card.querySelector('.ritual-ornament');
  if (ornament) ornament.innerHTML = RITUAL_ORNAMENT[r.cat];

  const catLbl = card.querySelector('.lbl');
  const catEl = card.querySelector('.ritual-cat');
  catEl.classList.remove('leger','profond','drole');
  catEl.classList.add(r.cat);
  catLbl.textContent = r.cat === 'leger' ? 'léger' : r.cat === 'profond' ? 'profond' : 'drôle';

  document.getElementById('ritual-today-text').textContent = r.text;

  const btnDone = document.getElementById('btn-ritual-done');
  const btnSkip = document.getElementById('btn-ritual-skip');
  if (done) {
    btnDone.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Fait';
    btnDone.disabled = true;
  } else {
    btnDone.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> C\'est fait';
    btnDone.disabled = false;
  }
  btnSkip.textContent = skipped ? 'Sauté' : 'Pas ce soir';
  btnSkip.disabled = skipped;

  const upcoming = document.getElementById('upcoming-list');
  upcoming.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const rr = ritualForDate(d);
    const cardEl = document.createElement('div');
    cardEl.className = 'upcoming-card ' + rr.cat;
    const lblDate = i === 1 ? 'Demain' : `${DAYS[(d.getDay()+6)%7].label.slice(0,3)} ${d.getDate()}`;
    cardEl.innerHTML = `
      <div class="upcoming-day">${lblDate}</div>
      <div class="upcoming-text"><span class="cat-mini ${rr.cat}"></span>${rr.text}</div>
    `;
    upcoming.appendChild(cardEl);
  }
}

/* ===== Bottom sheet (détail recette) ========================= */
function openSheet(recipeId) {
  const r = findRecipe(recipeId);
  if (!r) return;
  const body = document.getElementById('sheet-body');
  const pal = paletteForRecipe(r);
  const saisonLabel = r.saison.length === 4 ? 'Toute saison' : r.saison.join(', ');

  body.innerHTML = `
    <div class="sheet-banner" style="background: linear-gradient(150deg, ${pal.bg} 0%, ${pal.bg} 60%, ${hexA(pal.a, 0.18)} 100%);">
      <div class="sheet-illu">${illuFor(r)}</div>
      <div class="sheet-banner-tag" style="color: ${pal.c}; background: ${hexA(pal.a, 0.18)};"><span class="culture-dot" style="background: ${pal.a}"></span>${pal.name}</div>
    </div>
    <div class="sheet-head">
      <h2>${r.nom.replace(/\s+([&à])/g, ' <em>$1</em>')}</h2>
      <div class="recipe-tags">
        <span class="tag">${r.temps} min</span>
        <span class="tag terra">${'●'.repeat(r.difficulte) + '○'.repeat(3-r.difficulte)} difficulté</span>
        <span class="tag olive">${saisonLabel}</span>
        <span class="tag">${r.type === 'petit-dej' ? 'Petit-déj' : 'Dîner'}</span>
      </div>
    </div>
    <div class="recipe-section">
      <h3><span class="filet"></span>Ingrédients <span class="muted" style="font-weight:400; font-family:var(--font-sans); font-size:0.85rem;"> · pour ${getServings()}</span></h3>
      <ul class="ing-list">
        ${r.ingredients.map(i => `<li class="ing-item"><span class="ing-qty">${formatQty(scaleQty(i.qte))} ${fmtUnit(i.unite, scaleQty(i.qte))}</span><span class="ing-name">${i.nom}</span><span class="ing-rayon">${i.rayon}</span></li>`).join('')}
      </ul>
    </div>
    <div class="recipe-section">
      <h3><span class="filet"></span>Préparation</h3>
      <ol class="steps-list">
        ${r.etapes.map(e => `<li class="step-item">${e}</li>`).join('')}
      </ol>
    </div>
  `;

  document.getElementById('sheet').classList.add('open');
  document.getElementById('sheet-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  document.getElementById('sheet').classList.remove('open');
  document.getElementById('sheet-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== Toast ================================================= */
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ===== Réglages ============================================== */
function exportData() {
  const blob = new Blob([JSON.stringify(State.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `notre-cuisine-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Sauvegarde exportée.');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const obj = JSON.parse(ev.target.result);
      if (typeof obj === 'object' && obj.v) {
        State.data = obj;
        State.save();
        renderAll();
        toast('Sauvegarde restaurée.');
      } else {
        toast('Fichier invalide.');
      }
    } catch (e) {
      toast('Fichier illisible.');
    }
  };
  reader.readAsText(file);
}

function resetAll() {
  if (!confirm('Tout effacer définitivement ?\n\nTes recettes perso, rituels marqués, plats swappés — tout sera perdu.')) return;
  State.reset();
  setMode(autoModeFor(new Date()));
  toast('Réinitialisé.');
}

function resetPlanning() {
  if (!confirm('Repartir d\'une planif neuve ?\n\nLes plats swappés et la liste de courses cochée seront réinitialisés. Tes recettes perso et tes rituels sont gardés.\n\nUtile pour reconverger entre ton téléphone et celui de ta partenaire.')) return;
  State.data.swaps = {};
  State.data.regen = {};
  State.data.checked = {};
  State.save();
  renderAll();
  toast('Planif réinitialisée.');
}

/* ===== Navigation ============================================ */
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    const isActive = b.dataset.view === view;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive);
  });
  if (view === 'menus') renderMenus();
  if (view === 'courses') renderCourses();
  if (view === 'calendrier') renderCalendrier();
  if (view === 'reglages') renderReglages();
  window.scrollTo(0, 0);
}

function renderReglages() {
  const total = RECIPES.length + (State.data.userRecipes || []).length;
  document.getElementById('info-recipes').textContent = total + (State.data.userRecipes.length ? ` (dont ${State.data.userRecipes.length} perso)` : '');
  document.getElementById('info-rituals').textContent = RITUALS.length;

  const sKids = State.data.servingsKids || 6;
  const sUs = State.data.servingsUs || 4;
  document.querySelectorAll('#servings-kids-toggle button').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.servings) === sKids);
  });
  document.querySelectorAll('#servings-us-toggle button').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.servings) === sUs);
  });
  const kidsSubEl = document.getElementById('servings-kids-sub');
  const usSubEl = document.getElementById('servings-us-sub');
  if (kidsSubEl) kidsSubEl.textContent = `Recettes scalées pour ${sKids} portions (dîner 4 + 2 restes midi)`;
  if (usSubEl) usSubEl.textContent = `Recettes scalées pour ${sUs} portions (2 dîners + ${sUs - 2} restes)`;

  renderUserRecipesList();

  const syncStatusEl = document.getElementById('sync-status');
  const syncCodeBox = document.getElementById('sync-code-box');
  const syncCodeVal = document.getElementById('sync-code-value');
  const syncActBtn = document.getElementById('btn-sync-activate');
  const syncJoinBtn = document.getElementById('btn-sync-join');
  const syncDisBtn = document.getElementById('btn-sync-disable');
  if (syncStatusEl) {
    if (!syncIsConfigured()) {
      syncStatusEl.textContent = 'Pas encore configurée — voir instructions.';
      syncCodeBox.style.display = 'none';
      syncActBtn.style.opacity = '0.5';
      syncJoinBtn.style.opacity = '0.5';
      syncDisBtn.style.display = 'none';
    } else if (syncIsActive()) {
      syncStatusEl.textContent = 'Activée — appareil dans le foyer ' + State.data.householdCode;
      syncCodeBox.style.display = 'block';
      syncCodeVal.textContent = State.data.householdCode;
      syncActBtn.style.display = 'none';
      syncJoinBtn.style.display = 'flex';
      syncDisBtn.style.display = 'flex';
    } else {
      syncStatusEl.textContent = 'Inactive — active-la pour synchroniser tes appareils.';
      syncCodeBox.style.display = 'none';
      syncActBtn.style.display = 'flex';
      syncActBtn.style.opacity = '1';
      syncJoinBtn.style.display = 'flex';
      syncJoinBtn.style.opacity = '1';
      syncDisBtn.style.display = 'none';
    }
  }

  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const installSub = document.getElementById('install-sub');
  const installHint = document.getElementById('ios-install-hint');
  if (standalone) {
    installSub.textContent = 'Application déjà installée.';
    installHint.style.display = 'none';
  } else if (isiOS) {
    installSub.textContent = 'Sur iPhone : voir l\'astuce ci-dessous.';
    installHint.style.display = 'block';
  } else if (window.__deferredInstall) {
    installSub.textContent = 'Touche ici pour installer.';
    installHint.style.display = 'none';
  } else {
    installSub.textContent = 'Pour l\'avoir sous la main.';
    installHint.style.display = 'none';
  }
}

/* ===== Force refresh ====================================== */
async function forceRefresh() {
  if (!confirm("Actualiser l'app et récupérer la dernière version ?\n\nCela vide le cache et recharge. Tes données restent sauvegardées.")) return;
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
  } catch (e) {}
  location.reload();
}

/* ===== Mes recettes ========================================= */
function renderUserRecipesList() {
  const list = document.getElementById('user-recipes-list');
  const empty = document.getElementById('user-recipes-empty');
  const recipes = State.data.userRecipes || [];
  list.innerHTML = '';
  empty.style.display = recipes.length === 0 ? 'block' : 'none';
  recipes.forEach(r => {
    const pal = paletteForRecipe(r);
    const card = document.createElement('button');
    card.className = 'user-recipe-card';
    card.innerHTML = `
      <div class="meal-illu" style="background: ${pal.bg}; --cul-a: ${pal.a}; --cul-b: ${pal.b}; width:48px; height:48px; border-radius:14px;">${illuFor(r)}</div>
      <div class="user-recipe-info">
        <div class="user-recipe-name">${escapeHtml(r.nom)}</div>
        <div class="user-recipe-meta">
          <span>${r.temps}′</span>
          <span>${r.type === 'petit-dej' ? 'Petit-déj' : 'Dîner'}</span>
          <span>${r.mode === 'kids' ? 'Ados' : r.mode === 'us' ? 'Nous' : 'Les deux'}</span>
          <span class="culture-chip" style="--cul:${pal.a}"><span class="culture-dot"></span>${pal.name}</span>
        </div>
      </div>
      <svg class="settings-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg>
    `;
    card.addEventListener('click', () => openRecipeForm(r));
    list.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

let editingRecipeId = null;

function openRecipeForm(existing) {
  editingRecipeId = existing ? existing.id : null;
  const titleEl = document.getElementById('recipe-modal-title');
  titleEl.textContent = existing ? 'Modifier la recette' : 'Nouvelle recette';

  const f = document.getElementById('recipe-form');
  f.nom.value = existing ? existing.nom : '';
  f.id.value = existing ? existing.id : '';
  f.culture.value = existing ? existing.culture : 'international';
  f.temps.value = existing ? existing.temps : 25;

  ['mode','type','difficulte'].forEach(group => {
    const target = existing
      ? (group === 'difficulte' ? String(existing.difficulte) : existing[group])
      : (group === 'mode' ? 'both' : group === 'type' ? 'diner' : '1');
    f.querySelectorAll(`.seg-group[data-name="${group}"] button`).forEach(b => {
      b.classList.toggle('active', b.dataset.val === target);
    });
  });

  const saisons = existing ? existing.saison : ['printemps','été','automne','hiver'];
  f.querySelectorAll('.chip-checks[data-name="saison"] input').forEach(i => {
    i.checked = saisons.includes(i.value);
  });

  if (existing) {
    f.ingredients.value = existing.ingredients.map(i => `${i.qte} | ${i.unite} | ${i.nom} | ${i.rayon}`).join('\n');
    f.etapes.value = existing.etapes.join('\n');
  } else {
    f.ingredients.value = '';
    f.etapes.value = '';
  }

  document.getElementById('recipe-delete-btn').style.display = existing ? 'block' : 'none';

  document.getElementById('recipe-modal').classList.add('open');
  document.getElementById('recipe-modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRecipeForm() {
  document.getElementById('recipe-modal').classList.remove('open');
  document.getElementById('recipe-modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  editingRecipeId = null;
}

function saveRecipeForm() {
  const f = document.getElementById('recipe-form');
  const nom = f.nom.value.trim();
  if (!nom) { toast('Le nom est requis.'); return; }

  const getSegVal = (group) => {
    const a = f.querySelector(`.seg-group[data-name="${group}"] button.active`);
    return a ? a.dataset.val : null;
  };
  const mode = getSegVal('mode') || 'both';
  const type = getSegVal('type') || 'diner';
  const difficulte = parseInt(getSegVal('difficulte') || '1', 10);

  const saison = Array.from(f.querySelectorAll('.chip-checks[data-name="saison"] input:checked')).map(i => i.value);
  if (saison.length === 0) { toast('Au moins une saison.'); return; }

  const culture = f.culture.value;
  const temps = parseInt(f.temps.value, 10) || 25;

  const ingLines = f.ingredients.value.split('\n').map(l => l.trim()).filter(Boolean);
  const ingredients = [];
  for (const line of ingLines) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 4) { toast('Format ingrédient invalide :\n' + line); return; }
    const [qte, unite, name, rayon] = parts;
    const q = parseFloat(qte.replace(',', '.'));
    if (isNaN(q)) { toast('Quantité invalide : ' + qte); return; }
    ingredients.push({ nom: name, qte: q, unite, rayon });
  }
  if (ingredients.length === 0) { toast('Au moins un ingrédient.'); return; }

  const etapes = f.etapes.value.split('\n').map(l => l.trim()).filter(Boolean);
  if (etapes.length === 0) { toast('Au moins une étape.'); return; }

  const id = editingRecipeId || ('u_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6));
  const recipe = { id, nom, mode, type, saison, culture, temps, difficulte, ingredients, etapes, user: true };

  if (editingRecipeId) {
    const idx = State.data.userRecipes.findIndex(r => r.id === editingRecipeId);
    if (idx >= 0) State.data.userRecipes[idx] = recipe;
    else State.data.userRecipes.push(recipe);
  } else {
    State.data.userRecipes.push(recipe);
  }

  State.save();
  closeRecipeForm();
  renderAll();
  toast(editingRecipeId ? 'Recette modifiée.' : 'Recette ajoutée.');
}

function deleteCurrentRecipe() {
  if (!editingRecipeId) return;
  if (!confirm('Supprimer cette recette ?')) return;
  State.data.userRecipes = State.data.userRecipes.filter(r => r.id !== editingRecipeId);
  State.save();
  closeRecipeForm();
  renderAll();
  toast('Recette supprimée.');
}

function renderAll() {
  renderMenus();
  renderCourses();
  renderCalendrier();
  renderReglages();
}

/* ===== Installation PWA ====================================== */
window.__deferredInstall = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__deferredInstall = e;
  renderReglages();
});

window.addEventListener('appinstalled', () => {
  window.__deferredInstall = null;
  toast('Application installée.');
  renderReglages();
});

/* ===== Init ================================================== */
/* ============================================================
   Sync temps réel — Firebase Realtime Database
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCXJe_K0Yw4y4twCTj42A8l52s22yv3ods",
  authDomain: "ma-cuisine-269e9.firebaseapp.com",
  databaseURL: "https://ma-cuisine-269e9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ma-cuisine-269e9",
  storageBucket: "ma-cuisine-269e9.firebasestorage.app",
  messagingSenderId: "251138635702",
  appId: "1:251138635702:web:47e5f8abcc7d7b0decb317"
};

const SYNC = {
  loaded: false,
  app: null,
  db: null,
  ref: null,
  active: false,
  pushDebounce: null,
  lastAppliedHash: null,
  selfPushAt: 0
};

function syncIsConfigured() { return !!FIREBASE_CONFIG; }
function syncIsActive() { return SYNC.active; }

async function _loadFirebaseSDK() {
  if (window.firebase) return;
  const v = '10.7.0';
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://www.gstatic.com/firebasejs/${v}/firebase-app-compat.js`;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://www.gstatic.com/firebasejs/${v}/firebase-database-compat.js`;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function _genHouseholdCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s.slice(0, 4) + '-' + s.slice(4);
}

function _normCode(c) {
  return (c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8).replace(/^(.{4})(.{0,4})$/, '$1-$2');
}

function _syncDataHash() {
  return JSON.stringify({
    s: State.data.swaps || {},
    r: State.data.regen || {},
    c: State.data.checked || {}
  });
}

async function syncActivate(code) {
  if (!syncIsConfigured()) {
    toast('Sync Firebase non configurée.');
    return false;
  }
  try {
    await _loadFirebaseSDK();
  } catch (e) {
    toast('Impossible de charger Firebase.');
    return false;
  }
  if (!SYNC.app) {
    SYNC.app = firebase.initializeApp(FIREBASE_CONFIG);
    SYNC.db = firebase.database();
  }
  const norm = _normCode(code);
  if (norm.length < 9) {
    toast('Code invalide.');
    return false;
  }
  if (SYNC.ref) SYNC.ref.off();
  State.data.householdCode = norm;
  State.save();

  SYNC.ref = SYNC.db.ref('households/' + norm);
  SYNC.ref.on('value', (snap) => {
    const remote = snap.val();
    if (!remote) {
      const localHash = _syncDataHash();
      if (localHash !== JSON.stringify({s:{},r:{},c:{}})) {
        _syncPushNow();
      }
      return;
    }
    if (Date.now() - SYNC.selfPushAt < 1500) return;
    const remoteHash = JSON.stringify({
      s: remote.swaps || {},
      r: remote.regen || {},
      c: remote.checked || {}
    });
    if (remoteHash === _syncDataHash()) return;
    if ((remote.lastModified || 0) <= (State.data.lastSyncedAt || 0)) return;
    State.data.swaps = remote.swaps || {};
    State.data.regen = remote.regen || {};
    State.data.checked = remote.checked || {};
    State.data.lastSyncedAt = remote.lastModified;
    SYNC.lastAppliedHash = remoteHash;
    State._origSave ? State._origSave() : localStorage.setItem(STORE_KEY, JSON.stringify(State.data));
    renderAll();
    toast('Mise à jour reçue.');
  });
  SYNC.active = true;
  renderReglages();
  return true;
}

function _syncPushNow() {
  if (!SYNC.active || !SYNC.ref) return;
  const payload = {
    swaps: State.data.swaps || {},
    regen: State.data.regen || {},
    checked: State.data.checked || {},
    lastModified: Date.now()
  };
  SYNC.selfPushAt = payload.lastModified;
  SYNC.ref.set(payload).catch(() => {});
  State.data.lastSyncedAt = payload.lastModified;
  SYNC.lastAppliedHash = _syncDataHash();
}

function syncScheduledPush() {
  if (!SYNC.active) return;
  if (_syncDataHash() === SYNC.lastAppliedHash) return;
  if (SYNC.pushDebounce) clearTimeout(SYNC.pushDebounce);
  SYNC.pushDebounce = setTimeout(_syncPushNow, 600);
}

function syncDeactivate() {
  if (SYNC.ref) SYNC.ref.off();
  SYNC.active = false;
  SYNC.ref = null;
  State.data.householdCode = null;
  State.data.lastSyncedAt = 0;
  State.save();
  renderReglages();
  toast('Sync désactivée.');
}

async function syncStart(useExisting) {
  if (!syncIsConfigured()) {
    alert("La sync Firebase n'est pas encore configurée.\n\nVoir les instructions dans le README.");
    return;
  }
  let code;
  if (useExisting) {
    code = prompt('Colle le code maison de l\'autre appareil (ex. ABCD-EFGH) :');
    if (!code) return;
    code = _normCode(code);
    if (code.length < 9) { toast('Code invalide.'); return; }
  } else {
    code = _genHouseholdCode();
  }
  const ok = await syncActivate(code);
  if (ok) {
    toast('Sync activée : ' + code);
  }
}

async function syncShareCode() {
  const code = State.data.householdCode;
  if (!code) { toast('Pas de code à partager.'); return; }
  const text = `Code maison Notre Cuisine : ${code}\n\nDans l'app : Réglages → Rejoindre un code → colle ce code.\n${location.origin}${location.pathname}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Code maison', text });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      toast('Code copié : ' + code);
    } else {
      prompt('Code à transmettre :', code);
    }
  } catch (e) {}
}

async function syncTryAutoActivate() {
  if (syncIsConfigured() && State.data.householdCode) {
    await syncActivate(State.data.householdCode);
  }
}

(function wrapStateSave() {
  const orig = State.save.bind(State);
  State._origSave = orig;
  State.save = function() {
    orig();
    syncScheduledPush();
  };
})();

/* ===== Sync entre partenaires (via URL) ===================== */
function buildShareURL() {
  const now = effectiveDate();
  const wk = getWeekKey(now);
  const mode = currentMode();
  const k = wk + ':' + mode;
  const payload = {
    wk,
    m: mode,
    r: State.data.regen[k] || 0,
    s: State.data.swaps[k] || {}
  };
  const enc = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  return location.origin + location.pathname + '?sync=' + enc;
}

async function shareWeek() {
  const url = buildShareURL();
  const text = `Ma semaine sur Notre Cuisine — ouvre le lien pour la recevoir :\n${url}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Notre Cuisine — semaine', text, url });
      toast('Partagé.');
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast('Lien copié dans le presse-papier.');
    } else {
      prompt('Copie ce lien et envoie-le à ton/ta partenaire :', url);
    }
  } catch (e) {}
}

function applySharedWeekIfPresent() {
  const params = new URLSearchParams(location.search);
  const enc = params.get('sync');
  if (!enc) return;
  try {
    const json = decodeURIComponent(escape(atob(enc)));
    const data = JSON.parse(json);
    if (!data.wk || !data.m) return;
    const modeLabel = data.m === 'kids' ? 'avec les ados' : 'rien que nous';
    if (confirm(`Synchroniser la semaine ${data.wk} (${modeLabel}) envoyée par ton/ta partenaire ?\n\nCela remplacera tes choix de plats pour cette semaine.`)) {
      const k = data.wk + ':' + data.m;
      if (!State.data.regen) State.data.regen = {};
      if (!State.data.swaps) State.data.swaps = {};
      State.data.regen[k] = data.r;
      State.data.swaps[k] = data.s;
      delete State.data.checked[k];
      State.save();
      toast('Semaine synchronisée.');
    }
  } catch (e) {
    console.warn('Sync invalide', e);
  }
  history.replaceState(null, '', location.origin + location.pathname);
}

function init() {
  State.load();
  applySharedWeekIfPresent();
  syncTryAutoActivate();

  const mode = currentMode();
  document.body.classList.toggle('mode-us', mode === 'us');
  document.body.classList.toggle('mode-kids', mode === 'kids');
  const toggle = document.getElementById('mode-toggle');
  toggle.dataset.mode = mode;
  toggle.querySelectorAll('.mode-toggle-btn').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.mode === mode);
    b.addEventListener('click', () => setMode(b.dataset.mode));
  });

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.addEventListener('click', () => switchView(b.dataset.view));
  });

  document.getElementById('fab-regen').addEventListener('click', () => {
    const wk = getWeekKey(new Date());
    regenerateWeek(wk, currentMode());
    renderAll();
    toast('Semaine régénérée.');
  });

  document.getElementById('btn-regen-week').addEventListener('click', () => {
    const wk = getWeekKey(new Date());
    regenerateWeek(wk, currentMode());
    renderAll();
    toast('Semaine régénérée.');
  });

  document.getElementById('btn-go-courses').addEventListener('click', () => switchView('courses'));

  document.getElementById('btn-reset-courses').addEventListener('click', () => {
    const k = getWeekKey(new Date()) + ':' + currentMode();
    State.data.checked[k] = {};
    State.save();
    renderCourses();
    toast('Liste réinitialisée.');
  });

  document.getElementById('btn-ritual-done').addEventListener('click', () => {
    const k = dateKey(new Date());
    State.data.ritualsDone[k] = true;
    delete State.data.ritualsSkipped[k];
    State.save();
    renderCalendrier();
    toast('Bien joué, vous deux.');
  });

  document.getElementById('btn-ritual-skip').addEventListener('click', () => {
    const k = dateKey(new Date());
    State.data.ritualsSkipped[k] = true;
    State.save();
    renderCalendrier();
  });

  document.getElementById('sheet-backdrop').addEventListener('click', closeSheet);

  let sheetStartY = null;
  const sheet = document.getElementById('sheet');
  sheet.addEventListener('touchstart', (e) => {
    if (e.target.closest('.sheet-body') && document.getElementById('sheet-body').scrollTop > 0) return;
    sheetStartY = e.touches[0].clientY;
  });
  sheet.addEventListener('touchmove', (e) => {
    if (sheetStartY === null) return;
    const dy = e.touches[0].clientY - sheetStartY;
    if (dy > 10) sheet.style.transform = `translateY(${dy}px)`;
  });
  sheet.addEventListener('touchend', (e) => {
    if (sheetStartY === null) return;
    const dy = e.changedTouches[0].clientY - sheetStartY;
    sheet.style.transform = '';
    if (dy > 120) closeSheet();
    sheetStartY = null;
  });

  document.getElementById('btn-install').addEventListener('click', async () => {
    if (window.__deferredInstall) {
      window.__deferredInstall.prompt();
      const choice = await window.__deferredInstall.userChoice;
      if (choice.outcome === 'accepted') toast('Installation lancée.');
      window.__deferredInstall = null;
      renderReglages();
    } else {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if (standalone) {
        toast('Déjà installée.');
      } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        toast('Voir l\'astuce iPhone ci-dessous.');
      } else {
        toast('Va dans le menu du navigateur > Installer.');
      }
    }
  });

  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (f) importData(f);
    e.target.value = '';
  });
  document.getElementById('btn-reset').addEventListener('click', resetAll);
  document.getElementById('btn-reset-planning').addEventListener('click', resetPlanning);

  document.getElementById('btn-sync-activate').addEventListener('click', () => syncStart(false));
  document.getElementById('btn-sync-join').addEventListener('click', () => syncStart(true));
  document.getElementById('btn-sync-disable').addEventListener('click', () => {
    if (confirm('Désactiver la sync sur cet appareil ?')) syncDeactivate();
  });
  document.getElementById('btn-sync-share').addEventListener('click', syncShareCode);

  document.querySelectorAll('.week-nav-btn').forEach(b => {
    b.addEventListener('click', () => {
      const dir = parseInt(b.dataset.dir, 10);
      State.data.weekOffset = (State.data.weekOffset || 0) + dir;
      State.save();
      renderAll();
    });
  });

  document.getElementById('week-nav-label').addEventListener('click', () => {
    if ((State.data.weekOffset || 0) !== 0) {
      State.data.weekOffset = 0;
      State.save();
      renderAll();
      toast('Retour à la semaine en cours.');
    }
  });

  document.querySelectorAll('#servings-kids-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      State.data.servingsKids = parseInt(b.dataset.servings, 10);
      State.save();
      renderReglages();
      renderCourses();
      toast('Portions ados : ' + State.data.servingsKids + '.');
    });
  });
  document.querySelectorAll('#servings-us-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      State.data.servingsUs = parseInt(b.dataset.servings, 10);
      State.save();
      renderReglages();
      renderCourses();
      toast('Portions couple : ' + State.data.servingsUs + '.');
    });
  });

  document.getElementById('btn-refresh').addEventListener('click', forceRefresh);
  document.getElementById('btn-share-week').addEventListener('click', shareWeek);
  document.getElementById('btn-add-recipe').addEventListener('click', () => openRecipeForm(null));
  document.getElementById('recipe-modal-close').addEventListener('click', closeRecipeForm);
  document.getElementById('recipe-modal-backdrop').addEventListener('click', closeRecipeForm);
  document.getElementById('recipe-modal-save').addEventListener('click', saveRecipeForm);
  document.getElementById('recipe-delete-btn').addEventListener('click', deleteCurrentRecipe);

  document.querySelectorAll('#recipe-form .seg-group button').forEach(b => {
    b.addEventListener('click', () => {
      const parent = b.parentElement;
      parent.querySelectorAll('button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  renderAll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
