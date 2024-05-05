// all data pertaining to the player
import { audioObj } from "../data/audioData.js"
import { pogemonsObj } from "../data/pogemonData.js"
import { mapsObj } from "../data/mapsData.js"
import { movesObj } from "../data/movesData.js"
import { itemsObj } from "../data/itemsData.js"

import { Sprite, NPC, Pogemon } from "../classes.js"

import { loadData } from "../save.js"
import { scenes } from "./canvas.js"
import { changeMapInfo, currMap, itemSpritesArr, map, obstacleSpritesArr } from "./maps.js"

import { manageBattleState } from "./scenes/battle.js"
import { disableOWMenu, manageOverWorldState, returnPrevScene } from "./scenes/overworld.js"
import { managePcState } from "./scenes/pc.js"
import { switchStatsTargetWithKeys } from "./scenes/stats.js"

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

let walkSpeed = 7
let runSpeed = walkSpeed * 1.5
let moveSpeed = walkSpeed

export let player

let playerHeight = 128
let playerWidth = 64

const playerImg = new Image()
export const playerCharacter = 'ethan'
playerImg.src = `./img/charSprites/${playerCharacter}/${playerCharacter}.png`

let data

export let surfPogemonSprite

export async function generatePlayer(canvas){
  // if(playerInfo == undefined){
    await loadData().then(res => data = res)

    const surfPogemonImage = new Image()
    surfPogemonImage.src = 'img/charSprites/surf/blank.png'

    surfPogemonSprite = new Sprite({
      type: 'surfPogemon',
      img: surfPogemonImage,
      position:{
        x: canvas.width / 2 - playerWidth,
        y: canvas.height / 2 -  playerHeight / 2
      },
      frames: {
        max: 2,
        hold: 10
      },
      animate: false
    })

    if(data == null) {
      player = new NPC([], new Map(), 500, 'Down', 'player', new Sprite({
        type: 'player',
        position:{
          x: canvas.width / 2 - playerWidth / 2,
          y: canvas.height / 2 -  playerHeight / 2
        },
        img: playerImg,
        frames: {
          max: 4,
          hold: 10
        }
      }))

      player.catch(pogemonsObj['jlissue'], true, 'geneTown')
      player.catch(pogemonsObj['loko'], true, 'geneTown')
      player.catch(pogemonsObj['steeli'], true, 'geneTown')
      player.catch(pogemonsObj['maaph'], true, 'geneTown')
      player.catch(pogemonsObj['tadtoxic'], true, 'geneTown')
      player.catch(pogemonsObj['piny'], true, 'geneTown')

      return player
    } else {
      player = new NPC([], new Map(), 500, 'Down', 'player', new Sprite({
        type: 'player',
        position:{
          x: canvas.width / 2 - playerWidth / 2,
          y: canvas.height / 2 -  playerHeight / 2
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

        let remodeledPogemon = new Pogemon(pogemon.pogemon, Math.pow(pogemon.lvl, 3), false, pogemon.caughtMap, pogemon.heldItem, pogemon, pogemonSprite)

        remodeledPogemon.moves.length = 0

        data.playerInfo.teamMovesInfo[i].forEach((move, j) =>{
          let newMove = movesObj[`${data.playerInfo.teamMovesInfo[i][j][0]}`]
          newMove.pp = data.playerInfo.teamMovesInfo[i][j][1]
          remodeledPogemon.moves.push(newMove)
        })

        remodeledPogemon.learntMoves = data.playerInfo.teamLearntMovesInfo[i]

        player.team.push(remodeledPogemon)
      })
      player.money = data.playerInfo.player.money
      return player
    }
}

function keysInput() {
  window.addEventListener('keydown', e =>{
    if(scenes.get('overworld').initiated && player.disabled) return
    switch(e.key){
      case 'w':
      case 'W':
        if(scenes.get('stats').initiated){
          switchStatsTargetWithKeys(e.key)
        }
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
        if(scenes.get('stats').initiated){
          switchStatsTargetWithKeys(e.key)
        }
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
        if(player.surfing) return
        if(collisionWhileSurfing) return
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
        if(player.surfing) return
        player.animate = false
        break
      case 'd':
      case 'D':
        keys.d.pressed = false
        if(player.surfing) return
        player.animate = false
        break
      case 's':
      case 'S':
        keys.s.pressed = false
        if(player.surfing) return
        player.animate = false
        break
      case 'a':
      case 'A':
        keys.a.pressed = false
        if(player.surfing) return
        player.animate = false
        break
      case 'Shift':
        if(collisionWhileSurfing) return

        if(player.surfing){
          if(player.running){
            moveSpeed = walkSpeed
            player.running = false
            player.img.src = `img/charSprites/${playerCharacter}/${playerCharacter}.png`
          }
          return
        }
        moveSpeed = walkSpeed
        player.running = false
        player.img.src = `img/charSprites/${playerCharacter}/${playerCharacter}.png`
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
  if(data == null) return

  interaction.flags = data.interactionFlags
}

await setInteractionFlags()

function hoverEvent(state, target, item){
  if(state){
    document.querySelector('#pogemartMenuDescripion').textContent = itemsObj[item.name].desc
    target.style.backgroundColor = 'rgb(75, 75, 75, 0.5)'
  } else {
    document.querySelector('#pogemartMenuDescripion').textContent = ''
    if(target.id == 'selected') return
    target.style.backgroundColor = 'transparent'
  }
}

const pogemartBuyingInteraction = {
  initiated: false,
  product: null
}

let inputValue

document.querySelector('#pogemonBuyMenuInput').oninput = function(){
  if(document.querySelector('#pogemonBuyMenuInput').value >= 999){
    inputValue = 999
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
    document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
    return
  }

  if(document.querySelector('#pogemonBuyMenuInput').value <= 0 || document.querySelector('#pogemonBuyMenuInput').value == NaN || document.querySelector('#pogemonBuyMenuInput').value == '-') {
    inputValue = 0
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
    document.querySelector('#pogemartBuyMenuTextContainer').textContent = `Who many ${pogemartBuyingInteraction.product.name}'s will you buy?`
    return
  }

  inputValue = document.querySelector('#pogemonBuyMenuInput').value

  if(inputValue == 0) {
    document.querySelector('#pogemartBuyMenuTextContainer').textContent = `Who many ${pogemartBuyingInteraction.product.name}'s will you buy?`
    document.querySelector('#pogemonBuyMenuInput').value = 0
  } else {
    if([...inputValue][0].slice(0,1) == 0){
      inputValue = inputValue.slice(1, inputValue.length)
      document.querySelector('#pogemonBuyMenuInput').value = inputValue
    }

    document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
  }
}

function onArrowClickEvent(state){
  if(document.querySelector('#pogemonBuyMenuInput').value == NaN){
    inputValue = 999
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
  }

  if(state == 'up'){
    if(parseInt(document.querySelector('#pogemonBuyMenuInput').value) >= 999) {
      inputValue = 999
      document.querySelector('#pogemonBuyMenuInput').value = inputValue
      return
    }

    inputValue = parseInt(document.querySelector('#pogemonBuyMenuInput').value) + 1
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
    document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
  } else {
    if(parseInt(document.querySelector('#pogemonBuyMenuInput').value) <= 0 || document.querySelector('#pogemonBuyMenuInput').value == '-') {
      inputValue = 0
      document.querySelector('#pogemonBuyMenuInput').value = inputValue
      return
    }

    inputValue = parseInt(document.querySelector('#pogemonBuyMenuInput').value) - 1
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
    document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`

    if(inputValue != 0) return
    document.querySelector('#pogemartBuyMenuTextContainer').textContent = `Who many ${pogemartBuyingInteraction.product.name}'s will you buy?`
  }
}

function buyItemEvent(){
  const price = pogemartBuyingInteraction.product.price * inputValue
  if(price > player.money){
    document.querySelector('#pogemartMenuDescripion').textContent = "You can't afford that.."
  } else {
    player.money = player.money - price
    player.bag.set(`${pogemartBuyingInteraction.product.name}`, {item: {...itemsObj[pogemartBuyingInteraction.product.name]}, quantity: player.bag.get(`${pogemartBuyingInteraction.product.name}`).quantity + inputValue})
    document.querySelector('#pogemartMoneyAmountContainer').textContent = player.money
    document.querySelector('#pogemartMenuDescripion').textContent = 'Thank you for your purchase!'
  }
  
  // pogemartBuyingInteraction.initiated = false
  // pogemartBuyingInteraction.product = null
}

document.querySelectorAll('.pogemonBuyMenuArrow')[0].addEventListener('click', e => onArrowClickEvent('up'))
document.querySelectorAll('.pogemonBuyMenuArrow')[1].addEventListener('click', e => onArrowClickEvent('down'))
document.querySelectorAll('.pogemartBuyConfirmationOptions')[0].addEventListener('click', e => buyItemEvent())

function onClickEvent(state, target, item){
  const pogemartMenuDescripion = document.querySelector('#pogemartMenuDescripion')
  const pogemartBuyMenu = document.querySelector('#pogemartBuyMenu')

  pogemartBuyingInteraction.initiated = true
  if(item != undefined){
    pogemartBuyingInteraction.product = item
  }

  if(pogemartInteraction.initiated == false) return
  if(state){
    if(inputValue == undefined) inputValue = 0
    if(inputValue == 0) document.querySelector('#pogemartBuyMenuTextContainer').textContent = `Who many ${item.name}'s will you buy?`
    else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${item.name}'s?\n\nThat will cost you ${item.price * inputValue}.`

    document.querySelectorAll('.pogemartItemsContainer').forEach(node =>{
      node.style.backgroundColor = 'transparent'
      node.id = ''
    })

    target.id = 'selected'
    target.style.backgroundColor = 'rgba(75,75,75,0.5)'

    pogemartMenuDescripion.style.display = 'none'

    pogemartBuyMenu.style.display = 'grid'
  } else {
    //check if target is either input, yes or no button or items button
    if(target.classList[0] == 'pogemartItemsContainer') return
    if(target.classList[0] == 'pogemonBuyMenuInteraction') return
    if(target.classList[0] == 'pogemonBuyMenuArrow') return

    pogemartMenuDescripion.style.display = 'block'
    pogemartBuyMenu.style.display = 'none'
    
    pogemartBuyingInteraction.initiated = false

    document.querySelectorAll('.pogemartItemsContainer').forEach(node =>{
      node.id = ''
      node.style.backgroundColor = 'transparent'
    })
  }
}

addEventListener('click', e => {
  onClickEvent(false, e.target)
})

document.querySelector('#pogemonBuyMenuBuyInteraction').addEventListener('click', e =>{
  if(inputValue <= 0) return

  document.querySelector('#pogemartBuyConfirmationMenuText').innerText = `Do you really want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nIt will cost you a total of ${inputValue * pogemartBuyingInteraction.product.price}`

  document.querySelector('#pogemartBuyMenu').style.display = 'none'
  document.querySelector('#pogemartMenuDescripion').style.display = 'none'
})

function generatePogemartMenu(products){
  pogemartInteraction.initiated = true
  const pogemartContainer = document.querySelector('#pogemartContainer')
  pogemartContainer.style.display = 'block'

  document.querySelector('#overworldDialogueContainer').style.display = 'none'
  document.querySelector('#pogemartMoneyAmountContainer').textContent = player.money

  document.querySelector('#pogemonBuyMenuInput').value = 0

  products.forEach(product =>{
    const itemContainer = document.createElement('div')
    itemContainer.setAttribute('class', 'pogemartItemsContainer')
    document.querySelector('#pogemartItemsContainer').appendChild(itemContainer)
    itemContainer.addEventListener('mouseover', e => hoverEvent(true, e.target, product))
    itemContainer.addEventListener('mouseout', e => hoverEvent(false, e.target))
    itemContainer.addEventListener('click', e => onClickEvent(true, e.target, product))

    const itemIcon = document.createElement('img')
    itemIcon.setAttribute('class', 'pogemartItemsIcon')
    itemIcon.src = itemsObj[product.name].img
    itemContainer.appendChild(itemIcon)

    const itemName = document.createElement('div')
    itemName.setAttribute('class', 'pogemartItemsName')
    itemName.innerText = `${product.name}`
    itemContainer.appendChild(itemName)

    const itemPriceContainer = document.createElement('div')
    itemPriceContainer.setAttribute('class', 'pogemartItemPriceContainer')
    itemContainer.appendChild(itemPriceContainer)

    const itemPogebuckIcon = document.createElement('img')
    itemPogebuckIcon.setAttribute('class', 'pogemartItemsPogebuckIcon')
    itemPogebuckIcon.src = 'img/item_scene/pogebuck.png'
    itemPriceContainer.appendChild(itemPogebuckIcon)

    const itemPrice = document.createElement('div')
    itemPrice.setAttribute('class', 'pogemartItemsAmount')
    itemPrice.innerText = `${product.price}`
    itemPriceContainer.appendChild(itemPrice)
  })
}

export const pogemartInteraction = {
  initiated: false
}

let healProcess = false

function playerInteraction(e) {
  if(scenes.get('overworld').initiated == false) return
  if(e.key != ' ') return

  let openWindow = document.querySelector('#openWindow')
  
  if(player.interaction == undefined) return
  switch(player.interaction.name){
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
      disableOWMenu.active = true

      interaction.initiated = true
      player.disabled = true

      document.querySelector('#overworldDialogueContainer').style.display = 'grid'

      for(let i = 0; i < player.interaction.info.dialogue.length; i++){
        if(i == 0) player.team[0].dialogue('overworld', player.interaction.info.dialogue[i])
        else queue.push(() => {
          player.team[0].dialogue('overworld', player.interaction.info.dialogue[i])
        })
      }

      openWindow.style.backgroundColor = 'transparent'
      openWindow.replaceChildren()

      switch(player.interaction.info.type){
        case 'pogecenter':
          healProcess = true
          player.team.forEach(pogemon =>{
            pogemon.hp = pogemon.stats.baseHp
            pogemon.fainted = false
          })
          queue.push(() =>{
            setTimeout(() =>{
              healProcess = false
              player.team[0].dialogue('overworld', `Your pogemons are now all healed up!`)
            }, 1000)
          })
          break
        case 'pogemart':
          queue.push(() =>{
            generatePogemartMenu(mapsObj[`pogemart`].productOptions[0])
            disableOWMenu.active = false
            inputValue = 0
          })
          break
      }
        
      if(player.interaction.info.type == undefined) return
      break
    case 'starter':
      if(interaction.flags.starter) return
      if(interaction.initiated) return

      interaction.initiated = true

      let starters = [pogemonsObj['loko'], pogemonsObj['steeli'], pogemonsObj['maaph']]
      let starter = starters[player.interaction.info.starter]

      player.disabled = true

      openWindow.replaceChildren()
      openWindow.style.backgroundColor = 'rgba(0,0,0,0.75)'

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

              player.catch(starter, true, currMap)

              interaction.flags.starter = true

              openWindow.style.backgroundColor = 'transparent'
              openWindow.replaceChildren()
            })
          })
        }
      })
      break
    case 'item':
      if(player.interaction.info.pickedUp == true) return
      player.disabled = true

      scenes.set('pickingItem', {initiated: true})

      let item = {...itemsObj[player.interaction.info.name]}

      Object.values(keys).forEach(value =>{
        value.pressed = false
      })

      gsap.to(document.querySelector('#overlapping'), {
        opacity: 0.5
      })

      player.team[0].dialogue('overworld', `You picked up a ${item.name}.`)

      const itemImage = new Image()
      itemImage.src = `img/item_scene/items/${item.type}/${item.name}.png`
      itemImage.id = 'pickedUpItem'

      document.querySelector('#openWindow').appendChild(itemImage)
      
      player.bag.set(player.interaction.info.name, {item: {...itemsObj[player.interaction.info.name]}, quantity: player.bag.get(`${player.interaction.info.name}`).quantity + player.interaction.info.amount})

      player.interaction.collisionInstance.boundary.collision = false
      player.interaction.info.pickedUp = true

      itemSpritesArr.forEach((sprite, i) => {if(sprite.type == player.interaction.collisionInstance.pogeballSprite.type) itemSpritesArr.splice(i, 1)})
      break
    case 'tree':
    case 'rock':
      if(player.interaction.info.disabled) return

      player.interaction.collisionInstance.obstacleSprite.animate = true
      player.disabled = true
      setTimeout(() =>{
        player.interaction.collisionInstance.obstacleSprite.animate = false
        player.interaction.collisionInstance.boundary.collision = false      
        player.interaction.info.disabled = true
        player.disabled = false
        obstacleSpritesArr.forEach((sprite, i) => {if(sprite.type == player.interaction.collisionInstance.obstacleSprite.type) obstacleSpritesArr.splice(i, 1)})
      }, 1450)
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

let waterCollided = false

let collisionWhileSurfing = false

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
      case 8:
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
            yOffset = playerOffset - 25
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
      if(boundary.collision) player.animate = false

      let surfCheck = false

      player.team.forEach(pogemon =>{
        if(pogemon.pogemon.surfable){
          surfCheck = true
        }
      })

      if(!surfCheck) return

      if(type == 8){
        if(player.surfing) return

        waterCollided = true

        player.animate = true
        player.running = false
        moveSpeed = walkSpeed

        setTimeout(() => {
          if(player.walking) return
          player.img.src = `img/charSprites/ethan/${playerCharacter}_surf.png`
        }, 250)

        surfPogemonSprite.img.src = `img/charSprites/surf/surf_${direction}.png`
        surfPogemonSprite.animate = true
        player.surfing = true
        player.walking = false
      }

      if(type == 1){
        if(waterCollided){
          if(!player.surfing) return
          surfPogemonSprite.img.src = `img/charSprites/surf/surf_${direction}.png`
          surfPogemonSprite.animate = true
          collisionWhileSurfing = true
        }
      }
      break
    } else {
      if(player.surfing){
        if(!collisionWhileSurfing){
          player.img.src = `img/charSprites/ethan/${playerCharacter}.png`
          surfPogemonSprite.img.src = `img/charSprites/surf/blank.png`
          surfPogemonSprite.animate = false
        }
        collisionWhileSurfing = false
      }

      player.surfing = false
      player.walking = true
    }
  }
}

function engageBattle(animationId, battleZones) {
  if(player.team.length < 1) return
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
  if(!collisionWhileSurfing){
    player.img.src = 'img/charSprites/ethan/ethan.png'
    if(player.running) player.img.src = 'img/charSprites/ethan/ethan_run.png'
  }

  if(player.surfing) player.img.src = 'img/charSprites/ethan/ethan_surf.png'
  
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
      if(player.team.length > 1) {
        if(eventZonesIndex.info.createdTrainer != undefined){
          for(let i = 0; i < mapsObj[currMap.name].trainers.length; i++){
            if(mapsObj[currMap.name].trainers[i].beaten == true) return
          }

          if(eventZonesIndex.info.beaten) return
          
          disableOWMenu.active = true
          
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
                            disableOWMenu.active = false
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
  } else if(!healProcess) {
    if(player.interaction.name == 'item') gsap.to(document.querySelector('#overlapping'), {
      opacity : 0,
      onComplete : () =>{
        document.querySelector('#openWindow').replaceChildren()
        scenes.set('pickingItem', {initiated: false})
        player.interaction = null
      }
    })

    document.querySelector('#overworldDialogueContainer').style.display = 'none'
    player.disabled = false
    disableOWMenu.active = false
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

keysInput()