import { audioObj } from "./data/audioData.js"
import { movesObj } from "./data/movesData.js"
import { natureObj } from "./data/natureData.js"
import { pogemonsObj } from "./data/pogemonData.js"
import { typesObj } from "./data/typesData.js"

import { c, scenes } from "./scripts/canvas.js"
import { disableOWMenu } from "./scripts/scenes/overworld.js"

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
  }

  generateInfo(){
    const opacity = 0
    const opacity2 = 0.25
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
        this.color = `rgba(250,150,50,${opacity})`
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

export let Id = 1

export const statsChangeObj = {
  ally :{
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
  },
  foe:{
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
}

export class Pogemon extends Sprite{
  constructor(
    pogemon,
    exp,
    isEnemy,
    map,
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
    this.isEnemy = isEnemy
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
      this.nature = this.generateNature()
      this.gender = this.generateGender()
      this.ivs = this.generateIVs()
      this.stats = this.generateStats()
      this.isShiny = this.generateShiny()
      this.hp = this.stats.baseHp
      this.status = {name: null, turns: 0}
      this.affliction = []
      this.flinched = false
      this.fainted = false
      this.evo = this.pogemon.evo
      this.ability = this.generateAbility()
      this.moves = this.generateMoves(true, 'battle')
      this.animationProperties = pogemon.animationProperties
      this.heldItem = null
      this.friendliness = 0
      this.catchInfo = this.generateCatchInfo(new Date())
      this.caughtMap = map
    } else {
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
      this.ability = preBuilt.ability
      this.moves = preBuilt.moves
      this.pogemon.movepool = pogemonsObj[this.name].movepool
      this.animationProperties = preBuilt.animationProperties
      this.heldItem = preBuilt.heldItem
      this.friendliness = preBuilt.friendliness
      this.catchInfo = {
        date: new Date(preBuilt.catchInfo.date),
        lvl: preBuilt.catchInfo.lvl
      }
      this.caughtMap = preBuilt.caughtMap
      this.preBuilt = null
    }
  }

  generateId(){
    const currId = Id
    Id++
    return currId
  }

  generateNature(){
    const rng = Math.floor(Math.random() * Object.keys(natureObj).length)
    const name = Object.keys(natureObj)[rng]
    const values = natureObj[name]
    return {name, values}
  }

  generateGender(){
    //should add param that changes odds based on species
    let gender
    const rng = Math.floor(Math.random() * 100)
    if(rng < 50) gender = 'male'
    else gender = 'female'

    return gender
  }

  generateIVs(){
    const ivObj = {
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

  generateAbility(){
    let rng = Math.floor(Math.random() * Math.floor(Object.keys(this.pogemon.abilities).length)) + 1
    return this.pogemon.abilities[rng]
  }

  generateMoves = (init, type) => {
    let moves = []
    let movepool = this.pogemon.movepool

    if(type !== 'battle') return

    if(!init){
      moves = this.moves
    } else this.learntMoves = new Array()

    Object.keys(movepool).forEach(key =>{
      if(movepool[key].lvl <= this.lvl){
        if(!init){
          if(this.learntMoves.includes(movepool[key].move.name)) return

          moves.push({...movepool[key].move})
        } else {
          // isint an array when trying to push things to it
          if(this.learntMoves.includes(movepool[key].move.name)) return

          this.learntMoves.push(movepool[key].move.name)
          if(moves.length == 4) moves.splice(0, 1)
          moves.push({...movepool[key].move})
        }
      }
    })

    return moves
  }

  generateLevel(){
    return Math.floor(Math.cbrt(this.exp))
  }

  generateCatchInfo(date){
    const catchInfo = {
      lvl: this.lvl,
      date,
      caughtMap: this.caughtMap
    }
    
    return catchInfo
  }

  generateShiny(){
    const rng = Math.floor(Math.random() * 2)

    if(rng == 0) return true
    else return false
  }

  convertToPercentage(numerator , denominator){
    let percentage = 100 * numerator / denominator 

    if(numerator <= 0) percentage = 0

    return percentage
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
        document.querySelector('.bagSceneItemDialogueContainer').textContent = text
        break
    }
  }

  hpManagement(target, recipientHealthBar, hpDom){
    const hpToPercent = this.convertToPercentage(target.hp, target.stats.baseHp)

    gsap.to(recipientHealthBar, {
      width: `${hpToPercent}%`
    })

    let hpColor

    if(hpToPercent >= 50){
      hpColor = 'green'
    } else if(hpToPercent < 50 && hpToPercent >= 25){
      hpColor = 'yellow'
    } else if(hpToPercent < 25 && hpToPercent > 0){
      hpColor = 'red'
    } else if(hpToPercent <= 0){
      hpColor = 'black'
    } 

    if(target.hp >= 0) hpDom.textContent = `${target.hp}/${target.stats.baseHp}`
    else hpDom.textContent = `0/${target.stats.baseHp}`

    document.querySelector(recipientHealthBar).style.backgroundColor = hpColor
  }

  managePP(move, pressure){
    let movePP
    for(let i = 0; i < this.moves.length; i++){
      if(this.moves[i].name === move.name){
        movePP = this.moves[i].pp
        if(pressure) movePP = movePP - 2
        else if(movePP > 0) movePP--

        this.moves[i].pp = movePP
      }
    }
  }

  //doesnt make anything move, its the method to use moves during combat
  move({move, recipient, renderedSprites, critHit, queue, queueProcess, terrainConditions, queueFaintTrigger}){
    if(this.hp <= 0) return

    let immuned = false

    this.managePP(move, false)

    this.dialogue('battle', `${this.name} used ${move.name}!`)

    if(move.pp == 0) move = movesObj['struggle']

    let userHealthBar = '#allyHealthBar'
    let userStatus = document.querySelector('#allyStatus')
    let userHpDom = document.querySelector('#allyHp')

    let recipientHealthBar = '#foeHealthBar'
    let recipientStatus = document.querySelector('#foeStatus')
    let hpDom = document.querySelector('#foeHp')

    let userStatsChangeContainer = 'allyStatusEffectContainer' 
    let recipientStatsChangeContainer = 'foeStatusEffectContainer'

    let movementDistance = 20

    let rotation
    if(movesObj[move.name].rotation != undefined) rotation = movesObj[move.name].rotation.ally

    let duration
    if(movesObj[move.name].duration != undefined) duration = movesObj[move.name].duration
    
    let launcPos = this.pogemon.animationPositions.ally.launch
    let receivePos = recipient.pogemon.animationPositions.foe.receive

    if(this.isEnemy){
      userHealthBar = '#foeHealthBar'
      userStatus = document.querySelector('#foeStatus')
      userHpDom = document.querySelector('#foeHp')

      recipientHealthBar = '#allyHealthBar'
      recipientStatus = document.querySelector('#allyStatus')
      hpDom = document.querySelector('#allyHp')

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

      const rollRatio = {
        max: 110,
        min: 90
      }
      const roll = Math.floor(Math.random() * (rollRatio.max - rollRatio.min) + rollRatio.min) * 0.01

      let stab = 1
      if(move.element === this.element[1] || move.element === this.element[2]) stab = 1.5

      let typeEffectivness = 1

      let allyStatChange

      let foeStatChange

      let burn = 1
      let frozen = 1

      if(this.status.name == 'burn') burn = 0.5
      if(this.status.name == 'frz') frozen = 0.5
      
      for(let i = 0; i < 2; i++){
        if(Object.values(recipient.element)[i] == null) break
        
        let factor

        if(typeEffectivness >= 1) {
          factor = 0.5
        } else {
          factor = 0.25
        }

        if(Object.values(typesObj[`${move.element}`])[0].includes(`${Object.values(recipient.element)[i]}`)) typeEffectivness = typeEffectivness + factor
        if(Object.values(typesObj[`${move.element}`])[1].includes(`${Object.values(recipient.element)[i]}`)) typeEffectivness = typeEffectivness - factor
        if(Object.values(typesObj[`${move.element}`])[2].includes(`${Object.values(recipient.element)[i]}`)) typeEffectivness = 0
      }

      let crit = 1
      if(typeEffectivness != 0) if(critHit(this, recipient)) crit = 1.5

      switch(typeEffectivness){
        case 0:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It didint affect ${recipient.name} whatsoever...`)
          immuned = true
          break
        case 0.25:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It was not effective at all...`)
          break
        case 0.5:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It was not very effective...`)
          break
        case 1:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}!`)
          break
        case 1.5:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It was very effective!`)
          break
        case 2:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It was super effective!!`)
          break
      }

      let damage

      if(move.type === 'physical'){
        if(typeEffectivness !== 0){
          allyStatChange = statsChangeObj[userId].nominator.atk / statsChangeObj[userId].denominator.atk
          foeStatChange = statsChangeObj[foeId].nominator.def / statsChangeObj[foeId].denominator.def
          
          damage = Math.ceil((((2 * this.lvl / 5 + 2) * move.pow * (this.stats.atk * allyStatChange) / (recipient.stats.def * foeStatChange) / 50 + 2) * burn) * roll * typeEffectivness * stab * crit)
          // console.log(Math.ceil((((2 * this.lvl / 5 + 2) * move.pow * (this.stats.atk * allyStatChange) / (recipient.stats.def * foeStatChange) / 50 + 2) * burn) * roll * typeEffectivness * stab * crit))
        }
      } else if(move.type === 'special'){
        if(typeEffectivness !== 0){
          allyStatChange = statsChangeObj[userId].nominator.spatk / statsChangeObj[userId].denominator.spatk
          foeStatChange = statsChangeObj[foeId].nominator.spdef / statsChangeObj[foeId].denominator.spdef

          damage = Math.ceil((((2 * this.lvl / 5 + 2) * move.pow * (this.stats.spatk * allyStatChange) / (recipient.stats.spdef * foeStatChange) / 50 + 2) * frozen) * roll * typeEffectivness * stab * crit)
          // console.log(Math.ceil((((2 * this.lvl / 5 + 2) * move.pow * (this.stats.spatk * allyStatChange) / (recipient.stats.spdef * foeStatChange) / 50 + 2) * frozen) * roll * typeEffectivness * stab * crit))
        }
      }

      if(recipient.protected.active){
        queue.push(() => this.dialogue('battle', `${recipient.name} protected itself.`))
      } else if(recipient.subHp > 0){
        this.dialogue('battle', `${recipient.name}'s substitute took damage.`)
        recipient.subHp -= damage
        if(recipient.subHp <= 0){
          queueProcess.disabled = true
          queue.push(() => this.dialogue('battle', `${recipient.name}'s substitute was destroyed.`))
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
          
          gsap.to(recipientSub.position, {
            y: recipientSub.position.y + 15
          })

          gsap.to(recipientSub, {
            opacity: 0,
            onComplete: () =>{
              recipient.subHp = 0
              renderedSprites.splice(recipientSubIndex, 1)
              setTimeout(() =>{
                queueProcess.disabled = false
              }, 500)
            }
          })

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
      
      if(recipient.hp < 0) recipient.hp = 0
    }

    // this and statusRng are very similar in purpous, maybe should fuse them
    let statusCalculation = () =>{
        move.effects.forEach((effect, i) => {
          if(i == 0){

            if(effect.name == 'buff'){
              if(!this.isEnemy){

                if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                else if(statsChangeObj.ally.nominator[effect.target] < 8) statsChangeObj.ally.nominator[effect.target] += effect.pow
                else {
                  statsChangeObj.ally.nominator[effect.target] = 8
                  queue.push(() => this.dialogue('battle', `${this.name}'s ${effect.target} won't go up any further.`))
                  return
                }
              } else {
    
                if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                else if(statsChangeObj.foe.nominator[effect.target] < 8) statsChangeObj.foe.nominator[effect.target] += effect.pow
                else {
                  statsChangeObj.foe.nominator[effect.target] = 8
                  this.dialogue('battle', `${this.name}'s ${effect.target} won't go up any further.`)
                  return
                }
              }
            } else if(effect.name == 'recipientbuff'){
              if(!this.isEnemy){
                //this is ally
                if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                else if(statsChangeObj.foe.nominator[effect.target] < 8) statsChangeObj.foe.nominator[effect.target] += effect.pow
                else {
                  statsChangeObj.foe.nominator[effect.target] = 8
                  this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                  return
                }
              } else {
                //this is foe
                if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                else if(statsChangeObj.ally.nominator[effect.target] < 8) statsChangeObj.ally.nominator[effect.target] += effect.pow
                else {
                  this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                  return
                }
              }
            } else if(effect.name == 'debuff') {
              if(!this.isEnemy){
                if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                else if(statsChangeObj.foe.denominator[effect.target] < 8) statsChangeObj.foe.denominator[effect.target] += effect.pow
                else {
                  this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                  return
                }
              } else {
                if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                else if(statsChangeObj.ally.denominator[effect.target] < 8) statsChangeObj.ally.denominator[effect.target] += effect.pow
                else {
                  this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                  return
                }
              }
            } else if(effect.name == 'selfDebuff'){
              if(!this.isEnemy){
                if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                else if(statsChangeObj.ally.denominator[effect.target] < 8) statsChangeObj.ally.denominator[effect.target] += effect.pow
                else {
                  this.dialogue('battle', `${this.name}'s ${effect.target} won't go down any further.`)
                  return
                }
              } else {
                if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                else if(statsChangeObj.foe.denominator[effect.target] < 8) statsChangeObj.foe.denominator[effect.target] += effect.pow
                else {
                  this.dialogue('battle', `${this.name}'s ${effect.target} won't go down any further.`)
                  return
                }
              }
            } else if(Object.keys(Object.values(move.effects)[0])[0] == 'heal'){
              this.hp = Math.floor(this.hp + this.stats.baseHp * ( Object.values(Object.values(move.effects)[0])[0] / 100 ))
              if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
      
              this.hpManagement(this, userHealthBar, userHpDom)
              this.dialogue('battle', `${this.name} used ${move.name}.`)
            } else {
              document.querySelector('#movesInterface').style.display = 'none'
              if(move.type != 'status') return
              this.dialogue('battle', `${this.name} used ${move.name}.`)
              if(recipient.subHp > 0) {
                switch(move.name){
                  case 'protect':
                  case 'substitute':
                  case 'trickroom':
                  case 'heal':
                  case 'growl':
                  case 'sharpen':
                  case 'swift':
                  case 'stare':
                    queueProcess.disabled = false
                    return
                }
    
                queue.push(() => {
                  this.dialogue('battle', `${recipient.name} was protected by its substitute.`)
                  queueProcess.disabled = false
                })
              } else {
                queueProcess.disabled = false
              }
            }
          } else {
            queue.push(() =>{

              if(effect.name == 'buff'){
                if(!this.isEnemy){
                  if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= 1
                  else statsChangeObj.ally.nominator[effect.target] += 1
      
                  if(statsChangeObj.ally.nominator[effect.target] > 8) {
                    this.dialogue('battle', `${this.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
                } else {
      
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.nominator[effect.target] += effect.pow
      
                  if(statsChangeObj.foe.nominator[effect.target] > 8) {
                    this.dialogue('battle', `${this.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
                }
                // queue.splice(0,1)[0]()
              } else if(effect.name == 'recipientbuff'){
                if(!this.isEnemy){
                  //this is ally
                  if(statsChangeObj.foe.denominator[effect.target] > 2) statsChangeObj.foe.denominator[effect.target] -= 1
                  else statsChangeObj.foe.nominator[effect.target] += 1
      
                  if(statsChangeObj.foe.nominator[effect.target] > 8) {
                    this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
                } else {
                  //this is foe
                  if(statsChangeObj.ally.denominator[effect.target] > 2) statsChangeObj.ally.denominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.nominator[effect.target] += effect.pow
      
                  if(statsChangeObj.ally.nominator[effect.target] > 8) {
                    this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go up any further.`)
                    return
                  }
                }
                // queue.splice(0,1)[0]()
              } else if(effect.name == 'debuff') {
                if(!this.isEnemy){
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.denominator[effect.target] += effect.pow
      
                  if(statsChangeObj.foe.denominator[effect.target] > 8) {
                    this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
                } else {
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.denominator[effect.target] += effect.pow
                  
                  if(statsChangeObj.ally.denominator[effect.target] > 8) {
                    this.dialogue('battle', `${recipient.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
                }
                // queue.splice(0,1)[0]()
              } else if(effect.name == 'selfDebuff'){
                if(!this.isEnemy){
                  if(statsChangeObj.ally.nominator[effect.target] > 2) statsChangeObj.ally.nominator[effect.target] -= effect.pow
                  else statsChangeObj.ally.denominator[effect.target] += effect.pow
      
                  if(statsChangeObj.ally.denominator[effect.target] > 8) {
                    this.dialogue('battle', `${this.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
                } else {
                  if(statsChangeObj.foe.nominator[effect.target] > 2) statsChangeObj.foe.nominator[effect.target] -= effect.pow
                  else statsChangeObj.foe.denominator[effect.target] += effect.pow
                  
                  if(statsChangeObj.foe.denominator[effect.target] > 8) {
                    this.dialogue('battle', `${this.name}'s ${effect.target} won't go down any further.`)
                    return
                  }
                }
                // queue.splice(0,1)[0]()
              } else if(Object.keys(Object.values(move.effects)[0])[0] == 'heal'){
                this.hp = Math.floor(this.hp + this.stats.baseHp * ( Object.values(Object.values(move.effects)[0])[0] / 100 ))
                if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
        
                this.hpManagement(this, userHealthBar, userHpDom)
                this.dialogue('battle', `${this.name} used ${move.name}.`)
              } else {
                document.querySelector('#movesInterface').style.display = 'none'
                this.dialogue('battle', `${this.name} used ${move.name}.`)
                if(recipient.subHp > 0) {
                  switch(move.name){
                    case 'protect':
                    case 'substitute':
                    case 'trickroom':
                    case 'heal':
                    case 'growl':
                    case 'sharpen':
                    case 'swift':
                    case 'stare':
                      return
                  }
      
                queue.push(() => this.dialogue('battle', `${recipient.name} was protected by its substitute.`))
                }
              }
            })
          }
        })
        return
    }

    let isSubActive = false

    if(recipient.subHp > 0) isSubActive = true

    let statusAnimation = (type, effect) =>{
      if(this.fainted) return
      queueProcess.disabled = true

      const statusImg = new Image()
      statusImg.src = move.sprite

      const statusSprite = new Sprite({
        type: 'attack',
        position: {
          x: this.position.x + launcPos.x,
          y: this.position.y + launcPos.y
        },
        img: statusImg,
        frames: {
          max: 4,
          hold: 50
        },
        animate: true,
        rotation
      })

      // console.log(type)
      // console.log(effect)

      let chooseAnimation = (type, effect, move, i) =>{
        if(type == 'heal'){
          renderedSprites.push(statusSprite)
  
          gsap.to(statusSprite.position, {
            x: this.position.x + ( this.width / 4.5 ),
            y: -10,
            duration: 1,
            onComplete: () =>{
              queueProcess.disabled = false
              renderedSprites.pop()
            }
          })
        } else if (type == 'stats') {
          let timer = 0
          let posX = 0
          let posY = 0

          if(move.type == 'status'){
            timer = 1000
            if(move.position != undefined){
              posX = move.position.x
              posY = move.position.y
            }
            const statsAnimationImage = new Image()
            statsAnimationImage.src = move.sprite
            const statsAnimationSprite = new Sprite({
              type: 'moveSprite',
              position: {
                x: this.position.x + posX,
                y: this.position.y + posY
              },
              img: statsAnimationImage,
              frames:{
                max: 4,
                hold: 50
              },
              animate: true
            })
            renderedSprites.splice(2,0,statsAnimationSprite)
          }
          
          setTimeout(() =>{
            if(move.type == 'status') renderedSprites.splice(2,1)

            queue.push(() =>{
              if(document.querySelector('#scene').childNodes.length > 3) document.querySelector('#scene').removeChild(document.querySelector('#scene').childNodes[document.querySelector('#scene').childNodes.length - 1])

              const buffDiv = document.createElement('div')

              document.querySelector('#scene').appendChild(buffDiv)

              if(effect.name == 'buff'){
                if(this.fainted) return
                if(!this.isEnemy){
                  if(statsChangeObj.ally.nominator[effect.target] > 8) {
                    statsChangeObj.ally.nominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // ally buff
                  this.dialogue('battle', `${this.name} used ${move.name}! \n\n It increased it's ${effect.target} by ${effect.pow} tier.`)

                  buffDiv.setAttribute('class', `${effect.name}Div ${userStatsChangeContainer}`)
                  buffDiv.style.top = -275
                
                  gsap.to(buffDiv, {
                    top: -525,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                } else {
  
                  if(statsChangeObj.foe.nominator[effect.target] > 8) {
                    statsChangeObj.foe.nominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // foe buff
                  buffDiv.setAttribute('class', `${effect.name}Div ${userStatsChangeContainer}`)
                  buffDiv.style.top = -500
                
                  gsap.to(buffDiv, {
                    top: -700,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                }
              } else if(effect.name == 'recipientBuff'){
                // recipientBuff
                if(recipient.fainted) return
                if(!this.isEnemy){
                  if(statsChangeObj.foe.denominator[effect.target] > 8) {
                    statsChangeObj.foe.denominator[effect.target] = 8
                    queueProcess.disabled = false
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
                    }
                  }) 
                } else {
                  if(statsChangeObj.ally.denominator[effect.target] > 8) {
                    statsChangeObj.ally.denominator[effect.target] = 8
                    queueProcess.disabled = false
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
                    }
                  }) 
                }
              } else if(effect.name == 'debuff'){
                // debuff
                if(recipient.fainted) return
                if(!this.isEnemy){
                  if(statsChangeObj.foe.denominator[effect.target] > 8) {
                    statsChangeObj.foe.denominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // ally debuff
                  buffDiv.setAttribute('class', `${effect.name}Div ${recipientStatsChangeContainer}`)
                  buffDiv.style.top = -800
                
                  gsap.to(buffDiv, {
                    top: -600,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                } else {
                  if(statsChangeObj.ally.denominator[effect.target] > 8) {
                    statsChangeObj.ally.denominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // foe debuff
                  buffDiv.setAttribute('class', `${effect.name}Div ${recipientStatsChangeContainer}`)
                  buffDiv.style.top = -800
                
                  gsap.to(buffDiv, {
                    top: -600,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                }
              } else if(effect.name == 'selfDebuff'){
                if(this.fainted) return
                if(!this.isEnemy){
                  this.dialogue('battle', `${this.name} used ${move.name}! \n\n It decreased it's ${effect.target} by ${effect.pow} tier.`)
  
                  if(statsChangeObj.ally.nominator[effect.target] > 8) {
                    statsChangeObj.ally.nominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // ally buff
                  buffDiv.setAttribute('class', `debuffDiv ${userStatsChangeContainer}`)
                  buffDiv.style.top = -700
                
                  gsap.to(buffDiv, {
                    top: -500,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                } else {
                  this.dialogue('battle', `${this.name} used ${move.name}! \n\n It decreased it's ${effect.target} by ${effect.pow} tier.`)
  
                  if(statsChangeObj.foe.nominator[effect.target] > 8) {
                    statsChangeObj.foe.nominator[effect.target] = 8
                    queueProcess.disabled = false
                    return
                  }
                
                  // foe buff
                  buffDiv.setAttribute('class', `debuffDiv ${userStatsChangeContainer}`)
                  buffDiv.style.top = -800
                
                  gsap.to(buffDiv, {
                    top: -600,
                    duration: 0.5,
                    onComplete: () =>{
                      document.querySelector('#scene').removeChild(buffDiv)
                      queueProcess.disabled = false
                    }
                  }) 
                }
              }
            })

            queue.splice(0,2).forEach(func =>{
              queue.push(func)
            })
            
            if(i == Object.values(move.effects).length - 1){
              if(Object.values(move.effects).length > 1) {
                // queue.splice(1,1)[0]()
              }
              
              queue.push(queue.splice(0,1)[0])

              if(this.fainted || recipient.fainted) queueFaintTrigger.initiated = true
            }

            setTimeout(() =>{
              queueProcess.disabled = false
            }, 500)
          }, timer)
        } else if (type == 'status') {
          switch(move.name) {
            case 'heatwave':
            case 'hypnosis':
            case 'frostwave':
            case 'trickroom':

              const color = typesObj[move.element].color
  
              const tl1 = gsap.timeline()
              const tl2 = gsap.timeline()
  
              if(effect == 'trickroom'){
                const fieldEffect = document.querySelector('#fieldEffect')
  
                const fieldEffectContent = document.createElement('div')
                fieldEffectContent.id = 'trickroom'
  
                for(let i = 0; i < 15; i++){
                  const trickRoomCells = document.createElement('div')
                  trickRoomCells.id = 'trickroomCells'
  
                  fieldEffectContent.appendChild(trickRoomCells)
                }
  
                fieldEffect.appendChild(fieldEffectContent)

                tl1.to(fieldEffect, {
                  opacity: 0,
                }).to(fieldEffect, {
                  opacity: 50,
                  duration: 0.5
                }).to(fieldEffect, {
                  opacity: 0,
                  duration: 0.01,
                  onComplete: () =>{
                    fieldEffect.replaceChildren()
                    terrainConditions.trickroom.active = true
                    terrainConditions.trickroom.turns = 5
                    queueProcess.disabled = false
                  }
                })
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
                  queueProcess.disabled = false
                }
              })
              break
            case 'thunderwave':
              if(this.isEnemy){
                statusSprite.position = {
                  x: recipient.position.x + recipient.width / 4,
                  y: recipient.position.y + recipient.height / 0.75
                }
              } else {
                statusSprite.position = {
                  x: recipient.position.x + recipient.width - 375,
                  y: recipient.position.y + recipient.height - 75
                }
              }
  
              statusSprite.frames.hold = 60
              renderedSprites.push(statusSprite)
  
              setTimeout(() =>{
                queueProcess.disabled = false
                statusSprite.frames.hold = 10
                renderedSprites.pop()
              }, 1000)
              break
            case 'fart':
              if(this.isEnemy){
                statusSprite.position = {
                  x: recipient.position.x + recipient.width / 4,
                  y: recipient.position.y + recipient.height / 0.75
                }
              } else {
                statusSprite.position = {
                  x: recipient.position.x + recipient.width - 375,
                  y: recipient.position.y + recipient.height - 75
                }
              }
  
              statusSprite.frames.hold = 60
              renderedSprites.push(statusSprite)
  
              setTimeout(() =>{
                queueProcess.disabled = false
                statusSprite.frames.hold = 10
                renderedSprites.pop()
              }, 1000)
              break
            case 'confuseray':
              if(this.isEnemy){
                statusSprite.position = {
                  x: recipient.position.x + recipient.width / 4,
                  y: recipient.position.y + recipient.height / 0.75
                }
              } else {
                statusSprite.position = {
                  x: recipient.position.x + recipient.width - 375,
                  y: recipient.position.y + recipient.height - 75
                }
              }
  
              statusSprite.frames.hold = 60
              renderedSprites.push(statusSprite)
  
              setTimeout(() =>{
                queueProcess.disabled = false
                statusSprite.frames.hold = 10
                renderedSprites.pop()
              }, 1000)
              break
            case 'leechseed':
              //change all this later
              if(this.isEnemy){
                statusSprite.position = {
                  x: recipient.position.x + recipient.width / 4,
                  y: recipient.position.y + recipient.height / 0.75
                }
              } else {
                statusSprite.position = {
                  x: recipient.position.x + recipient.width - 375,
                  y: recipient.position.y + recipient.height - 75
                }
              }
  
              statusSprite.frames.hold = 60
              renderedSprites.push(statusSprite)
  
              setTimeout(() =>{
                queueProcess.disabled = false
                statusSprite.frames.hold = 10
                renderedSprites.pop()
              }, 1000)
              break
            case 'substitute':
              let subHealth = Math.floor(this.stats.baseHp * 0.25)
  
              if(this.hp - subHealth <= 0){
                this.dialogue('battle', `Since ${this.name} is so weak, it failed to make a substitute..`)
                queueProcess.disabled = false
                return
              }
  
              if(this.subHp > 0){
                this.dialogue('battle', `${this.name} already has a substitute protecting it..`)
                queueProcess.disabled = false
                return
              }
  
              this.opacity = 0.5
  
              let recipientHealthBar
              let recipientHp
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
  
                recipientHealthBar = '#foeHealthBar'
                recipientHp = document.querySelector('#foeHp')
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
  
                recipientHealthBar = '#allyHealthBar'
                recipientHp = document.querySelector('#allyHp')
              }
  
              this.hp -= subHealth
              this.hpManagement(this, recipientHealthBar, recipientHp)
              this.subHp = subHealth
  
              renderedSprites.splice(1, 0, substituteSprite)
            
              queueProcess.disabled = false
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
                queueProcess.disabled = true
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
                        })
                        queueProcess.disabled = false
                      }
                    })
                  }
                })
              }
  
              if(recipient.protected.active == true || rng > move.effects.protect / this.protected.turns){
                this.dialogue('battle', `${this.name} failed to protect itself..`)
                this.protected.turns = 0
                this.protected.active = false
                queueProcess.disabled = false
                return
              }
  
              protectAnimation()
              this.protected.turns++
              this.protected.active = true
              break
          }
        }
      }

      if(type != 'array') chooseAnimation(type, effect[0], move, 0)
      else effect.forEach((effect, i) => chooseAnimation(effect.type, effect, move, i))
    }

    if(move.type == 'status') {
      // statusAnimation(move.type, move.effects)
      // console.log('hehe')
      if(immuned) return
      statusCalculation()
    }
    else damageCalculation()

    let statusRNG = () =>{
      if(recipient.hp <= 0) return
      if(isSubActive) return
      if(recipient.protected.active == true) return
      // work here
      let rng = Math.floor(Math.random() * 100)

      let applyAffliction = type =>{
        if(this.hp <= 0) return
        let flag = true
        if(rng <= Object.values(move.effects)[0][type]){
          switch(type){
            case 'flinched':
                if(recipient.element[0] == 'rock' || recipient.element[1] == 'rock') return
                if(recipient.element[0] == 'steel' || recipient.element[1] == 'steel') return
          
                recipient.flinched = true
              break
            case 'confusion':
              if(recipient.element[0] == 'psychic' || recipient.element[1] == 'psychic') {
                this.dialogue('battle', `${this.name} cannot be confused...`)
                return
              } else if(recipient.element[0] == 'ghost' || recipient.element[1] == 'ghost'){
                this.dialogue('battle', `${this.name} cannot be confused...`)
                return
              }

              if(recipient.affliction.length > 0){
                for(let i = 0; i < recipient.affliction.length; i++){
                  if(recipient.affliction[i].name == 'confusion') {
                    queue.push(() => this.dialogue('battle', `${recipient.name} is already confused....`))
                    flag = false
                  }
                }
              }

              if(flag){
                queue.push(() => this.dialogue('battle', `${recipient.name} got confused.`))
                recipient.affliction.unshift({name: 'confusion', turns: Math.floor((Math.random() * 3) + 1)})
              }
              break
            case 'seeded':
              if(recipient.element[0] == 'grass' || recipient.element[1] == 'grass'){
                this.dialogue('battle', `${this.name} cannot be seeded...`)
                return
              }

              if(recipient.affliction.length > 0){
                for(let i = 0; i < recipient.affliction.length; i++){
                  if(recipient.affliction[i].name == 'seeded') {
                    queue.push(() => this.dialogue('battle', `${recipient.name} is already seeded....`))
                    flag = false
                  }
                }
              }

              if(flag){
                queue.push(() => this.dialogue('battle', `${recipient.name} got seeded.`))
                recipient.affliction.unshift({name: 'seeded', turns: 0})
              }
              break
          }
        } 
      }

      if(recipient.status.name != null) {
        if(move.effects == undefined) return
        applyAffliction(Object.keys(Object.values(move.effects)[0])[0])
        if(Object.keys(Object.values(move.effects)[0])[0] == 'confusion' || Object.keys(Object.values(move.effects)[0])[0] == 'seeded' ) return
        if(move.effects.type == 'status') if(move.name != 'trickroom') queue.push(() => this.dialogue('battle', `${recipient.name} already has a status affliction.`))
        return
      }

      if(move.effects != null){
        let statusOdd = Object.values(Object.values(move.effects)[0])[0]
        applyAffliction(Object.keys(Object.values(move.effects)[0])[0])
        if(rng <= statusOdd){
          switch(Object.keys(Object.values(move.effects)[0])[0]){
            case 'burn':
              if(recipient.element[0] == 'fire' || recipient.element[1] == 'fire'){
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot get burnt...`))
                return
              } else if(recipient.element[0] == 'water' || recipient.element[1] == 'water'){
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot get burnt...`))
                return
              }

              recipient.status.name = 'burn'
              queue.push(() =>{
                recipient.statusEffectAnimation('burn', renderedSprites, queueProcess)
                this.dialogue('battle', `${recipient.name} was burnt!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/burn.png'
              })
              break
            case 'para':
              if(recipient.element[0] == 'electric' || recipient.element[1] == 'electric') {
                queue.push(() => this.dialogue('battle', `${this.name} cannot be paralyzed...`))
                return
              }

              recipient.status.name = 'para'
              queue.push(() =>{
                recipient.statusEffectAnimation('para', renderedSprites, queueProcess)
                this.dialogue('battle', `${recipient.name} was paralyzed!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/para.png'
              })
              break
            case 'psn':
              if(recipient.element[0] == 'poison' || recipient.element[1] == 'poison') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be poisoned..`))
                return
              } else if(recipient.element[0] == 'steel' || recipient.element[1] == 'steel') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be poisoned..`))
                return
              }

              recipient.status.name = 'psn'
              queue.push(() =>{
                recipient.statusEffectAnimation('psn', renderedSprites, queueProcess)
                this.dialogue('battle', `${recipient.name} was poisoned!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/psn.png'
              })
              break
            case 'slp':
              if(recipient.element[0] == 'psychic' || recipient.element[1] == 'psychic') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be forced to sleep...`))
                return
              } else if(recipient.element[0] == 'ghost' || recipient.element[1] == 'ghost') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be forced to sleep...`))
                return
              }

              recipient.status.name = 'slp'
              queue.push(() =>{
                recipient.statusEffectAnimation('slp', renderedSprites, queueProcess)
                this.dialogue('battle', `${recipient.name} fell asleep!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/slp.png'
              })
              break
            case 'frz':
              if(recipient.element[0] == 'ice' || recipient.element[1] == 'ice') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be frozen...`))
                return
              } else if(recipient.element[0] == 'fire' || recipient.element[1] == 'fire') {
                queue.push(() => this.dialogue('battle', `${recipient.name} cannot be frozen...`))
                return
              }

              recipient.status.name = 'frz'
              queue.push(() =>{
                recipient.statusEffectAnimation('frz', renderedSprites, queueProcess)
                this.dialogue('battle', `${recipient.name} was frozen!`)
                recipientStatus.style.display = 'block'
                recipientStatus.src = 'img/status/frz.png'
              })
              break
          }
        }
      }
    }

    statusRNG()

    console.log('hehehehe')
    
    if(recipient.protected.active && recipient.protected.turns == 0) recipient.protected.turns = 1

    if(move.name != 'fireball') rotation = 0

    let hitAnimation = type => {
      queueProcess.disabled = true

      if(type){
        const hitImg = new Image()
        hitImg.src = move.sprite

        const hitSprite = new Sprite({
          type: 'move',
          position: {
            x: recipient.position.x,
            y: recipient.position.y
          },
          img: hitImg,
          frames: {
            max: 4,
            hold: 50
          },
          animate: true,
          rotation
        })

        renderedSprites.splice(1, 0, hitSprite)
      }

      const tl = gsap.timeline()
      tl.to(this.position, {
        x: this.position.x - movementDistance
      }).to(this.position, {
        x: this.position.x + movementDistance * 2,
        duration: 0.1,
        onComplete: () =>{

          audioObj.SFX.tackleHit.play()

          this.hpManagement(recipient, recipientHealthBar, hpDom)
  
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
              queueProcess.disabled = false
              if(type) renderedSprites.splice(1,1)
            }
          })
        }
      }).to(this.position, {
        x: this.position.x
      })
    }
    
    let projectileAnimation = () => {
      queueProcess.disabled = true
      
      if(move.name != 'fireball') rotation = 0
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

      move.initAudio.play()

      gsap.to(projectileSprite.position, {
        x: recipient.position.x - receivePos.x,
        y: recipient.position.y - receivePos.y,
        duration,
        onComplete: () =>{

          renderedSprites.splice(1,1)

          move.hitAudio.play()

          this.hpManagement(recipient, recipientHealthBar, hpDom)
    
          queueProcess.disabled = false

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

    // should find a way to manage moves better or this will become a cluster fuck very quickly
    switch(move.name){
    //physical

    //normal
      case 'tackle': 
      case 'quickattack':
      case 'headbutt':
      case 'struggle':
        //should put struggle apart
        hitAnimation(false)
        break
      case 'slash':
      case 'superpower':
        hitAnimation(true)
        break

    // special

      // fire
      case 'fireball':
      // ghost
      case 'shadowball':
        projectileAnimation()
        break
      
    // status

      // heal
      case 'heal':
        statusAnimation('heal')
        break
      
      // boost
      case 'sharpen':
      case 'swift':
      // debuff
      case 'growl':
      case 'stare':
        statusAnimation('stats', move.effects)
        break

    // status effect

      // normal
      case 'substitute':
      case 'protect':

      // grass
      case 'leechseed':

      // water

      // fire
      case 'heatwave':
      
      // electric
      case 'thunderwave':
      
      // poison
      case 'fart':

      // ice
      case 'frostwave':

      //psychic
      case 'hypnosis':
      case 'confuseray':
      case 'trickroom':
        // should change to statusAnimation manye
        statusAnimation('status', move.effects)
        break  
    }
    if(move.type == 'physical' || move.type == 'special') if(move.effects != null) {
      queue.push(() => {
        if(immuned) return
        statusAnimation('array', move.effects)
        statusCalculation()
      })
      queue.pop()()
    }
  }

 statusEffectAnimation(type, renderedSprites, queueProcess){
    queueProcess.disabled = true

    let rotation = 45
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
        tl.to(statusEffectSprite.position, {
          x: statusEffectSprite.position.x + xTravel,
          onComplete: () =>{
            queueProcess.disabled = false
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
            x: this.position.x + this.width / 4.5,
            y: this.position.y + this.height / 1
          }
        } else {
          statusEffectSprite.position = {
            x: this.position.x + this.width / 2.5,
            y: this.position.y + this.height / 0.65
          }
        }

        tl.to(statusEffectSprite.position, {
          duration: 1,
          onComplete: () =>{
            queueProcess.disabled = false
            renderedSprites.pop()
          }
        })

        break
      case 'psn':
        statusEffectImg.src = 'img/moves/psn.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 15
        statusEffectSprite.rotation = 0

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
            renderedSprites.pop()
          }
        })

        break
      case 'slp':
        statusEffectImg.src = 'img/moves/slp.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60
        statusEffectSprite.rotation = 0

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
            renderedSprites.pop()
          }
        })
        break
      case 'frz':
        statusEffectImg.src = 'img/moves/frz.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 15
        statusEffectSprite.rotation = 0
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
            renderedSprites.pop()
          }
        })
        break
      case 'confusion':
        statusEffectImg.src = 'img/moves/confusion.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60
        statusEffectSprite.rotation = 0

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
            renderedSprites.pop()
          }
        })
        break
      case 'seeded':
        statusEffectImg.src = 'img/moves/seed.png'
        renderedSprites.push(statusEffectSprite)
        statusEffectSprite.frames.hold = 60
        statusEffectSprite.rotation = 0

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
            renderedSprites.pop()
          }
        })
        break
    }
  }

  // should pass foe instead of slower
  checkStatus(healthBar, healthAmount, renderedSprites, queue, queueProcess, faintEvent, opponent, info, debounce, terrainConditions){
    //makes sure the pogemon isint fainted and that the second pogemon's statusCheck is queued up

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
        audioObj.music.battle.stop()
        audioObj.music.victory.play()
        this.hpManagement(this, healthBar, healthAmount)
        faintEvent(this)
        //
        return
      }
    }

    let checkForSeededEvent = () =>{
      this.affliction.forEach(affliction =>{
        if(affliction.name == 'seeded'){
          queue.push(() =>{{
            if(this.fainted) return
            if(opponent.fainted) return
            thisFaints()
  
            let chip = Math.floor(this.stats.baseHp / 8)
  
            this.hp = Math.floor(this.hp - chip)
            if(opponent.hp < opponent.stats.baseHp) opponent.hp = Math.floor(opponent.hp + chip)
            if(opponent.hp > opponent.stats.baseHp) opponent.hp = opponent.stats.baseHp
            if(this.hp < 1) this.hp = 0
  
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
  
            document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
  
            healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
            
            this.dialogue('battle', `${this.name}'s health was sapped by the seeds.`)
            
            thisFaints()
            
            this.statusEffectAnimation(affliction.name, renderedSprites, queueProcess)
            this.hpManagement(this, healthBar, healthAmount)
            opponent.hpManagement(opponent, opponentHealthBar, opponentHealthAmount)
          }})
        }
      })
    }

    if(this.hp <= 0) {
      thisFaints()
    }

    checkForSeededEvent()

    if(this.status.name == null && opponent.status.name == null){
      // thisFaints()
      if(info != undefined && !debounce){
        opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, true, terrainConditions) 
      }

    }

    if(this.status.name == null && opponent.status.name != null){
      // thisFaints()
      if(info != undefined && !debounce){
        opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, true, terrainConditions)
      }

    }

    if(this.status.name != null && opponent.status.name == null){
      if(!debounce){
        // thisFaints()
        opponent.checkStatus(opponentHealthBar, opponentHealthAmount, renderedSprites, queue, queueProcess, faintEvent, this, null, true, terrainConditions)
      }
    }

    //from here -> manages status effect
    // if(!seedCheck) checkForSeededEvent()
    if(this.status.name != null) {
      queue.push(() =>{
        if(this.fainted) return
        thisFaints()
        let chip
  
        switch(this.status.name){
          case 'burn':
          case 'frz':
            chip = Math.floor(this.stats.baseHp / 16)
            this.hp = Math.floor(this.hp - chip)
            if(this.hp < 1) this.hp = 0
  
            if(this.isEnemy) {
              healthBar = '#foeHealthBar'
              healthAmount = document.querySelector('#foeHP')
            }
  
            document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
  
            healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
            
            if(this.status.name == 'burn') this.dialogue('battle', `${this.name} felt the burn.`)
            else if(this.status.name == 'frz') this.dialogue('battle', `${this.name} was hurt by the frost.`)
            
            if(this.hp <= 0){
              audioObj.music.battle.stop()
              audioObj.music.victory.play()
              this.hpManagement(this, healthBar, healthAmount)
              faintEvent(this)
              return
            }
  
            if(opponent != null && opponent.status.name != null) {
              if(!debounce) opponent.checkStatus(opponentHealthBar, opponentHealthBar, renderedSprites, queue, queueProcess, faintEvent, this, null, true, terrainConditions)
            }
            
            this.statusEffectAnimation(this.status.name, renderedSprites, queueProcess)
            this.hpManagement(this, healthBar, healthAmount)
            break
          case 'psn':
            chip = Math.floor((this.stats.baseHp / 16) * this.status.turns + 1)
            this.hp = Math.floor(this.hp - chip)
            if(this.hp < 1) this.hp = 0
  
            if(this.isEnemy) {
              healthBar = '#foeHealthBar'
              healthAmount = document.querySelector('#foeHP')
            }
  
            document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
            healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
            this.dialogue('battle', `${this.name} felt sick.`)
  
            if(this.hp <= 0){
              audioObj.music.battle.stop()
              audioObj.music.victory.play()
              this.hpManagement(this, healthBar, healthAmount)
              faintEvent(this)
              return
            }
  
            if(opponent.status.name != null && info != null) {
              opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, false, terrainConditions)
            }
            
            this.statusEffectAnimation(this.status.name, renderedSprites, queueProcess)
            this.hpManagement(this, healthBar, healthAmount)
  
            this.status.turns = this.status.turns + 1
            break
          case 'slp':
          case 'para':
            if(opponent.status.name != null && info != null) {
              opponent.checkStatus(info[0], info[1], info[2], info[3], info[4], info[5], this, null, false, terrainConditions)
            }
            break
        }
      })
    }

    let checkIfTerrainConditionActive = () =>{
      let flag = false
      let terrainArr = []
      Object.values(terrainConditions).forEach((terrain, i) =>{
        if(terrain.active) {
          flag = true
          terrainArr.push({type: Object.keys(terrainConditions)[i],info: terrain})
        }
      })
      return [flag, terrainArr]
    }

    const terrainAnimation = (type, colorByElement) =>{
      const color = typesObj[colorByElement].color

      const tl1 = gsap.timeline()
      const tl2 = gsap.timeline()

      switch(type){
        case 'trickroom':
          const fieldEffect = document.querySelector('#fieldEffect')

          const fieldEffectContent = document.createElement('div')
          fieldEffectContent.id = 'trickroom'
  
          for(let i = 0; i < 15; i++){
            const trickRoomCells = document.createElement('div')
            trickRoomCells.id = 'trickroomCells'
  
            fieldEffectContent.appendChild(trickRoomCells)
          }
  
          fieldEffect.appendChild(fieldEffectContent)
  
          tl1.to(fieldEffect, {
            opacity: 0,
          }).to(fieldEffect, {
            opacity: 50,
            duration: 0.5
          }).to(fieldEffect, {
            opacity: 0,
            duration: 0.01,
            onComplete: () =>{
              fieldEffect.replaceChildren()
              terrainConditions.trickroom.active = true
              queueProcess.disabled = false
            }
          })
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
          queueProcess.disabled = false
        }
      })
    }

    let [terrainFlag, terrainArr] = checkIfTerrainConditionActive()

    if(info == null){
      // end of turn animation stuff
      if(terrainFlag){
        terrainArr.forEach(activeTerrain =>{
          if(activeTerrain.info.turns == 0){
            this.dialogue('battle', `The ${activeTerrain.type} is fading.`)
            activeTerrain.info.active = false
            return
          }
          queue.push(() =>{
            terrainAnimation(activeTerrain.type, activeTerrain.info.element)
            activeTerrain.info.turns--
          })
          queue.push(() =>{
            this.dialogue('battle', `${activeTerrain.info.turns} turns left to ${activeTerrain.type}.`)
          })
        })
      }
    }

  }

  //should change for disrupt and pass it 'miss' and 'flinched' arguments
  miss(type, renderedSprites, queueProcess){
    queueProcess.disabled = true
    switch(type){
      case 'missed':
      case 'flinched':
        this.dialogue('battle', `${this.name} ${type}!`)
        gsap.to(this.position, {
          x: this.position.x + 10,
          y: this.position.y + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.08,
          onComplete: () =>{
            queueProcess.disabled = false
          }
        })
        break
      case 'para':
        this.dialogue('battle', `${this.name} couldnt move because it's paralyzed.`)
        this.statusEffectAnimation('para', renderedSprites, queueProcess)
        break
      case 'slp':
        this.status.turns = this.status.turns + 1
        this.dialogue('battle', `${this.name} is deep asleep.`)
        this.statusEffectAnimation('slp', renderedSprites, queueProcess)
        break
      case 'confusion':
        this.dialogue('battle', `${this.name} hit itself in confusion.`)

        let userId = 'ally'
        let userHealthBar = '#allyHealthBar'
        let userHp = document.querySelector('#allyHp')
        if(this.isEnemy) {
          userId = 'foe'
          userHealthBar = '#foeHealthBar'
          userHp = document.querySelector('#foeHp')
        }

        let burn = 1
        if(this.status.name == 'burn') burn = 0.5

        let allyAtkChange = statsChangeObj[userId].nominator.atk / statsChangeObj[userId].denominator.atk
        let allyDefChange = statsChangeObj[userId].nominator.def / statsChangeObj[userId].denominator.def

        this.hp -= Math.ceil((((2 * this.lvl / 5 + 2) * 40 * (this.stats.atk * allyAtkChange) / (this.stats.def * allyDefChange) / 50 + 2) * burn))
        this.hpManagement(this, userHealthBar, userHp)

        gsap.to(this.position, {
          x: this.position.x + 10,
          y: this.position.y + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.08,
          onComplete: () =>{
            queueProcess.disabled = false
          }
        })
        break
    }

  }

  faint(queueFaintTrigger){
    if(this.hp > 0) return

    queueFaintTrigger.initiated = true
    this.fainted = true
    audioObj.SFX.faint.play()
    gsap.to(this.position, {
      y: this.position.y + 20,
      onComplete: () =>{
        gsap.to(this.position, {
          y: this.position.y - 20,
        })
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

  expGain(yeilder, battleType, battlerArr, inBattle){
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

    const yeild = pogemonsObj[`${yeilder.name}`].yeild * a
    const lvl = yeilder.lvl
    const expGained = Math.floor(((yeild * lvl / 5) * (1 / s) * Math.pow(((2 * lvl + 10) / (lvl + this.lvl + 10)), 2.5) + 1))
    
    this.exp += expGained
    this.dialogue('battle', `${this.name} gained ${expGained} exp points!`)

    this.expBarProgress(inBattle)

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
        gsap.to(document.querySelector('#teamLvlUpWindow').style, {
          left: '82.5%',
          onComplete: () =>{
            setTimeout(() =>{
              gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                width: `100%`,
                duration: 1,
                onComplete: () =>{
                  document.querySelector('#teamLvlUpExpDetailsLvl').textContent = `lv ${prevLvl} >>> lv ${this.lvl}`
                  this.dialogue('battle', `${this.name}'s lvl raised to ${this.lvl}!`)
                  gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                    width: `0%`,
                    onComplete: () =>{
                      gsap.to(document.querySelector('.teamLvlUpExpBar'), {
                        duration: 0.75,
                        width: `${Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))}%`,
                        onComplete: () =>{
                          queueProcess.disabled = false
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

    this.dialogue('battle', `${this.name}'s stats increased!`)
    this.stats = this.generateStats()

    if(inBattle){
      document.querySelector('#expBar').style.width = '0%'
      setTimeout(() => document.querySelector('#expBar').style.width = `${percentage}%`, 1000)

      const allyLvlDom = document.querySelector('#allyLvl')
      const allyHpDom = document.querySelector('#allyHp')

      this.hp = this.hp + (Math.round(this.stats.baseHp * 0.05) + 1)
  
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

    lvlUpLvlDom.textContent = `lv ${prevLvl}`

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

          setTimeout(() => queueProcess.disabled = false, 1000)
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
    
    this.moves = this.generateMoves(false, 'battle')

    let newMovesAmount = this.moves.length - oldMoves.length
    let newMoves = [...this.moves].splice(-newMovesAmount, newMovesAmount)

    return newMoves
  }
}

export class NPC extends Sprite{
  constructor(
    team,
    bag,
    money,
    direction,
    trainerName,
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
    this.disabled = false
    this.assingDirection(direction)
    if(trainerName != undefined) this.name = trainerName
    if(type == 'player') {
      this.startTime = new Date()
      this.badges = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
      }
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

  catch(pogemon, starter, currMap, inUse, renderedSprites, ball, manageQueue, critLanded, backToOverWorld, pogemonInUse, queue, faintEvent, pc, queueFaintTrigger){
    let newPogemon

    const catchCalc = ball => {
      let statusBonus = 1
      const rng = Math.floor(Math.random() * 100)
      const rate = Math.floor(((3 * pogemon.stats.baseHp - 2 * pogemon.hp) * pogemon.pogemon.catchRate * ball.pow / (3 * pogemon.stats.baseHp) * statusBonus))
      return {rng, rate} 
    }

    const catchEvent = ballSprite => {
      let {rng, rate} = catchCalc(ball)
      if(rng <= rate){
        renderedSprites.splice(1,1)
        newPogemon.isEnemy = false
        if(this.team.length < 6) this.team.push(newPogemon)
        else {
          for(let i = 0; i < pc.length; i++){
            for(let j = 0; j < pc[i].length; j++){
              if(pc[i][j] == null) pc[i][j] = newPogemon
              break
            }
          }
        }
        document.querySelector('#dialogueInterface').textContent = `${pogemon.name} was caught`
        manageQueue(true)
        backToOverWorld()
      } else {
        ballSprite.animate = true
        gsap.to(ballSprite, {
          opacity: 0,
          duration: 1,
          onComplete: () =>{
            ballSprite.animate = false
            gsap.to(pogemon, {
              opacity: 1,
              onComplete: () =>{
                let foeRNGMove = pogemon.moves[Math.floor(Math.random() * pogemon.moves.length)]
                pogemon.move({move: foeRNGMove, recipient: inUse, renderedSprites, critHit: critLanded, queue, queueFaintTrigger})

                manageQueue(true)
                if(pogemonInUse.hp <= 0){
                  pogemonInUse.faint(queueFaintTrigger)
                  faintEvent(pogemonInUse)
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
              }
            })
          }
        })
      }
    }

    function ballAnimation(ballSprite){
      renderedSprites.splice(1, 0, ballSprite)
  
      gsap.to(ballSprite.position, {
        x: pogemon.position.x + pogemon.width / 3,
        y: pogemon.position.y + pogemon.height / 2,
        onComplete: () =>{
          ballSprite.animate = false
          gsap.to(pogemon, {
            opacity: 0,
            onComplete: () =>{
              gsap.to(ballSprite.position, {
                y: pogemon.position.y + 250,
                onComplete: () => {
                  gsap.to(ballSprite, {
                    rotation: '-0.5',
                    onComplete: () => {
                      gsap.to(ballSprite, {
                        rotation: '0.5',
                        onComplete: () => {
                          gsap.to(ballSprite, {
                            rotation: '-0.5',
                            onComplete: () => {
                              gsap.to(ballSprite, {
                                rotation: '0',
                                onComplete: () =>{
                                  catchEvent(ballSprite)
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
          hold: 50
        },
        animate: true
      })
      newPogemon = new Pogemon(pogemon, Math.pow(5, 3), false, currMap, null, pogemonSprite)

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
          y: 100
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
}