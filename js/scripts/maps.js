// data pertaining to the map

import { Sprite, Boundary } from "../classes.js"
import { mapsData } from "../data/mapsData.js"
import { tileSize } from '../classes.js'


let startMap = mapsData.geneTown
let currMap = startMap

function generateBoundaries(){
  // saves row of boundries and doesn't use the Boundary class
  const collisionsMap = []
  // uses the Boundary class
  const boundaries = []

  for(let i = 0; i < mapsData.paccIsle.collisions.length; i += currMap.width){
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
          type
        })
      )
    })
  })

  console.log(boundaries)

  return boundaries
}

export function generateMapData() {
  const boundaries = generateBoundaries()
  for(let i = 0 ; i < boundaries.length; i++){

    const boundary = boundaries[i]
    let type = boundary.type
  
    switch(type){
      case 1:
        break
      case 2:
        boundary.height = tileSize * 0.1
        break
      case 3:
        break
      case 4:
        break
      case 5:
        break
    }
  }

  const mapImg = new Image()
  mapImg.src = currMap.mapImg

  const map = new Sprite({
    position: currMap.spawnPosition,
    img: mapImg,
    frames: {max: 1}
  })

  const FGImg = new Image()
  FGImg.src = currMap.FGImg

  const FG = new Sprite({
    position: currMap.spawnPosition,
    img: FGImg,
    frames: {max: 1}
  })

  const backgroundImg = new Image()
  backgroundImg.src = mapsData.background

  const background = new Sprite({
    position:{
      x: 0,
      y: 0
    },
    img: backgroundImg,
    frames: {max: 1}
  })

  return {background, map, boundaries, FG}
}