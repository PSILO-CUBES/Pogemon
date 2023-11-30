import { audioObj } from "./audioData.js"

export const movesObj = {
  // + physical
  // - normal
  tackle:{
    name: 'tackle',
    type: 'physical',
    element: 'normal',
    pow: 999999999,
    acc: 95,
    pp: 50,
    effects: null,
    priority: 0
  },
  quickattack:{
    name: 'quickattack',
    type: 'physical',
    element: 'normal',
    pow: 100,
    acc: 100,
    pp: 50,
    effects: null,
    priority: 1
  },
  headbutt:{
    name: 'headbutt',
    type: 'physical',
    element: 'normal',
    pow: 80,
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
  //special
  //fire
  fireball:{
    name: 'fireball',
    type: 'special',
    element: 'fire',
    pow: 1000,
    acc: 90,
    pp: 30,
    effects: {burn: true},
    priority: 0,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.initFireBall,
    hitAudio: audioObj.hitFireBall
  },
  //ghost
  shadowball:{
    name: 'shadowball',
    type: 'special',
    element: 'ghost',
    pow: 1000,
    acc: 90,
    pp: 30,
    effects: {spdef: -1},
    priority: 0,
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.initFireBall,
    hitAudio: audioObj.hitFireBall
  }
}