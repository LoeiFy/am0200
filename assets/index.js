/**
 *
 * ready !
 *
 */

$(function() {

    size()
    function size() {
        API.section_height = window.innerHeight;
        API.setSize('#home, #portfolio, #about')
        if (API.section_pos == '') return;
        API.sectionMove(API.getPorperty(API.section_pos).pos * API.section_height)


        $('#slider').css('width', $('.item').length * window.innerWidth)
        API.sliderMove('#slider', API.slider_pos)

        $('.item').each(function() {
            $(this).css('width', window.innerWidth).find('img').css({
                marginLeft: - $(this).find('img').width() / 2 +'px', 
                marginTop: - $(this).find('img').height() / 2 +'px' 
            }).on('load', function() {
                $(this).css({
                    marginLeft: - $(this).width() / 2 +'px', 
                    marginTop: - $(this).height() / 2 +'px' 
                })
            })
        })
    }

    $(window).on('resize orientationchange', function(){
        setTimeout(size, 0)
    })

    window.onload = function() {size()}

    window.scrollTo(0, 0)
    $('#home').css('top', 0)

    API.tapPlot('#home, #portfolio, #about', '#pot', function(id, x) {
        if (id == 'portfolio') {
            if (API.slider_pos < $('.item').length - 1 && x / window.innerWidth > 0.5) {
                API.sliderAction('.item', true)
            } else if (API.slider_pos > 0 && x / window.innerWidth < 0.5) {
                API.sliderAction('.item', false)
            } else {
                API.doAction(true, id)
            }
        } else {
            API.doAction(true, id)
        }
    })

    $(document).keydown(function(e) {
        if (e.keyCode == 40) API.doAction(true, API.section_pos.split('#')[1]);
        if (e.keyCode == 38) API.doAction(false, API.section_pos.split('#')[1]);

        var url = window.location.pathname;
        if (url.indexOf('portfolio') != -1) {
            if (e.keyCode == 39) API.sliderAction('.item', true);
            if (e.keyCode == 37) API.sliderAction('.item', false);
        }
    })

    $('#home, #portfolio, #about').on('mousewheel DOMMouseScroll', function(e) {
        e.preventDefault()
        var data = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
        
        if (API.scroll_mark) {
            API.scroll_mark = false;
            if (data < 0) API.doAction(true, API.section_pos.split('#')[1]);
            if (data > 0) API.doAction(false, API.section_pos.split('#')[1]);

            setTimeout(function() {API.scroll_mark = true}, 1000)
        }
    })


    window.addEventListener('popstate', function(e) {
        var url = window.location.pathname;
        url = url.substring(1, url.length - 1);

        if (url == '/') url = 'home';

        var attr = API.getPorperty('#'+ url);

        API.sectionMove(attr.pos * API.section_height, function() {
            document.title = attr.title;
        })
    })

    $('html').hammer({
        prevent_default: true
    }).on('swipe', function(e) {
        if (e.direction == 'up') API.doAction(true, API.section_pos.split('#')[1]);
        if (e.direction == 'down') API.doAction(false, API.section_pos.split('#')[1]);
        if (window.location.pathname.indexOf('portfolio') != -1) {
            if (e.direction == 'left') API.sliderAction('.item', true);
            if (e.direction == 'right') API.sliderAction('.item', false);
        } 
    })

})
