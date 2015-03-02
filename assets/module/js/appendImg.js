
// append works images

API.appendImg = function(id, sum) {

    for (var i = 0; i < sum; i ++) {
        API.loadImage(id, i)
    }

};
