// printing map data onto canvas
import { pogemonsObj } from '../data/pogemonData.js'
import { itemsObj } from '../data/itemsData.js'
import { mapsObj } from '../data/mapsData.js'

import { Sprite } from '../classes.js'

import { generatePlayer, surfPogemonSprite } from './player.js'
import { loadData } from '../save.js'

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = 1920
canvas.height = 979

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const player = await generatePlayer(canvas)
const data = await loadData()

if(data == null){
  Object.values(itemsObj).forEach(item =>{
    player.bag.set(item.name, {item: {...itemsObj[item.name]}, quantity: 0})
  })
} else {
  player.bag = new Map()

  data.bag.forEach(key =>{
    player.bag.set(`${key.item.name}`, {item: {...key.item}, quantity: key.quantity})
  })
}

// player.bag.set('heal', {...player.bag.get('heal'), quantity: 999})

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
scenes.set('pickingItem', {initiated: false})

export const overworldSpritesArr = []

export function printImages(background, FG, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, itemSpritesArr, obstacleSpritesArr, OWWeatherParticles){
  // console.log(OWWeatherParticles)
  background.draw()
  map.draw()
  for(let i = 0; i < obstacleSpritesArr.length; i++){
    obstacleSpritesArr[i].draw()
  }
  for(let i = 0; i < itemSpritesArr.length; i++){
    itemSpritesArr[i].draw()
  }
  for(let i = 0; i < trainerSpritesArr.length; i++){
    trainerSpritesArr[i].draw()
  }
  surfPogemonSprite.draw()
  player.draw()
  FG.draw()

  for(let i = 0; i < OWWeatherParticles.length; i++){
    if(OWWeatherParticles[i] == undefined) break

    if(OWWeatherParticles[i].rotation != undefined){
      c.save()
      c.translate(OWWeatherParticles[i].position.x + OWWeatherParticles[i].size.width / 2, OWWeatherParticles[i].position.y + OWWeatherParticles[i].size.height / 2)
      c.rotate((OWWeatherParticles[i].rotation * Math.PI) / 22.5)
      c.translate(-(OWWeatherParticles[i].position.x + (OWWeatherParticles[i].size.width / 2)), -(OWWeatherParticles[i].position.y))
      c.fillStyle = OWWeatherParticles[i].color
      c.fillRect(OWWeatherParticles[i].position.x, OWWeatherParticles[i].position.y, OWWeatherParticles[i].size.width, OWWeatherParticles[i].size.height)
      c.restore()

      OWWeatherParticles[i].rotation -= 0.5
    } else {
      c.fillStyle = OWWeatherParticles[i].color
      c.fillRect(OWWeatherParticles[i].position.x, OWWeatherParticles[i].position.y, OWWeatherParticles[i].size.width, OWWeatherParticles[i].size.height)
    }

    OWWeatherParticles[i].position = {
      x: OWWeatherParticles[i].position.x += OWWeatherParticles[i].velocity.x,
      y: OWWeatherParticles[i].position.y += OWWeatherParticles[i].velocity.y
    }
  }

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