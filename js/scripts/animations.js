// move things around

import { printImages } from './canvas.js'
import { playerMovement } from './player.js'
import { generateMap } from './maps.js'
import { generateCanvas } from './canvas.js'

let frameRate = 60
let frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, boundaries} = generateMap()
const movables = [background, ...boundaries]

export const overWorldAnimation = timeSpent =>{
  requestAnimationFrame(overWorldAnimation)

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  printImages(background, boundaries)
  playerMovement(movables, boundaries)
}