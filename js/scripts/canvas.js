// printing map data onto canvas

import { generatePlayerImg } from './player.js' 

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

export function generateCanvas(){
  canvas.width = 1920
  canvas.height = 979

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  return {canvas, c}
}

generateCanvas()

const player = generatePlayerImg(canvas)

export function printImages(FG1, FG2, FG3, background, boundaries){
  background.draw()
  for(let i = 0; i < boundaries.length; i++){
    boundaries[i].draw()
  }
  player.draw()
  FG1.draw()
  FG2.draw()
  FG3.draw()
}