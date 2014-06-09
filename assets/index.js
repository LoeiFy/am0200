/*
 *
 * init
 *
 */

$(function() {

    API.tapPlot('#pot')

    size()
    function size() {
        API.section_height = window.innerHeight;
        API.setSize('#home, #gallery, #info')
        if (API.section_pos == '') return;
        API.sectionMove(API.getPorperty(API.section_pos).pos * API.section_height)
    }
    $(window).resize(function(){
        setTimeout(size, 0)
    })

   	window.scrollTo(0, 0)
    $('#home').css('top', 0)

    API.tapPlot('#home, #gallery, #info', '#pot', function(id) {
        API.doAction(true, id)
    })

    $(document).keydown(function(e) {
        if (e.keyCode == 40) API.doAction(true, API.section_pos.split('#')[1]);
        if (e.keyCode == 38) API.doAction(false, API.section_pos.split('#')[1]);
    })


    $('#home, #gallery, #info').on('mousewheel DOMMouseScroll', function(e) {
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
    })

})
