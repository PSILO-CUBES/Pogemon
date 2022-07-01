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
    globalId,
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
    this.globalId = globalId
    }

    attack({attack, recipient, renderedSprites}) {
        let superEffective = false
        let notEffective = false
        let immuned = false
        let STAB = false

        if(this.type.type1 === attack.element || this.type.type2 === attack.element){
            STAB = true
        }

        if(types[recipient.type.type1].superEffective.includes(attack.element) || types[recipient.type.type2].superEffective.includes(attack.element)){
            superEffective = true
            document.querySelector('#dialogueBox').innerHTML = `${this.name} used  ${attack.name} on ${recipient.name} <br><br> it's super effective!!!` 
        } else if(types[recipient.type.type1].notEffective.includes(attack.element) || types[recipient.type.type2].notEffective.includes(attack.element)){
            notEffective = true
            document.querySelector('#dialogueBox').innerHTML = `${this.name} used ${attack.name} on ${recipient.name} <br><br> but it's not very effective on ${recipient.name}..` 
        } else if(types[recipient.type.type1].immuned.includes(attack.element) || types[recipient.type.type2].immuned.includes(attack.element)){
            immuned = true
            document.querySelector('#dialogueBox').innerHTML = `${this.name} used attack.name on ${recipient.name} <br><br> but ${recipient.name} is immuned...`
        } else {
            document.querySelector('#dialogueBox').innerHTML = `${this.name} used ${attack.name} on ${recipient.name}`
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

        // attack effectivness


        // let checkEffectivness = ( attackType, recipientType ) => {
        //     if(attackType)
        // }

        
        console.log(recipient)

        let rollRange = getRandomInt(9, 12)

        // damage Calculation would go here
        let E = 1
        let S = 1

        let damageCalculation = ( attack, recipient ) =>{
            if (attack.type === 'Physical'){
                let physDamage = Math.floor(attack.potency * (user.stats.Atk/recipient.stats.Def) / 10) * rollRange
                if (physDamage <= 0) physDamage = 1
                if(superEffective){
                    E = 1.5
                } else if(notEffective){
                    E = 0.5
                } else if(immuned){
                    physDamage = 0
                }
                if(STAB){
                    S = 1.5
                }
                recipient.currHP -= physDamage * E * S
                console.log(physDamage)
                if(recipient.currHP < 0){
                    recipient.currHP = 0
                }
            } else if (attack.type === 'Special'){
                let speDamage = Math.floor(attack.potency * (user.stats.SpAtk/recipient.stats.SpDef) / 10) * rollRange
                console.log(this)
                if (speDamage <= 0) speDamage = 1
                if(superEffective){
                    speDamage = speDamage * 1.5
                } else if(notEffective){
                    speDamage = speDamage * 0.5
                } else if(immuned){
                    speDamage = 0
                }
                recipient.currHP -= speDamage
                if(recipient.currHP < 0){
                    recipient.currHP = 0
                }
            } else if (attack.type === 'Status'){
                if(attack.effect === 'Heal'){
                    let healAmount = Math.floor(attack.potency * user.stats.HP / 100)
                    if(healAmount + user.currHP > user.stats.HP){
                        user.currHP = user.stats.HP
                    } else user.currHP += healAmount
                }
            }

        }

        damageCalculation(attack, recipient)

        switch (attack.name){
            case 'Tackle':
                const tl = gsap.timeline()
                let movementDistance = 20
                if (this.isEnemy) movementDistance= -20
                tl.to(this.position, {
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
                    x: this.position.x - 20
                })
                break
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
                    rotation
                })
                renderedSprites.splice(1, 0, fireball)
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    duration: 0.75,
                    onComplete: () =>{
                        audio.fireballHit.play()
                        renderedSprites.splice(1, 1)
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
                        })
                    }
                })
                break
            case 'Rest': 
                // Animation pour Rest a mettre
                user.frames.hold = 500
                changeHP()
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
                renderedSprites.splice(1, 0, rest)
                gsap.to(rest.position, {
                    y: -50,
                    duration: 5
                })
                userHPDisplay.textContent = Math.ceil(user.currHP) + '/' + user.stats.HP
                gsap.to(playerHealthbar, {
                    width: hpInPercentBattle + '%',
                    onComplete: () => {
                        user.frames.hold = 100,
                        gsap.to(rest, {
                            opacity: 0,
                            duration: 1
                        })
                    }
                })
                break
        }
        changeHP()
    }  

    faint(opponent) {
        let currExpGain

        this.fainted = true

        queue.push(() =>{
            document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!' 
        })

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
                console.log('no exp awarded')
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
                    document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!' + '<br><br>' + opponent.name + ' gained ' + Math.floor(currExpGain) + ' EXP. '
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
                        let newAttacks
                        for(let i = 0; i < opponent.attackPool.length; i++){
                            if(opponent.currLevel >= opponent.attackPool[i].lvl && !opponent.attackPool[i].learned){
                                newAttacks = opponent.attackPool.filter(attack => attack.learned !== true)
                            }
                        }
                        if(newAttacks !== undefined){
                            for(let i = 0; i < newAttacks.length; i++){
                                console.log(newAttacks)
                                newAttacks[i].learned = true
                                opponent.attacks.push(newAttacks[i].move)
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
                        document.querySelector('#dialogueBox').innerHTML = this.name + ' entered the battlefield!' 
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
    }      

    catch(currPogemon){
        let caughtPogemon = new Pogemon(currPogemon)
        definePogemonStats(caughtPogemon)
        caughtPogemon.currExp = Math.pow(currPogemon.currLevel, 3)
        defineCurrPogemonCurve(caughtPogemon, 'catch')
        caughtPogemon.currHP = caughtPogemon.stats.HP
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
                audio.Map.play()
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
        currSpeed = 1
        currTrainer.data.defeated = true
        audio.battle.stop()
        audio.victory.play()
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}