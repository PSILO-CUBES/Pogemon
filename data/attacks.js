const attacks = {

    // Physical Attacks

    //Normal

    Tackle: {
        name: 'Tackle',
        potency: 40,
        accuracy: 100,
        pp: 35,
        type: 'Physical',
        effect: 'None',
        element: 'normal',
        description: 'The pogemon uses a limb to hit the ennemy',
    },

    //Fighting

    Lokick: {
        name: 'Lokick',
        potency: 65,
        accuracy: 85,
        pp: 25,
        type: 'Physical',
        effect: 'None',
        element: 'fighting',
        description: 'The pogemon wildly swings its limbs',
    },

    //Special Atttacks

    //Fire

    Fireball: {
        name: 'Fireball',
        potency: 450,
        accuracy: 95,
        pp: 25,
        type: 'Special',
        effect: 'Burn',
        element: 'fire',
        description: 'The pogemon hurls a fireball towards the ennemy',
    },

    //Ghost

    Strangering: {
        name: 'Strangering',
        potency: 50,
        accuracy: 100,
        pp: 25,
        type: 'Special',
        effect: 'none',
        element: 'ghost',
        description: 'The ennemy is squeezed by a strange ring.',
    },

    // Status

    // Stats

    // Increase

    Buff: {
        name: 'Buff',
        potency: 50,
        accuracy: 100,
        pp: 12,
        type: 'Status',
        effect: 'increaseStats',
        stat: 'ATK',
        element: 'normal',
        description: 'The pogemon buffs its self, increases ATK by 50%', 
    },

    // Decrease

    Growl: {
        name: 'Growl',
        potency: 75,
        accuracy: 100,
        pp: 12,
        type: 'Status',
        effect: 'decreaseStats',
        stat: 'DEF',
        element: 'normal',
        description: 'The pogemon growls at the opponent, decreases DEF by 50%', 
    },

    // Heal

    Rest: {
        name: 'Rest',
        potency: 25,
        accuracy: 100,
        pp: 12,
        type: 'Status',
        effect: 'Heal',
        element: 'normal',
        description: 'The pogemon rests and regains some HP',
    }

}