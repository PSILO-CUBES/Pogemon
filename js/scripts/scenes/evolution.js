import { pogemonsObj } from "../../data/pogemonData.js"

import { Sprite, Pogemon } from "../../classes.js"

import { scenes } from "../canvas.js"
import { manageOverWorldState } from "./overworld.js"
import { manageLearnedMoves, learnMoveMenu, passPuff } from "./battle.js"
import { player } from "../player.js"

const backgroundImage = new Image()
const backgroundSprite = new Sprite({
  type:'evolution',
  position:{
    x:0,
    y:0
  },
  img: backgroundImage
})

const queue = []
let queueEnabled = true

function spendQueue(){
  if(!queueEnabled) return
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
    if (!target.id === player.team[i].id) return
    teamSlot = i

    player.team[i] = target
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

function initEvo(target){
  scenes.set('evolution', {initiated : true})

  targetEvo = pogemonsObj[target.evo.name]
  
  target.img.src = target.pogemon.sprites.frontSprite

  target.position = {
    x: window.innerWidth / 2.35,
    y: window.innerHeight / 4.5
  }

  sprites = [backgroundSprite, target]

  backgroundImage.src = `../../img/background.png`

  setEvoScene()

  target.dialogue('evolution', `${target.name} is about to evolve!`)

  queue.push(() =>{
    queueEnabled = false
    gsap.to(target, {
      opacity: 0,
      repeat: 4,
      yoyo: true,
      duration: 0.5,
      onComplete: () =>{
        target.img.src = targetEvo.sprites.frontSprite
        gsap.to(target, {
          opacity: 1,
          duration: 0.5,
          onComplete: () =>{
            target.dialogue('evolution', `Congratulations, ${target.name} evolved into ${targetEvo.name}!!`)
            pogemonTransition(target)
            // manageLvlUpDisplay('evo', oldStats, queue)
            manageLearnedMoves(player.team[teamSlot], queue, 'evolution')
            learnMoveMenu('evolution', true)
            queue.push(() => manageEvolutionState(false, target))
            queueEnabled = true
          }
        })
      }
    })
  })

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

      player.team[teamSlot].img.src = `img/pogemon/${target.name}/${target.name}_Back_Animation.png`

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

export function manageEvolutionState(state, target){
  if(state) initEvo(target)
  else clearEvolutionScene(target)
}

passPuff(manageEvolutionState)

// manageEvolutionState(true)