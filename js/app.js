import { manageBootState } from './scripts/scenes/boot.js';

let timerId;
export let _preventActionSpam = (callback, e, duration) =>{
    if (!(timerId == null)) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() =>{
      if(e !== undefined) callback(e)
      else callback()
    }, duration);
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

document.addEventListener("keydown", e => {
  // if(e.key == "F11") e.preventDefault();
});

preventScrolling()

function startApp(){
  manageBootState(true)
}

document.addEventListener('click', e =>{
  // console.log(`x: ${e.pageX}`, `y: ${e.pageY}`)
})

startApp()
// battleAnimation()
// evolutionAnimation()