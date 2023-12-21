import { mapsObj } from "../../data/mapsData.js"
import { pogemonsObj } from "../../data/pogemonData.js"

import { Sprite } from "../../classes.js"

import { scenes } from "../canvas.js"

let pogedexAnimationId

const backgroundImg = new Image()
backgroundImg.src = mapsObj['background']
const backgroundSprite = new Sprite({
    type: 'background',
    position:{
        x: 0,
        y: 0
    },
    img: backgroundImg,
})

const pogedexTargetImg = new Image()
const pogedexTargetSprite = new Sprite({
    type: 'pogedexTarget',
    position:{
        x: 375,
        y: 250
    },
    img: pogedexTargetImg,
    frames: {
        max: 4,
        hold: 50
    },
    animate: true,
})

function pogedexAnimation(timeSpent){
    pogedexAnimationId = window.requestAnimationFrame(pogedexAnimation)

    backgroundSprite.draw()
    pogedexTargetSprite.draw()
}

function changeTargetPogemonInfo(target){
    document.querySelector('#pogedexSceneTargetSectionDetailNumber').innerText = `${target.pogedex}`
    document.querySelector('#pogedexSceneTargetSectionDetailName').innerText = `${target.name}`
    document.querySelector('#pogedexSceneTargetMoreInfoButton').innerText = 'INFO+'
    document.querySelector('#pogedexSceneTargetMoreInfoButton').classList.add('infoHover')

    pogedexTargetImg.src = `${target.sprites.frontSprite}`
}

function pogedexSectionClickEvent(e){
    document.querySelectorAll(`.${e.target.parentNode.classList[0]}`).forEach(node =>{
        node.style.background = 'rgb(75,75,75)'
    })

    e.target.parentNode.style.background = 'rgb(150,150,150)'

    changeTargetPogemonInfo(pogemonsObj[`${e.target.parentNode.childNodes[2].innerText.toLowerCase()}`])
}

function pogedexCancelClickEvent(e){
    if(e.target.parentNode.classList[0] == 'pogedexSceneScrollContent') return
    document.querySelectorAll(`.pogedexSceneScrollContent`).forEach(node =>{
        node.style.background = 'rgb(75,75,75)'
    })

    document.querySelector('#pogedexSceneTargetSectionDetailNumber').innerText = ``
    document.querySelector('#pogedexSceneTargetSectionDetailName').innerText = ``
    document.querySelector('#pogedexSceneTargetMoreInfoButton').innerText = ``
    document.querySelector('#pogedexSceneTargetMoreInfoButton').className = ``


    pogedexTargetImg.src = ''
}

function createPogedexMenu(){
    const pogedexScene = document.querySelector('#pogedexScene')

    const pogedexSceneContainer = document.createElement('div')
    pogedexSceneContainer.id = 'pogedexSceneContainer'
    pogedexSceneContainer.addEventListener('click', e => pogedexCancelClickEvent(e))

    pogedexScene.appendChild(pogedexSceneContainer)

    const pogedexSceneGrid = document.createElement('div')
    pogedexSceneGrid.id = 'pogedexSceneGrid'

    pogedexSceneContainer.appendChild(pogedexSceneGrid)

    for(let i = 0; i < 2; i++){
        const pogedexSceneGridSection = document.createElement('div')
        pogedexSceneGridSection.setAttribute('class', 'pogedexSceneSection')
        if(i == 0) {
            pogedexSceneGridSection.id = 'pogedexSceneDetail'
            for(let i = 0; i < 3; i++){
                const pogedexSceneTargetSectionDetails = document.createElement('div')
                pogedexSceneTargetSectionDetails.setAttribute('class', 'pogedexSceneTargetSectionDetails')

                switch(i){
                    case 0:
                        pogedexSceneTargetSectionDetails.setAttribute('id', 'pogedexSceneTargetSectionDetailsContainer')
                        for(let i = 0; i < 2; i++){
                            const pogedexSceneTargetSectionDetail = document.createElement('div')
                            pogedexSceneTargetSectionDetail.setAttribute('class', 'pogedexSceneTargetSectionDetail')

                            switch(i){
                                case 0:
                                    pogedexSceneTargetSectionDetail.setAttribute('id', 'pogedexSceneTargetSectionDetailNumber')
                                    break
                                case 1:
                                    pogedexSceneTargetSectionDetail.setAttribute('id', 'pogedexSceneTargetSectionDetailName')
                                    break
                            }

                            pogedexSceneTargetSectionDetails.appendChild(pogedexSceneTargetSectionDetail)
                        }
                        break
                    case 1:
                        pogedexSceneTargetSectionDetails.setAttribute('id', 'pogedexSceneTargetSectionSpriteContainer')
                        break
                    case 2:
                        pogedexSceneTargetSectionDetails.setAttribute('id', 'pogedexSceneTargetMoreInfoButton')
                        break
                }

                pogedexSceneGridSection.appendChild(pogedexSceneTargetSectionDetails)
            }
        } else pogedexSceneGridSection.id = 'pogedexSceneScrollContainer'

        pogedexSceneGrid.appendChild(pogedexSceneGridSection)
    }

    const pogedexSceneScroll = document.createElement('div')
    pogedexSceneScroll.id = 'pogedexSceneScroll'

    document.querySelector('#pogedexSceneScrollContainer').appendChild(pogedexSceneScroll)

    for(let i = 0; i < Object.keys(pogemonsObj).length; i++){
        const currPogemon = Object.values(pogemonsObj)[i]

        const pogedexSceneScrollContent = document.createElement('div')
        pogedexSceneScrollContent.setAttribute('class', 'pogedexSceneScrollContent') 
        
        pogedexSceneScroll.appendChild(pogedexSceneScrollContent)

        const pogedexSceneScrollPogemonImg = document.createElement('img')
        pogedexSceneScrollPogemonImg.setAttribute('class', 'pogedexSceneScrollPogemonImg')
        if (currPogemon.pogedex >= 100) pogedexSceneScrollPogemonImg.src = `../../../img/pogemon/${currPogemon.pogedex}_${currPogemon.name}/${currPogemon.name}.png`
        else if (currPogemon.pogedex >= 10) pogedexSceneScrollPogemonImg.src = `../../../img/pogemon/0${currPogemon.pogedex}_${currPogemon.name}/${currPogemon.name}.png`
        else if (currPogemon.pogedex < 10) pogedexSceneScrollPogemonImg.src = `../../../img/pogemon/00${currPogemon.pogedex}_${currPogemon.name}/${currPogemon.name}.png`
        pogedexSceneScrollPogemonImg.addEventListener('click', e => pogedexSectionClickEvent(e))

        pogedexSceneScrollContent.appendChild(pogedexSceneScrollPogemonImg)

        for(let i = 0; i < 2; i++){
            const pogedexPogemonInfo = document.createElement('div')
            pogedexPogemonInfo.setAttribute('class', 'pogedexPogemonInfo')

            if(i == 0) pogedexPogemonInfo.textContent = `${currPogemon.pogedex}`
            else pogedexPogemonInfo.textContent = `${currPogemon.name}`

            pogedexPogemonInfo.addEventListener('click', e => pogedexSectionClickEvent(e))

            pogedexSceneScrollContent.appendChild(pogedexPogemonInfo)
        }
    }
}

function initPogedexScene(){
    scenes.set('pogedex', {initiated : true})
    pogedexAnimation()
    createPogedexMenu()
    document.querySelector('#pogedexScene').style.display = 'block'
}

function clearPogedexScene(){
    scenes.set('pogedex', {initiated : false})
    window.cancelAnimationFrame(pogedexAnimationId)
    document.querySelector('#pogedexScene').style.display = 'none'
    document.querySelector('#pogedexScene').replaceChildren()

    pogedexTargetImg.src = ''
}

export function managePogedexState(state){
    if(state) initPogedexScene()
    else clearPogedexScene()
}