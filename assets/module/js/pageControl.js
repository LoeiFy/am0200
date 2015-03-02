
// page control & change url 

API.pageControl = function(mark, id) {

    if (mark) {
        var id = '#'+ $('#'+ id).next()[0].id;
        if (id == '#pot') return;
    } else {
        if (!$(API.section_pos).prev()[0]) return;
        var id = '#'+ $(API.section_pos).prev()[0].id;
    }

    var attr = API.pageInfo(id);

    API.sectionMove(attr.pos * API.section_height)
    API.section_pos = id;
    
    history.pushState(null, attr.title, attr.url);
	document.title = attr.title;

};
