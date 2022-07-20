const types = {
    none:{
        veryEffective: [],
        notEffective: [],
        immuned: [],
    },
    normal: {
        veryEffective: ['fighting'],
        notEffective: [],
        immuned: ['ghost'],
    },
    fire: {
        veryEffective: ['water', 'ground', 'rock'],
        notEffective: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
        immuned: [],
    },
    water: {
        veryEffective: ['electric', 'grass', 'rock'],
        notEffective: ['fire', 'water', 'ice', 'steel'],
        immuned: [],
    },
    electric:{
        veryEffective: ['ground'],
        notEffective: ['electric', 'flying', 'steel'],
        immuned: [],
    },
    grass:{
        veryEffective: ['fire', 'ice', 'poison', 'flying', 'bug'],
        notEffective: ['water', 'electric', 'grass', 'ground'],
        immuned: [],
    },
    ice: {
        veryEffective: ['fire', 'fighting', 'rock', 'steel'],
        notEffective: ['ice'],
        immuned: [],
    },
    fighting: {
        veryEffective: ['flying', 'psychic', 'fairy'],
        notEffective: ['rock', 'bug', 'dark'],
        immuned: [],
    },
    poison: {
        veryEffective: ['ground', 'psychic'],
        notEffective: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        immuned: [],
    },
    ground: {
        veryEffective: ['water', 'grass', 'ice'],
        notEffective: ['poison', 'rock'],
        immuned: ['electric'],
    },
    flying: {
        veryEffective: ['electric', 'ice'],
        notEffective: ['grass', 'fighting', 'poison', 'bug'],
        immuned: [],
    },
    psychic: {
        veryEffective: ['bug', 'ghost', 'dark'],
        notEffective: ['fighting', 'psychic'],
        immuned: [],
    },
    bug: {
        veryEffective: ['fire', 'flying', 'rock'],
        notEffective: ['grass', 'ground'],
        immuned: [],
    },
    rock: {
        veryEffective: ['water', 'grass', 'fighting', 'ground', ],
        notEffective: ['normal', 'fire'],
        immuned: [],
    },
    ghost: {
        veryEffective: ['ghost', 'dark'],
        notEffective: ['poison', 'bug'],
        immuned: ['normal', 'fighting'],
    },
    dragon: {
        veryEffective: ['ice', 'dragon', 'fairy'],
        notEffective: ['fire', 'water', 'electric', 'grass'],
        immuned: [],
    },
    dark: {
        veryEffective: ['fighting', 'bug', 'fairy'],
        notEffective: ['ghost', 'dark'],
        immuned: ['psychic'],
    },
    steel: {
        veryEffective: ['fighting', 'ground', 'fire'],
        notEffective: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
        immuned: ['poison']
    },
    fairy: {
        veryEffective: ['poison', 'steel'],
        notEffective: ['fighting', 'bug', 'dragon'],
        immuned: ['dragon']
    },
}