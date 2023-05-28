// all data pertaining to the player

import { Sprite } from "../classes.js"

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
let runSpeed = walkSpeed * 4.5
let moveSpeed = walkSpeed

export function generatesPlayerImg (){
  const playerImg = new Image()
  playerImg.src = './img/protagSprites/brendan/brendanStandDown.png'

  const player = new Sprite({
    name: 'player',
    position:{
      x: playerImg.width,
      y: 0
    },
    img: playerImg
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

export function playerMovement(movables) {
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
}

playerMovementEvent()