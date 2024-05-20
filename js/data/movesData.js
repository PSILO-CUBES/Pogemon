import { audioObj } from "./audioData.js"

export const movesObj = {
  // physical

  // normal
  tackle:{
    name: 'tackle',
    type: 'physical',
    element: 'normal',
    pow: 45,
    acc: 95,
    pp: 50,
    effects: null,
    priority: 0
  },
  quick_Attack:{
    name: 'quick_Attack',
    type: 'physical',
    element: 'normal',
    pow: 50,
    acc: 100,
    pp: 50,
    effects: null,
    priority: 1
  },
  headbutt:{
    name: 'headbutt',
    type: 'physical',
    element: 'normal',
    pow: 1000,
    acc: 90,
    pp: 25,
    effects: [{flinched: 100}],
    priority: 0
  },
  slash:{
    name: 'slash',
    type: 'physical',
    element: 'normal',
    pow: 70,
    acc: 100,
    pp: 30,
    effects: [{crit: 1}],
    priority: 0,
    sprite: '../../img/moves/slash.png'
  },
  struggle:{
    name: 'struggle',
    type: 'physical',
    element: 'normal',
    pow: 1,
    acc: 50,
    pp: 100,
    effects: null,
    priority: 0
  },

  // fighting
  super_Power: {
    name: 'super_Power',
    type: 'physical',
    element: 'fighting',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: [{name: 'selfDebuff', target:'def', pow: 1, type: 'stats'}, {name: 'selfDebuff', target:'atk', pow: 1, type: 'stats'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/superpower.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  // special

  // fire
  fire_Ball:{
    name: 'fire_Ball',
    type: 'special',
    element: 'fire',
    pow: 100,
    acc: 100,
    pp: 30,
    effects: [{burn: 100}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  //ghost
  shadow_Ball:{
    name: 'shadow_Ball',
    type: 'special',
    element: 'ghost',
    pow: 25,
    acc: 80,
    pp: 30,
    effects: [{name: 'debuff', target:'spdef', pow: 1}],
    priority: 0,
    rotation: {ally: 0, foe: 0},
    duration: 2,
    sprite: '../../img/moves/shadowball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  // status

  // heal
  heal:{
    name: 'heal',
    type: 'status',
    element: 'normal',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{heal: 100}],
    priority: 0,
    sprite: '../../img/moves/heal.png',
  },

  // buff
  sharpen:{
    name: 'sharpen',
    type: 'status',
    element: 'steel',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{name: 'buff', target:'atk', pow: 1, type: 'stats'}],
    priority: 0,
  },
  swift:{
    name: 'swift',
    type: 'status',
    element: 'flying',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{name: 'buff', target:'spd', pow: 1, type: 'stats'}],
    priority: 0,
    sprite: '../../img/moves/swift.png',
    position:{
      x: 200,
      y: 250
    }
  },

  // debuff
  growl:{
    name: 'growl',
    type: 'status',
    element: 'dark',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{name: 'debuff', target:'atk', pow: 1, type: 'stats'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1,
    sprite: '../../img/moves/growl.png',
    position:{
      x: 375,
      y: 175
    }
  },
  stare:{
    name: 'stare',
    type: 'status',
    element: 'dark',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{name: 'debuff', target:'def', pow: 1, type: 'stats'}],
    priority: 0,
  },

  // status

  //normal
  protect: {
    name: 'protect',
    type: 'status',
    element: 'normal',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{protect: 100, type: 'status'}],
    priority: 6,
    rotation: {ally: 1, foe: -2},
    //animation set on another function so no need to set a duration here
    duration: 0,
    //sprite set to blank because animation is done with css so no sprite is used
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  substitute: {
    name: 'substitute',
    type: 'status',
    element: 'normal',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{substitute: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    //animation set on another function so no need to set a duration here
    duration: 0,
    //sprite set to blank because animation is done with css so no sprite is used
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //fire
  heat_Wave:{
    name: 'heat_Wave',
    type: 'status',
    element: 'fire',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{burn: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    //animation set on another function so no need to set a duration here
    duration: 0,
    //sprite set to blank because animation is done with css so no sprite is used
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  sunny_Day:{
    name: 'sunny_Day',
    type: 'status',
    element: 'fire',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{sun: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //water
  rainy_Day:{
    name: 'rainy_Day',
    type: 'status',
    element: 'water',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{rain: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },

  //grass
  leech_Seed:{
    name: 'leech_Seed',
    type: 'status',
    element: 'grass',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{seeded: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    sprite: '../../img/moves/seed.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //rock
  sand_Storm:{
    name: 'sand_Storm',
    type: 'status',
    element: 'rock',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{sand: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },

  //electric
  thunder_Wave:{
    name: 'thunder_Wave',
    type: 'status',
    element: 'electric',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{para: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/thunderwave.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //poison
  fart:{
    name: 'fart',
    type: 'status',
    element: 'poison',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{psn: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/fart.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //psychic
  hypnosis:{
    name: 'hypnosis',
    type: 'status',
    element: 'psychic',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{slp: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  confuse_Ray:{
    name: 'confuse_Ray',
    type: 'status',
    element: 'psychic',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{confusion: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/confusion.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  trick_Room:{
    name: 'trick_Room',
    type: 'status',
    element: 'psychic',
    pow: '---',
    acc: 100,
    pp: 5,
    effects: [{trickroom: 100, type: 'status'}],
    priority: -5,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //ice
  frost_Wave:{
    name: 'frost_Wave',
    type: 'status',
    element: 'ice',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{frz: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  snow_Storm:{
    name: 'snow_Storm',
    type: 'status',
    element: 'ice',
    pow: '---',
    acc: 100,
    pp: 30,
    effects: [{snow: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },
}