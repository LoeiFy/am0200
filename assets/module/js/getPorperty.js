/**
 * get porperty
 *
 * return object
 */

API.getPorperty = function(id) {
    var pos, title, url;

    switch (id) {
        case '#home':
            pos = 0;
            title = 'Lorem Ipsum 2014';
            url = '/';
        break;

        case '#gallery':
            pos = 1;
            title = 'Lorem Ipsum 2014 / Gallery';
            url = '/gallery/';
        break;
        
        case '#info':
            pos = 2;
            title = 'Lorem Ipsum 2014 / Info';
            url = '/info/';
        break;
    } 

    return {'pos': pos, 'title': title, 'url': url}
};
