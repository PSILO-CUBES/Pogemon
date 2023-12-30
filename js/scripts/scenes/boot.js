import { manageOverWorldState } from "./overworld.js"

let bootSceneAnimationId

function bootSceneAnimation(){
    bootSceneAnimationId = window.requestAnimationFrame(bootSceneAnimation)
}

function printBootMenu(){
    const bootSceneDOM = document.querySelector('#bootScene')
    document.querySelector('#content').appendChild(bootSceneDOM)

    const startButtonDOM = document.createElement('div')   
    startButtonDOM.id = 'startButton'
    startButtonDOM.textContent = 'Start'
    startButtonDOM.addEventListener('click', e => initBootMenuInteractionEvent(e))

    bootSceneDOM.appendChild(startButtonDOM)
}

function initBootMenuInteractionEvent(e){
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

setTimeout(() => initBootMenuInteractionEvent(),250)

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