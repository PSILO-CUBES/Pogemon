// printing map data onto canvas
import { pogemonsObj } from '../data/pogemonData.js'
import { itemsObj } from '../data/itemsData.js'

import { Pogemon } from '../classes.js'

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
player.catch(pogemonsObj['jlissue'], 5, false)

const itemArr = [
  {name: 'potion', quantity: 999}, 
  {name: 'resurrect', quantity: 999}
]

for(let i = 0; i < itemArr.length; i++){
  player.bag.set(itemArr[i].name, {item: itemsObj[itemArr[i].name], quantity: itemArr[i].quantity})
}


export const scenes = new Map()
scenes.set('overworld', {initiated: false})
scenes.set('battle', {initiated: false})
scenes.set('evolution', {initiated: false})
scenes.set('team', {initiated: false})
scenes.set('bag', {initiated: false})
scenes.set('pogedex', {initiated: false})

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