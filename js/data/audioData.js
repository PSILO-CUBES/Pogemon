import { loadData } from "../save.js"

export let volumeValues = {
  music: 50,
  SFX: 50
}

const data = await loadData()

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
    initEncounter: new Howl({
      src: '../../audio/initEncounter.wav',
      volume: SFXVolume
    }),
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
    flee: new Howl({
      src: '../../audio/flee.wav',
      volume: SFXVolume
    }),
    faint: new Howl({
      src: '../../audio/faint.wav',
      volume: SFXVolume
    }),
  }
}