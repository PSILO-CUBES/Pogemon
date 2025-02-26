import { audioObj, volumeValues } from "../../data/audioData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { loadData, setSaveData } from "../../save.js"
import { manageOverWorldState, waitForNextBattle } from "./overworld.js"
import { timeObj } from "./trainer.js"

export const data = await loadData("saveFile")

let bootSceneAnimationId

function bootSceneAnimation(){
    bootSceneAnimationId = window.requestAnimationFrame(bootSceneAnimation)
}

export let playerName

function printSaveFileInfo(badgeContainer, trainerInfoContainer, trainerTeamContainer){
    function printBadgeInfo(badgeContainer){
        Object.values(data.playerInfo.player.badges).forEach((badge,i) =>{
            const badgeImg = new Image
            if(badge) badgeImg.src = `img/badges/${i}.png`
            else badgeImg.src = `img/badges/${i}_blank.png`

            badgeContainer.appendChild(badgeImg)
        })
    }

    function printTrainerInfo(trainerInfoContainer){

        trainerInfoContainer.classList.remove('noSaveCentering')
        trainerInfoContainer.replaceChildren()

        // make info and image containers
        for(let i = 0; i < 2; i++){
            const trainerInfoSubContainer = document.createElement('div')
            if(i == 0) trainerInfoSubContainer.id = 'trainerInfoSubContainer'
            else trainerInfoSubContainer.id = 'trainerImageContainer'

            trainerInfoContainer.appendChild(trainerInfoSubContainer)
        }

        for(let i = 0; i < 3; i++){
            const trainerInfoSubContainerContent = document.createElement('div')
            trainerInfoSubContainerContent.setAttribute('class', 'trainerInfoSubContainerContent')

            trainerInfoContainer.childNodes[0].appendChild(trainerInfoSubContainerContent)

            for(let j = 0; j < 2; j++){
                const trainerInfoSubContainerContentDisplay = document.createElement('div')
                trainerInfoSubContainerContentDisplay.setAttribute('class', 'trainerInfoSubContainerContentDisplay')

                function returnCorrectlyFormatedTime(){
                    let txt
                    
                    timeObj.hr = data.timeObj.hr
                    timeObj.min = data.timeObj.min
                    timeObj.sec = data.timeObj.sec

                    if(data.timeObj.hr < 10) txt = `0${data.timeObj.hr}`
                    else txt = `${data.timeObj.hr}`

                    txt += ':'

                    if(data.timeObj.min < 10) txt += `0${data.timeObj.min}`
                    else txt += `${data.timeObj.min}`

                    return txt
                }

                function returnPogedexCount(){
                    let count = 0

                    Object.values(data.playerInfo.player.pogedexInfo).forEach(pogemon =>{
                        if(pogemon.seen) count += 1
                    })

                    return count
                }

                switch(i){
                    case 0:
                        if(j == 0) trainerInfoSubContainerContentDisplay.textContent = 'NAME :'
                        else trainerInfoSubContainerContentDisplay.textContent = data.playerInfo.player.name
                        break
                    case 1:
                        if(j == 0) trainerInfoSubContainerContentDisplay.textContent = 'TIME :'
                        else trainerInfoSubContainerContentDisplay.textContent = returnCorrectlyFormatedTime()
                        break
                    case 2:
                        if(j == 0) trainerInfoSubContainerContentDisplay.textContent = 'POGEDEX :'
                        else trainerInfoSubContainerContentDisplay.textContent = returnPogedexCount()
                        break
                }
    
                trainerInfoSubContainerContent.appendChild(trainerInfoSubContainerContentDisplay)
            }
        }

        const trainerImg = new Image()
        trainerImg.src = `img/charSprites/${data.playerInfo.player.playerCharacter}/${data.playerInfo.player.playerCharacter}_Trainer.png`

        trainerInfoContainer.childNodes[1].appendChild(trainerImg)
    }

    function printPogemonImg(trainerTeamContainer){
        const player = data.playerInfo.player

        for(let i = 0; i < player.team.length; i++){
            const pogemonImg = new Image()

            if(player.team[i].isShiny) pogemonImg.src = pogemonsObj[`${player.team[i].name}`].sprites.shiny.sprite
            else pogemonImg.src = pogemonsObj[`${player.team[i].name}`].sprites.classic.sprite

            trainerTeamContainer.appendChild(pogemonImg)
        }
    }

    printBadgeInfo(badgeContainer)
    printTrainerInfo(trainerInfoContainer)
    printPogemonImg(trainerTeamContainer)
}

console.log(data)

function printBootMenu(){
    const bootSceneDOM = document.querySelector('#bootScene')
    document.querySelector('#content').appendChild(bootSceneDOM)

    const interactionContainer = document.querySelector('#interactionContainer')

    const badgeContainer = document.querySelector('#badgeContainer')
    const trainerInfoContainer = document.querySelector('#trainerInfoContainer')
    const trainerTeamContainer = document.querySelector('#trainerTeamContainer')

    const newGameImportContainer = document.createElement('div')
    newGameImportContainer.id = 'newGameImportContainer'
    trainerInfoContainer.appendChild(newGameImportContainer)

    const newGameNoSaveContainer = document.createElement('div')
    newGameNoSaveContainer.id = 'newGameNoSaveContainer'
    newGameNoSaveContainer.setAttribute('class', 'noSaveCentering')
    newGameNoSaveContainer.textContent = 'no save file found'
    newGameImportContainer.appendChild(newGameNoSaveContainer)

    const newGameJSONInputFieldContainer = document.createElement('div')
    newGameJSONInputFieldContainer.id = 'newGameJSONInputFieldContainer'
    newGameJSONInputFieldContainer.setAttribute('class', 'noSaveCentering')
    newGameImportContainer.appendChild(newGameJSONInputFieldContainer)

    const newGameJSONInputField = document.createElement('input')
    newGameJSONInputField.placeholder = 'copy save file JSON here'
    newGameJSONInputField.id = 'newGameJSONInputField'
    newGameJSONInputFieldContainer.appendChild(newGameJSONInputField)
    newGameJSONInputField.addEventListener('input', e =>{
        if(e.data != null) {
            const parsedData = JSON.parse(e.data)
            setSaveData('saveFile', parsedData)
            location.reload()
        }
    })

    newGameJSONInputField.addEventListener('keydown', e =>{
        if(e.data != null) {
            const parsedData = JSON.parse(e.data)
            setSaveData('saveFile', parsedData)
            location.reload()
        }
    })
    
    // trainerInfoContainer.textContent = 'no save file found'
    // trainerInfoContainer.setAttribute('class', 'noSaveCentering')

    if(data != null){
        const startButtonDOM = document.createElement('div')
        startButtonDOM.id = 'startButton'
        startButtonDOM.classList.add('bootMenuButton')
        startButtonDOM.textContent = 'Continue'
        startButtonDOM.addEventListener('click', e => initBootMenuInteractionEvent(e))

        interactionContainer.appendChild(startButtonDOM)

        printSaveFileInfo(badgeContainer, trainerInfoContainer, trainerTeamContainer)
    }

    const newGameButtonDOM = document.createElement('div')
    newGameButtonDOM.id = 'newGameButton'
    newGameButtonDOM.classList.add('bootMenuButton')
    newGameButtonDOM.textContent = 'New Game'
    // newGameButtonDOM.addEventListener('click', e => initBootMenuInteractionEvent(e))
    
    newGameButtonDOM.addEventListener('click', e => initNewGameInteractionEvent(e))


    interactionContainer.appendChild(newGameButtonDOM)
}

export let newGame = false

function initNewGameInteractionEvent(e){
    if(data == null){
        newGame = true

        volumeValues.SFX = 50
        volumeValues.music = 50

        // playerName = 'player'

        function namedEvent(){
            document.querySelector('#namePlayerConfirmButton').style.display = 'none'
            gsap.to('#overlapping', {
                opacity: 1,
                duration: 0.5,
                onComplete: () =>{
                    const overlapping = document.querySelector('#overlapping')

                    setTimeout(() =>{
                        overlapping.innerText = `You feel warm and comfortable.\n\n${playerName}, it's time to wake up!`

                        setTimeout(() =>{
                            initBootMenuInteractionEvent(e)

                            setTimeout(() =>{
                                overlapping.innerText = ``
                            }, 750)
                        }, 2250)
                    }, 750)


                }
            })
        }

        gsap.to('#overlapping', {
            opacity: 1,
            duration: 0.5,
            onComplete: () =>{
                document.querySelector('#namePlayerContainer').style.display = 'grid'
                document.querySelector('#namePlayerDialogueContainer').innerText = `Hey you, you're bearly awake.\n\nWhat's your name?`

                let name
        
                document.querySelector('#namePlayerInput').addEventListener('input', e => {
                    name = document.querySelector('#namePlayerInput').value
                })

                document.querySelector('#namePlayerInput').addEventListener('keyup', e =>{
                    document.querySelector('#namePlayerInput').value = document.querySelector('#namePlayerInput').value.replace(/[^A-z]/g, '')
                })

                // document.getElementById("namePlayerInput").keydown = e => {
                //     var chr = String.fromCharCode(e.which)

                //     console.log(chr)

                //     if ("12345NOABC".indexOf(chr) < 0)
                //         console.log('works')
                // }
        
                document.querySelector('#namePlayerConfirmButton').innerText = 'confirm'
                document.querySelector('#namePlayerConfirmButton').addEventListener('click', e =>{
                    if(name == undefined) return
                    if(/[^A-z]/g.test(name)) return
                    playerName = name.replace(/[^A-z]/g, '')
                    namedEvent()
                })
                
                gsap.to('#overlapping', {
                    opacity: 0,
                    duration: 0.5,
                })
            }
        })
        




        // initBootMenuInteractionEvent()
        return
    }

    const bootMenuDom = document.querySelector('#bootScene')

    const warningWindowContainerDom = document.createElement('div')
    warningWindowContainerDom.id = 'warningWindowContainerDom'
    bootMenuDom.appendChild(warningWindowContainerDom)

    gsap.to(warningWindowContainerDom, {
        opacity: 1,
        duration: 1
    })

    const warningWindowDom = document.createElement('div')
    warningWindowDom.id = 'warningWindow'
    warningWindowContainerDom.appendChild(warningWindowDom)

    const warningWindowDialogueDom = document.createElement('div')
    warningWindowDialogueDom.id = 'warningWindowDialogue'
    warningWindowDom.appendChild(warningWindowDialogueDom)

    const warningWindowDialogueHeaderDom = document.createElement('div')
    warningWindowDialogueHeaderDom.id = 'warningWindowDialogueHeaderDom'
    warningWindowDialogueDom.appendChild(warningWindowDialogueHeaderDom)

    warningWindowDialogueHeaderDom.innerText = 'WARINING!!'

    const warningWindowDialogueContentDom = document.createElement('div')
    warningWindowDialogueContentDom.id = 'warningWindowDialogueContentDom'
    warningWindowDialogueDom.appendChild(warningWindowDialogueContentDom)

    warningWindowDialogueContentDom.innerText = 'To proceed to a new game,you will need to delete your old save file.\n\nAre you sure you want to do this?'

    const warningWindowInteractionContainerDom = document.createElement('div')
    warningWindowInteractionContainerDom.id = 'warningWindowInteractionContainer'
    warningWindowDom.appendChild(warningWindowInteractionContainerDom)

    for(let i = 0; i < 2; i++){
        const warningWindowInteractionDom = document.createElement('div')
        warningWindowInteractionDom.id = 'warningWindowInteractionDom'
        warningWindowInteractionContainerDom.appendChild(warningWindowInteractionDom)

        if(i == 0) {
            warningWindowInteractionDom.textContent = 'yes'
            warningWindowInteractionDom.addEventListener('click', e => {
                localStorage.clear()
                location.reload()
            })
        } else {
            warningWindowInteractionDom.textContent = 'no'
            warningWindowInteractionDom.addEventListener('click', e => {
                warningWindowContainerDom.remove()
            })
        }
    }
}

function initBootMenuInteractionEvent(e){
    // load data here ???
    manageOverWorldState(true, 'boot')
    gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
            incrementMinuteLoop()
            waitForNextBattle.initiated = true
            manageBootState(false)
            gsap.to('#overlapping', {
                opacity: 0
            })
        }
    })
}

// setTimeout(() => initBootMenuInteractionEvent(), 500)

function initBootScene(){
    printBootMenu()
    bootSceneAnimation()
}

function clearBootScene(){
    window.cancelAnimationFrame(bootSceneAnimation)
    const bootSceneDOM = document.querySelector('#bootScene')
    bootSceneDOM.style.display = 'none'
}

export function manageBootState(state){
    setTimeout(() =>{
        waitForNextBattle.initiated = false
    }, 1500)
    if(state) initBootScene()
    else clearBootScene()
}

let prevDate = new Date
let prevSec = prevDate.getSeconds()

function incrementMinuteLoop(){
    setTimeout(() =>{
        let currDate = new Date
        let currSec = currDate.getSeconds()

        if(prevSec != currSec) {
            prevSec = currSec

            timeObj.sec += 1
    
            if(timeObj.sec == 60){
                timeObj.min += 1
                timeObj.sec = 0
            }
    
            if(timeObj.min == 60){
                timeObj.hr += 1
                timeObj.min = 0
            }
        }

        incrementMinuteLoop()
    }, 500)
}

document.addEventListener('keydown', e => {
    if(e.code === "Tab") e.preventDefault()
}, true);