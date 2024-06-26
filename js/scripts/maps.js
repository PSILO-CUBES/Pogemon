// data pertaining to the map

import { mapsObj, setBoundries } from "../data/mapsData.js"
import { audioObj } from "../data/audioData.js"

import { Sprite, Boundary, Pogemon, NPC } from "../classes.js"
import { switchMap } from "./scenes/overworld.js"
import { loadData } from "../save.js"

// import { loadedData } from "./scenes/boot.js"

export let currMap

const mapImg = new Image()
export const map = new Sprite({
  type: 'map',
  img: mapImg,
  frames: {max: 1}
})

const FGImg = new Image()
const FG = new Sprite({
  type: 'FG',
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

audioObj.music.map.play()

export const trainerSpritesArr = []
export const itemSpritesArr = []
export const obstacleSpritesArr = []

async function generateBoundaries(nextMapInfo){
  // check if map already exists from the saveFile
  let data
  await setBoundries(mapsObj)
  data = await loadData()

  if(data == null) {
    if(currMap == undefined) currMap = mapsObj.geneTown
  } else {
    currMap = mapsObj[`${data.currMapName}`]
  }

  map.position = currMap.spawnPosition
  FG.position = currMap.spawnPosition
  // uses the Boundary class
  trainerSpritesArr.length = 0
  itemSpritesArr.length = 0
  obstacleSpritesArr.length = 0
  const boundaries = []
  const battleZones = []
  const changeMap = []
  const eventZones = []

  // if first map
  if(nextMapInfo == undefined){
    if(data != undefined) {
      currMap = mapsObj[`${data.currMapName}`]
      currMap.spawnPosition = data.spawnPosition
      map.position = data.spawnPosition
      FG.position = data.spawnPosition

      nextMapInfo = data.nextMapInfo
    }
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
          else if(type == 1){
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })
            )
          }
          else if(type == 8){
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 8,
                collision: true
              })
            )
          }
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
                y: i * Boundary.height + currMap.spawnPosition.y + 10
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
      let itemIndex = 0
      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          switch(type){
            case 0: break
            case 4:
              if(currMap.trainers == undefined) return
            
              let trainerInfo = currMap.trainers[z]
              let trainerTeam = []
            
              if(z == 0) z = z + 1
              else z++

              for(let i = 0; i < trainerInfo.team.length; i++){
                const foeImg = new Image()
                foeImg.src = trainerInfo.team[i][0].sprites.frontSprite
                const foeSprite = new Sprite({
                  type: 'trainerPogemon',
                  position:{
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
                trainerTeam.push(new Pogemon(trainerInfo.team[i][0], Math.pow(trainerInfo.team[i][1], 3), true, null, trainerInfo.team[i][2], null, foeSprite))
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

              let createdTrainer = new NPC(trainerTeam, null, null, trainerInfo.direction.looking, trainerInfo.name, trainerSprite)
              
              trainerInfo = {...trainerInfo, createdTrainer, type: 'battle'}

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

              boundaries.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  type: 1,
                  collision: true
                })
              )
              break
            case 5:
              let eventInfo = mapsObj[`${currMap.name}`].event[z]
              
              if(z == 0) z = z + 1
              else z++
              eventZones.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  type: 5,
                  name: eventInfo.name,
                  info: eventInfo.info
                })
              )
              if(eventInfo.name == 'pc') return
              boundaries.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  type: 1,
                  collision: true
                })
              )
              break
            case 6:
              if(mapsObj[`${currMap.name}`].items == undefined) return
              if(mapsObj[`${currMap.name}`].items[itemIndex].pickedUp) return
              
              let itemsInfo = mapsObj[`${currMap.name}`].items[itemIndex]
              
              if(itemIndex == 0) itemIndex = itemIndex + 1
              else itemIndex++

              const pogeballImg = new Image()
              pogeballImg.src = 'img/item_scene/items/OWPogeball.png'

              const pogeballSprite = new Sprite({
                type: itemIndex,
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                img: pogeballImg,
                frames: {
                  max: 1,
                  hold: 0
                },
                animate: false
              })

              itemSpritesArr.push(pogeballSprite)

              let boundary = new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })
            
              eventZones.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  type: type,
                  info: itemsInfo,
                  name: 'item',
                  collisionInstance: {boundary, pogeballSprite}
                })
              )
              boundaries.push(boundary)
              break
          }
        })
      })
    }
    const obstaclesMap = []
    if(currMap.obstacles != undefined){
      for(let i = 0; i < currMap.obstacles.length; i += currMap.width){
        obstaclesMap.push(currMap.obstacles.slice(i, currMap.width + i))
      }
      let z = 0
      // pushes new Boundries in array with the previous number map array
      obstaclesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type != 7) return
            
          let obstacleInfo = currMap.obstaclesInfo[z]

          let boundary = new Boundary({
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            type: 1,
            collision: true
          })

          boundaries.push(boundary)
              
          if(z == 0) z = z + 1
          else z++

          const obstacleImg = new Image()
          switch(obstacleInfo.name){
            case 'tree':
              obstacleImg.src = 'img/maps/obstacles/cut.png'
              break
            case 'rock':
              obstacleImg.src = 'img/maps/obstacles/rockSmash.png'
              break
          }

          const obstacleSprite = new Sprite({
            type: z,
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            img: obstacleImg,
            frames: {
              max: 4,
              hold: 20
            },
            animate: false
          })

          obstacleSpritesArr.push(obstacleSprite)

          eventZones.push(
            new Boundary({
              position:{
                x: j * Boundary.width + currMap.spawnPosition.x,
                y: i * Boundary.height + currMap.spawnPosition.y
              },
              type: 7,
              name: obstacleInfo.name,
              collision: true,
              info: obstacleInfo,
              collisionInstance: {boundary, obstacleSprite}
            })
          )
        })
      })
    }
    
    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, itemSpritesArr, obstacleSpritesArr]
  } else {
    // should mostly work here
    let nextMapInfoObj = mapsObj[`${nextMapInfo.name}`]

    if(pogecenterReturnInfo.name != null) nextMapInfoObj = mapsObj[`${pogecenterReturnInfo.name}`]
    // if(data != null && data.nextMapInfo.name != null) nextMapInfoObj = mapsObj[`${data.nextMapInfo.name}`]

    map.position.x = nextMapInfo.spawnPosition.x
    map.position.y = nextMapInfo.spawnPosition.y

    const collisionsMap = []
    if(currMap.collisions != undefined){
      for(let i = 0; i < currMap.collisions.length; i += currMap.width){
        collisionsMap.push(currMap.collisions.slice(i, currMap.width + i))
      }
      // pushes new Boundries in array with the previous number map array
      collisionsMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          else if(type == 1){
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })
            )
          }
          else if(type == 8){
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 8,
                collision: true
              })
            )
          }
        })
      })
    }
    const battleZonesMap = []
    if(nextMapInfoObj.battleZones != undefined){
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
    if(nextMapInfoObj.changeMap != undefined){
      for(let i = 0; i < nextMapInfoObj.changeMap.length; i += nextMapInfoObj.width){
        changeMapMap.push(nextMapInfoObj.changeMap.slice(i, nextMapInfoObj.width + i))
      }
      let z = 0
      changeMapMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          let mapInfo

          if(nextMapInfo.name != 'undefined' && nextMapInfo.name !== null){
            mapInfo = mapsObj[`${nextMapInfo.name}`].changeMapLocations[z]
          }else if(pogecenterReturnInfo.name != null){
            mapInfo = pogecenterReturnInfo
          }else {
            mapInfo = data.nextMapInfo
          }

          if(z == 0) z = z + 1
          else z++
        
          changeMap.push(
            new Boundary({
              position:{
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y + 10
              },
              type: 3,
              info: mapInfo
            })
          )
        })
      })
    }
    const eventZonesMap = []
    if(nextMapInfoObj.eventZones != undefined){
      for(let i = 0; i < nextMapInfoObj.eventZones.length; i += nextMapInfoObj.width){
        eventZonesMap.push(nextMapInfoObj.eventZones.slice(i, nextMapInfoObj.width + i))
      }

      // z used to itterate thru the data in mapsObj's content
      let z = 0
      let itemIndex = 0

      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          switch(type){
            case 0: break
            case 4:

              if(mapsObj[`${nextMapInfo.name}`].trainers != undefined) {
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

                  trainerTeam.push(new Pogemon(trainerInfo.team[0][0], Math.pow(trainerInfo.team[0][1], 3), true, null, trainerInfo.team[i][2], null, foeSprite))
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
                  animate: false,
                })
              
                let createdTrainer = new NPC(trainerTeam, null, null,trainerInfo.direction.looking, trainerInfo.name, trainerSprite)
              
                trainerInfo = {...trainerInfo, createdTrainer, type: 'battle'}
              
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

                boundaries.push(
                  new Boundary({
                    position:{
                      x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                      y: i * Boundary.height + nextMapInfo.spawnPosition.y
                    },
                    type: 1,
                    collision: true
                  })
                )
                return
              }
              break
            case 5:
              let eventInfo = mapsObj[`${nextMapInfo.name}`].event[z]
              if(eventInfo == undefined) return
              
              if(z == 0) z = z + 1
              else z++

              eventZones.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                    y: i * Boundary.height + nextMapInfo.spawnPosition.y
                  },
                  type: 5,
                  name: eventInfo.name,
                  info: eventInfo.info
                })
              )

              if(eventInfo.name == 'pc') return

              boundaries.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                    y: i * Boundary.height + nextMapInfo.spawnPosition.y
                  },
                  type: 1,
                  collision: true
                })
              )
            break
            case 6:
              if(mapsObj[`${currMap.name}`].items == undefined) return
              if(mapsObj[`${currMap.name}`].items[itemIndex].pickedUp) return
              
              let itemsInfo = mapsObj[`${currMap.name}`].items[itemIndex]

              if(itemIndex == 0) itemIndex = itemIndex + 1
              else itemIndex++

              const pogeballImg = new Image()
              pogeballImg.src = 'img/item_scene/items/OWPogeball.png'

              const pogeballSprite = new Sprite({
                type:'enemyTrainer',
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                img: pogeballImg,
                frames: {
                  max: 1,
                  hold: 0
                },
                animate: false
              })

              itemSpritesArr.push(pogeballSprite)

              let boundary = new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })
            
              eventZones.push(
                new Boundary({
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  type: type,
                  info: itemsInfo,
                  name: 'item',
                  collisionInstance: {boundary, pogeballSprite}
                })
              )
              boundaries.push(boundary)
              break
          }
        })
      })
    }
    const obstaclesMap = []
    if(currMap.obstacles != undefined){
      for(let i = 0; i < currMap.obstacles.length; i += currMap.width){
        obstaclesMap.push(currMap.obstacles.slice(i, currMap.width + i))
      }
      let z = 0
      // pushes new Boundries in array with the previous number map array
      obstaclesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type != 7) return
            
          let obstacleInfo = currMap.obstaclesInfo[z]

          let boundary = new Boundary({
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            type: 1,
            collision: true
          })

          boundaries.push(boundary)
              
          if(z == 0) z = z + 1
          else z++

          const obstacleImg = new Image()
          switch(obstacleInfo.name){
            case 'tree':
              obstacleImg.src = 'img/maps/obstacles/cut.png'
              break
            case 'rock':
              obstacleImg.src = 'img/maps/obstacles/rockSmash.png'
              break
          }

          const obstacleSprite = new Sprite({
            type: z,
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            img: obstacleImg,
            frames: {
              max: 4,
              hold: 20
            },
            animate: false
          })

          obstacleSpritesArr.push(obstacleSprite)

          eventZones.push(
            new Boundary({
              position:{
                x: j * Boundary.width + currMap.spawnPosition.x,
                y: i * Boundary.height + currMap.spawnPosition.y
              },
              type: 7,
              name: obstacleInfo.name,
              collision: true,
              info: obstacleInfo,
              collisionInstance: {boundary, obstacleSprite}
            })
          )
        })
      })
    }

    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, itemSpritesArr, obstacleSpritesArr]
  }
}

export const pogecenterReturnInfo = {
  name: null,
  spawnPosition: {
    x: null,
    y: null
  }
}

export function changeMapInfo(nextMapInfo, currMapInfo){
  const info = nextMapInfo.info

  currMap = mapsObj[`${info.name}`]

  // if(pogecenterReturnInfo.name == null){
  //   map.position.x = info.spawnPosition.x
  //   map.position.y = info.spawnPosition.y
  
  //   mapImg.src = mapsObj[`${info.name}`].mapImg
  //   FGImg.src = mapsObj[`${info.name}`].FGImg
  // } else {
  //   map.position.x = pogecenterReturnInfo.spawnPosition.x
  //   map.position.y = pogecenterReturnInfo.spawnPosition.y
  
  //   mapImg.src = mapsObj[`${pogecenterReturnInfo.name}`].mapImg
  //   FGImg.src = mapsObj[`${pogecenterReturnInfo.name}`].FGImg

  //   console.log(mapsObj[`${pogecenterReturnInfo.name}`].mapImg)
  // }

  switchMap(info, currMapInfo)
}

export async function generateMapData(nextMapInfo) {
  const [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, itemSpritesArr, obstacleSpritesArr] = await generateBoundaries(nextMapInfo)

  if(nextMapInfo == undefined){
    mapImg.src = currMap.mapImg
    FGImg.src = currMap.FGImg
  } else {
    currMap = mapsObj[`${nextMapInfo.name}`]
    mapImg.src = mapsObj[`${nextMapInfo.name}`].mapImg
    FGImg.src = mapsObj[`${nextMapInfo.name}`].FGImg
  }
  
  return [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, itemSpritesArr, obstacleSpritesArr, FG]
}