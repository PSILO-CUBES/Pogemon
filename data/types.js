const types = {
    none:{
        superEffective: [],
        notEffective: [],
        immuned: [],
    },
    normal: {
        superEffective: ['fighting'],
        notEffective: ['rock, steel'],
        immuned: ['ghost'],
    },
    fire: {
        superEffective: ['water', 'ground', 'rock'],
        notEffective: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
        immuned: [],
    },
    water: {
        superEffective: ['electric', 'grass', 'rock'],
        notEffective: ['fire', 'water', 'ice', 'steel'],
        immuned: [],
    },
    electric:{
        superEffective: ['ground'],
        notEffective: ['electric', 'flying', 'steel'],
        immuned: [],
    },
    grass:{
        superEffective: ['fire', 'ice', 'poison', 'flying', 'bug'],
        notEffective: ['water', 'electric', 'grass', 'ground'],
        immuned: [],
    },
    ice: {
        superEffective: ['fire', 'fighting', 'rock', 'steel'],
        notEffective: ['ice'],
        immuned: [],
    },
    fighting: {
        superEffective: ['flying', 'psychic', 'fairy'],
        notEffective: ['rock', 'bug', 'dark'],
        immuned: [],
    },
    poison: {
        superEffective: ['ground', 'psychic'],
        notEffective: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        immuned: [],
    },
    ground: {
        superEffective: ['water', 'grass', 'ice'],
        notEffective: ['poison', 'rock'],
        immuned: ['electric'],
    },
    flying: {
        superEffective: ['electric', 'ice'],
        notEffective: ['grass', 'fighting', 'poison', 'bug'],
        immuned: [],
    },
    psychic: {
        superEffective: ['bug', 'ghost', 'dark'],
        notEffective: ['fighting', 'psychic'],
        immuned: [],
    },
    bug: {
        superEffective: ['fire', 'flying', 'rock'],
        notEffective: ['grass', 'ground'],
        immuned: [],
    },
    rock: {
        superEffective: ['water', 'grass', 'fighting', 'ground', ],
        notEffective: ['normal', 'fire'],
        immuned: [],
    },
    ghost: {
        superEffective: ['ghost', 'dark'],
        notEffective: ['poison', 'bug'],
        immuned: ['normal', 'fighting'],
    },
    dragon: {
        superEffective: ['ice', 'dragon', 'fairy'],
        notEffective: ['fire', 'water', 'electric', 'grass'],
        immuned: [],
    },
    dark: {
        superEffective: ['fighting', 'bug', 'fairy'],
        notEffective: ['ghost', 'dark'],
        immuned: ['psychic'],
    },
    steel: {
        superEffective: ['fighting', 'ground', 'fire'],
        notEffective: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
        immuned: ['poison']
    },
    fairy: {
        superEffective: ['poison', 'steel'],
        notEffective: ['fighting', 'bug', 'dragon'],
        immuned: ['dragon']
    },
}