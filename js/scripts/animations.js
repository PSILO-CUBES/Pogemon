// move things around

import { printImages } from './canvas.js'
import { playerMovement } from './player.js'
import { generateMapData } from './maps.js'

let frameRate = 60
let frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, map, boundaries, FG} = generateMapData()
const movables = [map, ...boundaries]

export const overWorldAnimation = timeSpent =>{
  requestAnimationFrame(overWorldAnimation)

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  // console.log('spent')
  lastFrameSpent = timeSpent

  printImages(background, FG, map, boundaries)
  playerMovement(movables, boundaries)
}