// all data pertaining to the player

import { Boundary, Sprite } from "../classes.js"

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

let player
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

export function generatePlayerImg(canvas){
  player = new Sprite({
    position:{
      x: canvas.width / 2 - playerWidth / 2,
      y: Math.floor(canvas.height / 2 -  playerHeight / 2)
    },
    img: playerDownImg,
    frames: {
      max: 4
    },
    sprites : {
      up: playerUpImg,
      right: playerRightImg,
      down: playerDownImg,
      left: playerLeftImg,
    }
  })

  return player
}

function playerMovementEvent() {
  window.addEventListener('keydown', e =>{
    switch(e.key){
      case 'w':
      case 'W':
        keys.w.pressed = true
        lastKey = 'w'
        player.moving = true
        break
      case 'd':
      case 'D':
        keys.d.pressed = true
        lastKey = 'd'
        player.moving = true
        break
      case 's':
      case 'S':
        keys.s.pressed = true
        lastKey = 's'
        player.moving = true
        break
      case 'a':
      case 'A':
        keys.a.pressed = true
        lastKey = 'a'
        player.moving = true
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
        player.moving = false
        break
      case 'd':
      case 'D':
        keys.d.pressed = false
        player.moving = false
        break
      case 's':
      case 'S':
        keys.s.pressed = false
        player.moving = false
        break
      case 'a':
      case 'A':
        keys.a.pressed = false
        player.moving = false
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

    player.moving = true

    let type = boundary.type

    let xOffset
    let yOffset

    let playerOffset = Math.floor(playerHeight / 16)
    
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
      console.log(
        {boundary: {start: {x: boundary.position.x, y: boundary.position.y}, end: {x: boundary.position.x + 64, y: boundary.position.y + 64 + yOffset}}},
        {player: {x: player.position.x, y: player.position.y}},
        boundary.type
      )
      player.moving = false
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

function playerInputEvent(direction, movables, boundaries){
  lastDirection = direction
  stopMotionWhenColliding(boundaries, lastDirection)
  if(player.moving) {
    move(direction, movables, moveSpeed)
    //might want to change
    player.img = eval(`player${direction}Img`)
  }
}

export function playerMovement(movables, boundaries) {
  if(keys.w.pressed && lastKey === 'w'){
    lastDirection = 'Up'
    playerInputEvent(lastDirection, movables, boundaries)
  } else if(keys.d.pressed && lastKey === 'd'){
    lastDirection = 'Right'
    playerInputEvent(lastDirection, movables, boundaries)
  } else if(keys.s.pressed && lastKey === 's'){
    lastDirection = 'Down'
    playerInputEvent(lastDirection, movables, boundaries)
  } else if(keys.a.pressed && lastKey === 'a'){
    lastDirection = 'Left'
    playerInputEvent(lastDirection, movables, boundaries)
  }
}

playerMovementEvent()