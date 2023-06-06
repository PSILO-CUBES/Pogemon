// data pertaining to the map

import { Sprite, Boundary } from "../classes.js"
import { mapsData } from "../data/mapsData.js"
import { generateCanvas } from "./canvas.js"

let startMap = mapsData.paccIsle
let currMap = startMap

function generateBoundaries(){
  // saves row of boundries and doesn't use the Boundary class
  const colissionsMap = []
  // uses the Boundary class
  const boundaries = []

  for(let i = 0; i < mapsData.paccIsle.colissions.length; i += currMap.width){
    colissionsMap.push(currMap.colissions.slice(i, 70 + i))
  }

  colissionsMap.forEach((row, i) =>{
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

  return boundaries
}

export function generateMap() {
  const boundaries = generateBoundaries()

  const mapImg = new Image()
  mapImg.src = currMap.mapImg

  const background = new Sprite({
    position: currMap.spawnPosition,
    img: mapImg,
    frames: {max: 1}
  })

  const FG1Img = new Image()
  FG1Img.src = currMap.FG1Img

  const FG1 = new Sprite({
    position: currMap.spawnPosition,
    img: FG1Img,
    frames: {max: 1}
  })

  const FG2Img = new Image()
  FG2Img.src = currMap.FG2Img

  const FG2 = new Sprite({
    position: currMap.spawnPosition,
    img: FG2Img,
    frames: {max: 1}
  })

  const FG3Img = new Image()
  FG3Img.src = currMap.FG3Img

  const FG3 = new Sprite({
    position: currMap.spawnPosition,
    img: FG3Img,
    frames: {max: 1}
  })

  let foregroundObj = { FG1, FG2, FG3 }

  return {background, boundaries, foregroundObj}
}