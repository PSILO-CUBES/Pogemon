import { loadData } from "../save.js"
import { itemsObj } from "./itemsData.js"
import { pogemonsObj } from "./pogemonData.js"

export let mapsObj = {
  background: './img/background.png',
  // geneTown
  geneTown:{
    name: 'geneTown',
    mapImg: './img/maps/geneTown/geneTown.png',
    FGImg: './img/maps/geneTown/geneTownFG.png',
    spawnPosition: {
      x: -962.5,
      y: -650
    },
    height: 44,
    width: 60,
    encounters: [{pogemon: pogemonsObj.disso, lvls: [4, 7], odds: {min:1,max:98}}, 
    {pogemon: pogemonsObj.piny, lvls: [4, 7], odds: {min:98,max:99}}, {pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:99,max:100}}],
    changeMapLocations:[
      {name: 'pearlyPath', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearlyPath', spawnPosition: {x:-1100, y:-2550,}},
      {name: 'pearlyPath', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearlyPath', spawnPosition: {x:-1100, y:-2550,}},

      {name: 'geneTown_home1', spawnPosition: {x:250, y:0,}}, 

      {name: 'home', spawnPosition: {x:250, y:-50,}}, 

      {name: 'lab', spawnPosition: {x: 375, y: -425,}}
    ],
    trainers: [
      {
        name: 'Gab', 
        team: [[pogemonsObj.disso, 10, itemsObj.banana], [pogemonsObj.maaph, 10, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
        sprite: '../../img/charSprites/dino/dino.png',
        dialogue: 'Git Gut\n\n\nSkill issue',
        reward: 100,
        beaten: false
      },
    ],
    items: [
      {
        name: 'yellowBerry',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        pickedUp: false
      },
    ],
  },
  bedroom:{
    name: 'bedroom',
    mapImg: './img/maps/bedroom/bedroom.png',
    FGImg: './img/maps/bedroom/bedroomFG.png',
    spawnPosition: {
      x: 787.5,
      y: 265
    },
    height: 10,
    width: 20,
    encounters: [],
    changeMapLocations:[
      {name: 'home', spawnPosition: {x:405, y:275}}
    ]
  },
  home:{
    name: 'home',
    mapImg: './img/maps/home/home.png',
    FGImg: './img/maps/home/homeFG.png',
    spawnPosition: {
      x: 250,
      y: -100
    },
    height: 11,
    width: 22,
    encounters: [],
    changeMapLocations:[
      {name: 'bedroom', spawnPosition: {x:787.5, y:265,}},
      {name: 'geneTown', spawnPosition: {x: -1435, y: -615,}}, {name: 'geneTown', spawnPosition: {x: -1435, y: -615,}}
    ]
  },
  geneTown_home1:{
    name: 'geneTown_home1',
    mapImg: './img/maps/geneTown_home1/geneTown_home1.png',
    FGImg: './img/maps/geneTown_home1/geneTown_home1FG.png',
    spawnPosition: {
      x: -75,
      y: -750
    },
    height: 10,
    width: 21,
    encounters: [],
    changeMapLocations:[
      {name: 'geneTown', spawnPosition: {x: -415, y: -615,}}, {name: 'geneTown', spawnPosition: {x: -415, y: -615,}}
    ],
  },
  lab:{
    name: 'lab',
    mapImg: './img/maps/lab/lab.png',
    FGImg: './img/maps/lab/labFG.png',
    spawnPosition: {
      x: 375,
      y: -425
    },
    height: 17,
    width: 18,
    encounters:[],
    changeMapLocations:[
      {name: 'geneTown', spawnPosition: {x:342.5, y:-875,}}, {name: 'geneTown', spawnPosition: {x:342.5, y:-875,}}
    ],
    event: [
      {
        name: 'pc',
        info: {direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}},
      },
      {
        name: 'npc',
        info: {direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['Hi, how are you?', 'Please pick one of those pogemon.']},
      },
      {
        name: 'starter',
        info: {direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, starter: 0},
      },
      {
        name: 'starter',
        info: {direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, starter: 1},
      },
      {
        name: 'starter',
        info: {direction: {reach: {pos:{x:35, y:0}, neg:{x:5, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, starter: 2},
      },
    ],
  },
  //pearlyPath
  pearlyPath:{
    name: 'pearlyPath',
    mapImg: './img/maps/pearlyPath/pearlyPath.png',
    FGImg: './img/maps/pearlyPath/pearlyPathFG.png',
    spawnPosition: {
      x: 775,
      y: -1150
    },
    height: 56,
    width: 64,
    encounters: [{pogemon: pogemonsObj.disso, lvls: [4, 7], odds: {min:1,max:100}}],
    changeMapLocations:[
      {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}}, {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}}, {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}}, 
      {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}}, {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}}, {name: 'banishmentRoad', spawnPosition: {x:-1500, y: -350,}},

      {name: 'geneTown', spawnPosition: {x:-967.5, y: -100,}}, {name: 'geneTown', spawnPosition: {x: -967.5, y: -100,}},
      {name: 'geneTown', spawnPosition: {x:-967.5, y: -100,}}, {name: 'geneTown', spawnPosition: {x: -967.5, y: -100,}}
    ]
  },
  //banismentRoad
  banishmentRoad:{
    name: 'banishmentRoad',
    mapImg: './img/maps/banishmentRoad/banishmentRoad.png',
    FGImg: './img/maps/banishmentRoad/banishmentRoadFG.png',
    spawnPosition: {
      x: -75,
      y: -750
    },
    height: 30,
    width: 40,
    encounters: [{pogemon: pogemonsObj.disso, lvls: [4, 7], odds: {min:1,max:100}}],
    changeMapLocations:[
      {name: 'kemeTown', spawnPosition: {x: -800, y: -1700,}}, {name: 'kemeTown', spawnPosition: {x: -800, y: -1700,}}, {name: 'kemeTown', spawnPosition: {x: -800, y: -1700,}},
      {name: 'kemeTown', spawnPosition: {x: -800, y: -1700,}}, {name: 'kemeTown', spawnPosition: {x: -800, y: -1700,}},

      {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}}, {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}}, {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}},
      {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}}, {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}}, {name: 'pearlyPath', spawnPosition: {x: 850, y: -1150,}}
    ]
  },
  //kemeTown
  kemeTown:{
    name: 'kemeTown',
    mapImg: './img/maps/kemeTown/kemeTown.png',
    FGImg: './img/maps/kemeTown/kemeTownFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 46,
    width: 56,
    encounters: [],
    changeMapLocations:[
      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}}, 

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 

      {name: 'banishmentRoad', spawnPosition: {x:400, y: 300,}}, {name: 'banishmentRoad', spawnPosition: {x: 400, y: 300,}}, {name: 'banishmentRoad', spawnPosition: {x: 400, y: 300,}}, {name: 'banishmentRoad', spawnPosition: {x:400, y: 300,}}, {name: 'banishmentRoad', spawnPosition: {x: 400, y: 300,}}
    ]
  },
  pogecenter:{
    name: 'pogecenter',
    mapImg: './img/maps/pogecenter/pogecenter.png',
    FGImg: './img/maps/pogecenter/pogecenterFG.png',
    spawnPosition: {
      x: 250,
      y: -100
    },
    height: 11,
    width: 17,
    encounters: [],
    event: [
      {
        name: 'npc',
        info: {direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['Let me heal your team'], type:'pogecenter'},
      },
      {
        name: 'pc',
        info: {direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}},
      },
    ],
    changeMapLocations:[{name: 'undefined', spawnPosition: {x: 0, y: 0,}}]
  },
  pogemart:{
    name: 'pogemart',
    mapImg: './img/maps/pogemart/pogemart.png',
    FGImg: './img/maps/pogemart/pogemartFG.png',
    spawnPosition: {
      x: 0,
      y: 0
    },
    height: 10,
    width: 13,
    encounters: [],
    event: [
      {
        name: 'npc',
        info: {direction: {reach: {pos:{x:0, y:-20}, neg:{x:20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['What will you be buying today?'], type:'pogemart'},
      },
    ],
    changeMapLocations:[{name: 'undefined', spawnPosition: {x: 0, y: 0,}}],
    productOptions: [
      [{name:'heal', price: 1}, {name:'resurrect', price: 1}, {name:'pogeball', price: 1}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'heal', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
    ]
  },
}

export async function setBoundries(mapsObj){
  let mapArr = new Map()

  let loadedData = await loadData()

  const mapsObjKeys = Object.keys(mapsObj)
  const mapsObjValues = Object.values(mapsObj)

  if(loadedData != null) {
    mapsObjValues.forEach((map, i) =>{
      if(map.trainers != undefined) {
        map.trainers.forEach((trainer, j) =>{
          trainer.beaten = Object.values(loadedData['mapsObjState'])[i].trainers[j].beaten
        })
      }

      if(map.items != undefined) {
        map.items.forEach((item, j) =>{
          console.log(Object.values(loadedData['mapsObjState'])[i])
          item.pickedUp = Object.values(loadedData['mapsObjState'])[i].items[j].pickedUp
        })
      }
    })
  }

  for(let i = 1; i < mapsObjValues.length; i++){
    let res
  
    await fetch(`img/maps/${mapsObjKeys[i]}/${mapsObjKeys[i]}.json`).then((response) => response.json()).then((json) => res = Object.values(json)[3][1])

    if(res.layers[0] == undefined) {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i]})
    } else if (res.layers[1] == undefined) {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data})
    } else if (res.layers[2] == undefined) {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data, changeMap: res.layers[1].data})        
    } else if (res.layers[3] == undefined) {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data, changeMap: res.layers[1].data, eventZones: res.layers[2].data})
    } else {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data, changeMap: res.layers[1].data, eventZones: res.layers[2].data, battleZones: res.layers[3].data})
    }

    mapsObj[`${mapsObjKeys[i]}`] = mapArr.get(`${mapsObjKeys[i]}`)

    // console.log(mapsObj[`${mapsObjKeys[i]}`])
  }
}