import { Component } from '@angular/core';

export type TabId = 'spina' | 'food' | 'whisky' | 'spirits';
export type BeerCat = 'all' | 'lager' | 'ale' | 'stout' | 'weiss' | 'ipa' | 'belga';
export type FoodCat = 'all' | 'starters' | 'fritti' | 'carne' | 'texmex' | 'british' | 'burger' | 'vegetariano' | 'dolci';
export type WhiskyCat = 'all' | 'highlands' | 'islay' | 'speyside' | 'lowlands' | 'ireland';

export interface Beer {
  nome: string;
  birrificio: string;
  stile: string;
  cat: BeerCat;
  provenienza: string;
  desc: string;
  abv: string;
  colore: string;
  prezzoP: string;
  prezzoG: string;
  pompa?: boolean;
}

export interface FoodItem {
  codice?: string;
  nome: string;
  desc: string;
  cat: FoodCat;
  prezzo: string;
  allergeni?: string;
  tag?: string;
}

export interface WhiskyItem {
  nome: string;
  distilleria?: string;
  regione: string;
  cat: WhiskyCat;
  desc: string;
  abv?: string;
  prezzo: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  activeTab: TabId = 'spina';
  beerFilter: BeerCat = 'all';
  foodFilter: FoodCat = 'all';
  whiskyFilter: WhiskyCat = 'all';

  tabs: { id: TabId; label: string }[] = [
    { id: 'spina', label: 'Birre alla spina' },
    { id: 'food', label: 'Food' },
    { id: 'whisky', label: 'Whisky' },
    { id: 'spirits', label: 'Spirits & Cocktails' },
  ];

  beerCats: { id: BeerCat; label: string }[] = [
    { id: 'all', label: 'Tutte' },
    { id: 'lager', label: 'Lager & Pils' },
    { id: 'ale', label: 'Ale' },
    { id: 'stout', label: 'Stout' },
    { id: 'weiss', label: 'Weiss' },
    { id: 'ipa', label: 'IPA' },
    { id: 'belga', label: 'Belga' },
  ];

  foodCats: { id: FoodCat; label: string }[] = [
    { id: 'all', label: 'Tutto' },
    { id: 'starters', label: 'Starters' },
    { id: 'fritti', label: 'Fritti' },
    { id: 'carne', label: 'Carne' },
    { id: 'texmex', label: 'Tex Mex' },
    { id: 'british', label: 'British' },
    { id: 'burger', label: 'Burger' },
    { id: 'vegetariano', label: 'Vegetariano' },
    { id: 'dolci', label: 'Dolci' },
  ];

  whiskyCats: { id: WhiskyCat; label: string }[] = [
    { id: 'all', label: 'Tutti' },
    { id: 'highlands', label: 'Highlands & Islands' },
    { id: 'islay', label: 'Islay' },
    { id: 'speyside', label: 'Speyside' },
    { id: 'lowlands', label: 'Lowlands' },
    { id: 'ireland', label: 'Irlanda' },
  ];

  birre: Beer[] = [
    {
      nome: 'Pedavena', birrificio: 'Pedavena', stile: 'Lager', cat: 'lager',
      provenienza: 'Pedavena, Italia', abv: '5%', colore: '#F0D840',
      prezzoP: '€ 3,00', prezzoG: '€ 5,50',
      desc: 'Lager equilibrata e delicata, leggermente luppolata. Prodotta con acqua delle sorgenti delle vette feltrine.'
    },
    {
      nome: 'Budvar Budweiser', birrificio: 'Budějovický Budvar', stile: 'Lager / Pils', cat: 'lager',
      provenienza: 'České Budějovice, Rep. Ceca', abv: '5%', colore: '#EDD020',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      desc: 'Istituzione ceca dal 1895. Malto pronunciato, amaro medio-basso, luppolo Žatec tra i più pregiati al mondo.'
    },
    {
      nome: 'St. Bernardus Tripel', birrificio: 'St. Bernardus', stile: 'Tripel', cat: 'belga',
      provenienza: 'Watou, Belgio', abv: '8%', colore: '#D4A020',
      prezzoP: '€ 4,00', prezzoG: '€ 6,50',
      desc: 'Birra d\'abbazia dorata. Al naso dolce e fruttata, poi secca e vivace verso il finale. Stile Tripel classico.'
    },
    {
      nome: 'Martellina', birrificio: 'Mostodolce', stile: 'Belgian Ale', cat: 'belga',
      provenienza: 'Vaiano (PO), Italia', abv: '7.3%', colore: '#C88820',
      prezzoP: '€ 4,00', prezzoG: '€ 6,50',
      desc: 'Ambrata con miele di castagno della ValBisenzio. Dolce al primo impatto, bilanciata da caramello e arancia amara.'
    },
    {
      nome: 'Maisel\'s Weiss', birrificio: 'Gebr. Maisel', stile: 'Weisse', cat: 'weiss',
      provenienza: 'Bayreuth, Germania', abv: '5.4%', colore: '#F0DC60',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      desc: 'Una delle migliori Weiss in circolazione. Aromi fruttati, malto dolce, frutta esotica. Ricetta di famiglia dal 1887.'
    },
    {
      nome: 'Open Hub Blanche', birrificio: 'Open Hub / MC77', stile: 'Blanche', cat: 'weiss',
      provenienza: 'Macerata, Italia', abv: '4.5%', colore: '#F5EE90',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      desc: 'Frumento e avena, aromatizzata con coriandolo e scorze d\'arancia amara. Speziata, rinfrescante, di ispirazione belga.'
    },
    {
      nome: 'Braufactum Roog', birrificio: 'BraufactuM / BRLO', stile: 'Rauchweizen', cat: 'weiss',
      provenienza: 'Berlino, Germania', abv: '6.5%', colore: '#B87020',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      desc: 'Ispirata alle Rauch di Bamberga. Nota affumicata equilibrata, cacao e tostato. Malto di frumento e orzo.'
    },
    {
      nome: 'O\'Connell\'s Stout', birrificio: 'Dundalk Bay Brewery', stile: 'Chocolate Stout', cat: 'stout',
      provenienza: 'Dublino, Irlanda', abv: '4.2%', colore: '#1A0A04',
      prezzoP: '€ 4,00', prezzoG: '€ 6,50',
      desc: 'Cacao intenso, vaniglia e malto caramellato. Consistenza cremosa, corpo vellutato, finale amaro con caffè tostato.'
    },
    {
      nome: 'Guinness', birrificio: 'Guinness', stile: 'Stout', cat: 'stout',
      provenienza: 'Dublino, Irlanda', abv: '4.2%', colore: '#0C0504',
      prezzoP: '€ 4,00', prezzoG: '€ 6,50',
      desc: 'L\'originale. Malto tostato a elevato grado, amaro delicato, scorrevole e beverina. St. James\'s Gate dal 1759.'
    },
    {
      nome: 'Old Speckled Hen', birrificio: 'Greene King', stile: 'Bitter', cat: 'ale',
      provenienza: 'Bury St. Edmonds, UK', abv: '5%', colore: '#C07020',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      pompa: true,
      desc: 'Spillata a pompa inglese. Toffee, caramello, fruttato. Luppoli Challenger, Pilgrim e Goldings, chiusura leggermente amara.'
    },
    {
      nome: 'Ful Mun', birrificio: 'Olmaia', stile: 'Double IPA', cat: 'ipa',
      provenienza: 'Montepulciano, Italia', abv: '8%', colore: '#B06010',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      pompa: true,
      desc: 'Double IPA da Val d\'Orcia. Resina, agrumi e frutta tropicale in primo piano. Caramello e miele a supporto.'
    },
    {
      nome: 'Jasper', birrificio: 'Kirkstall', stile: 'IPA', cat: 'ipa',
      provenienza: 'Leeds, Inghilterra', abv: '4.5%', colore: '#E0B020',
      prezzoP: '€ 4,00', prezzoG: '€ 6,00',
      pompa: true,
      desc: 'Spillata da cask originale inglese. Palato morbido, malto chiaro e avena, aromi complessi di frutta tropicale. Bassa carbonazione.'
    },
  ];

  food: FoodItem[] = [
    // STARTERS
    { nome: 'Nachos con Cheddar', desc: 'Cheddar fuso, guacamole e salsa piccante', cat: 'starters', prezzo: '€ 7,00', allergeni: '1,4,7,9' },
    { nome: 'Nachos con Chili', desc: 'Chili, Cheddar fuso, guacamole e salsa piccante', cat: 'starters', prezzo: '€ 9,00', allergeni: '1,4,7,9' },
    { nome: 'Nachos Bacon & Jalapeño', desc: 'Cheddar, jalapeño e bacon, guacamole e salsa piccante', cat: 'starters', prezzo: '€ 9,00', allergeni: '1,4,7,9' },
    // FRITTI
    { nome: 'Patate fritte (piccola)', desc: '', cat: 'fritti', prezzo: '€ 4,00', allergeni: '1,3,7' },
    { nome: 'Patate fritte (grande)', desc: '', cat: 'fritti', prezzo: '€ 5,50', allergeni: '1,3,7' },
    { nome: 'Patate rosse dolci', desc: '', cat: 'fritti', prezzo: '€ 8,00', allergeni: '1,3,7' },
    { nome: 'Patatine bacon & cheddar', desc: '', cat: 'fritti', prezzo: '€ 8,00', allergeni: '1,3,7' },
    { nome: 'Alette di pollo', desc: 'Leggermente piccanti', cat: 'fritti', prezzo: '€ 6,00', allergeni: '1,3,7' },
    { nome: 'Mozzarelline stick', desc: '', cat: 'fritti', prezzo: '€ 6,00', allergeni: '1,3,7' },
    { nome: 'Anelli di cipolla', desc: 'Impanatura alla birra', cat: 'fritti', prezzo: '€ 5,00', allergeni: '1,3,7' },
    { nome: 'Nuggets di pollo', desc: '', cat: 'fritti', prezzo: '€ 6,00', allergeni: '1,3,7' },
    { nome: 'Bocconcini jalapeño', desc: 'Ripieni di chili e formaggio', cat: 'fritti', prezzo: '€ 5,00', allergeni: '1,3,7' },
    { nome: 'Crispy Chicken Bucket', desc: 'Patate speciali + nuggets, popcorn di pollo e strips piccanti', cat: 'fritti', prezzo: '€ 13,00', allergeni: '1,3,7', tag: 'Signature' },
    { nome: 'Fritto misto', desc: '3 pezzi per tipo: mozzarelline, nuggets, anelli di cipolla, jalapeño + patate', cat: 'fritti', prezzo: '€ 13,00', allergeni: '1,3,7' },
    // CARNE
    { codice: 'Mix Grill', nome: 'Mix Grill', desc: 'Costine di maiale, wurstel, salsiccia, pollo, insalata, pomodori e patate fritte', cat: 'carne', prezzo: '€ 16,00', allergeni: '1' },
    { codice: 'Maxi Grill', nome: 'Maxi Grill (per 2)', desc: 'Pulled pork, costine, wurstel, salsiccia, pollo, insalata, pomodori e patate fritte', cat: 'carne', prezzo: '€ 30,00', allergeni: '1', tag: 'Per 2' },
    { nome: 'Controfiletto Toscano F1', desc: 'Selezione Macelleria Fulceri, olio al rosmarino e sale nero, con patate e insalata', cat: 'carne', prezzo: '€ 16,00', allergeni: '1' },
    { nome: 'Controfiletto Toscano F2', desc: 'Selezione Macelleria Fulceri, cipolle scottate e bacon croccante, con patate e insalata', cat: 'carne', prezzo: '€ 16,00', allergeni: '1' },
    { nome: 'Filetto di pollo', desc: 'Con insalata mista, pomodori e patate', cat: 'carne', prezzo: '€ 13,00', allergeni: '1' },
    { nome: 'Piatto con Hamburger 150g', desc: 'Hamburger con cheddar filante, insalata mista, pomodori e patate', cat: 'carne', prezzo: '€ 13,00', allergeni: '1,7' },
    // TEX MEX
    { nome: 'Chili con carne', desc: 'Macinato di manzo, mix di spezie messicane, peperoni, cipolla, fagioli neri, riso basmati, mini tortillas, nachos, salse e insalata', cat: 'texmex', prezzo: '€ 16,00', allergeni: '1' },
    { codice: 'B1', nome: 'Burrito Chili', desc: 'Tortillas con chili, guacamole, cheddar, riso e lattuga — con nachos e formaggio fuso', cat: 'texmex', prezzo: '€ 14,00', allergeni: '1,7' },
    { codice: 'B2', nome: 'Burrito Tex-Mex', desc: 'Tortillas con chili, salsa TexMex, cheddar, pancetta croccante, riso e lattuga', cat: 'texmex', prezzo: '€ 14,00', allergeni: '1,7' },
    // BRITISH
    { codice: 'PORK1', nome: 'Pulled Pork Barbecue', desc: 'Maiale cotto 8h a bassa temperatura, panino artigianale, salsa BBQ, cipolla, bacon, cheddar, lattuga + patate', cat: 'british', prezzo: '€ 13,00', allergeni: '1,3,7,9,10', tag: 'Signature' },
    { codice: 'PORK2', nome: 'Pulled Pork Piccante', desc: 'Maiale cotto 8h, panino artigianale, salsa piccante, anelli di cipolla alla birra, bacon, cheddar + patate', cat: 'british', prezzo: '€ 13,00', allergeni: '1,3,7,9,10' },
    { codice: 'PORK3', nome: 'Pulled Pork al piatto', desc: 'Insalata mista, bacon, cipolla, patate fritte e salsa yogurt', cat: 'british', prezzo: '€ 15,00', allergeni: '1,3,7,9,10' },
    { codice: 'C1', nome: 'Costine di maiale', desc: 'Marinate nella birra a bassa temperatura, con insalata, pomodori e patate fritte', cat: 'british', prezzo: '€ 17,00', allergeni: '1' },
    { codice: 'C2', nome: 'Costine in salsa BBQ', desc: 'Marinate nella birra a bassa temperatura, glassate con BBQ, con insalata, pomodori e patate', cat: 'british', prezzo: '€ 17,00', allergeni: '1' },
    { nome: 'Fish & Chips', desc: 'Con insalata mista, patate fritte e salsa yogurt', cat: 'british', prezzo: '€ 14,00' },
    { nome: 'Haggis', desc: 'Haggis con insalata, coleslaw, salsa yogurt e patate', cat: 'british', prezzo: '€ 15,00' },
    { codice: 'WR1', nome: 'Wrap pollo croccante', desc: 'Pollo croccante, maionese, insalata, pomodoro, provola e patate', cat: 'british', prezzo: '€ 12,00' },
    { codice: 'WR2', nome: 'Wrap pollo alla piastra', desc: 'Pollo alla piastra, salsa tartara, bacon, cipolla, insalata, cheddar e patate', cat: 'british', prezzo: '€ 12,00' },
    // BURGER
    { codice: 'H2', nome: 'Cheeseburger', desc: 'Cheddar, ketchup, maionese, lattuga e pomodoro', cat: 'burger', prezzo: '€ 11,00', allergeni: '1,3,7,9,10' },
    { codice: 'H3', nome: 'Bacon & Egg', desc: 'BBQ, pancetta croccante, uovo all\'occhio di bue, cheddar, funghi, cipolla scottata, salsa piccante', cat: 'burger', prezzo: '€ 12,50', allergeni: '1,3,7,9,10' },
    { codice: 'H4', nome: 'Piccante & Funghi', desc: 'Salsa piccante, funghi, cipolla scottata e scamorza', cat: 'burger', prezzo: '€ 12,00', allergeni: '1,3,4,7,9' },
    { codice: 'H5', nome: 'Boscaiolo', desc: 'Salsa boscaiola, piccante, funghi, salsiccia, cipolla scottata, scamorza e insalata', cat: 'burger', prezzo: '€ 12,00', allergeni: '1,3,4,7,9,10' },
    { codice: 'H6', nome: 'BBQ Bacon', desc: 'Salsa barbecue, bacon croccante, cheddar, insalata e cipolla scottata', cat: 'burger', prezzo: '€ 11,50', allergeni: '1,3,7,9,10' },
    { codice: 'H10', nome: 'Vegetariano', desc: 'Salsa tartara, zucchine, melanzane, funghi, scamorza e pomodori', cat: 'burger', prezzo: '€ 12,00', allergeni: '1,3,7,10' },
    { codice: 'H12', nome: 'Doppio Bad Elf', desc: 'Doppio hamburger, salsa cocktail e verde, crudo, piccante, cipolla scottata, insalata e pomodoro', cat: 'burger', prezzo: '€ 15,00', allergeni: '1,3,4,7,8,9,10', tag: 'Signature' },
    { codice: 'HD1', nome: 'Hot Dog Classic', desc: 'Ketchup, maionese e formaggio fuso — con patate fritte', cat: 'burger', prezzo: '€ 10,00' },
    { codice: 'HD2', nome: 'Hot Dog Senape', desc: 'Senape, cipolla e funghi — con patate fritte', cat: 'burger', prezzo: '€ 10,00' },
    { codice: 'BB1', nome: 'Beyond Burger Veggie', desc: 'Burger vegetale, zucchine, maionese vegana, lattuga, pomodori, funghi + patate', cat: 'burger', prezzo: '€ 14,00', allergeni: '1,7', tag: 'Plant-based' },
    { codice: 'BB2', nome: 'Beyond Burger Cipolla', desc: 'Burger vegetale, cipolla scottata, funghi, maionese vegana, insalata e pomodoro + patate', cat: 'burger', prezzo: '€ 14,00', allergeni: '1,7', tag: 'Plant-based' },
    // VEGETARIANO
    { codice: 'V1', nome: 'Burger Veggie', desc: 'Zucchine e melanzane grigliate, scamorza, lattuga e pomodori + patate', cat: 'vegetariano', prezzo: '€ 12,50', allergeni: '1,7' },
    { codice: 'V2', nome: 'Piatto Veggie', desc: 'Hamburger vegetale al piatto, insalata, pomodori, zucchine e melanzane grigliate + patate', cat: 'vegetariano', prezzo: '€ 12,50', allergeni: '1,3,7,9' },
    { nome: 'Polpettine di Quinoa', desc: '6 polpettine di quinoa, lenticchie e patate — con salsa yogurt', cat: 'vegetariano', prezzo: '€ 6,50' },
    { codice: 'I1', nome: 'Cesar Salad', desc: 'Insalata mista, pomodoro, mais, olive, scaglie di parmigiano, pollo alla piastra e salsa yogurt', cat: 'vegetariano', prezzo: '€ 9,50' },
    { codice: 'I2', nome: 'Spring Salad', desc: 'Insalata mista, mais, pomodoro, cetrioli, mozzarella e uovo sodo con salsa yogurt', cat: 'vegetariano', prezzo: '€ 9,50' },
    // DOLCI
    { nome: 'Cheesecake freddo', desc: 'Con caramello salato, frutti di bosco, Nutella o cioccolato', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,5,7' },
    { nome: 'Birramisù alla Guinness', desc: 'Il classico tiramisù reinterpretato con la stout più famosa al mondo', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,5,7', tag: 'Signature' },
    { nome: 'Apple Crumble', desc: 'Tipico dolce di mele di origine britannica, servito con gelato alla vaniglia', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,5,7' },
    { nome: 'Brownie senza Glutine', desc: 'Servito con gelato alla vaniglia', cat: 'dolci', prezzo: '€ 6,00', allergeni: '5,7' },
    { nome: 'Brownie alla Guinness', desc: 'Servito con gelato alla vaniglia', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,5,7', tag: 'Signature' },
    { nome: 'Cranachan', desc: 'Panna montata, mascarpone, miele, fragole, frutti di bosco e cornflakes — re del dessert scozzese', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,5,7' },
    { nome: 'Soufflè al Cioccolato', desc: 'Con panna', cat: 'dolci', prezzo: '€ 5,00', allergeni: '1,7' },
    { nome: 'Waffel Nutella', desc: 'Con Nutella e panna', cat: 'dolci', prezzo: '€ 6,00', allergeni: '1,7' },
  ];

  whisky: WhiskyItem[] = [
    // HIGHLANDS & ISLANDS
    { nome: 'Oban 14', distilleria: 'Oban', regione: 'Highlands & Islands', cat: 'highlands', abv: '43%', prezzo: '€ 9,00', desc: 'Aroma intenso di frutti, arancia e limone con note salmastre e di torba. Al palato frutti, spezie e finale maltato affumicato.' },
    { nome: 'Talisker 10yrs', distilleria: 'Talisker', regione: 'Isola di Skye', cat: 'highlands', abv: '45%', prezzo: '€ 8,00', desc: 'Finemente torbato con accenno di salinità e dolcezza di agrumi. Frutti essiccati, fumo e forti aromi di malto d\'orzo. Finale caldo.' },
    { nome: 'Talisker Skye', distilleria: 'Talisker', regione: 'Isola di Skye', cat: 'highlands', abv: '45.8%', prezzo: '€ 8,00', desc: 'Omaggio al paesaggio selvaggio di Skye. Maturato in botti refill e quercia americana. Carattere marittimo e torboso.' },
    { nome: 'Talisker Storm', distilleria: 'Talisker', regione: 'Isola di Skye', cat: 'highlands', abv: '45.8%', prezzo: '€ 8,00', desc: 'Blend da 3 a 25 anni. Versione estremizzata del classico 10 anni — più marittimo, torboso e pungente.' },
    { nome: 'Talisker Wilder Seas', distilleria: 'Talisker', regione: 'Isola di Skye', cat: 'highlands', abv: '—', prezzo: '€ 9,50', desc: 'Leggermente torbato, affinato in botti di quercia francese ex-Cognac. Ed. charity x Parley for the Oceans.' },
    { nome: 'Tobermory 12', distilleria: 'Tobermory', regione: 'Isola di Mull', cat: 'highlands', abv: '46.3%', prezzo: '€ 8,50', desc: 'Non torbato, ex-bourbon e virgin oak. Note di frutta e malto d\'orzo con sentori di agrumi e caramello salato.' },
    { nome: 'Highland Park 12', distilleria: 'Highland Park', regione: 'Isole Orcadi', cat: 'highlands', abv: '40%', prezzo: '€ 9,00', desc: 'La distilleria più a nord del pianeta. Profumato, dolce, sentori di mandorla, miele e torba. Gusto intenso e speziato.' },
    { nome: 'Jura 12yrs', distilleria: 'Isle of Jura', regione: 'Isola di Jura', cat: 'highlands', abv: '40%', prezzo: '€ 9,00', desc: '12 anni in botti bourbon, perfezionato in botti sherry Oloroso. Dolcezza di miele, sapori fruttati e speziati.' },
    { nome: 'Aberfeldy 12', distilleria: 'Aberfeldy', regione: 'Perthshire', cat: 'highlands', abv: '40%', prezzo: '€ 8,50', desc: 'La perla del Perthshire. Dolce e pulito, note di malto, miele e vaniglia. Uno dei più premiati single malt delle Highlands.' },
    { nome: 'Loch Lomond Original', distilleria: 'Loch Lomond', regione: 'Highlands', cat: 'highlands', abv: '40%', prezzo: '€ 8,00', desc: 'Leggera torbatura, facile da bere con il carattere duro delle Highlands scozzesi. Single malt senza età definita.' },
    // ISLAY
    { nome: 'Ardbeg 5yrs Wee Beastie', distilleria: 'Ardbeg', regione: 'Islay', cat: 'islay', abv: '47.4%', prezzo: '€ 9,00', desc: '"Piccola bestia" — torba predominante. 5 anni in botti ex-sherry Oloroso e ex-bourbon, non filtrato a freddo.' },
    { nome: 'Ardbeg 10yrs', distilleria: 'Ardbeg', regione: 'Islay', cat: 'islay', abv: '46%', prezzo: '€ 10,00', desc: 'Uno dei più apprezzati al mondo. Esplosione di torba, vaniglia, carne al BBQ, lime, pepe nero e cannella.' },
    { nome: 'Laphroaig 10yrs', distilleria: 'Laphroaig', regione: 'Islay', cat: 'islay', abv: '40%', prezzo: '€ 8,50', desc: 'Il più venduto di Islay. Malto essiccato su fuoco di torba locale. Corposo, affumicato con sorprendente dolcezza.' },
    { nome: 'Caol Ila 12', distilleria: 'Caol Ila', regione: 'Islay', cat: 'islay', abv: '43%', prezzo: '€ 8,50', desc: '"Sound of Islay". Torbato ed erbaceo al naso, fresco e delicatamente fruttato. Corposità raffinata.' },
    { nome: 'Lagavulin 8', distilleria: 'Lagavulin', regione: 'Islay', cat: 'islay', abv: '48%', prezzo: '€ 9,00', desc: 'Nato per i 200 anni della distilleria, diventato permanente. Fumo di legna, miele, tabacco, pepe, cioccolato fondente.' },
    { nome: 'Finlaggan', distilleria: 'nd', regione: 'Islay', cat: 'islay', abv: '—', prezzo: '€ 8,50', desc: 'Distilleria misteriosa non rivelata. Intenso, energico, torbato. Maturato almeno 6 anni. Miele, erbe officinali, spezie dolci.' },
    { nome: 'Machir Bay', distilleria: 'Kilchoman', regione: 'Islay', cat: 'islay', abv: '46%', prezzo: '€ 9,00', desc: 'Bourbon + 6 mesi sherry. Dolcezza, frutti tropicali, torba e vaniglia. Dalla più piccola distilleria di Islay.' },
    { nome: 'Sanaig', distilleria: 'Kilchoman', regione: 'Islay', cat: 'islay', abv: '—', prezzo: '€ 11,00', desc: '70% sherry Oloroso + 30% bourbon. Grande profondità, anima sherry pronunciata. Il lato più ricco di Kilchoman.' },
    // SPEYSIDE
    { nome: 'Monkey Shoulder', distilleria: 'William Grant & Sons', regione: 'Speyside', cat: 'speyside', abv: '—', prezzo: '€ 8,50', desc: 'Blended malt da Glenfiddich, Balvenie e Kininvie. Cremoso, morbido, note maltate e speziate. Ideale sul ghiaccio.' },
    { nome: 'Balvenie 12 Doublewood', distilleria: 'Balvenie', regione: 'Dufftown, Speyside', cat: 'speyside', abv: '40%', prezzo: '€ 8,50', desc: 'Matura prima in ex-bourbon, poi in botti di sherry first fill. Carattere complesso: dolcezza, frutta secca e pienezza.' },
    // LOWLANDS
    { nome: 'Cutty Sark Prohibited', distilleria: 'Cutty Sark', regione: 'Glasgow, Lowlands', cat: 'lowlands', abv: '50%', prezzo: '€ 7,50', desc: 'Tributo al Proibizionismo. Cacao, vaniglia, agrumi e spezie. Robusto ma morbido con ritorni di caramello e tocco di fumo.' },
    { nome: 'Glenkinchie 12yrs', distilleria: 'Glenkinchie', regione: 'Lowlands — 24km da Edimburgo', cat: 'lowlands', abv: '43%', prezzo: '€ 8,50', desc: '"The Edinburgh Malt". Leggero e fresco, malto d\'orzo, nocciola, vaniglia. Fruttato, tannico, leggermente torbato.' },
    { nome: 'Stratheden Fife', distilleria: 'The Lost Distillery Co.', regione: 'Fife, Scozia', cat: 'lowlands', abv: '—', prezzo: '€ 10,00', desc: 'Da distilleria storica aperta nel 1829, chiusa nel 1926. Botti sherry e torba Orkney. Fruttato, arancia, cacao, finale torbato.' },
    // IRELAND
    { nome: 'Jameson', distilleria: 'Jameson', regione: 'Irlanda', cat: 'ireland', abv: '40%', prezzo: '€ 6,00', desc: 'Il blended irish più venduto al mondo. Morbido, dolce, con note di vaniglia e frutta.' },
    { nome: 'Bushmills', distilleria: 'Bushmills', regione: 'Irlanda del Nord', cat: 'ireland', abv: '40%', prezzo: '€ 6,00', desc: 'La distilleria irlandese più antica ancora attiva, fondata nel 1608. Leggero e maltato.' },
    { nome: 'The Busker Single Malt', distilleria: 'The Busker', regione: 'Irlanda', cat: 'ireland', abv: '44.3%', prezzo: '€ 6,00', desc: 'Dorato intenso, sentori di frutta, essenza di pino e malto. Ricco di cioccolato con finale dolce e cremoso.' },
    { nome: 'The Busker Single Pot Still', distilleria: 'The Busker', regione: 'Irlanda', cat: 'ireland', abv: '44.3%', prezzo: '€ 6,00', desc: 'Tradizionale pot still in rame, ex-bourbon e sherry. Fiori freschi, miele e spezie. Finale lungo, caldo e ricco.' },
    { nome: 'Flaming Pigs', distilleria: 'Flaming Pigs', regione: 'Irlanda', cat: 'ireland', abv: '40%', prezzo: '€ 7,00', desc: 'Single malt e grain irish, affumicato e speziato. Carattere deciso e gustoso per chi cerca qualcosa di diverso.' },
    { nome: 'Connemara Peated', distilleria: 'Connemara', regione: 'Irlanda', cat: 'ireland', abv: '—', prezzo: '€ 8,00', desc: 'Irish torbato, legame con i grandi scozzesi. Ex-bourbon americano. Affumicatura elegante, frutta, vaniglia, miele e spezie.' },
  ];

  get filteredBirre(): Beer[] {
    if (this.beerFilter === 'all') return this.birre;
    return this.birre.filter(b => b.cat === this.beerFilter);
  }

  get filteredFood(): FoodItem[] {
    if (this.foodFilter === 'all') return this.food;
    return this.food.filter(f => f.cat === this.foodFilter);
  }

  get filteredWhisky(): WhiskyItem[] {
    if (this.whiskyFilter === 'all') return this.whisky;
    return this.whisky.filter(w => w.cat === this.whiskyFilter);
  }

  getFoamColor(beerColor: string): string {
    // stouts get a beige foam, others white
    const dark = ['#1A0A04', '#0C0504'];
    return dark.includes(beerColor) ? '#d4c5a0' : '#f5f0e0';
  }
}
