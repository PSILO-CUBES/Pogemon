let pogemonStorage = [
    [],
    [],
    [],
    [],
    [],
]

let pogemonSummary = {
    target: undefined
}

let team = []

let pogebucks =  250

let inventory = {
    heal: {
        potion: {data: items.heal.potion, amount: 5},
        revive: {data: items.heal.revive, amount: 2},
    },
    pogeball: {
        pogeball: {data: items.pogeball.pogeball, amount: 5},
    },
    berry:{
        badBanana: {data: items.berry.badBanana, amount: 3},
    }
}

let saveData = dataToSave =>{
    menu.open = false
    alert('savgarde')
    localStorage.setItem('saveDataKey', JSON.stringify(dataToSave))
}

let loadData = () =>{
    let loadedData = localStorage.getItem('saveDataKey')
    parsedData = JSON.parse(loadedData)
    return parsedData
}

let saveDataObject = loadData()

let resetData = dataToReset =>{
    menu.open = false
    team = []
    alert('reset succesful')
    localStorage.removeItem(dataToReset)
    document.location.reload()
}

let initGlobalId
let currId
let newId

if(loadData() === null){
    initGlobalId = 1
    currId = initGlobalId
} else {
    initGlobalId = loadData().currGlobalId
    currId = initGlobalId
}

let newGlobalId = () =>{
    newId = currId
    newId++
    currId = newId
    console.log(currId)
    return currId
}

let starterFlag = {
    checked: false
}

// load team

if (team.length === 0 && loadData() !== null){
    let teamData = loadData().team
    let loadedTeam = []
    for (let i = 0; i < teamData.length; i++){
        teamData[i].image.src = `img/pogemon/${teamData[i].name}/${teamData[i].name}.png`
        loadedTeam.push(new Pogemon(teamData[i]))
    }
    team = loadedTeam
}

// load storage

if (pogemonStorage[0].length === 0 && loadData() !== null){
    let pogemonStorageData = loadData().pogemonStorage
    pogemonStorage = pogemonStorageData
}

let expInPerCent
let expNeededForNextLevel
let levelUp = false

let defineCurrPogemonCurve = (currPogemon, type) =>{ 
    let currPogemonCurve
    if(currPogemon.expCurve === 'fastExpCurve') {
        let fastExpCurveResult = (1.2  * Math.cbrt(currPogemon.currExp)) 
        currPogemonCurve = fastExpCurveResult
        let fastExpNeeded = (0.8 * Math.pow(currPogemon.currLevel + 1, 3) - currPogemon.currExp)
        expNeededForNextLevel = fastExpNeeded
    } else if(currPogemon.expCurve === 'normalExpCurve') {
        let normalExpCurveResult = Math.cbrt(currPogemon.currExp)
        currPogemonCurve = normalExpCurveResult
        currPogemon.currLevel = Math.floor(currPogemonCurve)
        let normalExpNeeded = Math.pow(currPogemon.currLevel + 1, 3) - currPogemon.currExp
        expNeededForNextLevel = normalExpNeeded
    } else if(currPogemon.expCurve === 'slowExpCurve') {
        let slowExpCurveResult = (0.8  * Math.cbrt(currPogemon.currExp))
        currPogemonCurve = slowExpCurveResult
        let slowExpNeeded = (1.2  * Math.pow(currPogemon.currLevel + 1, 3) - currPogemon.currExp)
        expNeededForNextLevel = slowExpNeeded
    }
    currPogemon.expInPerCent = (currPogemonCurve - currPogemon.currLevel) * 100
    currPogemon.expNeededForNextLevel = expNeededForNextLevel
    if(type === 'catch'){
        return currPogemonCurve
    } else return currPogemonCurve
}

// something here

let definePogemonStats = currPogemon =>{
    let currPogemonLevel = Math.floor(currPogemon.currLevel)
    let generateNewHpState = Math.floor((2 * pogemons[currPogemon.name].baseStats.HP) * currPogemonLevel / 100 + currPogemonLevel + 10)
    let generateNewAtkState = Math.floor((2 * pogemons[currPogemon.name].baseStats.Atk ) * currPogemonLevel / 100 + 5)
    let generateNewDefState = Math.floor((2 * pogemons[currPogemon.name].baseStats.Def ) * currPogemonLevel / 100 + 5)
    let generateNewSpAtkState = Math.floor((2 * pogemons[currPogemon.name].baseStats.SpAtk ) * currPogemonLevel / 100 + 5)
    let generateNewSpDefState = Math.floor((2 * pogemons[currPogemon.name].baseStats.SpDef ) * currPogemonLevel / 100 + 5)
    let generateNewSpdState = Math.floor((2 * pogemons[currPogemon.name].baseStats.Spd ) * currPogemonLevel / 100 + 5)

    currPogemon.stats = {
        HP: generateNewHpState,
        Atk: generateNewAtkState,
        Def: generateNewDefState,
        SpAtk: generateNewSpAtkState,
        SpDef: generateNewSpDefState,
        Spd: generateNewSpdState
    }
}