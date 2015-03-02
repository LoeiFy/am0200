
// get slider info

API.sliderInfo = function(id) {

    var title, content, sum;

    switch (id) {
        case 0:
            title = 'Guo.Lu — Website';
            content = 'A WordPress theme for picture showcase. use Isotope for magical layouts. use basket.js for caching & loading scripts with localStorage. use history API & ajax for page jump without refreshing';
            url = 'http://guo.lu';
            sum = 4;
        break;

        case 1:
            title = 'Jaku Icon — Website';
            content = 'Jaku Icon showcase, all icons via http://jakurepo.com/ All icons are the property of their respective artists and may not be modified, sold, or redistributed without their consent';
            url = 'http://jaku.guo.lu';
            sum = 5;
        break;
    } 

    return {title: title, content: content, url: url, sum: sum}

};
