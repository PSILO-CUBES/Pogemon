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
            hold: 100
        },
        animate: true,
        isEnemy: true, // a changer
        name: 'Lokump',
        type: {
            type1: 'normal',
            type2: 'none'
        },
        baseStats: {
            HP: 40,
            Atk: 60,
            Def: 30,
            SpAtk: 60,
            SpDef: 30,
            Spd: 70,
        },
        expCurve: 'normalExpCurve',
        expYield: 60,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Fireball,learned:false},
        ],
        attacks: [attacks.Tackle],
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
            hold: 100
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
            Atk: 30,
            Def: 80,
            SpAtk: 30,
            SpDef: 80,
            Spd: 30,
        },
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Fireball,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        expCurve: 'normalExpCurve',
        expYield: 60,
        attacks: [attacks.Tackle, attacks.Fireball],
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
            hold: 100
        },
        animate: true,
        isEnemy: true,
        name: 'Maaph',
        type: {
            type1: 'fairy',
            type2: 'none'
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
            {lvl:1,move:attacks.Fireball,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Tackle,learned:false},
        ],
        attacks: [attacks.Fireball, attacks.Rest],
        evolution: {name: 'Maaphett', level: 20},
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
            hold: 100
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
            {lvl:1,move:attacks.Fireball,learned:true},
            {lvl:1,move:attacks.Rest,learned:true},
            {lvl:6,move:attacks.Tackle,learned:false},
        ],
        attacks: [attacks.Fireball, attacks.Rest],
        evolution: {name: 'Maapheeno', level: 40},
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
            hold: 100
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
        expYield: 7,
        attackPool: [
            {lvl:1,move:attacks.Tackle,learned:true},
            {lvl:1,move:attacks.Fireball,learned:true},
            {lvl:6,move:attacks.Rest,learned:false},
        ],
        attacks: [attacks.Tackle],
    }
}