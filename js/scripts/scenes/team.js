import { pogemonsObj } from "../../data/pogemonData.js"

import { Sprite } from "../../classes.js"

import { scenes } from "../canvas.js"
import { player } from "../player.js"
import { returnPrevScene } from "./overworld.js"

let teamAnimationId

function initTeamScene(prevScene){
  returnPrevScene(prevScene)

  scenes.set('team', {initiated: true})

  document.querySelector('#teamScene').style.display = 'grid'
  document.querySelector('#overworldScene').style.display = 'none'

  document.querySelector('#overlapping').style.opacity = "0"
  
  createSceneLayout()

  teamAnimation()
}

const teamSceneDom = document.querySelector('#teamScene')

const backgroundImg = new Image()
backgroundImg.src = `../../../img/background.png`

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

function teamMenuSectionEvent(i, teamSceneDom, state){
  if(i >= player.team.length) return

  if(state){
    teamSceneDom.children[i].style.border = '5px solid rgb(100,100,100)'
    teamSceneDom.children[i].style.cursor = 'pointer'
    teamSceneDom.children[i].children[1].style.backgroundColor = 'rgb(100,100,100)'
  } else if(!state) {
    teamSceneDom.children[i].style.border = '5px solid rgb(75,75,75)'
    teamSceneDom.children[i].style.cursor = 'auto'
    teamSceneDom.children[i].children[1].style.backgroundColor = 'rgb(75,75,75)'
  }
}

function printTeamInfo(i, teamSceneDom){
  if(i >= player.team.length) {
    teamSceneDom.children[i].children[1].style.display = 'none'
    return
  }

  let xOffset = 72.5
  let yOffset = 30.5

  if(i % 2 != 0) xOffset = 1032

  if(i > 1 && i < 4) yOffset = 364.5
  if(i > 3) yOffset = 697.5

  player.team[i].position = {
    x: xOffset,
    y: yOffset
  }

  player.team[i].img.src = player.team[i].pogemon.sprites.teamSprite

  pogemonSpriteArr.push(player.team[i])

  const section = teamSceneDom.children[i].children[1]
  const infoSection = section.children[0]
  const healthbarSection = section.children[1]

  infoSection.children[0].textContent = player.team[i].name
  infoSection.children[1].src = `../../../img/${player.team[i].gender}_icon.png`

  healthbarSection.children[1].textContent = `Lv ${player.team[i].lvl}`
  healthbarSection.children[0].children[0].textContent = `${player.team[i].hp}/${player.team[i].stats.baseHp}`
  healthbarSection.children[0].children[1].children[0].children[0].style.width = `${player.team[i].convertToPercentage(player.team[i].hp,player.team[i].stats.baseHp)}%`
}

function createSceneLayout(){
  for(let i = 0; i < 6; i++){
    const spriteContainerDom = document.createElement('div')
    spriteContainerDom.classList.add('teamMenuSpriteContainer')

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
    teamSectionDom.classList.add('teamMenuSection')
    teamSectionDom.appendChild(spriteContainerDom)
    teamSectionDom.appendChild(infoContainerDom)

    teamSectionDom.addEventListener('mouseover', () => teamMenuSectionEvent(i, teamSceneDom, true))
    teamSectionDom.addEventListener('mouseout', () => teamMenuSectionEvent(i, teamSceneDom, false))

    teamSceneDom.appendChild(teamSectionDom)

    printTeamInfo(i, teamSceneDom)
    teamMenuSectionEvent(i, teamSceneDom)
  }
}

function cleanTeamScene(){
  scenes.set('team', {initiated: false})

  teamSceneDom.replaceChildren()
  teamSceneDom.style.display = 'none'

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
  if(state) initTeamScene(prevScene)
  else cleanTeamScene()
}