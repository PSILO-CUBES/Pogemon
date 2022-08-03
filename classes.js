class Sprite {
    constructor({ 
    position,
    image, 
    frames = {max: 1, hold: 10}, 
    sprites, 
    animate = false, 
    rotation = 0,
    }){
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        this.image.src = image.src

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
            - this.position.x - this.width / 2, 
            - this.position.y - this.height / 2
        )
        c.globalAlpha = this.opacity
        c.drawImage(
            //src
            this.image,
            //cropping
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            //position
            this.image.width / this.frames.max,
            this.image.height,
        )
        c.restore()

        if (!this.animate) return

        if (this.frames.max > 1)  {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

class Pogemon extends Sprite {
    constructor({
    position, 
    image, 
    frames = {max: 1, hold: 10}, 
    sprites, 
    animate = false, 
    rotation = 0,
    isEnemy = true,
    name,
    type,
    stats,
    baseStats,
    attackPool,
    attacks,
    evolution,
    currHP,
    fainted = false,
    currExp,
    expInPerCent,
    currLevel,
    expYield,
    expCurve,
    catchRate,
    globalId,
    item,
    abilities,
    currAbility,
    }) {
    super({
        image, 
        frames,
        sprites, 
        animate, 
        rotation,
    })
    this.sprites = sprites
    this.sprites.src = sprites.src
    this.position = position
    this.isEnemy = isEnemy
    this.name = name
    this.type = type
    this.stats = stats
    this.baseStats = baseStats
    this.currHP = currHP
    this.fainted = fainted
    this.currExp = currExp
    this.expInPerCent = expInPerCent
    this.currLevel = currLevel
    this.expYield = expYield
    this.expCurve = expCurve
    this.attackPool = attackPool
    this.attacks = attacks
    this.evolution = evolution
    this.catchRate = catchRate
    this.globalId = globalId
    this.item = item,
    this.abilities = abilities
    this.currAbility = currAbility
    }

    attack({attack, recipient, renderedSprites}) {
        let superEffective
        let veryEffective
        let notEffective
        let resisted
        let immuned
        let STAB
        attackInProcess = true

        if(this.type.type1 === attack.element || this.type.type2 === attack.element){
            STAB = true
        }

        // check for move effectiveness

        //type 1 or type 2 is immuned, result is immuned
        if(attack.type === 'Special' || attack.type === 'Physical'){
            if(types[recipient.type.type1].immuned.includes(attack.element) || types[recipient.type.type2].immuned.includes(attack.element)){
                immuned = true
                document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name} \n\n but ${recipient.name} is immuned...`
            //type 1 and type 2 are not immuned, proceed
            } else if(!types[recipient.type.type1].immuned.includes(attack.element) && !types[recipient.type.type2].immuned.includes(attack.element)){
                // type 1 and type 2 are very effective, result is super effective
                if(types[recipient.type.type1].veryEffective.includes(attack.element) && types[recipient.type.type2].veryEffective.includes(attack.element)){
                    superEffective = true
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name} \n\n it's super effective!` 
                // type 1 or type 2 are very effective, result is very effective
                } else if(types[recipient.type.type1].veryEffective.includes(attack.element) && types[recipient.type.type2].notEffective.includes(attack.element)){
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name}` 
                // type 1 is very effective and type 2 is not effective, result is normal
                } else if(types[recipient.type.type1].notEffective.includes(attack.element) && types[recipient.type.type2].veryEffective.includes(attack.element)){
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name}` 
                // type 1 and type 2 is not effective, result is resisted
                } else if(types[recipient.type.type1].notEffective.includes(attack.element) && types[recipient.type.type2].notEffective.includes(attack.element)){
                resisted = true
                document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name} \n\n but ${recipient.name} resisted...` 
                // type 1 is not effective and type 2 is very effective, result is normal
                } else if(types[recipient.type.type1].veryEffective.includes(attack.element) || types[recipient.type.type2].veryEffective.includes(attack.element)){
                    veryEffective = true
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name} \n\n it's very effective!` 
                // type 1 or type 2 is not effective, result is not very effective
                } else if(types[recipient.type.type1].notEffective.includes(attack.element) || types[recipient.type.type2].notEffective.includes(attack.element)){
                    notEffective = true
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name} \n\n it's not very effective..` 
                } else {
                    document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name} on ${recipient.name}`
                }
            }    
        } else {
            document.querySelector('#dialogueBox').innerText = `${this.name} uses ${attack.name}`
        }
        

        document.querySelector('#dialogueBox').style.display = 'block'

        let enemyHealthbar = '#enemyHealthbar'
        let playerHealthbar = '#playerHealthbar'
        let enemyHPDisplay = '#enemyHPDisplay'
        let playerHPDisplay = '#playerHPDisplay'
        let user = currAlly
        let rotation = 1
        if (this.isEnemy) {
            enemyHealthbar = '#playerHealthbar'
            playerHealthbar = '#enemyHealthbar'
            enemyHPDisplay = '#playerHPDisplay'
            playerHPDisplay = '#enemyHPDisplay'
            user = currFoe
            rotation = -2
        }

        let targetHPDisplay = document.querySelector(enemyHPDisplay)
        let userHPDisplay = document.querySelector(playerHPDisplay)

        let prevAttackerPos = this.position

        let hpInPercentBattle

        const changeHP = () =>{
            let currColor = undefined
            let currHealthbar
            let currHPDisplay
            if(attack.effect === 'Heal'){
                currHealthbar = document.querySelector(playerHealthbar)
                currHPDisplay = userHPDisplay
                hpInPercentBattle = 100 * user.currHP / user.stats.HP
                this.currHP = user.currHP
            } else {
                currHealthbar = document.querySelector(enemyHealthbar)
                currHPDisplay = targetHPDisplay
                hpInPercentBattle = 100 * recipient.currHP / recipient.stats.HP
                this.currHP = user.currHP
            }
            if (hpInPercentBattle > 50) {
                currColor = 'green'
            } else if (hpInPercentBattle > 25 && hpInPercentBattle <= 50){
                currColor = 'orange'
            } else if (hpInPercentBattle <= 25) {
                currColor = 'red'
            }
            currHealthbar.style.backgroundColor = currColor
            currHPDisplay.style.color = currColor
            if (recipient.currHP > 0) targetHPDisplay.textContent = Math.floor(recipient.currHP.toString()) + '/' + recipient.stats.HP
            else {
                targetHPDisplay.textContent = 0 + '/' + recipient.stats.HP
                gsap.to(enemyHealthbar, {
                    width: 0,
                    onComplete: () =>{
                    }
                })
            }
        }

        let getRandomInt = (min,max) =>{
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min) + min) * 0.1
        }

        let rollRange = getRandomInt(9, 12)

        // damage Calculation here

        let attackCalculation = ( attack, recipient ) =>{
            let E = 1
            let S = 1
            let C = 1
            let crit

            let critRoll = Math.floor(Math.random() * 100)

            if(attack.type === 'Special' || attack.type === 'Physical') {
                if(critRoll < 5 && !immuned){
                    crit = true
                    C = 1.5
                    queue.splice(1, 0, () =>{
                        document.querySelector('#dialogueBox').textContent = `${this.name} landed a critical hit!!`
                    })
                }
            }

            if(STAB){
                S = 1.5
            }

            if (attack.type === 'Physical'){
                let physDamage
                if(recipient.isEnemy){
                    physDamage = Math.floor(attack.potency * ((user.stats.Atk * currAllyAtkBoost)/(recipient.stats.Def * currFoeDefBoost)) / 10) * rollRange
                } else {
                    physDamage = Math.floor(attack.potency * ((user.stats.Atk * currFoeAtkBoost)/(recipient.stats.Def * currAllyDefBoost)) / 10) * rollRange
                }
                
                if (physDamage <= 0) physDamage = 1
                if(superEffective){
                    E * 2
                }else if(veryEffective){
                    E * 1.5
                } else if(notEffective){
                    E * 0.75
                } else if(resisted){
                    E * 0.5
                } else if(immuned){
                    physDamage = 0
                }
                recipient.currHP -= Math.round(physDamage * C * S * E)
                if(recipient.currHP < 0){
                    recipient.currHP = 0
                }
            } else if (attack.type === 'Special'){
                let speDamage
                if(recipient.isEnemy){
                    speDamage = Math.floor(attack.potency * (user.stats.SpAtk * currAllySpeAtkBoost/recipient.stats.SpDef * currFoeSpeDefBoost) / 10) * rollRange
                } else {
                    speDamage = Math.floor(attack.potency * (user.stats.SpAtk * currFoeSpeAtkBoost/recipient.stats.SpDef * currAllySpeDefBoost) / 10) * rollRange
                }
                if (speDamage <= 0) speDamage = 1
                if(superEffective){
                    E * 2
                }else if(veryEffective){
                    E * 1.5
                } else if(notEffective){
                    E * 0.75
                } else if(resisted){
                    E * 0.5
                } else if(immuned){
                    E = 0
                }
                recipient.currHP -= Math.round(speDamage * E * S * C)
                if(recipient.currHP < 0){
                    recipient.currHP = 0
                }
            } else if (attack.type === 'Status'){
                // this is a nightmare but im too lazy to figure out how to loop the currAllyStat correctly
                // put dialogue for status down vvv
                // need to work on sharply raise and sharply lowered stat functionality
                let r = document.querySelector(':root')
                if(attack.effect === 'increaseStats'){
                    if(recipient.isEnemy) {
                        if(attack.stat === 'ATK'){
                            // if stat maxed
                            if(currAllyAtkBoost >= 4){
                                currAllyAtkBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK cannot go up any further!`
                                })
                            // if stat was decreased at least one and did not get back to baseline 
                            } else if (currAllyAtkBoost < 1) {
                                // if(attack.stage === 1)
                                currAllyAtkBoost = currAllyAtkBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK increased!`
                                })
                                //if(attack.stage === 2){
                                    // put sharply raised here
                                // }
                            //if stat is above baseline and not maxed
                            } else {
                                currAllyAtkBoost += attack.potency / 100
                                if(currAllyAtkBoost > 4){
                                    currAllyAtkBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK increased!`
                                })
                            }
                        } else if(attack.stat === 'DEF') {
                            if(currAllyDefBoost >= 4){
                                currAllyDefBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK cannot go up any further!`
                                })
                            } else if (currAllyDefBoost < 1) {
                                currAllyDefBoost = currAllyDefBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF increased!`
                                })
                            } else {
                                currAllyDefBoost += attack.potency / 100
                                if(currAllyDefBoost > 4){
                                    currAllyDefBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF increased!`
                                })
                            }
                        } else if(attack.stat === 'SPEATK') {
                            if(currAllySpeAtkBoost >= 4){
                                currAllySpeAtkBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK cannot go up any further!`
                                })
                            } else if (currAllySpeAtkBoost < 1) {
                                currAllySpeAtkBoost = currAllySpeAtkBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK increased!`
                                })
                            } else{
                                currAllySpeAtkBoost += attack.potency / 100
                                if(currAllySpeAtkBoost > 4){
                                    currAllySpeAtkBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK increased!`
                                })
                            }
                        } else if(attack.stat === 'SPEDEF') {
                            if(currAllySpeDefBoost >= 4){
                                currAllySpeDefBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF cannot go up any further!`
                                })
                            } else if (currAllySpeDefBoost < 1) {
                                currAllySpeDefBoost = currAllySpeDefBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF increased!`
                                })
                            } else {
                                currAllySpeDefBoost += attack.potency / 100
                                if(currAllySpeDefBoost > 4){
                                    currAllySpeDefBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF increased!`
                                })
                            }
                        } else if(attack.stat === 'SPD') {
                            if(currAllySpdBoost >= 4){
                                currAllySpdBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD cannot go up any further!`
                                })
                            } else if (currAllySpdBoost < 1) {
                                currAllySpdBoost = currAllySpdBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD increased!`
                                })
                            } else {
                                currAllySpdBoost += attack.potency / 100
                                if(currAllySpdBoost > 4){
                                    currAllySpdBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD increased!`
                                })
                            }
                        }
                    } else if(!recipient.isEnemy){
                        if(attack.stat === 'ATK'){
                            if(currFoeAtkBoost >= 4){
                                currFoeAtkBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK cannot go up any further!`
                                })
                            } else if (currAllyAtkBoost < 1) {
                                currAllyAtkBoost = currAllyAtkBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK increased!`
                                })
                            } else {
                                currFoeAtkBoost += attack.potency / 100
                                if(currFoeAtkBoost > 4){
                                    currFoeAtkBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK increased!`
                                })
                            }
                        } else if(attack.stat === 'DEF') {
                            if(currFoeDefBoost >= 4){
                                currFoeDefBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF cannot go up any further!`
                                })
                            } else if (currAllyDefBoost < 1) {
                                currAllyDefBoost = currAllyDefBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF increased!`
                                })
                            } else {
                                currFoeDefBoost += attack.potency / 100
                                if(currFoeDefBoost > 4){
                                    currFoeDefBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF increased!`
                                })
                            }
                        } else if(attack.stat === 'SPEATK') {
                            if(currFoeSpeAtkBoost >= 4){
                                currFoeSpeAtkBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK cannot go up any further!`
                                })
                            } else if (currAllySpeAtkBoost < 1) {
                                currAllySpeAtkBoost = currAllySpeAtkBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK increased!`
                                })
                            } else {
                                currFoeSpeAtkBoost += attack.potency / 100
                                if(currFoeSpeAtkBoost > 4){
                                    currFoeSpeAtkBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK increased!`
                                })
                            }
                        } else if(attack.stat === 'SPEDEF') {
                            if(currAllySpeDefBoost >= 4){
                                currFoeSpeDefBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF cannot go up any further!`
                                })
                            } else if (currAllySpeDefBoost < 1) {
                                currAllySpeDefBoost = currAllySpeDefBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF increased!`
                                })
                            } else {
                                currFoeSpeDefBoost += attack.potency / 100
                                if(currFoeSpeDefBoost > 4){
                                    currFoeSpeDefBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF increased!`
                                })
                            }
                            
                        } else if(attack.stat === 'SPD') {
                            if(currFoeSpdBoost >= 4){
                                currFoeSpdBoost = 4
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD cannot go up any further!`
                                })
                            } else if (currAllySpdBoost < 1) {
                                currAllySpdBoost = currAllySpdBoost / (attack.potency / 100)
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD increased!`
                                })
                            } else {
                                currFoeSpdBoost += attack.potency / 100
                                if(currFoeSpdBoost > 4){
                                    currFoeSpdBoost = 4
                                }
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD increased!`
                                })
                            }
                        }
                    }
                } else if(attack.effect === 'decreaseStats'){
                    if(!recipient.isEnemy) {
                        if(attack.stat === 'ATK'){
                            //if max lowered
                            if(currAllyAtkBoost < 0.1778){
                                currAllyAtkBoost = 0.1778
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK cannot be decreased any further!`
                                })
                            //if above baseline
                            } else if (currAllyAtkBoost > 1) {
                                currAllyAtkBoost = currAllyAtkBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s ATK decreased!`
                                })
                            // if normal/below baseline and not maxed
                            } else {
                                currAllyAtkBoost = currAllyAtkBoost * 0.75
                                if(currAllyAtkBoost < 0.1778){
                                    currAllyAtkBoost = 0.1778
                                }
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK decreased!`
                                })
                            }
                        } else if(attack.stat === 'DEF') {
                            if(currAllyDefBoost < 0.1778){
                                currAllyDefBoost = 0.1778
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF cannot be decreased any further!`
                                })
                            } else if (currAllyDefBoost > 1) {
                                currAllyDefBoost = currAllyDefBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s DEF decreased!`
                                })
                            } else {
                                currAllyDefBoost = currAllyDefBoost * 0.75
                                if(currAllyDefBoost < 0.1778){
                                    currAllyDefBoost = 0.1778
                                }
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPEATK') {
                            if(currAllySpeAtkBoost < 0.1778){
                                currAllySpeAtkBoost = 0.1778
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK cannot be decreased any further!`
                                })
                            } else if (currAllySpeAtkBoost > 1) {
                                currAllySpeAtkBoost = currAllySpeAtkBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SpeATK decreased!`
                                })
                            } else {
                                currAllySpeAtkBoost = currAllySpeAtkBoost * 0.75
                                if(currAllySpeAtkBoost < 0.1778){
                                    currAllySpeAtkBoost = 0.1778
                                }
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPEDEF') {
                            if(currAllySpeDefBoost < 0.1778){
                                currAllySpeDefBoost = 0.1778
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF cannot be decreased any further!`
                                })
                            } else if (currAllySpeDefBoost > 1) {
                                currAllySpeDefBoost = currAllySpeDefBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SpeDEF decreased!`
                                })
                            } else {
                                currAllySpeDefBoost = currAllySpeDefBoost * 0.75
                                if(currAllySpeDefBoost < 0.1778){
                                    currAllySpeDefBoost = 0.1778
                                }
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPD') {
                            if(currAllySpdBoost < 0.1778){
                                currAllySpdBoost = 0.1778
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD cannot be decreased any further!`
                                })
                            } else if (currAllySpdBoost > 1) {
                                currAllySpdBoost = currAllySpdBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SPD decreased!`
                                })
                            } else {
                                currAllySpdBoost = currAllySpdBoost * 0.75
                                if(currAllySpdBoost > 0.1778){
                                    currAllySpdBoost = 0.1778
                                }
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#playerEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#playerEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD decreased!`
                                })
                            }
                        }
                    } else if(recipient.isEnemy){
                        if(attack.stat === 'ATK'){
                            //if max lowered
                            if(currFoeAtkBoost < 0.177978515625){
                                currFoeAtkBoost = 0.177978515625
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK cannot be decreased any further!`
                                })
                            //if above baseline
                            } else if (currFoeAtkBoost > 1) {
                                currFoeAtkBoost = currFoeAtkBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s ATK decreased!`
                                })
                            // if normal/below baseline and not maxed
                            } else {
                                currFoeAtkBoost = currFoeAtkBoost * 0.75
                                if(currFoeAtkBoost <= 0.177978515625){
                                    currFoeAtkBoost = 0.177978515625
                                }
                                r.style.setProperty('--statsChangeColor', 'red')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s ATK decreased!`
                                })
                            }
                        } else if(attack.stat === 'DEF') {
                            if(currFoeDefBoost <= 0.177978515625){
                                currFoeDefBoost = 0.177978515625
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF cannot be decreased any further!`
                                })
                            } else if (currFoeDefBoost > 1) {
                                currFoeDefBoost = currFoeDefBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s DEF decreased!`
                                })
                            } else {
                                currFoeDefBoost = currFoeDefBoost * 0.75
                                if(currFoeDefBoost <= 0.177978515625){
                                    currFoeDefBoost = 0.177978515625
                                }
                                r.style.setProperty('--statsChangeColor', 'green')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s DEF decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPEATK') {
                            if(currFoeSpeAtkBoost <= 0.177978515625){
                                currFoeSpeAtkBoost = 0.177978515625
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK cannot be decreased any further!`
                                })
                            } else if (currFoeSpeAtkBoost > 1) {
                                currFoeSpeAtkBoost = currFoeSpeAtkBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SpeATK decreased!`
                                })
                            } else {
                                currFoeSpeAtkBoost = currFoeSpeAtkBoost * 0.75
                                if(currFoeSpeAtkBoost <= 0.177978515625){
                                    currFoeSpeAtkBoost = 0.177978515625
                                }
                                r.style.setProperty('--statsChangeColor', 'orange')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeATK decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPEDEF') {
                            if(currFoeSpeDefBoost <= 0.177978515625){
                                currFoeSpeDefBoost = 0.177978515625
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF cannot be decreased any further!`
                                })
                            } else if (currFoeSpeDefBoost > 1) {
                                currFoeSpeDefBoost = currFoeSpeDefBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SpeDEF decreased!`
                                })
                            } else {
                                currFoeSpeDefBoost = currFoeSpeDefBoost * 0.75
                                if(currFoeSpeDefBoost <= 0.177978515625){
                                    currFoeSpeDefBoost = 0.177978515625
                                }
                                r.style.setProperty('--statsChangeColor', 'yellow')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SpeDEF decreased!`
                                })
                            }
                        } else if(attack.stat === 'SPD') {
                            if(currFoeSpdBoost <= 0.177978515625){
                                currFoeSpdBoost = 0.177978515625
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD cannot be decreased any further!`
                                })
                            } else if (currFoeSpdBoost > 1) {
                                currFoeSpdBoost = currFoeSpdBoost -= 0.5
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${recipient.name}'s SPD decreased!`
                                })
                            } else {
                                currFoeSpdBoost = currFoeSpdBoost * 0.75
                                if(currFoeSpdBoost <= 0.177978515625){
                                    currFoeSpdBoost = 0.177978515625
                                }
                                r.style.setProperty('--statsChangeColor', 'cyan')
                                document.querySelector('#enemyEffect').style.display = 'block'
                                setTimeout(() =>{
                                    document.querySelector('#enemyEffect').style.display = 'none'
                                }, 1000)
                                queue.splice(1, 0, () =>{
                                    document.querySelector('#dialogueBox').textContent = `${this.name}'s SPD decreased!`
                                })
                            }
                        }
                    }
                }
                if(attack.effect === 'Heal'){
                    let healAmount = Math.floor(attack.potency * user.stats.HP / 100)
                    if(healAmount + user.currHP > user.stats.HP){
                        user.currHP = user.stats.HP
                    } else user.currHP += healAmount
                }
            }
        }

        let havePPLeft = true
        let attackMissed

        // manage pp

        if(!this.isEnemy && !immuned){
            for(let i = 0; i < this.attacks.length; i++){
                if(this.attacks[i].name === attack.name){
                    if(this.attacks[i].pp < 1){
                        document.querySelector('#dialogueBox').textContent = `${attack.name} has no more pp.`
                        attackInProcess = false
                        havePPLeft = false
                        queue.splice(0,0,() =>{
                            queue = []
                        })
                        return
                    } else {
                        this.attacks[i].pp--
                        if(Math.floor(Math.random() * 100) <= attack.accuracy){
                            attackCalculation(attack, recipient)
                        } else {
                            attackMissed = true
                            queue.splice(1, 0, () =>{
                                document.querySelector('#dialogueBox').textContent = `${this.name} missed ${attack.name}!....`
                                attackInProcess = false
                            })
                            queue[0]()
                            return
                        }
                    }
                }
            }
        } else if (this.isEnemy) {
            if(Math.floor(Math.random() * 100) <= attack.accuracy){
                attackCalculation(attack, recipient)
                attack.pp--
            } else {
                attackMissed = true
                queue.splice(0, 0, () =>{
                    document.querySelector('#dialogueBox').textContent = `${this.name} missed ${attack.name}!....`
                    attackInProcess = false
                })
                queue[0]()
                return
            }
        }

        if(!havePPLeft || attackMissed) return

        // move animations

        let movementDistance
        switch (attack.name){
            // Physical Attacks

            // Normal
            case 'Tackle':
                const tackleTl = gsap.timeline()
                movementDistance = 20
                if (this.isEnemy) movementDistance= -20
                tackleTl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.tackleHit.play()
                        gsap.to(enemyHealthbar, {
                            width: hpInPercentBattle + '%',
                            onComplete: () =>{
                            }
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 25,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x - 20,
                    onComplete: () =>{
                        attackInProcess = false
                    },
                })
                break

            // Fighting
            case 'Lokick':
                const LockickImage = new Image()
                LockickImage.src = './img/move_animation/Lokick.png'
                const Lokick = new Sprite({
                    position: {
                        x: recipient.position.x,
                        y: recipient.position.y
                    },
                    image: LockickImage,
                    frames: {
                        max: 4,
                        hold: 15
                    },
                    animate: true,
                    rotation,
                })
                if(this.isEnemy){
                    Lokick.position = {
                        x: recipient.position.x + 175,
                        y: recipient.position.y + 175
                    }
                } else {
                    Lokick.position = {
                        x: recipient.position.x - 75,
                        y: recipient.position.y
                    }
                }
                renderedSprites.splice(2, 0, Lokick)
                setTimeout(() =>{
                    renderedSprites.splice(2, 1)
                }, 600)
                const lokickTl = gsap.timeline()
                movementDistance = 20
                if (this.isEnemy) movementDistance= -20
                lokickTl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.tackleHit.play()
                        gsap.to(enemyHealthbar, {
                            width: hpInPercentBattle + '%',
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 25,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x - 20,
                    onComplete: () =>{
                        attackInProcess = false
                    },
                })
                break
            
            // Special Attacks

            // Fire
            case 'Fireball':
                audio.initFireball.play()
                const fireballImage = new Image()
                fireballImage.src = './img/move_animation/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x + 150,
                        y: this.position.y + 100
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 15
                    },
                    animate: true,
                })
                renderedSprites.splice(2, 0, fireball)
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    duration: 0.75,
                    onComplete: () =>{
                        audio.fireballHit.play()
                        renderedSprites.splice(2, 1)
                        gsap.to(enemyHealthbar, {
                            width: hpInPercentBattle + '%',
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 25,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
                            onComplete: () =>{
                                attackInProcess = false
                            },
                        })
                    }
                })
                break

            // Ghost
            case 'Strangering': 
                const StrangeringImage = new Image()
                StrangeringImage.src = './img/move_animation/strangering.png'
                const Strangering = new Sprite({
                    image: StrangeringImage,
                    frames: {
                        max: 4,
                        hold: 15
                    },
                    animate: true,
                    rotation
                })
                if(this.isEnemy){
                    Strangering.position = {
                        x: recipient.position.x + 200,
                        y: recipient.position.y + 175
                    }
                } else {
                    Strangering.position = {
                        x: recipient.position.x - 75,
                        y: recipient.position.y
                    }
                }
                renderedSprites.splice(2, 0, Strangering)
                setTimeout(() =>{
                    renderedSprites.splice(2, 1)
                }, 600)
                audio.psyAttack1.play()
                gsap.to(Strangering.position, {
                    x: Strangering.position.x,
                    y: Strangering.position.y,
                    duration: 0.5,
                    onComplete: () =>{
                        renderedSprites.splice(2, 1)
                        gsap.to(enemyHealthbar, {
                            width: hpInPercentBattle + '%',
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 25,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
                            onComplete: () =>{
                                attackInProcess = false
                            },
                        })
                    }
                })
                break
            
            // Status

            // Stats

            // Increase

            case 'Buff':
                setTimeout(() =>{
                    attackInProcess = false
                }, 750)
                break

            // Decrease

            case 'Growl':
                setTimeout(() =>{
                    attackInProcess = false
                }, 750)
                break

            // Heal
            case 'Rest': 
                // Animation pour Rest a mettre
                user.frames.hold = 500
                if(hpInPercentBattle > 100){
                    hpInPercentBattle = 100
                } 
                const restImage = new Image()
                restImage.src = './img/move_animation/rest.png'
                const rest = new Sprite({
                    position: {
                        x: this.position.x + 150,
                        y: this.position.y - 150
                    },
                    image: restImage,
                    frames: {
                        max: 4,
                        hold: 50
                    },
                    animate: true,
                    rotation: '0deg'
                })
                renderedSprites.splice(2, 0, rest)
                gsap.to(rest.position, {
                    y: -50,
                    duration: 3
                })
                userHPDisplay.textContent = Math.ceil(user.currHP) + '/' + user.stats.HP
                changeHP()
                gsap.to(playerHealthbar, {
                    width: hpInPercentBattle + '%',
                    onComplete: () => {
                        user.frames.hold = 50,
                        gsap.to(rest, {
                            opacity: 0,
                            duration: 1,
                            onComplete: () =>{
                                renderedSprites.splice(2, 1)
                                attackInProcess = false
                            }
                        })
                    }
                })
                break
        }
        changeHP()
        this.position = prevAttackerPos
    }  

    faint(opponent) {
        let currExpGain
        let changeMove
        let forgottenAttack
        let learnedAttack
        lastLeedPogemon = team[0]

        this.fainted = true
        this.frames.hold = 0

        document.querySelector('#dialogueBox').textContent = this.name + ' fainted!' 

        const playerExpbarDOM = document.querySelector('#playerExpbar')
        const playerInfoDOM = document.querySelector('#playerInfo')

        let expGained = () =>{
            let expModifier = 1
            if (trainerBattle){
                expModifier =+ 1.5
            }
            let isItemBonusExp = false
            const A = (this.currLevel * 2) + 10
            const B = (this.expYield * this.currLevel / 5)
            const C = (this.currLevel + opponent.currLevel + 10)
            currExpGain =  (Math.floor(Math.floor(Math.sqrt(A)*(A*A))*B/Math.floor(Math.sqrt(C)*(C*C))) + 1) * expModifier
            opponent.currExp = opponent.currExp + Math.floor(currExpGain)
        }

        let buttonMouseEnter = e =>{
            const selectedAttack = attacks[e.currentTarget.textContent]
            document.querySelector('#attackName').textContent = `${selectedAttack.name}`
            document.querySelector('#attackType').textContent = `${selectedAttack.element}`
            document.querySelector('#attackPotency').textContent = `potency : ${selectedAttack.potency}`
            document.querySelector('#attackAccuracy').textContent = `potency : ${selectedAttack.accuracy}`
            currAlly.attacks.forEach(attack =>{
                if(selectedAttack.name === attack.name){
                    document.querySelector('#attackPP').textContent = `pp : ${attack.pp}`
                }
            })
            const attackType = document.querySelector('#attackType')
            if (selectedAttack.element === 'normal') attackType.style.color = 'grey'
            else if (selectedAttack.element === 'fighting') attackType.style.color = '#DD7E6B'
            else if (selectedAttack.element === 'fire') attackType.style.color = 'red'
            else if (selectedAttack.element === 'ghost') attackType.style.color = 'darkgrey'
        }

        let attackButtonOnClick = e =>{
            const selectedAttack = attacks[e.currentTarget.textContent]
            _doActionNoSpam(selectedAttack)
        }

        let currLevel
        let prevLevel = Math.floor(opponent.currLevel)
        let prevStats
        prevStats = opponent.stats

        if(this.isEnemy){
            if(Math.floor(opponent.currLevel) >= 100) {
                opponent.currLevel = 100
                opponent.expNeededForNextLevel = 0
                switch(opponent.expCurve){
                    case 'normalExpCurve': 
                        opponent.currExp = 1000000
                        break
                    case 'fastExpCurve': 
                    opponent.currExp = 75000
                    break
                    case 'slowExpCurve': 
                        opponent.currExp = 1250000
                        break
                }
            } else {
                expGained()
                if(Math.floor(opponent.currLevel) === 100) {
                    switch(opponent.expCurve){
                        case 'normalExpCurve': 
                            opponent.currExp = 1000000
                            break
                        case 'fastExpCurve': 
                        opponent.currExp = 75000
                        break
                        case 'slowExpCurve': 
                            opponent.currExp = 1250000
                            break
                    }
                }
                queue.push(() =>{
                    document.querySelector('#dialogueBox').innerText = `${this.name} fainted! \n\n ${opponent.name} gained ${Math.floor(currExpGain)} EXP.`
                    opponent.currLevel = defineCurrPogemonCurve(opponent)
                    currLevel = Math.floor(opponent.currLevel)
                    if(prevLevel < currLevel){
                        definePogemonStats(opponent)
                        let levelUpHp
                        if(opponent.currHP + (opponent.stats.HP / 10) >= opponent.stats.HP){
                            levelUpHp = opponent.stats.HP
                        } else {
                            levelUpHp = opponent.currHP + (opponent.stats.HP / 10)
                        }
                        opponent.currHP = levelUpHp
                        document.querySelector('#levelUpDisplayContainer').style.display = 'grid'
                        document.querySelector('#playerHPDisplay').textContent = Math.floor(opponent.currHP) + '/' + opponent.stats.HP
                        document.querySelector('#levelUpLvlDisplay').textContent = currLevel
                        document.querySelector('#levelUpHp').textContent = opponent.stats.HP - prevStats.HP + ' + ' + prevStats.HP
                        document.querySelector('#levelUpAtk').textContent = opponent.stats.Atk - prevStats.Atk + ' + ' + prevStats.Atk
                        document.querySelector('#levelUpDef').textContent = opponent.stats.Def - prevStats.Def + ' + ' + prevStats.Def
                        document.querySelector('#levelUpSpAtk').textContent = opponent.stats.SpAtk - prevStats.SpAtk + ' + ' + prevStats.SpAtk
                        document.querySelector('#levelUpSpDef').textContent = opponent.stats.SpDef - prevStats.SpDef + ' + ' + prevStats.SpDef
                        document.querySelector('#levelUpSpd').textContent = opponent.stats.Spd - prevStats.Spd + ' + ' + prevStats.Spd
                        let hpInPercent = 100 * Math.floor(opponent.currHP) / opponent.stats.HP
                        document.querySelector('#playerHealthbar').style.width = hpInPercent + '%'
                        levelUp = true
                        gsap.to('#levelUpDisplayContainer', {
                            left: 82.5 + '%',
                            duration: 1
                        })
                        // push new attack here
                        let newAttacks = []
                        opponent.attackPool.forEach(attack =>{
                            if(!attack.learned && Math.floor(opponent.currLevel) >= attack.lvl){
                                newAttacks.push(attack)
                            }
                        })
                        let changeMoveDecision = () =>{
                            if(mouse.event.target.textContent === 'cancel'){
                                queue.splice(0, 0, () =>{
                                    for(let i = 0; i < opponent.attackPool.length; i++){
                                        if(opponent.currLevel >= opponent.attackPool[i].lvl && !opponent.attackPool[i].learned){
                                            newAttacks = opponent.attackPool.filter(attack => attack.learned !== true)
                                        }
                                    }
                                    changeMove = true
                                    document.querySelector('#dialogueBox').textContent = `${opponent.name} did not learn ${newAttacks[0].move.name}`
                                    document.querySelector('#changeAttacksBox').style.display = 'none'
                                    document.querySelector('#newAttackInfo').style.display = 'none'
                                    document.querySelector('#attacksBox').style.display = 'grid'
                                    document.querySelector('#attackInfo').style.display = 'none'
                                    document.querySelector('#dialogueBox').style.display = 'block'
                                })
                                queue[0]()
                                queue.shift()
                                queue.shift()
                            }
                        }

                        let chooseIfMoveChanges = () =>{
                            document.querySelector('#dialogueBox').removeEventListener('click', _doActionNoSpamChangeBattleAction, true)
                            switch(mouse.event.target.textContent){
                                case 'yes':
                                    queue.splice(0, 0, () =>{
                                        changeMove = true
                                        document.querySelector('#answerButtonContainer').style.display = 'none'
                                        document.querySelector('#dialogueBox').style.display = 'none'
                                        document.querySelector('#attacksBox').style.display = 'none'
                                        document.querySelector('#attackInfo').style.display = 'none'
                                        document.querySelector('#newAttackInfo').style.display = 'grid'
                                        document.querySelector('#changeAttacksBox').style.display = 'grid'
                                        document.querySelector('#changeAttacksBox').replaceChildren()
                                        for(let j = 0; j < opponent.attacks.length; j++){
                                            const button = document.createElement('button')
                                            button.textContent = opponent.attacks[j].name
                                            button.tabIndex  = '3'
                                            button.setAttribute('id', `${j}`)
                                            button.setAttribute('class', `changeAttackButton`)
                                            button.addEventListener('mouseenter', buttonMouseEnter, true)
                                            document.querySelector('#changeAttacksBox').append(button)
                                        } 
                                        document.querySelector('#newAttackName').textContent = `${learnedAttack.name}`
                                        document.querySelector('#newAttackType').textContent = `${learnedAttack.element}`
                                        document.querySelector('#newAttackPotency').textContent = `potency : ${learnedAttack.potency}`
                                        document.querySelector('#newAttackAccuracy').textContent = `pp : ${learnedAttack.accuracy}`
                                        document.querySelector('#newAttackPP').textContent = `pp : ${learnedAttack.pp}`
                                        document.querySelector('#newAttackDesc').textContent = `${learnedAttack.description}`                
                                        document.querySelectorAll('.changeAttackButton').forEach(button =>{
                                            button.addEventListener('click', chooseMoveToChange, true)
                                        })
                                        document.querySelector('#newAttackCancelButton').addEventListener('click', changeMoveDecision, true)
                                        document.removeEventListener('click', chooseIfMoveChanges, true)
                                        document.querySelector('#dialogueBox').addEventListener('click', _doActionNoSpamChangeBattleAction, true)
                                    })
                                    queue[0]()
                                    break
                                case 'no':
                                    queue.splice(0, 0, () =>{
                                        for(let i = 0; i < opponent.attackPool.length; i++){
                                            if(opponent.currLevel >= opponent.attackPool[i].lvl && !opponent.attackPool[i].learned){
                                                newAttacks = opponent.attackPool.filter(attack => attack.learned !== true)
                                            }
                                        }
                                        changeMove = true
                                        document.querySelector('#dialogueBox').textContent = `${opponent.name} did not learn ${newAttacks[0].move.name}`
                                        document.querySelector('#answerButtonContainer').style.display = 'none'
                                    })
                                    queue[0]()
                                    document.removeEventListener('click', chooseIfMoveChanges, true)
                                    document.querySelector('#dialogueBox').addEventListener('click', _doActionNoSpamChangeBattleAction, true)
                                    break
                            }
                        }

                        let chooseMoveToChange = () =>{
                            //opponent is opponent of the pogemon that currently fainted, in this case, the player being the opponent of the AI // unclear lmao
                            document.querySelector(`#attackEventContainer`).style.display = 'none'
                            document.querySelector(`#changeAttacksBox`).style.display = 'none'
                            document.querySelector(`#attacksBox`).style.display = 'grid'
                            document.querySelector('#dialogueBox').style.display = 'block'
                            for(let i = 0; i < opponent.attackPool.length; i++){
                                if(opponent.currLevel >= opponent.attackPool[i].lvl && !opponent.attackPool[i].learned){
                                    newAttacks = opponent.attackPool.filter(attack => attack.learned !== true)
                                }
                            }
                            forgottenAttack = opponent.attacks[mouse.event.target.id].name
                            opponent.attacks[mouse.event.target.id] = newAttacks[0].move
                            document.querySelectorAll(`.changeAttackButton`)[mouse.event.target.id].textContent = newAttacks[0].move.name
                            document.querySelector(`#attacksBox`).replaceChildren()
                            for(let i = 0; i < opponent.attacks.length; i++){
                                newAttacks[0].learned = true
                                document.querySelector('#dialogueBox').textContent = `${opponent.name} learned ${newAttacks[0].move.name} and forgot ${forgottenAttack}!`
                                document.querySelector('#newAttackInfo').style.display = 'none'
                                const button = document.createElement('button')
                                button.textContent = opponent.attacks[i].name
                                button.tabIndex  = '3'
                                button.setAttribute('class', `attackButton`)
                                button.addEventListener('click', attackButtonOnClick , true)
                                button.addEventListener('mouseenter', buttonMouseEnter, true)
                                document.querySelector(`#attacksBox`).append(button)
                            }
                            document.querySelector(`#dialogueBox`).style.display = 'block'
                            document.querySelector(`#attackEventContainer`).style.display = 'flex'
                            document.removeEventListener('click', chooseMoveToChange, true)
                            queue.shift()
                        }
                        if(newAttacks !== undefined){
                            for(let i = 0; i < newAttacks.length; i++){
                                if(opponent.attacks.length <= 3){
                                    queue.splice(i + 3, 0, () =>{
                                            document.querySelector('#dialogueBox').textContent = `${opponent.name} learned ${newAttacks[i].move.name}!`
                                    })
                                    newAttacks[i].learned = true
                                    opponent.attacks.push(newAttacks[i].move)
                                    const button = document.createElement('button')
                                    button.textContent = newAttacks[i].move.name 
                                    button.tabIndex  = '3'
                                    button.setAttribute('class', `attackButton`)
                                    button.addEventListener('mouseenter', buttonMouseEnter, true)
                                    button.addEventListener('click', attackButtonOnClick, true)
                                    document.querySelector('#attacksBox').append(button)
                                } else if (opponent.attacks.length >= 4) {
                                    // ask if willing to switch moves here
                                    queue.splice(i + 3, 0, () =>{
                                        newAttacks = opponent.attackPool.filter(attack => attack.learned !== true)
                                        i = 0
                                        learnedAttack = newAttacks[i].move
                                        document.querySelector('#dialogueBox').textContent = `${opponent.name} is trying to learn ${newAttacks[i].move.name}!`
                                        queue.splice(1, 0, () =>{
                                            document.querySelector('#dialogueBox').textContent = `Do you want to teach ${learnedAttack.name} to ${opponent.name}?`
                                            document.querySelector('#answerButtonContainer').style.display = 'grid'
                                            document.addEventListener('click', chooseIfMoveChanges, true)
                                            document.querySelectorAll('.attackBox').forEach(button =>{
                                                button.addEventListener('click', attackButtonOnClick, true)
                                            })
                                        })
                                    })
                                }
                            }
                        }
                    }
                    playerInfoDOM.textContent = opponent.name + ' Lv ' + Math.floor(opponent.currLevel)
                    playerExpbarDOM.style.width = team[0].expInPerCent + '%'
                })
            }
            queue.push(() =>{
                document.querySelector('#levelUpHp').textContent = opponent.stats.HP
                document.querySelector('#levelUpAtk').textContent = opponent.stats.Atk
                document.querySelector('#levelUpDef').textContent = opponent.stats.Def
                document.querySelector('#levelUpSpAtk').textContent = opponent.stats.SpAtk
                document.querySelector('#levelUpSpDef').textContent = opponent.stats.SpDef
                document.querySelector('#levelUpSpd').textContent = opponent.stats.Spd
            })
            queue.push(() =>{
                gsap.to('#levelUpDisplayContainer', {
                    left: 120 + '%'
                })
            })
        }

        if(currFoeTeam.length >= 2){
            queue.push(() =>{
                //switch
                if(this.isEnemy){
                    if (trainerBattle === true){
                        document.querySelector('#dialogueBox').textContent = this.name + ' entered the battlefield!' 
                        currFoeTeam.shift()
                        currFoe = currFoeTeam[0]
                        definePogemonStats(currFoe)
                        currFoe.currHP = currFoe.stats.HP
                        currFoe.position = {
                            x: 1400,
                            y: 0
                        }
                        renderedSprites = [currAlly, currFoe]
                        let hpInPercentFaint = 100 * currFoe.currHP / currFoe.stats.HP
                        let currColor
                        if (hpInPercentFaint > 50) {
                            currColor = 'green'
                        } else if (hpInPercentFaint > 25 && hpInPercentFaint <= 50){
                            currColor = 'orange'
                        } else if (hpInPercentFaint <= 25) {
                            currColor = 'red'
                        }
                        gsap.to('#enemyHealthbar', {
                            width: hpInPercentFaint + '%',
                            backgroundColor: currColor
                        })
                        document.querySelector('#enemyHPDisplay').style.color = currColor
                        defineEnnemyInfo()
                    } else speedModifier = 1
                } else {
                    
                }
                gsap.to(this.position,{
                    y: this.position.y + 20
                })
                gsap.to(this, {
                    opacity: 0
                })
            })
        }

        checkIfTeamKnockedOut()
        if(teamFainted){
            //this is fucky
            audio.battle.stop()
            audio.map.stop()
            audio.gameOver3.play()
            document.querySelector('#battleScene').style.display = 'none'
            document.querySelector('#KOContainer').style.display ='flex'
            gsap.to('#overlappingDiv', {
                opacity: 1,
                duration: 0.4,
                onComplete: () =>{
                    let refreshAfterLosing = e =>{
                        if(e.target.id === 'KOText'){
                            document.location.reload()
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 1,
                            })
                            document.removeEventListener('click', e => refreshAfterLosing(e))
                        }
                    }   
                    document.addEventListener('click', e => refreshAfterLosing(e))
                }
            })
        }

        if(opponent.isEnemy){
            currFoeAtkBoost = 1
            currFoeDefBoost = 1
            currFoeSpeAtkBoost = 1
            currFoeSpeDefBoost = 1
            currFoeSpdBoost = 1
        }
    }      


    catch(currPogemon){
        if(team[0] !== undefined){
            let pogeballImage = new Image()
            pogeballImage.src = 'img/battle_scene/pogeballs/pogeball.png'
    
            let pogeballSprite = new Sprite({
                position: {
                    x: 0,
                    y: 350
                },
                image: pogeballImage,
                frames: {
                    max: 4,
                    hold: 20
                },
                animate: true
            })
    
            renderedSprites.splice(2, 0, pogeballSprite)
    
            gsap.to(pogeballSprite.position, {
                x: currPogemon.position.x + 125,
                y: currPogemon.position.y,
                duration: 0.75,
                onComplete: () =>{
                    pogeballSprite.animate = false
                    gsap.to(currPogemon, {
                        opacity: 0
                    })
                    gsap.to(pogeballSprite.position, {
                        x: currPogemon.position.x + 125,
                        y: currPogemon.position.y + 250,
                    })
                }
            })
    
            // put catch rate here
    
            let ballModifier = 1
    
            let statusModifier = 1
    
            let catchValue = ((( 3 * currPogemon.stats.HP - 2 * currPogemon.currHP ) * (currPogemon.catchRate * ballModifier ) / (3 * currPogemon.stats.HP) ) * statusModifier)
    
            let catchRNG = Math.floor(Math.random() * 100 + catchValue) 

            let engageCatch = false

            if(!engageCatch){
                if(catchRNG >= 100){
                    //catch
                    audio.battle.stop()
                    queue.push(() =>{
                        document.querySelector('#dialogueBox').textContent = `You caught ${currPogemon.name}!!!`
                        renderedSprites.splice(2, 1)
                        queue.push(() =>{
                            queue = []
                            let caughtPogemon = new Pogemon(currPogemon)
                            definePogemonStats(caughtPogemon)
                            caughtPogemon.currExp = Math.pow(currPogemon.currLevel, 3)
                            defineCurrPogemonCurve(caughtPogemon, 'catch')
                            caughtPogemon.currHP = currPogemon.currHP
                            console.log(caughtPogemon.abilities[0])
                            caughtPogemon.currAbility = caughtPogemon.abilities[0]
                            //will make player catch pogemon
                            document.querySelector('#battleScene').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                duration: 0.5,
                                onComplete: () => {
                                    gsap.to('#overlappingDiv', {
                                        opacity: 0,
                                        duration: 0.5,
                                    })
                                    battle.initiated = false
                                    audio.map.play()
                                    cancelAnimationFrame(animateBattleId)
                                    animate()
                                }
                            })
                            caughtPogemon.globalId = newGlobalId()
                            if (team.length <= 5){
                                team.push(caughtPogemon)
                            } else if (team.length >= 6){
                                for(let i = 0; i < pogemonStorage.length; i++){
                                    if (pogemonStorage[i].length <= 30){
                                        pogemonStorage[i].push(caughtPogemon)
                                        return
                                    } else return
                                }
                            }
                            defineCurrTeamMenuInfo()
                        })
                        queue[0]
                    })
                } else {
                    queue.push(() =>{
                        document.querySelector('#dialogueBox').textContent = `Darn! ${currPogemon.name} broke free!!!!`
                        renderedSprites.splice(2, 1)
                        gsap.to(currPogemon, {
                            opacity: 1,
                            onComplete: () =>{
                                chooseRandomAttack()
                                if(!faintSwitch){
                                    queue.push(() =>{
                                        currFoe.attack({ 
                                            attack: randomAttack,
                                            recipient: currAlly,
                                            renderedSprites
                                        })
                                        if(currAlly.currHP < 1) {
                                            queue.push(() =>{
                                                currAlly.faint(currFoe)
                                            })
                                            queue.push(() =>{
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 1,
                                                    onComplete: () => {
                                                        document.querySelector('#battleScene').style.display = 'none'
                                                        if (teamFainted){
                                                            if(battle.initiated){
                                                                queue = []
                                                                cancelAnimationFrame(animateBattleId)
                                                                animate()
                                                            }
                                                            gsap.to('#overlappingDiv', {
                                                                opacity: 0
                                                            })
                                                            battle.initiated = false
                                                            audio.map.play()
                                                        } else {
                                                            queue = []
                                                            faintSwitch = true
                                                            teamMenu.open = true
                                                            cancelAnimationFrame(animateBattleId)
                                                            animateTeamMenu()
                                                            gsap.to('#overlappingDiv', {
                                                                opacity: 0
                                                            })
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            }
                        })
                        document.addEventListener('click', menuButtonEvent, true)
                    })
                }
            }
        } else {
            let starterPogemon = new Pogemon(currPogemon)
            starterPogemon.currAbility = starterPogemon.abilities[0]
            definePogemonStats(starterPogemon)
            starterPogemon.currExp = Math.pow(currPogemon.currLevel, 3)
            defineCurrPogemonCurve(starterPogemon, 'catch')
            starterPogemon.currHP = starterPogemon.stats.HP
            team.push(starterPogemon)
            starterFlag.checked = true
        }
    }
}

class Boundary {
    static width = 64
    static height = 64
    
    constructor({ position, type, data }) {
        this.position = position
        this.width = 64
        this.height = 64
        this.type = type
        this.data = data
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Trainer extends Boundary {
    static width = 64
    static height = 64

    constructor({ position, type, data, direction }) {
        super(
            position
        )
        this.position = position
        this.width = 64
        this.height = 64
        this.type = type
        this.direction = direction
        this.data = data
    }

    defeat(){
        battleMusicPlaying = false
        maps[currMap.name].trainerArray[currTrainer.index].defeated = true
        currMap.trainerArray[currTrainer.index].defeated = true
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}