import { audioObj } from "./audioData.js"

export const movesObj = {
  // physical

  // normal
  tackle:{
    name: 'tackle',
    type: 'physical',
    element: 'normal',
    pow: 25,
    acc: 95,
    pp: 50,
    effects: null,
    priority: 0
  },
  quickattack:{
    name: 'quickattack',
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
    pow: 65,
    acc: 85,
    pp: 25,
    effects: null,
    priority: 0
  },
  slash:{
    name: 'slash',
    type: 'physical',
    element: 'normal',
    pow: 70,
    acc: 100,
    pp: 30,
    effects: {crit: 1},
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

  // special

  // fire
  fireball:{
    name: 'fireball',
    type: 'special',
    element: 'fire',
    pow: 999,
    acc: 100,
    pp: 30,
    effects: {burn: 100},
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  //ghost
  shadowball:{
    name: 'shadowball',
    type: 'special',
    element: 'ghost',
    pow: 1000,
    acc: 80,
    pp: 30,
    effects: {spdef: -1},
    priority: 0,
    rotation: {ally: 0, foe: 0},
    duration: 2,
    sprite: '../../img/moves/shadowball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  // status

  // heal
  rest:{
    name: 'rest',
    type: 'status',
    element: 'psychic',
    pow: 100,
    acc: 100,
    pp: 30,
    effects: 'heal',
    priority: 0,
    sprite: '../../img/moves/heal.png',
  },

  // buff
  sharpen:{
    name: 'sharpen',
    type: 'status',
    element: 'steel',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: {name: 'buff', target:'atk'},
    priority: 0,
  },
  swift:{
    name: 'swift',
    type: 'status',
    element: 'flying',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: {name: 'buff', target:'spd'},
    priority: 0,
  },

  // debuff
  growl:{
    name: 'growl',
    type: 'status',
    element: 'dark',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: {name: 'debuff', target:'atk'},
    priority: 0,
  },
  stare:{
    name: 'stare',
    type: 'status',
    element: 'dark',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: {name: 'debuff', target:'def'},
    priority: 0,
  },

  // status
  heatWave:{
    name: 'heatWave',
    type: 'status',
    element: 'fire',
    pow: 0,
    acc: 100,
    pp: 30,
    effects: {burn: 100, name: 'status'},
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  }

}