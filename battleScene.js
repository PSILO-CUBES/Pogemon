const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'img/battle_scene/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: battleBackgroundImage
})

let currAlly
let currFoe
let renderedSprites
let attackInProcess
let animateBattleId
let queue = []
let menuButtonEvent
let healthBar
let displayHP
let hpInPercentBattleOnLoad
let randomAttack
let _doActionNoSpam
let currFoeTeamData = []
let switchAction = false
let lastLeedPogemon
let pogemonBeforeEvolution
let faintSwitch
let catchFailed
let openItemMenuFromBattle
let currFoeSpdBoos
let battleItemMenu = false
let newBattle = true
let disableMenuDuringAttack = false
let returnFromTeamMenu

let currAllyAtkBoost = 1
let currAllyDefBoost = 1
let currAllySpeAtkBoost = 1
let currAllySpeDefBoost = 1
let currAllySpdBoost = 1

let currFoeAtkBoost = 1
let currFoeDefBoost = 1
let currFoeSpeAtkBoost = 1
let currFoeSpeDefBoost = 1
let currFoeSpdBoost = 1

const checkIfTeamKnockedOut = () =>{
    teamFainted = team.every(pogemon => pogemon.fainted === true)
    return teamFainted
}

let defineEnnemyInfo = () =>{
    const enemyInfo = document.querySelector('#enemyInfo')
    enemyInfo.textContent = currFoe.name + ' Lv ' + currFoe.currLevel
    const enemyHPDisplay = document.querySelector('#enemyHPDisplay')
    enemyHPDisplay.textContent = Math.floor(currFoe.currHP) + '/' + currFoe.stats.HP
}

let chooseIfEvolve = (answer) =>{
    switch(answer){
        case 'yes':
            pogemonBeforeEvolution = currAlly
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    document.querySelector('#battleScene').style.display = 'none'
                    if(battle.initiated){
                        if (trainerBattle){
                            currTrainer.defeat()
                        }
                        cancelAnimationFrame(animateBattleId)
                        console.log('worke?')
                        initEvolution()
                        animateEvolution()
                        audio.battle.stop()
                    }
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                    })
                    battle.initiated = false
                }
            }) 
            break
        case 'no':
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    document.querySelector('#battleScene').style.display = 'none'
                    if(battle.initiated){
                        if (trainerBattle){
                            currTrainer.defeat()
                        }
                        removeBattleEventListener = true
                        cancelAnimationFrame(animateBattleId)
                        animate()
                        audio.map.play()
                    }
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                    })
                    battle.initiated = false
                }
            }) 
            break
    }
}

let currPogemonEvolve = () =>{
    queue.splice(0, 0, () =>{
        document.querySelector('#dialogueBox').style.display = 'none'
        document.querySelector('#evoDialogueBox').style.display = 'block'
        document.querySelector('#evoDialogueBox').innerText = `${team[0].name} is trying to evolve!! \n\n will you let ${team[0].name} evolve?`
        document.querySelector('#battleOptionsContainer').style.display = 'none'
        document.querySelector('#attackEventContainer').style.display = 'flex'
        document.querySelector('#evoButtonContainer').style.display = 'grid'
        document.querySelectorAll('#evoButtonContainer').forEach(button =>{
            button.addEventListener('click', (e) =>{chooseIfEvolve(e.target.textContent)}, { once : true })
        })
        document.querySelector('#attackInfoContainer').style.display = 'none'
        document.querySelector('#attacksBox').style.display = 'none'

    })
    queue[0]()
}

let chooseRandomAttack = () =>{
    let availableAttacks = []
    currFoe.attacks.forEach(attack =>{
        if(attack.pp > 0){
            availableAttacks.push(attack)
        }
    })
    return randomAttack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)]
}

let battleMusicPlaying = false

let changeHpWhenItemUsedDuringBattle = currPogemon =>{
    let currColor = undefined
    let currHealthbar
    let currDisplayHP
    if(currPogemon.isEnemy){
        currDisplayHP = document.querySelector('#enemyHPDisplay')
        currHealthbar = document.querySelector('#playerHealthbar')
    } else {
        currDisplayHP = document.querySelector('#playerHPDisplay')
        currHealthbar = document.querySelector('#playerHealthbar')
    }
    let hpInPercent = currPogemon.currHP * 100  / currPogemon.stats.HP
    if (hpInPercent > 50) {
        currColor = 'green'
    } else if (hpInPercent > 25 && hpInPercent <= 50){
        currColor = 'orange'
    } else if (hpInPercent <= 25) {
        currColor = 'red'
    }
    currHealthbar.style.width = hpInPercent + '%'
    currHealthbar.style.backgroundColor = currColor
    currDisplayHP.style.color = currColor
    currDisplayHP.textContent = `${Math.floor(currPogemon.currHP)}/${currPogemon.stats.HP}`
    console.log(currPogemon.currHP)
}

// initiate all battle Scenes and Menus
const initBattle = () =>{
    menu.open = false
    battle.initiated = true
    running = false
    queue = []

    let useHeldItem = (currPogemon, item) =>{
        cancelItemEscapeDuringTransition = true
        if(item.type === 'berry'){
            if(currPogemon.currHP < currPogemon.stats.HP){
                document.querySelector('#dialogueBox').textContent = `${currPogemon.name} used a ${item.name} in a pinch!`
                currPogemon.currHP = currPogemon.currHP + item.potency
                if(currPogemon.currHP >= currPogemon.stats.HP){
                    currPogemon.currHP = currPogemon.stats.HP
                }
                hpInPercent = currPogemon.currHP / 100 * currPogemon.stats.HP
                changeHpWhenItemUsedDuringBattle(currPogemon)
                inventory[item.category][item.name].amount--
                currPogemon.item = undefined
                if(battle.initiated){
                    setTimeout(() =>{
                        cancelItemEscapeDuringTransition = false
                    }, 1500)
                } else {
                    setTimeout(() =>{
                        cancelItemEscapeDuringTransition = false
                    }, 1500)
                }
            } else {
                itemUseFail()
            }
        } 
    }

    if(itemUsedDuringBattle || returnFromBagMenu || !battleSwitch){
        currAllyAtkBoost = currAllyAtkBoost
        currAllyDefBoost = currAllyDefBoost
        currAllySpeAtkBoost = currAllySpeAtkBoost
        currAllySpeDefBoost = currAllySpeDefBoost
        currAllySpdBoost = currAllySpdBoost

        currFoeAtkBoost = currFoeAtkBoost
        currFoeDefBoost = currFoeDefBoost
        currFoeSpeAtkBoost = currFoeSpeAtkBoost
        currFoeSpeDefBoost = currFoeSpeDefBoost
        currFoeSpdBoost = currFoeSpdBoost
    } else if ( battleSwitch || faintSwitch){
        currAllyAtkBoost = 1
        currAllyDefBoost = 1
        currAllySpeAtkBoost = 1
        currAllySpeDefBoost = 1
        currAllySpdBoost = 1

        currFoeAtkBoost = currFoeAtkBoost
        currFoeDefBoost = currFoeDefBoost
        currFoeSpeAtkBoost = currFoeSpeAtkBoost
        currFoeSpeDefBoost = currFoeSpeDefBoost
        currFoeSpdBoost = currFoeSpdBoost
    } else {
        currAllyAtkBoost = 1
        currAllyDefBoost = 1
        currAllySpeAtkBoost = 1
        currAllySpeDefBoost = 1
        currAllySpdBoost = 1
    
        currFoeAtkBoost = 1
        currFoeDefBoost = 1
        currFoeSpeAtkBoost = 1
        currFoeSpeDefBoost = 1
        currFoeSpdBoost = 1
    }

    if(trainerBattle && !battleMusicPlaying){
        battleMusicPlaying = true
        audio.battle.play()
    }

    audio.map.stop()

    document.removeEventListener('click', menuButtonEvent, true)

    document.querySelector('#levelUpDisplayContainer').style.display = 'none'
    document.querySelector('#levelUpDisplayContainer').style.left = '120%'
    document.querySelector('#evoButtonContainer').style.display = 'none'
    document.querySelector('#evoDialogueBox').style.display = 'none'
    document.querySelector('#battleOptionsContainer').style.display = 'grid'
    document.querySelector('#attackInfoContainer').style.display = 'none'
    document.querySelector('#attacksBox').style.display = 'grid'

    let checkIfThresholdForHeldItemIsMet = (currPogemon, item) =>{
        if(item !== undefined){
            let hpInPercent = currPogemon.currHP * 100 / currPogemon.stats.HP
            if(hpInPercent <= item.threshold){
                if(item.type === 'berry'){
                    console.log('condition met')
                    queue.splice(1, 0, () =>{
                        useHeldItem(currPogemon, item)
                    })
                }
            }
        } else {
            console.log('no item held')
        }
    }

    document.querySelector('#menuContainer').style.display = 'none'
    if(battleSwitch || returnFromBagMenu){
        currAlly = team[0]
        chooseRandomAttack()
        if(itemUsedDuringBattle){
            attackInProcess = true
            disableMenuDuringAttack = true
            document.querySelector('#attackEventContainer').style.display = 'flex'
            document.querySelector('#dialogueBox').style.display = 'flex'
            document.querySelector('#dialogueBox').textContent = `A ${selectedItem.name} was used on ${selectedItemPogemon.name}!`
            document.querySelector('#attackInfoContainer').style.display = 'none'
            document.querySelector('#battleOptionsContainer').style.display = 'none'
            setTimeout(() =>{
                attackInProcess = false
            }, 750)
        } else {
            document.querySelector('#attackEventContainer').style.display = 'none'
            document.querySelector('#battleOptionsContainer').style.display = 'grid' 
        }

        if (itemUsedDuringBattle || lastLeedPogemon){
            if(itemUsedDuringBattle || lastLeedPogemon.globalId !== currAlly.globalId){
                if(lastLeedPogemon){
                    if(lastLeedPogemon.globalId !== currAlly.globalId){
                        currAllyAtkBoost = 1
                        currAllyDefBoost = 1
                        currAllySpeAtkBoost = 1
                        currAllySpeDefBoost = 1
                        currAllySpdBoost = 1
                    
                        currFoeAtkBoost = currFoeAtkBoost
                        currFoeDefBoost = currFoeDefBoost
                        currFoeSpeAtkBoost = currFoeSpeAtkBoost
                        currFoeSpeDefBoost = currFoeSpeDefBoost
                        currFoeSpdBoost = currFoeSpdBoost

                        document.querySelector('#battleOptionsContainer').style.display = 'none'
                        document.querySelector('#attackEventContainer').style.display = 'block'
                    }
                }
                if(lastLeedPogemon){
                    if(lastLeedPogemon.globalId !== currAlly.globalId){
                        document.querySelector('#attackInfo').style.display = 'none'
                        document.querySelector('#dialogueBox').style.display = 'block'
                        document.querySelector('#dialogueBox').textContent = team[0].name + ' entered the battlefield!'
                    }
                } else if (selectedItem.category === 'pogeball') { 
                    document.querySelector('#attackInfo').style.display = 'none'
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').textContent = `You threw a ${selectedItem.name} at ${team[0].name}!`
                    attackInProcess = true
                }
                if(itemUsedDuringBattle || battleSwitch && !faintSwitch){
                    queue.push(() =>{
                        currFoe.attack({ 
                            attack: randomAttack,
                            recipient: currAlly,
                            renderedSprites
                        })
                        checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                        checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
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
                                            battleMusicPlaying = false
                                            removeBattleEventListener = true
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
                                        battleMusicPlaying = false
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
            } else {
                document.querySelector('#battleOptionsContainer').style.display = 'grid'
                document.querySelector('#attackEventContainer').style.display = 'none'
            } 
        }
        itemUsedDuringBattle = false
        battleSwitch = false
        faintSwitch = false
    } else document.querySelector('#dialogueBox').style.display = 'none'

    document.querySelector('#battleScene').style.display = 'block'
    document.querySelector('#attacksBox').replaceChildren()

    let potentialEnemyArray = []
    let potentialEnemy
    
    Object.entries(pogemons).forEach(([key, value]) =>{
        potentialEnemyArray.push(value)
    })

    potentialEnemy = potentialEnemyArray[Math.floor(Math.random() * potentialEnemyArray.length)]

    defineTeamSprite()
    
    for(let i = 0; i < team.length; i++){
        if(!team[i].fainted) {
            currAlly = team[i]
            break
        }
    }
        
    currAlly.image.src = currAlly.sprites.backAnimation.src

    currAlly.position = {
        x: 265,
        y: 90
    }

    let defineEnnemyTeam = trainer =>{
        currFoeTeamData = trainer.team
        currFoeTeam = []
        for (let i = 0; i < currFoeTeamData.length; i++){
            currFoeTeamData[i].currLevel = trainer.setTeamLevel[i]
            currFoePogemon = new Pogemon(currFoeTeamData[i])
            currFoeTeam.push(currFoePogemon)
            currFoeTeam[i].currLevel = currFoeTeamData[i].currLevel
        }
    }

    if (trainerBattle && newBattle){
        document.querySelector('#battleOptionsContainer').style.display = 'grid'
        document.querySelector('#attackEventContainer').style.display = 'none'
        defineEnnemyTeam(currTrainer.data)
        currFoe = currFoeTeam[0]
        definePogemonStats(currFoe)
        currFoe.currHP = currFoe.stats.HP
        let determineFoeAttacks = foe =>{
            foe.attackPool.forEach(attack =>{
                if(foe.currLevel >= attack.lvl){
                    if(foe.attacks.length >= 4 && !attack.learned){
                        foe.attacks.push(attack.move)
                        foe.attacks.shift()
                    } else if (foe.attacks.length <= 3 && !attack.learned) {
                        foe.attacks.push(attack.move)
                    }
                }
            })
            return foe.attacks
        }
        currFoe.attacks = determineFoeAttacks(currFoe)
    } else if (!trainerBattle && newBattle) {
        let determineFoeLevel = (min, max) =>{
            return Math.floor(min + Math.random()*(max - min + 1))
        }
        let determineFoeAttacks = foe =>{
            foe.attackPool.forEach(attack =>{
                if(foe.currLevel >= attack.lvl){
                    if(foe.attacks.length >= 4 && !attack.learned){
                        foe.attacks.push(attack.move)
                        foe.attacks.shift()
                    } else if (foe.attacks.length <= 3 && !attack.learned) {
                        foe.attacks.push(attack.move)
                    }
                }
            })
            return foe.attacks
        }
        // currFoe = new Pogemon(potentialEnemy)
        // currFoe.currLevel = determineFoeLevel(currMap.levelRange.min, currMap.levelRange.max)
        currFoe = new Pogemon(pogemons.Lokump)
        currFoe.currLevel = determineFoeLevel(7, 7)
        currFoe.attacks = determineFoeAttacks(currFoe)
        definePogemonStats(currFoe)
        currFoe.currHP = currFoe.stats.HP
        currFoe.isEnemy = true
    } else if (!trainerBattle && !newBattle) {
        // this is not right, should change it
        currFoe = new Pogemon(currFoe)
    }

    currFoe.position = {
        x: 1400,
        y: 0
    }

    // load correct pogemon HP after menu switch

    if(switchAction && trainerBattle || returnFromBagMenu && trainerBattle || returnFromTeamMenu && trainerBattle){
        definePogemonStats(currFoe)
        currFoe.currHP = currFoeTeam[0].currHP
        returnFromBagMenu = false
        returnFromTeamMenu = false
    } else if(!trainerBattle && !newBattle){
        currFoe.currHP = currFoe.currHP
    } else {
        newBattle = false
        currFoe.frames.hold = 50
        definePogemonStats(currFoe)
        currFoe.currHP = currFoe.stats.HP
    }

    
    renderedSprites = [currAlly, currFoe]
    currFoe.isEnemy = true

    renderedSprites.forEach(recipient =>{
        let healthBar = '#playerHealthbar'
        let displayHP = '#playerHPDisplay'
        let user = currAlly
        if (recipient.isEnemy){
            healthBar = '#enemyHealthbar'
            displayHP = '#enemyHPDisplay'
            user = currFoe
        }

        let currDisplayHP = document.querySelector(displayHP)
    
        let hpInPercentBattleOnLoad
    
        const changeHP = () =>{
            let currColor = undefined
            let currHealthbar = document.querySelector(healthBar)
            hpInPercentBattleOnLoad = 100 * Math.floor(user.currHP) / user.stats.HP
            if (hpInPercentBattleOnLoad > 50) {
                currColor = 'green'
            } else if (hpInPercentBattleOnLoad > 25 && hpInPercentBattleOnLoad <= 50){
                currColor = 'orange'
            } else if (hpInPercentBattleOnLoad <= 25) {
                currColor = 'red'
            }
            currHealthbar.style.width = hpInPercentBattleOnLoad + '%'
            currHealthbar.style.backgroundColor = currColor
            currDisplayHP.style.color = currColor
        }
        changeHP()
    })

    const playerInfo = document.querySelector('#playerInfo')
    playerInfo.textContent = currAlly.name + ' Lv ' + Math.floor(currAlly.currLevel)
    const playerHPDisplay = document.querySelector('#playerHPDisplay')
    playerHPDisplay.textContent = Math.floor(currAlly.currHP) + '/' + currAlly.stats.HP
    const playerExpbarBattleDOM = document.querySelector('#playerExpbar')
    if(currAlly.expInPerCent === null || currAlly.expInPerCent === undefined) playerExpbarBattleDOM.style.width = 0 + '%'
    else playerExpbarBattleDOM.style.width = currAlly.expInPerCent + '%'

    defineEnnemyInfo()

    currAlly.attacks.forEach(attack =>{
        const button = document.createElement('button')
        button.textContent = attack.name
        button.tabIndex  = '3'
        button.setAttribute('class', 'attackButton')
        document.querySelector('#attacksBox').append(button)
    })

    let attackButtonOnClick = e =>{
        disableMenuDuringAttack = true
        const selectedAttack = attacks[e.currentTarget.textContent]
        _doActionNoSpam(selectedAttack)
    }

    //option menu

    menuButtonEvent = () => {
        if(battle.initiated){
            switch(mouse.textContent){
                case 'Fight':
                    document.querySelector('#battleOptionsContainer').style.display = 'none'
                    document.querySelector('#dialogueBox').style.display = 'none'
                    document.querySelector('#attackEventContainer').style.display = 'flex'
                    document.querySelector('#attackInfo').style.display = 'grid'
                    document.querySelector('#attackInfoContainer').style.display = 'flex'
                    break
                case 'Bag':
                        bagMenu.open = true
                        battleItemMenu = true
                    break
                case 'Pogemon':
                    let teamMenuTimerId;
                    let dontSpamTeamMenuButton = () =>{
                        if (!(teamMenuTimerId == null)) {
                            clearTimeout(teamMenuTimerId);
                        }
                        teamMenuTimerId = setTimeout(() =>{
                            document.querySelector('#battleScene').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                duration: 0.5,
                                onComplete: () =>{
                                    gsap.to('#overlappingDiv', {
                                        opacity: 0,
                                        duration: 0.5
                                    })
                                }
                            })
                            teamMenu.animate = true
                            teamMenu.open = true
                        }, 400);
                    }
                    let flag = false
                    if (flag === false){
                        dontSpamTeamMenuButton()
                        flag = true
                    }
                    document.removeEventListener('click', menuButtonEvent, true)
                    break
                case 'Run':
                    if(!trainerBattle){
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                document.querySelector('#battleScene').style.display = 'none'
                                if(battle.initiated === true) {
                                    battleMusicPlaying = false
                                    removeBattleEventListener = true
                                    cancelAnimationFrame(animateBattleId)
                                    animate()
                                }
                                gsap.to('#overlappingDiv', {
                                    opacity: 0
                                })
                                battle.initiated = false
                                audio.battle.stop()
                                audio.map.play()
                            }
                        })
                        document.removeEventListener('click', menuButtonEvent, true)
                    } else {
                        audio.error.play()
                    }
                    break
            }
        } else {
            document.removeEventListener('click', menuButtonEvent, true)
        }
    }

    document.addEventListener('click', menuButtonEvent, true)  

    let optionsButton = []
    document.querySelectorAll('.battleOptionsButton').forEach(button =>{
        optionsButton.push(button)
        button.addEventListener('mouseenter', e =>{
            const battleOptionsDialogue = document.querySelector('#battleOptionsDialogue')
            switch(button.textContent){
                case 'Fight':
                    battleOptionsDialogue.textContent = 'Do you want to fight ' + currFoe.name + '?'
                    break
                case 'Bag':
                    battleOptionsDialogue.textContent = 'Do you want to look in your bag?'
                    break
                case 'Pogemon':
                    battleOptionsDialogue.textContent = 'Do you want to switch?'
                    break
                case 'Run':
                    battleOptionsDialogue.textContent = 'Do you want to run?'
                    break
            }
        })
    })

    //attack Buttons

    let attackMenuButton = []
    document.querySelectorAll('.attackButton').forEach(button =>{
        attackMenuButton.push(button)
        document.querySelector('#menu').style.height = attackMenuButton.length * 100
        let timerId;
        _doActionNoSpam = selectedAttack =>{
            if (!(timerId == null)) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() =>{
                
                attackInProcess = true
                
                document.querySelector('#attackInfo').style.display = 'none'

                // if ally is faster than ennemy
                if (currAlly.stats.Spd > currFoe.stats.Spd) {
                    currAlly.attack({ 
                        attack: selectedAttack,
                        recipient: currFoe,
                        renderedSprites
                    })
                    checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                    checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
                    if(currFoe.currHP < 1) {
                        currFoe.frames.hold = 0
                        if(currFoeTeam.length <= 1){
                            //doesnt play on time
                            audio.battle.stop()
                            queue.push(() =>{
                                audio.victory.play()
                                currFoe.faint(currAlly)
                                queue.push(() =>{
                                    // evolution
                                    if(Math.floor(currAlly.currLevel) >= currAlly.evolution.level && currAlly.evolution.name != 'none'){
                                        //put evolution animation
                                        currPogemonEvolve()
                                    } else {
                                        // should have if team fainted switch pogemon here
                                        gsap.to('#overlappingDiv', {
                                            opacity: 1,
                                            onComplete: () => {
                                                document.querySelector('#battleScene').style.display = 'none'
                                                if(battle.initiated){
                                                    if (trainerBattle){
                                                        currTrainer.defeat()
                                                    }
                                                    battleMusicPlaying = false
                                                    removeBattleEventListener = true
                                                    cancelAnimationFrame(animateBattleId)
                                                    animate()
                                                }
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 0,
                                                })
                                                battle.initiated = false
                                                audio.map.play()
                                            }
                                        })
                                    }
                                })
                            })
                        } else {
                            queue.push(() =>{
                                currFoe.faint(currAlly)
                            })
                        }
                    } else {
                        chooseRandomAttack()
                        queue.push(() =>{
                            currFoe.attack({ 
                                attack: randomAttack,
                                recipient: currAlly,
                                renderedSprites
                            })
                            checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                            checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
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
                                                battleMusicPlaying = false
                                                removeBattleEventListener = true
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
                   // if ennemy is faster than ally
                } else if (currFoe.stats.Spd > currAlly.stats.Spd) {
                    chooseRandomAttack()
                    currFoe.attack({ 
                        attack: randomAttack,
                        recipient: currAlly,
                        renderedSprites
                    })
                    checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                    checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
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
                                            battleMusicPlaying = false
                                            removeBattleEventListener = true
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
                    } else {
                        queue.push(() =>{
                            currAlly.attack({
                                attack: selectedAttack,
                                recipient: currFoe,
                                renderedSprites
                            })
                            checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                            checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
                            if(currFoe.currHP < 1) {
                                currFoe.frames.hold = 0
                                if(currFoeTeam.length <= 1){
                                    //doesnt play on time
                                    audio.battle.stop()
                                    queue.push(() =>{
                                        audio.victory.play()
                                        currFoe.faint(currAlly)
                                        queue.push(() =>{
                                            // evolution here
                                            if(Math.floor(currAlly.currLevel) >= currAlly.evolution.level && currAlly.evolution.name != 'none'){
                                                //put evolution animation
                                                currPogemonEvolve()
                                            } else {
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 1,
                                                    onComplete: () => {
                                                        document.querySelector('#battleScene').style.display = 'none'
                                                        if(battle.initiated){
                                                            if (trainerBattle){
                                                                currTrainer.defeat()
                                                            }
                                                            battleMusicPlaying = false
                                                            removeBattleEventListener = true
                                                            cancelAnimationFrame(animateBattleId)
                                                            animate()
                                                        }
                                                        gsap.to('#overlappingDiv', {
                                                            opacity: 0,
                                                        })
                                                        battle.initiated = false
                                                        audio.map.play()
                                                    }
                                                })
                                            }
                                        })
                                    })
                                } else {
                                    queue.push(() =>{
                                        currFoe.faint(currAlly)
                                    })
                                }
                            }
                        })   
                    }
                    // if both speeds are equal
                } else if (currAlly.stats.Spd === currFoe.stats.Spd){
                    let speedTie = Math.floor(Math.random() * 100)
                    if(speedTie <= 49){
                        currAlly.attack({ 
                            attack: selectedAttack,
                            recipient: currFoe,
                            renderedSprites
                        })
                        checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                        checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
                        if(currFoe.currHP < 1) {
                            currFoe.frames.hold = 0
                            if(currFoeTeam.length <= 1){
                                //doesnt play on time
                                audio.battle.stop()
                                queue.push(() =>{
                                    audio.victory.play()
                                    currFoe.faint(currAlly)
                                    queue.push(() =>{
                                        // evolution
                                        if(Math.floor(currAlly.currLevel) >= currAlly.evolution.level && currAlly.evolution.name != 'none'){
                                            //put evolution animation
                                            currPogemonEvolve()
                                        } else {
                                            gsap.to('#overlappingDiv', {
                                                opacity: 1,
                                                onComplete: () => {
                                                    document.querySelector('#battleScene').style.display = 'none'
                                                    if(battle.initiated){
                                                        if (trainerBattle){
                                                            currTrainer.defeat()
                                                        }
                                                        battleMusicPlaying = false
                                                        removeBattleEventListener = true
                                                        cancelAnimationFrame(animateBattleId)
                                                        animate()
                                                    }
                                                    gsap.to('#overlappingDiv', {
                                                        opacity: 0,
                                                    })
                                                    battle.initiated = false
                                                    audio.map.play()
                                                }
                                            })
                                        }
                                    })
                                })
                            } else {
                                queue.push(() =>{
                                    currFoe.faint(currAlly)
                                })
                            }
                        } else {
                            chooseRandomAttack()
                            queue.push(() =>{
                                currFoe.attack({ 
                                    attack: randomAttack,
                                    recipient: currAlly,
                                    renderedSprites
                                })
                                checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                                checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
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
                                                    battleMusicPlaying = false
                                                    removeBattleEventListener = true
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
                                        }})
                                    })
                                }
                            })
                        }
                    } else if(speedTie >= 50){
                        chooseRandomAttack()
                        currFoe.attack({ 
                            attack: randomAttack,
                            recipient: currAlly,
                            renderedSprites
                        })
                        checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                        checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
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
                                            battleMusicPlaying = false
                                            removeBattleEventListener = true
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
                                }})
                            })
                        } else {
                            queue.push(() =>{
                                currAlly.attack({ 
                                    attack: selectedAttack,
                                    recipient: currFoe,
                                    renderedSprites
                                })
                                checkIfThresholdForHeldItemIsMet(currAlly, currAlly.item)
                                checkIfThresholdForHeldItemIsMet(currFoe, currFoe.item)
                                if(currFoe.currHP < 1) {
                                    currFoe.frames.hold = 0
                                    if(currFoeTeam.length <= 1){
                                        //doesnt play on time
                                        audio.battle.stop()
                                        queue.push(() =>{
                                            audio.victory.play()
                                            currFoe.faint(currAlly)
                                            queue.push(() =>{
                                                // evolution
                                                if(Math.floor(currAlly.currLevel) >= currAlly.evolution.level && currAlly.evolution.name != 'none'){
                                                    //put evolution animation
                                                    currPogemonEvolve()
                                                } else {
                                                    gsap.to('#overlappingDiv', {
                                                        opacity: 1,
                                                        onComplete: () => {
                                                            document.querySelector('#battleScene').style.display = 'none'
                                                            if(battle.initiated){
                                                                if (trainerBattle){
                                                                    currTrainer.defeat()
                                                                }
                                                                battleMusicPlaying = false
                                                                removeBattleEventListener = true
                                                                cancelAnimationFrame(animateBattleId)
                                                                animate()
                                                            }
                                                            gsap.to('#overlappingDiv', {
                                                                opacity: 0,
                                                            })
                                                            battle.initiated = false
                                                            audio.map.play()
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                    } else {
                                        queue.push(() =>{
                                            currFoe.faint(currAlly)
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            }, 300);
        };

        let buttonMouseEnter = e =>{
            const selectedAttack = attacks[e.currentTarget.textContent]
            const attackType = document.querySelector('#attackType')
            if (selectedAttack.element === 'normal') attackType.style.color = '#000'
            else if (selectedAttack.element === 'fighting') attackType.style.color = '#DD7E6B'
            else if (selectedAttack.element === 'fire') attackType.style.color = 'red'
            else if (selectedAttack.element === 'ghost') attackType.style.color = 'darkgrey'
        }

        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.textContent]
            document.querySelector('#attackName').textContent = `${selectedAttack.name}`
            document.querySelector('#attackType').textContent = `${selectedAttack.element}`
            document.querySelector('#attackPotency').textContent = `potency : ${selectedAttack.potency}`
            document.querySelector('#attackAccuracy').textContent = `accuracy : ${selectedAttack.accuracy}`
            currAlly.attacks.forEach(attack =>{
                if(selectedAttack.name === attack.name){
                    document.querySelector('#attackPP').textContent = `pp : ${attack.pp}` 
                }
            })
        })

        button.addEventListener('mouseenter', buttonMouseEnter, true)
        button.addEventListener('click', attackButtonOnClick , true)
    })
}

const animateBattle = () => {
    animateBattleId = requestAnimationFrame(animateBattle)
    if (teamMenu.animate === true || battle.initiated === false){
        cancelAnimationFrame(animateBattleId)
    }

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
                            battleMusicPlaying = false
                            removeBattleEventListener = true
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

    console.log(battleItemMenu)

    if(battleItemMenu){
        openItemMenuFromBattle = true
        if(openItemMenuFromBattle){
            battleItemMenu = false
            openItemMenuFromBattle = false
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    document.querySelector('#battleScene').style.display = 'none'
                    cancelAnimationFrame(animateBattleId)
                    initItemMenu()
                    animateItemMenu()
                    gsap.to('#overlappingDiv', {
                        opacity: 0
                    })
                }
            })
        }
    }

    if(teamMenu.open && teamMenu.animate){
        gsap.to('#overlappingDiv',{
            opacity: 1,
            duration: 0.5,
            onComplete: () =>{
                lastLeedPogemon = team[0]
                animateTeamMenu()
            }
        })
    }

    if(catchFailed){
        catchFailed = false
        addEventListener('click', menuButtonEvent, true)
    }
    
    battleBackground.draw()
    renderedSprites.forEach(sprite =>{
        sprite.draw()
    })
}

let battleActionTimerId
_doActionNoSpamChangeBattleAction = () =>{
    if (!(battleActionTimerId == null)) {
        clearTimeout(battleActionTimerId);
    }
    battleActionTimerId = setTimeout(() =>{
        if (queue.length > 0){
            disableMenuDuringAttack = true
            if(!attackInProcess){
                queue[0]()
                queue.shift()
            }
        } else if (!attackInProcess) {
            queue = []
            disableMenuDuringAttack = false
            document.querySelector('#dialogueBox').style.display = 'none'
            document.querySelector('#attackEventContainer').style.display = 'none'
            document.querySelector('#battleOptionsContainer').style.display = 'grid'
        }
    }, 400);
};

document.querySelector('#dialogueBox').addEventListener('click', _doActionNoSpamChangeBattleAction, true)
