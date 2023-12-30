import { pogemonsObj } from "../../data/pogemonData.js"

import { Sprite } from "../../classes.js"

import { scenes } from "../canvas.js"
import { player } from "../player.js"
import { disableOWMenu, escapeEvent, prevScene, returnPrevScene } from "./overworld.js"
import { manageBattleState, faintedTriggered } from "./battle.js"
import { manageStatsState } from "./stats.js"
import { mapsObj } from "../../data/mapsData.js"

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

const backgroundImg = new Image()
backgroundImg.src = mapsObj['background']

const backgroundSprite = new Sprite({
  type: 'teamSprite',
  position:{
    x: 0,
    y: 0
  },
  frames: {
    max: 1
  },
  img: backgroundImg,
  animate: true
})

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

  let placeHolder

  placeHolder = player.team[first.i]
  player.team[first.i] = player.team[second.i]
  player.team[second.i] = placeHolder

  let pogemonTeamDomArr = document.querySelectorAll('.teamMenuSection')

  setTimeout(() =>{
    for (let i = 0; i < player.team.length; i++) {
      pogemonTeamDomArr[i].childNodes[1].childNodes[0].childNodes[0].textContent = player.team[i].name
      pogemonTeamDomArr[i].childNodes[1].childNodes[0].childNodes[1].src = `../../../img/${player.team[i].gender}_icon.png`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[0].childNodes[0].textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].width = `${first.pogemon.convertToPercentage(player.team[i].hp, player.team[i].stats.baseHp)}%`
      pogemonTeamDomArr[i].childNodes[1].childNodes[1].childNodes[1].textContent = `Lv ${player.team[i].lvl}`
      
      let xOffset = 72.5
      let yOffset = 30.15
    
      if(i % 2 != 0) xOffset = 1032
    
      if(i > 1 && i < 4) yOffset = 364.5
      if(i > 3) yOffset = 697.5
    
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
    gsap.to(second.pogemon,{
      opacity: 1,
      duration,
      onComplete: () => {
        pogemonSelected = false
        switchEvent = false
        teamEvent.switch = true
        disableOWMenu.active = false

        if(prevScene == 'battle') {
          if(player.team[0].fainted == true) return
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
  if(!pogemonSelected.fainted) pogemonSpriteArr[i].animate = true
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

function teamnInterfaceOptionClickEvent(e){
  switch(e.target.textContent){
    case 'stats':
      if(escapeEvent.active) return
      gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
          manageStatsState(true, switchProcess.target.first.pogemon, teamPrevScene)
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

  let xOffset = 72.5
  let yOffset = 30.15

  if(i % 2 != 0) xOffset = 1032

  if(i > 1 && i < 4) yOffset = 364.5
  if(i > 3) yOffset = 697.5

  player.team[i].position = {
    x: xOffset,
    y: yOffset
  }

  player.team[i].img.src = player.team[i].pogemon.sprites.teamSprite
  player.team[i].opacity = 1

  pogemonSpriteArr.push(player.team[i])

  const section = teamMenuContainerDom.children[i].children[1]
  const infoSection = section.children[0]
  const healthbarSection = section.children[1]

  infoSection.children[0].textContent = player.team[i].name
  infoSection.children[1].src = `../../../img/${player.team[i].gender}_icon.png`

  healthbarSection.children[1].textContent = `Lv ${player.team[i].lvl}`
  healthbarSection.children[0].children[0].textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
  healthbarSection.children[0].children[1].children[0].children[0].style.width = `${player.team[i].convertToPercentage(player.team[i].hp,player.team[i].stats.baseHp)}%`
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

    inferfaceOptionDom.addEventListener('click', e => teamnInterfaceOptionClickEvent(e))
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

    const pogemonHelpItem = new Image()
    
    if(player.team[i] != undefined){
      if(player.team[i].heldItem == null) pogemonHelpItem.src = `img/item_scene/items/blank.png`
      else pogemonHelpItem.src = `img/item_scene/items/${player.team[i].heldItem.type}/${player.team[i].heldItem.name}.png`
    }

    pogemonHelpItem.setAttribute('class', 'pogemonTeamMenuItem')

    spriteContainerDom.appendChild(pogemonHelpItem)

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

    const infoHealthBarSectionDom = document.createElement('div')
    infoHealthBarSectionDom.classList.add('teamMenuHealthBarSection')
    infoHealthBarSectionDom.appendChild(infoHealthBarContainerDom)
    infoHealthBarSectionDom.appendChild(infoLvlDom)

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
}

function teamAnimation() {
  teamAnimationId = window.requestAnimationFrame(teamAnimation)

  backgroundSprite.draw()

  pogemonSpriteArr.forEach(sprite =>{
    sprite.draw()
  })
}

export function manageTeamState(state, prevScene){
  teamEvent.previousScene = prevScene
  if(state) initTeamScene(prevScene)
  else cleanTeamScene()
}