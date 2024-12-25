// data pertaining to the map

import { defaultMapsObj, mapsObj, setBoundries } from "../data/mapsData.js"
import { audioObj } from "../data/audioData.js"

import { Sprite, Boundary, Pogemon, Character } from "../classes.js"
import { OWWeatherParticles, switchMap } from "./scenes/overworld.js"
import { loadData } from "../save.js"
import { switchUnderScoreForSpace } from "./scenes/stats.js"
import { pogemonsObj } from "../data/pogemonData.js"
import { itemsObj } from "../data/itemsData.js"

const data = await loadData("saveFile")

export let worldEventData = {
  maat: {
    firstMeet: false,
    gym: false
  },
  heisenberg: {
    firstTalk: false,
    slimieEvolutionShowed: false,
    allSlimesCollected: false
  },
  djed:{
    gym:false
  },
  vignus:{
    catchable:false,
    caught:false
  }
}

if(data != null){
  worldEventData = data.worldEventData
}

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

export const trainerSpritesArr = []
export const NPCSpritesArr = []
export const itemSpritesArr = []
export const obstacleSpritesArr = []

async function generateBoundaries(nextMapInfo){
  await setBoundries(mapsObj)

  // check if map already exists from the saveFile
  if(data == null || data == undefined) {
    if(currMap == undefined) {
      currMap = mapsObj.pearly_Path
      currMap.seen = true
    }
  } else {
    currMap = mapsObj[data.currMapName]
  }

  map.position = currMap.spawnPosition
  FG.position = currMap.spawnPosition
  // uses the Boundary class
  trainerSpritesArr.length = 0
  NPCSpritesArr.length = 0
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
    const battleZonesMap = []
    const changeMapMap = []
    const eventZonesMap = []
    const obstaclesMap = []

    if(currMap.name == 'luna_Mountain_Entrance') flashContainerManagement('shade')
    else if(currMap.name == 'luna_Mountain') flashContainerManagement('full')
    else flashContainerManagement('none')

    // collisionsMap
    if(currMap.collisions != undefined){
      for(let i = 0; i < currMap.collisions.length; i += currMap.width){
        collisionsMap.push(currMap.collisions.slice(i, currMap.width + i))
      }
      // pushes new Boundries in array with the previous number map array
      collisionsMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          if(type == 1){
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
          if(type == 8){
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

            // battleZones.push(
            //   new Boundary({
            //     position:{
            //       x: j * Boundary.width + currMap.spawnPosition.x,
            //       y: i * Boundary.height + currMap.spawnPosition.y
            //     },
            //     type: 2,
            //     collision: true,
            //     name: 'water'
            //   })
            // )
          }
          if(type == 9){ //stairs
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 9,
                collision: false
              })
            )
          }
        })
      })
    }

    // battleZonesMap
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
              type: 2,
              name: 'ground'
            })
          )
        })
      })
    }

    // changeMapMap
    if(currMap.changeMap != undefined){
      for(let i = 0; i < currMap.changeMap.length; i += currMap.width){
        changeMapMap.push(currMap.changeMap.slice(i, currMap.width + i))
      }
      let z = 0
      changeMapMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          const mapInfo = defaultMapsObj[`${currMap.name}`].changeMapLocations[z]

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

    // eventZonesMap
    if(currMap.eventZones != undefined){
      for(let i = 0; i < currMap.eventZones.length; i += currMap.width){
        eventZonesMap.push(currMap.eventZones.slice(i, currMap.width + i))
      }
      let z = 0
      let x = 0
      let itemIndex = 0
      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          switch(type){
            case 0: break
            case 4:
              if(mapsObj[`${currMap.name}`].trainers != undefined) {
                let trainerInfo = mapsObj[`${currMap.name}`].trainers[z]

                if(z == 0) z = z + 1
                else z++

                // console.log(trainerInfo)
                switch(trainerInfo.eventKey){
                  case 'maatGym':
                    if(!worldEventData.maat.firstMeet) return
                    if(player.badges[0]) return
                    break
                }
              
                let trainerTeam = []

                for(let i = 0; i < trainerInfo.team.length; i++){
                  const foeImg = new Image()
                  const pogemonInfo = pogemonsObj[trainerInfo.team[i][0].name]
                  foeImg.src = pogemonInfo.sprites.frontSprite

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

                  trainerTeam.push(new Pogemon(pogemonInfo, Math.pow(trainerInfo.team[i][1], 3), true, null, trainerInfo.team[i][2], null, foeSprite))
                }
              
                const trainerImg = new Image()
                trainerImg.src = trainerInfo.sprite
              
                const trainerSprite = new Sprite({
                  type:'trainer',
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  img: trainerImg,
                  frames: {
                    max: 4,
                    hold: 25
                  },
                  animate: false,
                })
              
                let createdTrainer = new Character(trainerTeam, null, null, trainerInfo.looking, trainerInfo.name, null, trainerSprite)
              
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
            
                return
              }
              break
            case 5:
              let eventInfo = defaultMapsObj[`${currMap.name}`].event[x]
              if(eventInfo == undefined) return

              // console.log(worldEventData)

              if(x == 0) x = x + 1
              else x++

              if(nextMapInfo != undefined)
                switch(nextMapInfo.name){
                  case 'maat_House':
                    if(!worldEventData.maat.firstMeet) return
                    if(!player.badges[0]) return
                    break
                  case 'cross_Link':
                    if(worldEventData.maat.firstMeet) return
                    break
                  case 'eden_Forest':
                    if(!worldEventData.vignus.catchable) return
                    break
                }

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

              if(eventInfo.sprite != undefined){
                // console.log(eventInfo.sprite)

                const NPCImg = new Image()
                NPCImg.src = eventInfo.sprite

                const NPCSprite = new Sprite({
                  type:'NPC',
                  position:{
                    x: j * Boundary.width + currMap.spawnPosition.x,
                    y: i * Boundary.height + currMap.spawnPosition.y
                  },
                  img: NPCImg,
                  frames: {
                    max: 4,
                    hold: 25
                  },
                  animate: false
                })

                const NPCharacter = new Character(
                  null,
                  null,
                  null,
                  eventInfo.info.looking,
                  eventInfo.name,
                  null,
                  NPCSprite
                )
                
                NPCSpritesArr.push(NPCharacter)
              }

              if(eventInfo.name == 'pc') return

              if(currMap.name == 'maat_House') {
                if(!worldEventData.maat.firstMeet) return
                if(!player.badges[0]) return
              }

              // console.log(`boundary pushed`)

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
              if(mapsObj[currMap.name].items == undefined) return

              if(mapsObj[currMap.name].items[itemIndex] == undefined) {
                // i think this resets between reloads
                if(itemIndex == 0) itemIndex = itemIndex + 1
                else itemIndex++
                return
              }else if(mapsObj[currMap.name].items[itemIndex].pickedUp) {
                // i think this resets between reloads
                if(itemIndex == 0) itemIndex = itemIndex + 1
                else itemIndex++
                return
              }

              let itemsInfo = mapsObj[currMap.name].items[itemIndex]
              
              if(data != null) {
                itemsInfo.hidden = data.currMapObj.items[itemIndex].hidden
                itemsInfo.pickedUp = data.currMapObj.items[itemIndex].pickedUp
              }
              // console.log(mapsObj[`${currMap.name}`].items)

              let boundary = new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })

              if(itemIndex == 0) itemIndex = itemIndex + 1
              else itemIndex++

              if(!itemsInfo.hidden){
                boundaries.push(boundary)

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
              } else {
                eventZones.push(
                  new Boundary({
                    position:{
                      x: j * Boundary.width + currMap.spawnPosition.x,
                      y: i * Boundary.height + currMap.spawnPosition.y
                    },
                    type: type,
                    info: itemsInfo,
                    name: 'item',
                    collisionInstance: {boundary}
                  })
                )
                // console.log(eventZones)
              }
              break
          }
        })
      })
    }

    // obstaclesMap
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

          if(data != undefined) {
            let newObstacleInfo
            if(typeof data.mapsObjState[currMap.name].obstaclesInfo == 'array') newObstacleInfo = data.mapsObjState[currMap.name].obstaclesInfo[z]
            // if(newObstacleInfo == undefined) newObstacleInfo = mapsObj[currMap.name].obstaclesInfo[z]

            obstacleInfo = newObstacleInfo
          }

          // console.log(obstacleInfo)
          if(obstacleInfo == null) {
            // console.log('nulled')
            obstacleInfo = currMap.obstaclesInfo[z]
            // obstacleInfo.disabled = true
          }

          // console.log(obstacleInfo)

          if(z == 0) z = z + 1
          else z++

          if(obstacleInfo.disabled) return
            
          let boundary = new Boundary({
            position:{
              x: j * Boundary.width + currMap.spawnPosition.x,
              y: i * Boundary.height + currMap.spawnPosition.y
            },
            type: 1,
            collision: true
          })

          boundaries.push(boundary)

          const obstacleImg = new Image()
          switch(obstacleInfo.name){
            case 'tree':
              obstacleImg.src = 'img/obstacles/cut.png'
              break
            case 'rock':
              obstacleImg.src = 'img/obstacles/rockSmash.png'
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
    
    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr]
  } else {
    // should mostly work here
    let nextMapInfoObj = mapsObj[`${nextMapInfo.name}`]

    if(pogecenterReturnInfo.name != null) nextMapInfoObj = mapsObj[`${pogecenterReturnInfo.name}`]
    // if(data != null && data.nextMapInfo.name != null) nextMapInfoObj = mapsObj[`${data.nextMapInfo.name}`]

    map.position.x = nextMapInfo.spawnPosition.x
    map.position.y = nextMapInfo.spawnPosition.y

    const collisionsMap = []
    const battleZonesMap = []
    const changeMapMap = []
    const eventZonesMap = []
    const obstaclesMap = []

    if(nextMapInfoObj.collisions != undefined){
      for(let i = 0; i < nextMapInfoObj.collisions.length; i += nextMapInfoObj.width){
        collisionsMap.push(nextMapInfoObj.collisions.slice(i, nextMapInfoObj.width + i))
      }
      // pushes new Boundries in array with the previous number map array
      collisionsMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type === 0) return
          if(type == 1){
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
          }
          if(type == 8){
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                  y: i * Boundary.height + nextMapInfo.spawnPosition.y
                },
                type: 8,
                collision: true
              })
            )

            // battleZones.push(
            //   new Boundary({
            //     position:{
            //       x: j * Boundary.width + currMap.spawnPosition.x,
            //       y: i * Boundary.height + currMap.spawnPosition.y
            //     },
            //     type: 2,
            //     collision: true,
            //     name: 'water'
            //   })
            // )
          }
          if(type == 9){ //stairs
            boundaries.push(
              new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 9,
                collision: false
              })
            )
          }
        })
      })
    }

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
              type: 2,
              name: 'ground'
            })
          )
        })
      })
    }
    
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

    if(nextMapInfoObj.eventZones != undefined){
      for(let i = 0; i < nextMapInfoObj.eventZones.length; i += nextMapInfoObj.width){
        eventZonesMap.push(nextMapInfoObj.eventZones.slice(i, nextMapInfoObj.width + i))
      }

      // z used to itterate thru the data in mapsObj's content
      let z = 0
      let x = 0
      let itemIndex = 0

      eventZonesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          switch(type){
            case 0: break
            case 4:
              // console.log(mapsObj)

              if(mapsObj[`${nextMapInfo.name}`].trainers != undefined) {
                let trainerInfo = mapsObj[`${nextMapInfo.name}`].trainers[z]

                if(z == 0) z = z + 1
                else z++

                switch(trainerInfo.eventKey){
                  case 'maatGym':
                    if(!worldEventData.maat.firstMeet) return
                    if(player.badges[0]) return
                    break
                }
              
                let trainerTeam = []

                // console.log(trainerInfo.team)
                if(trainerInfo.team.length != 0){
                  for(let i = 0; i < trainerInfo.team.length; i++){
                    const foeImg = new Image()
                    const pogemonInfo = pogemonsObj[trainerInfo.team[i][0].name]
                    foeImg.src = pogemonInfo.sprites.frontSprite

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

                    trainerTeam.push(new Pogemon(pogemonInfo, Math.pow(trainerInfo.team[i][1], 3), true, null, trainerInfo.team[i][2], null, foeSprite))
                  }
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
              
                let createdTrainer = new Character(trainerTeam, null, null, trainerInfo.looking, trainerInfo.name, null, trainerSprite)
              
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
              // console.log(mapsObj[`${nextMapInfo.name}`])
              if(mapsObj[`${nextMapInfo.name}`].event[x] == undefined) return
              let eventInfo = mapsObj[`${nextMapInfo.name}`].event[x]

              if(x == 0) x = x + 1
              else x++

              switch(nextMapInfo.name){
                case 'maat_House':
                  if(!worldEventData.maat.firstMeet) return
                  if(!player.badges[0]) return
                  break
                case 'cross_Link':
                  if(worldEventData.maat.firstMeet) return
                  break
                case 'eden_Forest':
                  if(!worldEventData.vignus.catchable) return
                  break
              }

              if(eventInfo.sprite != undefined){
                const NPCImg = new Image()
                NPCImg.src = eventInfo.sprite

                const NPCSprite = new Sprite({
                  type:'NPC',
                  position:{
                    x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                    y: i * Boundary.height + nextMapInfo.spawnPosition.y
                  },
                  img: NPCImg,
                  frames: {
                    max: 4,
                    hold: 25
                  },
                  animate: false
                })
  
                const NPCharacter = new Character(
                  null,
                  null,
                  null,
                  eventInfo.info.looking,
                  eventInfo.name,
                  null,
                  NPCSprite
                )

                NPCSpritesArr.push(NPCharacter)
              }

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

              if(nextMapInfo.name == 'maat_House') {
                if(!worldEventData.maat.firstMeet) return
                if(!player.badges[0]) return
              }

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
              if(mapsObj[`${nextMapInfoObj.name}`].items == undefined) return
              if(mapsObj[`${nextMapInfoObj.name}`].items[itemIndex] == undefined) {
                if(itemIndex == 0) itemIndex = itemIndex + 1
                else itemIndex++
                return
              }else if(mapsObj[`${nextMapInfoObj.name}`].items[itemIndex].pickedUp) {
                if(itemIndex == 0) itemIndex = itemIndex + 1
                else itemIndex++
                return
              }
              // console.log(data.mapsObjState[currMap.name].items)

              let itemsInfo = mapsObj[`${nextMapInfoObj.name}`].items[itemIndex]

              // console.log(itemsInfo)

              if(itemIndex == 0) itemIndex = itemIndex + 1
              else itemIndex++

              let boundary = new Boundary({
                position:{
                  x: j * Boundary.width + currMap.spawnPosition.x,
                  y: i * Boundary.height + currMap.spawnPosition.y
                },
                type: 1,
                collision: true
              })

              if(!itemsInfo.hidden){
                boundaries.push(boundary)
                
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
              } else {
                eventZones.push(
                  new Boundary({
                    position:{
                      x: j * Boundary.width + currMap.spawnPosition.x,
                      y: i * Boundary.height + currMap.spawnPosition.y
                    },
                    type: type,
                    info: itemsInfo,
                    name: 'item',
                    collisionInstance: {boundary}
                  })
                )
              }
              break
          }
        })
      })
    }

    if(nextMapInfoObj.obstacles != undefined){
      for(let i = 0; i < nextMapInfoObj.obstacles.length; i += nextMapInfoObj.width){
        obstaclesMap.push(nextMapInfoObj.obstacles.slice(i, nextMapInfoObj.width + i))
      }
      let z = 0
      // pushes new Boundries in array with the previous number map array
      obstaclesMap.forEach((row, i) =>{
        row.forEach((type, j) =>{
          if(type != 7) return

          let obstacleInfo = nextMapInfoObj.obstaclesInfo[z]
          if(data != undefined) {
            let newObstacleInfo
            if(typeof data.mapsObjState[nextMapInfoObj.name].obstaclesInfo == 'array') newObstacleInfo = data.mapsObjState[nextMapInfoObj.name].obstaclesInfo[z]
            if(newObstacleInfo == undefined) newObstacleInfo = mapsObj[nextMapInfoObj.name].obstaclesInfo[z]

            obstacleInfo = newObstacleInfo
          }
          if(obstacleInfo == null) {
            obstacleInfo = nextMapInfoObj.obstaclesInfo[z]
            obstacleInfo.disabled = true
          }

          // console.log(obstacleInfo)

          if(z == 0) z = z + 1
          else z++
          
          if(obstacleInfo.disabled) return

          let boundary = new Boundary({
            position:{
              x: j * Boundary.width + nextMapInfo.spawnPosition.x,
              y: i * Boundary.height + nextMapInfo.spawnPosition.y
            },
            type: 1,
            collision: true
          })

          boundaries.push(boundary)

          const obstacleImg = new Image()

          switch(obstacleInfo.name){
            case 'tree':
              obstacleImg.src = 'img/obstacles/cut.png'
              break
            case 'rock':
              obstacleImg.src = 'img/obstacles/rockSmash.png'
              break
          }

          const obstacleSprite = new Sprite({
            type: z,
            position:{
              x: j * Boundary.width + nextMapInfo.spawnPosition.x,
              y: i * Boundary.height + nextMapInfo.spawnPosition.y
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
                x: j * Boundary.width + nextMapInfo.spawnPosition.x,
                y: i * Boundary.height + nextMapInfo.spawnPosition.y
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

    return [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr]
  }
}

export const pogecenterReturnInfo = {
  name: null,
  spawnPosition: {
    x: null,
    y: null
  }
}

function showMapNameAnimation(currMap){
  const changeMapContainer = document.querySelector('#changeMapContainer')

  if(currMap.name == 'undefined' || currMap.name == null) currMap.name = pogecenterReturnInfo.name

  let mapName = switchUnderScoreForSpace(currMap.name)

  switch(mapName){
    case 'maat House':
      mapName = "ma'at House"
      break
    case 'keme Town House1':
    case 'keme Town House2':
      return
  }

  changeMapContainer.textContent = mapName

  gsap.to(changeMapContainer, {
    top: '2.5%',
    onComplete: () =>{
      setTimeout(() =>{
        gsap.to(changeMapContainer, {
          top: '-20%',
          onComplete: () =>{
          }
        })
      }, 1000)
    }
  })

  if(!mapsObj[currMap.name].seen) mapsObj[currMap.name].seen = true
  // console.log(mapsObj[currMap.name])
}

function flashContainerManagement(type){
  const flashContainer =  document.querySelector('#flashContainer')
  const flashStuffArr = []

  for(let i = 0; i < flashContainer.childNodes.length; i++){
    if(i == 0 || i == 2 || i == 4 || i == 6) continue
    flashStuffArr.push(flashContainer.childNodes[i])
  }

  switch(type){
    case 'shade':
      flashContainer.style.display = 'block'
      flashContainer.style.backgroundColor = 'rgba(0,0,0,0.75)'

      // console.log(flashStuffArr)

      flashStuffArr.forEach(node =>{
        node.style.display = 'none'
      })
      break
    case 'full':
      flashContainer.style.display = 'grid'
      flashContainer.style.backgroundColor = 'transparent'

      flashStuffArr.forEach((node,i) =>{
        if(i == 0 || i == 2) node.style.display = 'block'
        else node.style.display = 'grid'
      })
      break
    case 'none':
      flashContainer.style.display = 'none'
      flashContainer.style.backgroundColor = 'transparent'
      break
  }
}

export function changeMapInfo(nextMapInfo, currMapInfo){
  // console.log(currMapInfo)
  let info = nextMapInfo
  if(info.name == 'prevMap') info = pogecenterReturnInfo
  if(info.name == 'undefined') if(data != null) info = data.nextMapInfo

  currMap = mapsObj[`${info.name}`]

  // console.log(info)

  OWWeatherParticles.arr = []

  //deal with flash container stuff

  if(currMap.name == 'luna_Mountain_Entrance') flashContainerManagement('shade')
  else if(currMap.name == 'luna_Mountain') flashContainerManagement('full')
  else flashContainerManagement('none')
  
  showMapNameAnimation(info)
  switchMap(info, currMapInfo)
}

export async function generateMapData(nextMapInfo) {
  const [boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr] = await generateBoundaries(nextMapInfo)

  if(nextMapInfo == undefined){
    mapImg.src = currMap.mapImg
    FGImg.src = currMap.FGImg
  } else {
    currMap = mapsObj[`${nextMapInfo.name}`]
    mapImg.src = mapsObj[`${nextMapInfo.name}`].mapImg
    FGImg.src = mapsObj[`${nextMapInfo.name}`].FGImg
  }
  
  return [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG]
}