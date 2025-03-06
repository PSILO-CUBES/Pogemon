import { pogemonsObj } from "../../data/pogemonData.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { manageOverWorldState } from "./overworld.js"
import { manageLearnedMoves, learnMoveMenu, manageLvlUpDisplay } from "./battle.js"
import { player } from "../player.js"
import { mapsObj } from "../../data/mapsData.js"
import { currItem, evoItemUsed } from "./bag.js"
import { itemsObj } from "../../data/itemsData.js"
import { currMap } from "../maps.js"

export const queue = []
export const queueProcess = {
  disabled: false
}

function spendQueue(){
  if(queueProcess.disabled) return
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    cancelAnimationFrame(evolutionAnimationId)
  }
}

document.querySelector('#evolutionDialogue').addEventListener('click', () => spendQueue())

let targetMon

let targetEvo

let sprites

//might loop these in pogemonTransition
let properties = ['pogemon', 'name', 'element', 'evo', 'movepool', 'stats']

let teamSlot

let evolutionArr

function pogemonTransition(target){
  //might loop here from properties

  target.pogemon = targetEvo
  if(target.nickname == target.name) target.nickname = targetEvo.name
  target.name = targetEvo.name
  target.element = targetEvo.element
  target.evo = targetEvo.evo
  // target.movepool = targetEvo.movepool
  target.stats = target.generateStats()

  Object.values(targetEvo.movepool).forEach(moveInfo =>{
    if(!target.learntMoves.includes(moveInfo.move.name) && target.lvl >= moveInfo.lvl)
      target.learntMoves.push(moveInfo.move.name)
  })

  for(let i = 0; i < player.team.length; i++){
    if(target.id != player.team[i].id) return
    teamSlot = i
    player.team[i] = target
    break
  }
}

function setEvoScene(){
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      document.querySelector('#battleScene').style.display = 'none'
      document.querySelector('#evolutionScene').style.display = 'grid'

      evolutionAnimation()

      gsap.to('#overlapping', {opacity: 0})
    }
  })
}

function letEvolveChoice(state){
  if(state){
    document.querySelector('#evolutionDialogue').style.cursor = 'pointer'
    document.querySelector('#evoConfirmButtonContainer').style.display = 'none'
    queueProcess.disabled = false
    let firstTarget = true

    if(evolutionArr.length > 1){
      for (let i = 0; i < evolutionArr.length; i++) {
        if(targetMon.id == evolutionArr[0].id){
          firstTarget = true
        }
      }

      targetMon.dialogue('evolution', `${targetMon.switchUnderScoreForSpace(targetMon.nickname)} is evolving!`)
      if(firstTarget){
        pogemonTransition(targetMon)
        queue[0]()
        queue.shift()
      }
    } else {
      targetMon.dialogue('evolution', `${targetMon.switchUnderScoreForSpace(targetMon.nickname)} is evolving!`)
      pogemonTransition(targetMon)
      queue[0]()
      queue.shift()
    }

    if(evoItemUsed.item != null){
      player.bag.set(evoItemUsed.item, {item: {...itemsObj[evoItemUsed.item]}, quantity: player.bag.get(`${evoItemUsed.item}`).quantity - 1})
      evoItemUsed.item = null
    }

    player.pogedexInfo.forEach(index =>{
      if(targetMon.name == index.name) {
        index.seen = true
        index.caught = true
      }
    })
  } else {
    if(evolutionArr.length > 1){
      document.querySelector('#evolutionDialogue').style.cursor = 'pointer'
      document.querySelector('#evoConfirmButtonContainer').style.display = 'none'
      queueProcess.disabled = false
      evolutionArr[0].dialogue('evolution', `${targetMon.switchUnderScoreForSpace(targetMon.nickname)} didint evolve.`)
      queue.splice(0, 4)

      if(targetMon.id == evolutionArr[evolutionArr.length - 1].id) queue.push(() => manageEvolutionState(false, evolutionArr[evolutionArr.length - 1]))
    } else {
      document.querySelector('#evolutionDialogue').style.cursor = 'pointer'
      document.querySelector('#evoConfirmButtonContainer').style.display = 'none'
      queueProcess.disabled = false
      evolutionArr[0].dialogue('evolution', `${targetMon.switchUnderScoreForSpace(targetMon.nickname)} didint evolve.`)
      queue.splice(0, 4)
    }
  }
}

document.querySelector('#evoYes').addEventListener('click', () => letEvolveChoice(true))
document.querySelector('#evoNo').addEventListener('click', () => letEvolveChoice(false))

function initEvo(target, i){
  scenes.set('evolution', {initiated : true})

  function jleechEvoTypeCalc() {
    let chosenEvo = 'jlorox'
    let [baseHP, atk, def, spatk, spdef, spd] = Object.values(target.ivs)

    let defIVs = baseHP + def + spdef
    let offIVs = atk + spatk + spd

    if(defIVs > offIVs) chosenEvo = 'jleenex'  

    if(defIVs == offIVs) {
      const rng = Math.floor(Math.random() * 2)
      if(rng == 1) chosenEvo = 'jleenex'  
    }

    console.log(pogemonsObj[chosenEvo])

    return {...pogemonsObj[chosenEvo]}
  }

  targetMon = target
  if(pogemonsObj[target.evo.name] != undefined) targetEvo = {...pogemonsObj[target.evo.name]}
  else if(target.name == 'jleech') targetEvo = jleechEvoTypeCalc()
  else if(target.name == 'formal' && currItem.name == 'regina_Esca') targetEvo = {...pogemonsObj.regaligyne}
  else {
    if(evoItemUsed.item != null || target.heldItem != null) {
      console.log(evoItemUsed)
      target.evo.forEach(evoType =>{

        if(evoType.item === evoItemUsed.item) {
          targetEvo = {...pogemonsObj[evoType.name]}
        }

        if(evoType.type == 'held') if(target.heldItem != null) if(evoType.item == target.heldItem.name) targetEvo = {...pogemonsObj[evoType.name]}
      })
    } else {
      target.evo.forEach(evoType =>{
        if(evoType.type == 'event'){
          targetEvo = {...pogemonsObj[evoType.name]}
        } 
      })
    }
  }
  

  if(target.isShiny) target.img.src = target.pogemon.sprites.shiny.frontSprite
  else target.img.src = target.pogemon.sprites.classic.frontSprite

  target.position = {
    x: window.innerWidth / 2.35,
    y: window.innerHeight / 4.5
  }

  sprites = [backgroundSprite, target]

  if(i == 0) setEvoScene()

  queueProcess.disabled = true
  console.log('there')
  document.querySelector('#evolutionDialogue').style.cursor = 'auto'

  target.dialogue('evolution', `${target.switchUnderScoreForSpace(target.nickname)} is about to evolve! \n\n Will you let it?`)
  document.querySelector('#evoConfirmButtonContainer').style.display = 'grid'

  // Object.values(targetEvo.movepool).forEach(move =>{
  //   if(target.lvl >= move.lvl && !target.learntMoves.includes(move.move.name)){
  //     queue.push(() => {
  //       target.dialogue('evolution', `${targetEvo.name} is trying to learn ${move.move.name}...`)
  //       if(target.moves > 4){
  //         createMovesMenuButtons(true, 'switchMove')
  //       }
  //     })
  //   }
  // })
}

let evolutionAnimationId

export function evolutionAnimation(){
  evolutionAnimationId = requestAnimationFrame(evolutionAnimation)
  // console.log(`evo : ${evolutionAnimationId}`)

  sprites.forEach(sprite =>{
    sprite.draw()
  })
}

function clearEvolutionScene(target){
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      sprites = []
      document.querySelector('#evolutionScene').style.display = 'none'

      if(target.pogemon.pogedex >= 100){
        if(target.isShiny) target.img.src = `img/pogemon/${target.name}/${target.name}_Back_Animation_Shiny.png`
        else target.img.src = `img/pogemon/${target.name}/${target.name}_Back_Animation.png`
      } else if(target.pogemon.pogedex >= 10){
        if(target.isShiny) target.img.src = `img/pogemon/0${target.name}/${target.name}_Back_Animation_Shiny.png`
        else target.img.src = `img/pogemon/${target.name}/${target.name}_Back_Animation.png`
      } else if(target.pogemon.pogedex < 10){
        if(target.isShiny) target.img.src = `img/pogemon/00${target.name}/${target.name}_Back_Animation_Shiny.png`
        else target.img.src = `img/pogemon/${target.name}/${target.name}_Back_Animation.png`
      }


      // trigger animation for next guy in arr
      cancelAnimationFrame(evolutionAnimationId)
      // dont forget to put the audio
      scenes.set('evolution', {initiated : false})
      manageOverWorldState(true, 'evo')
      gsap.to('#overlapping', {
        opacity: 0
      })
    }
  })
}

function evoProcess(target, preEvo){
  queueProcess.disabled = true
  console.log('there')
  gsap.to(target, {
    opacity: 0,
    repeat: 4,
    yoyo: true,
    duration: 0.5,
    onComplete: () =>{
      if(target.isShiny) target.img.src = target.pogemon.sprites.shiny.frontSprite
      else target.img.src = target.pogemon.sprites.classic.frontSprite

      gsap.to(target, {
        opacity: 1,
        duration: 0.5,
        onComplete: () =>{
          target.dialogue('evolution', `Congratulations, ${targetMon.switchUnderScoreForSpace(preEvo.nickname)} evolved into ${targetMon.switchUnderScoreForSpace(targetMon.name)}!!`)
          
          queueProcess.disabled = false
        }
      })
    }
  })
}

function manageEvolutionChain(evoArr){
  if(evoArr.length == 1){

    initEvo(evoArr[0], 0)
    const preEvo = {...evoArr[0]}
    queue.push(() => {
      evoProcess(evoArr[0], preEvo)
    })
    
    manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[0])
    manageLearnedMoves(evoArr[0], queue, 'evolution')
    queue.push(() => manageEvolutionState(false, evoArr[0]))

    return
  } else {
    for(let i = 0; i < evoArr.length; i++){
      const preEvo = {...evoArr[i]}
      if(i == evoArr.length - 1) {

        queue.push(() => {
          queue.push(() => evoArr[i].dialogue('evolution', `Hold on... \n\n Seems like ${evoArr[i].switchUnderScoreForSpace(evoArr[i].nickname)} is about to evolve as well.`))
          queue.push(() => initEvo(evoArr[i], i))
          queue.push(() => {
            evoProcess(evoArr[i], preEvo)
          })
          // queue.push(() => {
          //   pogemonTransition(evoArr[i])
          // })
          manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[i])
          queue.push(() => {
            manageLearnedMoves(evoArr[i], queue, 'evolution')
            queue.push(() => manageEvolutionState(false, evoArr[i]))
          })
          // evoCompletion(evoArr[i], true, false)
        })

      }
      else if(i != 0) {

        queue.push(() => {
          queue.push(() => evoArr[i].dialogue('evolution', `Hold on... \n\n Seems like ${evoArr[i].switchUnderScoreForSpace(evoArr[i].nickname)} is about to evolve as well.`))
          queue.push(() => initEvo(evoArr[i], i))
          queue.push(() => {
            evoProcess(evoArr[i], preEvo)
          })
          // queue.push(() => {
          //   pogemonTransition(evoArr[i])
          // })
          manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[i])
          queue.push(() => manageLearnedMoves(evoArr[i], queue, 'evolution'))
        })
      }
      else {
        initEvo(evoArr[i], i)
        queue.push(() => {
          evoProcess(evoArr[i], preEvo)
        })
        manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[i])
        manageLearnedMoves(evoArr[i], queue, 'evolution')
      }
    }
  }
}

export function manageEvolutionState(state, evoArr){
  evolutionArr = evoArr
  if(state) manageEvolutionChain(evoArr)
  else clearEvolutionScene(evoArr)
}