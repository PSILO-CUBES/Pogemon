// printing map data onto canvas
import { pogemonsObj } from '../data/pogemonData.js'
import { itemsObj } from '../data/itemsData.js'
import { mapsObj } from '../data/mapsData.js'

import { Sprite } from '../classes.js'

import { generatePlayer } from './player.js'

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = 1920
canvas.height = 979

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const player = await generatePlayer(canvas)

const itemArr = [
  {name: 'potion', quantity: 999}, 
  {name: 'resurrect', quantity: 999},
  {name: 'pogeball', quantity: 999},
  {name: 'megaball', quantity: 999},
  {name: 'leafStone', quantity: 999},
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
scenes.set('stats', {initiated: false})
scenes.set('pogedex', {initiated: false})
scenes.set('pc', {initiated: false})
scenes.set('trainer', {initiated: false})

export function printImages(background, FG, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr){
  background.draw()
  map.draw()
  for(let i = 0; i < trainerSpritesArr.length; i++){
    trainerSpritesArr[i].draw()
  }
  player.draw()
  FG.draw()
  for(let i = 0; i < boundaries.length; i++){
    boundaries[i].draw()
  }
  for(let i = 0; i < battleZones.length; i++){
    battleZones[i].draw()
  }
  for(let i = 0; i < changeMap.length; i++){
    changeMap[i].draw()
  }
  for(let i = 0; i < eventZones.length; i++){
    eventZones[i].draw()
  }
}

const backgroundImg = new Image()
backgroundImg.src = mapsObj['background']

export const backgroundSprite = new Sprite({
  type: 'teamSprite',
  position:{
    x: 0,
    y: 0
  },
  frames: {
    max: 1
  },
  img: backgroundImg,
  animate: false
})