import { overWorldAnimation } from './scripts/animations.js'
import { battleAnimation } from './scripts/battle.js'

let timerId;
export let _preventActionSpam = (callback, e) =>{
    if (!(timerId == null)) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() =>{
      if(e !== undefined) callback(e)
      else callback()
    }, 200);
}

overWorldAnimation()
// battleAnimation()