import { pogemonsObj } from "../../data/pogemonData.js"

import { Sprite } from "../../classes.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { player } from "../player.js"
import { loadData } from "../../save.js"
import { typesObj } from "../../data/typesData.js"
import { switchUnderScoreForSpace } from "./stats.js"
import { mapsObj } from "../../data/mapsData.js"

let pogedexAnimationId

const data = await loadData("saveFile")

export const pogedexInfoState = {active : false, flag: false}

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

let targetPogemon

function pogedexAnimation(timeSpent){
    pogedexAnimationId = window.requestAnimationFrame(pogedexAnimation)

    backgroundSprite.draw()
    pogedexTargetSprite.draw()

    if(pogedexInfoState.flag == true) showPogemonInfo()
}

function changeTargetPogemonInfo(target){
    targetPogemon = target

    document.querySelector('#pogedexSceneTargetSectionDetailNumber').innerText = `${target.pogedex}`
    document.querySelector('#pogedexSceneTargetSectionDetailName').innerText = `${target.name}`

    let pogemonCaught = false

    for(let i = 0; i < player.pogedexInfo.length; i++) if(player.pogedexInfo[i].name == target.name) if(player.pogedexInfo[i].caught) pogemonCaught = true

    if(pogemonCaught) document.querySelector('#pogedexSceneTargetMoreInfoButton').innerText = 'INFO+'
    else document.querySelector('#pogedexSceneTargetMoreInfoButton').innerText = '---'
    
    document.querySelector('#pogedexSceneTargetMoreInfoButton').classList.add('infoHover')

    pogedexTargetImg.src = target.sprites.classic.frontSprite
}

function pogedexSectionClickEvent(e){
    if(e.target.parentNode.childNodes[2].innerText == '???') return

    document.querySelectorAll(`.${e.target.parentNode.classList[0]}`).forEach(node =>{
        node.style.backgroundColor = 'rgb(75,75,75)'
    })

    e.target.parentNode.style.backgroundColor = 'rgb(150,150,150)'
    
    changeTargetPogemonInfo(pogemonsObj[`${e.target.parentNode.childNodes[2].innerText.toLowerCase()}`])
}

function showPogemonInfo(){
    pogedexInfoState.flag = false
    
    document.querySelector('#pogedexSceneContainer').style.display = 'none'

    document.querySelector('#infoMainContainer').style.display = 'grid'
    
    setInfoMenu()
}

export function returnToPogedexScrollScreen(){
    pogedexInfoState.active = false
} 

function pogedexCancelClickEvent(e){
    if(e.target.parentNode.classList[0] == 'pogedexSceneScrollContent') return

    if(e.target.id == 'pogedexSceneTargetMoreInfoButton') {
        if(e.target.textContent != 'INFO+') return
        pogedexInfoState.active = true
        pogedexInfoState.flag = true
    }

    document.querySelectorAll(`.pogedexSceneScrollContent`).forEach(node =>{
        node.style.backgroundColor = 'rgb(75,75,75)'
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

    for(let i = 0; i < player.pogedexInfo.length; i++){
        let currPogemon

        if(data != null) currPogemon = data.playerInfo.player.pogedexInfo[i]
        else currPogemon = player.pogedexInfo[i]

        const pogedexSceneScrollContent = document.createElement('div')
        pogedexSceneScrollContent.setAttribute('class', 'pogedexSceneScrollContent') 
        
        pogedexSceneScroll.appendChild(pogedexSceneScrollContent)

        const pogedexSceneScrollPogemonImg = document.createElement('img')
        pogedexSceneScrollPogemonImg.setAttribute('class', 'pogedexSceneScrollPogemonImg')


        if(currPogemon.seen) {
            // if seen here
            pogedexSceneScrollPogemonImg.src = currPogemon.sprite
            pogedexSceneScrollPogemonImg.style.opacity = 0.1
            pogedexSceneScrollContent.setAttribute('class', 'pogedexSceneScrollContent pogedexHover')
        } else pogedexSceneScrollPogemonImg.src = '../../../img/questionMark.png'
        
        if(currPogemon.caught){
            pogedexSceneScrollPogemonImg.style.opacity = 1
        }

        pogedexSceneScrollPogemonImg.addEventListener('click', e => pogedexSectionClickEvent(e))
        pogedexSceneScrollContent.appendChild(pogedexSceneScrollPogemonImg)

        for(let i = 0; i < 2; i++){
            const pogedexPogemonInfo = document.createElement('div')
            pogedexPogemonInfo.setAttribute('class', 'pogedexPogemonInfo')

            if(i == 0) pogedexPogemonInfo.textContent = `${currPogemon.pogedexIndex}`
            else {
                if(currPogemon.seen) pogedexPogemonInfo.textContent = `${currPogemon.name}`
                else pogedexPogemonInfo.textContent = `???`
            }

            pogedexPogemonInfo.addEventListener('click', e => pogedexSectionClickEvent(e))

            pogedexSceneScrollContent.appendChild(pogedexPogemonInfo)
        }
    }
}

const infoButtonState = {
    moves: false,
    abilities: false
}

function createInfoMenu(){
    const mainContainer = document.createElement('DIV')
    mainContainer.id = 'infoMainContainer'
    document.querySelector('#pogedexScene').appendChild(mainContainer)

    for(let i = 0; i < 2; i++){
        const infoSegment = document.createElement('DIV')
        infoSegment.setAttribute('class', 'infoSegment')
        mainContainer.appendChild(infoSegment)

        switch(i){
            // map case
            case 0:
                infoSegment.id = 'pogedexMapSegment'

                const mapImg = document.createElement('img')
                mapImg.id = 'pogedexInfoMap'
                mapImg.src = 'img/maps/mini_map.png'

                infoSegment.appendChild(mapImg)

                const mapsEncounterContainer = [
                    {name: 'gene_Town', x: 166, y: 750, height: 51, width: 55}, 
                    {name: 'pearly_Path', x: 165, y: 668, height: 67, width: 54}, 
                    {name: 'slither_Road', x: 224, y: 685, height: 60, width: 57}, 
                    {name: 'cross_Link', x: 288, y: 647, height: 40, width: 39}, 
                    {name: 'eden_Forest', x: 156, y: 823, height: 73, width: 89}, 
                    {name: 'banishment_Road', x: 90, y: 683, height: 55, width: 66}, 
                    {name: 'exodus_Road', x: 66, y: 563, height: 50, width: 64}, 
                    {name: 'sinai_Desert', x: 62, y: 477, height: 73, width: 75}, 
                    {name: 'melchi_Cave', x: 103, y: 421, height: 47, width: 50} , 
                    {name: 'luna_Mountain_Entrance', x: 358, y: 610, height: 45, width: 48}, 
                    {name: 'luna_Mountain', x: 320, y: 510, height: 77, width: 86}, 
                    {name: 'sol_Path', x: 450, y: 512, height: 42, width: 64}, 
                    {name: 'commandment_Road', x: 426, y: 382, height: 106, width: 89}, 
                    {name: 'mousa_Crest', x: 326, y: 442, height: 35, width: 74}, 
                    {name: 'revelation_Road', x: 160, y: 607, height: 45, width: 65}, 
                    {name: 'bellum_Way', x: 159, y: 524, height: 61, width: 66}, 
                    {name: 'stasis_Cave', x: 156, y: 421, height: 85, width: 109}, 
                    {name: 'stasis_Cave_Upper_Level', x: 64, y: 175, height: 86, width: 111},
                    {name: 'stasis_Cave_Lower_Level', x: 64, y: 261, height: 130, width: 111},  
                    {name: 'stasis_Cave_Top_Level', x: 130, y: 95, height: 80, width: 46}, 
                    {name: 'ascension_Path', x: 226, y: 338, height: 72, width: 77}, 
                    {name: 'end_Trail', x: 307, y: 175, height: 72, width: 102}, 
                    {name: 'transit_Peak', x: 372, y: 82, height: 79, width: 51}, 
                    {name: 'neo_Genesis', x: 262, y: 79, height: 57, width: 60}
                ]

                const mapsBlockContainer = [
                    {name: 'gene_Town', x: 162, y: 746, height: 54, width: 62}, 
                    {name: 'pearly_Path', x: 156, y: 662, height: 84, width: 68}, 
                    {name: 'slither_Road', x: 224, y: 609, height: 142, width: 63}, 
                    {name: 'fair_Town', x: 287, y: 681, height: 70, width: 45}, 
                    {name: 'cross_Link', x: 287, y: 600, height: 81, width: 45}, 
                    {name: 'eden_Forest', x: 150, y: 800, height: 101, width: 96}, 
                    {name: 'banishment_Road', x: 83, y: 690, height: 56, width: 73}, 
                    {name: 'keme_Town', x: 63, y: 619, height: 71, width: 93}, 
                    {name: 'exodus_Road', x: 53, y: 555, height: 64, width: 103}, 
                    {name: 'sinai_Desert', x: 53, y: 460, height: 95, width: 103}, 
                    {name: 'melchi_Cave', x: 103, y: 420, height: 40, width: 51} , 
                    {name: 'luna_Mountain_Entrance', x: 332, y: 601, height: 73, width: 84}, 
                    {name: 'luna_Mountain', x: 304, y: 494, height: 107, width: 121}, 
                    {name: 'sol_Path', x: 425, y: 494, height: 107, width: 104}, 
                    {name: 'commandment_Road', x: 425, y: 365, height: 136, width: 104}, 
                    {name: 'scribble_Town', x: 318, y: 365, height: 66, width: 107}, 
                    {name: 'mousa_Crest', x: 318, y: 431, height: 63, width: 107}, 
                    {name: 'revelation_Road', x: 156, y: 609, height: 53, width: 68}, 
                    {name: 'bellum_Way', x: 156, y: 508, height: 101, width: 109}, 
                    {name: 'stasis_Cave', x: 155, y: 409, height: 99, width: 110}, 
                    {name: 'stasis_Cave_Upper_Level', x: 64, y: 174, height: 86, width: 112},
                    {name: 'stasis_Cave_Lower_Level', x: 64, y: 260, height: 131, width: 112},  
                    {name: 'stasis_Cave_Top_Level', x: 129, y: 95, height: 80, width: 47}, 
                    {name: 'ascension_Path', x: 215, y: 157, height: 180, width: 100}, 
                    {name: 'alquima_Town', x: 215, y: 336, height: 79, width: 92}, 
                    {name: 'end_Trail', x: 313, y: 158, height: 108, width: 141}, 
                    {name: 'transit_Peak', x: 341, y: 68, height: 90, width: 113}, 
                    {name: 'neo_Genesis', x: 248, y: 67, height: 91, width: 93}
                ]

                for(let i = 0;  i < mapsEncounterContainer.length; i++){
                    const mapAreaInfo = mapsEncounterContainer[i]

                    const encounterArea = document.createElement('div')
                    encounterArea.setAttribute('class', 'encounterArea')
                    encounterArea.id = mapAreaInfo.name

                    encounterArea.style.left = mapAreaInfo.x
                    encounterArea.style.top = mapAreaInfo.y

                    encounterArea.style.height = mapAreaInfo.height
                    encounterArea.style.width = mapAreaInfo.width

                    infoSegment.appendChild(encounterArea)
                }

                for(let i = 0; i < mapsBlockContainer.length; i++){
                    const mapBackgroundInfo = mapsBlockContainer[i]

                    const encounterBackground = document.createElement('div')
                    encounterBackground.setAttribute('class', 'encounterBackground')
                    encounterBackground.id = `${mapBackgroundInfo.name}_Background`

                    encounterBackground.style.left = mapBackgroundInfo.x
                    encounterBackground.style.top = mapBackgroundInfo.y

                    encounterBackground.style.height = mapBackgroundInfo.height
                    encounterBackground.style.width = mapBackgroundInfo.width

                    infoSegment.appendChild(encounterBackground)
                }
                break
            // sprite case
            case 1:
                infoSegment.id = 'infoSection'

                for(let j = 0; j < 3; j++){
                    const middleSegments = document.createElement('div')
    
                    infoSegment.appendChild(middleSegments)
                
                    switch(j){
                        case 0:
                            //info
                            middleSegments.id = 'pogemonInfoContainer'
                            for(let i = 0; i < 2; i++){
                                const pogemonInfoSegment = document.createElement('div')
                                pogemonInfoSegment.setAttribute('class', 'pogemonInfoSegment')
    
                                middleSegments.appendChild(pogemonInfoSegment)
                                switch(i){
                                    case 0:
                                        pogemonInfoSegment.id = 'pogemonInfoSegment'
                                        for(let j = 0; j < 2; j++){
                                            const pogemonInfoSection = document.createElement('DIV')
                                            
                                            pogemonInfoSegment.append(pogemonInfoSection)
                                            switch(j){
                                                case 0:
                                                    //type
                                                    pogemonInfoSection.id = 'pogedexInfoTypeSection'
                                                    for(let i = 0; i < 2; i++){
                                                        const pogemonTypeContainer = document.createElement('DIV')
                                                        pogemonTypeContainer.setAttribute('class', 'pogedexInfoTypeContainer')

                                                        const pogemonType = document.createElement('DIV')
                                                        pogemonType.setAttribute('class', 'pogemonInfoType')

                                                        pogemonInfoSection.append(pogemonTypeContainer)
                                                        pogemonTypeContainer.append(pogemonType)
                                                        switch(i){
                                                            case 0:
                                                                //type 1
                                                                pogemonTypeContainer.id = 'pogedexInfoType1'
                                                                break
                                                            case 1:
                                                                //type 2
                                                                pogemonTypeContainer.id = 'pogedexInfoType2'
                                                                break
                                                        }
                                                    }

                                                    break
                                                case 1:
                                                        //name
                                                        pogemonInfoSection.id = 'pogedexInfoNameContainer'

                                                        const pogemonNameContainer = document.createElement('div')
                                                        pogemonNameContainer.id = 'pogemonNameContainer'
                                                                                                                                                            
                                                        pogemonInfoSection.appendChild(pogemonNameContainer)

                                                    break
                                            }
                                        }
                                        break
                                    case 1:
                                        // stats
                                        pogemonInfoSegment.id = 'pogemonStatsSegment'
                                        for(let i = 0; i < 2; i++){
                                            const pogemonStatContainer = document.createElement('DIV')
                                            pogemonStatContainer.setAttribute('class', 'pogedexInfoStatContainer')

                                            pogemonInfoSegment.appendChild(pogemonStatContainer)
                                            for(let j = 0; j < 3; j++){

                                                const pogemonStatContent = document.createElement('DIV')
                                                pogemonStatContent.setAttribute('class', 'pogedexInfoStatContent')
    
                                                pogemonStatContainer.appendChild(pogemonStatContent)
                                            }
                                        }
                                        break
                                }
                            }
                            break
                        case 1:
                            middleSegments.id = 'middleInfoContainer'

                            for(let i = 0; i < 2; i++){
                                const middleSegmentContent = document.createElement('div')
                                middleSegmentContent.setAttribute('class', 'middleSegmentContent')
    
                                middleSegments.appendChild(middleSegmentContent)
                                switch(i){
                                    case 0:
                                        const pogemonImg = document.createElement('img')
                                        pogemonImg.id = 'pogemonInfoImg'
            
                                        middleSegmentContent.appendChild(pogemonImg)
                                        break
                                    case 1:
                                        const rightInfoContainer = document.createElement('div')
                                        rightInfoContainer.id = 'rightInfoContainer'
                                        middleSegmentContent.appendChild(rightInfoContainer)

                                        const rightInfoContentContainer = document.createElement('div')
                                        rightInfoContentContainer.id = 'rightInfoContentContainer'
                                        rightInfoContainer.appendChild(rightInfoContentContainer)

                                        const moveInfoContainer = document.createElement('div')
                                        moveInfoContainer.setAttribute('class', 'leftInfoContainer')
                                        moveInfoContainer.id = 'moveInfoContainer'
                                        rightInfoContentContainer.appendChild(moveInfoContainer)

                                        const infoScequece = ['pow', 'element', 'acc', 'pp', 'effects', 'type']

                                        for(let i = 0; i < 6; i++){
                                            const moveInfo = document.createElement('div')
                                            // moveInfo.id = 'moveInfo'
                                            moveInfo.setAttribute('class', 'moveInfo')
                                            if(i != 5) moveInfo.innerText = `${infoScequece[i]}\n\n---`
                                            moveInfoContainer.appendChild(moveInfo)

                                            if(i == 5){
                                                const moveInfoTypeImg = document.createElement('img')
                                                moveInfoTypeImg.id = 'moveInfoTypeImg'
                                                moveInfo.appendChild(moveInfoTypeImg)
                                            }
                                        }

                                        const abilityInfoContainer = document.createElement('div')
                                        abilityInfoContainer.setAttribute('class', 'leftInfoContainer')
                                        abilityInfoContainer.id = 'abilityInfoContainer'
                                        abilityInfoContainer.textContent = '---'
                                        rightInfoContentContainer.appendChild(abilityInfoContainer)

                                        const rightInfoRightContainer = document.createElement('div')
                                        rightInfoRightContainer.id = 'rightInfoRightContainer'
                                        rightInfoContainer.appendChild(rightInfoRightContainer)

                                        const rightInfoSelectionContainer = document.createElement('div')
                                        rightInfoSelectionContainer.id = 'rightInfoSelectionContainer'
                                        rightInfoRightContainer.appendChild(rightInfoSelectionContainer)

                                        function removeStuff(e){
                                            document.querySelectorAll('.rightInfoContainer').forEach(node =>{
                                                node.style.display = 'none'
                                            })

                                            rightInfoReturnContainer.style.display = 'none'
                                            rightInfoSelectionContainer.style.display = 'grid'

                                            rightInfoMovesContainer.replaceChildren()
                                            rightInfoAbilitiesContainer.replaceChildren()

                                            abilityInfoContainer.style.display = 'none'
                                            moveInfoContainer.style.display = 'none'
                                        }

                                        function printMoves(){
                                            document.querySelector('#moveInfoContainer').style.display = 'flex'
                                            document.querySelector('#rightInfoMovesContainer').style.display = 'flex'

                                            function printMoveInfo(move){
                                                const infoContainerArr = document.querySelectorAll('.moveInfo')
                                                if(typeof move == 'string') {
                                                    for(let i = 0; i < infoContainerArr.length; i++){
                                                        infoContainerArr[i].style.color = `white`
                                                        if(i != 5) infoContainerArr[i].innerText = `${infoScequece[i]}`
                                                        else infoContainerArr[i].childNodes[0].src = ''
                                                    }
                                                } else {
                                                    function returnCorrectInfo(type){
                                                        let correctInfo

                                                        Object.keys(move).forEach((info, i) =>{
                                                            if(info == type) correctInfo = Object.values(move)[i]
                                                        })

                                                        return correctInfo
                                                    }

                                                    function returnAbilityList(){
                                                        let abilitiesListArr = []
                                                        let abilitiesListStr = ''

                                                        Object.values(move.effects).forEach((effect, i) =>{
                                                            let abilityInfo = []
                                                            abilityInfo.push(Object.keys(effect)[0])
                                                            abilityInfo.push(Object.values(effect)[0])
                                                            abilitiesListArr.push(abilityInfo)
                                                        })

                                                        abilitiesListArr.forEach((abilityArr, i) =>{
                                                            abilitiesListStr = abilitiesListStr.concat(`${switchUnderScoreForSpace(abilityArr[0])} : ${abilityArr[1]}\n\n`)
                                                        })

                                                        return abilitiesListStr
                                                    }

                                                    for(let i = 0; i < infoContainerArr.length; i++){
                                                        if(i != 5) {
                                                            if(i == 1) {
                                                                infoContainerArr[i].innerText = `${returnCorrectInfo(infoScequece[i])}`
                                                                infoContainerArr[i].style.color = `#${typesObj[returnCorrectInfo(infoScequece[i])].color}`
                                                            } else if(i == 4) {
                                                                infoContainerArr[i].textContent = ''
                                                                
                                                                infoContainerArr[i].id = 'pogedexEffectsContainer'

                                                                const pogedexEffectsTitle = document.createElement('div')
                                                                pogedexEffectsTitle.id = 'pogedexEffectsTitle'
                                                                infoContainerArr[i].appendChild(pogedexEffectsTitle)

                                                                const pogedexEffectsContent = document.createElement('div')
                                                                pogedexEffectsContent.id = 'pogedexEffectsContent'
                                                                infoContainerArr[i].appendChild(pogedexEffectsContent)

                                                                pogedexEffectsTitle.innerText = `Effects`
                                                                pogedexEffectsContent.innerText = `${returnAbilityList()}`
                                                            } else infoContainerArr[i].innerText = `${infoScequece[i]}\n\n${returnCorrectInfo(infoScequece[i])}`
                                                        } else infoContainerArr[i].childNodes[0].src = `img/moves/category/${move.type}.png`
                                                    }
                                                }
                                            }

                                            let lastMove = false

                                            for(let i = 0; Object.values(targetPogemon.movepool).length; i++){
                                                const moveInfo = Object.values(targetPogemon.movepool)[i]
                                                const pogedexInfoMoveContainer = document.createElement('div')
                                                const pogedexInfoMoveHR = document.createElement('hr')
                                                pogedexInfoMoveContainer.setAttribute('class', 'pogedexInfoMoveContainer')

                                                if(moveInfo.seen) {
                                                    pogedexInfoMoveContainer.innerText = `lvl ${moveInfo.lvl} \n\n ${switchUnderScoreForSpace(moveInfo.move.name)}`
                                                    pogedexInfoMoveContainer.addEventListener('mouseover', e => printMoveInfo(moveInfo.move))    
                                                } else {
                                                    pogedexInfoMoveContainer.innerText = `lvl ${moveInfo.lvl} \n\n ???`
                                                    pogedexInfoMoveContainer.addEventListener('mouseover', e => printMoveInfo(moveInfo.move))
                                                    lastMove = true
                                                }

                                                pogedexInfoMoveContainer.addEventListener('mouseout', e => printMoveInfo('---'))
                                                
                                                rightInfoMovesContainer.appendChild(pogedexInfoMoveContainer)
                                                if(lastMove) break
                                                rightInfoMovesContainer.appendChild(pogedexInfoMoveHR)
                                            }

                                            // Object.values(targetPogemon.movepool).forEach((moveInfo,i) =>{
                                            //     console.log(moveInfo)
                                            //     const pogedexInfoMoveContainer = document.createElement('div')
                                            //     const pogedexInfoMoveHR = document.createElement('hr')
                                            //     pogedexInfoMoveContainer.setAttribute('class', 'pogedexInfoMoveContainer')

                                            //     if(moveInfo.seen) {
                                            //         pogedexInfoMoveContainer.innerText = `lvl ${moveInfo.lvl} \n\n ${switchUnderScoreForSpace(moveInfo.move.name)}`
                                            //         pogedexInfoMoveContainer.addEventListener('mouseover', e => printMoveInfo(moveInfo.move))    
                                            //     } else {
                                            //         pogedexInfoMoveContainer.innerText = `lvl ${moveInfo.lvl} \n\n ???`
                                            //         pogedexInfoMoveContainer.addEventListener('mouseover', e => printMoveInfo(moveInfo.move))    
                                            //     }

                                            //     pogedexInfoMoveContainer.addEventListener('mouseout', e => printMoveInfo('---'))
                                                
                                            //     rightInfoMovesContainer.appendChild(pogedexInfoMoveContainer)
                                            //     if(i != Object.values(targetPogemon.movepool).length - 1) rightInfoMovesContainer.appendChild(pogedexInfoMoveHR)
                                            // })
                                        }

                                        function printAbilities(){
                                            document.querySelector('#abilityInfoContainer').style.display = 'flex'
                                            document.querySelector('#rightInfoAbilitiesContainer').style.display = 'flex'

                                            function printAbilityInfo(txt){
                                                abilityInfoContainer.textContent = txt
                                            }

                                            Object.values(targetPogemon.abilities).forEach((abilityInfo,i) =>{
                                                const pogedexInfoAbilityContainer = document.createElement('div')
                                                const pogedexInfoAbilityHR = document.createElement('hr')
                                                pogedexInfoAbilityContainer.setAttribute('class', 'pogedexInfoAbilityContainer')
                                                console.log(abilityInfo)

                                                if(abilityInfo.hidden) {
                                                    if(abilityInfo.seen) {
                                                        pogedexInfoAbilityContainer.innerText = `Hidden Ability \n\n ${switchUnderScoreForSpace(abilityInfo.ability.name)}`
                                                        pogedexInfoAbilityContainer.addEventListener('mouseover', e => printAbilityInfo(abilityInfo.ability.desc))
                                                    } else {
                                                        pogedexInfoAbilityContainer.innerText = `Hidden Ability \n\n ???`
                                                        pogedexInfoAbilityContainer.addEventListener('mouseover', e => printAbilityInfo('---'))
                                                    }
                                                } else {
                                                    if(abilityInfo.seen) {
                                                        pogedexInfoAbilityContainer.innerText = `Ability ${i + 1} \n\n ${switchUnderScoreForSpace(abilityInfo.ability.name)}`
                                                        pogedexInfoAbilityContainer.addEventListener('mouseover', e => printAbilityInfo(abilityInfo.ability.desc))
                                                    } else {
                                                        pogedexInfoAbilityContainer.innerText = `Ability ${i + 1} \n\n ???`
                                                        pogedexInfoAbilityContainer.addEventListener('mouseover', e => printAbilityInfo('---'))
                                                    }
                                                }
                                                
                                                pogedexInfoAbilityContainer.addEventListener('mouseout', e => printAbilityInfo('---'))
                                                
                                                rightInfoAbilitiesContainer.appendChild(pogedexInfoAbilityContainer)
                                                if(i != Object.values(targetPogemon.abilities).length - 1) rightInfoAbilitiesContainer.appendChild(pogedexInfoAbilityHR)
                                            })
                                        }

                                        
                                        function setSelectedInfoStuff(type, e){
                                            document.querySelector('#rightInfoSelectionContainer').style.display = 'none'
                                            document.querySelector('#rightInfoReturnContainer').style.display = 'block'
                                            if(type == 'Moves') printMoves() 
                                            else printAbilities()
                                        }

                                        for (let i = 0; i < 2; i++) {
                                            const rightInfoSelectionButton = document.createElement('div')
                                            rightInfoSelectionButton.setAttribute('class', 'rightInfoSelectionButton')
                                            rightInfoSelectionContainer.appendChild(rightInfoSelectionButton)
                                            if(i == 0) {
                                                rightInfoSelectionButton.id = 'rightInfoMovesButton'
                                                rightInfoSelectionButton.textContent = 'Moves'
                                                rightInfoSelectionButton.addEventListener('click', e => setSelectedInfoStuff('Moves', e))
                                            }
                                            else {
                                                rightInfoSelectionButton.id = 'rightInfoAbilitiesButton'
                                                rightInfoSelectionButton.textContent = 'Abilities'
                                                rightInfoSelectionButton.addEventListener('click', e => setSelectedInfoStuff('Abilities', e))
                                            }
                                        }

                                        const rightInfoMovesContainer = document.createElement('div')
                                        rightInfoMovesContainer.id = 'rightInfoMovesContainer'
                                        rightInfoMovesContainer.setAttribute('class', 'rightInfoContainer')
                                        rightInfoRightContainer.appendChild(rightInfoMovesContainer)

                                        const rightInfoAbilitiesContainer = document.createElement('div')
                                        rightInfoAbilitiesContainer.id = 'rightInfoAbilitiesContainer'
                                        rightInfoAbilitiesContainer.setAttribute('class', 'rightInfoContainer')
                                        rightInfoRightContainer.appendChild(rightInfoAbilitiesContainer)

                                        const rightInfoReturnContainer = document.createElement('img')
                                        rightInfoReturnContainer.id = 'rightInfoReturnContainer'
                                        rightInfoReturnContainer.src = 'img/item_scene/return.png'
                                        rightInfoRightContainer.appendChild(rightInfoReturnContainer)

                                        rightInfoReturnContainer.addEventListener('click', e => removeStuff(e))

                                        break
                                }
                            }
                            break
                        case 2:
                            //description
                            middleSegments.id = 'bottomInfoContainer'
                            break
                    }
                }
                break
        }
    }
}

function setCaptureAreas(){
    document.querySelectorAll('.encounterArea').forEach(node =>{
        node.style.opacity = 0
    })

    for(let i = 0; i < Object.values(mapsObj).length; i++){
        if(i == 0) continue

        let map = Object.values(mapsObj)[i]
        
        const mapDom = document.querySelector(`#${map.name}`)

        document.querySelectorAll('.encounterBackground').forEach(node => {if(node.id == `${map.name}_Background`) if(map.seen) node.style.opacity = 0})

        // if(document.querySelector(`#${map.name}_Background`) != null) if(map.seen) document.querySelector(`#${map.name}_Background`).style.opacity = 0

        if(mapDom != null){
            if(map.encounters != undefined) {
                Object.values(map.encounters).forEach((encounterTypeArr, j) =>{
                    if(encounterTypeArr.length == 0) return
                    encounterTypeArr.forEach((encounter, i2) =>{
                        // console.log(targetPogemon, encounter)
                        if(targetPogemon.name == encounter.pogemon.name) {
                            const odds = encounter.odds.max - encounter.odds.min

                            if(odds > 30) mapDom.style.backgroundColor = 'rgb(49 255 0 / 25%)'
                            else if(odds < 30 && odds > 4) mapDom.style.backgroundColor = 'rgb(255 188 0 / 25%)'
                            else mapDom.style.backgroundColor = 'rgb(125 0 0 / 25%)'

                            mapDom.style.opacity = 1
                        }
                    })
                })
            }

        }

    }
}

function setInfoMenu(){
    document.querySelector('#pogemonInfoImg').src = targetPogemon.sprites.classic.sprite
    document.querySelector('#bottomInfoContainer').innerText = targetPogemon.description
    document.querySelector('#pogemonNameContainer').innerText = targetPogemon.name

    for(let i = 0; i < 2; i++){
        document.querySelectorAll('.pogemonInfoType')[i].textContent = ''
        document.querySelectorAll('.pogemonInfoType')[i].style.backgroundColor = 'transparent'
        if(targetPogemon.element[i + 1] == null) continue
        document.querySelectorAll('.pogemonInfoType')[i].textContent = targetPogemon.element[i + 1]
        document.querySelectorAll('.pogemonInfoType')[i].style.backgroundColor = typesObj[targetPogemon.element[i + 1]].color
    }

    const statsPlacementArr = ['atk', 'spatk', 'spd', 'def', 'spdef', 'hp']

    function pickRightStatLmao(stat){
        let pickedStat

        Object.keys(targetPogemon.stats).forEach((targetStat,i) =>{
            if(stat == targetStat) pickedStat = Object.values(targetPogemon.stats)[i]
        })

        return pickedStat
    }

    document.querySelectorAll('.pogedexInfoStatContent').forEach((node, i) => node.innerText = `${statsPlacementArr[i]} \n\n ${pickRightStatLmao(statsPlacementArr[i])}`)

    function printAbilities(){
        Object.values(targetPogemon.abilities).forEach(ability =>{
            
        })
    }

    printAbilities()
    setCaptureAreas()
}

function initPogedexScene(){
    scenes.set('pogedex', {initiated : true})
    pogedexAnimation()
    createPogedexMenu()
    createInfoMenu()
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