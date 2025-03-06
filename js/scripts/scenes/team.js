import { mapsObj } from "../../data/mapsData.js"

import { Sprite } from "../../classes.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { player } from "../player.js"
import { disableOWMenu, escapeEvent, prevScene, returnPrevScene } from "./overworld.js"
import { manageBattleState, faintedTriggered, changeHPColor, prevBattlerObj } from "./battle.js"
import { manageStatsState, switchUnderScoreForSpace } from "./stats.js"

let teamAnimationId

let teamPrevScene

function initTeamScene(prevScene){
  scenes.set('team', {initiated: true})

  returnPrevScene(prevScene)

  document.querySelector('#teamScene').style.display = 'block'
  document.querySelector('#overworldScene').style.display = 'none'

  document.querySelector('#overlapping').style.opacity = "0"
  
  createSceneLayout()

  teamAnimation()

  teamPrevScene = prevScene
}

const teamSceneDom = document.querySelector('#teamScene')

let pogemonSpriteArr = []

let pogemonSelected = false

let switchEvent = false

let switchProcess = {active: false, target: {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }}

export let teamEvent = {switch: false, previousScene: null}

function teamMenuSectionHoverEvent(i, teamMenuContainerDom, state){
  if(i >= player.team.length) return
  if(pogemonSelected) return

  if(state){
    teamMenuContainerDom.children[i].style.border = '5px solid rgb(100,100,100)'
    teamMenuContainerDom.children[i].style.cursor = 'pointer'
    teamMenuContainerDom.children[i].children[1].style.backgroundColor = 'rgb(100,100,100)'
  } else if(!state) {
    teamMenuContainerDom.children[i].style.border = '5px solid rgb(75,75,75)'
    teamMenuContainerDom.children[i].style.cursor = 'auto'
    teamMenuContainerDom.children[i].children[1].style.backgroundColor = 'rgb(75,75,75)'
  }
}

function switchProcessEvent(first, second){
  if(second.pogemon == undefined) return

  disableOWMenu.active = true
  console.log('disableOWMenu')

  switchEvent = true

  let duration = 0.5

  gsap.to(`.teamMenuSection${first.i}`,{
    opacity: 0,
    duration
  })
  gsap.to(first.pogemon,{
    opacity: 0,
    duration
  })
  gsap.to(`.teamMenuSection${second.i}`,{
    opacity: 0,
    duration
  })
  gsap.to(second.pogemon,{
    opacity: 0,
    duration
  })

  let firstTeamPogemon = {...player.team[0]}
  let placeHolder

  placeHolder = player.team[first.i]
  player.team[first.i] = player.team[second.i]
  player.team[second.i] = placeHolder

  let pogemonTeamDomArr = document.querySelectorAll('.teamMenuSection')

  setTimeout(() =>{
    for (let i = 0; i < player.team.length; i++) {
      pogemonTeamDomArr[i].childNodes[1].childNodes[0].childNodes[0].textContent = switchUnderScoreForSpace(player.team[i].nickname)
      pogemonTeamDomArr[i].childNodes[1].childNodes[0].childNodes[1].src = `../../../img/${player.team[i].gender}_icon.png`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[0].childNodes[0].textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].width = `${first.pogemon.convertToPercentage(player.team[i].hp, player.team[i].stats.baseHp)}%`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[1].textContent = `Lv ${player.team[i].lvl}`

      if(player.team[i].heldItem == null) pogemonTeamDomArr[i].childNodes[0].childNodes[0].src = `img/item_scene/items/blank.png`
      else pogemonTeamDomArr[i].childNodes[0].childNodes[0].src = `img/item_scene/items/${player.team[i].heldItem.type}/${player.team[i].heldItem.name}.png`

      if(player.team[i].status.name == null) pogemonTeamDomArr[i].childNodes[1].childNodes[1].children[2].style.display = 'none'
      else {
        pogemonTeamDomArr[i].childNodes[1].childNodes[1].children[2].style.display = 'block'
        pogemonTeamDomArr[i].childNodes[1].childNodes[1].children[2].src = `img/status/${player.team[i].status.name}.png`
      }
    
      let xOffset
      let yOffset
    
      xOffset = 72.5
      yOffset = 30.15
    
      if(i % 2 != 0) xOffset = 1032
    
      if(i > 1 && i < 4) yOffset = 364.5
      if(i > 3) yOffset = 697.5
    
      if(window.innerHeight == 1080){
        xOffset = 72.5
        yOffset = 5
      
        if(i % 2 != 0) xOffset = 1032
      
        if(i > 1 && i < 4) yOffset = 364.5
        if(i > 3) yOffset = 725
      }
    
      player.team[i].position = {
        x: xOffset,
        y: yOffset
      }
    }
    
    document.querySelector(`.teamMenuSection${first.i}`).childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].style.width = `${player.team[first.i].convertToPercentage(player.team[first.i].hp, player.team[first.i].stats.baseHp)}%`
    document.querySelector(`.teamMenuSection${second.i}`).childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].style.width = `${player.team[second.i].convertToPercentage(player.team[second.i].hp, player.team[second.i].stats.baseHp)}%`

    gsap.to(`.teamMenuSection${first.i}`,{
      opacity: 1,
      duration
    })
    gsap.to(first.pogemon,{
      opacity: 1,
      duration
    })
    gsap.to(`.teamMenuSection${second.i}`,{
      opacity: 1,
      duration
    })

    console.log(second)
    gsap.to(second.pogemon,{
      opacity: 1,
      duration,
      onComplete: () => {
        if(player.team[0].id != first.pogemon.id) prevBattlerObj.battler = first.pogemon
        if(player.team[0].id != second.pogemon.id) prevBattlerObj.battler = second.pogemon
        
        pogemonSelected = false
        switchEvent = false
        teamEvent.switch = true
        disableOWMenu.active = false

        if(second.pogemon.abilityInfo.ability.name == 'regenerator'){
          const healAmount = Math.floor(second.pogemon.stats.baseHp * 0.33)
          second.pogemon.hp += healAmount
        } else if (second.pogemon.abilityInfo.ability.name == 'natural_Cure'){
          second.pogemon.status = {
            name: null,
            turns: 0
          }
        }

        second.choiceItem = {
          type: null,
          move: null
        }

        if(prevScene == 'battle') {
          if(player.team[0].fainted == true) return
          if(firstTeamPogemon.id == player.team[0].id) return
          gsap.to('#overlapping', {
            opacity: 1,
            onComplete: () =>{
              manageTeamState(false, prevScene)
              manageBattleState(true, 'team', faintedTriggered)
              faintedTriggered.active = false
              gsap.to('#overlapping', {opacity: 0})
            }
          })

        }
      }
    })
  }, 500)
}

function teamMenuSectionClickEvent(e, i){
  if(switchEvent == true) return
  if(player.team[i] == undefined) return

  pogemonSpriteArr.forEach(sprite =>{
    sprite.animate = false
    sprite.frames.val = 0
  })

  let teamSectionArr = document.querySelectorAll('.teamMenuSection')

  teamSectionArr.forEach(node =>{
    node.id = ''
    node.style.border = '5px solid rgb(75,75,75)'
    node.style.cursor = 'auto'
    node.children[1].style.backgroundColor = 'rgb(75,75,75)'
  })

  if(switchProcess.active) {
    if(switchProcess.target.first.pogemon.id === player.team[i].id){
      pogemonSelected = false
      switchProcess.active = false
      switchProcess.target = {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }
      return
    }

    switchProcess.target.second.i = i
    switchProcess.target.second.pogemon = player.team[i]
    switchProcessEvent(switchProcess.target.first, switchProcess.target.second)

    let placeHolder
    placeHolder = pogemonSpriteArr[switchProcess.target.first.i]
    pogemonSpriteArr[switchProcess.target.first.i] = pogemonSpriteArr[switchProcess.target.second.i]
    pogemonSpriteArr[switchProcess.target.second.i] = placeHolder

    switchProcess.active = false
    switchProcess.target = {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }
    return
  }

  pogemonSelected = true
  if(!pogemonSelected.fainted) if(pogemonSpriteArr[i] != undefined) pogemonSpriteArr[i].animate = true
  switchProcess.target.first.i = i
  switchProcess.target.first.pogemon = player.team[i]

  let teamInterfaceContainerDom = document.querySelector('#teamInterfaceContainer')
  teamInterfaceContainerDom.style.display = 'grid'
  
  document.querySelectorAll('.inferfaceOption').forEach(node =>{
    gsap.to(node, {
      fontSize: 24 + 'px',
      duration: 0.15
    })
  })

  gsap.to(teamInterfaceContainerDom, {
    height: 75 + '%',
    width: 35 + '%',
    duration: 0.15,
  })
  // teamInterfaceContainerDom.style.position

  e.target.id = 'selected'
  e.target.style.border = '5px solid rgb(100,100,100)'
  e.target.style.cursor = 'pointer'
  e.target.children[1].style.backgroundColor = 'rgb(100,100,100)'

  teamSectionArr.forEach(node =>{
    if(i >= player.team.length) return
    node.style.cursor = 'pointer'
  })
}

function teamInterfaceOptionClickEvent(e){
  switch(e.target.textContent){
    case 'stats':
      if(escapeEvent.active) return
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          let index

          player.team.forEach((pogemon,i) =>{
            if(pogemon.id == switchProcess.target.first.pogemon.id) index = i
          })

          manageStatsState(true, switchProcess.target.first.pogemon, teamPrevScene, index)
          manageTeamState(false)

          switchProcess = {active: false, target: {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }}
          gsap.to('#overlapping', {
            opacity: 0
          })
        }
      })
      break
    case 'switch':
      document.querySelectorAll('.inferfaceOption').forEach(node =>{
        gsap.to(node, {
          fontSize: 0 + 'px',
          duration: 0.15
        })
      })

      gsap.to(document.querySelector('#teamInterfaceContainer'), {
        height: 0 + '%',
        width: 0 + '%',
        duration: 0.15,
        onComplete: () => {
          document.querySelector('#teamInterfaceContainer').style.display ='none'
          if(switchProcess.target.first.pogemon.fainted){
            pogemonSpriteArr.forEach(sprite =>{
              sprite.frames.val = 0
              sprite.animate = false
            })
          
            let teamMenuSectionDom = document.querySelector(`.teamMenuSection${switchProcess.target.first.i}`)
            teamMenuSectionDom.style.border = '5px solid rgb(75,75,75)'
            teamMenuSectionDom.style.cursor = 'auto'
            teamMenuSectionDom.children[1].style.backgroundColor = 'rgb(75,75,75)'
            pogemonSelected = false
          
            switchProcess.active = false
            switchProcess.target = {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }
            return
          }
          switchProcess.active = true
        }
      })
      break
    case 'cancel':
      document.querySelectorAll('.inferfaceOption').forEach(node =>{
        gsap.to(node, {
          fontSize: 0 + 'px',
          duration: 0.15
        })
      })

      gsap.to(document.querySelector('#teamInterfaceContainer'), {
        height: 0 + '%',
        width: 0 + '%',
        duration: 0.15,
        onComplete: () => {
          document.querySelector('#teamInterfaceContainer').style.display ='none'
        }
      })
      break
  }
}

function teamMenuSectionCancelEvent(e){
  if(switchEvent) return
  if(e.target.classList[0] == 'teamMenuSection') {
    if(player.team[`${e.target.classList[1].slice(-1)}`] != undefined) return
  }
  if(e.target.classList[0] == 'inferfaceOption') return

  document.querySelectorAll('.inferfaceOption').forEach(node =>{
    gsap.to(node, {
      fontSize: 0 + 'px',
      duration: 0.15
    })
  })
  
  gsap.to(document.querySelector('#teamInterfaceContainer'), {
    height: 0 + '%',
    width: 0 + '%',
    duration: 0.15,
    onComplete: () => {
      document.querySelector('#teamInterfaceContainer').style.display ='none'
    }
  })

  pogemonSpriteArr.forEach(sprite =>{
    sprite.frames.val = 0
    sprite.animate = false
  })

  let teamMenuSectionDom = document.querySelector('.teamMenuSection')
  teamMenuSectionDom.style.border = '5px solid rgb(75,75,75)'
  teamMenuSectionDom.style.cursor = 'auto'
  teamMenuSectionDom.children[1].style.backgroundColor = 'rgb(75,75,75)'
  pogemonSelected = false

  switchProcess.active = false
  switchProcess.target = {first: {i: null, pogemon: null}, second: {i: null, pogemon: null} }
}

function printTeamInfo(i, teamMenuContainerDom){
  if(teamMenuContainerDom.children[i] == 'teamInterfaceContainer') return

  if(i >= player.team.length) {
    teamMenuContainerDom.children[i].children[1].style.display = 'none'
    return
  }

  definePogemonSprites(i)

  const section = teamMenuContainerDom.children[i].children[1]
  const infoSection = section.children[0]
  const healthbarSection = section.children[1]

  infoSection.children[0].textContent = switchUnderScoreForSpace(player.team[i].nickname)
  infoSection.children[1].src = `../../../img/${player.team[i].gender}_icon.png`

  healthbarSection.children[1].textContent = `Lv ${player.team[i].lvl}`
  healthbarSection.children[0].children[0].textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
  healthbarSection.children[0].children[1].children[0].children[0].style.width = `${player.team[i].convertToPercentage(player.team[i].hp,player.team[i].stats.baseHp)}%`
  changeHPColor(healthbarSection.children[0].children[1].children[0].children[0], player.team[i])

  if(player.team[i].status.name == null) healthbarSection.children[2].style.display = 'none'
  else {
    healthbarSection.children[2].style.display = 'block'
    healthbarSection.children[2].src = `img/status/${player.team[i].status.name}.png`
  }

}

function definePogemonSprites(i){
  let xOffset
  let yOffset

  xOffset = 72.5
  yOffset = 30.15

  if(i % 2 != 0) xOffset = 1032

  if(i > 1 && i < 4) yOffset = 364.5
  if(i > 3) yOffset = 697.5

  if(window.innerHeight == 1080){
    xOffset = 72.5
    yOffset = 5
  
    if(i % 2 != 0) xOffset = 1032
  
    if(i > 1 && i < 4) yOffset = 364.5
    if(i > 3) yOffset = 725
  }

  player.team[i].position = {
    x: xOffset,
    y: yOffset
  }

  player.team[i].width = 250

  pogemonSpriteArr.push(player.team[i])
  
  if(player.team[i].isShiny) player.team[i].img.src = player.team[i].pogemon.sprites.shiny.teamSprite
  else player.team[i].img.src = player.team[i].pogemon.sprites.classic.teamSprite

  player.team[i].opacity = 1
}

function printInitMenu(){
  const teamSceneContainerDom = document.createElement('div')
  teamSceneContainerDom.id = 'teamSceneContainer'

  const teamInterfaceContainerDom = document.createElement('div')
  teamInterfaceContainerDom.id = `teamInterfaceContainer`

  let interfaceOptions = ['stats', 'switch', 'cancel']
  interfaceOptions.forEach(option =>{
    const inferfaceOptionDom = document.createElement('div')
    inferfaceOptionDom.setAttribute('class', 'inferfaceOption')
    inferfaceOptionDom.innerText = option

    inferfaceOptionDom.addEventListener('click', e => teamInterfaceOptionClickEvent(e))
    teamInterfaceContainerDom.appendChild(inferfaceOptionDom)
  })

  const teamMenuGridContainer = document.createElement('div')
  teamMenuGridContainer.id = 'teamMenuGridContainer'

  teamSceneContainerDom.appendChild(teamInterfaceContainerDom)
  teamSceneContainerDom.appendChild(teamMenuGridContainer)
  teamSceneDom.appendChild(teamSceneContainerDom)

  teamSceneContainerDom.addEventListener('click', e => teamMenuSectionCancelEvent(e))
}

printInitMenu()

function createSceneLayout(){
  const teamMenuContainerDom = document.createElement('div')
  teamMenuContainerDom.id = 'teamMenuContainer'
  teamMenuContainerDom.style.display = 'grid'

  const teamMenuGridContainer = document.querySelector('#teamMenuGridContainer')
  teamMenuGridContainer.appendChild(teamMenuContainerDom)

  for(let i = 0; i < 6; i++){
    const spriteContainerDom = document.createElement('div')
    spriteContainerDom.classList.add('teamMenuSpriteContainer')

    const pogemonHeldItem = new Image()
    
    if(player.team[i] != undefined){
      if(player.team[i].heldItem == null) pogemonHeldItem.src = `img/item_scene/items/blank.png`
      else pogemonHeldItem.src = `img/item_scene/items/${player.team[i].heldItem.type}/${player.team[i].heldItem.name}.png`
    }

    pogemonHeldItem.setAttribute('class', 'pogemonTeamMenuItem')

    spriteContainerDom.appendChild(pogemonHeldItem)

    const infoText = document.createElement('span')
    infoText.classList.add('teamMenuInfoText')

    const genderImg = new Image()
    genderImg.classList.add('teamMenuGenderImg')

    const infoSectionDom = document.createElement('div')
    infoSectionDom.classList.add('teamMenuInfoSection')
    infoSectionDom.appendChild(infoText)
    infoSectionDom.appendChild(genderImg)
    
    const infoGreenBarDom = document.createElement('div')
    infoGreenBarDom.classList.add('teamMenuInfoGreenBar')

    const infoGreenBarContainerDom = document.createElement('div')
    infoGreenBarContainerDom.classList.add('teamMenuInfoGreenBarContainer')
    infoGreenBarContainerDom.appendChild(infoGreenBarDom)

    const infoGreyBarDom = document.createElement('div')
    infoGreyBarDom.classList.add('teamMenuInfoGreyBar')

    const infoHealthBarDom = document.createElement('div')
    infoHealthBarDom.classList.add('teamMenuInfoHealthBar')
    infoHealthBarDom.appendChild(infoGreenBarContainerDom)
    infoHealthBarDom.appendChild(infoGreyBarDom)

    const infoHPDom = document.createElement('div')
    infoHPDom.classList.add('teamMenuInfoHP')

    const infoHealthBarContainerDom = document.createElement('div')
    infoHealthBarContainerDom.classList.add('teamMenuInfoHealthBarContainer')
    infoHealthBarContainerDom.appendChild(infoHPDom)
    infoHealthBarContainerDom.appendChild(infoHealthBarDom)

    const infoLvlDom = document.createElement('div')
    infoLvlDom.classList.add('teamMenuInfoLvl')

    const infoStatusDom = document.createElement('img')
    infoStatusDom.classList.add('teamMenuInfoStatus')

    const infoHealthBarSectionDom = document.createElement('div')
    infoHealthBarSectionDom.classList.add('teamMenuHealthBarSection')
    infoHealthBarSectionDom.appendChild(infoHealthBarContainerDom)
    infoHealthBarSectionDom.appendChild(infoLvlDom)
    infoHealthBarSectionDom.appendChild(infoStatusDom)

    const infoContainerDom = document.createElement('div')
    infoContainerDom.classList.add('teamMenuInfoContainer')
    infoContainerDom.appendChild(infoSectionDom)
    infoContainerDom.appendChild(infoHealthBarSectionDom)
    
    const teamSectionDom = document.createElement('div')
    teamSectionDom.classList.add(`teamMenuSection`, `teamMenuSection${i}`)
    teamSectionDom.appendChild(spriteContainerDom)
    teamSectionDom.appendChild(infoContainerDom)

    const teamMenuContainerDom = document.querySelector('#teamMenuContainer')

    teamSectionDom.addEventListener('mouseover', () => teamMenuSectionHoverEvent(i, teamMenuContainerDom, true))
    teamSectionDom.addEventListener('mouseout', () => teamMenuSectionHoverEvent(i, teamMenuContainerDom, false))
    teamSectionDom.addEventListener('click', e => teamMenuSectionClickEvent(e, i))

    teamMenuContainerDom.appendChild(teamSectionDom)

    printTeamInfo(i, teamMenuContainerDom)
  }

  pogemonSpriteArr.forEach(sprite =>{
    sprite.animate = false
  })
}

export const faintSwitch = {
  active: false
}

function cleanTeamScene(){
  scenes.set('team', {initiated: false})
  document.querySelector('#teamScene').style.display = 'none'
  gsap.to(document.querySelector('#teamInterfaceContainer'), {
    height: 0 + '%',
    width: 0 + '%',
    duration: 0.15,
    onComplete: () => {
      document.querySelector('#teamInterfaceContainer').style.display ='none'
      document.querySelector('#teamMenuGridContainer').replaceChildren()
    }
  })

  pogemonSpriteArr = []

  window.cancelAnimationFrame(teamAnimationId)

  faintSwitch.active = true
}

function teamAnimation() {
  teamAnimationId = window.requestAnimationFrame(teamAnimation)
  // console.log(`team : ${teamAnimationId}`)

  backgroundSprite.draw()

  player.team.forEach((sprite,i) =>{
    sprite.draw()
  })
}

export function manageTeamState(state, prevScene){
  teamEvent.previousScene = prevScene
  if(state) initTeamScene(prevScene)
  else cleanTeamScene()
}