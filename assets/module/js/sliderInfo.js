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
            content = 'A WordPress theme for picture showcase. <br /> visit here: <a href="http://guo.lu">http://guo.lu</a>';
            sum = 4;
        break;

        case 1:
            title = 'Jaku Icon';
            content = 'Jaku Icon showcase, all icons via http://jakurepo.com/ <br /> visit here: <a href="http://jaku.guo.lu">http://jaku.guo.lu</a>';
            sum = 5;
        break;
    } 

    return {'title': title, 'content': content, 'sum': sum}
};
