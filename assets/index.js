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
    
    history.replaceState({'pos': 0, 'title': 'Lorem Ipsum 2014'}, 'Lorem Ipsum 2014', '/');

    API.tapPlot('#home, #gallery, #info', '#pot', function(id) {
        API.doAction(true, id)
    })

    $(document).keydown(function(e) {
        if (e.keyCode == 40) API.doAction(true, API.section_pos.split('#')[1]);
        if (e.keyCode == 38) API.doAction(false, API.section_pos.split('#')[1]);
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
*/


    window.addEventListener('popstate', function(e) {
        var state = e.state;
        if (!state) return;

        API.sectionMove(state.pos * API.section_height, function() {
            document.title = state.title;
        })
    })
})
