let statsAnimationFrame

function statsAnimation(){
    statsAnimationFrame = window.requestAnimationFrame(statsAnimation)
}

function manageStatsState(state){
    if(state) statsAnimation()
    else window.cancelAnimationFrame(statsAnimation)
}