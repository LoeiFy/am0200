/**
 * define & base method
 *
 */

var API = {

    section_height: 0,

    section_pos: '#home',

    scroll_mark: true,

    setSize: function(id) {
    	$(id).css('height', window.innerHeight)
    	$(id).css('width', window.innerWidth)
    },
    
	touchDevice: function() {
		return !!('ontouchstart' in window);
	}

};
