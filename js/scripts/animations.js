// move things around

import { printImages } from './canvas.js'
import { playerMovement } from './player.js'
import { generateMapData } from './maps.js'
import { battle } from './battle.js'

let frameRate = 60
let frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, map, boundaries, battleZones, FG} = generateMapData()
const movables = [map, ...boundaries, ...battleZones]

export const overWorldAnimation = timeSpent =>{
  const animationId = requestAnimationFrame(overWorldAnimation)

  // if(battle.initiated){
  //   cancelAnimationFrame(animationId)
  // }

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  printImages(background, FG, map, boundaries, battleZones)
  playerMovement(animationId, movables, boundaries, battleZones)
}