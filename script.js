
Array.prototype.shuffle = function() {
    var i = this.length, p, t;
    while (i--) {
        p = Math.floor(Math.random()*i);
        t = this[i];
        this[i] = this[p];
        this[p] = t;
    }
    return this
}

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy")

window.onload = function() {

    document.getElementsByTagName('h1')[0].classList.add('font')

    Array.prototype.forEach.call(document.getElementsByTagName('a'), function(e, i){
        e.classList.add('font')
    })

}

var grid_width = 10,
    row = 31,
    col = 21;

var grid = [
    [0, 17], [0, 18], [0, 19], [0, 20], [0, 21], [0, 22], [0, 23], [0, 24], [0, 25],
    [1, 16], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 24], [1, 25], [1, 26],
    [2, 16], [2, 17], [2, 18], [2, 20], [2, 21], [2, 22], [2, 23], [2, 24], [2, 25], [2, 26],
    [3, 16], [3, 17], [3, 18], [3, 19], [3, 20], [3, 21], [3, 22], [3, 23], [3, 24], [3, 25], [3, 26],
    [4, 16], [4, 17], [4, 18], [4, 19], [4, 20], [4, 21], [4, 22], [4, 23], [4, 24], [4, 25], [4, 26],
    [5, 16], [5, 17], [5, 18], [5, 19], [5, 20], [5, 21],
    [6, 16], [6, 17], [6, 18], [6, 19], [6, 20], [6, 21], [6, 22], [6, 23], [6, 24],
    [7, 6], [7, 15], [7, 16], [7, 17], [7, 18], [7, 19], [7, 20],
    [8, 6], [8, 14], [8, 15], [8, 16], [8, 17], [8, 18], [8, 19], [8, 20],
    [9, 6], [9, 7], [9, 13], [9, 14], [9, 15], [9, 16], [9, 17], [9, 18], [9, 19], [9, 20], [9, 21], [9, 22],
    [10, 6], [10, 7], [10, 8], [10, 12], [10, 13], [10, 14], [10, 15], [10, 16], [10, 17], [10, 18], [10, 19], [10, 20], [10, 22],
    [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12], [11, 13], [11, 14], [11, 15], [11, 16], [11, 17], [11, 18], [11, 19], [11, 20],
    [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [12, 17], [12, 18], [12, 19], [12, 20],
    [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [13, 18], [13, 19], [13, 20],
    [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14], [14, 15], [14, 16], [14, 17], [14, 18], [14, 19],
    [15, 9], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [15, 15], [15, 16], [15, 17], [15, 18],
    [16, 10], [16, 11], [16, 12], [16, 13], [16, 14], [16, 15], [16, 16], [16, 17],
    [17, 11], [17, 12], [17, 13], [17, 14], [17, 16], [17, 17],
    [18, 11], [18, 12], [18, 13], [18, 17],
    [19, 11], [19, 17],
    [20, 11], [20, 12], [20, 17], [20, 18]
];

var html = '';

for (var i = 0; i < col; i ++) {

    for (var j = 0; j < row; j ++) {

        var _id = '', _class = '', _child = '';

        for (var k = 0; k < grid.length; k ++) {

            if (i == grid[k][0] && j == grid[k][1]) {
                _id = 'id="w'+ i +'h'+ j +'"';
                _class = 'class="cover"';
                _child = '<div style="-moz-background-size:'+ row * grid_width +'px '+ col * grid_width +'px;-webkit-background-size:'+ row * grid_width +'px '+ col * grid_width +'px;background-size:'+ row * grid_width +'px '+ col * grid_width +'px;background-position:'+ -j * grid_width +'px '+ -i * grid_width +'px"></div>';
                break;
            }

        }

        html += '<div style="width:'+ grid_width +'px;height:'+ grid_width +'px" '+ _id + _class +'>'+ _child +'</div>';

    }

}

var dinosaur = document.getElementById('dinosaur');

dinosaur.innerHTML = html;
dinosaur.style.width = row * grid_width +'px';
dinosaur.style.height = col * grid_width +'px';

if (Math.random() > 0.5) {
    grid = grid.shuffle()
}

var _start = 0, _time;

;(_time = function() {

    setTimeout(function() {
        document.getElementById('w'+ grid[_start][0] +'h'+ grid[_start][1]).classList.add('active')
        if (_start < grid.length - 1) {
            _start ++
            _time()
        }
    }, 100)

}).call(this)


/*
 * https://github.com/LoeiFy/CBFimage/blob/master/README.md
 *
 * @version 1.0.1
 * @author LoeiFy@gmail.com
 * http://lorem.in/ | under MIT license
 */

;(function(window, undefined) {

    function CBFimage(element, option) {

        this.option = {
            start:      function() {},
            progress:   function(loaded, total) {},
            complete:   function(image) {}
        }

        if (option && typeof option === 'object') {
            for (var key in option) {
                this.option[key] = option[key]
            }
        }

        if (element && element.getAttribute('src') !== '') {
            this.element = element;

            this.src = element.getAttribute('src');

            var blur = parseInt(element.getAttribute('blur'));
            this.blur = blur > 0 && blur <= 10 ? blur : 0;

            this.loadImg()
        }

    }

    // canvas draw image
    CBFimage.prototype.canvasImg = function(image) {

        this.element.width = image.width;
        this.element.height = image.height;

        var context = this.element.getContext('2d');
        context.drawImage(image, 0, 0)

        if (this.blur > 0) {
            context.globalAlpha = 0.5;

            for (var y = - this.blur; y <= this.blur; y += 2) {
                for (var x = - this.blur; x <= this.blur; x += 2) {
                    context.drawImage(this.element, x + 1, y + 1)
                    if (x >= 0 && y >= 0) {
                        context.drawImage(this.element, - (x - 1), - (y - 1))
                    }
                }
            }
            context.globalAlpha = 1;
        }

    }

    // xhr get image
    CBFimage.prototype.loadImg = function () {

        var that = this;
        this.request = new XMLHttpRequest();

        this.request.onloadstart = function() {
            that.option.start()
        }

        this.request.onprogress = function(e) {
            // may total = 0
            if (parseInt(e.total) !== 0) {
                that.option.progress(e.loaded, e.total)
            }
        }

        this.request.onload = function(e) {
            if (this.status >= 200 && this.status < 400) {
                var image = new Image();
                image.onload = function() {
                    that.canvasImg(image)
                    that.option.complete(image)
                }

                var type = that.src.substr(that.src.lastIndexOf('.') + 1).substr(0, 3);

                if (type == 'jpg') {
                    type = 'jpeg'
                }

                image.src = 'data:image/'+ type +';base64,'+ base64Encode(that.request.responseText);
            }
        }

        this.request.open('GET', that.src, true)
        this.request.overrideMimeType('text/plain; charset=x-user-defined')
        this.request.send(null)

    }

    // abort
    CBFimage.prototype.abort = function() {
        this.request.abort()
    }

    // http://www.philten.com/us-xmlhttprequest-image/
    function base64Encode(inputStr) {

        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            outputStr = '',
            i = 0;
                   
        while (i < inputStr.length) {
            //all three "& 0xff" added below are there to fix a known bug 
            //with bytes returned by xhr.responseText
            var byte1 = inputStr.charCodeAt(i++) & 0xff,
                byte2 = inputStr.charCodeAt(i++) & 0xff,
                byte3 = inputStr.charCodeAt(i++) & 0xff,
                
                enc1 = byte1 >> 2,
                enc2 = ((byte1 & 3) << 4) | (byte2 >> 4),       
                enc3,
                enc4;

                if (isNaN(byte2)) {
                    enc3 = enc4 = 64;
                } else {
                    enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
                    if (isNaN(byte3)) {
                        enc4 = 64;
                    } else {
                        enc4 = byte3 & 63;
                    }
                }
            outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
        }         
        return outputStr

    }

    window.CBFimage = CBFimage;

})(window)
