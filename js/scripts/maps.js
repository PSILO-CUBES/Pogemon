// data pertaining to the map

import { Sprite, Boundary } from "../classes.js"
import { mapsData } from "../../img/maps/mapsData.js"

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
    name: currMap.name,
    position: currMap.spawnPosition,
    img: mapImg
  })
  
  return {background, boundaries}
}