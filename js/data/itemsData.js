import { movesObj } from "./movesData.js"

export const itemsObj = {
  // misc
  leaf_Stone:{
    name:'leaf_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/leaf_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 2100,
    value: 650
  },
  water_Stone:{
    name:'water_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/water_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 2100,
    value: 650
  },
  fire_Stone:{
    name:'fire_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/fire_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 2100,
    value: 650
  },
  thunder_Stone:{
    name:'thunder_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/thunder_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 2100,
    value: 650
  },
  regina_Esca:{
    name:'regina_Esca',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/regina_Esca.png',
    desc: "Can trigger a certain pogemon's evolution,\n\nalso quite tasty.",
    consume: true,
    price: 1,
    value: null
  },
  sand_Plankton:{
    name:'sand_Plankton',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/sand_Plankton.png',
    desc: "a rare and very tiny sand plankton,\na certain type of pogemon cannot resist these.",
    consume: true,
    price: 1,
    value: null
  },
  repel:{
    name:'repel',
    type: 'misc',
    effect: 'repel',
    pow: 100,
    img: 'img/item_scene/items/misc/repel.png',
    desc: "Every pogemon hates the scent of this stuff.\n\nPrevents wild encouters for 100 steps.",
    consume: true,
    price: 350,
    value: 175
  },
  super_Repel:{
    name:'super_Repel',
    type: 'misc',
    effect: 'repel',
    pow: 200,
    img: 'img/item_scene/items/misc/super_Repel.png',
    desc: "Every pogemon hates the scent of this stuff.\n\nPrevents wild encouters for 200 steps.",
    consume: true,
    price: 750,
    value: 350
  },
  rare_Candy:{
    name:'rare_Candy',
    type: 'misc',
    effect: 'level',
    pow: '---',
    img: 'img/item_scene/items/misc/rare_Candy.png',
    desc: "Raises a pogemon's lvl by 1.",
    consume: true,
    price: 10000,
    value: 5000
  },
  ability_Capsule:{
    name:'ability_Capsule',
    type: 'misc',
    effect: 'ability',
    pow: '---',
    img: 'img/item_scene/items/misc/ability_Capsule.png',
    desc: "Changes the current ability.",
    consume: true,
    price: 100000,
    value: 5000
  },

  // med
  potion: {
    name: 'potion',
    type: 'med',
    effect: 'heal',
    pow: 20,
    img: 'img/item_scene/items/med/potion.png',
    desc: 'Standard Heal',
    friendliness: 1,
    price: 300,
    value: 75
  },
  super_Potion: {
    name: 'super_Potion',
    type: 'med',
    effect: 'heal',
    pow: 50,
    img: 'img/item_scene/items/med/super_Potion.png',
    desc: 'Good Heal',
    friendliness: 2,
    price: 700,
    value: 150
  },
  mega_Potion: {
    name: 'mega_Potion',
    type: 'med',
    effect: 'heal',
    pow: 200,
    img: 'img/item_scene/items/med/mega_potion.png',
    desc: 'Mega Heal',
    friendliness: 3,
    price: 1200,
    value: 300
  },
  full_Potion: {
    name: 'full_Potion',
    type: 'med',
    effect: 'heal',
    pow: 999,
    img: 'img/item_scene/items/med/full_Potion.png',
    desc: 'Full Heal',
    friendliness: 3,
    price: 3000,
    value: 725
  },

  ether: {
    name: 'ether',
    type: 'med',
    effect: 'pp',
    pow: 10,
    img: 'img/item_scene/items/med/ether.png',
    desc: 'Restores the PP of the selected move by 10.',
    friendliness: 1,
    price: 1200,
    value: 400
  },
  super_Ether: {
    name: 'super_Ether',
    type: 'med',
    effect: 'pp',
    pow: 999,
    img: 'img/item_scene/items/med/super_Ether.png',
    desc: 'Fully restores the PP of the selected move.',
    friendliness: 3,
    price: 3000,
    value: 1000
  },
  elixir: {
    name: 'elixir',
    type: 'med',
    effect: 'ppAll',
    pow: 10,
    img: 'img/item_scene/items/med/elixir.png',
    desc: `Restores the PP of all the selected Pokémon's moves by 10.`,
    friendliness: 1,
    price: 1,
    value: 1500
  },
  super_Elixir: {
    name: 'super_Elixir',
    type: 'med',
    effect: 'ppAll',
    pow: 999,
    img: 'img/item_scene/items/med/super_Elixir.png',
    desc: `Fully restores the PP of all the selected Pokémon's moves.`,
    friendliness: 3,
    price: 1,
    value: 2250
  },

  revive: {
    name: 'revive',
    type: 'med',
    effect: 'revive',
    pow: '0.5',
    img: 'img/item_scene/items/med/revive.png',
    desc: "Revivifies a fainted pogemon and heals it by 50% of it's max HP.",
    friendliness: 4,
    price: 1500,
    value: 450
  },
  super_Revive: {
    name: 'super_Revive',
    type: 'med',
    effect: 'revive',
    pow: '1',
    img: 'img/item_scene/items/med/super_revive.png',
    desc: "Revivifies a fainted pogemon and heals it to it's max HP.",
    friendliness: 4,
    price: 1,
    value: 1250
  },

  // balls
  pogeball: {
    name: 'pogeball',
    type: 'ball',
    pow: '1',
    img: 'img/item_scene/items/ball/pogeball.png',
    animation: 'img/item_scene/items/ball/pogeball_Animation.png',
    desc: "Catches pogemons.",
    price: 200,
    value: 50
  },
  midball: {
    name: 'midball',
    type: 'ball',
    pow: '1.5',
    img: 'img/item_scene/items/ball/midball.png',
    animation: 'img/item_scene/items/ball/midball_Animation.png',
    desc: "Catches pogemons.",
    price: 600,
    value: 200
  },
  megaball: {
    name: 'megaball',
    type: 'ball',
    pow: '2',
    img: 'img/item_scene/items/ball/megaball.png',
    animation: 'img/item_scene/items/ball/megaball_Animation.png',
    desc: "Catches pogemons.",
    price: 1200,
    value: 400
  },
  ultimball: {
    name: 'ultimball',
    type: 'ball',
    pow: '100',
    img: 'img/item_scene/items/ball/ultimball.png',
    animation: 'img/item_scene/items/ball/ultimball_Animation.png',
    desc: "Catches pogemons.",
    price: 1,
    value: 10000
  },

  // berry
  old_Banana: {
    name: 'old_Banana',
    type: 'berry',
    effect: 'heal',
    pow: 10,
    img: 'img/item_scene/items/berry/old_Banana.png',
    desc: 'A old and soggy banana.\n\nRestores Hp when help in battle.',
    heldType: 'after',
    heldEffect: 'flatHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 50,
    value: 10
  },
  banana: {
    name: 'banana',
    type: 'berry',
    effect: 'heal',
    pow: 35,
    img: 'img/item_scene/items/berry/banana.png',
    desc: 'A very ordinary banana.\n\nRestores Hp when help in battle.',
    heldType: 'after',
    heldEffect: 'flatHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 150,
    value: 50
  },
  golden_banana: {
    name: 'golden_banana',
    type: 'berry',
    effect: 'heal',
    pow: 150,
    img: 'img/item_scene/items/berry/golden_banana.png',
    desc: 'WOW!!! GOLDEN LEGENDARY!! :D.',
    heldType: 'after',
    heldEffect: 'flatHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 1500,
    value: 50
  },
  yellow_Berry: {
    name: 'yellow_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 25,
    img: 'img/item_scene/items/berry/yellow_Berry.png',
    desc: 'A very sour yellow berry.\n\nRestores Hp when help in battle.',
    heldType: 'after',
    heldEffect: 'percentHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 500,
    value: 125
  },
  wakeo_Berry: {
    name: 'wakeo_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'slp',
    img: 'img/item_scene/items/berry/wakeo_Berry.png',
    desc: 'A very pungeant berry.\n\nWakes up from sleep when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 350,
    value: 125
  },  
  milky_Berry: {
    name: 'milky_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'burn',
    img: 'img/item_scene/items/berry/milky_Berry.png',
    desc: 'A very milky berry.\n\nCures burns when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 350,
    value: 125
  },
  net_Berry: {
    name: 'net_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'psn',
    img: 'img/item_scene/items/berry/net_Berry.png',
    desc: 'A soapy tasting berry.\n\nCures poison when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 350,
    value: 125
  },
  spicy_Berry: {
    name: 'spicy_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'psn',
    img: 'img/item_scene/items/berry/spicy_Berry.png',
    desc: 'A spicy tasting berry.\n\nCures freeze when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 350,
    value: 125
  },
  libra_Berry: {
    name: 'libra_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'para',
    img: 'img/item_scene/items/berry/libra_Berry.png',
    desc: 'A very liberating tasting berry.\n\nCures from paralysis when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 350,
    value: 125
  },
  rainbo_Berry: {
    name: 'rainbo_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 'all',
    img: 'img/item_scene/items/berry/rainbo_Berry.png',
    desc: 'A very colorful berry.\n\nCures from any status when held in battle.',
    heldType: 'after',
    heldEffect: 'healStatus',
    consume: true,
    friendliness: 1,
    price: 750,
    value: 250
  },
  energy_Berry: {
    name: 'energy_Berry',
    type: 'berry',
    effect: 'pp',
    pow: 10,
    img: 'img/item_scene/items/berry/energy_Berry.png',
    desc: "Restores 10 PP to the first of the holder's moves to reach 0 PP. Single use.",
    heldType: 'after',
    heldEffect: 'healPP',
    consume: true,
    friendliness: 1,
    price: 500,
    value: 125
  },

  // tm

  // battleItm
    
  // elemental items
  silk_Scarf: {
    name: 'silk_Scarf',
    type: 'battle',
    effect: 'normal',
    pow: 20,
    img: 'img/item_scene/items/battle/silk_Scarf.png',
    desc: 'A silky scarf.\n\nWhen held, boosts normal type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  charcoal:{
    name: 'charcoal',
    type: 'battle',
    effect: 'fire',
    pow: 20,
    img: 'img/item_scene/items/battle/charcoal.png',
    desc: 'A forever warm charcoal.\n\nWhen held, boosts fire type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  mystic_Water:{
    name: 'mystic_Water',
    type: 'battle',
    effect: 'water',
    pow: 20,
    img: 'img/item_scene/items/battle/mystic_Water.png',
    desc: 'A necklass coated with condentation.\n\nWhen held, boosts water type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  miracle_Seed:{
    name: 'miracle_Seed',
    type: 'battle',
    effect: 'grass',
    pow: 20,
    img: 'img/item_scene/items/battle/miracle_Seed.png',
    desc: 'A forever warm charcoal.\n\nWhen held, boosts fire type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  magnet:{
    name: 'magnet',
    type: 'battle',
    effect: 'electic',
    pow: 20,
    img: 'img/item_scene/items/battle/magnet.png',
    desc: 'A strong magnet.\n\nWhen held, boosts electric type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  sharp_Beak:{
    name: 'sharp_Beak',
    type: 'battle',
    effect: 'flyin',
    pow: 20,
    img: 'img/item_scene/items/battle/sharp_Beak.png',
    desc: 'A beak as shark as a knife.\n\nWhen held, boosts flying type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  hard_Stone:{
    name: 'hard_Stone',
    type: 'battle',
    effect: 'stone',
    pow: 20,
    img: 'img/item_scene/items/battle/hard_Stone.png',
    desc: 'A very sturdy stone.\n\nWhen held, boosts stone type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  soft_Sand:{
    name: 'soft_Sand',
    type: 'battle',
    effect: 'ground',
    pow: 20,
    img: 'img/item_scene/items/battle/soft_Sand.png',
    desc: 'A bag of very fine sand.\n\nWhen held, boosts ground type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  silver_Powder:{
    name: 'silver_Powder',
    type: 'battle',
    effect: 'bug',
    pow: 20,
    img: 'img/item_scene/items/battle/silver_Powder.png',
    desc: 'A very sticky and reflective substence.\n\nWhen held, boosts bug type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  poison_Barb:{
    name: 'poison_Barb',
    type: 'battle',
    effect: 'poison',
    pow: 20,
    img: 'img/item_scene/items/battle/poison_Barb.png',
    desc: 'Handle carefully. :)\n\nWhen held, boosts poison type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  black_Glasses:{
    name: 'black_Glasses',
    type: 'battle',
    effect: 'dark',
    pow: 20,
    img: 'img/item_scene/items/battle/black_Glasses.png',
    desc: 'A strong magnet.\n\nWhen held, boosts dark type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  spell_Tag:{
    name: 'spell_Tag',
    type: 'battle',
    effect: 'ghost',
    pow: 20,
    img: 'img/item_scene/items/battle/spell_Tag.png',
    desc: 'A very ominous tag with strange writing on it.\n\nWhen held, boosts ghost type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  twisted_Spoon:{
    name: 'twisted_Spoon',
    type: 'battle',
    effect: 'psychic',
    pow: 20,
    img: 'img/item_scene/items/battle/twisted_Spoon.png',
    desc: 'A twisted up spoon. How did it even get like this?..\n\nWhen held, boosts psychic type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  black_Belt:{
    name: 'black_Belt',
    type: 'battle',
    effect: 'fighting',
    pow: 20,
    img: 'img/item_scene/items/battle/black_Belt.png',
    desc: 'A worn out belt. Smells funny...\n\nWhen held, boosts fighting type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  nevermelt_ice:{
    name: 'nevermelt_ice',
    type: 'battle',
    effect: 'ice',
    pow: 20,
    img: 'img/item_scene/items/battle/nevermelt_ice.png',
    desc: 'An eternal piece of ice.\n\nWhen held, boosts ice type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  dragon_Fang:{
    name: 'dragon_Fang',
    type: 'battle',
    effect: 'dragon',
    pow: 20,
    img: 'img/item_scene/items/battle/dragon_Fang.png',
    desc: 'A very ancient tooth.\n\nWhen held, boosts dragon type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  fairy_Feather:{
    name: 'fairy_Feather',
    type: 'battle',
    effect: 'fairy',
    pow: 20,
    img: 'img/item_scene/items/battle/fairy_Feather.png',
    desc: 'Very soft to the touch.\n\nWhen held, boosts fairy type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },
  metal_Coat:{
    name: 'metal_Coat',
    type: 'battle',
    effect: 'steel',
    pow: 20,
    img: 'img/item_scene/items/battle/metal_Coat.png',
    desc: 'A lightweight coat of a strong alloy.\n\nWhen held, boosts steel type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 3000,
    value: 725
  },

  // battle item
  assault_Vest:{
    name: 'assault_Vest',
    type: 'battle',
    img: 'img/item_scene/items/battle/assault_Vest.png',
    desc: 'When held, boosts spdef by 50%, but cannot use status moves.',
    consume: false,
    price: 25000,
    value: 725
  },
  heavy_Duty_Boots:{
    name: 'heavy_Duty_Boots',
    type: 'battle',
    img: 'img/item_scene/items/battle/heavy_Duty_Boots.png',
    desc: 'Makes the wearer immuned to field hazards.',
    heldType: 'elemental',
    consume: false,
    price: 25000,
    value: 725
  },
  leftovers:{
    name: 'leftovers',
    type: 'battle',
    img: 'img/item_scene/items/battle/leftovers.png',
    desc: "If held, the holder will heal 1/16th of it's max HP per turn.",
    consume: false,
    price: 25000,
    value: 725
  },
  black_Sludge:{
    name: 'black_Sludge',
    type: 'battle',
    img: 'img/item_scene/items/battle/black_Sludge.png',
    desc: "If held, the holder will loose 1/16th of it's max HP per turn.\n\nHeals if the holder is poison type.",
    consume: false,
    price: 25000,
    value: 725
  },
  life_Orb:{
    name: 'life_Orb',
    type: 'battle',
    img: 'img/item_scene/items/battle/life_Orb.png',
    desc: "Holder's attacks do 1.3x damage, and it loses 1/10th of its max HP after the attack.",
    consume: false,
    price: 25000,
    value: 725
  },
  flame_Orb:{
    name: 'flame_Orb',
    type: 'battle',
    heldType: 'burn',
    img: 'img/item_scene/items/battle/flame_Orb.png',
    desc: "An item to be held by a Pokémon. It is a bizarre orb that inflicts a burn on the holder in battle.",
    consume: false,
    price: 10000,
    value: 725
  },
  toxic_Orb:{
    name: 'toxic_Orb',
    type: 'battle',
    heldType: 'psn',
    img: 'img/item_scene/items/battle/toxic_Orb.png',
    desc: "An item to be held by a Pokémon. It is a bizarre orb that badly poisons the holder in battle.",
    consume: false,
    price: 10000,
    value: 725
  },
  rocky_Helmet:{
    name: 'rocky_Helmet',
    type: 'battle',
    img: 'img/item_scene/items/battle/rocky_Helmet.png',
    desc: "If holder is hit by a physical move, the attacker loses 1/16 of its max HP.",
    consume: false,
    price: 25000,
    value: 725
  },
  eviolite:{
    name: 'eviolite',
    type: 'battle',
    img: 'img/item_scene/items/battle/eviolite.png',
    desc: "If holder can evolve, its Defense and Sp. Def are 1.5x.",
    consume: false,
    price: 25000,
    value: 725
  },
  expert_Belt:{
    name: 'expert_Belt',
    type: 'battle',
    img: 'img/item_scene/items/battle/expert_Belt.png',
    desc: "Holder's attacks that are super effective against the target do 1.2x damage.",
    consume: false,
    price: 25000,
    value: 725
  },
  focus_Band:{
    name: 'focus_Band',
    type: 'battle',
    effect: 'sturdy',
    pow: 1,
    img: 'img/item_scene/items/battle/focus_Band.png',
    desc: "The bandana makes the wearer extra weary of hits.\n\nIf the wearer were to faint, has a 10% chance to remain alive with 1 hp.",
    heldType: 'after',
    consume: false,
    odds: 10,
    price: 10000,
    value: 725
  },
  focus_Sash:{
    name: 'focus_Sash',
    type: 'battle',
    effect: 'sturdy',
    pow: 1,
    img: 'img/item_scene/items/battle/focus_Sash.png',
    desc: "The bandana makes the wearer extra weary of hits.\n\nIf the wearer's health is full, will remain alive with 1 hp.",
    heldType: 'after',
    consume: true,
    odds: 100,
    price: 10000,
    value: 725
  },
  choice_Band:{
    name: 'choice_Band',
    type: 'battle',
    effect: 'choice',
    img: 'img/item_scene/items/battle/choice_Band.png',
    desc: "Holder's Attack is 1.5x, but it can only select the first move it executes.",
    consume: false,
    price: 25000,
    value: 725
  },
  choice_Specs:{
    name: 'choice_Specs',
    type: 'battle',
    effect: 'choice',
    img: 'img/item_scene/items/battle/choice_Specs.png',
    desc: "Holder's Sp. Atk is 1.5x, but it can only select the first move it executes.",
    consume: false,
    price: 25000,
    value: 725
  },
  choice_Scarf:{
    name: 'choice_Scarf',
    type: 'battle',
    effect: 'choice',
    img: 'img/item_scene/items/battle/choice_Scarf.png',
    desc: "Holder's Speed is 1.5x, but it can only select the first move it executes.",
    consume: false,
    price: 25000,
    value: 725
  },
  lucky_Egg:{
    name: 'lucky_Egg',
    type: 'battle',
    effect: 'exp',
    img: 'img/item_scene/items/battle/lucky_Egg.png',
    desc: "A hold item that boosts EXP. points earned in battle.",
    consume: false,
    price: 25000,
    value: 725
  },
  heat_Rock:{
    name: 'heat_Rock',
    type: 'battle',
    effect: 'weather',
    weatherType: 'sun',
    img: 'img/item_scene/items/battle/heat_Rock.png',
    desc: "	",
    consume: false,
    price: 25000,
    value: 725
  },
  damp_Rock:{
    name: 'damp_Rock',
    type: 'battle',
    effect: 'weather',
    weatherType: 'rain',
    img: 'img/item_scene/items/battle/damp_Rock.png',
    desc: "A Pokémon hold item that extends the duration of the Rain.",
    consume: false,
    price: 25000,
    value: 725
  },
  smooth_Rock:{
    name: 'smooth_Rock',
    type: 'battle',
    effect: 'weather',
    weatherType: 'sand',
    img: 'img/item_scene/items/battle/smooth_Rock.png',
    desc: "A Pokémon hold item that extends the duration of the Sand.",
    consume: false,
    price: 25000,
    value: 725
  },
  icy_Rock:{
    name: 'icy_Rock',
    type: 'battle',
    effect: 'weather',
    weatherType: 'snow',
    img: 'img/item_scene/items/battle/icy_Rock.png',
    desc: "A Pokémon hold item that extends the duration of the Snow.",
    consume: false,
    price: 25000,
    value: 725
  },
  light_Clay:{
    name: 'light_Clay',
    type: 'battle',
    effect: 'screens',
    img: 'img/item_scene/items/battle/light_Clay.png',
    desc: "A Pokémon hold item that extends the duration of Screens.",
    consume: false,
    price: 25000,
    value: 725
  },

  // vals
  nugget:{
    name:'nugget',
    type: 'vals',
    effect: 'valuable',
    pow: '---',
    img: 'img/item_scene/items/vals/nugget.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 1,
    value: 10000
  },
  
  // key
  // key
  map:{
    name: 'map',
    type: 'key',
    effect: 'teleport',
    pow: "---",
    img: 'img/item_scene/items/key/map.png',
    desc: "A very ordinary map of the X region!",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  glowy_Halo:{
    name: 'glowy_Halo',
    type: 'key',
    effect: 'evolution',
    pow: "---",
    img: 'img/item_scene/items/key/halo.png',
    desc: "A strange and glowy halo, given to you by Professor Heisenberg in Fair Town.\n\nHe mentioned something about it allowing slimie to somehow evolve.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  golden_Disk:{
    name: 'golden_Disk',
    type: 'key',
    effect: 'event',
    pow: "---",
    img: 'img/item_scene/items/key/golden_Disk.png',
    desc: "A very shiny and heavy disk, it looks like it used belonged to something living a long time ago.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  axe:{
    name: 'axe',
    type: 'key',
    effect: 'utility',
    pow: "---",
    img: 'img/item_scene/items/key/axe.png',
    desc: "Allows you to cut down small trees that are in your way.\n\nHope they don't hit me with a DMCA case for that one.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  guiding_Staff:{
    name: 'guiding_Staff',
    type: 'key',
    effect: 'flash',
    pow: "---",
    img: 'img/item_scene/items/key/guiding_Staff.png',
    desc: "At first glance it seems to be a very old and ordinary staff. It guides it users through the darkest to times.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  hammer:{
    name: 'hammer',
    type: 'key',
    effect: 'utility',
    pow: "---",
    img: 'img/item_scene/items/key/hammer.png',
    desc: "Allows you to break rocks that are in your way.\n\nIt broky :()",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  surf_Saddle:{
    name: 'surf_Saddle',
    type: 'key',
    effect: 'utility',
    pow: "---",
    img: 'img/item_scene/items/key/surf_Saddle.png',
    desc: "Allows you to surf certain pogemons.\n\nIt looks pretty radical too 8)",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  teleport_Gem:{
    name: 'teleport_Gem',
    type: 'key',
    effect: 'teleport',
    pow: "---",
    img: 'img/item_scene/items/key/teleport_Gem.png',
    desc: "A very powerful gem.\n\nit allows you to teleport to places you've seen before in the blink of an eye!",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  dawn_Gem:{
    name: 'dawn_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/dawn_Gem.png',
    desc: "A gem containing ancient elemental energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  dusk_Gem:{
    name: 'dusk_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/dusk_Gem.png',
    desc: "A gem containing ancient elemental energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  twilight_Gem:{
    name: 'twilight_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/twilight_Gem.png',
    desc: "A gem containing ancient elemental energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  solstice_Gem:{
    name: 'solstice_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/solstice_Gem.png',
    desc: "A gem containing ancient elemental energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  corrupt_Gem:{
    name: 'corrupt_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/corrupt_Gem.png',
    desc: "Something feels very wrong about the energy eminating from this gem..",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  stasis_Gem:{
    name: 'stasis_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/stasis_Gem.png',
    desc: "A gem containing ancient a fundemental form of energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  fleeting_Gem:{
    name: 'fleeting_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/fleeting_Gem.png',
    desc: "A gem containing ancient a fundemental form of energy.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
  illuminated_Gem:{
    name: 'illuminated_Gem',
    type: 'key',
    effect: 'summoning',
    pow: "---",
    img: 'img/item_scene/items/key/illuminated_Gem.png',
    desc: "The energy emitted from this gem feels whole.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  },
}

Object.values(movesObj).forEach((move, i) =>{
  let TMNum

  if(i < 10) TMNum = `00${i}`
  else if(i < 100) TMNum = `0${i}`
  else TMNum = i

  const TMObj = {
    name: `TM${TMNum}`,
    type: 'tm',
    TMName: move.name,
    img: `img/item_scene/items/tms/${movesObj[move.name].element}.png`,
    desc: `This Tm contains ${move.name.replace(/_/g, ' ')}`,
    consume: true,
    price: 10000,
    value: 2250
  }

  // console.log(`TM${TMNum} : ${move.name}`)

  itemsObj[`TM${TMNum}`] = TMObj
})