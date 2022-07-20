// put data in leed container
// create sprites
const teamMenu = {
    open: false, 
    animate: false
}

let leedPogemonSprite
const leedPogemonImage = new Image()
leedPogemonSprite = new Sprite({
    position:{
        x: 25,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: leedPogemonImage,
    animate: true,
    opacity: 1,
})

let backPogemon1Sprite
const backPogemon1Image = new Image()
backPogemon1Sprite = new Sprite({
    position:{
        x: 225,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: backPogemon1Image,
    animate: true,
    opacity: 1,
})

let backPogemon2Sprite
const backPogemon2Image = new Image()
backPogemon2Sprite = new Sprite({
    position:{
        x: 225,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: backPogemon2Image,
    animate: true,
    opacity: 1,
})

let backPogemon3Sprite
const backPogemon3Image = new Image()
backPogemon3Sprite = new Sprite({
    position:{
        x: 225,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: backPogemon3Image,
    animate: true,
    opacity: 1,
})

let backPogemon4Sprite
const backPogemon4Image = new Image()
backPogemon4Sprite = new Sprite({
    position:{
        x: 225,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: backPogemon4Image,
    animate: true,
    opacity: 1,
})

let backPogemon5Sprite
const backPogemon5Image = new Image()
backPogemon5Sprite = new Sprite({
    position:{
        x: 225,
        y: 50
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: backPogemon5Image,
    animate: true,
    opacity: 1,
})

let defineTeamSprite = () =>{
    leedPogemonImage.src = pogemons[team[0].name].sprites.animation.src
    leedPogemonSprite = new Sprite({
        position:{
            x: 0,
            y: 100
        },
        frames: {
            max: 4,
            hold: 50
        },
        image: leedPogemonImage,
        animate: true,
        opacity: 1,
    })

    if(team[1] !== undefined){
        backPogemon1Image.src = pogemons[team[1].name].sprites.menuAnimation.src
        backPogemon1Sprite = new Sprite({
            position:{
                x: 800,
                y: 25
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon1Image,
            animate: true,
            opacity: 1,
        })
    }

    if(team[2] !== undefined){
        backPogemon2Image.src = pogemons[team[2].name].sprites.menuAnimation.src
        backPogemon2Sprite = new Sprite({
            position:{
                x: 800,
                y: 185
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon2Image,
            animate: true,
            opacity: 1,
        })
    }

    if(team[3] !== undefined){
        backPogemon3Image.src = pogemons[team[3].name].sprites.menuAnimation.src
        backPogemon3Sprite = new Sprite({
            position:{
                x: 800,
                y: 345
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon3Image,
            animate: true,
            opacity: 1,
        })
    }

    if(team[4] !== undefined){
        backPogemon4Image.src = pogemons[team[4].name].sprites.menuAnimation.src
        backPogemon4Sprite = new Sprite({
            position:{
                x: 800,
                y: 505
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon4Image,
            animate: true,
            opacity: 1,
        })
    }

    if(team[5] !== undefined){
        backPogemon5Image.src = pogemons[team[5].name].sprites.menuAnimation.src
        backPogemon5Sprite = new Sprite({
            position:{
                x: 800,
                y: 665
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon5Image,
            animate: true,
            opacity: 1,
        })
    }
    renderedTeamMenuSprites = [leedPogemonSprite, backPogemon1Sprite, backPogemon2Sprite, backPogemon3Sprite, backPogemon4Sprite, backPogemon5Sprite]
}

let leedPogemonCurrHP
let backPogemon1CurrHP
let backPogemon2CurrHP
let backPogemon3CurrHP
let backPogemon4CurrHP
let backPogemon5CurrHP
let leedPogemonMaxHP
let backPogemon1MaxHP
let backPogemon2MaxHP
let backPogemon3MaxHP
let backPogemon4MaxHP
let backPogemon5MaxHP
let renderedTeamMenuSprites

let defineCurrTeamMenuInfo = () =>{
    if (team[0] !== undefined) {
        let leedPogemonNameDOM = document.querySelector('#leedPogemonName')
        leedPogemonNameDOM.textContent = `${team[0].name} Lvl ${Math.floor(team[0].currLevel)}`
        document.querySelector('#leedPogemonHP').textContent = `${Math.floor(team[0].currHP)} / ${team[0].stats.HP}`
        team[0].isEnemy = false
        leedPogemonCurrHP = team[0].currHP
        leedPogemonMaxHP = team[0].stats.HP
    }
    if (team[1] !== undefined) {
        let backPogemon1NameDOM = document.querySelector('#backPogemon1Name')
        backPogemon1NameDOM.textContent =  `${team[1].name} Lvl ${Math.floor(team[1].currLevel)}`
        document.querySelector('#backPogemon1HP').textContent = `${Math.floor(team[1].currHP)} / ${team[1].stats.HP}`
        team[1].isEnemy = false
        backPogemon1CurrHP = team[1].currHP
        backPogemon1MaxHP = team[1].stats.HP
    }
    if (team[2] !== undefined) {
        let backPogemon2NameDOM = document.querySelector('#backPogemon2Name')
        backPogemon2NameDOM.textContent = `${team[2].name} Lvl ${Math.floor(team[2].currLevel)}`
        document.querySelector('#backPogemon2HP').textContent = `${Math.floor(team[2].currHP)} / ${team[2].stats.HP}`
        team[2].isEnemy = false
        backPogemon2CurrHP = team[2].currHP
        backPogemon2MaxHP = team[2].stats.HP
    }
    if (team[3] !== undefined) {
        let backPogemon3NameDOM = document.querySelector('#backPogemon3Name')
        backPogemon3NameDOM.textContent = `${team[3].name} Lvl ${Math.floor(team[3].currLevel)}`
        document.querySelector('#backPogemon3HP').textContent = `${Math.floor(team[3].currHP)} / ${team[3].stats.HP}`
        team[3].isEnemy = false
        backPogemon3CurrHP = team[3].currHP
        backPogemon3MaxHP = team[3].stats.HP
    }
    if (team[4] !== undefined) {
        let backPogemon4NameDOM = document.querySelector('#backPogemon4Name')
        backPogemon4NameDOM.textContent = `${team[4].name} Lvl ${Math.floor(team[4].currLevel)}`
        document.querySelector('#backPogemon4HP').textContent = `${Math.floor(team[4].currHP)} / ${team[4].stats.HP}`
        team[4].isEnemy = false
        backPogemon4CurrHP = team[4].currHP
        backPogemon4MaxHP = team[4].stats.HP
    }
    if (team[5] !== undefined) {
        let backPogemon5NameDOM = document.querySelector('#backPogemon5Name')
        backPogemon5NameDOM.textContent = `${team[5].name} Lvl ${Math.floor(team[5].currLevel)}`
        document.querySelector('#backPogemon5HP').textContent = `${Math.floor(team[5].currHP)} / ${team[5].stats.HP}`
        team[5].isEnemy = false
        backPogemon5CurrHP = team[5].currHP
        backPogemon5MaxHP = team[5].stats.HP
    }
}

defineCurrTeamMenuInfo()

const changeHP = () =>{
    let currColor = undefined
    let currHealthbar = document.querySelector('#playerHealthbar')
    let currDisplayHP = document.querySelector('#playerHPDisplay')
    let hpInPercentBattleOnLoad = 100 * team[0].currHP / team[0].baseStats.HP
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

let currSelectedOptionId
let currPogemonTargetId
let lastSelectedPogemonId
let teamSwitchArray = []
let teamSwitchButton = {
    clicked: false
}
let firstPositionIndex
let secondPositionIndex
let battleSwitch = false
let currFoeTeam = []

const animateTeamMenu = () =>{
    let animateTeamMenuId = requestAnimationFrame(animateTeamMenu)
    
    player.animate = false
    menu.open = false    
    teamMenu.animate = true

    if(teamMenu.open === false && teamMenu.animate === false){
        cancelAnimationFrame(animateTeamMenuId)
    }

    let checkIfTeamMenuTargetClicked = targetCase =>{
        
        if(targetCase === 'leedPogemon'){
            currPogemonTargetId = targetCase
            document.querySelector('#leedPogemon').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'leedPogemon'){
            document.querySelector('#leedPogemon').style.backgroundColor = 'transparent'
        } 

        if(targetCase === 'backPogemon1'){
            currPogemonTargetId = targetCase        
            document.querySelector('#backPogemon1').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'backPogemon1'){
            document.querySelector('#backPogemon1').style.backgroundColor = 'transparent'
        } 

        if(targetCase === 'backPogemon2'){
            currPogemonTargetId = targetCase        
            document.querySelector('#backPogemon2').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'backPogemon2'){
            document.querySelector('#backPogemon2').style.backgroundColor = 'transparent'
        } 

        if(targetCase === 'backPogemon3'){
            currPogemonTargetId = targetCase        
            document.querySelector('#backPogemon3').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'backPogemon3'){
            document.querySelector('#backPogemon3').style.backgroundColor = 'transparent'
        } 

        if(targetCase === 'backPogemon4'){
            currPogemonTargetId = targetCase        
            document.querySelector('#backPogemon4').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'backPogemon4'){
            document.querySelector('#backPogemon4').style.backgroundColor = 'transparent'
        } 

        if(targetCase === 'backPogemon5'){
            currPogemonTargetId = targetCase        
            document.querySelector('#backPogemon5').style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            document.querySelector('#teamContainerButton').style.display = 'grid'
        } else if (targetCase !== 'backPogemon5'){
            document.querySelector('#backPogemon5').style.backgroundColor = 'transparent'
        }

        return currPogemonTargetId
    }

    let putSwitchInProcess = targetCase =>{
        if(targetCase === 'switchTeamButton' && teamSwitchButton.clicked === false){
            teamSwitchButton.clicked = true
            if(teamSwitchArray[0] !== undefined){
                document.querySelector('#' + teamSwitchArray[0]).style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
            }
        }
    }

    if(teamSwitchButton.clicked === true){
        teamSwitchButton.selection = true
        teamSwitchButton.clicked = false
    }

    let changeTeamMemberArrayIndex = (firstPosition, secondPosition) =>{
        switch(firstPosition){
            case 'leedPogemon':
                firstPositionIndex = 0
                break
            case 'backPogemon1':
                firstPositionIndex = 1
                break
            case 'backPogemon2':
                firstPositionIndex = 2
                break
            case 'backPogemon3':
                firstPositionIndex = 3
                break
            case 'backPogemon4':
                firstPositionIndex = 4
                break
            case 'backPogemon5':
                firstPositionIndex = 5
                break
        }
        switch(secondPosition){
            case 'leedPogemon':
                secondPositionIndex = 0
                break
            case 'backPogemon1':
                secondPositionIndex = 1
                break
            case 'backPogemon2':
                secondPositionIndex = 2
                break
            case 'backPogemon3':
                secondPositionIndex = 3
                break
            case 'backPogemon4':
                secondPositionIndex = 4
                break
            case 'backPogemon5':
                secondPositionIndex = 5
                break
        }

        if (team[firstPositionIndex] === undefined || team[secondPositionIndex] === undefined) {
            teamSwitchArray = []
            teamSwitchButton.selection = false
            return
        }
        let teamPlaceholderVar = team[firstPositionIndex]
        team[firstPositionIndex] = team[secondPositionIndex]
        team[secondPositionIndex] = teamPlaceholderVar
        teamSwitchArray = []
        teamSwitchButton.selection = false
    }

    if(mouse.pressed === true){
        document.querySelector('#teamContainerButton').style.display = 'none'
        checkIfTeamMenuTargetClicked(mouse.event.target.id)
        
        if(teamSwitchButton.selection === true){
            if(teamSwitchArray.length === 1){
                if(mouse.event.target.id === 'leedPogemon' || mouse.event.target.classList.value === 'backPogemon'){
                    teamSwitchArray.push(mouse.event.target.id)
                    changeTeamMemberArrayIndex(teamSwitchArray[0], teamSwitchArray[1])
                    defineTeamSprite()
                }
            }
        } else if(teamSwitchArray.length === 0){
            if(mouse.event.target.id === 'leedPogemon' || mouse.event.target.classList.value === 'backPogemon'){
                teamSwitchArray.push(currPogemonTargetId)
            }
        } else {
            teamSwitchArray.pop()
            teamSwitchArray.push(currPogemonTargetId)
        }
        putSwitchInProcess(mouse.event.target.id)

        if(mouse.event.target.id === 'summaryTeamButton'){
            teamMenu.open = false
            summaryState.animation = true
        }
    }

    backgroundImage.src = 'img/menus/teamMenu.png'
    backgroundMap.image = backgroundImage
    backgroundMap.draw()

    renderedTeamMenuSprites.forEach(pogemonSprite =>{
        pogemonSprite.draw()
    })

    let hpInPercentTeamMenuCalc = (currHP, totalHP, healthBar, pogemonSprite) =>{
        let hpInPercentTeamMenu
        hpInPercentTeamMenu = 100 * currHP / totalHP
        if (hpInPercentTeamMenu > 50) {
            healthBar.style.backgroundColor = 'green'
            pogemonSprite.frames.hold = 50
        } else if (hpInPercentTeamMenu > 25 && hpInPercentTeamMenu <= 50){
            healthBar.style.backgroundColor = 'orange'
            pogemonSprite.frames.hold = 75
        } else if (hpInPercentTeamMenu <= 25 && hpInPercentTeamMenu >= 1) {
            healthBar.style.backgroundColor = 'red'
            pogemonSprite.frames.hold = 100
        } else if (hpInPercentTeamMenu === 0){
            healthBar.style.backgroundColor = 'transparent'
            healthBar.style.width = 0 + '%'
            pogemonSprite.frames.hold = 0
        }
        return hpInPercentTeamMenu
    }
        
    if (teamMenu.open === true){
        defineCurrTeamMenuInfo()
        document.querySelector('#teamContainerText').textContent = 'Select Pogemon Here ---'
        document.querySelector('#menuContainer').style.display = 'none'
        document.querySelector('#teamContainer').style.display = 'block'

        let leedPogemonHealthbar = document.querySelector('#leedPogemonHealthbar')
        let leedPogemonExpbar = document.querySelector('#leedPogemonExpbar')

        let backPogemon1Healthbar = document.querySelector('#backPogemon1Healthbar')
        let backPogemon1Expbar = document.querySelector('#backPogemon1Expbar')

        let backPogemon2Healthbar = document.querySelector('#backPogemon2Healthbar')
        let backPogemon2Expbar = document.querySelector('#backPogemon2Expbar')
        
        let backPogemon3Healthbar = document.querySelector('#backPogemon3Healthbar')
        let backPogemon3Expbar = document.querySelector('#backPogemon3Expbar')

        let backPogemon4Healthbar = document.querySelector('#backPogemon4Healthbar')
        let backPogemon4Expbar = document.querySelector('#backPogemon4Expbar')

        let backPogemon5Healthbar = document.querySelector('#backPogemon5Healthbar')
        let backPogemon5Expbar = document.querySelector('#backPogemon5Expbar')

        leedPogemonHealthbar.style.width = hpInPercentTeamMenuCalc(leedPogemonCurrHP, leedPogemonMaxHP, leedPogemonHealthbar, leedPogemonSprite) + '%'
        leedPogemonExpbar.style.width = team[0].expInPerCent + '%'

        if(team[1] !== undefined) {
            backPogemon1Healthbar.style.width = hpInPercentTeamMenuCalc(backPogemon1CurrHP, backPogemon1MaxHP, backPogemon1Healthbar, backPogemon1Sprite) + '%'
            backPogemon1Expbar.style.width = team[1].expInPerCent + '%'
        } else {
            backPogemon1Healthbar.style.width = 0 + '%'
            backPogemon1Expbar.style.width = 0 + '%'
            document.querySelector('#backPogemon1Greybar').style.backgroundColor = 'transparent'
            document.querySelector('#backPogemon1ExpGreybar').style.backgroundColor = 'transparent'
        }

        if(team[2] !== undefined) {
            backPogemon2Healthbar.style.width = hpInPercentTeamMenuCalc(backPogemon2CurrHP, backPogemon2MaxHP, backPogemon2Healthbar, backPogemon2Sprite) + '%'
            backPogemon2Expbar.style.width = team[2].expInPerCent + '%'
        } else {
            backPogemon2Healthbar.style.width = 0 + '%'
            backPogemon2Expbar.style.width = 0 + '%'
            document.querySelector('#backPogemon2Greybar').style.backgroundColor = 'transparent'
            document.querySelector('#backPogemon2ExpGreybar').style.backgroundColor = 'transparent'
        }

        if(team[3] !== undefined) {
            backPogemon3Healthbar.style.width = hpInPercentTeamMenuCalc(backPogemon3CurrHP, backPogemon3MaxHP, backPogemon3Healthbar, backPogemon3Sprite) + '%'
            backPogemon3Expbar.style.width = team[3].expInPerCent + '%'
        } else {
            backPogemon3Healthbar.style.width = 0 + '%'
            backPogemon3Expbar.style.width = 0 + '%'
            document.querySelector('#backPogemon3Greybar').style.backgroundColor = 'transparent'
            document.querySelector('#backPogemon3ExpGreybar').style.backgroundColor = 'transparent'
        }

        if(team[4] !== undefined) {
            backPogemon4Healthbar.style.width = hpInPercentTeamMenuCalc(backPogemon4CurrHP, backPogemon4MaxHP, backPogemon4Healthbar, backPogemon4Sprite) + '%'
            backPogemon4Expbar.style.width = team[4].expInPerCent + '%'
        } else {
            backPogemon4Healthbar.style.width = 0 + '%'
            backPogemon4Expbar.style.width = 0 + '%'
            document.querySelector('#backPogemon4Greybar').style.backgroundColor = 'transparent'
            document.querySelector('#backPogemon4ExpGreybar').style.backgroundColor = 'transparent'
        }

        if(team[5] !== undefined) {
            backPogemon5Healthbar.style.width = hpInPercentTeamMenuCalc(backPogemon5CurrHP, backPogemon5MaxHP, backPogemon5Healthbar, backPogemon5Sprite) + '%'
            backPogemon5Expbar.style.width = team[5].expInPerCent + '%'
        } else {
            backPogemon5Healthbar.style.width = 0 + '%'
            backPogemon5Expbar.style.width = 0 + '%'
            document.querySelector('#backPogemon5Greybar').style.backgroundColor = 'transparent'
            document.querySelector('#backPogemon5ExpGreybar').style.backgroundColor = 'transparent'
        }
    } else if (teamMenu.open === false && teamMenu.animate === true) {
        // Team menu things here
        teamMenu.animate = false
        cancelAnimationFrame(animateTeamMenuId)
        gsap.to('#overlappingDiv',{
            opacity: 1,
            duration: 0.5,
            onComplete: () =>{
                if(summaryState.animation === true){
                    lastMenuOpen = 'teamMenu'
                    initSummaryMenu()
                    animateSummaryMenu()
                } else if(battle.initiated === true && team[0].currHP > 0){
                    document.querySelector('#menuContainer').style.display = 'none'
                    document.querySelector('#teamContainer').style.display = 'none'
                    battleSwitch = true
                    initBattle()
                    animateBattle()
                } else animate()
                document.querySelector('#teamContainer').style.display = 'none'
                gsap.to('#overlappingDiv',{
                    opacity: 0,
                    duration: 0.5,
                })
            }
        })
    }
}