let maps = {
    bedroom: {
        name: 'bedroom',
        position: {
            x: -64,
            y: 0,
        },
        changeMapArray:[
            {name: 'home',
            position:{
                x: 424,
                y: 356,
            }
            }
        ],
        width: 20, 
        height: 10,
        image: {
            src: 'img/map/bedroom/bedroom.png',
        },
        backgroundImage: {
            src: 'img/map/bedroom/bedroomBackground.png'
        },
        foreground1Image: {
            src: 'img/map/bedroom/bedroomFG1.png'
        },
        foreground2Image: {
            src: 'img/map/bedroom/bedroomFG2.png'
        },
        foreground3Image: {
            src: 'img/map/bedroom/bedroomFG3.png'
        },
        foreground4Image: {
            src: 'img/map/bedroom/bedroomFG4.png'
        },
        collisionsData: collisionsData.bedroom,
        battleZonesData: battleZonesData.bedroom,
        changeMapZonesData: changeMapZonesData.bedroom,
        eventZonesData: eventZonesData.bedroom,
        trainerArray: []
    },  

    home: {
        name: 'home',
        position: {
            x:-64,
            y:0,
        },
        changeMapArray: [
            { name:'bedroom',
            position:{
                x: 808,
                y: 348,
            }},
            { name: 'paccIsle',
            position:{
                x: -475,
                y: -525,
            }} ,
            {name:'paccIsle',
            position:{
                x: -475,
                y: -525,
            }}
        ],
        width: 22, 
        height: 11,
        image: {
            src: 'img/map/home/home.png',
        },
        backgroundImage: {
            src: 'img/map/home/homeBackground.png'
        },
        foreground1Image: {
            src: 'img/map/home/homeFG1.png'
        },
        foreground2Image: {
            src: 'img/map/home/homeFG2.png'
        },
        foreground3Image: {
            src: 'img/map/home/homeFG3.png'
        },
        foreground4Image: {
            src: 'img/map/home/homeFG4.png'
        },
        collisionsData: collisionsData.home,
        battleZonesData: battleZonesData.home,
        changeMapZonesData: changeMapZonesData.home,
        eventZonesData: eventZonesData.home,
        trainerArray: []
    },

    paccIsle: {
        name: 'paccIsle',
        position: {
            x: -500,
            y: -525
        },            
        changeMapArray: [
            {name:'home',
            position: {
                x: 264,
                y: 50,
            }} , 
            {name:'paccIsleCave',
            position:{
                x: -1000,
                y: -750,
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1460
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1550
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1600
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1680
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1750
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -2400,
                y: -1805
            }},
            {name:'paccIsleLab',
            position:{
                x: 330,
                y: -970
            }},
            {name:'paccIsleCave',
            position:{
                x: -2197.5,
                y: -2950
            }}
        ],
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/paccIsle/paccIsle.png',
        },
        backgroundImage: {
            src: 'img/map/paccIsle/paccIsleBackground.png'
        },
        foreground1Image: {
            src: 'img/map/paccIsle/paccIsleFG1.png'
        },
        foreground2Image: {
            src: 'img/map/paccIsle/paccIsleFG2.png'
        },
        foreground3Image: {
            src: 'img/map/paccIsle/paccIsleFG3.png'
        },
        foreground4Image: {
            src: 'img/map/paccIsle/paccIsleFG4.png'
        },
        collisionsData: collisionsData.paccIsle,
        battleZonesData: battleZonesData.paccIsle,
        changeMapZonesData: changeMapZonesData.paccIsle,
        eventZonesData: eventZonesData.paccIsle,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: [trainer.paccIlse_PoliceMan_1, trainer.paccIlse_Professor]
    },   
    
    paccIsleCave: {
        name: 'paccIsleCave',
        position: {
            x: -500,
            y: -500
        },   
        changeMapArray:[
            {name: 'paccIsle',
            position:{
                x: -1047.5,
                y: -940,
            }},
            {name: 'paccIsle',
            position:{
                x: -2265,
                y: -3015
            }}
        ],
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/paccIsleCave/paccIsleCave.png',
        },
        backgroundImage: {
            src: 'img/map/paccIsleCave/paccIsleCaveBackground.png'
        },
        foreground1Image: {
            src: 'img/map/paccIsleCave/paccIsleCaveFG1.png'
        },
        foreground2Image: {
            src: 'img/map/paccIsleCave/paccIsleCaveFG2.png'
        },
        foreground3Image: {
            src: 'img/map/paccIsleCave/paccIsleCaveFG3.png'
        },
        foreground4Image: {
            src: 'img/map/paccIsleCave/paccIsleCaveFG4.png'
        },
        collisionsData: collisionsData.paccIsleCave,
        battleZonesData: battleZonesData.paccIsleCave,
        changeMapZonesData: changeMapZonesData.paccIsleCave,
        eventZonesData: eventZonesData.paccIsleCave,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },    

    paccIsleLab: {
        name: 'paccIsleLab',
        position: {
            x: -500,
            y: -500
        },   
        changeMapArray:[
            {name: 'paccIsle',
            position:{
                x: -735,
                y: -2585
            }},
            {name: 'paccIsle',
            position:{
                x: -735,
                y: -2585
            }}
        ],
        width: 31, 
        height: 26,
        image: {
            src: 'img/map/paccIsleLab/paccIsleLab.png',
        },
        backgroundImage: {
            src: 'img/map/paccIsleLab/paccIsleLabBackground.png'
        },
        foreground1Image: {
            src: 'img/map/paccIsleLab/paccIsleLabFG1.png'
        },
        foreground2Image: {
            src: 'img/map/paccIsleLab/paccIsleLabFG2.png'
        },
        foreground3Image: {
            src: 'img/map/paccIsleLab/paccIsleLabFG3.png'
        },
        foreground4Image: {
            src: 'img/map/paccIsleLab/paccIsleLabFG4.png'
        },
        collisionsData: collisionsData.paccIsleLab,
        battleZonesData: battleZonesData.paccIsleLab,
        changeMapZonesData: changeMapZonesData.paccIsleLab,
        eventZonesData: eventZonesData.paccIsleLab,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },    

    pogemart: {
        name: 'pogemart',
        position: {
            x: -500,
            y: -500
        },   
        changeMapArray:[

        ],
        width: 21, 
        height: 11,
        image: {
            src: 'img/map/pogemart/pogemart.png',
        },
        backgroundImage: {
            src: 'img/map/pogemart/pogemartBackground.png'
        },
        foreground1Image: {
            src: 'img/map/pogemart/pogemartFG1.png'
        },
        foreground2Image: {
            src: 'img/map/pogemart/pogemartFG2.png'
        },
        foreground3Image: {
            src: 'img/map/pogemart/pogemartFG3.png'
        },
        foreground4Image: {
            src: 'img/map/pogemart/pogemartFG4.png'
        },
        collisionsData: collisionsData.pogemart,
        battleZonesData: battleZonesData.pogemart,
        changeMapZonesData: changeMapZonesData.pogemart,
        eventZonesData: eventZonesData.pogemart,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },    

    pogecenter: {
        name: 'pogecenter',
        position: {
            x: -500,
            y: -500
        },   
        changeMapArray:[

        ],
        width: 23, 
        height: 11,
        image: {
            src: 'img/map/pogecenter/pogecenter.png',
        },
        backgroundImage: {
            src: 'img/map/pogecenter/pogecenterBackground.png'
        },
        foreground1Image: {
            src: 'img/map/pogecenter/pogecenterFG1.png'
        },
        foreground2Image: {
            src: 'img/map/pogecenter/pogecenterFG2.png'
        },
        foreground3Image: {
            src: 'img/map/pogecenter/pogecenterFG3.png'
        },
        foreground4Image: {
            src: 'img/map/pogecenter/pogecenterFG4.png'
        },
        collisionsData: collisionsData.pogecenter,
        battleZonesData: battleZonesData.pogecenter,
        changeMapZonesData: changeMapZonesData.pogecenter,
        eventZonesData: eventZonesData.pogecenter,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },    

    ghostsWoodBridge: {
        name: 'ghostsWoodBridge',
        position: {
            x: -500,
            y: -1500
        },            
        changeMapArray: [
            {name:'ghostsWood',
            position: {
                x: -2300,
                y: -1550
            }} , 
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1400
            }},
            {name:'ghostsWood',
            position:{
                x: -2300,
                y: -1650
            }},
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1450
            }},
            {name:'ghostsWood',
            position:{
                x: -2300,
                y: -1700
            }},
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1575
            }},
            {name:'ghostsWood',
            position: {
                x: -2300,
                y: -1750
            }} , 
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1625
            }},
            {name:'ghostsWood',
            position:{
                x: -2300,
                y: -1800
            }},
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1700
            }},
            {name:'ghostsWood',
            position:{
                x: -2300,
                y: -1850
            }},
            {name:'paccIsle',
            position:{
                x: -200,
                y: -1750
            }},
        ],
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBridge.png',
        },
        backgroundImage: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBackground.png'
        },
        foreground1Image: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBridgeFG1.png'
        },
        foreground2Image: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBridgeFG2.png'
        },
        foreground3Image: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBridgeFG3.png'
        },
        foreground4Image: {
            src: 'img/map/ghostsWoodBridge/ghostsWoodBridgeFG4.png'
        },
        collisionsData: collisionsData.ghostsWoodBridge,
        battleZonesData: battleZonesData.ghostsWoodBridge,
        changeMapZonesData: changeMapZonesData.ghostsWoodBridge,
        eventZonesData: eventZonesData.ghostsWoodBridge,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },  

    ghostsWood: {
        name: 'ghostsWood',
        position: {
            x: -2300,
            y: -1750
        },            
        changeMapArray: [
            {name:'connectBeach',
            position: {
                x: -1250,
                y: -2825,
            }} ,
            {name:'connectBeach',
            position:{
                x: -1300,
                y: -2825,
            }},
            {name:'connectBeach',
            position:{
                x: -1375,
                y: -2825,
            }},
            {name:'ghostsWoodBridge',
            position: {
                x: -250,
                y: -1465,
            }} ,
            {name:'ghostsWoodBridge',
            position:{
                x: -250,
                y: -1515,
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -250,
                y: -1565,
            }},
            {name:'ghostsWoodBridge',
            position: {
                x: -250,
                y: -1615,
            }} ,
            {name:'ghostsWoodBridge',
            position:{
                x: -250,
                y: -1700,
            }},
            {name:'ghostsWoodBridge',
            position:{
                x: -250,
                y: -1800,
            }},
        ],
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/ghostsWood/ghostsWood.png',
        },
        backgroundImage: {
            src: 'img/map/ghostsWood/ghostsWoodBackground.png'
        },
        foreground1Image: {
            src: 'img/map/ghostsWood/ghostsWoodFG1.png'
        },
        foreground2Image: {
            src: 'img/map/ghostsWood/ghostsWoodFG2.png'
        },
        foreground3Image: {
            src: 'img/map/ghostsWood/ghostsWoodFG3.png'
        },
        foreground4Image: {
            src: 'img/map/ghostsWood/ghostsWoodFG4.png'
        },
        collisionsData: collisionsData.ghostsWood,
        battleZonesData: battleZonesData.ghostsWood,
        changeMapZonesData: changeMapZonesData.ghostsWood,
        eventZonesData: eventZonesData.ghostsWood,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: [trainer.ghostsWood_BugCatcher1, trainer.ghostsWood_BugCatcher2, trainer.ghostsWood_BugCatcher3, trainer.ghostsWood_BugCatcher4]
    },  

    connectBeach: {
        name: 'connectBeach',
        position: {
            x: -2300,
            y: -1750
        },            
        changeMapArray: [
            {name:'keyTown',
            position: {
                x: -1125,
                y: -3000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1185,
                y: -3000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1235,
                y: -3000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1305,
                y: -3000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1355,
                y: -3000,
            }} ,
            {name:'ghostsWood',
            position: {
                x: -1235,
                y: -500,
            }} ,
            {name:'ghostsWood',
            position: {
                x: -1300,
                y: -500,
            }} ,
            {name:'ghostsWood',
            position: {
                x: -1375,
                y: -500,
            }} ,
        ],
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/connectBeach/connectBeach.png',
        },
        backgroundImage: {
            src: 'img/map/connectBeach/connectBeachBackground.png'
        },
        foreground1Image: {
            src: 'img/map/connectBeach/connectBeachFG1.png'
        },
        foreground2Image: {
            src: 'img/map/connectBeach/connectBeachFG2.png'
        },
        foreground3Image: {
            src: 'img/map/connectBeach/connectBeachFG3.png'
        },
        foreground4Image: {
            src: 'img/map/connectBeach/connectBeachFG4.png'
        },
        collisionsData: collisionsData.connectBeach,
        battleZonesData: battleZonesData.connectBeach,
        changeMapZonesData: changeMapZonesData.connectBeach,
        eventZonesData: eventZonesData.connectBeach,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: [trainer.connectBeach_Sailor1, trainer.connectBeach_KarateGuy1, trainer.connectBeach_SwimSuitGuy1, trainer.connectBeach_SwimSuitGirl1]
    },  

    keyTown: {
        name: 'keyTown',
        position: {
            x: -2300,
            y: -1750
        },            
        changeMapArray: [
            {name:'fairyGym',
            position: {
                x: 165,
                y: -1900,
            }} ,
            {name:'pogemart',
            position: {
                x: 490,
                y: -10,
            }} ,
            {name:'pogecenter',
            position: {
                x: 230,
                y: 150,
            }} ,
            {name:'keyTownHouse1',
            position: {
                x: -1125,
                y: -650,
            }} ,
            {name:'keyTownHouse2',
            position: {
                x: -1125,
                y: -650,
            }} ,
            {name:'keyTownHouse3',
            position: {
                x: -1125,
                y: -650,
            }} ,
            {name:'connectBeach',
            position: {
                x: -1125,
                y: -650,
            }} ,
            {name:'connectBeach',
            position: {
                x: -1200,
                y: -650,
            }} ,
            {name:'connectBeach',
            position: {
                x: -1275,
                y: -650,
            }} ,
            {name:'connectBeach',
            position: {
                x: -1350,
                y: -650,
            }} ,
            {name:'connectBeach',
            position: {
                x: -1375,
                y: -650,
            }} ,
        ],
        pogecenterPosition:{
            x: -1825,
            y: -2100
        },
        pogemartPosition: {
            x: -675,
            y: -2100
        },
        width: 70, 
        height: 70,
        image: {
            src: 'img/map/keyTown/keyTown.png',
        },
        backgroundImage: {
            src: 'img/map/keyTown/keyTownBackground.png'
        },
        foreground1Image: {
            src: 'img/map/keyTown/keyTownFG1.png'
        },
        foreground2Image: {
            src: 'img/map/keyTown/keyTownFG2.png'
        },
        foreground3Image: {
            src: 'img/map/keyTown/keyTownFG3.png'
        },
        foreground4Image: {
            src: 'img/map/keyTown/keyTownFG4.png'
        },
        collisionsData: collisionsData.keyTown,
        battleZonesData: battleZonesData.keyTown,
        changeMapZonesData: changeMapZonesData.keyTown,
        eventZonesData: eventZonesData.keyTown,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },  

    fairyGym: {
        name: 'fairyGym',
        position: {
            x: 165,
            y: -1900
        },            
        changeMapArray: [
            {name:'keyTown',
            position: {
                x: -1240,
                y: -1000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1240,
                y: -1000,
            }} ,
            {name:'keyTown',
            position: {
                x: -1240,
                y: -1000,
            }} ,
        ],
        pogecenterPosition:{
            x: -1825,
            y: -2100
        },
        pogemartPosition: {
            x: -675,
            y: -2100
        },
        width: 25, 
        height: 40,
        image: {
            src: 'img/map/fairyGym/fairyGym.png',
        },
        backgroundImage: {
            src: 'img/map/fairyGym/fairyGymBackground.png'
        },
        foreground1Image: {
            src: 'img/map/fairyGym/fairyGymFG1.png'
        },
        foreground2Image: {
            src: 'img/map/fairyGym/fairyGymFG2.png'
        },
        foreground3Image: {
            src: 'img/map/fairyGym/fairyGymFG3.png'
        },
        foreground4Image: {
            src: 'img/map/fairyGym/fairyGymFG4.png'
        },
        collisionsData: collisionsData.fairyGym,
        battleZonesData: battleZonesData.fairyGym,
        changeMapZonesData: changeMapZonesData.fairyGym,
        eventZonesData: eventZonesData.fairyGym,
        levelRange: {
            min: 2,
            max: 6
        },
        trainerArray: []
    },  
}