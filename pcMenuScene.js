// all background images

const pcSceneBackgroundImage = new Image()
pcSceneBackgroundImage.src = 'img/pc_scene/pcSceneBackground.png'

const pcSceneBackgroundSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: pcSceneBackgroundImage,
    animate: false,
    opacity: 1,
})

const pcDisplayTargetMenuImage = new Image()
pcDisplayTargetMenuImage.src = 'img/pc_scene/pcTargetMenu.png'

const pcDisplayTargetMenuSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: pcDisplayTargetMenuImage,
    animate: false,
    opacity: 1,
})

const pcDisplayTeamMenuImage = new Image()
pcDisplayTeamMenuImage.src = 'img/pc_scene/pcTeamMenu.png'

const pcDisplayTeamMenuSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: pcDisplayTeamMenuImage,
    animate: false,
    opacity: 1,
})

const boxDisplayImage = new Image()
boxDisplayImage.src = 'img/pc_scene/boxThemeForest.png'

let boxDisplaySprite = new Sprite({
    position:{
        x: 575,
        y: 25
    },
    image: boxDisplayImage,
    animate: false,
    opacity: 1,
})

// team Display

let renderedTeamBoxSprites = []
let renderedBoxSprites = []
let leedPogemonBoxSprite
let backPogemon1BoxSprite
let backPogemon2BoxSprite
let backPogemon3BoxSprite
let backPogemon4BoxSprite
let backPogemon5BoxSprite
let currBox = 0

let defineBoxTeamSprite = () =>{

    const leedPogemonBoxImage = new Image()
    leedPogemonBoxImage.src = pogemons[team[0].name].sprites.menuAnimation.src
    leedPogemonBoxSprite = new Sprite({
        position:{
            x: 75,
            y: 350
        },
        frames: {
            max: 4,
            hold: 50
        },
        image: leedPogemonBoxImage,
        animate: true,
        opacity: 1,
    })
    renderedTeamBoxSprites.push(leedPogemonBoxSprite)

    if(team[1] !== undefined){
        const backPogemon1BoxImage = new Image()
        backPogemon1BoxImage.src = pogemons[team[1].name].sprites.menuAnimation.src
        backPogemon1BoxSprite = new Sprite({
            position:{
                x: 360,
                y: 57.5
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon1BoxImage,
            animate: true,
            opacity: 1,
        })
        renderedTeamBoxSprites.push(backPogemon1BoxSprite)
    }

    if(team[2] !== undefined){
        let backPogemon2BoxSprite
        const backPogemon2BoxImage = new Image()
        backPogemon2BoxImage.src = pogemons[team[2].name].sprites.menuAnimation.src
        backPogemon2BoxSprite = new Sprite({
            position:{
                x: 360,
                y: 205
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon2BoxImage,
            animate: true,
            opacity: 1,
        })
        renderedTeamBoxSprites.push(backPogemon2BoxSprite)
    }

    if(team[3] !== undefined){
        let backPogemon3BoxSprite
        const backPogemon3BoxImage = new Image()
        backPogemon3BoxImage.src = pogemons[team[3].name].sprites.menuAnimation.src
        backPogemon3BoxSprite = new Sprite({
            position:{
                x: 360,
                y: 352.5
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon3BoxImage,
            animate: true,
            opacity: 1,
        })
        renderedTeamBoxSprites.push(backPogemon3BoxSprite)
    }

    if(team[4] !== undefined){
        let backPogemon4BoxSprite
        const backPogemon4BoxImage = new Image()
        backPogemon4BoxImage.src = pogemons[team[4].name].sprites.menuAnimation.src
        backPogemon4BoxSprite = new Sprite({
            position:{
                x: 360,
                y: 502
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon4BoxImage,
            animate: true,
            opacity: 1,
        })
        renderedTeamBoxSprites.push(backPogemon4BoxSprite)
    }

    if(team[5] !== undefined){
        let backPogemon5BoxSprite
        const backPogemon5BoxImage = new Image()
        backPogemon5BoxImage.src = pogemons[team[5].name].sprites.menuAnimation.src
        backPogemon5BoxSprite = new Sprite({
            position:{
                x: 360,
                y: 650
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: backPogemon5BoxImage,
            animate: true,
            opacity: 1,
        })
        renderedTeamBoxSprites.push(backPogemon5BoxSprite)
    }
}

let defineBoxSprites = () =>{
    let boxPogemonSprite
    let i = 0
    let j = 0
    renderedBoxSprites = []
    pogemonStorage[currBox].forEach(pogemon =>{
        const boxPogemonImage = new Image()
        boxPogemonImage.src = pogemons[pogemon.name].sprites.menuAnimation.src
        if (i === 6){
            i = 0
            j++
        }
        boxPogemonSprite = new Sprite({
            position:{
                x: 150 * i++ + 625,
                y: 145 * j + 250
            },
            frames: {
                max: 4,
                hold: 50
            },
            image: boxPogemonImage,
            animate: true,
            opacity: 1,
        })
        renderedBoxSprites.push(boxPogemonSprite)
    })
}

let defineTargetSprite = () =>{
    const targetPogemonImage = new Image()
    if (pcStorage.targetMenuShowing === true){
        if(pogemonStorage[currBox][firstPositionId] !== undefined){
            targetPogemonImage.src = pogemons[pogemonStorage[currBox][firstPositionId].name].sprites.animation.src
            document.querySelector('#targetPogemonInfo').textContent = pogemonStorage[currBox][firstPositionId].name
        } else document.querySelector('#targetPogemonInfo').textContent = ''
    } else document.querySelector('#targetPogemonInfo').textContent = ''

    targetPogemonSprite = new Sprite({
        position:{
            x: 125,
            y: 145
        },
        frames: {
            max: 4,
            hold: 50
        },
        image: targetPogemonImage,
        animate: true,
        opacity: 1,
    })
}

let pcStorage = {
    animation: false,
    teamMenuShowing: false,
    targetMenuShowing: true,
    movingInProgress: false,
    releaseInProgress: false,
    played: false,
    displayInfoFlagChanged: false
}

let targetBox
const initTargetBoxId = 0
let currTargetBoxId = initTargetBoxId
let firstPositionId
let secondPositionId
let targetBoxDOM
let boxSwitchArray = []
let boxSummaryId = undefined

let mountTargetBoxes = () =>{
    for (let column = 0; column < 6; column++){
        for (let row = 0; row < 5; row++){
            targetBox = document.createElement('button')
            targetBox.classList = 'targetBoxes'
            if (currTargetBoxId >= 30){
                currTargetBoxId = 0
            }
            let targetBoxId = currTargetBoxId++
            targetBox.setAttribute('id', targetBoxId)
            targetBoxDOM = document.querySelectorAll('.targetBoxes')
            document.querySelector('#box').appendChild(targetBox)
        }
    } 
}

let putSwitchInProcess = targetCase =>{
    if(targetCase === 'boxMenuTeamButton' && pcStorage.movingInProgress === false){
        pcStorage.movingInProgress = true
    }
}

let displayCurrBox = () =>{
    if(currBox === 5){
        currBox = 0
    } else if (currBox === -1){
        currBox = 4
    }
    switch(currBox){
        case 0:
            document.querySelector('#boxIdDisplayName').textContent = 'Box 1'
            boxDisplayImage.src = 'img/pc_scene/boxThemeForest.png'
            boxDisplaySprite = new Sprite({
                position:{
                    x: 575,
                    y: 25
                },
                image: boxDisplayImage,
                animate: false,
                opacity: 1,
            })
            break
        case 1:
            document.querySelector('#boxIdDisplayName').textContent = 'Box 2'
            boxDisplayImage.src = 'img/pc_scene/boxThemeMystic.png'
            boxDisplaySprite = new Sprite({
                position:{
                    x: 575,
                    y: 25
                },
                image: boxDisplayImage,
                animate: false,
                opacity: 1,
            })
            break
        case 2:
            document.querySelector('#boxIdDisplayName').textContent = 'Box 3'
            boxDisplayImage.src = 'img/pc_scene/boxThemeCave.png'
            boxDisplaySprite = new Sprite({
                position:{
                    x: 575,
                    y: 25
                },
                image: boxDisplayImage,
                animate: false,
                opacity: 1,
            })
            break
        case 3:
            document.querySelector('#boxIdDisplayName').textContent = 'Box 4'
            boxDisplayImage.src = 'img/pc_scene/boxThemeOcean.png'
            boxDisplaySprite = new Sprite({
                position:{
                    x: 575,
                    y: 25
                },
                image: boxDisplayImage,
                animate: false,
                opacity: 1,
            })
            break
        case 4:
            document.querySelector('#boxIdDisplayName').textContent = 'Box 5'
            boxDisplayImage.src = 'img/pc_scene/boxThemeCity.png'
            boxDisplaySprite = new Sprite({
                position:{
                    x: 575,
                    y: 25
                },
                image: boxDisplayImage,
                animate: false,
                opacity: 1,
            })
            break
    }
}

let initPcStorageDisplay = () =>{
    mountTargetBoxes()
    defineBoxTeamSprite()
    defineBoxSprites()
    defineTargetSprite()
    displayCurrBox()
}

// start animation

let animatePcStorage = () =>{
    let animatePcStorageId = requestAnimationFrame(animatePcStorage)
    menu.open = false
    document.querySelector('#boxInterfaceContainer').style.display = 'grid'

    pcSceneBackgroundSprite.draw()
    if (pcStorage.teamMenuShowing === true){
        pcDisplayTeamMenuSprite.draw()
        renderedTeamBoxSprites.forEach(pogemonTeamSprite =>{
            pogemonTeamSprite.draw()
        })
    } else if(pcStorage.targetMenuShowing === true) {
        pcDisplayTargetMenuSprite.draw()
        targetPogemonSprite.draw()
    }
    
    boxDisplaySprite.draw()
    renderedBoxSprites.forEach(pogemonBoxSprite =>{
        pogemonBoxSprite.draw()
    })

    let checkIfBoxTargetClicked = targetCase =>{

        let makeBoxButtonsTransparent = () =>{
            document.querySelectorAll('.targetBoxes').forEach(targetBox =>{
                if(targetCase === undefined){
                    targetBox.style.backgroundColor = 'transparent'
                }
            })
        }

        let makeTeamButtonsTransparent = () =>{
            document.querySelectorAll('.pcTeamButton').forEach(button =>{
                button.style.backgroundColor = 'transparent'
            })
        }

        if(mouse.event.target.classList.value === 'pcTeamButton'){
            makeTeamButtonsTransparent()
            let buttonId =  '#' + mouse.event.target.id
            document.querySelector(buttonId).style.backgroundColor = 'rgba(175, 100, 100, 0.5)'
        } else if(mouse.event.target.id != 'boxMenuMoveButton'){
            makeTeamButtonsTransparent()
        }

        if(mouse.event.target.classList.value === 'targetBoxes'){
            makeBoxButtonsTransparent()
            let targetId = `[id="${targetCase}"]`
            document.querySelector(targetId).style.backgroundColor = 'rgba(100, 100, 100, 0.5)'
            defineTargetSprite()
        } else if(mouse.event.target.id != 'boxMenuMoveButton'){
            makeBoxButtonsTransparent()
        }
    }


    let changeBoxArrayIndex = (firstPosition, secondPosition) =>{
        let firstPositionIndex
        let secondPositionIndex
        let firstPositionArray
        let secondPositionArray
        switch(firstPosition){
            case 'pcTeamButton':
                firstPositionIndex = firstPositionId
                firstPositionArray = team
                break
            case 'targetBoxes':
                firstPositionIndex = parseInt(firstPositionId)
                firstPositionArray = pogemonStorage[currBox]
                break
        }
        switch(secondPosition){
            case 'pcTeamButton':
                secondPositionIndex = secondPositionId
                secondPositionArray = team
                break
            case 'targetBoxes':
                secondPositionIndex = parseInt(mouse.event.target.id)
                secondPositionArray = pogemonStorage[currBox]
                break
        }

        if (firstPositionArray[firstPositionIndex] === undefined || secondPositionArray[secondPositionIndex] === undefined) {
            document.querySelector('#boxMenuMoveButton').style.backgroundColor = 'transparent'
            boxSwitchArray = []
            pcStorage.movingInProgress = false
            return
        }
        document.querySelector('#boxMenuMoveButton').style.backgroundColor = 'transparent'
        let teamPlaceholderVar = firstPositionArray[firstPositionIndex]
        firstPositionArray[firstPositionIndex] = secondPositionArray[secondPositionIndex]
        secondPositionArray[secondPositionIndex] = teamPlaceholderVar
        boxSwitchArray = []
        pcStorage.movingInProgress = false
    }

    if(mouse.pressed === true){
        checkIfBoxTargetClicked(mouse.event.target.id)

        switch (mouse.event.target.textContent || mouse.event.target.classList.value){
            case 'CLOSE':
                pcStorage.teamMenuShowing = false
                pcStorage.targetMenuShowing = true
                document.querySelector('#pcTeamMenuContainer').style.display = 'none' 
                document.querySelector('#pcTargetMenuContainer').style.display = 'grid'
                if(pcStorage.teamMenuShowing === false){
                    document.querySelector('#boxMenuMoveButton').textContent = 'TEAM'
                    document.querySelector('#boxMenuMoveButton').id = 'boxMenuTeamButton'
                }
                break
            case 'TEAM':
                pcStorage.teamMenuShowing = true
                pcStorage.targetMenuShowing = false
                document.querySelector('#pcTargetMenuContainer').style.display = 'none' 
                document.querySelector('#pcTeamMenuContainer').style.display = 'grid'
                if(pcStorage.teamMenuShowing === true){
                    document.querySelector('#boxMenuTeamButton').textContent = 'MOVE'
                    document.querySelector('#boxMenuTeamButton').id = 'boxMenuMoveButton'
                }
                break 
            case 'MOVE':
                if(boxSwitchArray.length === 0) return
                else pcStorage.movingInProgress = true
                break
            case 'SUMMARY':
                pcStorage.animation = false
                summaryState.animation = true
                break
            case 'RELEASE':
                if(boxSwitchArray[0] === undefined) return
                else {
                    let pogemonToRelease
                    if(boxSwitchArray[0] === 'pcTeamButton') {
                        if (!pcStorage.played){
                            audio.error.play()
                            pcStorage.played = true
                        }
                        return
                    }
                    else {
                        pogemonToRelease = pogemonStorage[currBox][firstPositionId].name
                        document.querySelector('#releaseConfirmationContainer').style.display = 'grid'
                        document.querySelector('#releaseTextContainer').textContent = 'Are you sure you want to release your boi ' + pogemonToRelease
                        pcStorage.releaseInProgress = true
                    }
                }
                break
            case 'CANCEL':
                document.querySelector('#boxMenuContainer').style.display = 'none'
                break
            case 'targetBoxes':
                document.querySelector('#boxMenuContainer').style.display = 'grid'
                break
            case 'pcTeamButton':
                document.querySelector('#boxMenuContainer').style.display = 'grid'
                break
        }

        switch(mouse.event.target.id){
            case 'boxIdDisplayLeftArrow':
                if(!pcStorage.displayInfoFlagChanged){
                        currBox--
                        displayCurrBox()
                        defineBoxSprites()
                        pcStorage.displayInfoFlagChanged = true
                }
                break
            case 'boxIdDisplayRightArrow':
                if(!pcStorage.displayInfoFlagChanged){
                    currBox++
                    displayCurrBox()
                    defineBoxSprites()
                    pcStorage.displayInfoFlagChanged = true
                }
                break
        }

        if(pcStorage.releaseInProgress === true){
            switch(mouse.event.target.textContent){
                case 'yes':
                    pogemonStorage[currBox].splice(parseInt(firstPositionId), 1)
                    renderedBoxSprites = []
                    defineBoxSprites()
                    pcStorage.releaseInProgress = false
                    break
                case 'no':
                    pcStorage.releaseInProgress = false
                    break
            }
        } else if(pcStorage.releaseInProgress === false){
            document.querySelector('#releaseConfirmationContainer').style.display = 'none'
        }

        if(pcStorage.movingInProgress === true){
            document.querySelector('#boxMenuMoveButton').style.backgroundColor = 'grey'
            if(boxSwitchArray.length === 1){
                if(mouse.event.target.classList.value === 'targetBoxes'){
                    renderedTeamBoxSprites= []
                    renderedBoxSprites = []
                    boxSwitchArray.push(mouse.event.target.classList.value)
                    changeBoxArrayIndex(boxSwitchArray[0], boxSwitchArray[1])
                    defineBoxTeamSprite()
                    defineBoxSprites()
                } else if (mouse.event.target.classList.value === 'pcTeamButton'){
                    renderedTeamBoxSprites = []
                    renderedBoxSprites = []
                    boxSwitchArray.push(mouse.event.target.classList.value)
                    boxSummaryId = mouse.event.taget.id
                    switch(mouse.event.target.id){
                        case 'leedPogemonPcTeam':
                            secondPositionId = 0
                            break
                        case 'backPogemon1PcTeam':
                            secondPositionId = 1
                            break
                        case 'backPogemon2PcTeam':
                            secondPositionId = 2
                            break
                        case 'backPogemon3PcTeam':
                            secondPositionId = 3
                            break
                        case 'backPogemon4PcTeam':
                            secondPositionId = 4
                            break
                        case 'backPogemon5PcTeam':
                            secondPositionId = 5
                            break
                    }
                    // remember
                    changeBoxArrayIndex(boxSwitchArray[0], boxSwitchArray[1]) 
                    defineBoxTeamSprite()
                    defineBoxSprites()
                }
            }
        } else if(boxSwitchArray.length === 0){
            if(mouse.event.target.classList.value === 'targetBoxes'){
                boxSwitchArray.push(mouse.event.target.classList.value)
                firstPositionId = mouse.event.target.id
            } else if (mouse.event.target.classList.value === 'pcTeamButton'){
                boxSwitchArray.push(mouse.event.target.classList.value)
                switch(mouse.event.target.id){
                    case 'leedPogemonPcTeam':
                        firstPositionId = 0
                        break
                    case 'backPogemon1PcTeam':
                        firstPositionId = 1
                        break
                    case 'backPogemon2PcTeam':
                        firstPositionId = 2
                        break
                    case 'backPogemon3PcTeam':
                        firstPositionId = 3
                        break
                    case 'backPogemon4PcTeam':
                        firstPositionId = 4
                        break
                    case 'backPogemon5PcTeam':
                        firstPositionId = 5
                        break
                }
            }
        } else {
            boxSwitchArray.pop()
            if(mouse.event.target.classList.value === 'targetBoxes'){
                boxSwitchArray.push(mouse.event.target.classList.value)
                firstPositionId = mouse.event.target.id
            } else if (mouse.event.target.classList.value === 'pcTeamButton'){
                boxSwitchArray.push(mouse.event.target.classList.value)
                switch(mouse.event.target.id){
                    case 'leedPogemonPcTeam':
                        firstPositionId = 0
                        break
                    case 'backPogemon1PcTeam':
                        firstPositionId = 1
                        break
                    case 'backPogemon2PcTeam':
                        firstPositionId = 2
                        break
                    case 'backPogemon3PcTeam':
                        firstPositionId = 3
                        break
                    case 'backPogemon4PcTeam':
                        firstPositionId = 4
                        break
                    case 'backPogemon5PcTeam':
                        firstPositionId = 5
                        break
                }
            }
        }
        putSwitchInProcess(mouse.event.target.id)
    } else if (!mouse.pressed){
        pcStorage.played = false
        pcStorage.displayInfoFlagChanged = false
    }

    if (!pcStorage.animation) {
        renderedTeamBoxSprites = []
        renderedBoxSprites = []
        document.querySelector('#boxInterfaceContainer').style.display = 'none'
        document.querySelectorAll('.targetBoxes').forEach(box =>{
            box.remove()
        })
        cancelAnimationFrame(animatePcStorageId)
        gsap.to('#overlappingDiv', {
            opacity: 1,
            duration: 0.4,
            onComplete: () =>{
                if (summaryState.animation === true){
                    lastMenuOpen = 'pcMenu'
                    initSummaryMenu()
                    animateSummaryMenu()
                } else animate()
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4
                })
            }
        })
    }
}