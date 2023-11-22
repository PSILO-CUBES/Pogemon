// all data pertaining to the player
import { audioObj } from "../data/audioData.js"

import { Boundary, Sprite, Trainer } from "../classes.js"

import { manageBattleState, battleAnimation } from "./scenes/battle.js"
import { pogemonsObj } from "../data/pogemonData.js"
import { manageOverWorldState, prevScene, returnPrevScene } from "./scenes/overworld.js"
import { scenes } from "./canvas.js"

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
  }
}

let lastKey = ''

let walkSpeed = 6
let runSpeed = walkSpeed * 1.5
let moveSpeed = walkSpeed

export let player

let playerHeight = 132
let playerWidth  = 84

const playerUpImg = new Image()
playerUpImg.src = './img/protagSprites/brendan/up.png'

const playerRightImg = new Image()
playerRightImg.src = './img/protagSprites/brendan/right.png'

const playerDownImg = new Image()
playerDownImg.src = './img/protagSprites/brendan/down.png'

const playerLeftImg = new Image()
playerLeftImg.src = './img/protagSprites/brendan/left.png'

export function generatePlayer(canvas){
  player = new Trainer([], new Map(), 500, new Sprite({
    type: 'player',
    position:{
      x: canvas.width / 2 - playerWidth / 2,
      y: Math.floor(canvas.height / 2 -  playerHeight / 2)
    },
    img: playerDownImg,
    frames: {
      max: 4,
      hold: 10
    },
    sprites : {
      up: playerUpImg,
      right: playerRightImg,
      down: playerDownImg,
      left: playerLeftImg,
    },
  }))

  return player
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

// collissions

let playerCenterOffset = 14

function rectangularColission({ rectangle1, rectangle2 }){
  return (
    rectangle1.position.x + playerCenterOffset <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.x + rectangle1.width - playerCenterOffset >= rectangle2.position.x
    && rectangle1.position.y + playerCenterOffset <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height - playerCenterOffset >= rectangle2.position.y
    )
}

function stopMotionWhenColliding(boundaries, direction){
  for(let i = 0; i < boundaries.length; i++){
    const boundary = boundaries[i]

    player.animate = true

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
      rectangularColission({
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
      rectangularColission({
        rectangle1: player,
        rectangle2: battleZone
      }) &&
      overlappingArea > (player.width * player.height) / 2
      && Math.random() < 0.005
    ){
      audioObj.map.stop()
      audioObj.initEncounter.play()
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
          scenes.set('battle', {initiated : true})
          audioObj.battle.play()
          manageBattleState(animationId)
        }
      })
      break
    }
  }
}

let lastDirection = 'Down'

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

//player gets stuck to walls when changing direcitons for some reason1

function playerInputEvent(animationId, direction, movables, boundaries, battleZones){
  stopMotionWhenColliding(boundaries, lastDirection)
  player.img = eval(`player${direction}Img`)
  if(player.animate) {
    returnPrevScene('overworld')
    engageBattle(animationId, battleZones)
    lastDirection = direction
    move(direction, movables, moveSpeed)
    if(player.running){
    player.frames.hold = 5
    } else {
      player.frames.hold = 10
    }
  }
}

export function playerMovement(animationId, movables, boundaries, battleZones) {
  if(keys.w.pressed && lastKey === 'w'){
    lastDirection = 'Up'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones)
  } else if(keys.d.pressed && lastKey === 'd'){
    lastDirection = 'Right'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones)
  } else if(keys.s.pressed && lastKey === 's'){
    lastDirection = 'Down'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones)
  } else if(keys.a.pressed && lastKey === 'a'){
    lastDirection = 'Left'
    playerInputEvent(animationId, lastDirection, movables, boundaries, battleZones)
  }
}

playerMovementEvent()