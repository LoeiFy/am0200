/**
 * get slider info
 *
 * return object
 */

API.sliderInfo = function(id) {
    var title, content, sum;

    switch (id) {
        case 0:
            title = 'Guo.Lu';
            content = 'A WordPress theme for picture showcase.';
            url = 'guo.lu';
            sum = 4;
        break;

        case 1:
            title = 'Jaku Icon';
            content = 'Jaku Icon showcase, all icons via http://jakurepo.com/';
            url = 'jaku.guo.lu';
            sum = 5;
        break;
    } 

    return {'title': title, 'content': content, 'url': url, 'sum': sum}
};
