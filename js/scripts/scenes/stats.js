import { Sprite } from "../../classes.js"
import { mapsObj } from "../../data/mapsData.js"
import { movesObj } from "../../data/movesData.js"
import { typesObj } from "../../data/typesData.js"
import { scenes } from "../canvas.js"
import { disableOWMenu } from "./overworld.js"
import { manageTeamState } from "./team.js"

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
backgroundImg.src = mapsObj['background']
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

function getOrdinalNum(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

let switchMoveProcess = {active : false, moves: {first : null, second: null}}

function statsSceneSwitchMoves(first, second){
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

  document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.backgroundColor = 'transparent'
  document.querySelector('#statsSceneMovesInterface').style.display = 'none'
  document.querySelectorAll('.statsSceneGridSectionDataMoves').forEach(node =>{
    node.style.backgroundColor = 'transparent'
  })

  switchMoveProcess = {active : false, moves: {first : null, second: null}}
}

function statsSceneMovesInteraction(e, state){
  if(state){
    if(switchMoveProcess.active){
        statsSceneSwitchMoves(switchMoveProcess.moves.first, movesObj[`${e.target.innerText.toLowerCase()}`])
      return
    }

    switchMoveProcess.moves.first = movesObj[`${e.target.innerText.toLowerCase()}`]

    document.querySelectorAll(`.${e.target.classList[0]}`).forEach(node =>{
      node.style.backgroundColor = 'transparent'
    })
    document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.background = 'transparent'
    document.querySelector('#statsSceneMovesInterfaceDescContainer').replaceChildren()

    e.target.style.backgroundColor = 'rgba(75,75,75,0.35)'
    printMoveDesc(movesObj[`${e.target.innerText.toLowerCase()}`])

    document.querySelector('#statsSceneMovesInterface').style.display = 'grid'
  } else {
    if(e.target.classList[0] == 'statsSceneGridSectionDataMoves') return
    if(e.target.innerText == 'SWITCH') {
      switchMoveProcess.active = true
      e.target.style.backgroundColor = 'rgba(75,75,75,0.35)'
      return
    }

    document.querySelectorAll(`.statsSceneGridSectionDataMoves`).forEach(node =>{
      node.style.backgroundColor = 'transparent'
    })
    document.querySelector('#statsSceneMovesInterfaceSwitchButton').style.backgroundColor = 'transparent'

    document.querySelector('#statsSceneMovesInterfaceDescContainer').replaceChildren()
    document.querySelector('#statsSceneMovesInterface').style.display = 'none'

    switchMoveProcess = {active : false, moves: {first : null, second: null}}
  }
}

//working here

function printMoveDesc(selectedMove){
  if(selectedMove == undefined) return
  const statsSceneMovesInterfaceDescContainer = document.querySelector('#statsSceneMovesInterfaceDescContainer')

  for(let i = 0; i < 8; i++){
    const statsSceneMovesInterfaceMoveDescContent = document.createElement('div')
    statsSceneMovesInterfaceMoveDescContent.setAttribute('class', 'statsSceneMovesInterfaceMoveDescContent')
    if(Object.keys(selectedMove)[i] == 'effects') {
      statsSceneMovesInterfaceMoveDescContent.innerText = 'null'
      if(Object.values(selectedMove)[i] != null){
      statsSceneMovesInterfaceMoveDescContent.innerText = `${Object.keys(selectedMove)[i]} : ${Object.keys(Object.values(selectedMove)[i])}`
      }
    } else {
      statsSceneMovesInterfaceMoveDescContent.innerText = `${Object.keys(selectedMove)[i]} : ${Object.values(selectedMove)[i]}`
    }

    statsSceneMovesInterfaceDescContainer.appendChild(statsSceneMovesInterfaceMoveDescContent)
  }
}

function createMenu(){
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
						statsSceneGridSectionInfo.setAttribute('id', 'statsSceneGridSectionInfoCatch')
						statsSceneGridSectionInfo.innerText = `${selectedPogemon.name} was met on starting map at lvl ${selectedPogemon.lvl} on ${selectedPogemon.catchInfo.date.toLocaleString('default', { month: 'long' })} ${getOrdinalNum(selectedPogemon.catchInfo.date.getDate())} ${selectedPogemon.catchInfo.date.getFullYear()}. \n\n It has a ${selectedPogemon.nature.name} nature.`
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
									statsSceneGridSectionInfoAbility.innerText = `Ability : ${selectedPogemon.ability}`
									break
								case 1:
									// ability desc
									statsSceneGridSectionInfoAbility.setAttribute('id', 'statsSceneGridSectionInfoAbilityDesc')
									statsSceneGridSectionInfoAbility.innerText = 'this ability does something'
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
									statsSceneGridSectionPogemonData.innerText = `${selectedPogemon.name}`
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
							statsSceneGridSectionDataStats.innerText = `${statsArr[i]} : ${Object.values(selectedPogemon.stats)[i]}`
						
							statsSceneGridSectionData.appendChild(statsSceneGridSectionDataStats)
						}
						break
					case 1:
						statsSceneGridSectionData.setAttribute('id', 'statsSceneGridSectionDataMovesContainer')
						for(let i = 0; i < selectedPogemon.moves.length; i++){
							const statsSceneGridSectionDataMoves = document.createElement('div')
							statsSceneGridSectionDataMoves.setAttribute('class', 'statsSceneGridSectionDataMoves')
							statsSceneGridSectionDataMoves.innerText = `${selectedPogemon.moves[i].name}`
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
  if(selectedPogemon.pogemon.pogedex >= 100) pogemonImg.src = `../../../img/pogemon/${selectedPogemon.pogemon.pogedex}_${selectedPogemon.name}/${selectedPogemon.name}_Animation.png`
  else if(selectedPogemon.pogemon.pogedex >= 10) pogemonImg.src = `../../../img/pogemon/0${selectedPogemon.pogemon.pogedex}_${selectedPogemon.name}/${selectedPogemon.name}_Animation.png`
  else if(selectedPogemon.pogemon.pogedex < 10) pogemonImg.src = `../../../img/pogemon/00${selectedPogemon.pogemon.pogedex}_${selectedPogemon.name}/${selectedPogemon.name}_Animation.png`

  createMenu()
}

function clearStatsMenu(prevScene){
  disableOWMenu.active = true
  
  gsap.to('#overlapping', {
    opacity: 1,
    onComplete: () =>{
      document.querySelector('#statsScene').style.display = 'none'
      document.querySelector('#statsScene').replaceChildren()
      scenes.set('stats', {initiated: false})
      window.cancelAnimationFrame(statsAnimationFrame)
      manageTeamState(true, prevScene)
      gsap.to('#overlapping', {
        opacity: 0,
        onComplete: () =>{
          disableOWMenu.active = false
        }
      })
    }
  })
}

export function manageStatsState(state, target, prevScene){
  selectedPogemon = target
  if(state) initStatsMenu()
  else clearStatsMenu(prevScene)
}