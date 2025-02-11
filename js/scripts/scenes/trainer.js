import { Sprite } from "../../classes.js"
import { mapsObj } from "../../data/mapsData.js"
import { loadData } from "../../save.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { player, playerCharacter } from "../player.js"

let trainerAnimationId

function trainerAnimation(timeSpent){
    trainerAnimationId = window.requestAnimationFrame(trainerAnimation)
    printInfo()

    backgroundSprite.draw()
}

export let timeObj = {
    hr: 0,
    min: 0,
    sec: 0
}

const data = await loadData()

function returnAmountOfSeenPogemon(player){
    let i = 0

    let currPlayer = player
    if(data != null) currPlayer = data.playerInfo.player

    currPlayer.pogedexInfo.forEach(dexPogemon =>{
        if(dexPogemon.seen) i += 1  
    })

    return i
}

let amountOfSeenPogemon

function printInfo(){
    const sectionArr = document.querySelectorAll('.trainerCardBodyInfoSectionContainerContent')

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
                node.textContent = amountOfSeenPogemon
                break
            case 3:
                let min = timeObj.min
                if(min < 10) min = `0${min}`

                let hr = timeObj.hr
                if(hr < 10) hr = `0${hr}`

                node.textContent = `${hr}:${min}`
                break
        }
    })
}

function printTrainerCard(){

    // if(data != null){
    //     timeObj = data.timeObj
    // }

    // this is kinda wacky
    timeObj.min += Math.floor((new Date().getTime() - player.startTime.getTime()) / 60000)

    // setTimeout(() =>{
    //     if(min == 0) min = 1
    //     else min += 1
    // }, 1000)

    amountOfSeenPogemon = returnAmountOfSeenPogemon(player)

    printInfo()

    document.querySelector('#trainerCardTrainerImg').src = `img/charSprites/${playerCharacter}/${playerCharacter}_Trainer.png`

    for(let i = 0; i < 3; i++){
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