/**
 * define & base method
 *
 */

var API = {

    section_height: 0,

    section_pos: '#home',

    scroll_mark: true,

    slider_pos: 0,

    work_pos: '#00',

    setSize: function(id) {
    	$(id).css('height', window.innerHeight)
    	$(id).css('width', window.innerWidth)
    },

    loadImage: function(work, pos) {
        $('<img class="db abs" src="/static/image/works/'+ work +'/'+ pos +'.jpg" />')
            .css(({opacity: 0}))
            .appendTo('#'+ work + pos)
            .load(function() {
                $(this).css({
                    opacity: 1,
                    marginLeft: - $(this).width() / 2 +'px', 
                    marginTop: - $(this).height() / 2 +'px' 
                })
            })
    },

	touchDevice: function() {
		return !!('ontouchstart' in window);
	}

};
