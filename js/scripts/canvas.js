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

export function printImages(background, boundaries){
  background.draw()
  boundaries.forEach(boundary =>{
    boundary.draw()
  })
  player.draw()
}