import { generatesPlayerImg } from './player.js' 
import { generateMap } from './maps.js'

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')
const player = generatesPlayerImg()

function generateCanvas(){
  canvas.width = 1920
  canvas.height = 979

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
}

export function printImages(background){
  background.draw()
  player.draw()
}

generateCanvas()