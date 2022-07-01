const maps = {
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
            y: -500
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
}