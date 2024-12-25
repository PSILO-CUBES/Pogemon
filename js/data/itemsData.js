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
    price: 1,
    value: 1
  },
  water_Stone:{
    name:'water_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/water_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 1,
    value: 1
  },
  fire_Stone:{
    name:'fire_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/fire_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 1,
    value: 1
  },
  thunder_Stone:{
    name:'thunder_Stone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/thunder_Stone.png',
    desc: "Can trigger certain pogemon's evolution.",
    consume: true,
    price: 1,
    value: 1
  },
  royal_Jelly:{
    name:'royal_Jelly',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/royal_Jelly.png',
    desc: "Can trigger certain pogemon's evolution, also quite tasty.",
    consume: true,
    price: 1,
    value: 1
  },
  // med
  potion: {
    name: 'potion',
    type: 'med',
    effect: 'heal',
    pow: '20',
    img: 'img/item_scene/items/med/potion.png',
    desc: 'Standard Heal',
    friendliness: 1,
    price: 1,
    value: 1
  },
  super_Potion: {
    name: 'super_Potion',
    type: 'med',
    effect: 'heal',
    pow: '50',
    img: 'img/item_scene/items/med/super_Potion.png',
    desc: 'Good Heal',
    friendliness: 2,
    price: 1,
    value: 1
  },
  mega_Potion: {
    name: 'mega_Potion',
    type: 'med',
    effect: 'heal',
    pow: '200',
    img: 'img/item_scene/items/med/heal.png',
    desc: 'Crazy Heal',
    friendliness: 3,
    price: 1,
    value: 1
  },
  revive: {
    name: 'revive',
    type: 'med',
    effect: 'revive',
    pow: '0.25',
    img: 'img/item_scene/items/med/revive.png',
    desc: "Revivifies a fainted pogemon and heals it by 25% of it's max HP.",
    friendliness: 4,
    price: 1,
    value: 1
  },
  // balls
  pogeball: {
    name: 'pogeball',
    type: 'ball',
    pow: '1',
    img: 'img/item_scene/items/ball/pogeball.png',
    animation: 'img/item_scene/items/ball/pogeball_Animation.png',
    desc: "Catches pogemons",
    price: 1,
    value: 1
  },
  megaball: {
    name: 'megaball',
    type: 'ball',
    pow: '999999999999',
    img: 'img/item_scene/items/ball/pogeball.png',
    animation: 'img/item_scene/items/ball/pogeball_Animation.png',
    desc: "Resurrect, revivifies a fainted pogemon and heals it by 25% of it's max HP.",
    price: 1,
    value: 1
  },
  // berry
  banana: {
    name: 'banana',
    type: 'berry',
    effect: 'heal',
    pow: 10,
    img: 'img/item_scene/items/berry/banana.png',
    desc: 'A very ordinary banana.',
    heldType: 'after',
    heldEffect: 'flatHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 1,
    value: 1
  },
  yellow_Berry: {
    name: 'yellow_Berry',
    type: 'berry',
    effect: 'heal',
    pow: 25,
    img: 'img/item_scene/items/berry/yellow_Berry.png',
    desc: 'A very sour yellow berry.',
    heldType: 'after',
    heldEffect: 'percentHealing',
    heldThreshHold: 50,
    consume: true,
    friendliness: 1,
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
  },
  magnet:{
    name: 'magnet',
    type: 'battle',
    effect: 'electic',
    pow: 20,
    img: 'img/item_scene/items/battle/charcoal.png',
    desc: 'A strong magnet.\n\nWhen held, boosts electric type attacks by 20%.',
    heldType: 'elemental',
    consume: false,
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
  },

  // battle item
  // NEED TO ADD EFFECTS ON THESE
  black_Sludge:{
    name: 'black_Sludge',
    type: 'battle',
    effect: 'poison',
    img: 'img/item_scene/items/battle/black_Sludge.png',
    desc: "If held, holder will loose 1/16th or it's max HP per turn.",
    heldType: 'after',
    consume: false,
    price: 1,
    value: 1
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
    price: 1,
    value: 1
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
    price: 1,
    value: 1
  },
  
  // vals
  // key
  glowy_Halo:{
    name: 'glowy_Halo',
    type: 'key',
    effect: 'evolution',
    pow: "---",
    img: 'img/item_scene/items/key/halo.png',
    desc: "A strange and glowy halo, given to you by Professor Heisenberg in Sol Town.\n\nHe mentioned something about it allowing slimie to somehow evolve.",
    heldType: '---',
    consume: false,
    odds: 0,
    price: 1,
    value: null
  }
}