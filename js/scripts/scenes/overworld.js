// move things around

import { printImages, scenes } from '../canvas.js'
import { playerMovement, player } from '../player.js'
import { generateMapData } from '../maps.js'
import { _preventActionSpam } from '../../app.js'
import { faintedTriggered, manageBattleState, moveLearning, moveProcess } from './battle.js'
import { manageTeamState } from './team.js'
import { itemUsed, manageBagState } from './bag.js'
import { manageStatsState } from './stats.js'
import { managePogedexState } from './pogedex.js'
import { manageTrainerState } from './trainer.js'
import { mapsObj } from '../../data/mapsData.js'

//

const frameRate = 61
const frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

let [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, FG] = generateMapData()
let movables = [map, ...boundaries, ...battleZones, ...changeMap,  ...eventZones, ...trainerSpritesArr]

let animationId

const menu = {
  initiated: false
}

const overworldMenuDom = document.querySelector('#overworldMenu')

export function switchMap(nextMapInfo){
  [background, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr, FG] = generateMapData(nextMapInfo)
  movables = [map, ...boundaries, ...battleZones, ...changeMap, ...eventZones, ...trainerSpritesArr]

  gsap.to('#overlapping', {
    opacity: 0,
    duration: 0.4,
    onComplete(){
      player.disabled = false
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
  const overworldSceneDom = document.querySelector('#overworldScene').style
  const menuDom = document.querySelector('#overworldMenu').style
  document.querySelector('#overworldSceneContainer').style.display = 'flex'
  const menuSectionDomArr = document.querySelectorAll('.overworldMenuSections')

  player.disabled = !state
  menu.initiated = !state

  if(menu.initiated) {
    manageMenuSections(menu.initiated)

    menuDom.height = '0%'
    menuDom.width = '0%'

    document.querySelector('#overworldMenu').style.display = 'grid'

    gsap.to('#overlapping', {
      opacity: 0.85,
      duration: 0.25,
    })

    menuSectionDomArr.forEach(menuSection =>{
      gsap.to(menuSection,{
        fontSize: 24 + 'px',
        duration: 0.25,
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
    })
    menuSectionDomArr.forEach(menuSection =>{
      gsap.to(menuSection,{
        fontSize: 0 + 'px',
        duration: 0.25,
      })
    })
    gsap.to('#overlapping', {
      opacity: 0,
      duration: 0.3,
      onComplete(){
        //PROBLEM HERE
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
          gsap.to('#overlapping', {opacity: 0})
        }
      })
      break
    case 'battle':
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageBattleState(true)
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
      manageMenuState(menu.initiated)
    }

    if(scenes.get('battle').initiated){
      if(moveProcess) return
      encounterInterfaceDom.style.display = 'grid'
      movesInterfaceDom.style.display = 'none'
    } else if (moveLearning.initiated) {
      dialogueInterfaceDom.style.display = 'block'
      learnMoveInterfaceDom.style.display = 'none'
      ally.moves.splice(movesButtonArr.length, 1)
      ally.dialogue('battle', `${ally.name} gave up on learning ${learntMove.name}.`)
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
    
  } else if(e.key == '`'){
    console.log(player)
  }
}

window.addEventListener('keydown', (e) => _preventActionSpam(escapeKeyEventOptions, e, 500), true)

let OWAnimationRuning = false

const overWorldAnimation = timeSpent =>{
  animationId = requestAnimationFrame(overWorldAnimation)
  OWAnimationRuning = true

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  printImages(background, FG, map, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr)
  playerMovement(animationId, movables, boundaries, battleZones, changeMap, eventZones, trainerSpritesArr)
}

export function manageOverWorldState(state){
  if(state) {
    if(OWAnimationRuning) return
    document.querySelector('#overworldDialogueContainer').style.display = 'none'
    document.querySelector('#overworldScene').style.display = 'block'
    overWorldAnimation()
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