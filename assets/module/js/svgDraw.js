
// svg animate

API.svgDraw = function(sum, tag) {

    var current_frame = 0,
        total_frames = 60,
        path = new Array(),
        length = new Array(),
        handle = 0;

    for (var i = 0; i < sum; i ++) {
        path[i] = document.getElementById(tag + i);
        l = path[i].getTotalLength();
        length[i] = l;
        path[i].style.strokeDasharray = l +' '+ l;
        path[i].style.strokeDashoffset = l;
    }

    var draw = function() {
        var progress = current_frame / total_frames;
        if (progress > 1) {
            window.cancelAnimationFrame(handle)
        } else {
            current_frame ++;
            for (var j = 0; j < path.length; j ++) {
                path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress))
            }
            handle = window.requestAnimationFrame(draw)
        }
    }
    draw()

};
