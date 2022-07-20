let summaryMenuSprite
const summaryMenuImage = new Image()
summaryMenuImage.src = 'img/summary_scene/summarySceneTemplate.png'
summaryMenuSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: summaryMenuImage,
    opacity: 1,
})

let summaryAttackInterfaceSprite
const summaryAttackInterfaceImage = new Image()
summaryAttackInterfaceImage.src = 'img/summary_scene/attackSummaryInterface.png'
summaryAttackInterfaceSprite = new Sprite({
    position:{
        x: 1200,
        y: 136
    },
    image: summaryAttackInterfaceImage,
    opacity: 1,
})

let summaryTargetSprite
const summaryTargetImage = new Image()
summaryTargetSprite = new Sprite({
    position:{
        x: 712.5,
        y: 150
    },
    frames: {
        max: 4,
        hold: 50
    },
    image: summaryTargetImage,
    animate: true,
    opacity: 1,
})

let summaryState = {
    animation: false,
    TargetIndex: undefined,
    currDisplayedTarget: undefined,
    attackSummaryInterfaceOpen: false
}

let defineTeamSummaryTargetIndex = (summaryTarget) =>{
    switch(summaryTarget){
        case 'leedPogemon':
            summaryState.TargetIndex = 0
            break
        case 'backPogemon1':
            summaryState.TargetIndex = 1
            break
        case 'backPogemon2':
            summaryState.TargetIndex = 2
            break
        case 'backPogemon3':
            summaryState.TargetIndex = 3
            break
        case 'backPogemon4':
            summaryState.TargetIndex = 4
            break
        case 'backPogemon5':
            summaryState.TargetIndex = 5
            break
    }   
}

let defineSummaryTargetSprite = currTargetSprite =>{
    summaryTargetImage.src = currTargetSprite
    summaryTargetSprite = new Sprite({
        position:{
            x: 712.5,
            y: 150
        },
        frames: {
            max: 4,
            hold: 50
        },
        image: summaryTargetImage,
        animate: true,
        opacity: 1,
    })
}

let statArray = []
let currAttackSummary

let defineSummaryTargetData = () =>{
    document.querySelector('#targetNameData').textContent = currDisplayedTarget.name
    let typeDisplay = () =>{
        let type1 = currDisplayedTarget.type.type1
        let typeDisplayContent = type1
        document.querySelector('#targetTypeData').style.fontSize = 'xx-large'
        if(currDisplayedTarget.type.type2 !== 'none'){
            let type2 = currDisplayedTarget.type.type2
            typeDisplayContent = type1 + '/' + type2
            document.querySelector('#targetTypeData').style.fontSize = 'x-large'
        }
        return typeDisplayContent
    }
    document.querySelector('#targetTypeData').textContent = typeDisplay()
    // display stats
    for (let statName in currDisplayedTarget.stats){
        if (currDisplayedTarget.stats.hasOwnProperty(statName)) {
            let stat = {}
            stat[statName] = currDisplayedTarget.stats[statName]
            statArray.push(stat)
            let targetId = '#target' + statName + 'Data'
            if(stat[statName] <= 9){
                document.querySelector(targetId).style.left = '617.5px'
                if(statName === 'HP'){
                    document.querySelector('#targetHPData').style.left = '400px'
                }
            } else if(stat[statName] > 9 && stat[statName] <= 99){
                document.querySelector(targetId).style.left = '600px'
                if(statName === 'HP'){
                    document.querySelector('#targetHPData').style.left = '415px'
                }
            } else if(stat[statName] > 99 && stat[statName] <= 999){
                document.querySelector(targetId).style.left = '590px'
                if(statName === 'HP'){
                    document.querySelector('#targetHPData').style.left = '390px'
                }
            }
        }
    }
    let levelBoxData = document.querySelector('#targetLevelData')
    if(currDisplayedTarget.currLevel <= 9) {
        levelBoxData.style.left = '455px'
    } else if (currDisplayedTarget.currLevel > 9 && currDisplayedTarget.currLevel <= 99) {
        levelBoxData.style.left = '440px'
    } else if (currDisplayedTarget.currLevel === 100) {
        levelBoxData.style.left = '420px'
    }
    for (let i = 0; i < currDisplayedTarget.attacks.length; i++){
        let summaryAttackButtonDOM = document.querySelectorAll('.summaryAttackButton')[i]
        summaryAttackButtonDOM.textContent = currDisplayedTarget.attacks[i].name
    }
    document.querySelector('#targetLevelData').textContent = Math.floor(currDisplayedTarget.currLevel)
    document.querySelector('#targetHPData').textContent = Math.floor(currDisplayedTarget.currHP) + ' / ' + currDisplayedTarget.stats.HP
    document.querySelector('#targetAtkData').textContent = currDisplayedTarget.stats.Atk
    document.querySelector('#targetDefData').textContent = currDisplayedTarget.stats.Def
    document.querySelector('#targetSpAtkData').textContent = currDisplayedTarget.stats.SpAtk
    document.querySelector('#targetSpDefData').textContent = currDisplayedTarget.stats.SpDef
    document.querySelector('#targetSpdData').textContent = currDisplayedTarget.stats.Spd
    document.querySelector('#targetTotalExp').textContent = Math.floor(currDisplayedTarget.currExp)
    if(currDisplayedTarget.expNeededForNextLevel === undefined) {
        document.querySelector('#targetExpToNextLvl').textContent = '91'
    } else document.querySelector('#targetExpToNextLvl').textContent = Math.floor(currDisplayedTarget.expNeededForNextLevel)
}

let initSummaryMenu = () =>{
    summaryState.animation = true
    if(lastMenuOpen === 'teamMenu'){
        defineTeamSummaryTargetIndex(teamSwitchArray[0])
        currDisplayedTarget = team[summaryState.TargetIndex]
        defineSummaryTargetSprite(currDisplayedTarget.sprites.animation.src)
    } else if(lastMenuOpen === 'pcMenu'){
        currDisplayedTarget = pogemonStorage[currBox][firstPositionId]
        defineSummaryTargetSprite(currDisplayedTarget.sprites.animation.src)
    } else {
        currDisplayedTarget = pogemons.Disso
        defineSummaryTargetSprite(currDisplayedTarget.sprites.animation.src)
    }
    defineSummaryTargetData()
}

// make a switch button that enables the player to switch moves from the summary menu

let animateSummaryMenu = () =>{
    let animateSummaryMenuId = requestAnimationFrame(animateSummaryMenu)
    document.querySelector('#summaryMenuContainer').style.display = 'grid'
    summaryMenuSprite.draw()
    summaryTargetSprite.draw()
    if(summaryState.attackSummaryInterfaceOpen === true){
        document.querySelector('#summaryAttackDescriptionContainer').style.display = 'grid'
        summaryAttackInterfaceSprite.draw()
    } else {
        document.querySelector('#summaryAttackDescriptionContainer').style.display = 'none'
    }

    if(mouse.pressed === true){
        if(mouse.event.target.classList.value === 'summaryAttackButton'){
            currAttackSummary = attacks[mouse.event.target.textContent]
            if(!currAttackSummary) return
            else if(currAttackSummary.type === 'Status'){
                document.querySelector('#summaryAttackPower').textContent = '---'
            } else document.querySelector('#summaryAttackPower').textContent = currAttackSummary.potency
            document.querySelector('#summaryAttackName').textContent = currAttackSummary.name
            document.querySelector('#summaryAttackType').textContent = currAttackSummary.element
            document.querySelector('#summaryAttackAccuracy').textContent = currAttackSummary.accuracy
            currDisplayedTarget.attacks.forEach(attack =>{
                if(currAttackSummary.name === attack.name){
                    document.querySelector('#summaryAttackPP').textContent = attack.pp
                }
            })
            document.querySelector('#summaryAttackDescription').textContent = currAttackSummary.description
            summaryState.attackSummaryInterfaceOpen = true
        } else summaryState.attackSummaryInterfaceOpen = false
    }

    if(summaryState.animation === false){
        statArray = []
        document.querySelector('#pcTargetMenuContainer').style.height = '1050px'
        document.querySelector('#summaryMenuContainer').style.display = 'none'
        cancelAnimationFrame(animateSummaryMenuId)
    }
}