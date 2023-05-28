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

function rectangularColission({ rectangle1, rectangle2}){
  return (
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

export function playerMovement(movables, boundaries) {
  if(keys.w.pressed && lastKey === 'w'){
    movables.forEach(movable =>{
      movable.position.y += moveSpeed
    })
  } 
  else if (keys.d.pressed && lastKey === 'd'){
    movables.forEach(movable =>{
      movable.position.x -= moveSpeed
    })
  } 
  else if (keys.s.pressed && lastKey === 's'){
    movables.forEach(movable =>{
      movable.position.y -= moveSpeed
    })
  } 
  else if (keys.a.pressed && lastKey === 'a'){
    movables.forEach(movable =>{
      movable.position.x += moveSpeed
    })
  }

  boundaries.forEach(boundary =>{
    if(
      rectangularColission({
        rectangle1: player,
        rectangle2: boundary
      })
    ){
      console.log('collision')
    }
  })
}

playerMovementEvent()