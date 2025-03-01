import { Sprite } from "../../classes.js"

import { player, repelObj } from "../player.js"
import { scenes, backgroundSprite } from "../canvas.js"
import { prevScene, returnPrevScene, transitionScenes } from "./overworld.js"
import { itemsObj } from "../../data/itemsData.js"
import { addToEvoArr, changeHPColor, evoArr, levelCapObj, manageBattleState } from "./battle.js"
import { mapsObj } from "../../data/mapsData.js"
import { manageEvolutionState } from "./evolution.js"
import { switchUnderScoreForSpace } from "./stats.js"
import { movesObj } from "../../data/movesData.js"
import { changeMapInfo, currMap, map } from "../maps.js"

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

export let currItem
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

export const teleportEvent = {
  active: false
}

function printMap(type){
  const dialogueBox = document.querySelector('.bagSceneItemDialogueContainer')

  function removeMapMenu(text){
    dialogueBox.innerText = text
    bagScene.removeChild(bagScene.childNodes[1])
    bagScene.removeChild(bagScene.childNodes[1])

    document.querySelectorAll('.bagSceneItem').forEach(node =>{
      node.style.backgroundColor = 'transparent'
    })
  }

  dialogueBox.innerText = ''

  const bagSceneMapContainerBackground = document.createElement('div')
  bagSceneMapContainerBackground.id = 'bagSceneMapContainerBackground'
  bagSceneMapContainerBackground.addEventListener('click', () => removeMapMenu(``))

  bagScene.appendChild(bagSceneMapContainerBackground)

  const bagSceneMapContainer = document.createElement('div')
  bagSceneMapContainer.id = 'bagSceneMapContainer'

  bagScene.appendChild(bagSceneMapContainer)

  const bagSceneMap = document.createElement('img')
  bagSceneMap.id = 'bagSceneMap'
  bagSceneMap.src = 'img/maps/mini_map.png'

  bagSceneMapContainer.appendChild(bagSceneMap)

  const mapsBlockArr = [
    {name: 'gene_Town', x: 126, y: 724, height: 54, width: 62}, 
    {name: 'pearly_Path', x: 120, y: 632, height: 92, width: 68}, 
    {name: 'slither_Road', x: 188, y: 582, height: 142, width: 63}, 
    {name: 'fair_Town', x: 251, y: 663, height: 70, width: 45}, 
    {name: 'cross_Link', x: 251, y: 593, height: 81, width: 45}, 
    {name: 'eden_Forest', x: 114, y: 772, height: 103, width: 96}, 
    {name: 'banishment_Road', x: 47, y: 664, height: 56, width: 73}, 
    {name: 'keme_Town', x: 27, y: 593, height: 71, width: 93}, 
    {name: 'exodus_Road', x: 17, y: 530, height: 64, width: 103}, 
    {name: 'sinai_Desert', x: 17, y: 432, height: 98, width: 103}, 
    {name: 'melchi_Cave', x: 67, y: 392, height: 40, width: 51} , 
    {name: 'luna_Mountain_Entrance', x: 268, y: 572, height: 75, width: 113}, 
    {name: 'luna_Mountain', x: 269, y: 466, height: 107, width: 121}, 
    {name: 'sol_Path', x: 390, y: 473, height: 59, width: 104}, 
    {name: 'commandment_Road', x: 389, y: 338, height: 136, width: 104}, 
    {name: 'scribble_Town', x: 282, y: 338, height: 66, width: 107}, 
    {name: 'mousa_Crest', x: 282, y: 404, height: 63, width: 107}, 
    {name: 'revelation_Road', x: 120, y: 573, height: 59, width: 68}, 
    {name: 'bellum_Way', x: 120, y: 480, height: 102, width: 109}, 
    {name: 'stasis_Cave', x: 119, y: 382, height: 99, width: 110}, 
    {name: 'stasis_Cave_Lower_Level', x: 30, y: 234, height: 128, width: 106},  
    {name: 'stasis_Cave_Upper_Level', x: 28, y: 146, height: 88, width: 112},
    {name: 'stasis_Cave_Top_Level', x: 93, y: 67, height: 81, width: 47}, 
    {name: 'ascension_Path', x: 178, y: 297, height: 91, width: 101}, 
    {name: 'alquima_Town', x: 179, y: 202, height: 95, width: 101}, 
    {name: 'end_Trail', x: 240, y: 130, height: 110, width: 178}, 
    {name: 'transit_Peak', x: 305, y: 40, height: 92, width: 113}, 
    {name: 'neo_Genesis', x: 212, y: 40, height: 91, width: 93},
    {name: 'key_Town', x: 323, y: 698, height: 77, width: 89},
    {name: 'ghost_Woods', x: 318, y: 775, height: 96, width: 89},
    {name: 'pacc_Isle', x: 407, y: 787, height: 84, width: 95},
    {name: 'edicule_Cave', x: 447, y: 873, height: 45, width: 89},
  ]

  mapsBlockArr.forEach(node =>{
    let hidden = true

    Object.values(mapsObj).forEach(map =>{
      if(node.name == map.name && map.seen == true) hidden = false
    })

    if(hidden){
      const blockContainer = document.createElement('div')

      blockContainer.style.backgroundColor = 'rgb(10,10,10)'
      blockContainer.style.position = 'absolute'
      blockContainer.style.left = node.x + 98
      blockContainer.style.top = node.y + 5
      blockContainer.style.width = node.width
      blockContainer.style.height = node.height

      bagSceneMapContainer.appendChild(blockContainer)
    }
  })

  if(type == 'teleport'){
    // const mapsBlockArr = [
    //   {name: 'gene_Town', x: 126, y: 724, height: 54, width: 62}, 
    //   {name: 'pearly_Path', x: 120, y: 632, height: 92, width: 68}, 
    //   {name: 'slither_Road', x: 188, y: 582, height: 142, width: 63}, 
    //   {name: 'fair_Town', x: 251, y: 663, height: 70, width: 45}, 
    //   {name: 'cross_Link', x: 251, y: 593, height: 81, width: 45}, 
    //   {name: 'eden_Forest', x: 114, y: 772, height: 103, width: 96}, 
    //   {name: 'banishment_Road', x: 47, y: 664, height: 56, width: 73}, 
    //   {name: 'keme_Town', x: 27, y: 593, height: 71, width: 93}, 
    //   {name: 'exodus_Road', x: 17, y: 530, height: 64, width: 103}, 
    //   {name: 'sinai_Desert', x: 17, y: 432, height: 98, width: 103}, 
    //   {name: 'melchi_Cave', x: 67, y: 392, height: 40, width: 51} , 
    //   {name: 'luna_Mountain_Entrance', x: 268, y: 572, height: 75, width: 113}, 
    //   {name: 'luna_Mountain', x: 269, y: 466, height: 107, width: 121}, 
    //   {name: 'sol_Path', x: 390, y: 473, height: 59, width: 104}, 
    //   {name: 'commandment_Road', x: 389, y: 338, height: 136, width: 104}, 
    //   {name: 'scribble_Town', x: 282, y: 338, height: 66, width: 107}, 
    //   {name: 'mousa_Crest', x: 282, y: 404, height: 63, width: 107}, 
    //   {name: 'revelation_Road', x: 120, y: 573, height: 59, width: 68}, 
    //   {name: 'bellum_Way', x: 120, y: 480, height: 102, width: 109}, 
    //   {name: 'stasis_Cave', x: 119, y: 382, height: 99, width: 110}, 
    //   {name: 'stasis_Cave_Lower_Level', x: 30, y: 234, height: 128, width: 106},  
    //   {name: 'stasis_Cave_Upper_Level', x: 28, y: 146, height: 88, width: 112},
    //   {name: 'stasis_Cave_Top_Level', x: 93, y: 67, height: 81, width: 47}, 
    //   {name: 'ascension_Path', x: 178, y: 297, height: 91, width: 101}, 
    //   {name: 'alquima_Town', x: 179, y: 202, height: 95, width: 101}, 
    //   {name: 'end_Trail', x: 240, y: 130, height: 110, width: 178}, 
    //   {name: 'transit_Peak', x: 305, y: 40, height: 92, width: 113}, 
    //   {name: 'neo_Genesis', x: 212, y: 40, height: 91, width: 93}
    // ]

    const mapsTeleportArr = [
      {name: 'gene_Town', x: 126, y: 724, height: 54, width: 62}, 
      {name: 'fair_Town', x: 251, y: 663, height: 61, width: 45}, 
      {name: 'keme_Town', x: 138, y: 604, height: 55, width: 55}, 
      {name: 'scribble_Town', x: 282, y: 338, height: 66, width: 107}, 
      {name: 'alquima_Town', x: 179, y: 202, height: 95, width: 101},
      {name: 'key_Town', x: 319, y: 695, height: 78, width: 78},
    ]

    function teleportToClickedArea(e){
      map.position = currMap.spawnPosition

      changeMapInfo({...mapsObj[e.target.id]}, currMap)
      teleportEvent.active = true

      console.log(teleportEvent.active)

      setTimeout(() =>{
        teamSprites.forEach(sprite =>{
          gsap.to(sprite, {
            opacity: 0
          })
        })
        
        teamSprites.splice(0, teamSprites.length)
        if(itemUsed.used == true) return
        manageBagState(false)
        transitionScenes(prevScene, 'bag')

        setTimeout(() =>{
          teleportEvent.active = false
          console.log(teleportEvent.active)
        }, 1250)
      }, 250)
    }

    mapsTeleportArr.forEach(node =>{
      let hidden = false
  
      Object.values(mapsObj).forEach(map =>{
        if(node.name == map.name && map.seen == true) hidden = false
      })
  
      if(!hidden && node.name != currMap.name){
        const blockContainer = document.createElement('div')
  
        blockContainer.style.backgroundColor = 'rgb(155,15,155,0.15)'
        blockContainer.style.position = 'absolute'
        blockContainer.style.left = node.x + 98
        blockContainer.style.top = node.y + 5
        blockContainer.style.width = node.width
        blockContainer.style.height = node.height

        blockContainer.id = node.name

        blockContainer.setAttribute('class', 'teleportArea')
        blockContainer.addEventListener('click', e => teleportToClickedArea(e))
  
        bagSceneMapContainer.appendChild(blockContainer)
      }
    })
  }
}

function bagSceneMenuButtonOnClick(e){
  document.querySelector('.bagSceneItemMenuContainer').style.display = 'none'
  const dialogueBox = document.querySelector('.bagSceneItemDialogueContainer')
  dialogueBox.style.display = 'block'

  switch(e.target.textContent){
    case 'use':
      if(currItem.usable != undefined){
        player.team[0].dialogue('bag', `This item cannot be used.`)
        return
      }

      if(currItem.effect == 'repel'){
        if(repelObj.active) player.team[0].dialogue('bag', `Repel is already applied..\n\n${repelObj.steps} steps left.`)
        else {
          player.team[0].dialogue('bag', 'the repel effect was applied!')

          repelObj.active = true
          repelObj.steps = currItem.pow

          const currQuantity = player.bag.get(currItem.name).quantity
          
          player.bag.set(currItem.name, {item: currItem, quantity: currQuantity - 1})

          currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
        }
        return
      }

      if(currItem.type == 'battle'){
        player.team[0].dialogue('bag', 'Battle items cannot be used.')
        return
      }

      if(prevScene == 'battle' && currItem.type == 'ball'){
        itemUsed.item = currItem
        itemUsed.used = true

        manageBagState(false, 'battle')
        return
      } else if(currItem.name == 'map'){
        // teleport to places you've seen.
        if(prevScene == 'battle') {
          player.team[0].dialogue('bag', "Can't do this right now.")
          return
        }

        printMap('map')

        return
      }else if(currItem.name == 'teleport_Gem'){
        // teleport to places you've seen.
        if(prevScene == 'battle') {
          player.team[0].dialogue('bag', "Can't do this right now.")
          return
        }

        printMap('teleport')

        return
      } else if(currItem.name == 'golden_Disk'){
        player.dialogue('bag', 'This item cannot be used.')
        return
      }

      choosePogemon = true
      dialogueBox.textContent = `Which pogemon should this ${switchUnderScoreForSpace(currItem.name)} be used on?`
      selectedMenuOption = 'use'
      break
    case 'give':
      if(currItem.type == 'key') {
        player.team[0].dialogue('bag', 'Cannot give a key item to a pogemon.')
        return
      }
      
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

const bagScene = document.querySelector('#bagScene')

function useItemOnClickEvent(e){
  if(!choosePogemon) return

  let index = e.target.classList[1].substr(-1, 1)
  let targetPogemon = player.team[index]

  const currQuantity = player.bag.get(currItem.name).quantity
  if(currQuantity < 1) return

  const dialogueInterfaceDom = document.querySelector('.bagSceneItemDialogueContainer')
  dialogueInterfaceDom.style.display = 'block'

  const bagSceneItemDialogueContainer = document.querySelector('.bagSceneItemDialogueContainer')
  bagSceneItemDialogueContainer.innerText = `Which move should this ${targetPogemon.switchUnderScoreForSpace(currItem.name)} be used on?`

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

              function formalCanBeQueen(){
                let pass = true

                player.team.forEach(pogemon =>{
                  console.log(pogemon.pogemon.pogedex)
                  if(
                    pogemon.pogemon.pogedex != 16 &&
                    pogemon.pogemon.pogedex != 17
                  ) pass = false
                })

                if(player.team.length != 6) pass = false

                return pass
              }

              if(currItem.name == 'regina_Esca') {
                if(targetPogemon.pogemon.name == 'formal'){
                  if(targetPogemon.gender == 'female'){
                    if(formalCanBeQueen()){
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
                    else targetPogemon.dialogue('bag', 'This formal doesnt feel safe enought to\n\nuse this item.')
                    return
                  } else {
                    targetPogemon.dialogue('bag', 'Only female formals can use this item.')
                    return
                  }
                }
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
            case 'level':
              console.log(e.target)

              console.log(targetPogemon.lvl)
              console.log(levelCapObj.level)


              if(targetPogemon.lvl == levelCapObj.level) {
                player.dialogue('bag', `This pogemon has reached your current\n\nlevel cap.`)
                return
              }
              else this.lvl = this.generateLevel()

              let nextLvl = targetPogemon.lvl + 1
              let nextLvlExp = Math.pow(nextLvl, 3)

              targetPogemon.exp = nextLvlExp
              targetPogemon.lvl = targetPogemon.generateLevel(targetPogemon.exp)

              console.log(targetPogemon.stats)
              targetPogemon.stats = targetPogemon.generateStats()
              console.log(targetPogemon.stats)

              e.target.childNodes[1].childNodes[1].childNodes[0].childNodes[0].textContent = `Lv ${targetPogemon.lvl}`
              e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[0].textContent = `${targetPogemon.hp}/${targetPogemon.stats.baseHp}`

              targetPogemon.dialogue('bag', `${targetPogemon.switchUnderScoreForSpace(targetPogemon.nickname)} gained a lvl!`)

              let hpToPercent = targetPogemon.convertToPercentage(targetPogemon.hp, targetPogemon.stats.baseHp)

              console.log(hpToPercent)

              e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].style.width = `${hpToPercent}%`
              changeHPColor(e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0], targetPogemon)

              player.bag.set(`${currItem.name}`, {item: currItem, quantity: currQuantity - 1})
              currItemDom.childNodes[1].childNodes[1].textContent = `x${player.bag.get(`${currItem.name}`).quantity}`

              itemUsed.used = true

              setTimeout(() =>{
                itemUsed.used = false
                addToEvoArr(targetPogemon)

                if(evoArr.length > 0){
                  manageEvolutionState(true, evoArr)
                  manageBagState(false, prevScene)
                }
              }, 1250)
              break
            case 'ability':
                bagSceneItemDialogueContainer.innerText = `Which ability should ${targetPogemon.switchUnderScoreForSpace(targetPogemon.nickname)} have instead?`

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
            
              function changeAbility(e, i, abilityInfo){
                if(freezeTMProcess) return
                freezeTMProcess = true
            
                targetPogemon.abilityInfo = abilityInfo
              
                player.bag.set(currItem.name, {item: currItem, quantity: currQuantity - 1})
                currItemDom.childNodes[1].childNodes[1].innerText = `x${player.bag.get(currItem.name).quantity}`
              
                itemUsed.item = currItem

                console.log(abilityInfo)
              
                bagSceneItemDialogueContainer.innerText = `${switchUnderScoreForSpace(abilityInfo.ability.name)} was taught to ${switchUnderScoreForSpace(targetPogemon.nickname)} successfully!`
              
                setTimeout(() =>{
                  removeTMMenu(``)
                }, 1750)
              }
            
              targetPogemon.pogemon.abilities.forEach((abilityInfo, i) =>{
                if(abilityInfo.hidden == true && abilityInfo.seen == false) return

                const TMMoveContainer = document.createElement('div')
                TMMoveContainer.setAttribute('class', 'restoreMovePPMoveContainer')
                restoreMovePPContainer.appendChild(TMMoveContainer)
              
                const TMMoveContentContainer = document.createElement('div')
                TMMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainer')
                TMMoveContainer.appendChild(TMMoveContentContainer)
              
                TMMoveContentContainer.innerText = `${switchUnderScoreForSpace(abilityInfo.ability.name)}`
              
                TMMoveContentContainer.setAttribute('class', 'restoreMovePPMoveContentContainerHover restoreMovePPMoveContentContainer')
                abilityInfo.seen = true
                TMMoveContentContainer.addEventListener('click', e => changeAbility(e, i, abilityInfo))
              })
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
                changeHPColor(e.target.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0], targetPogemon)
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
        case 'tm':
          if(targetPogemon.learntMoves.includes(currItem.TMName)){
            player.dialogue('bag', `${targetPogemon.switchUnderScoreForSpace(targetPogemon.nickname)} already knows this move...`)
            return
          }

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

            Object.values(targetPogemon.pogemon.movepool).forEach(move =>{
              if(move.name == currItem.TMName) move.seen = true
            })

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

      let sameItem = false
      if(targetPogemon.heldItem != null) if(targetPogemon.heldItem.name == currItem.name) sameItem = true

      targetPogemon.heldItem = currItem
      targetPogemon.dialogue('bag', `You gave ${switchUnderScoreForSpace(targetPogemon.nickname)} a ${switchUnderScoreForSpace(currItem.name)}.`)
      if(sameItem) targetPogemon.dialogue('bag', `${switchUnderScoreForSpace(targetPogemon.nickname)} is already holding a ${switchUnderScoreForSpace(currItem.name)}.`)

      e.target.childNodes[0].childNodes[1].src = `img/item_scene/items/${currItem.type}/${currItem.name}.png`
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
            opacity: 0
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

    const bagSceneItemImgContainerDom = document.createElement('div')
    bagSceneItemImgContainerDom.classList.add('bagSceneItemImgContainerDom')
    bagSceneItemDom.appendChild(bagSceneItemImgContainerDom)

    const bagSceneItemImgDom = document.createElement('img')
    bagSceneItemImgDom.classList.add('bagSceneItemImgDom')
    bagSceneItemImgDom.src = item.img
    bagSceneItemImgContainerDom.appendChild(bagSceneItemImgDom)

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

      const bagSceneTeamSectionGenderDom = document.createElement('img')
      if(player.team[i].gender == null) bagSceneTeamSectionGenderDom.src = `img/blank.png`
      else bagSceneTeamSectionGenderDom.src = `img/${player.team[i].gender}_icon.png`
      bagSceneTeamSectionGenderDom.classList.add('bagSceneTeamSectionGender')
  
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

      bagSceneTeamSectionImgContainerDom.appendChild(bagSceneTeamSectionGenderDom)
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
      changeHPColor(bagSceneTeamSectionGreenBarDom, player.team[i])
  
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

const teamSprites = []

function bagSceneAnimation(){
  bagSceneAnimationId = window.requestAnimationFrame(bagSceneAnimation)
  
  backgroundSprite.draw()

  teamSprites.forEach(sprite =>{
    sprite.draw()
  })
}

function initBagScene(prevScene){
  player.team.forEach(pogemon =>{
    pogemon.animate = false
  })
  document.querySelector('#bagScene').style.display = 'block'
  returnPrevScene(prevScene)
  scenes.set('bag', {initiated: true})

  let y = 5
  let multi = 142.5

  if(window.innerHeight == 1080) {
    y = 35
    multi = 154
  }

  for(let i = 0; i < player.team.length; i++){
    player.team[i].position = {
      x: 40,
      y: (window.innerHeight / 10 + multi * i) - y
    }

    if(player.team[i].isShiny) player.team[i].img.src = player.team[i].pogemon.sprites.shiny.bagSprite
    else player.team[i].img.src = player.team[i].pogemon.sprites.classic.bagSprite

    player.team[i].frames.hold = 50

    console.log(player.team[i].pogemon.sprites.classic.bagSprite)
    // player.team[i].animate = false
    teamSprites.push(player.team[i])
  }

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