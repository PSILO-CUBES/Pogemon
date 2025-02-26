import { loadData } from "../save.js"

export let volumeValues = {
  music: 50,
  SFX: 50
}

const data = await loadData("saveFile")
console.log(data)

if(data != null) volumeValues = data.volumeValues

const musicVolume = volumeValues.music / 1000
const SFXVolume = volumeValues.SFX / 1000

export const audioObj = {

  music: {
    map: new Howl({
      src: '../../audio/map.wav',
      volume: musicVolume,
      loop: true
    }),
    battle: new Howl({
      src: '../../audio/battle.mp3',
      volume: musicVolume
    }),
    victory: new Howl({
      src: '../../audio/victory.wav',
      volume: musicVolume
    }),
  },

  SFX:{
    // stuff
    initEncounter: new Howl({
      src: '../../audio/initEncounter.wav',
      volume: SFXVolume
    }),
    flee: new Howl({
      src: '../../audio/flee.wav',
      volume: SFXVolume
    }),
    faint: new Howl({
      src: '../../audio/faint.wav',
      volume: SFXVolume
    }),
    changeMap: new Howl({
      src: '../../audio/changeMap.wav',
      volume: SFXVolume
    }),
    trainerEncounter: new Howl({
      src: '../../audio/trainerEncounter.mp3',
      volume: SFXVolume
    }),
    cut: new Howl({
      src: '../../audio/cut.mp3',
      volume: SFXVolume
    }),
    rockSmash: new Howl({
      src: '../../audio/rockSmash.mp3',
      volume: SFXVolume
    }),

    // moves
    tackleHit: new Howl({
      src: '../../audio/tackleHit.wav',
      volume: SFXVolume
    }),

    initFireBall: new Howl({
      src: '../../audio/initFireball.wav',
      volume: SFXVolume
    }),
    hitFireBall: new Howl({
      src: '../../audio/fireballHit.wav',
      volume: SFXVolume
    }),

    watergunHit: new Howl({
      src: '../../audio/watergunHit.mp3',
      volume: SFXVolume
    }),
    watergunLaunch: new Howl({
      src: '../../audio/watergunLaunch.mp3',
      volume: SFXVolume
    }),
  }
}