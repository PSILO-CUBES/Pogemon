import { c } from "./scripts/canvas.js"
import { audioObj } from "./data/audioData.js"

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
      this.height = this.img.height
    }
    this.animate = animate
    this.running = false
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
    type
  }){
    this.position = position
    this.type = type
    this.width = tileSize
    this.height = tileSize
    this.color
    this.generateInfo()
  }

  generateInfo(){
    switch(this.type){
      case 1:
        this.color = 'rgba(255,0,0,0)'
        break
      case 2:
        this.color = 'rgba(100,0,0,0)'
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

export class Pogemon extends Sprite{
  constructor(
    pogemon,
    lvl,
    isEnemy,
    {
      type, 
      position, 
      img, 
      frames,
      sprites, 
      animate,
      rotation
    }
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
    this.id = pogemon.id
    this.pogemon = pogemon
    this.name = this.pogemon.name
    this.isEnemy = isEnemy
    this.type = {
      1: this.pogemon.type[1],
      2: this.pogemon.type[2]
    }
    this.lvl = lvl
    this.stats = this.generateStats()
    this.hp = this.stats.baseHp
    this.exp = 0
    this.evolution = this.pogemon.evolution
    this.ability = this.generateAbility()
    this.moves = this.generateMoves()
    this.animationProperties = pogemon.animationProperties
  }

  generateStats(){
    const statObj = {
      baseHp: 0,
      atk: 0,
      def: 0,
      spatk: 0,
      spdef: 0,
      spd: 0,
    }

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


    Object.keys(statObj).forEach(stat =>{
      if(stat === 'baseHp'){
        statObj[stat] = Math.floor(0.01 * (2 * this.pogemon.stats.hp + ivObj.baseHp) * this.lvl) + this.lvl + 10
      } else {
        statObj[stat] = Math.floor(0.01 * (2 * this.pogemon.stats[stat] + ivObj[stat]) * this.lvl) + 5
      }
    })

    return statObj
  }

  generateAbility(){
    let rng = Math.floor(Math.random() * Math.floor(2)) + 1
    return this.pogemon.abilities[rng]
  }

  generateMoves(){
    let moves = []
    let movepool = this.pogemon.movepool

    Object.keys(movepool).forEach(key =>{
      if(movepool[key].lvl <= this.lvl && moves.length < 4){
        moves.push(movepool[key].move)
      }
    })

    return moves
  }

  convertHpToPercentage(target){
    console.log(target.stats.baseHp)
    let hpToPercentage = 100 * target.hp / target.stats.baseHp 

    if(target.hp <= 0) hpToPercentage = 0

    return hpToPercentage
  }

  battleDialogue(text){
    let dialogueInterfaceDom = document.querySelector('#dialogueInterface')
    let movesInterface = document.querySelector('#movesInterface')

    dialogueInterfaceDom.style.display = 'block'
    dialogueInterfaceDom.textContent = text

    movesInterface.style.display = 'none'
  }

  hpManagement(target, recipientHealthBar, hpDom){
    gsap.to(recipientHealthBar, {
      width: `${this.convertHpToPercentage(target)}%`
    })

    let hpColor

    if(this.convertHpToPercentage(target) >= 50){
      hpColor = 'green'
    } else if(this.convertHpToPercentage(target) < 50 && this.convertHpToPercentage(target) >= 25){
      hpColor = 'yellow'
    } else if(this.convertHpToPercentage(target) < 25 && this.convertHpToPercentage(target) > 0){
      hpColor = 'red'
    } else if(this.convertHpToPercentage(target) <= 0){
      hpColor = 'black'
    } 

    if(target.hp >= 0) hpDom.textContent = `${target.hp}/${target.stats.baseHp}`
    else hpDom.textContent = `0/${target.stats.baseHp}`

    document.querySelector(recipientHealthBar).style.backgroundColor = hpColor
  }

  attack({move, recipient, renderedSprites}){
    let recipientHealthBar = '#foeHealthBar'
    let hpDom = document.querySelector('#foeHp')
    let movementDistance = 20
    let rotation = 1
    let attackPos = this.pogemon.animationPositions.launch

    if(this.isEnemy){
      recipientHealthBar = '#allyHealthBar'
      hpDom = document.querySelector('#allyHp')
      movementDistance = -20
      rotation = -2
      attackPos = this.pogemon.animationPositions.receive
    } 

    this.battleDialogue(`${this.name} used ${move.name}`)

    // put if statement to check if move should heal
    recipient.hp -= move.pow
    
    //need to modify how the projectiles come out of the mon's, should put a value to the mon's object to decide the height of the projectile
    let projectileAnimation = () => {
      const projectileImg = new Image()
      projectileImg.src = move.sprite
      const projectileSprite = new Sprite({
        position: {
          x: this.position.x + attackPos.init.x,
          y: this.position.y + attackPos.init.y
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
        x: recipient.position.x - attackPos.hit.x,
        y: recipient.position.y - attackPos.hit.y,
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

    switch(move.name){
      case 'tackle':
        const tl = gsap.timeline()
        tl.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: 0.1,
          onComplete: () =>{

            audioObj.tackleHit.play()

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
              duration: 0.08
            })
          }
        }).to(this.position, {
          x: this.position.x
        })
        break
      case 'fireBall':
        projectileAnimation()
        break
    }
  }

  faint(battle){
    this.battleDialogue(`${this.name} fainted!`)
    audioObj.faint.play()
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
    battle.initiated = false
  }
}