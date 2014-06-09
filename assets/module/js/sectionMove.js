/**
 * page move function
 *
 * f: callback function
 */

API.sectionMove = function(position, f) {
    var f = f || function() {};
    $('body, html').animate({'scrollTop': position}, 700, 'easeInOutQuint', function() {
        f()
    })
};
