import { Sprite } from "../../classes.js"
import { mapsObj } from "../../data/mapsData.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { player, playerCharacter } from "../player.js"

let trainerAnimationId

function trainerAnimation(timeSpent){
    trainerAnimationId = window.requestAnimationFrame(trainerAnimation)

    backgroundSprite.draw()
}

function printTrainerCard(){
    let sectionArr = document.querySelectorAll('.trainerCardBodyInfoSectionContainerContent')

    let h = 0
    let m = 0
    
    m = Math.floor((new Date().getTime() - player.startTime.getTime()) / 60000)
    if(m <= 60) {
        h = Math.floor(h + (m / 60))
        m = m % 60
    }
    
    if(m < 10){
        m = `0${m}`
    }

    sectionArr.forEach((node, i) =>{
        switch(i){
            case 0:
                node.textContent = `${player.name}`
                break
            case 1:
                node.textContent = `${player.money}`
                break
            case 2:
                // todo
                node.textContent = `0`
                break
            case 3:
                node.textContent = `${h}:${m}`
                break
        }
    })

    document.querySelector('#trainerCardTrainerImg').src = `img/charSprites/${playerCharacter}/${playerCharacter}_Trainer.png`

    for(let i = 0; i < 8; i++){
        const badgeContainer = document.createElement('div')
        badgeContainer.setAttribute('class', 'trainerBadgeContainer')

        const blackedOutBadge = document.createElement('img')
        blackedOutBadge.src = `img/badges/${i}_blank.png`
        blackedOutBadge.setAttribute('class', 'trainerBlackedOutBadge')

        document.querySelector('#trainerCardFooter').appendChild(badgeContainer)
        badgeContainer.appendChild(blackedOutBadge)

        if(player.badges[i]) {
            const badge = document.createElement('img')
            badge.src = `img/badges/${i}.png`
            badge.setAttribute('class', 'trainerBadge')

            badgeContainer.appendChild(badge)
        }
    }
}

function initTrainerScene(){
    scenes.set('trainer', {initiated : true})
    document.querySelector('#trainerScene').style.display = 'block'
    trainerAnimation()
    printTrainerCard()
}

function clearTrainerScene(){
    scenes.set('trainer', {initiated : false})
    document.querySelector('#trainerScene').style.display = 'none'
    document.querySelector('#trainerCardFooter').replaceChildren()
    window.cancelAnimationFrame(trainerAnimationId)
}

export function manageTrainerState(state){
    if(state) initTrainerScene()
    else clearTrainerScene()
}