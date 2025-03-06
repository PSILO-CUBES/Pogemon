import { itemsObj } from "./itemsData.js";

export const abilitiesObj = {
    // OW utility
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

    // battle utility
    run_Away:{
        name: 'run_Away',
        desc: "100% chance to run away from wild battles",
        info: null
    },
    prankster:{
        name: 'prankster',
        desc: "gives +1 priority on every status move this pogemon uses.",
        info: null
    },
    shadow_Tag:{
        name: 'shadow_Tag',
        info: 'trap',
        desc: "prevents the opponent from switching out.",
        info: null
    },
    arena_Trap:{
        name: 'arena_Trap',
        info: 'trap',
        desc: "prevents the opponent from switching out.",
        info: null
    },
    infiltrator:{
        name: 'infiltrator',
        desc: "ignores protect, substitute and screens.",
        info: null
    },
    serene_Grace:{
        name: 'serene_Grace',
        desc: "doubles all the move's secondary effects chance to happen.",
        info: null
    },
    natural_Cure:{
        name: 'natural_Cure',
        desc: "heals the user's status condition when it switches out.",
        info: null
    },
    cheeck_Pouch:{
        name: 'cheeck_Pouch',
        desc: "heals the user for 33% of it's max HP when it eats a berry.",
        info: null
    },
    gluttony:{
        name: 'gluttony',
        desc: "makes the user eat it's berry soon that it would otherwise.",
        info: null
    },
    rock_Head:{
        name: 'rock_Head',
        type: 'noRecoil',
        desc: "prevent the user from hurting itself with recoil.",
        info: null
    },
    scrappy:{
        name: 'scrappy',
        desc: "Fighting/Normal moves hit Ghost. Immune to Intimidate.",
        info: null
    },
    sturdy:{
        name: 'sturdy',
        desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP.",
        info: null
    },
    no_Guard:{
        name: 'no_Guard',
        desc: "Every move used by or against this Pokemon will always hit.",
        info: null
    },
    frisk:{
        name: 'frisk',
        desc: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
        info: null
    },
    mold_Breaker:{
        name: 'mold_Breaker',
        desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
        info: null
    },
    synchronize:{
        name: 'synchronize',
        desc: "If another Pokemon burns/poisons/paralyzes this Pokemon, it also gets that status.",
        info: null
    },
    magic_Bounce:{
        name: 'magic_Bounce',
        desc: "This Pokemon blocks certain Status moves and bounces them back to the user.",
        info: null
    },

    // stats
    intimidate:{
        name: 'intimidate',
        desc: "On switch-in, this Pokemon lowers the Attack of opponent by 1 stage.",
        effects: [{name: 'debuff', target:'atk', pow: 1, type: 'stats'}],
        info: null
    },
    defiant:{
        name: 'defiant',
        desc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered.",
        effects: [{name: 'buff', target:'atk', pow: 2, type: 'stats'}],
        info: null
    },
    fluffy_Coat:{
        name: 'fluffy_Coat',
        desc: "This Pogemon's defence is doubled, but takes 2x damage from Fire moves.",
        effects: [{name: 'buff', target:'atk', pow: 2, type: 'stats'}],
        info: null
    },
    weak_Armor:{
        name: 'weak_Armor',
        desc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 2.",
        effects: [{name: 'selfDebuff', target:'def', pow: 1, type: 'stats'}, {name: 'buff', target:'spd', pow: 2, type: 'stats'}],
        info: null
    },
    contrary:{
        name: 'contrary',
        desc: "if this pogemon has a stat stage raised it is lowered instead, and vice versa.",
        info: null
    },
    unaware:{
        name: 'unaware',
        desc: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage.",
        info: null
    },

    // healing
    regenerator:{
        name: 'regenerator',
        desc: "heals the user for 33% of it's max HP when it switches out.",
        info: null
    },
    slimie_regeneration:{
        name: 'slimie_regeneration',
        desc: "User heals 1/16th of it's Max HP at the end of every turn.",
    },
    queen_Lair:{
        name: 'queen_Lair',
        desc: "User heals x/16th of it's Max HP at the end of every turn.\n\nx depends on the total number of ant pogemon on this pogemon's team.",
    },

    // elemental
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

    // status rng
    hot_Stuff:{
        name: 'hot_Stuff',
        type: 'status',
        desc: "adds a 10% chance to burn on every attack.",
        info: {
            pow: 10,
            type: 'burn'
        }
    },
    frozen_Soul:{
        name: 'frozen_Soul',
        type: 'status',
        desc: "adds a 10% chance to freeze on every attack.",
        info: {
            pow: 10,
            type: 'frz'
        }
    },
    statik:{
        name: 'statik',
        type: 'status',
        desc: "adds a 10% chance to paralyze on every attack.",
        info: {
            pow: 10,
            type: 'para'
        }
    },
    poison_touch:{
        name: 'poison_touch',
        type: 'status',
        desc: "adds a 20% chance to poison on every attack.",
        info: {
            pow: 20,
            type: 'psn'
        }
    },

    // status immuned
    sweet_Veil:{
        name: 'sweet_Veil',
        type: 'status',
        desc: "prevents the user from being forced to sleep.",
        info: null
    },
    big_Pecks:{
        name: 'big_Pecks',
        desc: "prevents the user's defence from being lowered.",
        info: null
    },

    // damage immuned
    levitate:{
        name: 'levitate',
        type: 'immuned',
        desc: "gives the ability to levitate, becoming immuned to ground type attacks.",
        info: {
            type: 'ground'
        }
    },
    sap_Sipper:{
        name: 'sap_Sipper',
        type: 'immuned',
        desc: "the user saps all grass moves sent it's way and raises it's attack by 1 stage.",
        effects: [{name: 'buff', target:'atk', pow: 1, type: 'stats'}],
        info: {
            type: 'grass',
            statusType: 'statsSelf'
        }
    },
    water_Absorb:{
        name: 'water_Absorb',
        type: 'immuned',
        desc: "the user absobs water moves sent it's way and heals 25% of it's max hp.",
        effects: 25,
        info: {
            type: 'water',
            statusType: 'heal'
        }
    },
    volt_Absorb:{
        name: 'volt_Absorb',
        type: 'immuned',
        desc: "the user absobs electric moves sent it's way and heals 25% of it's max hp.",
        effects: 25,
        info: {
            type: 'electric',
            statusType: 'heal'
        }
    },

    // on-switch weather
    drought:{
        name: 'drought',
        type: 'initWeather',
        desc: "Makes the sun stronger when the user gets onto the battlefield.",
        info: 'sun'
    },
    drizzle:{
        name: 'drizzle',
        type: 'initWeather',
        desc: "Summons rain when the user gets onto the battlefield.",
        info: 'rain'
    },
    sand_Stream:{
        name: 'sand_Stream',
        type: 'initWeather',
        desc: "Starts a sand stream when the user gets onto the battlefield.",
        info: 'sand'
    },
    snow_Warning:{
        name: 'snow_Warning',
        type: 'initWeather',
        desc: "A snow storm intensifies when the user gets onto the battlefield.",
        info: 'snow'
    },

    // weather affected
    chlorophyll:{
        name: 'chlorophyll',
        type: 'weatherSpeed',
        desc: "Doubles speed while sun is active.",
        info: 'sun'
    },
    swift_Swim:{
        name: 'swift_Swim',
        type: 'weatherSpeed',
        desc: "Doubles speed while rain is active.",
        info: 'rain'
    },
    sand_Rush:{
        name: 'sand_Rush',
        type: 'weatherSpeed',
        desc: "Doubles speed while snow is active.",
        info: 'sand'
    },
    slush_Rush:{
        name: 'slush_Rush',
        type: 'weatherSpeed',
        desc: "Doubles speed while snow is active.",
        info: 'snow'
    },
    photosynthesis:{
        name: 'photosynthesis',
        type: 'weatherHeal',
        desc: "Heals 1/4 of max HP while sun is active.",
        info: 'sun'
    },
    rain_Dish:{
        name: 'rain_Dish',
        type: 'weatherHeal',
        desc: "Heals 1/16 of max HP while rain is active.",
        info: 'rain'
    },
    desert_Embrace:{
        name: 'desert_Embrace',
        type: 'weatherHeal',
        desc: "Heals 1/16 of max HP while snow is active.",
        info: 'sand'
    },
    bitter_Comfort:{
        name: 'bitter_Comfort',
        type: 'weatherHeal',
        desc: "Heals 1/16 of max HP while snow is active.",
        info: 'snow'
    },
    solar_Power:{
        name:'solar_Power',
        desc: "boosts the user's spatk by 50% in the sun\n\nbut hurts it by 1/8th of it's hp each turns.",
    },
    sand_Force:{
        name: 'sand_Force',
        desc: "in the sand, boosts all rock/ground/steel types moves by 30%.",
    },

    // damage
    adaptability:{
        name: 'adaptability',
        desc: 'doubles the effect of STAB.',
        info: null
    },
    iron_Fist:{
        name: 'iron_Fist',
        desc: 'boosts all punch based moves by 20%.',
        info: null
    },
    sheer_Force:{
        name: 'sheer_Force',
        desc: 'removes all secondary effects on moves and gain 30% power in return.',
        info: null
    },
    guts:{
        name: 'guts',
        desc: 'boosts moves power by 50% when under the effect of a status affliciton.',
        info: null
    },
    technician:{
        name: 'technician',
        desc: "if the move's power is below, or equal to 60, the power will be raised by 50%.",
        info: null
    },
    tripped_Out:{
        name: 'tripped_Out',
        desc: "if the opponent is confused, every move it receives is boosted by 30%.",
        info: null
    },

    // resistance
    thicc_Fat:{
        name: 'thicc_Fat',
        desc: "gives resistence to ice and fire type moves.",
        info: null
    },

    // type changing
    draconic_Aura:{
        name: 'draconic_Aura',
        type: 'typeChange',
        desc: "turns every normal type attack into a dragon type attack.",
        info: 'dragon'
    },
    modernize:{
        name: 'modernize',
        type: 'typeChange',
        desc: "turns every normal type attack into a steel type attack.",
        info: 'steel'
    },
    pixilate:{
        name: 'pixilate',
        type: 'typeChange',
        desc: "turns every normal type attack into a fairy type attack.",
        info: 'fairy'
    },
    aerilate:{
        name: 'aerilate',
        type: 'typeChange',
        desc: "turns every normal type attack into a flying type attack.",
        info: 'flying'
    },
    galvanize:{
        name: 'galvanize',
        type: 'typeChange',
        desc: "turns every normal type attack into a electric type attack.",
        info: 'electric'
    },
    liquid_Voice:{
        name: 'liquid_Voice',
        type: 'typeChange',
        desc: "turns every normal type attack into a water type attack.",
        info: 'water'
    },
    refrigirate:{
        name: 'refrigirate',
        type: 'typeChange',
        desc: "turns every normal type attack into a ice type attack.",
        info: 'ice'
    },
    calcinate:{
        name: 'calcinate',
        type: 'typeChange',
        desc: "turns every normal type attack into a fire type attack.",
        info: 'fire'
    },
    chlorokinesis:{
        name: 'chlorokinesis',
        type: 'typeChange',
        desc: "turns every normal type attack into a grass type attack.",
        info: 'grass'
    },
    disgustify:{
        name: 'disgustify',
        type: 'typeChange',
        desc: "turns every normal type attack into a poison type attack.",
        info: 'poison'
    },
    normalize:{
        name: 'normalize',
        type: 'typeChange',
        desc: "turns every move into a normal type move.",
        info: 'normal'
    },
}