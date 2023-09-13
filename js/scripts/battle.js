import { movesObj } from "../data/movesData.js"
import { mapsObj } from "../data/mapsData.js"
import { pogemonsObj } from "../data/pogemonData.js"
import { audioObj } from "../data/audioData.js"

import { Sprite, Pogemon } from "../classes.js"

import { overWorldAnimation } from "./animations.js"
import { currMap } from "./maps.js"
import { generatePlayer, player } from "./player.js"
import { _preventActionSpam } from "../app.js"

export const battle = {
  initiated: false
}

// after the first battle, queues start being skipped after the pogemon death
const queue = []

const battleBackgroundImage = new Image()
battleBackgroundImage.src = '../../img/battleBackground/battleBackground.png'

const battleBackground = new Sprite({
  type: 'battleBackground',
  frames: {
    max: 1,
    hold: 0
  },
  position: {
    x:0,
    y:0
  },
  img: battleBackgroundImage
})

const foeImage = new Image()
const foeSprite = new Sprite({
  type: 'foeBattleSprite',
  position:{
    x:1415,
    y:15
  },
  frames: {
    max: 4,
    hold: 100
  },
  img: foeImage,
  animate: true
})

const allyImage = new Image()
const allySprite = new Sprite({
  type: 'allyBattleSprite',
  position:{
    x:300,
    y:15
  },
  frames: {
    max: 4,
    hold: 100
  },
  img: allyImage,
  animate: true
})

let foe
let ally

let renderedSprites

let allyObj = pogemonsObj.disso
allyImage.src = `../../img/pogemon/${allyObj.name}/${allyObj.name}_Back_Animation.png`
ally = new Pogemon(allyObj, 5, false, allySprite)

function foeRNGEncounter(){
  let rng = Math.floor(Math.random() * mapsObj[`${currMap.name}`].encounters.length)
  let encounter = mapsObj[`${currMap.name}`].encounters[rng]
  return encounter
}

function initWildEncouter() {
  let foeObj = foeRNGEncounter()

  foeImage.src = `../../img/pogemon/${foeObj.name}/${foeObj.name}_Animation.png`
  foe = new Pogemon(foeObj, 5, true, foeSprite)
}

export function initBattle(){
  battle.initiated = true

  initWildEncouter()

  document.querySelector('#foeHealthBar').style.width = '100%'
  document.querySelector('#foeHealthBar').style.backgroundColor = 'green'

  renderedSprites = [foe, ally]
}

let battleAnimationId

export function battleAnimation(){
  battleAnimationId = window.requestAnimationFrame(battleAnimation)
  battleBackground.draw()

  renderedSprites.forEach(sprite =>{
    sprite.draw()
  })
}

const encounterInterfaceDom = document.querySelector('#encounterInterface')
const textBox = document.querySelector('#textBox')

const movesInterfaceDom = document.querySelector('#movesInterface')

function returnToEncounterInterface(e) {
  if(e.key === 'Escape'){
    if(battle.initiated){
      encounterInterfaceDom.style.display = 'grid'
      movesInterfaceDom.style.display = 'none'
    }
  }
}

window.addEventListener('keydown', (e) => _preventActionSpam(returnToEncounterInterface, e), true)

const battleSceneDom = document.querySelector('#battleScene')
let dialogueInterfaceDom = document.querySelector('#dialogueInterface')

function optionButtonInteraction(e) {
  if(battle.initiated){
    switch(e.target.textContent){
      case 'Fight':
        encounterInterfaceDom.style.display = 'none'
        movesInterfaceDom.style.display = 'grid'
        break
      case 'Switch':
        textBox.textContent = e.target.textContent
        break
      case 'Items':
        textBox.textContent = e.target.textContent
        break
      case 'Flee':
        textBox.textContent = e.target.textContent
        encounterInterfaceDom.style.display = 'none'
        movesInterfaceDom.style.display = 'none'
        dialogueInterfaceDom.style.display = 'block'
        dialogueInterfaceDom.textContent = 'You fleed'
        audioObj.flee.play()
        // need to put rng check based on speed stat
        queue.push(() =>{
          battle.initiated = false
          gsap.to('#overlapping', {
            opacity: 1,
            yoyo: true,
            duration: 1,
            onComplete(){
              manageBattleState()
              audioObj.flee.stop()
              audioObj.map.play()
              overWorldAnimation()
              gsap.to('#overlapping', {
                opacity: 0,
                duration: 0.4
              })
            }
          })
        })
        break
    }
  }
}

const powDom = document.querySelector('#moveDescPow')
const accDom = document.querySelector('#moveDescAcc')
const ppDom = document.querySelector('#moveDescPP')
const elementDom = document.querySelector('#moveDescElement')
const typeDom = document.querySelector('#moveDescType')

function movesHoverEvent(e){
  let currentMove = movesObj[`${e.target.textContent}`]
  powDom.textContent = `Pow : ${currentMove.pow}`
  accDom.textContent = `Acc : ${currentMove.acc}`
  ppDom.textContent = `PP : ${currentMove.pp}`
  elementDom.textContent = `Element : ${currentMove.element}`
  typeDom.textContent = `Type : ${currentMove.type}`
}

function movesAwayEvent(){
  powDom.textContent = `Pow : --`
  accDom.textContent = `Acc : --`
  ppDom.textContent = `PP : --`
  elementDom.textContent = `Element : --`
  typeDom.textContent = `Type : --`
}

const foeNameDom = document.querySelector('#foeName')
const foeLvlDom = document.querySelector('#foeLvl')
const foeHpDom = document.querySelector('#foeHp')

const allyNameDom = document.querySelector('#allyName')
const allyLvlDom = document.querySelector('#allyLvl')
const allyHpDom = document.querySelector('#allyHp')

function setBattlersInfo() {
  foeNameDom.textContent = foe.name
  foeLvlDom.textContent = `Lv ${foe.lvl}`
  foeHpDom.textContent = `${foe.hp}/${foe.stats.baseHp}`

  allyNameDom.textContent = ally.name
  allyLvlDom.textContent = `Lv ${ally.lvl}`
  allyHpDom.textContent = `${ally.hp}/${ally.stats.baseHp}`
}

const optionBox = document.querySelector('#optionBox')
const options = ['Fight', 'Switch', 'Items', 'Flee']

let optionButtonsArr

function createEncounterMenuButtons() {
  for(let i = 0; 4 > i; i++){
    const optionButton = document.createElement('div')
    optionButton.classList.add('optionButton')
    const optionText = document.createElement('div')
    optionText.classList.add('optionText')
    optionText.textContent = options[i]
    optionButton.appendChild(optionText)
    optionBox.appendChild(optionButton)
  }
  optionButtonsArr = document.querySelectorAll('.optionButton')
  optionButtonsArr.forEach(optionButton =>{
    optionButton.addEventListener('click', (e) => _preventActionSpam(optionButtonInteraction, e), true)
  })
}

let movesButtonArr = document.querySelectorAll('.movesButton')

function setUserMoves(){
  movesButtonArr = document.querySelectorAll('.movesButton')
  for(let i = 0; movesButtonArr.length > i; i++){
    if(ally.moves[i] === undefined) return
    movesButtonArr[i].addEventListener('click', e => _preventActionSpam(attackMove, e))
    movesButtonArr[i].textContent = ally.moves[i].name
  }
}

const movesBox = document.querySelector('#movesBox')

function createMovesMenuButtons() {
  for(let i = 0; 4 > i; i++){
    const movesButton = document.createElement('div')
    movesButton.classList.add('movesButton')
    movesBox.appendChild(movesButton)
    if(ally.moves[i] !== undefined) movesButton.textContent = ally.moves[i].name
  }
  movesButtonArr.forEach(move => move.addEventListener('mouseenter', e => movesHoverEvent(e), true))
  movesButtonArr.forEach(move => move.addEventListener('mouseleave', () => movesAwayEvent(), true))
  setUserMoves()
}

function attackMove(e) {
  const selectedMove = movesObj[`${e.target.textContent}`]
  const foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]
  //put speed check here probably
  ally.attack({move: selectedMove, recipient: foe, renderedSprites})

  if(foe.hp <= 0){
    queue.push(() =>{
      foe.faint(battle)
      audioObj.battle.stop()
      audioObj.victory.play()
      queue.push(() =>{
        gsap.to('#overlapping', {
          opacity: 1,
          onComplete: () =>{
            manageBattleState()
            audioObj.victory.stop()
            audioObj.map.play()
            overWorldAnimation()
            gsap.to('#overlapping', {
              opacity: 0
            })
          }
        })
      })
    })

    return
  }

  queue.push(() =>{
    foe.attack({move: foeRNGMove, recipient: ally, renderedSprites})

      if(ally.hp <= 0){
        ally.faint(battle)
        audioObj.battle.stop()
        audioObj.victory.play()
        queue.push(() =>{
          gsap.to('#overlapping', {
            opacity: 1,
            onComplete: () =>{
              manageBattleState()
              audioObj.victory.stop()
              audioObj.map.play()
              overWorldAnimation()
              gsap.to('#overlapping', {
                opacity: 0
              })
            }
          })
        })
  
      return
    }
  })
}

function spendQueue(){
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    dialogueInterfaceDom.style.display = 'none'
    if(battle.initiated) encounterInterfaceDom.style.display = 'grid'
  }
}

const menuDom = document.querySelector('#menu')

function setBattleScene(){
  battleSceneDom.style.display = 'grid'
  encounterInterfaceDom.style.display = 'grid'
  createMovesMenuButtons()
  createEncounterMenuButtons()
  setBattlersInfo()

  dialogueInterfaceDom = document.createElement('div')
  menuDom.append(dialogueInterfaceDom)
  dialogueInterfaceDom.setAttribute('id','dialogueInterface')
  dialogueInterfaceDom.style.display = 'none'
  dialogueInterfaceDom.addEventListener('click', e => _preventActionSpam(spendQueue, e), true)
  dialogueInterfaceDom.textContent = ''  
}

function removeBattleScene() {
  cancelAnimationFrame(battleAnimationId)
  movesBox.replaceChildren()
  menuDom.removeChild(dialogueInterfaceDom)
  battleSceneDom.style.display = 'none'
  optionBox.replaceChildren()
}

export function manageBattleState() {
  if(battle.initiated){
    initBattle()
    setBattleScene()
    battleAnimation()
  } else {
    removeBattleScene()
    window.cancelAnimationFrame(battleAnimationId)
    audioObj.battle.stop()
  }
}