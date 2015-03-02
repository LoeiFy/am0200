
// slider move method

API.sliderMove = function(id, pos) {

    $(id).animate({'left': - pos * window.innerWidth}, 700, 'easeInOutQuint', function() {
        if (pos == 0) $(id).css('left', 0);
    })

};
