const NPCObject = {
    paccIsleLab:{
        NPC:{
            policeMan1: {
                dialogue: 'Hmm.... Interesting..',
                index: 0,
            },
            policeMan2: {
                dialogue: `Damn this machine! *kick*`,
                index: 1,
            },
            professor: {
                dialogue: 'Please, choose a pogemon!',
                index: 2,
            },
            policeMan3: {
                dialogue: `I've got my eyes on you..`,
                index: 3,
            },
            policeMan4: {
                dialogue: 'Hmm.... Interesting..',
                index: 4,
            },
        }
    },
    paccIsle:{
        trainers:{
            policeMan: {
                name: 'policeMan',
                team: [pogemons.Steeli, pogemons.Lokump],
                setTeamLevel: [
                    10,
                    7
                ],
                dialogue: 'Stop right there criminal scum!',
                defeated: false,
                prize: 250,
                index: 0,
            },
            professor: {
                name: 'professor',
                team: [pogemons.Disso],
                setTeamLevel: [
                    15,
                ],
                dialogue: 'Insert something you lazy mf',
                defeated: false,
                prize: 250,
                index: 1,
            },
        },
    },
    pogemart:{
        pogemart:{
            clerk1:{
                index: 0,
                pogemartTier: 0
            },
            clerk2:{
                index: 1,
                pogemartTier: 0
            }
        }
    },
    pogecenter:{

    },
    ghostsWood:{
        trainers:{
            bugCatcher1: {
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Insert something you lazy mf',
                defeated: false,
                prize: 250,
                index: 1,
            },
            bugCatcher2: {
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Insert Something you lazy mf',
                defeated: false,
                prize: 250,
                index: 2,
            },
            bugCatcher3: {
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Insert something you lazy mf',
                defeated: false,
                prize: 250,
                index: 3,
            },
            bugCatcher4: {
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Insert someting you lazy mf',
                defeated: false,
                prize: 250,
                index: 4,
            },
        },
    },
    connectBeach:{
        trainers:{
            sailor1:{
                name: 'sailor1',
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Sailor',
                defeated: false,
                prize: 250,
                index: 0,
            },
            karateGuy1:{
                name: 'karateGuy1',
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Karate Guy',
                defeated: false,
                prize: 250,
                index: 1,
            },
            swimSuitGuy1:{
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                name: 'swinSuitGuy1',
                dialogue: 'Swim Suit Guy',
                defeated: false,
                prize: 250,
                index: 2,
            },
            swimSuitGirl1:{
                name: 'swinSuitGirl1',
                team: [pogemons.Lokump],
                setTeamLevel: [
                    10,
                ],
                dialogue: 'Swim Suit Girl',
                defeated: false,
                prize: 250,
                index: 3,
            },
        }
    }
}