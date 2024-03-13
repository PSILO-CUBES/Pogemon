import { audioObj } from "./data/audioData.js"
import { movesObj } from "./data/movesData.js"
import { natureObj } from "./data/natureData.js"
import { pogemonsObj } from "./data/pogemonData.js"
import { typesObj } from "./data/typesData.js"

import { c, scenes } from "./scripts/canvas.js"

export class Sprite {
  constructor({
    type, 
    position, 
    img, 
    frames = {max : 1, hold: 10}, 
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
    name
  }){
    this.position = position
    this.type = type
    this.width = tileSize
    this.height = tileSize
    this.color
    if(info != undefined) this.info = info
    this.generateInfo()
    this.name = name
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
      this.fainted = preBuilt.fainted
      this.evo = this.pogemon.evo
      this.ability = preBuilt.ability
      this.moves = preBuilt.moves
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

          moves.push(movepool[key].move)
        } else {
          // isint an array when trying to push things to it
          if(this.learntMoves.includes(movepool[key].move.name)) return

          this.learntMoves.push(movepool[key].move.name)
          if(moves.length == 4) moves.splice(0, 1)
          moves.push(movepool[key].move)
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
        evolutionDialogueDom.textContent = text
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
  move({move, recipient, renderedSprites, critHit, queue, queueProcess}){
    this.managePP(move, false)

    if(move.pp == 0) move = movesObj['struggle']

    let userHealthBar = '#allyHealthBar'
    let userStatus = document.querySelector('#allyStatus')
    let userHpDom = document.querySelector('#allyHp')

    let recipientHealthBar = '#foeHealthBar'
    let recipientStatus = document.querySelector('#foeStatus')
    let hpDom = document.querySelector('#foeHp')

    let userStatsChangeContainer = 'allyStatsChangeContainer' 
    let recipientStatsChangeContainer = 'foeStatsChangeContainer'

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

      userStatsChangeContainer = 'foeStatsChangeContainer'
      recipientStatsChangeContainer = 'allyStatsChangeContainer'

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

      let crit = 1
      if(critHit(this)) crit = 1.5

      let typeEffectivness = 1

      let allyStatChange

      let foeStatChange
      
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

      switch(typeEffectivness){
        case 0:
          this.dialogue('battle', `${this.name} used ${move.name} on ${recipient.name}! \n\n\n It didint affect ${recipient.name} whatsoever...`)
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

      if(move.type === 'physical'){
        if(typeEffectivness !== 0){
          allyStatChange = statsChangeObj[userId].nominator.atk / statsChangeObj[userId].denominator.atk
          foeStatChange = statsChangeObj[foeId].nominator.def / statsChangeObj[foeId].denominator.def
          
          recipient.hp -= Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * (this.stats.atk * allyStatChange) / (recipient.stats.def * foeStatChange) / 50 + 2) * roll * typeEffectivness * stab * crit)
          // console.log(Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * (this.stats.atk * allyStatChange) / (recipient.stats.def * foeStatChange) / 50 + 2) * roll * typeEffectivness * stab * crit))
        }
      } else if(move.type === 'special'){
        if(typeEffectivness !== 0){
          allyStatChange = statsChangeObj[userId].nominator.spatk / statsChangeObj[userId].denominator.spatk
          foeStatChange = statsChangeObj[foeId].nominator.spdef / statsChangeObj[foeId].denominator.spdef

          recipient.hp -= Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * (this.stats.spatk * allyStatChange) / (recipient.stats.spdef * foeStatChange) / 50 + 2) * roll * typeEffectivness * stab * crit)
          // console.log(Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * (this.stats.spatk * allyStatChange) / (recipient.stats.spdef * foeStatChange) / 50 + 2) * roll * typeEffectivness * stab * crit))
        }
      } else if(move.type === 'status'){

      }

      if(recipient.hp < 0) recipient.hp = 0
    }

    let statusCalculation = () =>{
      if(move.effects.name == undefined){
        if(move.effects == 'heal'){
          this.hp = Math.floor(this.hp + this.stats.baseHp * ( move.pow / 100 ))
          if(this.hp > this.stats.baseHp) this.hp = this.stats.baseHp
  
          this.hpManagement(this, userHealthBar, userHpDom)
          this.dialogue('battle', `${this.name} used ${move.name}`)
        }
      } else {
        if(move.effects.name == 'buff'){
          if(!this.isEnemy){
            if(statsChangeObj.ally.denominator[move.effects.target] > 2) statsChangeObj.ally.denominator[move.effects.target] -= 1
            else statsChangeObj.ally.nominator[move.effects.target] += 1

            if(statsChangeObj.ally.nominator[move.effects.target] > 8) {
              this.dialogue('battle', `${this.name}'s ${move.effects.target} won't go up any futher.`)
              return
            }

            this.dialogue('battle', `${this.name} used ${move.name}! \n\n It increased it's ${move.effects.target} by ${move.pow} tier.`)
          } else {

            if(statsChangeObj.foe.denominator[move.effects.target] > 2) statsChangeObj.foe.denominator[move.effects.target] -= 1
            else statsChangeObj.foe.nominator[move.effects.target] += 1

            if(statsChangeObj.foe.nominator[move.effects.target] > 8) {
              this.dialogue('battle', `${this.name}'s ${move.effects.target} won't go up any futher.`)
              return
            }

            this.dialogue('battle', `${this.name} used ${move.name}! \n\n It increased it's ${move.effects.target} by ${move.pow} tier.`)
          }

        } else if (move.effects.name == 'debuff') {
          if(!this.isEnemy){
            if(statsChangeObj.foe.nominator[move.effects.target] > 2) statsChangeObj.foe.nominator[move.effects.target] -= 1
            else statsChangeObj.foe.denominator[move.effects.target] += 1

            if(statsChangeObj.foe.denominator[move.effects.target] > 8) {
              this.dialogue('battle', `${recipient.name}'s ${move.effects.target} won't go down any futher.`)
              return
            }

            this.dialogue('battle', `${this.name} used ${move.name} \n\n It decreased ${recipient.name}'s ${move.effects.target} by ${move.pow} tier.`)
          } else {
            if(statsChangeObj.ally.nominator[move.effects.target] > 2) statsChangeObj.ally.nominator[move.effects.target] -= 1
            else statsChangeObj.ally.denominator[move.effects.target] += 1
            
            if(statsChangeObj.ally.denominator[move.effects.target] > 8) {
              this.dialogue('battle', `${recipient.name}'s ${move.effects.target} won't go down any futher.`)
              return
            }

            this.dialogue('battle', `${this.name} used ${move.name} \n\n It decreased ${recipient.name}'s ${move.effects.target} by ${move.pow} tier.`)
          }
        } else {
          document.querySelector('#movesInterface').style.display = 'none'
          this.dialogue('battle', `${this.name} used ${move.name}!`)
        }
      }
    }
    
    if(move.type == 'status') statusCalculation()
    else damageCalculation()

    let statusRNG = () =>{

      if(recipient.status.name != null) {
        if(move.effects == undefined) return  
        if(move.effects.name == 'status') queue.push(() => this.dialogue('battle', `${recipient.name} already has a status affliction.`))
        return
      }

      if(recipient.hp <= 0) return
      let rng = Math.floor(Math.random() * 100)
      if(move.effects != null){
        switch(Object.keys(move.effects)[0]){
          case 'burn':
            if(rng <= Object.values(move.effects)[0]){
              recipient.status.name = 'burn'
              queue.push(() =>{
                this.dialogue('battle', `${recipient.name} was burnt!`)
                recipientStatus.style.background = 'red'
              })
            }
        }
      }
    }

    statusRNG()

    if(move.name != 'fireball') rotation = 0

    let hitAnimation = type => {
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
            hold: 10
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
              if(type) renderedSprites.splice(1,1)
            }
          })
        }
      }).to(this.position, {
        x: this.position.x
      })
    }
    
    let projectileAnimation = () => {
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
          hold: 10
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

    let statusAnimation = (type, stats) =>{
      if(type == 'heal'){
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
            hold: 10
          },
          animate: true,
          rotation
        })

        // HAVE TO DISABLE QUEUE DURING ANIMATION

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
        const buffDiv = document.createElement('div')
        document.querySelector('#scene').appendChild(buffDiv)
        queueProcess.disabled = true

        if(stats == 'buff'){
          if(!this.isEnemy){
            if(statsChangeObj.ally.nominator[move.effects.target] > 8) {
              statsChangeObj.ally.nominator[move.effects.target] = 8
              queueProcess.disabled = false
              return
            }

            // ally buff
            buffDiv.setAttribute('class', `${stats}Div ${userStatsChangeContainer}`)
            buffDiv.style.top = 450

            statsChangeObj.ally[move.effects]

            gsap.to(buffDiv, {
              top: 200,
              duration: 0.5,
              onComplete: () =>{
                document.querySelector('#scene').removeChild(buffDiv)
                queueProcess.disabled = false
              }
            }) 
          } else {
            if(statsChangeObj.foe.nominator[move.effects.target] > 8) {
              statsChangeObj.foe.nominator[move.effects.target] = 8
              queueProcess.disabled = false
              return
            }

            // foe buff
            buffDiv.setAttribute('class', `${stats}Div ${userStatsChangeContainer}`)
            buffDiv.style.top = 225

            gsap.to(buffDiv, {
              top: 10,
              duration: 0.5,
              onComplete: () =>{
                document.querySelector('#scene').removeChild(buffDiv)
                queueProcess.disabled = false
              }
            }) 
          }
          return
        }

        if(!this.isEnemy){
          if(statsChangeObj.foe.denominator[move.effects.target] > 8) {
            statsChangeObj.foe.denominator[move.effects.target] = 8
            queueProcess.disabled = false
            return
          }

          // ally debuff
          buffDiv.setAttribute('class', `${stats}Div ${recipientStatsChangeContainer}`)
          buffDiv.style.top = -50

          gsap.to(buffDiv, {
            top: 125,
            duration: 0.5,
            onComplete: () =>{
              document.querySelector('#scene').removeChild(buffDiv)
              queueProcess.disabled = false
            }
          }) 
        } else {
          if(statsChangeObj.ally.denominator[move.effects.target] > 8) {
            statsChangeObj.ally.denominator[move.effects.target] = 8
            queueProcess.disabled = false
            return
          }

          // foe debuff
          buffDiv.setAttribute('class', `${stats}Div ${recipientStatsChangeContainer}`)
          buffDiv.style.top = 50

          gsap.to(buffDiv, {
            top: 250,
            duration: 0.5,
            onComplete: () =>{
              document.querySelector('#scene').removeChild(buffDiv)
              queueProcess.disabled = false
            }
          }) 
        }

      } else if (type == 'status') {
        console.log('animation')
      }
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
      case 'rest':
        statusAnimation('heal')
        break
      
      // boost
      case 'sharpen':
      case 'swift':
        statusAnimation('stats', move.effects.name)
        break
      // debuff
      case 'growl':
      case 'stare':
        statusAnimation('stats', move.effects.name)
        break

      // status effect
      case 'heatWave':
        projectileAnimation()
        break  
    }
  }

  // should pass foe instead of slower
  checkStatus(healthBar, healthAmount, renderedSprites, queue, faintEvent, slower, faster, info){
    let thisFaints = () => {
      if(this.hp <= 0){
        audioObj.music.battle.stop()
        audioObj.music.victory.play()
        this.hpManagement(this, healthBar, healthAmount)
        faintEvent(this)
        //
        return
      }
    }

    if(slower.name != undefined){
      if(this.status.name == null && slower.status.name == null){
        thisFaints()
        if(info == undefined) return
        slower.checkStatus(info[0], info[1], info[2], info[3], info[4], {status: {name: null}}) 
        return
      }

      if(this.status.name == null && slower.status.name != null){
        thisFaints()
        if(info == undefined) return
        slower.checkStatus(info[0], info[1], info[2], info[3], info[4], {status: {name: null}})
        return
      }
    }

    if(this.hp <= 0) {
      thisFaints()
    }

    if(this.status.name == null) return

    queue.push(() =>{
      if(this.fainted) return
      thisFaints()
 
      switch(this.status.name){
        case 'burn':
          let chip = this.stats.baseHp / 16
          this.hp = Math.floor(this.hp - chip)
          if(this.hp < 1) this.hp = 0

          if(this.isEnemy) {
            healthBar = '#foeHealthBar'
            healthAmount = document.querySelector('#foeHP')
          }

          document.querySelector(healthBar).style.width = `${this.convertToPercentage(this.hp, this.stats.baseHp)}%`
          healthAmount.innerText = `${this.hp}/${this.stats.baseHp}`
          this.dialogue('battle', `${this.name} felt the burn.`)

          if(this.hp <= 0){
            audioObj.music.battle.stop()
            audioObj.music.victory.play()
            this.hpManagement(this, healthBar, healthAmount)
            faintEvent(this)
            return
          }

          if(slower.status.name != null) slower.checkStatus(info[0], info[1], info[2], info[3], info[4], {status: {name: null}})
          
          this.hpManagement(this, healthBar, healthAmount)
          // add sprite effect after
      }
      return
    })
  }

  //should change for disrupt and pass it 'miss' and 'flinched' arguments
  miss(){
    this.dialogue('battle', `${this.name} missed!`)
    gsap.to(this.position, {
      x: this.position.x + 10,
      y: this.position.y + 10,
      yoyo: true,
      repeat: 5,
      duration: 0.08
    })
  }

  faint(){
    if(this.hp > 0) return

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

    lvlUpLvlDom.textContent = `lv ${this.lvl}`

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

  catch(pogemon, starter, currMap, inUse, renderedSprites, ball, manageQueue, critLanded, backToOverWorld, pogemonInUse, queue, faintEvent, pc){
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
                pogemon.move({move: foeRNGMove, recipient: inUse, renderedSprites, critHit: critLanded, queue})


                manageQueue(true)
                if(pogemonInUse.hp <= 0){
                  pogemonInUse.faint(scenes)
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
          hold: 25
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