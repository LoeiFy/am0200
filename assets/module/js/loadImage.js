
// load image

API.loadImage = function(work, pos) {

    $('<img class="db abs" src="/static/image/works/'+ work +'/'+ pos +'.jpg" />')
    .css({opacity: 0})
    .appendTo('#'+ work + pos)
    .load(function() {
        $(this).css({
            opacity: 1,
            marginLeft: - $(this).width() / 2 +'px', 
            marginTop: - $(this).height() / 2 +'px' 
        })
    })

};
