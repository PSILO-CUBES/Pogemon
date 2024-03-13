import { volumeValues } from "../../data/audioData.js"
import { loadData } from "../../save.js"
import { manageOverWorldState } from "./overworld.js"

// export let loadedData = await loadData()
// console.log(loadedData)

let bootSceneAnimationId


function bootSceneAnimation(){
    bootSceneAnimationId = window.requestAnimationFrame(bootSceneAnimation)
}

async function printBootMenu(){
    const bootSceneDOM = document.querySelector('#bootScene')
    document.querySelector('#content').appendChild(bootSceneDOM)

    const interactionContainer = document.querySelector('#interactionContainer')

    console.log(await loadData())
    if(await loadData() != null){
        const startButtonDOM = document.createElement('div')
        startButtonDOM.id = 'startButton'
        startButtonDOM.classList.add('bootMenuButton')
        startButtonDOM.textContent = 'Start'
        startButtonDOM.addEventListener('click', e => initBootMenuInteractionEvent(e))

        interactionContainer.appendChild(startButtonDOM)
    }

    const newGameButtonDOM = document.createElement('div')
    newGameButtonDOM.id = 'newGameButton'
    newGameButtonDOM.classList.add('bootMenuButton')
    newGameButtonDOM.textContent = 'New Game'
    newGameButtonDOM.addEventListener('click', e => initNewGameInteractionEvent(e))


    interactionContainer.appendChild(newGameButtonDOM)
}

async function initNewGameInteractionEvent(e){
    if(await loadData() == null){
        volumeValues.SFX = 50
        volumeValues.music = 50
        
        initBootMenuInteractionEvent()

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
    manageOverWorldState(true)
    gsap.to('#overlapping', {
        opacity: 1,
        onComplete: () =>{
            manageBootState(false)
            gsap.to('#overlapping', {
                opacity: 0,
            })
        }
    })
}

// setTimeout(() => initBootMenuInteractionEvent(), 250)

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
    if(state) initBootScene()
    else clearBootScene()
}