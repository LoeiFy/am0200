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

        case '#guolu':
            pos = 1;
            title = 'Lorem Ipsum 2014 / GuoLu';
            url = '/guolu/';
        break;

        case '#jaku':
            pos = 2;
            title = 'Lorem Ipsum 2014 / Jaku';
            url = '/jaku/';
        break;
        
        case '#info':
            pos = 3;
            title = 'Lorem Ipsum 2014 / Info';
            url = '/info/';
        break;
    } 

    return {'pos': pos, 'title': title, 'url': url}
};
