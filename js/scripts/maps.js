// data pertaining to the map

import { mapsObj } from "../data/mapsData.js"
import { audioObj } from "../data/audioData.js"

import { Sprite, Boundary, Trainer, Pogemon } from "../classes.js"
import { switchMap } from "./scenes/overworld.js"
import { player } from "./player.js"

let startMap = mapsObj.geneTown
export let currMap = startMap

const mapImg = new Image()
const map = new Sprite({
  type: 'map',
  position: currMap.spawnPosition,
  img: mapImg,
  frames: {max: 1}
})

const FGImg = new Image()
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

audioObj.map.play()

const trainerSpritesArr = []

function generateBoundaries(nextMapInfo){
  // uses the Boundary class
  trainerSpritesArr.length = 0
  const boundaries = []
  const battleZones = []
  const changeMap = []
  const eventZones = []

  if(nextMapInfo == undefined){
    // saves row of boundries as numbers and doesn't use the Boundary class
    const collisionsMap = []
    if(currMap.collisions != undefined){
      for(let i = 0; i < currMap.collisions.length; i += currMap.width){
        collisionsMap.push(currMap.collisions.slice(i, currMap.width + i))
      }
      // pushes new Boundries in array with the previous number map array
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
    }
    const battleZonesMap = []
    if(currMap.battleZones != undefined){
      for(let i = 0; i < currMap.battleZones.length; i += currMap.width){
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
    }
    const changeMapMap = []
    if(currMap.changeMap != undefined){
      for(let i = 0; i < currMap.changeMap.length; i += currMap.width){
        changeMapMap.push(currMap.changeMap.slice(i, currMap.width + i))
      }
      let z = 0
      changeMapMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          const mapInfo = mapsObj[`${currMap.name}`].changeMapLocations[z]

          if(z == 0) z = z + 1
          else z++
        
          changeMap.push(
            new Boundary({
              position:{
                x: j * Boundary.width + currMap.spawnPosition.x,
                y: i * Boundary.height + currMap.spawnPosition.y + 24
              },
              type: 3,
              info : mapInfo
            })
          )
        })
      })
    }
    const eventZonesMap = []
    if(currMap.eventZones != undefined){
      for(let i = 0; i < currMap.eventZones.length; i += currMap.width){
        eventZonesMap.push(currMap.eventZones.slice(i, currMap.width + i))
      }
      let z = 0
      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          let trainerInfo = mapsObj[`${currMap.name}`].trainers[z]
        
          if(z == 0) z = z + 1
          else z++

          let trainerTeam = []

          for(let i = 0; i < trainerInfo.team.length; i++){
            const foeImg = new Image()
            foeImg.src = trainerInfo.team[i][0].sprites.frontSprite
            
            const foeSprite = new Sprite({
              type: 'trainerPogemon',
              position: {
                x: 0,
                y: 0
              },
              img: foeImg,
              frames: {
                max: 4,
                hold: 25,
              },
              animate: true
            })
            
            trainerTeam.push(new Pogemon(trainerInfo.team[0][0], Math.pow(trainerInfo.team[0][1], 3), true, foeSprite))
          }

          const trainerImg = new Image()
          trainerImg.src = trainerInfo.sprite

          const trainerSprite = new Sprite({
            type:'enemyTrainer',
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            img: trainerImg,
            frames: {
              max: 4,
              hold: 25
            },
            animate: false
          })

          let createdTrainer = new Trainer(trainerTeam, null, null, trainerSprite)

          if(type == 4) trainerInfo = {...trainerInfo, createdTrainer, type: 'battle'}

          trainerSpritesArr.push(createdTrainer)
        
          eventZones.push(
            new Boundary({
              position:{
                x: j * Boundary.width + currMap.spawnPosition.x,
                y: i * Boundary.height + currMap.spawnPosition.y
              },
              type: type,
              info: trainerInfo
            })
          )
        })
      })
    }
    
    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr]
  } else {
    const nextMapInfoObj = mapsObj[`${nextMapInfo.name}`]
    map.position.x = nextMapInfo.spawnPosition.x
    map.position.y = nextMapInfo.spawnPosition.y

    const collisionsMap = []
    if(currMap.collisions != undefined){
      for(let i = 0; i < nextMapInfoObj.collisions.length; i += nextMapInfoObj.width){
        collisionsMap.push(nextMapInfoObj.collisions.slice(i, nextMapInfoObj.width + i))
      }
      collisionsMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          boundaries.push(
            new Boundary({
              position:{
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y
              },
              type: 1
            })
          )
        })
      })
    }
    const battleZonesMap = []
    if(currMap.battleZones != undefined){
      for(let i = 0; i < nextMapInfoObj.battleZones.length; i += nextMapInfoObj.width){
        battleZonesMap.push(nextMapInfoObj.battleZones.slice(i, nextMapInfoObj.width + i))
      }
      battleZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          battleZones.push(
            new Boundary({
              position:{
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y
              },
              type: 2
            })
          )
        })
      })
    }
    const changeMapMap = []
    if(currMap.changeMap != undefined){
      for(let i = 0; i < nextMapInfoObj.changeMap.length; i += nextMapInfoObj.width){
        changeMapMap.push(nextMapInfoObj.changeMap.slice(i, nextMapInfoObj.width + i))
      }
      let z = 0
      changeMapMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          const mapInfo = mapsObj[`${nextMapInfo.name}`].changeMapLocations[z]
        
          if(z == 0) z = z + 1
          else z++
        
          changeMap.push(
            new Boundary({
              position:{
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y + 24
              },
              type: 3,
              info: mapInfo
            })
          )
        })
      })
    }
    const eventZonesMap = []
    if(currMap.eventZones != undefined){
      for(let i = 0; i < nextMapInfoObj.eventZones.length; i += nextMapInfoObj.width){
        eventZonesMap.push(nextMapInfoObj.eventZones.slice(i, nextMapInfoObj.width + i))
      }
      let z = 0
      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          let trainerInfo = mapsObj[`${nextMapInfo.name}`].trainers[z]
        
          if(z == 0) z = z + 1
          else z++

          let trainerTeam = []

          for(let i = 0; i < trainerInfo.team.length; i++){
            const foeImg = new Image()
            foeImg.src = trainerInfo.team[i][0].sprites.frontSprite
            
            const foeSprite = new Sprite({
              type: 'trainerPogemon',
              position: {
                x: 0,
                y: 0
              },
              img: foeImg,
              frames: {
                max: 4,
                hold: 25,
              },
              animate: true
            })
            
            trainerTeam.push(new Pogemon(trainerInfo.team[0][0], Math.pow(trainerInfo.team[0][1], 3), true, foeSprite))
          }

          const trainerImg = new Image()
          trainerImg.src = trainerInfo.sprite

          const trainerSprite = new Sprite({
            type:'trainer',
            position:{
              x: j * Boundary.width + nextMapInfo.spawnPosition.x,
              y: i * Boundary.height + nextMapInfo.spawnPosition.y
            },
            img: trainerImg,
            frames: {
              max: 4,
              hold: 25
            },
            animate: false
          })

          let createdTrainer = new Trainer(trainerTeam, null, null, trainerSprite)

          if(type == 4) trainerInfo = {...trainerInfo, createdTrainer, type: 'battle'}

          trainerSpritesArr.push(createdTrainer)
        
          eventZones.push(
            new Boundary({
              position:{
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y
              },
              type: type,
              info: trainerInfo
            })
          )
        })
      })
    }

    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr]
  }
}

export function changeMapInfo(nextMapInfo){
  currMap = mapsObj[`${nextMapInfo.name}`]

  map.position.x = nextMapInfo.spawnPosition.x
  map.position.y = nextMapInfo.spawnPosition.y

  mapImg.src = mapsObj[`${nextMapInfo.name}`].mapImg
  FGImg.src = mapsObj[`${nextMapInfo.name}`].FGImg

  switchMap(nextMapInfo)
}

export function generateMapData(nextMapInfo) {
  const [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr] = generateBoundaries(nextMapInfo)



  mapImg.src = currMap.mapImg
  FGImg.src = currMap.FGImg

  return [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, FG]
}