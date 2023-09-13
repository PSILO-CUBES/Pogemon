import { movesObj } from "./movesData.js"

export const pogemonsObj = {
  disso: {
    id: 1,
    name: 'disso',
    type:{
      1: 'normal',
      2: null
    },
    stats: {
      hp: 60,
      atk: 50,
      def: 50,
      spatk: 50,
      spdef: 50,
      spd: 60
    },
    evolutions: {name: 'evo1', lvl: 20},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.fireBall, lvl: 2},
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
    }
  },
  jleesue: {
    id: 2,
    name: 'jleesue',
    type:{
      1: 'dragon',
      2: null
    },
    stats: {
      hp: 100,
      atk: 9,
      def: 9,
      spatk: 9,
      spdef: 9,
      spd: 9
    },
    evolutions: {name: 'Jleech', lvl: 20},
    abilities: {
      1: 'Transform',
      2: 'Kamiii'
    },
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
    },
    sprites: {
      frontSprite: '../../img/pogemon/Jleesue/Jleesue_Animation',
      backSprite: '../../img/pogemon/Jleesue/Jleesue_Back_Animation',
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
    }
  }
}

export const natureObj = {

}