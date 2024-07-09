// move things around

import { printImages, scenes } from '../canvas.js'
import { playerMovement, player, interaction, lastDirection, pogemartInteraction } from '../player.js'
import { generateMapData, currMap, pogecenterReturnInfo, worldEventData } from '../maps.js'
import { _preventActionSpam } from '../../app.js'
import { faintedTriggered, manageBattleState, moveLearning, moveProcess, queue as battleQueue, learnMoveOptionEvent, learningMove, learningType, learningTarget, evoArr } from './battle.js'
import { manageTeamState } from './team.js'
import { itemUsed, manageBagState } from './bag.js'
import { manageStatsState } from './stats.js'
import { managePogedexState } from './pogedex.js'
import { timeObj, manageTrainerState } from './trainer.js'
import { mapsObj } from '../../data/mapsData.js'
import { managePcState, pc } from './pc.js'
import { loadData, setSaveData } from '../../save.js'
import { audioObj, volumeValues } from '../../data/audioData.js'
import { queue as evoQueue, queue } from './evolution.js'
import { typesObj } from '../../data/typesData.js'

const frameRate = 60
const frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

export let [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let movables

async function setMapData(){
  [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData()

  movables = [map, ...boundaries, ...battleZones, ...changeMap, ...eventZones, ...trainerSpritesArr, ...NPCSpritesArr, ...itemSpritesArr, ...obstacleSpritesArr]
}

await setMapData()

const data = await loadData()

let animationId

const menu = {
  initiated: false
}

const overworldMenuDom = document.querySelector('#overworldMenu')

let nextMapSaveInfo
let prevMap
let firstLoad = true

function startOverWorldWeather(){
  const OWSceneContainer = document.querySelector('#weatherContainer')

  if(mapsObj[currMap.name].weather == undefined) OWSceneContainer.style.backgroundColor = `transparent`
  else OWSceneContainer.style.backgroundColor = `#${typesObj[mapsObj[currMap.name].weather.element].color}${mapsObj[currMap.name].weather.opacity}`
}

let pogelocationBackUp

export async function switchMap(nextMapInfo, preMapInfo){
  if(nextMapInfo != undefined) {
    if(nextMapInfo.name != 'undefined'){
      [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData(nextMapInfo)
      prevMap = preMapInfo
    }
  }

  console.log(nextMapInfo)
  console.log(preMapInfo)
  console.log(pogecenterReturnInfo)

  if(nextMapInfo.name == 'pogemart' || nextMapInfo.name == 'pogecenter'){
    pogelocationBackUp = preMapInfo
  }

  if(preMapInfo.name == 'pogemart' || preMapInfo.name == 'pogecenter') {
    // vvvv wtf?????? why if true? delaying something????? vvvv
    if(true){

      if(data != null){
        if(firstLoad){
          firstLoad = false
          if(data.nextMapInfo.name != null){
            pogecenterReturnInfo.name = data.nextMapInfo.name
            pogecenterReturnInfo.spawnPosition = data.nextMapInfo.spawnPosition
          }
        } else {
          pogecenterReturnInfo.name = prevMap.name
          pogecenterReturnInfo.spawnPosition = prevMap.position
          prevMap = undefined
        }
      }

      pogecenterReturnInfo.spawnPosition.y = pogecenterReturnInfo.spawnPosition.y - 15
    }

    if(pogecenterReturnInfo.name == 'pogemart' || pogecenterReturnInfo.name == 'pogecenter') {
      pogecenterReturnInfo.name = pogelocationBackUp.name
      pogecenterReturnInfo.spawnPosition = pogelocationBackUp.position

      pogecenterReturnInfo.spawnPosition.y = pogecenterReturnInfo.spawnPosition.y - 15
    }

    [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, FG] = await generateMapData(pogecenterReturnInfo)

    pogecenterReturnInfo.name = null
    pogecenterReturnInfo.spawnPosition.x = null
    pogecenterReturnInfo.spawnPosition.y = null
  }

  // if(typeof obstacleSpritesArr != 'array') obstacleSpritesArr = []

  movables = [map, ...boundaries, ...battleZones, ...changeMap, ...eventZones, ...trainerSpritesArr, ...NPCSpritesArr, ...itemSpritesArr, ...obstacleSpritesArr]

  gsap.to('#overlapping', {
    opacity: 0,
    duration: 0.4,
    onComplete(){
      player.disabled = false
      nextMapSaveInfo = nextMapInfo
      //map changed here
      startOverWorldWeather()

      if(nextMapInfo.name == 'pogemart' || nextMapInfo.name == 'pogecenter'){
        pogecenterReturnInfo.name = preMapInfo.name
        pogecenterReturnInfo.spawnPosition.x = preMapInfo.position.x
        pogecenterReturnInfo.spawnPosition.y = preMapInfo.position.y
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

document.querySelector('#optionsMenuDelete').addEventListener('click', e =>{
  alert('Save File Deleted!')
  localStorage.clear()
})

function manageOptionMenuState(state){
  const optionsMenuContainer = document.querySelector("#optionsMenuContainer").style

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
      manageOverWorldState(false)
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
      manageOverWorldState(false)
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
      manageOverWorldState(false)
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
      manageOverWorldState(false)
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
      alert('Saved Succesfully')
      let teamMovesInfo = []
      let teamLearntMovesInfo = []
      player.team.forEach(pogemon =>{
        let pogemonLearntMoves = []
        pogemon.learntMoves.forEach(learntMove =>{
          pogemonLearntMoves.push(learntMove)
        })
        teamLearntMovesInfo.push(pogemonLearntMoves)

        let pogemonMovesInfo = []
        pogemon.moves.forEach(move =>{
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

      setSaveData({
        playerInfo: {
          player,
          teamMovesInfo,
          teamLearntMovesInfo
        },
        currMapName: currMap.name,
        spawnPosition: {x: map.position.x, y: map.position.y},
        mapsObjState: mapsObj,
        nextMapInfo,
        interactionFlags: interaction.flags,
        volumeValues,
        bag: bagSave,
        pc: pc,
        timeObj,
        worldEventData
      })
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
  if(optionMenuState) return

  const overworldSceneDom = document.querySelector('#overworldScene').style
  const menuDom = document.querySelector('#overworldMenu').style
  const menuSectionDomArr = document.querySelectorAll('.overworldMenuSections')
  const OWSceneContainer = document.querySelector('#overworldSceneContainer')

  player.disabled = !state
  menu.initiated = !state

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

function transitionScenes(prevScene){
  switch(prevScene){
    case 'overworld':
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageOverWorldState(true)
          gsap.to('#overlapping', {
            opacity: 0,
            onComplete: () =>{
              player.disabled = false
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

        player.team[0].dialogue('overworld', 'Have a good day! :D')

        queue.push(() =>{
          player.disabled = false
        })
        return
      }

      if(scenes.get('pickingItem').initiated == true) return
      manageMenuState(menu.initiated)
    }

    if(scenes.get('battle').initiated){
      if(!moveProcess) encounterInterfaceDom.style.display = 'grid'
      if(moveLearning.initiated) learnMoveOptionEvent(null, learningMove, learningType, learningTarget)
    }

    if(scenes.get('evolution')){
      if(moveLearning.initiated) learnMoveOptionEvent(null, learningMove, learningType, learningTarget)
    }

    if(scenes.get('team').initiated){
      if(faintedTriggered.active) return
      manageTeamState(false, prevScene)
      transitionScenes(prevScene)
    }

    if(scenes.get('bag').initiated){
      if(itemUsed.used == true) return
      manageBagState(false)
      transitionScenes(prevScene)
    }

    if(scenes.get('stats').initiated){
      if(scenes.get('overworld').initiated) return
      manageStatsState(false, null, prevScene)
    }

    if(scenes.get('pogedex').initiated){
      managePogedexState(false)
      transitionScenes('overworld')
    }

    if(scenes.get('trainer').initiated){
      manageTrainerState(false)
      transitionScenes('overworld')
    }

    if(scenes.get('pc').initiated){
      gsap.to('#overlapping',{
        opacity: 1,
        onComplete: () =>{
          managePcState(false)
          transitionScenes('overworld')
          gsap.to('#overlapping',{
            opacity: 0,
          })
        }
      })
    }
  } else if(e.key == '`'){
    console.log(player)
  }
}

window.addEventListener('keydown', (e) => _preventActionSpam(escapeKeyEventOptions, e, 500), true)

let OWAnimationRuning = false

let OWWeatherParticles = []

function manageWeatherParticles(weather){
  if(weather == undefined) {
    OWWeatherParticles = []
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

  if(OWWeatherParticles.length > weather.maxParticleCount) OWWeatherParticles.shift()

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
        color: '#ffd96617',
        rotation: 1
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
      }
      break
  }

  OWWeatherParticles.push(particle)
}

const overWorldAnimation = timeSpent =>{
  animationId = requestAnimationFrame(overWorldAnimation)
  OWAnimationRuning = true

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  if(currMap == undefined) return

  manageWeatherParticles(mapsObj[currMap.name].weather)
  printImages(background, FG, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, NPCSpritesArr, itemSpritesArr, obstacleSpritesArr, OWWeatherParticles)
  playerMovement(animationId, movables, boundaries, battleZones, changeMap, eventZones)
}

export function manageOverWorldState(state){
  if(state) {
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
      if(prevScene == 'battle')
      document.querySelector('#overworldDialogueContainer').style.display = 'flex'
      player.team[0].dialogue('overworld', "Congratulations, you've earned your first badge!")
    }

    overWorldAnimation()
    startOverWorldWeather()
    scenes.set('overworld', {initiated : true})
    player.disabled = false
    menu.initiated = false
    overworldMenuDom.replaceChildren()
  }
  else {
    cancelAnimationFrame(animationId)
    OWAnimationRuning = false
    document.querySelector('#overworldScene').style.display = 'none'
    scenes.set('overworld', {initiated : false})
  }
}