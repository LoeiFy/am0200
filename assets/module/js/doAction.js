/**
 * page move & change url
 *
 * mark: true -> up, false -> down
 */

API.doAction = function(mark, id) {
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
};
