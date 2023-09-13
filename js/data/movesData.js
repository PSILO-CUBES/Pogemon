import { audioObj } from "./audioData.js"

export const movesObj = {
  tackle:{
    name: 'tackle',
    type: 'physical',
    element: 'normal',
    pow: 2,
    acc: 95,
    pp: 50,
    effects: null
  }  ,
  fireBall:{
    name: 'fireBall',
    type: 'special',
    element: 'fire',
    pow: 40,
    acc: 90,
    pp: 30,
    effects: ['burn'],
    sprite: '../../img/moves/fireball.png',
    initAudio: audioObj.initFireBall,
    hitAudio: audioObj.hitFireBall
  }
}