// data pertaining to the map

import { mapsObj } from "../data/mapsData.js"
import { audioObj } from "../data/audioData.js"

import { Sprite, Boundary } from "../classes.js"

import { tileSize } from '../classes.js'


let startMap = mapsObj.geneTown
export let currMap = startMap

audioObj.map.play()

function generateBoundaries(){
  // uses the Boundary class
  const boundaries = []
  const battleZones = []

  // saves row of boundries as numnbers and doesn't use the Boundary class
  const collisionsMap = []
  for(let i = 0; i < currMap.collisions.length; i += currMap.width){
    collisionsMap.push(currMap.collisions.slice(i, currMap.width + i))
  }

  collisionsMap.forEach((row, i) =>{
    row.forEach((type, j) =>{
      if(type === 0) return
      boundaries.push(
        new Boundary({
          position:{
            x: j * Boundary.width + currMap.spawnPosition.x,
            y: i * Boundary.height + currMap.spawnPosition.y
          },
          type: 1
        })
      )
    })
  })

  const battleZonesMap = []
  for(let i = 0; i < currMap.collisions.length; i += currMap.width){
    battleZonesMap.push(currMap.battleZones.slice(i, currMap.width + i))
  }

  battleZonesMap.forEach((row, i) =>{
    row.forEach((type, j) =>{
      if(type === 0) return
      battleZones.push(
        new Boundary({
          position:{
            x: j * Boundary.width + currMap.spawnPosition.x,
            y: i * Boundary.height + currMap.spawnPosition.y
          },
          type: 2
        })
      )
    })
  })

  return [boundaries, battleZones]
}

export function generateMapData() {
  const [boundaries, battleZones] = generateBoundaries()

  const mapImg = new Image()
  mapImg.src = currMap.mapImg

  const map = new Sprite({
    type: 'map',
    position: currMap.spawnPosition,
    img: mapImg,
    frames: {max: 1}
  })

  const FGImg = new Image()
  FGImg.src = currMap.FGImg

  const FG = new Sprite({
    type: 'FG',
    position: currMap.spawnPosition,
    img: FGImg,
    frames: {max: 1}
  })

  const backgroundImg = new Image()
  backgroundImg.src = mapsObj.background

  const background = new Sprite({
    type: 'background',
    position:{
      x: 0,
      y: 0
    },
    img: backgroundImg,
    frames: {max: 1}
  })

  return {background, map, boundaries, battleZones, FG}
}