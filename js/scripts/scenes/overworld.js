// move things around

import { printImages, scenes } from '../canvas.js'
import { playerMovement } from '../player.js'
import { generateMapData } from '../maps.js'

const frameRate = 60
const frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, map, boundaries, battleZones, FG} = generateMapData()
const movables = [map, ...boundaries, ...battleZones]

let animationId

const overWorldAnimation = timeSpent =>{
  animationId = requestAnimationFrame(overWorldAnimation)

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  printImages(background, FG, map, boundaries, battleZones)
  playerMovement(animationId, movables, boundaries, battleZones)
}

export function manageOverWorldState(state){
  if(state) {
    overWorldAnimation()
    scenes.set('overworld', {initiated : {initiated : true}})
  }
  else {
    cancelAnimationFrame(animationId)
    scenes.set('overworld', {initiated : {initiated : false}})
  }
}