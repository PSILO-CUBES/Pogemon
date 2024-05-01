export const itemsObj = {
  // misc
  leafStone:{
    name:'leafStone',
    type: 'misc',
    effect: 'evo',
    pow: '---',
    img: 'img/item_scene/items/misc/leafStone.png',
    desc: "Can trigger certain pogemon's evolution."
  },
  // med
  heal: {
    name: 'heal',
    type: 'med',
    effect: 'heal',
    pow: '20',
    img: 'img/item_scene/items/med/heal.png',
    desc: 'Standard Heal',
  },
  goodHeal: {
    name: 'goodHeal',
    type: 'med',
    effect: 'heal',
    pow: '50',
    img: 'img/item_scene/items/med/heal.png',
    desc: 'Good Heal'
  },
  megaHeal: {
    name: 'megaHeal',
    type: 'med',
    effect: 'heal',
    pow: '200',
    img: 'img/item_scene/items/med/heal.png',
    desc: 'Crazy Heal'
  },
  resurrect: {
    name: 'resurrect',
    type: 'med',
    effect: 'revive',
    pow: '0.25',
    img: 'img/item_scene/items/med/resurrect.png',
    desc: "Resurrect, revivifies a fainted pogemon and heals it by 25% of it's max HP.",
  },
  // balls
  pogeball: {
    name: 'pogeball',
    type: 'ball',
    pow: '1',
    img: 'img/item_scene/items/ball/pogeball.png',
    animation: 'img/item_scene/items/ball/pogeball_Animation.png',
    desc: "Catches pogemons",
  },
  megaball: {
    name: 'megaball',
    type: 'ball',
    pow: '999999999999',
    img: 'img/item_scene/items/ball/pogeball.png',
    animation: 'img/item_scene/items/ball/pogeball_Animation.png',
    desc: "Resurrect, revivifies a fainted pogemon and heals it by 25% of it's max HP.",
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
    heldThreshHold: 100
  },
  yellowBerry: {
    name: 'yellowBerry',
    type: 'berry',
    effect: 'heal',
    pow: 25,
    img: 'img/item_scene/items/berry/yellowBerry.png',
    desc: 'A very sour yellow berry.',
    heldType: 'after',
    heldEffect: 'percentHealing',
    heldThreshHold: 100
  },
  // tm
  // battleItm
  // vals
  // key
}