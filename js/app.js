import { manageOverWorldState } from './scripts/scenes/overworld.js'
import { battleAnimation } from './scripts/scenes/battle.js'
import { evolutionAnimation } from './scripts/scenes/evolution.js';

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

function preventScrolling(){
  const scrollCheck = document.querySelector("#scroll-check");
  const keyboardCheck = document.querySelector("#keyboard-check");
  
  document.addEventListener("keydown", function (e) {
    if (
      keyboardCheck.checked &&
      e.ctrlKey &&
      (e.keyCode == "61" ||
        e.keyCode == "107" ||
        e.keyCode == "173" ||
        e.keyCode == "109" ||
        e.keyCode == "187" ||
        e.keyCode == "189")
    ) {
      e.preventDefault();
    }
  });
  document.addEventListener(
    "wheel",
    function (e) {
      if (scrollCheck.checked && e.ctrlKey) {
        e.preventDefault();
      }
    },
    {
      passive: false
    }
  );
}

preventScrolling()

manageOverWorldState(true)
// battleAnimation()
// evolutionAnimation()