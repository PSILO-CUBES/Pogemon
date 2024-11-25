import { loadData } from "../save.js"
import { abilitiesObj } from "./abilitiesData.js"
import { movesObj } from "./movesData.js"

// exp yeild should look like
// first stage : 35 ~ 100
// second stage : 100 ~ 180
// third stage : 180 ~ 250
// legendary/high exp yeilders : 250 ~ 400

const data = await loadData('saveFile')

export let pogemonsObj = {
  // #1 - #3 fighting starter
  loko: {
    pogedex: 1,
    name: 'loko',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 80,
      atk: 75,
      def: 50,
      spatk: 30,
      spdef: 30,
      spd: 50
    },
    evo: {name: 'lokol', lvl: 16, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.last_Ditch_Effort, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.super_power, lvl: 1, seen: false},
      2: {move: movesObj.heat_wave, lvl: 1, seen: false},
      3: {move: movesObj.trick_room, lvl: 1, seen: false},
      4: {move: movesObj.leech_seed, lvl: 1, seen: false},
      5: {move: movesObj.headbutt, lvl: 50, seen: false},
      6: {move: movesObj.frost_wave, lvl: 50, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/001_Loko/Loko.png',
        frontSprite: 'img/pogemon/001_Loko/Loko_Animation.png',
        backSprite: 'img/pogemon/001_Loko/Loko_Back_Animation.png',
        teamSprite: 'img/pogemon/001_Loko/Loko_Team_Animation.png',
        bagSprite: 'img/pogemon/001_Loko/Loko_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/001_Loko/Loko_Shiny.png',
        frontSprite: 'img/pogemon/001_Loko/Loko_Animation_Shiny.png',
        backSprite: 'img/pogemon/001_Loko/Loko_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/001_Loko/Loko_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/001_Loko/Loko_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    description: `It's dopamine receptors never build a tolerence, so it's always dopey and active.\n\nRegardless of how aloof it is, it never fails to be by it's friend's side.`,
    yeild: 500,
    catchRate: 75,
    surfable: false
  },
  lokol: {
    pogedex: 2,
    name: 'lokol',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 100,
      atk: 90,
      def: 80,
      spatk: 45,
      spdef: 50,
      spd: 65
    },
    evo: {name: 'lokump', lvl: 31, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.last_Ditch_Effort, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/002_Lokol/Lokol.png',
        frontSprite: 'img/pogemon/002_Lokol/Lokol_Animation.png',
        backSprite: 'img/pogemon/002_Lokol/Lokol_Back_Animation.png',
        teamSprite: 'img/pogemon/002_Lokol/Lokol_Team_Animation.png',
        bagSprite: 'img/pogemon/002_Lokol/Lokol_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/002_Lokol/Lokol_Shiny.png',
        frontSprite: 'img/pogemon/002_Lokol/Lokol_Animation_Shiny.png',
        backSprite: 'img/pogemon/002_Lokol/Lokol_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/002_Lokol/Lokol_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/002_Lokol/Lokol_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
  },
  lokump: {
    pogedex: 3,
    name: 'lokump',
    element:{
      1: 'fighting',
      2: 'dragon'
    },
    stats: {
      hp: 125,
      atk: 115,
      def: 105,
      spatk: 70,
      spdef: 70,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.last_Ditch_Effort, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/003_lokump/lokump.png',
        frontSprite: 'img/pogemon/003_lokump/lokump_Animation.png',
        backSprite: 'img/pogemon/003_lokump/lokump_Back_Animation.png',
        teamSprite: 'img/pogemon/003_lokump/lokump_Team_Animation.png',
        bagSprite: 'img/pogemon/003_lokump/lokump_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/003_lokump/lokump_Shiny.png',
        frontSprite: 'img/pogemon/003_lokump/lokump_Animation_Shiny.png',
        backSprite: 'img/pogemon/003_lokump/lokump_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/003_lokump/lokump_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/003_lokump/lokump_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
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
    evo: {name: 'steeler', lvl: 17, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.sharpened_Edges, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/004_Steeli/Steeli.png',
        frontSprite: 'img/pogemon/004_Steeli/Steeli_Animation.png',
        backSprite: 'img/pogemon/004_Steeli/Steeli_Back_Animation.png',
        teamSprite: 'img/pogemon/004_Steeli/Steeli_Team_Animation.png',
        bagSprite: 'img/pogemon/004_Steeli/Steeli_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/004_Steeli/Steeli_Shiny.png',
        frontSprite: 'img/pogemon/004_Steeli/Steeli_Animation_Shiny.png',
        backSprite: 'img/pogemon/004_Steeli/Steeli_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/004_Steeli/Steeli_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/004_Steeli/Steeli_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 500,
    catchRate: 75,
    surfable: false
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
    evo: {name: 'steevil', lvl: 30, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.sharpened_Edges, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/005_Steeler/Steeler.png',
        frontSprite: 'img/pogemon/005_Steeler/Steeler_Animation.png',
        backSprite: 'img/pogemon/005_Steeler/Steeler_Back_Animation.png',
        teamSprite: 'img/pogemon/005_Steeler/Steeler_Team_Animation.png',
        bagSprite: 'img/pogemon/005_Steeler/Steeler_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/005_Steeler/Steeler_Shiny.png',
        frontSprite: 'img/pogemon/005_Steeler/Steeler_Animation_Shiny.png',
        backSprite: 'img/pogemon/005_Steeler/Steeler_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/005_Steeler/Steeler_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/005_Steeler/Steeler_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
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
    abilities: [
      {ability : abilitiesObj.sharpened_Edges, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/006_Steevil/Steevil.png',
        frontSprite: 'img/pogemon/006_Steevil/Steevil_Animation.png',
        backSprite: 'img/pogemon/006_Steevil/Steevil_Back_Animation.png',
        teamSprite: 'img/pogemon/006_Steevil/Steevil_Team_Animation.png',
        bagSprite: 'img/pogemon/006_Steevil/Steevil_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/006_Steevil/Steevil_Shiny.png',
        frontSprite: 'img/pogemon/006_Steevil/Steevil_Animation_Shiny.png',
        backSprite: 'img/pogemon/006_Steevil/Steevil_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/006_Steevil/Steevil_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/006_Steevil/Steevil_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
  },

  // #7 - #9 fairy starter
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
    evo: {name: 'maaphett', lvl: 15, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.fairy_Tale, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/007_maaph/maaph.png',
        frontSprite: 'img/pogemon/007_maaph/maaph_Animation.png',
        backSprite: 'img/pogemon/007_maaph/maaph_Back_Animation.png',
        teamSprite: 'img/pogemon/007_maaph/maaph_Team_Animation.png',
        bagSprite: 'img/pogemon/007_maaph/maaph_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/007_maaph/maaph_Shiny.png',
        frontSprite: 'img/pogemon/007_maaph/maaph_Animation_Shiny.png',
        backSprite: 'img/pogemon/007_maaph/maaph_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/007_maaph/maaph_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/007_maaph/maaph_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
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
      atk: 50,
      def: 40,
      spatk: 100,
      spdef: 100,
      spd: 80
    },
    evo: {name: 'maapheeno', lvl: 32, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.fairy_Tale, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/008_maaphett/maaphett.png',
        frontSprite: 'img/pogemon/008_maaphett/maaphett_Animation.png',
        backSprite: 'img/pogemon/008_maaphett/maaphett_Back_Animation.png',
        teamSprite: 'img/pogemon/008_maaphett/maaphett_Team_Animation.png',
        bagSprite: 'img/pogemon/008_maaphett/maaphett_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/008_maaphett/maaphett_Shiny.png',
        frontSprite: 'img/pogemon/008_maaphett/maaphett_Animation_Shiny.png',
        backSprite: 'img/pogemon/008_maaphett/maaphett_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/008_maaphett/maaphett_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/008_maaphett/maaphett_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
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
      atk: 70,
      def: 50,
      spatk: 130,
      spdef: 130,
      spd: 105
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.fairy_Tale, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/009_maapheeno/maapheeno.png',
        frontSprite: 'img/pogemon/009_maapheeno/maapheeno_Animation.png',
        backSprite: 'img/pogemon/009_maapheeno/maapheeno_Back_Animation.png',
        teamSprite: 'img/pogemon/009_maapheeno/maapheeno_Team_Animation.png',
        bagSprite: 'img/pogemon/009_maapheeno/maapheeno_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/009_maapheeno/maapheeno_Shiny.png',
        frontSprite: 'img/pogemon/009_maapheeno/maapheeno_Animation_Shiny.png',
        backSprite: 'img/pogemon/009_maapheeno/maapheeno_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/009_maapheeno/maapheeno_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/009_maapheeno/maapheeno_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 1000,
    catchRate: 75,
    surfable: false
  },

  // #10 - #12 shroom line
  piny: {
    pogedex: 10,
    name: 'piny',
    element:{
      1: 'grass',
      2: null
    },
    stats: {
      hp: 50,
      atk: 40,
      def: 40,
      spatk: 60,
      spdef: 70,
      spd: 30
    },
    evo: {name: 'fruity', lvl: 22, type: 'lvl',},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/010_Piny/Piny.png',
        frontSprite: 'img/pogemon/010_Piny/Piny_Animation.png',
        backSprite: 'img/pogemon/010_Piny/Piny_Back_Animation.png',
        teamSprite: 'img/pogemon/010_Piny/Piny_Team_Animation.png',
        bagSprite: 'img/pogemon/010_Piny/Piny_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/010_Piny/Piny_Shiny.png',
        frontSprite: 'img/pogemon/010_Piny/Piny_Animation_Shiny.png',
        backSprite: 'img/pogemon/010_Piny/Piny_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/010_Piny/Piny_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/010_Piny/Piny_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 65,
    catchRate: 200,
    surfable: false
  },
  fruity: {
    pogedex: 11,
    name: 'fruity',
    element:{
      1: 'grass',
      2: 'psychic'
    },
    stats: {
      hp: 80,
      atk: 55,
      def: 55,
      spatk: 80,
      spdef: 90,
      spd: 40
    },
    evo: {name: 'moldy', type:'item', item:'leaf_Stone'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/011_fruity/fruity.png',
        frontSprite: 'img/pogemon/011_fruity/fruity_Animation.png',
        backSprite: 'img/pogemon/011_fruity/fruity_Back_Animation.png',
        teamSprite: 'img/pogemon/011_fruity/fruity_Team_Animation.png',
        bagSprite: 'img/pogemon/011_fruity/fruity_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/011_fruity/fruity_Shiny.png',
        frontSprite: 'img/pogemon/011_fruity/fruity_Animation_Shiny.png',
        backSprite: 'img/pogemon/011_fruity/fruity_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/011_fruity/fruity_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/011_fruity/fruity_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  moldy: {
    pogedex: 12,
    name: 'moldy',
    element:{
      1: 'grass',
      2: 'ghost'
    },
    stats: {
      hp: 120,
      atk: 70,
      def: 80,
      spatk: 110,
      spdef: 120,
      spd: 50
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/012_moldy/moldy.png',
        frontSprite: 'img/pogemon/012_moldy/moldy_Animation.png',
        backSprite: 'img/pogemon/012_moldy/moldy_Back_Animation.png',
        teamSprite: 'img/pogemon/012_moldy/moldy_Team_Animation.png',
        bagSprite: 'img/pogemon/012_moldy/moldy_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/012_moldy/moldy_Shiny.png',
        frontSprite: 'img/pogemon/012_moldy/moldy_Animation_Shiny.png',
        backSprite: 'img/pogemon/012_moldy/moldy_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/012_moldy/moldy_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/012_moldy/moldy_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },

  // #13 - #15 toad line
  tadtoxic: {
    pogedex: 13,
    name: 'tadtoxic',
    element:{
      1: 'water',
      2: 'poison'
    },
    stats: {
      hp: 50,
      atk: 40,
      def: 40,
      spatk: 50,
      spdef: 50,
      spd: 60
    },
    evo: {name: 'venophibian', lvl: 19, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/013_Tadtoxic/Tadtoxic.png',
        frontSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Animation.png',
        backSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Back_Animation.png',
        teamSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Team_Animation.png',
        bagSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Shiny.png',
        frontSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Animation_Shiny.png',
        backSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/013_Tadtoxic/Tadtoxic_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: true
  },
  venophibian: {
    pogedex: 14,
    name: 'venophibian',
    element:{
      1: 'water',
      2: 'poison'
    },
    stats: {
      hp: 70,
      atk: 50,
      def: 60,
      spatk: 80,
      spdef: 70,
      spd: 70
    },
    evo: {name: 'contamitoad', type: 'item', item:'water_Stone'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/014_Venophibian/Venophibian.png',
        frontSprite: 'img/pogemon/014_Venophibian/Venophibian_Animation.png',
        backSprite: 'img/pogemon/014_Venophibian/Venophibian_Back_Animation.png',
        teamSprite: 'img/pogemon/014_Venophibian/Venophibian_Team_Animation.png',
        bagSprite: 'img/pogemon/014_Venophibian/Venophibian_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/014_Venophibian/Venophibian_Shiny.png',
        frontSprite: 'img/pogemon/014_Venophibian/Venophibian_Animation_Shiny.png',
        backSprite: 'img/pogemon/014_Venophibian/Venophibian_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/014_Venophibian/Venophibian_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/014_Venophibian/Venophibian_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: true
  },
  contamitoad: {
    pogedex: 15,
    name: 'contamitoad',
    element:{
      1: 'water',
      2: 'poison'
    },
    stats: {
      hp: 100,
      atk: 100,
      def: 110,
      spatk: 110,
      spdef: 80,
      spd: 50
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/015_Contamitoad/Contamitoad.png',
        frontSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Animation.png',
        backSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Back_Animation.png',
        teamSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Team_Animation.png',
        bagSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/015_Contamitoad/Contamitoad_Shiny.png',
        frontSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Animation_Shiny.png',
        backSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/015_Contamitoad/Contamitoad_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: true
  },

  // #16 - #18 ant line
  formal: {
    pogedex: 16,
    name: 'formal',
    element:{
      1: 'bug',
      2: 'normal'
    },
    stats: {
      hp: 40,
      atk: 60,
      def: 40,
      spatk: 60,
      spdef: 40,
      spd: 50
    },
    evo: [{name: 'Antber', type: 'item', item:'fire_Stone'}, {name: 'Antber', type: 'item', item:'royal_Jelly'}],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/016_formal/formal.png',
        frontSprite: 'img/pogemon/016_formal/formal_Animation.png',
        backSprite: 'img/pogemon/016_formal/formal_Back_Animation.png',
        teamSprite: 'img/pogemon/016_formal/formal_Team_Animation.png',
        bagSprite: 'img/pogemon/016_formal/formal_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/016_formal/formal_Shiny.png',
        frontSprite: 'img/pogemon/016_formal/formal_Animation_Shiny.png',
        backSprite: 'img/pogemon/016_formal/formal_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/016_formal/formal_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/016_formal/formal_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },
  antber: {
    pogedex: 17,
    name: 'antber',
    element:{
      1: 'bug',
      2: 'fire'
    },
    stats: {
      hp: 65,
      atk: 120,
      def: 60,
      spatk: 120,
      spdef: 60,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/017_antber/antber.png',
        frontSprite: 'img/pogemon/017_antber/antber_Animation.png',
        backSprite: 'img/pogemon/017_antber/antber_Back_Animation.png',
        teamSprite: 'img/pogemon/017_antber/antber_Team_Animation.png',
        bagSprite: 'img/pogemon/017_antber/antber_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/017_antber/antber_Shiny.png',
        frontSprite: 'img/pogemon/017_antber/antber_Animation_Shiny.png',
        backSprite: 'img/pogemon/017_antber/antber_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/017_antber/antber_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/017_antber/antber_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },
  regaligyne: {
    pogedex: 18,
    name: 'regaligyne',
    element:{
      1: 'bug',
      2: 'fairy'
    },
    stats: {
      hp: 60,
      atk: 30,
      def: 180,
      spatk: 90,
      spdef: 180,
      spd: 30
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/018_regaligyne/regaligyne.png',
        frontSprite: 'img/pogemon/018_regaligyne/regaligyne_Animation.png',
        backSprite: 'img/pogemon/018_regaligyne/regaligyne_Back_Animation.png',
        teamSprite: 'img/pogemon/018_regaligyne/regaligyne_Team_Animation.png',
        bagSprite: 'img/pogemon/018_regaligyne/regaligyne_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/018_regaligyne/regaligyne_Shiny.png',
        frontSprite: 'img/pogemon/018_regaligyne/regaligyne_Animation_Shiny.png',
        backSprite: 'img/pogemon/018_regaligyne/regaligyne_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/018_regaligyne/regaligyne_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/018_regaligyne/regaligyne_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #19 - #20 ant eater line
  allingua: {
    pogedex: 19,
    name: 'allingua',
    element:{
      1: 'steel',
      2: 'normal'
    },
    stats: {
      hp: 50,
      atk: 60,
      def: 70,
      spatk: 40,
      spdef: 40,
      spd: 30
    },
    evo: {name: 'sterra', lvl: 20, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/019_Allingua/Allingua.png',
        frontSprite: 'img/pogemon/019_Allingua/Allingua_Animation.png',
        backSprite: 'img/pogemon/019_Allingua/Allingua_Back_Animation.png',
        teamSprite: 'img/pogemon/019_Allingua/Allingua_Team_Animation.png',
        bagSprite: 'img/pogemon/019_Allingua/Allingua_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/019_Allingua/Allingua_Shiny.png',
        frontSprite: 'img/pogemon/019_Allingua/Allingua_Animation_Shiny.png',
        backSprite: 'img/pogemon/019_Allingua/Allingua_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/019_Allingua/Allingua_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/019_Allingua/Allingua_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },
  sterra: {
    pogedex: 20,
    name: 'sterra',
    element:{
      1: 'steel',
      2: 'ground'
    },
    stats: {
      hp: 110,
      atk: 100,
      def: 120,
      spatk: 60,
      spdef: 70,
      spd: 60
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/020_Sterra/Sterra.png',
        frontSprite: 'img/pogemon/020_Sterra/Sterra_Animation.png',
        backSprite: 'img/pogemon/020_Sterra/Sterra_Back_Animation.png',
        teamSprite: 'img/pogemon/020_Sterra/Sterra_Team_Animation.png',
        bagSprite: 'img/pogemon/020_Sterra/Sterra_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/020_Sterra/Sterra_Shiny.png',
        frontSprite: 'img/pogemon/020_Sterra/Sterra_Animation_Shiny.png',
        backSprite: 'img/pogemon/020_Sterra/Sterra_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/020_Sterra/Sterra_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/020_Sterra/Sterra_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #21 - #22 kangooroo line
  wallafi: {
    pogedex: 21,
    name: 'wallafi',
    element:{
      1: 'fighting',
      2: 'normal'
    },
    stats: {
      hp: 50,
      atk: 60,
      def: 40,
      spatk: 30,
      spdef: 40,
      spd: 70
    },
    evo: {name: 'kampgooroo', lvl: 21, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.super_power, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/021_Wallafi/Wallafi.png',
        frontSprite: 'img/pogemon/021_Wallafi/Wallafi_Animation.png',
        backSprite: 'img/pogemon/021_Wallafi/Wallafi_Back_Animation.png',
        teamSprite: 'img/pogemon/021_Wallafi/Wallafi_Team_Animation.png',
        bagSprite: 'img/pogemon/021_Wallafi/Wallafi_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/021_Wallafi/Wallafi_Shiny.png',
        frontSprite: 'img/pogemon/021_Wallafi/Wallafi_Animation_Shiny.png',
        backSprite: 'img/pogemon/021_Wallafi/Wallafi_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/021_Wallafi/Wallafi_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/021_Wallafi/Wallafi_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },
  kampgooroo: {
    pogedex: 22,
    name: 'kampgooroo',
    element:{
      1: 'fighting',
      2: 'electric'
    },
    stats: {
      hp: 90,
      atk: 110,
      def: 65,
      spatk: 65,
      spdef: 65,
      spd: 125
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/022_Kampgooroo/Kampgooroo.png',
        frontSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Animation.png',
        backSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Back_Animation.png',
        teamSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Team_Animation.png',
        bagSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Shiny.png',
        frontSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Animation_Shiny.png',
        backSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/022_Kampgooroo/Kampgooroo_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },

  // #23 - #24 sassy bird line
  flailegant: {
    pogedex: 23,
    name: 'flailegant',
    element:{
      1: 'fairy',
      2: 'normal'
    },
    stats: {
      hp: 40,
      atk: 60,
      def: 40,
      spatk: 30,
      spdef: 40,
      spd: 70
    },
    evo: {name: 'kampgooroo', lvl: 23, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/023_Flailegant/Flailegant.png',
        frontSprite: 'img/pogemon/023_Flailegant/Flailegant_Animation.png',
        backSprite: 'img/pogemon/023_Flailegant/Flailegant_Back_Animation.png',
        teamSprite: 'img/pogemon/023_Flailegant/Flailegant_Team_Animation.png',
        bagSprite: 'img/pogemon/023_Flailegant/Flailegant_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/023_Flailegant/Flailegant_Shiny.png',
        frontSprite: 'img/pogemon/023_Flailegant/Flailegant_Animation_Shiny.png',
        backSprite: 'img/pogemon/023_Flailegant/Flailegant_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/023_Flailegant/Flailegant_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/023_Flailegant/Flailegant_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },
  sophistaves: {
    pogedex: 24,
    name: 'sophistaves',
    element:{
      1: 'fairy',
      2: 'flying'
    },
    stats: {
      hp: 100,
      atk: 40,
      def: 50,
      spatk: 110,
      spdef: 120,
      spd: 100
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/024_Sophistaves/Sophistaves.png',
        frontSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Animation.png',
        backSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Back_Animation.png',
        teamSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Team_Animation.png',
        bagSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/024_Sophistaves/Sophistaves_Shiny.png',
        frontSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Animation_Shiny.png',
        backSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/024_Sophistaves/Sophistaves_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },

  // #25 - #26 snek line
  nahass: {
    pogedex: 25,
    name: 'nahass',
    element:{
      1: 'poison',
      2: null
    },
    stats: {
      hp: 50,
      atk: 50,
      def: 50,
      spatk: 40,
      spdef: 50,
      spd: 50
    },
    evo: {name: 'kampgooroo', lvl: 22, type: 'lvl'},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/025_Nahass/Nahass.png',
        frontSprite: 'img/pogemon/025_Nahass/Nahass_Animation.png',
        backSprite: 'img/pogemon/025_Nahass/Nahass_Back_Animation.png',
        teamSprite: 'img/pogemon/025_Nahass/Nahass_Team_Animation.png',
        bagSprite: 'img/pogemon/025_Nahass/Nahass_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/025_Nahass/Nahass_Shiny.png',
        frontSprite: 'img/pogemon/025_Nahass/Nahass_Animation_Shiny.png',
        backSprite: 'img/pogemon/025_Nahass/Nahass_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/025_Nahass/Nahass_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/025_Nahass/Nahass_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },
  ouroboross: {
    pogedex: 26,
    name: 'ouroboross',
    element:{
      1: 'poison',
      2: 'dark'
    },
    stats: {
      hp: 110,
      atk: 100,
      def: 90,
      spatk: 70,
      spdef: 90,
      spd: 60
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/026_Ouroboross/Ouroboross.png',
        frontSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Animation.png',
        backSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Back_Animation.png',
        teamSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Team_Animation.png',
        bagSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/026_Ouroboross/Ouroboross_Shiny.png',
        frontSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Animation_Shiny.png',
        backSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/026_Ouroboross/Ouroboross_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 45,
    catchRate: 200,
    surfable: false
  },

  // #27 - #33 slimes
  slimie: {
    pogedex: 27,
    name: 'slimie',
    element:{
      1: 'normal',
      2: null
    },
    stats: {
      hp: 80,
      atk: 30,
      def: 70,
      spatk: 30,
      spdef: 70,
      spd: 40
    },
    evo: [
      {name: 'flamie', type: 'item', item: 'fire_Stone'},
      {name: 'wettie', type: 'item', item: 'water_Stone'},
      {name: 'grassie', type: 'item', item: 'leaf_Stone'},
      {name: 'statikie', type: 'item', item: 'thunder_Stone'},
      {name: 'pukie', type: 'held', item: 'black_Sludge'},
      {name: 'godlie', type: 'event'},
    ],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/027_Slimie/Slimie.png',
        frontSprite: 'img/pogemon/027_Slimie/Slimie_Animation.png',
        backSprite: 'img/pogemon/027_Slimie/Slimie_Back_Animation.png',
        teamSprite: 'img/pogemon/027_Slimie/Slimie_Team_Animation.png',
        bagSprite: 'img/pogemon/027_Slimie/Slimie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/027_Slimie/Slimie_Shiny.png',
        frontSprite: 'img/pogemon/027_Slimie/Slimie_Animation_Shiny.png',
        backSprite: 'img/pogemon/027_Slimie/Slimie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/027_Slimie/Slimie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/027_Slimie/Slimie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  flamie: {
    pogedex: 28,
    name: 'flamie',
    element:{
      1: 'fire',
      2: null
    },
    stats: {
      hp: 100,
      atk: 80,
      def: 40,
      spatk: 80,
      spdef: 70,
      spd: 70
    },
    evo: [{name: 'godlie', type: 'event'},],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/028_Flamie/Flamie.png',
        frontSprite: 'img/pogemon/028_Flamie/Flamie_Animation.png',
        backSprite: 'img/pogemon/028_Flamie/Flamie_Back_Animation.png',
        teamSprite: 'img/pogemon/028_Flamie/Flamie_Team_Animation.png',
        bagSprite: 'img/pogemon/028_Flamie/Flamie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/028_Flamie/Flamie_Shiny.png',
        frontSprite: 'img/pogemon/028_Flamie/Flamie_Animation_Shiny.png',
        backSprite: 'img/pogemon/028_Flamie/Flamie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/028_Flamie/Flamie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/028_Flamie/Flamie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  wettie: {
    pogedex: 29,
    name: 'wettie',
    element:{
      1: 'water',
      2: null
    },
    stats: {
      hp: 100,
      atk: 50,
      def: 70,
      spatk: 70,
      spdef: 90,
      spd: 60
    },
    evo: [{name: 'godlie', type: 'event'},],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/029_Wettie/Wettie.png',
        frontSprite: 'img/pogemon/029_Wettie/Wettie_Animation.png',
        backSprite: 'img/pogemon/029_Wettie/Wettie_Back_Animation.png',
        teamSprite: 'img/pogemon/029_Wettie/Wettie_Team_Animation.png',
        bagSprite: 'img/pogemon/029_Wettie/Wettie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/029_Wettie/Wettie_Shiny.png',
        frontSprite: 'img/pogemon/029_Wettie/Wettie_Animation_Shiny.png',
        backSprite: 'img/pogemon/029_Wettie/Wettie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/029_Wettie/Wettie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/029_Wettie/Wettie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: true
  },
  grassie: {
    pogedex: 30,
    name: 'grassie',
    element:{
      1: 'grass',
      2: null
    },
    stats: {
      hp: 100,
      atk: 70,
      def: 80,
      spatk: 70,
      spdef: 70,
      spd: 50
    },
    evo: [{name: 'godlie', type: 'event'},],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/030_Grassie/Grassie.png',
        frontSprite: 'img/pogemon/030_Grassie/Grassie_Animation.png',
        backSprite: 'img/pogemon/030_Grassie/Grassie_Back_Animation.png',
        teamSprite: 'img/pogemon/030_Grassie/Grassie_Team_Animation.png',
        bagSprite: 'img/pogemon/030_Grassie/Grassie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/030_Grassie/Grassie_Shiny.png',
        frontSprite: 'img/pogemon/030_Grassie/Grassie_Animation_Shiny.png',
        backSprite: 'img/pogemon/030_Grassie/Grassie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/030_Grassie/Grassie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/030_Grassie/Grassie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  statikie: {
    pogedex: 31,
    name: 'statikie',
    element:{
      1: 'electric',
      2: null
    },
    stats: {
      hp: 100,
      atk: 70,
      def: 40,
      spatk: 90,
      spdef: 50,
      spd: 90
    },
    evo: [{name: 'godlie', type: 'event'},],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/031_Statikie/Statikie.png',
        frontSprite: 'img/pogemon/031_Statikie/Statikie_Animation.png',
        backSprite: 'img/pogemon/031_Statikie/Statikie_Back_Animation.png',
        teamSprite: 'img/pogemon/031_Statikie/Statikie_Team_Animation.png',
        bagSprite: 'img/pogemon/031_Statikie/Statikie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/031_Statikie/Statikie_Shiny.png',
        frontSprite: 'img/pogemon/031_Statikie/Statikie_Animation_Shiny.png',
        backSprite: 'img/pogemon/031_Statikie/Statikie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/031_Statikie/Statikie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/031_Statikie/Statikie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  pukie: {
    pogedex: 32,
    name: 'pukie',
    element:{
      1: 'poison',
      2: null
    },
    stats: {
      hp: 100,
      atk: 50,
      def: 90,
      spatk: 70,
      spdef: 90,
      spd: 40
    },
    evo: [{name: 'godlie', type: 'event'},],
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/032_Pukie/Pukie.png',
        frontSprite: 'img/pogemon/032_Pukie/Pukie_Animation.png',
        backSprite: 'img/pogemon/032_Pukie/Pukie_Back_Animation.png',
        teamSprite: 'img/pogemon/032_Pukie/Pukie_Team_Animation.png',
        bagSprite: 'img/pogemon/032_Pukie/Pukie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/032_Pukie/Pukie_Shiny.png',
        frontSprite: 'img/pogemon/032_Pukie/Pukie_Animation_Shiny.png',
        backSprite: 'img/pogemon/032_Pukie/Pukie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/032_Pukie/Pukie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/032_Pukie/Pukie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },
  godlie: {
    pogedex: 33,
    name: 'godlie',
    element:{
      1: 'normal',
      2: 'ghost'
    },
    stats: {
      hp: 120,
      atk: 70,
      def: 110,
      spatk: 70,
      spdef: 110,
      spd: 120
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/033_Godlie/Godlie.png',
        frontSprite: 'img/pogemon/033_Godlie/Godlie_Animation.png',
        backSprite: 'img/pogemon/033_Godlie/Godlie_Back_Animation.png',
        teamSprite: 'img/pogemon/033_Godlie/Godlie_Team_Animation.png',
        bagSprite: 'img/pogemon/033_Godlie/Godlie_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/033_Godlie/Godlie_Shiny.png',
        frontSprite: 'img/pogemon/033_Godlie/Godlie_Animation_Shiny.png',
        backSprite: 'img/pogemon/033_Godlie/Godlie_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/033_Godlie/Godlie_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/033_Godlie/Godlie_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 5000,
    catchRate: 200,
    surfable: false
  },

  // #34 - #35 ma'at signature pogemon
  balancia: {
      pogedex: 34,
      name: 'balancia',
      element:{
        1: 'normal',
        2: 'psychic'
      },
      stats: {
        hp: 60,
        atk: 60,
        def: 60,
        spatk: 60,
        spdef: 60,
        spd: 60
      },
      evo: {name: 'harmonium', type: 'lvl', lvl: 50},
      abilities: [
        {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
      ],
      movepool: {
        1: {move: movesObj.tackle, lvl: 1, seen: false},
      },
      sprites: {
        classic:{
          sprite: 'img/pogemon/034_Balancia/Balancia.png',
          frontSprite: 'img/pogemon/034_Balancia/Balancia_Animation.png',
          backSprite: 'img/pogemon/034_Balancia/Balancia_Back_Animation.png',
          teamSprite: 'img/pogemon/034_Balancia/Balancia_Team_Animation.png',
          bagSprite: 'img/pogemon/034_Balancia/Balancia_Bag_Animation.png',
        },
        shiny: {
          sprite: 'img/pogemon/034_Balancia/Balancia_Shiny.png',
          frontSprite: 'img/pogemon/034_Balancia/Balancia_Animation_Shiny.png',
          backSprite: 'img/pogemon/034_Balancia/Balancia_Back_Animation_Shiny.png',
          teamSprite: 'img/pogemon/034_Balancia/Balancia_Team_Animation_Shiny.png',
          bagSprite: 'img/pogemon/034_Balancia/Balancia_Bag_Animation_Shiny.png',
        }
      },
      animationPositions:{
        ally:{
          launch:{
            x: 50, y: 250
          },
          receive:{
            x: -50, y:-250
          }
        },
        foe:{
          launch:{
            x: -200, y: 165
          },
          receive:{
            x: -100, y: -50
          }
        }
      },
      yeild: 85,
      catchRate: 200,
      surfable: false
  },
  harmonium: {
      pogedex: 35,
      name: 'harmonium',
      element:{
        1: 'flying',
        2: 'psychic'
      },
      stats: {
        hp: 95,
        atk: 95,
        def: 95,
        spatk: 95,
        spdef: 95,
        spd: 95
      },
      evo: null,
      abilities: [
        {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
      ],
      movepool: {
        1: {move: movesObj.tackle, lvl: 1, seen: false},
      },
      sprites: {
        classic:{
          sprite: 'img/pogemon/035_Harmonium/Harmonium.png',
          frontSprite: 'img/pogemon/035_Harmonium/Harmonium_Animation.png',
          backSprite: 'img/pogemon/035_Harmonium/Harmonium_Back_Animation.png',
          teamSprite: 'img/pogemon/035_Harmonium/Harmonium_Team_Animation.png',
          bagSprite: 'img/pogemon/035_Harmonium/Harmonium_Bag_Animation.png',
        },
        shiny: {
          sprite: 'img/pogemon/035_Harmonium/Harmonium_Shiny.png',
          frontSprite: 'img/pogemon/035_Harmonium/Harmonium_Animation_Shiny.png',
          backSprite: 'img/pogemon/035_Harmonium/Harmonium_Back_Animation_Shiny.png',
          teamSprite: 'img/pogemon/035_Harmonium/Harmonium_Team_Animation_Shiny.png',
          bagSprite: 'img/pogemon/035_Harmonium/Harmonium_Bag_Animation_Shiny.png',
        }
      },
      animationPositions:{
        ally:{
          launch:{
            x: 50, y: 250
          },
          receive:{
            x: -50, y:-250
          }
        },
        foe:{
          launch:{
            x: -200, y: 165
          },
          receive:{
            x: -100, y: -50
          }
        }
      },
      yeild: 85,
      catchRate: 200,
      surfable: false
  },

  // #36 - #38 rock type guy
  sturdle: {
    pogedex: 36,
    name: 'sturdle',
    element:{
      1: 'rock',
      2: null
    },
    stats: {
      hp: 30,
      atk: 60,
      def: 90,
      spatk: 35,
      spdef: 35,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/036_Sturdle/Sturdle.png',
        frontSprite: 'img/pogemon/036_Sturdle/Sturdle_Animation.png',
        backSprite: 'img/pogemon/036_Sturdle/Sturdle_Back_Animation.png',
        teamSprite: 'img/pogemon/036_Sturdle/Sturdle_Team_Animation.png',
        bagSprite: 'img/pogemon/036_Sturdle/Sturdle_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/036_Sturdle/Sturdle_Shiny.png',
        frontSprite: 'img/pogemon/036_Sturdle/Sturdle_Animation_Shiny.png',
        backSprite: 'img/pogemon/036_Sturdle/Sturdle_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/036_Sturdle/Sturdle_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/036_Sturdle/Sturdle_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 100,
    catchRate: 200,
    surfable: false
  },
  punbreakable: {
    pogedex: 37,
    name: 'punbreakable',
    element:{
      1: 'rock',
      2: null
    },
    stats: {
      hp: 60,
      atk: 90,
      def: 120,
      spatk: 50,
      spdef: 50,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/037_Punbreakable/Punbreakable.png',
        frontSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Animation.png',
        backSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Back_Animation.png',
        teamSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Team_Animation.png',
        bagSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/037_Punbreakable/Punbreakable_Shiny.png',
        frontSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Animation_Shiny.png',
        backSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/037_Punbreakable/Punbreakable_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },
  infragice: {
    pogedex: 38,
    name: 'infragice',
    element:{
      1: 'rock',
      2: 'ice'
    },
    stats: {
      hp: 120,
      atk: 110,
      def: 160,
      spatk: 60,
      spdef: 60,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/038_Infragice/Infragice.png',
        frontSprite: 'img/pogemon/038_Infragice/Infragice_Animation.png',
        backSprite: 'img/pogemon/038_Infragice/Infragice_Back_Animation.png',
        teamSprite: 'img/pogemon/038_Infragice/Infragice_Team_Animation.png',
        bagSprite: 'img/pogemon/038_Infragice/Infragice_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/038_Infragice/Infragice_Shiny.png',
        frontSprite: 'img/pogemon/038_Infragice/Infragice_Animation_Shiny.png',
        backSprite: 'img/pogemon/038_Infragice/Infragice_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/038_Infragice/Infragice_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/038_Infragice/Infragice_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #39 - #40 grass sheep line
  grazzer: {
    pogedex: 39,
    name: 'grazzer',
    element:{
      1: 'grass',
      2: 'normal'
    },
    stats: {
      hp: 80,
      atk: 40,
      def: 30,
      spatk: 50,
      spdef: 50,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/039_Grazzer/Grazzer.png',
        frontSprite: 'img/pogemon/039_Grazzer/Grazzer_Animation.png',
        backSprite: 'img/pogemon/039_Grazzer/Grazzer_Back_Animation.png',
        teamSprite: 'img/pogemon/039_Grazzer/Grazzer_Team_Animation.png',
        bagSprite: 'img/pogemon/039_Grazzer/Grazzer_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/039_Grazzer/Grazzer_Shiny.png',
        frontSprite: 'img/pogemon/039_Grazzer/Grazzer_Animation_Shiny.png',
        backSprite: 'img/pogemon/039_Grazzer/Grazzer_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/039_Grazzer/Grazzer_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/039_Grazzer/Grazzer_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },
  mower: {
    pogedex: 40,
    name: 'mower',
    element:{
      1: 'grass',
      2: 'ground'
    },
    stats: {
      hp: 140,
      atk: 100,
      def: 110,
      spatk: 70,
      spdef: 60,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/040_Mower/Mower.png',
        frontSprite: 'img/pogemon/040_Mower/Mower_Animation.png',
        backSprite: 'img/pogemon/040_Mower/Mower_Back_Animation.png',
        teamSprite: 'img/pogemon/040_Mower/Mower_Team_Animation.png',
        bagSprite: 'img/pogemon/040_Mower/Mower_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/040_Mower/Mower_Shiny.png',
        frontSprite: 'img/pogemon/040_Mower/Mower_Animation_Shiny.png',
        backSprite: 'img/pogemon/040_Mower/Mower_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/040_Mower/Mower_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/040_Mower/Mower_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #41 - #42 grass hopper
  sparkust: {
    pogedex: 41,
    name: 'sparkust',
    element:{
      1: 'bug',
      2: 'electric'
    },
    stats: {
      hp: 40,
      atk: 50,
      def: 40,
      spatk: 50,
      spdef: 40,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/041_Sparkust/Sparkust.png',
        frontSprite: 'img/pogemon/041_Sparkust/Sparkust_Animation.png',
        backSprite: 'img/pogemon/041_Sparkust/Sparkust_Back_Animation.png',
        teamSprite: 'img/pogemon/041_Sparkust/Sparkust_Team_Animation.png',
        bagSprite: 'img/pogemon/041_Sparkust/Sparkust_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/041_Sparkust/Sparkust_Shiny.png',
        frontSprite: 'img/pogemon/041_Sparkust/Sparkust_Animation_Shiny.png',
        backSprite: 'img/pogemon/041_Sparkust/Sparkust_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/041_Sparkust/Sparkust_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/041_Sparkust/Sparkust_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },  
  thunderhopper: {
    pogedex: 42,
    name: 'thunderhopper',
    element:{
      1: 'bug',
      2: 'electric'
    },
    stats: {
      hp: 60,
      atk: 105,
      def: 70,
      spatk: 105,
      spdef: 70,
      spd: 130
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/042_ThunderHopper/ThunderHopper.png',
        frontSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Animation.png',
        backSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Back_Animation.png',
        teamSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Team_Animation.png',
        bagSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Shiny.png',
        frontSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Animation_Shiny.png',
        backSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/042_ThunderHopper/ThunderHopper_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #43 golden bull 
  baull: {
    pogedex: 43,
    name: 'baull',
    element:{
      1: 'steel',
      2: 'fighting'
    },
    stats: {
      hp: 110,
      atk: 110,
      def: 120,
      spatk: 80,
      spdef: 60,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/043_Baull/Baull.png',
        frontSprite: 'img/pogemon/043_Baull/Baull_Animation.png',
        backSprite: 'img/pogemon/043_Baull/Baull_Back_Animation.png',
        teamSprite: 'img/pogemon/043_Baull/Baull_Team_Animation.png',
        bagSprite: 'img/pogemon/043_Baull/Baull_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/043_Baull/Baull_Shiny.png',
        frontSprite: 'img/pogemon/043_Baull/Baull_Animation_Shiny.png',
        backSprite: 'img/pogemon/043_Baull/Baull_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/043_Baull/Baull_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/043_Baull/Baull_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #44 dune worm 
  duney: {
    pogedex: 44,
    name: 'duney',
    element:{
      1: 'ground',
      2: null
    },
    stats: {
      hp: 120,
      atk: 110,
      def: 60,
      spatk: 80,
      spdef: 80,
      spd: 110
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/044_Duney/Duney.png',
        frontSprite: 'img/pogemon/044_Duney/Duney_Animation.png',
        backSprite: 'img/pogemon/044_Duney/Duney_Back_Animation.png',
        teamSprite: 'img/pogemon/044_Duney/Duney_Team_Animation.png',
        bagSprite: 'img/pogemon/044_Duney/Duney_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/044_Duney/Duney_Shiny.png',
        frontSprite: 'img/pogemon/044_Duney/Duney_Animation_Shiny.png',
        backSprite: 'img/pogemon/044_Duney/Duney_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/044_Duney/Duney_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/044_Duney/Duney_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 55,
    catchRate: 200,
    surfable: false
  },

  // #45 - #46 rock vaulture line
  cobbird: {
    pogedex: 45,
    name: 'cobbird',
    element:{
      1: 'normal',
      2: 'rock'
    },
    stats: {
      hp: 60,
      atk: 60,
      def: 60,
      spatk: 30,
      spdef: 50,
      spd: 30
    },
    evo: {name: 'Rokwil', type: 'lvl', lvl: 30},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/045_Cobbird/Cobbird.png',
        frontSprite: 'img/pogemon/045_Cobbird/Cobbird_Animation.png',
        backSprite: 'img/pogemon/045_Cobbird/Cobbird_Back_Animation.png',
        teamSprite: 'img/pogemon/045_Cobbird/Cobbird_Team_Animation.png',
        bagSprite: 'img/pogemon/045_Cobbird/Cobbird_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/045_Cobbird/Cobbird_Shiny.png',
        frontSprite: 'img/pogemon/045_Cobbird/Cobbird_Animation_Shiny.png',
        backSprite: 'img/pogemon/045_Cobbird/Cobbird_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/045_Cobbird/Cobbird_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/045_Cobbird/Cobbird_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  rockwil: {
    pogedex: 46,
    name: 'rockwil',
    element:{
      1: 'flying',
      2: 'rock'
    },
    stats: {
      hp: 110,
      atk: 110,
      def: 110,
      spatk: 60,
      spdef: 70,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/046_Rockwil/Rockwil.png',
        frontSprite: 'img/pogemon/046_Rockwil/Rockwil_Animation.png',
        backSprite: 'img/pogemon/046_Rockwil/Rockwil_Back_Animation.png',
        teamSprite: 'img/pogemon/046_Rockwil/Rockwil_Team_Animation.png',
        bagSprite: 'img/pogemon/046_Rockwil/Rockwil_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/046_Rockwil/Rockwil_Shiny.png',
        frontSprite: 'img/pogemon/046_Rockwil/Rockwil_Animation_Shiny.png',
        backSprite: 'img/pogemon/046_Rockwil/Rockwil_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/046_Rockwil/Rockwil_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/046_Rockwil/Rockwil_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #47 - #48 psy spider line
  spidathia: {
    pogedex: 47,
    name: 'spidathia',
    element:{
      1: 'bug',
      2: 'psychic'
    },
    stats: {
      hp: 30,
      atk: 40,
      def: 50,
      spatk: 70,
      spdef: 40,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/047_Spidathia/Spidathia.png',
        frontSprite: 'img/pogemon/047_Spidathia/Spidathia_Animation.png',
        backSprite: 'img/pogemon/047_Spidathia/Spidathia_Back_Animation.png',
        teamSprite: 'img/pogemon/047_Spidathia/Spidathia_Team_Animation.png',
        bagSprite: 'img/pogemon/047_Spidathia/Spidathia_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/047_Spidathia/Spidathia_Shiny.png',
        frontSprite: 'img/pogemon/047_Spidathia/Spidathia_Animation_Shiny.png',
        backSprite: 'img/pogemon/047_Spidathia/Spidathia_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/047_Spidathia/Spidathia_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/047_Spidathia/Spidathia_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  psyranea: {
    pogedex: 48,
    name: 'psyranea',
    element:{
      1: 'bug',
      2: 'psychic'
    },
    stats: {
      hp: 70,
      atk: 90,
      def: 90,
      spatk: 110,
      spdef: 110,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/048_Psyranea/Psyranea.png',
        frontSprite: 'img/pogemon/048_Psyranea/Psyranea_Animation.png',
        backSprite: 'img/pogemon/048_Psyranea/Psyranea_Back_Animation.png',
        teamSprite: 'img/pogemon/048_Psyranea/Psyranea_Team_Animation.png',
        bagSprite: 'img/pogemon/048_Psyranea/Psyranea_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/048_Psyranea/Psyranea_Shiny.png',
        frontSprite: 'img/pogemon/048_Psyranea/Psyranea_Animation_Shiny.png',
        backSprite: 'img/pogemon/048_Psyranea/Psyranea_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/048_Psyranea/Psyranea_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/048_Psyranea/Psyranea_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #49 - #51 sun leopard
  cheeto: {
    pogedex: 49,
    name: 'cheeto',
    element:{
      1: 'fire',
      2: 'rock'
    },
    stats: {
      hp: 50,
      atk: 60,
      def: 40,
      spatk: 50,
      spdef: 40,
      spd: 60
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/049_Cheeto/Cheeto.png',
        frontSprite: 'img/pogemon/049_Cheeto/Cheeto_Animation.png',
        backSprite: 'img/pogemon/049_Cheeto/Cheeto_Back_Animation.png',
        teamSprite: 'img/pogemon/049_Cheeto/Cheeto_Team_Animation.png',
        bagSprite: 'img/pogemon/049_Cheeto/Cheeto_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/049_Cheeto/Cheeto_Shiny.png',
        frontSprite: 'img/pogemon/049_Cheeto/Cheeto_Animation_Shiny.png',
        backSprite: 'img/pogemon/049_Cheeto/Cheeto_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/049_Cheeto/Cheeto_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/049_Cheeto/Cheeto_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  purdustus: {
    pogedex: 50,
    name: 'purdustus',
    element:{
      1: 'fire',
      2: 'rock'
    },
    stats: {
      hp: 70,
      atk: 100,
      def: 60,
      spatk: 70,
      spdef: 50,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/050_Purdustus/Purdustus.png',
        frontSprite: 'img/pogemon/050_Purdustus/Purdustus_Animation.png',
        backSprite: 'img/pogemon/050_Purdustus/Purdustus_Back_Animation.png',
        teamSprite: 'img/pogemon/050_Purdustus/Purdustus_Team_Animation.png',
        bagSprite: 'img/pogemon/050_Purdustus/Purdustus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/050_Purdustus/Purdustus_Shiny.png',
        frontSprite: 'img/pogemon/050_Purdustus/Purdustus_Animation_Shiny.png',
        backSprite: 'img/pogemon/050_Purdustus/Purdustus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/050_Purdustus/Purdustus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/050_Purdustus/Purdustus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  soleo: {
    pogedex: 51,
    name: 'soleo',
    element:{
      1: 'fire',
      2: 'rock'
    },
    stats: {
      hp: 100,
      atk: 120,
      def: 80,
      spatk: 100,
      spdef: 60,
      spd: 100
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/051_Soleo/Soleo.png',
        frontSprite: 'img/pogemon/051_Soleo/Soleo_Animation.png',
        backSprite: 'img/pogemon/051_Soleo/Soleo_Back_Animation.png',
        teamSprite: 'img/pogemon/051_Soleo/Soleo_Team_Animation.png',
        bagSprite: 'img/pogemon/051_Soleo/Soleo_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/051_Soleo/Soleo_Shiny.png',
        frontSprite: 'img/pogemon/051_Soleo/Soleo_Animation_Shiny.png',
        backSprite: 'img/pogemon/051_Soleo/Soleo_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/051_Soleo/Soleo_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/051_Soleo/Soleo_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #52 - #53 flying squirrl
  squiurus: {
    pogedex: 52,
    name: 'squiurus',
    element:{
      1: 'grass',
      2: 'normal'
    },
    stats: {
      hp: 50,
      atk: 50,
      def: 40,
      spatk: 40,
      spdef: 40,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/052_Squiurus/Squiurus.png',
        frontSprite: 'img/pogemon/052_Squiurus/Squiurus_Animation.png',
        backSprite: 'img/pogemon/052_Squiurus/Squiurus_Back_Animation.png',
        teamSprite: 'img/pogemon/052_Squiurus/Squiurus_Team_Animation.png',
        bagSprite: 'img/pogemon/052_Squiurus/Squiurus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/052_Squiurus/Squiurus_Shiny.png',
        frontSprite: 'img/pogemon/052_Squiurus/Squiurus_Animation_Shiny.png',
        backSprite: 'img/pogemon/052_Squiurus/Squiurus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/052_Squiurus/Squiurus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/052_Squiurus/Squiurus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  volaticus: {
    pogedex: 53,
    name: 'volaticus',
    element:{
      1: 'grass',
      2: 'flying'
    },
    stats: {
      hp: 70,
      atk: 100,
      def: 70,
      spatk: 90,
      spdef: 90,
      spd: 120
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/053_Volaticus/Volaticus.png',
        frontSprite: 'img/pogemon/053_Volaticus/Volaticus_Animation.png',
        backSprite: 'img/pogemon/053_Volaticus/Volaticus_Back_Animation.png',
        teamSprite: 'img/pogemon/053_Volaticus/Volaticus_Team_Animation.png',
        bagSprite: 'img/pogemon/053_Volaticus/Volaticus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/053_Volaticus/Volaticus_Shiny.png',
        frontSprite: 'img/pogemon/053_Volaticus/Volaticus_Animation_Shiny.png',
        backSprite: 'img/pogemon/053_Volaticus/Volaticus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/053_Volaticus/Volaticus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/053_Volaticus/Volaticus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #54 - #55 ibis
  adibis: {
    pogedex: 54,
    name: 'adibis',
    element:{
      1: 'water',
      2: 'normal'
    },
    stats: {
      hp: 70,
      atk: 30,
      def: 30,
      spatk: 60,
      spdef: 70,
      spd: 30
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/054_Adibis/Adibis.png',
        frontSprite: 'img/pogemon/054_Adibis/Adibis_Animation.png',
        backSprite: 'img/pogemon/054_Adibis/Adibis_Back_Animation.png',
        teamSprite: 'img/pogemon/054_Adibis/Adibis_Team_Animation.png',
        bagSprite: 'img/pogemon/054_Adibis/Adibis_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/054_Adibis/Adibis_Shiny.png',
        frontSprite: 'img/pogemon/054_Adibis/Adibis_Animation_Shiny.png',
        backSprite: 'img/pogemon/054_Adibis/Adibis_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/054_Adibis/Adibis_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/054_Adibis/Adibis_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  avorago: {
    pogedex: 55,
    name: 'avorago',
    element:{
      1: 'water',
      2: 'flying'
    },
    stats: {
      hp: 110,
      atk: 60,
      def: 60,
      spatk: 110,
      spdef: 120,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/055_Avorago/Avorago.png',
        frontSprite: 'img/pogemon/055_Avorago/Avorago_Animation.png',
        backSprite: 'img/pogemon/055_Avorago/Avorago_Back_Animation.png',
        teamSprite: 'img/pogemon/055_Avorago/Avorago_Team_Animation.png',
        bagSprite: 'img/pogemon/055_Avorago/Avorago_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/055_Avorago/Avorago_Shiny.png',
        frontSprite: 'img/pogemon/055_Avorago/Avorago_Animation_Shiny.png',
        backSprite: 'img/pogemon/055_Avorago/Avorago_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/055_Avorago/Avorago_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/055_Avorago/Avorago_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #56 - #57 ice ferret
  furriticus: {
    pogedex: 56,
    name: 'furriticus',
    element:{
      1: 'ice',
      2: 'electric'
    },
    stats: {
      hp: 40,
      atk: 50,
      def: 30,
      spatk: 60,
      spdef: 40,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/056_Furriticus/Furriticus.png',
        frontSprite: 'img/pogemon/056_Furriticus/Furriticus_Animation.png',
        backSprite: 'img/pogemon/056_Furriticus/Furriticus_Back_Animation.png',
        teamSprite: 'img/pogemon/056_Furriticus/Furriticus_Team_Animation.png',
        bagSprite: 'img/pogemon/056_Furriticus/Furriticus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/056_Furriticus/Furriticus_Shiny.png',
        frontSprite: 'img/pogemon/056_Furriticus/Furriticus_Animation_Shiny.png',
        backSprite: 'img/pogemon/056_Furriticus/Furriticus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/056_Furriticus/Furriticus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/056_Furriticus/Furriticus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  tonifurr: {
    pogedex: 57,
    name: 'tonifurr',
    element:{
      1: 'ice',
      2: 'electric'
    },
    stats: {
      hp: 70,
      atk: 90,
      def: 70,
      spatk: 115,
      spdef: 70,
      spd: 125
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/057_Tonifurr/Tonifurr.png',
        frontSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Animation.png',
        backSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Back_Animation.png',
        teamSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Team_Animation.png',
        bagSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/057_Tonifurr/Tonifurr_Shiny.png',
        frontSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Animation_Shiny.png',
        backSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/057_Tonifurr/Tonifurr_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #58 - #59 snow fox
  salvulpis: {
    pogedex: 58,
    name: 'salvulpis',
    element:{
      1: 'ice',
      2: 'psychic'
    },
    stats: {
      hp: 30,
      atk: 30,
      def: 30,
      spatk: 70,
      spdef: 70,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/058_Salvulpis/Salvulpis.png',
        frontSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Animation.png',
        backSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Back_Animation.png',
        teamSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Team_Animation.png',
        bagSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/058_Salvulpis/Salvulpis_Shiny.png',
        frontSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Animation_Shiny.png',
        backSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/058_Salvulpis/Salvulpis_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  gelidatis: {
    pogedex: 59,
    name: 'gelidatis',
    element:{
      1: 'ice',
      2: 'psychic'
    },
    stats: {
      hp: 70,
      atk: 60,
      def: 60,
      spatk: 120,
      spdef: 120,
      spd: 110
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/059_Gelidatis/Gelidatis.png',
        frontSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Animation.png',
        backSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Back_Animation.png',
        teamSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Team_Animation.png',
        bagSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/059_Gelidatis/Gelidatis_Shiny.png',
        frontSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Animation_Shiny.png',
        backSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/059_Gelidatis/Gelidatis_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #60 - #61 cursed bear line
  earthsa: {
    pogedex: 60,
    name: 'earthsa',
    element:{
      1: 'ground',
      2: null
    },
    stats: {
      hp: 70,
      atk: 70,
      def: 40,
      spatk: 30,
      spdef: 60,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/060_Earthsa/Earthsa.png',
        frontSprite: 'img/pogemon/060_Earthsa/Earthsa_Animation.png',
        backSprite: 'img/pogemon/060_Earthsa/Earthsa_Back_Animation.png',
        teamSprite: 'img/pogemon/060_Earthsa/Earthsa_Team_Animation.png',
        bagSprite: 'img/pogemon/060_Earthsa/Earthsa_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/060_Earthsa/Earthsa_Shiny.png',
        frontSprite: 'img/pogemon/060_Earthsa/Earthsa_Animation_Shiny.png',
        backSprite: 'img/pogemon/060_Earthsa/Earthsa_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/060_Earthsa/Earthsa_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/060_Earthsa/Earthsa_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  ferusand: {
    pogedex: 61,
    name: 'ferusand',
    element:{
      1: 'ground',
      2: 'dark'
    },
    stats: {
      hp: 120,
      atk: 110,
      def: 70,
      spatk: 70,
      spdef: 120,
      spd: 70
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/061_Ferusand/Ferusand.png',
        frontSprite: 'img/pogemon/061_Ferusand/Ferusand_Animation.png',
        backSprite: 'img/pogemon/061_Ferusand/Ferusand_Back_Animation.png',
        teamSprite: 'img/pogemon/061_Ferusand/Ferusand_Team_Animation.png',
        bagSprite: 'img/pogemon/061_Ferusand/Ferusand_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/061_Ferusand/Ferusand_Shiny.png',
        frontSprite: 'img/pogemon/061_Ferusand/Ferusand_Animation_Shiny.png',
        backSprite: 'img/pogemon/061_Ferusand/Ferusand_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/061_Ferusand/Ferusand_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/061_Ferusand/Ferusand_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #62 - #63 cursed dog line
  aquario: {
    pogedex: 62,
    name: 'aquario',
    element:{
      1: 'water',
      2: null
    },
    stats: {
      hp: 60,
      atk: 60,
      def: 40,
      spatk: 50,
      spdef: 40,
      spd: 60
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/062_Aquario/Aquario.png',
        frontSprite: 'img/pogemon/062_Aquario/Aquario_Animation.png',
        backSprite: 'img/pogemon/062_Aquario/Aquario_Back_Animation.png',
        teamSprite: 'img/pogemon/062_Aquario/Aquario_Team_Animation.png',
        bagSprite: 'img/pogemon/062_Aquario/Aquario_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/062_Aquario/Aquario_Shiny.png',
        frontSprite: 'img/pogemon/062_Aquario/Aquario_Animation_Shiny.png',
        backSprite: 'img/pogemon/062_Aquario/Aquario_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/062_Aquario/Aquario_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/062_Aquario/Aquario_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  cataclismus: {
    pogedex: 63,
    name: 'cataclismus',
    element:{
      1: 'water',
      2: 'fire'
    },
    stats: {
      hp: 80,
      atk: 120,
      def: 70,
      spatk: 120,
      spdef: 70,
      spd: 90
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/063_Cataclismus/Cataclismus.png',
        frontSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Animation.png',
        backSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Back_Animation.png',
        teamSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Team_Animation.png',
        bagSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/063_Cataclismus/Cataclismus_Shiny.png',
        frontSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Animation_Shiny.png',
        backSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/063_Cataclismus/Cataclismus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #64 - #65 demiurge line
  skopt: {
    pogedex: 64,
    name: 'skopt',
    element:{
      1: 'dark',
      2: null
    },
    stats: {
      hp: 40,
      atk: 40,
      def: 70,
      spatk: 90,
      spdef: 40,
      spd: 40
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/064_Skopt/Skopt.png',
        frontSprite: 'img/pogemon/064_Skopt/Skopt_Animation.png',
        backSprite: 'img/pogemon/064_Skopt/Skopt_Back_Animation.png',
        teamSprite: 'img/pogemon/064_Skopt/Skopt_Team_Animation.png',
        bagSprite: 'img/pogemon/064_Skopt/Skopt_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/064_Skopt/Skopt_Shiny.png',
        frontSprite: 'img/pogemon/064_Skopt/Skopt_Animation_Shiny.png',
        backSprite: 'img/pogemon/064_Skopt/Skopt_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/064_Skopt/Skopt_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/064_Skopt/Skopt_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },
  yaldabaoth: {
    pogedex: 65,
    name: 'yaldabaoth',
    element:{
      1: 'dark',
      2: 'dragon'
    },
    stats: {		
      hp: 100,
      atk: 60,
      def: 120,
      spatk: 140,
      spdef: 70,
      spd: 80
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth.png',
        frontSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Animation.png',
        backSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Back_Animation.png',
        teamSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Team_Animation.png',
        bagSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Shiny.png',
        frontSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Animation_Shiny.png',
        backSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/065_Yaldabaoth/Yaldabaoth_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 85,
    catchRate: 200,
    surfable: false
  },

  // #66 - #69 dragon line
  jlissue: {
    pogedex: 66,
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
      spd: 1,
    },
    evo: {name: 'jleech', type:'lvl', lvl: 11,},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/066_Jlissue/Jlissue.png',
        frontSprite: 'img/pogemon/066_Jlissue/Jlissue_Animation.png',
        backSprite: 'img/pogemon/066_Jlissue/Jlissue_Back_Animation.png',
        teamSprite: 'img/pogemon/066_Jlissue/Jlissue_Team_Animation.png',
        bagSprite: 'img/pogemon/066_Jlissue/Jlissue_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/066_Jlissue/Jlissue_Shiny.png',
        frontSprite: 'img/pogemon/066_Jlissue/Jlissue_Animation_Shiny.png',
        backSprite: 'img/pogemon/066_Jlissue/Jlissue_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/066_Jlissue/Jlissue_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/066_Jlissue/Jlissue_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: false
  },
  jleech: {
    pogedex: 67,
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
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/067_Jleech/Jleech.png',
        frontSprite: 'img/pogemon/067_Jleech/Jleech_Animation.png',
        backSprite: 'img/pogemon/067_Jleech/Jleech_Back_Animation.png',
        teamSprite: 'img/pogemon/067_Jleech/Jleech_Team_Animation.png',
        bagSprite: 'img/pogemon/067_Jleech/Jleech_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/067_Jleech/Jleech_Shiny.png',
        frontSprite: 'img/pogemon/067_Jleech/Jleech_Animation_Shiny.png',
        backSprite: 'img/pogemon/067_Jleech/Jleech_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/067_Jleech/Jleech_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/067_Jleech/Jleech_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: false
  },
  jlorox: {
    pogedex: 68,
    name: 'jlorox',
    element:{
      1: 'dragon',
      2: 'poison'
    },
    stats: {
      hp: 70,
      atk: 125,
      def: 60,
      spatk: 80,
      spdef: 100,
      spd: 130,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/068_Jlorox/Jlorox.png',
        frontSprite: 'img/pogemon/068_Jlorox/Jlorox_Animation.png',
        backSprite: 'img/pogemon/068_Jlorox/Jlorox_Back_Animation.png',
        teamSprite: 'img/pogemon/068_Jlorox/Jlorox_Team_Animation.png',
        bagSprite: 'img/pogemon/068_Jlorox/Jlorox_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/068_Jlorox/Jlorox_Shiny.png',
        frontSprite: 'img/pogemon/068_Jlorox/Jlorox_Animation_Shiny.png',
        backSprite: 'img/pogemon/068_Jlorox/Jlorox_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/068_Jlorox/Jlorox_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/068_Jlorox/Jlorox_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: false
  },
  jleenex: {
    pogedex: 69,
    name: 'jleenex',
    element:{
      1: 'dragon',
      2: 'fairy'
    },
    stats: {
      hp: 130,
      atk: 100,
      def: 90,
      spatk: 60,
      spdef: 125,
      spd: 60,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/069_Jleenex/Jleenex.png',
        frontSprite: 'img/pogemon/069_Jleenex/Jleenex_Animation.png',
        backSprite: 'img/pogemon/069_Jleenex/Jleenex_Back_Animation.png',
        teamSprite: 'img/pogemon/069_Jleenex/Jleenex_Team_Animation.png',
        bagSprite: 'img/pogemon/069_Jleenex/Jleenex_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/069_Jleenex/Jleenex_Shiny.png',
        frontSprite: 'img/pogemon/069_Jleenex/Jleenex_Animation_Shiny.png',
        backSprite: 'img/pogemon/069_Jleenex/Jleenex_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/069_Jleenex/Jleenex_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/069_Jleenex/Jleenex_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: false
  },

  // #70 horus legendary
  vignus: {
    pogedex: 70,
    name: 'vignus',
    element:{
      1: 'flying',
      2: 'ground'
    },
    stats: {
      hp: 110,
      atk: 135,
      def: 75,
      spatk: 90,
      spdef: 75,
      spd: 135,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/070_Vignus/Vignus.png',
        frontSprite: 'img/pogemon/070_Vignus/Vignus_Animation.png',
        backSprite: 'img/pogemon/070_Vignus/Vignus_Back_Animation.png',
        teamSprite: 'img/pogemon/070_Vignus/Vignus_Team_Animation.png',
        bagSprite: 'img/pogemon/070_Vignus/Vignus_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/070_Vignus/Vignus_Shiny.png',
        frontSprite: 'img/pogemon/070_Vignus/Vignus_Animation_Shiny.png',
        backSprite: 'img/pogemon/070_Vignus/Vignus_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/070_Vignus/Vignus_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/070_Vignus/Vignus_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #71 anubis legendary
  mortdux: {
    pogedex: 71,
    name: 'mortdux',
    element:{
      1: 'ghost',
      2: 'steel'
    },
    stats: {
      hp: 100,
      atk: 80,
      def: 140,
      spatk: 120,
      spdef: 110,
      spd: 70,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/071_Mortdux/Mortdux.png',
        frontSprite: 'img/pogemon/071_Mortdux/Mortdux_Animation.png',
        backSprite: 'img/pogemon/071_Mortdux/Mortdux_Back_Animation.png',
        teamSprite: 'img/pogemon/071_Mortdux/Mortdux_Team_Animation.png',
        bagSprite: 'img/pogemon/071_Mortdux/Mortdux_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/071_Mortdux/Mortdux_Shiny.png',
        frontSprite: 'img/pogemon/071_Mortdux/Mortdux_Animation_Shiny.png',
        backSprite: 'img/pogemon/071_Mortdux/Mortdux_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/071_Mortdux/Mortdux_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/071_Mortdux/Mortdux_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #72 ra legendary
  caera: {
    pogedex: 72,
    name: 'caera',
    element:{
      1: 'fire',
      2: 'electric'
    },
    stats: {
      hp: 70,
      atk: 110,
      def: 70,
      spatk: 140,
      spdef: 90,
      spd: 140,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/072_Caera/Caera.png',
        frontSprite: 'img/pogemon/072_Caera/Caera_Animation.png',
        backSprite: 'img/pogemon/072_Caera/Caera_Back_Animation.png',
        teamSprite: 'img/pogemon/072_Caera/Caera_Team_Animation.png',
        bagSprite: 'img/pogemon/072_Caera/Caera_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/072_Caera/Caera_Shiny.png',
        frontSprite: 'img/pogemon/072_Caera/Caera_Animation_Shiny.png',
        backSprite: 'img/pogemon/072_Caera/Caera_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/072_Caera/Caera_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/072_Caera/Caera_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #73 thoth legendary
  papiens: {
    pogedex: 73,
    name: 'papiens',
    element:{
      1: 'water',
      2: 'psychic'
    },
    stats: {
      hp: 100,
      atk: 70,
      def: 110,
      spatk: 120,
      spdef: 130,
      spd: 90,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/073_Papiens/Papiens.png',
        frontSprite: 'img/pogemon/073_Papiens/Papiens_Animation.png',
        backSprite: 'img/pogemon/073_Papiens/Papiens_Back_Animation.png',
        teamSprite: 'img/pogemon/073_Papiens/Papiens_Team_Animation.png',
        bagSprite: 'img/pogemon/073_Papiens/Papiens_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/073_Papiens/Papiens_Shiny.png',
        frontSprite: 'img/pogemon/073_Papiens/Papiens_Animation_Shiny.png',
        backSprite: 'img/pogemon/073_Papiens/Papiens_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/073_Papiens/Papiens_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/073_Papiens/Papiens_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #74 osiris legendary
  sustiris: {
    pogedex: 74,
    name: 'sustiris',
    element:{
      1: 'grass',
      2: 'ice'
    },
    stats: {
      hp: 150,
      atk: 90,
      def: 150,
      spatk: 90,
      spdef: 90,
      spd: 90,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/074_Sustiris/Sustiris.png',
        frontSprite: 'img/pogemon/074_Sustiris/Sustiris_Animation.png',
        backSprite: 'img/pogemon/074_Sustiris/Sustiris_Back_Animation.png',
        teamSprite: 'img/pogemon/074_Sustiris/Sustiris_Team_Animation.png',
        bagSprite: 'img/pogemon/074_Sustiris/Sustiris_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/074_Sustiris/Sustiris_Shiny.png',
        frontSprite: 'img/pogemon/074_Sustiris/Sustiris_Animation_Shiny.png',
        backSprite: 'img/pogemon/074_Sustiris/Sustiris_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/074_Sustiris/Sustiris_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/074_Sustiris/Sustiris_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #75 bastet + isis legendary
  beeasis: {
    pogedex: 75,
    name: 'beeasis',
    element:{
      1: 'ghost',
      2: 'poison'
    },
    stats: {
      hp: 90,
      atk: 90,
      def: 90,
      spatk: 150,
      spdef: 90,
      spd: 150,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/075_Beeasis/Beeasis.png',
        frontSprite: 'img/pogemon/075_Beeasis/Beeasis_Animation.png',
        backSprite: 'img/pogemon/075_Beeasis/Beeasis_Back_Animation.png',
        teamSprite: 'img/pogemon/075_Beeasis/Beeasis_Team_Animation.png',
        bagSprite: 'img/pogemon/075_Beeasis/Beeasis_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/075_Beeasis/Beeasis_Shiny.png',
        frontSprite: 'img/pogemon/075_Beeasis/Beeasis_Animation_Shiny.png',
        backSprite: 'img/pogemon/075_Beeasis/Beeasis_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/075_Beeasis/Beeasis_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/075_Beeasis/Beeasis_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #76 set legendary
  malumtehk: {
    pogedex: 76,
    name: 'malumtehk',
    element:{
      1: 'fighting',
      2: 'dark'
    },
    stats: {
      hp: 90,
      atk: 150,
      def: 90,
      spatk: 90,
      spdef: 150,
      spd: 90,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/076_Malumtehk/Malumtehk.png',
        frontSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Animation.png',
        backSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Back_Animation.png',
        teamSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Team_Animation.png',
        bagSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/076_Malumtehk/Malumtehk_Shiny.png',
        frontSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Animation_Shiny.png',
        backSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/076_Malumtehk/Malumtehk_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #77 jesus legendary
  dahgua: {
    pogedex: 77,
    name: 'dahgua',
    element:{
      1: 'water',
      2: 'fairy'
    },
    stats: {
      hp: 130,
      atk: 100,
      def: 100,
      spatk: 130,
      spdef: 130,
      spd: 130,
    },
    evo: null,
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/077_Dahgua/Dahgua.png',
        frontSprite: 'img/pogemon/077_Dahgua/Dahgua_Animation.png',
        backSprite: 'img/pogemon/077_Dahgua/Dahgua_Back_Animation.png',
        teamSprite: 'img/pogemon/077_Dahgua/Dahgua_Team_Animation.png',
        bagSprite: 'img/pogemon/077_Dahgua/Dahgua_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/077_Dahgua/Dahgua_Shiny.png',
        frontSprite: 'img/pogemon/077_Dahgua/Dahgua_Animation_Shiny.png',
        backSprite: 'img/pogemon/077_Dahgua/Dahgua_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/077_Dahgua/Dahgua_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/077_Dahgua/Dahgua_Bag_Animation_Shiny.png',
      }
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 70,
    catchRate: 75,
    surfable: true
  },

  // #??? disso
  disso: {
    pogedex: 99,
    name: 'disso',
    element:{
      1: 'normal',
      2: null
    },
    stats: {
      hp: 48,
      atk: 1,
      def: 9999,
      spatk: 1,
      spdef: 48,
      spd: 1
    },
    evo: {name: 'evo1', lvl: 20},
    abilities: [
      {ability : abilitiesObj.pick_Up, seen: false, hidden: false},
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1, seen: false},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/143_Disso/Disso.png',
        frontSprite: 'img/pogemon/143_Disso/Disso_Animation.png',
        backSprite: 'img/pogemon/143_Disso/Disso_Back_Animation.png',
        teamSprite: 'img/pogemon/143_Disso/Disso_Team_Animation.png',
        bagSprite: 'img/pogemon/143_Disso/Disso_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/143_Disso/Disso_Shiny.png',
        frontSprite: 'img/pogemon/143_Disso/Disso_Animation_Shiny.png',
        backSprite: 'img/pogemon/143_Disso/Disso_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/143_Disso/Disso_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/143_Disso/Disso_Bag_Animation_Shiny.png',
      },
    },
    animationPositions:{
      ally:{
        launch:{
          x: 50, y: 250
        },
        receive:{
          x: -50, y:-250
        }
      },
      foe:{
        launch:{
          x: -200, y: 165
        },
        receive:{
          x: -100, y: -50
        }
      }
    },
    yeild: 50000,
    catchRate: 200,
    surfable: false
  },
}

if(data != null) {
  Object.values(pogemonsObj).forEach((pogemon, i) =>{
    Object.values(pogemon.abilities).forEach((ability, j) =>{
        ability.seen = Object.values(Object.values(data.pogemonsObjState)[i]['abilities'])[j].seen
    })

    
    Object.values(pogemon.movepool).forEach((move, j) =>{
      move.seen = Object.values(Object.values(data.pogemonsObjState)[i]['moves'])[j].seen
    })
  })

  data.pogemonsObjState
}

// console.log(data.pogemonsObjState)
// if(data != null) pogemonsObj = data.pogemonsObjState