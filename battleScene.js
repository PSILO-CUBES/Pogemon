const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'img/battle_scenes/battleBackground.png'
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
let animateBattleId
let queue = []
let healthBar
let displayHP
let hpInPercentBattleOnLoad
let _doActionNoSpam
let currFoeTeamData = []
let switchAction = false
let lastLeedPogemon

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

// initiate all battle Scenes and Menus
const initBattle = () =>{
    menu.open = false
    battle.initiated = true
    running = false
    queue = []

    document.querySelector('#levelUpDisplayContainer').style.display = 'none'
    document.querySelector('#levelUpDisplayContainer').style.left = '120%'

    document.querySelector('#menuContainer').style.display = 'none'
    if(battleSwitch === true){
        currAlly = team[0]
        const randomAttack = currFoe.attacks[Math.floor(Math.random() * currFoe.attacks.length)]
        document.querySelector('#battleOptionsContainer').style.display = 'none'
        document.querySelector('#attackEventContainer').style.display = 'grid' 
        if (lastLeedPogemon){
            if(lastLeedPogemon.globalId !== currAlly.globalId){
                document.querySelector('#dialogueBox').style.display = 'block'
                document.querySelector('#dialogueBox').textContent = team[0].name + ' entered the battlefield!'
                queue.push(() =>{
                    currFoe.attack({ 
                        attack: randomAttack,
                        recipient: currAlly,
                        renderedSprites
                    })
                })
            } else {
                document.querySelector('#battleOptionsContainer').style.display = 'grid'
                document.querySelector('#attackEventContainer').style.display = 'none'
            } 
        }
        battleSwitch = false
        switchAction = true
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
    
    currAlly  = team[0]
    currAlly.image.src = currAlly.sprites.backAnimation.src

    currAlly.position = {
        x: 265,
        y: 90
    }

    let defineEnnemyTeam = trainer =>{
        currFoeTeamData = trainer.team
        trainer.setTeamLevel()
        currFoeTeam = []
        for (let i = 0; i < currFoeTeamData.length; i++){
            currFoePogemon = new Pogemon(currFoeTeamData[i])
            currFoeTeam.push(currFoePogemon)
            currFoeTeam[i].currLevel = currFoeTeamData[i].currLevel
        }
    }
    
    if (trainerBattle && !switchAction){
        document.querySelector('#battleOptionsContainer').style.display = 'grid'
        document.querySelector('#attackEventContainer').style.display = 'none'
        defineEnnemyTeam(currTrainer.data)
        currFoe = currFoeTeam[0]
    } else if (!trainerBattle && !switchAction) {
        let determineFoeLevel = (min, max) =>{
            return Math.floor(min + Math.random()*(max - min + 1))
        }
        currFoe = new Pogemon(potentialEnemy)
        currFoe.currLevel = determineFoeLevel(currMap.levelRange.min, currMap.levelRange.max)
    } else if (!trainerBattle && switchAction) {
        currFoe = new Pogemon(currFoe)
    }

    currFoe.position = {
        x: 1400,
        y: 0
    }

    definePogemonStats(currFoe)
    currFoe.currHP = currFoe.stats.HP

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

    let buttonMouseEnter = e =>{
        const selectedAttack = attacks[e.currentTarget.textContent]
        const attackInfo = document.querySelector('#attackInfo')
        attackInfo.textContent = selectedAttack.element
        if (selectedAttack.element === 'Normal') attackInfo.style.color = '#000'
        else if (selectedAttack.element === 'Fighting') attackInfo.style.color = '#DD7E6B'
        else if (selectedAttack.element === 'Fire') attackInfo.style.color = 'red'
    }

    let attackButtonOnClick = e =>{
        const selectedAttack = attacks[e.currentTarget.textContent]
        _doActionNoSpam(selectedAttack)
    }

    //option menu

    let menuButtonEvent = () => {
        switch(mouse.textContent){
            case 'Fight':
                document.querySelector('#battleOptionsContainer').style.display = 'none'
                document.querySelector('#dialogueBox').style.display = 'none'
                document.querySelector('#attackEventContainer').style.display = 'flex'
                break
            case 'Catch':
                if(!trainerBattle){
                    document.querySelector('#battleOptionsContainer').style.display = 'none'
                    document.querySelector('#dialogueBox').style.display = 'flex'
                    document.querySelector('#attackEventContainer').style.display = 'flex'
                    document.querySelector('#dialogueBox').textContent = 'catching ' + currFoe.name
                    cancelAnimationFrame(animateBattleId)
                    queue.push(() =>{
                        currFoe.catch(currFoe)
                        animate()
                    })
                } else {
                    audio.error.play()
                }
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
                                cancelAnimationFrame(animateBattleId)
                                animate()
                            }
                            gsap.to('#overlappingDiv', {
                                opacity: 0
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                } else {
                    audio.error.play()
                }
                break
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
                case 'Catch':
                    battleOptionsDialogue.textContent = 'Do you want to catch ' + currFoe.name + '?'
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
                // speed Check Goes Here

                // if ally is faster than ennemy
                if (currAlly.stats.Spd > currFoe.stats.Spd) {
                    currAlly.attack({ 
                        attack: selectedAttack,
                        recipient: currFoe,
                        renderedSprites
                    })
                    attackInitiated = true
                    if(currFoe.currHP < 1) {
                        currFoe.frames.hold = 0
                        if(currFoeTeam.length <= 1){
                            //doesnt play on time
                            audio.battle.stop()
                            queue.push(() =>{
                                currFoe.faint(currAlly)
                                queue.push(() =>{
                                    gsap.to('#overlappingDiv', {
                                        opacity: 1,
                                        onComplete: () => {
                                            document.querySelector('#battleScene').style.display = 'none'
                                            if(battle.initiated){
                                                if (trainerBattle){
                                                    currTrainer.defeat()
                                                }
                                                cancelAnimationFrame(animateBattleId)
                                                animate()
                                            }
                                            gsap.to('#overlappingDiv', {
                                                opacity: 0,
                                            })
                                            battle.initiated = false
                                            audio.Map.play()
                                        }
                                    })
                                })
                            })
                        } else {
                            queue.push(() =>{
                                currFoe.faint(currAlly)
                            })
                        }
                    } else {
                        const randomAttack = currFoe.attacks[Math.floor(Math.random() * currFoe.attacks.length)]
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
                                            audio.Map.play()
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
                        })
                    }
                   // if ennemy is faster than ally
                } else if (currFoe.stats.Spd > currAlly.stats.Spd) {
                    const randomAttack = currFoe.attacks[Math.floor(Math.random() * currFoe.attacks.length)]
                    currFoe.attack({ 
                        attack: randomAttack,
                        recipient: currAlly,
                        renderedSprites
                    })
                    attackInitiated = true
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
                                            cancelAnimationFrame(animateBattleId)
                                            animate()
                                        }
                                        gsap.to('#overlappingDiv', {
                                            opacity: 0
                                        })
                                        battle.initiated = false
                                        audio.Map.play()
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
                    } else {
                        queue.push(() =>{
                            currAlly.attack({
                                attack: selectedAttack,
                                recipient: currFoe,
                                renderedSprites
                            })
                            if(currFoe.currHP < 1) {
                                currFoe.frames.hold = 0
                                if(currFoeTeam.length <= 1){
                                    //doesnt play on time
                                    audio.battle.stop()
                                    queue.push(() =>{
                                        currFoe.faint(currAlly)
                                        queue.push(() =>{
                                            gsap.to('#overlappingDiv', {
                                                opacity: 1,
                                                onComplete: () => {
                                                    document.querySelector('#battleScene').style.display = 'none'
                                                    if(battle.initiated){
                                                        if (trainerBattle){
                                                            currTrainer.defeat()
                                                        }
                                                        cancelAnimationFrame(animateBattleId)
                                                        animate()
                                                    }
                                                    gsap.to('#overlappingDiv', {
                                                        opacity: 0,
                                                    })
                                                    battle.initiated = false
                                                    audio.Map.play()
                                                }
                                            })
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
                        attackInitiated = true
                        if(currFoe.currHP < 1) {
                            currFoe.frames.hold = 0
                            if(currFoeTeam.length <= 1){
                                //doesnt play on time
                                audio.battle.stop()
                                queue.push(() =>{
                                    currFoe.faint(currAlly)
                                    queue.push(() =>{
                                        gsap.to('#overlappingDiv', {
                                            opacity: 1,
                                            onComplete: () => {
                                                document.querySelector('#battleScene').style.display = 'none'
                                                if(battle.initiated){
                                                    if (trainerBattle){
                                                        currTrainer.defeat()
                                                    }
                                                    cancelAnimationFrame(animateBattleId)
                                                    animate()
                                                }
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 0,
                                                })
                                                battle.initiated = false
                                                audio.Map.play()
                                            }
                                        })
                                    })
                                })
                            } else {
                                queue.push(() =>{
                                    currFoe.faint(currAlly)
                                })
                            }
                        } else {
                            const randomAttack = currFoe.attacks[Math.floor(Math.random() * currFoe.attacks.length)]
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
                                                    cancelAnimationFrame(animateBattleId)
                                                    animate()
                                                }
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 0
                                                })
                                                battle.initiated = false
                                                audio.Map.play()
                                            } else {
                                                queue = []
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

                        const randomAttack = currFoe.attacks[Math.floor(Math.random() * currFoe.attacks.length)]
                        currFoe.attack({ 
                            attack: randomAttack,
                            recipient: currAlly,
                            renderedSprites
                        })
                        attackInitiated = true
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
                                            cancelAnimationFrame(animateBattleId)
                                            animate()
                                        }
                                        gsap.to('#overlappingDiv', {
                                            opacity: 0
                                        })
                                        battle.initiated = false
                                        audio.Map.play()
                                    } else {
                                        queue = []
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
                                if(currFoe.currHP < 1) {
                                    currFoe.frames.hold = 0
                                    if(currFoeTeam.length <= 1){
                                        //doesnt play on time
                                        audio.battle.stop()
                                        queue.push(() =>{
                                            currFoe.faint(currAlly)
                                            queue.push(() =>{
                                                gsap.to('#overlappingDiv', {
                                                    opacity: 1,
                                                    onComplete: () => {
                                                        document.querySelector('#battleScene').style.display = 'none'
                                                        if(battle.initiated){
                                                            if (trainerBattle){
                                                                currTrainer.defeat()
                                                            }
                                                            cancelAnimationFrame(animateBattleId)
                                                            animate()
                                                        }
                                                        gsap.to('#overlappingDiv', {
                                                            opacity: 0,
                                                        })
                                                        battle.initiated = false
                                                        audio.Map.play()
                                                    }
                                                })
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


        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackInfo').innerHTML = selectedAttack.element
            document.querySelector('#attackInfo').style.color = selectedAttack.color
        })

        document.querySelectorAll('.attackButton').forEach(button =>{
            button.addEventListener('mouseenter', buttonMouseEnter, true)
            button.addEventListener('click', attackButtonOnClick , true)
        })
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
                        cancelAnimationFrame(animateBattleId)
                        animate()
                    }
                    gsap.to('#overlappingDiv', {
                        opacity: 0
                    })
                    battle.initiated = false
                    audio.Map.play()
                } else {
                    queue = []
                    cancelAnimationFrame(animateBattleId)
                    animateTeamMenu()
                    gsap.to('#overlappingDiv', {
                        opacity: 0
                    })
                }
            }})
        })
    }

    if(teamMenu.open === true && teamMenu.animate === true){
        gsap.to('#overlappingDiv',{
            opacity: 1,
            duration: 0.5,
            onComplete: () =>{
                lastLeedPogemon = team[0]
                animateTeamMenu()
            }
        })
    }
    
    battleBackground.draw()

    renderedSprites.forEach(sprite =>{
        sprite.draw()
    })
}

animate()
// initSummaryMenu()
// animateSummaryMenu()
// pcStorage.animation = true
// initPcStorageDisplay()
// animatePcStorage()
// initBattle()
// animateBattle()

let battleActionTimerId
_doActionNoSpamChangeBattleAction = () =>{
    if (!(battleActionTimerId == null)) {
        clearTimeout(battleActionTimerId);
    }
    battleActionTimerId = setTimeout(() =>{
        if (queue.length > 0){
            queue[0]()
            queue.shift()
        } else {
            queue = []
            attackInitiated = false
            document.querySelector('#dialogueBox').style.display = 'none'
            document.querySelector('#attackEventContainer').style.display = 'none'
            document.querySelector('#battleOptionsContainer').style.display = 'grid'
        }
    }, 400);
};

document.querySelector('#dialogueBox').addEventListener('click', e =>{
    _doActionNoSpamChangeBattleAction()
})