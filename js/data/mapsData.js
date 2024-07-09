import { loadData } from "../save.js"
import { itemsObj } from "./itemsData.js"
import { pogemonsObj } from "./pogemonData.js"
import { weatherObj } from "./weatherData.js"

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
    encounters: {ground: [{pogemon: pogemonsObj.jlissue, lvls: [2, 6], odds: {min:1,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [10, 15], odds: {min:1,max:100}}]},
    changeMapLocations:[
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},
      {name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},{name: 'pearly_Path', spawnPosition: {x:-1100, y:-2550,}},

      {name: 'gene_Town_home1', spawnPosition: {x:250, y:0,}}, 

      {name: 'home', spawnPosition: {x:250, y:-50,}}, 

      {name: 'lab', spawnPosition: {x: 375, y: -425,}}
    ],
    trainers: [
      {
        name: 'Gab', 
        team: [[pogemonsObj.disso, 10, itemsObj.focus_Band], [pogemonsObj.maaph, 10, null]],
        direction: {reach: {pos:{x:200, y:0}, neg:{x:0, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Left'}, 
        sprite: '../../img/charSprites/dino/dino.png',
        dialogue: 'Git Gut\n\n\nSkill issue',
        reward: 100,
        beaten: false
      },
    ],
    items: [
      {
        name: 'leaf_Stone',
        amount: 50,
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:10, y:10}, neg:{x:-10, y:-10}}},
        pickedUp: false,
        hidden: false
      },
    ],
    obstaclesInfo: [
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      },

      {
        name: 'rock',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      },

      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
      },
      {
        name: 'tree',
        direction: {reach: {pos:{x:25, y:25}, neg:{x:25, y:25}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}},
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
    encounters: {ground: [{pogemon: pogemonsObj.allingua, lvls: [4, 7], odds: {min:1,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:1,max:100}}]},
    changeMapLocations:[
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},
      
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -38}}, {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}}, 
      
      {name: 'slither_Road', spawnPosition: {x: -185, y: -400}},

      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -1238}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -1238}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -1238}},
      {name: 'banishment_Road', spawnPosition: {x: -2486, y: -1238}}, {name: 'banishment_Road', spawnPosition: {x: -2486, y: -1238}},

      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},
      {name: 'slither_Road', spawnPosition: {x: -200, y: -950}}, {name: 'slither_Road', spawnPosition: {x: -200, y: -950}},

      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}},
      {name: 'gene_Town', spawnPosition: {x:-967, y: -100,}}, {name: 'gene_Town', spawnPosition: {x: -967, y: -100,}}
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

      {name: 'sol_Town', spawnPosition: {x: -50, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'sol_Town', spawnPosition: {x: -200, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'sol_Town', spawnPosition: {x: -200, y: -800}},       
      
      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'sol_Town', spawnPosition: {x: -200, y: -800}}, 

      {name: 'pearly_Path', spawnPosition: {x: -2000, y: -1900}}, 

      {name: 'sol_Town', spawnPosition: {x: -200, y: -800}}, 
    ]
  },

  //sol_Town
  sol_Town:{
    name: 'sol_Town',
    mapImg: './img/maps/sol_Town/sol_Town.png',
    FGImg: './img/maps/sol_Town/sol_TownFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 43,
    width: 53,
    encounters: {ground: [], water: []},
    trainers: [
      {
        name: 'Isaac', 
        team: [[pogemonsObj.sturdle, 10, null], [pogemonsObj.tadtoxic, 10, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/dino/dino.png',
        dialogue: "Ma'at discovered a new kind of pogemon not long ago..\n\n\nHow cool!",
        reward: 100,
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

      {name: 'sol_Town_Gym', spawnPosition: {x: 480, y: -1475}}, // gym 
    ],
    weather: null
  },
  sol_Town_Gym:{
    name: 'sol_Town_Gym',
    mapImg: './img/maps/sol_Town_Gym/sol_Town_Gym.png',
    FGImg: './img/maps/sol_Town_Gym/sol_Town_GymFG.png',
    spawnPosition: {
      x: -500,
      y: -500
    },
    height: 32,
    width: 15,
    changeMapLocations:[
      {name: 'sol_Town', spawnPosition: {x: -355, y: -1425}}, {name: 'sol_Town', spawnPosition: {x: -355, y: -1425}}, {name: 'sol_Town', spawnPosition: {x: -355, y: -1425}},
    ],
    trainers: [
      {
        name: "Ma'at", 
        team: [[pogemonsObj.flailegant, 11, null], [pogemonsObj.slimie, 12, null], [pogemonsObj.balancia, 13, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:0, y:70}}, sight: {pos: {x:35, y:0}, neg:{x:35, y:0}}, looking: 'Down'}, 
        sprite: '../../img/charSprites/gymLeader1/gymLeader1.png',
        dialogue: "Are you ready for your first challenge?",
        reward: 100,
        beaten: false,
        gymLeader: {name: 'maat', num: 0},
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
        dialogue: 'I love collecting stones!\n\n\nSome cool ones often appear around the bigger ones! :D',
        OWdialogue: "Hey, my name is Kam.\n\n\nI really like rocks. :)",
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
    height: 11,
    width: 16,
    changeMapLocations:[
      {name: 'sol_Town', spawnPosition: {x: -1055, y: -1375}}, {name: 'sol_Town', spawnPosition: {x: -1055, y: -1375}},
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/gymLeader1/maatLeft.png',
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
    height: 11,
    width: 16,
    changeMapLocations:[
      {name: 'sol_Town', spawnPosition: {x: -1185, y: -400}}, {name: 'sol_Town', spawnPosition: {x: -1185, y: -400}},
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

      {name: 'sol_Town', spawnPosition: {x: -675, y: -25}}, {name: 'sol_Town', spawnPosition: {x: -675, y: -25}}, {name: 'sol_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'sol_Town', spawnPosition: {x: -675, y: -25}}, {name: 'sol_Town', spawnPosition: {x: -675, y: -25}}, {name: 'sol_Town', spawnPosition: {x: -675, y: -25}},
      {name: 'sol_Town', spawnPosition: {x: -675, y: -25}},
      
    ],
    event: [
      {
        name: 'npc',
        sprite: 'img/charSprites/gymLeader1/maatDown.png',
        info: {
          direction: {reach: {pos:{x:5, y:0}, neg:{x:-20, y:20}}, 
          sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, 
          dialogue:
          [
            "Hey, how are ya?\n\n\nMy name is Maat, what's yours?", 
            "I saw one of those strange slime pogemon slide into that cave.\n\n\nIt was bigger than my slimie, that's for sure.\n\n\nAll purple and gooey... Yuck..", 
            "How strange..\n\n\nYou might want to check that out later..","If you're looking for a challenge, i'll be waiting at the gym!"
          ], 
          eventKey: 'maatMeeting'
        },
      },
    ],
    trainers: [
      {
        name: 'Gab', 
        team: [[pogemonsObj.sturdle, 6, null]],
        direction: {reach: {pos:{x:0, y:0}, neg:{x:200, y:0}}, sight: {pos: {x:0, y:35}, neg:{x:0, y:35}}, looking: 'Right'}, 
        sprite: '../../img/charSprites/dino/dino.png',
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
      x: -75,
      y: -750
    },
    height: 42,
    width: 72,
    encounters: {ground: [{pogemon: pogemonsObj.allingua, lvls: [4, 7], odds: {min:1,max:100}}], water: [{pogemon: pogemonsObj.tadtoxic, lvls: [4, 7], odds: {min:1,max:100}}]},
    changeMapLocations:[
      {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, 
      {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}}, {name: 'keme_Town', spawnPosition: {x: -800, y: -1700,}},

      {name: 'pearly_Path', spawnPosition: {x: -170, y: -821}}, {name: 'pearly_Path', spawnPosition: {x: -170, y: -821}},

      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}},
      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}, {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}},
      {name: 'pearly_Path', spawnPosition: {x: -240, y: -1535}}
    ]
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
    height: 46,
    width: 59,
    encounters: {},
    changeMapLocations:[
      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'home', spawnPosition: {x:775, y: -1150,}}, 

      {name: 'pogecenter', spawnPosition: {x:405, y: -50,}}, 

      {name: 'pogemart', spawnPosition: {x:597.5, y: 0,}}, 

      {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, 
      {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}, {name: 'banishment_Road', spawnPosition: {x: -538, y: -200}}
    ]
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
        info: {direction: {reach: {pos:{x:0, y:-20}, neg:{x:20, y:20}}, sight: {pos: {x:0, y:0}, neg:{x:0, y:0}}}, dialogue:['What will you be buying today?'], type:'pogemart'},
      },
    ],
    changeMapLocations:[{name: 'undefined', spawnPosition: {x: 0, y: 0,}}],
    productOptions: [
      [{name:'potion', price: 1}, {name:'resurrect', price: 1}, {name:'pogeball', price: 1}],
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