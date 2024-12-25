import { movesObj } from "../../data/movesData.js"
import { mapsObj } from "../../data/mapsData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { audioObj } from "../../data/audioData.js"
import { itemsObj } from "../../data/itemsData.js"

import { Sprite, Pogemon, statsChangeObj } from "../../classes.js"

import { eventZones, manageOverWorldState, prevScene, waitForNextBattle } from "./overworld.js"
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

let foe
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

function foeRNGEncounter(tileInfo){
  const rng = Math.floor(Math.random() * 100) + 1
  const encounters = mapsObj[`${currMap.name}`].encounters[tileInfo]

  for (let i = 0; i < encounters.length; i++) if(rng >= encounters[i].odds.min && rng < encounters[i].odds.max) return encounters[i]
}

let battleType

function resetStats(type) {
  if(type == 'ally'){
    statsChangeObj.ally = {
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

function initWildEncounter(tileInfo){
  enemyTrainer = undefined

  battleType = 'wild'

  let returnedFoe = foeRNGEncounter(tileInfo)
  if(returnedFoe == undefined) return
  
  let foeObj = returnedFoe.pogemon

  const rngLvl = Math.floor(Math.random() * (returnedFoe.lvls[1] - returnedFoe.lvls[0]) + returnedFoe.lvls[0] + 1)

  const foeImage = new Image()
  const foeSprite = new Sprite({
    type: 'pogemon',
    position:{
      x:1415,
      y:15
    },
    frames: {
      max: 4,
      hold: 100
    },
    img: foeImage,
    animate: true
  })

  foe = new Pogemon(foeObj, Math.pow(rngLvl, 3), true, currMap.name, null, null, foeSprite)

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

let enemyTrainer

function initTrainerEncounter(info){
  battleType = 'trainer'

  enemyTrainer = info.createdTrainer

  foe = enemyTrainer.team[0]

  document.querySelector("#foeGenderImg").src = `../../../img/${foe.gender}_icon.png`
}

function critLanded(pogemon, recipient){
  let critHit = false
  const critRNG = Math.floor(Math.random() * 100)
  const critThreshold = 0

  if(critRNG <= critThreshold){
    critHit = true
    if(recipient.subHp > 0 || recipient.protected.active == true) return
    // queueProcess.disabled = true
    setTimeout(() =>{
      pogemon.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${pogemon.name} landed a critical hit!!!`)
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
  } else if (percentHP < 51 && percentHP > 26){
    DOM.style.backgroundColor = 'yellow'
  } else if (percentHP < 26){
    DOM.style.backgroundColor = 'red'
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

function startWeather(type, info){
  startWeatherFlag.active = true
  startWeatherFlag.turns = 5

  if(prevScene != 'overworld') return
  
  document.querySelector('#encounterInterface').style.display = 'none'

  const fieldContainer = document.querySelector('#fieldEffectContainer')
  fieldContainer.style.display = 'flex'

  info.turns = 5

  const weatherTurnIndicator = document.querySelector('#fieldEffectTurnIndicator')
  weatherTurnIndicator.textContent = info.turns

  const weatherIcon = document.querySelector('#fieldEffectIcon')
  weatherIcon.src = `img/field/${type}.png`

  queueProcess.disabled = true
  console.log('there')

  // maybe put this in clearWeather when i make that
  Object.values(terrainConditions.weather).forEach(weather =>{
    weather.active = false
  })

  info.active = true

  ally.dialogue('battle', `The ${type.replace(/_/g, ' ')} now affects the battlefield.`)

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
  
  const trickRoomIcon = document.querySelector('#trickRoomIcon')
  trickRoomIcon.src = `img/field/trick_room.png`
  
  queueProcess.disabled = true
  console.log('there')
  
  // info.active = true
  
  // console.log(document.querySelector('#dialogueInterface').innerText)
  ally.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThe trick room now affects the battlefield.`)
}

function manageWeatherState(type, info, timing, activeTerrain){
  if(type == 'trick_room'){
    if(timing == 'init') manageTrickRoomState(info)
    else clearWeather(activeTerrain)
    return
  }

  if(timing == 'init'){
    startWeather(type, info)
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

export function initBattle(faintedTriggered, info, tileInfo){
queueFaintTrigger.initiated = false

  scenes.set('battle', {initiated : true})
  document.querySelector('#overworldScene').style.display = 'none'
  player.team[0].animate = true

  loadAlly(player.team[0])

  if(prevScene == 'overworld') {
    battlerArr = []
    evoArr = []
    lvlUpArr = []
    Object.values(terrainConditions).forEach(category =>{
      Object.values(category).forEach(type =>{
        type.active = false
        //set turns for terrain effects
        type.turns = 5
      })
    })

    document.querySelector('#fieldEffectContainer').style.right = '-124px'

    enemyTrainerInfo = info

    if(enemyTrainerInfo != null){
      document.querySelector('#foeTeamShowcase').style.display = 'flex'

      document.querySelectorAll('.foeTeamShowcaseIndividual').forEach(node =>{
        node.childNodes[1].src = 'img/transparent_pogeball.png'
      })
  
      enemyTrainerInfo.createdTrainer.team.forEach((pogemon, i) =>{
        document.querySelectorAll('.foeTeamShowcaseIndividual')[i].childNodes[1].src = 'img/item_scene/items/ball/pogeball.png'
      })
    } else document.querySelector('#foeTeamShowcase').style.display = 'none'

    resetStats('both')
    if(info == undefined) initWildEncounter(tileInfo)
    else initTrainerEncounter(info)
  }

  foe.position = {
    x: 1415,
    y: 50
  }

  if(foe.isShiny) {
    foe.img.src = foe.pogemon.sprites.shiny.frontSprite
    shinySparklesManagement.state = true
  } else foe.img.src = foe.pogemon.sprites.classic.frontSprite

  if(ally.isShiny) shinySparklesManagement.state = true

  renderedSprites = [foe, ally]

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

  if(battlerArr.length != 0){
    if(checkIfSameId()) battlerArr.push(ally)
  } else {
    battlerArr.push(ally)
  }

  if(!itemUsed.used){
    if(prevScene == 'overworld') {
      player.dialogue('battle', `a wild ${foe.name} appeared!`)
      setTimeout(() => player.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nso you send out ${ally.name}.`), 750)
    } else {
      document.querySelector('#encounterInterface').style.display = 'grid'
    }
  }

  if(currMap.weather != undefined){
    // console.log(info)
    // console.log(terrainConditions.weather[currMap.weather])
    queue.push(() =>{ manageWeatherState(currMap.weather, terrainConditions.weather[currMap.weather], 'init')})
  }

  const textBox = document.querySelector('#textBox')
  textBox.innerText = `What will ${ally.name} do?`

  if(itemUsed.used){
    document.querySelector('#encounterInterface').style.display = 'none'
    document.querySelector('#movesInterface').style.display = 'none'
    document.querySelector('#dialogueInterface').style.display = 'block'
    document.querySelector('#proceedImgContainer').style.display = 'block'

    console.log(itemUsed)
    
    if(itemUsed.item.type == 'ball'){
      if(enemyTrainer == undefined){
        queueProcess.disabled = true
        console.log('there')
        function backToOverWorld(){
          //might throw error

          queue.push(() => {
            manageBattleState(false)
          })
        }
        let pogemonInUse = ally
        player.catch(foe, false, currMap, ally, renderedSprites, itemsObj['pogeball'], manageBattleQueue, critLanded, backToOverWorld, pogemonInUse, queue, faintEvent, pc, queueFaintTrigger, queueProcess, terrainConditions, manageWeatherState)

        itemUsed.item = null
        itemUsed.used = false
        
        moveProcess = true
        
        manageCheckStatusEvent(foe, ally)
        console.log('manageCheckStatusEvent')
        return
      } else {
        player.team[0].dialogue("battle", "Can't catch another trainer's pogemon!")

        itemUsed.item = null
        itemUsed.used = false
      }
    } else {
      player.dialogue('battle', `${itemUsed.item.name} was used on ${ally.name}!`)
      document.querySelector('#proceedImg').style.display = 'block'

      queue.push(() =>{
        let rng = Math.floor(Math.random() * foe.move.length)
        let foeRng = foe.moves[rng]
        foe.move({move: foeRng, recipient: ally, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})

        let faster = ally
        let foeSpd = foe.stats.spd
        if(foe.status.name == 'para') foeSpd = foeSpd * 0.5

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
    teamEvent.switch = false
    teamEvent.previousScene = null

    if(faintedTriggered == undefined) return

    if(faintedTriggered.active) {
      faintedTriggered.active = false

      // here that is fucked
      foe.checkStatus('#foeHealthBar', document.querySelector('#foeHp'), renderedSprites, queue, queueProcess, faintEvent, ally, ['#allyHealthBar', document.querySelector('#allyHp'), renderedSprites, queue, queueProcess, faintEvent], false, terrainConditions, manageWeatherState, faintSwitch)
      console.log('checkStatus')
      foe.dialogue('battle', `You sent out ${ally.name}`)

      document.querySelector('#dialogueInterface').style.display = 'block'
      document.querySelector('#proceedImgContainer').style.display = 'block'
      document.querySelector('#encounterInterface').style.display = 'none'
      return
    }

    if(allyId !== player.team[0].id){
      resetStats('ally')
      
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
      document.querySelector('#proceedImg').style.display = 'block'

      ally.dialogue('battle', `${ally.name} switched in!`)

      foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]

      moveProcess = true

      let flag = false

      function proceedWithMove(foeRNGMove){
        foe.move({move: foeRNGMove, recipient: ally, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
        console.log('YAYA')
        moveProcess = true
        manageCheckStatusEvent(foe, ally)
        console.log('manageCheckStatusEvent')
      }

      if(foe.affliction[0].active){
        queue.push(() =>{
          // console.log('hahahah')
          foe.dialogue('battle', `${foe.name} is confused..`)
          foe.statusEffectAnimation('confusion', renderedSprites, queueProcess)
          foe.affliction[i].turns--
          if(attackLanded(33)) {
            queue.push(() => {
              foe.miss('confusion', renderedSprites, queueProcess)
              if(battleType != 'trainer') if(foe.hp <= 0){
                faintEvent(foe)
                return
              }
              manageCheckStatusEvent(foe, ally)
              console.log('manageCheckStatusEvent')
            })
          } else {
            queue.push(() =>{
              proceedWithMove(foeRNGMove)
              // console.log('proceed')
            })
          }
        })
      }

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

      if(foe.affliction[0].active == false && foe.affliction[0].active == false){
        queue.push(() =>{
          proceedWithMove(foeRNGMove)
          // console.log('proceed')
        })
        return
      }

      //team switch option
      if(!flag) queue.push(() => {
        manageCheckStatusEvent(foe, ally)
        console.log('manageCheckStatusEvent')
        // console.log('nani')
      })
      return
    }

    foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]
    proceedWithMove(foeRNGMove)
    // console.log('proceed')
    document.querySelector('#encounterInterface').style.display = 'none'
  }
}

function clearBattleScene(nextScene){
  if(enemyTrainer != undefined) {
    player.interaction.info.beaten = true

    mapsObj[`${currMap.name}`].trainers.forEach(trainer =>{
      if(trainer.name == player.interaction.info.name) trainer.beaten = true
    })
    
  }
  if(player.interaction != null) if(player.interaction.info.gymLeader != undefined) {
    player.badges[player.interaction.info.gymLeader.num] = true
    worldEventData[player.interaction.info.gymLeader.name].gym = true
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

        manageOverWorldState(true)

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

export function battleAnimation(){
  battleAnimationId = window.requestAnimationFrame(battleAnimation)
  battleBackground.draw()

  renderedSprites.forEach(sprite =>{
    sprite.draw()
  })

  if(shinySparklesManagement.state) {
    if(prevScene != 'overworld') return

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
      document.querySelector('#proceedImg').style.display = 'none'
      setTimeout(() =>{
        arrowDisplayState = false
      }, 500)
    } else {
      arrowDisplayState = true
      arrowDisplayFlag = true
    }
  } else {
    if(document.querySelector('#encounterInterface').style.display == 'grid') document.querySelector('#proceedImg').style.display = 'none'
    else document.querySelector('#proceedImg').style.display = 'block'
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

function optionButtonInteraction(e) {
  if(scenes.get('battle').initiated){
    switch(e.target.textContent){
      case 'Fight':
        encounterInterfaceDom.style.display = 'none'
        movesInterfaceDom.style.display = 'grid'
        break
      case 'pgmn':
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
          C + 1

          function chanceToEscape(A, B){
            return (((A * 32) / (B / 4)) + 30 * C)
          }
          
          if(chanceToEscape(player.team[0].stats.spd, foe.stats.spd) < 100) {
            encounterInterfaceDom.style.display = 'none'
            movesInterfaceDom.style.display = 'none'
            dialogueInterfaceDom.style.display = 'block'
            document.querySelector('#proceedImgContainer').style.display = 'block'
            dialogueInterfaceDom.textContent = 'You failed to run away..'
  
            let rng = Math.floor(Math.random() * foe.move.length)
            let foeRng = foe.moves[rng]
  
            queue.push(() => {
              foe.move({move: foeRng, recipient: player.team[0], renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
              console.log('YAYA')
              manageCheckStatusEvent(foe, ally)
              console.log('manageCheckStatusEvent')
            })
            return
          }
  
          encounterInterfaceDom.style.display = 'none'
          movesInterfaceDom.style.display = 'none'
          dialogueInterfaceDom.style.display = 'block'
          document.querySelector('#proceedImgContainer').style.display = 'block'
          dialogueInterfaceDom.textContent = 'You fleed'
          audioObj.SFX.flee.play()
          // need to put rng check based on speed stat
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
                  duration: 0.4
                })
              }
            })
          })
        } else {
          document.querySelector('#textBox').innerText = "Can't run from a trainer battle!"
          setTimeout(() =>{
            document.querySelector('#textBox').innerText = `What will ${ally.name} do?`
          }, 1000)
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

  typeDom.textContent = currentMove.type
}

export function movesAwayEvent(){
  powDom.textContent = `Pow : --`
  accDom.textContent = `Acc : --`
  ppDom.textContent = `PP : --`
  elementDom.textContent = `--`
  elementDom.style.color = 'white'
  typeDom.textContent = `--`
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


  allyNameDom.textContent = ally.name
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
        switchMoveTarget.dialogue('evolution', `${switchMoveTarget.name} learned ${switchUnderScoreForSpace(learntMove.name)}!`)
      } else {
        switchMoveTarget.dialogue('battle', `${switchMoveTarget.name} learned ${switchUnderScoreForSpace(learntMove.name)}!`)
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
  foeRNGMove = movesObj[`${foe.moves[Math.floor(Math.random() * foe.moves.length)].name}`]
  moves.foe = foeRNGMove

  return [selectedMove, foeRNGMove]
}

function checkSpeed(e) {
  let faster
  let slower

  const options = [ally, foe]
  const rng = Math.floor(Math.random() * 2)
  const [selectedMove, foeRNGMove] = chooseMove(e)

  const priority = {
    ally: selectedMove.priority,
    foe: foeRNGMove.priority
  }

  let allySpeed
  if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
  else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)

  let foeSpeed
  if(foe.status.name == 'para') foeSpeed = Math.floor((foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd) / 2)
  else foeSpeed = Math.floor(foe.stats.spd * statsChangeObj.foe.nominator.spd / statsChangeObj.foe.denominator.spd)

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

  if(terrainConditions.etc.trick_room.active){
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
      document.querySelector('#learnMoveDescType').textContent = `${move.type}`
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
      document.querySelector('#evoLearnMoveDescType').textContent = `${move.type}`
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
    
    target.dialogue(type, `${target.name} gave up on learning ${switchUnderScoreForSpace(move.name)}.`)

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
      queue.push(() => target.dialogue('battle', `${target.name}'s raised to lv ${target.lvl}!`))
      queue.push(() => target.onLvlUp(true))
    } 
    else queue.push(() => target.onLvlUp(false))
    queue.push(() => {
      target.dialogue('evolution', `${target.name}'s stats increased!`)
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
          ally.dialogue(type, `${ally.name} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
        } else {
          selectedQueue.push(() => {
            ally.learntMoves.push(newMoves[i].name)
            ally.dialogue(type, `${ally.name} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
          })
        }
      } else {
        selectedQueue.push(() => {
          ally.learntMoves.push(newMoves[i].name)
          ally.dialogue(type, `${ally.name} learned ${switchUnderScoreForSpace(newMoves[i].name)}!`)
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
            dialogueDom.textContent = `Change one of ${ally.name}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
          })
        } else {
          learntMove = newMoves[i]
          learnMoveMenu(false)
          learnMoveMenu(type, true, ally)
          document.querySelector('#evolutionInterface').style.display = 'none'
          interfaceDom.style.display = 'grid'
          dialogueDom.textContent = `Change one of ${ally.name}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
        }
      } else {
        selectedQueue.push(() => ally.dialogue(type, `${ally.name} is trying to learn ${switchUnderScoreForSpace(newMoves[i].name)}!`))
        selectedQueue.push(() =>{
          learntMove = newMoves[i]
          learnMoveMenu(false)
          learnMoveMenu(type, true, ally)
          document.querySelector('#evolutionInterface').style.display = 'none'
          interfaceDom.style.display = 'grid'
          dialogueDom.textContent = `Change one of ${ally.name}'s moves for ${switchUnderScoreForSpace(learntMove.name)}?`
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

function enemyTeamWiped(enemyTrainerInfo){
  let teamFainted = true
  if(enemyTrainerInfo == undefined) return

  for(let i = 0; i < enemyTrainerInfo.team.length; i++){
    if(enemyTrainerInfo.createdTrainer.team[i].fainted == false) teamFainted = false
  }

  return teamFainted
}

function switchEnemyAfterFaint(){
  if(enemyTrainerInfo == undefined) return
  let currTrainer = enemyTrainerInfo.createdTrainer
  for(let i = 0; i < currTrainer.team.length; i++){
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

  enemyTrainerInfo.createdTrainer.team[0].dialogue('battle', `${enemyTrainerInfo.name} is sending out ${foe.name}`)
  enemyTrainerInfo.createdTrainer.team[0].hpManagement(foe, '#foeHealthBar', document.querySelector('#foeHp'))

  foe.opacity = 1
  foe.position = {
    x: 1415,
    y: 50
  }

  setBattlersInfo()

  if(foe.isShiny) foe.img.src = foe.pogemon.sprites.shiny.frontSprite
  else foe.img.src = foe.pogemon.sprites.classic.frontSprite

  renderedSprites.splice(0, 1, foe)

  resetStats('foe')

  battlerArr = [ally]
  lvlUpArr = []

  foe.hpManagement()
  
  // maybe ask if want to switch before next pogemon comes out?
}

export let evoArr = []

function addToEvoArr(battler){
  let pass = true

  if(battler.evo == null) return

  if(battler.evo.length != 0){
    switch(battler.name){
      case 'slimie':
        battler.evo.forEach(evo =>{

          if(evo != 'black_Sludge') if(battler.heldItem.name != 'black_Sludge') if(battler.lvl > prevLvl) pass = false
        })
        break
    }
  } else {
    if(battler.evo.type !== 'lvl') return
    if(battler.lvl >= battler.pogemon.evo.lvl){
      if(evoArr.length == 0) {
        evoArr.push(battler)
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
  


  if(pass) evoArr.push(battler)
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
    for(let i = 0; i < document.querySelectorAll('.foeTeamShowcaseIndividual').length; i++){
      const node = document.querySelectorAll('.foeTeamShowcaseIndividual')[i]
  
      if(node.childNodes[1].src == 'http://localhost:3000/img/item_scene/items/ball/pogeball.png'){
        node.childNodes[1].src = 'img/fainted_pogeball.png'
        break
      }
    }
  }

  battlerArr.forEach((battler, i) =>{
    prevLvl = ally.lvl

    if(battler.fainted) return

    if(battlerArr.length == 1) {
      oldStats = {...battler.stats}
      battler.expGain(target, battleType, battlerArr, true)

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
          battler.expGain(foe, battleType, battlerArr, false)
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
          battler.expGain(target, battleType, battlerArr, false)
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
            battler.expGain(target, battleType, battlerArr, false)
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
          queue.push(() => ally.dialogue('battle', `${foe.name} has been defeated.`))
          manageEvolution(evoArr)
        } else {
          queue.push(() => ally.dialogue('battle', `${foe.name} has been defeated.`))
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

        queue.push(() => ally.dialogue('battle', `${foe.name} has been defeated.`))
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

  target.useBattleItem(queueProcess, queue, faintEvent, fasterHpBeforeMove, slowerHpBeforeMove, moves, inBattleCharacters, renderedSprites, critLanded, terrainConditions, queueFaintTrigger, manageWeatherState)
  if(target.hp > 0) return

  queue.push(() =>{
    if(target.fainted) return
    target.dialogue('battle', `${target.name} fainted!`)
    target.faint(queueFaintTrigger)

    setTimeout(() =>{
      queueProcess.disabled = false
    }, 750)

    queue.push(() => {
      if(target.isEnemy){
        manageFaintingEvent(target)
      } else if(checkIfTeamWipedOut()){
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

    queue.push(() =>{

      // if(!target.hp <= 0 || !target.fainted) {
      //   queue.splice(1, 1)
      //   return
      // }
      
      // audioObj.music.battle.stop()
      // audioObj.SFX.faint.play()
      // target.dialogue('battle', `${target.name} fainted!`)
      // target.faint(queueFaintTrigger)
      faintEvent(target)
      // if(battleType != 'trainer'){
      //   let placeHolder = queue[1]
      //   queue[1] = queue[2]
      //   queue[2] = placeHolder
      //   queue.pop()
      // }
    })
  }
}

const terrainConditions = {
  etc: {
    trick_room: {
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
  }
}

function attackLanded(odds){
  let accRNG
  accRNG = Math.floor(Math.random() * 100)
  if(accRNG <= odds) return true
}

let fasterHpBeforeMove
let slowerHpBeforeMove

function attackMove(e) {
  for(let i = 0; i < ally.moves.length; i++){
    if(ally.moves[i].name === `${e.target.textContent.replace(/ /g, "_")}`){
      currMove = ally.moves[i]
      break
    }
  }

  // console.log('YOYO')

  if(currMove.pp === 0){
    // change pp digits for red
  }

  if(currMove.pp > 0){
    // gonna need to reorganize if i put double battles at some point
    // should maybe put all the battle management in class with move method
    
    let fasterCheck = false
    let slowerCheck = false
    let confusionProcess = {ally: false, foe: false}
  
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

    let itemEvent = false
  
    function statusEvent(target, targetMove, recipient, statusIcon){
      let confusionCheck = false
  
      function lastMoveStatusEvent(){
        // console.log(target.id)
        // console.log(slower.id)
        if(target.id == slower.id){
          console.log('manageCheckStatusEvent')
          manageCheckStatusEvent(faster, slower)
          console.log(faster.status.name)
          // console.log(faster.status.name != null && terrainConditions.etc.trick_room.active)
          if(terrainConditions.etc.trick_room.active){
            if(faster.status.name != null && slower.status == null){
              console.log('trickroom + status special event weather trigger')
              if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
              else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
            }
          } else {
            console.log('lmao')
            if(faster.status.name != null && slower.status == null){
              console.log('status special event weather trigger')
              // if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
              // else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
            }
          }
        }
      }

      function normalMoveEvent() {
        if(attackLanded(targetMove.acc)) {
          moveProcess = true
    
          if(confusionCheck) {
            // target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState})
            // console.log('confusion check')
            return
          }
    
          // vvvvvvvvvv HERE IS NORMAL MOVE vvvvvvvv
          if(target.status.name == 'para') return
          if(target.status.name == 'slp') return
          target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
          console.log('YAYA')
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
  
      if(target.isEnemy) {if(confusionProcess.foe) pass = false}
      else if(confusionProcess.ally) pass = false
  
      console.log(confusionProcess.foe)
      console.log(confusionProcess.ally)
  
      if(pass){
        if(target.status.name == 'para') {
          if(attackLanded(25)) {
            // if(target.isEnemy) {if(confusionProcess.foe) return}
            // else if(target.isEnemy) if(confusionProcess.ally) return
            target.miss('para', renderedSprites, queueProcess)
          } else {
            if(attackLanded(targetMove.acc)) {
              moveProcess = true
              target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
              console.log('YAYA')
            } else {
              if(target.hp <= 0) return
              target.miss('missed', renderedSprites, queueProcess)
            }
          }

          manageCheckStatusEvent(faster, slower)

          return
        } else if(target.status.name == 'slp'){
          if(target.status.turns <= 2) {
            console.log('sleep')
            if(attackLanded(75)) {
              console.log('sleep 2')
              target.miss('slp', renderedSprites, queueProcess)
              return
            } else {
              console.log('wakeup')
              target.dialogue('battle', `${target.name} woke up!`)
              target.status.name = null
              target.status.turns = 0
              statusIcon.style.display = 'none'
              if(attackLanded(targetMove.acc)) {
                moveProcess = true
                setTimeout(() =>{
                  target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                  console.log('YAYA')
                }, 1250)
              } else {
                if(target.hp <= 0) return
                queue.push(() => target.miss('missed', renderedSprites, queueProcess))
              } 
              return
            }
          } else {
            console.log('forced wakeup')
            target.dialogue('battle', `${target.name} woke up!`)
            target.status.name = null
            target.status.turns = 0
            statusIcon.style.display = 'none'
            if(attackLanded(targetMove.acc)) {
              moveProcess = true
  
              setTimeout(() =>{
                target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                console.log('YAYA')
              }, 1250)
            } else {
              if(target.hp <= 0) return
              queue.push(() => target.miss('missed', renderedSprites, queueProcess))
            } 
          }
        } else normalMoveEvent()
  
        lastMoveStatusEvent()
        return
      }

      normalMoveEvent()
      lastMoveStatusEvent()
    }
  
    function afflictionsEvent(target, targetMove, recipient, check, flinched, statusIcon){
      // console.log(queue[0])
      fasterCheck = false
      slowerCheck = false
      confusionProcess.foe = false
      confusionProcess.ally = false
  
      target.affliction.forEach((affliction, i) =>{
        if(!flinched){
          if(i == 0 && affliction.active) {
            // queue.length = 0
  
            if(target.isEnemy) confusionProcess.foe = true
            else confusionProcess.ally = true
  
            queueProcess.disabled = true
            console.log('there')
  
            if(check == 'fasterCheck') fasterCheck = true
            else slowerCheck = true
  
            // console.log('juste icitte')
            target.statusEffectAnimation('confusion', renderedSprites, queueProcess, confusionProcess)
            target.dialogue('battle', `${target.name} is confused..`)
  
            affliction.turns--
  
            setTimeout(() =>{
              // console.log('????')
              queueProcess.disabled = true
              if(affliction.turns == 0){
                target.dialogue('battle', `${target.name} snapped out of confusion!`)
                if(target.isEnemy) confusionProcess.foe = false
                else confusionProcess.ally = false
  
                target.affliction[0].active = false
  
                setTimeout(() =>{
                  // queueProcess.disabled = true
                  // console.log('here')
  
                  statusEvent(target, targetMove, recipient, statusIcon)
                  // console.log(`status event`)
                  if(battleType != 'trainer') if(target.hp <= 0){
                    faintEvent(target)
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
  
              if(attackLanded(50)) {
                // console.log('confused')
                queueProcess.disabled = true
                // console.log('there')
                target.miss('confusion', renderedSprites, queueProcess)
                if(target.isEnemy) confusionProcess.foe = true
                else confusionProcess.ally = true
  
                if(battleType != 'trainer') if(target.hp <= 0) faintEvent(target)
  
                // console.log('YAYA')
              } else {
                // console.log('not confused')
                statusEvent(target, targetMove, recipient, statusIcon)
                if(target.isEnemy) confusionProcess.foe = false
                else confusionProcess.ally = false
  
                // console.log(`status event`)
                if(battleType != 'trainer') if(target.hp <= 0) faintEvent(target)
  
                // check para and sleep here
  
                if(target.status.name == 'para') {
                  if(attackLanded(25)) {
                    // if(target.isEnemy) {if(confusionProcess.foe) return}
                    // else if(target.isEnemy) if(confusionProcess.ally) return
                    target.miss('para', renderedSprites, queueProcess)
                    return
                  } else {
                    if(attackLanded(targetMove.acc)) {
                      moveProcess = true
                      target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                      console.log('YAYA')
                    } else {
                      if(target.hp <= 0) return
                      target.miss('missed', renderedSprites, queueProcess)
                    }
                    return
                  }
                } else if(target.status.name == 'slp'){
                  if(target.status.turns <= 2) {
                    if(attackLanded(75)) {
                      target.miss('slp', renderedSprites, queueProcess)
                      return
                    } else {
                      target.dialogue('battle', `${target.name} woke up!`)
                      target.status.name = null
                      target.status.turns = 0
                      statusIcon.style.display = 'none'
                      if(attackLanded(targetMove.acc)) {
                        moveProcess = true
  
                        setTimeout(() =>{
                          target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                          console.log('YAYA')
                        }, 1250)
                      } else {
                        if(target.hp <= 0) return
                        queue.push(() => target.miss('missed', renderedSprites, queueProcess))
                      } 
                      return
                    }
                  } else {
                    target.dialogue('battle', `${target.name} woke up!`)
                    target.status.name = null
                    target.status.turns = 0
                    statusIcon.style.display = 'none'
                    if(attackLanded(targetMove.acc)) {
                      moveProcess = true
                      
                      setTimeout(() =>{
                        target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                        console.log('YAYA')
                      }, 1250)
                    } else {
                      if(target.hp <= 0) return
                      queue.push(() => target.miss('missed', renderedSprites, queueProcess))
                    } 
                  }
                } else {
                  target.move({move: targetMove, recipient, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                  console.log('YAYA')
                }
  
                // console.log('end turn check')
              }
  
              // console.log(target.id)
              // console.log(slower.id)
  
              if(target.id == slower.id){
                manageCheckStatusEvent(faster, slower)
                console.log('manageCheckStatusEvent')
                // console.log(faster.status.name != null && terrainConditions.etc.trick_room.active)
                if(faster.status.name != null && terrainConditions.etc.trick_room.active){
                  if(target.isEnemy) target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
                  else target.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
                }
              }
  
              // console.log('terrain management')
  
              setTimeout(() =>{
                queueProcess.disabled = false
              }, 1250)
            }, 1500)
          }
        }
      })
    }
  
    // pushes to queue the check for end of turn item even such as focus sash and focus band
    function pushRecipientEndOfTurnBattleItemEvent(target, targetHpBeforeMove, recipientHpBeforeMove){
      if(target.heldItem != null) if(target.heldItem.heldType != undefined) if(target.checkBattleItemRng()) {
        if(target.heldItem.heldThreshHold != undefined && target.heldItem.heldThreshHold <= target.convertToPercentage(target.hp, target.stats.baseHp)) return
        itemEvent = true
        inBattleCharacters.ally = ally
        inBattleCharacters.foe = foe
        queue.push(() => target.useBattleItem(queueProcess, queue, faintEvent, targetHpBeforeMove, recipientHpBeforeMove, moves, inBattleCharacters, renderedSprites, critLanded, terrainConditions, queueFaintTrigger, manageWeatherState))
      }
    }

    // check for para and confusion
    afflictionsEvent(faster, fasterMove, slower, 'fasterCheck', false, fasterStatusIcon)

    // faster attack
    if(!fasterCheck) {
      // console.log('does this ever fire? lmao')
      statusEvent(faster, fasterMove, slower, fasterStatusIcon)
      // console.log(`status event`)
      pushRecipientEndOfTurnBattleItemEvent(slower, slowerHpBeforeMove, fasterHpBeforeMove)
    }

    // checks if either 'mons died from the interaction

    // vvvvv 2 pushes right here, not a good idea vvvvv 
    checkIfFainted(faster)
    checkIfFainted(slower)

    // seperate current queue from lvl up process
    // this queue will get pushed back into the main queue after the level up process
    let flippedQueue

    if(itemEvent) flippedQueue = queue.splice(1, queue.length)
    else flippedQueue = queue.splice(0, queue.length)

    queue.push(() =>{
      if(slower.fainted){
        manageCheckStatusEvent(faster, slower)
        console.log('manageCheckStatusEvent')
        afflictionsEvent(slower, slowerMove, faster, 'slowerCheck', true, slowerStatusIcon)
      } else {
        pushRecipientEndOfTurnBattleItemEvent(faster, fasterHpBeforeMove, slowerHpBeforeMove)
        if(slower.convertToPercentage(slower.hp, slower.stats.baseHp) != slowerHpBeforeMove){
          if(slower.flinched){
            slower.miss('flinched', renderedSprites, queueProcess)
            slower.flinched = false
            manageCheckStatusEvent(faster, slower)  
            afflictionsEvent(slower, slowerMove, faster, 'slowerCheck', true, slowerStatusIcon)
            return
          }
        }
        
        if(!slowerCheck){


          if(slower.isEnemy) {
            if(!confusionProcess.foe) statusEvent(slower, slowerMove, faster, slowerStatusIcon)
          } else {
            if(!confusionProcess.ally) statusEvent(slower, slowerMove, faster, slowerStatusIcon)
          }

          afflictionsEvent(slower, slowerMove, faster, 'slowerCheck', false, slowerStatusIcon)

          // console.log('YAYA')
          // console.log(`status event`)
        }
      }

      // might be where weather is put as first end turn index thingy
      flippedQueue.forEach(func =>{
        queue.push(func)  
      })
    })
  }
}

// vv this is funny
export function manageBattleQueue(state){
  queueProcess.disabled = state
}

export let moveProcess = false

let queueFaintTrigger = {
  initiated: false
}

let unstuckQueueFlag = false
let previousFirstQueueIndex = null

// setInterval(() =>{
//   unstuckQueueFlag = false
//   console.log('not a good idea lmao')
// }, 3000)

function spendQueue(){
  if(queueProcess.disabled) {
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
  }

  if(queue.length > 0){
    // console.log(queue)
    queue[0]()
    queue.shift()
    return
  } else if(queueFaintTrigger.initiated){
    ally.protected.active = false
    foe.protected.active = false
    queueFaintTrigger.initiated = false

    manageFaintingEvent(foe)

    if(evoArr.length > 0){
      // queue.push(() => ally.dialogue('battle', `You have defeated ${foe.name}!`))
      queue.push(() => {
        if(battleType == 'trainer') {if(enemyTeamWiped(enemyTrainerInfo)) {
          manageEvolution(evoArr)
        }}
        else {
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
  } else {
    setTimeout(() =>{
      if(queue.length > 0) return
      
      ally.protected.active = false
      foe.protected.active = false
      queueFaintTrigger.initiated = false
  
      dialogueInterfaceDom.style.display = 'none'
      document.querySelector('#proceedImgContainer').style.display = 'none'
      if(scenes.get('battle').initiated) encounterInterfaceDom.style.display = 'grid'
      moveProcess = false
    }, 50)

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