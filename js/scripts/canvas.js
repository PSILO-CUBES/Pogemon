// printing map data onto canvas

import { generatePlayer } from './player.js'
import { generateMapData } from './maps.js'

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

export function generateCanvas(){
  canvas.width = 1920
  canvas.height = 979

  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
}

generateCanvas()

const player = generatePlayer(canvas)

export let scenes = new Map()
scenes.set('overworld', {initiated: false})
scenes.set('battle', {initiated: false})
scenes.set('evolution', {initiated: false})

export function printImages(background, FG, map, boundaries, battleZones){
  background.draw()
  map.draw()
  player.draw()
  FG.draw()
  for(let i = 0; i < boundaries.length; i++){
    boundaries[i].draw()
  }
  for(let i = 0; i < battleZones.length; i++){
    battleZones[i].draw()
  }
}