// move things around

import { printImages, scenes } from '../canvas.js'
import { playerMovement, player, interaction, lastDirection, pogemartInteraction, itemPickUp, queue as OWQueue } from '../player.js'
import { changeMapInfo, currMap, encounterButtonState, flashContainerManagement, generateMapData, pogecenterReturnInfo, printEncounterBox, worldEventData } from '../maps.js'
import { _preventActionSpam } from '../../app.js'
import { faintedTriggered, manageBattleState, moveLearning, moveProcess, queue as battleQueue, learnMoveOptionEvent, learningMove, learningType, learningTarget, evoArr, catchEventObj, moveSwitchEvent, enemyTrainer, foe, levelCapObj } from './battle.js'
import { manageTeamState } from './team.js'
import { itemUsed, manageBagState } from './bag.js'
import { manageStatsState, switchSpaceForUnderScore, switchUnderScoreForSpace } from './stats.js'
import { managePogedexState, pogedexInfoState } from './pogedex.js'
import { timeObj, manageTrainerState } from './trainer.js'
import { defaultMapsObj, mapsObj } from '../../data/mapsData.js'
import { managePcState, pc } from './pc.js'
import { loadData, setSaveData } from '../../save.js'
import { audioObj, volumeValues } from '../../data/audioData.js'
import { queue as evoQueue, queueProcess } from './evolution.js'
import { typesObj } from '../../data/typesData.js'
import { weatherObj } from '../../data/weatherData.js'
import { itemsObj } from '../../data/itemsData.js'
import { id } from '../../classes.js'
import { pogemonsObj } from '../../data/pogemonData.js'
import { movesObj } from '../../data/movesData.js'
import { newGame, playerName } from './boot.js'

const frameRate = 60
const frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

export let [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export let movables

async function setMapData(){
  [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData()

  movables = [map, ...boundaries, ...battleZones, ...changeMap, ...eventZones, ...trainerSpritesArr, ...NPCSpritesArr, ...itemSpritesArr, ...obstacleSpritesArr]
}

await setMapData()

const data = await loadData()

let animationId

export const menu = {
  initiated: false
}

const overworldMenuDom = document.querySelector('#overworldMenu')

let nextMapSaveInfo
let prevMap
let firstLoad = true

function startOverWorldWeather(){
  const OWSceneContainer = document.querySelector('#weatherContainer')

  if(mapsObj[currMap.name].weather == undefined) OWSceneContainer.style.backgroundColor = `transparent`
  else OWSceneContainer.style.backgroundColor = `#${typesObj[weatherObj[mapsObj[currMap.name].weather].element].color}${weatherObj[mapsObj[currMap.name].weather].opacity}`
}

let pogelocationBackUp

export async function switchMap(nextMapInfo, preMapInfo){
  if(nextMapInfo != undefined) {
    if(nextMapInfo.name != 'undefined'){
      [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData(nextMapInfo)
      prevMap = preMapInfo
    }
  }

  if(nextMapInfo.name == 'pogemart' || nextMapInfo.name == 'pogecenter'){
    pogelocationBackUp = preMapInfo
  }

  if(preMapInfo.name == 'pogemart' || preMapInfo.name == 'pogecenter') {
    // vvvv wtf?????? why if true? delaying something????? vvvv
    console.log('now')
    
    if(data != null){
      if(firstLoad){
        firstLoad = false
        if(data.nextMapInfo.name != null){
          pogecenterReturnInfo.name = data.nextMapInfo.name
          pogecenterReturnInfo.spawnPosition = data.nextMapInfo.spawnPosition
          console.log(pogecenterReturnInfo)
        }
      } else {
        pogecenterReturnInfo.name = prevMap.name
        pogecenterReturnInfo.spawnPosition = prevMap.position
        console.log(pogecenterReturnInfo)
        prevMap = undefined
      }
    }

    pogecenterReturnInfo.spawnPosition.y = pogecenterReturnInfo.spawnPosition.y - 15

    if(pogecenterReturnInfo.name == 'pogemart' || pogecenterReturnInfo.name == 'pogecenter') {
      pogecenterReturnInfo.name = pogelocationBackUp.name
      pogecenterReturnInfo.spawnPosition = pogelocationBackUp.position
      console.log(pogecenterReturnInfo)

      pogecenterReturnInfo.spawnPosition.y = pogecenterReturnInfo.spawnPosition.y - 15
    }

    [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData(pogecenterReturnInfo)

    pogecenterReturnInfo.name = null
    pogecenterReturnInfo.spawnPosition.x = null
    pogecenterReturnInfo.spawnPosition.y = null
  }

  // if(typeof obstacleSpritesArr != 'array') obstacleSpritesArr = []

  movables = [map, ...boundaries, ...battleZones, ...changeMap, ...eventZones, ...trainerSpritesArr, ...NPCSpritesArr, ...itemSpritesArr, ...obstacleSpritesArr]

  let opacity = 0

  if(player.interaction != null) if(player.interaction.info.eventKey == "setFinalBoss") opacity = 1

  gsap.to('#overlapping', {
    opacity,
    duration: 0.4,
    onComplete(){
      player.disabled = false
      // console.log(catchEventObj)
      nextMapSaveInfo = nextMapInfo
      //map changed here
      startOverWorldWeather()

      if(nextMapInfo.name == 'pogemart' || nextMapInfo.name == 'pogecenter'){
        pogecenterReturnInfo.name = preMapInfo.name
        pogecenterReturnInfo.spawnPosition.x = preMapInfo.spawnPosition.x
        pogecenterReturnInfo.spawnPosition.y = preMapInfo.spawnPosition.y

        // console.log(pogecenterReturnInfo, preMapInfo)
      }
    }
  })
}

function initOverworldMenu(){
  let options = ['pogedex', 'team', 'bag', 'trainer', 'save', 'options']
  for(let i = 0; i < options.length; i++){
    const sectionDom = document.createElement('div')
    sectionDom.classList.add('overworldMenuSections')
    sectionDom.addEventListener('click', e => overworldMenuClickEvent(e))
    sectionDom.textContent = options[i]
    overworldMenuDom.appendChild(sectionDom)
  }
}

let optionMenuState = false

if(data != null){
  volumeValues.music = data.volumeValues.music
  volumeValues.SFX = data.volumeValues.SFX
}
  
document.querySelectorAll('.volumeRange').forEach(node =>{
  node.addEventListener("change", e => {
    volumeValues[`${node.id.slice(0, -6)}`] = parseInt(node.value)
    Object.values(audioObj.music).forEach(song =>{
      song.volume(volumeValues.music / 1000)
    })
    Object.values(audioObj.SFX).forEach(song =>{
      song.volume(volumeValues.SFX / 1000)
    })
  })
})

document.querySelector('#optionsMenuLoadBackup').addEventListener('click', e =>{
  if(data == undefined) alert('You need to have saved at least twice to use this feature.')
  else if(data.backupSave == null) alert('You need to save and refresh the game once more to use this feature.')
  else {
    console.log(data.backupSave)
  
    alert('Save File Backed Up.')
    setSaveData('saveFile', data.backupSave)
    location.reload()
  }
})

document.querySelector('#optionsMenuCopySave').addEventListener('click', async e =>{
  const data = await loadData('saveFile')

  if(data == undefined) alert('You need to have saved and refreshed the game at least once to use this feature.')
  else {
    alert('Save File Copied To Clipboard.')

    await navigator.clipboard.writeText(JSON.stringify(data))    
  }
})

function manageOptionMenuState(state){
  const optionsMenuContainer = document.querySelector("#optionsMenuContainer").style
  const overworldScene = document.querySelector('#overworldScene').style

  if(menu.initiated != true) return

  optionMenuState = state

  if(state){
    gsap.to('#overlapping', {
      opacity: 1,
      onComplete: () =>{
        optionsMenuContainer.display = 'flex'
        document.querySelectorAll('.volumeRange').forEach((node, i) =>{
          node.value = Object.values(volumeValues)[i] 
        })
        gsap.to('#overlapping', {
          opacity: 0,
        })
      }
    })
  } else {
    gsap.to('#overlapping', {
      opacity: 1,
      onComplete: () =>{
        optionsMenuContainer.display = 'none'
        gsap.to('#overlapping', {
          opacity: 0
        })
      }
    })
  }
}

export let escapeEvent = {active : false}

function overworldMenuClickEvent(e){
  escapeEvent.active = true
  switch(e.target.textContent){
    case 'team':
      if(player.team < 1) return
      
      manageOverWorldState(false, 'team')
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageTeamState(true, 'overworld')
          gsap.to('#overlapping', {
            opacity: 0,
          })
        }
      })
      break
    case 'bag':
      if(player.team < 1) return

      manageOverWorldState(false, 'bag')
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageBagState(true, 'overworld')
          gsap.to('#overlapping', {
            opacity: 0,
          })
        }
      })
      break
    case 'pogedex':
      if(player.team < 1) return

      manageOverWorldState(false, 'pogedex')
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          managePogedexState(true)
          gsap.to('#overlapping', {
            opacity: 0,
          })
        }
      })
      break
    case 'trainer':
      manageOverWorldState(false, 'trainer')
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageTrainerState(true)
          gsap.to('#overlapping', {
            opacity: 0,
          })
        }
      })
      break
    case 'save':
      if(player.team < 1) return

      alert('Saved Succesfully')

      let teamMovesInfo = []
      let teamLearntMovesInfo = []

      player.team.forEach(pogemon =>{
        let pogemonLearntMoves = []
        console.log(pogemon.learntMoves)
        pogemon.learntMoves.forEach(learntMove =>{
          pogemonLearntMoves.push(learntMove)
        })
        teamLearntMovesInfo.push(pogemonLearntMoves)

        let pogemonMovesInfo = []
        pogemon.moves.forEach(move =>{
          console.log(move)
          pogemonMovesInfo.push([move.name, move.pp])
        })
        teamMovesInfo.push(pogemonMovesInfo)
      })

      let nextMapInfo = {
        name: null,
        spawnPosition: {
          x: null,
          y: null
        }
      }

      let savePCObj = [...pc]
      let pcMovesInfo = []
      let pcLearntMovesInfo = []

      pc.forEach((box, i) =>{
        // console.log(box)
        let pcMovesBoxArr = []
        pcMovesInfo.push(pcMovesBoxArr)
        
        let pcLearntMovesArr = []
        pcLearntMovesInfo.push(pcLearntMovesArr)

        box.forEach((pogemon, j) =>{
          if(pogemon != null) {
            console.log(pogemon)

            // if pc save fails it's probably 'cuze i need to ass shit here
            
            let indivMonMoves = []
            let indivMonLearntMoves = []

            if(pogemon.moves[0] != null) {
              savePCObj[i][j].moves.forEach(move =>{
                indivMonMoves.push([move.name, move.pp, i, j])
                move = {...movesObj[pogemon.moves[i].name]}
              })
            }

            let pogemonLearntMoves = []
            savePCObj[i][j].learntMoves.forEach(move =>{
              pogemonLearntMoves.push(move)
            })

            indivMonLearntMoves.push([pogemonLearntMoves, i, j])

            pcMovesBoxArr.push(indivMonMoves)
            pcLearntMovesArr.push(indivMonLearntMoves)
          }
        })
      })
      
      if(currMap.name == 'pogecenter' || currMap.name == 'pogemart') {
        if(nextMapInfo.name != null){
          nextMapInfo.name = nextMapSaveInfo.name
          nextMapInfo.spawnPosition.x = nextMapSaveInfo.spawnPosition.x
          nextMapInfo.spawnPosition.y = nextMapSaveInfo.spawnPosition.y
        }
  
        if(pogecenterReturnInfo.name != null) nextMapInfo = pogecenterReturnInfo
  
        if(nextMapInfo.name == null && data != null){
          nextMapInfo.name = data.nextMapInfo.name
          nextMapInfo.spawnPosition.x = data.nextMapInfo.spawnPosition.x
          nextMapInfo.spawnPosition.y = data.nextMapInfo.spawnPosition.y
        }
      }
      
      const bagSave = []

      player.bag.forEach(item =>{
        bagSave.push(item)
      })

      // if(mapsObj[currMap.name].obstaclesInfo != undefined) mapsObj[currMap.name].obstaclesInfo = [...mapsObj[currMap.name].obstaclesInfo]

      // Object.values(mapsObj).forEach(map =>{
      //   mapsSaveObj[map.name] = {...map}
      // })
      // if(data != undefined) {
      //   Object.values(mapsObject).forEach(map =>{
      //     if(map.obstaclesInfo == undefined) return
      //     map.obstaclesInfo = {...data.mapsObjState[map.name].obstaclesInfo}
      //   }) 
      // }

      let backupSaveFile
      if(data == undefined) backupSaveFile = null
      else backupSaveFile = data

      for(let i = 0; i < player.team.length; i++){
        let pogemon = player.team[i]
        if(pogemon.heldItem == null) continue 
        pogemon.heldItem = {...itemsObj[pogemon.heldItem.name]}
      }

      let mapsSaveObj = {}

      Object.values(mapsObj).forEach((map, i) =>{
        if(i == 0) mapsSaveObj['background'] = map
        else mapsSaveObj[map.name] = {...map}
      })

      Object.values(mapsSaveObj).forEach((map,i) =>{
        if(i != 0) {

          if(map.encounters != undefined) {
            Object.values(map.encounters).forEach(encounterType =>{
              if(encounterType.length > 0)
                encounterType.forEach(encounter =>{
                  if(encounter != undefined) encounter.pogemon = {...pogemonsObj[encounter.pogemon.name]}
                })
            })
          }

          if(map.trainers != undefined) {
            Object.values(map.trainers).forEach(trainer =>{ 
              trainer.team.forEach(pogemon =>{
                if(pogemon[0] != null) {
                  if(pogemon[0].movepool == undefined) pogemon[0].movepool = {}
                  Object.values(pogemonsObj[pogemon[0].name].movepool).forEach(move =>{
                    pogemon[0].movepool[move.name] = {...movesObj[move.name]}
                    // console.log(move)
                  })
                }
              })
            })
          }
        }
      })

      let pogemonSaveObj = {}

      Object.values(pogemonsObj).forEach(pogemon =>{
        pogemonSaveObj[pogemon.name] = {}
        const seenObj = pogemonSaveObj[pogemon.name]
        seenObj['abilities'] = {}
        Object.values(pogemon.abilities).forEach(abilityObj =>{
          // console.log(abilityObj)
          seenObj['abilities'][abilityObj.ability.name] = {seen: abilityObj.seen}
        })

        seenObj['moves'] = {}
        Object.values(pogemon.movepool).forEach(moveInfo =>{
          if(moveInfo.move != undefined) seenObj['moves'][moveInfo.move.name] = {seen: moveInfo.seen}
        })

        // pogemonSaveObj[pogemon.name] = {...pogemon}
      })

      let currMapSaveObj = {}

      Object.values(currMap).forEach((mapValue, i) =>{
        switch(typeof mapValue){
          case 'string':
          case 'boolean':
          case 'number':
            currMapSaveObj[Object.keys(currMap)[i]] = mapValue
            break
          case 'object':
            if(mapValue == undefined) return
            if(mapValue.length == undefined) {
              currMapSaveObj[Object.keys(currMap)[i]] = {...mapValue}
              // console.log(currMapSaveObj[Object.keys(currMap)[i]])

            }
            else {
              currMapSaveObj[Object.keys(currMap)[i]] = []
              if(typeof mapValue[0] == 'number') currMapSaveObj[Object.keys(currMap)[i]] = [...mapValue]
              else {
                Object.values(mapValue).forEach((mapValueInfo, j) =>{
                  currMapSaveObj[Object.keys(currMap)[i]][j] = {...mapValueInfo}
                  // Object.values(mapValueInfo).forEach((indivInfo, i2) =>{
                  //   if(typeof indivInfo == 'boolean') console.log('miam')
                  //   console.log(currMapSaveObj[Object.keys(currMap)[i]])
                  // })
                  // console.log(currMapSaveObj)
                })
              }
            }
            break
        }
      })

      // console.log(currMapSaveObj, mapsObj[currMapSaveObj.name])

      setSaveData(
        'saveFile',
        {
          playerInfo: {
            player,
            teamMovesInfo,
            teamLearntMovesInfo,
            pcMovesInfo,
            pcLearntMovesInfo
          },
          currMapName: currMap.name,
          currMapObj: currMapSaveObj,
          spawnPosition: {x: map.position.x, y: map.position.y},
          mapsObjState: mapsSaveObj,
          pogemonsObjState: pogemonSaveObj,
          nextMapInfo,
          interactionFlags: interaction.flags,
          volumeValues,
          bag: bagSave,
          pc: [...savePCObj],
          timeObj,
          worldEventData,
          currId: id,
          levelCap: JSON.stringify(levelCapObj.level)
        }
      )

      setSaveData("backUp", {backupSave: backupSaveFile})
      break
    case 'options':
      manageOptionMenuState(true)
      break
  }
  setTimeout(() =>{
    escapeEvent.active = false
  }, 500)
}

function manageMenuSections(state){
  if(state){
    initOverworldMenu()
  } else {
    overworldMenuDom.replaceChildren()
  }
}

function manageMenuState(state){
  console.log(optionMenuState)

  if(optionMenuState) return

  const overworldSceneDom = document.querySelector('#overworldScene').style
  const menuDom = document.querySelector('#overworldMenu').style
  const menuSectionDomArr = document.querySelectorAll('.overworldMenuSections')
  const OWSceneContainer = document.querySelector('#overworldSceneContainer')

  player.disabled = !state
  menu.initiated = !state

  console.log(menu.initiated)

  if(menu.initiated) {
    manageMenuSections(menu.initiated)

    menuDom.height = '0%'
    menuDom.width = '0%'
    menuDom.display = 'grid'
    OWSceneContainer.style.display = 'flex'

    gsap.to(OWSceneContainer, {
      backgroundColor: 'rgba(0,0,0,0.85)',
      duration: 0.25,
    })

    menuSectionDomArr.forEach(menuSection =>{
      gsap.to(menuSection,{
        fontSize: 24 + 'px',
        duration: 0.25,
        backgroundColor: 'rgba(0,0,0,0.85)',
      })
    })
    gsap.to(menuDom, {
      height: 100 + '%',
      width: 100 + '%',
      duration: 0.5,
      onComplete(){
        player.disabled = true
      }
    })
  }
  else if (!menu.initiated) {

    gsap.to(menuDom, {
      height: 0 + '%',
      width: 0 + '%',
      duration: 0.25,
      backgroundColor: 'rgba(0,0,0,0)',
    })

    menuSectionDomArr.forEach(menuSection =>{
      gsap.to(menuSection,{
        fontSize: 0 + 'px',
        duration: 0.25,
      })
    })

    gsap.to(OWSceneContainer, {
      backgroundColor: 'rgba(0,0,0,0)',
      duration: 0.25,
    })

    gsap.to('#overlapping', {
      duration: 0.3,
      onComplete(){
        // PROBLEM HERE // what problem?? lmao //
        document.querySelector('#overworldMenu').style.display = 'none'
        manageMenuSections(menu.initiated)
      }
    })

  }
}

export let prevScene
export function returnPrevScene(scene){
  prevScene = scene
}

export let waitForNextBattle = {
  initiated: false
}

export const playerTeamItemsState = {
  team : []
}

export function transitionScenes(prevScene, exitedScene){
  player.team.forEach((pogemon, i) =>{
    if(pogemon == undefined) player.team.splice(i, 1)
  })

  switch(prevScene){
    case 'overworld':
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageOverWorldState(true, exitedScene)
          
          gsap.to('#overlapping', {
            opacity: 0,
            onComplete: () =>{
              player.team.forEach(pogemon =>{
                pogemon.opacity = 1
              })
              player.disabled = false
              // console.log(catchEventObj)
            }
          })
        }
      })
      break
    case 'battle':
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageBattleState(true)
          prevScene = 'battle'
          gsap.to('#overlapping', {opacity: 0})
        }
      })
      break
  }
}

export const disableOWMenu = {active : false}

function escapeKeyEventOptions(e) {
  const encounterInterfaceDom = document.querySelector('#encounterInterface')
  if(disableOWMenu.active) return
  if(e.key === 'Escape'){
    if(scenes.get('overworld').initiated){
      if(scenes.get('stats').initiated) return
      if(optionMenuState) manageOptionMenuState(false)
      if(pogemartInteraction.initiated) {
        pogemartInteraction.initiated = false
        interaction.initiated = false
        
        document.querySelector('#pogemartContainer').style.display = 'none'
        document.querySelector('#pogemartItemsContainer').replaceChildren()
        document.querySelector('#pogemartSellItemsContainer').replaceChildren()

        document.querySelector('#pogemartBuyItemsButton').style.display = 'flex'
        document.querySelector('#pogemartSellItemsButton').style.display = 'flex'
        document.querySelector('#pogemartItemsContainer').style.display = 'none'
        document.querySelector('#pogemartSellItemsContainer').style.display = 'none'

        disableOWMenu.active = true
        console.log('here2')
        player.team[0].dialogue('overworld', 'Have a good day! :D')
        document.querySelector('#pogemartMenuDescripion').textContent = ''

        // OWQueue.push(() =>{
        //   disableOWMenu.active = false
        //   player.disabled = false
        //   console.log(catchEventObj)
        // })
        return
      }

      if(scenes.get('pickingItem').initiated == true) return


      // opens OW menu
      if(player.interaction != null) if(player.interaction.info.starter) if(player.disabled) return

      manageMenuState(menu.initiated)
    }

    if(scenes.get('battle').initiated){
      console.log('grided')
      if(battleQueue.length == 0) if(!moveProcess) encounterInterfaceDom.style.display = 'grid'
      if(moveLearning.initiated) learnMoveOptionEvent(null, learningMove, learningType, learningTarget)
    }

    if(scenes.get('evolution')){
      if(moveLearning.initiated) learnMoveOptionEvent(null, learningMove, learningType, learningTarget)
    }

    if(scenes.get('team').initiated){
      if(faintedTriggered.active) return
      if(moveSwitchEvent.ally) return
      manageTeamState(false, prevScene)
      transitionScenes(prevScene, 'team')
    }

    if(scenes.get('bag').initiated){
      if(itemUsed.used == true) return
      manageBagState(false)
      console.log(prevScene)
      transitionScenes(prevScene, 'bag')
    }

    if(scenes.get('stats').initiated){
      if(scenes.get('overworld').initiated) return
      manageStatsState(false, null, prevScene)
    }

    if(scenes.get('pogedex').initiated){
      if(pogedexInfoState.active){
        pogedexInfoState.active = false
        pogedexInfoState.flag = false
        document.querySelector('#infoMainContainer').style.display = 'none'
        document.querySelector('#rightInfoMovesContainer').style.display = 'none'
        document.querySelector('#rightInfoMovesContainer').replaceChildren()
        document.querySelector('#rightInfoReturnContainer').style.display = 'none'
        document.querySelector('#rightInfoAbilitiesContainer').style.display = 'none'
        document.querySelector('#rightInfoAbilitiesContainer').replaceChildren()
        document.querySelector('#pogedexSceneContainer').style.display = 'block'
        return
      }

      managePogedexState(false)
      transitionScenes('overworld', 'pogedex')
    }

    if(scenes.get('trainer').initiated){
      manageTrainerState(false)
      transitionScenes('overworld', 'battle')
    }

    if(scenes.get('pc').initiated){
      gsap.to('#overlapping',{
        opacity: 1,
        onComplete: () =>{
          managePcState(false)
          // transitionScenes('overworld', 'pc')

          manageOverWorldState(true, 'pc')
          scenes.set('overworld', {initiated: true})

          gsap.to('#overlapping',{
            opacity: 0,
          })
        }
      })
    }
  } else if(e.key == '`'){
    console.log(player)
    console.log(battleQueue)
    console.log(foe)
  }
}

window.addEventListener('keydown', (e) => _preventActionSpam(escapeKeyEventOptions, e, 500), true)

let OWAnimationRuning = false

export let OWWeatherParticles = {
  arr: []
}

function manageWeatherParticles(weather){
  if(weather == undefined || weather == null) {
    OWWeatherParticles.arr = []
    return
  }

  let particle = {
    position: {
      x: 0,
      y: 0
    },
    velocity:{
      x: 0,
      y: 0
    },
    size: {
      height: 0,
      width: 0
    },
    color: null,
  }

  if(OWWeatherParticles.arr.length > weather.maxParticleCount) OWWeatherParticles.arr.shift()

  switch(weather.type){
    case 'sun':
      particle = {
        position: {
          x: 0,
          y: -window.innerHeight
        },
        velocity:{
          x: 0,
          y: 0
        },
        size: {
          height: window.innerHeight * 2,
          width: 5
        },
        color: '#ffd96637',
        rotation: 1,
        type: weather.type
      }
      break
    case 'rain':
      particle = {
        position: {
          x: Math.floor(Math.random() * window.innerWidth),
          y: 0
        },
        velocity:{
          x: 0,
          y: 10 + Math.floor(Math.random() * 5)
        },
        size: {
          height: 7,
          width: 3
        },
        color: 'blue',
        type: weather.type
      }
      break
    case 'sand':
      particle = {
        position: {
          x: 0,
          y: Math.floor(Math.random() * window.innerHeight)
        },
        velocity:{
          x: 5 + Math.floor(Math.random() * 3),
          y: 0
        },
        size: {
          height: 5,
          width: 5
        },
        color: 'brown',
        type: weather.type
      }
      break
    case 'snow':
      particle = {
        position: {
          x: Math.floor(Math.random() * window.innerWidth),
          y: 0
        },
        velocity:{
          x: 1 + Math.floor(Math.random() * 2 * (Math.floor(Math.random() * -2) + 1)),
          y: 2 + Math.floor(Math.random() * 2)
        },
        size: {
          height: 2 * Math.floor(Math.random() * 4),
          width: 2 * Math.floor(Math.random() * 4)
        },
        color: 'white',
        type: weather.type
      }
      break
  }

  OWWeatherParticles.arr.push(particle)
}

let timer = 1

const overWorldAnimation = timeSpent =>{
  animationId = requestAnimationFrame(overWorldAnimation)
  OWAnimationRuning = true

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  if(currMap == undefined) return

  if(currMap.name == 'lab') if(player.disabled) if(document.querySelector('#overworldDialogueContainer').style.display == 'none' && document.querySelector('#overworldMenu').style.display == 'none') {
    // player.disabled = false
    timer++
    if(timer >= 60){
      if(player.team.length == 0) player.disabled = false
    }
  }

  manageWeatherParticles(weatherObj[mapsObj[currMap.name].weather])
  printImages(background, FG, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, OWWeatherParticles)
  playerMovement(animationId, movables, boundaries, battleZones, changeMap, eventZones)
}

let teamOrder

export function manageOverWorldState(state, previousScene){
  if(state) {
    player.disabled = false

    if(OWAnimationRuning) return

    document.querySelector('#overworldSceneContainer').style.backgroundColor = 'rgba(0,0,0,0)'
    eventZones.forEach(zone =>{
      if(zone.info.createdTrainer != undefined){
        zone.info.createdTrainer.position.x = zone.position.x
        zone.info.createdTrainer.position.y = zone.position.y
      }
    })

    document.querySelector('#overworldDialogueContainer').style.display = 'none'
    document.querySelector('#overworldScene').style.display = 'block'
    document.querySelector('#overworldMenu').style.display = 'none'

    if(player.interaction != null) if(player.interaction.info.gymLeader != undefined){
      disableOWMenu.active = true
      console.log('here2')
      document.querySelector('#overworldDialogueContainer').style.display = 'flex'

      if(!player.badges[0]) player.team[0].dialogue('overworld', "Congratulations, you've earned your first badge!\n\nYou can now cut down pesky tree that are in your way.")
      else if (!player.badges[1]) player.team[0].dialogue('overworld', "Congratulations, you've earned a second badge!\n\nNo rock will ever be in your way from now on.")

      console.log('messageNow')
    }

    console.log(newGame)
    if(newGame) player.bag.set('potion', {item: {...itemsObj.potion}, quantity: 5})

    let teamPlaceHolder = []
    
    if(previousScene != 'boot' && previousScene != 'team' && previousScene != 'pc'){
      teamOrder.forEach((order, i) =>{
        player.team.forEach((pogemon, j) =>{
          if(order.id == pogemon.id) {
            teamPlaceHolder.push(pogemon)
          }
        })
      })

      playerTeamItemsState.team.forEach((pogemon, i) =>{
        if(player.team[i].id == Object.entries(pogemon)[i][0]) 
          if(player.team[i].heldItem == null) 
            player.team[i].heldItem = Object.entries(pogemon)[i][1]
      })

      playerTeamItemsState.team = []

      if(player.team.length <= 6) if(catchEventObj.active) teamPlaceHolder.push(player.team[teamOrder.length])

      player.team = teamPlaceHolder 
      
      player.team.forEach(pogemon =>{
        pogemon.affliction[0].active = false
        pogemon.affliction[0].turns = 0

        pogemon.affliction[1].active = false

        pogemon.affliction[2].active = false
        pogemon.affliction[2].turns = 0
      })
    }

    if(previousScene == 'boot' && newGame) player.name = playerName

    printEncounterBox(currMap)

    if(currMap.name == 'luna_Mountain_Entrance' || currMap.name == 'ghost_Woods') flashContainerManagement('shade')
    else if(currMap.name == 'luna_Mountain') flashContainerManagement('full')
    else flashContainerManagement('none')

    overWorldAnimation()
    startOverWorldWeather()
    scenes.set('overworld', {initiated : true})
    if(document.querySelector('#pogemonNamingScene').style.display == 'none') {if(catchEventObj.active == false) player.disabled = false}
    else setTimeout(() => player.disabled = false, 500)
    // console.log(document.querySelector('#pogemonNamingScene').style.display == 'none')
    // console.log(catchEventObj)
    menu.initiated = false
    overworldMenuDom.replaceChildren()

    // put gym winning message here here

    if(player.interaction != null) {
      if(enemyTrainer == undefined) return
      switch(player.interaction.info.eventKey){
        case 'maatGym':
          if(worldEventData.maat.gym) return
  
          levelCapObj.level = 25
          itemPickUp(itemsObj.axe, 1, `Congratulations on getting that first badge, im proud of you!\n\nHere, take this. Don't forget to visit the eden forest south of gene town.`)
          break
        case 'djedGym':
          if(worldEventData.djed.gym) return
  
          levelCapObj.level = 35
          itemPickUp(itemsObj.hammer, 1, `Yeah you won, big deal.\n\nTake this, it's pretty cool.`)
          break
        case 'mosesStaff':
          if(worldEventData.moses.staffGiven) return
  
          worldEventData.moses.staffGiven = true
          itemPickUp(itemsObj.guiding_Staff, 1, `Here, take this. It should help you along your journey towards truth.`)
          break
        case 'hermesGym':
          if(worldEventData.hermes.gym) return
  
          levelCapObj.level = 70
          itemPickUp(itemsObj.surf_Saddle, 1, `To think you became so strong so fast, commendable!\n\nThis should allow you to go back and reassess what you've missed.`)
          break
        case 'reginaEscaGiver':
          itemPickUp(itemsObj.regina_Esca, 1, 
            `Only when she feels safe enought will the queen evolve.\n\n
            I thought the queen only needed to be surrounded by minions to evolve,\nbut i was wrong!.\n\n
            The only thing i was missing was making it hold this!! Now take it.`
          )
          break
        case 'goldenDiskGiver':
          if(worldEventData.baaull.goldenDisk) return
  
          worldEventData.baaull.goldenDisk = true
          itemPickUp(itemsObj.golden_Disk, 1, `I want you to have this,\n\ni trust you'll make better use of it than i will.`)
          break
        case 'duskSummoner':
          if(worldEventData.summoners.dusk) return

          worldEventData.summoners.dusk = true
          itemPickUp(itemsObj.dusk_Gem, 1, `Perhaps the chase for knowledge is what clouded my mind...\n\nWhat i needed the most was within me all along..\n\nEven in the hand of the wrong person, this will bring about good.\n\nIt must be..`)
        break
        case 'dawnSummoner':
          if(worldEventData.summoners.dawn) return

          worldEventData.summoners.dawn = true
          itemPickUp(itemsObj.dawn_Gem, 1, `Could the prideful path really bring this much shame?..\n\nMaybe what i needed the most was within me all along..\n\nTake this, i won't need it anymore.`)
          break
        case 'twilightSummoner':
          if(worldEventData.summoners.twilight) return

          worldEventData.summoners.twilight = true
          itemPickUp(itemsObj.twilight_Gem, 1, `In the end, is who i am this simple?..\n\nMaybe what i needed the most was within me all along..\n\nTake this, i won't need it anymore.`)
          break
        case 'solsticeSummoner':
          if(worldEventData.summoners.solstice) return

          worldEventData.summoners.solstice = true
          itemPickUp(itemsObj.solstice_Gem, 1, `Even within a body free of limitations, could my heart still be caged?..\n\nMaybe what i needed the most was within me all along..\n\nTake this, i won't need it anymore.`)
          break
        case 'setFinalBoss':
          player.disabled = true
          disableOWMenu.active = true
          console.log('here2')
          worldEventData.set.defeated = true
          setTimeout(() =>{
            gsap.to('#overlapping', {
              backgroundColor: 'white',
              opacity: 1,
              duration: 1.5,
              onComplete: () =>{
                gsap.to('#overlapping', {
                  backgroundColor: 'black',
                  duration: 0.5,
                  onComplete: () =>{
                    changeMapInfo({...mapsObj.bedroom}, currMap)
                    player.disabled = true
                    disableOWMenu.active = true
                    console.log('here2')
                    document.querySelector('#overlapping').style.opacity = 1
                    worldEventData.malumtehk.catchable = true
                    levelCapObj.level = 85
                    setTimeout(() => document.querySelector('#overlapping').innerText = 'For a moment, everything goes silent.', 750)
                    setTimeout(() => document.querySelector('#overlapping').innerText = `${document.querySelector('#overlapping').innerText}\n\nIt's as if a weight was lifted off of the world's shoulder.`, 5750)
                    setTimeout(() => document.querySelector('#overlapping').innerText = 'You fell warm and comfortable.', 10750)
                    setTimeout(() => document.querySelector('#overlapping').innerText = `${document.querySelector('#overlapping').innerText}\n\n${player.name}, it's time to wake up!`, 15750)
                    setTimeout(() => {
                      document.querySelector('#overlapping').innerText = ``
                      document.querySelector('#overlapping').style.opacity = 1
                      gsap.to('#overlapping', {
                        opacity: 0,
                        duration: 1,
                        onComplete: () =>{
                          player.disabled = false
                          player.interaction = null
                          disableOWMenu.active = false
                        }
                      })
                    }, 20750)
                  }
                })
              }
            })
          }, 1)
          break
        case 'entropia':
          if(worldEventData.entropia.defeated) return

          worldEventData.entropia.defeated = true
          worldEventData.beeasis.catchable = true
          itemPickUp(itemsObj.fleeting_Gem, 1, `Even within a body free of limitations, could my heart still be caged?..\n\nMaybe what i needed the most was within me all along..\n\nTake this, i won't need it anymore.`)
          break
        case 'ordo':
          if(worldEventData.ordo.defeated) return

          worldEventData.ordo.defeated = true
          worldEventData.sustiris.catchable = true
          itemPickUp(itemsObj.stasis_Gem, 1, `Even within a body free of limitations, could my heart still be caged?..\n\nMaybe what i needed the most was within me all along..\n\nTake this, i won't need it anymore.`)
          break
        case 'hermesFinalBoss': 
        if(worldEventData.hermes.finalBoss) return

          levelCapObj.level = 100

          worldEventData.hermes.finalBoss = true
          worldEventData.dahgua.catchable = true

          player.bag.set('stasis_Gem', {item: {...itemsObj.stasis_Gem}, quantity: 0})
          player.bag.set('fleeting_Gem', {item: {...itemsObj.fleeting_Gem}, quantity: 0})
          player.bag.set('corrupt_Gem', {item: {...itemsObj.corrupt_Gem}, quantity: 0})
          
          itemPickUp(itemsObj.illuminated_Gem, 1, `With this in your possession, all doors of this realm are open to you.`)
          break
      }

      if(player.interaction.info.gymLeader != undefined) {
        player.badges[player.interaction.info.gymLeader.num] = true
        worldEventData[player.interaction.info.gymLeader.name].gym = true
      }
    }

    if(
      worldEventData.vignus.defeated &&
      worldEventData.caera.defeated &&
      worldEventData.papiens.defeated &&
      worldEventData.mortdux.defeated
    ) {
      setTimeout(() =>{
        player.disabled = true
        disableOWMenu.active = true
        console.log('here2')

        gsap.to('#overlapping', {
          opacity: 1,
          backgroundColor: 'white',
          duration: 0.5, 
          onComplete: () =>{
            gsap.to('#overlapping', {
              backgroundColor: 'black',
              opacity: 1,
              duration: 0.5, 
              onComplete: () =>{
                setTimeout(() =>{ document.querySelector('#overlapping').innerText = `The energy in the region shifted again.`}, 750)
                setTimeout(() =>{ document.querySelector('#overlapping').innerText = `${document.querySelector('#overlapping').innerText}\n\nYou see a glow dazzling from scribble town's direction.`}, 2750)
                setTimeout(() =>{ document.querySelector('#overlapping').innerText = `${document.querySelector('#overlapping').innerText}\n\nThere's someone you should talk to there.`}, 4750)
                setTimeout(() =>{
                  document.querySelector('#overlapping').innerText = ``
                  gsap.to('#overlapping', {
                    opacity: 0,
                    duration: 1,
                    onComplete: () =>{
                      worldEventData.scribbleTown.murale = true
                      player.disabled = false
                      disableOWMenu.active = false
                    }
                  })
                }, 7750)
              }
            })
          }
        })
      }, 1250)
    }


  } else {
    teamOrder = [...player.team]
    // console.log(teamOrder)
    cancelAnimationFrame(animationId)
    OWAnimationRuning = false
    document.querySelector('#overworldScene').style.display = 'none'
    scenes.set('overworld', {initiated : false})
    console.log('now')
    
    setTimeout(() => flashContainerManagement('none'), 1250)
  }
}

document.querySelector('#pogemonNamingSceneInputChoiceYes').addEventListener('click', e =>{
  document.querySelector('#pogemonNamingSceneInputChoiceContainer').style.display = 'none'
})

document.querySelector('#pogemonNamingSceneInputNamingConfirmationYes').addEventListener('click', e =>{
  const pogemonNickname = switchSpaceForUnderScore(document.querySelector('#pogemonNamingSceneInputNaming').value)
  console.log(pogemonNickname)
  if(pogemonNickname == '') return
  // catchEventObj.caughtPogemon.name = document.querySelector('#pogemonNamingSceneInputNaming').textContent

  document.querySelector('#pogemonNamingSceneDisplayContainer').style.display = 'none'
  document.querySelector('#pogemonNamingSceneInputContainer').style.display = 'none'

  document.querySelector('#confirmPogemonNameButtonsContainerBackground').style.display = 'block'
  
  document.querySelector('#confirmPogemonNameTextDisplayContainer').textContent = `Are you sure that " ${switchUnderScoreForSpace(pogemonNickname)} " is the right nickname for this ${catchEventObj.caughtPogemon.pogemon.name}?`
  // document.querySelector('#pogemonNamingScene').style.display = 'none'

  document.querySelector('#confirmPogemonNameYes').textContent = 'Keep Name'
  document.querySelector('#confirmPogemonNameNo').textContent = 'Change Name'
})

document.querySelector('#confirmPogemonNameYes').addEventListener('click', e =>{
  console.log(e.target.textContent)

  if(e.target.textContent == 'Keep Name'){
    const pogemonNickname = switchSpaceForUnderScore(document.querySelector('#pogemonNamingSceneInputNaming').value)
    const confirmPogemonInfoDisplayContainer = document.querySelector('#confirmPogemonInfoDisplayContainer')
  
    confirmPogemonInfoDisplayContainer.style.display = 'flex'
    confirmPogemonInfoDisplayContainer.textContent = `Say hi to your new buddy ${switchUnderScoreForSpace(pogemonNickname)}! :)`
  
    catchEventObj.caughtPogemon.nickname = pogemonNickname
    console.log(catchEventObj)
    console.log(catchEventObj.caughtPogemon.nickname)
  
    setTimeout(() =>{
      document.querySelector('#pogemonNamingScene').style.display = 'none'
      disableOWMenu.active = false
      player.disabled = false
      interaction.initiated = false
      document.querySelector('#overlapping').style.opacity = 0.5
      gsap.to(document.querySelector('#overlapping').style, {
        opacity: 0,
        duration: 1,
        onComplete: () => player.disabled = false
      })
    }, 2500)
  } else {
    const confirmPogemonInfoDisplayContainer = document.querySelector('#confirmPogemonInfoDisplayContainer')
  
    confirmPogemonInfoDisplayContainer.style.display = 'flex'
    confirmPogemonInfoDisplayContainer.textContent = `You decided it's best not to give this ${catchEventObj.caughtPogemon.name} a nickname.`
  
    setTimeout(() =>{
      document.querySelector('#pogemonNamingScene').style.display = 'none'
      disableOWMenu.active = false
      player.disabled = false
      interaction.initiated = false
      document.querySelector('#overlapping').style.opacity = 0.5
      gsap.to(document.querySelector('#overlapping').style, {
        opacity: 0,
        duration: 1
      })
    }, 1250)
  }

})

document.querySelector('#pogemonNamingSceneInputNamingConfirmationNo').addEventListener('click', e => {
  // document.querySelector('#pogemonNamingScene').style.display = 'none'
  catchEventObj.active = false
  // player.disabled = false

  document.querySelector('#confirmPogemonNameButtonsContainerBackground').style.display = 'block'

  document.querySelector('#confirmPogemonNameTextDisplayContainer').textContent = `Are you sure you want to stop renaming this ${catchEventObj.caughtPogemon.name}?`

  document.querySelector('#pogemonNamingSceneDisplayContainer').style.display = 'none'
  document.querySelector('#pogemonNamingSceneInputContainer').style.display = 'none'

  document.querySelector('#confirmPogemonNameYes').textContent = 'Stop Renaming'
  document.querySelector('#confirmPogemonNameNo').textContent = 'Keep Renaming'
})

document.querySelector('#pogemonNamingSceneInputChoiceNo').addEventListener('click', e => {
  // document.querySelector('#pogemonNamingScene').style.display = 'none'
  catchEventObj.active = false
  // player.disabled = false

  document.querySelector('#confirmPogemonNameButtonsContainerBackground').style.display = 'block'

  document.querySelector('#confirmPogemonNameTextDisplayContainer').textContent = `Are you sure you want to stop renaming this ${catchEventObj.caughtPogemon.name}?`

  document.querySelector('#pogemonNamingSceneDisplayContainer').style.display = 'none'
  document.querySelector('#pogemonNamingSceneInputContainer').style.display = 'none'

  document.querySelector('#confirmPogemonNameYes').textContent = 'Stop Renaming'
  document.querySelector('#confirmPogemonNameNo').textContent = 'Keep Renaming'
})

document.querySelector('#confirmPogemonNameNo').addEventListener('click', e =>{
  document.querySelector('#confirmPogemonNameButtonsContainerBackground').style.display = 'none'

  document.querySelector('#pogemonNamingSceneDisplayContainer').style.display = 'grid'
  document.querySelector('#pogemonNamingSceneInputContainer').style.display = 'block'
})

document.querySelector('#manageEncounterStateButtonImg').addEventListener('click', e =>{
  if(currMap.encounters.ground == undefined) return

  if(encounterButtonState.active){
    document.querySelector('#mapEncounterContainer').style.height = 0
    document.querySelector('#manageEncounterStateButtonImg').src = 'img/downArrow.png'
  } else {
    document.querySelector('#mapEncounterContainer').style.height = 275
    document.querySelector('#manageEncounterStateButtonImg').src = 'img/upArrow.png'
  }

  encounterButtonState.active = !encounterButtonState.active
})
