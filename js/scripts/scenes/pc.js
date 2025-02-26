import { Pogemon, Sprite } from "../../classes.js"
import { movesObj } from "../../data/movesData.js"
import { pogemonsObj } from "../../data/pogemonData.js"
import { loadData } from "../../save.js"
import { scenes, backgroundSprite } from "../canvas.js"
import { player } from "../player.js"
import { manageOverWorldState } from "./overworld.js"
import { manageStatsState, switchUnderScoreForSpace } from "./stats.js"

const data = await loadData('saveFile')

let pcAnimationId

const testImg = new Image()
testImg.src = 'img/pogemon/001_loko/loko.animation.png'

export let pc = [
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ],
    [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
    ]
]

async function printSavedBox(){
    if(await data != null){
        data.pc.forEach((box, i) =>{
            box.forEach((pogemon, j) =>{
                if(pogemon == null) return
    
                let pogemonImg = new Image()
                let pogemonSprite = new Sprite({
                    type: 'pogemon',
                    position: pogemon.position,
                    img: pogemonImg,
                    frames: {
                      max: 4,
                      hold: 50
                    },
                    animate: true
                })

                const newPogemon = new Pogemon(pogemonsObj[pogemon.name], Math.pow(pogemon.lvl, 3), false, pogemon.caughtMap, pogemon.heldItem, null, null, null, null, null, null, null, pogemon, pogemonSprite)
                newPogemon.learntMoves = [...box[j].learntMoves]
                if(box[j].moves[0] != null) newPogemon.moves = [...box[j].moves]

                console.log(box[j].moves)

                // need to implement for more than 1 box at a time
                box[j] = {...newPogemon}
            })
        })

        console.log()
    
        pc = data.pc

        data.playerInfo.pcMovesInfo.forEach(box =>{
            if(box.length > 0) box.forEach(movesInfo =>{
                movesInfo.forEach((move,i) =>{
                    pc[move[2]][move[3]].moves[i] = {...movesObj[move[0]]}
                    pc[move[2]][move[3]].moves[i].pp = move[1]
                })
            })
        })

        data.playerInfo.pcLearntMovesInfo.forEach(box =>{
            if(box.length > 0) box.forEach(movesInfo =>{
                movesInfo.forEach((move,i) =>{
                    pc[move[1]][move[2]].learntMoves = move[0]
                    // pc[move[1]][move[2]].learntMoves.push(move[0])
                    console.log(pc[move[1]][move[2]])
                })
            })
        })
    }
}

printSavedBox()

let defaultBox = 0
let currBox = defaultBox

let teamSprites = []

let boxSprites = []

const selectedPogemonImg = new Image()
const selectedPogemonSprite = new Sprite({
    type: 'pc',
    position: {
        x: 1525,
        y: window.innerHeight / 2 - 250
    },
    img: selectedPogemonImg,
    frames:{
        max: 4,
        hold: 25
    },
    animate: true
})

function pcAnimation(){
    pcAnimationId = window.requestAnimationFrame(pcAnimation)

    backgroundSprite.draw()
    selectedPogemonSprite.draw()

    teamSprites.forEach(sprite =>{
        sprite.draw()
    })

    boxSprites.forEach(sprite =>{
        sprite.draw()
    })
}

const pcSceneSelectedPogemonGenderImg = new Image()

let selectedEvent = {initiated: false, target: null}

let switchEvent = {
    initiated: false, 
    target:{
        first:{
            i: null, 
            pogemon: null, 
            type:{
                name: null, 
                obj: null, 
                animationArr: null
            }
        }, 
        second:{
            i: null, 
            pogemon: null, 
            type:{
                name: null, 
                obj: null, 
                animationArr: null
            }
        }
    }
}

function initPcMenu(){
    scenes.set('pc', {initiated: true})
    scenes.set('overworld', {initiated: false})

    pcSceneSelectedPogemonGenderImg.src = 'img/blank.png'

    teamSprites = []
    printPcMenu()
    document.querySelector('#pcScene').style.display = 'block'

    pcAnimation()

    let yOffset = 250
    if(window.innerHeight == 1080) yOffset = 300

    selectedPogemonSprite.position = {
        x: 1525,
        y: window.innerHeight / 2 - yOffset
    },

    selectedEvent = {initiated: false, target: null}
}

let oldDOM
let targetPogemon

function hoverEvent(state, DOM, target, i, type){
    if(selectedEvent.initiated){
        if(state){
            if(oldDOM != undefined){
                oldDOM.style.background = 'rgba(125,125,125,0.25)'
                oldDOM.style.cursor = 'pointer'
            }

            if(target != null || switchEvent.initiated){
                DOM.style.background = 'rgba(125,125,125,0.25)'
                DOM.style.cursor = 'pointer'
                if(target != null) target.animate = true
            }
        } else {
            if(DOM.id == 'selected') return
            
            DOM.style.background = 'transparent'
            DOM.style.cursor = 'auto'
            if(target != null) target.animate = false
        }
        return
    }
    if(state){
        if(type == 'box' && pc[currBox][i] == null) return
        oldDOM = DOM

        if(type == 'team') targetPogemon = player.team[i]
        else if(type == 'box') targetPogemon = pc[currBox][i]

        if(targetPogemon != undefined){
            DOM.style.background = 'rgba(125,125,125,0.25)'
            DOM.style.cursor = 'pointer'

            document.querySelector('#pcSceneSelectedPogemonSection').style.display = 'block'
            document.querySelector('#pcSceneSelectedPogemonInfoContainer').style.display = 'grid'
        }

        if(targetPogemon != null && targetPogemon != undefined){
            document.querySelector('#pcSceneSelectedPogemonInfoContentLvl').innerText = `Lv${targetPogemon.lvl}`
            document.querySelector('#pcSceneSelectedPogemonInfoContentName').innerText = `${switchUnderScoreForSpace(targetPogemon.nickname)}`
            pcSceneSelectedPogemonGenderImg.src = `img/${targetPogemon.gender}_icon.png`
        }

        if(target != null) {
            target.animate = true

            if(targetPogemon == null || targetPogemon == undefined) return

            console.log(i)

            if(targetPogemon.isShiny) selectedPogemonImg.src = targetPogemon.pogemon.sprites.shiny.frontSprite
            else selectedPogemonImg.src = targetPogemon.pogemon.sprites.classic.frontSprite
        }
    } else {
        document.querySelector('#pcSceneSelectedPogemonInfoContainer').style.display = 'none'
        DOM.style.background = 'transparent'
        DOM.style.cursor = 'auto'
        switchEvent.initiated = false
        if(target != null) target.animate = false

        selectedPogemonImg.src = `img/Template.png`
    }
}

function rearrangeTeam(first, second){
    first.DOM = document.querySelectorAll('.pcScenePogemonContainer')[first.i]
    second.DOM = document.querySelectorAll('.pcScenePogemonContainer')[second.i]

    player.team = player.team.filter(element => {
        return element !== undefined;
    });

    // if there is a pogemon after this one in player.team
    if(first.type.name == 'team' && player.team[first.i] !== undefined) {
        teamSprites.forEach((sprite, i) =>{
            gsap.to(sprite, {
                opacity: 0,
                onComplete:() =>{
                    // second.type.animationArr[second.i].img.src = first.pogemon.pogemon.sprites.bagSprite

                    let node = document.querySelectorAll('.pcScenePogemonContainer')[i]
                    if(player.team[i] == null || player.team[i] == undefined){
                        teamSprites[i].img.src = ''
                        node.childNodes[0].childNodes[0].textContent = ''
                        node.childNodes[0].childNodes[1].src = ``
                        node.childNodes[1].textContent = ''
                    } else {
                        node.childNodes[0].childNodes[0].textContent = `LV${player.team[i].lvl}`
                        node.childNodes[0].childNodes[1].src = `img/${player.team[i].gender}_icon.png`
                        node.childNodes[1].textContent = `${switchUnderScoreForSpace(player.team[i].nickname)}`

                        if(player.team[i].isShiny) teamSprites[i].img.src = player.team[i].pogemon.sprites.shiny.bagSprite
                        else teamSprites[i].img.src = player.team[i].pogemon.sprites.classic.bagSprite
                    }

                    oldDOM = null
                    gsap.to(sprite, {
                        opacity: 1
                    })
                }
            })
        })
    }

    // if there are no pogemon before this one in player.team
    if(second.type.name == 'team' && player.team[second.i] == undefined ){
        teamSprites.forEach((sprite, i) =>{
            gsap.to(sprite, {
                opacity: 0,
                onComplete:() =>{                    
                    let node = document.querySelectorAll('.pcScenePogemonContainer')[i]

                    console.log(player.team[i])

                    if(player.team[i] == null || player.team[i] == undefined){
                        teamSprites[i].img.src = 'img/blank.png'
                        node.childNodes[0].childNodes[0].textContent = ''
                        node.childNodes[0].childNodes[1].src = `img/blank.png`
                        node.childNodes[1].textContent = ''

                    } else {
                        node.childNodes[0].childNodes[0].textContent = `LV${player.team[i].lvl}`
                        node.childNodes[0].childNodes[1].src = `img/${player.team[i].gender}_icon.png`
                        node.childNodes[1].textContent = `${switchUnderScoreForSpace(player.team[i].nickname)}`

                        if(player.team[i].isShiny) teamSprites[i].img.src = player.team[i].pogemon.sprites.shiny.bagSprite
                        else teamSprites[i].img.src = player.team[i].pogemon.sprites.classic.bagSprite
                    }

                    oldDOM = null
                    gsap.to(sprite, {
                        opacity: 1
                    })
                }
            })
        })
    }

    //if second slot selected is empty
    if(second.pogemon == undefined || second.pogemon == null){
        if(first.pogemon.isShiny) second.type.animationArr[second.i].img.src = first.pogemon.pogemon.sprites.shiny.bagSprite
        else second.type.animationArr[second.i].img.src = first.pogemon.pogemon.sprites.classic.bagSprite


        first.type.animationArr[first.i].img.src = 'img/blank.png'

        if(first.type.name == 'team'){
            const currSwitchingPogemonNode = document.querySelectorAll('.pcScenePogemonContainer')[first.i]

            currSwitchingPogemonNode.childNodes[0].childNodes[0].textContent = ``
            currSwitchingPogemonNode.childNodes[0].childNodes[1].src = `img/blank.png`
            currSwitchingPogemonNode.childNodes[1].textContent = ``
        }

        if(second.type.name != 'team') return
        second.DOM.childNodes[0].childNodes[0].textContent = `LV${first.pogemon.lvl}`
        second.DOM.childNodes[0].childNodes[1].src = `img/${first.pogemon.gender}_icon.png`
        second.DOM.childNodes[1].textContent = `${switchUnderScoreForSpace(first.pogemon.nickname)}`
    }
}

function pcSwitchEvent(first, second){
    disableClickEvent = true
    if(player.team.length == 1){
        if(first.type.name == 'team' && second.pogemon == null) {
            disableClickEvent = false
            return
        }
        if(first.type.name == 'team' && second.pogemon == undefined) {
            disableClickEvent = false
            return
        }
    }

    if(second.pogemon != null){
        if(first.pogemon.id == second.pogemon.id) {
            disableClickEvent = false
            return
        }
    }

    function switchPogemonInfo(){
        let placeHolder

        console.log(first)
        console.log(second)

        if(second.pogemon == null){
            second.type.obj[second.i] = first.type.obj[first.i]
            
            if(first.type.name == 'team') first.type.obj.splice(first.i, 1)
            else first.type.obj[first.i] = null

            rearrangeTeam(first, second)

            if(second.type.name == 'team' && first.type.name == 'box'){
                const pogemon = first.pogemon

                const pogemonImg = new Image()

                const pogemonSprite = new Sprite({
                  type: 'pogemon',
                  position: pogemon.position,
                  img: pogemonImg,
                  frames: {
                    max: 4,
                    hold: 60
                  },
                  animate: true
                })

                player.team[second.i] = new Pogemon(pogemonsObj[`${pogemon.name}`], Math.pow(pogemon.lvl, 3), false, pogemon.caughtMap, pogemon.heldItem, null, null, null, null, null, null, null, pogemon, pogemonSprite)

                console.log(player.team[second.i])
            }
            return
        } else {
            if(first.type.name == 'team'){
                document.querySelectorAll('.pcScenePogemonContainer')[first.i].childNodes[0].childNodes[0].textContent = `Lv${second.pogemon.lvl}`
                document.querySelectorAll('.pcScenePogemonContainer')[first.i].childNodes[0].childNodes[1].src = `img/${second.pogemon.gender}_icon.png`
                document.querySelectorAll('.pcScenePogemonContainer')[first.i].childNodes[1].childNodes[0].textContent = switchUnderScoreForSpace(second.pogemon.nickname)
            }

            if(second.type.name == 'team'){
                document.querySelectorAll('.pcScenePogemonContainer')[second.i].childNodes[0].childNodes[0].textContent = `Lv${first.pogemon.lvl}`
                document.querySelectorAll('.pcScenePogemonContainer')[second.i].childNodes[0].childNodes[1].src = `img/${first.pogemon.gender}_icon.png`
                document.querySelectorAll('.pcScenePogemonContainer')[second.i].childNodes[1].childNodes[0].textContent = switchUnderScoreForSpace(second.pogemon.nickname)
            }

            if(second.type.name == 'team' && first.type.name == 'box'){
                const pogemon = first.pogemon

                const pogemonImg = new Image()

                const pogemonSprite = new Sprite({
                  type: 'pogemon',
                  position: pogemon.position,
                  img: pogemonImg,
                  frames: {
                    max: 4,
                    hold: 60
                  },
                  animate: true
                })

                player.team[second.i] = new Pogemon(pogemonsObj[`${pogemon.name}`], Math.pow(pogemon.lvl, 3), false, pogemon.caughtMap, pogemon.heldItem, null, null, null, null, null, null, null, pogemon, pogemonSprite)
            }
        }

        placeHolder = first.type.obj[first.i]
        first.type.obj[first.i] = second.type.obj[second.i]
        second.type.obj[second.i] = placeHolder

        // placeHolder = first.type.animationArr[first.i]
        // first.type.animationArr[first.i] = second.type.animationArr[second.i]
        // second.type.animationArr[second.i] = placeHolder

        placeHolder = first.type.animationArr[first.i].img.src
        first.type.animationArr[first.i].img.src = second.type.animationArr[second.i].img.src
        second.type.animationArr[second.i].img.src = placeHolder
    }

    gsap.to(first.type.animationArr[first.i], {
        opacity: 0,
        onComplete: () =>{
            switchPogemonInfo()
            disableClickEvent = false
            gsap.to(first.type.animationArr[first.i], {
                opacity: 1,
            })
        }
    })

    if(second.pogemon != null) {
        gsap.to(second.type.animationArr[second.i], {
            opacity: 0,
            onComplete: () =>{
                gsap.to(second.type.animationArr[second.i], {
                    opacity: 1,
                })
            }
        })
    }
}

function hidePcMenu(){
    document.querySelector('#pcSceneSelectedPogemonSection').style.display = 'none'
    document.querySelector('#pcSceneInteractionButtonContainer').style.display = 'none'

    selectedPogemonImg.src = 'img/Template.png'

    selectedEvent = {initiated: false, target: null}

    document.querySelectorAll('.pcScenePogemonContainer').forEach(node =>{
        node.style.background = 'transparent'
        node.style.cursor = 'auto'
        node.id = ''
    })
    document.querySelectorAll('.pcSceneBoxContent').forEach(node =>{
        node.style.background = 'transparent'
        node.style.cursor = 'auto'
        node.id = ''
    })
    teamSprites.forEach(sprite =>{
        sprite.animate = false
    })

    document.querySelector('#pcSwitch').style.backgroundColor = 'transparent'
}

let disableClickEvent = false

function clickPogemonEvent(state, e, DOM, target, i, type){
    if(disableClickEvent) return
    if(state){
        if(selectedEvent.initiated){
            if(target != null) {
                if(target.isShiny) selectedPogemonImg.src = target.pogemon.sprites.shiny.frontSprite
                else selectedPogemonImg.src = target.pogemon.sprites.classic.frontSprite

                target.animate = true
    
                switchEvent.target.second.i = i
                switchEvent.target.second.pogemon = target
                switchEvent.target.second.type.name = type
                if(type == 'box') {
                    switchEvent.target.second.type.obj = pc[currBox]
                    switchEvent.target.second.type.animationArr = boxSprites
                }
                else if(type == 'team') {
                    switchEvent.target.second.type.obj = player.team
                    switchEvent.target.second.type.animationArr = teamSprites
                }

                if(switchEvent.initiated){
                    hidePcMenu()
                    pcSwitchEvent(switchEvent.target.first, switchEvent.target.second)
                }

            } else {
                if(switchEvent.initiated){
                    switchEvent.target.second.i = i
                    switchEvent.target.second.pogemon = target
                    switchEvent.target.second.type.name = type
                    if(type == 'box') {
                        switchEvent.target.second.type.obj = pc[currBox]
                        switchEvent.target.second.type.animationArr = boxSprites
                        if(switchEvent.target.second.pogemon !== null) switchEvent.target.second.pogemon.type = 'box'
                    }
                    else if(type == 'team') {
                        switchEvent.target.second.type.obj = player.team
                        switchEvent.target.second.type.animationArr = teamSprites
                        if(switchEvent.target.second.pogemon !== undefined) switchEvent.target.second.pogemon.type = 'pogemon'
                    }

                    hidePcMenu()
                    pcSwitchEvent(switchEvent.target.first, switchEvent.target.second)
                }
                return
            }

            oldDOM = DOM

            document.querySelectorAll('.pcScenePogemonContainer').forEach(node =>{
                node.style.background = 'transparent'
                node.style.cursor = 'auto'
                node.id = ''
            })
            document.querySelectorAll('.pcSceneBoxContent').forEach(node =>{
                node.style.background = 'transparent'
                node.style.cursor = 'auto'
                node.id = ''
            })
            teamSprites.forEach(sprite =>{
                sprite.animate = false
            })
            
            DOM.style.background = 'rgba(125,125,125,0.25)'
            DOM.id = 'selected'
        }

        if(type == 'box' && pc[currBox][i] == null) return

        if(switchEvent.initiated == true) return

        if(target == undefined) return

        switchEvent.target.first.i = i
        switchEvent.target.first.pogemon = target
        switchEvent.target.first.type.name = type
        if(type == 'box') {
            switchEvent.target.first.type.obj = pc[currBox]
            switchEvent.target.first.type.animationArr = boxSprites
        }
        else if(type == 'team') {
            switchEvent.target.first.type.obj = player.team
            switchEvent.target.first.type.animationArr = teamSprites
        }

        selectedEvent.initiated = true
        selectedEvent.target = target
        console.log(selectedEvent.target)

        document.querySelector('#pcSceneSelectedPogemonSection').style.display = 'block'
        document.querySelector('#pcSceneInteractionButtonContainer').style.display = 'grid'
        document.querySelector('#pcSceneSelectedPogemonInfoContentLvl').innerText = `Lv${selectedEvent.target.lvl}`
        document.querySelector('#pcSceneSelectedPogemonInfoContentName').innerText = `${switchUnderScoreForSpace(selectedEvent.target.nickname)}`

        DOM.id = 'selected'

        pcSceneSelectedPogemonGenderImg.src = `img/${selectedEvent.target.gender}_icon.png`
    } else {
        if(e.target.classList[0] == 'pcSceneTeamPogemonSection' || e.target.classList[0] == 'pcSceneBoxContent' || e.target.classList[0] == 'pcSceneInteractionButton') return

        hidePcMenu()
    }
}

function switchToStatsScene(){
    gsap.to('#overlapping',{
        opacity: 1,
        onComplete: () =>{
            managePcState(false)
            scenes.set('overworld', {initiated: false})
            console.log(selectedEvent.target)
            manageStatsState(true, selectedEvent.target, 'pc')
            gsap.to('#overlapping',{
                opacity: 0
            })
        }
    })
}

function clickMenuButtonEvent(e){
    switch(e.target.textContent){
        case 'stats':
            switchToStatsScene()
            break
        case 'switch':
            switchEvent.initiated = true
            e.target.style.backgroundColor = 'rgba(125,125,125,0.25)'
            break
        case 'cancel':
            document.querySelector('#pcSceneSelectedPogemonSection').style.display = 'none'
            document.querySelector('#pcSceneInteractionButtonContainer').style.display = 'none'
    
            selectedPogemonImg.src = 'img/Template.png'
    
            selectedEvent = {initiated: false, target: null}
    
            document.querySelectorAll('.pcScenePogemonContainer').forEach(node =>{
                node.style.background = 'transparent'
                node.style.cursor = 'auto'
                node.id = ''
            })
            document.querySelectorAll('.pcSceneBoxContent').forEach(node =>{
                node.style.background = 'transparent'
                node.style.cursor = 'auto'
                node.id = ''
            })
            teamSprites.forEach(sprite =>{
                sprite.animate = false
            })

            switchEvent = {
                initiated: false, 
                target:{
                    first:{
                        i: null, 
                        pogemon: null, 
                        type:{
                            name: null, 
                            obj: null, 
                            animationArr: null
                        }
                    }, 
                    second:{
                        i: null, 
                        pogemon: null, 
                        type:{
                            name: null, 
                            obj: null, 
                            animationArr: null
                        }
                    }
                }
            }

            document.querySelector('#pcSwitch').style.backgroundColor = 'transparent'
            break
    }
}

function printPcMenu(){
    const pcScene = document.querySelector('#pcScene')
    
    const pcSceneGridContainer = document.createElement('div')
    pcSceneGridContainer.id = 'pcSceneGridContainer'
    pcSceneGridContainer.addEventListener('click', e => clickPogemonEvent(false, e))
    pcScene.appendChild(pcSceneGridContainer)

    for(let i = 0; i < 3; i++){
        const pcSceneGridContainerSection = document.createElement('div')
        pcSceneGridContainerSection.setAttribute('class', 'pcSceneSection')
        switch(i){
            case 0:
                pcSceneGridContainerSection.id = 'pcSceneTeamContainerSection'
                for(let i = 0; i < 6; i++){
                    const pcSceneTeamContainerSection = document.createElement('div')
                    pcSceneTeamContainerSection.setAttribute('class', 'pcScenePogemonContainer')
                    pcSceneGridContainerSection.appendChild(pcSceneTeamContainerSection)

                    const pogemonImg = new Image()


                    let yOffset = 100
                    let yMulti = 132.13
                    
                    if(window.innerHeight == 1080){
                        yOffset = 60
                        yMulti = 144.5
                    }

                    const pogemonSprite = new Sprite({
                        type: 'pc',
                        position: {
                            x: 259,
                            y: yOffset + i * yMulti
                        },
                        frames:{
                            max: 4,
                            hold: 25,
                        },
                        img: pogemonImg,
                        animate: false
                    })

                    teamSprites.push(pogemonSprite)

                    for(let j = 0; j < 2; j++){
                        const pcSceneTeamPogemonSection = document.createElement('div')
                        pcSceneTeamPogemonSection.setAttribute('class', 'pcSceneTeamPogemonSection')

                        switch(j){
                            case 0:
                                pcSceneTeamPogemonSection.id = 'pcSceneTeamPogemonTopSection'

                                const pcSceneTeamPogemonSectionLvl = document.createElement('div')
                                pcSceneTeamPogemonSectionLvl.id = 'pcSceneTeamPogemonSectionLvl'
                                pcSceneTeamPogemonSection.appendChild(pcSceneTeamPogemonSectionLvl)
                                

                                const pogemonGenderImg = new Image()
                                pogemonGenderImg.height = 14
                                pogemonGenderImg.style.paddingLeft = 14
                                pcSceneTeamPogemonSection.appendChild(pogemonGenderImg)

                                if(player.team[i] != undefined){
                                    pcSceneTeamPogemonSectionLvl.textContent = `Lv${player.team[i].lvl}`
                                    pogemonGenderImg.src = `img/${player.team[i].gender}_icon.png`
                                }
                                break
                            case 1:
                                pcSceneTeamPogemonSection.id = 'pcSceneTeamPogemonBottomSection'
                                if(player.team[i] != undefined) pcSceneTeamPogemonSection.textContent = `${switchUnderScoreForSpace(player.team[i].nickname)}`
                                break
                        }
                        pcSceneTeamContainerSection.appendChild(pcSceneTeamPogemonSection)
                    }

                    console.log(player.team[i])

                    pcSceneTeamContainerSection.addEventListener('mouseover', e => hoverEvent(true, pcSceneTeamContainerSection, pogemonSprite, i, 'team'))
                    pcSceneTeamContainerSection.addEventListener('mouseout', e => hoverEvent(false, pcSceneTeamContainerSection, pogemonSprite, i, 'team'))
                    pcSceneTeamContainerSection.addEventListener('click', e => clickPogemonEvent(true, e, pcSceneTeamContainerSection, player.team[i], i, 'team'))

                    if(player.team[i] == undefined) continue

                    if(player.team[i].isShiny) pogemonImg.src = player.team[i].pogemon.sprites.shiny.bagSprite
                    else pogemonImg.src = player.team[i].pogemon.sprites.classic.bagSprite
                }
                break
            case 1:
                pcSceneGridContainerSection.id = 'pcSceneBoxSection'

                const pcSceneNavSectionContainer = document.createElement('div')
                pcSceneNavSectionContainer.id = 'pcSceneNavSectionContainer'
                pcSceneGridContainerSection.appendChild(pcSceneNavSectionContainer)

                function updateBoxSprites(box){
                    for(let i = 0; i< box.length; i++) {
                        console.log(boxSprites[i].img)

                        if(box[i] == null) {
                            boxSprites[i].img.src = 'img/blank.png'
                        } else {
                            if(box[i].isShiny) boxSprites[i].img.src = box[i].pogemon.sprites.shiny.bagSprite
                            else boxSprites[i].img.src = box[i].pogemon.sprites.classic.bagSprite
                        }
                    }


                    console.log(box)
                }

                for(let i = 0; i < 3; i++){
                    const pcSceneNavContent = document.createElement('div')
                    pcSceneNavContent.setAttribute('class', 'pcSceneNavContent')
                    switch(i){
                        case 0:
                            pcSceneNavContent.innerText = '<'
                            pcSceneNavContent.id == 'decreaseBox'
                            pcSceneNavContent.addEventListener('click', e =>{
                                const boxNum = document.querySelector('#boxNum')

                                currBox--

                                if(currBox < 0) currBox = 9

                                boxNum.innerText = `Box ${currBox + 1}`

                                updateBoxSprites(pc[currBox])
                            })
                            break
                        case 1:
                            pcSceneNavContent.innerText = 'box 1'
                            pcSceneNavContent.id = 'boxNum'
                            break
                        case 2:
                            pcSceneNavContent.innerText = '>'
                            pcSceneNavContent.id == 'increaseBox'
                            pcSceneNavContent.addEventListener('click', e =>{
                                const boxNum = document.querySelector('#boxNum')

                                currBox++

                                if(currBox > 9) currBox = 0

                                boxNum.innerText = `Box ${currBox + 1}`

                                updateBoxSprites(pc[currBox])
                            })
                            break
                    }
                    pcSceneNavSectionContainer.appendChild(pcSceneNavContent)
                }

                const pcSceneBoxSectionContainer = document.createElement('div')
                pcSceneBoxSectionContainer.id = 'pcSceneBoxSectionContainer'
                pcSceneGridContainerSection.appendChild(pcSceneBoxSectionContainer)

                let j = 0
                let x = 0
                for(let i = 0; i < 30; i++){
                    const pcSceneBoxContent = document.createElement('div')
                    pcSceneBoxContent.setAttribute('class', 'pcSceneBoxContent')

                    const boxPogemonImg = new Image()

                    if(pc[currBox][i] != null) {
                        if(pc[currBox][i].isShiny) boxPogemonImg.src = pc[currBox][i].pogemon.sprites.shiny.bagSprite
                        else boxPogemonImg.src = pc[currBox][i].pogemon.sprites.classic.bagSprite
                    }
                        
                    switch(i){
                        case 6:
                            x = 0
                            j = 1
                            break
                        case 12:
                            x = 0
                            j = 2
                            break
                        case 18:
                            x = 0
                            j = 3
                            break
                        case 24:
                            x = 0
                            j = 4
                            break
                    }

                    let xOffset = 410
                    let yOffset = 112.5

                    let xMulti = 175
                    let yMulti = 159

                    if(window.innerHeight == 1080){
                        xOffset = 410
                        yOffset = 112.5

                        yOffset = 80
                        yMulti = 172.5
                    }

                    const boxPogemonSprite = new Sprite({
                        type:'box',
                        position: {
                            x: xOffset + x * xMulti,
                            y: yOffset + j * yMulti
                        },
                        img: boxPogemonImg,
                        frames:{
                            max: 4,
                            hold: 25
                        },
                        animate: false,
                    })

                    boxSprites.push(boxPogemonSprite)

                    if(x == 0) x = 1
                    else x ++

                    pcSceneBoxContent.addEventListener('mouseover', e => hoverEvent(true, pcSceneBoxContent, pc[currBox][i], i, 'box'))
                    pcSceneBoxContent.addEventListener('mouseout', e => hoverEvent(false, pcSceneBoxContent, pc[currBox][i], i, 'box'))
                    pcSceneBoxContent.addEventListener('click', e => clickPogemonEvent(true, e, pcSceneBoxContent, pc[currBox][i], i, 'box'))

                    pcSceneBoxSectionContainer.appendChild(pcSceneBoxContent)
                }

                break
            case 2:
                pcSceneGridContainerSection.id = 'pcSceneSelectedPogemonSection'

                const pcSceneSelectedPogemonInfoContainer = document.createElement('div')
                pcSceneSelectedPogemonInfoContainer.setAttribute('id', 'pcSceneSelectedPogemonInfoContainer')
                pcSceneGridContainerSection.appendChild(pcSceneSelectedPogemonInfoContainer)

                for(let i = 0; i < 3; i++){
                    const pcSceneSelectedPogemonInfoContent = document.createElement('div')
                    pcSceneSelectedPogemonInfoContent.setAttribute('class', 'pcSceneSelectedPogemonInfoContent')
                    switch(i){
                        case 0:
                            pcSceneSelectedPogemonInfoContent.id = 'pcSceneSelectedPogemonInfoContentLvl'
                            pcSceneSelectedPogemonInfoContainer.appendChild(pcSceneSelectedPogemonInfoContent)
                            break
                        case 1:
                            pcSceneSelectedPogemonInfoContent.id = 'pcSceneSelectedPogemonInfoContentName'
                            pcSceneSelectedPogemonInfoContainer.appendChild(pcSceneSelectedPogemonInfoContent)
                            break
                        case 2:
                            pcSceneSelectedPogemonGenderImg.setAttribute('class', 'pcSceneSelectedPogemonInfoContent')
                            pcSceneSelectedPogemonGenderImg.id = 'pcSceneSelectedPogemonInfoContentGender'

                            pcSceneSelectedPogemonInfoContainer.appendChild(pcSceneSelectedPogemonGenderImg)
                            break
                    }
                }

                const pcSceneInteractionButtonContainer = document.createElement('div')
                pcSceneInteractionButtonContainer.setAttribute('id', 'pcSceneInteractionButtonContainer')
                pcSceneGridContainerSection.appendChild(pcSceneInteractionButtonContainer)

                for(let i = 0; i < 3; i++){
                    const pcSceneInteractionButton = document.createElement('div')
                    pcSceneInteractionButton.setAttribute('class', 'pcSceneInteractionButton')
                    pcSceneInteractionButtonContainer.appendChild(pcSceneInteractionButton)
                    switch(i){
                        case 0:
                            pcSceneInteractionButton.innerText = 'stats'
                            pcSceneInteractionButton.addEventListener('click', e => clickMenuButtonEvent(e))
                            break
                        case 1:
                            pcSceneInteractionButton.innerText = 'switch'
                            pcSceneInteractionButton.id = 'pcSwitch'
                            pcSceneInteractionButton.addEventListener('click', e => clickMenuButtonEvent(e))
                            break
                        case 2:
                            pcSceneInteractionButton.innerText = 'cancel'
                            pcSceneInteractionButton.addEventListener('click', e => clickMenuButtonEvent(e))
                            break
                    }
                }
                break
        }
        pcSceneGridContainer.appendChild(pcSceneGridContainerSection)
    }
}

function clearPcMenu(){
    boxSprites = []
    teamSprites = []
    player.team.forEach(pogemon =>{
        pogemon.type = 'pogemon'
        pogemon.position = undefined
    })

    document.querySelector('#pcScene').replaceChildren()
    document.querySelector('#pcScene').style.display = 'none'
    scenes.set('pc', {initiated: false})
    selectedPogemonImg.src = 'img/Template.png'
    window.cancelAnimationFrame(pcAnimationId)
}

export function managePcState(state){
    if(state) {
        if(scenes.get('pc').initiated) return
        manageOverWorldState(false, 'pc')
        initPcMenu()
    }
    else {
        if(!disableClickEvent) clearPcMenu()
    }
}