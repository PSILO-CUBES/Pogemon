import { Sprite } from "../../classes.js"

import { player } from "../player.js"
import { scenes, backgroundSprite } from "../canvas.js"
import { prevScene, returnPrevScene } from "./overworld.js"
import { itemsObj } from "../../data/itemsData.js"
import { manageBattleState } from "./battle.js"
import { mapsObj } from "../../data/mapsData.js"
import { manageEvolutionState } from "./evolution.js"
import { switchUnderScoreForSpace } from "./stats.js"
import { movesObj } from "../../data/movesData.js"

const bagMenuButtonOption = ['use', 'give', 'discard']
let nodeArr = ['bagSceneItem','bagSceneMenuButton']

const defaultType = 'misc'
let currType = defaultType

let queue = []

function spendQueue(){
  if(queue.length > 0){
    queue[0]()
    queue.shift()
    return
  } else {
    console.log('all spent')
  }
}

let currItemsArr = []

let currItem
let currItemDom

let itemChosen = false
let choosePogemon = false

async function sortCurrItemsArr(){
  currItemsArr = []
  await player.bag.forEach(key =>{
    if(key.item.type == currType) currItemsArr.push(key)
  })
}

function bagSceneHoverEvent(e, state){
  if(returnToBattle) return

  const dialogueInferface = document.querySelector('.bagSceneItemDialogueContainer')
  if(state) {
    if(e.target.id != 'selected') {
      if(e.target.classList[0] == 'bagSceneTeamSection' && !choosePogemon ) return
      if(e.target.classList[0] == 'bagSceneTeamSectionItem') return

      e.target.style.cursor = 'pointer'
      e.target.style.backgroundColor = 'rgba(75,75,75,0.3)'

      if(e.target.classList[0] == 'bagSceneTeamSection') {
        //change for individual pogemon
        player.team.forEach(pogemon =>{
          pogemon.animate = true
        })
      }

      if(e.target.classList[0] == 'bagSceneItem' && !itemChosen) {
        e.target.style.backgroundColor = 'rgba(75,75,75,0.3)'
        dialogueInferface.style.display = 'block'
        dialogueInferface.innerText = itemsObj[`${e.target.childNodes[1].childNodes[0].childNodes[0].textContent.replace(/ /g, "_")}`].desc
      }
    }
  } else {
    player.team.forEach(pogemon =>{
      pogemon.animate = false
    })
    e.target.style.cursor = 'cursor'
    if(e.target.classList[0] == 'bagSceneTeamSection' && choosePogemon) {
      e.target.style.backgroundColor = 'transparent'
    }
    if(e.target.classList[0] == 'bagSceneItem' && e.target.id != 'selected') {
      e.target.style.backgroundColor = 'transparent'
      if(itemChosen) return
      if(returnToBattle) return
      dialogueInferface.style.display = 'null'
      dialogueInferface.textContent = ''
    }
    if(e.target.classList[0] == 'bagSceneMenuButton'){
      e.target.style.backgroundColor = 'transparent'
    }
    if(e.target.classList[0] == 'bagSceneItemTypeImg'){
      if(e.target.id != 'selected'){
        e.target.style.backgroundColor = 'transparent'
      }
    }
  }
}

let selectedMenuOption

function bagSceneMenuButtonOnClick(e){
  document.querySelector('.bagSceneItemMenuContainer').style.display = 'none'
  const dialogueBox = document.querySelector('.bagSceneItemDialogueContainer')
  dialogueBox.style.display = 'block'

  switch(e.target.textContent){
    case 'use':
      if(prevScene == 'battle' && currItem.type == 'ball'){
        itemUsed.item = currItem
        itemUsed.used = true

        manageBagState(false, 'battle')
        return
      }

      choosePogemon = true
      dialogueBox.textContent = `Which pogemon should this ${switchUnderScoreForSpace(currItem.name)} be used on?`
      selectedMenuOption = 'use'
      break
    case 'give':
      if(prevScene == 'battle') {
        player.team[0].dialogue('bag', 'Cannot give an item to a pogemon while you are in battle..')
        return
      }

      choosePogemon = true
      dialogueBox.textContent = `To which pogemon should this ${switchUnderScoreForSpace(currItem.name)} be given?`
      selectedMenuOption = 'give'
      break
    case 'discard':
      // dialogueBox.textContent = `How many ${currItem.name}'s should be discarded?`
      dialogueBox.textContent = 'not implemented yey'
      selectedMenuOption = 'discard'
      break
  }
}

let returnToBattle = false

//when clicking item
function bagSceneSectionOnClickEvent(e, state){
  choosePogemon = false

  if(returnToBattle) return
  if(e.target.classList[0] == 'bagSceneTeamSectionItem') return

  // if(itemChosen == false) document.querySelector('.bagSceneItemDialogueContainer').style.display = 'none'

  let flag = false

  if(e.target.classList[0] == 'bagSceneItem') {
    currItem = {...itemsObj[`${e.target.childNodes[1].childNodes[0].textContent.replace(/ /g, "_")}`]}
    currItemDom = document.querySelector(`.${e.target.classList[1]}`)

    if(player.bag.get(currItem.name).quantity < 1) flag = true

    if(!flag) itemChosen = true
  }

  if(flag) return

  document.querySelectorAll(`.${e.target.classList[0]}`).forEach(node =>{
    node.style.backgroundColor = 'transparent'
    node.removeAttribute('id')
  })

  e.target.style.backgroundColor = 'rgb(128, 128, 128, 0.3)'
  e.target.id = 'selected'
  
  if(!state) return

  document.querySelector('.bagSceneItemMenuContainer').style.display = 'grid'
  document.querySelector('.bagSceneItemDialogueContainer').style.display = 'none'
}

function bagSceneItemTypeOnClick(e){
  e.target.parentNode.parentNode.childNodes.forEach(node =>{
    node.childNodes[0].style.backgroundColor = 'transparent'
  })

  document.querySelector('.bagSceneItemMenuContainer').style.display = 'none'

  nodeArr.push('bagSceneItemTypeImg')

  e.target.parentNode.parentNode.childNodes.forEach(node =>{
    node.childNodes[0].id = ''
  })

  e.target.id = 'selected'

  e.target.style.backgroundColor = 'rgba(128,128,128,0.3)'

  currType = e.target.classList[1]

  sortCurrItemsArr()

  const bagSceneItemSectionDom = document.querySelector('.bagSceneItemListContainer')
  printItems(bagSceneItemSectionDom)
}

function bagSceneConfimationButtonOnClick(e){
  const itemsArr = document.querySelectorAll('.bagSceneItem')
  itemsArr.forEach(node =>{
    node.removeAttribute('id')
  })
  document.querySelector('.bagSceneConfirmationContainer').style.display = 'none'
}

export let itemUsed = {item: null, used: false}

export let evoItemUsed = {
  item: null
}

function useItemOnClickEvent(e){
  if(!choosePogemon) return

  let index = e.target.classList[1].substr(-1, 1)
  let targetPogemon = player.team[index]

  const currQuantity = player.bag.get(currItem.name).quantity
  if(currQuantity < 1) return

  const dialogueInterfaceDom = document.querySelector('.bagSceneItemDialogueContainer')
  dialogueInterfaceDom.style.display = 'block'

  const bagSceneItemDialogueContainer = document.querySelector('.bagSceneItemDialogueContainer')
  bagSceneItemDialogueContainer.innerText = `Which move should this ${currItem.name} be used on?`

  const bagScene = document.querySelector('#bagScene')

  switch(selectedMenuOption){
    case 'use':
      switch(currItem.type){
        case 'misc':
          switch(currItem.effect){
            case 'evo':
              if(targetPogemon.evo == null) {
                targetPogemon.dialogue('bag', "This item can't be used on this pogemon.")
                return
              }
              if(targetPogemon.evo.length == undefined){
                if(targetPogemon.evo.item == currItem.name){
                  if(currItem.friendliness != undefined) targetPogemon.manageFriendliness(currItem.friendliness)
  
                  manageBagState(false, prevScene)
                  manageEvolutionState(true, [targetPogemon])
                  gsap.to('#overlapping', {
                    opacity: 1,
                    onComplete: () =>{
                      gsap.to('#overlapping', {
                        opacity: 0
                      })
                    }
                  })
                } else {
                  targetPogemon.dialogue('bag', "This item can't be used on this pogemon.")
                }
              } else {
                targetPogemon.evo.forEach(evoType =>{
                  if(evoType.item == currItem.name){
                    evoItemUsed.item = currItem.name

                    if(currItem.friendliness != undefined) targetPogemon.manageFriendliness(currItem.friendliness)
    
                    manageBagState(false, prevScene)
                    manageEvolutionState(true, [targetPogemon])
                    gsap.to('#overlapping', {
                      opacity: 1,
                      onComplete: () =>{
                        gsap.to('#overlapping', {
                          opacity: 0
                        })
                      }
                    })
                  }
                })
              }
              break
          }
          break
        case 'med':
        case 'berry':
          switch(currItem.effect){
            case 'heal':
              if(targetPogemon.fainted){
                dialogueInterfaceDom.textContent = `${switchUnderScoreForSpace(targetPogemon.nickname)} has fainted and cannot recover HP`
                return
              }
              
              if(typeof currItem.pow == 'number'){
                if(targetPogemon.hp < targetPogemon.stats.baseHp){
                  if(currItem.friendliness != undefined) targetPogemon.manageFriendliness(currItem.friendliness)
  
                  let prevHp = targetPogemon.hp
                  targetPogemon.heal(e.target.classList[1], currItem)
    
                  player.bag.set(currItem.name, {item: currItem, quantity: currQuantity - 1})
                  currItemDom.childNodes[1].childNodes[1].textContent = `x${player.bag.get(`${currItem.name}`).quantity}`
    
                  itemUsed.item = currItem
              
                  dialogueInterfaceDom.innerText = `A ${switchUnderScoreForSpace(currItem.name)} was used on ${switchUnderScoreForSpace(targetPogemon.nickname)}.\n\n${targetPogemon.hp - prevHp}hp were recovered.`
                } else {
    
                  dialogueInterfaceDom.textContent = `${switchUnderScoreForSpace(targetPogemon.nickname)} doesnt need to be healed.`
                  dialogueInterfaceDom.style.display = 'block'
                  return
                }
              } else {
                if(targetPogemon.status.name == currItem.pow){

                  targetPogemon.status.name == null
                  targetPogemon.status.turns = 0

                  dialogueInterfaceDom.innerText = `A ${switchUnderScoreForSpace(currItem.name)} was used on ${switchUnderScoreForSpace(targetPogemon.nickname)}.\n\n${switchUnderScoreForSpace(targetPogemon.nickname)} was cured of it's status ailment.`

                  player.bag.set(`${currItem.name}`, {item: currItem, quantity: currQuantity - 1})
                  currItemDom.childNodes[1].childNodes[1].textContent = `x${player.bag.get(`${currItem.name}`).quantity}`
    
                  itemUsed.item = currItem

                  player.team.forEach((pogemon, i) =>{
                    if(pogemon.id == targetPogemon.id){
                      document.querySelectorAll('.bagSceneTeamSectionStatusImg')[i].src = 'img/status/null.png'
                    }
                  })
                } else {
                  dialogueInterfaceDom.innerText = `A ${switchUnderScoreForSpace(currItem.name)} has no effect on ${switchUnderScoreForSpace(targetPogemon.nickname)}.`
                }
              }

              currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
              break
            case 'revive':
              // breaks the game
              // returns to battle even if doesnt work
              if(targetPogemon.fainted){
                if(currItem.friendliness != undefined) targetPogemon.manageFriendliness(currItem.friendliness)
                  
                dialogueInterfaceDom.innerText = `${switchUnderScoreForSpace(targetPogemon.nickname)} has been revived.`
                targetPogemon.fainted = false
  
                targetPogemon.hp = Math.floor(targetPogemon.stats.baseHp * currItem.pow)
                e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].style.width = `${player.team[0].convertToPercentage(targetPogemon.hp, targetPogemon.stats.baseHp)}%`
                e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[0].textContent = `${targetPogemon.hp}/${targetPogemon.stats.baseHp}`
  
                itemUsed.item = currItem
                itemUsed.used = true

                currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
              } else {
                dialogueInterfaceDom.innerText = `${switchUnderScoreForSpace(targetPogemon.nickname)} doesnt need to be revived.`
                return
              }
              break
            case 'pp':
              const restoreMovePPContainerBackground = document.createElement('div')
              restoreMovePPContainerBackground.id = 'restoreMovePPContainerBackground'

              bagScene.appendChild(restoreMovePPContainerBackground)

              function removeRestorePPMenu(text){
                bagSceneItemDialogueContainer.innerText = text
                bagScene.removeChild(bagScene.childNodes[1])
                bagScene.removeChild(bagScene.childNodes[1])
              }

              restoreMovePPContainerBackground.addEventListener('click', () => removeRestorePPMenu(``))

              const restoreMovePPContainer = document.createElement('div')
              restoreMovePPContainer.id = 'restoreMovePPContainer'

              bagScene.appendChild(restoreMovePPContainer)

              let freezePPRestore = false

              function restorePPOnClick(e, i, move, currItem){
                if(freezePPRestore) return
                freezePPRestore = true

                targetPogemon.moves[i].pp += currItem.pow
                if(targetPogemon.moves[i].pp > movesObj[move.name].pp) targetPogemon.moves[i].pp = movesObj[move.name].pp
                
                console.log(currItem)

                player.bag.set(currItem.name, {item: currItem, quantity: currQuantity - 1})
                e.target.innerText = `${switchUnderScoreForSpace(move.name)}\n\n${move.pp}/${movesObj[move.name].pp}`
                currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
  
                itemUsed.item = currItem

                let ppAmount = 10
                if(ppAmount == 999) ppAmount = 'all'

                bagSceneItemDialogueContainer.innerText = `${switchUnderScoreForSpace(currItem.name)} was used on ${switchUnderScoreForSpace(targetPogemon.nickname)} successfully!`

                setTimeout(() =>{
                  removeRestorePPMenu(`${switchUnderScoreForSpace(targetPogemon.nickname)}'s move restored ${ppAmount} of it's pp!`)                
                }, 1750)
              }

              let rememberClickItem = {...currItem}

              targetPogemon.moves.forEach((move, i) =>{

                const restoreMovePPMoveContainer = document.createElement('div')
                restoreMovePPMoveContainer.setAttribute('class', 'restoreMovePPMoveContainer')
                restoreMovePPContainer.appendChild(restoreMovePPMoveContainer)

                const restoreMovePPMoveContentContainer = document.createElement('div')
                restoreMovePPMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainer')
                restoreMovePPMoveContainer.appendChild(restoreMovePPMoveContentContainer)

                restoreMovePPMoveContentContainer.innerText = `${move.name}\n\n${move.pp}/${movesObj[move.name].pp}`

                // if(move.pp != movesObj[move.name].pp) {
                  restoreMovePPMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainerHover restoreMovePPMoveContentContainer')
                  restoreMovePPMoveContentContainer.addEventListener('click', e => restorePPOnClick(e, i, move, rememberClickItem))
                // }
              })
              break
            case 'ppAll':
              let pass = false

              targetPogemon.moves.forEach((move, i) =>{
                if(move.pp < movesObj[move.name].pp) {
                  pass = true
                }

                if(pass){
                  move.pp += currItem.pow
                }
              })

              if(!pass) {
                dialogueInterfaceDom.textContent = `${switchUnderScoreForSpace(targetPogemon.nickname)} doesnt need it's pp restored.`
                return
              }

              if(currItem.friendliness != undefined) targetPogemon.manageFriendliness(currItem.friendliness)

              player.bag.set(`${currItem.name}`, {item: currItem, quantity: currQuantity - 1})
              currItemDom.childNodes[1].childNodes[1].textContent = `x${player.bag.get(`${currItem.name}`).quantity}`

              itemUsed.item = currItem

              dialogueInterfaceDom.innerText = `A ${switchUnderScoreForSpace(currItem.name)} was used on ${switchUnderScoreForSpace(targetPogemon.nickname)}.\n\n${switchUnderScoreForSpace(targetPogemon.nickname)} recovered some pp.`
              
              currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
              break
          }
          break
        case 'ball':
          if(prevScene == 'battle') return
          dialogueInterfaceDom.innerText = `Can't use this.`
          break
        case 'battle':
          player.team[0].dialogue('bag', 'Battle items cannot be used.')
          break
        case 'tm':
          console.log('?????????????????')

          const TMContainerBackground = document.createElement('div')
          TMContainerBackground.id = 'restoreMovePPContainerBackground'
          bagScene.appendChild(TMContainerBackground)

          function removeTMMenu(text){
            bagSceneItemDialogueContainer.innerText = text
            bagScene.removeChild(bagScene.childNodes[1])
            bagScene.removeChild(bagScene.childNodes[1])
          }

          TMContainerBackground.addEventListener('click', () => removeTMMenu(``))
          const TMContainer = document.createElement('div')
          TMContainer.id = 'restoreMovePPContainer'

          bagScene.appendChild(TMContainer)

          let freezeTMProcess = false

          function changeMoveForTMOnClick(e, i, move, currItem){
            if(freezeTMProcess) return
            freezeTMProcess = true

            const lastMove = targetPogemon.moves[i]

            targetPogemon.moves[i] = movesObj[currItem.TMName]
            if(targetPogemon.moves[i].pp > lastMove) targetPogemon.moves[i].pp = lastMove.pp

            player.bag.set(currItem.name, {item: currItem, quantity: currQuantity - 1})
            e.target.innerText = `${switchUnderScoreForSpace(currItem.TMName)}`
            currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`

            itemUsed.item = currItem

            bagSceneItemDialogueContainer.innerText = `${switchUnderScoreForSpace(currItem.name)} was taught to ${switchUnderScoreForSpace(targetPogemon.nickname)} successfully!`

            targetPogemon.learntMoves.push(currItem.TMName)

            setTimeout(() =>{
              removeTMMenu(`${switchUnderScoreForSpace(lastMove.name)} was switched to ${switchUnderScoreForSpace(currItem.TMName)}.`)
            }, 1750)
          }

          let rememberTMClickItem = {...currItem}

          targetPogemon.moves.forEach((move, i) =>{
            const TMMoveContainer = document.createElement('div')
            TMMoveContainer.setAttribute('class', 'restoreMovePPMoveContainer')
            restoreMovePPContainer.appendChild(TMMoveContainer)

            const TMMoveContentContainer = document.createElement('div')
            TMMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainer')
            TMMoveContainer.appendChild(TMMoveContentContainer)

            TMMoveContentContainer.innerText = `${switchUnderScoreForSpace(move.name)}`

            TMMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainerHover restoreMovePPMoveContentContainer')
            TMMoveContentContainer.addEventListener('click', e => changeMoveForTMOnClick(e, i, move, rememberTMClickItem))
          })
          break  
        }
      break
    case 'give':
      let prevItem
      if(targetPogemon.heldItem != undefined){
        prevItem = player.bag.get(targetPogemon.heldItem.name)
        player.bag.set(targetPogemon.heldItem.name, {item: prevItem.item , quantity: prevItem.quantity + 1})

        document.querySelectorAll('.bagSceneItemContainer').forEach(node =>{
          if(node.childNodes[0].childNodes[1].childNodes[0].textContent != targetPogemon.heldItem.name) return
          
          node.childNodes[0].childNodes[1].childNodes[1].textContent = `x${player.bag.get(`${targetPogemon.heldItem.name}`).quantity}`
        })
      }

      targetPogemon.heldItem = currItem
      targetPogemon.dialogue('bag', `You gave ${switchUnderScoreForSpace(targetPogemon.nickname)} a ${switchUnderScoreForSpace(currItem.name)}.`)
      e.target.childNodes[0].childNodes[0].src = `img/item_scene/items/${currItem.type}/${currItem.name}.png`
      let bagItem = player.bag.get(`${currItem.name}`)
      player.bag.set(`${currItem.name}`, {item: bagItem.item, quantity: bagItem.quantity - 1})
      currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(`${currItem.name}`).quantity}`

      sortCurrItemsArr()

      const bagSceneItemSectionDom = document.querySelector('.bagSceneItemListContainer')
      printItems(bagSceneItemSectionDom)

      break
  }

  if(currItem.type == 'battle') return

  if(prevScene == 'battle') {
    returnToBattle = true
    setTimeout(() =>{
      dialogueInterfaceDom.style.cursor = 'default'
      returnToBattle = false
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          itemUsed.used = true
          manageBagState(false, 'battle')
          gsap.to('#overlapping', {
            opacity: 0,
          })
        }
      })
    }, 1500)
  }
  document.querySelectorAll('.bagSceneTeamSection').forEach(node =>{
    node.style.cursor = 'auto'
  })

  currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
}

function cancelEventOnDocumentClick(e){
  if(scenes.get('bag').initiated != true) return

  if(!nodeArr.includes(e.target.classList[0])){
    choosePogemon = false
    itemChosen = false
  }

  const teamSection = document.querySelector('.bagSceneTeamContainer')
  const itemsArr = document.querySelectorAll('.bagSceneItem')
  const menuInterface = document.querySelector('.bagSceneItemMenuContainer')
  const dialogueInferface = document.querySelector('.bagSceneItemDialogueContainer')
  const confirmationInferface = document.querySelector('.bagSceneConfirmationContainer')

  for(let i = 0;  i < nodeArr.length; i++){
    if(e.target.classList[0] == nodeArr[i]) return
  }

  teamSection.style.backgroundColor = 'transparent'

  teamSection.childNodes.forEach(node =>{
    node.style.backgroundColor = 'transparent'
    node.removeAttribute('id')
  })

  itemsArr.forEach(node =>{
    node.style.backgroundColor = 'transparent'
    node.removeAttribute('id')
  })

  if(nodeArr.includes('bagSceneTeamSection')) nodeArr.splice(nodeArr.indexOf('bagSceneTeamSection'), 1)

  menuInterface.style.display = 'none'

  confirmationInferface.style.display = 'none'

  // itemUsed = {item: null, used : false}
}

function printItems(bagSceneItemSectionDom){
  bagSceneItemSectionDom.replaceChildren()
  // list container
  bagSceneItemSectionDom.classList.add('bagSceneItemListContainer')
  //need to add amount of item in bag.currType.length or smthn like that
  sortCurrItemsArr()
  for(let i = 0; i < currItemsArr.length; i++){
    const item = currItemsArr[i].item

    if(player.bag.get(item.name).quantity < 1) continue
    //item container
    const bagSceneItemContainerDom = document.createElement('div')
    bagSceneItemContainerDom.classList.add('bagSceneItemContainer')
    bagSceneItemSectionDom.appendChild(bagSceneItemContainerDom)

    //indiv item
    const bagSceneItemDom = document.createElement('div')
    bagSceneItemDom.classList.add('bagSceneItem', `item${i}`)
    bagSceneItemDom.addEventListener('mouseover', e => bagSceneHoverEvent(e, true))
    bagSceneItemDom.addEventListener('mouseout', e => bagSceneHoverEvent(e, false))
    bagSceneItemDom.addEventListener('click', e => bagSceneSectionOnClickEvent(e, true))
    bagSceneItemContainerDom.appendChild(bagSceneItemDom)

    const bagSceneItemImgDom = document.createElement('img')
    bagSceneItemImgDom.classList.add('bagSceneItemImgDom')
    bagSceneItemImgDom.src = item.img
    bagSceneItemDom.appendChild(bagSceneItemImgDom)

    const bagSceneItemInfoContainerDom = document.createElement('div')
    bagSceneItemInfoContainerDom.classList.add('bagSceneItemInfoContainer')
    bagSceneItemDom.appendChild(bagSceneItemInfoContainerDom)
    
    const bagSceneItemInfoNameContainerDom = document.createElement('div')
    bagSceneItemInfoNameContainerDom.classList.add('bagSceneItemInfoNameContainer')
    bagSceneItemInfoNameContainerDom.textContent = switchUnderScoreForSpace(item.name)
    bagSceneItemInfoContainerDom.appendChild(bagSceneItemInfoNameContainerDom)

    const bagSceneItemInfoQuantityContainerDom = document.createElement('div')
    bagSceneItemInfoQuantityContainerDom.classList.add('bagSceneItemInfoQuantityContainer')
    bagSceneItemInfoQuantityContainerDom.textContent = `x${currItemsArr[i].quantity}`
    bagSceneItemInfoContainerDom.appendChild(bagSceneItemInfoQuantityContainerDom)
  }
}

function printBagScene(){
  document.querySelector('#overlapping').style.opacity = 0

  // misc + team
  const bagSceneMiscContainerDom = document.createElement('div')
  bagSceneMiscContainerDom.classList.add('bagSceneMiscContainer')

  // misc
  const bagSceneMiscHeaderContainerDom = document.createElement('div')
  bagSceneMiscHeaderContainerDom.classList.add('bagSceneMiscHeaderContainer')
  
  bagSceneMiscContainerDom.appendChild(bagSceneMiscHeaderContainerDom)

  for(let i = 0; i < 2; i++){
    const bagSceneMiscSectionDom = document.createElement('div')
    bagSceneMiscSectionDom.classList.add('bagSceneMiscSection')
    bagSceneMiscHeaderContainerDom.appendChild(bagSceneMiscSectionDom)
  }

  bagSceneMiscHeaderContainerDom.childNodes[0].classList.add('bagScenePogebuckAmount')
  bagSceneMiscHeaderContainerDom.childNodes[0].textContent = `${player.money}`

  const bagScenePogemonIconDom = document.createElement('img')
  bagScenePogemonIconDom.classList.add('bagScenePogemonIcon')
  bagScenePogemonIconDom.src = `img/item_scene/pogebuck.png`

  bagSceneMiscHeaderContainerDom.childNodes[1].classList.add('bagScenePogebuckIcon')
  bagSceneMiscHeaderContainerDom.childNodes[1].appendChild(bagScenePogemonIconDom)

  // team
  const bagSceneTeamContainerDom = document.createElement('div')
  bagSceneTeamContainerDom.classList.add('bagSceneTeamContainer')

  for(let i = 0; i < 6; i++){
    //each section from the team column
    const bagSceneTeamSectionDom = document.createElement('div')
    bagSceneTeamSectionDom.classList.add('bagSceneTeamSection', `bagTeam${i}`)
    bagSceneTeamSectionDom.addEventListener('click', e => useItemOnClickEvent(e))
    bagSceneTeamContainerDom.appendChild(bagSceneTeamSectionDom)

    if(player.team.length > i){
      bagSceneTeamSectionDom.addEventListener('mouseover', e => bagSceneHoverEvent(e, true))
      bagSceneTeamSectionDom.addEventListener('mouseout', e => bagSceneHoverEvent(e, false))
      bagSceneTeamSectionDom.addEventListener('click', e => bagSceneSectionOnClickEvent(e, false))
  
      const bagSceneTeamSectionImgContainerDom = document.createElement('div')
      bagSceneTeamSectionImgContainerDom.classList.add('bagSceneTeamSectionImgContainer')
      bagSceneTeamSectionDom.appendChild(bagSceneTeamSectionImgContainerDom)

      const bagSceneTeamSectionItemDom = document.createElement('img')
      if(player.team[i].heldItem == undefined) bagSceneTeamSectionItemDom.src = `img/item_scene/items/blank.png`
      else bagSceneTeamSectionItemDom.src = `img/item_scene/items/${player.team[i].heldItem.type}/${player.team[i].heldItem.name}.png`
      bagSceneTeamSectionItemDom.classList.add('bagSceneTeamSectionItem')

      bagSceneTeamSectionItemDom.addEventListener('mouseover', e =>{
        if(player.team[i].heldItem == undefined) return
        e.target.style.cursor = 'pointer'
        e.target.style.backgroundColor = 'rgba(75,75,75,0.3)'
      })

      bagSceneTeamSectionItemDom.addEventListener('mouseout', e =>{
        if(player.team[i].heldItem == undefined) return
        e.target.style.cursor = 'auto'
        e.target.style.backgroundColor = 'transparent'
      })

      bagSceneTeamSectionItemDom.addEventListener('click', e =>{
        if(player.team[i].heldItem == undefined || player.team[i].heldItem == null) return

        const currQuantity = player.bag.get(`${player.team[i].heldItem.name}`).quantity

        player.bag.set(`${player.team[i].heldItem.name}`, {item: player.team[i].heldItem, quantity: currQuantity + 1})

        const bagSceneItemSectionDom = document.querySelector('.bagSceneItemListContainer')
        printItems(bagSceneItemSectionDom)

        document.querySelector('.bagSceneItemDialogueContainer').innerText = `You took back a ${switchUnderScoreForSpace(player.team[i].heldItem.name)} from ${switchUnderScoreForSpace(player.team[i].nickname)}.`

        player.team[i].heldItem = undefined
        bagSceneTeamSectionItemDom.src = `img/item_scene/items/blank.png`
        bagSceneTeamSectionItemDom.style.backgroundColor = 'transparent'
      })

      bagSceneTeamSectionImgContainerDom.appendChild(bagSceneTeamSectionItemDom)
  
      const bagSceneTeamSectionInfoContainerDom = document.createElement('div')
      bagSceneTeamSectionInfoContainerDom.classList.add('bagSceneTeamSectionInfoContainer')
      bagSceneTeamSectionDom.appendChild(bagSceneTeamSectionInfoContainerDom)
  
      // info on the top of the container
  
      const bagSceneTeamSectionInfoTopContainerDom = document.createElement('div')
      bagSceneTeamSectionInfoTopContainerDom.classList.add('bagSceneTeamSectionInfoTopContainer')
      bagSceneTeamSectionInfoContainerDom.appendChild(bagSceneTeamSectionInfoTopContainerDom)
  
      const bagSceneTeamSectionInfoNameDom = document.createElement('span')
      bagSceneTeamSectionInfoNameDom.textContent = `${switchUnderScoreForSpace(player.team[i].nickname)}`
      bagSceneTeamSectionInfoNameDom.classList.add('bagSceneTeamSectionInfoName')
      bagSceneTeamSectionInfoTopContainerDom.appendChild(bagSceneTeamSectionInfoNameDom)
  
      const bagSceneTeamSectionInfoGenderDom = new Image()
      bagSceneTeamSectionInfoGenderDom.classList.add('bagSceneTeamSectionInfoGender')
      bagSceneTeamSectionInfoTopContainerDom.appendChild(bagSceneTeamSectionInfoGenderDom)
  
      // info on the bottom of the container
  
      const bagSceneTeamSectionInfoBottomContainerDom = document.createElement('div')
      bagSceneTeamSectionInfoBottomContainerDom.classList.add('bagSceneTeamSectionInfoBottomContainer')
      bagSceneTeamSectionInfoContainerDom.appendChild(bagSceneTeamSectionInfoBottomContainerDom)
  
      const bagSceneTeamSectionGreenBarDom = document.createElement('div')
      bagSceneTeamSectionGreenBarDom.classList.add('bagSceneTeamSectionGreenBar')
      bagSceneTeamSectionGreenBarDom.style.width = `${player.team[i].convertToPercentage(player.team[i].hp, player.team[i].stats.baseHp)}%`
  
      const bagSceneTeamSectionGreyBarDom = document.createElement('div')
      bagSceneTeamSectionGreyBarDom.classList.add('bagSceneTeamSectionGreyBar')

      const bagSceneTeamSectionStatusImgDom = document.createElement('img')
      bagSceneTeamSectionStatusImgDom.classList.add('bagSceneTeamSectionStatusImg')
      bagSceneTeamSectionStatusImgDom.src = `./img/status/${player.team[i].status.name}.png`
  
      const bagSceneTeamSectionHealthBarDom = document.createElement('div')
      bagSceneTeamSectionHealthBarDom.classList.add('bagSceneTeamSectionHealthBar')
      bagSceneTeamSectionHealthBarDom.appendChild(bagSceneTeamSectionGreenBarDom)
      bagSceneTeamSectionHealthBarDom.appendChild(bagSceneTeamSectionGreyBarDom)
  
      const bagSceneTeamSectionHPDom = document.createElement('div')
      bagSceneTeamSectionHPDom.textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
      bagSceneTeamSectionHPDom.classList.add('bagSceneTeamSectionHP')
  
      const bagSceneTeamSectionLvlDom = document.createElement('div')
      bagSceneTeamSectionLvlDom.textContent = `Lv ${player.team[i].lvl}`
      bagSceneTeamSectionLvlDom.classList.add('bagSceneTeamSectionLvl')
  
      const bagSceneTeamSectionHealthBarContainerDom = document.createElement('div')
      bagSceneTeamSectionHealthBarContainerDom.classList.add('bagSceneTeamSectionHealthBarContainer')
      bagSceneTeamSectionHealthBarContainerDom.appendChild(bagSceneTeamSectionHPDom)
      bagSceneTeamSectionHealthBarContainerDom.appendChild(bagSceneTeamSectionHealthBarDom)
  
      bagSceneTeamSectionInfoBottomContainerDom.appendChild(bagSceneTeamSectionLvlDom)
      bagSceneTeamSectionInfoBottomContainerDom.appendChild(bagSceneTeamSectionHealthBarContainerDom)
      bagSceneTeamSectionInfoBottomContainerDom.appendChild(bagSceneTeamSectionStatusImgDom)
    }
  }

  bagSceneMiscContainerDom.appendChild(bagSceneTeamContainerDom)

  //rest of the interface
  const bagSceneItemContainerDom = document.createElement('div')
  bagSceneItemContainerDom.classList.add('bagSceneItemsMenu')

  const itemsTypeArr = ['misc', 'med', 'ball', 'berry', 'tm', 'battle', 'vals', 'key']

  for(let i = 0; i < 3; i++){
    const bagSceneItemSectionDom = document.createElement('div')
    switch(i){
      case 0:
        //icon types
        bagSceneItemSectionDom.classList.add('bagSceneItemTypeContainer')
        for(let j = 0; j < itemsTypeArr.length; j++){
          //icon containers
          const bagSceneItemTypeDom = document.createElement('div')
          bagSceneItemTypeDom.classList.add('bagSceneItemType')
          bagSceneItemSectionDom.appendChild(bagSceneItemTypeDom)

          //indiv icon
          const bagSceneItemTypeImgDom = new Image()
          bagSceneItemTypeImgDom.classList.add('bagSceneItemTypeImg')
          bagSceneItemTypeImgDom.classList.add(`${itemsTypeArr[j]}`)
          bagSceneItemTypeImgDom.src = `img/item_scene/${j}.png`
          if(bagSceneItemTypeImgDom.classList[1] == currType){
            bagSceneItemTypeImgDom.style.backgroundColor = 'rgba(128, 128, 128, 0.3)'
            bagSceneItemTypeImgDom.id = 'selected'
          }
          bagSceneItemTypeImgDom.addEventListener('mouseover', e => bagSceneHoverEvent(e, true))
          bagSceneItemTypeImgDom.addEventListener('mouseout', e => bagSceneHoverEvent(e, false))
          bagSceneItemTypeImgDom.addEventListener('click', e => bagSceneItemTypeOnClick(e))
          bagSceneItemTypeDom.appendChild(bagSceneItemTypeImgDom)
        }
        break
      case 1:
        printItems(bagSceneItemSectionDom)
        break
      case 2:
        //interface container
        bagSceneItemSectionDom.classList.add('bagSceneItemInterfaceContainer')

        //dialogue box container
        const bagSceneItemDialogueContainerDom = document.createElement('div')
        bagSceneItemDialogueContainerDom.classList.add('bagSceneItemDialogueContainer')
        bagSceneItemDialogueContainerDom.addEventListener('click', e => spendQueue(), true)
        bagSceneItemSectionDom.appendChild(bagSceneItemDialogueContainerDom)

        //menu options container
        const bagSceneItemMenuContainerDom = document.createElement('div')
        bagSceneItemMenuContainerDom.classList.add('bagSceneItemMenuContainer')
        bagSceneItemSectionDom.appendChild(bagSceneItemMenuContainerDom)
        
        for(let j = 0; j < bagMenuButtonOption.length; j++){
          //menu button container
          const bagSceneMenuButtonContainerDom = document.createElement('div')
          bagSceneMenuButtonContainerDom.classList.add('bagSceneMenuButtonContainer')
          bagSceneMenuButtonContainerDom.addEventListener('click', e => bagSceneMenuButtonOnClick(e))
          bagSceneItemMenuContainerDom.appendChild(bagSceneMenuButtonContainerDom)

          //indiv button
          const bagSceneMenuButtonDom = document.createElement('div')
          bagSceneMenuButtonDom.classList.add('bagSceneMenuButton')
          bagSceneMenuButtonDom.textContent = bagMenuButtonOption[j]
          bagSceneMenuButtonDom.addEventListener('mouseover', e => bagSceneHoverEvent(e, true))
          bagSceneMenuButtonDom.addEventListener('mouseout', e => bagSceneHoverEvent(e, false))
          bagSceneMenuButtonContainerDom.appendChild(bagSceneMenuButtonDom)
        }

        //menu confirmation container
        const bagSceneConfirmationContainerDom = document.createElement('div')
        bagSceneConfirmationContainerDom.classList.add('bagSceneConfirmationContainer')
        bagSceneItemSectionDom.appendChild(bagSceneConfirmationContainerDom)

        //menu confirmation dialogue
        const bagSceneConfirmationDialogueContainerDom = document.createElement('div')
        bagSceneConfirmationDialogueContainerDom.classList.add('bagSceneConfirmationDialogueContainer')
        bagSceneConfirmationContainerDom.appendChild(bagSceneConfirmationDialogueContainerDom)

        const bagSceneConfirmationDialogueDom = document.createElement('div')
        bagSceneConfirmationDialogueDom.classList.add('bagSceneConfirmationDialogue')
        bagSceneConfirmationDialogueContainerDom.appendChild(bagSceneConfirmationDialogueDom)

        //menu confirmation option container
        const bagSceneConfirmationOptionContainerDom = document.createElement('div')
        bagSceneConfirmationOptionContainerDom.classList.add('bagSceneConfirmationOptionContainer')
        bagSceneConfirmationContainerDom.appendChild(bagSceneConfirmationOptionContainerDom)

        const confirmationOptions = ['yes', 'no']
        for(let i = 0; i < confirmationOptions.length; i++){
          const bagSceneConfirmationOptionButtonDom = document.createElement('div')
          bagSceneConfirmationOptionButtonDom.classList.add('bagSceneConfirmationOptionButton')
          bagSceneConfirmationOptionButtonDom.addEventListener('click', e => bagSceneConfimationButtonOnClick(e))
          bagSceneConfirmationOptionContainerDom.appendChild(bagSceneConfirmationOptionButtonDom)

          const bagSceneConfirmationOptionButtonTextDom = document.createElement('div')
          bagSceneConfirmationOptionButtonTextDom.classList.add('bagSceneConfirmationOptionButtonText')
          bagSceneConfirmationOptionButtonTextDom.textContent = confirmationOptions[i]
          bagSceneConfirmationOptionButtonDom.appendChild(bagSceneConfirmationOptionButtonTextDom)

        }
        break
    }
    bagSceneItemContainerDom.appendChild(bagSceneItemSectionDom)
  }

  const bagSceneContainerDom = document.createElement('div')
  bagSceneContainerDom.id = 'bagSceneContainer'
  bagSceneContainerDom.appendChild(bagSceneMiscContainerDom)
  bagSceneContainerDom.appendChild(bagSceneItemContainerDom)
  bagSceneContainerDom.addEventListener('click', e => cancelEventOnDocumentClick(e))

  const bagSceneDom = document.querySelector('#bagScene')
  bagSceneContainerDom.style.display = 'grid'
  bagSceneDom.appendChild(bagSceneContainerDom)
}

let bagSceneAnimationId

function bagSceneAnimation(){
  bagSceneAnimationId = window.requestAnimationFrame(bagSceneAnimation)
  
  backgroundSprite.draw()

  for(let i = 0; i < player.team.length; i++){
    player.team[i].position = {
      x: 43,
      y: window.innerHeight / 10 + 150 * i
    }

    if(player.team[i].isShiny) player.team[i].img.src = player.team[i].pogemon.sprites.shiny.bagSprite
    else player.team[i].img.src = player.team[i].pogemon.sprites.classic.bagSprite
    // player.team[i].animate = false
    player.team[i].draw()
  }
}

function initBagScene(prevScene){
  player.team.forEach(pogemon =>{
    pogemon.animate = false
  })
  document.querySelector('#bagScene').style.display = 'block'
  returnPrevScene(prevScene)
  scenes.set('bag', {initiated: true})
  bagSceneAnimation()
  printBagScene()
  document.querySelector('#bagScene').style.pointerEvents = 'all'

}

function clearBagScene(prevScene){
  scenes.set('bag', {initiated: false})
  // itemUsed = {item: null, used : false}
  if(document.querySelector('#bagSceneContainer') != null){
    document.querySelector('#bagSceneContainer').style.display = 'none'

  }
  if(document.querySelector('#bagScene') != null){
    document.querySelector('#bagScene').style.pointerEvents = 'none'
    document.querySelector('#bagScene').style.display = 'none'
    document.querySelector('#bagScene').replaceChildren()
  }


  window.cancelAnimationFrame(bagSceneAnimationId)
  if(prevScene == 'battle') {
    returnPrevScene('bag')
    manageBattleState(true)
  }
}

export function manageBagState(state, prevScene){
  if(state) initBagScene(prevScene)
  else clearBagScene(prevScene)
}