
// slider control

API.sliderControl = function(tag, mark) {

    if (mark) {
        API.slider_pos ++
    } else {
        API.slider_pos --
    }

    var len = $(tag).length;
    if (API.slider_pos > len - 1) {
        API.slider_pos = len - 1;
        return;
    }
    if (API.slider_pos < 0) {
        API.slider_pos = 0;
        return;
    }

    API.sliderMove('#slider', API.slider_pos)

};
