// base method

var API = {

    name: 'app',

    getName: function() {
        return this.name
    },

    getTop: function(id) {
        console.log($(id).position().top)
    },

    goTop: function(id) {
        $('body, html').animate({'scrollTop': $(id).position().top}, 700, 'easeInOutQuint', function() {
            console.log('done')
        })
    },

    stopSwipe: function() {
        $('html').hammer({
            prevent_default: true
        })
    },

    tapAnimate: function() {
        $('body').hammer({
            prevent_default: true
        }).on('tap', function(e) {
            console.log(e)
            var ex = e.position[0].x,
                ey = e.position[0].y;
            
            $('#pot').css({
                'visibility': 'visible',
                'width': '30px',
                'height': '30px',
                'left': ex - 15 +'px',
                'top': ey - 15 +'px',
                opacity: 0.4
            }).animate({
                height: '40px',
                width: '40px',
                opacity: 0,
                left: '-='+ 5 +'px',
                top: '-='+ 5 +'px'
            }, 300, function() {
                $('#pot').css('visibility', 'hidden')
            })
        })
    },

    getMouse: function(id) {
        $(id).on('mousewheel DOMMouseScroll', function(e) {
            console.log(e.originalEvent.wheelDelta || e.originalEvent.detail/* for FF */)
        })
    }

};
