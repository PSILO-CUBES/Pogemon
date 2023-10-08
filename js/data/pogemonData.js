import { movesObj } from "./movesData.js"

//exp yeild should look like
// first stage : 35 ~ 100
// second stage : 100 ~ 180
// third stage : 180 ~ 250
// legendary/high exp yeilders : 250 ~ 400

export const pogemonsObj = {
  disso: {
    pogedex: 1,
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
      spd: 1
    },
    evo: {name: 'evo1', lvl: 20},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1}
    },
    sprites: {
      frontSprite: '../../img/pogemon/Disso/Disso_Animation',
      backSprite: '../../img/pogemon/Disso/Disso_Back_Animation',
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
    yeild: 1000
  },

  jlissue: {
    pogedex: 2,
    name: 'jlissue',
    element:{
      1: 'dragon',
      2: null
    },
    stats: {
      hp: 55,
      atk: 50,
      def: 50,
      spatk: 60,
      spdef: 60,
      spd: 30,
    },
    evo: {name: 'jleech', lvl: 20},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      2: {move: movesObj.quickattack, lvl: 1},
      3: {move: movesObj.fireball, lvl: 2},
      4: {move: movesObj.tackle, lvl: 7},
      5: {move: movesObj.headbutt, lvl: 10},
      6: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: '../../img/pogemon/Jlissue/Jlissue_Animation',
      backSprite: '../../img/pogemon/Jlissue/Jlissue_Back_Animation',
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
    yeild: 70
  },

  jleech: {
    pogedex: 3,
    name: 'jleech',
    element:{
      1: 'dragon',
      2: null
    },
    stats: {
      hp: 70,
      atk: 70,
      def: 70,
      spatk: 70,
      spdef: 70,
      spd: 70,
    },
    evo: {name: 'jleenex', lvl: 40},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.quickattack, lvl: 1},
      2: {move: movesObj.fireball, lvl: 2},
      3: {move: movesObj.tackle, lvl: 7},
      4: {move: movesObj.headbutt, lvl: 10},
      5: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      frontSprite: '../../img/pogemon/Jleech/Jleech_Animation',
      backSprite: '../../img/pogemon/Jleech/Jleech_Back_Animation',
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
    yeild: 70
  },


}