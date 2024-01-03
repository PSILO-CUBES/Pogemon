import { Sprite } from "../../classes.js"
import { mapsObj } from "../../data/mapsData.js"

import { scenes, backgroundSprite } from "../canvas.js"

let trainerAnimationId

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