// base method

var API = {

    section_height: 0,

    section_pos: '',

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
                url = '/gallery';
            break;
            
            case '#info':
                pos = 2;
                title = 'Lorem Ipsum 2014 / Info';
                url = '/info';
            break;
        } 

        return {'pos': pos, 'title': title, 'url': url}
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
