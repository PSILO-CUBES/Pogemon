import { loadData } from "../save.js"
import { itemsObj } from "./itemsData.js"
import { pogemonsObj } from "./pogemonData.js"


const data = await loadData("saveFile")


export let mapsObj = {
  background: './img/background.png',
  // geneTown
  gene_Town:{
    seen: false,
    name: 'gene_Town',
    mapImg: './img/maps/gene_Town/gene_Town.png',
    FGImg: './img/maps/gene_Town/gene_TownFG.png',
    spawnPosition: {
      x: -962,
      y: -650
    },
    height: 44,
    width: 60,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        // {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
        // {pogemon: pogemonsObj.disso, lvls: [3, 6], odds: {min:0,max:100}}

      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},

      {name: 'gene_Town_home1', spawnPosition: {x:250, y:0,}}, 

      {name: 'home', spawnPosition: {x:250, y:-50,}}, 

      {name: 'lab', spawnPosition: {x: 375, y: -425,}},


      {name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},{name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},
      {name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},{name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},
    ],
    obstaclesInfo: [
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:50}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:50}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:50}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:50}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
    ],
    weather: null
  },
  bedroom:{
    seen: false,
    name: 'bedroom',
    mapImg: './img/maps/bedroom/bedroom.png',
    FGImg: './img/maps/bedroom/bedroomFG.png',
    spawnPosition: {
      x: 787.5,
      y: 265
    },
    height: 10,
    width: 20,
    encounters: {},
    changeMapLocations:[
      {name: 'home', spawnPosition: {x:405, y:275}}
    ]
  },
  home:{
    seen: false,
    name: 'home',
    mapImg: './img/maps/home/home.png',
    FGImg: './img/maps/home/homeFG.png',
    spawnPosition: {
      x: 250,
      y: -100
    },
    height: 11,
    width: 22,
    encounters: {},
    changeMapLocations:[
      {name: 'bedroom', spawnPosition: {x:787.5, y:265,}},
      {name: 'gene_Town', spawnPosition: {x: -1435, y: -615,}}, {name: 'gene_Town', spawnPosition: {x: -1435, y: -615,}}
    ]
  },
  gene_Town_Home1:{
    seen: false,
    name: 'gene_Town_Home1',
    mapImg: './img/maps/gene_Town_Home1/gene_Town_Home1.png',
    FGImg: './img/maps/gene_Town_Home1/gene_Town_Home1FG.png',
    spawnPosition: {
      x: -75,
      y: -750
    },
    height: 10,
    width: 21,
    encounters: {},
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x: -415, y: -615,}}, {name: 'gene_Town', spawnPosition: {x: -415, y: -615,}}
    ],
  },
  lab:{
    name: 'lab',
    seen: false,
    mapImg: './img/maps/lab/lab.png',
    FGImg: './img/maps/lab/labFG.png',
    spawnPosition: {
      x: 375,
      y: -425
    },
    height: 17,
    width: 18,
    encounters: {},
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x: -548, y: -1250}}, {name: 'gene_Town', spawnPosition: {x: -548, y: -1250}}
    ],
    event: [
      {
        name: 'pc',
        info: {direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}},
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/oak/oak.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:[`I hope you enjoy the adventure you'll have alongside one of those 3!`], 
          looking: 'Down'
        },
      },
    ],
    items: [
      {
        name: 'loko',
        amount: 0,
        direction: {reach: {pos:{x:2, y:20}, neg:{x:2, y:20}}, sight: {pos: {x:1, y:1}, neg:{x:-1, y:-1}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
      {
        name: 'steeli',
        amount: 1,
        direction: {reach: {pos:{x:2, y:20}, neg:{x:2, y:20}}, sight: {pos: {x:1, y:1}, neg:{x:-1, y:-1}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
      {
        name: 'maaph',
        amount: 2,
        direction: {reach: {pos:{x:20, y:20}, neg:{x:20, y:20}}, sight: {pos: {x:1, y:1}, neg:{x:-1, y:-1}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
    ],
  },

  // eden forest
  eden_Forest:{
    seen: false,
    name: 'eden_Forest',
    mapImg: './img/maps/eden_Forest/eden_Forest.png',
    FGImg: './img/maps/eden_Forest/eden_ForestFG.png',
    spawnPosition: {
      x: -962,
      y: -650
    },
    height: 58,
    width: 79,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}},
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}
    ],
    trainers: [
      {
        name: 'May', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: 'slither_Road NPC',
        reward: 0,
        beaten: true,
      },
      {
        name: 'Tristan', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Up',
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "I can't get throught those darned trees, there is so much room around them it\n\nmakes no sence.. ;-;",
        reward: 100,
        beaten: false,
      },      
      {
        name: 'Gab', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Down',
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: 'Git gud',
        reward: 100,
        beaten: false,
      },
    ],
    event: [
      {
        name: 'vignus',
        sprite: "img/charSprites/ma'at/ma'at.png",
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            "-Vignus stares at you calmly-"
          ], 
          eventKey: 'vignus'
        },
      },
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
    ],
    obstaclesInfo: [],
    weather: null
  },

  //pearlyPath
  pearly_Path:{
    seen: false,
    name: 'pearly_Path',
    mapImg: './img/maps/pearly_Path/pearly_Path.png',
    FGImg: './img/maps/pearly_Path/pearly_PathFG.png',
    spawnPosition: {
      x: -1775,
      y: -1850
    },
    height: 56,
    width: 64,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.loko, lvls: [7, 7], odds: {min:1,max:100}}, 

        // {pogemon: pogemonsObj.wallafi, lvls: [2, 6], odds: {min:1,max:65}}, 
        // {pogemon: pogemonsObj.flailegant, lvls: [2, 6], odds: {min:65,max:90}},
        // {pogemon: pogemonsObj.allingua, lvls: [3, 7], odds: {min:90,max:95}},
        // {pogemon: pogemonsObj.tadtoxic, lvls: [3, 7], odds: {min:95,max:100}},

      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [8, 12], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, 
      {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, {name: 'revelation_Road', spawnPosition: {x: -1150, y: -1500}}, 

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},
      
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}}, 
      
      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}},
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}},

      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},
      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},

      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}},
      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}
    ],
    trainers: [
      {
        name: 'Samael', 
        team: [[pogemonsObj.ouroboross, 30, null], [pogemonsObj.rockwil, 30, null], [pogemonsObj.skopt, 50, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Left',
        sprite: '../../img/charSprites/oldman2/oldman2.png',
        dialogue: 'The road ahead is steep..\n\nMay the light in your heart guide you forward..',
        reward: 0,
        beaten: false,
      },
      {
        name: 'NPC', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: 'slither_Road NPC',
        reward: 0,
        beaten: true,
      }, 
      {
        name: 'NPC', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/guy2/guy2.png',
        dialogue: 'banishment_Road NPC',
        reward: 100,
        beaten: true,
      },   
      {
        name: 'Jah', 
        team: [[pogemonsObj.wallafi, 6, itemsObj.banana], [pogemonsObj.steeli, 6, null], [pogemonsObj.maaph, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Down',
        sprite: '../../img/charSprites/oldman1/oldman1.png',
        dialogue: "Wagwan man?",
        reward: 100,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'water_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'pogeball',
        amount: 999,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/youngster/youngster.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:275}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:[`This next area is a bit too strong for you right now..\n\nIf you manage to show me an oran berry, i'll concider letting you through.`], 
          looking: 'Down',
          eventKey: 'banishmentPathBlock'
        },
      },
    ],
    weather: 'sun'
  },

  //slither_Road
  slither_Road:{
    seen: false,
    name: 'slither_Road',
    mapImg: './img/maps/slither_Road/slither_Road.png',
    FGImg: './img/maps/slither_Road/slither_RoadFG.png',
    spawnPosition: {
      x: 775,
      y: -1150
    },
    height: 44,
    width: 62,
    encounters: 
      {
        ground: [
          {pogemon: pogemonsObj.flailegant, lvls: [3, 7], odds: {min:1,max:65}},
          {pogemon: pogemonsObj.wallafi, lvls: [3, 7], odds: {min:65,max:85}},
          {pogemon: pogemonsObj.nahass, lvls: [5, 8], odds: {min:85,max:95}},
          {pogemon: pogemonsObj.piny, lvls: [3, 7], odds: {min:95,max:100}},
        ], 
        water: [
          {pogemon: pogemonsObj.tadtoxic, lvls: [8, 12], odds: {min:1,max:100}},
        ]
      },
    changeMapLocations:[
      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 
      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 
      
      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}},  

      {name: 'fair_Town', spawnPosition: {x: -50, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'fair_Town', spawnPosition: {x: -200, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'fair_Town', spawnPosition: {x: -200, y: -800}},       
      
      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'fair_Town', spawnPosition: {x: -200, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'fair_Town', spawnPosition: {x: -200, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'May', 
        team: [[pogemonsObj.flailegant, 7, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: "This poor thing is trying to fly but is failing misebarly at it..\n\nI love mine regardless of how goofy it looks!",
        reward: 100,
        beaten: true,
      },      
      {
        name: 'Jah', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/oldman1/oldman1.png',
        dialogue: 'pearly_Path NPC',
        reward: 100,
        beaten: true,
      },
      {
        name: 'Dakota', 
        team: [[pogemonsObj.nahass, 9, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left' ,
        sprite: '../../img/charSprites/youngman3/youngman3.png',
        dialogue: "I've never seen this type of critter before..\n\nI'm glad i managed to catch it!",
        reward: 0,
        beaten: true,
      },
      {
        name: 'Marley', 
        team: [[pogemonsObj.flailegant, 8, null], [pogemonsObj.formal, 11, null]],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Up',
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: "I love Ma'at so much!\n\nShe taught me many great things.",
        reward: 100,
        beaten: true,
      },

    ],
    items:[
      {
        name: 'black_Sludge',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'poison_Barb',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
    ]
  },

  //fair_Town
  fair_Town:{
    seen: false,
    name: 'fair_Town',
    mapImg: './img/maps/fair_Town/fair_Town.png',
    FGImg: './img/maps/fair_Town/fair_TownFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 43,
    width: 53,
    encounters: {},
    trainers: [
      {
        name: 'Rocky', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'Marley', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: "slither_Road NPC",
        reward: 0,
        beaten: true
      },
    ],
    changeMapLocations:[
      {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}}, {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}}, {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}},
      {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}}, {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}}, {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}},
      {name: 'cross_Link', spawnPosition: {x: -675, y: -1600}},

      {name: 'heisenberg_House', spawnPosition: {x: 440, y: -175}}, // slime house

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 
      
      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}},

      {name: 'slither_Road', spawnPosition: {x: -1900, y: -1050}}, {name: 'slither_Road', spawnPosition: {x: -1900, y: -1050}}, {name: 'slither_Road', spawnPosition: {x: -1900, y: -1050}},
      {name: 'slither_Road', spawnPosition: {x: -1900, y: -1050}},

      {name: 'maat_House', spawnPosition: {x: 440, y: -175}}, // gym house

      {name: 'fair_Town_Gym', spawnPosition: {x: 480, y: -1475}}, // gym 
    ],
    weather: null
  },
  fair_Town_Gym:{
    seen: false,
    name: 'fair_Town_Gym',
    mapImg: './img/maps/fair_Town_Gym/fair_Town_Gym.png',
    FGImg: './img/maps/fair_Town_Gym/fair_Town_GymFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 32,
    width: 15,
    changeMapLocations:[
      {name: 'fair_Town', spawnPosition: {x: -355, y: -1425}}, {name: 'fair_Town', spawnPosition: {x: -355, y: -1425}}, {name: 'fair_Town', spawnPosition: {x: -355, y: -1425}},
    ],
    trainers: [
      {
        name: "Ma'at", 
        team: [[pogemonsObj.flailegant, 14, null], [pogemonsObj.slimie, 15, null], [pogemonsObj.balancia, 16, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}},
        looking: 'Down', 
        sprite: "../../img/charSprites/ma'at/ma'at.png",
        dialogue: "Are you ready for your first challenge?",
        reward: 100,
        beaten: false,
        gymLeader: {name: "ma'at", num: 0},
        eventKey: 'maatGym'
      },
      {
        name: 'Larry', 
        team: [[pogemonsObj.formal, 11, null], [pogemonsObj.allingua, 13, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/youngman/youngman.png',
        dialogue: 'Gramps is facinated with those slime pogemon.\n\nHe talked about stones being the catalysts for evolution or\n\nsomething like that.',
        OWdialogue: "Ma'at, our dear gym leader, found something strange at the cross link.\n\nYou might want to let her know you're looking for her.",
        reward: 100,
        beaten: false,
        eventKey: 'maatGymTrainer'
      },
      {
        name: 'Barry',
        team: [[pogemonsObj.wallafi, 12, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "Ma'at is one of my best friends!\n\nShe helped me catch my first pogemon!",
        OWdialogue: "I wish i could be as cool as Ma'at some day..",
        reward: 100,
        beaten: false,
        eventKey: 'maatGymTrainer'
      },
    ],
  },
  maat_House:{
    seen: false,
    name: 'maat_House',
    mapImg: './img/maps/maat_House/maat_House.png',
    FGImg: './img/maps/maat_House/maat_HouseFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 12,
    width: 16,
    changeMapLocations:[
      {name: 'fair_Town', spawnPosition: {x: -1055, y: -1375}}, {name: 'fair_Town', spawnPosition: {x: -1055, y: -1375}},
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/ma'at/ma'at.png",
        info: {
          direction: {reach: {pos:{x:30, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
          dialogue:['Make sure you speak to Professor Heisenberg before you leave town.'],
        },
      },
    ]
  },
  heisenberg_House: {
    seen: false,
    name: 'heisenberg_House',
    mapImg: './img/maps/heisenberg_House/heisenberg_House.png',
    FGImg: './img/maps/heisenberg_House/heisenberg_HouseFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 12,
    width: 16,
    changeMapLocations:[
      {name: 'fair_Town', spawnPosition: {x: -1185, y: -400}}, {name: 'fair_Town', spawnPosition: {x: -1185, y: -400}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/oak/Oak.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:["Let me introduce myself, i am professor Heisenberg.", "When Ma'at brought her slimie for me to study, it somehow secreated a\n\nstrange glowy substance that hardened itself into this halo.\n\n\nThis slime creature is very strange..", "It's genetic makeup indicates it could somehow evolve!\n\n\nMy hypothesis is that the halo plays an important role in\n\nit's evolution process.", "If you manage to make that happen, come and show me.", "Professor Heisenberg gave you the glowy halo."],
          slimeDialogue: ["Wow, what a strange speciment!\n\nIt seems like draining certain elemental essences allows it to change form.", "Even though you managed to prove slimie can actualy evolve,\n\nit does not seem like this is the last form this pogemon can take.", "If you manage to fill your party with one of each type of smile,\n\ncome back and show me."],
          haloDialogue: ["You did it, impressive!\n\nWell, actualy....", `According to the genetics of that pogemon it does seem like\n\nit could still evol..\n\n\n Hold on... What is going on with the halo!?`],
          postEvoDialogue: [`Thank you for taking me along on this evolution journey.`, `Take good care of this speciment for me.`],
          eventKey: 'heisenbergHouse'
        },
      },
    ]
  },

  //cross_Link
  cross_Link:{
    seen: false,
    name: 'cross_Link',
    mapImg: './img/maps/cross_Link/cross_Link.png',
    FGImg: './img/maps/cross_Link/cross_LinkFG.png',
    spawnPosition: {
      x: -675,
      y: -1700
    },
    height: 43,
    width: 53,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.piny, lvls: [4, 8], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.tadtoxic, lvls: [4, 8], odds: {min:50,max:80}},
        {pogemon: pogemonsObj.sturdle, lvls: [4, 8], odds: {min:80,max:99}},  
        {pogemon: pogemonsObj.slimie, lvls: [7, 12], odds: {min:99,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 13], odds: {min:1,max:85}}, {pogemon: pogemonsObj.slimie, lvls: [12, 15], odds: {min:85,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'luna_Mountain_Entrance', spawnPosition: {x: -995, y: -1500}},

      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/ma'at/ma'at.png",
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          looking: 'Down',
          dialogue:
          [
            "Hey, how are ya?\n\nMy name is Ma'at, what's yours?", 
            "I saw one of those strange slime pogemon slide into that cave.\n\nIt was bigger than my slimie, that's for sure.\n\nAll purple and gooey... Yuck..", 
            "How strange..\n\nYou might want to check that out later..","If you're looking for a challenge, i'll be waiting at the gym!"
          ], 
          eventKey: 'maatMeeting'
        },
      },
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [[pogemonsObj.sturdle, 8, null], [pogemonsObj.sturdle, 9, null], [pogemonsObj.sturdle, 10, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, 
        looking: 'Left',
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I love collecting stones!\n\nSome cool ones often appear around the bigger ones! :D',
        reward: 100,
        beaten: true,
      },
    ],
    obstaclesInfo: [
      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:50}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
        id: 0
      }
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'fire_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'water_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
    ],
  },

  //banisment_Road
  banishment_Road:{
    seen: false,
    name: 'banishment_Road',
    mapImg: './img/maps/banishment_Road/banishment_Road.png',
    FGImg: './img/maps/banishment_Road/banishment_RoadFG.png',
    spawnPosition: {
      x: -2486, 
      y: -750
    },
    height: 42,
    width: 72,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.allingua, lvls: [6, 9], odds: {min:1,max:33}},
        {pogemon: pogemonsObj.formal, lvls: [6, 9], odds: {min:33,max:66}},
        {pogemon: pogemonsObj.sparkust, lvls: [5, 8], odds: {min:66,max:85}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [6, 9], odds: {min:85,max:95}},
        {pogemon: pogemonsObj.piny, lvls: [5, 8], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, 
      {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}},

      {name: 'pearly_Path', spawnPosition: {x: -170, y: -821}}, {name: 'pearly_Path', spawnPosition: {x: -170, y: -821}},

      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}},
      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}},
      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}
    ],
    trainers: [
      {
        name: 'Spritz', 
        team: [[pogemonsObj.allingua, 17, null], [pogemonsObj.formal, 17, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "Both my pogemons can't stand each other, i'm not sure why...",
        reward: 100,
        beaten: true,
      },   
      {
        name: 'Tristan', 
        team: [],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "pearly_Path",
        reward: 100,
        beaten: true,
      },  
      {
        name: 'Splinter', 
        team: [[pogemonsObj.piny, 16, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/guy2/guy2.png',
        dialogue: "I love this guy, he's a mushroom thing. :)",
        reward: 0,
        beaten: true,
      },
      {
        name: 'Duster', 
        team: [[pogemonsObj.sturdle, 15, null], [pogemonsObj.tadtoxic, 15, null], [pogemonsObj.wallafi, 15]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "Who knows what true riches hide away in these mountains..",
        reward: 0,
        beaten: true,
      },
    ],
  },

  //kemeTown
  keme_Town:{
    seen: false,
    name: 'keme_Town',
    mapImg: './img/maps/keme_Town/keme_Town.png',
    FGImg: './img/maps/keme_Town/keme_TownFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 48,
    width: 59,
    encounters: {},
    changeMapLocations:[
      {name: 'exodus_Road', spawnPosition: {x: -1450, y: -1850}}, {name: 'exodus_Road', spawnPosition: {x: -1450, y: -1850}}, {name: 'exodus_Road', spawnPosition: {x: -1450, y: -1850}}, 
      {name: 'exodus_Road', spawnPosition: {x: -1450, y: -1850}}, {name: 'exodus_Road', spawnPosition: {x: -1450, y: -1850}},

      {name: 'keme_Town_Gym', spawnPosition: {x:-40, y: -500,}}, // 2nd gym

      {name: 'keme_Town_House1', spawnPosition: {x: 440, y: -175}}, // keme_Town_House1

      {name: 'keme_Town_House2', spawnPosition: {x: 440, y: -175}}, // keme_Town_House2

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}}, 

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 

      {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, 
      {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/guy1/guy1.png",
        info: {
          looking: 'Up',
          direction: {reach: {pos:{x:20, y:40}, neg:{x:-20, y:0}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            `Djed is a pretty rad dude!\n\nHe's the drummer of our band "THE ROCK QUILLERS!!!".`
          ],
        },
      },
      {
        name: 'npc',
        sprite: "img/charSprites/beardguy/beardguy.png",
        info: {
          looking: 'Down',
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            "The winds are pretty sandy around here."
          ],
        },
      },
    ],
    items: [
      {
        name: 'hard_Stone',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'metal_Coat',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'soft_Sand',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
    ],
    trainers: [
      {
        name: 'Spritz', 
        team: [[pogemonsObj.allingua, 10, null], [pogemonsObj.formal, 10, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "Both my pogemons can't stand each other, i'm not sure why...",
        reward: 100,
        beaten: true,
      },
    ]
  },
  keme_Town_House1:{
    seen: false,
    name: 'keme_Town_House1',
    mapImg: './img/maps/keme_Town_House1/keme_Town_House1.png',
    FGImg: './img/maps/keme_Town_House1/keme_Town_House1FG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 12,
    width: 16,
    encounters: {},
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x:-160, y: -850}},{name: 'keme_Town', spawnPosition: {x:-160, y: -850}},
    ]
  },
  keme_Town_House2:{
    seen: false,
    name: 'keme_Town_House2',
    mapImg: './img/maps/keme_Town_House2/keme_Town_House2.png',
    FGImg: './img/maps/keme_Town_House2/keme_Town_House2FG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 12,
    width: 16,
    encounters: {},
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x:-1120, y: -1170}},{name: 'keme_Town', spawnPosition: {x:-1120, y: -1170}},
    ]
  },
  keme_Town_Gym:{
    seen: false,
    name: 'keme_Town_Gym',
    mapImg: './img/maps/keme_Town_Gym/keme_Town_Gym.png',
    FGImg: './img/maps/keme_Town_Gym/keme_Town_GymFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 20,
    width: 32,
    encounters: {},
    trainers: [
      {
        name: 'Rocky', 
        team: [[pogemonsObj.sturdle, 15, null], [pogemonsObj.sturdle, 15, null]],
        direction: {reach: {pos:{x:0, y:150}, neg:{x:0, y:150}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I still very much like rocks.',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Onyx', 
        team: [[pogemonsObj.cobbird, 16, null], [pogemonsObj.sturdle, 17, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:150, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: 'I hope i can be just like Djed one day.',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Djed', // gym leader
        team: [[pogemonsObj.cobbird, 18, null],[pogemonsObj.punbreakable, 19, null], [pogemonsObj.rockwil, 20, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/djed/djed.png',
        dialogue: 'A new challenger for me?\n\nBring it on!',
        reward: 100,
        beaten: false,
        gymLeader: {name: "djed", num: 1},
        eventKey: 'djedGym'
      },
      {
        name: 'Clayton', 
        team: [[pogemonsObj.allingua, 15, null]],
        direction: {reach: {pos:{x:150, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: "I don't have a rock type pogemon, but Djed was cool enought to let me be here!",
        reward: 100,
        beaten: false,
      },

    ],
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x:-1375, y: -675}}, {name: 'keme_Town', spawnPosition: {x:-1375, y: -675}}, {name: 'keme_Town', spawnPosition: {x:-1375, y: -675}},
    ]
  },

  //exodus road
  exodus_Road:{
    seen: false,
    name: 'exodus_Road',
    mapImg: './img/maps/exodus_Road/exodus_Road.png',
    FGImg: './img/maps/exodus_Road/exodus_RoadFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 48,
    width: 72,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.allingua, lvls: [6, 9], odds: {min:1,max:33}},
        {pogemon: pogemonsObj.formal, lvls: [6, 9], odds: {min:33,max:66}},
        {pogemon: pogemonsObj.sparkust, lvls: [5, 8], odds: {min:66,max:85}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [6, 9], odds: {min:85,max:95}},
        {pogemon: pogemonsObj.piny, lvls: [5, 8], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      // sinia_Desert
      {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, 
      {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}},

      // keme_Town
      {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, 
      {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}} 
    ],
    trainers: [
      {
        name: 'Bugzzy', 
        team: [[pogemonsObj.sparkust, 16, null], [pogemonsObj.antber, 18, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:155}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bugman/bugman.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Kim', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:125, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Buzzy', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:450, y:0}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/guitarist/guitarist.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Buzzy', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:450, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/malebirdkeeper/malebirdkeeper.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 100,
        beaten: true,
      },
    ],
    weather: 'sun'
  },

  //sinai desert
  sinai_Desert:{
    seen: false,
    name: 'sinai_Desert',
    mapImg: './img/maps/sinai_Desert/sinai_Desert.png',
    FGImg: './img/maps/sinai_Desert/sinai_DesertFG.png',
    spawnPosition: {
      x: -900,
      y: -1050
    },
    height: 58,
    width: 72,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    trainers: [
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Bugzzy', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:155}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bugman/bugman.png',
        dialogue: "OTHER MAP",
        reward: 100,
        beaten: true,
      },
      {
        name: 'Kim', 
        team: [],
        direction: {reach: {pos:{x:125, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:35, y:35}, neg:{x:35, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "OTHER MAP",
        reward: 100,
        beaten: true,
      },
    ],
    items: [
      {
        name: 'royal_Jelly',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'royal_Jelly',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'royal_Jelly',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/guy1/guy1.png",
        info: {
          looking: 'Up',
          direction: {reach: {pos:{x:20, y:40}, neg:{x:-20, y:0}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            `Djed is a pretty rad dude!\n\nHe's the drummer of our band "THE ROCK QUILLERS!!!".`
          ],
        },
      },
      {
        name: 'npc',
        sprite: "img/charSprites/beardguy/beardguy.png",
        info: {
          looking: 'Down',
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            "The winds are pretty sandy around here."
          ],
        },
      },
    ],
    obstaclesInfo: [
      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:50}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
        id: 0
      }
    ],
    changeMapLocations:[
      {name: 'melchi_Cave', spawnPosition: {x:125, y: -1050}}, // grotto

      {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, 
      {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}
    ],
    weather: 'sand'
  },
  melchi_Cave:{
    seen: false,
    name: 'melchi_Cave',
    mapImg: './img/maps/melchi_Cave/melchi_Cave.png',
    FGImg: './img/maps/melchi_Cave/melchi_CaveFG.png',
    spawnPosition: {
      x: 0,
      y: -850
    },
    height: 26,
    width: 26,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, // grotto
    ],
    weather: null,
    trainers: [
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        reward: 100,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'royal_Jelly',
        amount: 1,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
    ],
  },

  //luna_Mountain
  luna_Mountain_Entrance:{
    seen: false,
    name: 'luna_Mountain_Entrance',
    mapImg: './img/maps/luna_Mountain_Entrance/luna_Mountain_Entrance.png',
    FGImg: './img/maps/luna_Mountain_Entrance/luna_Mountain_EntranceFG.png',
    spawnPosition: {
      x: -675,
      y: -1200
    },
    height: 40,
    width: 55,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'luna_Mountain', spawnPosition: {x: -1700, y: -3000}}, {name: 'luna_Mountain', spawnPosition: {x: -1700, y: -3000}}, {name: 'luna_Mountain', spawnPosition: {x: -1700, y: -3000}}, 

      {name: 'cross_Link', spawnPosition: {x: -865, y: -375}}, {name: 'cross_Link', spawnPosition: {x: -865, y: -375}}, {name: 'cross_Link', spawnPosition: {x: -865, y: -375}},
      
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/brownlady/brownlady.png",
        info: {
          looking: 'Down',
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            `It's so dark up ahead, seems to be impossible to carry on without a light source...`
          ],
        },
      },
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [[pogemonsObj.sturdle, 8, null], [pogemonsObj.sturdle, 9, null], [pogemonsObj.sturdle, 10, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/rangermale/rangermale.png',
        dialogue: "I keep running into cobwebs, it's starting to get on my nerves....",
        reward: 100,
        beaten: true,
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
  },
  luna_Mountain:{
    seen: false,
    name: 'luna_Mountain',
    mapImg: './img/maps/luna_Mountain/luna_Mountain.png',
    FGImg: './img/maps/luna_Mountain/luna_MountainFG.png',
    spawnPosition: {
      x: -675,
      y: -1200
    },
    height: 64,
    width: 76,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, 

      {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}}, {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}}, {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}},
      
    ],
    event: [
    ],
    trainers: [
      {
        name: 'Caseoh', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/burglar/burglar.png',
        dialogue: "Kinda hard to walk around me, i get it...",
        reward: 0,
        beaten: true
      },
      
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
  },

  //sol_Path
  sol_Path:{
    seen: false,
    name: 'sol_Path',
    mapImg: './img/maps/sol_Path/sol_Path.png',
    FGImg: './img/maps/sol_Path/sol_PathFG.png',
    spawnPosition: {
      x: -675,
      y: -1200
    },
    height: 36,
    width: 62,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'luna_Mountain', spawnPosition: {x: -2850, y: -250}},

      {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}}, {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}}, {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}},
      {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}}, {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}}, {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}},
      {name: 'commandment_Road', spawnPosition: {x: -2725, y: -3550}},
    ],
    event: [
    ],
    trainers: [
      {
        name: 'Caseoh', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/fatguy/fatguy.png',
        dialogue: "Kinda hard to walk around me, i get it...",
        reward: 0,
        beaten: true
      },
      {
        name: 'Alicia', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/blackbelt/blackbelt.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: 'sun'
  },

  //commandment_Road
  commandment_Road:{
    seen: false,
    name: 'commandment_Road',
    mapImg: './img/maps/commandment_Road/commandment_Road.png',
    FGImg: './img/maps/commandment_Road/commandment_RoadFG.png',
    spawnPosition: {
      x: -675,
      y: -1300
    },
    height: 72,
    width: 78,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}}, {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}}, {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}},
      {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}}, {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}}, {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}},
      {name: 'scribble_Town', spawnPosition: {x: -2550, y: -500}},

      {name: 'mousa_Crest', spawnPosition: {x: -3150, y: -1200}}, {name: 'mousa_Crest', spawnPosition: {x: -3150, y: -1200}}, {name: 'mousa_Crest', spawnPosition: {x: -3150, y: -1200}},
      {name: 'mousa_Crest', spawnPosition: {x: -3150, y: -1200}}, {name: 'mousa_Crest', spawnPosition: {x: -3150, y: -1200}},

      {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}}, {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}}, {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}},
      {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}}, {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}}, {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}},
      {name: 'sol_Path', spawnPosition: {x: -1700, y: -125}},
    ],
    event: [
    ],
    trainers: [
      {
        name: 'Alicia', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'Hieronymus', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/artist/artist.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'Granite', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/malebirdkeeper/malebirdkeeper.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'Quwill', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },

  // mousa_Crest
  mousa_Crest:{
    seen: false,
    name: 'mousa_Crest',
    mapImg: './img/maps/mousa_Crest/mousa_Crest.png',
    FGImg: './img/maps/mousa_Crest/mousa_CrestFG.png',
    spawnPosition: {
      x: -675,
      y: -1300
    },
    height: 38,
    width: 82,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}},
      {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}},
    ],
    event: [
    ],
    trainers: [
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },

  //scribble_Town
  scribble_Town:{
    seen: false,
    name: 'scribble_Town',
    mapImg: './img/maps/scribble_Town/scribble_Town.png',
    FGImg: './img/maps/scribble_Town/scribble_TownFG.png',
    spawnPosition: {
      x: -675,
      y: -1200
    },
    height: 42,
    width: 72,
    encounters: {ground: [{pogemon: pogemonsObj.sturdle, lvls: [2, 6], odds: {min:1,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [2, 6], odds: {min:1,max:100}}]},
    changeMapLocations:[
      {name: 'luna_Mountain', spawnPosition: {x: -2850, y: -250}}, // house 1

      {name: 'luna_Mountain', spawnPosition: {x: -2850, y: -250}}, // house 2

      {name: 'luna_Mountain', spawnPosition: {x: -2850, y: -250}}, // house 3

      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}},
      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}},
      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, // exit map

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}},

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 
      
      {name: 'scribble_Town_Gym', spawnPosition: {x: 160, y: -1450}},// gym
    ],
    event: [
    ],
    trainers: [
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  scribble_Town_Gym:{
    seen: false,
    name: 'scribble_Town_Gym',
    mapImg: './img/maps/scribble_Town_Gym/scribble_Town_Gym.png',
    FGImg: './img/maps/scribble_Town_Gym/scribble_Town_GymFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 33,
    width: 24,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'scribble_Town', spawnPosition: {x: -2080, y: -1300}}, {name: 'scribble_Town', spawnPosition: {x: -2080, y: -1300}}, {name: 'scribble_Town', spawnPosition: {x: -2080, y: -1300}}, 
    ],
    event: [
    ],
    trainers: [      
      {
        name: "Hermes", 
        team: [[pogemonsObj.flailegant, 11, null], [pogemonsObj.slimie, 12, null], [pogemonsObj.balancia, 13, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}},
        looking: 'Down', 
        sprite: "../../img/charSprites/hermes/hermes.png",
        dialogue: "I heard from my wife that you defeated her all the way back in fair town.\n\nI'm sure she tried to teach you as much as she could.\n\nLet me do the same..",
        reward: 100,
        beaten: false,
        gymLeader: {name: "hermes", num: 2},
      },
      {
        name: 'Saphir', 
        team: [[pogemonsObj.formal, 9, null], [pogemonsObj.allingua, 10, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/bluehairgirl/bluehairgirl.png',
        dialogue: '...',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Stza',
        team: [[pogemonsObj.wallafi, 8, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/bluepunk/bluepunk.png',
        dialogue: "We're the gang in blue!\n\nNo, not that one..",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Quartz',
        team: [[pogemonsObj.wallafi, 8, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bluehairwoman2/bluehairwoman2.png',
        dialogue: "Have you met my little sister yet?\n\nShe had a strong connection to pogemons ever since she was very little..\n\nHermes even took her as his pupil.\n\nShe grew to strong and free, i'm proud of her for that.",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Ruby',
        team: [[pogemonsObj.wallafi, 8, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/bluehairwoman/bluehairwoman.png',
        dialogue: "Let me show you what i've got!\n\nYou're never gonna recover from this! >:)",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Hurley',
        team: [[pogemonsObj.wallafi, 8, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bluehairsunglasses/bluehairsunglasses.png',
        dialogue: "My bike fell in the water, so i'm stuck here now..",
        reward: 100,
        beaten: false,
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },

  // revelation_Road
  revelation_Road:{
    seen: false,
    name: 'revelation_Road',
    mapImg: './img/maps/revelation_Road/revelation_Road.png',
    FGImg: './img/maps/revelation_Road/revelation_RoadFG.png',
    spawnPosition: {
      x: -250,
      y: -850
    },
    height: 42,
    width: 66,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, 
      {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, 

      {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, 
      {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // bellum_Way
  bellum_Way:{
    seen: false,
    name: 'bellum_Way',
    mapImg: './img/maps/bellum_Way/bellum_Way.png',
    FGImg: './img/maps/bellum_Way/bellum_WayFG.png',
    spawnPosition: {
      x: -250,
      y: -450
    },
    height: 42,
    width: 66,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-175, y: -2385}}, // icy cave

      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
    ],
    weather: 'rain',
    trainers: [
    ],
    items: [
    ],
  },

  //stasis_Cave
  stasis_Cave:{
    seen: false,
    name: 'stasis_Cave',
    mapImg: './img/maps/stasis_Cave/stasis_Cave.png',
    FGImg: './img/maps/stasis_Cave/stasis_CaveFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 55,
    width: 86,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-200, y: -155}}, // top left up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-2752, y: -180}}, // top right up ladder

      {name: 'ascension_Path', spawnPosition: {x:-700, y: -2275}}, // exit

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1000, y: -225}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1000, y: -225}}, //  legendary cave

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-165, y: -665}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-165, y: -665}}, // middle down ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3395, y: -1025}}, // middle right up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-765, y: -1800}}, // start up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3008, y: -1685}}, // lower right up ladder 1

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3392, y: -1900}}, // lower right up ladder 2

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-1350, y: -2285}}, // middle up ladder

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1825, y: -2900}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1825, y: -2900}}, // lower right down ladder

      {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, 
      {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },
  stasis_Cave_Upper_Level:{
    seen: false,
    name: 'stasis_Cave_Upper_Level',
    mapImg: './img/maps/stasis_Cave_Upper_Level/stasis_Cave_Upper_Level.png',
    FGImg: './img/maps/stasis_Cave_Upper_Level/stasis_Cave_Upper_LevelFG.png',
    spawnPosition: {
      x: -2750,
      y: -850
    },
    height: 52,
    width: 86,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-325, y: 115}}, {name: 'stasis_Cave', spawnPosition: {x:-325, y: 115}}, // top left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-2725, y: 40}}, {name: 'stasis_Cave', spawnPosition: {x:-2725, y: 40}}, // top right down ladder

      {name: 'stasis_Cave_Top_Level', spawnPosition: {x:-385, y: -185}}, // top right up ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3350, y: -885}}, {name: 'stasis_Cave', spawnPosition: {x:-3350, y: -885}}, // top middle left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-805, y: -1800}}, {name: 'stasis_Cave', spawnPosition: {x:-805, y: -1800}}, // bottom left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3040, y: -1885}}, {name: 'stasis_Cave', spawnPosition: {x:-3040, y: -1885}}, // bottom right 1 down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3425, y: -1955}}, {name: 'stasis_Cave', spawnPosition: {x:-3425, y: -1955}}, // bottom right 2 down ladder
      
      {name: 'stasis_Cave_Top_Level', spawnPosition: {x:-512, y: -1885}}, // bottom right up ladder

      {name: 'stasis_Cave', spawnPosition: {x:-1250, y: -2285}}, {name: 'stasis_Cave', spawnPosition: {x:-1250, y: -2285}}, // middle down ladder

      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },
  stasis_Cave_Lower_Level:{
    seen: false,
    name: 'stasis_Cave_Lower_Level',
    mapImg: './img/maps/stasis_Cave_Lower_Level/stasis_Cave_Lower_Level.png',
    FGImg: './img/maps/stasis_Cave_Lower_Level/stasis_Cave_Lower_LevelFG.png',
    spawnPosition: {
      x: -2750,
      y: -850
    },
    height: 61,
    width: 52,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-2432, y: -115}}, // legendary cave
      
      {name: 'stasis_Cave', spawnPosition: {x:-1856, y: -415}}, // entrance

      {name: 'stasis_Cave', spawnPosition: {x:-2815, y: -2475}}, // exit
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },
  stasis_Cave_Top_Level:{
    seen: false,
    name: 'stasis_Cave_Top_Level',
    mapImg: './img/maps/stasis_Cave_Top_Level/stasis_Cave_Top_Level.png',
    FGImg: './img/maps/stasis_Cave_Top_Level/stasis_Cave_Top_LevelFG.png',
    spawnPosition: {
      x: -2750,
      y: -850
    },
    height: 47,
    width: 42,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3230, y: -255}}, {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3230, y: -255}}, // exit
      
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3360, y: -2235}}, {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3360, y: -2235}}, // entrance
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // ascension_Path
  ascension_Path:{
    seen: false,
    name: 'ascension_Path',
    mapImg: './img/maps/ascension_Path/ascension_Path.png',
    FGImg: './img/maps/ascension_Path/ascension_PathFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 52,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  
      {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  

      {name: 'stasis_Cave', spawnPosition: {x:-3165, y: -50}}, {name: 'stasis_Cave', spawnPosition: {x:-3165, y: -50}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // alquima_Town
  alquima_Town:{
    seen: false,
    name: 'alquima_Town',
    mapImg: './img/maps/alquima_Town/alquima_Town.png',
    FGImg: './img/maps/alquima_Town/alquima_TownFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 52,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, 
      {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}},

      {name: 'pogecenter', spawnPosition: {x:-200, y: -155}},

      {name: 'pogemart', spawnPosition: {x:-200, y: -155}},

      {name: 'house', spawnPosition: {x:-200, y: -155}},
      
      {name: 'house', spawnPosition: {x:-200, y: -155}},

      {name: 'lodge', spawnPosition: {x:-200, y: -155}},

      {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}},
      {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}},
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // end_Trail
  end_Trail:{
    seen: false,
    name: 'end_Trail',
    mapImg: './img/maps/end_Trail/end_Trail.png',
    FGImg: './img/maps/end_Trail/end_TrailFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 52,
    width: 84,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'transit_Peak', spawnPosition: {x:-1065, y: -2325}}, {name: 'transit_Peak', spawnPosition: {x:-1065, y: -2325}}, {name: 'transit_Peak', spawnPosition: {x:-1065, y: -2325}}, 

      {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, 
      {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, {name: 'alquima_Town', spawnPosition: {x:-2450, y: -150}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // transit_Peak
  transit_Peak:{
    seen: false,
    name: 'transit_Peak',
    mapImg: './img/maps/transit_Peak/transit_Peak.png',
    FGImg: './img/maps/transit_Peak/transit_PeakFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 52,
    width: 58,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  // neo_Genesis
  neo_Genesis:{
    seen: false,
    name: 'neo_Genesis',
    mapImg: './img/maps/neo_Genesis/neo_Genesis.png',
    FGImg: './img/maps/neo_Genesis/neo_GenesisFG.png',
    spawnPosition: {
      x:-175,
      y: -2385
    },
    height: 54,
    width: 86,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-200, y: -155}}, // top left up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-2752, y: -180}}, // top right up ladder

      {name: 'end_Trail', spawnPosition: {x:-2335, y: -85}}, // exit

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1000, y: -225}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1000, y: -225}}, //  legendary cave

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-165, y: -665}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-165, y: -665}}, // middle down ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3395, y: -1025}}, // middle right up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-765, y: -1800}}, // start up ladder

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3008, y: -1685}}, // lower right up ladder 1

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3392, y: -1900}}, // lower right up ladder 2

      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-1350, y: -2285}}, // middle up ladder

      {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1825, y: -2900}}, {name: 'stasis_Cave_Lower_Level', spawnPosition: {x:-1825, y: -2900}}, // lower right down ladder

      {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, 
      {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -400}}, 
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
  },

  //buildings
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
    encounters: {},
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
    changeMapLocations:[{name: 'prevMap', spawnPosition: {x: 0, y: 0,}}]
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
    encounters: {},
    event: [
      {
        name: 'npc',
        info: {direction: {reach: {pos:{x:0, y:-20}, neg:{x:20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['Welcome to my store, how may i help you?'], type:'pogemart'},
      },
    ],
    changeMapLocations:[{name: 'prevMap', spawnPosition: {x: 0, y: 0,}}],
    productOptions: [
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'super_Potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
      [{name:'potion'}, {name:'revive'}, {name:'pogeball'}],
    ]
  },
}

export let defaultMapsObj = {...mapsObj}

if(data != null) {
  // mapsObj = data.mapsObjState

  // mapsObj[data.currMapName] = defaultMapsObj[data.currMapName]
  Object.values(mapsObj).forEach((map, i) =>{
    if(map.trainers != undefined){
      if(map.trainers.length != 0) {
        map.trainers.forEach((trainer, j) =>{
          if(trainer.team.length != 0)
            trainer.team.forEach((pogemon, i2) =>{
              if(defaultMapsObj[map.name].trainers != undefined) 
                if(defaultMapsObj[map.name].trainers.length != 0)
                  pogemon = Object.values(defaultMapsObj[map.name].trainers)[j].team[i2]
                  // defaultMapsObj[map.name].trainers.forEach(trainer =>{
                  //   trainer.team.forEach(pogemonInfo =>{
                  //     pogemon[0] = pogemonInfo[0]
                  //   })
                  // })
            })
        })
      }
    }
    if(map.seen != undefined) map.seen = data.mapsObjState[map.name].seen
    if(map.obstaclesInfo != undefined) {
      map.obstaclesInfo.forEach((obstacle, i) =>{{
        obstacle.disabled = data.mapsObjState[map.name].obstaclesInfo[i].disabled
      }})
    }
  })

  // for(let i = 0; i < Object.entries(data.currMapObj).length; i++){
  //   const mapSavedData = Object.entries(data.currMapObj)

  //   for(let j = 0; j < Object.entries(mapsObj[data.currMapName]).length; j++){
  //     const mapData = Object.entries(mapsObj[data.currMapName])

  //     if(mapData[j][0] === mapSavedData[i][0]){
  //       if(mapData[j][0] == 'changeMapLocations') continue
  //       mapData[j][1] = mapSavedData[i][1]
  //     }
  //   }
  // }


  // console.log(data.currMapObj.obstaclesInfo)

  if(mapsObj[data.currMapName].obstaclesInfo != undefined){
    for(let i = 0; i < Object.values(mapsObj[data.currMapName].obstaclesInfo).length; i++){
      Object.values(mapsObj[data.currMapName].obstaclesInfo)[i].disabled = Object.values(data.currMapObj.obstaclesInfo)[i].disabled
    }
  }

  // console.log(mapsObj[data.currMapName].obstaclesInfo)
}

export async function setBoundries(mapsObj){
  let mapArr = new Map()

  const mapsObjKeys = Object.keys(mapsObj)
  const mapsObjValues = Object.values(mapsObj)

  if(data != null) {
    mapsObjValues.forEach((map, i) =>{
      if(map.trainers != undefined) {
        map.trainers.forEach((trainer, j) =>{
          if(trainer.beaten) return
          if(Object.values(data.mapsObjState)[i].trainers == undefined) return
          if(Object.values(data.mapsObjState)[i].trainers[j] == undefined) return
          trainer.beaten = Object.values(data.mapsObjState)[i].trainers[j].beaten
        })
      }

      if(map.items != undefined) {
        map.items.forEach((item, j) =>{
          if(item.pickedUp) return
          if(Object.values(data.mapsObjState)[i].items == undefined) return
          if(Object.values(data.mapsObjState)[i].items[j] == null) {
            // Object.values(data.mapsObjState)[i].items[j] = mapsObj[map.name].items[j]
            // Object.values(data.mapsObjState)[i].items[j].pickedUp = true

            // item = mapsObj[map.name].items[j]
            // item.pickedUp = true
          } else {
            // console.log(Object.values(data.mapsObjState)[i].items[j].name)
            // console.log(Object.values(data.mapsObjState)[i].items[j].pickedUp)
            item.pickedUp = Object.values(data.mapsObjState)[i].items[j].pickedUp
          }
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
    } else if (res.layers[4] == undefined) {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data, changeMap: res.layers[1].data, eventZones: res.layers[2].data, battleZones: res.layers[3].data})
    } else {
      mapArr.set(`${mapsObjKeys[i]}`, {...mapsObjValues[i], collisions: res.layers[0].data, changeMap: res.layers[1].data, eventZones: res.layers[2].data, battleZones: res.layers[3].data, obstacles: res.layers[4].data})
    }

    mapsObj[`${mapsObjKeys[i]}`] = mapArr.get(`${mapsObjKeys[i]}`)
  }
}