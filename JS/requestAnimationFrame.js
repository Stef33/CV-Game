
    // requestAnimationFrame
    window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
