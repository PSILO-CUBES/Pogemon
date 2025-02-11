import { movesObj } from "../../data/movesData.js"
import { mapsObj } from "../../data/mapsData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { audioObj } from "../../data/audioData.js"
import { itemsObj } from "../../data/itemsData.js"

import { Sprite, Pogemon, statsChangeObj } from "../../classes.js"

import { eventZones, manageOverWorldState, playerTeamItemsState, prevScene, waitForNextBattle } from "./overworld.js"
import { currMap, worldEventData } from "../maps.js"
import { _preventActionSpam } from "../../app.js"
import { player } from "../player.js"
import { c, scenes } from "../canvas.js"
import { teamEvent, manageTeamState, faintSwitch } from "./team.js"
import { itemUsed, manageBagState } from "./bag.js"
import { manageEvolutionState, queueProcess as evoQueueProcess } from "./evolution.js"
import { pc } from "./pc.js"
import { typesObj } from "../../data/typesData.js"
import { switchUnderScoreForSpace } from "./stats.js"
import { weatherObj } from "../../data/weatherData.js"
import { loadData } from "../../save.js"
import { data } from "./boot.js"

// after the first battle, queues start being skipped after the pogemon death ?? naniiii
export let queue = []
let queueProcess = {
  disabled: false
}

const battleBackgroundImage = new Image()
battleBackgroundImage.src = '../../img/battleBackgrounds/void.png'
const battleBackground = new Sprite({
  type: 'battleBackground',
  frames: {
    max: 1,
    hold: 0
  },
  position: {
    x:0,
    y:0
  },
  img: battleBackgroundImage
})

export let foe
let ally

let renderedSprites

let battlerArr = []

function loadAlly(){
  ally = player.team[0]

  if(ally.isShiny) ally.img.src = pogemonsObj[`${ally.name}`].sprites.shiny.backSprite
  else ally.img.src = pogemonsObj[`${ally.name}`].sprites.classic.backSprite
  
  ally.width = 646

  if(allyId == undefined) allyId = ally.id

  if(ally.isShiny) ally.img.src = pogemonsObj[`${ally.name}`].sprites.shiny.backSprite
  else ally.img.src = pogemonsObj[`${ally.name}`].sprites.classic.backSprite

  ally.animate = true
  ally.hold = 50

  ally.position = {
    x: 300,
    y: 50
  }

  document.querySelector("#allyGenderImg").src = `../../../img/${ally.gender}_icon.png`
}

function foeRNGEncounter(tileInfo, info){
  if(tileInfo != undefined){
    const rng = Math.floor(Math.random() * 100)
    
    const encounters = mapsObj[`${currMap.name}`].encounters[tileInfo]
  
    for (let i = 0; i < encounters.length; i++) if(rng >= encounters[i].odds.min && rng < encounters[i].odds.max) return encounters[i]
  } else {
    return {pogemon: info.team[0][0], lvls: info.team[0][1]}
  }

}

let battleType

function resetStats(type) {
  if(type == 'ally'){
    statsChangeObj.ally = {
      nominator: {
        atk: 2,
        def: 2,
        spatk: 2,
        spdef: 2,
        spd: 2,
      },
      denominator: {
        atk: 2,
        def: 2,
        spatk: 2,
        spdef: 2,
        spd: 2,
      },
    }

    if(ally.status.name == 'psn') ally.status.turns = 0
    return
  } 

  if(type == 'foe'){
    statsChangeObj.foe = {
      nominator: {
        hp: 2,
        atk: 2,
        def: 2,
        spatk: 2,
        spdef: 2,
        spd: 2,
      },
      denominator: {
        hp: 2,
        atk: 2,
        def: 2,
        spatk: 2,
        spdef: 2,
        spd: 2,
      },
    }

    return
  }

  statsChangeObj.ally = {
    nominator: {
      atk: 2,
      def: 2,
      spatk: 2,
      spdef: 2,
      spd: 2,
    },
    denominator: {
      atk: 2,
      def: 2,
      spatk: 2,
      spdef: 2,
      spd: 2,
    },
  }

  statsChangeObj.foe = {
    nominator: {
      atk: 2,
      def: 2,
      spatk: 2,
      spdef: 2,
      spd: 2,
    },
    denominator: {
      atk: 2,
      def: 2,
      spatk: 2,
      spdef: 2,
      spd: 2,
    },
  }

  if(ally.status.name == 'psn') ally.status.turns = 0
}

function generateSparkles(target, i){
  let xVel
  let yVel

  switch(i % 3){
    case 0:
      yVel = -0.2
      xVel = 0.6
      break
    case 1:
      yVel = -0.45
      xVel = 0.45
      break
    case 2:
      yVel = -0.6
      xVel = 0.2
      break
  }

  if(i > 2){
    xVel += 1
    xVel *= -1
    xVel += 1
  }

  const verticalParticle = {
    pos: {
      x: target.position.x + (target.width / 2) - 5,
      y: target.position.y + target.height * 2.5
    },
    vel: {
      x: xVel,
      y: yVel
    },
    size: {
      height: 5,
      width: 15
    },
    opacity: 1
  }

  const horizontalParticle = {
    pos: {
      x: target.position.x + (target.width / 2),
      y: target.position.y + target.height * 2.5 - 5
    },
    vel: {
      x: xVel,
      y: yVel
    },
    size: {
      height: 15,
      width: 5
    },
    opacity: 1
  }

  return [verticalParticle, horizontalParticle]
}

function shinySparklesAnimation(target){
  if(target.height == undefined || target.width == undefined) return

  let sparklesArr

  if(target.isEnemy) sparklesArr = 'foeSparklesArr'
  else sparklesArr = 'allySparklesArr'

  if(shinySparklesManagement[sparklesArr].length == 0){
    for(let i = 0; i < 6; i++){
      const sparkleArr = generateSparkles(target, i)

      shinySparklesManagement[sparklesArr].push(sparkleArr)
    }
  }

  for(let i = 0; i < shinySparklesManagement[sparklesArr].length; i++){
    const sparkleArr = shinySparklesManagement[sparklesArr][i]
    for(let j = 0; j < sparkleArr.length; j++){
      c.fillStyle = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${sparkleArr[j].opacity})`
      c.fillRect(sparkleArr[j].pos.x, sparkleArr[j].pos.y, sparkleArr[j].size.width, sparkleArr[j].size.height)

      sparkleArr[j].opacity -= 0.005
      sparkleArr[j].pos = {
        x: sparkleArr[j].pos.x += sparkleArr[j].vel.x,
        y: sparkleArr[j].pos.y += sparkleArr[j].vel.y
      }
    }
  }
}

const foeImage = new Image()
const foeSprite = new Sprite({
  type: 'pogemon',
  position:{
    x:1415,
    y:15
  },
  frames: {
    max: 4,
    hold: 60
  },
  img: foeImage,
  animate: true
})

function initWildEncounter(tileInfo, info){
  enemyTrainer = undefined

  battleType = 'wild'
  
  let returnedFoe = foeRNGEncounter(tileInfo, info)
  if(returnedFoe == undefined) return

  let foeObj = returnedFoe.pogemon

  console.log()

  console.log((returnedFoe.lvls[1] - returnedFoe.lvls[0]) + returnedFoe.lvls[0])


  const rngLvl = Math.floor(Math.random() * (returnedFoe.lvls[1] - returnedFoe.lvls[0] + 1) + returnedFoe.lvls[0])
  console.log(rngLvl)

  let encounterLevel = Math.pow(rngLvl, 3)

  if(currMap.name == 'sinai_Desert' || currMap.name == 'exodus_Road') {
    if(player.team[0].heldItem != undefined) if(player.team[0].heldItem.name == 'sand_Plankton'){
      const rng = Math.floor(Math.random() * 20)

      if(rng == 1) {
        player.team[0].heldItem = null
        foeObj = pogemonsObj.duney
        encounterLevel = Math.pow(30, 3)
      }
    }
  }

  let wildPogemonHeldItem = null
  if(returnedFoe.heldItem != null) {
    const rng = Math.floor(Math.random() * 100)

    if(rng <= returnedFoe.heldItem.odds) wildPogemonHeldItem = {...returnedFoe.heldItem.item}
  }

  let wildPogemonMoves = null
  if(returnedFoe.moves != undefined) wildPogemonMoves = returnedFoe.moves

  let wildPogemonGender = null
  if(returnedFoe.gender != undefined) wildPogemonGender = returnedFoe.gender

  let predeterminedNature = null
  if(player.team[0].abilityInfo.ability.name == 'synchronize') predeterminedNature = player.team[0].nature.name

  let shinyCharm = 0
  if(player.bag.get('illuminated_Gem') != null) shinyCharm = player.bag.get('illuminated_Gem').quantity

  foe = new Pogemon(foeObj, encounterLevel, true, currMap.name, wildPogemonHeldItem, null, null, null, wildPogemonMoves, wildPogemonGender, predeterminedNature, shinyCharm, null, foeSprite)

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

export let enemyTrainer

function initTrainerEncounter(info){
  battleType = 'trainer'

  enemyTrainer = info.createdTrainer

  foe = enemyTrainer.team[0]

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

function critLanded(pogemon, recipient, move){
  let critHit = false
  let odds = 100
  if(move.effects != null) if(Object.entries(move.effects[0])[0][0] == 'crit') odds = 100 - (25 * Object.entries(move.effects[0])[0][1])

  const critRNG = Math.floor(Math.random() * odds)
  const critThreshold = 0

  if(critRNG <= critThreshold){
    critHit = true
    if(recipient.subHp > 0 || recipient.protected.active == true) return
    // queueProcess.disabled = true
    setTimeout(() =>{
      pogemon.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(pogemon.nickname)} landed a critical hit!!!`)
      queueProcess.disabled = true
      console.log('there')
      setTimeout(() =>{
        queueProcess.disabled = false
        console.log('here')
      }, 750)
    }, 1000)
  }

  return critHit
}

function changeHPColor(DOM, target){
  let percentHP = target.convertToPercentage(target.hp, target.stats.baseHp)
  DOM.style.width = `${percentHP}%`
  if(percentHP > 51){
    DOM.style.backgroundColor = 'green'
    foe.frames.hold = 60
  } else if (percentHP < 51 && percentHP > 26){
    DOM.style.backgroundColor = 'yellow'
    foe.frames.hold = 90
  } else if (percentHP < 26){
    DOM.style.backgroundColor = 'red'
    foe.frames.hold = 120
  }
}

function chooseStatusImg(target, status, statusDom){
  if(target.status.name == null) statusDom.style.display = 'none'
  else statusDom.style.display = 'flex'

  statusDom.src = `img/status/${status}.png`
}

let allyId
let enemyTrainerInfo
export const startWeatherFlag = {active: false}

function startWeather(type, info, timing, user){
  let turns = 5

  console.log(user)

  if(timing = 'init')
    if(user != undefined && user != null)
      if(user.heldItem != null)
        if(user.heldItem.effect == 'weather' && user.heldItem.weatherType == type)
          turns = 8

  startWeatherFlag.active = true
  startWeatherFlag.turns = turns

  console.log(type)

  if(prevScene != 'overworld') return
  
  document.querySelector('#encounterInterface').style.display = 'none'

  const fieldContainer = document.querySelector('#fieldEffectContainer')
  fieldContainer.style.display = 'flex'
  info.turns = turns

  const weatherTurnIndicator = document.querySelector('#fieldEffectTurnIndicator')
  weatherTurnIndicator.textContent = info.turns

  const weatherIcon = document.querySelector('#fieldEffectIcon')
  weatherIcon.src = `img/field/${type}.png`

  queueProcess.disabled = true
  console.log('there')

  let prevWeather = {
    active: false,
    type: null
  }

  Object.values(terrainConditions.turns.weather).forEach(weather =>{
    if(weather.active) {
      prevWeather.active = true
      switch(weather.element){
        case 'fire':
          prevWeather.type = 'sun'
          break
        case 'water':
          prevWeather.type = 'rain'
          break
        case 'ice':
          prevWeather.type = 'snow'
          break
        case 'rock':
          prevWeather.type = 'sand'
          break
      }
    }

    weather.active = false
  })

  info.active = true

  if(!prevWeather.active) ally.dialogue('battle', `The ${type.replace(/_/g, ' ')} now affects the battlefield.`)
  else setTimeout(() =>{
    ally.dialogue('battle', `The ${prevWeather.type} was canceled.\n\nThe ${type.replace(/_/g, ' ')} now affects the battlefield.`)
  }, 1250)

  setTimeout(() =>{
    gsap.to(fieldContainer, {
      right: 0,
      duration: 1
    })

    const tl = gsap.timeline()
    const fieldEffect = document.querySelector('#fieldEffect')
    tl.to(fieldEffect, {
      backgroundColor: `#${info.color}40`,
      duration: 1
    }).to(fieldEffect, {
      backgroundColor: `#${info.color}00`,
      duration: 1, 
      onComplete: () =>{
        queueProcess.disabled = false
        console.log('here')
      }
    })
  }, 225)
}

function clearWeather(activeTerrain){
  queue.push(() =>{
    ally.dialogue('battle', `The ${switchUnderScoreForSpace(activeTerrain.type)} is fading.`)
    queueProcess.disabled = true
    console.log('there')

    activeTerrain.info.turns--
    activeTerrain.info.active = false

    let fieldDom

    let target = true
    if(activeTerrain.type == 'ally_reflect' || activeTerrain.type == 'ally_light_screen') target = false

    let type = 'reflect'
    if(activeTerrain.type == 'ally_light_screen' || activeTerrain.type == 'foe_light_screen') type = 'light_screen'

    if(activeTerrain.type == 'ally_reflect' || activeTerrain.type == 'ally_light_screen' ||
      activeTerrain.type == 'foe_reflect' || activeTerrain.type == 'foe_light_screen') {
      screenDisplayManagement(false, target, type, 0)
      return
    }

    if(activeTerrain.type == 'trick_room') {
      fieldDom = document.querySelector('#trickRoomIndicatorContainer')
      document.querySelector('#trickRoomTurnIndicator').textContent = activeTerrain.info.turns
    } else {
      fieldDom = document.querySelector('#fieldEffectContainer')
      document.querySelector('#fieldEffectTurnIndicator').textContent = activeTerrain.info.turns
    }

    gsap.to(fieldDom, {
      right: '-124px',
      duration: 1,
      onComplete: () =>{
        queueProcess.disabled = false
        console.log('here')
      }
    })
  })
}

function manageTrickRoomState(info){
  if(prevScene != 'overworld') return

  document.querySelector('#encounterInterface').style.display = 'none'

  const trickRoomIndicatorContainer = document.querySelector('#trickRoomIndicatorContainer')
  trickRoomIndicatorContainer.style.display = 'flex'
  trickRoomIndicatorContainer.style.right = -120

  setTimeout(() =>{
    trickRoomIndicatorContainer.style.right = 0
  }, 50)

  info.turns = 5
  
  const trickRoomTurnIndicator = document.querySelector('#trickRoomTurnIndicator')
  // console.log(info)
  trickRoomTurnIndicator.textContent = info.turns
  
  queueProcess.disabled = true
  console.log('there')
  
  // info.active = true
  
  // console.log(document.querySelector('#dialogueInterface').innerText)
  ally.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThe trick room now affects the battlefield.`)
}

function manageWeatherState(type, info, timing, user, activeTerrain){
  if(type == 'trick_room'){
    if(timing == 'init') manageTrickRoomState(info)
    else clearWeather(activeTerrain)
    return
  }

  console.log(activeTerrain)

  if(timing == 'init' || timing == 'startOfBattle'){
    startWeather(type, info, timing, user)
  }

  if(timing == 'endOfTurn'){
    clearWeather(activeTerrain)
  }
}

const shinySparklesManagement = {
  state: false,
  timeOutFlag: false,
  allySparklesArr: [],
  foeSparklesArr: []
}

export const catchEventObj = {active: false, caughtPogemon: null}

export function initRenameEvent(pogemon){
  document.querySelector('#confirmPogemonInfoDisplayContainer').style.display  = 'none'
  document.querySelector('#confirmPogemonNameButtonsContainerBackground').style.display = 'none'

  catchEventObj.active = true
  catchEventObj.caughtPogemon = pogemon
  player.disabled = true

  const caughtPogemonImgDom = document.querySelector('#pogemonNamingSceneDisplayImg')

  if(pogemon.isShiny) caughtPogemonImgDom.src = pogemon.pogemon.sprites.shiny.sprite
  else caughtPogemonImgDom.src = pogemon.pogemon.sprites.classic.sprite
      
  document.querySelector('#pogemonNamingScene').style.display = 'block'
  document.querySelector('#pogemonNamingSceneContainer').style.display = 'grid'

  document.querySelector('#pogemonNamingSceneDisplayContainer').style.display = 'grid'
  document.querySelector('#pogemonNamingSceneInputContainer').style.display = 'block'

  document.querySelector('#pogemonNamingSceneInputChoiceContainer').style.display = 'grid'
  document.querySelector('#pogemonNamingSceneDisplayTextContainer').innerText = `Do you want to give a nickname to this ${pogemon.name}?`
}

function onEnterTerrainAffliction(type, target, recipient){
  const item = target.heldItem
  let itemName = 'nothing'
  if(item != null) itemName = item.name

  if(itemName != 'heavy_Duty_Boots'){
    if(terrainConditions.static.stealth_rock.active[type]){
      queue.unshift(() =>{
        // do damage based on type
  
        queueProcess.disabled = true
        console.log('there')
  
        let ratio = 8
  
        if(typesObj['rock'].veryEffective.includes(target.element[1])) ratio = ratio / 2
        else if(typesObj['rock'].notEffective.includes(target.element[1])) ratio = ratio * 2
  
        if(typesObj['rock'].veryEffective.includes(target.element[2])) ratio = ratio / 2
        else if(typesObj['rock'].notEffective.includes(target.element[2])) ratio = ratio * 2
  
        const chipPercent = 1 / ratio
        const chip = Math.floor(target.stats.baseHp * chipPercent)
  
        target.hp -= chip
  
        if(target.isEnemy) target.dialogue('battle', `${target.name} took damage from the hidden rocks.`)
        else target.dialogue('battle', `${target.nickname} took damage from the hidden rocks.`)
  
        target.hpManagement()
  
        setTimeout(() =>{
          queueProcess.disabled = false
          console.log('here')
        }, 1250)
      })
    }
  
    if(terrainConditions.static.sticky_web.active[type]){
      queue.unshift(() =>{
        recipient.statusAnimation('status', [{name: 'debuff', target:'spd', pow: 1, type: 'stats'}], movesObj['sticky_web'], target, renderedSprites, statsChangeObj, terrainConditions, queueProcess)}
      )
    }
  }


  if(target.abilityInfo.ability.name == 'intimidate' && recipient.abilityInfo.ability.name != 'scrappy'){
    queue.unshift(() =>{
      target.statusAnimation('status', target.abilityInfo.ability.effects, {name: 'intimidate'}, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)}
    )
  }
}

export function initBattle(faintedTriggered, info, tileInfo){
  queueFaintTrigger.initiated = false

  scenes.set('battle', {initiated : true})
  document.querySelector('#overworldScene').style.display = 'none'
  player.team[0].animate = true

  loadAlly(player.team[0])

  console.log(prevScene)

  if(prevScene == 'overworld') {
    battlerArr = []
    evoArr = []
    lvlUpArr = []



    Object.values(terrainConditions).forEach(category =>{
      Object.entries(category).forEach(type =>{
        if(type[0] == 'etc' || type[0] == 'weather') Object.values(type[1]).forEach(terrainType =>{
          if(typeof terrainType.active == 'boolean') terrainType.active = false
          else {
            terrainType.active.ally = false
            terrainType.active.foe = false
          }

          if(typeof terrainType.active == 'boolean') terrainType.turns = 0
          else {
            terrainType.turns.ally = 0
            terrainType.turns.foe = 0
          }
        })
        // type.active = false
        //set turns for terrain effects
        // type.turns = 5
      })
    })

    document.querySelector('#fieldEffectContainer').style.right = '-124px'

    enemyTrainerInfo = info

    console.log(enemyTrainerInfo)

    if(enemyTrainerInfo != null && enemyTrainerInfo.trainer == undefined){
      document.querySelector('#foeTeamShowcase').style.display = 'flex'

      document.querySelectorAll('.foeTeamShowcaseIndividual').forEach(node =>{
        node.childNodes[1].src = 'img/transparent_pogeball.png'
      })
  
      enemyTrainerInfo.createdTrainer.team.forEach((pogemon, i) =>{
        document.querySelectorAll('.foeTeamShowcaseIndividual')[i].childNodes[1].src = 'img/item_scene/items/ball/pogeball.png'
        document.querySelectorAll('.foeTeamShowcaseIndividual')[i].childNodes[1].style.filter = 'brightness(100%)'
      })

      document.querySelector('#foeTeamShowcase').style.opacity = 0
    } else document.querySelector('#foeTeamShowcase').style.display = 'none'

    resetStats('both')
    console.log(tileInfo)
    console.log(info)

    // console.log(info.trainer)

    if(info == undefined) initWildEncounter(tileInfo, info)
    else {
      if(info.trainer == false) initWildEncounter(tileInfo, info)
      else initTrainerEncounter(info)
    }

    player.team.forEach(pogemon =>{
      pogemon.knockedOff = false
    })

    if(enemyTrainerInfo != null && enemyTrainerInfo.trainer == undefined) 
      enemyTrainerInfo.createdTrainer.team.forEach(pogemon =>{
        pogemon.knockedOff = false
      })

    let ally = player.team[0]

    document.querySelector('#AllyScreenContainer').style.opacity = 0
    document.querySelector('#foeScreenContainer').style.opacity = 0

    ally.opacity = 0
    foe.opacity = 0

    foe.position = {
      x: 1415,
      y: 50
    }

    let allyNeutralPosition = {...ally.position}
    let foeNeutralPosition = {...foe.position}

    // 
    // foe.position.x = 800

    console.log(foe)

    setTimeout(() =>{
      setTimeout(() =>{
        if(enemyTrainerInfo != null) document.querySelector('#foeTeamShowcase').style.opacity = 1
      }, 1000)

      document.querySelector('#allyHealthBarContainer').style.right = 0
      document.querySelector('#foeHealthBarContainer').style.left = 0
    }, 750)

    // intimidate here
    pushInitBattleIntimidate(ally, foe)
    pushInitBattleIntimidate(foe, ally)
  
    if(foe.isShiny) {
      foe.img.src = foe.pogemon.sprites.shiny.frontSprite
    } else foe.img.src = foe.pogemon.sprites.classic.frontSprite
  }
  // foe.frames.hold = 60

  renderedSprites = [foe, ally]

  gsap.to(ally, {
    opacity: 1,
    duration: 1,
    onComplete: () =>{
      if(ally.isShiny) shinySparklesManagement.state = true
    }
  })

  gsap.to(foe, {
    opacity: 1,
    duration: 1,
    onComplete: () =>{
      if(foe.isShiny) shinySparklesManagement.state = true
    }
  })

  setBattleScene()

  changeHPColor(document.querySelector('#foeHealthBar'), foe)
  changeHPColor(document.querySelector('#allyHealthBar'), ally)

  chooseStatusImg(foe, foe.status.name, document.querySelector('#foeStatus'))
  chooseStatusImg(ally, ally.status.name, document.querySelector('#allyStatus'))

  battleAnimation()

  player.pogedexInfo.forEach(dexPogemon =>{
    if(dexPogemon.name == foe.pogemon.name) dexPogemon.seen = true 
  })

  let allyExp = Math.floor(ally.convertToPercentage(ally.exp - Math.pow(ally.lvl, 3), Math.pow(ally.lvl + 1, 3) - Math.pow(ally.lvl, 3)))
  if(ally.exp === 0) allyExp = 0

  document.querySelector('#expBar').style.width = `${allyExp}%`

  function checkIfSameId(){
    let flag = true

    for(let i = 0; i < battlerArr.length; i++){
      if(battlerArr[i].id == ally.id) {
        flag = false
      }
    }

    return flag
  }

  // ally.affliction[0].active = true
  // ally.affliction[0].turns = 99
  
  // foe.affliction[0].active = true
  // foe.affliction[0].turns = 99
  // foe.hp = 1

  // foe.status.name = 'slp'

  // terrainConditions.turns.etc.trick_room.active = true
  // terrainConditions.turns.etc.trick_room.turns = 5

  if(battlerArr.length != 0){
    if(checkIfSameId()) battlerArr.push(ally)
  } else {
    battlerArr.push(ally)
  }

  if(!itemUsed.used){
    if(prevScene == 'overworld') {
      if(info == null) player.dialogue('battle', `a wild ${switchUnderScoreForSpace(foe.nickname)} appeared!`)
      else if(info.name == foe.name) player.dialogue('battle', `${switchUnderScoreForSpace(foe.nickname)} attacks!`)
      else player.dialogue('battle', `${info.name} sent out ${switchUnderScoreForSpace(foe.nickname)}!`)

      if(foe.abilityInfo.ability.name == 'frisk'){
        let itemName
        if(ally.heldItem == null) itemName = 'nothing'
        if(ally.heldItem != null) itemName = `a ${switchUnderScoreForSpace(ally.heldItem.name)}`

        setTimeout(() => foe.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(foe.nickname)} frisked ${itemName}.`),250)
      }
      setTimeout(() => player.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nyou send out ${switchUnderScoreForSpace(ally.nickname)}.`), 500)
      if(ally.abilityInfo.ability.name == 'frisk'){

        let itemName
        if(foe.heldItem == null) itemName = 'nothing'
        if(foe.heldItem != null) itemName = `a ${switchUnderScoreForSpace(foe.heldItem.name)}`

        setTimeout(() => foe.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(ally.nickname)} frisked ${itemName}.`), 750)
      }
    } else {
      document.querySelector('#encounterInterface').style.display = 'grid'
      console.log('grided')
    }
  }

  const textBox = document.querySelector('#textBox')
  textBox.innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`

  if(itemUsed.used){
    document.querySelector('#encounterInterface').style.display = 'none'
    document.querySelector('#movesInterface').style.display = 'none'
    document.querySelector('#dialogueInterface').style.display = 'block'
    document.querySelector('#proceedImgContainer').style.display = 'block'
    
    if(itemUsed.item.type == 'ball'){
      if(enemyTrainer == undefined){
        queueProcess.disabled = true
        console.log('there')

        function backToOverWorld(pogemon){
          //might throw error
          queue.push(() => {
            manageBattleState(false)
            //name pogemon scene here!!
            initRenameEvent(pogemon)
          })
        }

        let rng = Math.floor(Math.random() * 2)

        let faster = ally
        let slower = foe

        let allySpeed
        if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
        else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)
      
        let foeSpeed
        if(foe.status.name == 'para') foeSpeed = Math.floor((foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd) / 2)
        else foeSpeed = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)

        if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {

          // ally.choiceItem.type = 'scarf'
          // ally.choiceItem.move = move
      
          allySpeed = allySpeed * 1.5
        }
      
        if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
      
          // foe.choiceItem.type = 'scarf'
          // foe.choiceItem.move = move
      
          foeSpeed = foeSpeed * 1.5
        }

        if(allySpeed == foeSpeed){
          if(rng == 1) {
            faster = foe
            slower = ally
          }
        } else if(allySpeed < foeSpeed){
          faster = foe
          slower = ally
        }

        player.catch(foe, false, currMap, player, ally, renderedSprites, itemUsed.item, manageBattleQueue, critLanded, backToOverWorld, queue, faintEvent, pc, queueFaintTrigger, queueProcess, terrainConditions, manageWeatherState, statusEvent, faster, slower, faintSwitch, enemyTrainerInfo)

        itemUsed.item = null
        itemUsed.used = false
        
        moveProcess = true
        
        manageCheckStatusEvent(foe, ally)
        return
      } else {
        player.team[0].dialogue("battle", "Can't catch another trainer's pogemon!")

        itemUsed.item = null
        itemUsed.used = false
      }
    } else {
      player.dialogue('battle', `${itemUsed.item.name} was used on ${switchUnderScoreForSpace(ally.nickname)}!`)
      document.querySelector('#proceedImgContainer').style.display = 'block'

      queue.push(() =>{
        foe.move({move: foeRNGMove, recipient: ally, recipientMove: allyMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
        console.log('YAYA')

        let faster = ally
        let foeSpd = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)
        let allySpd = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)
        if(foe.status.name == 'para') foeSpd = foeSpd * 0.5
        if(ally.stats.name == 'para') allySpd = allySpd * 0.5

        if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
          // not sure if i need to set it here??????
          // ally.choiceItem.type = 'scarf'
          // ally.choiceItem.move = allyMove
      
          allySpd = allySpd * 1.5
        }

        if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
          foe.choiceItem.type = 'scarf'
          foe.choiceItem.move = foeRNGMove
      
          foeSpd = foeSpd * 1.5
        }

        if(foeSpd > ally.stats.spd){
          faster = foe
        } else if (foeSpd == ally.stats.spd){
          let tieRng = Math.floor(Math.random() * 2)

          if(tieRng == 1) faster = foe
        }

        let slower = foe
        if(faster.id == foe.id) slower = ally

        manageCheckStatusEvent(faster, slower)

        // ally.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
      })
    }

    return
  }

  if(teamEvent.switch && teamEvent.previousScene == 'battle'){
    // intimidate here
    if(faintedTriggered != undefined) {
      if(faintedTriggered.active) {
        faintedTriggered.active = false
  
        // here that is fucked
        foe.checkStatus('#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, queueProcess, faintEvent, ally, ['#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, queueProcess, faintEvent], false, terrainConditions, manageWeatherState, faintSwitch)
        console.log('checkStatus')
        ally.dialogue('battle', `You sent out ${switchUnderScoreForSpace(ally.nickname)}`)
        if(ally.abilityInfo.ability.name == 'frisk'){

          let itemName
          if(foe.heldItem == null) itemName = 'nothing'
          if(foe.heldItem != null) itemName = `a ${switchUnderScoreForSpace(foe.heldItem.name)}`
  
          setTimeout(() => ally.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(ally.nickname)} frisked ${itemName}.`),500)
        }
  
        document.querySelector('#dialogueInterface').style.display = 'block'
        document.querySelector('#proceedImgContainer').style.display = 'block'
        document.querySelector('#encounterInterface').style.display = 'none'
        return
      }

      if(allyId !== player.team[0].id){
        resetStats('ally')

        onEnterTerrainAffliction('ally', ally, foe)
        
        player.team.forEach(pogemon =>{
          pogemon.affliction.forEach(affliction =>{
            affliction.active = false
            affliction.turns = 0
          })
        })
        
        allyId = player.team[0].id
  
        document.querySelector('#encounterInterface').style.display = 'none'
        document.querySelector('#movesInterface').style.display = 'none'
        document.querySelector('#dialogueInterface').style.display = 'grid'
        document.querySelector('#proceedImgContainer').style.display = 'block'

        queueProcess.disabled = true
        console.log('here')
  
        ally.dialogue('battle', `${switchUnderScoreForSpace(ally.nickname)} switched in!`)

        if(ally.abilityInfo.ability.name == 'frisk'){

          let itemName
          if(foe.heldItem == null) itemName = 'nothing'
          if(foe.heldItem != null) itemName = `a ${switchUnderScoreForSpace(foe.heldItem.name)}`
  
          setTimeout(() => ally.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(ally.nickname)} frisked ${itemName}.`),500)
        }

        moveSwitchEvent.ally = false

        moveProcess = true
  
        let flag = false
  
        function proceedWithMove(){
          // let rng = Math.floor(Math.random() * foe.moves.length)
          // let foeRNGAttack = foe.moves[rng]

          foe.move({move: foeRNGMove, recipient: ally, recipientMove: allyMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
          console.log('YAYA')
    
          moveProcess = true
          manageCheckStatusEvent(foe, ally)
          console.log('manageCheckStatusEvent')
        }
  
        // afflictionsEvent(foe, foeRNGMove, ally, 'slowerCheck', null, document.querySelector('#foeStatus'))
  
        let faster = ally
        let foeSpd = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)
        let allySpd = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)
        if(foe.status.name == 'para') foeSpd = foeSpd * 0.5
        if(ally.stats.name == 'para') allySpd = allySpd * 0.5

        if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
          // not sure if i need to set it here??????
          // ally.choiceItem.type = 'scarf'
          // ally.choiceItem.move = allyMove
      
          allySpd = allySpd * 1.5
        }

        if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
          foe.choiceItem.type = 'scarf'
          foe.choiceItem.move = foeRNGMove
      
          foeSpd = foeSpd * 1.5
        }

        if(foeSpd > allySpd){
          faster = foe
        } else if (foeSpd == allySpd){
          let tieRng = Math.floor(Math.random() * 2)

          if(tieRng == 1) faster = foe
        }

        let slower = foe
        if(faster.id == foe.id) slower = ally
  
        // here
        console.log(foe)
        queue.push(() => statusEvent(foe, foeRNGMove, ally, document.querySelector('#foeStatus'), false, faster, slower))

        slower = foe
  
        if(foe.affliction[0].active == false && foe.affliction[0].active == false){
          if(!moveSwitchEvent.foe && !teamEvent.switch){
            queue.push(() =>{
              proceedWithMove()
              // console.log('proceed')
            })
          } else {
            queueProcess.disabled = false
            console.log('here')
          }
          return
        }
  
        //team switch option
        if(!teamEvent.switch){
          manageCheckStatusEvent(foe, ally)
          console.log('manageCheckStatusEvent')
  
          foe.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
          console.log('endOfTurnTerrainManagement')
        } else {
          manageCheckStatusEvent(foe, ally)
          console.log('manageCheckStatusEvent')
  
          const [flag, terrainArr] = checkIfTerrainConditionActive()
  
          //check is terrain active to save clicking
          if(flag) {
            if(foe.affliction[0].active || foe.status.name == 'para' || foe.status.name == 'slp'){
                foe.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
                console.log('endOfTurnTerrainManagement')
            } else {
              queue.push(() =>{
                foe.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
                console.log('endOfTurnTerrainManagement')
              })
            }
          }
  
        }

        return
      }
      
      // console.log(teamEvent.switch)

      // vvv weird decision, proceedWithMove is declared in an if statement above vvv
      if(!moveSwitchEvent.foe && !teamEvent.switch) proceedWithMove()

      // console.log('proceed')
      document.querySelector('#encounterInterface').style.display = 'none'
    }

    // confusion when i restart battle
      // if(foe.affliction[0].active){
      //   queue.push(() =>{
      //     // console.log('hahahah')
      //     foe.dialogue('battle', `${foe.name} is confused..`)
      //     foe.statusEffectAnimation('confusion', renderedSprites, queueProcess)
      //     foe.affliction[0].turns--

          
      //     if(attackLanded(33)) {
      //       queue.push(() => {
      //         foe.miss('confusion', renderedSprites, queueProcess)
      //         if(battleType != 'trainer') if(foe.hp <= 0){
      //           faintEvent(foe)
      //           return
      //         }
      //         manageCheckStatusEvent(foe, ally)
      //         console.log('manageCheckStatusEvent')
      //       })
      //     } else {
      //       queue.push(() =>{
      //         proceedWithMove(foeRNGMove)
      //         // console.log('proceed')
      //       })
      //     }
      //   })
      // }

      // for(let i = 0; i < foe.affliction.length; i++){
      //   flag = true
      //     if(foe.affliction[i].name == 'confusion') {
            
      //     break
      //   } else {
      //     queue.push(() =>{
      //       proceedWithMove(foeRNGMove)
      //       console.log('proceed')

      //     })
      //   }
    // }
  }

  let rng = Math.floor(Math.random() * 2)

  let faster = ally
  let slower = foe

  let allySpeed
  if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
  else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)

  let foeSpeed
  if(foe.status.name == 'para') foeSpeed = Math.floor((foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd) / 2)
  else foeSpeed = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)

  if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
    // ally.choiceItem.type = 'scarf'
    // ally.choiceItem.move = allyMove

    allySpeed = allySpeed * 1.5
  }

  if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
    // foe.choiceItem.type = 'scarf'
    // foe.choiceItem.move = foeRNGMove

    foeSpeed = foeSpeed * 1.5
  }

  if(allySpeed == foeSpeed){
    if(rng == 1) {
      faster = foe
      slower = ally
    }
  } else if(allySpeed < foeSpeed){
    faster = foe
    slower = ally
  }

  if(currMap.weather != undefined) 
    if(!ranAway) queue.push(() => manageWeatherState(currMap.weather, terrainConditions.turns.weather[currMap.weather], 'startOfBattle'))

  console.log(faster.abilityInfo.ability.info)
  console.log(slower.abilityInfo.ability.info)

  console.log(terrainConditions.turns.weather[currMap.weather])

  if(faster.abilityInfo.ability.type == 'initWeather') 
    if(faster.abilityInfo.ability.info != currMap.weather) 
      if(!ranAway) queue.push(() => manageWeatherState(faster.abilityInfo.ability.info, terrainConditions.turns.weather[faster.abilityInfo.ability.info], 'init', faster))

  if(slower.abilityInfo.ability.type == 'initWeather') 
    if(slower.abilityInfo.ability.info != currMap.weather) 
      if(!ranAway) queue.push(() => manageWeatherState(slower.abilityInfo.ability.info, terrainConditions.turns.weather[slower.abilityInfo.ability.info], 'init', slower))
}

function clearBattleScene(nextScene){
  if(enemyTrainer != undefined) {
    player.interaction.info.beaten = true

    mapsObj[`${currMap.name}`].trainers.forEach(trainer =>{
      if(trainer.name == player.interaction.info.name) trainer.beaten = true
    })
  }

  scenes.set('battle', {initiated : false})
  document.querySelector('#allyStatus').style.backgroundColor = 'transparent'
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      cancelAnimationFrame(battleAnimationId)

      movesBox.replaceChildren()
      menuDom.removeChild(dialogueInterfaceDom)
      battleSceneDom.style.display = 'none'
      optionBox.replaceChildren()

      // audioObj.music.victory.stop()
      // audioObj.music.map.play()
       
      if(nextScene == 'team') manageTeamState(true, 'battle')
      else if (nextScene == 'bag') manageBagState(true, 'battle')
      else if (nextScene == 'evo') return
      else {

        player.team.forEach(pogemon =>{
          pogemon.subHp = 0
          pogemon.opacity = 1
        })

        playerTeamItemsState.team.forEach((pogemon, i) =>{
          if(Object.entries(pogemon)[i] != undefined)
            if(player.team[i].id == Object.entries(pogemon)[i][0]) 
              if(player.team[i].heldItem == null) 
                player.team[i].heldItem = Object.entries(pogemon)[i][1]
        })
  
        playerTeamItemsState.team = []

        terrainConditions.static.stealth_rock.active.ally = false
        terrainConditions.static.stealth_rock.active.foe = false

        document.querySelector('#allyRocks').style.opacity = 0
        document.querySelector('#foeRocks').style.opacity = 0
      
        terrainConditions.static.sticky_web.active.ally = false
        terrainConditions.static.sticky_web.active.foe = false

        document.querySelector('#allyWebs').style.opacity = 0
        document.querySelector('#foeWebs').style.opacity = 0
      
        terrainConditions.turns.weather.sun.active = false
        terrainConditions.turns.weather.rain.active = false
        terrainConditions.turns.weather.sand.active = false
        terrainConditions.turns.weather.snow.active = false
      
        terrainConditions.turns.etc.trick_room.active = false
      
        terrainConditions.turns.etc.ally_reflect.active = false
        terrainConditions.turns.etc.ally_light_screen.active = false

        document.querySelector('#allyReflectIndicatorContainer').style.top = 84
        document.querySelector('#allyLightScreenIndicatorContainer').style.top = 84
      
        terrainConditions.turns.etc.foe_reflect.active = false
        terrainConditions.turns.etc.foe_light_screen.active = false

        document.querySelector('#foeReflectIndicatorContainer').style.top = -78
        document.querySelector('#foeLightScreenIndicatorContainer').style.top = -78

        manageOverWorldState(true, 'battle')

        document.querySelector('#allyHealthBarContainer').style.right = -800
        document.querySelector('#foeHealthBarContainer').style.left = -800

        waitForNextBattle.initiated = true
        setTimeout(() =>{
          waitForNextBattle.initiated = false
        }, 500)
      }

      gsap.to('#overlapping', {opacity: 0})
    }
  })
}

let battleAnimationId
let arrowDisplayState = false
let arrowDisplayFlag = false

function pushInitBattleIntimidate(target, recipient){
  if(target.abilityInfo.ability.name == 'intimidate' && recipient.abilityInfo.ability.name != 'scrappy'){
    queue.push(() =>{
      target.statusAnimation('status', target.abilityInfo.ability.effects, {name: 'intimidate'}, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)}
    )
  }
}

export function battleAnimation(){
  battleAnimationId = window.requestAnimationFrame(battleAnimation)
  battleBackground.draw()

  renderedSprites.forEach(sprite =>{
    sprite.draw()
  })

  if(shinySparklesManagement.state) {
    if(prevScene != 'overworld') return
    terrainConditions.weatherSpent = true

    if(foe.isShiny) shinySparklesAnimation(foe)
    if(ally.isShiny) shinySparklesAnimation(ally)

    if(shinySparklesManagement.timeOutFlag == false) {
      shinySparklesManagement.timeOutFlag = true
      setTimeout(() =>{
        shinySparklesManagement.foeSparklesArr.length = 0
        shinySparklesManagement.allySparklesArr.length = 0
        shinySparklesManagement.timeOutFlag = false
        shinySparklesManagement.state = false
      }, 1500)
    }
  }

  if(queueProcess.disabled) {
    if(arrowDisplayState){
      if(!arrowDisplayFlag) return
      arrowDisplayFlag = true
      document.querySelector('#proceedImgContainer').style.display = 'none'
      setTimeout(() =>{
        arrowDisplayState = false
      }, 500)
    } else {
      arrowDisplayState = true
      arrowDisplayFlag = true
    }
  } else {
    if(document.querySelector('#encounterInterface').style.display == 'grid' || document.querySelector('#movesInterface').style.display == 'grid') document.querySelector('#proceedImgContainer').style.display = 'none'
    else document.querySelector('#proceedImgContainer').style.display = 'block'
  }
}

const encounterInterfaceDom = document.querySelector('#encounterInterface')
const textBox = document.querySelector('#textBox')

let dialogueInterfaceDom = document.querySelector('#dialogueInterface')

const movesInterfaceDom = document.querySelector('#movesInterface')

const learnMoveInterfaceDom = document.querySelector('#learnMoveInterface')
const learnMoveDialogueDom = document.querySelector('#learnMoveDialogue')

let movesButtonArr = document.querySelectorAll('.movesButton')

let learntMove

export let moveLearning = {
  initiated: false
}

const battleSceneDom = document.querySelector('#battleScene')

let C = 0

let ranAway = false

function optionButtonInteraction(e) {
  if(scenes.get('battle').initiated){
    switch(e.target.textContent){
      case 'Fight':
        encounterInterfaceDom.style.display = 'none'
        movesInterfaceDom.style.display = 'grid'
        break
      case 'pgmn':
        if(foe.abilityInfo.ability.info == 'trap'){
          document.querySelector('#textBox').innerText = `${foe.nickname}'s ability prevents you from switching.`
          setTimeout(() =>{
            document.querySelector('#textBox').innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`
          }, 1250)
        } else {
          manageBattleState(false, 'team')
          gsap.to('#overlapping', {
            opacity: 1,
            yoyo: true,
            duration: 1,
            onComplete(){
              gsap.to('#overlapping', {
                opacity: 0,
                duration: 0.4
              })
            }
          })
        }
        break
      case 'Item':
        manageBattleState(false, 'bag')
        gsap.to('#overlapping', {
          opacity: 1,
          yoyo: true,
          duration: 1,
          onComplete(){
            gsap.to('#overlapping', {
              opacity: 0,
              duration: 0.4
            })
          }
        })
        break
      case 'Run':
        if(enemyTrainer == undefined){

          if(player.interaction != null){
            if(player.interaction.info.eventKey == 'frozenBaaull'){
              document.querySelector('#textBox').innerText = "Can't run from this battle!"
              setTimeout(() =>{
                document.querySelector('#textBox').innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`
              }, 1250)
              return
            }

            if(player.interaction.info.legendary != undefined){
              document.querySelector('#textBox').innerText = "Can't run from this battle!"
              setTimeout(() =>{
                document.querySelector('#textBox').innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`
              }, 1250)
              return
            }
          }

          C + 1

          function chanceToEscape(A, B){
            return Math.floor((((A * 32) / (B / 4)) + 30 * C))
          }

          let escapeOdds = chanceToEscape(player.team[0].stats.spd, foe.stats.spd)
          let runAway = false

          if(player.team[0].abilityInfo.ability.name == 'run_Away') {
            runAway = true
            escapeOdds = 100
          }
          
          if(foe.abilityInfo.ability.info == 'trap' && !runAway){
            document.querySelector('#textBox').innerText = `${foe.nickname}'s ability prevents you from escaping.`
            setTimeout(() =>{
              document.querySelector('#textBox').innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`
            }, 1250)
          } else if(escapeOdds < 100) {
            encounterInterfaceDom.style.display = 'none'
            movesInterfaceDom.style.display = 'none'
            dialogueInterfaceDom.style.display = 'block'
            document.querySelector('#proceedImgContainer').style.display = 'block'
            dialogueInterfaceDom.textContent = 'You failed to run away..'
  
            queue.push(() => {
              let faster = ally
              let foeSpd = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)
              let allySpd = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)
              if(foe.status.name == 'para') foeSpd = foeSpd * 0.5
              if(ally.stats.name == 'para') allySpd = allySpd * 0.5
      
              if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
                // not sure if i need to set it here??????
                // ally.choiceItem.type = 'scarf'
                // ally.choiceItem.move = allyMove
            
                allySpd = allySpd * 1.5
              }
      
              if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
                foe.choiceItem.type = 'scarf'
                foe.choiceItem.move = foeRNGMove
            
                foeSpd = foeSpd * 1.5
              }
      
              if(foeSpd > ally.stats.spd){
                faster = foe
              } else if (foeSpd == ally.stats.spd){
                let tieRng = Math.floor(Math.random() * 2)
      
                if(tieRng == 1) faster = foe
              }

              let slower = foe
              if(faster.id == foe.id) slower = ally
              
              statusEvent(foe, foeRNGMove, ally, document.querySelector('#foeStatus'), false, faster, slower)
              // foe.move({move: foeRng, recipient: player.team[0], renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
              console.log('YAYA')

              manageCheckStatusEvent(foe, ally)
              console.log('manageCheckStatusEvent')
            })
            return
          } else {
            ranAway = true

            encounterInterfaceDom.style.display = 'none'
            movesInterfaceDom.style.display = 'none'
            dialogueInterfaceDom.style.display = 'block'
            document.querySelector('#proceedImgContainer').style.display = 'block'
            dialogueInterfaceDom.textContent = 'You fleed.'
            audioObj.SFX.flee.play()
            // need to put rng check based on speed stat`
            queue.push(() =>{
              manageBattleState(false, 'overworld')
              //might throw err
              gsap.to('#overlapping', {
                opacity: 1,
                yoyo: true,
                duration: 1,
                onComplete(){
                  audioObj.SFX.flee.stop()
                  gsap.to('#overlapping', {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () =>{
                      ranAway = false
                    }
                  })
                }
              })
            })
          }
        } else {
          document.querySelector('#textBox').innerText = "Can't run from a trainer battle!"
          setTimeout(() =>{
            document.querySelector('#textBox').innerText = `What will ${switchUnderScoreForSpace(ally.nickname)} do?`
          }, 1250)
        }
        break
    }
  }
}

let powDom = document.querySelector('#moveDescPow')
let accDom = document.querySelector('#moveDescAcc')
let ppDom = document.querySelector('#moveDescPP')
let elementDom = document.querySelector('#moveDescElement')
let typeDom = document.querySelector('#moveDescType')

export function movesHoverEvent(e, target, type){
  let currentMove

  for(let i = 0; i < target.moves.length; i++){
    if(target.moves[i].name === `${e.target.textContent.replace(/ /g, "_")}`){
      currentMove = target.moves[i]
      playerMove = currentMove
    }
  }

  if(type != 'battle' && type != 'trainer'){
    powDom = document.querySelector('#evoMoveDescPow')
    accDom = document.querySelector('#evoMoveDescAcc')
    ppDom = document.querySelector('#evoMoveDescPP')
    elementDom = document.querySelector('#evoMoveDescElement')
    typeDom = document.querySelector('#evoMoveDescType')
  } else {
    powDom = document.querySelector('#moveDescPow')
    accDom = document.querySelector('#moveDescAcc')
    ppDom = document.querySelector('#moveDescPP')
    elementDom = document.querySelector('#moveDescElement')
    typeDom = document.querySelector('#moveDescType')
  }

  powDom.textContent = `Pow : ${currentMove.pow}`
  accDom.textContent = `Acc : ${currentMove.acc}`
  ppDom.textContent = `PP : ${currentMove.pp}`

  elementDom.textContent = `${currentMove.element}`
  elementDom.style.color = typesObj[currentMove.element].color

  typeDom.src = `img/moves/category/${currentMove.type}.png`
}

export function movesAwayEvent(){
  powDom.textContent = `Pow : --`
  accDom.textContent = `Acc : --`
  ppDom.textContent = `PP : --`
  elementDom.textContent = `--`
  elementDom.style.color = 'white'
  typeDom.src = `img/blank.png`
}

const foeNameDom = document.querySelector('#foeName')
const foeLvlDom = document.querySelector('#foeLvl')
const foeHpDom = document.querySelector('#foeHp')
const foeStatusImg = document.querySelector('#foeStatus')

const allyNameDom = document.querySelector('#allyName')
const allyLvlDom = document.querySelector('#allyLvl')
const allyHpDom = document.querySelector('#allyHp')
const allyStatusImg = document.querySelector('#allyStatus')

function setBattlersInfo(){
  foeNameDom.textContent = foe.name
  foeLvlDom.textContent = `Lv ${foe.lvl}`
  foeHpDom.textContent = `${foe.hp}/${foe.stats.baseHp}`
  switch(foe.status.name){
    case 'burn':
      foeStatusImg.src = `img/status/burn.png`
      break
    case 'para':
      foeStatusImg.src = `img/status/para.png`
      break
    case 'slp':
      foeStatusImg.src = `img/status/slp.png`
      break
    case 'psn':
      foeStatusImg.src = `img/status/psn.png`
      break
    case 'frz':
      foeStatusImg.src = `img/status/frz.png`
      break
    case null:
      foeStatusImg.style.display = 'none'
      break
  }


  allyNameDom.textContent = switchUnderScoreForSpace(ally.nickname)
  allyLvlDom.textContent = `Lv ${ally.lvl}`
  allyHpDom.textContent = `${ally.hp}/${ally.stats.baseHp}`
  switch(ally.status.name){
    case 'burn':
      allyStatusImg.src = `img/status/burn.png`
      break
    case 'para':
      allyStatusImg.src = `img/status/para.png`
      break
    case 'slp':
      allyStatusImg.src = `img/status/slp.png`
      break
    case 'psn':
      allyStatusImg.src = `img/status/psn.png`
      break
    case 'frz':
      allyStatusImg.src = `img/status/frz.png`
      break
    case null:
      allyStatusImg.style.display = 'none'
      break
  }
}

const optionBox = document.querySelector('#optionBox')
const options = ['Fight', 'pgmn', 'Item', 'Run']

let optionButtonsArr

function createEncounterMenuButtons(){
  for(let i = 0; 4 > i; i++){
    const optionButton = document.createElement('div')
    optionButton.classList.add('optionButton')
    const optionText = document.createElement('div')
    optionText.classList.add('optionText')
    optionText.textContent = options[i]
    optionButton.appendChild(optionText)
    optionBox.appendChild(optionButton)
  }
  optionButtonsArr = document.querySelectorAll('.optionButton')
  optionButtonsArr.forEach(optionButton =>{
    optionButton.addEventListener('click', (e) => _preventActionSpam(optionButtonInteraction, e, 200), true)
  })
}

const movesBox = document.querySelector('#movesBox')
let targetedClass
let targetedInterface

let switchMoveTarget

function switchLearnedMoveForSelectedMove(e){
  movesButtonArr = document.querySelectorAll(`.${targetedClass}`)

  if(targetedInterface === 'evolutionMovesInterface'){
    gsap.to(document.querySelector('#evoLearnMoveInfo').style, {
      left: 2900
    })
  } else {
    gsap.to(document.querySelector('#learnMoveInfo').style, {
      left: 2900
    })
  }
  
  for(let i = 0; i < movesButtonArr.length; i++){
    if(e.target.textContent === Object.values(switchMoveTarget.moves)[i].name){
      // if move is already in moves array dont let it change

      switchMoveTarget.learntMoves.push(learntMove.name)

      for(let j = 0; j < switchMoveTarget.moves.length; j++){
        if(switchMoveTarget.moves[j].name === learntMove.name){
          switchMoveTarget.moves.splice(j, 1)
        }
      }

      switchMoveTarget.moves.splice(i, 1, {...learntMove})

      document.querySelector(`#${targetedInterface}`).style.display = 'none'

      if(targetedInterface === 'evolutionMovesInterface'){
        document.querySelector('#evolutionInterface').style.display = 'block'
        switchMoveTarget.dialogue('evolution', `${switchUnderScoreForSpace(switchMoveTarget.nickname)} learned ${switchUnderScoreForSpace(learntMove.name)}!`)
      } else {
        switchMoveTarget.dialogue('battle', `${switchUnderScoreForSpace(switchMoveTarget.nickname)} learned ${switchUnderScoreForSpace(learntMove.name)}!`)
      }
    }
    
    moveLearning.initiated = false
  }
}

function setUserMovesEvents(eventType, currMovesBox, target){  
  for(let i = 0; currMovesBox.childNodes.length > i; i++){
    if(target.moves[i] === undefined) return

    if(eventType === 'attack') currMovesBox.childNodes[i].addEventListener('click', e => {_preventActionSpam(attackMove, e, 200)})
    switchMoveTarget = target
    if(eventType === 'switchMove') currMovesBox.childNodes[i].addEventListener('click', e => _preventActionSpam(switchLearnedMoveForSelectedMove, e, 200))

    currMovesBox.childNodes[i].textContent = switchUnderScoreForSpace(target.moves[i].name)
  }
}

export function createMovesMenuButtons(state, type, event, target){
  let showcasedMove
  if(target != undefined) showcasedMove = [...target.moves].splice(0, 4)

  let currMovesBox

  if(type === 'battle') {
    currMovesBox = movesBox
    targetedClass = 'movesButton'
    targetedInterface = 'learnMoveInterface'
  } else {
    currMovesBox = document.querySelector('#evolutionMovesBox')
    targetedClass = 'evolutionMovesButton'
    targetedInterface = 'evolutionMovesInterface'
  }

  if(state){
    currMovesBox.replaceChildren()
    for(let i = 0; showcasedMove.length > i; i++){

      const movesButton = document.createElement('div')
      movesButton.classList.add(targetedClass)
      movesButton.textContent = switchUnderScoreForSpace(showcasedMove[i].name)      
      currMovesBox.appendChild(movesButton)
    }

    if(type === 'battle') {
      movesButtonArr = document.querySelectorAll('.movesButton')
      movesButtonArr.forEach(move => move.addEventListener('mouseenter', e => movesHoverEvent(e, target, type), true))
      movesButtonArr.forEach(move => move.addEventListener('mouseleave', () => movesAwayEvent(), true))
    } else {
      document.querySelector('#evolutionMovesBox').childNodes.forEach(button =>{
        button.addEventListener('mouseenter', e => movesHoverEvent(e, target, type), true)
        button.addEventListener('mouseleave', () => movesAwayEvent(), true)
      })
    }

    setUserMovesEvents(event, currMovesBox, target)

  } else if(!state){
    currMovesBox.replaceChildren()
  }
}

let currMove
let foeRNGMove

function chooseMove(e) {
  let selectedMove = movesObj[`${e.target.textContent.replace(/ /g, "_")}`]
  moves.ally = selectedMove

  //should change ai move depending on decided difficulty

  foeRNGMove = foe.rerollEnemyMoveSoAppropriate(ally, selectedMove, terrainConditions, enemyTrainerInfo)
  moves.foe = foeRNGMove

  console.log(foeRNGMove)

  return [selectedMove, foeRNGMove]
}

let faster
let slower

let allyMove

function checkSpeed(e) {
  const options = [ally, foe]
  const rng = Math.floor(Math.random() * 2)
  let [selectedMove, foeRNGMove] = chooseMove(e)

  const priority = {
    ally: selectedMove.priority,
    foe: foeRNGMove.priority
  }

  if(selectedMove.name == 'sucker_punch' && foeRNGMove.category == 'physical') priority.ally = 2
  if(foeRNGMove.name == 'sucker_punch' && selectedMove.category == 'physical') priority.foe = 2
  
  if(ally.abilityInfo.ability.name == 'prankster' && selectedMove.type == 'status'){
    if(foe.element[1] != 'dark' || foe.element[2] != 'dark') priority.ally = 1
  }

  if(foe.abilityInfo.ability.name == 'prankster' && selectedMove.type == 'status'){
    if(ally.element[1] != 'dark' || ally.element[2] != 'dark') priority.foe = 1
  }

  let allySpeed
  if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
  else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)

  let foeSpeed
  if(foe.status.name == 'para') foeSpeed = Math.floor((foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd) / 2)
  else foeSpeed = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)

  if(ally.abilityInfo.ability.type == 'weatherSpeed') if(terrainConditions.turns.weather[ally.abilityInfo.ability.info].active) allySpeed = Math.floor(allySpeed * 2)
  if(foe.abilityInfo.ability.type == 'weatherSpeed') if(terrainConditions.turns.weather[foe.abilityInfo.ability.info].active) foeSpeed = Math.floor(foeSpeed * 2)

  if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
    ally.choiceItem.type = 'scarf'

    allySpeed = allySpeed * 1.5
  }

  if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
    foe.choiceItem.type = 'scarf'

    foeSpeed = foeSpeed * 1.5
  }

  if(priority.ally > priority.foe){
    faster = ally
    slower = foe
  } else if (priority.foe > priority.ally) {
    faster = foe
    slower = ally
  } else if(allySpeed > foeSpeed){
    faster = ally
    slower = foe
  } else if (foeSpeed > allySpeed) {
    faster = foe
    slower = ally
  } else if (allySpeed === foeSpeed && priority.ally == priority.foe) {
    faster = options[rng]
    options.splice(rng, 1)
    slower = options[0]
  }

  let fasterMove = selectedMove
  let slowerMove = foeRNGMove

  if(faster.isEnemy){
    fasterMove = foeRNGMove
    slowerMove = selectedMove
  }

  if(foe.heldItem != null) if(foe.heldItem.effect == 'choice'){
    if(foe.choiceItem.move == null) foe.choiceItem.move = foeRNGMove
    else foeRNGMove = foe.choiceItem.move
  }

  console.log(foeRNGMove)

  if(terrainConditions.turns.etc.trick_room.active){
    let placeHolder

    placeHolder = faster
    faster = slower
    slower = placeHolder

    placeHolder = fasterMove
    fasterMove = slowerMove
    slowerMove = placeHolder
  }

  if(priority.ally > priority.foe){
    faster = ally
    slower = foe

    fasterMove = selectedMove
    slowerMove = foeRNGMove
  } else if (priority.foe > priority.ally) {
    faster = foe
    slower = ally

    fasterMove = foeRNGMove
    slowerMove = selectedMove
  }

  return [faster, slower, fasterMove, slowerMove]
}

export let learningMove
export let learningTarget
export let learningType

export function learnMoveOptionEvent(e, move, type, target){
  learnMoveMenu(type, false, target)

  learningMove = move
  learningType = type
  learningTarget = target

  let movesInterface
  let choice

  if(e != null) choice = e.target.textContent
  else choice = 'no'

  if(type === 'battle') movesInterface = movesInterfaceDom
  else {
    movesInterface = document.querySelector('#evolutionMovesInterface')
    document.querySelector('#evolutionLearnMovesInterface').style.display = 'none'
  }

  if(choice == 'yes'){
    if(type == 'battle'){
      document.querySelector('#learnMoveDescPow').textContent = `pow : ${move.pow}`
      document.querySelector('#learnMoveDescAcc').textContent = `acc : ${move.acc}`
      document.querySelector('#learnMoveDescPP').textContent = `pp : ${move.pp}`
      document.querySelector('#learnMoveDescElement').textContent = move.element
      document.querySelector('#learnMoveDescElement').style.color = typesObj[move.element].color
      document.querySelector('#learnMoveDescType').src = `img/moves/category/${move.type}.png`
      document.querySelector('#learnMoveName').textContent = switchUnderScoreForSpace(move.name)

      document.querySelector('#learnMoveInfo').style.display = 'grid'
      gsap.to(document.querySelector('#learnMoveInfo').style, {
        left: 1560,
        onComplete: () =>{
          moveLearning.initiated = true
          createMovesMenuButtons(false, type)
          createMovesMenuButtons(true, type, 'switchMove', target)
          movesInterface.style.display = 'grid'
        }
      })
    } else {
      document.querySelector('#evoLearnMoveDescPow').textContent = `pow : ${move.pow}`
      document.querySelector('#evoLearnMoveDescAcc').textContent = `acc : ${move.acc}`
      document.querySelector('#evoLearnMoveDescPP').textContent = `pp : ${move.pp}`
      document.querySelector('#evoLearnMoveDescElement').textContent = move.element
      document.querySelector('#evoLearnMoveDescElement').style.color = typesObj[move.element].color
      document.querySelector('#evoLearnMoveDescType').src = `img/moves/category/${move.type}.png`
      document.querySelector('#evoLearnMoveName').textContent = switchUnderScoreForSpace(move.name)

      document.querySelector('#evoLearnMoveInfo').style.display = 'grid'
      gsap.to(document.querySelector('#evoLearnMoveInfo').style, {
        left: 1560,
        onComplete: () =>{
          moveLearning.initiated = true
          createMovesMenuButtons(false, type)
          createMovesMenuButtons(true, type, 'switchMove', target)
          movesInterface.style.display = 'grid'
        }
      })
    }
  } else if(choice == 'no'){
    if(type === 'battle') {
      document.querySelector('#learnMoveInterface').style.display = 'none'
      gsap.to(document.querySelector('#learnMoveInfo').style, {
        left: 2900
      })
    } else {
      document.querySelector('#evolutionLearnMovesInterface').style.display = 'none'
      document.querySelector('#evolutionMovesInterface').style.display = 'none'
      gsap.to(document.querySelector('#evoLearnMoveInfo').style, {
        left: 2900
      })
    }
    
    target.dialogue(type, `${switchUnderScoreForSpace(target.nickname)} gave up on learning ${switchUnderScoreForSpace(move.name)}.`)

    target.learntMoves.push(move.name)

    for(let i = 0; i < target.learntMoves.length; i++){
      if(target.moves[i] == undefined) return
      if(target.moves[i].name === learntMove.name){
        target.moves.splice(i, 1)
      }
    }
  }
}

export function learnMoveMenu(type, state, battler) {
  let learnMoveOptionButtonContainer
  if(type === 'battle') learnMoveOptionButtonContainer = document.querySelector('#learnMoveOptionButtonContainer')
  else learnMoveOptionButtonContainer = document.querySelector('#evolutionLearnMoveOptionButtonContainer')

  if(state){  
    const learnMoveOptions = ['yes', 'no']
    for(let i = 0; i < learnMoveOptions.length; i++){
      const learnMoveOptionButton = document.createElement('div')
      const learnMoveOptionButtonText = document.createElement('div')

      learnMoveOptionButton.classList.add('learnMoveOptionButton')
      learnMoveOptionButtonText.classList.add('learnMoveOptionButtonText')

      learnMoveOptionButtonText.textContent = learnMoveOptions[i]

      learnMoveOptionButton.addEventListener('click', e => learnMoveOptionEvent(e, learntMove, type, battler))
      
      learnMoveOptionButton.appendChild(learnMoveOptionButtonText)
      learnMoveOptionButtonContainer.appendChild(learnMoveOptionButton)
    }
  } else if(!state) {
    learnMoveOptionButtonContainer.replaceChildren()
  }
}

export function manageLvlUpDisplay(type, oldStats, queue, prevLvl, target){
  queueBeforeLevelUp = [...queue]
  if(target.lvl <= prevLvl) return
  if(type === 'battle'){
    if(target.name == ally.name) {
      queue.push(() => target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)}'s raised to lv ${target.lvl}!`))
      queue.push(() => target.onLvlUp(true))
    } 
    else queue.push(() => target.onLvlUp(false))
    queue.push(() => {
      target.dialogue('evolution', `${switchUnderScoreForSpace(target.nickname)}'s stats increased!`)
      target.showStatWindow(type, oldStats, prevLvl, queueProcess)
    })
  } else {
    queue.push(() => {
      target.showStatWindow(type, oldStats, prevLvl, evoQueueProcess)
    })
  }

  queue.push(() => target.showStatIncrease(type))
  queue.push(() => {
    if(type == 'battle') {
      gsap.to(document.querySelector('#teamLvlUpWindow').style, {
        left: '120.5%'
      })
    }
    target.hideStatIncrease(type)
  })
}

export function manageLearnedMoves(ally, selectedQueue, type, firstIndex){
  //compares already known moves to new moves learned passed by the class method
  let oldMoves = [...ally.moves]
  let newMoves = ally.learnMoveOnLvlUp()

  let interfaceDom
  let dialogueDom
  
  switch(type){
    case 'battle':
      interfaceDom = learnMoveInterfaceDom
      dialogueDom = learnMoveDialogueDom
      break
    case 'evolution':
      interfaceDom = document.querySelector('#evolutionLearnMovesInterface')
      dialogueDom = document.querySelector('#evolutionLearnMoveDialogue')
      break
  }

  for(let i = 0; i < newMoves.length; i++){
    learntMove = newMoves[i]

    //if pogemon has less than 4 moves give it moves without user input
    if(oldMoves.length + i < 4) {
      if(type == 'evolution'){
        if(!firstIndex){
          ally.learntMoves.push(newMoves[i].name)
          ally.dialogue(type, `${switchUnderScoreForSpace(ally.nickname)} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
        } else {
          selectedQueue.push(() => {
            ally.learntMoves.push(newMoves[i].name)
            ally.dialogue(type, `${switchUnderScoreForSpace(ally.nickname)} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
          })
        }
      } else {
        selectedQueue.push(() => {
          ally.learntMoves.push(newMoves[i].name)
          ally.dialogue(type, `${switchUnderScoreForSpace(ally.nickname)} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
        })
      }

    } else {
      // working here
      // if the move the pogemon is trying to learn is already a move he learned previously, does not learn it
      if(Object.values(ally.learntMoves).includes(newMoves[i].name)) return

      if(type == 'evolution'){
        if(!firstIndex){
          selectedQueue.push(() =>{
            learntMove = newMoves[i]
            learnMoveMenu(false)
            learnMoveMenu(type, true, ally)
            document.querySelector('#evolutionInterface').style.display = 'none'
            interfaceDom.style.display = 'grid'
            dialogueDom.textContent = `Change one of ${switchUnderScoreForSpace(ally.nickname)}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
          })
        } else {
          learntMove = newMoves[i]
          learnMoveMenu(false)
          learnMoveMenu(type, true, ally)
          document.querySelector('#evolutionInterface').style.display = 'none'
          interfaceDom.style.display = 'grid'
          dialogueDom.textContent = `Change one of ${switchUnderScoreForSpace(ally.nickname)}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
        }
      } else {
        selectedQueue.push(() => ally.dialogue(type, `${switchUnderScoreForSpace(ally.nickname)} is trying to learn ${switchUnderScoreForSpace(newMoves[i].name)}!`))
        selectedQueue.push(() =>{
          learntMove = newMoves[i]
          learnMoveMenu(false)
          learnMoveMenu(type, true, ally)
          document.querySelector('#evolutionInterface').style.display = 'none'
          interfaceDom.style.display = 'grid'
          dialogueDom.textContent = `Change one of ${switchUnderScoreForSpace(ally.nickname)}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
        })
      }
    }
  }
}

function manageEvolution(evoArr){
  queue.push(() => {
    manageBattleState(false, 'evo', false)
    setTimeout(() =>{
      manageEvolutionState(true, evoArr)
    }, 410)
  })
}

let lvlBeforeExpGained

export const levelCapObj = {
  level: 15
}

async function loadLevelCap(){
 const data = await loadData('saveFile')
 
 if(data != null) levelCapObj.level = parseInt(data.levelCap)

 console.log(levelCapObj.level)
}

loadLevelCap()

function enemyTeamWiped(enemyTrainerInfo){
  let teamFainted = true
  if(enemyTrainerInfo == undefined) return

  for(let i = 0; i < enemyTrainerInfo.team.length; i++){
    if(enemyTrainerInfo.createdTrainer != undefined){
      if(enemyTrainerInfo.createdTrainer.team[i].fainted == false) teamFainted = false
    } else {
      teamFainted = true
    }
  }

  return teamFainted
}

function pickRandomPogemonOtherThanLast(type){

  if(type == undefined){
    let lastPogemon = foe
  
    while(lastPogemon.id == foe.id){
      let rng = Math.floor(Math.random() * enemyTrainerInfo.createdTrainer.team.length)
      foe = enemyTrainerInfo.createdTrainer.team[rng]
    }
  } else {
    for(let i = 0; i < enemyTrainerInfo.createdTrainer.team.length; i++){{
      if(!enemyTrainerInfo.createdTrainer.team[i].fainted){
        foe = enemyTrainerInfo.createdTrainer.team[i]
        break
      }
    }}
  }


}

function switchEnemyAfterFaint(type){
  if(enemyTrainerInfo == undefined) return

  let currTrainer = enemyTrainerInfo.createdTrainer


  if(type == 'move'){
    pickRandomPogemonOtherThanLast(enemyTrainerInfo.difficulty)
  } else for(let i = 0; i < currTrainer.team.length; i++){
    if(currTrainer.team[i].fainted === false){
      foe = currTrainer.team[i]
      break
    }
  }

  document.querySelector('#movesBox').replaceChildren()

  for(let i = 0; i < ally.moves.length; i++){
    const newAttackBox = document.createElement('div')
    newAttackBox.setAttribute('class', 'movesButton')
    newAttackBox.innerText = `${switchUnderScoreForSpace(ally.moves[i].name)}`

    newAttackBox.addEventListener('mouseover', e => movesHoverEvent(e, ally, battleType))
    newAttackBox.addEventListener('mouseout', e => movesAwayEvent())

    newAttackBox.addEventListener('click', e => attackMove(e))

    document.querySelector('#movesBox').appendChild(newAttackBox)
  }

  enemyTrainerInfo.createdTrainer.team[0].dialogue('battle', `${enemyTrainerInfo.name} is sending out ${switchUnderScoreForSpace(foe.name)}.`)
  enemyTrainerInfo.createdTrainer.team[0].hpManagement(foe, '#foeHealthBar', document.querySelector('#foeHp'))
  enemyTrainerInfo.createdTrainer.team[0].setCorrectHold()

  // moveSwitchEvent.foe = false

  if(foe.abilityInfo.ability.name == 'frisk'){

    let itemName
    if(ally.heldItem == null) itemName = 'nothing'
    if(ally.heldItem != null) itemName = `a ${switchUnderScoreForSpace(ally.heldItem.name)}`

    setTimeout(() => foe.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${switchUnderScoreForSpace(foe.nickname)} frisked ${itemName}.`),500)
  }

  foe.opacity = 1
  foe.position = {
    x: 1415,
    y: 50
  }

  foe.choiceItem = {
    type : null,
    move : null
  }

  setBattlersInfo()

  if(foe.isShiny) foe.img.src = foe.pogemon.sprites.shiny.frontSprite
  else foe.img.src = foe.pogemon.sprites.classic.frontSprite

  renderedSprites.splice(0, 1, foe)
  foe.setCorrectHold()

  resetStats('foe')

  battlerArr = [ally]
  lvlUpArr = []

  foe.hpManagement()
  
  // maybe ask if want to switch before next pogemon comes out?

  onEnterTerrainAffliction('foe', foe, ally)

  // check for sticky webs

  // check for stealth rocks

  setTimeout(() =>{
    gsap.to(foe, {
      opacity: 1,
      duration: 0.5,
    })
  }, 1250)
}

export let evoArr = []

export function addToEvoArr(battler){
  let pass = false

  if(battler.evo == null) return


  if(battler.name == 'slimie'){
    battler.evo.forEach(evo =>{

      if(evo != 'black_Sludge') if(battler.heldItem.name != 'black_Sludge') if(battler.lvl > prevLvl) pass = false
    })
  }  else {
    if(battler.evo.type !== 'lvl') return
    console.log(battler.lvl)
    console.log(battler.pogemon.evo.lvl)
    if(battler.lvl >= battler.pogemon.evo.lvl){
      if(evoArr.length == 0) {
        if(battler.name == 'skopt') {
          if(currMap.name == 'neo_Genesis') evoArr.push(battler)
        } else evoArr.push(battler)
        
        console.log('evo check')

        pass = false
      } else {
        for(let i = 0; i < evoArr.length; i++){
          if(evoArr[i].id == battler.id) {
            pass = false
          }
        }
      }
    }
  }
  
  if(pass) {
    console.log(battler)
    if(battler.name == 'skopt') {
      if(currMap.name == 'neo_Genesis') evoArr.push(battler)
    } else evoArr.push(battler)

    console.log('evo check')
  }
}

let lvlUpArr = []
let queueBeforeLevelUp
let prevLvl

//manage enemy faint
function manageFaintingEvent(target){
  let oldStats = ally.stats
  prevLvl = ally.lvl
  queueFaintTrigger.initiated = false
  
  for(let i = 0; i < battlerArr.length; i++){
    if(battlerArr[i].name == ally.name) {
      battlerArr.unshift(battlerArr.splice(i, 1)[0])
    }
  }

  if(battleType == 'trainer'){
    console.log(enemyTrainerInfo)
    if(enemyTrainerInfo.createdTrainer != undefined){
      for(let i = 0; i < enemyTrainerInfo.createdTrainer.team.length; i++){

        const node = document.querySelectorAll('.foeTeamShowcaseIndividual')[i]
        const pogemon = enemyTrainerInfo.createdTrainer.team[i]

        console.log(node)
    
        if(pogemon == undefined) node.childNodes[1].style.filter = 'brightness(0%)'
        else {
          if(pogemon.fainted) if(node.childNodes[1].src == 'http://localhost:3000/img/item_scene/items/ball/pogeball.png'){
            node.childNodes[1].style.filter = 'brightness(20%)'
          }
        }
      }
    }
  }

  battlerArr.forEach((battler, i) =>{
    prevLvl = ally.lvl

    if(battler.fainted) return

    if(battlerArr.length == 1) {
      oldStats = {...battler.stats}

      battler.expGain(target, battleType, battlerArr, true, levelCapObj.level)
      console.log(levelCapObj.level)

      // vvv checking if can add to evoArr in there vvv

      addToEvoArr(battler)
      
      if(battler.lvl > prevLvl) {
        lvlUpArr.push(battler)
        manageLvlUpDisplay('battle', oldStats, queue, prevLvl, battler)
        manageLearnedMoves(battler, queue, 'battle')
      }

      // console.log(enemyTeamWiped(enemyTrainerInfo))

      if(enemyTeamWiped(enemyTrainerInfo)){
        if(ally.pogemon.evo == null) {
          queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
          player.money = player.money + enemyTrainerInfo.reward
          queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
          queue.push(() => {
            manageBattleState(false)
            console.log('here')
          })
          return
        }

        if(ally.pogemon.evo.lvl <= ally.lvl) if(prevLvl < ally.lvl) {
          queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
          player.money = player.money + enemyTrainerInfo.reward
          queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
          manageEvolution(evoArr)
          return
        }

        queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
        player.money = player.money + enemyTrainerInfo.reward
        queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
        queue.push(() => {
          manageBattleState(false)
          console.log('here')
        })

        return
      } else {
        queue.push(() => switchEnemyAfterFaint())
      }
    } else {
      if(i == battlerArr.length - 1) {
        queue.push(() =>{
          prevLvl = battler.lvl
          // last index
          // fires too early sometimes
          // battler.expGain(target, battleType, battlerArr, true)
          oldStats = {...battler.stats}

          battler.expGain(target, battleType, battlerArr, true, levelCapObj.level)
          console.log(levelCapObj.level)

          battler.teamExpEvent(queue, prevLvl, queueProcess)
          addToEvoArr(battler)
          // HEHEHEHEHEHE

          if(battler.lvl > prevLvl) {
            lvlUpArr.push(battler)
            manageLvlUpDisplay('battle', oldStats, queue, prevLvl, battler)
            manageLearnedMoves(battler, queue, 'battle')
          }
  
          // if(enemyTrainerInfo == undefined) {
          //   queueFaintTrigger.initiated = true

          //   if(ally.pogemon.evo == null) {
          //     queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
          //     queue.push(() => manageBattleState(false))
          //     return
          //   }
      
          //   if(ally.pogemon.evo.lvl <= ally.lvl) {
          //     queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
          //     manageEvolution(evoArr)
          //   } else {
          //     queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
          //     queue.push(() => manageBattleState(false))
          //   }
          //   return
          // }
  
          if(!enemyTeamWiped(enemyTrainerInfo)) {
            queue.push(() => {
              switchEnemyAfterFaint()
            })
          } else {
            if(ally.pogemon.evo == null) {
              queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
              player.money = player.money + enemyTrainerInfo.reward
              queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
              queue.push(() => {
                manageBattleState(false)
                console.log('here')
              })
              return
            }
        
            if(ally.pogemon.evo.lvl <= ally.lvl) if(prevLvl < ally.lvl) {
              queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
              player.money = player.money + enemyTrainerInfo.reward
              queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
              manageEvolution(evoArr)
            } else {
              queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
              player.money = player.money + enemyTrainerInfo.reward
              queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
              queue.push(() => {
                manageBattleState(false)
                console.log('here')
              })
            }
            return
          }
        })
        return
      } else {
        prevLvl = battler.lvl
        oldStats = battler.stats

        if(i == 0) {
          oldStats = {...battler.stats}

          battler.expGain(target, battleType, battlerArr, true, levelCapObj.level)
          console.log(levelCapObj.level)
          addToEvoArr(battler)

          if(battler.lvl > prevLvl) {
            lvlUpArr.push(battler)
            manageLvlUpDisplay('battle', oldStats, queue, prevLvl, battler)
            manageLearnedMoves(battler, queue, 'battle')
          }
        } else {
          queue.push(() => {
            prevLvl = battler.lvl
            oldStats = {...battler.stats}

            battler.expGain(target, battleType, battlerArr, true, levelCapObj.level)
            console.log(levelCapObj.level)
            addToEvoArr(battler)
          })

          battler.teamExpEvent(queue, prevLvl, queueProcess)

          queue.push(() => {
            if(battler.lvl > prevLvl) {
              lvlUpArr.push(battler)
              manageLvlUpDisplay('battle', oldStats, queue, prevLvl, battler)
              manageLearnedMoves(battler, queue, 'battle')
            }
          })

          queue.push(() =>{
            if(battler.lvl > prevLvl) {
              if(queue.length < 8) {
                queue.push(queue.splice(1,1)[0])
              } else {
                queue.splice(1, queueBeforeLevelUp.length - 2).forEach(func =>{
                  queue.push(func)
                })
              }
            }
          })
        }
      }
    }

    if(enemyTrainerInfo == undefined){
      if(ally.name != battlerArr[battlerArr.length - 1].name) return
      oldStats = {...battler.stats}
  
      if(lvlBeforeExpGained < ally.lvl) {
        if(ally.pogemon.evo == null) {
          queue.push(() => {
            manageBattleState(false)
            console.log('here')
          })
          return
        }
  
        if(evoArr.length > 0) {
          queue.push(() => ally.dialogue('battle', `${switchUnderScoreForSpace(foe.nickname)} has been defeated.`))
          manageEvolution(evoArr)
        } else {
          queue.push(() => ally.dialogue('battle', `${switchUnderScoreForSpace(foe.nickname)} has been defeated.`))
          queue.push(() => {
            manageBattleState(false)
            console.log('here')
          })
        }
      } else {
        if(battlerArr[battlerArr.length - 1].lvl > prevLvl) {
          //something not right here
          manageLvlUpDisplay('battle', oldStats, queue, prevLvl, battlerArr[battlerArr.length - 1])
          manageLearnedMoves(battlerArr[battlerArr.length - 1], queue, 'battle')
        }

        queue.push(() => ally.dialogue('battle', `${switchUnderScoreForSpace(foe.nickname)} has been defeated.`))
        queue.push(() => {
          manageBattleState(false)
          console.log('here')
        })
      }
      return
    }
  
    if(lvlBeforeExpGained < ally.lvl) {
      oldStats = {...battler.stats}
  
      if(enemyTeamWiped(enemyTrainerInfo)){
        if(ally.pogemon.evo == null) {
          queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
          player.money = player.money + enemyTrainerInfo.reward
          queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
          queue.push(() => {
            manageBattleState(false)
            console.log('here')
          })
          return
        }
  
        if(evoArr.length > 0) {
          queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
          player.money = player.money + enemyTrainerInfo.reward
          queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
          manageEvolution(evoArr)
        } else {
          queue.push(() => ally.dialogue('battle', `You have defeated ${enemyTrainerInfo.name}!`))
          player.money = player.money + enemyTrainerInfo.reward
          queue.push(() => ally.dialogue('battle', `You gained ${enemyTrainerInfo.reward} pogebucks!`))
          queue.push(() => {
            manageBattleState(false)
            console.log('here')
          })
        }
        return
      }
  
      //if enemy team isint wiped, switch for next 'mon in foe.team arr
      return
    }
  })
}

function checkIfTeamWipedOut(){
  let wiped = true

  player.team.forEach(pogemon =>{
    if(!pogemon.fainted) wiped = false
  })

  return wiped
}

export let faintedTriggered = {active: false}

let moves = {ally: null, foe: null}

let inBattleCharacters = {ally: null, foe: null}

function faintEvent(target){
  inBattleCharacters.ally = ally
  inBattleCharacters.foe = foe

  target.useBattleItem(queueProcess, queue, faintEvent, fasterHpBeforeMove, slowerHpBeforeMove, moves, inBattleCharacters, renderedSprites, critLanded, terrainConditions, queueFaintTrigger, manageWeatherState, foeRNGMove)
  if(target.hp > 0) return

  // commenting out this queue.push might break things

  if(target.isEnemy){
    if(target.fainted) return

    queueProcess.disabled = true
    console.log('there')

    setTimeout(() =>{
      queue.length = 0

      setTimeout(() =>{
        target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} fainted!`)
        target.faint(queueFaintTrigger)
  
        manageFaintingEvent(target)
  
        setTimeout(() =>{
          queueProcess.disabled = false
          console.log('here')
        }, 750)
      }, 250)
    }, 1250)
  } else {
    queue.push(() =>{
      if(target.fainted) return
      target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} fainted!`)
      target.faint(queueFaintTrigger)
  
      setTimeout(() =>{
        queueProcess.disabled = false
      }, 750)
  
      queue.push(() => {
        if(checkIfTeamWipedOut()){
          document.querySelector('#allyStatus').style.backgroundColor = 'transparent'
          document.querySelector('#overlapping').textContent = 'Git Gud'
          gsap.to('#overlapping', {
            opacity: 1,
          })
          //here
          document.querySelector('#overlapping').addEventListener('click', spendQueue)
          document.querySelector('#overlapping').style.cursor = 'pointer'
          document.querySelector('#overlapping').style.pointerEvents = 'auto'
          queue.push(() =>{
            location.reload()
          })
        } else {
          if(!target.fainted) return
          faintedTriggered.active = true
          manageBattleState(false, 'team', {active : true})
          console.log('here')
        }
      })
    })
  }

}

// pogemon status turn event
function manageCheckStatusEvent(faster, slower){
  // if foe is faster, check for it's status before ally's
  if(faster.isEnemy){
    faster.checkStatus('#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, queueProcess, faintEvent, slower, ['#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, queueProcess, faintEvent], false, terrainConditions, manageWeatherState, faintSwitch)
    console.log('checkStatus')
    return
  }
  
  // if ally is faster, check for it's status before foe's
  faster.checkStatus('#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, queueProcess, faintEvent, slower, ['#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, queueProcess, faintEvent], false, terrainConditions, manageWeatherState, faintSwitch)
  console.log('checkStatus')
}

function checkIfFainted(target){
  if(target.hp <= 0){
    // queue.push(() =>{
      // if(!target.hp <= 0 || !target.fainted) {
      //   queue.splice(1, 1)
      //   return
      // }
      
      // audioObj.music.battle.stop()
      // audioObj.SFX.faint.play()
      // target.dialogue('battle', `${target.name} fainted!`)
      // target.faint(queueFaintTrigger)
      faintEvent(target)
      console.log('faintEvent')
      // if(battleType != 'trainer'){
      //   let placeHolder = queue[1]
      //   queue[1] = queue[2]
      //   queue[2] = placeHolder
      //   queue.pop()
      // }
    // })
  }
}

const terrainConditions = {
  turns:{
    etc: {
      trick_room: {
        active: false,
        element: 'psychic',
        color: typesObj['psychic'].color
      },
      ally_reflect: {
        active: false,
        element: 'psychic',
        color: typesObj['psychic'].color
      },
      ally_light_screen: {
        active: false,
        element: 'psychic',
        color: typesObj['psychic'].color
      },
      foe_reflect: {
        active: false,
        element: 'psychic',
        color: typesObj['psychic'].color
      },
      foe_light_screen: {
        active: false,
        element: 'psychic',
        color: typesObj['psychic'].color
      },
    },
    weather: {
      sun: {
        active: false,
        element: 'fire',
        resistance: 'water',
        color: typesObj['fire'].color
      },
      rain: {
        active: false,
        element: 'water',
        resistance: 'fire',
        color: typesObj['water'].color
      },
      snow: {
        active: false,
        element: 'ice',
        color: typesObj['ice'].color
      },
      sand: {
        active: false,
        element: 'rock',
        color: typesObj['rock'].color
      },
    },
  },
  static:{
    sticky_web:{
      active: {
        ally: false,
        foe: false
      },
      element: 'bug',
    },
    stealth_rock:{
      active: {
        ally: false,
        foe: false
      },
      element: 'rock',
    }
  },
  weatherSpent: false,

}

function attackLanded(odds, move){
  let accRNG

  if(typeof odds == 'string') return true

  if(move != undefined) if(move.rain != undefined) {
    if(terrainConditions.turns.weather.rain.active) return true
    else if(
      terrainConditions.turns.weather.sun.active ||
      terrainConditions.turns.weather.snow.active ||
      terrainConditions.turns.weather.sand.active
    ) accRNG = accRNG / 2
  }

  if(move != undefined) if(move.snow != undefined) {
    if(terrainConditions.turns.weather.snow.active) return true
    else if(
      terrainConditions.turns.weather.sun.active ||
      terrainConditions.turns.weather.rain.active ||
      terrainConditions.turns.weather.sand.active
    ) accRNG = accRNG / 2
  }

  accRNG = Math.floor(Math.random() * 100)

  if(ally.abilityInfo.ability.name == 'no_Guard') return true
  if(foe.abilityInfo.ability.name == 'no_Guard') return true
  if(accRNG <= odds) return true
}

let fasterHpBeforeMove
let slowerHpBeforeMove

let paraState = {foe: false, ally: false}
let slpState = {foe: false, ally: false}
let confusionProcess = {ally: false, foe: false}
let afflictionState = {ally: false, foe: false}
let playerMove

let fasterCheck = false
let slowerCheck = false

let justWokeUp = {
  ally: false,
  foe: false
}

let doublePass = false

function afflictionsEvent(target, targetMove, recipient, check, flinched, statusIcon, catchEvent, faster, slower){
  // if(true) return
  if(target.isEnemy) afflictionState.foe = true
  else afflictionState.ally = true

  let doubleConfuse = false
  let doubleFoeConfusedAttack = false

  fasterCheck = false
  slowerCheck = false
  confusionProcess.foe = false
  confusionProcess.ally = false

  let targetParaState

  if(target.isEnemy) {
    targetParaState = paraState.foe
    confusionProcess.foe = false
  } else {
    targetParaState = paraState.ally
    confusionProcess.ally = false
  }

  function confusionAttack(catchEvent){
    // queue.length = 0
    if(target.isEnemy) confusionProcess.foe = true
    else confusionProcess.ally = true
    console.log('confuse check now')

    queueProcess.disabled = true
    console.log('there')

    if(check == 'fasterCheck') fasterCheck = true
    else slowerCheck = true

    target.statusEffectAnimation('confusion', renderedSprites, queueProcess, confusionProcess)
    target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} is confused...`)

    target.affliction[0].turns--

    setTimeout(() =>{
      console.log('????')
      queueProcess.disabled = true
      if(target.affliction[0].turns == 0){
        target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} snapped out of confusion!`)
        if(target.isEnemy) {
          confusionProcess.foe = false
          document.querySelector('#foeConfused').style.opacity = 0
        }
        else {
          confusionProcess.ally = false
          document.querySelector('#allyConfused').style.opacity = 0
        }

        target.affliction[0].active = false

        setTimeout(() =>{
          // queueProcess.disabled = true
          // console.log('here')

          statusEvent(target, targetMove, recipient, statusIcon, false, faster, slower)
          console.log(`status event`)
          if(battleType != 'trainer') if(target.hp <= 0){
            faintEvent(target)
            console.log('faintEvent')
            return
          }

          // manageCheckStatusEvent(faster, slower)
          // console.log('manageCheckStatusEvent')

          setTimeout(() =>{
            queueProcess.disabled = false
          }, 1250)
        }, 1250)
        return
      }

      if(attackLanded(25)) {
        // console.log('confused')
        queueProcess.disabled = true
        // console.log('there')
        if(target.isEnemy) confusionProcess.foe = true
        else confusionProcess.ally = true

        if(!doubleConfuse) target.miss('confusion', renderedSprites, queueProcess)

        doubleConfuse = true

        console.log('confuse check now')

        if(battleType != 'trainer') if(target.hp <= 0) faintEvent(target)
        
        console.log('faintEvent')

        // console.log('YAYA')
      } else {
        // console.log('not confused')

        // console.log(`status event`)
        if(battleType != 'trainer') if(target.hp <= 0) faintEvent(target)
        
        console.log('faintEvent')

        // check para and sleep here
        let recipientMove

        if(target.isEnemy) recipientMove = allyMove
        else recipientMove = foeRNGMove

        if(target.status.name != 'para' || target.status.name != 'slp') {
          target.move({move: targetMove, recipient, recipientMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
          console.log('YAYA')
        }
      }

      // console.log(target.id)
      // console.log(slower.id)

      teamEvent.switch = false
      teamEvent.previousScene = null

      if(target.id == slower.id){

        if(target.status.name == 'para' || target.status.name == 'slp') return

        if(faster.affliction[0].active){
          console.log('attack here')
          // afflictionsEvent(recipient, RNGMove, target, check, flinched, statusIcon)
          // recipient.move({move: RNGMove, target, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
          return
        }

        manageCheckStatusEvent(faster, slower)
        console.log('manageCheckStatusEvent')
        // console.log(faster.status.name != null && terrainConditions.turns.etc.trick_room.active)

        if(faster.status.name != null && terrainConditions.turns.etc.trick_room.active){
          // if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
          // else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
          // console.log('endOfTurnTerrainManagement')
          return
        }

        // target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
        // console.log('endOfTurnTerrainManagement')
      } else if(recipient.id == slower.id) {
        if(doublePass == true) return
        // let RNG = Math.floor(Math.random() * recipient.moves.length)
        // let RNGMove = recipient.moves[RNG]
        
        console.log('YAYA')
        if(!recipient.affliction[0].active || recipient.status.name != 'para' || recipient.status.name != 'slp') {
          if(catchEvent == false) if(!doubleFoeConfusedAttack) queue.push(() => {
            let recipientMove
            let targetMove

            if(recipient.isEnemy) {
              recipientMove = foeRNGMove
              targetMove = allyMove
            } else {
              recipientMove = allyMove
              targetMove = foeRNGMove
            }

            recipient.move({move: recipientMove, recipient: target, recipientMove: targetMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo}) 
            console.log('YAYA')
            // target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
            // console.log('endOfTurnTerrainManagement')
          })
          doubleFoeConfusedAttack = true
        } else {
          if(doublePass == true) return
          doublePass = true

          if(!recipient.affliction[0].active){
            if(teamEvent.switch) queue.push(() => afflictionsEvent(recipient, playerMove, target, check, flinched, statusIcon, catchEvent, faster, slower))
            else afflictionsEvent(recipient, playerMove, target, check, flinched, statusIcon, catchEvent, faster, slower)
            console.log('afflictionsEvent')
          }

          // target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
          // console.log('endOfTurnTerrainManagement')
        }
      }

      // console.log('terrain management')

      setTimeout(() =>{
        queueProcess.disabled = false
        doublePass = false
      }, 1250)
    }, 1250)
  }

  // if(target.status.name == 'para') {
  //   // statusEvent(target, targetMove, recipient, statusIcon)
  //   // console.log('statusEvent')

  //   console.log(targetParaState)

  //   // if(targetParaState) {
  //   //   console.log('now')
  //   //   // if(target.isEnemy) {if(confusionProcess.foe) return}
  //   //   // else if(target.isEnemy) if(confusionProcess.ally) return
  //   //   queueProcess.disabled = true
  //   //   console.log('there')

  //   //   target.miss('para', renderedSprites, queueProcess)
  //   //   console.log('?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????')

  //   //   setTimeout(() =>{
  //   //     queueProcess.disabled = false
  //   //     console.log('here')
  //   //   }, 1250)

  //   //   // let queuePlaceHolder = queue[0]
  //   //   // queue[0] = queue[1]
  //   //   // queue[1] = queuePlaceHolder
  //   //   return
  //   // } else {
  //   //   if(!target.affliction[0].active){
  //   //     if(attackLanded(targetMove.acc)) {
  //   //       moveProcess = true
  //   //       target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
  //   //       console.log('YAYA')
  //   //     } else {
  //   //       if(target.hp <= 0) return
  //   //       target.miss('missed', renderedSprites, queueProcess)
  //   //     }
  //   //   return
  //   //   } else confusionAttack()
  //   // }
  // } else if (target.status.name == 'slp') {
  //     // if(!target.affliction[0].active) statusEvent(target, targetMove, recipient, statusIcon)
  //     // console.log('statusEvent')

  //     // if(target.status.turns <= 2) {
  //     //   if(attackLanded(75)) {
  //     //     target.miss('slp', renderedSprites, queueProcess)
  //     //     return
  //     //   } else {
  //     //     target.dialogue('battle', `${target.name} woke up!`)
  //     //     target.status.name = null
  //     //     target.status.turns = 0
  //     //     statusIcon.style.display = 'none'
  //     //     if(attackLanded(targetMove.acc)) {
  //     //       moveProcess = true

  //     //       setTimeout(() =>{
  //     //         target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
  //     //         console.log('YAYA')
  //     //       }, 1250)
  //     //     } else {
  //     //       if(target.hp <= 0) return
  //     //       queue.push(() => target.miss('missed', renderedSprites, queueProcess))
  //     //     } 
  //     //     return
  //     //   }
  //     // } else {
  //     //   target.dialogue('battle', `${target.name} woke up!`)
  //     //   target.status.name = null
  //     //   target.status.turns = 0
  //     //   statusIcon.style.display = 'none'
  //     //   if(attackLanded(targetMove.acc)) {
  //     //     moveProcess = true
              
  //     //     setTimeout(() =>{
  //     //       target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
  //     //       console.log('YAYA')
  //     //     }, 1250)
  //     //   } else {
  //     //     if(target.hp <= 0) return
  //     //     queue.push(() => target.miss('missed', renderedSprites, queueProcess))
  //     //   } 
  //     // }
  // }

  if(target.isEnemy) justWokeUp.foe = false
  else justWokeUp.ally = false
  
  if(target.affliction[0].active) {
    if(target.flinched) return
    // if(justWokeUp) setTimeout(() => confusionAttack(), 750)
    // else 
    console.log('confusionAttack')
    confusionAttack(catchEvent)

    return
  } 
}

let slowerDontPass = false

export const moveSwitchEvent = {
  ally: false,
  foe: false
}

function screenDisplayManagement(type, isEnemy, screenType, turns){
  let indicatorContainer
  let turnIndicator
  let top
  let opacity

  const indicatorArr = []

  if(type){
    opacity = 1
    top = 0

    const typeArr = []

    if(isEnemy){
      document.querySelector('#foeScreenContainer').style.opacity = 1

      if(screenType == 'reflect') {
        indicatorContainer = document.querySelector('#foeReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#foeReflectTurnIndicator')
        typeArr.push(turnIndicator)

      } else if (screenType == 'light_screen') {
        indicatorContainer = document.querySelector('#foeLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#foeLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      }
    } else {
      document.querySelector('#allyScreenContainer').style.opacity = 1

      if(screenType == 'reflect') {
        indicatorContainer = document.querySelector('#allyReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#allyReflectTurnIndicator')
        typeArr.push(turnIndicator)
      } else if (screenType == 'light_screen') {
        indicatorContainer = document.querySelector('#allyLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#allyLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      }
    }

    indicatorArr.push(typeArr)
  } else {
    opacity = 0

    if(isEnemy){
      top = -78

      const typeArr = []

      if(screenType == 'reflect') {
        indicatorContainer = document.querySelector('#foeReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#foeReflectTurnIndicator')
        typeArr.push(turnIndicator)
      } else if (screenType == 'light_screen') {
        indicatorContainer = document.querySelector('#foeLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)
        
        turnIndicator = document.querySelector('#foeLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      } else {
        indicatorContainer = document.querySelector('#foeReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#foeReflectTurnIndicator')
        typeArr.push(turnIndicator)

        indicatorArr.push(typeArr)

        indicatorContainer = document.querySelector('#foeLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)
        
        turnIndicator = document.querySelector('#foeLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      }

      indicatorArr.push(typeArr)
    } else {
      top = 84

      const typeArr = []

      if(screenType == 'reflect') {
        indicatorContainer = document.querySelector('#allyReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#allyReflectTurnIndicator')
        typeArr.push(turnIndicator)
      } else if (screenType == 'light_screen') {
        indicatorContainer = document.querySelector('#allyLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#allyLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      } else {
        indicatorContainer = document.querySelector('#allyReflectIndicatorContainer')
        typeArr.push(indicatorContainer)

        turnIndicator = document.querySelector('#allyReflectTurnIndicator')
        typeArr.push(turnIndicator)

        indicatorArr.push(typeArr)

        indicatorContainer = document.querySelector('#allyLightScreenIndicatorContainer')
        typeArr.push(indicatorContainer)
        
        turnIndicator = document.querySelector('#allyLightScreenTurnIndicator')
        typeArr.push(turnIndicator)
      }

      indicatorArr.push(typeArr)
    }
  }
  
  for(let i = 0; i < indicatorArr.length; i++){
    if(indicatorArr[i] == []) continue

    indicatorArr[i][0].style.top = top
    indicatorArr[i][0].style.opacity = opacity
    indicatorArr[i][1].innerText = turns

    gsap.to(indicatorArr[i][0], {
      opacity,
      duration: 1
    })
  }
}

function statusEvent(target, targetMove, recipient, statusIcon, catchEvent, faster, slower){

  // if(target.affliction[2].active) return

  let confusionCheck = false

  // console.log(target.name)

  function lastMoveStatusEvent(){
    // console.log(target.id)
    // console.log(slower.id)
    if(target.id == slower.id){
      console.log('manageCheckStatusEvent')
      manageCheckStatusEvent(faster, slower)
      console.log(faster.status.name)
      // console.log(faster.status.name != null && terrainConditions.turns.etc.trick_room.active)
      if(terrainConditions.turns.etc.trick_room.active){
        if(faster.status.name != null && slower.status == null){
          console.log('trickroom + status special event weather trigger')
          if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
          else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
          console.log('endOfTurnTerrainManagement')
        }
      } else {
        if(faster.status.name != null && slower.status == null){
          console.log('status special event weather trigger')
          // if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
          // else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
        }
      }
    }
  }

  function normalMoveEvent() {
    if(target.isEnemy && targetMove == undefined) targetMove = foeRNGMove
    if(attackLanded(targetMove.acc, targetMove)) {
      moveProcess = true

      if(confusionCheck) {
        // target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState})
        // console.log('confusion check')
        return
      }

      // vvvvvvvvvv HERE IS NORMAL MOVE vvvvvvvv
      // if(target.status.name == 'para') return.
      // if(target.status.name == 'slp') return
      
      // if(recipient.status.name == 'para') return
      // if(recipient.status.name == 'slp') return

      // vv why tf do i have to do this?????? vv
      if(target.flinched) {
        if(target.hp <= 0) return
        if(faster.id != target.id) target.miss('flinched', renderedSprites, queueProcess, recipient)
        else target.flinched = false
        return
      }

      let recipientMove
      let targetMove

      console.log(allyMove)
      console.log(foeRNGMove)

      if(!recipient.isEnemy) {
        recipientMove = allyMove
        targetMove = foeRNGMove

        console.log(targetMove)
      } else {
        recipientMove = foeRNGMove
        targetMove = allyMove

        console.log(targetMove)
      }

      if(targetMove.name == 'dream_eater' && recipient.status.name != 'slp') {
        target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} used ${switchUnderScoreForSpace(targetMove.name)}!\n\n${recipient.name} isin't asleep, so the move failed..`)
        return
      }

      if(target.id == foe.id && moveSwitchEvent.foe) {
        queueProcess.disabled = false
        console.log('here')
        return
      }

      console.log(target.status.name)
      if(target.status.name == 'slp') return

      target.move({move: targetMove, recipient, recipientMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
      // console.log('YAYA')
    } else {
      if(target.hp <= 0) return
      target.miss('missed', renderedSprites, queueProcess)
    }
  }

  target.affliction.forEach(affliction =>{
    if(affliction.name == 'confusion') if(affliction.active) confusionCheck = true
  })

  let timer = 1
  if(confusionCheck) timer = 1250 

  let pass = true

  if(target.affliction[0].active) pass = false

  // console.log(confusionProcess.foe)
  // console.log(confusionProcess.ally)

  paraState.foe = false
  paraState.ally = false

  slpState.foe = false
  slpState.ally = false

  let check = 'slowerCheck'
  
  // console.log(faster)

  if(target.id == faster.id) {
    check = 'fasterCheck'
  }

  let skipLastAttack = false

  // if(pass){
    if(target.status.name == 'para') {
      skipLastAttack = true
      // console.log('now 2')
      if(attackLanded(25)) {
        if(target.isEnemy) {
          paraState.foe = true
        } else if(target.isEnemy) {
          paraState.ally = true
        }
        target.miss('para', renderedSprites, queueProcess)

        queueProcess.disabled = true
        console.log('there')

        // setTimeout(() => queue.push(() => {
        //   recipient.move({move: playerMove, recipient: target, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent}) 
          
        //   queueProcess.disabled = false
        //   console.log('here')
        // }), 200)

      } else {
        if(target.affliction[0].active){
          console.log('afflictionEvent')
          afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower) 
          // console.log('NWONWOWNOWNONWOONWONWONWNOW')
        } else if(attackLanded(targetMove.acc)) {
          moveProcess = true

          let recipientMove
          let targetMove
    
          if(recipient.isEnemy) {
            recipientMove = foeRNGMove
            targetMove = allyMove
          } else {
            recipientMove = allyMove
            targetMove = foeRNGMove
          }

          target.move({move: targetMove, recipient, recipientMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo}) 
          console.log('YAYA')
        } else {
          if(target.hp <= 0) return
          target.miss('missed', renderedSprites, queueProcess)
        }
      }

      manageCheckStatusEvent(faster, slower)
      console.log('manageCheckStatusEvent')
      return
    } else if(target.status.name == 'slp'){
      // console.log(target.status)
      if(target.status.turns <= 2) {
        console.log('sleep')
        if(attackLanded(75)) {
          if(target.isEnemy) {
            slpState.foe = true
          } else if(target.isEnemy) {
            slpState.ally = true
          }
          skipLastAttack = true
          console.log('sleep 2')
          target.miss('slp', renderedSprites, queueProcess)

          let recipientMove
          let targetMove
    
          if(recipient.isEnemy) {
            recipientMove = foeRNGMove
            targetMove = allyMove
          } else {
            recipientMove = allyMove
            targetMove = foeRNGMove
          }

          // if(!teamEvent.switch) queue.push(() => {
          //   recipient.move({move: recipientMove, recipient: target, recipientMove: targetMove, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
          //   console.log('YAYA')
          // })
        } else {
          queueProcess.disabled = true
          console.log('there')

          console.log('wakeup')
          setTimeout(() => target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} woke up!`), 50)

          if(target.isEnemy) justWokeUp.foe = true
          else justWokeUp.ally = true

          setTimeout(() =>{
            target.status.name = null
            target.status.turns = 0
          }, 50)

          statusIcon.style.display = 'none'

          if(target.affliction[0].active){
            console.log('afflictionEvent')
            skipLastAttack = true
            
            queue.disabled = true
            console.log('there')
            setTimeout(() => {
              afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower)
              console.log('afflictionEvent')

              setTimeout(() => {
                queue.disabled = false
                console.log('here')
              }, 2000)
            })
            // queue.push(() => afflictionsEvent(target, targetMove, recipient, check, false, statusIcon))
            // console.log('NWONWOWNOWNONWOONWONWONWNOW')
          } else if(attackLanded(targetMove.acc)) {
            moveProcess = true

            let recipientMove
            let targetMove
      
            if(recipient.isEnemy) {
              recipientMove = foeRNGMove
              targetMove = allyMove
            } else {
              recipientMove = allyMove
              targetMove = foeRNGMove
            }

            // setTimeout(() =>{
            //   target.move({move: targetMove, recipient, recipientMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
            //   console.log('YAYA')
            // }, 1250)
          } else {
            if(target.hp > 0) queue.push(() => target.miss('missed', renderedSprites, queueProcess))
          } 
        }
      } else {
        console.log('forced wakeup')
        setTimeout(() => target.dialogue('battle', `${switchUnderScoreForSpace(target.nickname)} woke up!`), 50)
        console.log('does wake up happen?')

        if(target.isEnemy) justWokeUp.foe = true
        else justWokeUp.ally = true
        
        skipLastAttack = true
        target.status.name = null
        target.status.turns = 0
        statusIcon.style.display = 'none'

        if(target.affliction[0].active){
          console.log('afflictionEvent')
          queue.push(() => afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent))
        } else if(attackLanded(targetMove.acc)) {
          moveProcess = true

          let recipientMove
          let targetMove
    
          if(recipient.isEnemy) {
            recipientMove = foeRNGMove
            targetMove = allyMove
          } else {
            recipientMove = allyMove
            targetMove = foeRNGMove
          }

          setTimeout(() =>{
            target.move({move: targetMove, recipient, recipientMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
            console.log('YAYA')

            manageCheckStatusEvent(faster, slower)
            console.log('manageCheckStatusEvent')
          }, 1250)
        } else {
          if(target.hp > 0) queue.push(() => target.miss('missed', renderedSprites, queueProcess))
        } 
      }

      console.log('status event needed?')
      console.log('weather event needed?')

      let passed = false

      if(faster.affliction[0].active || faster.status.name == 'para' || faster.status.name == 'slp') {
        queue.push(() => manageCheckStatusEvent(faster, slower)) 
        passed = true
      }
      
      if(slower.affliction[0].active || slower.status.name == 'para' || slower.status.name == 'slp') {
        if(passed) return 
        queue.push(() => manageCheckStatusEvent(faster, slower))
      }

      // target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
      console.log('manageCheckStatusEvent')
    } else if(target.affliction[0].active){
      console.log('afflictionEvent')
      if(recipient.id == faster.id){
        afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower)
        console.log('afflictionsEvent')
      } else {
        if(recipient.id == slower.id){
          afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower)
          slowerDontPass = true
          console.log('afflictionsEvent')
        } else {
          if(teamEvent.switch){
            setTimeout(() =>{
              afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower)
              console.log('afflictionsEvent')
            }, 750)
          } else {
            queue.push(() => {
              afflictionsEvent(target, targetMove, recipient, check, false, statusIcon, catchEvent, faster, slower)
              console.log('afflictionsEvent')
            })
          }
        }
      }
      return
    }
  // }

  const moveSwitchInteraction = (target, team) =>{
    if(target.isEnemy && moveSwitchEvent.foe) return
    else if(!target.isEnemy && moveSwitchEvent.ally) return

    queueProcess.disabled = true
    console.log('there')

    let rng = Math.floor(Math.random() * foe.moves.length)
    let foeRNGAttack = foe.moves[rng]

    // target.dialogue('battle', `${target.switchUnderScoreForSpace(target.nickname)} used ${target.switchUnderScoreForSpace(move.name)}!`)
    target.move({move: foeRNGAttack, recipient, recipientMove: null, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent, enemyTrainerInfo})
    console.log('YAYA')

    if(target.isEnemy){
      if(target.id != slower.id) {
        skipLastAttack = false
        moveSwitchEvent.foe = true
      }
      if(battleType != 'trainer') return
      if(team.length == 1) return

      moveSwitchEvent.foe = true

      setTimeout(() =>{
        target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}!\n\nIt gets ready to switch out.`)        
        gsap.to(target, {
          opacity: 0,
          duration: 0.5,
          onComplete: () =>{
            if(target.abilityInfo.ability.name == 'regenerator'){
              const healAmount = Math.floor(target.stats.baseHp * 0.33)
              target.hp += healAmount
            } else if (target.abilityInfo.ability.name == 'natural_Cure'){
              target.status = {
                name: null,
                turns: 0
              }
            }

            switchEnemyAfterFaint('move')
          }
        })
      }, 1250)
    } else {
      queueProcess.disabled = true
      console.log('there')
      moveSwitchEvent.ally = true

      if(team.length == 1) return

      setTimeout(() =>{
        target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}!\n\nIt gets ready to switch out.`)
        teamEvent.switch = true
        setTimeout(() =>{
          queueProcess.disabled = true
          console.log('there')

          manageBattleState(false, 'team')

          gsap.to('#overlapping', {
            opacity: 1,
            yoyo: true,
            duration: 1,
            onComplete(){
              queueProcess.disabled = true
              console.log('there')
              gsap.to('#overlapping', {
                opacity: 0,
                duration: 0.4
              })
            }
          })
        }, 1250)
      }, 1250)
    }
    return
  }

  function specialMoveEffect(target, targetName, targetMove, recipient, recipientName, team, moveSwitchEvent){
    if(target.affliction[2].active && targetMove.type == 'status') return
    if(target.heldItem != null) if(target.heldItem.name == 'assault_Vest' && targetMove.type == 'status') return

    let move = targetMove

    if(target.isEnemy) if(move == null || move == undefined){
      move = target.rerollEnemyMoveSoAppropriate(recipient, targetMove, terrainConditions, enemyTrainerInfo)
      foeRNGMove = move

      console.log(foeRNGMove)
    }

    switch(move.name){
      case 'sucker_punch':
        if(target.id == slower.id) {
          skipLastAttack = true
          target.dialogue('battle', `${targetName} used Sucker Punch!\n\nIt didin't seem to work for some reason..`)
        }
        break
      case 'u_turn':
      case 'volt_switch':
        if(moveSwitchEvent == false){
          skipLastAttack = true
          moveSwitchInteraction(target, team)
        }
        break
      case 'theif':
        if(target.heldItem == null) 
          if(recipient.heldItem != null) {
            if(recipient.knockedOff) return

            queueProcess.disabled = true
            console.log('here')

            setTimeout(() => {
              const prevText = document.querySelector('#dialogueInterface').innerText

              const missedText = `${targetName} missed!`
              if(prevText == missedText.toUpperCase()) return

              target.dialogue('battle', `${prevText}\n\n${targetName} stole ${recipientName}'s ${recipient.heldItem.name}!`)

              target.heldItem = recipient.heldItem
              recipient.heldItem = null
              setTimeout(() => {
                queueProcess.disabled = false
                console.log('there')
              }, 1250)
            }, 1250)
          }
        break
      case 'knock_off':
        if(recipient.heldItem != null) {
          recipient.knockedOff = true

          queueProcess.disabled = true
          console.log('here')

          setTimeout(() => {
            const prevText = document.querySelector('#dialogueInterface').innerText

            const missedText = `${targetName} missed!`
            if(prevText == missedText.toUpperCase()) return

            target.dialogue('battle', `${prevText}\n\n${targetName} knocked off ${recipientName}'s ${recipient.heldItem.name}!`)

            recipient.heldItem = null
            setTimeout(() => {
              queueProcess.disabled = false
              console.log('there')
            }, 1250)
          }, 1250)
        }
        break
      case 'psychic_fang':
        // remove screens on enemy side

        if(target.isEnemy){
          if(terrainConditions.turns.etc.ally_reflect.active || terrainConditions.turns.etc.ally_light_screen.active)
            setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${target.name} broke the screens!`), 750)
          
          terrainConditions.turns.etc.ally_reflect.active = false
          terrainConditions.turns.etc.ally_light_screen.active = false
        } else {
          if(terrainConditions.turns.etc.foe_reflect.active || terrainConditions.turns.etc.foe_light_screen.active)
            setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${target.nickname} broke the screens!`), 750)

          terrainConditions.turns.etc.foe_reflect.active = false
          terrainConditions.turns.etc.foe_light_screen.active = false
        }

        // make screen indicators go away
        screenDisplayManagement(false, target.isEnemy, 'both', 0)
        break
      case 'clear_smog':
        if(target.isEnemy) resetStats('foe')
        else resetStats('ally')

        setTimeout(() => {
          const prevText = document.querySelector('#dialogueInterface').innerText

          target.dialogue('battle', `${prevText}\n\n${recipientName}'s stats were reset.`)
          setTimeout(() => {
            queueProcess.disabled = false
            console.log('there')
          }, 1250)
        }, 1250)
        break
      case 'sticky_web':
        if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
          recipient.magicBounce(target, queue, queueProcess, terrainConditions, () =>{

            console.log(' hehe')
            if(recipient.isEnemy) {
              if(!terrainConditions.static.sticky_web.active.ally) {
                setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThat applied a sticky web on your side of the battlefield!`), 750)
                terrainConditions.static.sticky_web.active.ally = true
                document.querySelector('#allyWebs').style.opacity = 1
              } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the sticky web is already on the field..`), 750)
            } else if(!terrainConditions.static.sticky_web.active.foe) {
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThat applied a sticky web on the enemy's side of the battlefield!`), 750)
              terrainConditions.static.sticky_web.active.foe = true
              document.querySelector('#foeWebs').style.opacity = 1
            } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the sticky web is already on the field..`), 750)

          })
        } else {
          if(target.isEnemy) {
            if(!terrainConditions.static.sticky_web.active.ally) {
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} applied a sticky web on your side of the battlefield!`), 750)
              terrainConditions.static.sticky_web.active.ally = true
              document.querySelector('#allyWebs').style.opacity = 1
            } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the sticky web is already on the field..`), 750)
          } else if(!terrainConditions.static.sticky_web.active.foe) {
            setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} applied a sticky web on the enemy's side of the battlefield!`), 750)
            terrainConditions.static.sticky_web.active.foe = true
            document.querySelector('#foeWebs').style.opacity = 1
          } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the sticky web is already on the field..`), 750)
        }
        break
      case 'stealth_rock':
        if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
          recipient.magicBounce(target, queue, queueProcess, terrainConditions, () =>{

            if(recipient.isEnemy) {
              if(!terrainConditions.static.stealth_rock.active.ally) {
                setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThat applied stealthy rocks on your side of the battlefield!`), 750)
                terrainConditions.static.stealth_rock.active.ally = true
                document.querySelector('#allyRocks').style.opacity = 1
              } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the rocks are already on..`), 750)
            } else if(!terrainConditions.static.stealth_rock.active.foe) {
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThat applied stealthy rocks on the enemy's side of the battlefield!`), 750)
              terrainConditions.static.stealth_rock.active.foe = true
              document.querySelector('#foeRocks').style.opacity = 1
            } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the rocks are already on..`), 750)

          })
        } else {
          if(target.isEnemy) {
            if(!terrainConditions.static.stealth_rock.active.ally) {
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} applied stealthy rocks on your side of the battlefield!`), 750)
              terrainConditions.static.stealth_rock.active.ally = true
              document.querySelector('#allyRocks').style.opacity = 1
            } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the rocks are already on..`), 750)
          } else if(!terrainConditions.static.stealth_rock.active.foe) {
            setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} applied stealthy rocks on the enemy's side of the battlefield!`), 750)
            terrainConditions.static.stealth_rock.active.foe = true
            document.querySelector('#foeRocks').style.opacity = 1
          } else setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut the rocks are already on..`), 750)
        }
        break
      case 'taunt':
        if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
          recipient.magicBounce(target, queue, queueProcess, terrainConditions, () =>{
            if(!target.affliction[2].active){
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${recipientName} taunted ${targetName}.`), 750)
    
              target.affliction[2].active = true
    
              if(recipient.isEnemy) document.querySelector('#allyTaunt').style.opacity = 1
              else document.querySelector('#foeTaunt').style.opacity = 1
              
              if(recipient.id == faster.id) target.affliction[2].turns = 4
              else target.affliction[2].turns = 3
              
    
              console.log('taunted')
            } else {
              setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} is already taunted...`), 750)
            }
          })
        } else {
          if(!recipient.affliction[2].active){
            setTimeout(() => recipient.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} taunted ${recipientName}.`), 750)
  
            recipient.affliction[2].active = true
  
            if(target.isEnemy) document.querySelector('#allyTaunt').style.opacity = 1
            else document.querySelector('#foeTaunt').style.opacity = 1
            
            if(target.id == faster.id) recipient.affliction[2].turns = 4
            else recipient.affliction[2].turns = 3
            
  
            console.log('taunted')
          } else {
            setTimeout(() => recipient.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${recipientName} is already taunted...`), 750)
          }
        }

        break
      case 'rapid_spin':
        queueProcess.disabled = true
        console.log('there')

        target.affliction[1].active = false

        if(target.isEnemy){
          terrainConditions.static.sticky_web.active.foe = false
          document.querySelector('#foeWebs').style.opacity = 0

          terrainConditions.static.stealth_rock.active.foe = false
          document.querySelector('#foeRocks').style.opacity = 0

          document.querySelector('#foeSeeds').style.opacity = 0
        } else {
          terrainConditions.static.sticky_web.active.ally = false
          document.querySelector('#allyWebs').style.opacity = 0

          terrainConditions.static.stealth_rock.active.ally = false
          document.querySelector('#allyRocks').style.opacity = 0

          document.querySelector('#allySeeds').style.opacity = 0
        }

        break
      case 'reflect':
      case 'light_screen':
        let targetType = 'ally'
        if(target.isEnemy) targetType = 'foe'

        const screenType = `${targetType}_${move.name}`
        
        if(!terrainConditions.turns.etc[screenType].active){

          terrainConditions.turns.etc[screenType].active = true

          terrainConditions.turns.etc[screenType].turns = 5
          if(target.heldItem != undefined) if(target.heldItem.name == 'light_Clay') terrainConditions.turns.etc[screenType].turns = 8

          setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} put up a ${switchUnderScoreForSpace(move.name)}.`), 750)

          screenDisplayManagement(true, target.isEnemy, move.name, terrainConditions.turns.etc[screenType].turns)
        } else {
          // light sreen / reflect already active!!!

          setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThis side of the battlefield already has a ${switchUnderScoreForSpace(move.name)}.`), 750)
        }
        
        break
      case 'defog':
        if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
          recipient.magicBounce(target, queue, queueProcess, terrainConditions, () =>{

            setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThat defogged the battlefield.`), 750)

            // remove stealth rocks and sticky webs on both sides
            terrainConditions.static.sticky_web.active.ally = false
            terrainConditions.static.sticky_web.active.foe = false
    
            document.querySelector('#allyWebs').style.opacity = 0
            document.querySelector('#foeWebs').style.opacity = 0
    
            terrainConditions.static.stealth_rock.active.ally = false
            terrainConditions.static.stealth_rock.active.foe = false
    
            document.querySelector('#allyRocks').style.opacity = 0
            document.querySelector('#foeRocks').style.opacity = 0
    
            // remove screens on enemy side
            if(recipient.isEnemy){
              terrainConditions.turns.etc.ally_reflect.active = false
              terrainConditions.turns.etc.ally_light_screen.active = false
            } else {
              terrainConditions.turns.etc.foe_reflect.active = false
              terrainConditions.turns.etc.foe_light_screen.active = false
            }

            // make screen indicators go away
            screenDisplayManagement(false, target.isEnemy, 'both', 0)

            setTimeout(() =>{
              queueProcess.disabled = false
              console.log('here')
            }, 1250)
          })
        } else {
          setTimeout(() => target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${targetName} defogged the battlefield.`), 750)

          // remove stealth rocks and sticky webs on both sides
          terrainConditions.static.sticky_web.active.ally = false
          terrainConditions.static.sticky_web.active.foe = false
  
          document.querySelector('#allyWebs').style.opacity = 0
          document.querySelector('#foeWebs').style.opacity = 0
  
          terrainConditions.static.stealth_rock.active.ally = false
          terrainConditions.static.stealth_rock.active.foe = false
  
          document.querySelector('#allyRocks').style.opacity = 0
          document.querySelector('#foeRocks').style.opacity = 0
  
          // remove screens on enemy side
          if(target.isEnemy){
            terrainConditions.turns.etc.ally_reflect.active = false
            terrainConditions.turns.etc.ally_light_screen.active = false
          } else {
            terrainConditions.turns.etc.foe_reflect.active = false
            terrainConditions.turns.etc.foe_light_screen.active = false
          }
  
          // make screen indicators go away
          screenDisplayManagement(false, target.isEnemy, 'both', 0)

          setTimeout(() =>{
            queueProcess.disabled = false
            console.log('here')
          }, 1250)
        }
        break
      case 'rest':
        setTimeout(() => {
          target.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${target.nickname} takes a nap.. zZzZz`)

          target.status.name = 'slp'
          target.status.turns = 3

          setTimeout(() =>{
            queueProcess.disabled = false
            console.log('here')
          }, 1250)
        }, 1250)



        target.hp = target.stats.baseHp
        target.hpManagement()

        // target.statusEffectAnimation('slp', renderedSprites, queueProcess)

        let recipientStatus

        if(target.isEnemy) recipientStatus = document.querySelector('#foeStatus')
        else recipientStatus = document.querySelector('#allyStatus')

        recipientStatus.style.display = 'block'
        recipientStatus.src = 'img/status/slp.png'

        break
    }
  }

  let enemyTeam = [1]
  if(battleType == 'trainer') enemyTeam = enemyTrainerInfo.team

  if(target.id == ally.id) specialMoveEffect(ally, ally.switchUnderScoreForSpace(ally.nickname), allyMove, foe, foe.name, player.team, moveSwitchEvent.ally)
  else if(target.id == foe.id) specialMoveEffect(foe, foe.name, foeRNGMove, ally, ally.switchUnderScoreForSpace(ally.nickname), enemyTeam, moveSwitchEvent.foe)

  if(!skipLastAttack) normalMoveEvent()
  else skipLastAttack = false

  lastMoveStatusEvent()
  // console.log('last move check')

  if(target.name == faster.name) {
    fasterHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
    slowerHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)

    if(faster.isEnemy) {
      fasterHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)
      slowerHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
    }

    console.log('waddafuk')
    pushRecipientEndOfTurnBattleItemEvent(faster, fasterHpBeforeMove, slowerHpBeforeMove)
    pushRecipientEndOfTurnBattleItemEvent(slower, slowerHpBeforeMove, fasterHpBeforeMove)
  }

  // setTimeout(() =>{
  //   queueProcess.disabled = false
  //   console.log('here')
  //   console.log('waddafuk')
  // }, 1250)

  // target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower)
  // console.log('endOfTurnTerrainManagement')
}

let itemEvent

let turnItemEvent = {ally: false, foe: false}

// pushes to queue the check for end of turn item even such as focus sash and focus band
// this checks for berries, not only at the end of turn
function pushRecipientEndOfTurnBattleItemEvent(target, targetHpBeforeMove, recipientHpBeforeMove){
  
  if(target.isEnemy) {
    if(turnItemEvent.foe) return
  } else if(turnItemEvent.ally) return

  if(target.heldItem != null) if(target.heldItem.heldType != undefined) if(target.checkBattleItemRng()) {

    let threshold = target.heldItem.heldThreshHold
    if(target.abilityInfo.ability.name == 'gluttony' && target.heldItem.type == 'berry') threshold += 25

    if(target.heldItem.heldThreshHold != undefined && threshold <= target.convertToPercentage(target.hp, target.stats.baseHp)) return
    if(target.heldItem.heldEffect == 'healStatus' && target.status.name != target.heldItem.pow && target.heldItem.pow != 'all') return 
    if(target.fainted) return
    if(target.hp <= 0) return

    if(target.isEnemy) turnItemEvent.foe = true
    else turnItemEvent.ally = true

    itemEvent = true
    inBattleCharacters.ally = ally
    inBattleCharacters.foe = foe

    console.log('lmao')
    queue.push(() => target.useBattleItem(queueProcess, queue, faintEvent, targetHpBeforeMove, recipientHpBeforeMove, moves, inBattleCharacters, renderedSprites, critLanded, terrainConditions, queueFaintTrigger, manageWeatherState))
  }
}

function attackMove(e) {

  queueProcess.disabled = true
  console.log('there')

  for(let i = 0; i < ally.moves.length; i++){
    if(ally.moves[i].name === `${e.target.textContent.replace(/ /g, "_")}`){
      currMove = ally.moves[i]
      break
    }
  }

  allyMove = currMove

  let cancelMove = false

  if(ally.heldItem != null) if(ally.heldItem.effect == 'choice') 
    if(ally.choiceItem.move == null) ally.choiceItem.move = currMove
    else currMove = ally.choiceItem.move

  if(ally.choiceItem.move != null && ally.choiceItem.move.name != currMove.name) {
    setTimeout(() => queue.length = 0, 50)

    ally.dialogue('battle', `${ally.nickname} is locked into a move due to it's choice ${ally.choiceItem.type}...`)

    setTimeout(() =>{
      queueProcess.disabled = false
      console.log('here')
    }, 1250)

    cancelMove = true
  }

  if(ally.affliction[2].active && currMove.type == 'status'){
    setTimeout(() => queue.length = 0, 50)

    ally.dialogue('battle', `${ally.nickname} is taunted and so cannot use status moves...`)

    setTimeout(() =>{
      queueProcess.disabled = false
      console.log('here')
    }, 1250)

    cancelMove = true
  }

  if(ally.heldItem != null) if(ally.heldItem.name == 'assault_Vest' && currMove.type == 'status'){
    setTimeout(() => queue.length = 0, 50)

    ally.dialogue('battle', `${ally.nickname} has an assault vest equipped and so cannot use status moves...`)

    setTimeout(() =>{
      queueProcess.disabled = false
      console.log('here')
    }, 1250)

    cancelMove = true
  }

  if(cancelMove) return
  
  if(currMove.pp == 0){
    let outOfPP = true
    for(let i = 0; i < ally.moves.length; i++){
      if(ally.moves[i].pp > 0) outOfPP == false
    }

    if(outOfPP) currMove = movesObj.struggle
    else return
    // prevent attacking on this attack
    // change pp digits for red
  }

  if(currMove.pp > 0){
    // gonna need to reorganize if i put double battles at some point -- DOUBLE BATTLES HAHAHAHHAHAHAHA
    // should maybe put all the battle management in class with move method
    
    fasterCheck = false
    slowerCheck = false
    confusionProcess = {ally: false, foe: false}
  
    lvlBeforeExpGained = ally.lvl

    const [faster, slower, fasterMove, slowerMove] = checkSpeed(e)
  
    let fasterStatusIcon = document.querySelector('#allyStatus')
    let slowerStatusIcon = document.querySelector('#foeStatus')
    if(faster.isEnemy) {
      fasterStatusIcon = document.querySelector('#foeStatus')
      slowerStatusIcon = document.querySelector('#allyStatus')
    }
    
    fasterHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
    slowerHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)

    if(faster.isEnemy) {
      fasterHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)
      slowerHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
    }

    itemEvent = false

    slowerDontPass = false

    // faster attack
    if(!fasterCheck) {
      // console.log('does this ever fire? lmao')
      statusEvent(faster, fasterMove, slower, fasterStatusIcon, false, faster, slower)
      console.log(`status event`)
      // pushRecipientEndOfTurnBattleItemEvent(slower, slowerHpBeforeMove, fasterHpBeforeMove)
    }

    // check for confusion
    // console.log('afflictionEvent')
    // console.log(slower)

    if(faster.affliction[0].active){
      // if(faster.status.name == 'para' || faster.status.name == 'slp') return
      if(faster.status.name == 'slp') return
      if(slowerDontPass) return
      afflictionsEvent(faster, fasterMove, slower, 'fasterCheck', false, fasterStatusIcon, false, faster, slower)
      console.log('afflictionsEvent')
    }


    // console.log('NWONWOWNOWNONWOONWONWONWNOW')

    // checks if either 'mons died from the interaction

    // vvvvv 2 pushes right here, not a good idea vvvvv 
    checkIfFainted(faster)
    checkIfFainted(slower)

    // seperate current queue from lvl up process
    // this queue will get pushed back into the main queue after the level up process
    let flippedQueue

    if(itemEvent) flippedQueue = queue.splice(1, queue.length)
    else flippedQueue = queue.splice(0, queue.length)

    // queueProcess.disabled = true
    // console.log('there')

    console.log('nwowowowawa')
    
    queue.push(() =>{
        // here
      if(slower.fainted){
        manageCheckStatusEvent(faster, slower)
        console.log('manageCheckStatusEvent')

        console.log('afflictionEvent')
        afflictionsEvent(slower, slowerMove, faster, 'slowerCheck', true, slowerStatusIcon, false, faster, slower)
        console.log('NWONWOWNOWNONWOONWONWONWNOW')
      } else {
        // pushRecipientEndOfTurnBattleItemEvent(faster, fasterHpBeforeMove, slowerHpBeforeMove)
        if(slower.convertToPercentage(slower.hp, slower.stats.baseHp) != slowerHpBeforeMove){
          if(slower.flinched){
            slower.miss('flinched', renderedSprites, queueProcess)
            manageCheckStatusEvent(faster, slower)  

            console.log('afflictionEvent')
            afflictionsEvent(slower, slowerMove, faster, 'slowerCheck', true, slowerStatusIcon, false, faster, slower)
            console.log('NWONWOWNOWNONWOONWONWONWNOW')

            slower.flinched = false
            return
          }
        }
          
        if(!slowerCheck){
          // if(slower.choiceItem.move != null && slower.choiceItem.move.name != slowerMove.name) return
          statusEvent(slower, slowerMove, faster, slowerStatusIcon, false, faster, slower)
          console.log('statusEvent')
          return
        }
      }
  
      // might be where weather is put as first end turn index thingy
      // flippedQueue.forEach(func =>{
      //   queue.push(func)  
      // })
  
      setTimeout(() =>{
        queueProcess.disabled = false
        console.log('here')
      }, 1250)
    })
  }
}

// vv this is funny vv
export function manageBattleQueue(state){
  queueProcess.disabled = state
}

export let moveProcess = false

let queueFaintTrigger = {
  initiated: false
}

let unstuckQueueFlag = false
let previousFirstQueueIndex = null

function checkForEvoAfterFaint(){
  ally.protected.active = false
  foe.protected.active = false
  queueFaintTrigger.initiated = false

  manageFaintingEvent(foe)

  if(evoArr.length > 0){
    // queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
    queue.push(() => {
      if(battleType == 'trainer') {
        if(enemyTeamWiped(enemyTrainerInfo)) manageEvolution(evoArr)
      } else {
        manageEvolution(evoArr)
      }
    })
    return
  } else {
    // queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
    queue.push(() => {
      manageBattleState(false)
      console.log('here')
    })
  }
}

function checkIfTerrainConditionActive(){
  let flag = false
  let terrainArr = []
  
  Object.values(terrainConditions).forEach((types, i) =>{
    Object.entries(types).forEach((terrainType, j) =>{
      if(terrainType[0] == 'etc' || terrainType[0] == 'weather') 
        Object.values(terrainType[1]).forEach((terrain) =>{
        // terrain.active = false
        // terrain.turns = 5

        if(typeof terrain.active == 'boolean'){
          if(terrain.active) {
            flag = true
            terrainArr.push({type: Object.keys(terrainConditions[Object.keys(terrainConditions)[i]])[j], info: terrain})
          }
        } else {
          if(terrain.active.ally || terrain.active.foe){
            terrainArr.push({type: Object.keys(terrainConditions[Object.keys(terrainConditions)[i]])[j], info: terrain})
          }
        }
      })
    })
  })

  return [flag, terrainArr]
}

function spendTauntTurns(target){
  let name
  
  if(target.isEnemy) name = target.name
  else name = target.nickname

  if(target.affliction[2].active){
    if(target.affliction[2].turns > 0){
      console.log(`taunt turns : ${target.affliction[2].turns}`)
      target.affliction[2].turns--
    } else {
      console.log(`no more taunt`)
      target.affliction[2].active = false

      if(target.isEnemy) document.querySelector('#foeTaunt').style.opacity = 0
      else document.querySelector('#allyTaunt').style.opacity = 0

      queueProcess.disabled = true
      console.log('there')

      queue.push(() =>{
        target.dialogue('battle', `${name} isin't taunted by the opponent anymore.`)
        setTimeout(() =>{
          queueProcess.disabled = false
          console.log('here')
        }, 1250)
      })
    }
  }
}

function spendQueue(){
  if(queueProcess.disabled) {
    document.querySelector('#proceedImgContainer').style.display = 'none'
    // console.log(unstuckQueueFlag)
    if(!unstuckQueueFlag){
      unstuckQueueFlag = true
      previousFirstQueueIndex = queue[0]

      setTimeout(() =>{
        if(queue.length > 0) {
          if(unstuckQueueFlag) if(previousFirstQueueIndex == queue[0]) {
            queueProcess.disabled = false
            console.log('unstick here')
            // console.log(queue)
          }
        } else {
          // if(unstuckQueueFlag){
          //   queueProcess.disabled = false
          //   console.log('unstick here 0')
          // }
        }

        unstuckQueueFlag = false
      }, 3000)
    }
    
    return
  } else {
    document.querySelector('#proceedImgContainer').style.display = 'block'
  }

  if(queue.length > 0){
    // console.log(queue)
    queue[0]()
    queue.shift()

    if(faster != undefined && slower != undefined){
      fasterHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
      slowerHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)
    
      if(faster.isEnemy) {
        fasterHpBeforeMove = foe.convertToPercentage(foe.hp, foe.stats.baseHp)
        slowerHpBeforeMove = ally.convertToPercentage(ally.hp, ally.stats.baseHp)
      }
    
      pushRecipientEndOfTurnBattleItemEvent(faster, fasterHpBeforeMove, slowerHpBeforeMove)
      pushRecipientEndOfTurnBattleItemEvent(slower, slowerHpBeforeMove, fasterHpBeforeMove)

      // queueProcess.disabled = false
      // console.log('here')
    }

    return
  } else if(queueFaintTrigger.initiated){
    checkForEvoAfterFaint()
  } else {
    const [flag, terrainArr] = checkIfTerrainConditionActive()

    spendTauntTurns(ally)
    spendTauntTurns(foe)

    let rng = Math.floor(Math.random() * 2)

    let faster = ally
    let slower = foe
  
    let allySpeed
    if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
    else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)
  
    let foeSpeed
    if(foe.status.name == 'para') foeSpeed = Math.floor((foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd) / 2)
    else foeSpeed = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)

    if(ally.heldItem != null) if(ally.heldItem.name == 'choice_Scarf') {
      // not sure if i need to set it here??????
      // ally.choiceItem.type = 'scarf'
      // ally.choiceItem.move = allyMove
  
      allySpeed = allySpeed * 1.5
    }

    if(foe.heldItem != null) if(foe.heldItem.name == 'choice_Scarf') {
      // foe.choiceItem.type = 'scarf'
      // foe.choiceItem.move = foeRNGMove
  
      foeSpeed = foeSpeed * 1.5
    }
  
    if(allySpeed == foeSpeed){
      if(rng == 1) {
        faster = foe
        slower = ally
      }
    } else if(allySpeed < foeSpeed){
      faster = foe
      slower = ally
    }
    
    if(!terrainConditions.weatherSpent && flag) {
      ally.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
    } else {
      setTimeout(() =>{
        if(queue.length > 0) return
        terrainConditions.weatherSpent = false
  
        ally.protected.active = false
        foe.protected.active = false
        queueFaintTrigger.initiated = false
        
        turnItemEvent.ally = false
        turnItemEvent.foe = false
    
        ranAway = false
  
        dialogueInterfaceDom.style.display = 'none'
        document.querySelector('#proceedImgContainer').style.display = 'none'
        if(scenes.get('battle').initiated)  if(queue.length == 0) encounterInterfaceDom.style.display = 'grid'
        console.log('grided')
        moveProcess = false
      }, 50)
    }
  }
}

const menuDom = document.querySelector('#menu')

function setBattleScene(){
  battleSceneDom.style.display = 'grid'
  encounterInterfaceDom.style.display = 'none'
  createMovesMenuButtons(true, 'battle', 'attack', ally)

  createEncounterMenuButtons()
  setBattlersInfo()

  dialogueInterfaceDom = document.createElement('div')
  menuDom.append(dialogueInterfaceDom)
  dialogueInterfaceDom.setAttribute('id','dialogueInterface')
  dialogueInterfaceDom.style.display = 'none'
  dialogueInterfaceDom.addEventListener('click', e => _preventActionSpam(spendQueue, e, 500), true)
  dialogueInterfaceDom.textContent = ''  
}

export function manageBattleState(state, nextScene, faintedTriggered, info, tileInfo) {
  if(state) initBattle(faintedTriggered, info, tileInfo)
  else clearBattleScene(nextScene)
}