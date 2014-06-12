/**
 * define & base method
 *
 */

var API = {

    section_height: 0,

    section_pos: '#home',

    scroll_mark: true,

    slider_pos: 0,

    setSize: function(id) {
    	$(id).css('height', window.innerHeight)
    	$(id).css('width', window.innerWidth)
    },

    sliderMove: function(mark) {
        if (mark) {
            API.slider_pos ++
        } else {
            API.slider_pos --
        }
        console.log(API.slider_pos)

        $('#slider').animate({'left': - API.slider_pos * window.innerWidth}, 700, 'easeInOutQuint', function() {
            if (API.slider_pos == 0) $('#slider').css('left', 0);
        })
    },
    
	touchDevice: function() {
		return !!('ontouchstart' in window);
	}

};
