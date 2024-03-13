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

let targetEvo

let sprites

//might loop these in pogemonTransition
let properties = ['pogemon', 'name', 'element', 'evo', 'movepool', 'stats']

let teamSlot

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

function initEvo(target, i){
  scenes.set('evolution', {initiated : true})

  targetEvo = pogemonsObj[target.evo.name]

  if(target.isShiny) target.img.src = target.pogemon.sprites.shiny.frontSprite
  else target.img.src = target.pogemon.sprites.classic.frontSprite

  target.position = {
    x: window.innerWidth / 2.35,
    y: window.innerHeight / 4.5
  }

  sprites = [backgroundSprite, target]

  if(i == 0) setEvoScene()

  target.dialogue('evolution', `${target.name} is about to evolve!`)

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
      if(preEvo == null){
        if(target.isShiny) target.img.src = pogemonsObj[target.evo.name].sprites.shiny.frontSprite
        else target.img.src = pogemonsObj[target.evo.name].sprites.classic.frontSprite
      } else {
        if(target.isShiny) target.img.src = target.pogemon.sprites.shiny.frontSprite
        else target.img.src = target.pogemon.sprites.classic.frontSprite
      }

      gsap.to(target, {
        opacity: 1,
        duration: 0.5,
        onComplete: () =>{
          if(preEvo == null){
            target.dialogue('evolution', `Congratulations, ${target.name} evolved into ${target.evo.name}!!`)
          } else {
            target.dialogue('evolution', `Congratulations, ${preEvo.name} evolved into ${target.name}!!`)
          }
          
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
    queue.push(() => evoProcess(evoArr[0], preEvo))
    pogemonTransition(evoArr[0])
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
          queue.push(() => evoProcess(evoArr[i], null))
          queue.push(() => {
            pogemonTransition(evoArr[i])
          })
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
          queue.push(() => evoProcess(evoArr[i], null))
          queue.push(() => {
            pogemonTransition(evoArr[i])
          })
          manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[i])
          queue.push(() => manageLearnedMoves(evoArr[i], queue, 'evolution'))
        })
      }
      else {
        initEvo(evoArr[i], i)
        queue.push(() => evoProcess(evoArr[i], preEvo))
        pogemonTransition(evoArr[i])
        manageLvlUpDisplay('evolution', preEvo.stats, queue, null, evoArr[i])
        manageLearnedMoves(evoArr[i], queue, 'evolution')
      }
    }
  }
}

export function manageEvolutionState(state, evoArr){
  if(state) manageEvolutionChain(evoArr)
  else clearEvolutionScene(evoArr)
}