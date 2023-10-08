// move things around

import { printImages, scenes } from '../canvas.js'
import { playerMovement, player } from '../player.js'
import { generateMapData } from '../maps.js'
import { _preventActionSpam } from '../../app.js'
import { moveLearning } from './battle.js'

const frameRate = 60
const frameRateInMilliseconds = 1000 / frameRate
let lastFrameSpent = 0

const {background, map, boundaries, battleZones, FG} = generateMapData()
const movables = [map, ...boundaries, ...battleZones]

let animationId

const menu = {
  initiated: false
}

function initOverworldMenu(){
  const overworldMenuDom = document.querySelector('#overworldMenu')
  let options = ['pogedex', 'team', 'bag', 'trainer', 'save', 'options']
  for(let i = 0; i < options.length; i++){
    const sectionDom = document.createElement('div')
    sectionDom.classList.add('overworldMenuSections')
    sectionDom.addEventListener('click', e => overworldMenuClickEvent(e))
    sectionDom.textContent = options[i]
    overworldMenuDom.appendChild(sectionDom)
  }
}

function overworldMenuClickEvent(e){
  console.log(e.target.textContent)
}

function manageMenuSections(state){
  const overworldMenuDom = document.querySelector('#overworldMenu')
  if(state){
    initOverworldMenu()
  } else {
    overworldMenuDom.replaceChildren()
  }
}

function manageMenuState(state){
  const overworldSceneDom = document.querySelector('#overworldScene').style
  const menuDom = document.querySelector('#overworldMenu').style
  const menuSectionDomArr = document.querySelectorAll('.overworldMenuSections')

  player.disabled = !state
  menu.initiated = !state

  if(menu.initiated) {
    manageMenuSections(menu.initiated)

    menuDom.height = '0%'
    menuDom.width = '0%'

    overworldSceneDom.display = 'flex'

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
        overworldSceneDom.display = 'none'
        manageMenuSections(menu.initiated)
      }
    })
  }
}

function escapeKeyEventOptions(e) {
  if(e.key === 'Escape'){
    if(scenes.get('overworld').initiated){
      manageMenuState(menu.initiated)
    }

    if(scenes.get('battle').initiated){
      encounterInterfaceDom.style.display = 'grid'
      movesInterfaceDom.style.display = 'none'
    } else if (moveLearning.initiated) {
      dialogueInterfaceDom.style.display = 'block'
      learnMoveInterfaceDom.style.display = 'none'
      ally.moves.splice(movesButtonArr.length, 1)
      ally.dialogue('battle', `${ally.name} gave up on learning ${learntMove.name}.`)
    }
  }
}

window.addEventListener('keydown', (e) => _preventActionSpam(escapeKeyEventOptions, e, 300), true)

const overWorldAnimation = timeSpent =>{
  animationId = requestAnimationFrame(overWorldAnimation)

  if(timeSpent - lastFrameSpent < frameRateInMilliseconds) return
  lastFrameSpent = timeSpent

  printImages(background, FG, map, boundaries, battleZones)
  playerMovement(animationId, movables, boundaries, battleZones)
}

export function manageOverWorldState(state){
  if(state) {
    overWorldAnimation()
    scenes.set('overworld', {initiated : true})
  }
  else {
    cancelAnimationFrame(animationId)
    scenes.set('overworld', {initiated : false})
  }
}