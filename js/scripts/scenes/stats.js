import { Sprite } from "../../classes.js"

let statsAnimationFrame

let selectedPogemon

const pogemonImg = new Image()
const pogemonSprite = new Sprite({
    type: 'stats',
    position:{
        x: window.innerWidth / 2.35,
        y: window.innerHeight / 4.5
    },
    img: pogemonImg,
    frames: {
        max: 4,
        hold: 50
    },
    animate: true
})

const backgroundImg = new Image()
backgroundImg.src = '../../../img/background.png'
const backgroundSprite = new Sprite({
    type: 'background',
    position:{
        x:0,
        y:0
    },
    img: backgroundImg
})

pogemonImg.src = '../../../img/female_icon.png'

function statsAnimation(){
    statsAnimationFrame = window.requestAnimationFrame(statsAnimation)

    backgroundSprite.draw()
    pogemonSprite.draw()
}

function createMenu(){
    const statsScene = document.createElement('div')

}

function setStatsMenu(){
    statsAnimation()
    pogemonImg.src = `../../../img/pogemon/${selectedPogemon.name}/${selectedPogemon.name}_Animation.png`
}

function clearStatsMenu(){
    window.cancelAnimationFrame(statsAnimation)
}

export function manageStatsState(state, target){
    selectedPogemon = target
    if(state) setStatsMenu()
    else clearStatsMenu()
}