// all data pertaining to the player
import { audioObj } from "../data/audioData.js"
import { pogemonsObj } from "../data/pogemonData.js"

import { Sprite, NPC, Pogemon } from "../classes.js"

import { loadData } from "../save.js"
import { scenes } from "./canvas.js"
import { changeMapInfo, currMap, map } from "./maps.js"

import { manageBattleState } from "./scenes/battle.js"
import { manageOverWorldState, returnPrevScene } from "./scenes/overworld.js"
import { managePcState } from "./scenes/pc.js"
import { mapsObj } from "../data/mapsData.js"
import { movesObj } from "../data/movesData.js"

export const keys = {
  w: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  a: {
    pressed: false
  },
}

let lastKey = ''

let walkSpeed = 6
let runSpeed = walkSpeed * 1.5
let moveSpeed = walkSpeed

export let player

let playerHeight = 132
let playerWidth  = 84

const playerImg = new Image()
export const playerCharacter = 'ethan'
playerImg.src = `./img/charSprites/${playerCharacter}/${playerCharacter}.png`

let data

export async function generatePlayer(canvas){
  // if(playerInfo == undefined){
    await loadData().then(res => data = res)

    if(data == null) {
      player = new NPC([], new Map(), 500, 'Down', 'player', new Sprite({
        type: 'player',
        position:{
          x: canvas.width / 2 - playerWidth / 2,
          y: Math.floor(canvas.height / 2 -  playerHeight / 2)
        },
        img: playerImg,
        frames: {
          max: 4,
          hold: 10
        }
      }))

      player.catch(pogemonsObj['jlissue'], true)

      return player
    } else {
      player = new NPC([], new Map(), 500, 'Down', 'player', new Sprite({
        type: 'player',
        position:{
          x: canvas.width / 2 - playerWidth / 2,
          y: Math.floor(canvas.height / 2 -  playerHeight / 2)
        },
        img: playerImg,
        frames: {
          max: 4,
          hold: 10
        }
      }))

      player.team.length = 0

      data.playerInfo.player.team.forEach((pogemon,i) =>{
        let pogemonImg = new Image()

        let pogemonSprite = new Sprite({
          type: 'pogemon',
          position: pogemon.position,
          img: pogemonImg,
          frames: {
            max: 4,
            hold: 50
          },
          animate: true
        })

        let remodeledPogemon = new Pogemon(pogemon.pogemon, Math.pow(pogemon.lvl, 3), false, pogemon, pogemonSprite)

        remodeledPogemon.moves.length = 0

        data.playerInfo.teamMovesInfo[0].forEach((move, i) =>{
          let newMove = movesObj[`${data.playerInfo.teamMovesInfo[0][i][0]}`]
          newMove.pp = data.playerInfo.teamMovesInfo[0][i][1]
          remodeledPogemon.moves.push(newMove)
        })

        remodeledPogemon.learntMoves = data.playerInfo.teamLearntMovesInfo[i]

        player.team.push(remodeledPogemon)
      })
      // player.team = 
      return player
    }
}

function playerMovementEvent() {
  window.addEventListener('keydown', e =>{
    if(player.disabled) return
    switch(e.key){
      case 'w':
      case 'W':
        keys.w.pressed = true
        lastKey = 'w'
        player.animate = true
        break
      case 'd':
      case 'D':
        keys.d.pressed = true
        lastKey = 'd'
        player.animate = true
        break
      case 's':
      case 'S':
        keys.s.pressed = true
        lastKey = 's'
        player.animate = true
        break
      case 'a':
      case 'A':
        keys.a.pressed = true
        lastKey = 'a'
        player.animate = true
        break
      case 'Shift':
        moveSpeed = runSpeed
        player.running = true
        break
    }
  })

  window.addEventListener('keyup', e =>{
    switch(e.key){
      case 'w':
      case 'W':
        keys.w.pressed = false
        player.animate = false
        break
      case 'd':
      case 'D':
        keys.d.pressed = false
        player.animate = false
        break
      case 's':
      case 'S':
        keys.s.pressed = false
        player.animate = false
        break
      case 'a':
      case 'A':
        keys.a.pressed = false
        player.animate = false
        break
      case 'Shift':
        moveSpeed = walkSpeed
        player.running = false
        break
    }
  })
}

export const interaction = {
  initiated: false,
  flags: {
    starter: false
  }
}

async function setInteractionFlags(){
  const data = await loadData()

  if(data == null) return

  interaction.flags = data.interactionFlags

  console.log(interaction)
}

await setInteractionFlags()

function playerInteraction(e) {
  if(scenes.get('overworld').initiated == false) return
  if(e.key != ' ') return

  console.log(player.interaction)

  switch(player.interaction.type){
    case 'pc':
        if(scenes.get('pc').initiated) return
        player.disabled = true

        gsap.to('#overlapping', {
          opacity: 1,
          onComplete: () =>{
            managePcState(true)
            manageOverWorldState(false)
            gsap.to('#overlapping', {
              opacity: 0
            })
          }
        })
        break
    case 'npc':
        if(interaction.initiated) return
        interaction.initiated = true

        document.querySelector('#openWindow').replaceChildren()
        document.querySelector('#openWindow').style.backgroundColor = `transparent`

        document.querySelector('#overworldDialogueContainer').style.display = 'grid'

        for(let i = 0; i < player.interaction.info.dialogue.length; i++){
          if(i == 0) player.team[0].dialogue('overworld', player.interaction.info.dialogue[i])
          else queue.push(() => player.team[0].dialogue('overworld', player.interaction.info.dialogue[i]))
        }
        
        if(player.interaction.info.type == undefined) return
        console.log(player.interaction.info.type)
        break
    case 'starter':
        if(interaction.flags.starter) return
        if(interaction.initiated) return
        interaction.initiated = true

        document.querySelector('#openWindow').replaceChildren()

        let starters = [pogemonsObj['loko'], pogemonsObj['steeli'], pogemonsObj['maaph']]
        let starter = starters[player.interaction.info.starter]

        player.disabled = true

        let openWindow = document.querySelector('#openWindow')
        openWindow.style.backgroundColor = 'black'

        let OWDialogue = document.querySelector('#overworldDialogue')
        OWDialogue.textContent = `Do you want to pick ${starter.name} as your starter?`

        document.querySelector('#overworldDialogueContainer').style.display = 'grid'

        const starterImg = new Image()
        starterImg.src = `img/pogemon/00${starter.pogedex}_${starter.name}/${starter.name}.png`
        starterImg.id = 'overworldStarterImg'

        openWindow.appendChild(starterImg)

        queue.push(() =>{
          OWDialogue.setAttribute('class', 'chooseStarterButtonsContainer')
          OWDialogue.style.padding = 0
          OWDialogue.innerText = ''

          let choiceArr = ['yes', 'no']
          for (let i = 0; i < choiceArr.length; i++) {
            const chooseStarterButton = document.createElement('div')
            chooseStarterButton.setAttribute('class', 'chooseStarterButton')
            chooseStarterButton.innerText = choiceArr[i]

            OWDialogue.appendChild(chooseStarterButton)

            if(choiceArr[i] == 'no') return

            chooseStarterButton.addEventListener('click', e =>{
              queue.push(() =>{
                OWDialogue.setAttribute('class', '')
                OWDialogue.style.padding = '35px'
                OWDialogue.innerText = `Congratulations, ${starter.name} will now be traveling with you!`

                player.catch(starter, true)

                interaction.flags.starter = true
              })
            })
          }
        })
        break
  }
}

window.addEventListener('keydown', e => playerInteraction(e))

// collissions

let playerCenterOffset = 14

function rectangularCollision({ rectangle1, rectangle2 }, type){
  if(type == undefined){
    return (
      rectangle1.position.x + playerCenterOffset <= rectangle2.position.x + rectangle2.width
      && rectangle1.position.x + rectangle1.width - playerCenterOffset >= rectangle2.position.x
      && rectangle1.position.y + playerCenterOffset <= rectangle2.position.y + rectangle2.height
      && rectangle1.position.y + rectangle1.height - playerCenterOffset >= rectangle2.position.y
      )
  } else if(type == 'event') {
    return (
      rectangle1.position.x + playerCenterOffset <= rectangle2.position.x + rectangle2.width + rectangle2.info.direction.reach.neg.x - rectangle2.info.direction.sight.neg.x
      && rectangle1.position.x + rectangle1.width - playerCenterOffset >= rectangle2.position.x - rectangle2.info.direction.reach.pos.x + rectangle2.info.direction.sight.neg.x
      && rectangle1.position.y + playerCenterOffset <= rectangle2.position.y + rectangle2.height + rectangle2.info.direction.reach.neg.y - rectangle2.info.direction.sight.neg.y
      && rectangle1.position.y + rectangle1.height - playerCenterOffset >= rectangle2.position.y - rectangle2.info.direction.reach.pos.y + rectangle2.info.direction.sight.neg.y
      )
  }
}

function stopMotionWhenColliding(boundaries, direction){
  for(let i = 0; i < boundaries.length; i++){
    const boundary = boundaries[i]

    if(!player.disabled) player.animate = true

    let type = boundary.type

    let xOffset
    let yOffset

    let playerOffset = 16
    
    switch(type){
      case 1:
        switch(direction){
          case 'Up':
            xOffset = 0
            yOffset = playerOffset
          break
          case 'Right':
            xOffset = -playerOffset
            yOffset = 0
          break
          case 'Down':
            xOffset = 0
            yOffset = -playerOffset
          break
          case 'Left':
            xOffset = playerOffset
            yOffset = 0
          break
        }
      break
    }

    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x + xOffset,
          y: boundary.position.y + yOffset
        }}
      })
    ){
      player.animate = false
      break
    }
  }
}

function engageBattle(animationId, battleZones) {
  for(let i = 0; i < battleZones.length; i++){
    const battleZone = battleZones[i]
    const overlappingArea = Math.max(player.position.x, battleZone.position.x) 
    + Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)
    * Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
    - Math.max(player.position.y, battleZone.position.y)
    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: battleZone
      }) &&
      overlappingArea > (player.width * player.height) / 2
      && Math.random() < 0.005
    ){
      audioObj.music.map.stop()
      audioObj.SFX.initEncounter.play()
      manageOverWorldState(false)
      gsap.to('#overlapping', {
        opacity: 1,
        repeat: 2,
        yoyo: true,
        duration: 0.4,
        onComplete(){
          gsap.to('#overlapping', {
            opacity: 0,
            duration: 0.4
          })
          audioObj.music.battle.play()
          manageBattleState(animationId)
        }
      })
      break
    }
  }
}

export let lastDirection = 'Down'

function move(direction, movables, moveSpeed){
  switch(direction){
    case 'Up':
      movables.forEach(movable =>{
        movable.position.y += moveSpeed
      })
      break
    case 'Right':
      movables.forEach(movable =>{
        movable.position.x -= moveSpeed
      })
      break
    case 'Down':
      movables.forEach(movable =>{
        movable.position.y -= moveSpeed
      })
      break
    case 'Left':
      movables.forEach(movable =>{
        movable.position.x += moveSpeed
      })
      break
  }
}

//player gets stuck to walls when changing direcitons for some reason

// maybe should put this in map

let changeMapFlag = false

function changeMapEvent(changeMap, currPos){
  for(let i = 0; i < changeMap.length; i++){
    const changeMapIndex = changeMap[i]
    const currMapInfo = {
      name: currMap.name,
      position: {
        x: currPos.x,
        y: currPos.y
      }
    }

    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: changeMapIndex
      })
    ){
      if(changeMapFlag) return
      changeMapFlag = true
      player.disabled = true

      gsap.to('#overlapping', {
        opacity: 1,
        duration: 0.4,
        onComplete(){
          changeMapInfo(changeMapIndex, currMapInfo)
        }
      })
      break
    } else if(!rectangularCollision({
      rectangle1: player,
      rectangle2: changeMapIndex
    })){
      changeMapFlag = false
    }
  }
}

let eventZonesFlag = false

const exclamation = new Image()
exclamation.src = 'img/charSprites/exclamation.png'
exclamation.setAttribute('class', 'exclamation')
document.querySelector('#overworldSceneContainer').appendChild(exclamation)

function eventZoneManagement(eventZones){
  for(let i = 0; i < eventZones.length; i++){
    const eventZonesIndex = eventZones[i]
    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: eventZonesIndex
      }, 'event')
    ){
      player.interaction = eventZonesIndex
      if(eventZonesIndex.info.createdTrainer != undefined){
        for(let i = 0; i < mapsObj[currMap.name].trainers.length; i++){
          if(mapsObj[currMap.name].trainers[i].beaten == true) return
        }
        if(eventZonesIndex.info.beaten) return
        
        player.disabled = true
  
        exclamation.style.left = eventZonesIndex.position.x + 6
        exclamation.style.top = eventZonesIndex.position.y - 46
  
        gsap.to(exclamation, {
          opacity: 1,
          duration: 1,
          onComplete: () =>{
            gsap.to(exclamation, {
              opacity: 0,
              duration: 0.5,
              onComplete: () =>{
                eventZonesIndex.info.createdTrainer.animate = true
  
                let eventPos = {x:0, y:0}
        
                switch(eventZonesIndex.info.direction.looking){
                  case 'Up':
                    eventPos.x = eventZonesIndex.position.x
                    eventPos.y = player.position.y + player.height
                    break
                  case 'Right':
                    eventPos.x = player.position.x - player.width
                    eventPos.y = eventZonesIndex.position.y
                    break
                  case 'Down':
                    eventPos.x = eventZonesIndex.position.x
                    eventPos.y = player.position.y - player.height
                    break
                  case 'Left':
                    eventPos.x = player.position.x + player.width
                    eventPos.y = eventZonesIndex.position.y
                    break
                }
          
                gsap.to(eventZonesIndex.info.createdTrainer.position,{
                  //gonna have to make directions
                  x: eventPos.x,
                  y: eventPos.y,
                  duration: 1,
                  onComplete: () =>{
                    const OWDialogueBoxContainer = document.querySelector('#overworldDialogueContainer')
                    OWDialogueBoxContainer.style.display = 'grid'
          
                    const OWDialogueBox = document.querySelector('#overworldDialogue')
                    OWDialogueBox.style.display = 'block'
                    OWDialogueBox.innerText = eventZonesIndex.info.dialogue
          
                    eventZonesIndex.info.createdTrainer.animate = false
          
                    queue.push(() =>{
                      manageOverWorldState(false)
          
                      gsap.to('#overlapping', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete(){
                          manageBattleState(true, null, null, eventZonesIndex.info)
                          player.disabled = false
                          gsap.to('#overlapping', {
                            opacity: 0,
                            duration: 0.4
                          })
                        }
                      })
                    })
                  }
                })
              }
            })
          }
        })
      }
      break
    }
    
    if(!rectangularCollision({
      rectangle1: player,
      rectangle2: eventZonesIndex
    })){
      eventZonesFlag = false
      player.interaction = null
    }
  }
}

let queue = []
let queueEnabled = true

document.querySelector('#overworldDialogue').addEventListener('click', (e) => {
  spendQueue()
})

function spendQueue(){
  if(!queueEnabled) return
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    document.querySelector('#overworldDialogueContainer').style.display = 'none'
    player.disabled = false
    interaction.initiated = false
    document.querySelector('#overworldDialogue').setAttribute('class', '')
    document.querySelector('#overworldDialogue').style.padding = '35px'
  }
}

function playerInputEvent(animationId, direction, movables, boundaries, battleZones, changeMap, eventZones){
  player.assingDirection(direction)
  if(player.disabled) return
  stopMotionWhenColliding(boundaries, lastDirection)
  // stopMotionWhenColliding(eventZones, lastDirection)
  if(player.animate) {
    returnPrevScene('overworld')
    engageBattle(animationId, battleZones)
    changeMapEvent(changeMap, map.position)
    eventZoneManagement(eventZones)
    lastDirection = direction
    move(direction, movables, moveSpeed)
    if(player.running){
    player.frames.hold = 5
    } else {
      player.frames.hold = 10
    }
  }
}

export function playerMovement(animationId, movables, boundaries, battleZones, changeMap, eventZones) {
  if(keys.w.pressed && lastKey === 'w'){
    lastDirection = 'Up'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones, changeMap, eventZones)
  } else if(keys.d.pressed && lastKey === 'd'){
    lastDirection = 'Right'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones, changeMap, eventZones)
  } else if(keys.s.pressed && lastKey === 's'){
    lastDirection = 'Down'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones, changeMap, eventZones)
  } else if(keys.a.pressed && lastKey === 'a'){
    lastDirection = 'Left'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones, changeMap, eventZones)
  }
}

playerMovementEvent()