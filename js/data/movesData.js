import { audioObj } from "./audioData.js"

export const movesObj = {
                              // physical

  // normal
  tackle:{
    name: 'tackle',
    type: 'physical',
    element: 'normal',
    pow: 50,
    acc: 95,
    pp: 50,
    effects: null,
    priority: 0
  },
  quick_attack:{
    name: 'quick_attack',
    type: 'physical',
    element: 'normal',
    pow: 45,
    acc: 100,
    pp: 32,
    effects: null,
    priority: 1
  },
  headbutt:{
    name: 'headbutt',
    type: 'physical',
    element: 'normal',
    pow: 80,
    acc: 90,
    pp: 24,
    effects: [{flinched: 30}],
    priority: 0
  },
  slash:{
    name: 'slash',
    type: 'physical',
    element: 'normal',
    pow: 70,
    acc: 100,
    pp: 32,
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
  super_power: {
    name: 'super_power',
    type: 'physical',
    element: 'fighting',
    pow: 1,
    acc: 100,
    pp: 30,
    effects: [{name: 'selfDebuff', target:'atk', pow: 1, type: 'stats'}, {name: 'selfDebuff', target:'def', pow: 1, type: 'stats'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/superpower.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  // electric
  nuzzle:{
    name: 'nuzzle',
    type: 'physical',
    element: 'electric',
    pow: 20,
    acc: 100,
    pp: 32,
    effects: [{para: 100, type: 'status'}],
    priority: 0
  },

                              // special

  // water
  water_gun:{
    name: 'water_gun',
    type: 'special',
    element: 'water',
    pow: 50,
    acc: 100,
    pp: 32,
    effects: null,
    priority: 0,
    rotation: {ally: -2, foe: 1},
    duration: 0.5,
    sprite: '../../img/moves/watergun.png',
    initAudio: audioObj.SFX.watergunLaunch,
    hitAudio: audioObj.SFX.watergunHit
  },

  // fire
  fire_ball:{
    name: 'fire_ball',
    type: 'special',
    element: 'fire',
    pow: 50,
    acc: 100,
    pp: 30,
    effects: [{burn: 30}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 0.5,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //ghost
  shadow_ball:{
    name: 'shadow_ball',
    type: 'special',
    element: 'ghost',
    pow: 80,
    acc: 100,
    pp: 24,
    effects: [{name: 'debuff', target:'spdef', pow: 1}],
    priority: 0,
    rotation: {ally: 0, foe: 0},
    duration: 2,
    sprite: '../../img/moves/shadowball.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

                              // status

  // buff
  sharpen:{
    name: 'sharpen',
    type: 'status',
    element: 'steel',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{name: 'buff', target:'atk', pow: 1, type: 'stats'}],
    priority: 0,
    sprite: '../../img/moves/sharpen.png',
  },
  feather_weight:{
    name: 'feather_weight',
    type: 'status',
    element: 'flying',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{name: 'buff', target:'spd', pow: 2, type: 'stats'}],
    priority: 0,
    rotation: {ally: 0, foe: 0},
    sprite: '../../img/moves/feather_weight.png',
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
    pp: 32,
    effects: [{name: 'debuff', target:'atk', pow: 1, type: 'stats'}],
    priority: 0,
    rotation: {ally: 0, foe: -2},
    duration: 1,
    sprite: '../../img/moves/growl.png',
    position:{
      x: 450,
      y: 175
    }
  },
  stare:{
    name: 'stare',
    type: 'status',
    element: 'dark',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{name: 'debuff', target:'def', pow: 1, type: 'stats'}],
    priority: 0,
  },

  //normal
  protect: {
    name: 'protect',
    type: 'status',
    element: 'normal',
    pow: '---',
    acc: 100,
    pp: 32,
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
    pp: 32,
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
  heat_wave:{
    name: 'heat_wave',
    type: 'status',
    element: 'fire',
    pow: '---',
    acc: 100,
    pp: 32,
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
  sunny_day:{
    name: 'sunny_day',
    type: 'status',
    element: 'fire',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{sun: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //water
  rainy_day:{
    name: 'rainy_day',
    type: 'status',
    element: 'water',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{rain: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },

  //grass
  leech_seed:{
    name: 'leech_seed',
    type: 'status',
    element: 'grass',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{seeded: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    sprite: '../../img/moves/seed.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //rock
  sand_storm:{
    name: 'sand_storm',
    type: 'status',
    element: 'rock',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{sand: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },

  //electric
  thunder_wave:{
    name: 'thunder_wave',
    type: 'status',
    element: 'electric',
    pow: '---',
    acc: 100,
    pp: 32,
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
    pp: 32,
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
    acc: 65,
    pp: 24,
    effects: [{slp: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  confuse_ray:{
    name: 'confuse_ray',
    type: 'status',
    element: 'psychic',
    pow: '---',
    acc: 75,
    pp: 32,
    effects: [{confusion: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/confusion.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  trick_room:{
    name: 'trick_room',
    type: 'status',
    element: 'psychic',
    pow: '---',
    acc: 100,
    pp: 12,
    effects: [{trick_room: 100, type: 'status'}],
    priority: 0, // <------ needs to be -7 
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },

  //ice
  frost_wave:{
    name: 'frost_wave',
    type: 'status',
    element: 'ice',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{frz: 100, type: 'status'}],
    priority: 0,
    rotation: {ally: 1, foe: -2},
    duration: 1.5,
    sprite: '../../img/moves/blank.png',
    initAudio: audioObj.SFX.initFireBall,
    hitAudio: audioObj.SFX.hitFireBall
  },
  snow_storm:{
    name: 'snow_storm',
    type: 'status',
    element: 'ice',
    pow: '---',
    acc: 100,
    pp: 32,
    effects: [{snow: 100, type: 'weather'}],
    priority: 0,
    sprite: '../../img/moves/blank.png',
  },
}