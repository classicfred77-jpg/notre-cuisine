/* ============================================================
   NOTRE CUISINE — app.js
   Single-file logic. No framework. localStorage only.
   ============================================================ */
'use strict';

/* ===== Palettes par culture ================================== */
const PALETTES = {
  'italien':       { bg:'#F4E4D4', a:'#B83D2E', b:'#6B9A4A', c:'#5A1E1E', name:'Italien' },
  'asiatique':     { bg:'#E0EAD9', a:'#D55A39', b:'#4A7C59', c:'#2A4A33', name:'Asiatique' },
  'méditerranéen': { bg:'#E2EBEF', a:'#6989A8', b:'#8FA644', c:'#3D5363', name:'Méditerranéen' },
  'français':      { bg:'#F4D9CC', a:'#7A2E2E', b:'#C4623F', c:'#5A1E1E', name:'Français' },
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
/* --- Petits-déjeuners (15) --- */
{ id:"pd01", nom:"Tartines beurre & confiture maison", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:5, difficulte:1,
  ingredients:[
    { nom:"Pain de campagne tranché", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre demi-sel", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Confiture au choix", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Oranges à presser", qte:4, unite:"pièces", rayon:"Fruits & Légumes" }
  ],
  etapes:["Toaster les tranches de pain.","Tartiner d'une couche de beurre demi-sel.","Étaler la confiture.","Servir avec un jus d'orange fraîchement pressé."] },

{ id:"pd02", nom:"Porridge avoine, pomme & cannelle", mode:"both", type:"petit-dej", saison:["automne","hiver","printemps"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Flocons d'avoine", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait demi-écrémé", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pomme", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Cannelle", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Miel", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Verser flocons et lait dans une casserole.","Cuire à feu doux 5 min en remuant.","Râper la pomme dans le bol.","Ajouter cannelle et miel, mélanger."] },

{ id:"pd03", nom:"Œufs brouillés & pain grillé", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:10, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Beurre", qte:20, unite:"g", rayon:"Crèmerie" },
    { nom:"Lait", qte:5, unite:"cl", rayon:"Crèmerie" },
    { nom:"Pain de mie complet", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Ciboulette", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Battre les œufs avec lait, sel et poivre.","Faire fondre le beurre à feu doux dans une poêle.","Verser les œufs, remuer lentement jusqu'à texture crémeuse.","Toaster le pain et parsemer de ciboulette ciselée."] },

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
  etapes:["Mélanger farine, levure et sucre.","Ajouter œufs et lait, fouetter.","Cuire de petites louches à la poêle, 1 min par face.","Servir avec fruits rouges et sirop d'érable."] },

{ id:"pd05", nom:"Tartines avocat & œuf poché", mode:"us", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:15, difficulte:2,
  ingredients:[
    { nom:"Pain au levain", qte:2, unite:"tranches épaisses", rayon:"Boulangerie" },
    { nom:"Avocat mûr", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Œufs extra-frais", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Citron", qte:0.5, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Piment d'Espelette", qte:1, unite:"pincée", rayon:"Épicerie salée" },
    { nom:"Vinaigre blanc", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Écraser l'avocat avec citron, sel et piment.","Tartiner sur le pain grillé.","Pocher les œufs dans l'eau frémissante vinaigrée, 3 min.","Déposer un œuf sur chaque tartine, finir d'une pincée de piment."] },

{ id:"pd06", nom:"Bircher muesli yaourt & fruits", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:5, difficulte:1,
  ingredients:[
    { nom:"Flocons d'avoine", qte:60, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Yaourt nature", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Pomme", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Raisins secs", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Amandes effilées", qte:20, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Miel", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["La veille : tremper l'avoine dans le yaourt.","Le matin : râper la pomme dans le bol.","Ajouter raisins, amandes et miel.","Mélanger et servir."] },

{ id:"pd07", nom:"Smoothie bowl banane mangue granola", mode:"kids", type:"petit-dej", saison:["été","printemps"], culture:"international", temps:8, difficulte:1,
  ingredients:[
    { nom:"Banane", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Mangue surgelée", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Yaourt nature", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Granola", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Graines de chia", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Mixer banane, mangue et yaourt en purée épaisse.","Verser dans des bols.","Parsemer généreusement de granola.","Ajouter les graines de chia."] },

{ id:"pd08", nom:"Pain perdu brioche & miel", mode:"both", type:"petit-dej", saison:["automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Brioche rassise", qte:6, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Miel", qte:4, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Vanille en poudre", qte:1, unite:"pincée", rayon:"Épicerie sucrée" }
  ],
  etapes:["Battre œufs, lait et vanille.","Tremper les tranches de brioche.","Dorer au beurre 2 min par face.","Servir nappé de miel chaud."] },

{ id:"pd09", nom:"Yaourt grec, miel, noix & graines", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"international", temps:3, difficulte:1,
  ingredients:[
    { nom:"Yaourt grec entier", qte:2, unite:"pots", rayon:"Crèmerie" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Cerneaux de noix", qte:40, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Graines de tournesol", qte:20, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Fruit de saison", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Verser le yaourt dans des bols.","Concasser grossièrement les noix.","Ajouter noix, graines et miel.","Couronner d'un fruit frais coupé."] },

{ id:"pd10", nom:"Tartine fromage blanc, figues & amandes", mode:"us", type:"petit-dej", saison:["été","automne"], culture:"méditerranéen", temps:7, difficulte:1,
  ingredients:[
    { nom:"Pain au levain", qte:2, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Fromage blanc", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Figues fraîches", qte:4, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Amandes torréfiées", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Miel de fleurs", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Toaster le pain.","Étaler généreusement le fromage blanc.","Disposer les figues en quartiers.","Parsemer d'amandes concassées et d'un filet de miel."] },

{ id:"pd11", nom:"Granola maison, lait & myrtilles", mode:"both", type:"petit-dej", saison:["printemps","été","automne"], culture:"international", temps:5, difficulte:1,
  ingredients:[
    { nom:"Granola", qte:120, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Lait demi-écrémé", qte:40, unite:"cl", rayon:"Crèmerie" },
    { nom:"Myrtilles", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Répartir le granola dans des bols.","Verser le lait froid.","Couronner des myrtilles fraîches."] },

{ id:"pd12", nom:"Œufs à la coque & mouillettes", mode:"both", type:"petit-dej", saison:["printemps","été","automne","hiver"], culture:"français", temps:8, difficulte:1,
  ingredients:[
    { nom:"Œufs frais", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pain de campagne", qte:4, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Fleur de sel", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Plonger les œufs dans l'eau bouillante 3 min 30.","Toaster le pain et beurrer.","Couper en bâtonnets.","Servir œuf décapité, sel et mouillettes."] },

{ id:"pd13", nom:"Bowl chia, coco & mangue", mode:"both", type:"petit-dej", saison:["été","printemps"], culture:"international", temps:10, difficulte:1,
  ingredients:[
    { nom:"Graines de chia", qte:6, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Lait de coco", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Mangue", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Noix de coco râpée", qte:30, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Sirop d'agave", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Mélanger chia et lait de coco, laisser 4 h au frais.","Couper la mangue en dés.","Répartir le pudding dans les bols.","Couronner de mangue et coco râpée."] },

{ id:"pd14", nom:"Tartines chèvre, miel & thym", mode:"us", type:"petit-dej", saison:["printemps","été","automne"], culture:"méditerranéen", temps:8, difficulte:1,
  ingredients:[
    { nom:"Baguette tradition", qte:0.5, unite:"pièce", rayon:"Boulangerie" },
    { nom:"Bûche de chèvre", qte:120, unite:"g", rayon:"Crèmerie" },
    { nom:"Miel de châtaignier", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Thym frais", qte:1, unite:"branche", rayon:"Fruits & Légumes" }
  ],
  etapes:["Trancher et toaster le pain.","Couper le chèvre en rondelles, disposer dessus.","Passer 4 min sous le grill.","Arroser de miel chaud, parsemer de thym."] },

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
  etapes:["Hollandaise : fouetter jaunes au bain-marie, incorporer beurre clarifié et citron.","Faire revenir le bacon.","Pocher les œufs dans l'eau frémissante vinaigrée 3 min.","Toaster les muffins, monter avec bacon, œuf et nappage hollandaise."] },

/* --- Déjeuners (30) --- */
{ id:"dj01", nom:"Pâtes carbonara à la française", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:20, difficulte:1,
  ingredients:[
    { nom:"Tagliatelles fraîches", qte:500, unite:"g", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:200, unite:"g", rayon:"Boucherie" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Poivre noir", qte:1, unite:"c. à café", rayon:"Épicerie salée" }
  ],
  etapes:["Faire revenir les lardons sans matière grasse.","Cuire les pâtes al dente.","Battre œufs, crème, parmesan et poivre.","Hors feu, mélanger pâtes chaudes, lardons et sauce."] },

{ id:"dj02", nom:"Riz cantonais maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:25, difficulte:1,
  ingredients:[
    { nom:"Riz long", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:3, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon blanc", qte:150, unite:"g", rayon:"Boucherie" },
    { nom:"Petits pois surgelés", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Oignons", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Sauce soja", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire le riz et laisser refroidir.","Faire une omelette plate, la couper en dés.","Sauter oignon, jambon, petits pois au wok.","Ajouter riz, œuf, sauce soja, terminer à l'huile de sésame."] },

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
  etapes:["Préparer une béchamel courte (beurre + farine + lait).","Beurrer le pain, monter avec jambon et béchamel.","Recouvrir, napper de béchamel et fromage.","Cuire 12 min au four à 200°C."] },

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
  etapes:["Sauce bolognaise : suer oignons, carottes, ail, ajouter viande et tomates, 30 min.","Béchamel : beurre + farine + lait.","Monter en couches : sauce, lasagnes, béchamel, parmesan.","Four 30 min à 180°C."] },

{ id:"dj06", nom:"Steak haché & purée maison", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Steaks hachés", qte:4, unite:"pièces", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:1, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Lait", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Beurre", qte:60, unite:"g", rayon:"Crèmerie" },
    { nom:"Muscade", qte:1, unite:"pincée", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les pdt à l'eau salée 25 min.","Écraser avec lait chaud, beurre, sel, muscade.","Poêler les steaks 2 min par face.","Servir avec la purée bien chaude."] },

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
  etapes:["Foncer un moule avec la pâte, piquer le fond.","Faire revenir les lardons.","Battre œufs, crème, lait, muscade, sel, poivre.","Verser sur les lardons, four 35 min à 180°C."] },

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
  etapes:["Tomber les épinards au beurre avec l'ail.","Beurrer 4 ramequins, déposer les épinards.","Casser un œuf dans chaque, crème et parmesan.","Bain-marie au four 10 min à 180°C."] },

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

{ id:"dj17", nom:"Poke bowl saumon, avocat & edamame", mode:"us", type:"diner", saison:["été","printemps","automne"], culture:"asiatique", temps:25, difficulte:2,
  ingredients:[
    { nom:"Saumon extra-frais sashimi", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Riz vinaigré (sushi)", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Avocats", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Edamame surgelés", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Sauce soja", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Gingembre frais", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire le riz sushi et l'assaisonner.","Couper saumon, avocat, concombre en dés.","Sauce : soja, huile sésame, gingembre râpé.","Dresser en bowls, parsemer de sésame."] },

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

{ id:"dj23", nom:"Soupe pho vietnamienne", mode:"us", type:"diner", saison:["automne","hiver"], culture:"asiatique", temps:60, difficulte:2,
  ingredients:[
    { nom:"Bouillon de bœuf", qte:1.5, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Faux-filet de bœuf très fin", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Nouilles de riz", qte:250, unite:"g", rayon:"Épicerie salée" },
    { nom:"Gingembre frais", qte:1, unite:"morceau (5cm)", rayon:"Fruits & Légumes" },
    { nom:"Anis étoilé", qte:3, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Bâton de cannelle", qte:1, unite:"pièce", rayon:"Épicerie salée" },
    { nom:"Coriandre fraîche", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Pousses de soja", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Sauce poisson nuoc-mam", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Infuser bouillon avec gingembre brûlé, anis, cannelle, nuoc-mam 45 min.","Cuire les nouilles selon le paquet.","Trancher la viande très finement, elle cuit à la chaleur du bouillon.","Dresser : nouilles, viande crue, bouillon brûlant, herbes, citron."] },

{ id:"dj24", nom:"Pad thaï aux crevettes", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:30, difficulte:2,
  ingredients:[
    { nom:"Nouilles de riz larges", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Crevettes décortiquées", qte:300, unite:"g", rayon:"Poissonnerie" },
    { nom:"Œufs", qte:2, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pousses de soja", qte:150, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Cacahuètes torréfiées", qte:80, unite:"g", rayon:"Épicerie salée" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Sauce poisson", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre de palme", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Tamarin (pâte)", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ciboule", qte:4, unite:"tiges", rayon:"Fruits & Légumes" }
  ],
  etapes:["Tremper les nouilles 30 min dans l'eau tiède.","Sauter crevettes au wok, réserver, brouiller les œufs.","Ajouter nouilles, sauce tamarin/poisson/sucre.","Ajouter crevettes, pousses, finir avec ciboule, cacahuètes, citron vert."] },

{ id:"dj25", nom:"Bibimbap végétarien", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"asiatique", temps:40, difficulte:2,
  ingredients:[
    { nom:"Riz rond", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Épinards frais", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Champignons shiitake", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pousses de soja", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Œufs", qte:4, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Pâte gochujang", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sauce soja", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire le riz.","Sauter chaque légume séparément (sésame, soja).","Œuf au plat dans chaque bol.","Riz, légumes en quartiers, œuf, gochujang à mélanger à table."] },

{ id:"dj26", nom:"Salade thaï bœuf & citronnelle", mode:"us", type:"diner", saison:["été","printemps"], culture:"asiatique", temps:25, difficulte:2,
  ingredients:[
    { nom:"Bavette de bœuf", qte:400, unite:"g", rayon:"Boucherie" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Tomates cerises", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Coriandre", qte:1, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Menthe", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Citronnelle", qte:2, unite:"tiges", rayon:"Fruits & Légumes" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Piment rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Sauce poisson", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre de canne", qte:2, unite:"c. à café", rayon:"Épicerie sucrée" }
  ],
  etapes:["Griller la bavette 2 min par face, repos.","Sauce : citron vert, sauce poisson, sucre, piment, citronnelle.","Trancher fin, mélanger légumes et herbes.","Verser la sauce, ajouter le bœuf chaud."] },

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

/* --- Dîners (40) --- */
{ id:"dn01", nom:"Saumon rôti citron, riz & brocolis", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces (150g)", rayon:"Poissonnerie" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Brocolis", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Citron", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Aneth", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Poser saumon sur plaque, citron, huile, sel, four 15 min à 200°C.","Riz pilaf 12 min.","Brocolis 6 min à la vapeur.","Servir, aneth ciselé sur le saumon."] },

{ id:"dn02", nom:"Cabillaud, écrasé pdt & haricots verts", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:35, difficulte:1,
  ingredients:[
    { nom:"Dos de cabillaud", qte:600, unite:"g", rayon:"Poissonnerie" },
    { nom:"Pommes de terre rattes", qte:700, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Haricots verts", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:50, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Citron", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les pdt 20 min, écraser à la fourchette avec beurre et huile.","Cuire les haricots 8 min al dente.","Cuire le cabillaud à la poêle 4 min par face.","Servir avec un quart de citron."] },

{ id:"dn03", nom:"Poulet curry doux & riz", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"asiatique", temps:40, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Lait de coco", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Pâte de curry doux", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Pomme", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Coriandre", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Suer oignons et ail.","Ajouter poulet en dés, dorer.","Pâte curry + pomme râpée + lait coco, mijoter 20 min.","Servir sur riz, coriandre."] },

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
  etapes:["Dorer poulet, retirer.","Suer oignons, ajouter légumes en gros morceaux, ras-el-hanout, tomates, eau.","Remettre poulet, mijoter 40 min, ajouter pois chiches en fin.","Cuire merguez à part, hydrater la semoule."] },

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
  etapes:["Mélanger viande, chapelure, œuf, oignon haché, sel.","Former des boulettes, dorer à la poêle.","Ajouter coulis et ail, mijoter 20 min.","Cuire les spaghetti, dresser, basilic et parmesan."] },

{ id:"dn06", nom:"Émincé de dinde & pommes de terre sautées", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Aiguillettes de dinde", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Pommes de terre", qte:800, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:15, unite:"cl", rayon:"Crèmerie" },
    { nom:"Moutarde", qte:2, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Échalote", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Persil", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Couper pdt en dés, sauter à la poêle 20 min.","Poêler la dinde 6 min, réserver.","Sauter échalote, déglacer, crème, moutarde.","Remettre dinde, persil, servir avec les pdt."] },

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
  etapes:["Cuire les pdt, écraser avec beurre et lait chaud.","Suer oignons et ail, ajouter viande, cuire.","Étaler la viande, recouvrir de purée.","Gruyère, four 20 min à 200°C."] },

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
  etapes:["Faire blanchir la viande 5 min, rincer.","Cuire avec bouillon et légumes 1h.","Sauter les champignons à part.","Liaison : crème + jaunes + citron hors feu, ajouter champignons, servir sur riz."] },

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
  etapes:["Saisir les cuisses dans une cocotte, retirer.","Suer oignons et légumes en dés, herbes.","Remettre poulet, tomates, ail, mijoter 40 min couvert.","Servir avec un bon pain."] },

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
  etapes:["Saisir le filet entier, sel, poivre, thym, four 25 min à 180°C.","Pâtes al dente.","Sauce : échalotes + vin blanc + moutarde + crème.","Trancher le filet, napper, servir avec les pâtes."] },

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
  etapes:["Saisir le poulet, retirer.","Suer oignons, ail, gingembre, safran.","Remettre poulet, citrons confits coupés, eau, mijoter 45 min.","Ajouter olives, coriandre, servir avec semoule."] },

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
  etapes:["Suer oignon, carotte, céleri hachés.","Ajouter viande, dorer, déglacer au vin.","Tomates et concentré, mijoter 30 min minimum.","Servir sur spaghetti al dente, parmesan râpé."] },

{ id:"dn13", nom:"Sauté de bœuf aux légumes (wok)", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:25, difficulte:1,
  ingredients:[
    { nom:"Bavette de bœuf en lanières", qte:500, unite:"g", rayon:"Boucherie" },
    { nom:"Brocoli", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Poivron rouge", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Sauce soja", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Gingembre", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile de sésame", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Riz basmati", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Saisir le bœuf au wok très chaud 2 min, réserver.","Faire sauter les légumes 5 min.","Remettre bœuf, ail, gingembre, soja, sésame.","Servir sur riz vapeur."] },

{ id:"dn14", nom:"Tartiflette savoyarde", mode:"kids", type:"diner", saison:["automne","hiver"], culture:"français", temps:60, difficulte:2,
  ingredients:[
    { nom:"Pommes de terre", qte:1.2, unite:"kg", rayon:"Fruits & Légumes" },
    { nom:"Reblochon", qte:1, unite:"pièce", rayon:"Crèmerie" },
    { nom:"Lardons fumés", qte:300, unite:"g", rayon:"Boucherie" },
    { nom:"Oignons", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Crème fraîche", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Vin blanc sec", qte:10, unite:"cl", rayon:"Boissons" }
  ],
  etapes:["Cuire les pdt 20 min, peler, trancher.","Faire revenir lardons et oignons, déglacer au vin.","Mélanger pdt et lardons dans un plat, crème dessus.","Couper le reblochon en deux, croûte vers le haut, four 25 min à 200°C."] },

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
  etapes:["Quadriller la peau du magret, cuire côté peau 8 min, retourner 4 min.","Repos 10 min, jus + miel + balsamique en sauce.","Cuire patates douces, écraser avec beurre, crème.","Trancher le magret, nappage, servir."] },

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
  etapes:["Légumes en bâtonnets, vapeur 8 min.","Cabillaud poêlé 4 min par face, huile + ail.","Persillade : ail haché, persil, huile, citron.","Napper le poisson, légumes à côté."] },

{ id:"dn17", nom:"Saumon teriyaki & riz japonais", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:4, unite:"pièces (150g)", rayon:"Poissonnerie" },
    { nom:"Riz japonais", qte:300, unite:"g", rayon:"Épicerie salée" },
    { nom:"Sauce soja", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Mirin", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre", qte:2, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Gingembre", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Pousses d'épinards", qte:200, unite:"g", rayon:"Fruits & Légumes" }
  ],
  etapes:["Sauce teriyaki : soja + mirin + sucre + gingembre, réduire.","Riz vapeur 18 min.","Saisir saumon côté peau 4 min, retourner, napper de sauce.","Servir avec pousses d'épinards, sésame."] },

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
  etapes:["Beurrer le poulet, herbes dans la cavité, sel.","Légumes en cubes autour, huile, sel.","Four 1 h 15 à 200°C en arrosant.","Repos 10 min, découpe."] },

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
  etapes:["Mariner la viande au vin rouge la veille.","Faire suer lardons et oignons, dorer la viande, fariner.","Verser le vin, bouquet garni, mijoter 2h30 à couvert.","Ajouter champignons, servir avec tagliatelles."] },

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
  etapes:["Râper les pdt crues, essorer, mélanger avec œufs, sel.","Cuire en galettes à la poêle 4 min par face.","Dresser : galette, crème, saumon fumé, aneth.","Citron en quartiers."] },

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
  etapes:["Béchamel courte.","Monter : pain, jambon, béchamel, comté.","Four 10 min à 200°C, œuf au plat dessus.","Vinaigrette pour la salade."] },

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
  etapes:["Saumon huilé, four 18 min à 90°C.","Asperges 6 min à la vapeur, garder croquantes.","Beurre noisette : faire mousser, retirer du feu, ajouter citron.","Dresser saumon nacré, beurre, aneth."] },

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
  etapes:["Décortiquer gambas, garder têtes.","Nacrer riz, vin blanc, bouillon louche par louche.","Ajouter encre à mi-cuisson.","Poêler gambas 1 min par face, dresser sur risotto, ail-persil."] },

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
  etapes:["Tempérer la viande 1h, four 200°C 18 min, repos 10 min.","Frites en 2 bains : 150°C puis 180°C.","Béarnaise : réduction échalote-vinaigre-vin, monter au beurre clarifié sur jaunes, estragon.","Trancher, servir."] },

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
  etapes:["Rôtir les grenailles 30 min à 200°C.","Magret côté peau 8 min, 4 min côté chair, repos.","Sauce : échalote, cognac flambé, bouillon, crème, poivre vert.","Trancher, napper."] },

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

{ id:"dn33", nom:"Pavé de thon mi-cuit & wok asiatique", mode:"us", type:"diner", saison:["printemps","été","automne"], culture:"asiatique", temps:25, difficulte:2,
  ingredients:[
    { nom:"Pavés de thon rouge", qte:2, unite:"pièces (180g)", rayon:"Poissonnerie" },
    { nom:"Pak choï", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Carottes", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Champignons shiitake", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Sauce soja", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Gingembre", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" }
  ],
  etapes:["Rouler le thon dans le sésame, snacker 1 min par face.","Sauter les légumes au wok avec gingembre, soja.","Trancher le thon en lamelles.","Dresser thon mi-cuit sur lit de légumes."] },

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
  etapes:["Couper les tomates en quartiers, sel.","Disposer dans un grand plat.","Burrata au centre, basilic, huile, balsamique.","Pain grillé en accompagnement."] },

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
  etapes:["Infuser tomate, fenouil, safran dans la soupe 20 min.","Rouille : ail, pdt, jaune, huile montée comme aïoli.","Croûtons grillés, frottés à l'ail.","Service : soupe brûlante, croûtons, rouille, gruyère."] },

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
  etapes:["Mélanger sel et blancs en pâte.","Garnir le ventre du poisson de fenouil, citron, aneth.","Recouvrir entièrement de sel, four 30 min à 200°C.","Casser la croûte à table, filet d'huile d'olive."] },

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

{ id:"dn39", nom:"Curry rouge thaï aux crevettes", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:30, difficulte:2,
  ingredients:[
    { nom:"Crevettes décortiquées", qte:500, unite:"g", rayon:"Poissonnerie" },
    { nom:"Lait de coco", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pâte de curry rouge", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Aubergine thaï ou classique", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Pousses de bambou", qte:1, unite:"boîte", rayon:"Épicerie salée" },
    { nom:"Basilic thaï", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Sauce poisson", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sucre de palme", qte:1, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Citron vert", qte:2, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Riz thaï", qte:300, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Faire éclater la pâte de curry dans le lait de coco.","Ajouter légumes 8 min, puis crevettes 3 min.","Sauce poisson, sucre, citron vert.","Basilic au moment de servir, riz à part."] },

{ id:"dn40", nom:"Onigiri, soupe miso & edamame", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:30, difficulte:2,
  ingredients:[
    { nom:"Riz japonais", qte:250, unite:"g", rayon:"Épicerie salée" },
    { nom:"Saumon fumé", qte:120, unite:"g", rayon:"Poissonnerie" },
    { nom:"Feuilles de nori", qte:6, unite:"pièces", rayon:"Épicerie salée" },
    { nom:"Pâte miso", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Bouillon dashi", qte:50, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Tofu soyeux", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Algue wakame séchée", qte:10, unite:"g", rayon:"Épicerie salée" },
    { nom:"Edamame", qte:300, unite:"g", rayon:"Surgelés" },
    { nom:"Sauce soja", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire le riz japonais, le tiédir.","Former boulettes avec garniture saumon, ceinturer de nori.","Soupe miso : dashi + miso dilué + tofu dés + wakame.","Edamame vapeur 5 min, fleur de sel."] },

/* --- Express semaine (30) — plats rapides, familiaux, ≤30 min --- */
{ id:"qk01", nom:"Pâtes au pesto, tomates cerises & parmesan", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne ou fusilli", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pesto vert", qte:1, unite:"pot (190g)", rayon:"Épicerie salée" },
    { nom:"Tomates cerises", qte:400, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:80, unite:"g", rayon:"Crèmerie" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les pâtes al dente.","Couper les tomates cerises en deux, les faire revenir 3 min à l'huile.","Égoutter les pâtes, mélanger avec le pesto et les tomates.","Servir aussitôt, parmesan râpé sur le dessus."] },

{ id:"qk02", nom:"Spaghetti ail, huile & piment doux", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"italien", temps:12, difficulte:1,
  ingredients:[
    { nom:"Spaghetti", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Ail", qte:6, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Huile d'olive", qte:8, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Piment doux en flocons", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Persil plat", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" },
    { nom:"Parmesan râpé", qte:60, unite:"g", rayon:"Crèmerie" }
  ],
  etapes:["Cuire les pâtes al dente, garder un peu d'eau.","Émincer l'ail, le faire blondir doucement dans l'huile + piment.","Verser les pâtes, ajouter un peu d'eau de cuisson, mélanger.","Persil ciselé et parmesan à la fin."] },

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
  etapes:["Cuire les penne al dente.","Émincer courgettes et échalote, saumon en dés. Sauter le tout 8 min.","Ajouter la crème, sel, poivre, citron, laisser frémir 2 min.","Mélanger avec les pâtes, aneth ciselé."] },

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
  etapes:["Cuire les pâtes al dente.","Émietter le thon, ajouter ail haché, câpres, zeste et jus de citron, huile.","Mélanger avec les pâtes chaudes.","Persil ciselé, poivre du moulin."] },

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
  etapes:["Tout mettre dans une grande sauteuse : pâtes, tomates, oignon, ail, bouillon, huile.","Porter à ébullition puis cuire 12 min en remuant.","Quand les pâtes sont al dente et le jus presque absorbé, couper la mozza en dés et la fondre dedans.","Basilic ciselé sur le dessus."] },

{ id:"qk06", nom:"Penne au gorgonzola & noix", mode:"us", type:"diner", saison:["automne","hiver","printemps"], culture:"italien", temps:15, difficulte:1,
  ingredients:[
    { nom:"Penne", qte:500, unite:"g", rayon:"Épicerie salée" },
    { nom:"Gorgonzola", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème liquide", qte:20, unite:"cl", rayon:"Crèmerie" },
    { nom:"Cerneaux de noix", qte:80, unite:"g", rayon:"Épicerie sucrée" },
    { nom:"Poire mûre (option)", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire les penne al dente.","Faire fondre le gorgonzola en dés dans la crème à feu doux.","Mélanger avec les pâtes.","Noix concassées et dés de poire sur le dessus."] },

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

{ id:"qk08", nom:"Saumon mariné soja-miel & riz", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:25, difficulte:1,
  ingredients:[
    { nom:"Pavés de saumon", qte:6, unite:"pièces (150g)", rayon:"Poissonnerie" },
    { nom:"Sauce soja", qte:5, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Gingembre frais", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Riz basmati", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Mariner le saumon 10 min dans soja-miel-ail-gingembre.","Cuire le riz pendant ce temps.","Saisir le saumon côté peau 3 min, retourner 2 min, glacer avec la marinade réduite.","Sésame sur le saumon, servir."] },

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

{ id:"qk11", nom:"Émincé de poulet curry-coco express", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:25, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet", qte:800, unite:"g", rayon:"Boucherie" },
    { nom:"Lait de coco", qte:40, unite:"cl", rayon:"Épicerie salée" },
    { nom:"Pâte de curry doux", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Oignon", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Riz basmati", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Coriandre", qte:0.5, unite:"botte", rayon:"Fruits & Légumes" }
  ],
  etapes:["Cuire le riz.","Suer l'oignon haché, ajouter le poulet en dés, dorer 4 min.","Curry + coco, mijoter 12 min.","Servir sur le riz, coriandre."] },

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

{ id:"qk13", nom:"Brochettes poulet teriyaki & riz", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:30, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet", qte:900, unite:"g", rayon:"Boucherie" },
    { nom:"Sauce soja", qte:6, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Mirin ou miel", qte:3, unite:"c. à soupe", rayon:"Épicerie sucrée" },
    { nom:"Ail", qte:2, unite:"gousses", rayon:"Fruits & Légumes" },
    { nom:"Gingembre", qte:1, unite:"morceau (3cm)", rayon:"Fruits & Légumes" },
    { nom:"Riz japonais", qte:400, unite:"g", rayon:"Épicerie salée" },
    { nom:"Pic à brochettes", qte:12, unite:"pièces", rayon:"Épicerie salée" }
  ],
  etapes:["Couper le poulet en dés, mariner 10 min dans soja-mirin-ail-gingembre.","Embrocher, griller à la poêle 3 min par face.","Cuire le riz.","Servir brochettes glacées sur le riz."] },

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

{ id:"qk15", nom:"Wok poulet, légumes & sésame", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:20, difficulte:1,
  ingredients:[
    { nom:"Blancs de poulet en lanières", qte:700, unite:"g", rayon:"Boucherie" },
    { nom:"Légumes wok mélangés", qte:600, unite:"g", rayon:"Surgelés" },
    { nom:"Sauce soja", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sauce huître", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Nouilles chinoises", qte:400, unite:"g", rayon:"Épicerie salée" }
  ],
  etapes:["Cuire les nouilles selon paquet.","Saisir le poulet au wok très chaud 4 min.","Ajouter légumes 5 min, sauces et nouilles.","Sésame en finition."] },

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
  etapes:["Poêler poulet émincé + poivron + paprika.","Garnir une tortilla : poulet, cheddar, maïs, recouvrir d'une autre tortilla.","Dorer 2 min par face à la poêle sèche.","Couper en parts, servir avec crème."] },

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
  etapes:["Potimarron en cubes (avec peau), pdt en cubes, suer oignon.","Couvrir de bouillon, cuire 20 min.","Mixer, ajouter crème, ajuster.","Servir avec croûtons grillés et fromage râpé."] },

{ id:"qk22", nom:"Omelette aux herbes & salade", mode:"both", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:15, difficulte:1,
  ingredients:[
    { nom:"Œufs", qte:12, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Herbes fraîches (persil, ciboulette, estragon)", qte:1, unite:"botte mélangée", rayon:"Fruits & Légumes" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Vinaigrette", qte:1, unite:"portion", rayon:"Épicerie salée" },
    { nom:"Pain", qte:1, unite:"baguette", rayon:"Boulangerie" }
  ],
  etapes:["Battre les œufs, sel, poivre, herbes ciselées.","Beurre dans une grande poêle bien chaude, verser les œufs.","Replier sur eux-mêmes, baveuse au centre.","Servir avec salade et bon pain."] },

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
  etapes:["Toaster le pain.","Écraser l'avocat au citron, étaler sur fromage frais.","Cuire les œufs à la coque ou pochés.","Saumon fumé, œuf au-dessus, aneth."] },

{ id:"qk25", nom:"Soupe ramen express œuf & épinards", mode:"both", type:"diner", saison:["automne","hiver"], culture:"asiatique", temps:20, difficulte:1,
  ingredients:[
    { nom:"Nouilles ramen", qte:600, unite:"g", rayon:"Épicerie salée" },
    { nom:"Bouillon de poulet", qte:2, unite:"litres", rayon:"Épicerie salée" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Épinards frais", qte:200, unite:"g", rayon:"Fruits & Légumes" },
    { nom:"Pâte miso", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Sauce soja", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Ciboule", qte:4, unite:"tiges", rayon:"Fruits & Légumes" },
    { nom:"Huile de sésame", qte:1, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Œufs mollets 6 min à l'eau, refroidir et écaler.","Diluer le miso dans le bouillon, soja et sésame.","Cuire les nouilles dans le bouillon, ajouter épinards en fin.","Bols : nouilles, bouillon, œuf coupé en deux, ciboule."] },

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
  etapes:["Carottes et pdt en cubes, suer oignon.","Cumin, bouillon, cuire 18 min.","Mixer, ajouter crème.","Servir avec pain grillé."] },

{ id:"qk27", nom:"Galettes complètes œuf-jambon-fromage", mode:"kids", type:"diner", saison:["printemps","été","automne","hiver"], culture:"français", temps:25, difficulte:1,
  ingredients:[
    { nom:"Galettes de sarrasin", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Œufs", qte:6, unite:"pièces", rayon:"Crèmerie" },
    { nom:"Jambon", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:40, unite:"g", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Beurrer la poêle, faire glisser une galette.","Casser un œuf au centre, jambon, fromage.","Cuire 3 min, replier les bords en carré.","Servir avec salade."] },

{ id:"qk28", nom:"Tarte tomate-moutarde-chèvre rapide", mode:"both", type:"diner", saison:["été","printemps","automne"], culture:"français", temps:30, difficulte:1,
  ingredients:[
    { nom:"Pâte feuilletée", qte:1, unite:"rouleau", rayon:"Crèmerie" },
    { nom:"Tomates mûres", qte:5, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Bûche de chèvre", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Moutarde à l'ancienne", qte:3, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Herbes de Provence", qte:1, unite:"c. à café", rayon:"Épicerie salée" },
    { nom:"Huile d'olive", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Étaler la pâte, étaler la moutarde sur le fond.","Disposer rondelles de tomate, sel, herbes.","Chèvre en rondelles dessus, huile d'olive.","Four 25 min à 200°C."] },

{ id:"qk29", nom:"Bowl poke saumon fumé-avocat-riz", mode:"us", type:"diner", saison:["printemps","été","automne","hiver"], culture:"asiatique", temps:15, difficulte:1,
  ingredients:[
    { nom:"Riz japonais déjà cuit", qte:600, unite:"g (cuit)", rayon:"Épicerie salée" },
    { nom:"Saumon fumé", qte:400, unite:"g", rayon:"Poissonnerie" },
    { nom:"Avocats", qte:3, unite:"pièces", rayon:"Fruits & Légumes" },
    { nom:"Concombre", qte:1, unite:"pièce", rayon:"Fruits & Légumes" },
    { nom:"Edamame surgelés", qte:200, unite:"g", rayon:"Surgelés" },
    { nom:"Sauce soja", qte:4, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Huile de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" },
    { nom:"Graines de sésame", qte:2, unite:"c. à soupe", rayon:"Épicerie salée" }
  ],
  etapes:["Edamame vapeur 5 min.","Trancher saumon, avocat, concombre.","Dresser bowls : riz tiède, garnitures.","Soja + sésame + graines."] },

{ id:"qk30", nom:"Croque-monsieur express au four", mode:"kids", type:"diner", saison:["automne","hiver","printemps"], culture:"français", temps:20, difficulte:1,
  ingredients:[
    { nom:"Pain de mie", qte:12, unite:"tranches", rayon:"Boulangerie" },
    { nom:"Jambon blanc", qte:6, unite:"tranches", rayon:"Boucherie" },
    { nom:"Emmental ou comté râpé", qte:200, unite:"g", rayon:"Crèmerie" },
    { nom:"Beurre", qte:30, unite:"g", rayon:"Crèmerie" },
    { nom:"Crème fraîche", qte:10, unite:"cl", rayon:"Crèmerie" },
    { nom:"Salade verte", qte:1, unite:"pièce", rayon:"Fruits & Légumes" }
  ],
  etapes:["Beurrer les tranches, monter avec jambon + crème + fromage.","Refermer, recouvrir de fromage.","Four 10 min à 220°C en mode grill.","Servir avec salade verte."] }
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
    let chosenId;
    if (swaps[slotKey]) {
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
      let chosenId;
      if (swaps[slotKey]) {
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
