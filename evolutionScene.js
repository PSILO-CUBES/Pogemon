let evoQueue = []
let beforeEvoPogemon
let currEvoPogemon
let animateEvolutionId
let pogemonToEvolveImage
let pogemonToEvolveSprite
let evolutionImage
let evolutionSprite
let showEvolutionImage
let ongoingEvo

let evolutionBackgroundImage = new Image()
evolutionBackgroundImage.src = 'img/evolution_scene/evolutionBackground.png'

let evolutionBackgroundSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: evolutionBackgroundImage
})

let initEvolution = () =>{
    ongoingEvo = true
    // after evolution, pogemon currHP is inconsistent
    currEvoPogemon = team[0]
    beforeEvoPogemon = currEvoPogemon

    let levelBeforeEvolution = currEvoPogemon.currLevel
    let attacksBeforeEvolution = currEvoPogemon.attacks
    let learnedAttacksArray = []

    currEvoPogemon.attackPool.forEach(attack =>{
        if(attack.learned === true){
            learnedAttacksArray.push(attack)
        }
    })
    currEvoPogemon = new Pogemon(pogemons[currEvoPogemon.evolution.name])
    currEvoPogemon.currLevel = levelBeforeEvolution
    currEvoPogemon.currExp = Math.pow(currEvoPogemon.currLevel, 3)
    definePogemonStats(currEvoPogemon)
    defineCurrPogemonCurve(currEvoPogemon, 'catch')
    currEvoPogemon.currHP = beforeEvoPogemon.stats.HP
    currEvoPogemon.globalId = beforeEvoPogemon.globalId
    if(beforeEvoPogemon.item !== undefined) currEvoPogemon.item = beforeEvoPogemon.item
    else currEvoPogemon.item = undefined
    currEvoPogemon.currAbility = beforeEvoPogemon.currAbility
    defineCurrTeamMenuInfo()
    currEvoPogemon.attacks = attacksBeforeEvolution
    for (let i = 0; i < currEvoPogemon.attackPool.length; i++){
        for(let j = 0; j < learnedAttacksArray.length; j++){
            if(currEvoPogemon.attackPool[i].move.name === learnedAttacksArray[j].move.name){
                currEvoPogemon.attackPool[i].learned = true
            }
        }
    }
    currEvoPogemon.isEnemy = false

    team[0] = currEvoPogemon

    pogemonToEvolveImage = new Image()
    pogemonToEvolveImage.src = `img/pogemon/${pogemonBeforeEvolution.name}/${pogemonBeforeEvolution.name}_Animation.png`

    pogemonToEvolveSprite = new Sprite({
        position: {
            x: 825,
            y: 325
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        image: pogemonToEvolveImage
    })

    evolutionImage = new Image()
    evolutionImage.src = `img/pogemon/${currEvoPogemon.name}/${currEvoPogemon.name}_Animation.png`
    showEvolutionImage = false

    evolutionSprite = new Sprite({
        position: {
            x: 825,
            y: 325
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        image: evolutionImage,
    })

    audio.victory.stop()
    audio.evolution.play()
    document.querySelector('#evolutionDialogueBox').textContent = `${pogemonBeforeEvolution.name} is evolving into ${currEvoPogemon.name}!!`
    gsap.to(pogemonToEvolveSprite, {
        opacity: 0,
        yoyo: true,
        repeat: 6.5,
        onComplete: () =>{
            showEvolutionImage = true
            gsap.to(evolutionSprite, {
                opacity: 0,
                onComplete: () =>{
                    audio.evolution.stop()
                    audio.evolutionDone.play()
                    document.querySelector('#evolutionDialogueBox').textContent = `Congratulation, ${pogemonBeforeEvolution.name} evolved into ${currEvoPogemon.name}!!`
                    document.querySelector('#evolutionDialogueBox').addEventListener('click', _doActionNoSpamEvoQueue, {once: true})
                    evoQueue.push(() =>{
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () =>{
                                document.querySelector('#evolutionScene').style.display = 'none'
                                ongoingEvo = false
                                // if escaped spammed, i think 2 or more animationframes start playing
                                cancelAnimationFrame(animateEvolutionId)
                                animate()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                })
                            }
                        })
                        
                    })
                    gsap.to(evolutionSprite, {
                        opacity: 1
                    })
                } 
            })
        }
    })
}

let animateEvolution = () =>{
    animateEvolutionId = requestAnimationFrame(animateEvolution)
    document.querySelector('#evolutionScene').style.display = 'grid'

    evolutionBackgroundSprite.draw()
    pogemonToEvolveSprite.draw()
    if(showEvolutionImage){
        evolutionSprite.draw()
    }
}

var evolutionActionTimerId;
let _doActionNoSpamEvoQueue = () =>{
    if (!(evolutionActionTimerId == null)) {
        clearTimeout(evolutionActionTimerId);
    }
    timerId = setTimeout(() =>{
            evoQueue[0]()
            evoQueue.shift
    }, 400);
};

animate()
// animateTeamMenu()
// initSummaryMenu()
// animateSummaryMenu()
// pcStorage.animation = true
// initPcStorageDisplay()
// animatePcStorage()
// initBattle()
// animateBattle()
// animateItemMenu()
// animateEvolution()