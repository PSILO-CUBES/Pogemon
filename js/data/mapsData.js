import { loadData } from "../save.js"
import { pogemonsObj } from "./pogemonData.js"

const data = await loadData()

export let mapsObj = {
  background: './img/background.png',
  // geneTown
  gene_Town:{
    name: 'gene_Town',
    mapImg: './img/maps/gene_Town/gene_Town.png',
    FGImg: './img/maps/gene_Town/gene_TownFG.png',
    spawnPosition: {
      x: -962,
      y: -650
    },
    height: 44,
    width: 60,
    encounters: {ground: [{pogemon: pogemonsObj.wallafi, lvls: [2, 5], odds: {min:1,max:50}}, {pogemon: pogemonsObj.piny, lvls: [3, 6], odds: {min:50,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}]},
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
  gene_Town_home1:{
    name: 'gene_Town_home1',
    mapImg: './img/maps/gene_Town_home1/gene_Town_home1.png',
    FGImg: './img/maps/gene_Town_home1/gene_Town_home1FG.png',
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
        sprite: 'img/charSprites/oak/Oak.png',
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

  // eden forest
  eden_Forest:{
    name: 'eden_Forest',
    mapImg: './img/maps/eden_Forest/eden_Forest.png',
    FGImg: './img/maps/eden_Forest/eden_ForestFG.png',
    spawnPosition: {
      x: -962,
      y: -650
    },
    height: 58,
    width: 79,
    encounters: [],
    changeMapLocations:[
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}},
      {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}, {name: 'gene_Town', spawnPosition: {x:-1750, y:-1725}}
    ],
    obstaclesInfo: [],
    weather: null
  },

  //pearlyPath
  pearly_Path:{
    name: 'pearly_Path',
    mapImg: './img/maps/pearly_Path/pearly_Path.png',
    FGImg: './img/maps/pearly_Path/pearly_PathFG.png',
    spawnPosition: {
      x: 775,
      y: -1150
    },
    height: 56,
    width: 64,
    encounters: {
      ground: [
        {pogemon: pogemonsObj.wallafi, lvls: [4, 7], odds: {min:1,max:50}}, 
        {pogemon: pogemonsObj.piny, lvls: [4, 7], odds: {min:50,max:75}}, 
        {pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:75,max:100}}
      ], 
      water: [
        {pogemon: pogemonsObj.tadtoxic, lvls: [8, 12], odds: {min:1,max:100}}
      ]
    },
    changeMapLocations:[
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},
      
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}}, 
      
      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}},
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -750}},

      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},
      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},

      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}},
      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}
    ],
    trainers: [
      {
        name: 'May', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: 'slither_Road NPC',
        reward: 0,
        beaten: true,
      },
      {
        name: 'Tristan', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Up'}, 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "I can't get throught those darned trees, there is so much room around them it\n\nmakes no sence.. ;-;",
        reward: 100,
        beaten: false,
      },      
      {
        name: 'Gab', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: 'Git gud',
        reward: 100,
        beaten: false,
      },
    ],
    obstaclesInfo: [
      {
        name: 'tree',
        direction: {reach: {pos:{x:50, y:-10}, neg:{x:50, y:-10}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
        disabled: false,
      },
    ]
  },

  //slither_Road
  slither_Road:{
    name: 'slither_Road',
    mapImg: './img/maps/slither_Road/slither_Road.png',
    FGImg: './img/maps/slither_Road/slither_RoadFG.png',
    spawnPosition: {
      x: 775,
      y: -1150
    },
    height: 44,
    width: 62,
    encounters: {ground: [{pogemon: pogemonsObj.sturdle, lvls: [2, 6], odds: {min:1,max:100}}], water: []},
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
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'May', 
        team: [[pogemonsObj.tadtoxic, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:350, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/woman/woman.png',
        dialogue: 'I love collecting stones!\n\n\nSome cool ones often appear around the bigger ones! :D',
        reward: 100,
        beaten: false,
      },      
      {
        name: 'Gab', 
        team: [[pogemonsObj.piny, 7, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/youngman2/youngman2.png',
        dialogue: 'pearly_Path NPC',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Marley', 
        team: [],
        direction: {reach: {pos:{x:350, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: 'I love collecting stones!\n\n\nSome cool ones often appear around the bigger ones! :D',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Dakota', 
        team: [[pogemonsObj.wallafi, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/youngman3/youngman3.png',
        dialogue: '',
        reward: 0,
        beaten: true,
      },
    ]
  },

  //fair_Town
  fair_Town:{
    name: 'fair_Town',
    mapImg: './img/maps/fair_Town/fair_Town.png',
    FGImg: './img/maps/fair_Town/fair_TownFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 43,
    width: 53,
    encounters: {ground: [], water: []},
    trainers: [
      {
        name: 'Rocky', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: "cross_Link NPC",
        reward: 0,
        beaten: true
      },
      {
        name: 'Marley', 
        team: [],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
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
        team: [[pogemonsObj.flailegant, 11, null], [pogemonsObj.slimie, 12, null], [pogemonsObj.balancia, 13, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}, looking: 'Down'}, 
        sprite: "../../img/charSprites/ma'at/ma'at.png",
        dialogue: "Are you ready for your first challenge?",
        reward: 100,
        beaten: false,
        gymLeader: {name: "ma'at", num: 0},
        eventKey: 'maatGym'
      },
      {
        name: 'Larry', 
        team: [[pogemonsObj.formal, 9, null], [pogemonsObj.allingua, 10, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
        sprite: '../../img/charSprites/youngman/youngman.png',
        dialogue: 'Gramps is facinated with those slime pogemon.\n\n\nHe talked about stones being the catalysts for evolution or\n\nsomething like that.',
        OWdialogue: "Ma'at, our dear gym leader, found something strange at the cross link.\n\n\nYou might want to let her know you're looking for her.",
        reward: 100,
        beaten: false,
        eventKey: 'maatGymTrainer'
      },
      {
        name: 'Barry',
        team: [[pogemonsObj.wallafi, 8, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "Ma'at is one of my best friends!\n\n\nShe helped me catch my first pogemon!",
        OWdialogue: "I wish i could be as cool as Ma'at some day..",
        reward: 100,
        beaten: false,
        eventKey: 'maatGymTrainer'
      },
    ],
  },
  maat_House:{
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
        sprite: "img/charSprites/ma'at/ma'atLeft.png",
        info: {direction: {reach: {pos:{x:30, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}}, dialogue:['Make sure you speak to Professor Heisenberg before you leave town.']},
      },
    ]
  },
  heisenberg_House: {
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
          dialogue:["Let me introduce myself, i am professor Heisenberg.", "When Ma'at brought her slimie for me to study, it somehow secreated a\n\nstrange glowy substance that hardened itself into this halo.\n\n\n\nThis slime creature is very strange..", "It's genetic makeup indicates it could somehow evolve!\n\n\n\nMy hypothesis is that the halo plays an important role in\n\nit's evolution process.", "If you manage to make that happen, come and show me.", "Professor Heisenberg gave you the glowy halo."],
          slimeDialogue: ["Wow, what a strange speciment!\n\n\nIt seems like draining certain elemental essences allows it to change form.", "Even though you managed to prove slimie can actualy evolve,\n\nit does not seem like this is the last form this pogemon can take.", "If you manage to fill your party with one of each type of smile,\n\ncome back and show me."],
          haloDialogue: ["You did it, impressive!\n\n\nWell, actualy....", `According to the genetics of that pogemon it does seem like\n\nit could still evol..\n\n\n\n Hold on... What is going on with the halo!?`],
          postEvoDialogue: [`Thank you for taking me along on this evolution journey.`, `Take good care of this speciment for me.`],
          eventKey: 'heisenbergHouse'
        },
      },
    ]
  },

  //cross_Link
  cross_Link:{
    name: 'cross_Link',
    mapImg: './img/maps/cross_Link/cross_Link.png',
    FGImg: './img/maps/cross_Link/cross_LinkFG.png',
    spawnPosition: {
      x: -675,
      y: -1700
    },
    height: 43,
    width: 53,
    encounters: {ground: [{pogemon: pogemonsObj.sturdle, lvls: [2, 6], odds: {min:1,max:50}}, {pogemon: pogemonsObj.wallafi, lvls: [2, 6], odds: {min:50,max:95}}, {pogemon: pogemonsObj.slimie, lvls: [7, 10], odds: {min:95,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [2, 6], odds: {min:1,max:85}}, {pogemon: pogemonsObj.slimie, lvls: [7, 10], odds: {min:85,max:100}}]},
    changeMapLocations:[
      {name: 'luna_Cave', spawnPosition: {x: -500, y: -500}},

      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}}, {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'fair_Town', spawnPosition: {x: -675, y: -25}},
      
    ],
    event: [
      {
        name: 'npc',
        sprite: "img/charSprites/ma'at/ma'atDown.png",
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            "Hey, how are ya?\n\n\nMy name is Ma'at, what's yours?", 
            "I saw one of those strange slime pogemon slide into that cave.\n\n\nIt was bigger than my slimie, that's for sure.\n\n\nAll purple and gooey... Yuck..", 
            "How strange..\n\n\nYou might want to check that out later..","If you're looking for a challenge, i'll be waiting at the gym!"
          ], 
          eventKey: 'maatMeeting'
        },
      },
    ],
    trainers: [
      {
        name: 'Rocky', 
        team: [[pogemonsObj.sturdle, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I love collecting stones!\n\n\nSome cool ones often appear around the bigger ones! :D',
        reward: 100,
        beaten: false,
      },
    ],
    obstaclesInfo: [
      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      }
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 50,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'fire_Stone',
        amount: 50,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
      {
        name: 'water_Stone',
        amount: 50,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: true
      },
    ],

  },

  //banismentRoad
  banishment_Road:{
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
        {pogemon: pogemonsObj.rockwil, lvls: [4, 7], odds: {min:1,max:100}},
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
        name: 'Tristan', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:350}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Up'}, 
        sprite: '../../img/charSprites/youngster/youngster.png',
        dialogue: "pearly_Path NPC",
        reward: 0,
        beaten: true,
      },
      {
        name: 'Tristan', 
        team: [[pogemonsObj.allingua, 10, null], [pogemonsObj.formal, 10, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:350}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/youngman/youngman.png',
        dialogue: "Both my pogemons can't stand each other, i'm not sure why...",
        reward: 100,
        beaten: false,
      },   
    ],
  },

  //kemeTown
  keme_Town:{
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
    ]
  },
  keme_Town_House1:{
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
        direction: {reach: {pos:{x:0, y:150}, neg:{x:0, y:150}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/ruinmaniac/ruinmaniac.png',
        dialogue: 'I still very much like rocks.',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Onyx', 
        team: [[pogemonsObj.cobbird, 16, null], [pogemonsObj.sturdle, 17, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:150, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/youngwoman/youngwoman.png',
        dialogue: 'I hope i can be just like Djed one day.',
        reward: 100,
        beaten: false,
      },
      {
        name: 'Djed', // gym leader
        team: [[pogemonsObj.cobbird, 18, null],[pogemonsObj.punbreakable, 19, null], [pogemonsObj.rockwil, 20, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/djed/djed.png',
        dialogue: 'A new challenger for me?\n\n\nBring it on!',
        reward: 100,
        beaten: false,
        gymLeader: {name: "djed", num: 1},
        eventKey: 'djedGym'
      },
      {
        name: 'Clayton', 
        team: [[pogemonsObj.allingua, 15, null]],
        direction: {reach: {pos:{x:150, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
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
    name: 'exodus_Road',
    mapImg: './img/maps/exodus_Road/exodus_Road.png',
    FGImg: './img/maps/exodus_Road/exodus_RoadFG.png',
    spawnPosition: {
      x: -900,
      y: -750
    },
    height: 48,
    width: 72,
    encounters: {},
    changeMapLocations:[
      {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, 
      {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, {name: 'sinai_Desert', spawnPosition: {x: -1375, y: -2350}}, // sinia_Desert

      {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, 
      {name: 'keme_Town', spawnPosition: {x: -930, y: -175}}, {name: 'keme_Town', spawnPosition: {x: -930, y: -175}} // keme_Town
    ],
    weather: 'sun'
  },

  //sinai desert
  sinai_Desert:{
    name: 'sinai_Desert',
    mapImg: './img/maps/sinai_Desert/sinai_Desert.png',
    FGImg: './img/maps/sinai_Desert/sinai_DesertFG.png',
    spawnPosition: {
      x: -900,
      y: -1050
    },
    height: 58,
    width: 72,
    encounters: {},
    changeMapLocations:[
      {name: 'melchi_Cave', spawnPosition: {x:125, y: -1050}}, // grotto

      {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, 
      {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}, {name: 'exodus_Road', spawnPosition: {x: -1250, y: -100}}
    ],
    weather: 'sand'
  },
  melchi_Cave:{
    name: 'melchi_Cave',
    mapImg: './img/maps/melchi_Cave/melchi_Cave.png',
    FGImg: './img/maps/melchi_Cave/melchi_CaveFG.png',
    spawnPosition: {
      x: 0,
      y: -850
    },
    height: 26,
    width: 26,
    encounters: {ground:[{pogemon: pogemonsObj.sturdle, lvls: [2, 6], odds: {min:1,max:100}}], water:[]},
    changeMapLocations:[
      {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, {name: 'sinai_Desert', spawnPosition: {x:-2335, y: -85}}, // grotto
    ],
    weather: null,
    trainers: [
      {
        name: 'Moses', 
        team: [[pogemonsObj.wettie, 5, null], [pogemonsObj.sturdle, 6, null], [pogemonsObj.sturdle, 7, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
        sprite: '../../img/charSprites/moses/moses.png',
        dialogue: "A challenge for an old man like me? I'm all up for it!\n\n\nIf you manage to defeat me, i'll let you have this old stick.\n\n\nIt'll guide you when the path ahead seems too dark to continue.",
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
    encounters: {},
    event: [
      {
        name: 'npc',
        info: {direction: {reach: {pos:{x:0, y:-20}, neg:{x:20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['Welcome to my store, how may i help you?'], type:'pogemart'},
      },
    ],
    changeMapLocations:[{name: 'undefined', spawnPosition: {x: 0, y: 0,}}],
    productOptions: [
      [{name:'potion'}, {name:'resurrect'}, {name:'pogeball'}, {name:'glowy_Halo'}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
      [{name:'potion', price: 999}, {name:'resurrect', price: 999}, {name:'pogeball', price: 999}],
    ]
  },
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
          trainer.beaten = Object.values(data['mapsObjState'])[i].trainers[j].beaten
        })
      }

      if(map.items != undefined) {
        map.items.forEach((item, j) =>{
          if(item.pickedUp) return
          item.pickedUp = Object.values(data['mapsObjState'])[i].items[j].pickedUp
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