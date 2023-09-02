// printing map data onto canvas

import { generatePlayerImg } from './player.js'
import { generateMapData } from './maps.js'

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

function generateCanvas(){
  canvas.width = 1920
  canvas.height = 979

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  return {canvas, c}
}

generateCanvas()

const player = generatePlayerImg(canvas)

export function printImages(background, FG, map, boundaries){
  background.draw()
  map.draw()
  player.draw()
  FG.draw()
  // for(let i = 0; i < boundaries.length; i++){
  //   boundaries[i].draw()
  // }
}