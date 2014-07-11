
// ready

$(function() {

    // to top
    window.scrollTo(0, 0)
    $('#home').css('top', 0)
    size()

    // append work items
    var work_0 = API.sliderInfo(0), 
        work_1 = API.sliderInfo(1); 
    API.workItem(work_0, 0, '#slider')
    API.workItem(work_1, 1, '#slider')

    // adjust size 
    function size() {
        API.section_height = window.innerHeight;
        API.setSize('#home, #portfolio, #about')

        if (API.section_pos == '') return;
        API.sectionMove(API.pageInfo(API.section_pos).pos * API.section_height)

        $('#slider').css('width', $('.item').length * window.innerWidth)
        API.sliderMove('#slider', API.slider_pos)

        $('.item').each(function() {
            $(this).css('width', window.innerWidth).find('img').css({
                marginLeft: - $(this).find('img').width() / 2 +'px', 
                marginTop: - $(this).find('img').height() / 2 +'px' 
            })
        })

        if ($('#orimg').length) {
		    API.fullImage('#blur', API.img_width, API.img_height)
		    API.img_attr = API.fullImage('#orimg', API.img_width, API.img_height)
        }
    }

    // on screen change
    $(window).on('resize orientationchange', function(){
        setTimeout(size, 0)
    })

    // delay
    setTimeout(function() {
        size()

        API.appendImg(0, work_0.sum)
        API.appendImg(1, work_1.sum)

        API.svgDraw(2, 'i')
    }, 0)

    // url to page
    var path = window.location.pathname;
    if (path.indexOf('portfolio') != -1) API.pageControl(true, 'home')
    if (path.indexOf('about') != -1) API.pageControl(true, 'portfolio')

    // canvas blur image
	var img = new Image;
	img.src = '/static/image/about.jpg';
    img.onload = function() {
        $('#about > div').prepend('<img class="rel" src="'+ img.src +'" id="orimg" />')
        API.img_attr = API.fullImage('#orimg', API.img_width, API.img_height)

        if (!API.touchDevice()) {
			var bg = new API.canvasBlur($('#blur')[0],this);
			bg.blur(6)
			API.fullImage('#blur', API.img_width, API.img_height)

            $('#blurimg').hover(function() {
                $('#blur, #orimg').animate({
                    width: API.img_attr.w + 30 +'px',
                    height: API.img_attr.h + 30 * API.img_height / API.img_width +'px'
                })
             }, function() {
                $('#blur, #orimg').animate({
                    width: API.img_attr.w +'px',
                    height: API.img_attr.h +'px'
                })
            })
        }
	}

    // mouse click or tap
    API.tapPlot('#home, #portfolio, #about, .link', '#pot', function(id, x) {
        if (id == 'portfolio') {
            if (API.slider_pos < $('.item').length - 1 && x / window.innerWidth > 0.5) {
                API.sliderControl('.item', true)
            } else if (API.slider_pos > 0 && x / window.innerWidth < 0.5) {
                API.sliderControl('.item', false)
            } else {
                API.pageControl(true, id)
            }
        } else {
            API.pageControl(true, id)
        }
    })

    // keyboard control
    $(document).keydown(function(e) {
        switch (e.keyCode) {

            case 40:
                API.pageControl(true, API.section_pos.split('#')[1])
            break;

            case 38:
                API.pageControl(false, API.section_pos.split('#')[1])
            break;

            case 39:
                if (window.location.pathname.indexOf('portfolio') != -1) API.sliderControl('.item', true);
            break;

            case 37:
                if (window.location.pathname.indexOf('portfolio') != -1) API.sliderControl('.item', false);
            break;

        } 
    })

    // on mouse scroll
    $('#home, #portfolio, #about').on('mousewheel DOMMouseScroll', function(e) {
        e.preventDefault()
        var data = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;

        var time = 500;
        if (navigator.platform == 'MacIntel' || navigator.platform == 'MacPPC') time = 1000;

        if (API.scroll_mark) {
            API.scroll_mark = false;

            if (data < 0) API.pageControl(true, API.section_pos.split('#')[1]);
            if (data > 0) API.pageControl(false, API.section_pos.split('#')[1]);

            setTimeout(function() {API.scroll_mark = true}, time)
        }
    })

    // popstate control
    window.addEventListener('popstate', function(e) {
        var url = window.location.pathname,
            url = url.substring(1, url.length - 1);

        if (url == '/') url = 'home';

        var attr = API.pageInfo('#'+ url);

        API.sectionMove(attr.pos * API.section_height, function() {
            document.title = attr.title;
        })
    })

    // on swipe
    $('html').hammer({
        prevent_default: true
    }).on('swipe', function(e) {
        switch (e.direction) {

            case 'up':
                API.pageControl(true, API.section_pos.split('#')[1])
            break;

            case 'down':
                API.pageControl(false, API.section_pos.split('#')[1])
            break;

            case 'left':
                if (window.location.pathname.indexOf('portfolio') != -1) API.sliderControl('.item', true);
            break;

            case 'right':
                if (window.location.pathname.indexOf('portfolio') != -1) API.sliderControl('.item', false);
            break;

        }
    })

    // show the content
    $('section').css('visibility', 'visible')

    console.info('https://github.com/LoeiFy')

})
