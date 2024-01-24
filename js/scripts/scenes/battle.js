import { movesObj } from "../../data/movesData.js"
import { mapsObj } from "../../data/mapsData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { audioObj } from "../../data/audioData.js"
import { itemsObj } from "../../data/itemsData.js"

import { Sprite, Pogemon } from "../../classes.js"

import { manageOverWorldState, prevScene } from "./overworld.js"
import { currMap } from "../maps.js"
import { _preventActionSpam } from "../../app.js"
import { player } from "../player.js"
import { scenes } from "../canvas.js"
import { teamEvent, manageTeamState } from "./team.js"
import { itemUsed, manageBagState } from "./bag.js"
import { manageEvolutionState } from "./evolution.js"
import { pc } from "./pc.js"

// after the first battle, queues start being skipped after the pogemon death ?? naniiii
const queue = []
let queueEnabled = true

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

let foe
let ally

let renderedSprites

function loadAlly(){
  ally = player.team[0]
  ally.img.src = pogemonsObj[`${ally.name}`].sprites.backSprite
  ally.width = 646
  console.log(ally.width)
  document.querySelector("#allyGenderImg").src = `../../../img/${ally.gender}_icon.png`
}

function foeRNGEncounter(){
  const rng = Math.floor(Math.random() * mapsObj[`${currMap.name}`].encounters.length)
  const encounter = mapsObj[`${currMap.name}`].encounters[rng]
  return encounter
}

let battleType

function initWildEncouter(){
  enemyTrainer = undefined

  battleType = 'wild'

  let foeObj = foeRNGEncounter().pogemon

  const rngLvl = Math.floor(Math.random() * (foeRNGEncounter().lvls[1] - foeRNGEncounter().lvls[0]) + foeRNGEncounter().lvls[0] + 1)

  const foeImage = new Image()
  const foeSprite = new Sprite({
    type: 'pogemon',
    position:{
      x:1415,
      y:15
    },
    frames: {
      max: 4,
      hold: 25
    },
    img: foeImage,
    animate: true
  })

  foeImage.src = foeObj.sprites.frontSprite
  foe = new Pogemon(foeObj, Math.pow(rngLvl, 3), true, null, foeSprite)

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

let enemyTrainer

function initTrainerEncounter(info){
  battleType = 'trainer'

  enemyTrainer = info.createdTrainer

  foe = enemyTrainer.team[0]

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

function critLanded(pogemon){
  let critHit = false
  const critRNG = Math.floor(Math.random() * 100)
  const critThreshold = 16

  if(critRNG <= critThreshold){
    critHit = true
    queue.push(() => pogemon.dialogue('battle', `${pogemon.name} landed a critical hit!!!`))
  }

  return critHit
}

function changeHPColor(DOM, target){
  let percentHP = target.convertToPercentage(target.hp, target.stats.baseHp)
  DOM.style.width = `${percentHP}%`
  if(percentHP > 51){
    DOM.style.backgroundColor = 'green'
  } else if (percentHP < 51 && percentHP > 26){
    DOM.style.backgroundColor = 'yellow'
  } else if (percentHP < 26){
    DOM.style.backgroundColor = 'red'
  }
}

function chooseStatusColor(target, status, statusDom){
  if(target.status.name == null) statusDom.style.background = 'transparent'

  switch(status){
    case 'burn':
      statusDom.style.background = 'red'
      break
  }

  // removes status color
}

let allyId
let enemyTrainerInfo

export function initBattle(faintedTriggered, info){
  enemyTrainerInfo = info
  scenes.set('battle', {initiated : true})
  document.querySelector('#overworldScene').style.display = 'none'
  player.team[0].animate = true

  loadAlly(player.team[0])

  if(allyId == undefined) allyId = ally.id

  ally.img.src = ally.pogemon.sprites.backSprite
  ally.animate = true
  ally.hold = 100

  ally.position = {
    x: 300,
    y: 15
  }

  if(prevScene == 'overworld') {
    if(info == undefined) initWildEncouter()
    else initTrainerEncounter(info)
  }

  foe.position = {
    x: 1415,
    y: 15
  }

  renderedSprites = [foe, ally]

  setBattleScene()

  changeHPColor(document.querySelector('#foeHealthBar'), foe)
  changeHPColor(document.querySelector('#allyHealthBar'), ally)

  chooseStatusColor(foe, foe.status.name, document.querySelector('#foeStatus'))
  chooseStatusColor(ally, ally.status.name, document.querySelector('#allyStatus'))

  battleAnimation()

  let allyExp = ally.convertToPercentage(ally.exp - Math.pow(ally.lvl, 3), Math.pow(ally.lvl + 1, 3) - Math.pow(ally.lvl, 3))
  if(ally.exp === 0) allyExp = 0

  document.querySelector('#expBar').style.width = `${allyExp}%`

  const textBox = document.querySelector('#textBox')
  textBox.innerText = `You sent out ${ally.name}!`
  setInterval(() =>{
    textBox.innerText = `What will ${ally.name} do?`
  }, 1500)

  if(itemUsed.used){
    document.querySelector('#encounterInterface').style.display = 'none'
    document.querySelector('#movesInterface').style.display = 'none'
    document.querySelector('#dialogueInterface').style.display = 'block'
    
    if(itemUsed.item.type == 'ball'){
      if(enemyTrainer == undefined){
        queueEnabled = false
        function backToOverWorld(){
          //might throw error
  
          queue.push(() => {
            manageBattleState(false)
          })
        }
        let pogemonInUse = ally
        player.catch(foe, false, ally, renderedSprites, itemsObj['pogeball'], manageBattleQueue, critLanded, backToOverWorld, pogemonInUse, queue, faintEvent, pc)

        itemUsed.item = null
        itemUsed.used = false
        
        moveProcess = true
        
        manageStatusEvent(foe, ally)
        return
      } else {
        player.team[0].dialogue("battle", "Can't catch another trainer's pogemon!")

        itemUsed.item = null
        itemUsed.used = false
      }
    }

    return
  }

  if(teamEvent.switch && teamEvent.previousScene == 'battle'){
    teamEvent.switch = false
    teamEvent.previousScene = null

    if(faintedTriggered.active) {
      faintedTriggered.active = false

      // here that is fucked
      foe.checkStatus('#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, faintEvent, ally, ['#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, faintEvent])
      foe.dialogue('battle', `You sent out ${ally.name}`)

      document.querySelector('#dialogueInterface').style.display = 'block'
      document.querySelector('#encounterInterface').style.display = 'none'
      return
    }

    if(allyId !== player.team[0].id){
      allyId = player.team[0].id
      document.querySelector('#encounterInterface').style.display = 'none'
      let foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]
      moveProcess = true
      foe.move({move: foeRNGMove, recipient: ally, renderedSprites, critHit: critLanded, queue})
      //team switch option
      manageStatusEvent(foe, ally)
      return
    }

    let foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]
    moveProcess = true
    foe.move({move: foeRNGMove, recipient: ally, renderedSprites, critHit: critLanded, queue})

    console.log(faster)
    manageStatusEvent(faster, slower)
    
    document.querySelector('#encounterInterface').style.display = 'none'
  }
}

function clearBattleScene(nextScene){
  if(enemyTrainer != undefined) {
    mapsObj[`${currMap.name}`].trainers.forEach(trainer =>{
      if(trainer.name != enemyTrainer.name) return

      trainer.beaten = true
    })
  }

  scenes.set('battle', {initiated : false})
  document.querySelector('#allyStatus').style.backgroundColor = 'transparent'
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      cancelAnimationFrame(battleAnimationId)

      movesBox.replaceChildren()
      menuDom.removeChild(dialogueInterfaceDom)
      battleSceneDom.style.display = 'none'
      optionBox.replaceChildren()

      audioObj.music.victory.stop()
      audioObj.music.map.play()

      if(nextScene == 'team') manageTeamState(true, 'battle')
      else if (nextScene == 'bag') manageBagState(true, 'battle')
      else if (nextScene == 'evo') return
      else manageOverWorldState(true)

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

let C = 0

function optionButtonInteraction(e) {
  if(scenes.get('battle').initiated){
    switch(e.target.textContent){
      case 'Fight':
        encounterInterfaceDom.style.display = 'none'
        movesInterfaceDom.style.display = 'grid'
        break
      case 'pgmn':
          manageBattleState(false, 'team')
          gsap.to('#overlapping', {
            opacity: 1,
            yoyo: true,
            duration: 1,
            onComplete(){
              gsap.to('#overlapping', {
                opacity: 0,
                duration: 0.4
              })
            }
          })
        break
      case 'Item':
        manageBattleState(false, 'bag')
        gsap.to('#overlapping', {
          opacity: 1,
          yoyo: true,
          duration: 1,
          onComplete(){
            gsap.to('#overlapping', {
              opacity: 0,
              duration: 0.4
            })
          }
        })
        break
      case 'Run':
        if(enemyTrainer == undefined){
          C + 1

          function chanceToEscape(A, B){
            return (((A * 32) / (B / 4)) + 30 * C)
          }
          
          if(chanceToEscape(player.team[0].stats.spd, foe.stats.spd) < 100) {
            encounterInterfaceDom.style.display = 'none'
            movesInterfaceDom.style.display = 'none'
            dialogueInterfaceDom.style.display = 'block'
            dialogueInterfaceDom.textContent = 'You failed to run away..'
  
            let rng = Math.floor(Math.random() * foe.move.length)
            let foeRng = foe.moves[rng]
  
            queue.push(() => {
              foe.move({move: foeRng, recipient: player.team[0], renderedSprites, critHit: critLanded, queue})
              manageStatusEvent(foe, ally)
            })
            return
          }
  
          encounterInterfaceDom.style.display = 'none'
          movesInterfaceDom.style.display = 'none'
          dialogueInterfaceDom.style.display = 'block'
          dialogueInterfaceDom.textContent = 'You fleed'
          audioObj.SFX.flee.play()
          // need to put rng check based on speed stat
          queue.push(() =>{
            //might throw err
            manageBattleState(false)
            gsap.to('#overlapping', {
              opacity: 1,
              yoyo: true,
              duration: 1,
              onComplete(){
                audioObj.SFX.flee.stop()
                gsap.to('#overlapping', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          })
        } else {
          document.querySelector('#textBox').innerText = "Can't switch out during trainer battle!"
          console.log('cant escape')
        }
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
const options = ['Fight', 'pgmn', 'Item', 'Run']

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
  console.log(ally.moves)
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

  if(priority.ally > priority.foe){
    faster = ally
    slower = foe
  } else if (priority.foe > priority.ally) {
    faster = foe
    slower = ally
  } else if(ally.stats.spd > foe.stats.spd){
    faster = ally
    slower = foe
  } else if (foe.stats.spd > ally.stats.spd) {
    faster = foe
    slower = ally
  } else if (ally.stats.spd === foe.stats.spd && priority.ally == priority.foe) {
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

function manageEvolution(){
  queue.push(() => {
    manageBattleState(false, 'evo', false)
    setTimeout(() =>{
      manageEvolutionState(true, ally)
    }, 410)
  })
}

let lvlBeforeExpGained

function enemyTeamWiped(enemyTrainerInfo){
  let teamFainted = true

  for(let i = 0; i < enemyTrainerInfo.team.length; i++){
    if(enemyTrainerInfo.createdTrainer.team[i].fainted == false) teamFainted = false
  }
  return teamFainted
}

function switchEnemyAfterFaint(){
  for(let i = 0; i < enemyTrainerInfo.team.length; i++){
    if(enemyTrainerInfo.createdTrainer.team[i].fainted === false){
      foe = enemyTrainerInfo.createdTrainer.team[i]
      break
    }
  }

  document.querySelector('#movesBox').replaceChildren()

  for(let i = 0; i < ally.moves.length; i++){
    const newAttackBox = document.createElement('div')
    newAttackBox.setAttribute('class', 'movesButton')
    newAttackBox.innerText = `${ally.moves[i].name}`

    newAttackBox.addEventListener('mouseover', e => movesHoverEvent(e))
    newAttackBox.addEventListener('mouseout', e => movesAwayEvent())

    newAttackBox.addEventListener('click', e => attackMove(e))

    document.querySelector('#movesBox').appendChild(newAttackBox)
  }

  enemyTrainerInfo.createdTrainer.team[0].dialogue('battle', `${enemyTrainerInfo.name} is about to send ${foe.name}`)
  enemyTrainerInfo.createdTrainer.team[0].hpManagement(foe, '#foeHealthBar', document.querySelector('#foeHp'))
  foe.opacity = 1
  foe.position = {
    x: 1415,
    y: 15
  }
  setBattlersInfo()

  renderedSprites.splice(0, 1, foe)
  
  // maybe ask if want to switch before next pogemon comes out?
}

//manage enemy faint
function manageFaintingEvent(target){
  const oldStats = ally.stats
  const prevLvl = ally.lvl

  ally.expGain(target, battleType)

  if(enemyTrainerInfo == undefined){
    if(lvlBeforeExpGained < ally.lvl) {
      //all queue events happen here
      manageLvlUpDisplay('battle', oldStats, queue, prevLvl)
      manageLearnedMoves(ally, queue, 'battle')
  
      if(ally.pogemon.evo == null) {
        queue.push(() => manageBattleState(false))
        return
      }
      if(ally.pogemon.evo.type == 'lvl') {
        if(ally.pogemon.evo.lvl <= ally.lvl) manageEvolution()
      }
      else queue.push(() => manageBattleState(false))
    } else queue.push(() => manageBattleState(false))
    return
  }

  if(lvlBeforeExpGained < ally.lvl) {
    //all queue events happen here
    manageLvlUpDisplay('battle', oldStats, queue, prevLvl)
    manageLearnedMoves(ally, queue, 'battle')

    if(enemyTeamWiped(enemyTrainerInfo)){
      if(ally.pogemon.evo == null) {
        queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
        player.money = player.money + enemyTrainerInfo.reward
        queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
        queue.push(() => manageBattleState(false))
        return
      }

      if(ally.pogemon.evo.lvl <= ally.lvl) {
        queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
        player.money = player.money + enemyTrainerInfo.reward
        queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
        manageEvolution()
      } else {
        queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
        player.money = player.money + enemyTrainerInfo.reward
        queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
        queue.push(() => manageBattleState(false))
      }
      return
    }
    //if enemy team isint wiped, switch for next 'mon in for.team arr
    queue.push(() => switchEnemyAfterFaint())
    return
  }
  
  if(enemyTeamWiped(enemyTrainerInfo)){
    queue.push(() => manageBattleState(false))
  }

  //if enemy team isint wiped, switch for next 'mon in for.team arr
  queue.push(() => switchEnemyAfterFaint())
}

function checkIfTeamWipedOut(){
  let wiped = true
  player.team.forEach(pogemon =>{
    if(!pogemon.fainted) wiped = false
  })
  return wiped
}

export let faintedTriggered = {active: false}

function faintEvent(target){
  queue.push(() =>{
    target.dialogue('battle', `${target.name} fainted!`)
    target.faint()

    queue.push(() => {
      if(target.isEnemy){
          manageFaintingEvent(target)
      } else if(checkIfTeamWipedOut()){
          document.querySelector('#allyStatus').style.backgroundColor = 'transparent'
          document.querySelector('#overlapping').textContent = 'Git Gud'
          gsap.to('#overlapping', {
            opacity: 1,
          })
          //here
          document.querySelector('#overlapping').addEventListener('click', spendQueue)
          document.querySelector('#overlapping').style.cursor = 'pointer'
          document.querySelector('#overlapping').style.pointerEvents = 'auto'
          queue.push(() =>{
            location.reload()
        })
      } else {
        faintedTriggered.active = true
        manageBattleState(false, 'team', {active : true})
      }
    })
  })
}

// pogemon status turn event
function manageStatusEvent(faster, slower){
  // if foe is faster, check for it's status before ally's
  if(faster.isEnemy){
    faster.checkStatus('#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, faintEvent, slower, ['#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, faintEvent])
    moveProcess = false
    return
  }
  
  // if ally is faster, check for it's status before foe's
  faster.checkStatus('#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, faintEvent, slower, ['#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, faintEvent])
  moveProcess = false
}

function checkIfFainted(target){
  if(target.hp <= 0){
    queue.push(() =>{
      audioObj.music.battle.stop()
      audioObj.SFX.faint.play()
      target.faint()
      faintEvent(target)
      let placeHolder = queue[1]
      queue[1] = queue[2]
      queue[2] = placeHolder
      queue.pop()
    })
  }
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
    // should maybe put all the battle management in class with move method
    const [faster, slower, fasterMove, slowerMove] = checkSpeed(e)

    function attackLanded(move, reload){
      let accRNG
      if(reload) accRNG = Math.floor(Math.random() * 100)
      if(accRNG < move.acc) return true
    }

    lvlBeforeExpGained = ally.lvl

    if(attackLanded(fasterMove, true)) {
      moveProcess = true
      faster.move({move: fasterMove, recipient: slower, renderedSprites, critHit: critLanded, queue})
    } else faster.miss()

    checkIfFainted(faster)
    checkIfFainted(slower)

    queue.push(() =>{
      if(attackLanded(slowerMove, true)) {
        moveProcess = true
        slower.move({move: slowerMove, recipient: faster, renderedSprites, critHit: critLanded, queue})
      } else slower.miss()

      //normal attack option
      manageStatusEvent(faster, slower)
      return
    })
  }
}

export function manageBattleQueue(state){
  queueEnabled = state
}

export let moveProcess = false

function spendQueue(){
  if(!queueEnabled) return
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    dialogueInterfaceDom.style.display = 'none'
    if(scenes.get('battle').initiated) encounterInterfaceDom.style.display = 'grid'
    moveProcess = false
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

export function manageBattleState(state, nextScene, faintedTriggered, info) {
  if(state) initBattle(faintedTriggered, info)
  else clearBattleScene(nextScene)
}