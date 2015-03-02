
// append work item

API.workItem = function(work, id, target) {

    var str = '<div class="info item bb w h rel">'+
              '<div class="infoinner w h bb abs">'+
              '<h3>'+ work.title +'</h3>'+
              '<p>'+ work.content +'</p>'+
              '<a class="abs link" target="_blank" href="'+ work.url +'">'+ work.url +'</a>'+
              '<div class="next abs"></div>'+
              '</div></div>';

    for (var i = 0; i < work.sum; i ++) {
        str += '<div id="'+ id + i +'" class="item image w h rel"></div>'
    }
    $(target).append(str)

};
