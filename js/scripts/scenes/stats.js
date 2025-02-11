import { movesObj } from "../../data/movesData.js"
import { typesObj } from "../../data/typesData.js"

import { Sprite } from "../../classes.js"

import { scenes, backgroundSprite } from "../canvas.js"
import { disableOWMenu, returnPrevScene } from "./overworld.js"
import { manageTeamState } from "./team.js"
import { managePcState } from "./pc.js"
import { player } from "../player.js"

let statsAnimationFrame

let selectedPogemon
let selectedPogemonTeamIndex

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

pogemonImg.src = '../../../img/female_icon.png'

export function switchUnderScoreForSpace(text){
	return text.replace(/_/g, ' ')
}

export function switchSpaceForUnderScore(text){
	return text.replace(' ', '_')
}

function statsAnimation(){
  statsAnimationFrame = window.requestAnimationFrame(statsAnimation)

  backgroundSprite.draw()
  pogemonSprite.draw()
}

function getOrdinalNum(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

let switchMoveProcess = {active : false, moves: {first : null, second: null}}

function statsSceneSwitchMoves(first, second){
	console.log(first, second)
  if(first.name == second.name) return

  let firstIndex
  let secondIndex

  for(let i = 0; i < selectedPogemon.moves.length; i++){
    if(selectedPogemon.moves[i].name == first.name){
      firstIndex = i
    } else if (selectedPogemon.moves[i].name == second.name){
      secondIndex = i
    }
  }

  let placeHolder = selectedPogemon.moves[firstIndex]
  selectedPogemon.moves[firstIndex] = selectedPogemon.moves[secondIndex]
  selectedPogemon.moves[secondIndex] = placeHolder

  const movesArr = document.querySelectorAll('.statsSceneGridSectionDataMoves')

  gsap.to(movesArr[firstIndex], {
    opacity: 0,
    duration: 0.5,
    onComplete: () =>{
      let textPlaceHolder = movesArr[firstIndex].innerText
      movesArr[firstIndex].innerText = movesArr[secondIndex].innerText
      movesArr[secondIndex].innerText = textPlaceHolder
    
      gsap.to(movesArr[firstIndex], {
        opacity: 1
      })
      gsap.to(movesArr[secondIndex], {
        opacity: 1
      })
    }
  })
  gsap.to(movesArr[secondIndex], {
    opacity: 0,
    duration: 0.5,
  })

//   document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.backgroundColor = 'transparent'
  document.querySelector('#statsSceneMovesInterface').style.display = 'none'
  document.querySelectorAll('.statsSceneGridSectionDataMoves').forEach(node =>{
    node.style.backgroundColor = 'transparent'
  })

  switchMoveProcess = {active : false, moves: {first : null, second: null}}
}

function statsSceneMovesInteraction(e, state){
  if(state){
	if(document.querySelector('#statsSceneGridSectionDataMovesContainer').childNodes.length == 1) return

    if(switchMoveProcess.active){
        statsSceneSwitchMoves(switchMoveProcess.moves.first, movesObj[`${switchSpaceForUnderScore(e.target.innerText.toLowerCase())}`])
      return
    }

    switchMoveProcess.moves.first = movesObj[`${switchSpaceForUnderScore(e.target.innerText.toLowerCase())}`]
	console.log(switchSpaceForUnderScore(e.target.innerText.toLowerCase()))

    document.querySelectorAll(`.${e.target.classList[0]}`).forEach(node =>{
      node.style.backgroundColor = 'transparent'
    })
    // document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.background = 'transparent'
    document.querySelector('#statsSceneMovesInterfaceDescContainer').replaceChildren()

    e.target.style.backgroundColor = 'rgba(75,75,75,0.35)'
    printMoveDesc(movesObj[`${e.target.innerText.toLowerCase().replace(' ', '_')}`])

    document.querySelector('#statsSceneMovesInterface').style.display = 'grid'

		return
  }

  if(e.target.classList[0] == 'statsSceneGridSectionDataMoves') return

  if(e.target.innerText == 'SWITCH') {
    switchMoveProcess.active = true
    e.target.style.backgroundColor = 'rgba(75,75,75,0.35)'
    return
  }

  document.querySelectorAll(`.statsSceneGridSectionDataMoves`).forEach(node =>{
    node.style.backgroundColor = 'transparent'
  })

  document.querySelector('#statsSceneMovesInterfaceDescContainer').replaceChildren()
  document.querySelector('#statsSceneMovesInterface').style.display = 'none'
  document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.backgroundColor = null

  switchMoveProcess = {active : false, moves: {first : null, second: null}}
}

function printMoveDesc(selectedMove){
  if(selectedMove == undefined) return
  const statsSceneMovesInterfaceDescContainer = document.querySelector('#statsSceneMovesInterfaceDescContainer')

  for(let i = 0; i < 7; i++){
    const statsSceneMovesInterfaceMoveDescContent = document.createElement('div')
    statsSceneMovesInterfaceMoveDescContent.setAttribute('class', 'statsSceneMovesInterfaceMoveDescContent')
		if(i == 2){
			const statsSceneMovesInterfaceMoveDescElementTag = document.createElement('span')
			statsSceneMovesInterfaceMoveDescElementTag.textContent = `${Object.keys(selectedMove)[i]} : `
			statsSceneMovesInterfaceMoveDescElementTag.setAttribute('class', 'statsElementContent')

			const statsSceneMovesInterfaceMoveDescElementName = document.createElement('span')
			statsSceneMovesInterfaceMoveDescElementName.textContent = Object.values(selectedMove)[i]
			statsSceneMovesInterfaceMoveDescElementName.style.color = typesObj[Object.values(selectedMove)[i]].color
			statsSceneMovesInterfaceMoveDescElementName.setAttribute('class', 'statsElementContent')

			statsSceneMovesInterfaceMoveDescContent.appendChild(statsSceneMovesInterfaceMoveDescElementTag)
			statsSceneMovesInterfaceMoveDescContent.appendChild(statsSceneMovesInterfaceMoveDescElementName)
		} else if (i <= 5) {
			if(i == 0) {
				statsSceneMovesInterfaceMoveDescContent.innerText = `${Object.keys(selectedMove)[i]} : ${Object.values(selectedMove)[i].replace(/_/g, ' ')}`
			}
			else statsSceneMovesInterfaceMoveDescContent.innerText = `${Object.keys(selectedMove)[i]} : ${Object.values(selectedMove)[i]}`
		} else {
			statsSceneMovesInterfaceMoveDescContent.id = 'statsSceneMoveDescContainer'

			console.log(selectedMove)
			statsSceneMovesInterfaceMoveDescContent.innerText = selectedMove.desc
		}

    statsSceneMovesInterfaceDescContainer.appendChild(statsSceneMovesInterfaceMoveDescContent)
  }
}

function createMenu(){
	if(selectedPogemon.isShiny) pogemonImg.src = selectedPogemon.pogemon.sprites.shiny.frontSprite
	else pogemonImg.src = selectedPogemon.pogemon.sprites.classic.frontSprite

  switchMoveProcess = {active : false, moves: {first : null, second: null}}

  const statsScene = document.querySelector('#statsScene')
  statsScene.replaceChildren()

  const statsSceneContainer = document.createElement('div')
  statsSceneContainer.id = 'statsSceneContainer'
  statsSceneContainer.addEventListener('click', e => statsSceneMovesInteraction(e, false))

  statsScene.appendChild(statsSceneContainer)

  const statsSceneGridContainer = document.createElement('div')
  statsSceneGridContainer.setAttribute('id', 'statsSceneGridContainer')
  statsSceneContainer.appendChild(statsSceneGridContainer)

  const statsSceneMovesInterface = document.createElement('div')
  statsSceneMovesInterface.setAttribute('id', 'statsSceneMovesInterface')
  statsSceneGridContainer.appendChild(statsSceneMovesInterface)

  for(let i = 0; i < 2; i++){
    const statsSceneMovesInterfaceContent = document.createElement('div')
    statsSceneMovesInterfaceContent.setAttribute('class', 'statsSceneMovesInterfaceContent')

    switch(i){
      case 0:
        statsSceneMovesInterfaceContent.id = 'statsSceneMovesInterfaceDescContainer'
        break
      case 1:
        const statsSceneMovesInterfaceSwitchButton = document.createElement('div')
        statsSceneMovesInterfaceSwitchButton.setAttribute('id', 'statsSceneMovesInterfaceSwitchButton')
        statsSceneMovesInterfaceSwitchButton.innerText = 'SWITCH'

        statsSceneMovesInterfaceContent.appendChild(statsSceneMovesInterfaceSwitchButton)
        break
    }

    statsSceneMovesInterface.appendChild(statsSceneMovesInterfaceContent)
  }

  for(let i = 0; i < 3; i++){
  const statsSceneGridSection = document.createElement('div')
  statsSceneGridSection.setAttribute('class', 'statsSceneGridSection')

	switch(i){
		case 0:
			//info container
			statsSceneGridSection.setAttribute('id', 'statsSceneGridSectionInfoContainer')
			for(let i = 0; i < 4; i++){
				const statsSceneGridSectionInfo = document.createElement('div')
				statsSceneGridSectionInfo.setAttribute('class', 'statsSceneGridSectionInfo')

				switch(i){
					case 0:
						//catch info
						const statsSceneCatchContainer = document.createElement('div')
						statsSceneCatchContainer.id = 'statsSceneGridSectionInfoCatch'

						statsSceneCatchContainer.innerText = `${switchUnderScoreForSpace(selectedPogemon.nickname)} was met at ${switchUnderScoreForSpace(selectedPogemon.caughtMap.name)} at lvl ${selectedPogemon.catchInfo.lvl} on ${selectedPogemon.catchInfo.date.toLocaleString('default', { month: 'long' })} ${getOrdinalNum(selectedPogemon.catchInfo.date.getDate())} ${selectedPogemon.catchInfo.date.getFullYear()}. \n\n It has a ${selectedPogemon.nature.name} nature.`

						statsSceneGridSectionInfo.appendChild(statsSceneCatchContainer)
						statsSceneGridSectionInfo.id = 'statsSceneGridSectionInfo'
						break
					case 1:
						// ability info
						statsSceneGridSectionInfo.setAttribute('id', 'statsSceneGridSectionInfoAbilityContainer')
						for(let i = 0; i < 2; i++){
							const statsSceneGridSectionInfoAbility = document.createElement('div')
							statsSceneGridSectionInfoAbility.setAttribute('class', 'statsSceneGridSectionInfoAbility')
						
							switch(i){
								case 0:
									// ability name
									statsSceneGridSectionInfoAbility.setAttribute('id', 'statsSceneGridSectionInfoAbilityName')
									statsSceneGridSectionInfoAbility.innerText = `Ability : ${switchUnderScoreForSpace(selectedPogemon.abilityInfo.ability.name)}`
									break
								case 1:
									// ability desc
									statsSceneGridSectionInfoAbility.setAttribute('id', 'statsSceneGridSectionInfoAbilityDesc')
									statsSceneGridSectionInfoAbility.innerText = `${selectedPogemon.abilityInfo.ability.desc}`
									break
							}
						
							statsSceneGridSectionInfo.appendChild(statsSceneGridSectionInfoAbility)
							}
						break
					case 2:
						// info type
						statsSceneGridSectionInfo.setAttribute('id', 'statsSceneGridSectionInfoTypeContainer')
						for(let i = 0; i < 2; i++){
							const statsSceneGridSectionInfoTypeSection = document.createElement('div')
							statsSceneGridSectionInfoTypeSection.setAttribute('class', 'statsSceneGridSectionInfoTypeSection')
							
							const statsSceneGridSectionInfoTypeSectionContent = document.createElement('div')

							switch(i){
								case 0:
									statsSceneGridSectionInfoTypeSectionContent.setAttribute('id', 'statsSceneGridSectionInfoTypeSectionType')
									statsSceneGridSectionInfoTypeSectionContent.innerText = 'Elements : '
									statsSceneGridSectionInfoTypeSection.appendChild(statsSceneGridSectionInfoTypeSectionContent)
									break
								case 1:
									statsSceneGridSectionInfoTypeSectionContent.setAttribute('id', 'statsSceneGridSectionInfoTypeSectionElementsContainer')
									statsSceneGridSectionInfoTypeSection.appendChild(statsSceneGridSectionInfoTypeSectionContent)
									for(let i = 1; i < 3; i++){
										if(selectedPogemon.element[i] == null) break
										const statsSceneGridSectionInfoTypeSectionElements = document.createElement('div')
										statsSceneGridSectionInfoTypeSectionElements.setAttribute('class', 'statsSceneGridSectionInfoTypeSectionElements')

										statsSceneGridSectionInfoTypeSectionElements.innerText = selectedPogemon.element[i]
										statsSceneGridSectionInfoTypeSectionElements.style.backgroundColor = `#${typesObj[`${selectedPogemon.element[i]}`].color}`

										statsSceneGridSectionInfoTypeSectionContent.appendChild(statsSceneGridSectionInfoTypeSectionElements)
									}
									break
							}

							statsSceneGridSectionInfo.appendChild(statsSceneGridSectionInfoTypeSection)
						}
						break
					case 3:
						// info friendship
						statsSceneGridSectionInfo.setAttribute('id', 'statsSceneGridSectionInfoFriendship')
						statsSceneGridSectionInfo.innerText = `Friendliness : ${selectedPogemon.friendliness}`
						break
				}
			
				statsSceneGridSection.appendChild(statsSceneGridSectionInfo)
				}
			break
		case 1:
			// pogemon section
			statsSceneGridSection.setAttribute('id', 'statsSceneGridSectionPogemonContainer')
			for(let i = 0; i < 3; i++){
				const statsSceneGridSectionPogemon = document.createElement('div')
				statsSceneGridSectionPogemon.setAttribute('class', 'statsSceneGridSectionPogemon')
			
				switch(i){
					case 0:
						// pogemon lvl + name + gender
						statsSceneGridSectionPogemon.setAttribute('id', 'statsSceneGridSectionPogemonDataContainer')
						for(let i = 0; i < 3; i++){
							const statsSceneGridSectionPogemonData = document.createElement('div')
							statsSceneGridSectionPogemonData.setAttribute('class', 'statsSceneGridSectionPogemonData')
						
							switch(i){
								case 0:
									// pogemon lvl
									statsSceneGridSectionPogemonData.setAttribute('id', 'statsSceneGridSectionPogemonDataLvl')
									statsSceneGridSectionPogemonData.innerText = `Lvl ${selectedPogemon.lvl}`
									break
								case 1:
									// pogemon name
									statsSceneGridSectionPogemonData.setAttribute('id', 'statsSceneGridSectionPogemonDataName')
									statsSceneGridSectionPogemonData.innerText = `${switchUnderScoreForSpace(selectedPogemon.nickname)}`
									break
								case 2:
									// pogemon gender
									const genderImg = new Image()
									genderImg.src = `../../../img/${selectedPogemon.gender}_icon.png`
									genderImg.id = 'statsSceneGenderImg'

									statsSceneGridSectionPogemonData.setAttribute('id', 'statsSceneGridSectionPogemonDataGender')
									statsSceneGridSectionPogemonData.appendChild(genderImg)
									break
							}
						
							statsSceneGridSectionPogemon.appendChild(statsSceneGridSectionPogemonData)
							}
						break
					case 1:
						statsSceneGridSectionPogemon.setAttribute('id', 'statsSceneGridSectionPogemonImg')

						const heldItemImg = new Image()
						if(selectedPogemon.heldItem == null) heldItemImg.src = `img/item_scene/items/blank.png`
						else heldItemImg.src = `img/item_scene/items/${selectedPogemon.heldItem.type}/${selectedPogemon.heldItem.name}.png`
						heldItemImg.setAttribute('class', 'statsHeldItemImg')

						statsSceneGridSectionPogemon.appendChild(heldItemImg)

						const statusImg = new Image()
						 
						if(selectedPogemon.status.name == null) statusImg.src = `img/item_scene/items/blank.png`
						else statusImg.src = `img/status/${selectedPogemon.status.name}.png`
						statusImg.setAttribute('class', 'statusStatusImg')

						statsSceneGridSectionPogemon.appendChild(statusImg)

						const shinyImg = new Image()
						 
						if(selectedPogemon.isShiny) shinyImg.src = `img/status/shiny.png`
						else shinyImg.src = `img/item_scene/items/blank.png`
						shinyImg.setAttribute('class', 'statusShinyImg')

						statsSceneGridSectionPogemon.appendChild(shinyImg)
						break
					case 2:
						statsSceneGridSectionPogemon.setAttribute('id', 'statsSceneGridSectionPogemonHPContainer')
						
						for(let i = 0; i < 2; i++){
							const statsSceneGridSectionPogemonSectionHpContainer = document.createElement('div')

							switch(i){
								case 0:
									statsSceneGridSectionPogemonSectionHpContainer.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpContainer')

									const statsSceneGridSectionPogemonSectionHp = document.createElement('div')
									statsSceneGridSectionPogemonSectionHp.setAttribute('id', 'statsSceneGridSectionPogemonHP')

									const statsSceneGridSectionPogemonSectionHpBarContainer = document.createElement('div')
									statsSceneGridSectionPogemonSectionHpBarContainer.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpBarContainer')
									for(let i = 0; i < 2; i++){
										const statsSceneGridSectionPogemonSectionHpBarContent = document.createElement('div')
										switch(i){
											case 0:
												statsSceneGridSectionPogemonSectionHpBarContent.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpBarAmount')
												statsSceneGridSectionPogemonSectionHpBarContent.innerText = `${selectedPogemon.hp}/${selectedPogemon.stats.baseHp}`
												break
											case 1:
												statsSceneGridSectionPogemonSectionHpBarContent.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpBarContentContainer')
												for(let i = 0; i < 2; i++){
													const statsSceneGridSectionPogemonSectionHpBar = document.createElement('div')
													statsSceneGridSectionPogemonSectionHpBar.setAttribute('class', 'statsSceneHealthBars')
														
													switch(i){
														case 0:
															statsSceneGridSectionPogemonSectionHpBar.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpGreenBar')
															statsSceneGridSectionPogemonSectionHpBar.style.width = `${selectedPogemon.convertToPercentage(selectedPogemon.hp,selectedPogemon.stats.baseHp)}%`
															break
														case 1:
															statsSceneGridSectionPogemonSectionHpBar.setAttribute('id', 'statsSceneGridSectionPogemonSectionHpGreyBar')
															break
													}

													statsSceneGridSectionPogemonSectionHpBarContent.appendChild(statsSceneGridSectionPogemonSectionHpBar)
												}
												break
										}
										statsSceneGridSectionPogemonSectionHpBarContainer.appendChild(statsSceneGridSectionPogemonSectionHpBarContent)
									}		
										
									statsSceneGridSectionPogemonSectionHp.appendChild(statsSceneGridSectionPogemonSectionHpBarContainer)
									statsSceneGridSectionPogemonSectionHpContainer.appendChild(statsSceneGridSectionPogemonSectionHp)
									break
								case 1:
									statsSceneGridSectionPogemonSectionHpContainer.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpContainer')

									const statsSceneGridSectionPogemonSectionExp = document.createElement('div')
									statsSceneGridSectionPogemonSectionExp.setAttribute('id', 'statsSceneGridSectionPogemonExp')

									const statsSceneGridSectionPogemonSectionExpBarContainer = document.createElement('div')
									statsSceneGridSectionPogemonSectionExpBarContainer.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpBarContainer')
									for(let i = 0; i < 2; i++){
										const statsSceneGridSectionPogemonSectionExpBarContent = document.createElement('div')
										switch(i){
											case 0:
												statsSceneGridSectionPogemonSectionExpBarContent.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpBarAmount')
												statsSceneGridSectionPogemonSectionExpBarContent.innerText = `${selectedPogemon.exp - Math.pow(selectedPogemon.lvl, 3)}/${Math.pow(selectedPogemon.lvl + 1, 3) - Math.pow(selectedPogemon.lvl, 3)}`
												break
											case 1:
												statsSceneGridSectionPogemonSectionExpBarContent.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpBarContentContainer')
												for(let i = 0; i < 2; i++){
													const statsSceneGridSectionPogemonSectionExpBar = document.createElement('div')
													statsSceneGridSectionPogemonSectionExpBar.setAttribute('class', 'statsSceneExperienceBars')
													
													switch(i){
														case 0:
															statsSceneGridSectionPogemonSectionExpBar.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpTopBar')
															statsSceneGridSectionPogemonSectionExpBar.style.width = `${selectedPogemon.convertToPercentage(selectedPogemon.exp - Math.pow(selectedPogemon.lvl, 3),Math.pow(selectedPogemon.lvl + 1, 3) - Math.pow(selectedPogemon.lvl, 3))}%`
															break
														case 1:
															statsSceneGridSectionPogemonSectionExpBar.setAttribute('id', 'statsSceneGridSectionPogemonSectionExpBottomBar')
															break
													}

													statsSceneGridSectionPogemonSectionExpBarContent.appendChild(statsSceneGridSectionPogemonSectionExpBar)
												}
												break
										}
										statsSceneGridSectionPogemonSectionExpBarContainer.appendChild(statsSceneGridSectionPogemonSectionExpBarContent)
									}		
										
									statsSceneGridSectionPogemonSectionExp.appendChild(statsSceneGridSectionPogemonSectionExpBarContainer)
									statsSceneGridSectionPogemonSectionHpContainer.appendChild(statsSceneGridSectionPogemonSectionExp)
									break
							}
						
							statsSceneGridSectionPogemon.appendChild(statsSceneGridSectionPogemonSectionHpContainer)
						}
						break
				}
			
				statsSceneGridSection.appendChild(statsSceneGridSectionPogemon)
				}
			break
		case 2:
			// data section
			statsSceneGridSection.setAttribute('id', 'statsSceneGridSectionDataContainer')

			function changeAffectedStatColor(value, DOM){
				const [inc, dec] = Object.values(selectedPogemon.nature.values)

				if(inc == dec) return

				if(value == inc){
					DOM.style.color = 'green'
				} else if(value == dec){
					DOM.style.color = 'red'
				}
			}

			for(let i = 0; i < 2; i++){
				const statsSceneGridSectionData = document.createElement('div')
				statsSceneGridSectionData.setAttribute('class', 'statsSceneGridSectionData')
			
				const statsArr = ['HP', 'SPD', 'ATK', 'DEF', 'SPATK', 'SPDEF']
				switch(i){
					case 0:
						statsSceneGridSectionData.setAttribute('id', 'statsSceneGridSectionDataStatsContainer')
						for(let i = 0; i < 6; i++){
							const statsSceneGridSectionDataStats = document.createElement('div')
							statsSceneGridSectionDataStats.setAttribute('class', 'statsSceneGridSectionDataStats')

							const statsSceneGridSectionDataStatsTag = document.createElement('div')
							statsSceneGridSectionDataStatsTag.setAttribute('class', 'statsSceneGridSectionDataStatsTag')
							statsSceneGridSectionDataStatsTag.innerText = `${statsArr[i]}`

							const statsSceneGridSectionDataStatsNumber = document.createElement('div')
							statsSceneGridSectionDataStatsNumber.setAttribute('class', 'statsSceneGridSectionDataStatsNumber')
							statsSceneGridSectionDataStatsNumber.innerText = `${Object.values(selectedPogemon.stats)[i]}`
							
							changeAffectedStatColor(statsArr[i].toLowerCase(), statsSceneGridSectionDataStatsNumber)

							statsSceneGridSectionDataStats.appendChild(statsSceneGridSectionDataStatsTag)
							statsSceneGridSectionDataStats.appendChild(statsSceneGridSectionDataStatsNumber)
						
							statsSceneGridSectionData.appendChild(statsSceneGridSectionDataStats)
						}
						break
					case 1:
						statsSceneGridSectionData.setAttribute('id', 'statsSceneGridSectionDataMovesContainer')
						for(let i = 0; i < selectedPogemon.moves.length; i++){
							const statsSceneGridSectionDataMoves = document.createElement('div')
							statsSceneGridSectionDataMoves.setAttribute('class', 'statsSceneGridSectionDataMoves')
							statsSceneGridSectionDataMoves.innerText = `${switchUnderScoreForSpace(selectedPogemon.moves[i].name)}`
							statsSceneGridSectionDataMoves.addEventListener('click', e => statsSceneMovesInteraction(e, true))

							statsSceneGridSectionData.appendChild(statsSceneGridSectionDataMoves)
						}
						break
				}
			
				statsSceneGridSection.appendChild(statsSceneGridSectionData)
				}
			break
	}

  statsSceneGridContainer.appendChild(statsSceneGridSection)
  }
}

function initStatsMenu(){
  if(scenes.get('stats').initiated) return
  scenes.set('stats', {initiated: true})
  document.querySelector('#statsScene').style.display = 'flex'
  statsAnimation()

  createMenu()
}

function clearStatsMenu(prevScene){
  disableOWMenu.active = true
  console.log('here2')
  
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      document.querySelector('#statsScene').style.display = 'none'
      document.querySelector('#statsScene').replaceChildren()
      scenes.set('stats', {initiated: false})
      window.cancelAnimationFrame(statsAnimationFrame)

	  	if(prevScene == 'overworld' || prevScene == 'battle') manageTeamState(true, prevScene)
	  	else if(prevScene == 'pc') managePcState(true, prevScene)
	
      gsap.to('#overlapping', {
        opacity: 0,
        onComplete: () =>{
          disableOWMenu.active = false
        }
      })
    }
  })
}

export function switchStatsTargetWithKeys(key){
	if(player.team.length == 1) return
	
	if(key == 'w') {
		if(selectedPogemonTeamIndex - 1 < 0) return
		selectedPogemonTeamIndex = selectedPogemonTeamIndex - 1
	}
	
	if(key == 's') {
		if(selectedPogemonTeamIndex + 1 > 5) return
		selectedPogemonTeamIndex = selectedPogemonTeamIndex + 1
	}

	gsap.to('#overlapping', {
		opacity: 1,
		onComplete: () =>{
			selectedPogemon = player.team[selectedPogemonTeamIndex]
			createMenu()
			gsap.to('#overlapping', {
				opacity: 0,
			})
		}
	})
}

export function manageStatsState(state, target, prevScene, i){
	returnPrevScene(prevScene)
  	selectedPogemon = target
	console.log(selectedPogemon)
	selectedPogemonTeamIndex = i
  	if(state) initStatsMenu()
  	else clearStatsMenu(prevScene)
}