// no type = none

const pogemons = {

    Lokump:{
        image: {
            src: './img/pogemon/Lokump/Lokump_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Lokump/Lokump_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Lokump/Lokump_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Lokump/Lokump_Menu_Animation.png',
            },
        },
        frames:{ // a changer
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Lokump',
        type: {
            type1: 'fighting',
            type2: 'none'
        },
        baseStats: {
            HP: 80,
            Atk: 75,
            Def: 40,
            SpAtk: 40,
            SpDef: 40,
            Spd: 40,
        },
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Buff,learned:true},
            {lvl:6,move:attacks.Growl,learned:false},
            {lvl:7,move:attacks.Lokick,learned:false},
            {lvl:7,move:attacks.Strangering,learned:false},
            {lvl:7,move:attacks.Rest,learned:false},
        ],
        attacks: [attacks.Tackle, attacks.Buff],
        abilities: [{name: 'Last Effort', desc: 'When the user HP is below 25%, fighting moves become stronger.'}, ],
        catchRate: 75,
        evolution: {
            name: 'Lokepit', 
            level: 15
        },
    },

    Lokepit:{
        image: {
            src: './img/pogemon/Lokepit/Lokepit_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Lokepit/Lokepit_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Lokepit/Lokepit_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Lokepit/Lokepit_Menu_Animation.png',
            },
        },
        frames:{ // a changer
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Lokepit',
        type: {
            type1: 'fighting',
            type2: 'none'
        },
        baseStats: {
            HP: 100,
            Atk: 90,
            Def: 60,
            SpAtk: 60,
            SpDef: 60,
            Spd: 60,
        },
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Lokick,learned:false},
            {lvl:7,move:attacks.Fireball,learned:false},
            {lvl:8,move:attacks.Strangering,learned:false},
        ],
        attacks: [attacks.Lokick, attacks.Rest],
        abilities: [{name: 'Last Effort', desc: 'When the user HP is below 25%, fighting moves become stronger.'}, ],
        catchRate: 50,
        evolution: {
            name: 'Lokorot', 
            level: 40
        },
    },

    Lokorot:{
        image: {
            src: './img/pogemon/Lokorot/Lokorot_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Lokorot/Lokorot_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Lokorot/Lokorot_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Lokorot/Lokorot_Menu_Animation.png',
            },
        },
        frames:{ // a changer
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Lokorot',
        type: {
            type1: 'fighting',
            type2: 'none'
        },
        baseStats: {
            HP: 125,
            Atk: 120,
            Def: 80,
            SpAtk: 80,
            SpDef: 80,
            Spd: 80,
        },
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Lokick,learned:false},
            {lvl:7,move:attacks.Fireball,learned:false},
            {lvl:8,move:attacks.Strangering,learned:false},
        ],
        attacks: [attacks.Lokick, attacks.Rest],
        catchRate: 25,
        abilities: [{name: 'Last Effort', desc: 'When the user HP is below 25%, fighting moves become stronger.'}, ],
        evolution: {
            name: 'none', 
            level: null
        },
    },

    Steeli: {
        image: {
            src: './img/pogemon/Steeli/Steeli_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Steeli/Steeli_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Steeli/Steeli_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Steeli/Steeli_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Steeli',
        type: {
            type1: 'steel',
            type2: 'none'
        },
        baseStats: {
            HP: 50,
            Atk: 50,
            Def: 65,
            SpAtk: 50,
            SpDef: 65,
            Spd: 35,
        },
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attacks: [attacks.Tackle],
        abilities: [{name: 'Sharpened by Erosion', desc: 'When the user HP is below 25%, steel moves become stronger.'}, ],
        catchRate: 75,
        evolution: {
            name: 'Steeloor', 
            level: 15
        },
    },

    Steeloor: {
        image: {
            src: './img/pogemon/Steeloor/Steeloor_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Steeloor/Steeloor_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Steeloor/Steeloor_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Steeloor/Steeloor_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Steeloor',
        type: {
            type1: 'steel',
            type2: 'dark'
        },
        baseStats: {
            HP: 65,
            Atk: 65,
            Def: 90,
            SpAtk: 65,
            SpDef: 90,
            Spd: 55,
        },
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attacks: [attacks.Tackle],
        abilities: [{name: 'Sharpened by Erosion', desc: 'When the user HP is below 25%, steel moves become stronger.'}, ],
        catchRate: 50,
        evolution: {
            name: 'Steetorr', 
            level: 40
        },
    },

    Steevil: {
        image: {
            src: './img/pogemon/Steevil/Steevil_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Steevil/Steevil_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Steevil/Steevil_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Steevil/Steevil_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Steevil',
        type: {
            type1: 'steel',
            type2: 'dark'
        },
        baseStats: {
            HP: 85,
            Atk: 80,
            Def: 120,
            SpAtk: 80,
            SpDef: 120,
            Spd: 80,
        },
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        expCurve: 'normalExpCurve',
        attacks: [attacks.Tackle],
        abilities: [{name: 'Sharpened by Erosion', desc: 'When the user HP is below 25%, steel moves become stronger.'}, ],
        catchRate: 25,
        evolution: {
            name: 'none', 
            level: null
        },
    },

    Maaph: {
        image: {
            src: './img/pogemon/Maaph/Maaph_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Maaph/Maaph_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Maaph/Maaph_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Maaph/Maaph_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Maaph',
        type: {
            type1: 'fairy',
            type2: 'ghost'
        },
        baseStats: {
            HP: 50,
            Atk: 30,
            Def: 30,
            SpAtk: 70,
            SpDef: 70,
            Spd: 60,
        },
        expCurve: 'normalExpCurve',
        expYield: 60,
        attackPool: [
            {lvl:1,move:attacks.Strangering,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Fireball,learned:false},
            {lvl:7,move:attacks.Tackle,learned:false},
            {lvl:8,move:attacks.Lokick,learned:false},
        ],
        attacks: [attacks.Strangering, attacks.Rest],
        catchRate: 75,
        abilities: [{name: `Final Chapter`, desc: `When the user HP is below 25%, fairy moves become stronger.`}, ],
        evolution: {
            name: 'Maaphett', 
            level: 15
        },
    },

    Maaphett: {
        image: {
            src: './img/pogemon/Maaphett/Maaphett_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Maaphett/Maaphett_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Maaphett/Maaphett_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Maaphett/Maaphett_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Maaphett',
        type: {
            type1: 'fairy',
            type2: 'ghost'
        },
        baseStats: {
            HP: 70,
            Atk: 50,
            Def: 50,
            SpAtk: 90,
            SpDef: 90,
            Spd: 80,
        },
        expCurve: 'normalExpCurve',
        expYield: 140,
        attackPool: [
            {lvl:1,move:attacks.Strangering,learned:true},
            {lvl:6,move:attacks.Rest,learned:true},
        ],
        attacks: [attacks.Strangering, attacks.Rest],
        catchRate: 50,
        abilities: [{name: `Final Chapter`, desc: 'When the user HP is below 25%, fairy moves become stronger.'}, ],
        evolution: {
            name: 'Maapheeno',
            level: 40
        },
    },

    Maapheeno: {
        image: {
            src: './img/pogemon/Maapheeno/Maapheeno_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Maapheeno/Maapheeno_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Maapheeno/Maapheeno_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Maapheeno/Maapheeno_Menu_Animation.png',
            },
        },
        frames:{
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Maapheeno',
        type: {
            type1: 'fairy',
            type2: 'ghost'
        },
        baseStats: {
            HP: 80,
            Atk: 70,
            Def: 70,
            SpAtk: 120,
            SpDef: 120,
            Spd: 105,
        },
        expCurve: 'normalExpCurve',
        expYield: 140,
        attackPool: [
            {lvl:1,move:attacks.Strangering,learned:true},
            {lvl:6,move:attacks.Rest,learned:true},
        ],
        attacks: [attacks.Strangering, attacks.Rest],
        catchRate: 25,
        abilities: [{name: `Final Chapter`, desc: 'When the user HP is below 25%, fairy moves become stronger.'}, ],
        evolution: {
            name: 'none',
            level: null
        },
    },

    Jleesue:{
        image: {
            src: './img/pogemon/Jleesue/Jleesue_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Jleesue/Jleesue_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Jleesue/Jleesue_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Jleesue/Jleesue_Menu_Animation.png',
            },
        },
        frames:{ // a changer
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Jleesue',
        type: {
            type1: 'dragon',
            type2: 'none'
        },
        baseStats: {
            HP: 55,
            Atk: 60,
            Def: 45,
            SpAtk: 60,
            SpDef: 45,
            Spd: 50,
        },
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Lokick,learned:false},
            {lvl:7,move:attacks.Fireball,learned:false},
            {lvl:8,move:attacks.Strangering,learned:false},
        ],
        attacks: [attacks.Lokick, attacks.Rest],
        catchRate: 75,
        abilities: [{name: `Final Chapter`, desc: 'When the user HP is below 25%, fairy moves become stronger.'}, ],
        evolution: {
            name: 'Jleech', 
            level: 15
        },
    },

    Jleech:{
        image: {
            src: './img/pogemon/Jleech/Jleech_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Jleech/Jleech_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Jleech/Jleech_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Jleech/Jleech_Menu_Animation.png',
            },
        },
        frames:{ // a changer
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Jleech',
        type: {
            type1: 'dragon',
            type2: 'none'
        },
        baseStats: {
            HP: 70,
            Atk: 80,
            Def: 60,
            SpAtk: 80,
            SpDef: 60,
            Spd: 80,
        },
        expCurve: 'normalExpCurve',
        expYield: 1000,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Lokick,learned:false},
            {lvl:7,move:attacks.Fireball,learned:false},
            {lvl:8,move:attacks.Strangering,learned:false},
        ],
        attacks: [attacks.Lokick, attacks.Rest],
        catchRate: 50,
        abilities: ['Run Away'],
        evolution: {
            name: 'Jleenox', 
            level: 15
        },
    },

    Disso: {
        image: {
            src: './img/pogemon/Disso/Disso_Animation.png',
        },
        sprites: {
            animation: {
                src: './img/pogemon/Disso/Disso_Animation.png',
            },
            backAnimation: {
                src: './img/pogemon/Disso/Disso_Back_Animation.png',
            },
            menuAnimation: {
                src: './img/pogemon/Disso/Disso_Menu_Animation.png',
            }
        },
        frames: {
            max: 4,
            hold: 50
        },
        animate: true,
        isEnemy: true,
        name: 'Disso',
        type: {
            type1: 'normal',
            type2: 'none'
        },
        baseStats: {
            HP: 7,
            Atk: 7,
            Def: 7,
            SpAtk: 7,
            SpDef: 7,
            Spd: 7,
        },
        expCurve: 'slowExpCurve',
        expYield: 40,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        abilities: ['Run Away'],
        catchRate: 99,
        attacks: [attacks.Tackle],
    }
}