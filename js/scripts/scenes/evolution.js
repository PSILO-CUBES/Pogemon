import { pogemonsObj } from "../../data/pogemonData.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { manageOverWorldState } from "./overworld.js"
import { manageLearnedMoves, learnMoveMenu, manageLvlUpDisplay } from "./battle.js"
import { player } from "../player.js"
import { mapsObj } from "../../data/mapsData.js"

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
  target.pogemon = pogemonsObj[targetEvo.name]
  target.name = pogemonsObj[targetEvo.name].name
  target.element = pogemonsObj[targetEvo.name].element
  target.evo = pogemonsObj[targetEvo.name].evo
  target.movepool = pogemonsObj[targetEvo.name].movepool
  target.stats = target.generateStats()

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

      targetMon.dialogue('evolution', `${targetMon.name} is evolving!`)
      if(firstTarget){
        pogemonTransition(targetMon)
        queue[0]()
        queue.shift()
      } else {

      }
    } else {
      targetMon.dialogue('evolution', `${targetMon.name} is evolving!`)
      pogemonTransition(targetMon)
      queue[0]()
      queue.shift()
    }


  } else {
    if(evolutionArr.length > 1){
      document.querySelector('#evolutionDialogue').style.cursor = 'pointer'
      document.querySelector('#evoConfirmButtonContainer').style.display = 'none'
      queueProcess.disabled = false
      evolutionArr[0].dialogue('evolution', `${targetMon.name} didint evolve.`)
      queue.splice(0, 4)
            
      console.log(targetMon.id)
      console.log(evolutionArr[evolutionArr.length - 1].id)

      if(targetMon.id == evolutionArr[evolutionArr.length - 1].id) queue.push(() => manageEvolutionState(false, evolutionArr[evolutionArr.length - 1]))
    } else {
      document.querySelector('#evolutionDialogue').style.cursor = 'pointer'
      document.querySelector('#evoConfirmButtonContainer').style.display = 'none'
      queueProcess.disabled = false
      evolutionArr[0].dialogue('evolution', `${targetMon.name} didint evolve.`)
      queue.splice(0, 4)
    }
  }
}

document.querySelector('#evoYes').addEventListener('click', () => letEvolveChoice(true))
document.querySelector('#evoNo').addEventListener('click', () => letEvolveChoice(false))

function initEvo(target, i){
  scenes.set('evolution', {initiated : true})

  targetMon = target
  targetEvo = pogemonsObj[target.evo.name]

  if(target.isShiny) target.img.src = target.pogemon.sprites.shiny.frontSprite
  else target.img.src = target.pogemon.sprites.classic.frontSprite

  target.position = {
    x: window.innerWidth / 2.35,
    y: window.innerHeight / 4.5
  }

  sprites = [backgroundSprite, target]

  if(i == 0) setEvoScene()

  queueProcess.disabled = true
  document.querySelector('#evolutionDialogue').style.cursor = 'auto'

  target.dialogue('evolution', `${target.name} is about to evolve! \n\n Will you let it?`)
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
      manageOverWorldState(true)
      gsap.to('#overlapping', {
        opacity: 0
      })
    }
  })
}

function evoProcess(target, preEvo){
  queueProcess.disabled = true
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
          target.dialogue('evolution', `Congratulations, ${preEvo.name} evolved into ${target.name}!!`)
          
          queueProcess.disabled = false
        }
      })
    }
  })
}

function manageEvolutionChain(evoArr){
  console.log(evoArr)
  if(evoArr.length == 1){

    initEvo(evoArr[0], 0)
    const preEvo = {...evoArr[0]}
    queue.push(() => {
      console.log('wtf?')
      evoProcess(evoArr[0], preEvo)
    })
    console.log(preEvo)
    manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[0])
    manageLearnedMoves(evoArr[0], queue, 'evolution')
    console.log(preEvo)
    queue.push(() => manageEvolutionState(false, evoArr[0]))

    return
  } else {
    for(let i = 0; i < evoArr.length; i++){
      const preEvo = {...evoArr[i]}
      console.log(preEvo.name)
      if(i == evoArr.length - 1) {

        queue.push(() => {
          queue.push(() => evoArr[i].dialogue('evolution', `Hold on... \n\n Seems like ${evoArr[i].name} is about to evolve as well.`))
          queue.push(() => initEvo(evoArr[i], i))
          queue.push(() => {
            console.log('wtf?')
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
          queue.push(() => evoArr[i].dialogue('evolution', `Hold on... \n\n Seems like ${evoArr[i].name} is about to evolve as well.`))
          queue.push(() => initEvo(evoArr[i], i))
          queue.push(() => {
            console.log('wtf')
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
        console.log('wtf?')
        initEvo(evoArr[i], i)
        queue.push(() => {  
          console.log(i) 
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