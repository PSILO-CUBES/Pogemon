const itemMenuBackgroundImage = new Image()
itemMenuBackgroundImage.src = 'img/item_scene/itemSceneBackground.png'

let itemMenuBackgroundSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: itemMenuBackgroundImage
})

let hpInPercent

let itemMenuRenderedSprites = []
let availableItem = []

let currCategory = 'none'

let selectItemMenuPogemon
let chooseItemCategory
let removeMenuOnClick
let selectedItemPogemon
let selectedItemPogemonIndex
let selectItem
let selectedItem
let selectedItemIndex
let itemMenuInteraction
let useBeforeItemSelected
let selectItemBeforeUsed
let itemUseFail
let returnFromBagMenu
let itemUsedDuringBattle
let cancelItemEscapeDuringTransition = false

let initItemMenu = () =>{
    document.querySelector('#itemMenu').style.display = 'grid'
    document.querySelector('#itemMenuDescTextContainer').textContent = ''
    menu.open = false
    lastLeedPogemon = team[0]
    selectedItem = undefined
    selectedItemPogemon = undefined
    document.querySelectorAll('.itemButton')[1].textContent = `give`

    for(let i = 0; i < team.length; i++){
        console.log(team[i].item)
        if(team[i].item !== undefined){
            document.querySelector(`#pogemon${i + 1}ItemSprite`).src = `img/items/${team[i].item.category}/${team[i].item.name}.png`
        } else {
            document.querySelector(`#pogemon${i + 1}ItemSprite`).src = ``
        }
    }

    let changeItemHP = (hpInPercent , index) =>{
        let currColor
        hpInPercent = 100 * Math.floor(team[index].currHP) / team[index].stats.HP
        if (hpInPercent > 50) {
            currColor = 'green'
        } else if (hpInPercent > 25 && hpInPercent <= 50){
            currColor = 'orange'
        } else if (hpInPercent <= 25) {
            currColor = 'red'
        }
        console.log(currColor)
        return currColor
    }
    
    let checkHpInPercent = index =>{
        hpInPercent = team[index].currHP / team[index].stats.HP * 100
        document.querySelector(`#pogemon${index+1}ItemHealthbar`).style.width = `${hpInPercent}%`
        document.querySelector(`#pogemon${index+1}ItemHealthbar`).style.backgroundColor = `${changeItemHP(hpInPercent, index)}`
        document.querySelector(`#pogemon${index+1}ItemNameData`).textContent = `${team[index].name} LVL ${Math.floor(team[index].currLevel)}`
        document.querySelector(`#pogemon${index+1}ItemHPData`).textContent = `${Math.floor(team[index].currHP)} / ${team[index].stats.HP}`
    }

    // item types

    let useItem = (pogemon, item) =>{
        if(item.type === 'potion' || item.type === 'berry'){
            if(!pogemon.fainted){
                if(pogemon.currHP < pogemon.stats.HP){
                    pogemon.currHP = pogemon.currHP + item.potency
                    if(pogemon.currHP >= pogemon.stats.HP){
                        pogemon.currHP = pogemon.stats.HP
                    }
                    checkHpInPercent(parseInt(selectedItemPogemonIndex))
                    inventory[currCategory][item.name].amount--
                } else {
                    itemUseFail()
                }
            } else {
                document.querySelector('#itemMenuDescTextContainer').textContent = `That won't work..`
            }
        } else if (item.type === 'revive'){
            if(pogemon.fainted){
                pogemon.fainted = false
                let revivePotency = `0.${item.potency}`
                pogemon.currHP = Math.floor(pogemon.stats.HP * parseFloat(revivePotency))
                checkHpInPercent(parseInt(selectedItemPogemonIndex))
                inventory[currCategory][item.name].amount--
            } else {
                itemUseFail()
            }
        } else if (item.type === 'pogeball'){
            itemUseFail()
        }
        if(hpInPercent >= 50){
            itemMenuRenderedSprites[selectedItemPogemonIndex].frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            itemMenuRenderedSprites[selectedItemPogemonIndex].frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            itemMenuRenderedSprites[selectedItemPogemonIndex].frames.hold = 200
        } else if(team[selectedItemPogemonIndex].fainted){
            itemMenuRenderedSprites[selectedItemPogemonIndex].frames.hold = 0
        }
        displayItemByCategory()
    }

    itemUseFail = () =>{
        cancelItemEscapeDuringTransition = false
        document.querySelector('#itemMenuDescTextContainer').textContent = `that won't work...`
        setTimeout(() =>{
        document.querySelector('#itemMenuDescTextContainer').textContent = ``
            document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
            document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
        }, 1500)
    }

    selectItem = () =>{
        if(!cancelItemEscapeDuringTransition){
            document.querySelectorAll('.itemContainer').forEach(item =>{
                item.style.background = 'transparent'
            })
            let currItemDOM =  document.querySelector(`#${mouse.event.target.id}`)
            currItemDOM.style.background = '#68161299'
            document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
            document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
            let itemString = document.querySelector(`#${mouse.event.target.id}Name`).textContent
            selectedItem = items[currCategory][itemString]
            if (selectedItem !== undefined && selectedItemPogemon !== undefined){
                document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
            }
            selectedItemIndex = mouse.event.target.id
        }
    }

    let displayItemByCategory = () =>{
        let itemIndex = 0
        let nameIndex = 0
        availableItem = []
        selectedItemIndex = undefined
        Object.entries(inventory).forEach(([key, value]) =>{
            Object.entries(value).forEach(([key, value]) =>{
                console.log(value)
                if(value.data.category === currCategory){
                    if(value.amount >= 1){
                        availableItem.push(value)
                    }
                }
            })
        })
        document.querySelector('#itemList').replaceChildren()
        availableItem.forEach(item =>{
            const itemLI = document.createElement('LI')
            const itemDIV = document.createElement('DIV')
            const itemDIVDesc = document.createElement('DIV')
            const itemH4Desc = document.createElement('H4')
            const itemDIVData = document.createElement('DIV')
            const itemH4Name = document.createElement('H4')
            const itemH4Amount = document.createElement('H4')
            const itemIMG = new Image()
            itemIMG.src = `img/items/${item.data.category}/${item.data.name}.png`
            itemDIV.setAttribute('class', 'itemContainer')
            itemDIV.setAttribute('id', `item${itemIndex++}`)
            itemDIVData.setAttribute('class', 'itemDataContainer') 
            itemDIVDesc.setAttribute('class', 'itemDescContainer') 
            itemIMG.setAttribute('class', 'itemIcon')
            itemH4Name.setAttribute('id', `item${nameIndex++}Name`)
            itemLI.append(itemDIV)
            itemDIV.append(itemIMG)
            itemDIV.append(itemDIVDesc)
            itemDIVDesc.append(itemH4Desc)
            itemDIV.append(itemDIVData)
            itemDIVData.append(itemH4Name)
            itemDIVData.append(itemH4Amount)
            document.querySelector('#itemList').appendChild(itemLI)
            itemH4Desc.textContent = `${item.data.description}`
            itemH4Name.textContent = `${item.data.name}`
            itemH4Amount.textContent = `x${item.amount}`
            itemDIV.removeEventListener('click', selectItem, true)
            itemDIV.addEventListener('click', selectItem, true)
        })
        if(selectedItemIndex !== undefined){
            document.querySelector(`#${selectedItemIndex}`).style.background = '#68161299'
        }
    }

    displayItemByCategory()
    
    chooseItemCategory = () =>{
        document.querySelectorAll(`.itemCategoryIcon`).forEach(itemCategory =>{
            itemCategory.style.background = 'transparent'
        })  
        document.querySelector(`#itemMenuDescTextContainer`).textContent = ``
        let currCategoryDOM = document.querySelector(`#${mouse.event.target.id}`)
        currCategoryDOM.style.background = 'radial-gradient(#eaeaea99, 55%,#00000000, #00000000)'
        switch(mouse.event.target.id){
            case 'healIcon':
                currCategory = 'heal'
                break
            case 'pogeballIcon':
                currCategory = 'pogeball'
                break
            case 'battleItemsIcon':
                currCategory = 'battleItems'
                break
            case 'berryIcon':
                currCategory = 'berry'
                break
            case 'miscIcon':
                currCategory = 'misc'
                break
            case 'tmIcon':
                currCategory = 'tm'
                break
            case 'valuableIcon':
                currCategory = 'valuable'
                break
            case 'keysIcon':
                currCategory = 'keys'
                break
        }
        displayItemByCategory()
    }

    selectItemMenuPogemon = () =>{
        document.querySelectorAll('.pogemonItemOverlappingDiv').forEach(pogemonContainer =>{
            pogemonContainer.style.background = 'transparent'
        })
        document.querySelector(`#itemMenuDescTextContainer`).textContent = ``
        let currPogemonDOM =  document.querySelector(`[id='${mouse.event.target.id}']`)
        currPogemonDOM.style.background = 'rgb(60 3 0 / 60%)'
        document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
        selectedItemPogemon = team[mouse.event.target.id]
        selectedItemPogemonIndex = mouse.event.target.id
        if(selectedItemPogemon.item === undefined){
            document.querySelectorAll('.itemButton')[1].textContent = `give`
        } else {
            document.querySelectorAll('.itemButton')[1].textContent = `take`
        }
        document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
        // console.log(selectedItemPogemon.item)
        // if (selectedItem !== undefined && selectedItemPogemon !== undefined){
        //     document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
        // }
    }

    let catchAttemptFromBag = () =>{
        if(!trainerBattle){
            inventory[selectedItem.type][selectedItem.name].amount--
            bagMenu.open = false
            document.querySelector('#itemMenu').style.display = 'none'
            returnFromBagMenu = true
            battleItemMenu = false
            initBattle()
            animateBattle()
            document.querySelector('#battleOptionsContainer').style.display = 'none'
            document.querySelector('#attackEventContainer').style.display = 'flex'
            document.querySelector('#attackInfo').style.display = 'none'
            document.querySelector('#dialogueBox').style.display = 'block'
            document.querySelector('#dialogueBox').textContent = `You attempt to catch ${currFoe.name} with a ${selectedItem.name}!`
            currAlly.catch(currFoe)
        } else {
            document.querySelector('#itemMenuDescTextContainer').textContent = `Can't catch another trainers pogemon.....`
            audio.error.play()
        }
    }

    let givePogemonItem = (currPogemon, item) => {
        if(currPogemon !== undefined){
            if(!item){
                document.querySelector('#itemMenuDescTextContainer').textContent = `Please select an item to give.`
            } else if(currPogemon.item === undefined){
                currPogemon.item = item
                inventory[currCategory][item.name].amount--
                displayItemByCategory()
                document.querySelector('#itemMenuDescTextContainer').textContent = `You gave a ${item.name} to ${currPogemon.name}`
                setTimeout(() =>{
                    document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                    document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                    document.querySelector('#itemMenuDescTextContainer').textContent = ``
                }, 1500)
                document.querySelectorAll('.itemButton')[1].textContent = `take`
                document.querySelector(`#pogemon${parseInt(selectedItemPogemonIndex) + 1}ItemSprite`).src = `img/items/${currCategory}/${item.name}.png`
            } else {
                console.log('heee... nice try?.')
            }
        } else {
            document.querySelector('#itemMenuDescTextContainer').textContent = `Select A Pogemon`
            setTimeout(() =>{
                document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                document.querySelector('#itemMenuDescTextContainer').textContent = ``
            }, 1500)
        }
    }

    let takePogemonItem = (currPogemon, item) => {
        if(item !== undefined){
            document.querySelector('#itemMenuDescTextContainer').textContent = `You took a ${item.name} from ${currPogemon.name}`
            currPogemon.item = undefined
            inventory[item.category][item.name].amount++
            displayItemByCategory()
            setTimeout(() =>{
                document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                document.querySelector('#itemMenuDescTextContainer').textContent = ``
            }, 1500)
            document.querySelectorAll('.itemButton')[1].textContent = `give`
            document.querySelector(`#pogemon${parseInt(selectedItemPogemonIndex) + 1}ItemSprite`).src = ``
        } else {
            document.querySelector('#itemMenuDescTextContainer').textContent = `Select A Pogemon`
            setTimeout(() =>{
                document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                document.querySelector('#itemMenuDescTextContainer').textContent = ``
            }, 1500)
        }
    }

    // menu 

    itemMenuInteraction = () =>{
        // need to redo itemUsedDuringBattle
        switch(mouse.event.target.textContent){
            case 'use' : 
                if(selectedItem === undefined){
                    useBeforeItemSelected = true
                    document.querySelector('#itemMenuDescTextContainer').textContent = `select something to use on ${selectedItemPogemon.name}.`
                } else if(selectedItemPogemon === undefined) {
                    selectItemBeforeUsed = true
                    if(battle.initiated && selectedItem.type === 'pogeball'){
                        catchAttemptFromBag()
                    } else {
                        document.querySelector('#itemMenuDescTextContainer').textContent = `select a pogemon on witch to use the ${selectedItem.name}.`
                    }
                } else if (selectedItem !== undefined && selectedItemPogemon !== undefined){
                    if(battle.initiated && selectedItem.type === 'pogeball'){
                        catchAttemptFromBag()
                    } else {
                        document.querySelector('#itemMenuDescTextContainer').textContent = ` ${selectedItem.name} was used on ${selectedItemPogemon.name}!!`
                        setTimeout(() =>{
                            document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                            document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                        }, 1500)
                        useItem(selectedItemPogemon, selectedItem)
                    }
                }
                break
            case 'give' : 
                givePogemonItem(selectedItemPogemon, selectedItem)
                break
            case 'take' : 
                takePogemonItem(selectedItemPogemon, selectedItemPogemon.item)
                break
            case 'discard' : 
                document.querySelector('#itemMenuDescTextContainer').textContent = `coming soon`
                setTimeout(() =>{
                    document.querySelector('#itemMenuButtonHeadContainer').style.display = 'grid'
                    document.querySelector('#itemMenuDescTextContainer').style.display = 'none'
                    document.querySelector('#itemMenuDescTextContainer').textContent = ``
                }, 1500)
                break

            case 'cancel' : 
                console.log('cancel')
                break
        }
    }

    removeMenuOnClick = () =>{
        document.querySelector('#itemMenuButtonHeadContainer').style.display = 'none'
        document.querySelector('#itemMenuDescTextContainer').style.display = 'block'
    }

    let applyEventListeners = () =>{
        document.querySelectorAll('.itemCategoryIcon').forEach(itemCategory =>{
            itemCategory.addEventListener('click', chooseItemCategory, true)
        })
        document.querySelectorAll('.pogemonItemOverlappingDiv').forEach(pogemonContainer =>{
            pogemonContainer.addEventListener('click', selectItemMenuPogemon, true)
        })
        document.querySelectorAll('.itemButton').forEach(button =>{
            button.addEventListener('click', itemMenuInteraction, true)
        })
        addEventListener('click', removeMenuOnClick, true)
    }

    applyEventListeners()

    // could probably loop this, but im too lazy to do it....

    if (team[0] !== undefined){ 
        const pogemon1Image = new Image()
        pogemon1Image.src = `img/pogemon/${team[0].name}/${team[0].name}_Menu_Animation.png`
        
        pogemon1Sprite = new Sprite({
            position: {
                x: 25,
                y: 0
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon1Image
        })

        checkHpInPercent(0)

        if(hpInPercent >= 50){
            pogemon1Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon1Sprite.frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            pogemon1Sprite.frames.hold = 200
        } else if(team[0].fainted){
            pogemon1Sprite.frames.hold = 0
        }

        itemMenuRenderedSprites.push(pogemon1Sprite)
        document.querySelector('#pogemon1ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon1ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon1ItemHealthbar').style.background = 'transparent'
    }

    if (team[1] !== undefined){ 
        const pogemon2Image = new Image()
        pogemon2Image.src = `img/pogemon/${team[1].name}/${team[1].name}_Menu_Animation.png`
        
        pogemon2Sprite = new Sprite({
            position: {
                x: 25,
                y: 175
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon2Image
        })

        checkHpInPercent(1)

        if(hpInPercent >= 50){
            pogemon2Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon2Sprite.frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            pogemon2Sprite.frames.hold = 200
        } else if(team[1].fainted){
            pogemon2Sprite.frames.hold = 0
        }

        itemMenuRenderedSprites.push(pogemon2Sprite)
        document.querySelector('#pogemon2ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon2ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon2ItemHealthbar').style.background = 'transparent'
    }

    if (team[2] !== undefined){ 
        const pogemon3Image = new Image()
        pogemon3Image.src = `img/pogemon/${team[2].name}/${team[2].name}_Menu_Animation.png`
        
        pogemon3Sprite = new Sprite({
            position: {
                x: 25,
                y: 325
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon3Image
        })

        checkHpInPercent(2)

        if(hpInPercent >= 50){
            pogemon3Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon3Sprite.frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            pogemon3Sprite.frames.hold = 200
        } else if(team[2].fainted){
            pogemon3Sprite.frames.hold = 0
        }

        console.log(hpInPercent)

        itemMenuRenderedSprites.push(pogemon3Sprite)
        document.querySelector('#pogemon3ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon3ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon3ItemHealthbar').style.background = 'transparent'
    }

    if (team[3] !== undefined){ 
        const pogemon4Image = new Image()
        pogemon4Image.src = `img/pogemon/${team[3].name}/${team[3].name}_Menu_Animation.png`
        
        pogemon4Sprite = new Sprite({
            position: {
                x: 25,
                y: 500
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon4Image
        })

        checkHpInPercent(3)
        
        if(hpInPercent >= 50){
            pogemon4Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon4Sprite.frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            pogemon4Sprite.frames.hold = 200
        } else if(team[3].fainted){
            pogemon4Sprite.frames.hold = 0
        }

        itemMenuRenderedSprites.push(pogemon4Sprite)
        document.querySelector('#pogemon4ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon4ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon4ItemHealthbar').style.background = 'transparent'
    }

    if (team[4] !== undefined){ 
        const pogemon5Image = new Image()
        pogemon5Image.src = `img/pogemon/${team[4].name}/${team[4].name}_Menu_Animation.png`
        
        pogemon5Sprite = new Sprite({
            position: {
                x: 25,
                y: 675
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon5Image
        })
        
        checkHpInPercent(4)
        
        if(hpInPercent >= 50){
            pogemon5Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon5Sprite.frames.hold = 100
        } else if(hpInPercent <= 25 && hpInPercent > 0){
            pogemon5Sprite.frames.hold = 200
        } else if(team[4].fainted){
            pogemon5Sprite.frames.hold = 0
        }

        itemMenuRenderedSprites.push(pogemon5Sprite)
        document.querySelector('#pogemon5ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon5ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon5ItemHealthbar').style.background = 'transparent'
    }

    if (team[5] !== undefined){ 
        const pogemon6Image = new Image()
        pogemon6Image.src = `img/pogemon/${team[5].name}/${team[5].name}_Menu_Animation.png`
        
        pogemon6Sprite = new Sprite({
            position: {
                x: 25,
                y: 825
            },
            frames:{
                max: 4,
                hold: 50
            },
            animate: true,
            image: pogemon6Image
        })

        checkHpInPercent(5)
        
        if(hpInPercent >= 50){
            pogemon5Sprite.frames.hold = 50
        } else if(hpInPercent < 50 && hpInPercent > 25){
            pogemon5Sprite.frames.hold = 100
        } else if(hhpInPercent <= 25 && hpInPercent > 0){
            pogemon5Sprite.frames.hold = 200
        } else if(team[5].fainted){
            pogemon5Sprite.frames.hold = 0
        }

        itemMenuRenderedSprites.push(pogemon6Sprite)
        document.querySelector('#pogemon6ItemGreybar').style.background = 'lightgrey'
    } else {
        document.querySelector('#pogemon6ItemGreybar').style.background = 'transparent'
        document.querySelector('#pogemon6ItemHealthbar').style.background = 'transparent'
    }
}

let animateItemMenu = () =>{
    let animateItemMenuId = requestAnimationFrame(animateItemMenu)
    itemMenuBackgroundSprite.draw()
    itemMenuRenderedSprites.forEach(sprite =>{
        sprite.draw()
    })
    
    let clearEventListeners = () =>{
        document.querySelectorAll('.pogemonItemOverlappingDiv').forEach(pogemonContainer =>{
            pogemonContainer.style.background = 'transparent'
        })
        document.querySelectorAll('.pogemonItemOverlappingDiv').forEach(pogemonContainer =>{
            pogemonContainer.removeEventListener('click', selectItemMenuPogemon, true)
        })
        document.querySelectorAll('.itemCategoryIcon').forEach(itemIconContainer =>{
            itemIconContainer.removeEventListener('click', chooseItemCategory, true)
        })
        document.querySelectorAll('.itemContainer').forEach(itemContainer =>{
            itemContainer.removeEventListener('click', selectItem, true)
        })
        document.querySelectorAll('.itemButton').forEach(button =>{
            button.removeEventListener('click', itemMenuInteraction, true)
        })
        removeEventListener('click', removeMenuOnClick, true)
    }

    if(itemUsedDuringBattle){
        bagMenu.open = false
    }

    if(!bagMenu.open){

        currCategory = 'none'
        document.querySelector('#itemMenuButtonHeadContainer').style.display = 'none'
        document.querySelectorAll(`.itemCategoryIcon`).forEach(itemCategory =>{
            itemCategory.style.background = 'transparent'
        })
        selectedItemIndex = undefined

        cancelAnimationFrame(animateItemMenuId)
        clearEventListeners()
        itemMenuRenderedSprites = []
        menu.open = false

        if(itemUsedDuringBattle){
            document.querySelector('#itemMenu').style.display = 'none'
            returnFromBagMenu = true
            switchAction = false
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () =>{
                    battleItemMenu = false
                    initBattle()
                    animateBattle()
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                    })
                }
            })
            
        }
    }

}