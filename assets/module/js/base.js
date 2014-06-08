// base method

var API = {

    section_height: 0,

    section_pos: '#home',

    scroll_mark: true,

    setSize: function(id) {
    	$(id).css('height', window.innerHeight)
    	$(id).css('width', window.innerWidth)
    },

    getPorperty: function(id) {
        var pos, title, url;

        switch (id) {
            case '#home':
                pos = 0;
                title = 'Lorem Ipsum 2014';
                url = '/';
            break;

            case '#gallery':
                pos = 1;
                title = 'Lorem Ipsum 2014 / Gallery';
                url = '/gallery/';
            break;
            
            case '#info':
                pos = 2;
                title = 'Lorem Ipsum 2014 / Info';
                url = '/info/';
            break;
        } 

        return {'pos': pos, 'title': title, 'url': url}
    },

    doAction: function(mark, id) {
        if (mark) {
            var id = '#'+ $('#'+ id).next()[0].id;
            if (id == '#pot') return;
        } else {
            if (!$(API.section_pos).prev()[0]) return;
            var id = '#'+ $(API.section_pos).prev()[0].id;
        }

        var attr = API.getPorperty(id);

        API.sectionMove(attr.pos * API.section_height)
        API.section_pos = id;
        
        API.pushUrl(attr.title, attr.url, attr.pos)
    },

    sectionMove: function(position, f) {
        var f = f || function() {};
        $('body, html').animate({'scrollTop': position}, 700, 'easeInOutQuint', function() {
            f()
        })
    },

    pushUrl: function(title, url, pos) {
        history.pushState({'pos': pos, 'title': title}, title, url);
	    document.title = title;
    }

};
