/*
 *
 * init
 *
 */

var section_note = 0,
    pos_hash = true,
    Dtitle,
    Durl,
    section_pos;

function moveDown(mark) {
    pos_hash = false;

    if (mark) { 
        section_note ++
    } else {
        section_note --
    }
    if (section_note >= 2) section_note = 2;
    if (section_note <= 0) section_note = 0;

    switch (section_note) {
        case 0:
            section_pos = 0;
            Dtitle = 'Lorem Ipsum 2014';
            Durl = '/';
        break;

        case 1:
            section_pos = $('#gallery').position().top;
            Dtitle = 'Lorem Ipsum 2014 / Gallery';
            Durl = '/gallery';
        break;
        
        case 2:
            section_pos = $('#info').position().top
            Dtitle = 'Lorem Ipsum 2014 / Info';
            Durl = '/info';
        break;
    } 

    API.goTop(section_pos, function() {
        pushUrl(Dtitle, section_note, Durl)
        setTimeout(function() {pos_hash = true}, 500)
    })
}

function pushUrl(title, pos, url) {
    history.pushState({ pos: pos, title: title }, title, url);
	document.title = title;
}

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
    
    history.replaceState({'pos': 0, 'title': 'Lorem Ipsum 2014'}, 'Lorem Ipsum 2014', '/');

    API.tapPlot('#home, #gallery, #info', '#pot', function(id) {
        var id = '#'+ $('#'+ id).next()[0].id;
        if (id == '#pot') return;

        var attr = API.getPorperty(id);

        API.sectionMove(attr.pos * API.section_height)
        API.section_pos = id;
        
        API.pushUrl(attr.title, attr.url, attr.pos)
    })


/*
    $('#home, #gallery, #info').hammer({
        prevent_default: true
    }).on('tap', function() {
        moveDown(true)
    }).on('mousewheel DOMMouseScroll', function(e) {
        e.preventDefault()
        if (pos_hash) {
            var data = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if (data < 0) moveDown(true);
            if (data > 0) moveDown(false);
        } 
    })

    $(document).keydown(function(e) {
        if (e.keyCode == 40) moveDown(true);
        if (e.keyCode == 38) moveDown(false);
    })
*/

    window.addEventListener('popstate', function(e) {
        var state = e.state;
        if (!state) return;

        API.sectionMove(state.pos * API.section_height, function() {
            document.title = state.title;
        })
    })
})
