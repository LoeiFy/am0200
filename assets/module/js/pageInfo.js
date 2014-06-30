
// get page porperty

API.pageInfo = function(id) {
    var pos, title, url;

    switch (id) {
        case '#home':
            pos = 0;
            title = 'Lorem Ipsum 2014';
            url = '/';
        break;

        case '#portfolio':
            pos = 1;
            title = 'Portfolio | Lorem Ipsum 2014';
            url = '/portfolio/';
        break;
        
        case '#about':
            pos = 2;
            title = 'About | Lorem Ipsum 2014';
            url = '/about/';
        break;
    } 

    return {pos: pos, title: title, url: url}
};
