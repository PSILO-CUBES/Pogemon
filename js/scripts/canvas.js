// printing map data onto canvas

import { generatesPlayerImg } from './player.js' 

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')
const player = generatesPlayerImg()

function generateCanvas(){
  canvas.width = 1920
  canvas.height = 979

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
}

export function printImages(movables){
  movables.forEach(movable =>{
    movable.draw()
  })
  player.draw()
}

generateCanvas()