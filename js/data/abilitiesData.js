import { itemsObj } from "./itemsData.js";

export const abilitiesObj = {
    // utility abilities
    pick_Up: {
        name: 'pick_Up',
        type: 'pick_Up',
        desc: 'Whenever you are traveling with this companion, you have a very small chance to pick up a cool item!',
        info:{
            itemList:[
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
                [{item: itemsObj.banana, odds: 25}, {item: itemsObj.potion, odds: 50}, {item: itemsObj.pogeball, odds: 75}, {item: itemsObj.resurrect, odds: 100}],
            ]
        }
    },

    //elemental abilities
    blaze:{
        name: 'blaze',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's fire type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'fire'
        }
    },
    torrent:{
        name: 'torrent',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's water type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'water'
        }
    },
    overgrow:{
        name: 'overgrow',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's grass type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'grass'
        }
    },
    swarm:{
        name: 'swarm',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's bug type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'bug'
        }
    },
    last_Ditch_Effort:{
        name: 'last_Ditch_Effort',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's fighting type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'fighting'
        }
    },
    sharpened_Edges:{
        name: 'sharpened_Edges',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's steel type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'steel'
        }
    },
    fairy_Tale:{
        name: 'fairy_Tale',
        type: 'lowHpDamageBoost',
        desc: "Boosts this pogemon's fairy type attacks when in a pinch.",
        info: {
            threshold: 30,
            pow: 50,
            type: 'fairy'
        }
    },

    // status abilities
    hot_Stuff:{
        name: 'hot_Stuff',
        type: 'lowHpDamageBoost',
        desc: "has a 10% chance to burn",
        info: {
            threshold: 30,
            pow: 50,
            type: 'fairy'
        }
    },

    //battle abilities
    levitate:{
        name: 'levitate',
        type: 'immuned',
        desc: "gives the ability to levitate, becoming immuned to ground type attacks",
        info: {
            type: 'ground'
        }
    },
}