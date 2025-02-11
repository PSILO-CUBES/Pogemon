import { audioObj } from "./data/audioData.js"
import { movesObj } from "./data/movesData.js"
import { natureObj } from "./data/natureData.js"
import { pogemonsObj } from "./data/pogemonData.js"
import { typesObj } from "./data/typesData.js"

import { c } from "./scripts/canvas.js"
import { loadData } from "./save.js"
import { abilitiesObj } from "./data/abilitiesData.js"

export class Sprite {
  constructor({
    type, 
    position, 
    img, 
    frames = {max : 1, hold: 50}, 
    sprites, 
    animate = false, 
    rotation = 0
  }){
    this.type = type
    this.position = position,
    this.img = img
    this.frames = {...frames, val: 0, elapsed: 0}
    this.img.onload = () =>{
      this.width = this.img.width / this.frames.max
      this.height = this.img.height / this.frames.max
    }
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.rotation = rotation
  }

  draw(){
    c.save()
    c.translate(
      this.position.x + this.width / 2, 
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2, 
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity
    c.drawImage(
      this.img,
      this.frames.val * this.width,
      0,
      this.img.width / this.frames.max,
      this.img.height,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height
    )
    c.restore()


    if(!this.animate) {
      this.frames.val = 0 
      return
    }

    if(this.frames.max > 1) this.frames.elapsed++


    if (this.frames.elapsed % this.frames.hold === 0){
      if(this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}

const tileSetPixelSize = 16
const zoom = 4
export const tileSize = tileSetPixelSize * zoom

export class Boundary {
  static width = tileSize
  static height = tileSize
  constructor({
    position, 
    type,
    info,
    name,
    collision,
    collisionInstance,
    character,
  }){
    this.position = position
    this.type = type
    this.width = tileSize
    this.height = tileSize
    this.color
    if(info != undefined) this.info = info
    this.generateInfo()
    this.name = name
    this.collision = collision
    this.collisionInstance = collisionInstance
    this.character = character
  }

  generateInfo(){
    const opacity = 0
    const opacity2 = 0
    switch(this.type){
      case 1:
        this.color = `rgba(255,0,0,${opacity})`
        break
      case 2:
        this.color = `rgba(100,0,0,${opacity})`
        break
      case 3:
        this.color = `rgba(255,255,255,${opacity2})`
        break
      case 4:
        this.color = `rgba(150,150,150,${opacity2})`
        break
      case 5:
        this.color = `rgba(150,150,150,${opacity2})`
        break
      case 6:
        this.color = `rgba(250,150,50,${opacity2})`
        break
      case 7:
        this.color = `rgba(0,150,50,${opacity})`
        break
      case 8:
        this.color = `rgba(0,0,150,${opacity})`
        break
      case 9:
        this.color = `rgba(100,100,100,${opacity})`
        break
    }
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}

const data = await loadData('saveFile')
console.log(data)

export let id = 1
if(data != undefined) id = data.currId

export const statsChangeObj = {
  ally :{
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
  },
  foe:{
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
}

export class Pogemon extends Sprite{
  constructor(
    pogemon,
    exp,
    isEnemy,
    map,
    heldItem,
    predeterminedAbility,
    predeterminedShiny,
    predeterminedIvs,
    predeterminedMoves,
    predeterminedGender,
    predeterminedNature,
    shinyCharm,
    preBuilt,
    {
      type, 
      position, 
      img, 
      frames,
      sprites, 
      animate,
      rotation
    },
  ){
    super({
      type, 
      position, 
      img, 
      frames, 
      sprites, 
      animate, 
      rotation
    })
    this.id = this.generateId()
    this.pogemon = pogemon
    this.name = this.pogemon.name
    this.nickname = this.pogemon.name
    this.isEnemy = isEnemy
    this.knockedOff = false
    this.roosted = false
    this.choiceItem = {
      type: null,
      move: null
    }
    this.preBuilt = preBuilt
    this.element = {
      1: this.pogemon.element[1],
      2: this.pogemon.element[2]
    }
    this.subHp = 0
    this.protected = {
      active : false,
      turns: 0
    }
    if(preBuilt == null){
      this.exp = exp
      this.lvl = this.generateLevel()
      this.nature = this.generateNature(predeterminedNature)
      this.gender = this.generateGender(predeterminedGender)
      this.ivs = this.generateIVs(predeterminedIvs)
      this.stats = this.generateStats()
      this.isShiny = this.generateShiny(predeterminedShiny, shinyCharm)
      this.hp = this.stats.baseHp
      this.status = {name: null, turns: 0}
      this.affliction = [
        {name: 'confusion', turns: 0, active: false},
        {name: 'seeded', active: false},
        {name: 'taunt', turns: 0, active: false}
      ]
      this.flinched = false
      this.fainted = false
      this.evo = this.pogemon.evo
      this.abilityInfo = this.generateAbility(predeterminedAbility)
      this.moves = this.generateMoves(true, predeterminedMoves)
      this.animationProperties = pogemon.animationProperties
      this.heldItem = heldItem
      this.friendliness = 0
      this.catchInfo = this.generateCatchInfo(new Date())
      this.caughtMap = {...map}
    } else {
      this.id = preBuilt.id
      this.nickname = preBuilt.nickname
      this.learntMoves = preBuilt.learntMoves
      this.exp = preBuilt.exp
      this.lvl = preBuilt.lvl
      this.nature = preBuilt.nature
      this.gender = preBuilt.gender
      this.ivs = preBuilt.ivs
      this.stats = preBuilt.stats
      this.isShiny = preBuilt.isShiny
      this.hp = preBuilt.hp
      this.status = preBuilt.status
      this.affliction = preBuilt.affliction
      this.flinched = preBuilt.flinched
      this.fainted = preBuilt.fainted
      this.evo = this.pogemon.evo
      this.abilityInfo = preBuilt.abilityInfo
      this.moves = preBuilt.moves
      this.pogemon.movepool = pogemonsObj[this.name].movepool
      this.animationProperties = preBuilt.animationProperties
      this.heldItem = preBuilt.heldItem
      this.friendliness = preBuilt.friendliness
      this.catchInfo = {
        date: new Date(preBuilt.catchInfo.date),
        lvl: preBuilt.catchInfo.lvl
      }
      this.caughtMap = {...preBuilt.caughtMap}
      this.preBuilt = null
    }
  }

  generateId(){
    // if(this.id == undefined) return
    // console.log(id)

    const currId = id
    id++
    
    return currId
  }

  generateNature(predeterminedNature){
    let name
    let values

    if(predeterminedNature == null){
      const rng = Math.floor(Math.random() * Object.keys(natureObj).length)

      name = Object.keys(natureObj)[rng]
    } else {
      name = predeterminedNature
    }

    values = natureObj[name]

    return {name, values}
  }

  generateGender(predeterminedGender){
    //should add param that changes odds based on species
    let gender

    if(predeterminedGender == undefined){
      const rng = Math.floor(Math.random() * 2)
      if(rng == 1) gender = 'male'
      else gender = 'female'
    } else gender = predeterminedGender

    switch(this.name){
      case 'steeli':
      case 'steeler':
      case 'steevil':
      case 'disso':
      case 'niktamer':
      case 'vignus':
      case 'caera':
      case 'papien':
      case 'mortdux':
      case 'sustiris':
      case 'beeasis':
      case 'malumtehk':
      case 'daghua':
        gender = null
        break
    }

    return gender
  }

  generateIVs(predeterminedIvs){
    let ivObj = {
      baseHp: 0,
      atk: 0,
      def: 0,
      spatk: 0,
      spdef: 0,
      spd: 0,
    }

    Object.keys(ivObj).forEach(stat =>{
      if(stat === 'baseHp'){
        ivObj.baseHp = Math.floor(Math.random() * 31)
      } else {
        ivObj[stat] = Math.floor(Math.random() * 31)
      }
    })

    if(predeterminedIvs != null){
      ivObj = {
        baseHp: 31,
        atk: 31,
        def: 31,
        spatk: 31,
        spdef: 31,
        spd: 31,
      }
    }

    return ivObj
  }

  generateStats(){
    const statObj = {
      baseHp: 0,
      spd: 0,
      atk: 0,
      def: 0,
      spatk: 0,
      spdef: 0,
    }

    Object.keys(statObj).forEach(stat =>{
      if(stat === 'baseHp'){
        statObj[stat] = Math.floor(0.01 * (2 * this.pogemon.stats.hp + this.ivs.baseHp) * this.lvl) + this.lvl + 10
      } else {
        if(stat === this.nature.values.inc && stat === this.nature.values.dec) {
          statObj[stat] = Math.floor((0.01 * (2 * this.pogemon.stats[stat] + this.ivs[stat]) * this.lvl) + 5)
        } else {
          if(stat === this.nature.values.inc) statObj[stat] = Math.floor(((0.01 * (2 * this.pogemon.stats[stat] + this.ivs[stat]) * this.lvl) + 5) * 1.1)
          else if(stat === this.nature.values.dec) statObj[stat] = Math.floor(((0.01 * (2 * this.pogemon.stats[stat] + this.ivs[stat]) * this.lvl) + 5) * 0.9)
          else statObj[stat] = Math.floor((0.01 * (2 * this.pogemon.stats[stat] + this.ivs[stat]) * this.lvl) + 5)
        }
      }
    })

    return statObj
  }

  generateAbility(predeterminedAbility){
    let index
    let ability

    if(predeterminedAbility != null){
      for(let i = 0; i < this.pogemon.abilities.length; i++){
        if(this.pogemon.abilities[i].ability.name == predeterminedAbility.name){
          index = i
          ability = {...predeterminedAbility}

          this.pogemon.abilities[index].seen = true
        }
      }
    } else {
      index = Math.floor(Math.random() * Math.floor(this.pogemon.abilities.length))
      ability = {...this.pogemon.abilities[index].ability}
  
      this.pogemon.abilities[index].seen = true
    }

    return {ability, index}
  }

  generateMoves = (init, predeterminedMoves) => {
    let moves = []
    let movepool = this.pogemon.movepool

    if(predeterminedMoves != undefined || predeterminedMoves != null){
      moves = predeterminedMoves
    } else {
      if(!init){
        moves = this.moves
      } else this.learntMoves = new Array()
  
      Object.keys(movepool).forEach(key =>{
        if(movepool[key].lvl <= this.lvl){
          if(!init){
            if(this.learntMoves.includes(movepool[key].move.name)) return
  
            moves.push({...movepool[key].move})
            if(!this.isEnemy) movepool[key].seen = true

            console.log(movepool[key])
          } else {
            // isint an array when trying to push things to it
            if(this.learntMoves.includes(movepool[key].move.name)) return
  
            this.learntMoves.push(movepool[key].move.name)
            if(!this.isEnemy) movepool[key].seen = true

            console.log(movepool[key])
            
  
            if(moves.length == 4) moves.splice(0, 1)
            moves.push({...movepool[key].move})
          }
        }
      })
    }

    return moves
  }

  generateLevel(){
    return Math.floor(Math.cbrt(this.exp))
  }

  generateCatchInfo(date){
    const catchInfo = {
      lvl: this.lvl,
      date
    }
    
    return catchInfo
  }

  generateShiny(predeterminedShiny, charm){
    let odds

    if(charm == 0) odds = 252
    else odds = 126

    const rng = Math.floor(Math.random() * odds)

    if(rng == 0) return true
    else if(predeterminedShiny != null) return true
    else return false
  }

  convertToPercentage(numerator , denominator){
    let percentage = 100 * numerator / denominator 

    if(numerator <= 0) percentage = 0

    return Math.floor(percentage)
  }

  dialogue(type, text){
    switch(type){
      case 'overworld':
        document.querySelector('#overworldDialogueContainer').style.display = 'grid'
        document.querySelector('#overworldDialogue').innerText = text
        break
      case 'battle':
        let dialogueInterfaceDom = document.querySelector('#dialogueInterface')
        let movesInterface = document.querySelector('#movesInterface')
    
        dialogueInterfaceDom.style.display = 'block'
        dialogueInterfaceDom.innerText = text

        document.querySelector('#proceedImgContainer').style.display = 'block'
    
        movesInterface.style.display = 'none'
        break
      case 'evolution':
        document.querySelector('#evolutionInterface').style.display = 'block'

        let evolutionDialogueDom = document.querySelector('#evolutionDialogue')
    
        evolutionDialogueDom.style.display = 'block'
        evolutionDialogueDom.innerText = text
        break
      case 'bag':
        document.querySelector('.bagSceneItemDialogueContainer').style.display = 'block'
        document.querySelector('.bagSceneItemDialogueContainer').innerText = text
        break
    }
  }

  setCorrectHold(){
    const hpToPercent = this.convertToPercentage(this.hp, this.stats.baseHp)

    if(hpToPercent >= 50) this.frames.hold = 60
    else if(hpToPercent < 50 && hpToPercent >= 25) this.frames.hold = 90
    else if(hpToPercent < 25 && hpToPercent > 0) this.frames.hold = 120
    else if(hpToPercent <= 0){
      this.frames.hold = 0
      this.frames.val = 0
    } 
  }

  hpManagement(){
    const hpToPercent = this.convertToPercentage(this.hp, this.stats.baseHp)

    let recipientHealthBar = document.querySelector('#allyHealthBar')
    let hpDom = document.querySelector('#allyHp')

    if(this.isEnemy){
      recipientHealthBar = document.querySelector('#foeHealthBar')
      hpDom = document.querySelector('#foeHp')
    }

    gsap.to(recipientHealthBar, {
      width: `${hpToPercent}%`
    })

    let hpColor

    if(hpToPercent >= 50) hpColor = 'green'
    else if(hpToPercent < 50 && hpToPercent >= 25) hpColor = 'yellow'
    else if(hpToPercent < 25 && hpToPercent > 0) hpColor = 'red'
    else if(hpToPercent <= 0) hpColor = 'black'
    

    // vv not sure why i check for this.hp >= 0 here vv
    if(this.hp >= 0) hpDom.textContent = `${this.hp}/${this.stats.baseHp}`
    else hpDom.textContent = `0/${this.stats.baseHp}`

    recipientHealthBar.style.backgroundColor = hpColor
  }

  managePP(move){
    let movePP

    for(let i = 0; i < this.moves.length; i++){
      if(this.moves[i].name === move.name){
        if(this.moves[i].pp > 0) this.moves[i].pp--
      }
    }

  }

  switchUnderScoreForSpace(text){
    return text.replace(/_/g, ' ')
  }

  switchSpaceForUnderScore(text){
    return text.replace(' ', '_')
  }

  statusAnimation(type, effect, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess){
    if(this.fainted) return
    queueProcess.disabled = true
    console.log('there')

    const statusImg = new Image()
    if(move.type != undefined) statusImg.src = move.sprite


    const statusSprite = new Sprite({
      type: 'attack',
      position: {
        x: this.position.x + this.width / 6,
        y: this.position.y + this.height * 1.5
      },
      img: statusImg,
      frames: {
        max: 4,
        hold: 50
      },
      animate: true,
    })

    if(this.isEnemy){
      // statusSprite.position = {
      //   x: this.position.x - this.width / 4,
      //   y: this.position.y - this.height / 2
      // }

      if(move.rotation != undefined) statusSprite.rotation = move.rotation.foe
    } else {
      if(move.rotation != undefined) statusSprite.rotation = move.rotation.ally
    }

    let webInteraction = false

    let chooseAnimation = (type, effect, move, i, effectArr) =>{
      if(!this.isEnemy){
        statusSprite.position = {
          x: recipient.position.x - recipient.width / 8,
          y: recipient.position.y - recipient.height / 2
        }
      } else {
        statusSprite.position = {
          x: recipient.position.x + recipient.width / 8,
          y: recipient.position.y + recipient.height 
        }
      }

      queueProcess.disabled = true
      console.log('there')

      let effectType = false
      if(effect != undefined) if(effect.type != undefined) if(effect.type == 'stats') effectType = true


      if(type == 'heal'){
        if(this.isEnemy){
          statusSprite.position = {
            x: this.position.x - this.width / 8,
            y: this.position.y - this.height
          }
        } else {
          statusSprite.position = {
            x: this.position.x + this.width / 8,
            y: this.position.y + this.height * 1.15
          }
        }

        if(move.type != 'heal'){
          if(move.effects != null) if(Object.keys(move.effects[0]) == 'leech') statusSprite.img.src = 'img/moves/heal.png'
          else statusSprite.img.src = move.sprite
        }
      
        renderedSprites.push(statusSprite)

        setTimeout(() =>{
          // queueProcess.disabled = false
          // console.log('here')
          renderedSprites.pop()
        }, 1000)
      } else if (effectType || move.animationType == 'stats' || move.animationType == 'statsSelf') {

        if(move.type != undefined){
          if(move.name == 'sticky_web') {
            webInteraction = true
          } else if(move.type == 'status'){
            
            let rotation
  
            if(movesObj[move.name].rotation != undefined) 
              if(this.isEnemy) rotation = movesObj[move.name].rotation.foe
              else rotation = movesObj[move.name].rotation.ally
  
            const statsAnimationImage = new Image()
            statsAnimationImage.src = move.sprite
            const statsAnimationSprite = new Sprite({
              type: 'moveSprite',
              position: {
                x: recipient.position.x,
                y: recipient.position.y
              },
              img: statsAnimationImage,
              frames:{
                max: 4,
                hold: 50
              },
              animate: true,
              rotation
            })
  
            if(move.animationType == 'statsSelf'){
              if(this.isEnemy){
                statsAnimationSprite.position = {
                  x: this.position.x - this.width / 8,
                  y: this.position.y + this.height / 4
                }
              } else {
                statsAnimationSprite.position = {
                  x: this.position.x + this.width / 4,
                  y: this.position.y + this.height / 0.65
                }
              }
            } else {
              if(this.isEnemy){
                statsAnimationSprite.position = {
                  x: recipient.position.x + this.width / 2,
                  y: recipient.position.y + this.height * 3
                }
              } else {
                statsAnimationSprite.position = {
                  x: recipient.position.x,
                  y: recipient.position.y
                }
              }
            }
  
            renderedSprites.splice(2,0,statsAnimationSprite)
            console.log('remove sprite')
          }
        }

        let tier = 'tiers'
        if(effect.pow == 1) tier = 'tier' 

        // let recipientStatus = document.querySelector('#foeStatus')

        let userStatsChangeContainer = 'allyStatusEffectContainer' 
        let recipientStatsChangeContainer = 'foeStatusEffectContainer'
    
        let movementDistance = 20
  
        let rotation
        if(move.rotation != undefined) rotation = move.rotation.ally
    
        let duration
        if(move.duration != undefined) duration = move.duration
        
        let launcPos = this.pogemon.animationPositions.ally.launch
        let receivePos = recipient.pogemon.animationPositions.foe.receive
    
        if(this.isEnemy){
          // recipientStatus = document.querySelector('#allyStatus')
    
          userStatsChangeContainer = 'foeStatusEffectContainer'
          recipientStatsChangeContainer = 'allyStatusEffectContainer'
    
          movementDistance = -20
          
          if(move.type != undefined) if(movesObj[move.name].rotation != undefined) rotation = movesObj[move.name].rotation.foe
          launcPos = this.pogemon.animationPositions.foe.launch
    
          receivePos = recipient.pogemon.animationPositions.ally.receive
        }

        const spinAwayBool = target =>{
          let pass = false

          if(this.affliction[1].active) pass = true

          if(terrainConditions.static.stealth_rock.active[target]) pass = true

          if(terrainConditions.static.sticky_web.active[target]) pass = true

          return pass
        }
        
        setTimeout(() =>{
          console.log('remove sprite')

          //check status here
          let pass = false
          let rng = Math.floor(Math.random() * 99) + 1

          if(effect.rng >= rng) pass = true
          else if(effect.rng == undefined) pass = true

          if(pass){
            queueProcess.disabled = true
            console.log('there')

            setTimeout(() =>{
              queueProcess.disabled = true
              console.log('there')

              if(document.querySelector('#scene').childNodes.length > 3) document.querySelector('#scene').removeChild(document.querySelector('#scene').childNodes[document.querySelector('#scene').childNodes.length - 1])

              const buffDiv = document.createElement('div')

              document.querySelector('#scene').appendChild(buffDiv)


              let effectName = effect.name

              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                if(this.abilityInfo.ability.name != 'mold_Breaker') {
                  switch(effect.name){
                    case 'recipientBuff':
                      effectName = 'buff'
                      break
                    case 'debuff':
                      effectName = 'selfDebuff'
                      break
                  }
                }
              }

              if(this.abilityInfo.ability.name == 'contrary'){
                switch(effect.name){
                  case 'buff':
                    effectName = 'selfDebuff'
                    break
                  case 'selfDebuff':
                    effectName = 'buff'
                    break

                  case 'recipientBuff':
                    if(this.abilityInfo.ability.name != 'mold_Breaker') effectName = 'debuff'
                    break
                  case 'debuff':
                    if(this.abilityInfo.ability.name != 'mold_Breaker') effectName = 'recipientBuff'
                    break
                }
              }

              const statsChanceAnimationEvent = () =>{
                if(effectName == 'buff'){
  
                  if(!this.isEnemy){
                    if(statsChangeObj.ally.nominator[effect.target] > 8) {
                      statsChangeObj.ally.nominator[effect.target] = 8
                      // queueProcess.disabled = false
                      // console.log('here')
                      return
                    }
  
                    let statState = 'null'
                    let qnty = 0
  
                    if(effect.target == 'all'){
                      statState = 'all'
  
                      for(let i = 0 ; i < Object.values(statsChangeObj.ally.nominator).length; i ++){
                        const stat = Object.values(statsChangeObj.ally.nominator)[i]
                        console.log(stat)
                        if(stat > 8) {
                          Object.values(statsChangeObj.ally.nominator)[i] == 8
  
                          statState = 'some'
                          qnty = qnty + 1
                        }
                      }
  
                      if(qnty == 5) statState = 'none'
  
                      switch(statState){
                        case 'all':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nAll of it's stats went up!.`)
                          break
                        case 'some':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nSome of it's stats went up!.`)
                          break
                        case 'none':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut none of it's stats went up...`)
                          return
                      }
                    }
  
                    if(statsChangeObj.ally.nominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go up anymore.`)
                      return
                    }
                  
                    // ally buff
                    if(move.name == 'rapid_spin') {
                      this.dialogue(
                        'battle', 
                        `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.`
                      )
  
                      if(spinAwayBool('ally')){
                        this.affliction[1].active = false
  
                        terrainConditions.static.stealth_rock.active.ally = false
                        terrainConditions.static.sticky_web.active.ally = false
  
                        setTimeout(() =>{
                          this.dialogue(
                            'battle', 
                            `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.\n\n${this.switchUnderScoreForSpace(this.nickname)} spun all the hazards away on it's side of the battlefield.`
                          )
                        }, 1250)
                      }
                    } else if(effect.target != 'all') 
                      this.dialogue(
                        'battle', 
                        `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.`
                      )
  
                    buffDiv.setAttribute('class', `${effectName}Div ${userStatsChangeContainer}`)
                    buffDiv.style.top = -250
  
                    queueProcess.disabled = true
                    console.log('there')
                    
                    gsap.to(buffDiv, {
                      top: -650,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        // queueProcess.disabled = false
                        // console.log('here')
                      }
                    }) 
                  } else {
                    if(statsChangeObj.foe.nominator[effect.target] > 8) {
                      statsChangeObj.foe.nominator[effect.target] = 8
                      // queueProcess.disabled = false
                      // console.log('here')
                      return
                    }
  
                    let statState = 'null'
                    let qnty = 0
  
                    if(effect.target == 'all'){
                      statState = 'all'
  
                      for(let i = 0 ; i < Object.values(statsChangeObj.foe.nominator).length; i ++){
                        const stat = Object.values(statsChangeObj.foe.nominator)[i]
                        if(stat > 8) {
                          Object.values(statsChangeObj.foe.nominator)[i] = 8
  
                          statState = 'some'
                          qnty = qnty + 1
                        }
                      }
  
                      if(qnty == 5) statState = 'none'
  
                      switch(statState){
                        case 'all':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nAll of it's stats went up!.`)
                          break
                        case 'some':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nSome of it's stats went up!.`)
                          break
                        case 'none':
                          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut none of it's stats went up...`)
                          return
                      }
                    }
  
                    // if(statsChangeObj.foe.nominator[effect.target] == 8) return
                    if(statsChangeObj.foe.nominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go up anymore.`)
                      return
                    }
                  
                    // foe buff
                    if(move.name == 'rapid_spin') {
                      this.dialogue(
                        'battle', 
                        `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.`
                      )
  
                      if(spinAwayBool('foe')){
                        this.affliction[1].active = false
  
                        terrainConditions.static.stealth_rock.foe = false
                        terrainConditions.static.sticky_web.foe = false
  
                        setTimeout(() =>{
                          this.dialogue(
                            'battle', 
                            `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.\n\n${this.switchUnderScoreForSpace(this.nickname)} spun all the hazards away on it's side of the battlefield.`
                          )
                        }, 1250)
                      }
                    }  else if(effect.target != 'all') 
                      this.dialogue(
                        'battle', 
                        `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went up by ${effect.pow} ${tier}.`
                      )
  
                    buffDiv.setAttribute('class', `${effectName}Div ${userStatsChangeContainer}`)
                    buffDiv.style.top = -500
  
                    queueProcess.disabled = true
                    console.log('there')
                  
                    gsap.to(buffDiv, {
                      top: -700,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        // queueProcess.disabled = false
                        // console.log('here')
                      }
                    }) 
                  }
                } else if(effectName == 'recipientBuff'){
                  // recipientBuff
                  if(!this.isEnemy){
                    if(statsChangeObj.foe.denominator[effect.target] > 8) {
                      statsChangeObj.foe.denominator[effect.target] = 8
                      queueProcess.disabled = false
                      console.log('here')
                      return
                    }
                  
                    buffDiv.setAttribute('class', `buffDiv ${recipientStatsChangeContainer}`)
                    buffDiv.style.top = -500
                  
                    gsap.to(buffDiv, {
                      top: -700,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        queueProcess.disabled = false
                      console.log('here')
                      }
                    }) 
                  } else {
                    if(statsChangeObj.ally.denominator[effect.target] > 8) {
                      statsChangeObj.ally.denominator[effect.target] = 8
                      queueProcess.disabled = false
                      console.log('here')
                      return
                    }
                  
                    // foe debuff
                    buffDiv.setAttribute('class', `buffDiv ${recipientStatsChangeContainer}`)
                    buffDiv.style.top = -300
                  
                    gsap.to(buffDiv, {
                      top: -500,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        queueProcess.disabled = false
                        console.log('here')
                      }
                    }) 
                  }
                } else if(effectName == 'debuff'){
                  // debuff
                  if(recipient.abilityInfo.ability.name == 'big_Pecks') {
                    if(this.abilityInfo.ability.name != 'mold_Breaker') {
                      recipient.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s ability prevented it's ${effect.target} from going down.`)
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                        this.setCorrectHold()
                      }, 250)
                      return
                    }
                  }
  
                  let defiant = false
                  if(recipient.abilityInfo.ability.name == 'defiant') {
                    recipient.statusAnimation('status', recipient.abilityInfo.ability.effects, {name: 'defiant'}, this, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
                    defiant = true
                  }
                    
  
                  if(!this.isEnemy){
                    if(statsChangeObj.foe.denominator[effect.target] > 8) {
                      statsChangeObj.foe.denominator[effect.target] = 8
                      queueProcess.disabled = false
                      console.log('here')
                      return
                    }
  
                    if(statsChangeObj.foe.denominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go down anymore.`)
                      return
                    }
  
                    // ally debuff
                    if(move.name == 'sticky_web') this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.name)} got stuck in the sticky web!\n\n${this.switchUnderScoreForSpace(recipient.name)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
                    else this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(recipient.name)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
  
                    buffDiv.setAttribute('class', `${effectName}Div ${recipientStatsChangeContainer}`)
                    buffDiv.style.top = -800
  
                    queueProcess.disabled = true
                    console.log('there')
                  
                    gsap.to(buffDiv, {
                      top: -600,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        if(!defiant){
                          queueProcess.disabled = false
                          console.log('here')
                        }
                      }
                    }) 
                  } else {
                    if(statsChangeObj.ally.denominator[effect.target] > 8) {
                      statsChangeObj.ally.denominator[effect.target] = 8
                      queueProcess.disabled = false
                        console.log('here')
                      return
                    }
  
                    if(statsChangeObj.ally.denominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go down anymore.`)
                      return
                    }
  
                    // foe debuff
                    if(move.name == 'sticky_web') this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} got stuck in the sticky web!\n\n${this.switchUnderScoreForSpace(recipient.nickname)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
                    else this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(recipient.nickname)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
  
                    buffDiv.setAttribute('class', `${effectName}Div ${recipientStatsChangeContainer}`)
                    buffDiv.style.top = -850
  
                    queueProcess.disabled = true
                    console.log('there')
                  
                    gsap.to(buffDiv, {
                      top: -450,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        if(!defiant){
                          queueProcess.disabled = false
                          console.log('here')
                        }
                      }
                    }) 
                  }
  
                } else if(effectName == 'selfDebuff'){
                  let defiant = false
                  console.log(this)
                  if(this.abilityInfo.ability.name == 'defiant') {
                    this.statusAnimation('status', target.abilityInfo.ability.effects, {name: 'defiant'}, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
                    defiant = true
                  }
  
                  if(!this.isEnemy){
                    if(statsChangeObj.ally.nominator[effect.target] > 8) {
                      statsChangeObj.ally.nominator[effect.target] = 8
                      queueProcess.disabled = false
                      console.log('here')
                      return
                    }
  
                    if(statsChangeObj.ally.nominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go down anymore.`)
                      return
                    }
  
                    if(statsChangeObj.ally.nominator[effect.target] == 8) return
                  

                    // ally buff
                    if(recipient.abilityInfo.ability.name == 'magic_Bounce') 
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ability made ${this.switchUnderScoreForSpace(recipient.nickname)}'s move bounce back!\n\n${this.switchUnderScoreForSpace(recipient.name)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
                    else
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
    
                    buffDiv.setAttribute('class', `debuffDiv ${userStatsChangeContainer}`)
                    buffDiv.style.top = -850
  
                    queueProcess.disabled = true
                    console.log('there')
                  
                    gsap.to(buffDiv, {
                      top: -450,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        if(!defiant){
                          queueProcess.disabled = false
                          console.log('here')
                        }
                      }
                    }) 
                  } else {
                    if(statsChangeObj.foe.nominator[effect.target] > 8) {
                      statsChangeObj.foe.nominator[effect.target] = 8
                      queueProcess.disabled = false
                      console.log('here')
                      return
                    }
  
                    if(statsChangeObj.foe.nominator[effect.target] == 8) {
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nBut it's ${effect.target} can't go down anymore.`)
                      return
                    }
  
                    if(statsChangeObj.foe.nominator[effect.target] == 8) return
                  
                    // foe buff
                    if(recipient.abilityInfo.ability.name == 'magic_Bounce') 
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ability made ${this.switchUnderScoreForSpace(recipient.nickname)}'s move bounce back!\n\n${this.switchUnderScoreForSpace(recipient.name)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
                    else
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\n${this.switchUnderScoreForSpace(this.nickname)}'s ${effect.target} went down by ${effect.pow} ${tier}.`)
  
                    buffDiv.setAttribute('class', `debuffDiv ${userStatsChangeContainer}`)
                    buffDiv.style.top = -800
  
                    queueProcess.disabled = true
                    console.log('there')
                  
                    gsap.to(buffDiv, {
                      top: -600,
                      duration: 0.5,
                      onComplete: () =>{
                        document.querySelector('#scene').removeChild(buffDiv)
                        if(!defiant){
                          if(this.abilityInfo.ability.name != 'weak_Armor'){
                            queueProcess.disabled = false
                            console.log('here')
                          }
                        }
                      }
                    }) 
                  }
                }
              }
              
              if(recipient.abilityInfo.ability.name == 'magic_Bounce' && effectName == 'selfDebuff'){
                if(this.fainted) return
                if(recipient.fainted) return
                queueProcess.disabled = true
                console.log('there')

                setTimeout(() =>{
                  this.dialogue('battle', `${recipient.nickname}'s ability made ${this.nickname}'s move bounce back!`)
                }, 1250)

                setTimeout(() =>{
                  statsChanceAnimationEvent()
                }, 2500)
              } else {
                if(this.fainted) return
                if(recipient.fainted) return
                statsChanceAnimationEvent()
              }


              if(i + 1 == effectArr.length) setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
                this.setCorrectHold()
              }, 250)
            }, 1250 * (i + 1))
          }

          //probably fucky here
          
          // if(move.effects != null) if(i == Object.values(move.effects).length - 1){
          //   if(Object.values(move.effects).length > 1) {
          //     // queue.splice(1,1)[0]()
          //   }
            
          //   // queue.push(queue.splice(0,1)[0])

          //   // if(this.fainted || recipient.fainted) queueFaintTrigger.initiated = true
          // }

          setTimeout(() =>{
            if(move.type == 'status') renderedSprites.splice(2,1)
              setTimeout(() =>{
                // queueProcess.disabled = false
                // console.log('here')
              }, 500)
          }, 1250)
        }, 0)
      } else if (move.animationType == 'status' || move.animationType == 'statusSelf') {
        switch(move.name) {
          case 'rainy_day':
            if(terrainConditions.turns.weather.rain.active) queueProcess.disabled = false
            else {
              terrainConditions.turns.weather.rain.active = true
              terrainConditions.turns.weather.rain.turns = 5
            }
            break
          case 'sunny_day':
            if(terrainConditions.turns.weather.sun.active) queueProcess.disabled = false
            else {
              terrainConditions.turns.weather.sun.active = true
              terrainConditions.turns.weather.sun.turns = 5
            }
            break
          case 'sand_storm':
            if(terrainConditions.turns.weather.sand.active) queueProcess.disabled = false
            else {
              terrainConditions.turns.weather.sand.active = true
              terrainConditions.turns.weather.sand.turns = 5
            }
            break
          case 'snow_storm':
            if(terrainConditions.turns.weather.snow.active) queueProcess.disabled = false
            else {
              terrainConditions.turns.weather.snow.active = true
              terrainConditions.turns.weather.snow.turns = 5
            }
            break
          case 'heat_wave':
          case 'hypnosis':
          case 'frost_wave':
          case 'trick_room':
            const color = typesObj[move.element].color

            const tl1 = gsap.timeline()
            const tl2 = gsap.timeline()

            let trickroomActive = false

            if(move.name == 'trick_room'){
              if(terrainConditions.turns.etc.trick_room.active) {
                trickroomActive = true
                return
              }

              const fieldEffect = document.querySelector('#fieldEffect')

              // const fieldEffectContent = document.createElement('div')
              // fieldEffectContent.id = 'trickroom'

              // for(let i = 0; i < 15; i++){
              //   const trickRoomCells = document.createElement('div')
              //   trickRoomCells.id = 'trickroomCells'

              //   fieldEffectContent.appendChild(trickRoomCells)
              // }

              // fieldEffect.appendChild(fieldEffectContent)

              // console.log(trickroomActive)

              terrainConditions.turns.etc.trick_room.active = true
              terrainConditions.turns.etc.trick_room.turns = 5
              queueProcess.disabled = false
              console.log('here')
              fieldEffect.opacity = 1
              document.querySelector('#trickRoomIndicatorContainer').style.display = 'flex'

              setTimeout(() =>{
                document.querySelector('#trickRoomIndicatorContainer').style.right = '0px'
                document.querySelector('#trickRoomTurnIndicator').innerText = terrainConditions.turns.etc.trick_room.turns
              }, 250)

            }

            if(trickroomActive) return

            const scene = document.querySelector('#scene')
            tl2.to(scene, {
              backgroundColor: `#${color}40`,
              duration: 0.25
            }).to(scene, {
              backgroundColor: `#${color}00`,
              duration: 0.25
            }).to(scene, {
              backgroundColor: `#${color}40`,
              duration: 0.25
            }).to(scene, {
              backgroundColor: `#${color}00`,
              duration: 0.25,
              onComplete: () =>{
                queueProcess.disabled = false
                console.log('here')
              }
            })
            break
          case 'thunder_wave':
          case 'fart':
          case 'confuse_ray':
          case 'leech_seed':
          case 'poison_powder':
          case 'stun_spore':
          case 'sleep_powder':
          case 'spore':
          case 'sticky_web':
          case 'stealth_rock':
          case 'taunt':
          case 'defog':
          case 'reflect':
          case 'light_screen':

          if(move.animationType == 'status'){
            if(this.isEnemy){
              statusSprite.position = {
                x: recipient.position.x - recipient.width / 4,
                y: recipient.position.y + recipient.height / 0.65
              }
            } else {
              statusSprite.position = {
                x: recipient.position.x - recipient.width / 8,
                y: recipient.position.y - recipient.height / 2
              }
            }
          } else {
            if(this.isEnemy){
              statusSprite.position = {
                x: this.position.x - this.width / 8,
                y: this.position.y + this.height / 4
              }
            } else {
              statusSprite.position = {
                x: this.position.x + this.width / 4,
                y: this.position.y + this.height / 0.65
              }
            }
          }

            renderedSprites.push(statusSprite)

            // if(move.name == 'sticky_web') webInteraction = true

            setTimeout(() =>{
              queueProcess.disabled = false
              console.log('here')
              statusSprite.frames.hold = 10
              renderedSprites.pop()
            }, 1000)
            break
          case 'substitute':
            let subHealth = Math.floor(this.stats.baseHp * 0.25)

            if(this.hp - subHealth <= 0){
              setTimeout(() =>{
                this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut since it's so weak, it failed to make a substitute..`)
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 1250)
              return
            }

            if(this.subHp > 0){
              this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}`)
              setTimeout(() =>{
                this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut ${this.switchUnderScoreForSpace(this.nickname)} already has a substitute protecting it..`)
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 1250)
              return
            }

            this.opacity = 0.5

            let subType

            if(this.isEnemy) subType = 'foeSub' 
            else subType = 'allySub'

            let substituteImg = new Image()
            let substituteSprite = new Sprite({
              type: subType,
              position: {
                x: this.position.x,
                y: this.position.y
              },
              img: substituteImg,
              frames: {
                max: 1,
                hold: 50
              },
              animate: false,
            })

            if(this.isEnemy) {
              substituteSprite.position = {
                x: this.position.x - 15,
                y: this.position.y + 150
              }

              gsap.to(this.position, {
                x: this.position.x + 25,
                y: this.position.y - 15
              })

              substituteImg.src = 'img/moves/sub.png'
            } else {
              substituteSprite.position = {
                x: this.position.x + 325,
                y: this.position.y + 375
              }

              gsap.to(this.position, {
                x: this.position.x - 100,
                y: this.position.y + 15
              })

              substituteImg.src = 'img/moves/sub_back.png'
            }

            this.hp -= subHealth
            this.hpManagement()
            this.subHp = subHealth

            renderedSprites.splice(1, 0, substituteSprite)
            console.log('remove sprite')
          
            queueProcess.disabled = false
            console.log('here')
            break
          case 'protect':
            const rng = Math.floor(Math.random() * move.effects.protect)

            const protectAnimation = () => {
              let protectImg = new Image()

              let protectSprite = new Sprite({
                type: 'protect',
                img: protectImg,
                frames: {
                  max: 1,
                  hold: 0,
                },
                animate: false
              })

              if(this.isEnemy){
                protectImg.src = 'img/moves/foe_protect.png'
                protectSprite.position = {
                  x: this.position.x + 35,
                  y: this.position.y + 100
                }
              } else {
                protectImg.src = 'img/moves/protect.png'
                protectSprite.position = {
                  x: this.position.x + 150,
                  y: this.position.y + 275
                }
              }
              

              renderedSprites.splice(renderedSprites.length, 0, protectSprite)
              console.log('remove sprite')
              queueProcess.disabled = true
              console.log('there')
              protectSprite.opacity = 0

              gsap.to(protectSprite, {
                opacity: 1,
                duration: 0.5,
                onComplete: () =>{
                  gsap.to(protectSprite, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () =>{
                      renderedSprites.forEach((sprite, i) =>{
                        if(sprite.type == 'protect') renderedSprites.splice(i, 1)
                          console.log('remove sprite')
                      })
                      queueProcess.disabled = false
                      console.log('here')
                    }
                  })
                }
              })
            }

            if(recipient.protected.active == true || rng > move.effects.protect / this.protected.turns){
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} failed to protect itself..`)
              this.protected.turns = 0
              this.protected.active = false
              queueProcess.disabled = false
              console.log('here')
              return
            }

            protectAnimation()
            this.protected.turns += 1
            this.protected.active = true
            break
        }
      }

      if(webInteraction) return

      let movementDistance = 20

      if(move.type != 'status') this.pogemonShakeAnimation(move.type, move, recipient, movementDistance, renderedSprites, queueProcess)
    }

    if(webInteraction) return

    queueProcess.disabled = true
    console.log('there')

    if(effect == null) chooseAnimation(move.type, null, move, 0, null) 
    else effect.forEach((effectInfo, i) => {
      chooseAnimation(effectInfo.type, effectInfo, move, i, effect)
      if(i == effect.length){
        setTimeout(() =>{
          queueProcess.disabled = false
          console.log('here')
        }, 1250)
      }
    })
  }

  pogemonShakeAnimation(type, move, recipient, movementDistance, renderedSprites, queueProcess){
    const tl = gsap.timeline()
    
    let rememberX = this.position.x
    
    if(move.priority > 0){
      this.frames.hold = 0
      tl.to(this.position, {
        x: this.position.x - movementDistance, 
        onComplete: () =>{
          gsap.to(this, {
            opacity: 0,
            duration: 0.01,
            onComplete: () =>{
              tl.to(this.position, {
                x: this.position.x + movementDistance * 2,
                duration: 0.05,
                onComplete: () =>{
        
                  audioObj.SFX.tackleHit.play()
        
                  recipient.hpManagement()
          
                  gsap.to(recipient.position, {
                    x: recipient.position.x + 10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08
                  })
          
                  gsap.to(recipient.sprite, {
                    opacity: 0,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08,
                    onComplete: () =>{
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 1250)
                      if(move.sprite != undefined) renderedSprites.splice(1,1)
                        console.log('remove sprite')
                    }
                  })
      
                  gsap.to(this, {
                    opacity: 1
                  })
                }
              }).to(this.position, {
                x: rememberX,
                onComplete: () =>{
                  this.setCorrectHold()
                }
              })
            }
          })
        },
      })
    } else {
      switch(type){
        case 'hit':
          setTimeout(() => this.frames.hold = 0, 50)
          tl.to(this.position, {
            x: this.position.x - movementDistance
          }).to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () =>{
    
              audioObj.SFX.tackleHit.play()
    
              recipient.hpManagement()
      
              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
              })
      
              gsap.to(recipient, {
                opacity: 0,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
                onComplete: () =>{
                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 1250)
                  if(move.sprite != undefined) renderedSprites.splice(1,1)
                    console.log('remove sprite')
                }
              })
            }
          }).to(this.position, {
            x: rememberX,
            onComplete: () =>{
              this.setCorrectHold()
            }
          })
          break
        case 'projectile':
          setTimeout(() => this.frames.hold = 0, 50)
          tl.to(this.position, {
            x: this.position.x + movementDistance,
          }).to(this.position, {
            x: this.position.x - movementDistance * 2
          }).to(this.position, {
            x: rememberX,
            onComplete: () =>{
              this.setCorrectHold()
            }
          })
          break
        case 'status':
          tl.to(this.position, {
            x: this.position.x + movementDistance,
            duration: 0.25,
            onComplete: () =>{
              this.frames.hold = 0
            }
          }).to(this.position, {
            x: this.position.x - movementDistance,
            duration: 0.25
          }).to(this.position, {
            x: this.position.x + movementDistance,
            duration: 0.25
          }).to(this.position, {
            x: rememberX,
            duration: 0.25,
            onComplete: () =>{
              this.setCorrectHold()
            }
          })
          break
      }
    }
  }

  magicBounce(recipient, queue, queueProcess, terrainConditions, afterBounceFunction){
    queueProcess.disabled = true
    console.log('there')

    setTimeout(() =>{
      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ability made ${this.switchUnderScoreForSpace(recipient.nickname)}'s move bounce back!`)

      afterBounceFunction()
    }, 1250)
  }

  //doesnt make anything move, its the method to use moves during combat
  move({move, recipient, recipientMove, renderedSprites, critHit, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent}){
    if(this.hp <= 0) return

    console.log(`${this.nickname} move start`)

    let cantUseStatus = false

    if(this.affliction[2].active) cantUseStatus = true
    else if (this.heldItem != null) if(this.heldItem.name == 'assault_Vest') cantUseStatus = true

    let returnIfChoiced = false

    if(this.choiceItem.move != null) if(move.name != this.choiceItem.move.name){

      returnIfChoiced = true

      move = this.choiceItem.move
      if(this.affliction[2].active && move.type == 'status') move = movesObj.struggle
      console.log(move)
    }

    if(returnIfChoiced) return

    if(move.type == 'status' && cantUseStatus){
      if(this.isEnemy){
        const attackingMovesArr = []

        this.moves.forEach(move =>{
          if(move.type != 'status') attackingMovesArr.push(move)
        })

        if(attackingMovesArr.length > 0) this.rerollEnemyMoveSoAppropriate(recipient, move, terrainConditions, enemyTrainerInfo)
        else move = movesObj.struggle

        console.log(move)
      } 
      else if(this.affliction[2].active) this.dialogue('battle', `${this.nickname} is taunted into a rage and can only use attacking moves...`)
      else if (this.heldItem.name == 'assault_Vest') this.dialogue('battle', `${this.nickname} has an assault vest equipped and so can only use attacking moves...`)

      setTimeout(() =>{
        queue.length = 0
        document.querySelector('#encounterInterface').style.display = 'grid'
        queueProcess.disabled = false
        console.log('here')
      }, 1250)
      return
    }

    // let confusionCancel = false

    // for(let i = 0; i < this.affliction.length; i++){
    //   let affliction = this.affliction[i]
    //   if(affliction.name == 'confusion') confusionCancel = true
    // }

    // if(confusionCancel) return

    let immuned = false
    
    if(move.pp == 0) move = movesObj.struggle
    // else move.pp--

    this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!`)

    if(move.name == 'sucker_punch' && recipientMove.type != 'physical'){
      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}!\n\nIt didin't seem to work for some reason..`)
      return
    }

    let recipientStatus = document.querySelector('#foeStatus')

    let userStatsChangeContainer = 'allyStatusEffectContainer' 
    let recipientStatsChangeContainer = 'foeStatusEffectContainer'

    let movementDistance = 20

    let rotation
    if(movesObj[move.name].rotation != undefined) rotation = movesObj[move.name].rotation.ally

    let duration
    if(movesObj[move.name].duration != undefined) duration = movesObj[move.name].duration
    
    let launcPos = this.pogemon.animationPositions.ally.launch
    let receivePos = recipient.pogemon.animationPositions.foe.receive

    let crit = 1

    if(this.isEnemy){
      recipientStatus = document.querySelector('#allyStatus')

      userStatsChangeContainer = 'foeStatusEffectContainer'
      recipientStatsChangeContainer = 'allyStatusEffectContainer'

      movementDistance = -20
      
      if(movesObj[move.name].rotation != undefined) rotation = movesObj[move.name].rotation.foe
      launcPos = this.pogemon.animationPositions.foe.launch

      receivePos = recipient.pogemon.animationPositions.ally.receive
    }

    let damageCalculation = () => {
      let userId = 'ally'
      let foeId = 'foe'

      if(this.isEnemy) {
        userId = 'foe'
        foeId = 'ally'
      }

      // determins the roll
      const rollRatio = {
        max: 110,
        min: 90
      }
      const roll = Math.floor(Math.random() * (rollRatio.max - rollRatio.min) + rollRatio.min) * 0.01

      let moveElement = move.element
      if(this.abilityInfo.ability.type == 'typeChange') {
        if(this.abilityInfo.ability.name == 'normalize')
          moveElement = this.abilityInfo.ability.info
        
        if(move.type != 'status')
          if(move.element == 'normal') 
            moveElement = this.abilityInfo.ability.info
      } 

      // determins stab
      let stab = 1
      if(moveElement === this.element[1] || moveElement === this.element[2]) stab += 0.5
      if(stab == 1.5 && this.abilityInfo.ability.name == 'adaptability') stab += 0.5

      let typeEffectivness = 1

      let userStatChange
      let recipientStatChange

      let burn = 1
      let frozen = 1

      // determins stab
      if(this.status.name == 'burn' && this.abilityInfo.ability.name != 'guts') burn = 0.5
      if(this.status.name == 'frz' && this.abilityInfo.ability.name != 'guts') frozen = 0.5

      let factor
      
      // determins type effectiveness
      for(let i = 0; i < 2; i++){
        if(Object.values(recipient.element)[i] == null) break
        if(typeEffectivness == 0) break
        
        if(typeEffectivness >= 1) {
          factor = 0.5
        } else {
          factor = 0.25
        }

        if(Object.values(recipient.element)[i] == 'flying' && recipient.roosted) {
          recipient.roosted = false
          continue
        }

        if(Object.values(typesObj[`${moveElement}`])[0].includes(`${Object.values(recipient.element)[i]}`)) {
          typeEffectivness = typeEffectivness + factor
        }
        else if(Object.values(recipient.element)[i] == 'water' && move.name == 'freeze_dry') 
          typeEffectivness = typeEffectivness + factor

        if(Object.values(typesObj[`${moveElement}`])[1].includes(`${Object.values(recipient.element)[i]}`)){
          if(Object.values(recipient.element)[i] == 'water' && move.name != 'freeze_dry') typeEffectivness = typeEffectivness - factor
          else typeEffectivness = typeEffectivness - factor
        }

        let scrappy = false
        if(Object.values({...typesObj[`${moveElement}`]})[2].includes(`${Object.values(recipient.element)[i]}`)) {
          if(this.abilityInfo.ability.name == 'scrappy') if(`${Object.values(recipient.element)[i]}` == 'ghost')
            if(moveElement == 'normal' || moveElement == 'fighting') scrappy = true

          if(!scrappy) 
            typeEffectivness = 0
        }

        if(recipient.abilityInfo.ability.type == 'immuned' && recipient.abilityInfo.ability.info.type == moveElement) if(this.abilityInfo.ability.name != 'mold_Breaker')
          typeEffectivness = 0
      }

      if(recipient.abilityInfo.ability.name == 'thicc_Fat'){
        if(this.abilityInfo.ability.name != 'mold_Breaker') {
          if(typeEffectivness >= 1) {
            factor = 0.5
          } else {
            factor = 0.25
          }
  
          if(moveElement == 'ice' || moveElement == 'fire') typeEffectivness = typeEffectivness - factor
        }
      } else if(recipient.abilityInfo.ability.name == 'fluffy_Coat'){
        if(this.abilityInfo.ability.name != 'mold_Breaker') {
          if(typeEffectivness >= 1) {
            factor = 0.5
          } else {
            factor = 0.25
          }
  
          if(moveElement == 'fire') typeEffectivness = typeEffectivness + factor
        }
      } 

      queueProcess.disabled = true
      console.log('there')

      console.log(typeEffectivness)
      // dialogue for type effectiveness
      switch(typeEffectivness){
        case 0:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}! \n\n It didint affect ${this.switchUnderScoreForSpace(recipient.nickname)} whatsoever...`)
          immuned = true

          if(recipient.abilityInfo.ability.info != null) 
            if(recipient.abilityInfo.ability.info.type == moveElement) 
              if(recipient.abilityInfo.ability.type == 'immuned') 
                if(recipient.abilityInfo.ability.effects != undefined) 
                  if(this.abilityInfo.ability.name != 'mold_Breaker')
                    if(recipient.abilityInfo.ability.info.statusType == 'statsSelf') 
                      recipient.statusAnimation(recipient.abilityInfo.ability.info.statusType, recipient.abilityInfo.ability.effects, {name: recipient.abilityInfo.ability.name, rotation:{ally:0, foe:0}, animationType: recipient.abilityInfo.ability.info.statusType}, this, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
                    else if(recipient.abilityInfo.ability.info.statusType == 'heal'){

                      let healAmount = Math.floor(recipient.stats.baseHp * (recipient.abilityInfo.ability.effects / 100))

                      recipient.hp += healAmount

                      if(recipient.hp > recipient.stats.baseHp) 
                        recipient.hp = recipient.stats.baseHp
                    
                      recipient.hpManagement()

                      recipient.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} absorbed the water!`)
                    }
          break
        case 0.25:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}! \n\n It was not effective at all...`)
          break
        case 0.5:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}! \n\n It was not very effective...`)
          break
        case 1:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}!`)
          break
        case 1.5:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}! \n\n It was very effective!`)
          break
        case 2:
          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)} on ${this.switchUnderScoreForSpace(recipient.nickname)}! \n\n It was super effective!!`)
          break
      }

      // determins crit
      if(typeEffectivness != 0) if(critHit(this, recipient, move)) if(this.abilityInfo.ability.name != 'sheer_Force') crit = 1.5

      // determins held item damage
      let heldItemDmg = 1
      if(this.heldItem != null) {
        if(this.heldItem.heldType = 'elemental') if(moveElement == this.heldItem.effect) heldItemDmg += (this.heldItem.pow / 100)
        else if(this.heldItem.name == 'life_Orb'){
          heldItemDmg = 1.3

          const chip = Math.floor(this.stats.baseHp / 10)
          this.hp -= chip

          setTimeout(() => this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.nickname}'s life orb hurt it!`), 500)
        }
      }

      // determins weather damage
      let weatherDamage = 1
      Object.values(terrainConditions.turns.weather).forEach(weather =>{
        if(moveElement != 'fire' && moveElement != 'water') return
        if(!weather.active) return
        
        if(weather.element == moveElement){
          weatherDamage = 1.5
        } else if(weather.resistance != null) if(weather.resistance == moveElement){
          weatherDamage = 0.5
        }
      })

      let reflect = 1
      let lightScreen = 1

      if(this.abilityInfo.ability.name != 'infiltrator'){
        if(!this.isEnemy){
          if(terrainConditions.turns.etc.foe_reflect.active) reflect = 0.5
          else if(terrainConditions.turns.etc.foe_light_screen.active) lightScreen = 0.5
        } else {
          if(terrainConditions.turns.etc.ally_reflect.active) reflect = 0.5
          else if(terrainConditions.turns.etc.ally_light_screen.active) lightScreen = 0.5
        }
      }

      // determins weather resistance
      let weatherResistance = 1
      Object.values(terrainConditions.turns.weather).forEach(weather =>{
        if(recipient.element[1] != 'rock' && recipient.element[2] != 'rock' && recipient.element[1] != 'ice' && recipient.element[2] != 'ice') return
        if(!weather.active) return
        
        if(recipient.element[1] == weather.element || recipient.element[2] == weather.element){
          if(weather.element == 'rock' && move.type == 'special') weatherResistance = 1.5
          if(weather.element == 'ice' && move.type == 'physical') weatherResistance = 1.5
        }
      })

      // determins damage from ability
      let abilityDamage = 1
      if(this.abilityInfo.ability.type == 'lowHpDamageBoost') if(this.abilityInfo.ability == moveElement) if(this.convertToPercentage(this.hp, this.stats.baseHp) <= 30) abilityDamage = 1.5

      // calc the damage
      let damage
      let movePow = move.pow
      if(move.name == 'hex' && recipient.status.name != null) movePow = move.pow * 2
      if(move.name == 'knock_off' && recipient.heldItem != null) movePow = move.pow * 2

      let solarPower = 1

      switch(this.abilityInfo.ability.name){
        case 'solar_Power':
          if(terrainConditions.turns.weather.sun.active){
            solarPower = 1.5

            let chipDmg = Math.floor(this.stats.baseHp / 8)
            this.hp -= chipDmg
          }
          break
        case 'sand_Force':
          if(
            move.element == 'rock' 
            || move.element == 'ground' 
            || move.element == 'steel'
          ) {
            abilityDamage = 1.3
          }
          break
        case 'iron_Fist':
          if(move.name.includes('punch')) abilityDamage = 1.2
          break
        case 'sheer_Force':
          if(move.effects != null)
            if(Object.keys(move.effects)[0] == 'recoil') return
            abilityDamage = 1.3
          break
        case 'guts':
          if(this.status.name != null) abilityDamage = 1.5
          break
        case 'technician':
          if(movePow <= 60) movePow = movePow * 1.5
          break
        case 'tripped_Out':
          if(recipient.affliction[0].active) abilityDamage = 1.3
          break
      }

      let expertBelt = 1
      if(this.heldItem != null) if(this.heldItem.name == 'expertBelt') if(typeEffectivness > 1) expertBelt = 1.2

      let sturdy = false
      if(recipient.hp == recipient.stats.baseHp) sturdy = true
      if(move.type === 'physical'){
        if(typeEffectivness !== 0){
          let userAtkNum = statsChangeObj[userId].nominator.atk
          if(userAtkNum > 8) userAtkNum = 8
          if(recipient.abilityInfo.ability.name == 'unaware') if(this.abilityInfo.ability.name != 'mold_Breaker') userAtkNum = 2
          
          let userAtkDenum = statsChangeObj[userId].denominator.atk
          if(userAtkDenum < 2) userAtkDenum = 2

          let recipientDefNum = statsChangeObj[userId].nominator.def
          if(recipientDefNum > 8) recipientDefNum = 8
          if(this.abilityInfo.ability.name == 'unaware') if(this.abilityInfo.ability.name != 'mold_Breaker') recipientDefNum = 2

          let recipientDefDenum = statsChangeObj[userId].denominator.def
          if(recipientDefDenum < 2) userAtkDenum = 2

          userStatChange = userAtkNum / userAtkDenum
          recipientStatChange = recipientDefNum / recipientDefDenum

          let defAbility = 1
          if(recipient.abilityInfo.ability.name == 'fluffy_Coat') if(this.abilityInfo.ability.name != 'mold_Breaker') defAbility = 2
          if(recipient.abilityInfo.ability.name == 'weak_Armor') queue.unshift(() =>{
            recipient.statusAnimation('status', recipient.abilityInfo.ability.effects, {name: 'weak_Armor'}, this, renderedSprites, statsChangeObj, terrainConditions, queueProcess)}
          )

          let defItem = 1
          if(recipient.heldItem != null){
            if(recipient.heldItem.name == 'rocky_Helmet'){
              const chip = Math.floor(this.stats.baseHp / 16)
              this.hp -= chip
    
              setTimeout(() => this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${recipient.nickname}'s helmet hurt ${this.nickname}!`), 550)
            } else if(recipient.heldItem.name == 'eviolite' && recipient.evo != null) 
              defItem = 1.5
          }

          let choiceBand = 1
          if(this.heldItem != null) if(this.heldItem.name == 'choice_Band') {

            this.choiceItem.type = 'band'
            this.choiceItem.move = move

            choiceBand = 1.5
          }

          damage = Math.ceil((((2 * this.lvl / 5 + 2) * movePow * ((this.stats.atk * choiceBand) * userStatChange) / ((recipient.stats.def * defAbility * defItem) * weatherResistance * recipientStatChange) / 50 + 2) * burn * reflect) * roll * (typeEffectivness * expertBelt) * stab * crit * heldItemDmg * weatherDamage * abilityDamage)
        }
      } else if(move.type === 'special'){
        if(typeEffectivness !== 0){
          let userSpatkNum = statsChangeObj[userId].nominator.spatk
          if(userSpatkNum > 8) userSpatkNum = 8 
          if(recipient.abilityInfo.ability.name == 'unaware') if(this.abilityInfo.ability.name != 'mold_Breaker') userSpatkNum = 2

          let userSpatkDenum = statsChangeObj[userId].denominator.spatk
          if(userSpatkDenum < 2) userSpatkDenum = 2

          let recipientSpdefNum = statsChangeObj[userId].nominator.spdef
          if(recipientSpdefNum > 8) recipientSpdefNum = 8
          if(this.abilityInfo.ability.name == 'unaware') if(this.abilityInfo.ability.name != 'mold_Breaker') recipientSpdefNum = 2

          let recipientSpdefDenum = statsChangeObj[userId].denominator.spdef
          if(recipientSpdefDenum < 2) recipientSpdefDenum = 2

          userStatChange = userSpatkNum / userSpatkDenum
          recipientStatChange = recipientSpdefNum / recipientSpdefDenum

          let spdefItem = 1
          if(recipient.heldItem != null){
            if(recipient.heldItem.name == 'assault_Vest') spdefItem = 1.5
            else if(recipient.heldItem.name == 'eviolite' && recipient.evo != null) spdefItem = 1.5
          }

          let choiceSpecs = 1
          if(this.heldItem != null) if(this.heldItem.name == 'choice_Specs') {

            this.choiceItem.type = 'specs'
            this.choiceItem.move = move

            choiceSpecs = 1.5
          }

          damage = Math.ceil((((2 * this.lvl / 5 + 2) * movePow * (((this.stats.spatk * choiceSpecs) * solarPower) * userStatChange) / ((recipient.stats.spdef * spdefItem) * weatherResistance * recipientStatChange) / 50 + 2) * frozen * lightScreen) * roll * (typeEffectivness * expertBelt) * stab * crit * heldItemDmg * weatherDamage * abilityDamage)
        }
      }

      // check sturdy here

      // console.log(recipient)

      if(immuned || damage < 0) damage = 0

      let infiltratorCheck = false
      if(this.abilityInfo.ability.name == "infiltrator") infiltratorCheck = true

      if(recipient.protected.active && !infiltratorCheck){
        queue.push(() => this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} protected itself.`))
      } else if(recipient.subHp > 0 && !infiltratorCheck){
        if(move.sound == undefined){
          this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)}'s substitute took damage.`)
          recipient.subHp -= damage
          if(recipient.subHp <= 0){
            queueProcess.disabled = true
            console.log('there')
            queue.push(() => this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)}'s substitute was destroyed.`))
            //sub faints
            gsap.to(recipient, {
              opacity: 1
            })
  
            let recipientSub
            let recipientSubIndex
  
            renderedSprites.forEach((sprite, i) =>{
              if(this.isEnemy){
                if(sprite.type == 'allySub'){
                  recipientSub = sprite
                  recipientSubIndex = i
                }
              } else {
                if(sprite.type == 'foeSub'){
                  recipientSub = sprite
                  recipientSubIndex = i
                }
              }
            })
            
            if(recipientSub != undefined){
              gsap.to(recipientSub.position, {
                y: recipientSub.position.y + 15
              })
    
              gsap.to(recipientSub, {
                opacity: 0,
                onComplete: () =>{
                  recipient.subHp = 0
                  renderedSprites.splice(recipientSubIndex, 1)
                  console.log('remove sprite')
                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 500)
                }
              })
            } else {
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 500)
            }

            // gsap.to(this.position,{
            //   x: this.position.x - 25,
            //   y: this.position.y + 15
            // })
  
            if(recipient.isEnemy) {
              gsap.to(recipient.position,{
                x: recipient.position.x - 25,
                y: recipient.position.y + 15
              })
            } else {
              gsap.to(recipient.position, {
                x: recipient.position.x + 100,
                y: recipient.position.y - 15
              })
            }
          } 
        } else recipient.hp -= damage
      } else recipient.hp -= damage

      if(move.name == 'false_Swipe' && recipient.hp <= 0) recipient.hp = 1

      if(move.effects != undefined){
        if(Object.keys(move.effects[0])[0] == 'recoil'){
          if(this.abilityInfo.ability.name == 'rock_Head') {
            setTimeout(() =>{
              this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was protected from taking recoil damage.`)
            }, 750)
            return
          }

          let recoilDamage = Math.floor(damage * (Object.values(move.effects[0])[0] / 100))
  
          this.hp -= recoilDamage
  
          this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} took recoil damage.`)
        } else if(Object.keys(move.effects[0])[0] == 'leech') {
          let leechedDamage = Math.floor(damage * (Object.values(move.effects[0])[0] / 100))
  
          this.hp += leechedDamage

          if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
  
          this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} leeched some hp.`)
          this.statusAnimation('heal', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        }
      }

      if(recipient.hp <= 0 && sturdy){
        if(recipient.abilityInfo.ability.name == 'sturdy'){
          if(this.abilityInfo.ability.name == 'mold_Breaker') return

          recipient.hp = 1
  
          setTimeout(() =>{
            queueProcess.disabled = true
            console.log('there')
            this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${recipient.nickname} hung on thanks to it's ability.`)
            setTimeout(() =>{
              // queueProcess.disabled = false
              // console.log('here')
            }, 750)
          }, 1500)
        } 

        if(recipient.heldItem != null) if(recipient.heldItem.effect == 'sturdy'){
          if(recipient.heldItem.name == 'focusSash') if(targetHpBeforeMove !== 100) return

          const rng = Math.floor(Math.random() * 99) + 1
          if(rng > recipient.heldItem.odds) return

          recipient.hp = 1
          recipient.fainted = false
          recipient.hpManagement()
          queueProcess.disabled = true
          console.log('there')

          //change stuff here for sur
  
          this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThanks to it's ${this.switchUnderScoreForSpace(recipient.heldItem.name)}, ${this.switchUnderScoreForSpace(recipient.nickname)} held on by the grit of it's teeth!`)
        }
      }
        

      this.hpManagement()

      if(recipient.hp <= 0) {
        recipient.hp = 0
        // faintEvent(recipient)
        // console.log('faintEvent')
      } 
    }

    let raiseAllStats = (target, pow) =>{
      if(statsChangeObj[target].denominator.atk > 2) statsChangeObj[target].denominator.atk -= pow
      else if(statsChangeObj[target].nominator.atk <= 8) statsChangeObj[target].nominator.atk += pow

      if(statsChangeObj[target].denominator.def > 2) statsChangeObj[target].denominator.def -= pow
      else if(statsChangeObj[target].nominator.def <= 8) statsChangeObj[target].nominator.def += pow

      if(statsChangeObj[target].denominator.spatk > 2) statsChangeObj[target].denominator.spatk -= pow
      else if(statsChangeObj[target].nominator.spatk <= 8) statsChangeObj[target].nominator.spatk += pow

      if(statsChangeObj[target].denominator.spdef > 2) statsChangeObj[target].denominator.spdef -= pow
      else if(statsChangeObj[target].nominator.spdef <= 8) statsChangeObj[target].nominator.spdef += pow

      if(statsChangeObj[target].denominator.spd > 2) statsChangeObj[target].denominator.spd -= pow
      else if(statsChangeObj[target].nominator.spd <= 8) statsChangeObj[target].nominator.spd += pow
    }

    // this and statusRng are very similar in purpous, maybe should fuse them
    let statusCalculation = () =>{
      move.effects.forEach((effect, i) => {
        if(i == 0){
          let effectName = effect.name

          if(this.abilityInfo.ability.name == 'contrary'){
            switch(effect.name){
              case 'buff':
                effectName = 'selfDebuff'
                break
              case 'selfDebuff':
                effectName = 'buff'
                break

              case 'recipientBuff':
                if(recipient.abilityInfo.ability.name != 'mold_Breaker') effectName = 'debuff'
                break
              case 'debuff':
                if(recipient.abilityInfo.ability.name != 'mold_Breaker') effectName = 'recipientBuff'
                break
            }
          }

          if(effectName == 'buff'){
              if(!this.isEnemy){
                  if(effect.target == 'all') raiseAllStats('ally', effect.pow) 
                  else {
                    if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                    else if(statsChangeObj.ally.nominator[effect.target] <= 8) statsChangeObj.ally.nominator[effect.target] += effect.pow
                    else {
                      // statsChangeObj.ally.nominator[effect.target] = 8
                      // queue.push(() => this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go up any further.`))
                      return
                    }
                  }
              } else {
                if(effect.target == 'all') raiseAllStats('foe', effect.pow) 
                else {
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                  else if(statsChangeObj.foe.nominator[effect.target] <= 8) statsChangeObj.foe.nominator[effect.target] += effect.pow
                  else {
                    // statsChangeObj.foe.nominator[effect.target] = 8
                    // this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go up any further.`)
                    return
                  }
                }
              }
          } else if(effectName == 'recipientbuff'){
              if(!this.isEnemy){
                  //this is ally
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                  else if(statsChangeObj.foe.nominator[effect.target] <= 8) statsChangeObj.foe.nominator[effect.target] += effect.pow
                  else {
                    // statsChangeObj.foe.nominator[effect.target] = 8
                    // this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
              } else {
                  //this is foe
                  if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                  else if(statsChangeObj.ally.nominator[effect.target] <= 8) statsChangeObj.ally.nominator[effect.target] += effect.pow
                  else {
                    // this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
              }
          } else if(effectName == 'debuff') {
              if(!this.isEnemy){
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else if(statsChangeObj.foe.denominator[effect.target] <= 8) statsChangeObj.foe.denominator[effect.target] += effect.pow
                  else {
                    // this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
              } else {
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else if(statsChangeObj.ally.denominator[effect.target] <= 8) statsChangeObj.ally.denominator[effect.target] += effect.pow
                  else {
                    // this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
              }
          } else if(effectName == 'selfDebuff'){
              if(!this.isEnemy){
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else if(statsChangeObj.ally.denominator[effect.target] <= 8) statsChangeObj.ally.denominator[effect.target] += effect.pow
                  else {
                    // this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go down any further.`)
                    return
                  }
              } else {
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else if(statsChangeObj.foe.denominator[effect.target] <= 8) statsChangeObj.foe.denominator[effect.target] += effect.pow
                  else {
                    // this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go down any further.`)
                    return
                  }
              }

          } else if(move.type == 'heal'){
              switch(move.element){
                case 'normal':
                case 'fairy':
                  this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                  if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  break
                case 'water':
                  if(terrainConditions.turns.weather.rain.active){
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[2]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else if(
                    terrainConditions.turns.weather.sun.active ||
                    terrainConditions.turns.weather.sand.active ||
                    terrainConditions.turns.weather.snow.active
                  ) {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[1]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  }
                  break
                case 'fire':
                  if(terrainConditions.turns.weather.sun.active){
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[2]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else if(
                    terrainConditions.turns.weather.rain.active ||
                    terrainConditions.turns.weather.sand.active ||
                    terrainConditions.turns.weather.snow.active
                  ) {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[1]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  }
                  break  
                case 'ground':
                  if(terrainConditions.turns.weather.sand.active){
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[2]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else if(
                    terrainConditions.turns.weather.rain.active ||
                    terrainConditions.turns.weather.sun.active ||
                    terrainConditions.turns.weather.snow.active
                  ) {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[1]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  }
                  break 
                case 'ice':
                  if(terrainConditions.turns.weather.snow.active){
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[2]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else if(
                    terrainConditions.turns.weather.rain.active ||
                    terrainConditions.turns.weather.sand.active ||
                    terrainConditions.turns.weather.sun.active
                  ) {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  } else {
                    this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[1]) / 100 )
                    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  }
                  break 
                case 'flying':
                  this.hp = Math.floor(this.hp + this.stats.baseHp * (move.effects[0]) / 100 )
                  if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
                  
                  this.roosted = true
                  break   
              }
        
              this.hpManagement()
              setTimeout(() => this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.\n\nIt healed some hp.`), 750)
          } else {
              document.querySelector('#movesInterface').style.display = 'none'
              if(move.type != 'status') return
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.`)
              if(recipient.subHp > 0) {
                if(move.animationType == 'status'){
                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 1250)
                  return
                }
  
                setTimeout(() =>{
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut ${this.switchUnderScoreForSpace(recipient.nickname)} was protected by its substitute.`)
                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 1250)
                }, 1250)
      
                // queue.push(() => {
                //   this.dialogue('battle', `${recipient.name} was protected by its substitute.`)
                //   queueProcess.disabled = false
                //   console.log('here')
                // })
              } else {
                // queueProcess.disabled = false
                console.log('here')
              }
          }
        } else {
          let effectName = effect.name

          if(this.abilityInfo.ability.name == 'contrary'){
            switch(effect.name){
              case 'buff':
                effectName = 'selfDebuff'
                break
              case 'selfDebuff':
                effectName = 'buff'
                break

              case 'recipientBuff':
                if(recipient.abilityInfo.ability.name != 'mold_Breaker') effectName = 'debuff'
                break
              case 'debuff':
                if(recipient.abilityInfo.ability.name != 'mold_Breaker') effectName = 'recipientBuff'
                break
            }
          }

          if(effectName == 'buff'){
                if(!this.isEnemy){
                  if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= 1
                  else statsChangeObj.ally.nominator[effect.target] += 1
        
                  // if(statsChangeObj.ally.nominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go up any further.`)
                  //   return
                  // }
                } else {
        
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.nominator[effect.target] += effect.pow
        
                  // if(statsChangeObj.foe.nominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go up any further.`)
                  //   return
                  // }
                }
                // queue.splice(0,1)[0]()
          } else if(effectName == 'recipientbuff'){
                if(!this.isEnemy){
                  //this is ally
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= 1
                  else statsChangeObj.foe.nominator[effect.target] += 1
        
                  // if(statsChangeObj.foe.nominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                  //   return
                  // }
                } else {
                  //this is foe
                  if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.nominator[effect.target] += effect.pow
        
                  // if(statsChangeObj.ally.nominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                  //   return
                  // }
                }
                // queue.splice(0,1)[0]()
          } else if(effectName == 'debuff') {
                if(!this.isEnemy){
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.denominator[effect.target] += effect.pow
        
                  // if(statsChangeObj.foe.denominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                  //   return
                  // }
                } else {
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.denominator[effect.target] += effect.pow
                    
                  // if(statsChangeObj.ally.denominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                  //   return
                  // }
                }
                // queue.splice(0,1)[0]()
          } else if(effectName == 'selfDebuff'){
                if(!this.isEnemy){
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.denominator[effect.target] += effect.pow
        
                  // if(statsChangeObj.ally.denominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go down any further.`)
                  //   return
                  // }
                } else {
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.denominator[effect.target] += effect.pow
                    
                  // if(statsChangeObj.foe.denominator[effect.target] > 8) {
                  //   this.dialogue('battle', `${this.nickname}'s ${effect.target} won't go down any further.`)
                  //   return
                  // }
                }
                // queue.splice(0,1)[0]()
          } else if(Object.keys(Object.values(move.effects)[0])[0] == 'heal'){
                this.hp = Math.floor(this.hp + this.stats.baseHp * ( Object.values(Object.values(move.effects)[0])[0] / 100 ))
                if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
          
                this.hpManagement()
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.`)
          } else {
              document.querySelector('#movesInterface').style.display = 'none'
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.`)
              if(recipient.subHp > 0 && move.name != 'status') queue.push(() => this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} was protected by its substitute.`))
          }
        }
      })
      return
    }

    let isSubActive = false

    if(recipient.subHp > 0) isSubActive = true

    let hitAnimation = type => {
      queueProcess.disabled = true
      console.log('there')
      if(type){
        const hitImg = new Image()
        hitImg.src = move.sprite

        const hitSprite = new Sprite({
          type: 'move',
          position: {
            x: recipient.position.x - recipient.width / 4,
            y: recipient.position.y - recipient.height
          },
          img: hitImg,
          frames: {
            max: 4,
            hold: 50
          },
          animate: true,
          rotation
        })

        if(this.isEnemy){
          hitSprite.position = {
            x: recipient.position.x + recipient.width / 4,
            y: recipient.position.y + recipient.height
          }
        }

        renderedSprites.splice(1, 0, hitSprite)
        console.log('remove sprite')
      }

      this.pogemonShakeAnimation('hit', move, recipient, movementDistance, renderedSprites, queueProcess)
    }
    
    let projectileAnimation = () => {
      queueProcess.disabled = true
      console.log('there')
      const projectileImg = new Image()
      projectileImg.src = move.sprite
      const projectileSprite = new Sprite({
        type: 'attack',
        position: {
          x: this.position.x + launcPos.x,
          y: this.position.y + launcPos.y
        },
        img: projectileImg,
        frames: {
          max: 4,
          hold: 50
        },
        animate: true,
        rotation
      })

      renderedSprites.splice(1, 0, projectileSprite)
      console.log('add sprite')

      if(move.initAudio != undefined) move.initAudio.play()

      this.pogemonShakeAnimation('projectile', move, recipient, movementDistance, renderedSprites, queueProcess)

      gsap.to(projectileSprite.position, {
        x: recipient.position.x - receivePos.x,
        y: recipient.position.y - receivePos.y,
        duration: 1,
        onComplete: () =>{

          renderedSprites.splice(1,1)
          console.log('remove sprite')

          if(move.hitAudio != undefined) move.hitAudio.play()

          recipient.hpManagement()

          queueProcess.disabled = true
          console.log('there')

          setTimeout(() =>{
            // if(recipient.status.name != null) queueProcess.disabled = false
            // if(!statusApplied) queueProcess.disabled = false
            queueProcess.disabled = false
            console.log('here')
          }, 1250)
          
          gsap.to(recipient.position, {
            x: recipient.position.x,
            yoyo: true,
            repeat: 5,
            duration: 0.08
          })
    
          gsap.to(recipient.sprite, {
            opacity: 0,
            yoyo: true,
            repeat: 5,
            duration: 0.08
          })
        }
      })
    }

    if(move.type == 'status' || move.type == 'heal') {
      // statusAnimation(move.type, move.effects)
      if(immuned) return
      if(move.effects != null) statusCalculation()
    } else damageCalculation()

    let statusApplied = false

    let statusRNG = () =>{
      statusApplied = false
      if(recipient.hp <= 0) return
      if(isSubActive) return
      if(recipient.protected.active == true) return
      // if(recipient.stats != null) return
      // work here
      
      let rng = Math.floor(Math.random() * 100)

      let applyAffliction = type =>{
        if(this.hp <= 0) return

        let threshold = Object.values(move.effects)[0][type]
        if(this.abilityInfo.ability.name == 'serene_Grace') threshold = threshold * 2

        if(rng <= threshold){
          statusApplied = true
          switch(type){
            case 'flinched':
                if(this.abilityInfo.ability.name == 'sheer_Force') return
                if(recipient.element[1] == 'rock' || recipient.element[2] == 'rock') return
                if(recipient.element[1] == 'steel' || recipient.element[2] == 'steel') return
          
                recipient.flinched = true

                queueProcess.disabled = false
                console.log('here')
              break
            case 'confusion':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{
                  if(this.element[1] == 'psychic' || this.element[2] == 'psychic') {
                    this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} cannot be confused...`)
                    return
                  } else if(recipient.element[1] == 'ghost' || recipient.element[2] == 'ghost'){
                    this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} cannot be confused...`)
                    return
                  }
    
                  if(this.affliction[0].active == true){
                    this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut ${this.switchUnderScoreForSpace(this.nickname)} is already confused....`)
                  } else {
                    queueProcess.disabled = true
                    console.log('there')
                    this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} is now confused.`)
                    this.affliction[0].turns = Math.floor((Math.random() * 3) + 1)
                    this.affliction[0].active = true
                    if(recipient.isEnemy){
                      document.querySelector('#allyConfused').style.opacity = 1
                    } else {
                      document.querySelector('#foeConfused').style.opacity = 1
                    }
                  }

                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 1250)
                })
              } else {
                if(recipient.element[1] == 'psychic' || recipient.element[2] == 'psychic') {
                  this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} cannot be confused...`)
                  return
                } else if(recipient.element[1] == 'ghost' || recipient.element[2] == 'ghost'){
                  this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} cannot be confused...`)
                  return
                }
  
                if(recipient.affliction[0].active == true){
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nBut ${this.switchUnderScoreForSpace(recipient.nickname)} is already confused....`)
                } else {
                  queueProcess.disabled = true
                  console.log('there')
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} is now confused.`)
                  recipient.affliction[0].turns = Math.floor((Math.random() * 3) + 1)
                  recipient.affliction[0].active = true
                  if(this.isEnemy){
                    document.querySelector('#allyConfused').style.opacity = 1
                  } else {
                    document.querySelector('#foeConfused').style.opacity = 1
                  }
                }

                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }


              break
            case 'seeded':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{
                  queueProcess.disabled = true
                  console.log('there')
  
                  let justGotSeeded = false
  
                  if(this.affliction[1].active == false) {
                    justGotSeeded = true
                    this.affliction[1].active = true
  
                    if(recipient.isEnemy) document.querySelector('#allySeeds').style.opacity = 1
                    else document.querySelector('#foeSeeds').style.opacity = 1
                  }
  
                  setTimeout(() =>{
                    if(this.element[1] == 'grass' || this.element[2] == 'grass'){
                      this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(this.nickname)} cannot be seeded...`)
                      return
                    }
                  
                    if(this.affliction[1].active == true && justGotSeeded == false) {
                      this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(this.nickname)} is already seeded....`)
                    } else {
                      this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(this.nickname)} was seeded.`)
                      this.affliction[1].active = true
                    }
  
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 750)
  
                  }, 1250)
                })
              } else {
                queueProcess.disabled = true
                console.log('there')

                let justGotSeeded = false

                if(recipient.affliction[1].active == false) {
                  justGotSeeded = true
                  recipient.affliction[1].active = true

                  if(recipient.isEnemy) document.querySelector('#allySeeds').style.opacity = 1
                  else document.querySelector('#foeSeeds').style.opacity = 1
                }

                setTimeout(() =>{
                  if(recipient.element[1] == 'grass' || recipient.element[2] == 'grass'){
                    this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} cannot be seeded...`)
                    return
                  }
                
                  if(recipient.affliction[1].active == true && justGotSeeded == false) {
                    this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} is already seeded....`)
                  } else {
                    this.dialogue('battle', `${document.querySelector('#dialogueInterface').textContent}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was seeded.`)
                    recipient.affliction[1].active = true
                  }

                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 750)

                }, 1250)
              }
              break
          }
        } 
      }

      if(move.effects != null){
        // working here
        // queueProcess.disabled = true
        // console.log('there')
        // let statusOdd = Object.values(Object.values(move.effects)[0])[0]
        // applyAffliction(Object.keys(Object.values(move.effects)[0])[0])

        let prevText = document.querySelector('#dialogueInterface').innerText

        switch(Object.keys(Object.values(move.effects)[0])[0]){
          case 'sun':
            if(terrainConditions.turns.weather.sun.active){
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}\n\nBut the sun is already active...`)
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 750)
            } else {
              manageWeatherState('sun', terrainConditions.turns.weather.sun, 'init', this)
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.\n\nIt intensified the sun!`)
              }, 750)
            }
            break
          case 'rain':
            if(terrainConditions.turns.weather.rain.active){
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}\n\nBut the rain is already active...`)
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 750)
            } else {
              manageWeatherState('rain', terrainConditions.turns.weather.rain, 'init', this)
              console.log('here')
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.\n\nIt summoned intense rain!`)
              }, 750)
            }
            break
          case 'sand':
            if(terrainConditions.turns.weather.sand.active){
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}\n\nBut the sand is already active...`)
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 750)
            } else {
              manageWeatherState('sand', terrainConditions.turns.weather.sand, 'init', this)
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.\n\nIt summoned a strong sand storm!`)
              }, 750)
            }
            break
          case 'snow':
            if(terrainConditions.turns.weather.snow.active){
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}\n\nBut the snow is already active...`)
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
            } else {
              manageWeatherState('snow', terrainConditions.turns.weather.snow, 'init', this)
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.\n\nIt summoned a frigid snow storm!`)
              }, 750)
            }
            break
          case 'trick_room':
            if(terrainConditions.turns.etc.trick_room.active){
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}\n\nBut trick room is already active...`)
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
            } else {
              manageWeatherState('trick_room', terrainConditions.turns.etc.trick_room, 'init', this)
              setTimeout(() =>{
                this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${this.switchUnderScoreForSpace(move.name)}.`)
              }, 750)
            }
            break 
        }

        const statusAlreadyAppliedMessage = (type, affliction) =>{
          if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
            this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)}'s ability made the move useless..`)
          } else {
            if(recipient.status.name == type) 
              this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} is already ${affliction}...`)
            else if(recipient.status.name != null) 
              this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} already suffers from another status affliction...`)
          }
        }

        if(recipient.status.name != null){
          switch(Object.keys(Object.values(move.effects)[0])[0]){ 
            case 'burn':
              // console.log('now')
              setTimeout(() =>{
                statusAlreadyAppliedMessage(Object.keys(Object.values(move.effects)[0])[0], 'burnt')
    
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
                }, 1250)
              }, 1250)
              break
            case 'para':
              statusAlreadyAppliedMessage(Object.keys(Object.values(move.effects)[0])[0], 'paralyzed')
  
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
              break
            case 'psn':
              statusAlreadyAppliedMessage(Object.keys(Object.values(move.effects)[0])[0], 'poisoned')
  
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
              break
            case 'slp':
              statusAlreadyAppliedMessage(Object.keys(Object.values(move.effects)[0])[0], 'asleep')
  
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 2000)
              break
            case 'frz':
              statusAlreadyAppliedMessage(Object.keys(Object.values(move.effects)[0])[0], 'frozen')
  
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
              break
          }
        }
      }

      if(recipient.status.name != null) {
        if(move.effects == undefined) return
        applyAffliction(Object.keys(Object.values(move.effects)[0])[0])
        if(Object.keys(Object.values(move.effects)[0])[0] == 'confusion' || Object.keys(Object.values(move.effects)[0])[0] == 'seeded' ) return
        if(move.effects.type == 'status') if(move.name != 'trick_room') queue.push(() => this.dialogue('battle', `${this.switchUnderScoreForSpace(recipient.nickname)} already has a status affliction.`))
        return
      }

      if(move.effects != null){
        // working here
        if(move.type == 'heal') return
        queueProcess.disabled = true
        console.log('there')

        let statusOdd = Object.values(Object.values(move.effects)[0])[0]

        if(this.abilityInfo.ability.info != null) 
          if(this.abilityInfo.ability.info.type != undefined) {
            if(Object.keys(Object.values(move.effects)[0])[0] == this.abilityInfo.ability.info.type) {
              statusOdd += this.abilityInfo.ability.info.pow
            }
          }

        if(this.abilityInfo.ability.name == 'serene_Grace'){
          statusOdd = statusOdd * 2
        } 

        if(this.abilityInfo.ability.name == 'sheer_Force') return

        applyAffliction(Object.keys(Object.values(move.effects)[0])[0])

        if(rng <= statusOdd){
          let prevText = document.querySelector('#dialogueInterface').innerText
          // console.log(Object.keys(Object.values(move.effects)[0])[0])
          switch(Object.keys(Object.values(move.effects)[0])[0]){
            case 'burn':
              // console.log('now')
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{

                  if(this.element[1] == 'fire' || this.element[2] == 'fire'){
                    this.dialogue('battle', `${prevText}\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be burnt...`)
                    return
                  } else if(this.element[1] == 'water' || this.element[2] == 'water'){
                    this.dialogue('battle', `${prevText}\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be burnt...`)
                    return
                  }
  
                  this.status.name = 'burn'
                  this.statusEffectAnimation('burn', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was burnt!`)

                  if(recipient.isEnemy) recipientStatus = document.querySelector('#allyStatus')
                  else recipientStatus = document.querySelector('#foeStatus')

                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/burn.png'
  
                  if(this.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(recipient.status.name == null){
                        if(recipient.element[1] == 'fire' || recipient.element[2] == 'fire'){
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be burnt...`)
                          return
                        } else if(recipient.element[1] == 'water' || this.element[2] == 'water'){
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be burnt...`)
                          return
                        }
                      }
                    
                      recipient.status.name = 'burn'
                      recipient.statusEffectAnimation('burn', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was burnt!`)
                    
                      if(recipient.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
                    
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/burn.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }

                })
              } else if(recipient.status.name == null) {
                  if(recipient.element[1] == 'fire' || recipient.element[2] == 'fire'){
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be burnt...`)
                    return
                  } else if(recipient.element[1] == 'water' || recipient.element[2] == 'water'){
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be burnt...`)
                    return
                  }
  
                  recipient.status.name = 'burn'
                  recipient.statusEffectAnimation('burn', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was burnt!`)
                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/burn.png'
  
                  if(recipient.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(this.status.name == null){
                        if(this.element[1] == 'fire' || this.element[2] == 'fire'){
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be burnt...`)
                          return
                        } else if(recipient.element[1] == 'water' || this.element[2] == 'water'){
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be burnt...`)
                          return
                        }
                      }
                    
                      this.status.name = 'burn'
                      this.statusEffectAnimation('burn', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(this.nickname)} was burnt!`)
                    
                      if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
                    
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/burn.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }
                // console.log(queueProcess)
              }
              break
            case 'para':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{

                  if(this.element[1] == 'electric' || this.element[2] == 'electric') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be paralyzed...`)
                    return
                  } else if(this.element[1] == 'ground' || this.element[2] == 'ground') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be paralyzed...`)
                    return
                  } 
                  
                  // else if(this.element[1] == 'steel' || this.element[2] == 'steel') {
                  //   this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be paralyzed...`)
                  //   return
                  // }
  
                  this.status.name = 'para'
                  this.statusEffectAnimation('para', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was paralyzed!`)

                  if(recipient.isEnemy) recipientStatus = document.querySelector('#allyStatus')
                  else recipientStatus = document.querySelector('#foeStatus')

                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/para.png'
                  
                  if(this.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(recipient.status.name == null) {
                        if(recipient.element[1] == 'electric' || recipient.element[2] == 'electric') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                          return
                        } else if(recipient.element[1] == 'ground' || recipient.element[2] == 'ground') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                          return
                        } 
  
                        // else if(this.element[1] == 'steel' || this.element[2] == 'steel') {
                        //   this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be paralyzed...`)
                        //   return
                        // }
                      }
                    
                      recipient.status.name = 'para'
                      recipient.statusEffectAnimation('para', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was paralyzed!`)
  
                      if(recipient.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/para.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  } 

                })
              } else if(recipient.status.name == null) {
                  if(recipient.element[1] == 'electric' || recipient.element[2] == 'electric') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                    return
                  } else if(recipient.element[1] == 'ground' || recipient.element[2] == 'ground') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                    return
                  } 
                  
                  // else if(recipient.element[1] == 'steel' || recipient.element[2] == 'steel') {
                  //   this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                  //   return
                  // }
  
                  recipient.status.name = 'para'
                  // recipient.statusEffectAnimation('para', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was paralyzed!`)
                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/para.png'
                  
                  if(recipient.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(this.status.name == null) {
                        if(this.element[1] == 'electric' || this.element[2] == 'electric') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                          return
                        } else if(this.element[1] == 'ground' || this.element[2] == 'ground') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be paralyzed...`)
                          return
                        } 
  
                        // else if(this.element[1] == 'steel' || this.element[2] == 'steel') {
                        //   this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be paralyzed...`)
                        //   return
                        // }
                      }
                    
                      this.status.name = 'para'
                      // recipient.statusEffectAnimation('para', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was paralyzed!`)
  
                      if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/para.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  } 
              }
              break
            case 'psn':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{

                  if(this.element[1] == 'poison' || this.element[2] == 'poison') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be poisoned..`)
                    return
                  } else if(this.element[1] == 'steel' || this.element[2] == 'steel') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be poisoned..`)
                    return
                  }
  
                  this.status.name = 'psn'
                  this.statusEffectAnimation('psn', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was poisoned!`)

                  if(recipient.isEnemy) recipientStatus = document.querySelector('#allyStatus')
                  else recipientStatus = document.querySelector('#foeStatus')

                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/psn.png'
  
                  if(this.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(recipient.status.name == null) {
                        if(recipient.element[1] == 'poison' || recipient.element[2] == 'poison') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be poisoned..`)
                          return
                        } else if(recipient.element[1] == 'steel' || recipient.element[2] == 'steel') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be poisoned..`)
                          return
                        }
                      }
                    
                      recipient.status.name = 'psn'
                      recipient.statusEffectAnimation('psn', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was poisoned!`)
  
                      if(recipient.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/psn.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }

                })
              } else if(recipient.status.name == null) {
                  if(recipient.element[1] == 'poison' || recipient.element[2] == 'poison') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be poisoned..`)
                    return
                  } else if(recipient.element[1] == 'steel' || recipient.element[2] == 'steel') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be poisoned..`)
                    return
                  }
  
                  recipient.status.name = 'psn'
                  recipient.statusEffectAnimation('psn', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was poisoned!`)
                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/psn.png'
  
                  if(recipient.abilityInfo.ability.name == 'synchronize'){
                    setTimeout(() =>{
                      if(this.status.name == null) {
                        if(this.element[1] == 'poison' || this.element[2] == 'poison') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be poisoned..`)
                          return
                        } else if(this.element[1] == 'steel' || this.element[2] == 'steel') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be poisoned..`)
                          return
                        }
                      }
                    
                      this.status.name = 'psn'
                      this.statusEffectAnimation('psn', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(this.nickname)} was poisoned!`)
  
                      if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/psn.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }
              }
              break
            case 'slp':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{

                  if(this.element[1] == 'psychic' || this.element[2] == 'psychic') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be forced to sleep...`)
                    return
                  } else if(this.element[1] == 'ghost' || this.element[2] == 'ghost') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be forced to sleep...`)
                    return
                  }
  
                  if(this.abilityInfo.ability.name == 'sweet_veil') if(recipient.abilityInfo.ability.name != 'mold_Breaker') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be forced to sleep...`)
                    return
                  }
  
                  this.status.name = 'slp'
                  this.statusEffectAnimation('slp', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} fell asleep!`)
                  
                  if(recipient.isEnemy) recipientStatus = document.querySelector('#allyStatus')
                  else recipientStatus = document.querySelector('#foeStatus')

                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/slp.png'
  
                  if(this.abilityInfo.ability.name == 'synchronize'){
  
                    setTimeout(() =>{
                      if(recipient.status.name == null){
                        if(recipient.element[1] == 'psychic' || recipient.element[2] == 'psychic') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!n\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                          return
                        } else if(recipient.element[1] == 'ghost' || recipient.element[2] == 'ghost') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                          return
                        }
                      }
                    
                      if(recipient.abilityInfo.ability.name == 'sweet_veil') if(this.abilityInfo.ability.name != 'mold_Breaker') {
                        this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                        return
                      }
                    
                      recipient.status.name = 'slp'
                      recipient.statusEffectAnimation('slp', renderedSprites, queueProcess)
                      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} fell asleep!`)
  
                      if(recipient.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/slp.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }

                })
              } else if(recipient.status.name == null){

                  if(recipient.element[1] == 'psychic' || recipient.element[2] == 'psychic') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                    return
                  } else if(recipient.element[1] == 'ghost' || recipient.element[2] == 'ghost') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                    return
                  }
  
                  if(recipient.abilityInfo.ability.name == 'sweet_veil') if(this.abilityInfo.ability.name != 'mold_Breaker') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                    return
                  }
  
                  recipient.status.name = 'slp'
                  recipient.statusEffectAnimation('slp', renderedSprites, queueProcess)
                  this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} used ${move.name} on ${this.switchUnderScoreForSpace(recipient.nickname)}\n\n${this.switchUnderScoreForSpace(this.nickname)} fell asleep!`)
                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/slp.png'
  
                  if(recipient.abilityInfo.ability.name == 'synchronize'){
  
                    setTimeout(() =>{
                      if(this.status.name == null){
                        if(this.element[1] == 'psychic' || this.element[2] == 'psychic') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!n\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be forced to sleep...`)
                          return
                        } else if(this.element[1] == 'ghost' || this.element[2] == 'ghost') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be forced to sleep...`)
                          return
                        }
                      }
                    
                      if(this.abilityInfo.ability.name == 'sweet_veil') if(this.abilityInfo.ability.name != 'mold_Breaker') {
                        this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be forced to sleep...`)
                        return
                      }
                    
                      this.status.name = 'slp'
                      this.statusEffectAnimation('slp', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)} used ${move.name} on ${this.switchUnderScoreForSpace(this.nickname)}\n\n${this.switchUnderScoreForSpace(this.nickname)} fell asleep!`)
  
                      if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
  
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/slp.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
  
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }
              }
              break
            case 'frz':
              if(recipient.abilityInfo.ability.name == 'magic_Bounce'){
                recipient.magicBounce(this, queue, queueProcess, terrainConditions, () =>{

                  if(this.element[1] == 'ice' || this.element[2] == 'ice') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be frozen...`)
                    return
                  } else if(this.element[1] == 'fire' || this.element[2] == 'fire') {
                    this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(this.nickname)} cannot be frozen...`)
                    return
                  }
                
                  this.status.name = 'frz'
                  this.statusEffectAnimation('frz', renderedSprites, queueProcess)
                  this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was frozen!`)

                  if(recipient.isEnemy) recipientStatus = document.querySelector('#allyStatus')
                  else recipientStatus = document.querySelector('#foeStatus')

                  recipientStatus.style.display = 'block'
                  recipientStatus.src = 'img/status/frz.png'
  
                  if(this.abilityInfo.ability.name == 'synchronize'){
  
                    setTimeout(() =>{
                      if(recipient.status.name == null) {
                        if(recipient.element[1] == 'ice' || recipient.element[2] == 'ice') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be frozen...`)
                          return
                        } else if(recipient.element[1] == 'fire' || recipient.element[2] == 'fire') {
                          this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be frozen...`)
                          return
                        }
                      }
  
                      recipient.status.name = 'frz'
                      recipient.statusEffectAnimation('frz', renderedSprites, queueProcess)
                      this.dialogue('battle', `${recipient.switchUnderScoreForSpace(this.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was frozen!`)
                    
                      if(recipient.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                      else recipientStatus = document.querySelector('#allyStatus')
                    
                      recipientStatus.style.display = 'block'
                      recipientStatus.src = 'img/status/frz.png'
  
                      setTimeout(() =>{
                        queueProcess.disabled = false
                        console.log('here')
                      }, 750)
                    }, 1250)
                  } else {
                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 1250)
                  }

                })
              } else if(recipient.status.name == null) {
                if(recipient.element[1] == 'ice' || recipient.element[2] == 'ice') {
                  this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be frozen...`)
                  return
                } else if(recipient.element[1] == 'fire' || recipient.element[2] == 'fire') {
                  this.dialogue('battle', `${prevText} \n\n but ${this.switchUnderScoreForSpace(recipient.nickname)} cannot be frozen...`)
                  return
                }
              
                recipient.status.name = 'frz'
                recipient.statusEffectAnimation('frz', renderedSprites, queueProcess)
                this.dialogue('battle', `${prevText}\n\n${this.switchUnderScoreForSpace(recipient.nickname)} was frozen!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/frz.png'

                if(recipient.abilityInfo.ability.name == 'synchronize'){

                  setTimeout(() =>{
                    if(this.status.name == null) {
                      if(this.element[1] == 'ice' || this.element[2] == 'ice') {
                        this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be frozen...`)
                        return
                      } else if(this.element[1] == 'fire' || this.element[2] == 'fire') {
                        this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\nbut ${this.switchUnderScoreForSpace(this.nickname)} cannot be frozen...`)
                        return
                      }
                    }

                    this.status.name = 'frz'
                    this.statusEffectAnimation('frz', renderedSprites, queueProcess)
                    this.dialogue('battle', `${recipient.switchUnderScoreForSpace(recipient.nickname)}'s synchronize affected it's enemy!\n\n${this.switchUnderScoreForSpace(this.nickname)} was frozen!`)
                  
                    if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
                    else recipientStatus = document.querySelector('#allyStatus')
                  
                    recipientStatus.style.display = 'block'
                    recipientStatus.src = 'img/status/frz.png'

                    setTimeout(() =>{
                      queueProcess.disabled = false
                      console.log('here')
                    }, 750)
                  }, 1250)
                } else {
                  setTimeout(() =>{
                    queueProcess.disabled = false
                    console.log('here')
                  }, 1250)
                }
              }
              break
            }
        }
      }
    }

    // console.log('statusRNG')
    statusRNG()
    
    if(recipient.protected.active && recipient.protected.turns == 0) recipient.protected.turns = 1

    // if(move.name != 'fire_ball') rotation = 0
    // should find a way to manage moves better or this will become a cluster fuck very quickly
    switch(move.animationType){
    //physical
      case 'physical':
        hitAnimation(false)
        break

      case 'physicalSprite':
        hitAnimation(true)
        break

    // special
      case 'specialSprite':
        projectileAnimation()
        break
      
    // status
      case 'healing':
        this.statusAnimation('heal', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        break

      case 'statsSelf':
        this.statusAnimation('statsSelf', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        break  
      case 'stats':
        this.statusAnimation('stats', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        break

      // status effect
      case 'status':
        this.statusAnimation('status', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        break
      case 'statusSelf':
        this.statusAnimation('statusSelf', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
        break

    }

    // stats effect after attack
    if(move.type == 'physical' || move.type == 'special') if(move.effects != null) {
      // console.log(immuned)
      // queue.push(() => {
        if(immuned) return
        statusCalculation()
        this.statusAnimation('array', move.effects, move, recipient, renderedSprites, statsChangeObj, terrainConditions, queueProcess)
      // })
    }

    console.log('this needs to happen at the end of every turn')

    this.managePP(move)
  }

  statusEffectAnimation(type, renderedSprites, queueProcess, confusionProcess){
    queueProcess.disabled = true
    console.log('there')
    let rotation = 0
    let yOffset = 0
    let xOffset = 0
    let xTravel = 0

    if(this.isEnemy) {
      yOffset = 50
      xOffset = -100
      xTravel = 300
    }
    else {
      yOffset = 275
      xOffset = 25
      xTravel = 425
    }
    
    let statusEffectImg = new Image()
    let statusEffectSprite = new Sprite({
      type: 'statusEffect',
      position: {
        x: this.position.x + xOffset,
        y: this.position.y + this.height + yOffset
      },
      img: statusEffectImg,
      frames: {
        max: 4,
        hold: 50
      },
      animate: true,
      rotation
    })

    const tl = gsap.timeline()

    switch(type){
      case 'burn':
        statusEffectImg.src = 'img/moves/fireball.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.rotation = 45

        tl.to(statusEffectSprite.position, {
          x: statusEffectSprite.position.x + xTravel,
          onComplete: () =>{
            // queueProcess.disabled = false
            // console.log('here')
            renderedSprites.pop()
          }
        })
        break
      case 'para':
        statusEffectImg.src = 'img/moves/para.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 15

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x - this.width / 8,
            y: this.position.y - this.height / 1.25
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 8,
            y: this.position.y + this.height * 1.15
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            renderedSprites.pop()
          }
        })

        break
      case 'psn':
        statusEffectImg.src = 'img/moves/psn.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 15

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x + this.width - 375,
            y: this.position.y + this.height - 75
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 4.75,
            y: this.position.y + this.height / 1.5
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            renderedSprites.pop()
          }
        })

        break
      case 'slp':
        statusEffectImg.src = 'img/moves/slp.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x + this.width - 375,
            y: this.position.y + this.height - 75
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 2.5,
            y: this.position.y + this.height / 3
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            renderedSprites.pop()
          }
        })
        break
      case 'frz':
        statusEffectImg.src = 'img/moves/frz.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 15
        statusEffectSprite.opacity = 0.5

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x + this.width - 375,
            y: this.position.y + this.height - 75
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 4.75,
            y: this.position.y + this.height / 0.75
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            renderedSprites.pop()
          }
        })
        break
      case 'confusion':
        if(this.affliction[0].active == false) return
        statusEffectImg.src = 'img/moves/confusion.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x + this.width - 375,
            y: this.position.y + this.height - 75
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 2.5,
            y: this.position.y + this.height / 3
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            // if(this.isEnemy) if(!confusionProcess.foe) queueProcess.disabled = false
            // else if(!confusionProcess.ally) queueProcess.disabled = false
            // console.log('here')
            renderedSprites.pop()
          }
        })
        break
      case 'seeded':
        if(this.affliction[1].active == false) return

        statusEffectImg.src = 'img/moves/seed.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60

        if(this.isEnemy){
          statusEffectSprite.position = {
            x: this.position.x + this.width - 375,
            y: this.position.y + this.height - 75
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 2.5,
            y: this.position.y + this.height / 3
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            renderedSprites.pop()
          }
        })
        break
    }
  }

  endOfTurnTerrainManagement(info, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player){
    console.log(terrainConditions.weatherSpent)

    console.log('wawawiiiii')
    console.log(info)
    
    if(info == null){
      let checkIfTerrainConditionActive = () =>{
        console.log(terrainConditions)
        let flag = false
        const terrainArr = []

        Object.values(terrainConditions).forEach((types, i) =>{
          Object.entries(types).forEach((terrainType, j) =>{
            if(terrainType[0] == 'etc' || terrainType[0] == 'weather') 
              Object.entries(terrainType[1]).forEach((terrain) =>{
                // terrain.active = false
                // terrain.turns = 5
                if(terrain[1].active){
                  console.log(terrain)
                  flag = true
                  terrainArr.push({type: terrain[0], info: terrain[1]})
                }
              })
          })
        })

        console.log(terrainArr)
  
        return [flag, terrainArr]
      }
  
      let [terrainFlag, terrainArr] = checkIfTerrainConditionActive()

      console.log(terrainArr)

      if(terrainFlag){
        if(faintSwitch.active){
          faintSwitch.active = false
          // return
        }
        
        // console.log(faintEvent)
        // console.log(faintSwitch)

        const terrainAnimation = (type, colorByElement) =>{
          const color = typesObj[colorByElement].color
    
          const tl1 = gsap.timeline()
          const tl2 = gsap.timeline()
    
          switch(type){
            case 'trick_room':
              //animate here
    
              // console.log('here')
    
              // const fieldEffect = document.querySelector('#fieldEffect')
    
              // // const fieldEffectContent = document.createElement('div')
              // // fieldEffectContent.id = 'trickroom'
      
              // // for(let i = 0; i < 15; i++){
              // //   const trickRoomCells = document.createElement('div')
              // //   trickRoomCells.id = 'trickroomCells'
      
              // //   fieldEffectContent.appendChild(trickRoomCells)
              // // }
      
              // // fieldEffect.appendChild(fieldEffectContent)
      
              // tl1.to(fieldEffect, {
              //   opacity: 'rgba(255, 0, 255, 0)',
              // }).to(fieldEffect, {
              //   opacity: 'rgba(255, 0, 255, 0.5)',
              //   duration: 0.5
              // }).to(fieldEffect, {
              //   opacity: 'rgba(255, 0, 255, 1)',
              //   duration: 0.01,
              //   onComplete: () =>{
              //     // document.querySelector('#trickroom').parentNode.removeChild(document.querySelector('#trickroom'))
              //     terrainConditions.turns.etc.trick_room.active = true
              //     queueProcess.disabled = false
                    // console.log('here')
              //   }
              // })
              break
          }
    
          const scene = document.querySelector('#scene')
          tl2.to(scene, {
            backgroundColor: `#${color}40`,
            duration: 0.25
          }).to(scene, {
            backgroundColor: `#${color}00`,
            duration: 0.25
          }).to(scene, {
            backgroundColor: `#${color}40`,
            duration: 0.25
          }).to(scene, {
            backgroundColor: `#${color}00`,
            duration: 0.25,
            onComplete: () =>{
              // queueProcess.disabled = false
              // console.log('here')
            }
          })
        }

        const weatherHeal = (target, weatherName) =>{
          queue.push(() =>{
            target.dialogue('battle', `${target.nickname} was healed by the ${weatherName}.`)

            let healAmount = Math.floor(target.stats.baseHp / 16)
            if(this.abilityInfo.ability.name == 'photosynthesis') healAmount = Math.floor(target.stats.baseHp / 4)
            target.hp += healAmount
            if(target.hp > target.stats.baseHp) target.hp = target.stats.baseHp

            target.hpManagement()
          })
        }

        const dispatchWeatherHeal = () =>{
          if(slower.abilityInfo.ability.type == 'weatherHeal') if(terrainConditions.turns.weather[slower.abilityInfo.ability.info].active) weatherHeal(slower, slower.abilityInfo.ability.info)

          if(faster.abilityInfo.ability.type == 'weatherHeal') if(terrainConditions.turns.weather[faster.abilityInfo.ability.info].active) weatherHeal(faster, faster.abilityInfo.ability.info)
        }

        const spendWeatherTurn = activeTerrain =>{
          terrainAnimation(activeTerrain.type, activeTerrain.info.element)
          activeTerrain.info.turns--

          if(activeTerrain.type == 'trick_room') document.querySelector('#trickRoomTurnIndicator').textContent = activeTerrain.info.turns
          else if(activeTerrain.type == 'ally_reflect') document.querySelector('#allyReflectTurnIndicator').textContent = activeTerrain.info.turns
          else if(activeTerrain.type == 'ally_light_screen') document.querySelector('#allyLightScreenTurnIndicator').textContent = activeTerrain.info.turns
          else if(activeTerrain.type == 'foe_reflect') document.querySelector('#foeReflectTurnIndicator').textContent = activeTerrain.info.turns
          else if(activeTerrain.type == 'foe_light_screen') document.querySelector('#foeLightScreenTurnIndicator').textContent = activeTerrain.info.turns
          else document.querySelector('#fieldEffectTurnIndicator').textContent = activeTerrain.info.turns

          document.querySelector('#fieldEffect').opacity = 1

          this.dialogue('battle', `${activeTerrain.info.turns} turns left to ${activeTerrain.type.replace(/_/g, ' ')}.`)

          setTimeout(() =>{
            // queueProcess.disabled = false
            // console.log('here')
          }, 1250)
        }

        terrainArr.forEach((activeTerrain, i) =>{
          if(activeTerrain.info.turns <= 1){
            manageWeatherState(null, null, 'endOfTurn', null, activeTerrain)
            return
          }

          if(terrainConditions.weatherSpent) return

          if(i == 0){
            if(terrainArr.length == 1) terrainConditions.weatherSpent = true
            dispatchWeatherHeal()
            spendWeatherTurn(activeTerrain)
          } else if(i < terrainArr.length - 1) {
            dispatchWeatherHeal()
            queue.push(() => spendWeatherTurn(activeTerrain))
          } else {
            dispatchWeatherHeal()
            queue.push(() =>{
              terrainConditions.weatherSpent = true
              spendWeatherTurn(activeTerrain)
            })
          }


          // queueProcess.disabled = true
          // console.log('there')

          // const weatherEventQueues = queue.splice(1,3)

          // setTimeout(() => {
          //   weatherEventQueues.forEach(func =>{
          //     queue.push(() => func())
          //   })

          //   console.log(queue)
          //   queueProcess.disabled = false
          // }, 1250)
        })
      }
    }

    const endOfTurnRegen = target =>{
      if(target.hp == target.stats.baseHp) return

      if(target.abilityInfo.ability.name == 'slimie_regeneration'){
        queue.push(() =>{
          target.dialogue('battle', `${target.nickname}'s ability allowed it to heal a bit.`)

          let healAmount = Math.floor(target.stats.baseHp / 16)
          target.hp += healAmount

          target.hpManagement()
        })
      } else if(target.abilityInfo.ability.name == 'queen_Lair'){
        queue.push(() =>{
          let targetTeam = player.team
          if(target.isEnemy) targetTeam = enemyTrainerInfo

          target.dialogue('battle', `${target.nickname}'s ability allowed it to heal.`)

          let x = 1

          for(let i = 1; i < targetTeam.length; i++){
            const targetPogemonPogedexNum = targetTeam[i].pogemon.pogedex
            if(
              targetPogemonPogedexNum == 16 ||
              targetPogemonPogedexNum == 17 ||
              targetPogemonPogedexNum == 18
            ){
              x += 1
            }
          }

          let healAmount = Math.floor((x * this.stats.baseHp) / 16)
          this.hp += healAmount

          this.hpManagement()
        })
      }

      let isTargetPoisonType = false

      if(target.element[1] == 'poison') isTargetPoisonType = true
      if(target.element[2] == 'poison') isTargetPoisonType = true

      if(target.heldItem != null){
        if(target.heldItem.name == 'leftovers'){
          queue.push(() =>{
            target.dialogue('battle', `${target.nickname}'s leftovers allowed it to heal a bit.`)
  
            let healAmount = Math.floor(target.stats.baseHp / 16)
            target.hp += healAmount
  
            target.hpManagement()
          })
        } else if(target.heldItem.name == 'poison_Sludge' && isTargetPoisonType){
          queue.push(() =>{
            target.dialogue('battle', `${target.nickname}'s black sludge allowed it to heal a bit.`)
  
            let healAmount = Math.floor(target.stats.baseHp / 16)
            target.hp += healAmount
  
            target.hpManagement()
          })
        }
      }
    }

    // maybe put regen here???????
    endOfTurnRegen(slower)
    endOfTurnRegen(faster)
  }

  // should pass foe instead of slower
  checkStatus(healthBar, healthAmount, renderedSprites, queue, queueProcess, faintEvent, opponent, info, debounce, terrainConditions, manageWeatherState, faintSwitch){
    //makes sure the pogemon isint fainted and that the second pogemon's statusCheck is queued up

    // console.log(this.nickname)

    let opponentHealthBar
    let opponentHealthAmount

    if(this.isEnemy) {
      healthBar = '#foeHealthBar'
      healthAmount = document.querySelector('#foeHP')
      opponentHealthBar = '#allyHealthBar'
      opponentHealthAmount = document.querySelector('#allyHP')
    } else {
      healthBar = '#allyHealthBar'
      healthAmount = document.querySelector('#allyHP')
      opponentHealthBar = '#foeHealthBar'
      opponentHealthAmount = document.querySelector('#foeHP')
    }

    let thisFaints = () => {
      if(this.fainted) return
      if(this.hp <= 0){
        // audioObj.music.battle.stop()
        // audioObj.music.victory.play()
        this.hpManagement()
        faintEvent(this)
        console.log('faintEvent')
        return
      }
    }

    let checkForSeededEvent = () =>{
      this.affliction.forEach(affliction =>{
        // console.log(affliction)
        if(affliction.name == 'seeded'){
          if(affliction.active == false) return
          if(this.fainted) return
          if(opponent.fainted) return
          
          queue.push(() =>{{
            thisFaints()
  
            let chip = Math.floor(this.stats.baseHp / 8)
  
            this.hp -= chip
            if(opponent.hp < opponent.stats.baseHp) opponent.hp = Math.floor(opponent.hp + chip)
            if(opponent.hp > opponent.stats.baseHp) opponent.hp = opponent.stats.baseHp
            if(this.hp < 1) this.hp = 0
  
            // let opponentHealthBar
            // let opponentHealthAmount

            if(this.isEnemy) {
              healthBar = '#foeHealthBar'
              healthAmount = document.querySelector('#foeHP')
              // opponentHealthBar = '#allyHealthBar'
              // opponentHealthAmount = document.querySelector('#allyHP')
            } else {
              healthBar = '#allyHealthBar'
              healthAmount = document.querySelector('#allyHP')
              // opponentHealthBar = '#foeHealthBar'
              // opponentHealthAmount = document.querySelector('#foeHP')
            }
  
            document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
  
            healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
            
            this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s health was sapped by the seeds.`)
            
            this.statusEffectAnimation(affliction.name, renderedSprites, queueProcess)
            this.hpManagement()
            opponent.hpManagement()

            thisFaints()
          }})
        }
      })
    }

    let endTurnStatusEvent = statusInfo =>{
      if(this.status.name == 'para' || this.status.name == 'slp') {
        if(statusInfo != null || statusInfo != undefined) opponent.checkStatus(statusInfo[0], statusInfo[1], statusInfo[2], statusInfo[3], statusInfo[4], statusInfo[5], this, null, true, terrainConditions, manageWeatherState, faintSwitch)
      } else {
        queue.push(() =>{
          if(this.fainted) return
          thisFaints()
          let chip
    
          switch(this.status.name){
            case 'burn':
            case 'frz':
  
              chip = Math.floor(this.stats.baseHp / 16)
              // console.log(chip)
              // console.log(this.hp)
              this.hp -= chip
              // console.log(this.hp)
              if(this.hp < 1) this.hp = 0
    
              if(this.isEnemy) {
                healthBar = '#foeHealthBar'
                healthAmount = document.querySelector('#foeHP')
              }
    
              document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
    
              healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
              
              if(this.status.name == 'burn') this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} felt the burn.`)
              else if(this.status.name == 'frz') this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} was hurt by the frost.`)
              
              thisFaints()

              if(opponent != null) {    
                if(!debounce) opponent.checkStatus(opponentHealthBar, opponentHealthBar, renderedSprites, queue, queueProcess, faintEvent, this, null, true, terrainConditions, manageWeatherState, faintSwitch)
              }
              
              this.statusEffectAnimation(this.status.name, renderedSprites, queueProcess)
              this.hpManagement()
  
              setTimeout(() =>{
                queueProcess.disabled = false
                console.log('here')
              }, 1250)
              break
            case 'psn':
              chip = Math.floor((this.stats.baseHp / 16) * this.status.turns + 1)
              this.hp -= chip
              if(this.hp < 1) this.hp = 0
    
              if(this.isEnemy) {
                healthBar = '#foeHealthBar'
                healthAmount = document.querySelector('#foeHP')
              }
    
              document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
              healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
              this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} felt sick.`)
    
              thisFaints()
    
              if(opponent.status.name != null && info != null) {
                opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, false, terrainConditions, manageWeatherState, faintSwitch)
              }
              
              this.statusEffectAnimation(this.status.name, renderedSprites, queueProcess)
              this.hpManagement()
    
              this.status.turns = this.status.turns + 1
              break
          }
        })
      }
    }

    // console.log(this.nickname)
    checkForSeededEvent()

    //checks if dead
    thisFaints()

    // from here -> manages status effect

    if(this.status.name == null){
      if(opponent.status.name == null){
        // vvvvv manage without affliction and status vvvvv

        // console.log(opponent)
        if(!opponent.affliction[0].active == false && opponent.affliction[1].active == false) {
          // this.endOfTurnTerrainManagement(info, queue, terrainConditions, faintSwitch, queueProcess)
        }

        // vvvvv manage affliction without status vvvvv

        // // thisFaints()
        if(info != undefined && !debounce){
          // if(info[0] == '#foeHealthBar') return
          opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, true, terrainConditions, manageWeatherState, faintSwitch) 

        }
      } else {
        console.log(`status on ${this.switchUnderScoreForSpace(opponent.nickname)}`)
        // thisFaints()
        if(info != undefined && !debounce){
          opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, true, terrainConditions, manageWeatherState, faintSwitch)
        }
      }
    } else {
      endTurnStatusEvent(info)
      if(opponent.status.name != null){
        if(!debounce){
          // thisFaints()
          // opponent.checkStatus(opponentHealthBar, opponentHealthAmount, renderedSprites, queue, queueProcess, faintEvent, this, null, true, terrainConditions, manageWeatherState, faintSwitch)
          // console.log('checkStatus')
        }
      } else {
        // here makes the weather skip a turn
      }
    }

    // from here -> manages terrain
    console.log(info)
    // end of turn animation stuff
    // this.endOfTurnTerrainManagement(info, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState)
    // console.log('endOfTurnTerrainManagement')
  }

  //should change for disrupt and pass it 'miss' and 'flinched' arguments
  miss(type, renderedSprites, queueProcess, opponent){
    queueProcess.disabled = true
    console.log('there')
    switch(type){
      case 'missed':
      case 'flinched':

        this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} ${type}!`)

        gsap.to(this.position, {
          x: this.position.x + 10,
          y: this.position.y + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.08,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
            this.flinched = false
            // if(opponent != undefined) this.checkStatus()
          }
        })
        break
      case 'para':
        queueProcess.disabled = true
        console.log('there')

        this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} couldnt move because it's paralyzed.`)
        // if(!this.affliction[0].active) this.statusEffectAnimation('para', renderedSprites, queueProcess)
        this.statusEffectAnimation('para', renderedSprites, queueProcess)
        break
      case 'slp':
        this.status.turns += 1
        this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} is deep asleep.`)
        this.statusEffectAnimation('slp', renderedSprites, queueProcess)
        break
      case 'confusion':
        this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} hit itself in confusion.`)

        let userId = 'ally'
        let userHp = document.querySelector('#allyHp')
        if(this.isEnemy) {
          userId = 'foe'
          userHp = document.querySelector('#foeHp')
        }

        // wtf burn?

        let burn = 1
        if(this.status.name == 'burn') burn = 0.5

        let allyAtkChange = statsChangeObj[userId].nominator.atk / statsChangeObj[userId].denominator.atk
        let allyDefChange = statsChangeObj[userId].nominator.def / statsChangeObj[userId].denominator.def

        this.hp -= Math.ceil((((2 * this.lvl / 5 + 2) * 40 * (this.stats.atk * allyAtkChange) / (this.stats.def * allyDefChange) / 50 + 2) * burn))
        this.hpManagement()

        gsap.to(this.position, {
          x: this.position.x + 10,
          y: this.position.y + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.08,
          onComplete: () =>{
            queueProcess.disabled = false
            console.log('here')
          }
        })
        break
    }
  }

  faint(queueFaintTrigger){
    if(this.hp > 0) return

    queueFaintTrigger.initiated = true
    this.fainted = true
    gsap.to(this.position, {
      y: this.position.y + 20,
      onComplete: () =>{
        audioObj.SFX.faint.play()
        gsap.to(this.position, {
          y: this.position.y - 20,
        })

        this.manageFriendliness(-10)
      }
    })
    gsap.to(this, {
      opacity: 0
    })
  }

  heal(dom, item){
    const hpDom = document.querySelector(`.${dom}`).childNodes[1].childNodes[1].childNodes[1].childNodes[0]
    const healthBarDom = document.querySelector(`.${dom}`).childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0]
  
    if(this.hp == this.stats.baseHp) return
  
    this.hp = this.hp + item.pow
    if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
  
    healthBarDom.style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
    hpDom.textContent = `${this.hp}/${this.stats.baseHp}`
  }

  expGain(yeilder, battleType, battlerArr, inBattle, lvlCap){
    if(this.fainted) return
    if(this.lvl >= 100) return
    let a = 1
    if(battleType = 'trainer') a = 1.5

    // amount of allied participants to the battle
    let s = battlerArr.length

    // let t = if original trainer
    // let e = if lucky egg held
    // let v = if past evolution lvl
    // let f = affection
    // let p = exp buff or debuff such as exp charm and shit

    const yeild = pogemonsObj[`${this.switchUnderScoreForSpace(yeilder.nickname)}`].yeild * a
    const lvl = yeilder.lvl
    let expGained = Math.floor(((yeild * lvl / 5) * (1 / s) * Math.pow(((2 * lvl + 10) / (lvl + this.lvl + 10)), 2.5) + 1))

    if(this.heldItem != null) if(this.heldItem.name == 'lucky_Egg') expGained = expGained * 1.5
    
    this.exp += expGained
    this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} gained ${expGained} exp points!`)

    this.expBarProgress(inBattle)

    let potentialLevel = Math.floor(Math.cbrt(this.exp))

    console.log(potentialLevel)

    console.log(lvlCap)

    if(potentialLevel >= lvlCap) {
      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} gained ${expGained} exp points!\n\nThis pogemon has reached your current level cap.`)
      this.exp = Math.floor(Math.pow(lvlCap + 1, 3)) - 1
    } 

    this.lvl = this.generateLevel()
  }

  teamExpEvent(queue, prevLvl, queueProcess){
    queue.push(() =>{
      if(this.isShiny) document.querySelector('.teamLvlUpImg').src = this.pogemon.sprites.shiny.sprite
      else document.querySelector('.teamLvlUpImg').src = this.pogemon.sprites.classic.sprite

      document.querySelector('#teamLvlUpWindow').style.display = 'grid'
      document.querySelector('#teamLvlUpWindow').style.left = '120.5%'
      document.querySelector('#teamLvlUpExpDetailsLvl').textContent = `lv ${prevLvl}`

      if(this.lvl > prevLvl) {
        queueProcess.disabled = true
        console.log('there')
        gsap.to(document.querySelector('#teamLvlUpWindow').style, {
          left: '82.5%',
          onComplete: () =>{
            setTimeout(() =>{
              gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                width: `100%`,
                duration: 1,
                onComplete: () =>{
                  document.querySelector('#teamLvlUpExpDetailsLvl').textContent = `lv ${prevLvl} >>> lv ${this.lvl}`
                  this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s lvl raised to ${this.lvl}!`)
                  gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                    width: `0%`,
                    onComplete: () =>{
                      gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                        duration: 0.75,
                        width: `${Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))}%`,
                        onComplete: () =>{
                          queueProcess.disabled = false
                          console.log('here')
                        }
                      })
                    }
                  })
                }
              })
            }, 500)
          }
        })
      } else {
        gsap.to(document.querySelector('.teamLvlUpExpBar'), {
          width: `${Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))}%`,
        })
      }
    })

    // queue.push(() =>{
    //   gsap.to(document.querySelector('#teamLvlUpWindow').style, {
    //     top: '110.5%',
    //     // onComplete: () =>{
    //     //   document.querySelector('#teamLvlUpWindow').style.display = 'none'
    //     // }
    //   })
    // })
  }

  expBarProgress(inBattle){
    if(inBattle){
      let percentage = Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))

      if(percentage >= 100){
        gsap.to('#expBar',{
          width:`${percentage}%`,
          duration: 0.1
        })
      } else {
        gsap.to('#expBar',{
          width:`${percentage}%`,
          duration: 0.5,
        })
      }
    }
  }

  onLvlUp(inBattle){
    let percentage = Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))

    this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s stats increased!`)
    this.stats = this.generateStats()

    if(inBattle){
      document.querySelector('#expBar').style.width = '0%'
      setTimeout(() => document.querySelector('#expBar').style.width = `${percentage}%`, 1000)

      const allyLvlDom = document.querySelector('#allyLvl')
      const allyHpDom = document.querySelector('#allyHp')

      this.hp = this.hp + (Math.round(this.stats.baseHp * 0.05) + 1)
      if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
  
      allyHpDom.textContent = `${this.hp}/${this.stats.baseHp}`
      allyLvlDom.textContent = `Lv ${this.lvl}`
  
      let hpPercentage = Math.floor(this.convertToPercentage(this.hp, this.stats.baseHp))
      document.querySelector('#allyHealthBar').style.width = `${hpPercentage}%`
    }
  }

  showStatWindow(type, oldStats, prevLvl, queueProcess){
    let lvlUpWindowDom
    let lvlUpLvlDom
    let lvlUpStatsArr

    if(type == 'battle'){
      lvlUpWindowDom = document.querySelector('#lvlUpWindow')
      lvlUpLvlDom = document.querySelector('#lvlUpLvl')
      lvlUpStatsArr = document.querySelectorAll('.lvlUpStats')
    } else {
      lvlUpWindowDom = document.querySelector('#evoLvlUpWindow')
      lvlUpLvlDom = document.querySelector('#evoLvlUpLvl')
      lvlUpStatsArr = document.querySelectorAll('.evoLvlUpStats')
    }

    lvlUpWindowDom.style.display = 'grid'

    queueProcess.disabled = true
    console.log('there')

    if(prevLvl == null) lvlUpLvlDom.textContent = `lv ${this.lvl}`
    else lvlUpLvlDom.textContent = `lv ${prevLvl}`

    for(let i = 0; i < Object.keys(this.stats).length; i++){
      lvlUpStatsArr[i].textContent = `${Object.values(oldStats)[i]}`
    }

    gsap.to(lvlUpWindowDom.style, {
      left: '1585px',
      onComplete: () =>{
        setTimeout(() =>{
          if(type == 'battle') lvlUpLvlDom.textContent = `lv ${prevLvl} >>> lv ${this.lvl}`
          else lvlUpLvlDom.textContent = `lv ${this.lvl}`
      
          for(let i = 0; i < Object.keys(this.stats).length; i++){
      
            const increase = Object.values(this.stats)[i] - Object.values(oldStats)[i]
      
            if(increase < 0) lvlUpStatsArr[i].textContent = `${increase * -1} - ${Object.values(oldStats)[i]}`
            else lvlUpStatsArr[i].textContent = `${increase} + ${Object.values(oldStats)[i]}`
          }

          setTimeout(() => {
            queueProcess.disabled = false
            console.log('here')
          }, 1000)
                  
        }, 1000)
      }
    })
  }

  showStatIncrease(type){
    let lvlUpLvlDom
    let lvlUpStatsArr

    if(type == 'battle'){
      lvlUpLvlDom = document.querySelector('#lvlUpLvl')
      lvlUpStatsArr = document.querySelectorAll('.lvlUpStats')
    } else {
      lvlUpLvlDom = document.querySelector('#evoLvlUpLvl')
      lvlUpStatsArr = document.querySelectorAll('.evoLvlUpStats')
    }

    lvlUpLvlDom.textContent = `Lv ${this.lvl}`

    for(let i = 0; i < lvlUpStatsArr.length; i++){
      lvlUpStatsArr[i].textContent = `${Object.values(this.stats)[i]}`
    }
  }

  hideStatIncrease(type){
    let lvlUpWindowDom = document.querySelector('#lvlUpWindow')

    if(type == 'battle'){
      lvlUpWindowDom = document.querySelector('#lvlUpWindow')
    } else {
      lvlUpWindowDom = document.querySelector('#evoLvlUpWindow')
    }

    lvlUpWindowDom.style.left = '2250px'
  }

  learnMoveOnLvlUp() {
    let oldMoves = [...this.moves]
    
    this.moves = this.generateMoves(false, null)

    let newMovesAmount = this.moves.length - oldMoves.length
    let newMoves = [...this.moves].splice(-newMovesAmount, newMovesAmount)

    return newMoves
  }

  checkBattleItemRng() {
    let rng = Math.floor(Math.random() * 99) + 1
    let odds = this.heldItem.odds

    if(odds == undefined) 
      return true
    else if(rng <= odds) 
      return true
    else 
      return false
  }

  eatBerrySprite(renderedSprites){
    const berryImg = new Image()
    berryImg.src = 'img/moves/eat_berry.png'

    const berrySprite = new Sprite({
      type: 'berry',
      position: {
        x: 0,
        y: 0
      },
      img: berryImg,
      frames: {
        hold: 50,
        max: 4
      },
      animate: true
    })

    if(this.isEnemy){
      berrySprite.position = {
        x: this.position.x - this.width / 8,
        y: this.position.y + this.height / 4
      }
    } else {
      berrySprite.position = {
        x: this.position.x + this.width / 4,
        y: this.position.y + this.height / 0.65
      }
    }

    renderedSprites.push(berrySprite)
    
    setTimeout(() =>{
      renderedSprites.pop()
    }, 1000)
  }

  useBattleItem(queueProcess, queue, faintEvent, targetHpBeforeMove, recipientHpBeforeMove, moves, characters, renderedSprites, critLanded, terrainConditions, queueFaintTrigger, manageWeatherState, foeMove){
    const item = this.heldItem

    if(item == undefined) return

    switch(item.effect){
      case 'heal':
        if(item.heldEffect == undefined) return

        if(this.hp <= 0 && this.fainted == false) {
          // faintEvent(this)
          return
        }

        // if(this.convertToPercentage(this.hp, this.stats.baseHp) > item.heldThreshHold) return
        
        if(typeof item.pow == 'number'){
          let healedAmount = item.pow
        
          if(item.heldEffect == 'flatHealing'){
            this.hp += item.pow
          } else if(item.heldEffect == 'percentHealing'){
            healedAmount = Math.floor(this.stats.baseHp * (item.pow / 100))
            this.hp += healedAmount
          }
  
          if(this.abilityInfo.ability.name == 'cheeck_Pouch'){
            let cheeckPouchHealAmount = Math.floor(this.stats.baseHp * 0.33)
            this.hp += cheeckPouchHealAmount
  
            healedAmount += cheeckPouchHealAmount
          }
  
          if(this.hp > this.stats.baseHp) {
            let removeFromHealedAmount = this.hp - this.stats.baseHp
            healedAmount -= removeFromHealedAmount
  
            this.hp = this.stats.baseHp
          }

          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ${this.switchUnderScoreForSpace(this.heldItem.name)} healed it by ${healedAmount} HP!`)
        } else {
          if(this.abilityInfo.ability.name == 'cheeck_Pouch') this.hp += Math.floor(this.stats.baseHp * 0.33)

          this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ${this.switchUnderScoreForSpace(this.heldItem.name)} cured it of it's status ailment!`)

          let recipientStatus
          
          if(this.isEnemy) recipientStatus = document.querySelector('#foeStatus')
          else recipientStatus = document.querySelector('#allyStatus')
      
          recipientStatus.style.display = 'none'
          recipientStatus.src = ''

          this.status.name = null
          this.status.turns = 0
        }
        

        this.hpManagement()
        this.eatBerrySprite(renderedSprites)
        break
      case 'pp':
        for(let i = 0; i < this.moves.length; i++){
          const move = this.moves[i]
          
          if(move.pp == 0){
            if(this.abilityInfo.ability.name == 'cheeck_Pouch') this.hp += Math.floor(this.stats.baseHp * 0.33)

            this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)}'s ${this.switchUnderScoreForSpace(this.heldItem.name)} restored some of it's pp!`)

            this.hpManagement()
            this.eatBerrySprite(renderedSprites)
            break
          }
        }
        break
      case 'sturdy':
        // if(this.hp != 0) return
        // if(this.fainted) return
        // if(item.name == 'focusSash') if(targetHpBeforeMove !== 100) return

        // const rng = Math.floor(Math.random() * 99) + 1
        
        // if(rng > this.heldItem.odds) return

        // if(this.fainted == false){
        //   this.hp = 1
        //   this.fainted = false
        //   this.hpManagement()
        //   queueProcess.disabled = true
        //   console.log('there')

        //   //change stuff here for sure
  
          
        //   if(this.isEnemy) this.move({move: moves.foe, recipient: characters.ally, recipientMove: foeMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
        //   else this.move({move: moves.ally, recipient: characters.foe, recipientMove: foeMove, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
        //   console.log('YAYA')


        //   this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\nThanks to it's ${this.switchUnderScoreForSpace(this.heldItem.name)}, ${this.switchUnderScoreForSpace(this.nickname)} held on by the grit of it's teeth!`)
  
        //   setTimeout(() =>{
        //     queueProcess.disabled = false
        //     console.log('here')
        //   }, 500)
        // }
        break
    }

    console.log(item)

    let recipientStatus

    if(item.name == 'flame_Orb' || item.name == 'toxic_Orb'){
      if(this.status.name != null) return
      // need to work on this

      // burn

      let statusName = 'burnt'
      if(item.heldType == 'psn') statusName = 'poisoned'

      this.status.name = `${item.heldType}`
      this.statusEffectAnimation(`${item.heldType}`, renderedSprites, queueProcess)
      this.dialogue('battle', `${document.querySelector('#dialogueInterface').innerText}\n\n${this.switchUnderScoreForSpace(this.nickname)} was ${statusName}!`)

      if(!this.isEnemy) recipientStatus = document.querySelector('#allyStatus')
      else recipientStatus = document.querySelector('#foeStatus')

      recipientStatus.style.display = 'block'
      recipientStatus.src = `img/status/${item.heldType}.png`

      this.dialogue('battle', `${this.switchUnderScoreForSpace(this.nickname)} was ${statusName} by the ${this.switchUnderScoreForSpace(this.heldItem.name)} it's holding.`)

      setTimeout(() =>{
        queueProcess.disabled = false
        console.log('there')
      }, 1250)
    }

    if(item.consume) this.heldItem = null
  }

  manageFriendliness(amount){
    this.friendliness += amount
    if(this.friendliness < 0) this.friendliness = 0
    if(this.friendliness > 255) this.friendliness = 255
  }

  checkIfMoveEffectIsStatusAffliction(effectArr){
    let pass
    let statusNameArr = ['slp', 'psn', 'para', 'burn', 'frz']

    for(let i = 0; i < statusNameArr.length; i++){
      if(effectArr[i] == statusNameArr[i]) pass = true
    }

    return pass
  }

  rerollEnemyMoveSoAppropriate(recipient, move, terrainConditions, enemyTrainerInfo){
    const pastMove = {...move}
    if(move == undefined) move = this.moves[Math.floor(Math.random() * this.moves.length)]

    console.log(move)
    console.log('reroll MOve')

    if(this.choiceItem.move != null) if(this.affliction[2].active && this.choiceItem.move == 'status') move = movesObj.struggle

    const effectiveMovesArr = []

    this.moves.forEach(move =>{
      let firstTypeVeryEffective = typesObj[move.element].veryEffective.includes(recipient.element[1])
      let secondTypeVeryEffective = false
      if(recipient.element[2] != null) secondTypeVeryEffective = typesObj[move.element].veryEffective.includes(recipient.element[2])

      let firstTypeNotEffective = typesObj[move.element].notEffective.includes(recipient.element[1])
      let secondTypeNotEffective = false
      if(recipient.element[2] != null) secondTypeNotEffective = typesObj[move.element].notEffective.includes(recipient.element[2])

      let firstTypeImmuned = typesObj[move.element].immuned.includes(recipient.element[1])
      let secondTypeImmuned = false
      if(recipient.element[2] != null) secondTypeImmuned = typesObj[move.element].immuned.includes(recipient.element[2])

      console.log(terrainConditions.static)
      console.log(move.name)

      let tauntInteraction = false    
      if(this.affliction[2].active && move.type == 'status') tauntInteraction = true

      let preventRedundantConfusion = false    
      if(this.affliction[0].active && move.type == 'status' && Object.keys(move.effects[0]) == 'confusion') preventRedundantConfusion = true

      let preventRedundantSeeds = false    
      if(this.affliction[1].active && move.name == 'leech_seed') preventRedundantSeeds = true

      let preventRedundantTaunt = false    
      if(this.affliction[2].active && move.name == 'taunt') preventRedundantTaunt = true

      console.log(terrainConditions)
      let preventRedundantReflect = false
      if(terrainConditions.turns.etc.foe_reflect.active && move.name == 'reflect') preventRedundantReflect = true

      let preventRedundantLightScreen = false
      if(terrainConditions.turns.etc.foe_light_screen.active && move.name == 'light_screen') preventRedundantLightScreen = true

      let preventRedundantTrickRoom = false
      if(terrainConditions.turns.etc.trick_room.active && move.name == 'trick_room') preventRedundantTrickRoom = true

      let preventRedundantStealthRocks = false
      if(terrainConditions.static.stealth_rock.active.ally && move.name == 'stealth_rock') preventRedundantStealthRocks = true

      let preventRedundantStickyWeb = false
      if(terrainConditions.static.sticky_web.active.ally  && move.name == 'sticky_web') preventRedundantStickyWeb = true

      let preventRedundantStatus = false
      if(recipient.status.name != null && this.checkIfMoveEffectIsStatusAffliction(move.effect)) preventRedundantStatus = true

      let assaultVestInteraction = false
      if(move.type == 'status' && this.heldItem != null && this.heldItem.name == 'assault_Vest') assaultVestInteraction = true

      let preventRedundantKnockOff = false
      if(this.heldItem == null && move.name == 'knock_Off') preventRedundantKnockOff = true
  
      console.log(`${move.element} : ${recipient.element[1]} ` + firstTypeNotEffective)
      console.log(`${move.element} : ${recipient.element[2]} ` + secondTypeNotEffective)
      console.log(`${move.element} : ${recipient.element[1]} ` + firstTypeImmuned)
      console.log(`${move.element} : ${recipient.element[2]} ` + secondTypeImmuned)

      console.log(preventRedundantStealthRocks)
      console.log(preventRedundantStickyWeb)
      console.log(preventRedundantStatus)

      let difficulty
      if(enemyTrainerInfo != undefined) if(enemyTrainerInfo.difficulty != undefined) difficulty = enemyTrainerInfo.difficulty

      switch(difficulty){
        case null:
        case undefined:
          effectiveMovesArr.push(move)
          break
        case 'gym':
          if(
            !assaultVestInteraction &&
            !tauntInteraction &&
            !preventRedundantConfusion &&
            !preventRedundantSeeds &&
            !preventRedundantTaunt &&
            !preventRedundantReflect &&
            !preventRedundantLightScreen &&
            !preventRedundantTrickRoom &&
            !preventRedundantStealthRocks &&
            !preventRedundantStickyWeb &&
            !preventRedundantStatus &&
            !preventRedundantKnockOff &&

            !firstTypeNotEffective &&
            !secondTypeNotEffective &&
            !firstTypeImmuned && 
            !secondTypeImmuned
          ) effectiveMovesArr.push(move)
          break
        case 'optimalMove':
          if(
            !assaultVestInteraction &&
            !tauntInteraction &&
            !preventRedundantConfusion &&
            !preventRedundantSeeds &&
            !preventRedundantTaunt &&
            !preventRedundantReflect &&
            !preventRedundantLightScreen &&
            !preventRedundantTrickRoom &&
            !preventRedundantStealthRocks &&
            !preventRedundantStickyWeb &&
            !preventRedundantStatus &&
            !preventRedundantKnockOff &&

            !firstTypeNotEffective &&
            !secondTypeNotEffective &&
            !firstTypeImmuned && 
            !secondTypeImmuned &&
            firstTypeVeryEffective ||
            secondTypeVeryEffective
          ) effectiveMovesArr.push(move)
          break
      }
    })

    console.log(effectiveMovesArr)

    const newRNG = Math.floor(Math.random() * effectiveMovesArr.length)

    if(effectiveMovesArr.length == 0) move = this.moves[newRNG]
    else move = effectiveMovesArr[newRNG]

    if(!this.affliction[2].active){
      this.moves.forEach(arrMove =>{
        if(!terrainConditions.static.stealth_rock.active.ally) if(arrMove.name == 'stealth_rock') move = arrMove
        if(!terrainConditions.static.sticky_web.active.ally) if(arrMove.name == 'sticky_web') move = arrMove
        // console.log(arrMove)
      })
    }

    return move
  }

  completeHeal(){
    this.hp = this.stats.baseHp

    console.log(this.hp)

    this.status.name = null
    this.status.turns = 0

    this.affliction[0].active = false
    this.affliction[0].turns = 0

    this.affliction[1].active = false

    this.affliction[2].active = false
    this.affliction[2].turns = 0

    this.moves.forEach(move =>{
      move.pp = movesObj[move.name].pp
    })
  }
}

export class Character extends Sprite{
  constructor(
    team,
    bag,
    money,
    direction,
    trainerName,
    playerCharacter,
    {
      type, 
      position, 
      img, 
      frames,
      sprites, 
      animate,
      rotation
    },
  ){
    super({
      type, 
      position, 
      img, 
      frames, 
      sprites, 
      animate, 
      rotation
    })
    this.team = team
    if(bag != undefined) this.bag = bag
    if(money != undefined) this.money = money
    this.running = false
    this.surfing = false
    this.disabled = false
    this.assingDirection(direction)
    if(trainerName != null) this.name = trainerName
    if(playerCharacter != null) this.playerCharacter = playerCharacter
    if(type == 'player') {
      this.startTime = new Date()
      this.badges = {
        0: false,
        1: false,
        2: false,
      }
      this.pogedexInfo = this.createPogedexInfo()
    }
  }

  draw(){
    c.save()
    c.translate(
      this.position.x + this.width / 2, 
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2, 
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity
    c.drawImage(
      this.img,
      this.frames.val * this.width,
      this.spriteHeightFrame * this.height,
      this.img.width / this.frames.max,
      this.img.height / this.frames.max,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height / this.frames.max
    )
    c.restore()


    if(!this.animate){
      this.frames.val = 0 
      return
    }

    if(this.frames.max > 1) this.frames.elapsed++


    if (this.frames.elapsed % this.frames.hold === 0){
      if(this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }

  }

  dialogue(type, text){
    switch(type){
      case 'overworld':
        document.querySelector('#overworldDialogueContainer').style.display = 'grid'
        document.querySelector('#overworldDialogue').innerText = text
        break
      case 'battle':
        let dialogueInterfaceDom = document.querySelector('#dialogueInterface')
        let movesInterface = document.querySelector('#movesInterface')
    
        dialogueInterfaceDom.style.display = 'block'
        dialogueInterfaceDom.innerText = text

        document.querySelector('#proceedImgContainer').style.display = 'block'
    
        movesInterface.style.display = 'none'
        break
      case 'evolution':
        document.querySelector('#evolutionInterface').style.display = 'block'

        let evolutionDialogueDom = document.querySelector('#evolutionDialogue')
    
        evolutionDialogueDom.style.display = 'block'
        evolutionDialogueDom.innerText = text
        break
      case 'bag':
        document.querySelector('.bagSceneItemDialogueContainer').style.display = 'block'
        document.querySelector('.bagSceneItemDialogueContainer').innerText = text
        break
    }
  }

  assingDirection(direction){
    if(direction == undefined) this.direction = 1
    switch(direction){
      case 'Up':
        this.direction = 1
        this.spriteHeightFrame = 3
        break
      case 'Right':
        this.direction = 2
        this.spriteHeightFrame = 2
        break
      case 'Down':
        this.direction = 3
        this.spriteHeightFrame = 0
        break
      case 'Left':
        this.direction = 4
        this.spriteHeightFrame = 1
        break
    }
  }

  catch(pogemon, starter, currMap, player, ally, renderedSprites, ball, manageQueue, critLanded, backToOverWorld, queue, faintEvent, pc, queueFaintTrigger, queueProcess, terrainConditions, manageWeatherState, statusEvent, faster, slower, faintSwitch, enemyTrainerInfo){
    let newPogemon

    if(ball != undefined) this.dialogue('battle', `You throw a ${ball.name} at ${pogemon.switchUnderScoreForSpace(pogemon.nickname)}.`)

    const catchCalc = ball => {
      let pass = false

      let statusBonus = 1

      const rng = Math.floor(Math.random() * 100)
      const rate = Math.floor(((3 * pogemon.stats.baseHp - 2 * pogemon.hp) * pogemon.pogemon.catchRate * ball.pow / (3 * pogemon.stats.baseHp) * statusBonus))

      if(rng <= rate) pass = true

      return pass
    }
    
    const markAsCaught = () =>{
      this.pogedexInfo.forEach(dexPogemon =>{
        if(dexPogemon.name == pogemon.name) { 
          dexPogemon.caught = true 
          dexPogemon.seen = true
        }
      })
    }

    const catchEvent = ballSprite => {
      // rng <= rate
      if(catchCalc(ball)){
        pogemon.dialogue('battle', `${pogemon.switchUnderScoreForSpace(pogemon.nickname)} decided to become your companion! :D`)
        renderedSprites.splice(1,1)
        console.log('remove sprite')
        newPogemon.isEnemy = false

        setTimeout(() =>{
          queueProcess.disabled = false
          console.log('here')

          document.querySelector('#proceedImg').style.display = 'block'
        }, 1250)
        
        if(this.team.length < 6) this.team.push(newPogemon)
        else {
          for(let i = 0; i < pc.length; i++){
            for(let j = 0; j < pc[i].length; j++){
              if(pc[i][j] == null) pc[i][j] = newPogemon
              break
            }
          }
        }
        
        markAsCaught()
        manageQueue(true)
        backToOverWorld(pogemon)
      } else {
        pogemon.dialogue('battle', `${pogemon.switchUnderScoreForSpace(pogemon.nickname)} refused to get caught..`)
        ballSprite.animate = true
        gsap.to(ballSprite, {
          opacity: 0,
          duration: 1,
          onComplete: () =>{
            ballSprite.animate = false
            gsap.to(pogemon, {
              opacity: 1,
              onComplete: () =>{
                setTimeout(() =>{
                  queueProcess.disabled = false
                  console.log('here')
    
                  document.querySelector('#proceedImg').style.display = 'block'
                }, 250)
                queue.push(() =>{
                  let foeRNGMove = this.rerollEnemyMoveSoAppropriate(recipient, move, terrainConditions, enemyTrainerInfo)
                  console.log(foeRNGMove)

                  // let rng = Math.floor(Math.random() * 2)

                  // let faster = ally
                  // let slower = pogemon
                
                  // let allySpeed
                  // if(ally.status.name == 'para') allySpeed = Math.floor((ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd) / 2)
                  // else allySpeed = Math.floor(ally.stats.spd * statsChangeObj.ally.nominator.spd / statsChangeObj.ally.denominator.spd)
                
                  // let foeSpeed
                  // if(pogemon.status.name == 'para') foeSpeed = Math.floor((pogemon.stats.spd * statsChangeObj.pogemon.nominator.spd / statsChangeObj.pogemon.denominator.spd) / 2)
                  // else foeSpeed = Math.floor(pogemon.stats.spd * statsChangeObj.pogemon.nominator.spd / statsChangeObj.pogemon.denominator.spd)
                
                  // if(allySpeed == foeSpeed){
                  //   if(rng == 1) {
                  //     faster = pogemon
                  //     slower = ally
                  //   }
                  // } else if(allySpeed < foeSpeed){
                  //   faster = pogemon
                  //   slower = ally
                  // }
  
                  statusEvent(pogemon, foeRNGMove, ally, document.querySelector('#foeStatus'), true, faster, slower)
                  if(pogemon.status.name != 'para' || pogemon.status.name != 'slp' || !pogemon.affliction[0].active) 
                    pogemon.endOfTurnTerrainManagement(null, queue, terrainConditions, faintSwitch, queueProcess, manageWeatherState, faster, slower, enemyTrainerInfo, player)
  
                  // pogemon.move({move: foeRNGMove, recipient: inUse, renderedSprites, critHit: critLanded, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState, faintEvent})
                  // console.log('YAYA')
  
                  //move, recipient, renderedSprites, critHit, queue, queueProcess, terrainConditions, queueFaintTrigger, manageWeatherState
  
                  manageQueue(true)
                  if(ally.hp <= 0){
                    // pogemonInUse.faint(queueFaintTrigger)
                    faintEvent(ally)
                    console.log('faintEvent')
                    // put this in a queue
                    // check if they all fainted
                    // if(pogemonInUse.fainted) {
                    //   gsap.to('#overlapping', {
                    //     opacity: 1,
                    //     textContent: 'Git Gud'
                    //   })
                    // }
                  }
  
                  // add if pogemon.hp < 0 make it dye
                  // rn even if status ko's the pogemon were trying to catch it wont die
                })
              }
            })
          }
        })
      }
    }

    function ballAnimation(ballSprite){
      renderedSprites.splice(1, 0, ballSprite)
      console.log('remove sprite')
  
      TweenMax.to(ballSprite.position, {
        x: pogemon.position.x + pogemon.width / 3,
        y: pogemon.position.y + pogemon.height / 2,
        onComplete: () =>{
          ballSprite.animate = false
          TweenMax.to(pogemon, {
            opacity: 0,
            onComplete: () =>{
              TweenMax.to(ballSprite.position, {
                y: pogemon.position.y + 250,
                onComplete: () => {
                  TweenMax.to(ballSprite, {
                    rotation: '0.15',
                    onComplete: () => {
                      TweenMax.to(ballSprite, {
                        rotation: '-0.15',
                        onComplete: () => {
                          TweenMax.to(ballSprite, {
                            rotation: '0.15',
                            onComplete: () => {
                              TweenMax.to(ballSprite, {
                                rotation: '0',
                                onComplete: () =>{
                                  catchEvent(ballSprite)
                                  // queueProcess.disabled = false
                                  // console.log('here')
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }

    if(starter){
      const pogemonImg = new Image()
      const pogemonSprite = new Sprite({
        type: 'pogemon',
        img: pogemonImg,
        frames:{
          max: 4,
          hold: 60
        },
        animate: true
      })

      let shinyCharm = 0
      if(player != undefined) if(player.bag.get('illuminated_Gem') != null) shinyCharm = player.bag.get('illuminated_Gem').quantity

      //                                                              held item        ability              shiny ivs  moves gender nature              
      newPogemon = new Pogemon(pogemon, Math.pow(5, 3), false, currMap, null, pogemon.abilities[0].ability, null, null, null, null, null, shinyCharm, null, pogemonSprite)

      markAsCaught()
      this.team.push(newPogemon)
    } else {

      //working here
      //trying to make animation for pogeball
      newPogemon = pogemon 

      const ballImg = new Image()
      ballImg.src = ball.animation
      const ballSprite = new Sprite({
        type: 'catch',
        position: {
          x: 0,
          y: 0
        },
        img: ballImg,
        frames: {
          max: 4,
          hold: 50
        },
        animate: true,
      })

      ballAnimation(ballSprite)
    }
  }

  createPogedexInfo(){
    const pogedexArr = []

    Object.values(pogemonsObj).forEach(pogemon =>{
      pogedexArr.push({ name : pogemon.name, pogedexIndex : pogemon.pogedex, sprite : pogemon.sprites.classic.sprite, seen : false, caught : false })
    })

    return pogedexArr
  }
}