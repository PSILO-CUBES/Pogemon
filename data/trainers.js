const trainer = {
    paccIlse_PoliceMan_1: {
        team: [pogemons.Steeli, pogemons.Lokump],
        setTeamLevel: () =>{
            console.log(currFoeTeamData)
            currFoeTeamData[0].currLevel = 7
            currFoeTeamData[1].currLevel = 7
        },
        dialogue: 'Stop there criminal scum!',
        defeated: false,
    },
    paccIlse_Professor: {
        team: [pogemons.Disso, pogemons.Disso, pogemons.Disso],
        setTeamLevel: () =>{
            console.log(currFoeTeamData)
            currFoeTeamData[0].currLevel = 15
            currFoeTeamData[1].currLevel = 15
            currFoeTeamData[2].currLevel = 15
        },
        dialogue: 'Come play with me young one ( ͡° ͜ʖ ͡°)',
        defeated: false,
    },
}