const items = {
    heal:{
        potion: {
            name: 'potion',
            category: 'heal',
            type: 'potion',
            potency: 25,
            description: 'Heals Pogemon for 20 HP.',
            price: 200,
        },
        revive: {
            name: 'revive',
            category: 'heal',
            type: 'revive',
            potency: 25,
            description: 'Revives a fainted pogemon.',
            price: 500,
        },
    },
    pogeball:{
        pogeball:{
            name: 'pogeball',
            category: 'pogeball',
            type: 'pogeball',
            potency: 1,
            description: 'A standard pogeball.',
            price: 250,
        }
    },
    berry:{
        badBanana:{
            name: 'badBanana',
            category: 'berry',
            type: 'berry',
            potency: 15,
            threshold: 50,
            description: 'if held, Can be used to heal mid-turn.',
            price: null,
        },
    }
}