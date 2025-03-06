import { loadData } from "../save.js"
import { abilitiesObj } from "./abilitiesData.js"
import { itemsObj } from "./itemsData.js"
import { movesObj } from "./movesData.js"
import { pogemonsObj } from "./pogemonData.js"


const data = await loadData("saveFile")

// heldItem: null, moves:[
//   movesObj.leech_seed
// ]

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
        {pogemon: pogemonsObj.piny, lvls: [2, 4], odds: {min:1,max:100}},
        // {pogemon: pogemonsObj.flailegant, lvls: [2, 4], odds: {min:50,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},

      {name: 'gene_Town_Home', spawnPosition: {x:250, y:0}}, 

      {name: 'home', spawnPosition: {x:250, y:-50,}}, 

      {name: 'lab', spawnPosition: {x: 375, y: -425,}},

      {name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},{name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},
      {name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},{name: 'eden_Forest', spawnPosition: {x:-2105, y:-225}},
    ],
    obstaclesInfo: [
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:80}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:80}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:80}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:0, y:80}, neg:{x:0, y:0}}},
        disabled: false,
      },
    ],
    items: [
      {
        name: 'eviolite',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
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
  gene_Town_Home:{
    seen: false,
    name: 'gene_Town_Home',
    mapImg: './img/maps/gene_Town_Home/gene_Town_Home.png',
    FGImg: './img/maps/gene_Town_Home/gene_Town_HomeFG.png',
    spawnPosition: {
      x: -75,
      y: -750
    },
    height: 11,
    width: 22,
    encounters: {},
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x: -415, y: -615,}}, {name: 'gene_Town', spawnPosition: {x: -415, y: -615,}}
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/fatguy/fatguy.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          looking: 'Down',
          dialogue: [`I've never stepped off of this tile for my whole life! :D\n\nI probably won't ever need this, why don't you take it?`],
          eventKey: 'mapNPC'
        },
      },
    ],
    items: [
      {
        name: 'leftovers',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'twisted_Spoon',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'sharp_Beak',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}},
        pickedUp: false,
        hidden: true
      },
    ]
  },
  lab:{
    name: 'lab',
    seen: false,
    mapImg: './img/maps/lab/lab.png',
    FGImg: './img/maps/lab/labFG.png',
    spawnPosition: {
      x: 375,
      y: 25
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
        info: {direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}}},
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/oak/oak.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[`Please, choose any of those 3 pogemons!`], 
          dialoguePicked:[`I hope you enjoy the adventure you'll have alongside your companion!`,`I'll heal them just to make sure you are good to go!`,`All ready to go!`], 
          looking: 'Down',
          eventKey: 'oak'
        },
      },
    ],
    items: [
      {
        name: 'loko',
        amount: 0,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
      {
        name: 'steeli',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
      {
        name: 'maaph',
        amount: 2,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false,
        starter: true
      },
    ],
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
        {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:1,max:35}}, 
        {pogemon: pogemonsObj.wallafi, lvls: [3, 6], odds: {min:35,max:65}}, 
        {pogemon: pogemonsObj.flailegant, lvls: [3, 6], odds: {min:65,max:90}},
        {pogemon: pogemonsObj.allingua, lvls: [3, 7], odds: {min:90,max:95}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [3, 7], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [8, 12], odds: {min:1,max:75}},
        {pogemon: pogemonsObj.flailegant, lvls: [8, 12], odds: {min:75,max:100}},
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
        //     pogemon                 lvl  item  abili shiny  ivs    move gender nature
        team: [[pogemonsObj.ouroboross, 30, null, null, null, null], [pogemonsObj.rockwil, 30, null, null, null, null], [pogemonsObj.steeler, 34, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}}, 
        looking: 'Left',
        sprite: '../../img/charSprites/oldman2/oldman2.png',
        dialogue: 'The road ahead is steep..\n\nTo find the light withing ones heart,\n\none must be aware of the shadow that it casts..',
        reward: 550,
        beaten: false,
      },
      {
        name: 'NPC', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: 'slither_Road NPC',
        reward: 0,
        beaten: false,
      }, 
      {
        name: 'NPC', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/guy2/guy2.png',
        dialogue: 'banishment_Road NPC',
        reward: 0,
        beaten: false,
      },   
      {
        name: 'Jah', 
        team: [[pogemonsObj.wallafi, 6, itemsObj.banana, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}}, 
        looking: 'Down',
        sprite: '../../img/charSprites/oldman1/oldman1.png',
        dialogue: "Wagwan man?",
        reward: 420,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'magnet',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'super_Potion',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'pogeball',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],
    event: [
      {
        name: 'Joey',
        sprite: 'img/charSprites/youngster/youngster.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:275}}}, 
          dialogue:[`This next area is a bit too strong for you right now..\n\n\nTell you what, if you bring me back one of those banana's from the eden forest\n\nsouth of here, i'll let you throught!`], 
          waitingDialogue: [`I'm still waiting for my banana..\n\n\nFriendly reminder, you can find banana's in the eden forest south of here.`],
          bananaDialogue: [`That looks delicious!!\n\n\nI'll look the other way while i enjoy my banana.\n\nWhatever happens to you from now on ain't on me..`],
          looking: 'Down',
          eventKey: 'banishmentPathBlock'
        },
      },
    ],
    weather: null
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
    encounters: {
        ground: [
          {pogemon: pogemonsObj.flailegant, lvls: [3, 7], odds: {min:1,max:40}},
          {pogemon: pogemonsObj.wallafi, lvls: [3, 7], odds: {min:40,max:85}},
          {pogemon: pogemonsObj.nahass, lvls: [5, 8], odds: {min:85,max:95}},
          {pogemon: pogemonsObj.piny, lvls: [3, 7], odds: {min:95,max:100}},
        ], 
        water: [
          {pogemon: pogemonsObj.tadtoxic, lvls: [8, 12], odds: {min:1,max:50}},
          {pogemon: pogemonsObj.flailegant, lvls: [8, 12], odds: {min:50,max:90}},
          {pogemon: pogemonsObj.nahass, lvls: [8, 12], odds: {min:90,max:100}},
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
        name: 'cross_Link NPC"', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: false
      },
      {
        name: 'May', 
        team: [[pogemonsObj.flailegant, 7, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: "This poor thing is trying to fly but is failing misebarly at it..\n\nI love mine regardless of how goofy it looks!",
        reward: 100,
        beaten: false,
      },      
      {
        name: 'pearly_Path NPC', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/oldman1/oldman1.png',
        dialogue: 'pearly_Path NPC',
        reward: 0,
        beaten: false,
      },
      {
        name: 'Dakota', 
        team: [[pogemonsObj.nahass, 9, null, null, null, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}},
        looking: 'Left' ,
        sprite: '../../img/charSprites/youngman3/youngman3.png',
        dialogue: "I've never seen this type of critter before..\n\nI'm glad i managed to catch it!",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Marley', 
        team: [[pogemonsObj.flailegant, 8, null, null, null, null], [pogemonsObj.formal, 11, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}}, 
        looking: 'Up',
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: "I love Ma'at so much!\n\nShe taught me many great things.",
        reward: 130,
        beaten: false,
      },
    ],
    items:[
      {
        name: 'poison_Barb',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'silk_Scarf',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
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
      x: -675,
      y: -500
    },
    height: 43,
    width: 53,
    encounters: {},
    trainers: [
      {
        name: 'Rocky', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: false
      },
      {
        name: 'Marley', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: "slither_Road NPC",
        reward: 0,
        beaten: false
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
    items:[
      {
        name: 'miracle_Seed',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'old_Banana',
        amount: 20,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],
    weather: null
  },
  fair_Town_Gym:{
    seen: false,
    name: 'fair_Town_Gym',
    mapImg: './img/maps/fair_Town_Gym/fair_Town_Gym.png',
    FGImg: './img/maps/fair_Town_Gym/fair_Town_GymFG.png',
    spawnPosition: {
      x: 250,
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
        team: [
          [pogemonsObj.flailegant, 14, null, null, null, null, [
            movesObj.draining_kiss,
            movesObj.quick_attack,
            movesObj.feather_weight,
          ]], 
          [pogemonsObj.slimie, 15, null, itemsObj.leftovers, abilitiesObj.slimie_regeneration, true], 
          [pogemonsObj.balancia, 17, itemsObj.rocky_Helmet, abilitiesObj.synchronize, null, true, [
            movesObj.headbutt,
            movesObj.mystical_power,
            movesObj.quick_attack,
            movesObj.flame_charge,
          ]]
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}},
        looking: 'Down', 
        sprite: "../../img/charSprites/ma'at/ma'at.png",
        dialogue: "Are you ready for your first challenge?",
        reward: 500,
        beaten: false,
        gymLeader: {name: "ma'at", num: 0},
        difficulty: 'gym',
        eventKey: 'maatGym'
      },
      {
        name: 'Larry', 
        team: [[pogemonsObj.formal, 11, null, null, null, null], [pogemonsObj.allingua, 13, null, null, null, null]],
        direction: {reach: {pos:{x:300, y:0}, neg:{x:0, y:0}}},
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
        team: [[pogemonsObj.wallafi, 12, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:400, y:0}}},
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
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}},
          looking: 'Down', 
          dialogue:['Make sure you speak to Professor Heisenberg before you leave town.\n\n\nAnyways, you can have a look at my berries if you want.'],
          eventKey: 'maatBerryShop',
          shopKey: 6
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
      {name: 'fair_Town', spawnPosition: {x: -1185, y: -415}}, {name: 'fair_Town', spawnPosition: {x: -1185, y: -415}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/heisenberg/heisenberg.png',
        info: {
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          looking: 'Down',
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
        {pogemon: pogemonsObj.slimie, lvls: [12, 15], odds: {min:99,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 13], odds: {min:1,max:85}}, 
        {pogemon: pogemonsObj.slimie, lvls: [12, 15], odds: {min:85,max:100}}
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
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          looking: 'Down',
          dialogue:
          [
            "Hey, how are ya?\n\nMy name is Ma'at, what's yours?", 
            "I saw one of those strange slime pogemon slide into that cave.\n\nIt was bigger than my slimie, that's for sure.\n\nAll purple and didin't smell very good... Yuck..", 
            "How strange..\n\nYou might want to check that out later..","If you're looking for a challenge, i'll be waiting at the gym!"
          ], 
          eventKey: 'maatMeeting'
        },
      },
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [[pogemonsObj.sturdle, 9, null, null, null, null], [pogemonsObj.sturdle, 10, null, null, null, null], [pogemonsObj.sturdle, 11, null, null, null, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}}, 
        looking: 'Left',
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I love collecting stones!\n\nSome cool ones often appear around the bigger ones! :D',
        reward: 200,
        beaten: false,
      },
    ],
    obstaclesInfo: [
      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:50}}},
        disabled: false,
        id: 0
      }
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'fire_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'water_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
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
        {pogemon: pogemonsObj.flailegant, lvls: [6, 9], odds: {min:1,max:30}}, 
        {pogemon: pogemonsObj.formal, lvls: [6, 9], odds: {min:30,max:60}}, 
        {pogemon: pogemonsObj.piny, lvls: [6, 9], odds: {min:60,max:90}}, 
        {pogemon: pogemonsObj.grazzer, lvls: [9, 13], odds: {min:90,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:50}},
        {pogemon: pogemonsObj.flailegant, lvls: [10, 15], odds: {min:40,max:95}},
        {pogemon: pogemonsObj.slimie, lvls: [10, 15], odds: {min:95,max:100}},
      ]
    },
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}},
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}
    ],
    trainers: [
      {
        name: 'Eve', 
        team: [[pogemonsObj.flailegant, 14, null, null, null, null], [pogemonsObj.grazzer, 15, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: "It smells wonderful here, i wish i could've stayed longer...",
        reward: 0,
        beaten: false,
      },
      {
        name: 'Shitil', 
        team: [[pogemonsObj.loko, 16, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}}, 
        looking: 'Down',
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "I can't get throught those darned trees, there is so much room around them it\n\nmakes no sence.. ;-;",
        reward: 0,
        beaten: false,
      },      
      {
        name: 'Adam', 
        team: [[pogemonsObj.allingua, 15, null, null, null, null], [pogemonsObj.formal, 14, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}}, 
        looking: 'Right',
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: 'Git gud',
        reward: 0,
        beaten: false,
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/vignusPortal.png",
        info: {
          looking: 'Down',
          name: 'Vignus',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.vignus, [1,1], null, null, null, true,[
            movesObj.roost,
            movesObj.earthquake,
            movesObj.brave_bird,
            movesObj.stone_miss
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-Vignus stares at you calmly-"
          ], 
          eventKey: 'vignus',
          faceToFace: false
        },
      },
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'lucky_Egg',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'banana',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true,
        eventKey: 'bananacopia'
      },
    ],
    obstaclesInfo: [],
    weather: null
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
        {pogemon: pogemonsObj.allingua, lvls: [7, 11], odds: {min:1,max:40}},
        {pogemon: pogemonsObj.wallafi, lvls: [7, 11], odds: {min:40,max:60}},
        {pogemon: pogemonsObj.formal, lvls: [7, 11], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.sparkust, lvls: [6, 10], odds: {min:80,max:95}},
        {pogemon: pogemonsObj.piny, lvls: [6, 10], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 13], odds: {min:1,max:80}},
        {pogemon: pogemonsObj.flailegant, lvls: [10, 13], odds: {min:80,max:100}},
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
        team: [[pogemonsObj.allingua, 17, null, null, null, null], [pogemonsObj.formal, 17, null, null, null, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "Both my pogemons can't stand each other, i'm not sure why...",
        reward: 250,
        beaten: false,
      },   
      {
        name: 'pearly_Path', 
        team: [],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "pearly_Path",
        reward: 100,
        beaten: false,
      },  
      {
        name: 'Splinter', 
        team: [[pogemonsObj.piny, 15, null, null, null, null], [pogemonsObj.piny, 16, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/guy2/guy2.png',
        dialogue: "I love this guy, he's a mushroom thing. :)",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Duster', 
        team: [[pogemonsObj.sturdle, 12, null, null, null, null], [pogemonsObj.tadtoxic, 13, null, null, null, null], [pogemonsObj.wallafi, 14, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "Who knows what true riches hide away in these mountains..",
        reward: 150,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'focus_Band',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'revive',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ]
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

      {name: 'keme_Town_Gym', spawnPosition: {x:-40, y: -500,}},

      {name: 'sifter_House', spawnPosition: {x: 440, y: -175}},

      {name: 'djed_House', spawnPosition: {x: 440, y: -175}},

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
          direction: {reach: {pos:{x:20, y:40}, neg:{x:-20, y:0}}}, 
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
          looking: 'Left',
          direction: {reach: {pos:{x:20, y:20}, neg:{x:20, y:40}}}, 
          dialogue:
          [
            "How do these people get out of their house?\n\nThere isn't even a door on this building!.."
          ],
        },
      },
      {
        name: 'npc',
        sprite: "img/charSprites/blank/blank.png",
        info: {
          looking: 'Down',
          name: 'Baaull',
          reward: 0,
          direction: {reach: {pos:{x:60, y:60}, neg:{x:60, y:60}}}, 
          team: [[pogemonsObj.baaull, [45,45], null, null, null, true]],
          trainer: false,
          dialogue:
          [
            `This statue is so life life, it takes you by suprise.\n\nIt seems to be molded out of metal, but you find that hard to believe.`
          ],
          eventKey: 'frozenBaaull'
        },
      },
    ],
    items: [
      {
        name: 'hard_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'soft_Sand',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'metal_Coat',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
    trainers: [
      {
        name: 'Spritz', 
        team: [[pogemonsObj.allingua, 10, null, null, null, null], [pogemonsObj.formal, 10, null, null, null, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "Both my pogemons can't stand each other, i'm not sure why...",
        reward: 100,
        beaten: false,
      },
    ],
  },
  djed_House:{
    seen: false,
    name: 'djed_House',
    mapImg: './img/maps/djed_House/djed_House.png',
    FGImg: './img/maps/djed_House/djed_HouseFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 12,
    width: 16,
    encounters: {},
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/djed/djed.png",
        info: {
          looking: 'Down',
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}}, 
          dialogue:
          [
            "You beat me fair and square, you've got it in you kid!"
          ],
        },
      }
    ],
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x:-1120, y: -1170}},{name: 'keme_Town', spawnPosition: {x:-1120, y: -1170}},
    ]
  },
  sifter_House:{
    seen: false,
    name: 'sifter_House',
    mapImg: './img/maps/sifter_House/sifter_House.png',
    FGImg: './img/maps/sifter_House/sifter_HouseFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 12,
    width: 16,
    encounters: {},
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/burglar/burglar.png",
        info: {
          looking: 'Down',
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}}, 
          dialogue:
          [
            "I sift around and find stuff!\n\nI found this sifting thru the sand, you can have it!"
          ],
          givenDialogue: [
            `If you hold it in front of you while running around in the desert,\n\nsomething cool might happen!`
          ],
          eventKey: 'sandPlanktonNPC'
        },
      }
    ],
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x:-160, y: -850}},{name: 'keme_Town', spawnPosition: {x:-160, y: -850}},
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
        team: [[pogemonsObj.sturdle, 20, null, null, null, null], [pogemonsObj.sturdle, 21, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:150}, neg:{x:0, y:150}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I still very much like rocks! :p',
        OWdialogue: 'Looking everywhere can help find hidden tresures!\n\n\nIn my estimation there are a BUNCH of them around the region,\n\nmaybe even behind you right as we speak! :D',
        reward: 250,
        beaten: false,
        eventKey: 'djedGymTrainer'
      },
      {
        name: 'Onyx', 
        team: [[pogemonsObj.cobbird, 22, null], [pogemonsObj.earthsa, 23, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:150, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: 'I hope i can be just like Djed one day.',
        OWdialogue: "I used to always be sacred, but then i met him..",
        reward: 500,
        beaten: false,
        eventKey: 'djedGymTrainer'
      },
      {
        name: 'Djed', // gym leader
        team: [
          [pogemonsObj.allingua, 22, null, null, null, [
            movesObj.stealth_rock,
            movesObj.metal_claw,
            movesObj.bulldoze,
            movesObj.accelerock
          ]], 
          [pogemonsObj.purdustus, 24, null, null, null, null, null], 
          [pogemonsObj.punbreakable, 23, itemsObj.smooth_Rock, abilitiesObj.sand_Stream, null, null], 
          [pogemonsObj.rockwil, 25, itemsObj.rocky_Helmet, abilitiesObj.desert_Embrace, null, true, [
            movesObj.roost,
            movesObj.brave_bird,
            movesObj.sand_storm,
            movesObj.rock_slide,
          ]]
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/djed/djed.png',
        dialogue: 'A new challenger for me?\n\nBring it on!',
        reward: 1000,
        beaten: false,
        gymLeader: {name: "djed", num: 1},
        difficulty: 'gym',
        eventKey: 'djedGym'
      },
      {
        name: 'Clayton', 
        team: [[pogemonsObj.allingua, 20, null, null, null, null]],
        direction: {reach: {pos:{x:250, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: "I don't have a rock type pogemon, but Djed was cool enought to let me be here!",
        OWdialogue: "Psst.. Do you think steel types are as cool as rock types?",
        reward: 250,
        beaten: false,
        eventKey: 'djedGymTrainer'
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
        {pogemon: pogemonsObj.allingua, lvls: [10, 14], odds: {min:1,max:30}},
        {pogemon: pogemonsObj.formal, lvls: [8, 14], odds: {min:30,max:70}},
        {pogemon: pogemonsObj.sparkust, lvls: [8, 14], odds: {min:70,max:95}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 14], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 13], odds: {min:1,max:95}},
        {pogemon: pogemonsObj.aquario, lvls: [23, 27], odds: {min:95,max:100}},
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
        team: [[pogemonsObj.sparkust, 16, null, null, null, null], [pogemonsObj.antber, 18, null, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:155}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bugman/bugman.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Kim', 
        team: [[pogemonsObj.piny, 17, null, null, null, null], [pogemonsObj.tadtoxic, 18, null, null, null, null], [pogemonsObj.wallafi, 19, null, null, null, null]],
        direction: {reach: {pos:{x:125, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "I think these three should work well together.",
        reward: 200,
        beaten: false,
      },
      {
        name: 'Slash', 
        team: [[pogemonsObj.allingua, 18, null, null, null, null], [pogemonsObj.allingua, 19, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:450, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/guitarist/guitarist.png',
        dialogue: "SLASH THRU EM LIKE IT'S NOTHING BOYZ!!! WHAHAHAHA",
        reward: 300,
        beaten: false,
      },
      {
        name: 'Willet', 
        team: [[pogemonsObj.flailegant, 17, null, null, null, null], [pogemonsObj.cobbird, 18, null, null, null, null]],
        direction: {reach: {pos:{x:450, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/malebirdkeeper/malebirdkeeper.png',
        dialogue: "A shock and a burn to get those.. 'Twas all worth it of course!\n\nI wonder if i'm missing one?..",
        reward: 150,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'nugget',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'expert_Belt',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
    weather: 'sand'
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
        {pogemon: pogemonsObj.formal, lvls: [10, 14], odds: {min:1,max:30}}, 
        {pogemon: pogemonsObj.sparkust, lvls: [10, 14], odds: {min:30,max:50}},
        {pogemon: pogemonsObj.allingua, lvls: [11, 14], odds: {min:50,max:95}},
        {pogemon: pogemonsObj.earthsa, lvls: [16, 18], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [15, 20], odds: {min:1,max:100}},
        {pogemon: pogemonsObj.aquario, lvls: [23, 27], odds: {min:1,max:100}},
      ]
    },
    trainers: [
      {
        name: 'Gautama',
        team: [[pogemonsObj.spidathia, 17, null, null, null, null], [pogemonsObj.fruity, 20, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:200}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/sage/sage.png',
        dialogue: "If you close your eyes to the world, you can open your mind to nirvana.",
        reward: 0,
        beaten: false,
      },
      {
        name: 'Projecto', 
        team: [[pogemonsObj.formal, 16, null], [pogemonsObj.sturdle, 17, null], [pogemonsObj.cobbird, 18, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/youngman3/youngman3.png',
        dialogue: "I tell everyone that Djed is a fake looser, but i'm actualy just\n\nvery insecure about myself....\n\n\nI try not to make it too obvious tho.",
        reward: 200,
        beaten: false,
      },
      {
        name: 'Candice', 
        team: [[pogemonsObj.flailegant, 17, null], [pogemonsObj.nahass, 18, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:400, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/cowgirl/cowgirl.png',
        dialogue: "fa sowme rayeson thowse powgayman's down't sayem ta wawnt to\n\nhang 'rowund thays pletfoarm 'ere...",
        reward: 400,
        beaten: false,
      },
      {
        name: 'Lisa', 
        team: [[pogemonsObj.piny, 18, null], [pogemonsObj.earthsa, 16, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/brownlady/brownlady.png',
        dialogue: "This bear thingy must be pretty rare, i've never seen one of them before\n\nbefriending this one today!",
        reward: 250,
        beaten: false,
      },
      {
        name: 'Gabriel', // summoner
        looking: 'Down',
        sprite: "img/charSprites/dawnsummoner/dawnsummoner.png",
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:80}}}, 
        dialogue:
        [
          "I have people to make proud.\n\nI cannot stop here."
        ],
        team: [
          //                   lvl         item                  abili               shiny ivs  move   gender
          [pogemonsObj.sterra, 57, itemsObj.rocky_Helmet, abilitiesObj.mold_Breaker, true, true, [
            movesObj.iron_head,
            movesObj.earthquake,
            movesObj.icicle_crash,
            movesObj.stealth_rock
          ]],
          [pogemonsObj.volaticus, 58, itemsObj.expert_Belt, abilitiesObj.aerilate, null, true, [
            movesObj.extreme_speed,
            movesObj.double_Edge,
            movesObj.leaf_blade,
            movesObj.u_turn
          ]],
          [pogemonsObj.mower, 59, itemsObj.golden_banana, abilitiesObj.fluffy_Coat, null, true, [
            movesObj.bulk_up,
            movesObj.milk_drink,
            movesObj.earthquake,
            movesObj.horn_leech
          ]],
          [pogemonsObj.rockwil, 60, itemsObj.black_Sludge, abilitiesObj.sand_Stream, null, true, [
            movesObj.rock_slide,
            movesObj.earthquake,
            movesObj.iron_head,
            movesObj.crunch
          ]],
          [pogemonsObj.infragice, 62, itemsObj.leftovers, abilitiesObj.rock_Head, null, true, [
            movesObj.shell_smash,
            movesObj.earthquake,
            movesObj.head_smash,
            movesObj.icicle_crash
          ]],
          [pogemonsObj.vignus, 65, itemsObj.life_Orb, abilitiesObj.no_Guard, null, true, [
            movesObj.stone_miss,
            movesObj.hurricane,
            movesObj.roost,
            movesObj.earthquake
          ]],
        ],
        reward: 0,
        eventKey: 'dawnSummoner',
        difficulty: 'optimalMove',
        defeated: false
      },
      {
        name: 'Richard', 
        team: [[pogemonsObj.tadtoxic, 17, null, null, null, null], [pogemonsObj.sturdle, 18, null, null, null, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/rangermale/rangermale.png',
        dialogue: "Careful not to get sand in your eyes!",
        reward: 200,
        beaten: false,
      },
      {
        name: 'Bugzzy', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:155}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bugman/bugman.png',
        dialogue: "OTHER MAP",
        reward: 100,
        beaten: false,
      },
      {
        name: 'Kim', 
        team: [],
        direction: {reach: {pos:{x:125, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "OTHER MAP",
        reward: 100,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'black_Belt',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'water_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'smooth_Rock',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/djed/djed.png",
        info: {
          looking: 'Left',
          faceToFace: false,
          direction: {reach: {pos:{x:16, y:16}, neg:{x:16, y:16}}}, 
          dialogue:
          [
            `You're looking for Keme town's gym leader?\n\nYeah, that would happen to be me! 8)`,
            `turn around to talk to ya? Nah.. \n\nIm way too hard for that..`,
            `Anyways, if you're looking to get beaten into a pulp and your remains\n\nscrapped by the vaultures, i'd be happy to be assist you in that venture!`,
            `I'll be waiting.`
          ],
          eventKey: 'djedMeeting'
        },
      },
    ],
    obstaclesInfo: [
      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:50}}},
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
        {pogemon: pogemonsObj.sturdle, lvls: [11, 15], odds: {min:1,max:80}, heldItem:{odds: 100, item: itemsObj.nugget}},
        {pogemon: pogemonsObj.formal, lvls: [12, 16], odds: {min:80,max:90}},
        {pogemon: pogemonsObj.earthsa, lvls: [20, 25], odds: {min:90,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, // grotto
    ],
    weather: null,
    trainers: [
      {
        name: 'Moses', 
        team: [[pogemonsObj.sparkust, 17, null, null, null, null], [pogemonsObj.grazzer, 23, null, null, null, null], [pogemonsObj.wettie, 24, null, null, null, null], [pogemonsObj.mower, 25, null, null, null, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\nIf you manage to defeat me, i'll let you have this old stick.\n\nIt'll guide you when the path ahead seems too dark to continue.",
        eventKey: 'mosesStaff',
        reward: 0,
        beaten: false,
      },
    ],
    items: [
      {
        name: 'toxic_Orb',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
    event: [
      {
        name: 'regaligyneEvo',
        sprite: "img/charSprites/blank/blank.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            "It seems like the first formal on your team is reacting to the jelly"
          ], 
          eventKey: 'regaligyneEvo'
        },
      },
    ]
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
        {pogemon: pogemonsObj.sturdle, lvls: [12, 16], odds: {min:1,max:30}},
        {pogemon: pogemonsObj.cobbird, lvls: [12, 16], odds: {min:30,max:50}},
        {pogemon: pogemonsObj.formal, lvls: [12, 16], odds: {min:50,max:65}},
        {pogemon: pogemonsObj.allingua, lvls: [13, 17], odds: {min:65,max:80}},
        {pogemon: pogemonsObj.venophibian, lvls: [15, 19], odds: {min:80,max:90}},
        {pogemon: pogemonsObj.spidathia, lvls: [12, 16], odds: {min:90,max:100}},
        
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:50}},
        {pogemon: pogemonsObj.venophibian, lvls: [15, 19], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.slimie, lvls: [15, 19], odds: {min:70,max:90}},
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
          direction: {reach: {pos:{x:20, y:0}, neg:{x:-20, y:40}}}, 
          dialogue:
          [
            `It's so dark up ahead, seems to be almost impossible to carry on without\n\na light source...`
          ],
        },
      },
    ],
    trainers: [
      {
        name: 'Emma', 
        team: [[pogemonsObj.flailegant, 18, null, null, null, null], [pogemonsObj.venophibian, 20, null, null, null, null]],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/rangerfemale/rangerfemale.png',
        dialogue: "They said it's dark in there, but I didint think i'd literaly need a light source to enter..",
        reward: 300,
        beaten: false,
      },
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'black_Sludge',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
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
        {pogemon: pogemonsObj.sturdle, lvls: [13, 16], odds: {min:1,max:30}}, 
        {pogemon: pogemonsObj.cobbird, lvls: [13, 16], odds: {min:30,max:50}},
        {pogemon: pogemonsObj.spidathia, lvls: [13, 16], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.nahass, lvls: [14, 17], odds: {min:70,max:89}},
        {pogemon: pogemonsObj.punbreakable, lvls: [16, 19], odds: {min:89,max:99}},
        {pogemon: pogemonsObj.psyranea, lvls: [20, 22], odds: {min:99,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, {name: 'sol_Path', spawnPosition: {x: -225, y: -100}}, 

      {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}}, {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}}, {name: 'luna_Mountain_Entrance', spawnPosition: {x: -350, y: -250}},
      
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/mortduxPortal.png",
        info: {
          looking: 'Down',
          name: 'mortdux',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.mortdux, [65,65], null, null, null, true, [
            movesObj.flash_cannon,
            movesObj.shadow_claw,
            movesObj.recover,
            movesObj.calm_mind
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-You can feel aura emminating from mortdux-"
          ], 
          eventKey: 'mortdux',
          faceToFace: false
        },
      },
    ],
    trainers: [
      {
        name: 'Caseoh', 
        team: [[pogemonsObj.cobbird, 22, null, null, null, null], [pogemonsObj.grazzer, 22, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:300}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/fatguy/fatguy.png',
        dialogue: "Can't really get around me, i get it...",
        reward: 1000,
        beaten: false
      },
      {
        name: 'Helena', 
        team: [[pogemonsObj.maaph, 24, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/hexmaniac/hexmaniac.png',
        dialogue: "Just say yes, i'm absolutely not trying to cast a spell on you.. :)",
        reward: 200,
        beaten: false
      },
      {
        name: 'Shwab', 
        team: [[pogemonsObj.nahass, 21, null, null, null, null], [pogemonsObj.punbreakable, 23, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:300}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/burglar/burglar.png',
        dialogue: "I.. Found a pair of shoes earlier, but i lost them...",
        reward: 0,
        beaten: false
      },
      {
        name: 'Cobber', 
        team: [[pogemonsObj.spidathia, 22, null, null, null, null], [pogemonsObj.sparkust, 22, null, null, null, null], [pogemonsObj.formal, 23, null, null, null, null],],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:300, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/burglar/burglar.png',
        dialogue: "I keep running into cobwebs... I kinda like it..",
        reward: 300,
        beaten: false
      },
      {
        name: 'npc', // summoner
        sprite: "img/charSprites/twilightsummoner/twilightsummoner.png",
        name: 'Lilly',
        looking: 'Down',
        direction: {reach: {pos:{x:80, y:0}, neg:{x:0, y:0}}}, 
        dialogue:
        [
          "I have a person to find within myself.\n\nFinding your soul is a never ending dream."
        ],
        eventKey: 'twilightSummoner',
        difficulty: 'optimalMove',
        team: [
          //                   lvl         item                    abili             shiny  ivs  move   gender
          [pogemonsObj.ouroboross, 57, itemsObj.rocky_Helmet, abilitiesObj.intimidate, null, true, [
            movesObj.gunk_shot,
            movesObj.crunch,
            movesObj.earthquake,
            movesObj.fart
          ]],
          [pogemonsObj.sophistaves, 59, itemsObj.expert_Belt, abilitiesObj.aerilate, null, true, [
            movesObj.moonblast,
            movesObj.boomburst,
            movesObj.earth_power,
            movesObj.roost
          ]],
          [pogemonsObj.maapheeno, 59, itemsObj.golden_banana, abilitiesObj.fluffy_Coat, null, true, [
            movesObj.calm_mind,
            movesObj.moonlight,
            movesObj.puppet_realm,
            movesObj.shadow_ball
          ]],
          [pogemonsObj.gelidatis, 60, itemsObj.choice_Specs, abilitiesObj.frozen_Soul, null, true, [
            movesObj.frost_breath,
            movesObj.psychic,
            movesObj.freeze_dry,
            movesObj.aura_sphere
          ]],
          [pogemonsObj.moldy, 61, itemsObj.leftovers, abilitiesObj.tripped_Out, null, true, [
            movesObj.giga_drain,
            movesObj.shadow_ball,
            movesObj.earth_power,
            movesObj.confuse_ray
          ]],
          [pogemonsObj.mortdux, 65, itemsObj.life_Orb, abilitiesObj.shadow_Tag, null, true, [
            movesObj.shadow_ball,
            movesObj.flash_cannon,
            movesObj.calm_mind,
            movesObj.recover
          ]],
        ],
        reward: 0,
        beaten: false
      },
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'super_Potion',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'heavy_Duty_Boots',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'rocky_Helmet',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
        {pogemon: pogemonsObj.formal, lvls: [15, 17], odds: {min:1,max:20}}, 
        {pogemon: pogemonsObj.wallafi, lvls: [15, 17], odds: {min:20,max:40}}, 
        {pogemon: pogemonsObj.piny, lvls: [15, 17], odds: {min:40,max:60}}, 
        {pogemon: pogemonsObj.cobbird, lvls: [15, 17], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.squiurus, lvls: [15, 17], odds: {min:80,max:95}},
        {pogemon: pogemonsObj.cheeto, lvls: [18, 20], odds: {min:95,max:100}},
      ],
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
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
        name: 'Adrien', 
        team: [[pogemonsObj.antber, 22, null, null, null, null, null], [pogemonsObj.cheeto, 22, null, null, null, null], [pogemonsObj.flamie, 24, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:200}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/firebreather/firebreather.png',
        dialogue: "Kinda hard to walk around me, i get it...",
        reward: 400,
        beaten: false
      },
      {
        name: 'npc', // summoner
        sprite: "img/charSprites/solsticesummoner/solsticesummoner.png",
        name: 'Patrick',
        looking: 'Down',
        direction: {reach: {pos:{x:0, y:0}, neg:{x:80, y:0}}}, 
        dialogue:
        [
          "I have so many places to see.\n\nThe cage that is this wingless body is far too limiting..."
        ],
        eventKey: 'solsticeSummoner',
        difficulty: 'optimalMove',
        team: [
          //                   lvl         item                    abili             shiny  ivs  move   gender
          [pogemonsObj.antber, 57, itemsObj.rocky_Helmet, abilitiesObj.intimidate, null, true, [
            movesObj.flamethrower,
            movesObj.crunch,
            movesObj.earthquake,
            movesObj.fart
          ]],
          [pogemonsObj.thunderhopper, 59, itemsObj.expert_Belt, abilitiesObj.technician, null, true, [
            movesObj.shock_wave,
            movesObj.struggle,
            movesObj.frost_breath,
            movesObj.thunder_wave
          ]],
          [pogemonsObj.kampgooroo, 59, itemsObj.golden_banana, abilitiesObj.iron_Fist, null, true, [
            movesObj.drain_punch,
            movesObj.thunder_punch,
            movesObj.ice_punch,
            movesObj.bulk_up
          ]],
          [pogemonsObj.cataclysmus, 60, itemsObj.leftovers, abilitiesObj.intimidate, null, true, [
            movesObj.fire_lash,
            movesObj.scald,
            movesObj.crunch,
            movesObj.heat_wave
          ]],
          [pogemonsObj.soleo, 62, itemsObj.heat_Rock, abilitiesObj.drought, null, true, [
            movesObj.flare_blitz,
            movesObj.head_smash,
            movesObj.earthquake,
            movesObj.crunch
          ]],
          [pogemonsObj.caera, 65, itemsObj.life_Orb, abilitiesObj.solar_Power, null, true, [
            movesObj.flamethrower,
            movesObj.thunderbolt,
            movesObj.aeroblast,
            movesObj.roost
          ]],
        ],
        reward: 0,
        beaten: false
      },
      {
        name: 'Bruce', 
        team: [[pogemonsObj.lokol, 27, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/blackbelt/blackbelt.png',
        dialogue: "I'm trying to train but this dude is just... drooling everywhere.....",
        reward: 0,
        beaten: false
      },
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'fire_Stone',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'choice_Specs',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'spicy_Berry',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'heat_Rock',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
      y: -1800
    },
    height: 72,
    width: 78,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.formal, lvls: [16, 19], odds: {min:1,max:30}}, 
        {pogemon: pogemonsObj.allingua, lvls: [16, 19], odds: {min:30,max:40}}, 
        {pogemon: pogemonsObj.piny, lvls: [16, 19], odds: {min:40,max:60}}, 
        {pogemon: pogemonsObj.squiurus, lvls: [16, 19], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.earthsa, lvls: [17, 20], odds: {min:80,max:90}},
        {pogemon: pogemonsObj.fruity, lvls: [20, 23], odds: {min:90,max:100}},
      ], 
      // water: [
      //   {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      // ]
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
      {
        name: 'npc',
        sprite: 'img/charSprites/maleathlete/maleathlete.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[`Hiking up the mountain without getting my head bit off\n\nis a pretty good workout!`], 
          looking: 'Down'
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/whitelady/whitelady.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:350}}}, 
          dialogue:[`I'm sorry young one, you'll need permission from\n\nour kukum to go up the mountain.\n\n\ni sence that you have a good heart,\n\ni trust i'll be letting you up soon.`], 
          waitingDialogue: [`I know it's only a matter of time until you get up there,\n\nbut you still need kukum's permission.\n\n\nThat is the way..`],
          permissionDialogue: [`I'm glad i was right, go right ahead young one.\n\n\nYour journey towards the truth is still only begining.`],
          looking: 'Down',
          eventKey: 'mousaCrestBlock'
        },
      },
    ],
    trainers: [
      {
        name: 'Alicia',
        team: [[pogemonsObj.furriticus, 22, null, null, null, null], [pogemonsObj.statikie, 24, null, null, null, null], [pogemonsObj.thunderhopper, 26, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:200}}},
        looking: 'Down', 
        sprite: 'img/charSprites/femaleacetrainer/femaleacetrainer.png',
        dialogue: "You'll be struggling with statik for a while after this!You'll be struggling with statik for a while after this!",
        reward: 750,
        beaten: false
      },
      {
        name: 'Hieronymus',
        team: [[pogemonsObj.sophistaves, 27, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:200}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: "img/charSprites/artist/artist.png",
        dialogue: "Ho.... the reaping of god's beautiful garden...",
        reward: 1500,
        beaten: false
      },
      {
        name: 'Quwill',
        team: [[pogemonsObj.cobbird, 23, null, null, null, null], [pogemonsObj.flailegant, 23, null, null, null, null], [pogemonsObj.adibis, 25, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:200}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/malebirdkeeper/malebirdkeeper.png',
        dialogue: "I tried to reach the highest peak, but this guy told me i wasnt allowed higher...\n\n\nI'm sure i'll manage to fly there one day... For sure for sure...",
        reward: 350,
        beaten: false
      },
      {
        name: 'Bradey',
        team: [[pogemonsObj.venophibian, 24, null, null, null, null], [pogemonsObj.piny, 22, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femalebreeder/femalebreeder.png',
        dialogue: "I'm looking for pogemon's to breed, what do you think about it? ;)",
        reward: 300,
        beaten: false
      },
      {
        name: 'Arman',
        team: [[pogemonsObj.squiurus, 22, null, null, null, null], [pogemonsObj.adibis, 23, null, null, null, null],],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:200}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/youngman3/youngman3.png',
        dialogue: "Hermes saved my sister once, i'll always be greatful for him!",
        reward: 300,
        beaten: false
      },
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'yellow_Berry',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'fairy_Feather',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'assault_Vest',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'elixir',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'life_Orb',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
      x: -575,
      y: -1000
    },
    height: 42,
    width: 72,
    encounters: {
    },
    changeMapLocations:[
      {name: 'kukum_House', spawnPosition: {x: 447, y: -370}},

      {name: 'homou_House', spawnPosition: {x: 447, y: -370}}, // house 2

      {name: 'thymatai_House', spawnPosition: {x: 447, y: -370}}, // house 3

      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}},
      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}}, {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}},
      {name: 'commandment_Road', spawnPosition: {x: -225, y: -500}},

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}},

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 
      
      {name: 'scribble_Town_Gym', spawnPosition: {x: 160, y: -1450}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/maleathlete/maleathlete.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[`Hiking up the mountain without getting my head bit off\n\nis a pretty good workout!`], 
          looking: 'Down'
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/ruinmaniac/ruinmaniac.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:[`This mountain face has been venerated for as long as\n\nthis village has existed.`], 
          muraleDialogue:[`Wow, what happend!? This murale has never glown like this before!\n\nI wonder what made all this happen.`],
          looking: 'Left',
          eventKey: 'muraleGuy'
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/malebirdkeeper/malebirdkeeper.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:['commandmant_Road NPC'], 
          looking: 'Down'
        },
      },
    ],
    trainers: [
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'spell_Tag',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'super_Revive',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'light_Clay',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
        team: [
          [pogemonsObj.salvulpis, 29, itemsObj.twisted_Spoon, abilitiesObj.frozen_Soul, null, null, [
            movesObj.frost_breath,
            movesObj.mystical_power,
            movesObj.mystical_fire,
            movesObj.calm_mind
          ]], 
          [pogemonsObj.wettie, 30, itemsObj.damp_Rock, null, true, null, [
            movesObj.surf,
            movesObj.recover,
            movesObj.aura_sphere,
            movesObj.rainy_day
          ]], 
          [pogemonsObj.contamitoad, 31, itemsObj.black_Sludge, abilitiesObj.liquid_Voice, null, null, [
            movesObj.extreme_speed,
            movesObj.poison_jab,
            movesObj.scald,
            movesObj.puddle_break
          ]],
          [pogemonsObj.thunderhopper, 30, itemsObj.expert_Belt, abilitiesObj.galvanize, null, null, [
            movesObj.thunder,
            movesObj.hurricane,
            movesObj.bug_buzz,
            movesObj.hydro_pump
          ]],
          [pogemonsObj.avorago, 34, itemsObj.life_Orb, abilitiesObj.drizzle, null, true, [
            movesObj.thunder,
            movesObj.hurricane,
            movesObj.bug_buzz,
            movesObj.hydro_pump
          ]],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:150}}},
        looking: 'Down', 
        sprite: "../../img/charSprites/hermes/hermes.png",
        dialogue: "I heard from my wife that you defeated her all the way back in fair town.\n\nI'm sure she tried to teach you as much as she could.\n\nLet me do the same.",
        reward: 2500,
        beaten: false,
        eventKey: 'hermesGym',
        gymLeader: {name: "hermes", num: 2}, 
        difficulty: 'gym',
      },
      {
        name: 'Saphir', 
        team: [[pogemonsObj.venophibian, 30, null, null, null, null], [pogemonsObj.sterra, 29, null, null, null, null],  [pogemonsObj.gelidatis, 33, null, null, null, null]],
        direction: {reach: {pos:{x:325, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/bluehairgirl/bluehairgirl.png',
        dialogue: "I've waited...",
        OWdialogue: "...",
        reward: 650,
        eventKey: 'hermesGymTrainer',
        beaten: false,
      },
      {
        name: 'Stza',
        team: [[pogemonsObj.furriticus, 29, null, null, null, null], [pogemonsObj.ouroboross, 30, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:500, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/bluepunk/bluepunk.png',
        dialogue: "We're the gang in blue!\n\nNo, not that one..",
        OWdialogue: "People call Saphir scary, but cousin Ruby is even worst!",
        reward: 0,
        eventKey: 'hermesGymTrainer',
        beaten: false,
      },
      {
        name: 'Quartz',
        team: [[pogemonsObj.adibis, 30, null, null, null, null], [pogemonsObj.sophistaves, 31, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:500}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bluehairwoman2/bluehairwoman2.png',
        dialogue: "Please, help her understand herself better..",
        OWdialogue: "Have you met my little sister yet?\n\nShe had a strong connection to pogemons ever since she was very little..\n\nHermes, our cousin, even took her as his pupil.\n\nShe grew to be strong and free, i'm proud of her for that.",
        reward: 600,
        eventKey: 'hermesGymTrainer',
        beaten: false,
      },
      {
        name: 'Ruby',
        team: [[pogemonsObj.aquario, 28, null, null, null, null], [pogemonsObj.fruity, 29, null, null, null, null]],
        direction: {reach: {pos:{x:500, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/bluehairwoman/bluehairwoman.png',
        dialogue: "Let me show you what i've got!\n\nYou're never gonna recover from this! >:)",
        OWdialogue: "The sister Saphir is.. Well, she's... great.. Haha..",
        reward: 550,
        eventKey: 'hermesGymTrainer',
        beaten: false,
      },
      {
        name: 'Hurley',
        team: [[pogemonsObj.tadtoxic, 28, null, null, null, null], [pogemonsObj.tadtoxic, 28, null, null, null, null], [pogemonsObj.venophibian, 27, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:200}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/bluehairsunglasses/bluehairsunglasses.png',
        dialogue: "They're small, but they pack a punch!",
        OWdialogue: "My bike fell in the water, so i'm stuck here now..",
        reward: 500,
        eventKey: 'hermesGymTrainer',
        beaten: false,
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  kukum_House:{
    seen: false,
    name: 'kukum_House',
    mapImg: './img/maps/kukum_House/kukum_House.png',
    FGImg: './img/maps/kukum_House/kukum_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'scribble_Town', spawnPosition: {x: -543, y: -350}}, {name: 'scribble_Town', spawnPosition: {x: -543, y: -350}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/whitelady/whitelady.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:
          [
            `I senced you since you stepped foot in the village,\n\nyou have my permission to climb the crest.`, 
            `Knowledge that something bad is coming and that\n\nnone of us can help it came to me.\n\n\nYou that is not of us, guide the light to it's meant place.`, 
            `If only all that gold could reflect something more than\n\njust empty light in the eyes of the people...`
          ],
          looking: 'Down',
          eventKey: 'kukumPermission'
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/oldman3/oldman3.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[`I raised the boy to be the strongest.....\n\nIf Hermes cannot prevent this we surely are all doomed!...`], 
          looking: 'Left',
        },
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  homou_House:{
    seen: false,
    name: 'homou_House',
    mapImg: './img/maps/homou_House/homou_House.png',
    FGImg: './img/maps/homou_House/homou_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'scribble_Town', spawnPosition: {x: -1118, y: -350}}, {name: 'scribble_Town', spawnPosition: {x: -1118, y: -350}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/pastelgirl/pastelgirl.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[
            `Hi, i'm Miss Homou.\n\n
            which pogemon would you like to rename?`
          ],
          looking: 'Down',
          eventKey: 'renamer'
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/wally/wally.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[
            `Hi, i'm Mister Homou.\n\n
            which pogemon would you like to remind a move to?`
          ],
          looking: 'Down',
          eventKey: 'relearner'
        },
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  thymatai_House:{
    seen: false,
    name: 'thymatai_House',
    mapImg: './img/maps/thymatai_House/thymatai_House.png',
    FGImg: './img/maps/thymatai_House/thymatai_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'scribble_Town', spawnPosition: {x: -1696, y: -350}}, {name: 'scribble_Town', spawnPosition: {x: -1696, y: -350}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/oldman2/oldman2.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[
            `I'm supposed to guide you towards the light, that i know of...\n\n
            Thought everyone seems to still be asleep..\n\n
            Come back and find me once the walls are illuminated.`
          ],
          dialoguePostGame:[
            `Back in my sailor days, i discovered a small island full of\n\nvery strong pogemons!\n\n\n
            It's somewhere south-west of here,\n\nyou should be able to teleport to it now.`
          ],
          dialoguePostIsland:[
            `Go ahead young one!\n\nDon't waste you're time with an old man like me! hahaha`
          ],
          looking: 'Right',
          eventKey: 'paccIsleGiver'
        },
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
      y: -1000
    },
    height: 38,
    width: 82,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.flailegant, lvls: [17, 20], odds: {min:1,max:25}},
        {pogemon: pogemonsObj.cobbird, lvls: [17, 20], odds: {min:25,max:50}},
        {pogemon: pogemonsObj.allingua, lvls: [17, 20], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.squiurus, lvls: [17, 20], odds: {min:70,max:90}},
        {pogemon: pogemonsObj.balancia, lvls: [20, 23], odds: {min:90,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}},
      {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}}, {name: 'commandment_Road', spawnPosition: {x: -325, y: -3100}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/hermes/hermes.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:[
            `You came looking for me at the beheast of my kukum?\n\n\nFor her to give you access to the crest means she sences\n\nsomething within you.`,
            `I'd be greatful to help you awaken the true potential dormant within you.\n\n\nI'll wait for that opportunity back in Scribble Town's Gym.`
          ], 
          looking: 'Left',
          eventKey: 'hermesMeeting',
          faceToFace: false
        },
      },
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/caeraPortal.png",
        info: {
          looking: 'Down',        
          name: 'caera',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.caera, [65,65], null, null, null, true, [
            movesObj.flamethrower,
            movesObj.thunderbolt,
            movesObj.dazzling_gleam,
            movesObj.roost
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-Caera unleashes a wild screesh!!-"
          ],
          eventKey: 'caera',
          faceToFace: false
        },
      },
      {
        name: 'Maria',
        sprite: 'img/charSprites/whitelady/whitelady.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:275}}}, 
          dialogue:[`I'm sorry young one, you'll need permission from our kukum to go up the mountain.\n\n\ni sence that you have a good heart, i trust i'll be letting you up soon.`], 
          waitingDialogue: [`I know it's only a matter of time only you get up there, but\n\nyou still nedd kukum's permission.\n\n\nThat is the way..`],
          permissionDialogue: [`I'm glad i was right, go right ahead young one.\n\n\nYour journey towards the truth is still only begining.`],
          looking: 'Down',
          eventKey: 'mousaCrestBlock'
        },
      },
    ],
    trainers: [
      {
        name: 'Mathilda', 
        team: [[pogemonsObj.spidathia, 23, null, null, null, null], [pogemonsObj.psyranea, 28, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:285}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/midagewoman/midagewoman.png',
        dialogue: "I got lonely.. So i made friends with the spiders! :)",
        reward: 350,
        beaten: false
      },
      {
        name: 'Wyrm', 
        team: [[pogemonsObj.jleech, 27, null, null, null, null], [pogemonsObj.jleech, 27, null, null, true, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:400}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/maledragontamer/maledragontamer.png',
        dialogue: "I've raised those twins since they were only small Jlissue's.",
        reward: 400,
        beaten: false
      },
      {
        name: 'Martin', 
        team: [[pogemonsObj.grassie, 24, null, null, null, null], [pogemonsObj.sterra, 27, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:200}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/youngman/youngman.png',
        dialogue: "I've left my home in fair town for a while now..\n\nI wonder how my dad is doing.",
        reward: 400,
        beaten: false
      },
      {
        name: 'Jah', 
        team: [[pogemonsObj.punbreakable, 25, null, null, null, null], [pogemonsObj.fruity, 25, null, null, null, null], [pogemonsObj.kampgooroo, 28, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:300}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/oldman1/oldman1.png',
        dialogue: "Gud tuh si yuh again!",
        reward: 350,
        beaten: false
      },
    ],
    obstaclesInfo: [
    ],
    items: [
      {
        name: 'rare_Candy',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'dragon_Fang',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
        {pogemon: pogemonsObj.piny, lvls: [21, 24], odds: {min:1,max:30}},
        {pogemon: pogemonsObj.fruity, lvls: [24, 27], odds: {min:30,max:50}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [21, 24], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.venophibian, lvls: [24, 27], odds: {min:70,max:80}},
        {pogemon: pogemonsObj.sparkust, lvls: [21, 24], odds: {min:80,max:97}},
        {pogemon: pogemonsObj.jlissue, lvls: [21, 24], odds: {min:97,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, 
      {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, {name: 'bellum_Way', spawnPosition: {x:-1175, y: -2285}}, 

      {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, 
      {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, {name: 'pearly_Path', spawnPosition: {x:-1100, y: -250}}, 
    ],
    trainers: [
      {
        name: 'Arden', 
        team: [[pogemonsObj.venophibian, 31, null, null, null, null], [pogemonsObj.fruity, 33, null, null, null, null], [pogemonsObj.sterra, 34, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/brownhatguy/brownhatguy.png',
        dialogue: "Starts to get pretty cold from now on..\n\n\nI hope you brought supplies with ya.",
        reward: 650,
        beaten: false
      },
      {
        name: 'Hazel', 
        team: [[pogemonsObj.adibis, 30, null, null, null, null], [pogemonsObj.sophistaves, 34, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:400, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/rangerfemale/rangerfemale.png',
        dialogue: "I've played in these woods since whole childhood,\n\nbeing a ranger just allowed me to keep doing it!.",
        reward: 550,
        beaten: false
      },
      {
        name: 'Luwis', 
        team: [[pogemonsObj.punbreakable, 31, null, null, null, null], [pogemonsObj.kampgooroo, 33, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "everybody waits to get the 3rd badge to get here.\n\n\ni just jumped across the water..\n\n\nwhat a bunch of nerds! haha 8)",
        reward: 600,
        beaten: false
      },
    ],
    items: [
      {
        name: 'yellow_Berry',
        amount: 10,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'choice_Scarf',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'elixir',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'rainbo_Berry',
        amount: 15,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],    
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/oldman2/oldman2.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          looking: 'Left',
        },
      },
    ],
    weather: null,
  },

  // bellum_Way
  bellum_Way:{
    seen: false,
    name: 'bellum_Way',
    mapImg: './img/maps/bellum_Way/bellum_Way.png',
    FGImg: './img/maps/bellum_Way/bellum_WayFG.png',
    spawnPosition: {
      x: -250,
      y: -1050
    },
    height: 42,
    width: 66,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.piny, lvls: [22, 26], odds: {min:1,max:30}},
        {pogemon: pogemonsObj.fruity, lvls: [22, 26], odds: {min:30,max:50}},
        {pogemon: pogemonsObj.tadtoxic, lvls: [22, 26], odds: {min:50,max:60}},
        {pogemon: pogemonsObj.venophibian, lvls: [22, 26], odds: {min:60,max:70}},
        {pogemon: pogemonsObj.adibis, lvls: [22, 26], odds: {min:70,max:80}},
        {pogemon: pogemonsObj.sparkust, lvls: [22, 26], odds: {min:80,max:97}},
        {pogemon: pogemonsObj.aquario, lvls: [24, 27], odds: {min:99,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [22, 26], odds: {min:1,max:50}},
        {pogemon: pogemonsObj.venophibian, lvls: [26, 29], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.adibis, lvls: [22, 26], odds: {min:70,max:90}},
        {pogemon: pogemonsObj.aquario, lvls: [24, 27], odds: {min:90,max:100}},
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-175, y: -2385}}, // icy cave

      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
    ],
    trainers: [
      {
        name: 'Arden', 
        team: [[pogemonsObj.venophibian, 31, null, null, null, null], [pogemonsObj.fruity, 33, null, null, null, null], [pogemonsObj.sterra, 34, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:400}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/brownhatguy/brownhatguy.png',
        dialogue: "I just teleported haha :)",
        reward: 650,
        beaten: false
      },
      {
        name: 'Pearl', 
        team: [[pogemonsObj.balancia, 31, null, null, null, null], [pogemonsObj.cheeto, 33, null, null, null, null], [pogemonsObj.earthsa, 32, null, null, null, null],],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/pastelgirl/pastelgirl.png',
        dialogue: "i'm trying not to get wet! I'll head home once the rain stops.",
        reward: 850,
        beaten: false
      },
      {
        name: 'npc', // summoner
        sprite: 'img/charSprites/dusksummoner/dusksummoner.png',
        name: 'Sophia',
        team: [
          //                       lvl         item                  abili          shiny ivs  move   gender
          [pogemonsObj.psyranea, 57, itemsObj.light_Clay, abilitiesObj.magic_Bounce, null, true, [
            movesObj.bug_buzz,
            movesObj.psychic,
            movesObj.reflect,
            movesObj.sticky_web
          ]],
          [pogemonsObj.avorago, 58, itemsObj.damp_Rock, abilitiesObj.drizzle, null, true, [
            movesObj.hurricane,
            movesObj.surf,
            movesObj.roost,
            movesObj.thunder
          ]],
          [pogemonsObj.tonifurr, 59, itemsObj.life_Orb, abilitiesObj.refrigirate, null, true, [
            movesObj.thunder,
            movesObj.boomburst,
            movesObj.earth_power,
            movesObj.volt_switch
          ]],
          [pogemonsObj.fruity, 60, itemsObj.eviolite, abilitiesObj.tripped_Out, null, true, [
            movesObj.spore,
            movesObj.confuse_ray,
            movesObj.leech_seed,
            movesObj.dream_eater
          ]],
          [pogemonsObj.contamitoad, 62, itemsObj.assault_Vest, abilitiesObj.liquid_Voice, null, true, [
            movesObj.sludge_bomb,
            movesObj.hydro_pump,
            movesObj.boomburst,
            movesObj.thunderous_kick
          ]],
          [pogemonsObj.papiens, 65, itemsObj.leftovers, abilitiesObj.magic_Bounce, null, true, [
            movesObj.giga_drain,
            movesObj.scald,
            movesObj.mystical_power,
            movesObj.calm_mind
          ]],
        ],
        direction: {reach: {pos:{x:80, y:0}, neg:{x:0, y:0}}}, 
        dialogue:[
          `I have such knowledge to acquire....\n\nA lifetime is only the beginning of gnosis.`
        ],
        reward: 0,
        looking: 'Left',
        eventKey: 'duskSummoner',
        difficulty: 'optimalMove',
        defeated: false
      },
      {
        name: 'Cuddy', 
        team: [[pogemonsObj.formal, 30, null, null, null, null], [pogemonsObj.mower, 34, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:600, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/kid/kid.png',
        dialogue: "I bet you didin't see me! hehe :p",
        reward: 550,
        beaten: false
      },
    ],
    items: [
      {
        name: 'damp_Rock',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'mystic_Water',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'spicy_Berry',
        amount: 15,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ], 
    weather: 'rain',
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
        {pogemon: pogemonsObj.sturdle, lvls: [23, 27], odds: {min:1,max:25}}, 
        {pogemon: pogemonsObj.punbreakable, lvls: [26, 29], odds: {min:25,max:40}},
        {pogemon: pogemonsObj.formal, lvls: [23, 27], odds: {min:40,max:60}},
        {pogemon: pogemonsObj.cobbird, lvls: [23, 27], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.furriticus, lvls: [23, 27], odds: {min:80,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
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

      {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, 
      {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, {name: 'bellum_Way', spawnPosition: {x:-95, y: -415}}, 
    ],
    weather: null,
    trainers: [
      {
        name: 'Tesla',
        team: [[pogemonsObj.furriticus, 31, null, null, null, null], [pogemonsObj.statikie, 34, null, null, null, null], [pogemonsObj.thunderhopper, 36, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:400}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/engineerguy/engineerguy.png',
        dialogue: "Starts to get pretty cold from now on..\n\n\nI hope you brought supplies with ya.",
        reward: 500,
        beaten: false
      },
      {
        name: 'Marty McFly',
        team: [[pogemonsObj.wallafi, 32, null, null, null, null], [pogemonsObj.purdustus, 33, null, null, null, null], [pogemonsObj.volaticus, 35, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:400}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/mcfly/mcfly.png',
        dialogue: "Doc fucking crashed the car, were stuck here bro.....",
        reward: 650,
        beaten: false
      },
      {
        name: 'Arden',
        team: [[pogemonsObj.venophibian, 31, null, null, null, null], [pogemonsObj.fruity, 33, null, null, null, null], [pogemonsObj.sterra, 34, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:400}, neg:{x:0, y:0}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/brownhatguy/brownhatguy.png',
        dialogue: "This can't still be funny, right?..",
        reward: 650,
        beaten: false
      },
      {
        name: 'Doc',
        team: [[pogemonsObj.fruity, 33, null, null, null, null], [pogemonsObj.antber, 35, null, null, null, null, null], [pogemonsObj.venophibian, 31, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/doc/doc.png',
        dialogue: "Idk why i look like this but i'm supposed to be the doc...\n\n\nHe wanted me to be there so whatever..\n\n\nI'm kinda drunk ngl.",
        reward: 0,
        beaten: false
      },
      {
        name: 'Clair',
        team: [[pogemonsObj.sophistaves, 36, null, null, null, null],  [pogemonsObj.balancia, 33, null, null, null, null], [pogemonsObj.psyranea, 34, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:400, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/purpleprof/purpleprof.png',
        dialogue: "I think those two guys are having a psychosis and\n\nthink they are rick and morty or something...\n\n\nI'm just here looking for fossils tbh..",
        reward: 700,
        beaten: false
      },
    ],
    items: [
      {
        name: 'nevermelt_ice',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'nugget',
        amount: 3,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'choice_Band',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
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
        {pogemon: pogemonsObj.sturdle, lvls: [25, 29], odds: {min:1,max:25}}, 
        {pogemon: pogemonsObj.punbreakable, lvls: [29, 32], odds: {min:25,max:40}},
        {pogemon: pogemonsObj.cobbird, lvls: [25, 29], odds: {min:40,max:60}}, 
        {pogemon: pogemonsObj.spidathia, lvls: [25, 29], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.furriticus, lvls: [25, 29], odds: {min:80,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-325, y: 115}}, {name: 'stasis_Cave', spawnPosition: {x:-325, y: 115}}, // top left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-2725, y: 40}}, {name: 'stasis_Cave', spawnPosition: {x:-2725, y: 40}}, // top right down ladder

      {name: 'stasis_Cave_Top_Level', spawnPosition: {x:-385, y: -185}}, // top right up ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3350, y: -885}}, {name: 'stasis_Cave', spawnPosition: {x:-3350, y: -885}}, // top middle left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-805, y: -1815}}, {name: 'stasis_Cave', spawnPosition: {x:-805, y: -1815}}, // bottom left down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3040, y: -1885}}, {name: 'stasis_Cave', spawnPosition: {x:-3040, y: -1885}}, // bottom right 1 down ladder

      {name: 'stasis_Cave', spawnPosition: {x:-3425, y: -1955}}, {name: 'stasis_Cave', spawnPosition: {x:-3425, y: -1955}}, // bottom right 2 down ladder
      
      {name: 'stasis_Cave_Top_Level', spawnPosition: {x:-512, y: -1885}}, // bottom right up ladder

      {name: 'stasis_Cave', spawnPosition: {x:-1250, y: -2285}}, {name: 'stasis_Cave', spawnPosition: {x:-1250, y: -2285}}, // middle down ladder

      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
      {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, {name: 'revelation_Road', spawnPosition: {x:-1150, y: -100}}, 
    ],
    weather: null,
    trainers: [
      {
        name: 'Piker',
        team: [[pogemonsObj.mower, 40, null, null, null, null], [pogemonsObj.punbreakable, 38, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:400}, neg:{x:0, y:0}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "Don't get lost kid, there's still a good way before\n\nyou're out of this cave.",
        reward: 750,
        beaten: false
      },
      {
        name: 'Geranthine',
        team: [[pogemonsObj.earthsa, 40, null, null, null, null], [pogemonsObj.avorago, 38, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/oldlady/oldlady.png',
        dialogue: "You made it!\n\nI always believed in you dear. <3",
        reward: 1000,
        beaten: false
      },
      {
        name: 'Spritz',
        team: [[pogemonsObj.sterra, 39, null, null, null, null], [pogemonsObj.antber, 39, null, null, null, null, null]],
        direction: {reach: {pos:{x:400, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/femaleathlete/femaleathlete.png',
        dialogue: "They still don't like each other at all..",
        reward: 800,
        beaten: false
      },
      {
        name: 'Elizabeth',
        team: [[pogemonsObj.volaticus, 43, null, null, null, null], [pogemonsObj.purdustus, 39, null, null, null, null], [pogemonsObj.furriticus, 39, null, null, null, null], [pogemonsObj.moldy, 38, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:400}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/artist2/artist2.png',
        dialogue: "How facinating, the polarities of life and death...",
        reward: 900,
        beaten: false
      },
    ],
    items: [
      {
        name: 'mega_Potion',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'nugget',
        amount: 3,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'golden_Banana',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'megaball',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ], 
  },
  stasis_Cave_Lower_Level:{
    seen: false,
    name: 'stasis_Cave_Lower_Level',
    mapImg: './img/maps/stasis_Cave_Lower_Level/stasis_Cave_Lower_Level.png',
    FGImg: './img/maps/stasis_Cave_Lower_Level/stasis_Cave_Lower_LevelFG.png',
    spawnPosition: {
      x: -150,
      y: -850
    },
    height: 61,
    width: 52,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.sturdle, lvls: [24, 28], odds: {min:1,max:25}}, 
        {pogemon: pogemonsObj.punbreakable, lvls: [27, 30], odds: {min:25,max:40}},
        {pogemon: pogemonsObj.cobbird, lvls: [24, 28], odds: {min:40,max:60}}, 
        {pogemon: pogemonsObj.spidathia, lvls: [24, 28], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.furriticus, lvls: [24, 28], odds: {min:80,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave', spawnPosition: {x:-2432, y: -115}}, // legendary cave
      
      {name: 'stasis_Cave', spawnPosition: {x:-1856, y: -415}}, // entrance

      {name: 'stasis_Cave', spawnPosition: {x:-2815, y: -2475}}, // exit
    ],
    weather: null,
    trainers: [
      {
        name: 'Kurt',
        team: [[pogemonsObj.aquario, 31, null, null, null, null], [pogemonsObj.jlissue, 33, null, null, null, null], [pogemonsObj.tonifurr, 36, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:600, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/guitarist/guitarist.png',
        dialogue: "No ghost pogemon joke i swear.",
        reward: 850,
        beaten: false
      },
      {
        name: 'Cromagnon',
        team: [[pogemonsObj.infragice, 38, null, null, null, null], [pogemonsObj.rockwil, 33, null, null, null, null], ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:900}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/oogabooga/oogabooga.png',
        dialogue: "BOUGABOUGA!\n\nNOOTNOOT!\n\nOOUGABOOUGA!\n\nWOMPWOMP!",
        reward: 0,
        beaten: false
      },
    ],
    items: [
      {
        name: 'super_Elixir',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'focus_Sash',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'super_Revive',
        amount: 3,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],
    event: [
      {
        name: 'iceRock',
        sprite: "img/charSprites/blank/blank.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            "You can fell the cold eminating from the rock without even touching it."
          ],
          eventKey: 'iceRock'
        },
      },
      {
        name: 'iceRock',
        sprite: "img/charSprites/blank/blank.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            "You can fell the cold eminating from the rock without even touching it."
          ],
          eventKey: 'iceRock'
        },
      },
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/papiensPortal.png",
        info: {
          looking: 'Down',
          name: 'papiens',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.papiens, [65,65], null, null, null, true, [
            movesObj.scald,
            movesObj.mystical_power,
            movesObj.aura_sphere,
            movesObj.calm_mind
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-It's as if papiens was telling you something telepathicaly-"
          ],
          eventKey: 'papiens',
          faceToFace: false
        },
      },
    ],
  },
  stasis_Cave_Top_Level:{
    seen: false,
    name: 'stasis_Cave_Top_Level',
    mapImg: './img/maps/stasis_Cave_Top_Level/stasis_Cave_Top_Level.png',
    FGImg: './img/maps/stasis_Cave_Top_Level/stasis_Cave_Top_LevelFG.png',
    spawnPosition: {
      x: -250,
      y: -850
    },
    height: 47,
    width: 42,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.sturdle, lvls: [26, 32], odds: {min:1,max:35}}, 
        {pogemon: pogemonsObj.punbreakable, lvls: [29, 33], odds: {min:35,max:50}},
        {pogemon: pogemonsObj.infragice, lvls: [32, 36], odds: {min:50,max:51}},
        {pogemon: pogemonsObj.spidathia, lvls: [26, 32], odds: {min:51,max:80}},
        {pogemon: pogemonsObj.psyranea, lvls: [29, 33], odds: {min:80,max:81}},
        {pogemon: pogemonsObj.furriticus, lvls: [26, 32], odds: {min:81,max:95}},
        {pogemon: pogemonsObj.salvulpis, lvls: [27, 31], odds: {min:95,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3230, y: -255}}, {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3230, y: -255}}, // exit
      
      {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3360, y: -2235}}, {name: 'stasis_Cave_Upper_Level', spawnPosition: {x:-3360, y: -2235}}, // entrance
    ],
    weather: null,
    trainers: [
      {
        name: 'Mom Boucher',
        team: [[pogemonsObj.ouroboross, 38, null, null, null, null], [pogemonsObj.antber, 38, null, null, null, null, null,], [pogemonsObj.kampgooroo, 39, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:600, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/bikerguy/bikerguy.png',
        dialogue: "Some dude from the scribble town gym stole my bike..\n\n\nIf i see this motherfucker again i'll rip his head off!",
        reward: 1200,
        beaten: false
      },
      {
        name: 'Lavender',
        team: [[pogemonsObj.maaphett, 35, null, null, null, null], [pogemonsObj.psyranea, 42, null, null, null, null], [pogemonsObj.contamitoad, 43, null, null, null, null]],
        direction: {reach: {pos:{x:600, y:0}, neg:{x:0, y:0}}},
        looking: 'Left', 
        sprite: '../../img/charSprites/purplehairgirl/purplehairgirl.png',
        dialogue: "Don't think you're done quite yet.\n\nI'll make sure you don't progress further!",
        reward: 1000,
        beaten: false
      },
    ],
    items: [
      {
        name: 'nugget',
        amount: 10,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
  },

  // ascension_Path
  ascension_Path:{
    seen: false,
    name: 'ascension_Path',
    mapImg: './img/maps/ascension_Path/ascension_Path.png',
    FGImg: './img/maps/ascension_Path/ascension_PathFG.png',
    spawnPosition: {
      x:-2175,
      y: -2185
    },
    height: 52,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.sturdle, lvls: [28, 33], odds: {min:1,max:35}}, 
        {pogemon: pogemonsObj.punbreakable, lvls: [30, 34], odds: {min:35,max:45}},
        {pogemon: pogemonsObj.cobbird, lvls: [28, 33], odds: {min:45,max:55}},
        {pogemon: pogemonsObj.furriticus, lvls: [28, 33], odds: {min:55,max:85}}, 
        {pogemon: pogemonsObj.salvulpis, lvls: [29, 33], odds: {min:85,max:95}},
        {pogemon: pogemonsObj.jlissue, lvls: [28, 33], odds: {min:95,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  
      {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  {name: 'alquima_Town', spawnPosition: {x:-2400, y: -2255}},  

      {name: 'stasis_Cave', spawnPosition: {x:-3165, y: -50}}, {name: 'stasis_Cave', spawnPosition: {x:-3165, y: -50}}, 
    ],
    trainers: [
      {
        name: 'Bertha',
        team: [[pogemonsObj.balancia, 39, null, null, null, null], [pogemonsObj.antber, 38, null, null, null, null, null], [pogemonsObj.avorago, 44, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:600, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/whitelady/whitelady.png',
        dialogue: "To have made it this far means you are strong.\n\n\nBeating me is the rite required to pass\n\nto walk the grounds of alquima.",
        reward: 1750,
        beaten: false
      },
      {
        name: 'Ophelia',
        team: [[pogemonsObj.furriticus, 38, null, null, null, null], [pogemonsObj.salvulpis, 38, null, null, null, null], [pogemonsObj.rockwil, 42, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:450}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/pastelgirl/pastelgirl.png',
        dialogue: "This snow here is lovely.\n\n\nAnd it's hot enought not to be cold,\n\nbut cold enought not to be hot!",
        reward: 1050,
        beaten: false
      },
      {
        name: 'Meowth',
        team: [[pogemonsObj.purdustus, 41, null, null, null, null], [pogemonsObj.grassie, 43, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:500}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/meowth/meowth.png',
        dialogue: "Wtf am i doing here?\n\n\nI'm definetly in the wrong game...\n\n\nHow am i supposed to get back home? ;-;",
        reward: 0,
        beaten: false
      },
    ],
    items: [
      // {
      //   name: 'mega_Revive',
      //   amount: 6,
      //   direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
      //   pickedUp: false,
      //   hidden: true
      // },
      // {
      //   name: 'mega_Potion',
      //   amount: 12,
      //   direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
      //   pickedUp: false,
      //   hidden: true
      // },
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/sustirisPortal.png",
        info: {
          looking: 'Down',
          name: 'sustiris',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.sustiris, [75,75], null, null, null, true, [
            movesObj.giga_drain,
            movesObj.blizzard,
            movesObj.earth_power,
            movesObj.leech_seed
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-Sustiris looks at you in panic-"
          ], 
          eventKey: 'sustiris',
          faceToFace: false
        },
      },
    ],
    weather: 'snow'
  },

  // alquima_Town
  alquima_Town:{
    seen: false,
    name: 'alquima_Town',
    mapImg: './img/maps/alquima_Town/alquima_Town.png',
    FGImg: './img/maps/alquima_Town/alquima_TownFG.png',
    spawnPosition: {
      x: -1175,
      y: -750
    },
    height: 52,
    width: 70,
    encounters: {},
    changeMapLocations:[
      {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, 
      {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}}, {name: 'end_Trail', spawnPosition: {x:-295, y: -2100}},

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}},

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}},

      {name: 'amator_House', spawnPosition: {x: 440, y: -175}},
      
      {name: 'duellum_House', spawnPosition: {x: 440, y: -175}},

      {name: 'set_House', spawnPosition: {x:320, y: -375}},

      {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}},
      {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}}, {name: 'ascension_Path', spawnPosition: {x:-2400, y: -155}},
    ],
    weather: null,
    trainers: [
    ],
    items: [
    ],
    weather: 'snow'
  },
  amator_House:{
    seen: false,
    name: 'amator_House',
    mapImg: './img/maps/amator_House/amator_House.png',
    FGImg: './img/maps/amator_House/amator_HouseFG.png',
    spawnPosition: {
      x: 120,
      y: -0
    },
    height: 12,
    width: 16,
    encounters: {},
    trainers: [
      {
        name: 'Amator',
        team: [
//          pogemon           lvl  item  abili shiny  ivs    move gender nature
          // [pogemonsObj.formal, 1, null, null, null, null], 
          // [pogemonsObj.formal, 1, null, null, null, null],
          // [pogemonsObj.formal, 1, null, null, null, null],
          // [pogemonsObj.formal, 1, null, null, null, null],
          // [pogemonsObj.antber, 1, itemsObj.expert_Belt, null, null, null, [
          //   movesObj.flamethrower,
          //   movesObj.bug_buzz,
          //   movesObj.tail_glow,
          //   movesObj.earth_power
          // ], 'male'],
          [pogemonsObj.regaligyne, 1, itemsObj.wakeo_Berry, abilitiesObj.queen_Lair, null, null, [
            movesObj.poison_powder,
            movesObj.rest,
            movesObj.protect,
            movesObj.aura_sphere
          ], 'female'],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:50}}},
        looking: 'Down', 
        difficulty: 'gym',
        sprite: '../../img/charSprites/bugman/bugman.png',
        dialogue: [`The secrets of the queen shall never be revealed!! 0.O\n\nWell ok, i might tell you.. uwu\n\nBut first, you need to defeat me!! >:)`],
        reward: 0,
        beaten: false,
        eventKey: 'reginaEscaGiver'
      },
    ],
    changeMapLocations:[
      {name: 'alquima_Town', spawnPosition: {x:-165, y: -1685}},{name: 'alquima_Town', spawnPosition: {x:-165, y: -1685}},
    ]
  },
  duellum_House:{
    seen: false,
    name: 'duellum_House',
    mapImg: './img/maps/duellum_House/duellum_House.png',
    FGImg: './img/maps/duellum_House/duellum_HouseFG.png',
    spawnPosition: {
      x: 50,
      y: 0
    },
    height: 12,
    width: 16,
    encounters: {},
    changeMapLocations:[
      {name: 'alquima_Town', spawnPosition: {x:-1500, y: -1825}},{name: 'alquima_Town', spawnPosition: {x:-1500, y: -1825}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/juggler/juggler.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:[`What TM's will you be buying today?\n\nOr maybe you're here to sell me something?`], 
          looking: 'Down',
          eventKey: 'Tms',
          shopKey: 4
        },
      },
      {
        name: 'npc',
        sprite: 'img/charSprites/juggler2/juggler2.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:[`What battle items will you be buying today?\n\nOr maybe you're here to sell me something?`], 
          looking: 'Down',
          eventKey: 'battleItems',
          shopKey: 5
        },
      },
    ],
  },
  set_House:{
    seen: false,
    name: 'set_House',
    mapImg: './img/maps/set_House/set_House.png',
    FGImg: './img/maps/set_House/set_HouseFG.png',
    spawnPosition: {
      x: 100,
      y: -150
    },
    height: 16,
    width: 24,
    encounters: {},
    changeMapLocations:[
      {name: 'alquima_Town', spawnPosition: {x:-930, y: -2015}},{name: 'alquima_Town', spawnPosition: {x:-930, y: -2015}},
    ],
    items: [
      {
        name: 'charcoal',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'nugget',
        amount: 5,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'spell_Tag',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'silver_Powder',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/whiteelder/whiteelder.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:[
            `I welcome you back.\n\n\nNow that we're here, let's get to the important matter.\n\nThere are these 4 items that i've lended to some trainers.\n\nI'll need you to go fetch them for me.`, 
            `You'll probably have to defeat them in order to get these items back,\n\nso prepare accordingly.\n\n\nThere trainers are hiding, you'll have to find them yourself.`,
            `I'll bestow this gift upon you to make this task a bit me realistic for you.`
          ], 
          fourcrystalwaiting:[
            `You're here, but you havent brought back all of my gems?\n\nThen what are you doing here? Get back to it!`
          ],
          fourcrystalgive:[
            `Wait, you really managed to get them back!\n\nI cannot believe the day has come... FINALLY!! HAHA.. ha..`,
            `Well, hmmmm.. I hmm.. I greatly appreciated your help.\n\nNow give those to me!`,
            `-The old man magically fuses all gems together-\n\n-the energy in the room starts to give you chills-`,
            `I'll only need you for one last thing.`,
          ],
          corruptGemDialogue:[
            `Carry this, i'll need my energy balaced before it happens.\n\n\nThe gem holds too much for me to handle and be stable at the same time.\n\n\nNow, come and meet me at the peak of mount transit.`
          ],
          itemsDialogue:[`This will allow you to travel the region in an instant.\n\nCome back to me once you have fetched all 4 items.`],
          looking: 'Down',
          eventKey: 'setHouse'
        },
      },
    ],
  },

  // end_Trail
  end_Trail:{
    seen: false,
    name: 'end_Trail',
    mapImg: './img/maps/end_Trail/end_Trail.png',
    FGImg: './img/maps/end_Trail/end_TrailFG.png',
    spawnPosition: {
      x:-475,
      y: -2285
    },
    height: 52,
    width: 84,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.cobbird, lvls: [29, 34], odds: {min:1,max:25}},
        {pogemon: pogemonsObj.nahass, lvls: [29, 34], odds: {min:25,max:50}},
        {pogemon: pogemonsObj.ouroboross, lvls: [34, 37], odds: {min:50,max:55}},
        {pogemon: pogemonsObj.furriticus, lvls: [29, 34], odds: {min:55,max:80}}, 
        {pogemon: pogemonsObj.salvulpis, lvls: [30, 35], odds: {min:80,max:95}},
        {pogemon: pogemonsObj.jlissue, lvls: [29, 34], odds: {min:95,max:100}},
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
    trainers: [
      {
        name: 'Phelps',
        team: [[pogemonsObj.aquario, 41, null, null, null, null], [pogemonsObj.venophibian, 43, null, null, null, null], [pogemonsObj.avorago, 45, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:450}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/maleswimmer/maleswimmer.png',
        dialogue: "Can't a man swim in the snow without people glaring!?\n\n\nJesus.....",
        reward: 2000,
        beaten: false
      },
      {
        name: 'Ocean',
        team: [[pogemonsObj.balancia, 43, null, null, null, null], [pogemonsObj.gelidatis, 46, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:450}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/femalepsychic/femalepsychic.png',
        dialogue: "As one...",
        reward: 1500,
        beaten: false
      },
      {
        name: 'Andromeda',
        team: [[pogemonsObj.balancia, 43, null, null, null, null], [pogemonsObj.psyranea, 46, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:450}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/malepsychic/malepsychic.png',
        dialogue: "As one...",
        reward: 1500,
        beaten: false
      },
      {
        name: 'Bardy',
        team: [[pogemonsObj.punbreakable, 39, null, null, null, null], [pogemonsObj.antber, 41, null, null, null, null, null], [pogemonsObj.mower, 41, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:450}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/blackbelt/blackbelt.png',
        dialogue: "I train barefoot in the snow,\n\njust like my pogemons!",
        reward: 1200,
        beaten: false
      },
    ],
    items: [
      {
        name: 'super_Elixir',
        amount: 3,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'super_Repel',
        amount: 25,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'nugget',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],
    event: [
      {
        name: 'malumtehk',
        sprite: "img/charSprites/ma'at/ma'at.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            "-malumtehk intensly wants to make you stop existing-"
          ], 
          eventKey: 'malumtehk'
        },
      },
    ],
    weather: 'snow',
  },

  // transit_Peak
  transit_Peak:{
    seen: false,
    name: 'transit_Peak',
    mapImg: './img/maps/transit_Peak/transit_Peak.png',
    FGImg: './img/maps/transit_Peak/transit_PeakFG.png',
    spawnPosition: {
      x: -175,
      y: -2185
    },
    height: 52,
    width: 58,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.cobbird, lvls: [30, 35], odds: {min:1,max:35}}, 
        {pogemon: pogemonsObj.rockwil, lvls: [35, 39], odds: {min:35,max:40}},
        {pogemon: pogemonsObj.furriticus, lvls: [30, 35], odds: {min:40,max:75}},
        {pogemon: pogemonsObj.salvulpis, lvls: [30, 35], odds: {min:70,max:85}},
        {pogemon: pogemonsObj.jlissue, lvls: [30, 35], odds: {min:85,max:99}},
        {pogemon: pogemonsObj.skopt, lvls: [32, 37], odds: {min:99,max:100}},
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'neo_Genesis', spawnPosition: {x:-1315, y: -1925}, eventKey: 'neoGenesisPortal'}, 

      {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, {name: 'end_Trail', spawnPosition: {x:-3225, y: -125}}, 
    ],
    trainers: [
      {
        name: "Kah'nu",
        team: [[pogemonsObj.aquario, 44, null, null, null, null], [pogemonsObj.avorago, 46, null, null, null, null], [pogemonsObj.cataclysmus, 50, null, null, null, null], [pogemonsObj.soleo, 49, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:150}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/greenhairgirl2/greenhairgirl2.png',
        dialogue: "Things come and go, all we can do for ourselves\n\nis to fullfil the duties of the heart.",
        reward: 2500,
        eventKey: 'goldenDiskGiver',
        beaten: false
      },
      {
        name: "Yol'ne",
        team: [[pogemonsObj.earthsa, 43, null, null, null, null], [pogemonsObj.contamitoad, 46, null, null, null, null], [pogemonsObj.rockwil, 47, null, null, null, null],  [pogemonsObj.ferusand, 49, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:475}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/greenhairguy/greenhairguy.png',
        dialogue: "Some weird corrupted new species of pogemon started appearing around here..\n\n\nKah'nu has only got stronger through all the confusion.\n\n\nHer poise is commendable.",
        reward: 2000,
        beaten: false
      },
      {
        name: "Que'fi",
        team: [[pogemonsObj.sterra, 44, null, null, null, null], [pogemonsObj.sophistaves, 46, null, null, null, null], [pogemonsObj.jlorox, 47, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:450, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/greenhairgirl/greenhairgirl.png',
        dialogue: "These mountains have been sacred to us for centuries..\n\n\nThings have never been has unstable has they are now..",
        reward: 2250,
        beaten: false
      },
      {
        name: "Nee'ya",
        team: [[pogemonsObj.mower, 42, null, null, null, null], [pogemonsObj.volaticus, 44, null, null, null, null], [pogemonsObj.jleenex, 45, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:450}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/greenhairgirl3/greenhairgirl3.png',
        dialogue: "Everything is weird with this mountain top!\n\nThe snow stopped falling, and now a portal!?\n\n",
        reward: 2000,
        beaten: false
      },
    ],
    items: [
      {
        name: 'ultimball',
        amount: 1,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'rainbo_Berry',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'mega_Potion',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
      {
        name: 'megaball',
        amount: 6,
        direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}},
        pickedUp: false,
        hidden: false
      },
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/whiteelder/whiteelder.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue: [
            `Well met traveler, you must have been the one i was expecting.\n\n
            I knew the day would come when you'd step foot on this mountain.\n\n
            Your role is still yer undecided, meet me back at my lodge,\nthere i'll give you a simple task.`
          ],
          preTransformationDialogue: [
            `Now, give me the gem!\n\nI'd advise not to follow me into the portal..`,
            `If you're wise enought not to do so, please keep in mind that it will\n\nnot prevent your death, but only prolong it! HAHAHAHA`,
          ],
          postTransformation: [
            `This feeling!!! hahahahahah\n\nHo how i want to see you step in that portal and face me now!`,
            `Now step in you child, step in and see who fate's chosen truly is! hahahaha`
          ],
          looking: 'Right',
          eventKey: 'setFirstMeet'
        },
      },
      {
        name: 'portal',
        sprite: "img/charSprites/ma'at/ma'at.png",
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            "-malumtehk intensly wants to make you stop existing-"
          ], 
          eventKey: 'malumtehk'
        },
      },
    ],
    weather: null,
  },

  // neo_Genesis
  neo_Genesis:{
    seen: false,
    name: 'neo_Genesis',
    mapImg: './img/maps/neo_Genesis/neo_Genesis.png',
    FGImg: './img/maps/neo_Genesis/neo_GenesisFG.png',
    spawnPosition: {
      x:-1250,
      y:-285
    },
    height: 52,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.nahass, lvls: [32, 38], odds: {min:1,max:40}}, 
        {pogemon: pogemonsObj.ouroboross, lvls: [39, 43], odds: {min:40,max:50}},
        {pogemon: pogemonsObj.skopt, lvls: [34, 39], odds: {min:50,max:100}}
      ], 
      water: [
        // {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
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
      {
        name: "Set",
        team: [
          //                       lvl         item                  abili             shiny  ivs  move   gender
          [pogemonsObj.ouroboross, 61, itemsObj.black_Sludge, abilitiesObj.intimidate, true, true, [
            movesObj.knock_off,
            movesObj.sucker_punch,
            movesObj.gunk_shot,
            movesObj.taunt
          ]],
          [pogemonsObj.steevil, 63, itemsObj.leftovers, abilitiesObj.levitate, true, true, [
            movesObj.shift_gear,
            movesObj.earthquake,
            movesObj.iron_head,
            movesObj.dark_pulse
          ]],
          [pogemonsObj.ferusand, 65, itemsObj.choice_Band, abilitiesObj.sand_Force, true, true, [
            movesObj.rock_slide,
            movesObj.earthquake,
            movesObj.iron_head,
            movesObj.crunch
          ]],
          [pogemonsObj.cataclysmus, 65, itemsObj.choice_Specs, abilitiesObj.intimidate, true, true, [
            movesObj.fire_miss,
            movesObj.flamethrower,
            movesObj.surf,
            movesObj.hydro_pump
          ]],
          [pogemonsObj.yaldabaoth, 67, itemsObj.expert_Belt, abilitiesObj.contrary, true, true, [
            movesObj.overheat,
            movesObj.leaf_storm,
            movesObj.psycho_boost,
            movesObj.draco_meteor
          ]],
          [pogemonsObj.malumtehk, 70, itemsObj.assault_Vest, abilitiesObj.scrappy, null, true, [
            movesObj.drain_punch,
            movesObj.knock_off,
            movesObj.crunch,
            movesObj.close_Combat
          ]],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:150}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/endelder/endelder.png',
        dialogue: "You might be the biggest treat before i end this world,\n\nremember how pathetic the rest humanity is\n\nonce your soul starts to rot! hahaha",
        reward: 0,
        eventKey: 'setFinalBoss',
        beaten: false,
        difficulty: 'optimalMove'
      },
    ],
    items: [
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/malumtehkPortal.png",
        info: {
          looking: 'Down',
          name: 'malumtehk',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.malumtehk, [75,75], null, null, null, true, [
            movesObj.knock_off,
            movesObj.crunch,
            movesObj.drain_punch,
            movesObj.bulk_up
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-malumtehk intends on destroying you-"
          ], 
          eventKey: 'malumtehk',
          faceToFace: false
        },
      },
    ]
  },

  // post game

  key_Town:{
    seen: false,
    name: 'key_Town',
    mapImg: './img/maps/key_Town/key_Town.png',
    FGImg: './img/maps/key_Town/key_TownFG.png',
    spawnPosition: {
      x: -1247,
      y: -1250
    },
    height: 60,
    width: 70,
    encounters: {},
    changeMapLocations:[
      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}}, 

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 

      {name: 'hermes_House', spawnPosition: {x: 447, y: -370}},

      {name: 'darwin_House', spawnPosition: {x: 447, y: -370}}, // house 2

      {name: 'anemelos_House', spawnPosition: {x: 447, y: -370}}, // house 3

      {name: 'ghost_Woods', spawnPosition: {x:-1275, y:-225,}},
      {name: 'ghost_Woods', spawnPosition: {x:-1275, y:-225,}},
      {name: 'ghost_Woods', spawnPosition: {x:-1275, y:-225,}},
      {name: 'ghost_Woods', spawnPosition: {x:-1275, y:-225,}},
      {name: 'ghost_Woods', spawnPosition: {x:-1275, y:-225,}},
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    trainers:[
      {
        name: 'Hermes', // final boss
        team: [
          //     pogemon        lvl         item                   abili             shiny  ivs move gender nature
          [pogemonsObj.harmonium, 75, itemsObj.light_Clay, abilitiesObj.magic_Bounce, null, true, [
            movesObj.reflect,
            movesObj.light_screen,
            movesObj.stealth_rock,
            movesObj.volt_switch
          ]], 
          [pogemonsObj.contamitoad, 76, itemsObj.black_Sludge, abilitiesObj.liquid_Voice, null, true,[
            movesObj.substitute,
            movesObj.boomburst,
            movesObj.sludge_bomb,
            movesObj.puddle_break
          ]], 
          [pogemonsObj.jleenex, 77, itemsObj.life_Orb, abilitiesObj.thicc_Fat, null, true, [
            movesObj.dragon_claw,
            movesObj.play_rought,
            movesObj.moonblast,
            movesObj.dragon_dance
          ]], 
          [pogemonsObj.godlie, 78, itemsObj.yellow_Berry, abilitiesObj.slimie_regeneration, null, true, [
            movesObj.aura_sphere,
            movesObj.boomburst,
            movesObj.shadow_ball,
            movesObj.calm_mind
          ]],
          [pogemonsObj.avorago, 79, itemsObj.damp_Rock, abilitiesObj.drizzle, null, true, [
            movesObj.hurricane,
            movesObj.thunder,
            movesObj.volt_switch,
            movesObj.roost
          ]],
          [pogemonsObj.dahgua, 85, itemsObj.expert_Belt, abilitiesObj.adaptability, null, true, [
            movesObj.recover,
            movesObj.calm_mind,
            movesObj.surf,
            movesObj.earth_power
          ]],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:50}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/hermes/hermes.png',
        dialogue: 
          `It's been a while since our last fight,\n\n
          let's see how far you've come!`,
        difficulty: 'optimalMove',
        eventKey: 'hermesFinalBoss',
        reward: 5000,
        beaten: false
      },
    ],
    weather: null
  },
  hermes_House:{
    seen: false,
    name: 'hermes_House',
    mapImg: './img/maps/hermes_House/hermes_House.png',
    FGImg: './img/maps/hermes_House/hermes_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'key_Town', spawnPosition: {x: -675, y: -1825}}, {name: 'key_Town', spawnPosition: {x: -675, y: -1825}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/hermes/hermes.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, 
          dialogue:
          [
            `Welcome to my humble abode.\n\n
            I see that old man Thymatai told you about this island.`, 

            `These islands are home to very primal energies.\n\n
            Some wild pogemons even evolve without the use of evolution stones!`, 

            `Well, enought chatter about the ecosystem.\n\n
            On the pacc isle south west of here reside the guardians of these islands.\n\n
            If you prove yourself strong enough to them,\n\nthey will give you the gems needed to uncorrupt the one you have with you.`,

            `Once you've aquired those, come back and talk to me.`
          ],
          dialogueWaiting:[
            `I trust you'll get those gems.\n\n
            A little patience might be in order.`,
          ],
          dialogueIllumination:[
            `You've got the gems required? Wonderful!\n\n
            Now i'm gonna turn evil one ur ass!! haha jkjk`, 

            `Come and meet me outside,\n\n
            dahgua needs to decide for itself if it wants to atune you to it's gem.`
          ],
          dialoguePostFight:[
            `That fight was great, i'm glad you grew strong enought to face me like this!\n\n
            I hope you enjoyed your stay in the region.\n\n
            Thank you for your time! <3\n\n
            - End`,
          ],
          looking: 'Down',
          eventKey: 'hermesHouse'
        },
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  darwin_House:{
    seen: false,
    name: 'darwin_House',
    mapImg: './img/maps/darwin_House/darwin_House.png',
    FGImg: './img/maps/darwin_House/darwin_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'key_Town', spawnPosition: {x: -1695, y: -1875}}, {name: 'key_Town', spawnPosition: {x: -1695, y: -1875}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/moses/moses.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:
          [
            `Mastering evolution is a crucial process of winning the bet.`,
          ],
          looking: 'Down',
          eventKey: 'darwin',
          shopKey: 7
        },
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },
  anemelos_House:{
    seen: false,
    name: 'anemelos_House',
    mapImg: './img/maps/anemelos_House/anemelos_House.png',
    FGImg: './img/maps/anemelos_House/anemelos_HouseFG.png',
    spawnPosition: {
      x: -275,
      y: -1200
    },
    height: 16,
    width: 16,
    encounters: {ground: [], water: []},
    changeMapLocations:[
      {name: 'key_Town', spawnPosition: {x: -2017.5, y: -1875}}, {name: 'key_Town', spawnPosition: {x: -2017.5, y: -1875}}, 
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/youngman/youngman.png',
        info: {
          direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:40}}}, 
          dialogue:
          [
            `I found this somewhere and i dont like how it looks.\n\nHere, you can have it, i don't really care.`,
          ],
          looking: 'Down',
          eventKey: 'ultimballGiver'
        },
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    weather: null
  },

  ghost_Woods:{
    seen: false,
    name: 'ghost_Woods',
    mapImg: './img/maps/ghost_Woods/ghost_Woods.png',
    FGImg: './img/maps/ghost_Woods/ghost_WoodsFG.png',
    spawnPosition: {
      x: -2450,
      y: -1825
    },
    height: 70,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.venophibian, lvls: [38, 43], odds: {min:0,max:35}},
        {pogemon: pogemonsObj.fruity, lvls: [38, 43], odds: {min:35,max:55}},
        {pogemon: pogemonsObj.sophistaves, lvls: [42, 47], odds: {min:55,max:70}},
        {pogemon: pogemonsObj.psyranea, lvls: [40, 45], odds: {min:70,max:85}},
        {pogemon: pogemonsObj.ouroboross, lvls: [40, 45], odds: {min:85,max:98}},
        {pogemon: pogemonsObj.moldy, lvls: [45, 50], odds: {min:98,max:99}},
        {pogemon: pogemonsObj.maaph, lvls: [45, 50], odds: {min:99,max:100}},
      ], 
      // water: [
      //   {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      // ]
    },
    changeMapLocations:[
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},
      {name: 'key_Town', spawnPosition: {x:-1250, y:-2200,}},

      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-400, y:-1725,}},
    ],
    obstaclesInfo: [
    ],
    trainers: [
      {
        name: 'Arden', 
        team: [[pogemonsObj.contamitoad, 54, null, null, null, null], [pogemonsObj.fruity, 53, null, null, null, null], [pogemonsObj.sterra, 54, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:800, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/brownhatguy/brownhatguy.png',
        dialogue: "You never woulda guessed i'd be back hehe.",
        reward: 1750,
        beaten: false
      },
      {
        name: 'Anny', 
        team: [[pogemonsObj.rockwil, 53, null, null, null, null], [pogemonsObj.mower, 56, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:500, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/femalebreeder/femalebreeder.png',
        dialogue: `Training here is no joke,\n\nit's almost just fully evolved pogemon's around here!.`,
        reward: 1750,
        beaten: false
      },
      {
        name: 'Ashton', 
        team: [[pogemonsObj.harmonium, 50, null, null, null, null], [pogemonsObj.ouroboross, 56, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:600}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/malepsychic/malepsychic.png',
        dialogue: `I sence a mighty presence on the island west of here,\n\ni can't event imagine what could be this powerful..`,
        reward: 1850,
        beaten: false
      },
      {
        name: 'npc', //bridge npc
        team: [[pogemonsObj.harmonium, 50, null, null, null, null], [pogemonsObj.ouroboross, 56, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:600}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/purplehairperson/purplehairperson.png',
        dialogue: `I sence a mighty presence on the island west of here,\n\ni can't event imagine what could be this powerful..`,
        reward: 1850,
        beaten: false
      },
      {
        name: 'Moris', 
        team: [[pogemonsObj.flamie, 50, null, null, null, null], [pogemonsObj.wettie, 50, null, null, null, null], [pogemonsObj.grassie, 50, null, null, null, null], [pogemonsObj.statikie, 50, null, null, null, null], [pogemonsObj.pukie, 50, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:800}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/dracofo/dracofo.png',
        dialogue: "i like collecting these guys!\n\ni feel like there is an NPC in the game i could\ntalk to that would give me something for doing this! :D",
        reward: 2000,
        beaten: false
      },
    ],
    items: [
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/beeasisPortal.png",
        info: {
          looking: 'Down',
          name: 'beeasis',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.beeasis, [75,75], null, null, null, true, [
            movesObj.sludge_bomb,
            movesObj.shadow_ball,
            movesObj.aura_sphere,
            movesObj.nasty_plot
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-Beeasis smiles at you mischievously-"
          ], 
          eventKey: 'beeasis',
          faceToFace: false
        },
      },
    ],
    weather: null
  },

  ascent_Bridge:{
    seen: false,
    name: 'ascent_Bridge',
    mapImg: './img/maps/ascent_Bridge/ascent_Bridge.png',
    FGImg: './img/maps/ascent_Bridge/ascent_BridgeFG.png',
    spawnPosition: {
      x: -962,
      y: -3075
    },
    height: 70,
    width: 75,
    encounters: {
      // ground: [
      //   {pogemon: pogemonsObj.venophibian, lvls: [17, 20], odds: {min:0,max:35}},
      //   {pogemon: pogemonsObj.fruity, lvls: [20, 23], odds: {min:35,max:70}},
      //   {pogemon: pogemonsObj.sophistaves, lvls: [20, 23], odds: {min:70,max:85}},
      //   {pogemon: pogemonsObj.antber, lvls: [20, 23], odds: {min:85,max:99}},
      //   {pogemon: pogemonsObj.moldy, lvls: [20, 23], odds: {min:99,max:100}},
      // ], 
      // water: [
      //   {pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}
      // ]
    },
    changeMapLocations:[
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},
      {name: 'ghost_Woods', spawnPosition: {x:-2450, y:-1825,}}, {name: 'pacc_Isle', spawnPosition: {x:-1100, y:-1625,}},                 
    ],
    trainers:[
      {
        name: 'Memphis', 
        team: [
          [pogemonsObj.volaticus, 1, null, null, null, null], 
          [pogemonsObj.infragice, 1, null, null, null, null], 
          [pogemonsObj.gelidatis, 1, null, null, null, null], 
          [pogemonsObj.moldy, 1, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:400}}},
        looking: 'Down', 
        sprite: '../../img/charSprites/purplehairperson/purplehairperson.png',
        dialogue: `You should make sure you're ready to head on this island,\nthe two guardians are no joke..`,
        reward: 2000,
        beaten: false
      },
      {
        name: 'Scale', 
        team: [[pogemonsObj.sophistaves, 55, null, null, null, null], [pogemonsObj.kampgooroo, 59, null, null, null, null], [pogemonsObj.thunderhopper, 56, null, null, null, null], [pogemonsObj.avorago, 60, null, null, null, null]],
        direction: {reach: {pos:{x:0, y:400}, neg:{x:0, y:0}}},
        looking: 'Up', 
        sprite: '../../img/charSprites/dino/dino.png',
        dialogue: `I've been training against ordo and entropia all my life, i'm still no match.\n\nDon't underestimate them man, you're in for a rude awakening..`,
        reward: 2150,
        beaten: false
      },
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    event: [
    ],
    weather: null,
  },

  pacc_Isle:{
    seen: false,
    name: 'pacc_Isle',
    mapImg: './img/maps/pacc_Isle/pacc_Isle.png',
    FGImg: './img/maps/pacc_Isle/pacc_IsleFG.png',
    spawnPosition: {
      x: -1500,
      y: -1775
    },
    height: 76,
    width: 76,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.venophibian, lvls: [39, 44], odds: {min:0,max:25}},
        {pogemon: pogemonsObj.fruity, lvls: [39, 44], odds: {min:25,max:50}},
        {pogemon: pogemonsObj.purdustus, lvls: [41, 46], odds: {min:50,max:70}},
        {pogemon: pogemonsObj.jleech, lvls: [41, 46], odds: {min:85,max:99}},
        {pogemon: pogemonsObj.loko, lvls: [39, 44], odds: {min:99,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.venophibian, lvls: [39, 44], odds: {min:1,max:50}},
        {pogemon: pogemonsObj.avorago, lvls: [43, 48], odds: {min:50,max:80}},
        {pogemon: pogemonsObj.aquario, lvls: [41, 46], odds: {min:80,max:100}},
      ]
    },
    changeMapLocations:[
      {name: 'edicule_Cave', spawnPosition: {x:-995, y:-750,}},

      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},
      {name: 'ascent_Bridge', spawnPosition: {x:-2450, y:-1825,}},

      {name: 'edicule_Cave', spawnPosition: {x:-2207, y:-2950,}},
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    event: [
      {
        name: 'block',
        sprite: 'img/charSprites/blank/blank.png',
        info: {
          direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}}, 
          eventKey: 'paccIsleBlock'
        },
      },
      {
        name: 'block',
        sprite: 'img/charSprites/blank/blank.png',
        info: {
          direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}}, 
          eventKey: 'paccIsleBlock'
        },
      },
      {
        name: 'block',
        sprite: 'img/charSprites/blank/blank.png',
        info: {
          direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}}, 
          eventKey: 'paccIsleBlock'
        },
      },
    ],
    trainers:[
      {
        name: 'Ordo', // guardian
        team: [
          //     pogemon      lvl         item                   abili             shiny  ivs move gender nature
          [pogemonsObj.mower, 69, itemsObj.rocky_Helmet, abilitiesObj.fluffy_Coat, null, true, [
            movesObj.stealth_rock,
            movesObj.horn_leech,
            movesObj.earthquake,
            movesObj.rock_slide
          ]], 
          [pogemonsObj.contamitoad, 70, itemsObj.black_Sludge, abilitiesObj.liquid_Voice, null, true, [
            movesObj.boomburst,
            movesObj.poison_jab,
            movesObj.earthquake,
            movesObj.taunt
          ]], 
          [pogemonsObj.thunderhopper, 70, itemsObj.expert_Belt, abilitiesObj.technician, null, true, [
            movesObj.thunderbolt,
            movesObj.bug_buzz,
            movesObj.frost_breath,
            movesObj.tail_glow
          ]], 
          [pogemonsObj.baaull, 70, itemsObj.assault_Vest, abilitiesObj.intimidate, null, true, [
            movesObj.head_smash,
            movesObj.earthquake,
            movesObj.close_Combat,
            movesObj.iron_head
          ]],
          [pogemonsObj.soleo, 71, itemsObj.heat_Rock, abilitiesObj.drought, null, true, [
            movesObj.flare_blitz,
            movesObj.head_smash,
            movesObj.volt_tackle,
            movesObj.stealth_rock,
          ]],
          [pogemonsObj.sustiris, 75, itemsObj.leftovers, abilitiesObj.photosynthesis, null, true, [
            movesObj.giga_drain,
            movesObj.ice_beam,
            movesObj.leech_seed,
            movesObj.fart
          ]],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:80, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/ordo/ordo.png',
        dialogue: `All this world needs is more order!`,
        difficulty: 'optimalMove',
        eventKey: 'ordo',
        reward: 2150,
        beaten: false
      },
      {
        name: 'Entropia', // guardian
        team: [
          //     pogemon        lvl         item                   abili             shiny  ivs move gender nature
          [pogemonsObj.psyranea, 69, itemsObj.light_Clay, abilitiesObj.magic_Bounce, null, true, [
            movesObj.reflect,
            movesObj.sticky_web,
            movesObj.light_screen,
            movesObj.mystical_power
          ]], 
          [pogemonsObj.moldy, 70, itemsObj.leftovers, abilitiesObj.tripped_Out, null, true,[
            movesObj.confuse_ray,
            movesObj.spore,
            movesObj.giga_drain,
            movesObj.shadow_ball
          ]], 
          [pogemonsObj.sophistaves, 70, itemsObj.leftovers, abilitiesObj.serene_Grace, null, true, [
            movesObj.air_slash,
            movesObj.moonblast,
            movesObj.earth_power,
            movesObj.roost
          ]], 
          [pogemonsObj.duney, 70, itemsObj.flame_Orb, abilitiesObj.guts, null, true, [
            movesObj.earthquake,
            movesObj.double_Edge,
            movesObj.rock_slide,
            movesObj.bulk_up
          ]],
          [pogemonsObj.jlorox, 71, itemsObj.life_Orb, abilitiesObj.sheer_Force, null, true, [
            movesObj.poison_jab,
            movesObj.dragon_rush,
            movesObj.drain_punch,
            movesObj.ice_punch
          ]],
          [pogemonsObj.beeasis, 75, itemsObj.expert_Belt, abilitiesObj.adaptability, null, true, [
            movesObj.shadow_ball,
            movesObj.sludge_bomb,
            movesObj.aura_sphere,
            movesObj.nasty_plot
          ]],
        ],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:80, y:0}}},
        looking: 'Right', 
        sprite: '../../img/charSprites/entropia/entropia.png',
        dialogue: `All this world needs is more chaos!`,
        difficulty: 'optimalMove',
        eventKey: 'ordo',
        reward: 2150,
        beaten: false
      },
    ],
    weather: null,
  },

  edicule_Cave:{
    seen: false,
    name: 'edicule_Cave',
    mapImg: './img/maps/edicule_Cave/edicule_Cave.png',
    FGImg: './img/maps/edicule_Cave/edicule_CaveFG.png',
    spawnPosition: {
      x: -1500,
      y: -2675
    },
    height: 70,
    width: 70,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.earthsa, lvls: [39, 44], odds: {min:0,max:35}},
        {pogemon: pogemonsObj.punbreakable, lvls: [41, 46], odds: {min:35,max:50}},
        {pogemon: pogemonsObj.antber, lvls: [39, 44], odds: {min:60,max:80}},
        {pogemon: pogemonsObj.sterra, lvls: [43, 48], odds: {min:80,max:95}},
        {pogemon: pogemonsObj.steeli, lvls: [39, 44], odds: {min:95,max:100}},
      ], 
      water: [
        {pogemon: pogemonsObj.venophibian, lvls: [39, 44], odds: {min:1,max:50}},
        {pogemon: pogemonsObj.avorago, lvls: [43, 48], odds: {min:50,max:80}},
        {pogemon: pogemonsObj.aquario, lvls: [41, 46], odds: {min:80,max:100}},
      ]
    },
    changeMapLocations:[
      {name: 'pacc_Isle', spawnPosition: {x:-1435, y:-1000,}},

      {name: 'pacc_Isle', spawnPosition: {x:-2655, y:-3100,}},
    ],
    obstaclesInfo: [
    ],
    items: [
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/legendaryPortal/dahguaPortal.png",
        info: {
          looking: 'Down',
          name: 'dahgua',
          reward: 0,
          direction: {reach: {pos:{x:50, y:50}, neg:{x:50, y:50}}}, 
          team: [[pogemonsObj.dahgua, [85,85], null, null, null, true, [
            movesObj.surf,
            movesObj.moonblast,
            movesObj.puddle_break,
            movesObj.calm_mind
          ]]],
          trainer: false,
          legendary: true,
          difficulty: 'optimalMove',
          dialogue:
          [
            "-Beeasis smiles at you mischievously-"
          ], 
          eventKey: 'dahgua',
          faceToFace: false
        },
      },
    ],
    weather: null,
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
        info: {direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, dialogue:['Let me heal your team'], type:'pogecenter'},
      },
      {
        name: 'pc',
        info: {direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:0}}}},
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
        info: {direction: {reach: {pos:{x:50, y:80}, neg:{x:50, y:50}}}, dialogue:['Welcome to my store, how may i help you?'], type:'pogemart'},
      },
    ],
    changeMapLocations:[{name: 'prevMap', spawnPosition: {x: 0, y: 0,}}],
    productOptions: [
      // pogemart options

      // fair town
      [
        {name:'potion'}, 
        {name:'pogeball'}, 
        {name:'repel'}
      ],

      // keme town
      [
        {name:'potion'}, 
        {name:'super_Potion'}, 
        {name:'pogeball'}, 
        {name:'midball'}, 
        {name:'repel'}
      ],

      // scribble town
      [
        {name:'potion'}, 
        {name:'super_Potion'}, 
        {name:'revive'}, 
        {name:'ether'}, 
        {name:'pogeball'}, 
        {name:'midball'}, 
        {name:'repel'}, 
        {name:'super_Repel'}
      ],

      // alquima town
      [
        {name:'potion'}, 
        {name:'super_Potion'}, 
        {name:'mega_Potion'}, 
        {name:'revive'}, 
        {name:'ether'}, 
        {name:'super_Ether'}, 
        {name:'pogeball'}, 
        {name:'midball'}, 
        {name:'megaball'}, 
        {name:'repel'}, 
        {name:'super_Repel'}
      ],

      // TM shop
      [
        {name:'TM003'},
        {name:'TM004'},
        {name:'TM007'},
        {name:'TM008'},
        {name:'TM011'},
        {name:'TM013'},
        {name:'TM014'},
        {name:'TM016'},
        {name:'TM020'},
        {name:'TM021'},
        {name:'TM024'},
        {name:'TM025'},
        {name:'TM026'},
        {name:'TM027'},
        {name:'TM028'},
        {name:'TM031'},
        {name:'TM035'},
        {name:'TM043'},
        {name:'TM044'},
        {name:'TM045'},
        {name:'TM046'},
        {name:'TM048'},
        {name:'TM049'},
        {name:'TM052'},
        {name:'TM056'},
        {name:'TM057'},
        {name:'TM060'},
        {name:'TM063'},
        {name:'TM065'},
        {name:'TM069'},
        {name:'TM072'},
        {name:'TM074'},
        {name:'TM075'},
        {name:'TM077'},
        {name:'TM078'},
        {name:'TM082'},
        {name:'TM083'},
        {name:'TM084'},
        {name:'TM088'},
        {name:'TM089'},
        {name:'TM091'},
        {name:'TM093'},
        {name:'TM095'},
        {name:'TM097'},
        {name:'TM098'},
        {name:'TM099'},
        {name:'TM101'},
        {name:'TM102'},
        {name:'TM105'},
        {name:'TM107'},
        {name:'TM108'},
        {name:'TM109'},
        {name:'TM111'},
        {name:'TM112'},
        {name:'TM115'},
        {name:'TM117'},
        {name:'TM119'},
        {name:'TM121'},
        {name:'TM122'},
        {name:'TM122'},
        {name:'TM124'},
        {name:'TM127'},
        {name:'TM128'},
        {name:'TM130'},
        {name:'TM131'},
        {name:'TM134'},
        {name:'TM140'},
        {name:'TM144'},
        {name:'TM154'},
        {name:'TM158'},
        {name:'TM159'},
        {name:'TM173'},
        {name:'TM174'},
        {name:'TM175'},
        {name:'TM177'},
      ],

      // battle shop
      [
        {name:'leftovers'},
        {name:'black_Sludge'},

        {name:'life_Orb'},

        {name:'assault_Vest'},

        {name:'eviolite'},

        {name:'choice_Band'},
        {name:'choice_Scarf'},
        {name:'choice_Specs'},

        {name:'lucky_Egg'},
        {name:'rare_Candy'},

        {name:'expert_Belt'},

        {name:'heavy_Duty_Boots'},

        {name:'rocky_Helmet'},

        {name:'damp_Rock'},
        {name:'heat_Rock'},
        {name:'icy_Rock'},
        {name:'smooth_Rock'},

        {name:'light_Clay'},

        {name:'focus_Band'},
        {name:'focus_Sash'},

        {name:'silk_Scarf'},
        {name:'miracle_Seed'},
        {name:'mystic_Water'},
        {name:'charcoal'},
        {name:'magnet'},
        {name:'silver_Powder'},
        {name:'sharp_Beak'},
        {name:'black_Glasses'},
        {name:'hard_Stone'},
        {name:'black_Belt'},
        {name:'soft_Sand'},
        {name:'poison_Barb'},
        {name:'spell_Tag'},
        {name:'metal_Coat'},
        {name:'twisted_Spoon'},
        {name:'nevermelt_ice'},
        {name:'fairy_Feather'},
        {name:'dragon_Fang'},
      ],

      // berry shop
      [
        {name:'old_Banana'},
        {name:'banana'},
        {name:'yellow_Berry'},
        {name:'energy_Berry'},
        {name:'libra_Berry'},
        {name:'milky_Berry'},
        {name:'net_Berry'},
        {name:'spicy_Berry'},
        {name:'wakeo_Berry'},
        {name:'rainbo_Berry'},
      ],

      // evo shop
      [
        {name: 'fire_Stone'},
        {name: 'water_Stone'},
        {name: 'leaf_Stone'},
        {name: 'thunder_Stone'},
      ],
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

            if(Object.values(data.mapsObjState)[i].trainers != undefined) trainer.beaten = Object.values(data.mapsObjState)[i].trainers[j].beaten

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
        if(data.mapsObjState[map.name].obstaclesInfo != undefined)
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