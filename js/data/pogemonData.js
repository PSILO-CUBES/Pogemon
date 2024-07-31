import { abilitiesObj } from "./abilitiesData.js"
import { movesObj } from "./movesData.js"

// exp yeild should look like
// first stage : 35 ~ 100
// second stage : 100 ~ 180
// third stage : 180 ~ 250
// legendary/high exp yeilders : 250 ~ 400

export const pogemonsObj = {
  // #1 - #3 fighting starter
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
    evo: {name: 'lokol', lvl: 16, type: 'lvl'},
    abilities: [
      abilitiesObj.last_Ditch_Effort
    ],
    movepool: {
      1: {move: movesObj.super_power, lvl: 1},
      2: {move: movesObj.fire_ball, lvl: 1},
      3: {move: movesObj.trick_room, lvl: 50},
      4: {move: movesObj.tackle, lvl: 50},
      5: {move: movesObj.headbutt, lvl: 50},
      6: {move: movesObj.frost_wave, lvl: 50},
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
      hp: 90,
      atk: 90,
      def: 60,
      spatk: 60,
      spdef: 60,
      spd: 70
    },
    evo: {name: 'lokump', lvl: 31, type: 'lvl'},
    abilities: [
      abilitiesObj.last_Ditch_Effort
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.growl, lvl: 17},
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
    abilities: [
      abilitiesObj.last_Ditch_Effort
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.sharpened_Edges
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.sharpened_Edges
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.slash, lvl: 15},
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
      abilitiesObj.sharpened_Edges
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.fairy_Tale
    ],
    movepool: {
      1: {move: movesObj.shadow_ball, lvl: 1},
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
      atk: 40,
      def: 50,
      spatk: 100,
      spdef: 100,
      spd: 80
    },
    evo: {name: 'maapheeno', lvl: 32, type: 'lvl'},
    abilities: [
      abilitiesObj.fairy_Tale
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 50,
      def: 70,
      spatk: 130,
      spdef: 130,
      spd: 105
    },
    evo: null,
    abilities: [
      abilitiesObj.fairy_Tale
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 30,
      def: 30,
      spatk: 60,
      spdef: 60,
      spd: 30
    },
    evo: {name: 'fruity', lvl: 22, type: 'lvl',},
    abilities: [
      abilitiesObj.overgrow
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 45,
      def: 45,
      spatk: 80,
      spdef: 100,
      spd: 50
    },
    evo: {name: 'moldy', type:'item', item:'leaf_Stone'},
    abilities: [
      abilitiesObj.overgrow
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      hp: 80,
      atk: 45,
      def: 45,
      spatk: 80,
      spdef: 100,
      spd: 50
    },
    evo: null,
    abilities: [
      abilitiesObj.overgrow
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 30,
      def: 30,
      spatk: 60,
      spdef: 60,
      spd: 30
    },
    evo: {name: 'venophibian', lvl: 19, type: 'lvl'},
    abilities: [
      abilitiesObj.torrent
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.torrent
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 90,
      def: 100,
      spatk: 120,
      spdef: 70,
      spd: 35
    },
    evo: null,
    abilities: [
      abilitiesObj.torrent
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 70,
      def: 30,
      spatk: 70,
      spdef: 30,
      spd: 40
    },
    evo: [{name: 'Antber', type: 'item', item:'fire_Stone'}, {name: 'Antber', type: 'item', item:'royal_Jelly'}],
    abilities: [
      abilitiesObj.swarm,
      abilitiesObj.blaze
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.fire_ball, lvl: 7}
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
      hp: 60,
      atk: 110,
      def: 60,
      spatk: 110,
      spdef: 60,
      spd: 80
    },
    evo: null,
    abilities: [
      abilitiesObj.swarm,
      abilitiesObj.blaze
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.fire_ball, lvl: 7}
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
      atk: 60,
      def: 170,
      spatk: 60,
      spdef: 170,
      spd: 20
    },
    evo: null,
    abilities: [
      abilitiesObj.swarm,
      abilitiesObj.blaze
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.fire_ball, lvl: 7}
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
      1: 'normal',
      2: 'steel'
    },
    stats: {
      hp: 60,
      atk: 60,
      def: 50,
      spatk: 40,
      spdef: 40,
      spd: 30
    },
    evo: {name: 'sterra', lvl: 20, type: 'lvl'},
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      1: 'ground',
      2: 'steel'
    },
    stats: {
      hp: 100,
      atk: 100,
      def: 90,
      spatk: 60,
      spdef: 80,
      spd: 40
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      1: 'normal',
      2: 'fighting'
    },
    stats: {
      hp: 40,
      atk: 60,
      def: 40,
      spatk: 30,
      spdef: 40,
      spd: 70
    },
    evo: {name: 'kampgooroo', lvl: 21, type: 'lvl'},
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      1: 'electric',
      2: 'fighting'
    },
    stats: {
      hp: 70,
      atk: 110,
      def: 60,
      spatk: 50,
      spdef: 60,
      spd: 120
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      1: 'normal',
      2: 'fairy'
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      1: 'flying',
      2: 'fairy'
    },
    stats: {
      hp: 90,
      atk: 40,
      def: 50,
      spatk: 100,
      spdef: 120,
      spd: 80
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      atk: 60,
      def: 30,
      spatk: 40,
      spdef: 50,
      spd: 50
    },
    evo: {name: 'kampgooroo', lvl: 22, type: 'lvl'},
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      hp: 100,
      atk: 100,
      def: 70,
      spatk: 70,
      spdef: 80,
      spd: 50
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
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

  // #34 - #37 rock type guy
  sturdle: {
    pogedex: 34,
    name: 'sturdle',
    element:{
      1: 'rock',
      2: null
    },
    stats: {
      hp: 40,
      atk: 60,
      def: 40,
      spatk: 30,
      spdef: 40,
      spd: 70
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/034_Sturdle/Sturdle.png',
        frontSprite: 'img/pogemon/034_Sturdle/Sturdle_Animation.png',
        backSprite: 'img/pogemon/034_Sturdle/Sturdle_Back_Animation.png',
        teamSprite: 'img/pogemon/034_Sturdle/Sturdle_Team_Animation.png',
        bagSprite: 'img/pogemon/034_Sturdle/Sturdle_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/034_Sturdle/Sturdle_Shiny.png',
        frontSprite: 'img/pogemon/034_Sturdle/Sturdle_Animation_Shiny.png',
        backSprite: 'img/pogemon/034_Sturdle/Sturdle_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/034_Sturdle/Sturdle_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/034_Sturdle/Sturdle_Bag_Animation_Shiny.png',
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
    pogedex: 35,
    name: 'punbreakable',
    element:{
      1: 'rock',
      2: null
    },
    stats: {
      hp: 70,
      atk: 90,
      def: 120,
      spatk: 60,
      spdef: 60,
      spd: 50
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/035_Punbreakable/Punbreakable.png',
        frontSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Animation.png',
        backSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Back_Animation.png',
        teamSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Team_Animation.png',
        bagSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/035_Punbreakable/Punbreakable_Shiny.png',
        frontSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Animation_Shiny.png',
        backSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/035_Punbreakable/Punbreakable_Bag_Animation_Shiny.png',
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
  infraglacies: {
    pogedex: 36,
    name: 'infraglacies',
    element:{
      1: 'rock',
      2: 'ice'
    },
    stats: {
      hp: 100,
      atk: 120,
      def: 150,
      spatk: 70,
      spdef: 70,
      spd: 50
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7}
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/036_Infraglacies/Infraglacies.png',
        frontSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Animation.png',
        backSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Back_Animation.png',
        teamSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Team_Animation.png',
        bagSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/036_Infraglacies/Infraglacies_Shiny.png',
        frontSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Animation_Shiny.png',
        backSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/036_Infraglacies/Infraglacies_Bag_Animation_Shiny.png',
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

  // #38 - #39 ma'at signature pogemon
  balancia: {
    pogedex: 38,
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.fire_ball, lvl: 7},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/038_Balancia/Balancia.png',
        frontSprite: 'img/pogemon/038_Balancia/Balancia_Animation.png',
        backSprite: 'img/pogemon/038_Balancia/Balancia_Back_Animation.png',
        teamSprite: 'img/pogemon/038_Balancia/Balancia_Team_Animation.png',
        bagSprite: 'img/pogemon/038_Balancia/Balancia_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/038_Balancia/Balancia_Shiny.png',
        frontSprite: 'img/pogemon/038_Balancia/Balancia_Animation_Shiny.png',
        backSprite: 'img/pogemon/038_Balancia/Balancia_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/038_Balancia/Balancia_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/038_Balancia/Balancia_Bag_Animation_Shiny.png',
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
    pogedex: 39,
    name: 'harmonium',
    element:{
      1: 'normal',
      2: 'psychic'
    },
    stats: {
      hp: 100,
      atk: 100,
      def: 100,
      spatk: 100,
      spdef: 100,
      spd: 100
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.fire_ball, lvl: 7},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/039_Harmonium/Harmonium.png',
        frontSprite: 'img/pogemon/039_Harmonium/Harmonium_Animation.png',
        backSprite: 'img/pogemon/039_Harmonium/Harmonium_Back_Animation.png',
        teamSprite: 'img/pogemon/039_Harmonium/Harmonium_Team_Animation.png',
        bagSprite: 'img/pogemon/039_Harmonium/Harmonium_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/039_Harmonium/Harmonium_Shiny.png',
        frontSprite: 'img/pogemon/039_Harmonium/Harmonium_Animation_Shiny.png',
        backSprite: 'img/pogemon/039_Harmonium/Harmonium_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/039_Harmonium/Harmonium_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/039_Harmonium/Harmonium_Bag_Animation_Shiny.png',
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

  // #40 - #41 rock vaulture line
  cobbird: {
    pogedex: 40,
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
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.fire_ball, lvl: 7},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/040_Cobbird/Cobbird.png',
        frontSprite: 'img/pogemon/040_Cobbird/Cobbird_Animation.png',
        backSprite: 'img/pogemon/040_Cobbird/Cobbird_Back_Animation.png',
        teamSprite: 'img/pogemon/040_Cobbird/Cobbird_Team_Animation.png',
        bagSprite: 'img/pogemon/040_Cobbird/Cobbird_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/040_Cobbird/Cobbird_Shiny.png',
        frontSprite: 'img/pogemon/040_Cobbird/Cobbird_Animation_Shiny.png',
        backSprite: 'img/pogemon/040_Cobbird/Cobbird_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/040_Cobbird/Cobbird_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/040_Cobbird/Cobbird_Bag_Animation_Shiny.png',
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
    pogedex: 41,
    name: 'rockwil',
    element:{
      1: 'flying',
      2: 'rock'
    },
    stats: {
      hp: 100,
      atk: 90,
      def: 90,
      spatk: 60,
      spdef: 70,
      spd: 100
    },
    evo: null,
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
      2: {move: movesObj.headbutt, lvl: 7},
      3: {move: movesObj.fire_ball, lvl: 7},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/041_Rockwil/Rockwil.png',
        frontSprite: 'img/pogemon/041_Rockwil/Rockwil_Animation.png',
        backSprite: 'img/pogemon/041_Rockwil/Rockwil_Back_Animation.png',
        teamSprite: 'img/pogemon/041_Rockwil/Rockwil_Team_Animation.png',
        bagSprite: 'img/pogemon/041_Rockwil/Rockwil_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/041_Rockwil/Rockwil_Shiny.png',
        frontSprite: 'img/pogemon/041_Rockwil/Rockwil_Animation_Shiny.png',
        backSprite: 'img/pogemon/041_Rockwil/Rockwil_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/041_Rockwil/Rockwil_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/041_Rockwil/Rockwil_Bag_Animation_Shiny.png',
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

  // #143 - #144 disso
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
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.tackle, lvl: 1},
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

  // #145 - #148 dragon line
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
      spd: 1,
    },
    evo: {name: 'jleech', type:'lvl', lvl: 11,},
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.fire_ball, lvl: 1},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/145_Jlissue/Jlissue.png',
        frontSprite: 'img/pogemon/145_Jlissue/Jlissue_Animation.png',
        backSprite: 'img/pogemon/145_Jlissue/Jlissue_Back_Animation.png',
        teamSprite: 'img/pogemon/145_Jlissue/Jlissue_Team_Animation.png',
        bagSprite: 'img/pogemon/145_Jlissue/Jlissue_Bag_Animation.png',
      },
      shiny:{
        sprite: 'img/pogemon/145_Jlissue/Jlissue_Shiny.png',
        frontSprite: 'img/pogemon/145_Jlissue/Jlissue_Animation_Shiny.png',
        backSprite: 'img/pogemon/145_Jlissue/Jlissue_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/145_Jlissue/Jlissue_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/145_Jlissue/Jlissue_Bag_Animation_Shiny.png',
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
    abilities: [
      null
    ],
    movepool: {
      1: {move: movesObj.shadow_ball, lvl: 10},
    },
    sprites: {
      classic:{
        sprite: 'img/pogemon/146_jleech/jleech.png',
        frontSprite: 'img/pogemon/146_jleech/jleech_Animation.png',
        backSprite: 'img/pogemon/146_jleech/jleech_Back_Animation.png',
        teamSprite: 'img/pogemon/146_jleech/jleech_Team_Animation.png',
        bagSprite: 'img/pogemon/146_jleech/jleech_Bag_Animation.png',
      },
      shiny: {
        sprite: 'img/pogemon/146_jleech/jleech_Shiny.png',
        frontSprite: 'img/pogemon/146_jleech/jleech_Animation_Shiny.png',
        backSprite: 'img/pogemon/146_jleech/jleech_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/146_jleech/jleech_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/146_jleech/jleech_Bag_Animation_Shiny.png',
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
    abilities: [
      abilitiesObj.pick_Up
    ],
    movepool: {
      1: {move: movesObj.quick_attack, lvl: 1},
      2: {move: movesObj.fire_ball, lvl: 2},
      3: {move: movesObj.tackle, lvl: 3},
      4: {move: movesObj.shadow_ball, lvl: 10},
      5: {move: movesObj.slash, lvl: 10},
    },
    sprites: {
      classic:{
        frontSprite: 'img/pogemon/147_jlorox/jlorox_Animation.png',
        backSprite: 'img/pogemon/147_jlorox/jlorox_Back_Animation.png',
        teamSprite: 'img/pogemon/147_jlorox/jlorox_Team_Animation.png',
        bagSprite: 'img/pogemon/147_jlorox/jlorox_Bag_Animation.png',
      },
      shiny: {
        frontSprite: 'img/pogemon/147_jlorox/jlorox_Animation_Shiny.png',
        backSprite: 'img/pogemon/147_jlorox/jlorox_Back_Animation_Shiny.png',
        teamSprite: 'img/pogemon/147_jlorox/jlorox_Team_Animation_Shiny.png',
        bagSprite: 'img/pogemon/147_jlorox/jlorox_Bag_Animation_Shiny.png',
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
  // jleenex: {
  //   pogedex: 148,
  //   name: 'jleenex',
  //   element:{
  //     1: 'dragon',
  //     2: 'fairy'
  //   },
  //   stats: {
  //     hp: 130,
  //     atk: 60,
  //     def: 110,
  //     spatk: 80,
  //     spdef: 125,
  //     spd: 70,
  //   },
  //   evo: null,
  //   abilities: [
  //     abilitiesObj.pick_Up
  //   ],
  //   movepool: {
  //     1: {move: movesObj.quick_attack, lvl: 1},
  //     2: {move: movesObj.fire_ball, lvl: 2},
  //     3: {move: movesObj.tackle, lvl: 3},
  //     4: {move: movesObj.shadow_ball, lvl: 10},
  //     5: {move: movesObj.slash, lvl: 10},
  //   },
  //   sprites: {
  //     classic:{
  //       frontSprite: 'img/pogemon/148_jleenex/jleenex_Animation.png',
  //       backSprite: 'img/pogemon/148_jleenex/jleenex_Back_Animation.png',
  //       teamSprite: 'img/pogemon/148_jleenex/jleenex_Team_Animation.png',
  //       bagSprite: 'img/pogemon/148_jleenex/jleenex_Bag_Animation.png',
  //     },
  //     shiny: {
  //       frontSprite: 'img/pogemon/148_jleenex/jleenex_Animation_Shiny.png',
  //       backSprite: 'img/pogemon/148_jleenex/jleenex_Back_Animation_Shiny.png',
  //       teamSprite: 'img/pogemon/148_jleenex/jleenex_Team_Animation_Shiny.png',
  //       bagSprite: 'img/pogemon/148_jleenex/jleenex_Bag_Animation_Shiny.png',
  //     }
  //   },
  //   animationPositions:{
  //     ally:{
  //       launch:{
  //         x: 50, y: 250
  //       },
  //       receive:{
  //         x: -50, y:-250
  //       }
  //     },
  //     foe:{
  //       launch:{
  //         x: -200, y: 165
  //       },
  //       receive:{
  //         x: -100, y: -50
  //       }
  //     }
  //   },
  //   yeild: 70,
  //   catchRate: 75,
  //   surfable: false
  // },
}