import { Sprite } from "../../classes.js"

import { scenes } from "../canvas.js"

let trainerAnimationId

const backgroundImg = new Image()
backgroundImg.src = '../../../img/background.png'
const backgroundSprite = new Sprite({
    type: 'background',
    position:{
        x: 0,
        y: 0
    },
    img: backgroundImg,
})

function trainerAnimation(timeSpent){
    trainerAnimationId = window.requestAnimationFrame(trainerAnimation)

    backgroundSprite.draw()
}

function initTrainerScene(){
    scenes.set('trainer', {initiated : true})
    trainerAnimation()
}

function clearTrainerScene(){
    scenes.set('trainer', {initiated : false})
    window.cancelAnimationFrame(trainerAnimationId)
}

export function manageTrainerState(state){
    if(state) initTrainerScene()
    else clearTrainerScene()
}