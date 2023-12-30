import { movesObj } from "./movesData.js"

// exp yeild should look like
// first stage : 35 ~ 100
// second stage : 100 ~ 180
// third stage : 180 ~ 250
// legendary/high exp yeilders : 250 ~ 400


export const pogemonsObj = {
  // #1 - #3 fighting starter x 
  loko: {
    pogedex: 1,
    name: 'loko',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 75,
      atk: 75,
      def: 40,
      spatk: 40,
      spdef: 40,
      spd: 45
    },
    evo: {name: 'lokol', lvl: 10},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 1}
    },
    sprites: {
      frontSprite: 'img/pogemon/001_Loko/Loko_Animation.png',
      backSprite: 'img/pogemon/001_Loko/Loko_Back_Animation.png',
      teamSprite: 'img/pogemon/001_Loko/Loko_Team_Animation.png',
      bagSprite: 'img/pogemon/001_Loko/Loko_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  lokol: {
    pogedex: 2,
    name: 'lokol',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 90,
      atk: 90,
      def: 60,
      spatk: 60,
      spdef: 60,
      spd: 70
    },
    evo: {name: 'lokump', lvl: 12},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/002_Lokol/Lokol_Animation.png',
      backSprite: 'img/pogemon/002_Lokol/Lokol_Back_Animation.png',
      teamSprite: 'img/pogemon/002_Lokol/Lokol_Team_Animation.png',
      bagSprite: 'img/pogemon/002_Lokol/Lokol_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  lokump: {
    pogedex: 3,
    name: 'lokump',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 115,
      atk: 120,
      def: 80,
      spatk: 80,
      spdef: 80,
      spd: 90
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/003_lokump/lokump_Animation.png',
      backSprite: 'img/pogemon/003_lokump/lokump_Back_Animation.png',
      teamSprite: 'img/pogemon/003_lokump/lokump_Team_Animation.png',
      bagSprite: 'img/pogemon/003_lokump/lokump_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },

  // #4 - #6 steel starter
  steeli: {
    pogedex: 4,
    name: 'steeli',
    element:{
      1: 'steel',
      2: null
    },
    stats: {
      hp: 50,
      atk: 50,
      def: 65,
      spatk: 50,
      spdef: 65,
      spd: 35
    },
    evo: {name: 'steeler', lvl: 10},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/004_Steeli/Steeli_Animation.png',
      backSprite: 'img/pogemon/004_Steeli/Steeli_Back_Animation.png',
      teamSprite: 'img/pogemon/004_Steeli/Steeli_Team_Animation.png',
      bagSprite: 'img/pogemon/004_Steeli/Steeli_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  steeler: {
    pogedex: 5,
    name: 'steeler',
    element:{
      1: 'steel',
      2: 'dark'
    },
    stats: {
      hp: 65,
      atk: 65,
      def: 95,
      spatk: 65,
      spdef: 95,
      spd: 45
    },
    evo: {name: 'steevil', lvl: 12},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/005_Steeler/Steeler_Animation.png',
      backSprite: 'img/pogemon/005_Steeler/Steeler_Back_Animation.png',
      teamSprite: 'img/pogemon/005_Steeler/Steeler_Team_Animation.png',
      bagSprite: 'img/pogemon/005_Steeler/Steeler_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  steevil: {
    pogedex: 6,
    name: 'steevil',
    element:{
      1: 'steel',
      2: 'dark'
    },
    stats: {
      hp: 85,
      atk: 85,
      def: 125,
      spatk: 85,
      spdef: 125,
      spd: 60
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/006_Steevil/Steevil_Animation.png',
      backSprite: 'img/pogemon/006_Steevil/Steevil_Back_Animation.png',
      teamSprite: 'img/pogemon/006_Steevil/Steevil_Team_Animation.png',
      bagSprite: 'img/pogemon/006_Steevil/Steevil_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },

  // #7 - #9 fairy starter x
  maaph: {
    pogedex: 7,
    name: 'maaph',
    element:{
      1: 'fairy',
      2: 'ghost'
    },
    stats: {
      hp: 45,
      atk: 35,
      def: 35,
      spatk: 70,
      spdef: 70,
      spd: 60
    },
    evo: {name: 'maaphett', lvl: 10},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.fireball, lvl: 1},
    },
    sprites: {
      frontSprite: 'img/pogemon/007_maaph/maaph_Animation.png',
      backSprite: 'img/pogemon/007_maaph/maaph_Back_Animation.png',
      teamSprite: 'img/pogemon/007_maaph/maaph_Team_Animation.png',
      bagSprite: 'img/pogemon/007_maaph/maaph_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  maaphett: {
    pogedex: 8,
    name: 'maaphett',
    element:{
      1: 'fairy',
      2: 'ghost'
    },
    stats: {
      hp: 60,
      atk: 40,
      def: 50,
      spatk: 100,
      spdef: 100,
      spd: 80
    },
    evo: {name: 'maapheeno', lvl: 12},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/008_maaphett/maaphett_Animation.png',
      backSprite: 'img/pogemon/008_maaphett/maaphett_Back_Animation.png',
      teamSprite: 'img/pogemon/008_maaphett/maaphett_Team_Animation.png',
      bagSprite: 'img/pogemon/008_maaphett/maaphett_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },
  maapheeno: {
    pogedex: 9,
    name: 'maapheeno',
    element:{
      1: 'fairy',
      2: 'ghost'
    },
    stats: {
      hp: 80,
      atk: 50,
      def: 70,
      spatk: 130,
      spdef: 130,
      spd: 105
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/009_maapheeno/maapheeno_Animation.png',
      backSprite: 'img/pogemon/009_maapheeno/maapheeno_Back_Animation.png',
      teamSprite: 'img/pogemon/009_maapheeno/maapheeno_Team_Animation.png',
      bagSprite: 'img/pogemon/009_maapheeno/maapheeno_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 1000,
    catchRate: 75
  },

  // #143 - #144 disso x
  disso: {
    pogedex: 143,
    name: 'disso',
    element:{
      1: 'normal',
      2: null
    },
    stats: {
      hp: 48,
      atk: 48,
      def: 48,
      spatk: 48,
      spdef: 48,
      spd: 48
    },
    evo: {name: 'evo1', lvl: 20},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      frontSprite: 'img/pogemon/143_Disso/Disso_Animation.png',
      backSprite: 'img/pogemon/143_Disso/Disso_Back_Animation.png',
      teamSprite: 'img/pogemon/143_Disso/Disso_Team_Animation.png',
      bagSprite: 'img/pogemon/143_Disso/Disso_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 5000,
    catchRate: 200
  },

  // #145 - #148 dragon line x
  jlissue: {
    pogedex: 145,
    name: 'jlissue',
    element:{
      1: 'dragon',
      2: null
    },
    stats: {
      hp: 60,
      atk: 50,
      def: 60,
      spatk: 50,
      spdef: 60,
      spd: 999,
    },
    evo: {name: 'jleech', lvl: 11},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      2: {move: movesObj.quickattack, lvl: 1},
      3: {move: movesObj.fireball, lvl: 2},
      4: {move: movesObj.tackle, lvl: 3},
      5: {move: movesObj.shadowball, lvl: 10},
      6: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: 'img/pogemon/145_Jlissue/Jlissue_Animation.png',
      backSprite: 'img/pogemon/145_Jlissue/Jlissue_Back_Animation.png',
      teamSprite: 'img/pogemon/145_Jlissue/Jlissue_Team_Animation.png',
      bagSprite: 'img/pogemon/145_Jlissue/Jlissue_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 70,
    catchRate: 75
  },
  jleech: {
    pogedex: 146,
    name: 'jleech',
    element:{
      1: 'dragon',
      2: null
    },
    stats: {
      hp: 70,
      atk: 90,
      def: 70,
      spatk: 70,
      spdef: 70,
      spd: 70,
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.quickattack, lvl: 1},
      2: {move: movesObj.fireball, lvl: 2},
      3: {move: movesObj.tackle, lvl: 3},
      4: {move: movesObj.shadowball, lvl: 10},
      5: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: 'img/pogemon/146_jleech/jleech_Animation.png',
      backSprite: 'img/pogemon/146_jleech/jleech_Back_Animation.png',
      teamSprite: 'img/pogemon/146_jleech/jleech_Team_Animation.png',
      bagSprite: 'img/pogemon/146_jleech/jleech_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 70,
    catchRate: 75
  },
  //have to work on those
  jlorox: {
    pogedex: 147,
    name: 'jlorox',
    element:{
      1: 'dragon',
      2: 'dark'
    },
    stats: {
      hp: 70,
      atk: 125,
      def: 60,
      spatk: 110,
      spdef: 80,
      spd: 130,
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.quickattack, lvl: 1},
      2: {move: movesObj.fireball, lvl: 2},
      3: {move: movesObj.tackle, lvl: 3},
      4: {move: movesObj.shadowball, lvl: 10},
      5: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: 'img/pogemon/147_jlorox/jlorox_Animation.png',
      backSprite: 'img/pogemon/147_jlorox/jlorox_Back_Animation.png',
      teamSprite: 'img/pogemon/147_jlorox/jlorox_Team_Animation.png',
      bagSprite: 'img/pogemon/147_jlorox/jlorox_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 70,
    catchRate: 75
  },
  jleenex: {
    pogedex: 148,
    name: 'jleenex',
    element:{
      1: 'dragon',
      2: 'fairy'
    },
    stats: {
      hp: 130,
      atk: 60,
      def: 110,
      spatk: 80,
      spdef: 125,
      spd: 70,
    },
    evo: null,
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.quickattack, lvl: 1},
      2: {move: movesObj.fireball, lvl: 2},
      3: {move: movesObj.tackle, lvl: 3},
      4: {move: movesObj.shadowball, lvl: 10},
      5: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: 'img/pogemon/148_jleenex/jleenex_Animation.png',
      backSprite: 'img/pogemon/148_jleenex/jleenex_Back_Animation.png',
      teamSprite: 'img/pogemon/148_jleenex/jleenex_Team_Animation.png',
      bagSprite: 'img/pogemon/14_jleenex/jleenex_Bag_Animation.png',
    },
    animationPositions:{
      launch:{
        init: {x: 150, y: 250},
        hit: {x: 100, y: 0}
      },
      receive:{
        init: {x: 0, y: 0},
        hit: {x: -150, y:-250}
      }
    },
    yeild: 70,
    catchRate: 75
  },
}