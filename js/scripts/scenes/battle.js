import { movesObj } from "../../data/movesData.js"
import { mapsObj } from "../../data/mapsData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { audioObj } from "../../data/audioData.js"

import { Sprite, Pogemon } from "../../classes.js"

import { manageOverWorldState } from "./overworld.js"
import { currMap } from "../maps.js"
import { _preventActionSpam } from "../../app.js"
import { player } from "../player.js"
import { scenes } from "../canvas.js"

// after the first battle, queues start being skipped after the pogemon death ?? naniiii
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
  type: 'foe',
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
  type: 'ally',
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

let allyObj

function loadAlly(allyArg){
  if(player.team.length == 0){
    allyObj = allyArg
    allyImage.src = `../../img/pogemon/${allyObj.name}/${allyObj.name}_Back_Animation.png`
    ally = new Pogemon(allyObj, Math.pow(5, 3), false, allySprite)
    player.team.push(ally)
  } else {

    ally = player.team[0]
  }
}

function foeRNGEncounter(){
  const rng = Math.floor(Math.random() * mapsObj[`${currMap.name}`].encounters.length)
  const encounter = mapsObj[`${currMap.name}`].encounters[rng]
  return encounter
}

let battleType

function initWildEncouter() {
  battleType = 'wild'

  let foeObj = foeRNGEncounter().pogemon

  const rngLvl = Math.floor(Math.random() * (foeRNGEncounter().lvls[1] - foeRNGEncounter().lvls[0]) + foeRNGEncounter().lvls[0] + 1)

  foeImage.src = `../../img/pogemon/${foeObj.name}/${foeObj.name}_Animation.png`
  foe = new Pogemon(foeObj, Math.pow(rngLvl, 3), true, foeSprite)
}

export function initBattle(){
  scenes.set('battle', {initiated : {initiated : true}})

  loadAlly(pogemonsObj.jlissue)

  ally.position = {
    x: 300,
    y: 15
  }

  initWildEncouter()

  // let allyExp = ally.convertToPercentage(ally.exp, Math.pow(ally.lvl + 1, 3) - Math.pow(ally.lvl, 3))
  if(ally.exp === 0) allyExp = 0
  
  document.querySelector('#foeHealthBar').style.width = '100%'
  document.querySelector('#foeHealthBar').style.backgroundColor = 'green'

  document.querySelector('#allyHealthBar').style.width = `${ally.convertToPercentage(ally.hp, ally.stats.baseHp)}%`

  setBattleScene()

  renderedSprites = [foe, ally]

  battleAnimation()
}

function clearBattleScene(){
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      cancelAnimationFrame(battleAnimationId)

      movesBox.replaceChildren()
      menuDom.removeChild(dialogueInterfaceDom)
      battleSceneDom.style.display = 'none'
      optionBox.replaceChildren()

      audioObj.victory.stop()
      audioObj.map.play()

      scenes.set('battle', {initiated : false})

      manageOverWorldState(true)

      gsap.to('#overlapping', {opacity: 0})
    }
  })
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

let dialogueInterfaceDom = document.querySelector('#dialogueInterface')

const movesInterfaceDom = document.querySelector('#movesInterface')

const learnMoveInterfaceDom = document.querySelector('#learnMoveInterface')
const learnMoveDialogueDom = document.querySelector('#learnMoveDialogue')

let movesButtonArr = document.querySelectorAll('.movesButton')

let learntMove

export let moveLearning = {
  initiated: false
}

const battleSceneDom = document.querySelector('#battleScene')

function optionButtonInteraction(e) {
  if(scenes.get('battle').initiated){
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
          manageBattleState(false)
          gsap.to('#overlapping', {
            opacity: 1,
            yoyo: true,
            duration: 1,
            onComplete(){
              audioObj.flee.stop()
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
  let currentMove

  for(let i = 0; i < ally.moves.length; i++){
    if(ally.moves[i].name === `${e.target.textContent}`){
      currentMove = ally.moves[i]
    }
  }

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

function setBattlersInfo(){
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

function createEncounterMenuButtons(){
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
    optionButton.addEventListener('click', (e) => _preventActionSpam(optionButtonInteraction, e, 200), true)
  })
}

const movesBox = document.querySelector('#movesBox')
let targetedClass
let targetedInterface

function switchLearnedMoveForSelectedMove(e){
  movesButtonArr = document.querySelectorAll(`.${targetedClass}`)
  for(let i = 0; i < movesButtonArr.length; i++){
    if(e.target.textContent === Object.values(ally.moves)[i].name){

      ally.dialogue('battle', `${ally.name} forgot ${Object.values(ally.moves)[i].name} and learnt ${learntMove.name}!`)
      // if move is already in moves array dont let it change

      ally.learntMoves.push(learntMove.name)

      for(let j = 0; j < ally.moves.length; j++){
        if(ally.moves[j].name === learntMove.name){
          ally.moves.splice(j, 1)
        }
      }

      ally.moves.splice(i, 1, learntMove)

      document.querySelector(`#${targetedInterface}`).style.display = 'none'

      if(targetedInterface === 'evolutionMovesInterface'){
        document.querySelector('#evolutionInterface').style.display = 'block'
        ally.dialogue('evolution', `${ally.name} learned ${learntMove.name}!`)
      }
    }
    moveLearning.initiated = false
  }
}

function setUserMovesEvents(eventType, currMovesBox){  
  for(let i = 0; currMovesBox.childNodes.length > i; i++){

    if(ally.moves[i] === undefined) return


    if(eventType === 'attack') currMovesBox.childNodes[i].addEventListener('click', e => _preventActionSpam(attackMove, e, 200))
    if(eventType === 'switchMove') currMovesBox.childNodes[i].addEventListener('click', e => _preventActionSpam(switchLearnedMoveForSelectedMove, e, 200))

    currMovesBox.childNodes[i].textContent = ally.moves[i].name
  }
}

export function createMovesMenuButtons(state, type, event){
  let showcasedMove = [...ally.moves].splice(0, 4)

  let currMovesBox

  if(type === 'battle') {
    currMovesBox = movesBox
    targetedClass = 'movesButton'
    targetedInterface = 'learnMoveInterface'
  } else {
    currMovesBox = document.querySelector('#evolutionMovesBox')
    targetedClass = 'evolutionMovesButton'
    targetedInterface = 'evolutionMovesInterface'
  }

  if(state){
    currMovesBox.replaceChildren()
    for(let i = 0; showcasedMove.length > i; i++){
      const movesButton = document.createElement('div')
      movesButton.classList.add(targetedClass)
      
      currMovesBox.appendChild(movesButton)
    }

    movesButtonArr = document.querySelectorAll('.movesButton')
    movesButtonArr.forEach(move => move.addEventListener('mouseenter', e => movesHoverEvent(e), true))
    movesButtonArr.forEach(move => move.addEventListener('mouseleave', () => movesAwayEvent(), true))
    setUserMovesEvents(event, currMovesBox)
  } else if(!state){
    currMovesBox.replaceChildren()
  }
}

function chooseMove(e) {
  let selectedMove = movesObj[`${e.target.textContent}`]
  //should change ai move depending on decided difficulty
  let foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]

  return [selectedMove, foeRNGMove]
}

function checkSpeed(e) {
  let faster
  let slower

  const options = [ally, foe]
  const rng = Math.floor(Math.random() * 2)
  const [selectedMove, foeRNGMove] = chooseMove(e)

  const priority = {
    ally: selectedMove.priority,
    foe: foeRNGMove.priority
  }

  if(ally.stats.spd > foe.stats.spd || priority.ally > priority.foe){
    faster = ally
    slower = foe
  } else if (foe.stats.spd > ally.stats.spd || priority.foe > priority.ally) {
    faster = foe
    slower = ally
  } else if (ally.stats.spd === foe.stats.spd) {
    faster = options[rng]
    options.splice(rng, 1)
    slower = options[0]
  }

  let fasterMove = selectedMove
  let slowerMove = foeRNGMove

  if(faster.isEnemy){
    fasterMove = foeRNGMove
    slowerMove = selectedMove
  }

  return [faster, slower, fasterMove, slowerMove]
}

function learnMoveOptionEvent(e, move, type){
  learnMoveMenu(false)

  let movesInterface

  if(type === 'battle') movesInterface = movesInterfaceDom
  else {
    movesInterface = document.querySelector('#evolutionMovesInterface')
    document.querySelector('#evolutionLearnMovesInterface').style.display = 'none'
  }

  if(e.target.textContent == 'yes'){
    moveLearning.initiated = true
    createMovesMenuButtons(false, type)
    createMovesMenuButtons(true, type, 'switchMove')
    movesInterface.style.display = 'grid'
  } else if(e.target.textContent == 'no'){
    if(type === 'battle') {
      document.querySelector('#learnMoveInterface').style.display = 'none'
    } else {
      document.querySelector('#evolutionLearnMovesInterface').style.display = 'none'
    }
    
    ally.dialogue(type, `${ally.name} gave up on learning ${move.name}.`)

    ally.learntMoves.push(move.name)

    for(let i = 0; i < ally.learntMoves.length; i++){
      if(ally.moves[i].name === learntMove.name){
        ally.moves.splice(i, 1)
      }
    }

    if(ally.moves.length <= 4){
      // send next 'mon or finish battle
      return
    }
  }
}

export function learnMoveMenu(type, state) {
  let learnMoveOptionButtonContainer
  if(type === 'battle') learnMoveOptionButtonContainer = document.querySelector('#learnMoveOptionButtonContainer')
  else learnMoveOptionButtonContainer = document.querySelector('#evolutionLearnMoveOptionButtonContainer')

  if(state){  
    const learnMoveOptions = ['yes', 'no']
    for(let i = 0; i < learnMoveOptions.length; i++){
      const learnMoveOptionButton = document.createElement('div')
      const learnMoveOptionButtonText = document.createElement('div')

      learnMoveOptionButton.classList.add('learnMoveOptionButton')
      learnMoveOptionButtonText.classList.add('learnMoveOptionButtonText')

      learnMoveOptionButtonText.textContent = learnMoveOptions[i]

      learnMoveOptionButton.addEventListener('click', e => learnMoveOptionEvent(e, learntMove, type))
      
      learnMoveOptionButton.appendChild(learnMoveOptionButtonText)
      learnMoveOptionButtonContainer.appendChild(learnMoveOptionButton)
    }
  } else if(!state) {
    learnMoveOptionButtonContainer.replaceChildren()
  }
}

export function manageLvlUpDisplay(type, oldStats, queue, prevLvl){
  if(type === 'battle'){
    queue.push(() => ally.onLvlUp())
    queue.push(() => ally.showStatWindow(oldStats, prevLvl))
  } else queue.push(() => ally.showStatWindow(oldStats))

  queue.push(() => ally.showStatIncrease())
  queue.push(() => ally.hideStatIncrease())
}

export function manageLearnedMoves(ally, queue, type){
  //compares already known moves to new moves learned passed by the class method
  let oldMoves = [...ally.moves]
  let newMoves = ally.learnMoveOnLvlUp()

  let interfaceDom
  let dialogueDom
  
  switch(type){
    case 'battle':
      interfaceDom = learnMoveInterfaceDom
      dialogueDom = learnMoveDialogueDom
      break
    case 'evolution':
      interfaceDom = document.querySelector('#evolutionLearnMovesInterface')
      dialogueDom = document.querySelector('#evolutionLearnMoveDialogue')
      break
  }

  for(let i = 0; i < newMoves.length; i++){

    learntMove = newMoves[i]

    //if pogemon has less than 4 moves give it moves without user input
    if(oldMoves.length + i < 4) {
      queue.push(() => {
        ally.learntMoves.push(newMoves[i].name)
        ally.dialogue(type, `${ally.name} learned ${newMoves[i].name}!`)
      })
    } else {
      // working here
      //if the move the pogemon is trying to learn is already a move he learned previously, does not learn it
      if(Object.values(ally.learntMoves).includes(newMoves[i].name)) return
      queue.push(() => ally.dialogue(type, `${ally.name} is trying to learn ${newMoves[i].name}!`))
      queue.push(() =>{
        // open window that asks if the user wants to change a selected move with the new learned move
        learnMoveMenu('battle', true)
        document.querySelector('#evolutionInterface').style.display = 'none'
        interfaceDom.style.display = 'grid'
        dialogueDom.textContent = `Change one of ${ally.name}'s moves for ${learntMove.name}?`
      })
    }
  }
}

let f

export function passPuff(func){
  // fires in evolutions.js so i can grab the evo function after it's been set instead of when the file loads
  f = func
}

function manageEvolution(f){
  //stops battle and initiates the evolution scene instead of the normal way
  queue.push(() => {
    cancelAnimationFrame(battleAnimationId)
    f(true, ally)
  })
}

function attackMove(e) {
  let currMove
  
  for(let i = 0; i < ally.moves.length; i++){
    if(ally.moves[i].name === `${e.target.textContent}`){
      currMove = ally.moves[i]
      break
    }
  }

  if(currMove.pp === 0){
    // change pp digits for red
  }

  if(currMove.pp > 0){
// gonna need to reorganize if i put double battles at some point
  // should maybe put all the battle management in class with attack method
  const [faster, slower, fasterMove, slowerMove] = checkSpeed(e)

  function attackLanded(move, reload){
    let accRNG
    if(reload) accRNG = Math.floor(Math.random() * 100)
    if(accRNG < move.acc) return true
  }

  let critHit = false

  function critLanded(){
    const critRNG = Math.floor(Math.random() * 100)
    const critThreshold = 16
    if(critRNG <= critThreshold){
      critHit = true
      queue.push(() => faster.dialogue('battle', `${faster.name} landed a critical hit!!!`))
    }
  }

  const lvlBeforeExpGained = ally.lvl

  function manageFaintingEvent(target){
    const oldStats = ally.stats
    const prevLvl = ally.lvl

    ally.expGain(target, battleType)

    if(lvlBeforeExpGained < ally.lvl) {
      //all queue events happen here
      manageLvlUpDisplay('battle', oldStats, queue, prevLvl)
      manageLearnedMoves(ally, queue, 'battle')

      if(ally.pogemon.evo.lvl <= ally.lvl) manageEvolution(f)
      else queue.push(() => manageBattleState(false))
    } else queue.push(() => manageBattleState(false))
  }

  function faintEvent(target){
    if(target.isEnemy){
      queue.push(() => {
        manageFaintingEvent(target)
      })
    } else queue.push(() => manageBattleState(false))
  }
  
  if(attackLanded(fasterMove, true)) {
    critLanded()
    faster.move({move: fasterMove, recipient: slower, renderedSprites, critHit})
  } else faster.miss()

  if(slower.hp <= 0){
    queue.push(() =>{
      slower.faint(scenes)
      audioObj.battle.stop()
      audioObj.victory.play()
      faintEvent(slower)
    })

    return
  }
  
  queue.push(() =>{

    if(attackLanded(slowerMove, true)) {
      critLanded()
      slower.move({move: slowerMove, recipient: faster, renderedSprites, critHit})
    } else slower.miss()

    if(faster.hp <= 0){
      faster.faint(battle)
      audioObj.battle.stop()
      audioObj.victory.play()
      faintEvent(faster)

      return
    }
  })}
}

function spendQueue(){
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    dialogueInterfaceDom.style.display = 'none'
    if(scenes.get('battle').initiated) encounterInterfaceDom.style.display = 'grid'
  }
}

const menuDom = document.querySelector('#menu')

function setBattleScene(){
  battleSceneDom.style.display = 'grid'
  encounterInterfaceDom.style.display = 'grid'
  createMovesMenuButtons(true, 'battle', 'attack')

  createEncounterMenuButtons()
  setBattlersInfo()

  dialogueInterfaceDom = document.createElement('div')
  menuDom.append(dialogueInterfaceDom)
  dialogueInterfaceDom.setAttribute('id','dialogueInterface')
  dialogueInterfaceDom.style.display = 'none'
  dialogueInterfaceDom.addEventListener('click', e => _preventActionSpam(spendQueue, e, 200), true)
  dialogueInterfaceDom.textContent = ''  
}

export function manageBattleState(state) {
  if(state) initBattle()
  else clearBattleScene()
}