// move things around

import { printImages } from './canvas.js'
import { playerMovement } from './player.js'
import { generateMap } from './maps.js'
import { generateCanvas } from './canvas.js'

let frameRate = 240
let frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, boundaries, foregroundObj} = generateMap()
const movables = [background, ...boundaries]
const { FG1, FG2, FG3 } = foregroundObj

export const overWorldAnimation = timeSpent =>{
  requestAnimationFrame(overWorldAnimation)

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent
  console.log(timeSpent)

  printImages(FG1, FG2, FG3, background, boundaries)
  playerMovement(movables, boundaries)
}