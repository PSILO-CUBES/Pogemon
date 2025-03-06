// all data pertaining to the player
import { audioObj } from "../data/audioData.js"
import { pogemonsObj } from "../data/pogemonData.js"
import { mapsObj } from "../data/mapsData.js"
import { movesObj } from "../data/movesData.js"
import { itemsObj } from "../data/itemsData.js"

import { Sprite, Character, Pogemon } from "../classes.js"

import { loadData } from "../save.js"
import { scenes } from "./canvas.js"
import { changeMapInfo, currMap, generateMapData, itemSpritesArr, map, obstacleSpritesArr, pogecenterReturnInfo, worldEventData } from "./maps.js"

import { catchEventObj, initRenameEvent, manageBattleState } from "./scenes/battle.js"
import { changeMap, disableOWMenu, manageOverWorldState, menu, playerTeamItemsState, prevScene, returnPrevScene, waitForNextBattle } from "./scenes/overworld.js"
import { managePcState } from "./scenes/pc.js"
import { switchStatsTargetWithKeys, switchUnderScoreForSpace } from "./scenes/stats.js"
import { abilitiesObj } from "../data/abilitiesData.js"
import { manageEvolutionState } from "./scenes/evolution.js"
import { natureObj } from "../data/natureData.js"
import { _preventActionSpam } from "../app.js"
import { playerName } from "./scenes/boot.js"

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

let walkSpeed = 10
let runSpeed = Math.floor(walkSpeed * 1.5)
let moveSpeed = walkSpeed

export let player

let playerHeight = 128
let playerWidth = 64

const playerImg = new Image()
export const playerCharacter = 'ethan'
playerImg.src = `./img/charSprites/${playerCharacter}/${playerCharacter}.png`

const data = await loadData('saveFile')

export let surfPogemonSprite

export async function generatePlayer(canvas){
  // if(playerInfo == undefined){
    // await loadData("saveFile").then(res => data = res)

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
      player = new Character([], new Map(), 500, 'Down', null, 'ethan', new Sprite({
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

      // player.catch(pogemonsObj.loko, true, mapsObj.lab.name)
      // player.catch(pogemonsObj.nahass, true, mapsObj.lab.name)
      // player.catch(pogemonsObj.allingua, true, mapsObj.lab.name)

      // worldEventData.maat.firstMeet = true
      
      setTimeout(() =>{
        // player.bag.set("ultimball", {item: {...itemsObj.ultimball}, quantity: 999})
        // player.bag.set("potion", {item: {...itemsObj.potion}, quantity: 999})
        player.bag.set('pogeball', {item: {...itemsObj.pogeball}, quantity: 6})
        player.bag.set('potion', {item: {...itemsObj.potion}, quantity: 5})
        // player.bag.set("TM040", {item: {...itemsObj["TM040"]}, quantity: 999})
        
        // player.bag.set("illuminated_Gem", {item: {...itemsObj.illuminated_Gem}, quantity: 1})
        // player.bag.set("fleeting_Gem", {item: {...itemsObj.teleport_Gem}, quantity: 1})

        // player.bag.set("map", {item: {...itemsObj.map}, quantity: 1})
        // player.bag.set("golden_Disk", {item: {...itemsObj.golden_Disk}, quantity: 999})
        // player.bag.set("super_Repel", {item: {...itemsObj.super_Repel}, quantity: 999})
        // player.bag.set("rare_Candy", {item: {...itemsObj.rare_Candy}, quantity: 999})
        // player.bag.set("regina_Esca", {item: {...itemsObj.regina_Esca}, quantity: 999})
      }, 250)

      player.pogedexInfo.forEach(pogedex =>{
        // pogedex.seen = true
        // pogedex.caught = true
      })

      Object.values(mapsObj).forEach((map,i) =>{
        // if(i != 0) map.seen = true

      })

      // player.badges[0] = true
      // player.badges[1] = true
      // player.badges[2] = true

      return player
    } else {
      player = new Character([], new Map(), 500, 'Down', data.playerInfo.player.name, 'ethan', new Sprite({
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

      // setTimeout(() =>{
        // player.bag.set("TM040", {item: {...itemsObj["TM040"]}, quantity: 999})
      //   // player.bag.set("illuminated_Gem", {item: {...itemsObj.illuminated_Gem}, quantity: 1})
      //   // player.bag.set("fleeting_Gem", {item: {...itemsObj.teleport_Gem}, quantity: 1})
  
      //   // player.bag.set("map", {item: {...itemsObj.map}, quantity: 1})
      //   // player.bag.set("golden_Disk", {item: {...itemsObj.golden_Disk}, quantity: 999})
      //   // player.bag.set("super_Repel", {item: {...itemsObj.super_Repel}, quantity: 999})
      //   // player.bag.set("rare_Candy", {item: {...itemsObj.rare_Candy}, quantity: 999})
      //   // player.bag.set("regina_Esca", {item: {...itemsObj.regina_Esca}, quantity: 999})
      // }, 250)

      player.team.length = 0

      data.playerInfo.player.team.forEach((pogemon,i) =>{
        let pogemonImg = new Image()

        let pogemonSprite = new Sprite({
          type: 'pogemon',
          position: pogemon.position,
          img: pogemonImg,
          frames: {
            max: 4,
            hold: 60
          },
          animate: true
        })

        let remodeledPogemon = new Pogemon(pogemonsObj[`${pogemon.name}`], Math.pow(pogemon.lvl, 3), false, pogemon.caughtMap, pogemon.heldItem, null, null, null, null, null, null, null, pogemon, pogemonSprite)

        remodeledPogemon.moves.length = 0

        data.playerInfo.teamMovesInfo[i].forEach((move, j) =>{
          let newMove = {...movesObj[`${data.playerInfo.teamMovesInfo[i][j][0]}`]}
          newMove.pp = data.playerInfo.teamMovesInfo[i][j][1]
          remodeledPogemon.moves.push(newMove)
        })

        remodeledPogemon.learntMoves = data.playerInfo.teamLearntMovesInfo[i]

        player.team.push(remodeledPogemon)

        if(player.team[i].nature.values == undefined){
          player.team[i].nature.values = natureObj[player.team[i].nature.name]
        }
      })

      player.money = data.playerInfo.player.money

      player.pogedexInfo = data.playerInfo.player.pogedexInfo

      player.surfing = data.playerInfo.player.surfing

      if(player.surfing){
        if(!showSurf) return
        player.img.src = 'img/charSprites/ethan/ethan_surf.png'
        surfPogemonSprite.img.src = `img/charSprites/surf/surf_down.png`
        surfPogemonSprite.animate = true
      }

      Object.values(data.playerInfo.player.badges).forEach((badge,i) =>{
        player.badges[i] = badge
      })

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

    if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
      else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s go for ${pogemartBuyingInteraction.product.value} a unit.\n\nWould you like to sell ${inputValue} for ${pogemartBuyingInteraction.product.value * inputValue}?`
    
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

    if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
      else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s go for ${pogemartBuyingInteraction.product.value} a unit.\n\nWould you like to sell ${inputValue} for ${pogemartBuyingInteraction.product.value * inputValue}?`
  }
}

function onArrowClickEvent(state){
  if(document.querySelector('#pogemonBuyMenuInput').value == NaN){
    inputValue = 999
    document.querySelector('#pogemonBuyMenuInput').value = inputValue
  }

  if(state == 'up'){
    if(transactionType == 'buy'){
      if(parseInt(document.querySelector('#pogemonBuyMenuInput').value) >= 999) {
        inputValue = 999
        document.querySelector('#pogemonBuyMenuInput').value = inputValue
        return
      }
    } else {
      // console.log(player.bag.get(pogemartBuyingInteraction.product.name).quantity)
      if(parseInt(document.querySelector('#pogemonBuyMenuInput').value) > player.bag.get(pogemartBuyingInteraction.product.name).quantity){
        inputValue = player.bag.get(pogemartBuyingInteraction.product.name).quantity
      }
    }

    inputValue = parseInt(document.querySelector('#pogemonBuyMenuInput').value) + 1
    document.querySelector('#pogemonBuyMenuInput').value = inputValue

    if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
      else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s go for ${pogemartBuyingInteraction.product.value} a unit.\n\nWould you like to sell ${inputValue} for ${pogemartBuyingInteraction.product.value * inputValue}?`
  
  } else {
    if(parseInt(document.querySelector('#pogemonBuyMenuInput').value) <= 0 || document.querySelector('#pogemonBuyMenuInput').value == '-') {
      inputValue = 0
      document.querySelector('#pogemonBuyMenuInput').value = inputValue
      return
    }

    inputValue = parseInt(document.querySelector('#pogemonBuyMenuInput').value) - 1
    document.querySelector('#pogemonBuyMenuInput').value = inputValue

    if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
      else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s go for ${pogemartBuyingInteraction.product.value} a unit.\n\nWould you like to sell ${inputValue} for ${pogemartBuyingInteraction.product.value * inputValue}?`

    if(inputValue != 0) return

    if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').textContent = `How many ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s will you buy?`
    else document.querySelector('#pogemartBuyMenuTextContainer').textContent = `How many ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s would you like to sell?`
  }
}

function transactionEvent(){
  document.querySelector('#pogemartMenuDescripion').style.display = 'block'
  
  if(transactionType == 'buy'){
    const price = pogemartBuyingInteraction.product.price * inputValue
    if(price > player.money){
      document.querySelector('#pogemartMenuDescripion').textContent = "You can't afford that.."
    } else {
      player.money = player.money - price
      player.bag.set(`${pogemartBuyingInteraction.product.name}`, {item: {...itemsObj[pogemartBuyingInteraction.product.name]}, quantity: player.bag.get(`${pogemartBuyingInteraction.product.name}`).quantity + inputValue})
      document.querySelector('#pogemartMoneyAmountContainer').textContent = player.money
      document.querySelector('#pogemartMenuDescripion').textContent = 'Thank you for your purchase!'
    }
  } else {
    if(inputValue > player.bag.get(pogemartBuyingInteraction.product.name).quantity){
      document.querySelector('#pogemartMenuDescripion').textContent = `You do not have this many ${pogemartBuyingInteraction.product.name}'s on you, please enter a correct amount.`
    } else {
      const price = pogemartBuyingInteraction.product.value * inputValue

      player.money = player.money + price
      player.bag.set(`${pogemartBuyingInteraction.product.name}`, {item: {...itemsObj[pogemartBuyingInteraction.product.name]}, quantity: player.bag.get(`${pogemartBuyingInteraction.product.name}`).quantity - inputValue})
      document.querySelector('#pogemartMoneyAmountContainer').textContent = player.money
      document.querySelector('#pogemartMenuDescripion').textContent = 'Thank you for your business!'

      printItemList(document.querySelector('#pogemartSellList'))
    }
  }
  // pogemartBuyingInteraction.initiated = false
  // pogemartBuyingInteraction.product = null
}

let transactionType

function openBuyMenu(){
  transactionType = 'buy'
  document.querySelector('#pogemartBuyItemsButton').style.display = 'none'
  document.querySelector('#pogemartSellItemsButton').style.display = 'none'
  document.querySelector('#pogemartItemsContainer').style.display = 'grid'
}

function itemHoverEvent(e, state){
  if(state){
    e.target.style.cursor = 'pointer'
    e.target.style.backgroundColor = 'rgba(75,75,75,0.3)'
  } else {
    if(e.target.id == 'selected') return
    e.target.style.cursor = 'auto'
    e.target.style.backgroundColor = 'transparent'
  }
}

const defaultType = 'misc'
let currType = defaultType
const itemsTypeArr = ['misc', 'med', 'ball', 'berry', 'tm', 'battle', 'vals', 'key']

function itemTypeOnClick(e){
  document.querySelector('#pogemartSellItemsHeader').childNodes.forEach(node =>{
    node.childNodes[0].style.backgroundColor = 'transparent'
    node.childNodes[0].id = ''
  })

  e.target.style.backgroundColor = 'rgba(75,75,75,0.3)'
  e.target.id = 'selected'
  currType = e.target.classList[1]

  printItemList(document.querySelector('#pogemartSellList'))
}

function printItemList(pogemartSellList){
  pogemartSellList.replaceChildren()

  let currItemsArr = []

  player.bag.forEach(key =>{
    // console.log(key.item.type)
    if(key.item.type == currType) currItemsArr.push(key)
  })

  for(let i = 0; i < currItemsArr.length; i++){
    const sortedItem = currItemsArr[i]

    if(sortedItem.quantity == 0) continue

    const itemContainer = document.createElement('div')
    itemContainer.setAttribute('class', 'pogemartItemsContainer')
    itemContainer.addEventListener('mouseover', e => hoverEvent(true, e.target, sortedItem.item))
    itemContainer.addEventListener('mouseout', e => hoverEvent(false, e.target))
    itemContainer.addEventListener('click', e => onClickEvent(true, e.target, sortedItem.item))

    const item = sortedItem.item

    const itemImage = new Image()
    itemImage.setAttribute('class', 'pogemartItemsIcon')
    itemImage.src = item.img

    const itemName = document.createElement('div')
    itemName.setAttribute('class', 'pogemartItemsName')
    itemName.textContent = switchUnderScoreForSpace(item.name)

    const itemQuantity = document.createElement('div')
    itemQuantity.setAttribute('class', 'pogemartItemsName')
    itemQuantity.textContent = sortedItem.quantity

    itemContainer.appendChild(itemImage)
    itemContainer.appendChild(itemName)
    itemContainer.appendChild(itemQuantity)

    pogemartSellList.appendChild(itemContainer)
  }
}

function printSellItemMenu(){
  const pogemartSellItemsContainer = document.querySelector('#pogemartSellItemsContainer')

  const pogemartSellHeader = document.createElement('div')
  pogemartSellHeader.id = 'pogemartSellItemsHeader'

  const pogemartSellList = document.createElement('div')
  pogemartSellList.id = 'pogemartSellList'

  pogemartSellItemsContainer.appendChild(pogemartSellHeader)
  pogemartSellItemsContainer.appendChild(pogemartSellList)

  for(let j = 0; j < itemsTypeArr.length; j++){
    //icon containers
    pogemartSellHeader.style.display = 'grid'

    const martSellItemTypeDom = document.createElement('div')
    martSellItemTypeDom.classList.add('pogemartSceneSellItemType')
    pogemartSellHeader.appendChild(martSellItemTypeDom)

    //indiv icon
    const martSellItemTypeImgDom = new Image()
    martSellItemTypeImgDom.classList.add('pogemartSelItemTypeImg')
    martSellItemTypeImgDom.classList.add(`${itemsTypeArr[j]}`)
    martSellItemTypeImgDom.src = `img/item_scene/${j}.png`
    if(martSellItemTypeImgDom.classList[1] == currType){
      martSellItemTypeImgDom.style.backgroundColor = 'rgba(128, 128, 128, 0.3)'
      martSellItemTypeImgDom.id = 'selected'
    }

    martSellItemTypeImgDom.addEventListener('mouseover', e => itemHoverEvent(e, true))
    martSellItemTypeImgDom.addEventListener('mouseout', e => itemHoverEvent(e, false))
    martSellItemTypeImgDom.addEventListener('click', e => itemTypeOnClick(e))

    martSellItemTypeDom.appendChild(martSellItemTypeImgDom)
  }

  printItemList(pogemartSellList)
}

function openSellMenu(){
  transactionType = 'sell'
  document.querySelector('#pogemartBuyItemsButton').style.display = 'none'
  document.querySelector('#pogemartSellItemsButton').style.display = 'none'
  document.querySelector('#pogemartSellItemsContainer').style.display = 'grid'

  printSellItemMenu()
}

document.querySelectorAll('.pogemonBuyMenuArrow')[0].addEventListener('click', e => onArrowClickEvent('up'))
document.querySelectorAll('.pogemonBuyMenuArrow')[1].addEventListener('click', e => onArrowClickEvent('down'))
document.querySelector('#pogemartBuyItemsButton').addEventListener('click', e => openBuyMenu())
document.querySelectorAll('.pogemartBuyConfirmationOptions')[0].addEventListener('click', e => transactionEvent())
document.querySelectorAll('.pogemartBuyConfirmationOptions')[1].addEventListener('click', e => onClickEvent(false, e.target, ))
document.querySelector('#pogemartSellItemsButton').addEventListener('click', e => openSellMenu())

// pogemart shop on click vv what a dumb name to give something, mad fucking vague
function onClickEvent(state, target, itemType){
  // if(target.classList[0] == 'pogemartItemsContainer' || target.classList[0] == 'pogemartBuyConfirmationOptions') document.querySelector('#pogemartSellItemsButton').style.display = 'none'
  
  const pogemartMenuDescripion = document.querySelector('#pogemartMenuDescripion')
  const pogemartBuyMenu = document.querySelector('#pogemartBuyMenu')

  pogemartBuyingInteraction.initiated = true

  if(pogemartInteraction.initiated == false) return
  if(state){

    const item = itemsObj[itemType.name]
  
    if(item != undefined){
      if(item.value == null && transactionType == 'sell'){
        document.querySelector('#pogemartMenuDescripion').textContent = 'I cannot buy this from you, sorry.'
        return
      }
    }
  
    if(transactionType == 'buy') document.querySelector('#pogemonBuyMenuBuyInteraction').textContent = 'buy'
    else document.querySelector('#pogemonBuyMenuBuyInteraction').textContent = 'sell'

    if(item != undefined){
      pogemartBuyingInteraction.product = item
    }

    if(inputValue == undefined) inputValue = 0
    
    if(inputValue == 0) {
      if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').textContent = `How many ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s will you buy?`
      else document.querySelector('#pogemartBuyMenuTextContainer').textContent = `How many ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s would you like to sell?`
    }
    else {
      if(transactionType == 'buy') document.querySelector('#pogemartBuyMenuTextContainer').innerText = `So, you want to buy ${inputValue} ${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s?\n\nThat will cost you ${pogemartBuyingInteraction.product.price * inputValue}.`
      else document.querySelector('#pogemartBuyMenuTextContainer').innerText = `${switchUnderScoreForSpace(pogemartBuyingInteraction.product.name)}'s go for ${pogemartBuyingInteraction.product.value} a unit.\n\nWould you like to sell ${inputValue} for ${pogemartBuyingInteraction.product.value * inputValue}?`
    }

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

    if(inputValue == undefined) inputValue = 0

    document.querySelectorAll('.pogemartItemsContainer').forEach(node =>{
      node.id = ''
      node.style.backgroundColor = 'transparent'
    })
  }
}

// addEventListener('click', e => {
//   onClickEvent(false, e.target)
// })

document.querySelector('#pogemonBuyMenuBuyInteraction').addEventListener('click', e =>{
  if(inputValue <= 0) return

  if(transactionType == 'buy') document.querySelector('#pogemartBuyConfirmationMenuText').innerText = `Do you really want to buy ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nIt will cost you a total of ${inputValue * pogemartBuyingInteraction.product.price}`
  else document.querySelector('#pogemartBuyConfirmationMenuText').innerText = `Do you really want to sell ${inputValue} ${pogemartBuyingInteraction.product.name}'s?\n\nI'll buy them from you for a total of ${inputValue * pogemartBuyingInteraction.product.value}`

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
    itemName.innerText = `${switchUnderScoreForSpace(product.name)}`
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
    itemPrice.innerText = `${itemsObj[product.name].price}`
    itemPriceContainer.appendChild(itemPrice)
  })
}

export const pogemartInteraction = {
  initiated: false
}

let healProcess = false

let goldieEvoFlag = false
let soundFlag = false

export function itemPickUp(item, amount, msg){
  player.disabled = true
  console.log('playerDisabled')

  scenes.set('pickingItem', {initiated: true})
  
  Object.values(keys).forEach(value =>{
    value.pressed = false
  })

  player.team[0].dialogue('overworld', msg)
  console.log('messageNow')
  
  gsap.to(document.querySelector('#overlapping'), {
    opacity: 0.5
  })
  
  const itemImage = new Image()
  itemImage.src = item.img
  console.log(item.img)
  itemImage.id = 'pickedUpItem'
        
  document.querySelector('#openWindow').replaceChildren()
  document.querySelector('#openWindow').appendChild(itemImage)
        
  player.bag.set(item.name, {item: {...itemsObj[item.name]}, quantity: player.bag.get(item.name).quantity + amount})
  
  if(player.interaction.info.name != undefined){
    if(player.interaction.collisionInstance != undefined) player.interaction.collisionInstance.boundary.collision = false

    if(player.interaction.info.eventKey == 'bananacopia'){

    } else player.interaction.info.pickedUp = true

    if(mapsObj[currMap.name].items != undefined)mapsObj[currMap.name].items.forEach(item =>{
      // console.log(item.name == player.interaction.info.name)
      if(player.interaction.info.eventKey == 'bananacopia') return
      if(item.name == player.interaction.info.name) item.pickedUp = true
    })
    
    if(data != undefined || data != null){
      if(player.interaction.info.eventKey == 'bananacopia') return
      if(data.mapsObjState[currMap.name].items == undefined) return
      data.mapsObjState[currMap.name].items.forEach((item,i) =>{
        if(item == null) item = mapsObj[currMap.name].items[i]
        if(item.name == player.interaction.info.name) item.pickedUp = true
      })
      // console.log(data.mapsObjState.cross_Link)
    }
  
    if(!player.interaction.info.hidden && player.interaction.info.team == undefined) 
      itemSpritesArr.forEach((sprite, i) => {if(sprite.type == player.interaction.collisionInstance.pogeballSprite.type) itemSpritesArr.splice(i, 1)})
  }
}

function playerInteraction(e) {
  if(document.querySelector('#pogemonNamingScene').style.display == 'block') return
  if(!scenes.get('overworld').initiated) return
  if(scenes.get('evolution').initiated) return
  if(menu.initiated) return
  if(player.interaction == null) return
  if(e.key != ' ') return

  let openWindow = document.querySelector('#openWindow')
  
  if(player.interaction == undefined) return

  console.log(player.interaction)
  switch(player.interaction.name){
    case 'pc':
        if(scenes.get('pc').initiated) return
        player.disabled = true
        console.log('playerDisabled')

        gsap.to('#overlapping', {
          opacity: 1,
          onComplete: () =>{
            managePcState(true)
            manageOverWorldState(false, 'pc')
            gsap.to('#overlapping', {
              opacity: 0
            })
          }
        })
        break
    case 'npc':
      console.log(interaction.initiated)

      if(interaction.initiated) return
      if(player.interaction.info.eventKey == 'setFirstMeet' && worldEventData.set.postTransformation) return
      disableOWMenu.active = true
      console.log('disableOWMenu')

      interaction.initiated = true
      player.disabled = true
      console.log('playerDisabled')

      // document.querySelector('#overworldDialogueContainer').style.display = 'grid'

      let chosenDialogue = player.interaction.info.dialogue

      function checkIfEveryGemInInventory(){
        let pass = false

        if(player.bag.get('dawn_Gem').quantity > 0) pass = true
        if(player.bag.get('dusk_Gem').quantity > 0) pass = true
        if(player.bag.get('twilight_Gem').quantity > 0) pass = true
        if(player.bag.get('solstice_Gem').quantity > 0) pass = true

        return pass
      }

      let cancelDialogue = false

      if(player.interaction.info.eventKey != undefined){
        switch(player.interaction.info.eventKey){
          case 'oak':
            if(player.team.length == 0) chosenDialogue = player.interaction.info.dialogue
            else {
              chosenDialogue = player.interaction.info.dialoguePicked
              
              player.team[0].completeHeal()
            }
            
            break
          case 'maatMeeting' :
            worldEventData.maat.firstMeet = true
            break
          case 'heisenbergHouse' :
            if(!worldEventData.heisenberg.firstTalk) {
              worldEventData.heisenberg.firstTalk = true
              // might want to remove those when i release the game
              player.bag.set('glowy_Halo', {item: {...itemsObj['glowy_Halo']}, quantity: 1})
              player.bag.set('leaf_Stone', {item: {...itemsObj['leaf_Stone']}, quantity: 1})
              player.bag.set('fire_Stone', {item: {...itemsObj['fire_Stone']}, quantity: 1})
              player.bag.set('water_Stone', {item: {...itemsObj['water_Stone']}, quantity: 1})
              player.bag.set('thunder_Stone', {item: {...itemsObj['thunder_Stone']}, quantity: 1})
              player.bag.set('black_Sludge', {item: {...itemsObj.black_Sludge}, quantity: 1})
            } else {
              if(worldEventData.heisenberg.firstTalk){
                if(!worldEventData.heisenberg.slimieEvolutionShowed){
                  worldEventData.heisenberg.slimieEvolutionShowed = true
                  player.team.forEach(pogemon =>{
                    if(pogemon.name == 'slimie' || pogemon.name == 'flamie' || pogemon.name == 'wettie' || pogemon.name == 'grassie' || pogemon.name == 'statikie' || pogemon.name == 'pukie') 
                      chosenDialogue = player.interaction.info.slimeDialogue
                  })
                } else {
                  if(!worldEventData.heisenberg.allSlimesCollected){
                    worldEventData.heisenberg.allSlimesCollected = true
                    let slimeCheckObj = {
                      slimie: false,
                      flamie: false,
                      wettie: false,
                      grassie: false,
                      statikie: false,
                      pukie: false
                    }
  
                    let goldieEvoPass = true
  
                    player.team.forEach(pogemon =>{
                      if(pogemon.name == 'slimie' || pogemon.name == 'flamie'|| pogemon.name == 'wettie'|| pogemon.name == 'grassie'|| pogemon.name == 'statikie'|| pogemon.name == 'pukie') 
                        slimeCheckObj[pogemon.name] = true
                    })
  
                    Object.values(slimeCheckObj).forEach(value =>{
                      if(!value) goldieEvoFlag = false
                    })
                    
                    if(goldieEvoPass) {
                      goldieEvoFlag = true
  
                      chosenDialogue = player.interaction.info.haloDialogue
                    
                      player.bag.set('glowy_Halo', {item: {...itemsObj['glowy_Halo']}, quantity: 0})

                      player.team.length = 1
                    }
                  } else {
                    chosenDialogue = player.interaction.info.postEvoDialogue
                  }
                }
              }
            }
            break
          case 'djedMeeting':
            worldEventData.djed.meet = true
            break
          case 'sandPlanktonNPC':
            if(worldEventData.sifter.given) 
              chosenDialogue = player.interaction.info.givenDialogue
            break
          case 'kukumPermission':
            worldEventData.kukum.permission = true
            break 
          case 'setFirstMeet':
            if(worldEventData.set.postTransformation) {
              cancelDialogue = true
              console.log(cancelDialogue)
              console.log('?????????')
              break
            }

            if(!worldEventData.set.met)
              worldEventData.set.met = true
            else if(worldEventData.set.fourcrystals && !worldEventData.set.preTransformation){
              worldEventData.set.preTransformation = true
              chosenDialogue = player.interaction.info.preTransformationDialogue

              console.log(player.interaction)
            } else if(worldEventData.set.preTransformation){
              worldEventData.set.postTransformation = true
              chosenDialogue = player.interaction.info.postTransformation
            }
            break
          case 'setHouse':
            if(worldEventData.set.lodge && !checkIfEveryGemInInventory()) 
              chosenDialogue = player.interaction.info.fourcrystalwaiting
            if(worldEventData.set.lodge && checkIfEveryGemInInventory)
              chosenDialogue = player.interaction.info.fourcrystalgive
            break
          case 'muraleGuy':
            if(worldEventData.scribbleTown.murale) 
              chosenDialogue = player.interaction.info.muraleDialogue
            else 
              chosenDialogue = player.interaction.info.dialogue
            break
          case 'paccIsleGiver':
            if(worldEventData.scribbleTown.murale){
              if(!worldEventData.thymatai.paccIsleSeen){
                worldEventData.thymatai.paccIsleSeen = true
                mapsObj.key_Town.seen = true

                chosenDialogue = player.interaction.info.dialoguePostGame
              } else chosenDialogue = player.interaction.info.dialoguePostIsland
            } else chosenDialogue = player.interaction.info.dialogue
            break
          case 'hermesHouse':
            function checkForGems(){
              let pass = false

              if(player.bag.get('stasis_Gem').quantity > 0 && player.bag.get('fleeting_Gem').quantity > 0) pass = true

              console.log(pass)

              return pass
            }

            if(!worldEventData.hermes.guardianQuest){
              worldEventData.hermes.guardianQuest = true
              chosenDialogue = player.interaction.info.dialogue
            } else if(worldEventData.hermes.guardianQuest && !checkForGems()){
              chosenDialogue = player.interaction.info.dialogueWaiting
            }  else if(worldEventData.hermes.guardianQuest && checkForGems()){
              worldEventData.hermes.preFight = true
              chosenDialogue = player.interaction.info.dialogueIllumination
            } else if(worldEventData.hermes.finalBoss){
              chosenDialogue = player.interaction.info.dialoguePostFight
            }
            break
        }
      }

      console.log(worldEventData.set.preTransformation)
      console.log(cancelDialogue)

      if(!cancelDialogue){

        console.log('now')
        for(let i = 0; i < chosenDialogue.length; i++){
          if(i == 0) player.dialogue('overworld', chosenDialogue[i])
          else queue.push(() => {
            player.dialogue('overworld', chosenDialogue[i])
          })
        }

        openWindow.style.backgroundColor = 'transparent'
        openWindow.replaceChildren()
      }

      switch(player.interaction.info.type){
        case 'pogecenter':
          healProcess = true
          player.team.forEach(pogemon =>{
            pogemon.completeHeal()
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
            let index
            let mapName

            if(data != null && data.nextMapInfo.name != null) mapName = data.nextMapInfo.name
            else mapName = pogecenterReturnInfo.name

            console.log(data)

            switch(mapName){
              case 'fair_Town':
                index = 0
                break
              case 'keme_Town':
                index = 1
                break
              case 'scribble_Town':
                index = 2
                break
              case 'alquima_Town':
                index = 3
                break
            }

            generatePogemartMenu(mapsObj[`pogemart`].productOptions[index])
            disableOWMenu.active = false
            inputValue = 0
          })
          break
      }
        
      if(player.interaction.info.type == undefined) return
      break
    case 'item':
      if(player.interaction.info.pickedUp == true) return
      if(player.interaction.info.eventKey == 'bananacopia' && bananaBlock) return

      // interactions with OW pogeballs that dissapear

      if(player.interaction.info.starter != undefined){
        // THIS IS NOT AN ACTUAL ITEM - THIS CONTAINS THE OW STARTER POGEBALL INTERACTION 
        if(interaction.flags.starter) return
        if(interaction.initiated) return
  
        player.disabled = true
        interaction.initiated = true
        console.log('playerDisabled')
  
        let starters = [pogemonsObj['loko'], pogemonsObj['steeli'], pogemonsObj['maaph']]
        let starter = starters[player.interaction.info.amount]
  
        // console.log(itemSpritesArr)
  
        // player.disabled = true
  
        openWindow.replaceChildren()
        openWindow.style.backgroundColor = 'rgba(0,0,0,0.75)'
  
        let OWDialogue = document.querySelector('#overworldDialogue')
        OWDialogue.textContent = `Do you want to pick ${starter.name} as your starter?`
  
        document.querySelector('#overworldDialogueContainer').style.display = 'grid'

        const starterImg = new Image()
  
        setTimeout(() =>{
          starterImg.src = `img/pogemon/00${starter.pogedex}_${starter.name}/${starter.name}.png`
          starterImg.id = 'overworldStarterImg'
        }, 50)

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
  
                player.catch(starter, true, currMap, player)

                catchEventObj.caughtPogemon = player.team[0]
  
                interaction.initiated = false
                interaction.flags.starter = true
                player.interaction.info.pickedUp = true
                player.interaction.info.hidden = true

                // openWindow.style.backgroundColor = 'transparent'
                // openWindow.replaceChildren()


  
                itemSpritesArr.forEach((sprite, i) => {if(sprite.type == player.interaction.collisionInstance.pogeballSprite.type) itemSpritesArr.splice(i, 1)})
              })

              queue.push(() =>{
                document.querySelector('#overworldDialogueContainer').style.display = 'none'
                initRenameEvent(player.team[0])
              })
            })
          }
        })
      } else {
        let msg

        if(player.interaction.info.amount == 1) msg = `You've picked up a ${switchUnderScoreForSpace(player.interaction.info.name)}.`
        else msg = `You've picked ${player.interaction.info.amount} ${switchUnderScoreForSpace(player.interaction.info.name)}'s.`

        if(player.interaction.info.eventKey == 'bananacopia' && !bananaAquired()){
          itemPickUp(itemsObj[player.interaction.info.name], player.interaction.info.amount, msg)
          return
        } else if (player.interaction.info.eventKey == 'bananacopia' && bananaAquired()) return

        itemPickUp(itemsObj[player.interaction.info.name], player.interaction.info.amount, msg)
      }
      break
    case 'tree':
    case 'rock':
      if(player.interaction.info.disabled) return

      if(player.interaction.name == 'tree') {
        if(!player.badges[0]) return
        if(soundFlag) return
        soundFlag = true
        setTimeout(() => audioObj.SFX.cut.play(), 250)
      }

      if(player.interaction.name == 'rock') {
        if(!player.badges[1]) return
        if(soundFlag) return
        soundFlag = true
        setTimeout(() => audioObj.SFX.rockSmash.play(), 250)
      }

      player.interaction.collisionInstance.obstacleSprite.animate = true
      player.disabled = true
      console.log('playerDisabled')
      setTimeout(() =>{
        player.interaction.collisionInstance.obstacleSprite.animate = false
        player.interaction.collisionInstance.boundary.collision = false      
        player.interaction.info.disabled = true
        // console.log(mapsObj[currMap.name].obstaclesInfo)
        player.disabled = false
        console.log('playerAble')
        console.log(catchEventObj)
        soundFlag = false
        obstacleSpritesArr.forEach((sprite, i) => {if(sprite.type == player.interaction.collisionInstance.obstacleSprite.type) obstacleSpritesArr.splice(i, 1)})
      }, 1450)
      break
  }
}

let bananaBlock = false 

window.addEventListener('keydown', e => playerInteraction(e))

// collissions

let playerCenterOffset = 16

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
      rectangle1.position.x + playerCenterOffset * 2.5 <= rectangle2.position.x + rectangle2.width + rectangle2.info.direction.reach.neg.x
      && rectangle1.position.x + rectangle1.width - playerCenterOffset * 3 >= rectangle2.position.x - rectangle2.info.direction.reach.pos.x
      && rectangle1.position.y + playerCenterOffset * 2.5 <= rectangle2.position.y + rectangle2.height + rectangle2.info.direction.reach.neg.y
      && rectangle1.position.y + rectangle1.height - playerCenterOffset * 5 >= rectangle2.position.y - rectangle2.info.direction.reach.pos.y
      )
  }
}

let waterCollided = false

let collisionWhileSurfing = false

let waterDecollisionFlag = false

let stairsDebuff = false

let showSurf = false

let timeoutFlag = false

function eventWhenColliding(boundaries, direction){
  if(stairsDebuff) moveSpeed = 5
  else if(!player.running) moveSpeed = walkSpeed
  else moveSpeed = runSpeed

  for(let i = 0; i < boundaries.length; i++){
    const boundary = boundaries[i]

    if(!player.disabled) player.animate = true

    let type = boundary.type

    let xOffset
    let yOffset

    let typeAddition = 0

    let playerOffset = 16

    // if(type == 9 && direction != 'Down') typeAddition = 32
    
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


    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x + xOffset,
          y: boundary.position.y + yOffset
        }}
      })
    ){
      // console.log(boundary.type)

      if(boundary.collision) {
        player.animate = false
        // console.log(boundary)
      }

      let surfCheck = false

      if(player.badges[2]){
        player.team.forEach(pogemon =>{
          if(pogemon.pogemon.surfable) surfCheck = true
        })
      }

      if(type == 9){   
        if(stairsDebuff == false) setTimeout(() => {stairsDebuff = false}, 500)
        stairsDebuff = true
        player.running = false
      }

      if(!surfCheck) return

      if(type == 8){
        if(player.surfing) return

        waterCollided = true

        player.animate = true
        player.running = false
        moveSpeed = walkSpeed

        // console.log(boundary.position)

        // console.log(showSurf)
        // console.log(boundary.position.y, player.position.y - playerHeight / 8)
        // console.log()
        // if(boundary.position.y >= player.position.y - 2) if(!showSurf){
        //   console.log('now')
        //   showSurf = true
        // }
        // if(player.walking) return
        // if(showSurf) {
          player.img.src = `img/charSprites/ethan/${playerCharacter}_surf.png`
          surfPogemonSprite.img.src = `img/charSprites/surf/surf_${direction}.png`
          surfPogemonSprite.animate = true
          player.surfing = true
          player.walking = false
        // }
      }

      if(type == 1){
        if(waterCollided){
          // console.log('hahahaha')
          if(!player.surfing) return
          surfPogemonSprite.img.src = `img/charSprites/surf/surf_${direction}.png`
          surfPogemonSprite.animate = true
          collisionWhileSurfing = true
        }
      }
      break
    } else {
      if(!waterDecollisionFlag){
        player.surfing = true
        waterCollided = true
        if(!timeoutFlag){
          timeoutFlag = true
          setTimeout(() =>{
            // console.log('water does not collide with player anymore')
            waterDecollisionFlag = true
            showSurf = false
            timeoutFlag = false
          }, 250)
        }

      }

      if(player.surfing){
        if(!collisionWhileSurfing){
          player.img.src = `img/charSprites/ethan/${playerCharacter}.png`
          surfPogemonSprite.img.src = `img/charSprites/surf/blank.png`
          surfPogemonSprite.animate = false
          waterDecollisionFlag = false
        }
        collisionWhileSurfing = false
        waterCollided = false
      }
      player.surfing = false
      player.walking = true
    }
  }
}

function engageBattle(animationId, battleZones) {
  if(repelObj.active) return
  if(player.team.length < 1) return
  if(waitForNextBattle.initiated) return
  
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
      manageOverWorldState(false, 'battle')
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
          // audioObj.music.battle.play()
          player.team.forEach(pogemon =>{
            let pogemonInfo = {[`${pogemon.id}`]: pogemon.heldItem}
            playerTeamItemsState.team.push(pogemonInfo)
          })
          

          manageBattleState(animationId, null, null, null, battleZone.name)
        }
      })
      break
    }
  }
}

export let lastDirection = 'Down'

function pickUpAbility(){
  // 1999
  const pickUpOdds = 1999

  for(let i = 0; i < player.team.length; i++){
    if(player.team[i].abilityInfo.ability == null) continue
    if(player.team[i].abilityInfo.ability.name != 'pick_Up' || player.team[i].heldItem != null) continue

    const passRNG = Math.floor(Math.random() * pickUpOdds)
    if(passRNG > 0) continue

    const itemList = abilitiesObj.pick_Up.info.itemList[Math.floor(player.team[i].lvl / 20)]

    const itemRNG = Math.floor(Math.random() * 100)

    for(let j = 0; j < itemList.length; j++){
      if(itemList[j].odds < itemRNG) continue

      player.team[i].heldItem = itemList[j].item

      pickUpAnimation(player.team[i], itemList[j].item)
      break
    }
  }

  function pickUpAnimation(pogemon, item){
    if(item == undefined) return
    
    const pickUpContainer = document.createElement('div')
    pickUpContainer.id = 'pickUpContainer'
    document.querySelector('#overworldSceneContainer').appendChild(pickUpContainer)

    const pickUpImgPogemon = new Image()

    if(pogemon.isShiny) pickUpImgPogemon.src = pogemon.pogemon.sprites.shiny.sprite
    else pickUpImgPogemon.src = pogemon.pogemon.sprites.classic.sprite

    // console.log(pickUpImgPogemon.src)

    const pickUpImgIcon = new Image()
    pickUpImgIcon.src = 'img/pickup.png'
    const pickUpImgItem = new Image()
    pickUpImgItem.src = item.img

    const pickUpImgArr = [pickUpImgPogemon, pickUpImgIcon, pickUpImgItem]

    pickUpImgArr.forEach(img =>{
      img.setAttribute('class', 'pickUpImage')
      pickUpContainer.appendChild(img)
    })

    let top = 10
    if(window.innerHeight == 1080) top = 65

    gsap.to(pickUpContainer, {
      opacity: 1,
      top,
      duration: 0.75,
      onComplete: () =>{
        setTimeout(() =>{3
          gsap.to(pickUpContainer, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => pickUpContainer.remove()
          })
        }, 750)
      }
    })

    // alert(`${pogemon.name} picked up a ${item.name}`)
  }
}

function addFriendlinessWhenMoving(){
  const friendshipOdds = 9999

  for(let i = 0; i < player.team.length; i++){
    const passRNG = Math.floor(Math.random() * friendshipOdds)
    if(passRNG > 0) continue

    player.team[i].manageFriendliness(1)

  }
}

let timeBeforeNextStep = 0

function incrementRepelStepsWhenMoving(){
  timeBeforeNextStep += 1

  if(timeBeforeNextStep < 4) return

  if(repelObj.steps == 0){
    repelObj.active = false

    player.disabled = true
    console.log('playerDisabled')
    player.dialogue('overworld', `The repel effect wore off..`)

  } else repelObj.steps -= 1

  timeBeforeNextStep = 0

  console.log(repelObj)
}

export const repelObj = {
  active: false,
  steps: 0
}

function playerMove(direction, movables, moveSpeed){
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

  pickUpAbility()
  if(repelObj.active) incrementRepelStepsWhenMoving()
  addFriendlinessWhenMoving()
}

//player gets stuck to walls when changing direcitons for some reason

// maybe should put this in map

let changeMapFlag = false
let newGameLabFlag = false
let newGameFlagFlagLMAO = false
// let prevMap

let blockChangeMap = false

function changeMapEvent(changeMap, currPos){
  for(let i = 0; i < changeMap.length; i++){
    let changeMapIndex = changeMap[i]
    const currMapInfo = {
      name: currMap.name,
      spawnPosition: {
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
      console.log('playerDisabled')

      // if(changeMapIndex.info.name == 'pogemart' || changeMapIndex.name == 'pogecenter'){
      //   prevMap = currMapInfo
      //   console.log(prevMap)
      // } 
      
      // if(currMapInfo.name == 'pogemart' || currMapInfo.name == 'pogecenter'){
      //   changeMapIndex.info = prevMap
      //   console.log(changeMapIndex.info)
      // }

      // console.log(changeMapIndex)

      // if(changeMapIndex.info.name == 'prevMap'){
      //   changeMapIndex = currMapInfo
      // }

      if(currMap.name == 'lab' && player.team.length == 0){
        if(newGameLabFlag) return

        newGameLabFlag = true
        document.querySelector('#openWindow').style.backgroundColor = 'transparent'
        player.dialogue('overworld', 'Please, come back and choose a pogemon before leaving on your adventure.')
        return
      } else if(currMap.name == 'luna_Mountain_Entrance' && !worldEventData.moses.staffGiven){
        // player.disabled = true
        if(!blockChangeMap) {
          player.dialogue('overworld', `It seems impossible to go ahead since it's so dark in here..\n\n\nI should trace back my steps and see if i havent missed anything`)
          blockChangeMap = true

          setTimeout(() =>{
            blockChangeMap = false
          }, 2000)
        }
        else {
          player.disabled = false
          console.log('playerAble')
        }
      } else if(currMap.name == 'transit_Peak' && changeMapIndex.info.eventKey == "neoGenesisPortal" && !worldEventData.set.preTransformation){

        console.log(changeMapIndex)
        player.disabled = true
        console.log('playerDisabled')

        if(!blockChangeMap) {
          player.dialogue('overworld', `I have no idea what lies beyond this portal.\n\nI should speak to the old man Set before entering.`)
          blockChangeMap = true

          setTimeout(() =>{
            blockChangeMap = false
          }, 2000)
        }
        else {
          player.disabled = false
          console.log('playerAble')
        }

      } else {
        audioObj.SFX.changeMap.play()

        gsap.to('#overlapping', {
          opacity: 1,
          duration: 0.4,
          onComplete(){
            // console.log(changeMapIndex)
            changeMapInfo(changeMapIndex.info, currMapInfo)
          }
        })
      }


      break
    } else if(!rectangularCollision({
      rectangle1: player,
      rectangle2: changeMapIndex
    })){
      changeMapFlag = false

      if(currMap.name == 'lab'){
        if(!newGameFlagFlagLMAO) {
          newGameFlagFlagLMAO = true
          
          setTimeout(() =>{
            newGameFlagFlagLMAO = false
            newGameLabFlag = false
          }, 1000)

          // setTimeout(() =>{
          //   if(player.disabled == true) {
          //     frozenJail = true
          //     player.dialogue(
          //       'overworld', 
          //       `Look at what you've done, you shoulda just picked a pogemon...\n
          //       Now you're stuck in frozen jail, good job.. :/ \n
          //       I hope you enjoyed the game, i guess?? xd \n\n\n
          //       ~ PSILO`
          //     )
          //   }
          // }, 5000)
      }
      }
    }
  }
}

export let frozenJail = false

let eventZonesFlag = false

const exclamation = new Image()
exclamation.src = 'img/charSprites/exclamation.png'
exclamation.setAttribute('class', 'exclamation')
document.querySelector('#overworldSceneContainer').appendChild(exclamation)

function bananaAquired(){
  let pass = false

  if(player.bag.get('banana').quantity > 0) pass = true
  
  player.team.forEach(pogemon =>{
    if(pogemon.heldItem == 'banana') pass = true
  })

  console.log(pass)
  return pass
}

function eventZoneManagement(eventZones){
  for(let i = 0; i < eventZones.length; i++){
    const eventZonesIndex = eventZones[i]
    if(
      rectangularCollision({
        rectangle1: player,
        rectangle2: eventZonesIndex
      }, 'event')
    ){
      // console.log(eventZonesIndex)
      console.log(eventZonesIndex.type)

      if(eventZonesIndex.type != 6){
        document.querySelector('#openWindow').style.backgroundColor = 'transparent'
        document.querySelector('#openWindow').replaceChildren()
      }

      if(eventZonesIndex.info.eventKey == "banishmentPathBlock" && !worldEventData.bananaGuy.bananaAsked) {
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.dialogue)

        worldEventData.bananaGuy.bananaAsked = true

        // console.log('block event')
        return
      } if(eventZonesIndex.info.eventKey == "banishmentPathBlock" && !bananaAquired()) {
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.waitingDialogue)

        worldEventData.bananaGuy.bananaAsked = true

        // console.log('block event')
        return
      } else if(eventZonesIndex.info.eventKey == "banishmentPathBlock" && worldEventData.bananaGuy.bananaAsked && bananaAquired() && !worldEventData.bananaGuy.bananaGiven) {
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.bananaDialogue)

        worldEventData.bananaGuy.bananaGiven = true
      }

      if(eventZonesIndex.info.eventKey == "mousaCrestBlock" && !worldEventData.mousaCrest.ask){
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.dialogue)

        worldEventData.mousaCrest.ask = true

        // console.log('block event')
        return
      } else if(eventZonesIndex.info.eventKey == "mousaCrestBlock" && !worldEventData.kukum.permission){
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.waitingDialogue)

        // console.log('block event')
        return
      } else if(eventZonesIndex.info.eventKey == "mousaCrestBlock" && worldEventData.kukum.permission){
        player.interaction = eventZonesIndex
        
        disableOWMenu.active = true
        console.log('disableOWMenu')
        player.disabled = true
        player.dialogue('overworld', eventZonesIndex.info.permissionDialogue)


        // console.log('block event')
        return
      } 

      let playerLookingAtNPC = false

      if(eventZonesIndex.type != 4) {
        switch(eventZonesIndex.info.looking){
          case 'Up':
            if(player.direction == 3) playerLookingAtNPC = true
            break
          case 'Right':
            if(player.direction == 4) playerLookingAtNPC = true
            break
          case 'Down':
            if(player.direction == 1) playerLookingAtNPC = true
            break
          case 'Left':
            if(player.direction == 2) playerLookingAtNPC = true
            break
        }

        if(eventZonesIndex.info.faceToFace != undefined) playerLookingAtNPC = true
  
        if(eventZonesIndex.info.looking != undefined) if(!playerLookingAtNPC) return
      }

      player.interaction = eventZonesIndex

      console.log(player.interaction)

      // console.log(player.interaction)
      if(player.team.length >= 1) {
        if(eventZonesIndex.info.createdTrainer != undefined){

          // for(let i = 0; i < mapsObj[currMap.name].trainers.length; i++){
          //   if(mapsObj[currMap.name].trainers[i].beaten == true) return
          // }

          console.log('wtf?')

          switch(eventZonesIndex.info.eventKey){
            case 'maatGymTrainer':
              if(worldEventData.maat.firstMeet && !player.badges[0]){

              } else {
                document.addEventListener('keydown', (e) =>{
                  if(e.key == ' '){
                    if(player.interaction == null) return
                    player.disabled = true
                    player.team[0].dialogue('overworld', eventZonesIndex.info.OWdialogue)
                    console.log('messageNow')
                  }
                })
              }

              if(!worldEventData.maat.firstMeet) return
              if(player.badges[0]) return
              break
            case 'djedGymTrainer':
              if(worldEventData.djed.meet && !player.badges[1]) {
                
              } else {
                document.addEventListener('keydown', (e) =>{
                  if(e.key == ' '){
                    if(player.interaction == null) return
                    player.disabled = true
                    player.team[0].dialogue('overworld', eventZonesIndex.info.OWdialogue)
                    console.log('messageNow')
                  }
                })
              }

              if(!worldEventData.djed.meet) return
              if(player.badges[1]) return
              break
            case 'hermesGymTrainer':
              if(worldEventData.hermes.met && !player.badges[2]) {

              } else {
                document.addEventListener('keydown', (e) =>{
                  if(e.key == ' '){
                    if(player.interaction == null) return
                    player.disabled = true
                    player.team[0].dialogue('overworld', eventZonesIndex.info.OWdialogue)
                    console.log('messageNow')
                  }
                })
              }

              if(!worldEventData.hermes.met) return
              if(player.badges[1]) return
              break
          }

          if(eventZonesIndex.info.beaten) return
          
          disableOWMenu.active = true
          console.log('disableOWMenu')

          player.disabled = true

          console.log(eventZonesIndex.position)

          let X = 0
          let Y = -46

          switch(player.direction){
            case 2:
              X = -8
              break
            case 4:
              X = 16
              break
          }
          
          exclamation.style.display = 'block'
          exclamation.style.left = eventZonesIndex.position.x + X
          exclamation.style.top = eventZonesIndex.position.y + Y

          audioObj.SFX.trainerEncounter.play()
    
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
          
                  switch(eventZonesIndex.info.looking){
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
                      if(player.position.y - player.height < eventZonesIndex.position.y) {
                        eventZonesIndex.info.createdTrainer.animate = false
                        eventPos.y = eventZonesIndex.position.y
                      }
                      else eventPos.y = player.position.y - player.height
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
                      
                      document.querySelector('#openWindow').style.backgroundColor = 'transparent'
                      if(document.querySelector('#overworldStarterImg') != undefined) document.querySelector('#overworldStarterImg').src = 'img/blank.png'
            
                      eventZonesIndex.info.createdTrainer.animate = false
            
                      queue.push(() =>{
                        console.log('here2')
                        manageOverWorldState(false, 'battle')
                        gsap.to('#overlapping', {
                          opacity: 1,
                          duration: 0.4,
                          onComplete(){
                            player.team.forEach(pogemon =>{
                              let pogemonInfo = {[`${pogemon.id}`]: pogemon.heldItem}
                              playerTeamItemsState.team.push(pogemonInfo)
                            })
                            console.log(playerTeamItemsState)
                            manageBattleState(true, null, null, eventZonesIndex.info)
                            disableOWMenu.active = false
                            player.disabled = false
                            console.log('playerAble')
                            console.log(catchEventObj)
                            gsap.to('#overlapping', {
                              opacity: 0,
                              duration: 0.4,
                              onComplete: () =>{
                                exclamation.style.display = 'none'
                              }
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

export let queue = []
let queueEnabled = true

let prevent2ItemsGiven = false

document.querySelector('#overworldDialogue').addEventListener('click', (e) => {
  spendQueue()
})

function spendQueue(){
  if(!queueEnabled) return
  // if(frozenJail) return

  // console.log(player.interaction.info.eventKey)

  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else { 
    if(document.querySelector('#pickedUpItem') != undefined) {
      disableOWMenu.active = false
      document.querySelector('#pickedUpItem').src = ''
    }

    console.log('lmao')

    setTimeout(() =>{
      player.disabled = false
      console.log('playerAble')
      disableOWMenu.active = false
      console.log('enableOWmenu')
      scenes.set('pickingItem', {initiated: false})
    }, 750)

    if(!healProcess) {
      if(player.interaction != null){
        if(player.interaction.name == 'item') gsap.to(document.querySelector('#overlapping'), {
          opacity : 0,
          onComplete : () =>{
            if(player.interaction != null) if(player.interaction.info.starter != undefined) return
            document.querySelector('#openWindow').replaceChildren()
            scenes.set('pickingItem', {initiated: false})
            player.interaction = null
          }
        })
      }

      document.querySelector('#overworldDialogueContainer').style.display = 'none'
      openWindow.style.backgroundColor = 'transparent'
      player.disabled = false
      console.log('playerAble')
      console.log(catchEventObj)
      disableOWMenu.active = false
      interaction.initiated = false
      document.querySelector('#overworldDialogue').setAttribute('class', '')
      document.querySelector('#overworldDialogue').style.padding = '35px'

      if(goldieEvoFlag) {
        manageEvolutionState('true', [player.team[0]])
        goldieEvoFlag = false
      }
    } 

    // vv happens when clicking last dialogue on important NPCs vv

    if(player.interaction == null) return

    if(player.interaction.info.eventKey == 'banishmentPathBlock' && !worldEventData.bananaGuy.bananaGiven){
      player.disabled = true
      audioObj.SFX.changeMap.play()
      console.log('playerDisabled')

      gsap.to('#overlapping', {
        opacity: 1,
        duration: 0.4,
        onComplete(){
          // console.log({name:'pearly_Path', spawnPosition:{x:map.position.x + 150, y:map.position.y}})
          changeMapInfo({name:'pearly_Path', spawnPosition:{x:map.position.x - 350, y:map.position.y}}, {name:'pearly_Path', spawnPosition:{x:map.position.x, y:map.position.y}})
          setTimeout(() =>{
            disableOWMenu.active = false
            player.disabled = false
            console.log('playerAble')
          }, 250)
        }
      })
    }

    if(player.interaction.info.eventKey == 'mapNPC' && !worldEventData.lippo.mapGiven){
      worldEventData.lippo.mapGiven = true

      itemPickUp(itemsObj.map, 1, `Lippo handed you a map.`)
    } else if(player.interaction.info.eventKey == 'mapNPC' && worldEventData.lippo.mapGiven){
      gsap.to('#overlapping', {
        opacity: 0,
        duration: 0.4,
        onComplete:() =>{
          scenes.set('pickingItem', {initiated: false})
        }
      })
    }

    if(currMap.name == 'luna_Mountain_Entrance'){
      // audioObj.SFX.changeMap.play()

      // gsap.to('#overlapping', {
      //   opacity: 1,
      //   duration: 0.4,
      //   onComplete(){
      //     // console.log({name:'pearly_Path', spawnPosition:{x:map.position.x + 150, y:map.position.y}})
      //     changeMapInfo({name:'luna_Mountain_Entrance', spawnPosition:{x:map.position.x, y:map.position.y - 350}}, {name:'pearly_Path', spawnPosition:{x:map.position.x, y:map.position.y}})
      //     setTimeout(() =>{
      //       disableOWMenu.active = false
      //       player.disabled = false
      //     }, 250)
      //   }
      // })
    }

    if(player.interaction.info.eventKey == 'mousaCrestBlock' && !worldEventData.kukum.permission){
      player.disabled = true
      audioObj.SFX.changeMap.play()
      console.log('playerDisabled')
      gsap.to('#overlapping', {
        opacity: 1,
        duration: 0.4,
        onComplete(){
          // console.log({name:'pearly_Path', spawnPosition:{x:map.position.x + 150, y:map.position.y}})
          changeMapInfo({name:'commandment_Road', spawnPosition:{x:map.position.x - 350, y:map.position.y}}, {name:'commandment_Road', spawnPosition:{x:map.position.x, y:map.position.y}})
          setTimeout(() =>{
            disableOWMenu.active = false
            player.disabled = false
            console.log('playerAble')
          }, 250)
        }
      })
    }

    if(player.interaction.info.eventKey == 'bananacopia'){
      bananaBlock = true
  
      setTimeout(() =>{
        bananaBlock = false
      }, 1750)
    }
  
    if(player.interaction.info.eventKey == 'sandPlanktonNPC' && !worldEventData.sifter.given) {
      worldEventData.sifter.given = true
  
      itemPickUp(itemsObj.sand_Plankton, 3, `Sifter handed you a couple of weird critters...`)
    } else if(player.interaction.info.eventKey == 'sandPlanktonNPC' && worldEventData.sifter.given){
      gsap.to('#overlapping', {
        opacity: 0,
        duration: 0.4,
        onComplete:() =>{
          scenes.set('pickingItem', {initiated: false})
        }
      })
    }
  
    if(player.interaction.info.eventKey == 'frozenBaaull' && worldEventData.baaull.awake){
      returnPrevScene('overworld')
      manageBattleState(true, null, null, player.interaction.info)
      manageOverWorldState(false)
  
      setTimeout(() =>{
        map.img.src = 'img/maps/keme_Town/keme_Town.png'
      }, 1250)
  
    } else if(player.interaction.info.eventKey == 'frozenBaaull' && !worldEventData.baaull.awake){
      worldEventData.baaull.awake = true
  
      player.dialogue('overworld', `The golden disk in your inventory started to glow.\n\nThe same thing happens to the statue in front of you.\n\nThe statue starts moving, you get ready for combat.`)
      console.log('messageNow')
    } 
  
    if(player.interaction.info.eventKey == 'renamer' || player.interaction.info.eventKey == 'relearner') homouFamilyInteraction(player.interaction.info.eventKey)
  
    if(
      player.interaction.info.eventKey == 'Tms' || 
      player.interaction.info.eventKey == 'battleItems' || 
      player.interaction.info.eventKey == 'maatBerryShop' || 
      player.interaction.info.eventKey == 'darwin'
    ) {
      if(document.querySelector('#overworldDialogue').innerText == 'Have a good day! :D') return
      // disableOWMenu.active = true
      player.disabled = true
      console.log('playerDisabled')
      generatePogemartMenu(mapsObj.pogemart.productOptions[player.interaction.info.shopKey])
    }

    if(player.interaction.info.eventKey == 'setHouse' && !worldEventData.set.lodge){
      worldEventData.set.lodge = true
      prevent2ItemsGiven = true

      itemPickUp(itemsObj.teleport_Gem, 1, player.interaction.info.itemsDialogue)
    } else if(player.interaction.info.eventKey == 'setHouse' && worldEventData.set.lodge){
      gsap.to('#overlapping', {
        opacity: 0,
        duration: 0.4,
        onComplete:() =>{
          prevent2ItemsGiven = false
          scenes.set('pickingItem', {initiated: false})
        }
      })
    }

    if(player.interaction.info.eventKey == 'setHouse' && worldEventData.set.lodge && !worldEventData.set.fourcrystals && !prevent2ItemsGiven){
      worldEventData.set.fourcrystals = true

      itemPickUp(itemsObj.corrupt_Gem, 1, player.interaction.info.corruptGemDialogue)

      player.bag.set('dawn_Gem', {item: {...itemsObj.dawn_Gem}, quantity: 0})
      player.bag.set('dusk_Gem', {item: {...itemsObj.dusk_Gem}, quantity: 0})
      player.bag.set('twilight_Gem', {item: {...itemsObj.twilight_Gem}, quantity: 0})
      player.bag.set('solstice_Gem', {item: {...itemsObj.solstice_Gem}, quantity: 0})
    } else if(player.interaction.info.eventKey == 'setHouse' && worldEventData.set.lodge && worldEventData.set.fourcrystals){
      gsap.to('#overlapping', {
        opacity: 0,
        duration: 0.4,
        onComplete:() =>{
          scenes.set('pickingItem', {initiated: false})
        }
      })
    }

    if(player.interaction.info.eventKey == 'setFirstMeet' && worldEventData.set.preTransformation){
      player.interaction.character.img.src = 'img/charSprites/endelder/endelder.png'
    }

    if(player.interaction.info.eventKey == 'setFirstMeet' && worldEventData.set.postTransformation){
      player.interaction.character.img.src = 'img/charSprites/blank/blank.png'
      player.interaction.collisionInstance.collision = false
    }

    if(player.interaction.info.legendary != undefined && !worldEventData[player.interaction.info.eventKey].defeated){
      returnPrevScene('overworld')
      manageBattleState(true, null, null, player.interaction.info)
      manageOverWorldState(false)

      worldEventData[player.interaction.info.eventKey].catchable = false
      worldEventData[player.interaction.info.eventKey].defeated = true
    }

    if(player.interaction.info.eventKey == 'reginaEscaGiver' && player.bag.get('regina_Esca').quantity > 0){
      scenes.set('pickingItem', {initiated: false})
    }

    if(player.interaction.info.eventKey == 'ultimballGiver' && !worldEventData.ultimball.given){
      worldEventData.ultimball.given = true
      itemPickUp(itemsObj.ultimball, 1, `I bet it can't even catch a measly formal. hahaha.`)
    } else if(player.interaction.info.eventKey == 'ultimballGiver' && worldEventData.ultimball.given){
      gsap.to('#overlapping', {
        opacity: 0,
        duration: 0.4,
        onComplete:() =>{
          scenes.set('pickingItem', {initiated: false})
        }
      })
    }
  }
}


const partyInteractionContainer = document.querySelector('#partyInteractionContainer')
partyInteractionContainer.addEventListener('click', e =>{
  if(e.target.id == 'partyInteractionContainerBackground'){
    disableOWMenu.active = false
    player.disabled = false
    console.log('playerAble')

    partyInteractionContainer.style.display = 'none'
  }

  e.target.classList.forEach(className =>{
    if(className == 'partyInteractionContentActive'){
      partyInteractionContainer.style.display = 'none'
    }
  })
})

function homouFamilyInteraction(type){
  disableOWMenu.active = true
  console.log('disableOWMenu')
  player.disabled = true

  const partyInteractionContentContainer = document.querySelector('#partyInteractionContentContainer')
  partyInteractionContentContainer.replaceChildren()

  for(let i = 0; i < 6; i++){
    const partyInteractionContent = document.createElement('div')
    partyInteractionContent.setAttribute('class', 'partyInteractionContent')
    partyInteractionContentContainer.appendChild(partyInteractionContent)

    const partyInteractionContentImg = document.createElement('img')
    partyInteractionContentImg.setAttribute('class', 'partyInteractionContentImg')

    if(type == 'renamer') partyInteractionContentImg.addEventListener('click', e => initRenameEvent(player.team[i]))
    else partyInteractionContentImg.addEventListener('click', e => initRelearnMoveEvent(player.team[i]))

    if(player.team[i] != undefined) {
      if(player.team[i].isShiny) partyInteractionContentImg.src = player.team[i].pogemon.sprites.shiny.sprite
      else partyInteractionContentImg.src = player.team[i].pogemon.sprites.classic.sprite

      partyInteractionContentImg.setAttribute('class', 'partyInteractionContentImg partyInteractionContentActive')
    }

    partyInteractionContent.appendChild(partyInteractionContentImg)
  }

  partyInteractionContainer.style.display = 'block'
}

const relearnMoveObj = {
  active: false,
  oldMove: {
    move: null,
    id: null,
    DOM: null
  },
  currMove: {
    move: null,
    id: null,
    DOM: null
  }
}

const relearnMoveContentContainer = document.querySelector('#relearnMoveContentContainer')
relearnMoveContentContainer.addEventListener('click', e =>{
  if(e.target.classList[0] == 'relearnMoveLearntMovesListContent' || e.target.classList[0] == 'relearnMoveContentMoveContainer') return

  document.querySelector('#relearnMoveContentContainer').style.display = 'none'
  disableOWMenu.active = false
  player.disabled = false
  console.log('playerAble')
})

const relearnMoveCurrMovesArr = []
const relearnMoveLearntMovesArr = []

function initRelearnMoveEvent(pogemon){
  relearnMoveContentContainer.style.display = 'grid'

  const relearnMoveContentPogemonImg = document.querySelector('#relearnMoveContentPogemonImg')

  if(pogemon.isShiny) relearnMoveContentPogemonImg.src = pogemon.pogemon.sprites.shiny.sprite
  else relearnMoveContentPogemonImg.src = pogemon.pogemon.sprites.classic.sprite

  relearnMoveObj.oldMove = {
    move: null,
    id: null,
    DOM: null
  }

  relearnMoveObj.currMove = {
    move: null,
    id: null,
    DOM: null
  }

  // know moves

  const relearnMoveContentMovesContentContainer = document.querySelector('#relearnMoveContentMovesContentContainer')
  relearnMoveContentMovesContentContainer.replaceChildren()
  
  relearnMoveCurrMovesArr.length = 0
  for(let i = 0; i < 4; i++){
    const relearnMoveContentMoveContainer = document.createElement('div')
    relearnMoveContentMoveContainer.setAttribute('class', 'relearnMoveContentMoveContainer')

    if(pogemon.moves[i] != undefined) {
      relearnMoveContentMoveContainer.innerText = pogemon.switchUnderScoreForSpace(pogemon.moves[i].name)

      relearnMoveCurrMovesArr.push(pogemon.moves[i].name)
    }

    relearnMoveContentMoveContainer.addEventListener('click', e =>{

      relearnMoveObj.currMove.move = pogemon.moves[i].name
      relearnMoveObj.currMove.id = i
      relearnMoveObj.currMove.DOM = relearnMoveContentMoveContainer

      switchMoveVisualEvent(pogemon)


    //   for(let j = 0; j < relearnMoveCurrMovesArr.length; j++){

 
    //     if(e.target.inner == relearnMoveCurrMovesArr[j]) {
    //       skip = true
    //       break
    //     } else index = i
    //   }
    })

    relearnMoveContentMovesContentContainer.appendChild(relearnMoveContentMoveContainer)
  }

  // learnt moves

  const relearnMoveLearntMovesListContainer = document.querySelector('#relearnMoveLearntMovesListContainer')
  relearnMoveLearntMovesListContainer.replaceChildren()
  
  relearnMoveLearntMovesArr.length = 0
  pogemon.learntMoves.forEach((move, i) =>{
    let skip = false
    let index

    console.log(relearnMoveCurrMovesArr)

    if(relearnMoveCurrMovesArr.includes(move)) skip = true
    else index = i

    if(skip) return

    const relearnMoveLearntMovesListContent = document.createElement('div')
    relearnMoveLearntMovesListContent.setAttribute('class', `relearnMoveLearntMovesListContent ${index} activeButton`)
    relearnMoveLearntMovesListContent.textContent = pogemon.switchUnderScoreForSpace(move)

    relearnMoveLearntMovesArr.push(move)

    relearnMoveLearntMovesListContent.addEventListener('click', e =>{
      if(relearnMoveObj.active) return
      
      relearnMoveObj.oldMove.move = move
      relearnMoveObj.oldMove.id = index
      relearnMoveObj.oldMove.DOM = relearnMoveLearntMovesListContent

      relearnMoveLearntMovesListContent.classList.add('pressed')

      for(let i = 0; i < relearnMoveCurrMovesArr.length; i++){
        const learnMoveCurrMoveContainer = document.querySelectorAll('.relearnMoveContentMoveContainer')[i]
        learnMoveCurrMoveContainer.classList.add('activeButton')
      }
    })

    relearnMoveLearntMovesListContainer.appendChild(relearnMoveLearntMovesListContent)
  })

  // pogemon.moves.forEach(move =>{
  //   const relearnMoveContentMove = document.createElement('div')
  //   relearnMoveContentMove.setAttribute('class', 'relearnMoveContentMove')
  // })
  
}

function playerInputEvent(animationId, direction, movables, boundaries, battleZones, changeMap, eventZones){
  player.assingDirection(direction)
  if(player.disabled) return
  eventWhenColliding(boundaries, lastDirection)
  eventZoneManagement(eventZones)
  // eventWhenColliding(eventZones, lastDirection)
  // console.log(map.position)
  if(player.animate) {
    returnPrevScene('overworld')
    engageBattle(animationId, battleZones)
    changeMapEvent(changeMap, map.position)
    lastDirection = direction
    playerMove(direction, movables, moveSpeed)
    if(player.running){
    player.frames.hold = 5
    } else {
      player.frames.hold = 10
    }
  }
}

function switchMoveVisualEvent(pogemon){
  if(relearnMoveObj.active) return

  let oldRelearnMoveObj = relearnMoveObj
  
  relearnMoveObj.active = true

  if(oldRelearnMoveObj.oldMove.DOM == null) return
  if(oldRelearnMoveObj.currMove.DOM == null) return

  oldRelearnMoveObj.oldMove.DOM.style.color = 'rgba(0,0,0,0)'
  oldRelearnMoveObj.currMove.DOM.style.color = 'rgba(0,0,0,0)'

  // spot to push back currMove into learntMoves Arr

  // let placeBackIntoLearntIndex
  
  // Object.values(pogemon.pogemon.movepool).forEach((moveInfo, i) =>{
  //   if(pogemon.learntMoves.includes())
  //   if(relearnMoveObj.currMove.move == moveInfo.move.name) pogemon.learntMoves.splice(i, 0, relearnMoveObj.currMove.move)
  //   else pogemon.learntMoves.push(relearnMoveObj.currMove.move)
  // })

  pogemon.moves[oldRelearnMoveObj.currMove.id] = {...movesObj[oldRelearnMoveObj.oldMove.move]}
  console.log(pogemon.moves[oldRelearnMoveObj.currMove.id])

  // // let movePlaceHolder
  // // movePlaceHolder

  let index

  for(let i = 0; i < pogemon.learntMoves.length; i++){
    if(oldRelearnMoveObj.currMove.move == pogemon.learntMoves[i]) index = i
  }

  document.querySelectorAll('.relearnMoveLearntMovesListContent').forEach(node =>{
    node.setAttribute('class', `relearnMoveLearntMovesListContent ${index}`)
  })

  document.querySelectorAll('.relearnMoveContentMoveContainer').forEach(node =>{
    node.setAttribute('class', 'relearnMoveContentMoveContainer')
  })

  setTimeout(() =>{
    setTimeout(() =>{
      relearnMoveObj.active = false

      document.querySelector('#relearnMoveContentContainer').style.display = 'none'

      disableOWMenu.active = false
      player.disabled = false
      console.log('playerAble')
    }, 750)

    let textPlaceHolder
    textPlaceHolder = oldRelearnMoveObj.oldMove.DOM.textContent
    oldRelearnMoveObj.oldMove.DOM.textContent = oldRelearnMoveObj.currMove.DOM.textContent
    oldRelearnMoveObj.currMove.DOM.textContent = textPlaceHolder

    oldRelearnMoveObj.oldMove.DOM.style.color = 'white'
    oldRelearnMoveObj.currMove.DOM.style.color = 'white'
  }, 500)

  // console.log(relearnMoveObj)
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