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
    info
  }){
    this.position = position
    this.type = type
    this.width = tileSize
    this.height = tileSize
    this.color
    if(info != undefined) this.info = info
    this.generateInfo()
  }

  generateInfo(){
    const brightness = 0
    switch(this.type){
      case 1:
        this.color = `rgba(255,0,0,${brightness})`
        break
      case 2:
        this.color = `rgba(100,0,0,${brightness})`
        break
      case 3:
        this.color = `rgba(255,255,255,${brightness})`
        break
      case 4:
        this.color = `rgba(150,150,150,${brightness})`
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

export class Pogemon extends Sprite{
  constructor(
    pogemon,
    exp,
    isEnemy,
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
      this.hp = this.stats.baseHp
      this.status = {name: null, turns: 0}
      this.fainted = false
      this.evo = this.pogemon.evo
      this.ability = this.generateAbility()
      this.moves = this.generateMoves(true, 'battle')
      this.friendliness = 0
      this.catchInfo = this.generateCatchInfo(new Date())
      this.animationProperties = pogemon.animationProperties
      this.heldItem = null
    } else {
      this.exp = preBuilt.exp
      this.lvl = preBuilt.lvl
      this.nature = preBuilt.nature
      this.gender = preBuilt.gender
      this.ivs = preBuilt.ivs
      this.stats = preBuilt.stats
      this.hp = preBuilt.hp
      this.status = preBuilt.status
      this.fainted = preBuilt.fainted
      this.evo = this.pogemon.evo
      this.ability = preBuilt.ability
      this.moves = preBuilt.moves
      this.friendliness = preBuilt.friendliness
      this.catchInfo = {
        date: new Date(preBuilt.catchInfo.date),
        lvl: preBuilt.catchInfo.lvl
      }
      this.animationProperties = preBuilt.animationProperties
      this.heldItem = preBuilt.heldItem
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
    let rng = Math.floor(Math.random() * Math.floor(2)) + 1
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
      date
    }
    
    return catchInfo
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
  move({move, recipient, renderedSprites, critHit, queue}){
    this.managePP(move, false)

    if(move.pp == 0) move = movesObj['struggle']

    let recipientHealthBar = '#foeHealthBar'
    let recipientStatus = document.querySelector('#foeStatus')
    let hpDom = document.querySelector('#foeHp')
    let movementDistance = 20
    let rotation = 1
    let launcPos = this.pogemon.animationPositions.ally.launch
    let receivePos = recipient.pogemon.animationPositions.foe.receive

    if(this.isEnemy){
      recipientHealthBar = '#allyHealthBar'
      recipientStatus = document.querySelector('#allyStatus')
      hpDom = document.querySelector('#allyHp')
      movementDistance = -20
      rotation = -2
      launcPos = this.pogemon.animationPositions.foe.launch
      receivePos = recipient.pogemon.animationPositions.ally.receive
    }

    let damageCalculation = () => {
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
          recipient.hp -= Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * this.stats.atk / recipient.stats.def / 50 + 2) * roll * typeEffectivness * stab * crit)
        }
      } else if(move.type === 'special'){
        if(typeEffectivness !== 0){
          recipient.hp -= Math.ceil(((2 * this.lvl / 5 + 2) * move.pow * this.stats.spatk / recipient.stats.spdef / 50 + 2) * roll * typeEffectivness * stab * crit)
        }
      } else if(move.type === 'status'){

      }

      if(recipient.hp < 0) recipient.hp = 0
    }

    damageCalculation()

    let statusRNG = () =>{
      if(recipient.status.name != null) return
      if(recipient.hp <= 0) return
      let rng = Math.floor(Math.random() * 100)
      if(move.effects != null){
        switch(Object.keys(move.effects)[0]){
          case 'burn':{
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
    }

    statusRNG()

    let hitAnimation = (type) => {
      if(type){
        const hitImg = new Image()
        hitImg.src = move.sprite

        const hitSprite = new Sprite({
          type: 'attack',
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

    // should find a way to manage moves better or this will become a cluster fuck very quickly

    switch(move.name){
      case 'tackle': 
      case 'quickattack':
      case 'headbutt':
        //should put struggle apart
      case 'struggle':
        hitAnimation(false)
        break
      case 'slash':
        hitAnimation(true)
        break
      case 'fireball':
      case 'shadowball':
        projectileAnimation()
        break
    }
  }

  checkStatus(healthBar, healthAmount, renderedSprites, queue, faintEvent, slower, info){
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
        //have to do that to check if slower is fainted
        slower.checkStatus(info[0], info[1], info[2], info[3], info[4], {status: {name: null}}) 
        return
      }

      if(this.status.name == null && slower.status.name != null){
        thisFaints()
        slower.checkStatus(info[0], info[1], info[2], info[3], info[4], {status: {name: null}})
        return
      }
    }

    queue.push(() =>{
      thisFaints()
 
      switch(this.status.name){
        case 'burn':
          let chip = this.stats.baseHp / 16
          this.hp = Math.floor(this.hp - chip)
          if(this.hp < 1) this.hp = 0

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

  expGain(yeilder, battleType){
    if(this.lvl >= 100) return
    let a = 1
    if(battleType = 'trainer') a = 1.5

    // amount of allied participants to the battle
    let s = [1]

    // let t = if original trainer
    // let e = if lucky egg held
    // let v = if past evolution lvl
    // let f = affection
    // let p = exp buff or debuff such as exp charm and shit

    const yeild = pogemonsObj[`${yeilder.name}`].yeild
    const lvl = yeilder.lvl
    const expGained = Math.floor((yeild * lvl / 5) * (1 / s.length) * Math.pow(((2 * lvl + 10) / (lvl + this.lvl + 10)), 2.5) + 1)
    
    this.exp += expGained

    this.dialogue('battle', `${this.name} gained ${expGained} exp points!`)

    this.expBarProgress()

    this.lvl = this.generateLevel()
  }

  expBarProgress(){
    let percentage = this.convertToPercentage(Math.floor(this.exp), Math.floor(Math.pow(this.lvl, 3)))

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

  onLvlUp(){
    let percentage = Math.floor(this.convertToPercentage(this.exp - Math.pow(this.lvl, 3), Math.pow(this.lvl + 1, 3) - Math.pow(this.lvl, 3)))
    
    document.querySelector('#expBar').style.width = '0%'
    setTimeout(() => document.querySelector('#expBar').style.width = `${percentage}%`, 1000)
    
    const allyLvlDom = document.querySelector('#allyLvl')
    const allyHpDom = document.querySelector('#allyHp')

    this.dialogue('battle', `${this.name} raised to lv ${this.lvl}!`)

    this.stats = this.generateStats()

    this.hp = this.hp + (Math.round(this.stats.baseHp * 0.05) + 1)

    allyHpDom.textContent = `${this.hp}/${this.stats.baseHp}`
    allyLvlDom.textContent = `Lv ${this.lvl}`

    let hpPercentage = Math.floor(this.convertToPercentage(this.hp, this.stats.baseHp))
    document.querySelector('#allyHealthBar').style.width = `${hpPercentage}%`
  }

  showStatWindow(oldStats, prevLvl){
    const lvlUpWindowDom = document.querySelector('#lvlUpWindow')
    const lvlUpLvlDom = document.querySelector('#lvlUpLvl')
    const lvlUpStatsArr = document.querySelectorAll('.lvlUpStats')

    lvlUpWindowDom.style.display = 'grid'
    setTimeout(() =>{
      lvlUpWindowDom.style.left = '1725px'
    }, 5)

    lvlUpLvlDom.textContent = `lv ${prevLvl} >>> lv ${this.lvl}` 

    for(let i = 0; i < Object.keys(this.stats).length; i++){

      const increase = Object.values(this.stats)[i] - Object.values(oldStats)[i]

      lvlUpStatsArr[i].textContent = `${Object.values(oldStats)[i]} + ${increase}`
    }
  }

  showStatIncrease(){
    const lvlUpLvlDom = document.querySelector('#lvlUpLvl')
    const lvlUpStatsArr = document.querySelectorAll('.lvlUpStats')
    lvlUpLvlDom.textContent = `Lv ${this.lvl}`

    for(let i = 0; i < lvlUpStatsArr.length; i++){
      lvlUpStatsArr[i].textContent = `${Object.values(this.stats)[i]}`
    }
  }

  hideStatIncrease(){
    const lvlUpWindowDom = document.querySelector('#lvlUpWindow')

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

  catch(pogemon, starter, inUse, renderedSprites, ball, manageQueue, critLanded, backToOverWorld, pogemonInUse, queue, faintEvent, pc){
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

      newPogemon = new Pogemon(pogemon, Math.pow(5, 3), false, null, pogemonSprite)

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