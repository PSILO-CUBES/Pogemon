// all data pertaining to the player

import { Boundary, Sprite } from "../classes.js"
import { generateCanvas } from "./canvas.js"

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

let walkSpeed = 5
let runSpeed = walkSpeed * 1.5
let moveSpeed = walkSpeed

let player
let playerHeight = 132
let playerWidth  = 84

let moving = true

export function generatePlayerImg(canvas){
  const playerImg = new Image()
  playerImg.src = './img/protagSprites/brendan/brendanStandDown.png'

  player = new Sprite({
    position:{
      x: canvas.width / 2 - playerWidth / 2,
      y: canvas.height / 2 -  playerHeight / 2
    },
    img: playerImg,
    frames: {max: 2}
  })

  return player
}

let boundaryPrediction = 15

function playerMovementEvent() {
  window.addEventListener('keydown', e =>{
    switch(e.key){
      case 'w':
      case 'W':
        keys.w.pressed = true
        lastKey = 'w'
        break
      case 'd':
      case 'D':
        keys.d.pressed = true
        lastKey = 'd'
        break
      case 's':
      case 'S':
        keys.s.pressed = true
        lastKey = 's'
        break
      case 'a':
      case 'A':
        keys.a.pressed = true
        lastKey = 'a'
        break
      case 'Shift':
        moveSpeed = runSpeed
        break
    }
  })
  window.addEventListener('keyup', e =>{
    switch(e.key){
      case 'w':
      case 'W':
        keys.w.pressed = false
        break
      case 'd':
      case 'D':
        keys.d.pressed = false
        break
      case 's':
      case 'S':
        keys.s.pressed = false
        break
      case 'a':
      case 'A':
        keys.a.pressed = false
        break
      case 'Shift':
        moveSpeed = walkSpeed
        break
    }
  })
}

function rectangularColission({ rectangle1, rectangle2 }){
  return (
    rectangle1.position.x + boundaryPrediction <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.x + rectangle1.width - boundaryPrediction >= rectangle2.position.x
    && rectangle1.position.y + boundaryPrediction <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height - boundaryPrediction >= rectangle2.position.y
    )
}

function stopMotionWhenColliding(boundaries, direction){
  for(let i = 0; i < boundaries.length; i++){
    const boundary = boundaries[i]

    moving = true

    let type = boundary.type

    let xOffset
    let yOffset

    let charOffset
    
    switch(type){
      case 1:
        charOffset = 5
        switch(direction){
          case 'up':
            xOffset = 0
            yOffset = charOffset
          break
          case 'right':
            xOffset = -charOffset
            yOffset = 0
          break
          case 'down':
            xOffset = 0
            yOffset = -charOffset
          break
          case 'left':
            xOffset = charOffset
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
      // console.log(player)
      // console.log(boundary)
      moving = false
      break
    }
  }
}

export function playerMovement(movables, boundaries) {
  if(keys.w.pressed && lastKey === 'w'){
    stopMotionWhenColliding(boundaries, 'up')
    if(moving){
      movables.forEach(movable =>{
        movable.position.y += moveSpeed
      })
    }
  }
  else if (keys.d.pressed && lastKey === 'd'){
    stopMotionWhenColliding(boundaries, 'right')
    if(moving){
      movables.forEach(movable =>{
        movable.position.x -= moveSpeed
      })
    }
  }
  else if (keys.s.pressed && lastKey === 's'){
    stopMotionWhenColliding(boundaries, 'down')
    if(moving){
      movables.forEach(movable =>{
        movable.position.y -= moveSpeed
      })
    }
  }
  else if (keys.a.pressed && lastKey === 'a'){
    stopMotionWhenColliding(boundaries, 'left')
    if(moving){
      movables.forEach(movable =>{
        movable.position.x += moveSpeed
      })
    }
  }
}

playerMovementEvent()