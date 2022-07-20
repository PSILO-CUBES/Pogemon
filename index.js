const canvas = document.querySelector('canvas')
//context of canvas
const c = canvas.getContext('2d')

// initialize canvas

canvas.width = 1920
canvas.height = 1007

let currMap
let currChar = imgs.playerSprites.brendan
let offset

console.log(loadData())

if(loadData() === null){
    currMap = maps.keyTown
    offset = {
        x: currMap.position.x,
        y: currMap.position.y,
    }
} else if (loadData() != null) {
    currMap = loadData().currMap
    offset = {
        x: loadData().playerPos.x,
        y: loadData().playerPos.y,
    }
}

// x: -1115,
// y: -550,

// process tiles here

// 424
// 356

let currCollisionsData
let collisionsMap = []
let collisions = []
const defineCollisionsPosition = () =>{
    currCollisionsData = maps[currMap.name].collisionsData
    collisionsMap = []
    collisions = []
    for (let i = 0; i < currCollisionsData.length; i += currMap.width){
        collisionsMap.push(currCollisionsData.slice(i, currMap.width + i))
    } collisionsMap.forEach((row, i) =>{
        row.forEach((symbol, j) =>{
            if (symbol === 1) {
                collisions.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'full',
            }))
            } else if (symbol === 2) {
                collisions.push(new Boundary({
                    position : {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'up' ,
            }))
            } else if (symbol === 3) {
                collisions.push(new Boundary({
                    position : {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'right' ,
            }))
            } else if (symbol === 4) {
                collisions.push(new Boundary({
                    position : {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'down' ,
            }))
            } else if (symbol === 5) {
                collisions.push(new Boundary({
                    position : {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'left' ,
            }))
            } else if (symbol === 6) {
                collisions.push(new Boundary({
                    position : {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'upLedge' ,
            }))
            }
        })
    })
}

defineCollisionsPosition()

let currBattleZonesData
let battleZonesMap = []
let battleZones = []
const defineBattleZonesPosition = () =>{
    currBattleZonesData = maps[currMap.name].battleZonesData
    battleZonesMap = []
    battleZones = []
    if (currBattleZonesData.length === 0){
        return []
    } else {
        for (let i = 0; i < currBattleZonesData.length; i += currMap.width){
            battleZonesMap.push(currBattleZonesData.slice(i, currMap.width + i))
        }
    }
    battleZonesMap.forEach((row, i) =>{
        row.forEach((symbol, j) =>{
            if (symbol === 21) {
                battleZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'grass'
            }))
            }
            if (symbol === 22) {
                battleZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'cave'
            }))
            }
            if (symbol === 23) {
                battleZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'water'
            }))
            }
        })
    })
}

defineBattleZonesPosition()

let currChangeMapZonesData
let changeZonesMap = []
let changeZones = []
const defineChangeZonesPosition = () =>{
    currChangeMapZonesData = maps[currMap.name].changeMapZonesData
    changeZonesMap = []
    changeZones = []
    for (let i = 0; i < currChangeMapZonesData.length; i += currMap.width){
        changeZonesMap.push(currChangeMapZonesData.slice(i, currMap.width + i))
    }
    changeZonesMap.forEach((row, i) =>{
        row.forEach((symbol, j) =>{
            if (symbol === 41) {
                changeZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'up',
            }))
            } else if (symbol === 42) {
                changeZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'left',

            }))
            } else if (symbol === 43) {
                changeZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'down',
            }))
            } else if (symbol === 44) {
                changeZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'right',
            }))
        }})
    })
    return changeZones
}

defineChangeZonesPosition()

let prevMap

for(let i = 0; i < changeZones.length; i++){
    if(currMap.name === 'pogemart'){
        if(prevMap === undefined){
            prevMap = loadData().prevMap
            changeZones[i].data = {name:`${prevMap.name}`,
            position: {
                x: prevMap.pogemartPosition.x,
                y: prevMap.pogemartPosition.y,
            }}
        } else {
            changeZones[i].data = {name:`${prevMap.name}`,
            position: {
                x: prevMap.pogemartPosition.x,
                y: prevMap.pogemartPosition.y,
            }}
        }
    } else {
        changeZones[i].data = maps[currMap.name].changeMapArray[i]
    }
}

let currEventZonesData
let eventZonesMap = []
let eventZones = []
const defineEventZonesPosition = () =>{
    currEventZonesData = maps[currMap.name].eventZonesData
    eventZonesMap = []
    eventZones = []
    for (let i = 0; i < currEventZonesData.length; i += currMap.width){
        eventZonesMap.push(currEventZonesData.slice(i, currMap.width + i))
    }
    eventZonesMap.forEach((row, i) =>{
        row.forEach((symbol, j) =>{
            if (symbol === 19) {
                eventZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'starter',
            }))
            } else if (symbol === 15){
                eventZones.push(new Trainer({
                    position :{
                        x: j * Trainer.width + offset.x,
                        y: i * Trainer.height + offset.y
                    },
                    type: 'NPC',
                    direction: 'up'})
                )
            } else if (symbol === 16){
                eventZones.push(new Trainer({
                    position :{
                        x: j * Trainer.width + offset.x,
                        y: i * Trainer.height + offset.y
                    },
                    type: 'NPC',
                    direction: 'right'})
                )
            } else if (symbol === 17){
                eventZones.push(new Trainer({
                    position :{
                        x: j * Trainer.width + offset.x,
                        y: i * Trainer.height + offset.y
                    },
                    type: 'NPC',
                    direction: 'down'})
                )
            } else if (symbol === 18){
                eventZones.push(new Trainer({
                    position :{
                        x: j * Trainer.width + offset.x,
                        y: i * Trainer.height + offset.y
                    },
                    type: 'NPC',
                    direction: 'left'})
                )
            } else if (symbol === 10){
                eventZones.push(new Boundary({
                    position :{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    type: 'heal',
            }))
            }
        })
    })
    return eventZones
}

defineEventZonesPosition()

let trainerIndex = -1

// load trainer


for(let i = 0; i < eventZones.length; i++){
    if(eventZones[i].type === "NPC"){
        trainerIndex++
        eventZones[i].data = maps[currMap.name].trainerArray[trainerIndex]
    }
}

let rectangularCollision = ({rectangle1, rectangle2}) =>{
    return (
        rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
        rectangle1.position.y <= rectangle2.position.y &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

// map images here

const backgroundImage = new Image()
backgroundImage.src = currMap.backgroundImage.src

const mapImage = new Image()
mapImage.src = currMap.image.src

const foreground1Image = new Image()
foreground1Image.src = currMap.foreground1Image.src

const foreground2Image = new Image()
foreground2Image.src = currMap.foreground2Image.src

const foreground3Image = new Image()
foreground3Image.src = currMap.foreground3Image.src

const foreground4Image = new Image()
foreground4Image.src = currMap.foreground4Image.src

// stand Sprites

const playerUpImage = new Image()
playerUpImage.src = currChar.stand.up

const playerRightImage = new Image()
playerRightImage.src = currChar.stand.right

const playerDownImage = new Image()
playerDownImage.src = currChar.stand.down

const playerLeftImage = new Image()
playerLeftImage.src = currChar.stand.left

// walk Sprites

const playerUpWalkImage = new Image()
playerUpWalkImage.src = currChar.walk.up

const playerRightWalkImage = new Image()
playerRightWalkImage.src = currChar.walk.right

const playerDownWalkImage = new Image()
playerDownWalkImage.src = currChar.walk.down

const playerLeftWalkImage = new Image()
playerLeftWalkImage.src = currChar.walk.left


const player = new Sprite({
    position: {
        x: canvas.width/2 - 192 / 4 / 2,
        y: canvas.height/2 - 69 / 2
    },
    image: playerDownImage,
    frames: {
        max: 2,
        hold: 10
    },
    sprites: {
        stand: {
            up: playerUpImage,
            down: playerDownImage,
            left: playerLeftImage,
            right: playerRightImage

        },        
        walk: {
            up: playerUpWalkImage,
            down: playerDownWalkImage,
            left: playerLeftWalkImage,
            right: playerRightWalkImage
        },
    },
})

const backgroundMap = new Sprite({ 
    position: {
        x: 0,
        y: 0
    },
    image: backgroundImage
})

const map = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImage
})

const foreground1 = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreground1Image
})

const foreground2 = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreground2Image
})

const foreground3 = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreground3Image
})

const foreground4 = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreground4Image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    e:{
        pressed: false
    },
    Shift: {
        pressed: false
    },
    Enter: {
        pressed: false
    },
    Space: {
        pressed: false
    },
    Escape: {
        pressed: false
    }
}

let movables = [map, ...collisions, foreground1, foreground2, foreground3, foreground4, ...battleZones, ...changeZones, ...eventZones]

let boundary

const battle = {
    initiated: false
}

const menu = {
    open: false
}

const starterSelectionWindow = {
    open: false
}

let running = false

const baseSpeed = 5
let speedModifier = 1
let currSpeed
let lastKey = ''
let lastMenuOpen
let teamFainted
let attackInitiated = false 
let trainerBattle = false
let currTrainer
let engageRematch
let bagMenu = {
    open: false
}
let prevMapName

let timerId;
let _doActionNoSpamCloseTeamMenuInCombat = () =>{
    if (!(timerId == null)) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() =>{
        teamMenu.open = false
        teamMenu.animate = false
    }, 400);
}

addEventListener('keydown', (e) =>{

    if (e.key === 'Shift' && !running) {
        speedModifier = 2
        player.frames.hold = 10
        running = true
    } else if (e.key == 'Shift' && running) {
        speedModifier = 1
        player.frames.hold = 20
        running = false
    }

    currSpeed = baseSpeed * speedModifier

    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'W':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'A':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'S':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'D':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'e':
            keys.e.pressed = true
            lastKey = 'e'
            break
        case 'Enter':
            keys.Enter.pressed = true
            lastKey = 'Enter'
            break
        case ' ':
            keys.Space.pressed = true
            lastKey = 'Space'
            break
        case 'Escape':
            //if pressed during encounter animation, teamMenu is displayed after battle... not that big a deal but should fix ... something to so with the delay??
            keys.Escape.pressed = true
            if (!menu.open && !battle.initiated && !bagMenu.open) menu.open = true
            else if (menu.open && !battle.initiated) menu.open = false
            if(battle.initiated && !teamMenu.open){
                _doActionNoSpamCloseTeamMenuInCombat()
                if(!attackInitiated){
                    document.querySelector('#attackEventContainer').style.display = 'none'
                    document.querySelector('#battleOptionsContainer').style.display = 'grid'
                }
            } else if (team[0] !== undefined && team[0].currHP > 0) {
                teamMenu.open = false
            }
            if(pcStorage.animation){
                pcStorage.animation = false
            }
            if(summaryState.animation){
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete: () =>{
                        if (lastMenuOpen === 'teamMenu'){
                            summaryState.animation = false
                            teamMenu.open = true
                            teamMenu.animate = true
                            animateTeamMenu()
                        } else {
                            summaryState.animation = false
                            pcStorage.animation = true
                            document.querySelector('#box').style.top = '10px'
                            initPcStorageDisplay()
                            animate()
                        }
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4
                        })
                    }
                })
            }
            if(bagMenu.open){
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete: () =>{
                        bagMenu.open = false
                        animate()
                        document.querySelector('#itemMenu').style.display = 'none'
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4
                        })
                    }
                })
            }
            lastKey = 'Escape'
            break
    }
})

let mouse = {
    pressed: false,
}

document.addEventListener('mousedown', e =>{
    mouse.pressed = true
    mouse.event = e
    mouse.textContent = e.target.textContent
})

document.addEventListener('mouseup', e =>{
    mouse.pressed = false
})

// button Events for Menu
document.querySelectorAll('.menuButton').forEach(button =>{
    button.addEventListener('click', e =>{
        switch(button.textContent) {
            case 'Team':
                if(team[0] === undefined) {
                    audio.error.play()
                }
                else{
                    teamMenu.open = true
                }
                console.log(teamMenu.open)
                break
            case 'Items':
                if(team[0] !== undefined){
                    bagMenu.open = true
                    initItemMenu()
                    animateItemMenu()
                }
                break
            case 'Save':
                let saveDataObject = {
                    currGlobalId: currId,
                    team,
                    pogemonStorage,
                    currMap,
                    prevMap,
                    currChar,
                    playerPos: map.position,
                }
                saveData(saveDataObject)
                break
            case 'Reset':
                resetData('saveDataKey')
                starterFlag.checked = false
                break
            case 'Proutt':
                audio.proutt.play()
                break
        }
    })
})

let downKeyCount = []

let cancelKeyDown = () =>{
    downKeyCount = []
    Object.entries(keys).forEach(([key, value]) =>{
        value.pressed = false
        if(key === lastKey){
            value.pressed = true
        }
    })
    
}

addEventListener('keyup', (e) =>{
    switch (e.key){
        case 'w':
            player.animate = false
            player.image = player.sprites.stand.up
            keys.w.pressed = false
            break
        case 'a':
            player.animate = false
            player.image = player.sprites.stand.left
            keys.a.pressed = false
            break
        case 's':
            player.animate = false
            player.image = player.sprites.stand.down
            keys.s.pressed = false
            break
        case 'd':
            player.animate = false
            player.image = player.sprites.stand.right
            keys.d.pressed = false
            break
        case 'e':
            keys.e.pressed = false
            break
        case 'Enter':
            keys.Enter.pressed = false
            break
        case ' ':
            keys.Space.pressed = false
            break
        case 'Escape':
            keys.Escape.pressed = false
            break
    }
    Object.entries(keys).forEach(([key, value]) =>{
        if(value.pressed){
            if(downKeyCount.length > 2){
                cancelKeyDown()
                return
            }
            downKeyCount.push(key)
        }
    })
})

let pcEvent = {
    menuOpen: false,
    menuOpened: false

}

const animate = () =>{
    const animationId = requestAnimationFrame(animate)

    audio.victory.stop()

    team.forEach(pogemon =>{
        if(pogemon.position !== undefined){
            pogemon.position._gsap = null
            pogemon._gsap = null
        }
    })
    
    backgroundImage.src = 'img/map/blackBackground.png'
    backgroundMap.image = backgroundImage
    //draw these in a loop
    backgroundMap.draw()
    map.draw()
    changeZones.forEach(mapZone =>{
        mapZone.draw()
    })
    battleZones.forEach(battleZone =>{
        battleZone.draw()
    })
    collisions.forEach(collision => {
        collision.draw()
    })

    if (pcStorage.animation) {
        cancelAnimationFrame(animationId)
        initPcStorageDisplay()
        animatePcStorage()
    }

    if (teamMenu.open && !battle.initiated){
        cancelAnimationFrame(animationId)
        defineTeamSprite()
        animateTeamMenu()
    }

    if(bagMenu.open) {
        cancelAnimationFrame(animationId)
    }

    player.draw()
    if (foreground4.image) foreground4.draw()
    if (foreground3.image) foreground3.draw()
    if (foreground2.image) foreground2.draw()
    if (foreground1.image) foreground1.draw()

    let moving = true
    player.animate = true

    if (battle.initiated) return

    // overworld Menu

    if (menu.open === true ){
        document.querySelector('#menuContainer').style.display = 'flex'
    } else if (menu.open === false){
        document.querySelector('#menuContainer').style.display = 'none'
    }

    let starter

    for (let i = 0; i < eventZones.length; i++){
        const eventZone = eventZones[i]
        // determine starter picked
        if(eventZones[i].type === 'starter'){
            eventZones[1].name = 'Lokump'
            eventZones[2].name = 'Steeli'
            eventZones[3].name = 'Maaph'
        }
        rectangularCollision = ({rectangle1, rectangle2}) =>{
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x + 25 &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 25 &&
                rectangle1.position.y <= rectangle2.position.y + 150 &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            )
        }
        // event Tile collisions
        if ((
            rectangularCollision({
            rectangle1: player,
            rectangle2: eventZone
            }) && eventZone.type === 'starter'
        )){
            let starterSelectionImage = new Image()
            starterSelectionImage.src = pogemons[eventZone.name].image.src
            const starterSelectionSprite = new Sprite({
                position:{
                    x: 775,
                    y: 100
                },
                frames: {
                    max: 4,
                    hold: 30
                },
                image: starterSelectionImage,
                animate: true
            })

            const animateStarterSelection = () =>{
                let animateStarterSelectionId = requestAnimationFrame(animateStarterSelection)
                cancelAnimationFrame(animationId)

                menu.open = false
                document.querySelector('#menuContainer').style.display = 'none'
                starterSelectionWindow.open = true

                backgroundImage.src = 'img/map/blackBackground.png'
                backgroundMap.image = backgroundImage
                backgroundMap.draw()

                starterSelectionSprite.draw()

                if (mouse.pressed && starterFlag){
                    if (mouse.textContent === 'yes'){
                        if(team.length === 0){
                            starter = new Pogemon(pogemons[eventZone.name])
                            starter.currExp = 125
                            starter.currLevel = 5
                            definePogemonStats(starter)
                            starter.catch(starter)
                        }
                        defineCurrTeamMenuInfo()
                        defineTeamSprite()
                        overworldButtonContainer.style.display = 'none'
                        overworldDialogueBox.style.display = 'none'
                        if(running){
                            speedModifier = 2
                        } else if(!running){
                            speedModifier = 1
                        }
                        player.animate = true
                        starterSelectionWindow.open = false
                        cancelAnimationFrame(animateStarterSelectionId)
                        currMap = maps.paccIsleLab
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete: () =>{
                                animate()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                    onComplete: () =>{
                                    }
                                })
                            }
                        })
                    } else if (mouse.textContent === 'no'){
                        starterFlag.checked = false
                        overworldButtonContainer.style.display = 'none'
                        overworldDialogueBox.style.display = 'none'
                        if(running){
                            speedModifier = 2
                        } else if(!running){
                            speedModifier = 1
                        }
                        player.animate = true
                        starterSelectionWindow.open = false
                        cancelAnimationFrame(animateStarterSelectionId)
                        currMap = maps.paccIsleLab
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete: () =>{
                                animate()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                    onComplete: () =>{
                                    }
                                })
                            }
                        })
                    }
                }
            }

            if (eventZone.type === 'starter' && !starterFlag.checked && team.length === 0){
                if (keys.Enter.pressed || keys.Space.pressed|| keys.e.pressed){
                    starterFlag.checked = true
                    cancelAnimationFrame(animationId)
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete: () =>{
                            document.querySelector('#overworldDialogueBox').style.display = 'block'
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.4,
                            })
                            animateStarterSelection()
                            // set DOM elements
                            let overworldDialogue = document.querySelector('#overworldDialogue')
                            let overworldDialogueBox = document.querySelector('#overworldContainer')
                            let overworldButtonContainer = document.querySelector('#overworldButtonContainer')
                            overworldDialogue.textContent = 'Do you want to choose ' + eventZone.name + ' as your starter?'
                            overworldDialogueBox.style.display = 'flex'
                            overworldButtonContainer.style.display = 'flex'
                            yesButton.textContent = 'yes'
                            noButton.textContent = 'no'
                        }
                    })
                }
            }
        }

        if(eventZone.type === 'heal'){
            rectangularCollision = ({rectangle1, rectangle2}) =>{
                return (
                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed&&
                    rectangle1.position.y <= rectangle2.position.y + 100 &&
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                )
            }
        }

        if ((
            rectangularCollision({
            rectangle1: player,
            rectangle2: eventZone
            }) && eventZone.type === 'heal'
        )){
            
            let openPcMenu = () =>{
                gsap.to('#pcMenuContainer',{
                    opacity: 0,
                    onComplete: () =>{
                        document.querySelector('#pcMenuContainer').style.display = 'grid'
                        gsap.to('#pcMenuContainer',{
                            opacity: 1,
                        })
                    }
                })
                menu.open = false
                pcEvent.menuOpen = false
                pcEvent.menuOpened = true
            }

            if (keys.Enter.pressed || keys.Space.pressed || keys.e.pressed ){
                pcEvent.menuOpen = true
            }
    
            if(pcEvent.menuOpen){
                openPcMenu()
            }

            let isPPNotFull

            team.forEach(pogemon =>{
                pogemon.attacks.forEach(attack =>{
                    if(attack.pp < attacks[attack.name].pp){
                        isPPNotFull = true
                    }
                })
            })

            if(pcEvent.menuOpened){
                switch(mouse.event.target.textContent){
                    case 'Heal':
                        pcEvent.menuOpen = false
                        gsap.to('#pcMenuContainer',{
                            opacity: 0,
                            onComplete: () =>{
                                document.querySelector('#pcMenuContainer').style.display = 'none'
                            }
                        })
                        for (let i = 0; i < team.length; i++){
                            if (team[i].currHP < team[i].stats.HP || isPPNotFull){
                                team[i].currHP = team[i].stats.HP
                                team[i].attacks.forEach(attack =>{
                                    attack.pp = attacks[attack.name].pp
                                })
                                team[i].fainted = false
                                team[i].opacity = 1
                                teamFainted = false
                                alert(team[i].name + ' healed!')
                            }
                        }
                        break
                    case 'Storage':
                        if(team.length === 0) {
                            audio.error.play()
                            return
                        }
                        pcEvent.menuOpen = false
                        gsap.to('#pcMenuContainer',{
                            opacity: 0,
                            onComplete: () =>{
                                document.querySelector('#pcMenuContainer').style.display = 'none'
                                document.querySelector('#box').style.top = '77.5px'
                                pcStorage.animation = true
                            }
                        })
                        break
                    case 'Cancel':
                        pcEvent.menuOpen = false
                        gsap.to('#pcMenuContainer',{
                            opacity: 0,
                            onComplete: () =>{
                                document.querySelector('#pcMenuContainer').style.display = 'none'
                            }
                        })
                        break
                }
            }
        } else if ((
            !rectangularCollision({
            rectangle1: player,
            rectangle2: eventZone
            }) && eventZone.type === 'heal'
        )){ {

            gsap.to('#pcMenuContainer',{
                opacity: 0,
                onComplete: () =>{
                    document.querySelector('#pcMenuContainer').style.display = 'none'
                }
            })

            pcEvent.menuOpen = false
            pcEvent.menuOpened = false
        }}

        if(eventZone.type === 'NPC'){
            for(let i = 0; i < maps[currMap.name].trainerArray.length; i++){
                rectangularCollision = ({rectangle1, rectangle2}) =>{
                    if(eventZone.direction === 'left'){
                        return (
                            rectangle1.position.x + rectangle1.width >= rectangle2.position.x - 250 &&
                            rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 25 &&
                            rectangle1.position.y <= rectangle2.position.y &&
                            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                        )
                    } else if(eventZone.direction === 'down'){
                        return (
                            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                            rectangle1.position.y <= rectangle2.position.y + 250 &&
                            rectangle1.position.y + rectangle1.height >= rectangle2.position.y - 250
                        )
                    } else {
                        return (
                            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                            rectangle1.position.y <= rectangle2.position.y &&
                            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                        )
                    }
                }
            }
            if ((
                rectangularCollision({
                rectangle1: player,
                rectangle2: eventZone
                })
            )){

                if(!eventZone.data.defeated && team.length != 0){ 
                    document.querySelector('#overworldContainer').style.display = 'grid'
                    document.querySelector('#overworldDialogueBox').textContent = eventZone.data.dialogue
                    let exclamation = document.querySelector('#exclamationNPC')
                    if(team.length !== 0){
                        document.querySelector('#overworldContainer').style.display = 'block'
                        document.querySelector('#overworldDialogueBox').style.display = 'block'
                        exclamation.style.display = 'block'
                        exclamation.style.top = eventZone.position.y - 55 + 'px'
                        exclamation.style.left = eventZone.position.x + 22.5 + 'px'
                        currSpeed = 0
                        if(mouse.event.target.id === 'overworldDialogueBox'){
                            document.querySelector('#overworldContainer').style.display = 'none'
                            trainerBattle = true
                            battle.initiated = true
                            currTrainer = eventZone
                            cancelAnimationFrame(animationId)
                            initBattle()
                            animateBattle()
                        }
                    }
                //rematch
                }

                if(eventZone.data.defeated){
                    if(keys.Space.pressed || keys.e.pressed || keys.Enter.pressed) {
                        engageRematch = true
                        currFoeTeam.pop()
                        break 
                    } else {
                        document.querySelector('#overworldContainer').style.display = 'none'
                        document.querySelector('#exclamationNPC').style.top =  -55 + 'px'
                    }
        
                    if(engageRematch){
                        document.querySelector('#overworldDialogueBox').textContent = eventZone.data.dialogue
                        let exclamation = document.querySelector('#exclamationNPC')
                        document.querySelector('#overworldContainer').style.display = 'block'
                        exclamation.style.top = eventZone.position.y - 55 + 'px'
                        exclamation.style.left = eventZone.position.x + 22.5 + 'px'
                        currTrainer = eventZone
                        currSpeed = 0
                        if(team.length > 0 && mouse.event.target.id === 'overworldDialogueBox'){
                            document.querySelector('#overworldContainer').style.display = 'none'
                            document.querySelector('#exclamationNPC').style.top =  -55 + 'px'
                            trainerBattle = true
                            battle.initiated = true
                            cancelAnimationFrame(animationId)
                            initBattle()
                            animateBattle()
                            engageRematch = false
                        }
                    }
                }
            } 
        }  
    }
    
    //activate battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i = 0; i < battleZones.length; i++){
            const battleZone = battleZones[i]
            const overlappingArea = 
                (Math.min(
                    player.position.x + player.width, 
                    battleZone.position.x + battleZone.width
                    ) - 
                Math.max(
                    player.position.x,
                    battleZone.position.x
                    )) * 
                (Math.min(
                    player.position.y + player.height,
                    battleZone.position.y + battleZone.height
                    ) - 
                Math.max(
                    player.position.y, 
                    battleZone.position.y
                ))
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                }) &&
                overlappingArea > (player.width * player.height) / 2
                && Math.random() < 0.025
            ){
                // deactivate curr animation loop
                if (team[0] === undefined) {
                    return
                } else
                cancelAnimationFrame(animationId)

                // audio for wild encounters

                audio.map.stop()
                audio.initWildBattle.play()
                audio.battle.play()

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                            // activate new animation loop
                            document.querySelector('#battleOptionsContainer').style.display = 'grid'
                            document.querySelector('#attackEventContainer').style.display = 'none'
                            trainerBattle = false
                            initBattle()
                            animateBattle()
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.4
                              })
                            }
                        })
                    }
                })
                 
            } 
        }

        for (let i = 0; i < changeZones.length; i++){
            const mapZone = changeZones[i]
            prevMap = currMap
            prevMapName = currMap.name

            rectangularCollision = ({rectangle1, rectangle2}) =>{
                if(mapZone.type === 'up') return (
                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed&&
                    rectangle1.position.y <= rectangle2.position.y &&
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y - 10
                )
                else if(mapZone.type === 'right') return (
                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width + 10 - currSpeed&&
                    rectangle1.position.y <= rectangle2.position.y &&
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                )
                else if(mapZone.type === 'down') return (
                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed&&
                    rectangle1.position.y <= rectangle2.position.y + 10 &&
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                )
                else if(mapZone.type === 'left') return (
                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x - 10 &&
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed&&
                    rectangle1.position.y <= rectangle2.position.y &&
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                )
                
            }
            if (
                rectangularCollision({
                rectangle1: player,
                rectangle2: mapZone
                })
            ){
                //change map code here
            
                cancelAnimationFrame(animationId)
                
                player.animate = false
                audio.changeMap.play()
                currSpeed = 0


                currMap = maps[mapZone.data.name]

                mapImage.src = 'img/map/' + currMap.name + '/' + currMap.name + '.png'
                backgroundImage.src =  'img/map/' + currMap.name + '/' + currMap.name + 'Background.png'
                foreground1Image.src = 'img/map/' + currMap.name + '/' + currMap.name + 'FG1.png'
                foreground2Image.src = 'img/map/' + currMap.name + '/' + currMap.name + 'FG2.png'
                foreground3Image.src = 'img/map/' + currMap.name + '/' + currMap.name + 'FG3.png'
                foreground4Image.src = 'img/map/' + currMap.name + '/' + currMap.name + 'FG4.png'
    
                map.image = mapImage
                backgroundMap.image = backgroundImage
                foreground1.image = foreground1Image
                foreground2.image = foreground2Image
                foreground3.image = foreground3Image
                foreground4.image = foreground4Image

                currMapZonePos = defineChangeZonesPosition().filter(changeZone => changeZone.type.name === prevMapName)

                if(prevMapName === 'pogemart'){
                    offset = {
                        x: maps[currMap.name].pogemartPosition.x,
                        y: maps[currMap.name].pogemartPosition.y
                    }
                } else {
                    offset = {
                        x: maps[prevMapName].changeMapArray[i].position.x,
                        y: maps[prevMapName].changeMapArray[i].position.y
                    }
                }

                defineChangeZonesPosition()
                defineCollisionsPosition()
                defineBattleZonesPosition()
                defineEventZonesPosition()

                map.position.x = offset.x
                map.position.y = offset.y
                foreground1.position.x = offset.x
                foreground1.position.y = offset.y
                foreground2.position.x = offset.x
                foreground2.position.y = offset.y
                foreground3.position.x = offset.x
                foreground3.position.y = offset.y
                foreground4.position.x = offset.x
                foreground4.position.y = offset.y

                movables = [map, ...collisions, foreground1, foreground2, foreground3, foreground4, ...battleZones, ...changeZones, ...eventZones]

                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                        animate()
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            onComplete: () =>{
                                player.animate = true
                                if(running === true) {
                                    speedModifier = 2
                                } else speedModifier = 1
                            }
                        })
                    }
                })

                trainerIndex = -1

                for(let i = 0; i < eventZones.length; i++){
                    if(eventZones[i].type === "NPC"){
                        trainerIndex++
                        eventZones[i].data = maps[currMap.name].trainerArray[trainerIndex]
                    }
                }

                for(let i = 0; i < changeZones.length; i++){
                    // pogemart change map
                    if(currMap.name === 'pogemart'){
                        console.log(prevMap)
                        changeZones[i].data = {name:`${prevMap.name}`,
                        position: {
                            x: prevMap.pogemartPosition.x,
                            y: prevMap.pogemartPosition.y,
                        }}
                    } else {
                        changeZones[i].data = maps[currMap.name].changeMapArray[i]
                    }
                }
            }
        }
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.walk.up
        for (let i = 0; i < collisions.length; i++){
            boundary = collisions[i]
            //repetitive, dont know how to pass boundary.type other wise
            rectangularCollision = ({rectangle1, rectangle2}) =>{
                switch (boundary.type){
                        case 'full': 
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed  >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed  &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'up':
                                return (
                                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                    rectangle1.position.y + rectangle1.height * 0.5 - currSpeed <= rectangle2.position.y &&
                                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                                )
                        case 'right':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x + rectangle2.width * 0.75 - currSpeed &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'down':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height * 0.5 + currSpeed >= rectangle2.position.y
                            )
                        case 'left':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x - rectangle2.width * 0.1 + currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'upLedge':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y + rectangle1.height * 0.9 - currSpeed <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                    }
            }
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + currSpeed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        //up speed
        if (moving) {
            movables.forEach(movable =>{
                movable.position.y += currSpeed
            })
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.walk.left
        for (let i = 0; i < collisions.length; i++){
            boundary = collisions[i]
            rectangularCollision = ({rectangle1, rectangle2}) =>{
                switch (boundary.type){
                        case 'full': 
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'up':
                                return (
                                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                    rectangle1.position.y + rectangle1.height * 0.5 - currSpeed <= rectangle2.position.y &&
                                    rectangle1.position.y + rectangle1.height - currSpeed >= rectangle2.position.y
                                )
                        case 'right':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x + rectangle2.width * 0.75 - currSpeed &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'down':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height * 0.5 + currSpeed >= rectangle2.position.y
                            )
                        case 'left':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x - rectangle2.width * 0.1 + currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'upLedge':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y + rectangle1.height * 0.9 - currSpeed <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                    }
            }
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x + currSpeed,
                            y: boundary.position.y
                    }}
                })
            ){
                moving = false
                break
            }
        }
        //left speed
        if (moving) {
            movables.forEach(movable =>{
                movable.position.x += currSpeed
            })
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.walk.down
        for (let i = 0; i < collisions.length; i++){
            boundary = collisions[i]
            rectangularCollision = ({rectangle1, rectangle2}) =>{
                switch (boundary.type){
                        case 'full': 
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'up':
                                return (
                                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                    rectangle1.position.y + rectangle1.height * 0.5 - currSpeed <= rectangle2.position.y &&
                                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                                )
                        case 'right':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x + rectangle2.width * 0.75 - currSpeed &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'down':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height * 0.5 + currSpeed >= rectangle2.position.y
                            )
                        case 'left':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x - rectangle2.width * 0.1 + currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'upLedge':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y + rectangle1.height * 0.9 - currSpeed <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                    }
            }
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - currSpeed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        //down speed
        if (moving) {
            movables.forEach(movable =>{
                movable.position.y -= currSpeed
            })
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.walk.right
        for (let i = 0; i < collisions.length; i++){
            boundary = collisions[i]
            rectangularCollision = ({rectangle1, rectangle2}) =>{
                switch (boundary.type){
                        case 'full': 
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'up':
                                return (
                                    rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                    rectangle1.position.y + rectangle1.height * 0.5 - currSpeed <= rectangle2.position.y &&
                                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                                )
                        case 'right':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x + rectangle2.width * 0.75 - currSpeed &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'down':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height * 0.5 + currSpeed >= rectangle2.position.y
                            )
                        case 'left':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x - rectangle2.width * 0.1 + currSpeed &&
                                rectangle1.position.y <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                        case 'upLedge':
                            return (
                                rectangle1.position.x + rectangle1.width - currSpeed >= rectangle2.position.x &&
                                rectangle1.position.x <= rectangle2.position.x + rectangle2.width - currSpeed &&
                                rectangle1.position.y + rectangle1.height * 0.9 - currSpeed <= rectangle2.position.y &&
                                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
                            )
                    }
            }
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x - currSpeed,
                            y: boundary.position.y
                    }}
                })
            ){
                moving = false
                break
            }
        }
        //right speed
        if (moving) {
            movables.forEach(movable =>{
                movable.position.x -= currSpeed
            })
        }
    }

    if (starterFlag.checked === true && starterSelectionWindow.open === true){
        cancelAnimationFrame(animationId)
    }
}

let clicked = false
addEventListener('click', () =>{
    if (!clicked) {
        audio.map.play()
        clicked = true
    }
}, {once: true})
addEventListener('keydown', () =>{
    if (!clicked) {
        audio.map.play()
        clicked = true
    }
}, {once: true})
    
