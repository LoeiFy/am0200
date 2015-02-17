// get args
function CBFimg(args) {
    // define
    args.ver = args.ver || 0;
    args.blur = args.blur > 0 ? parseInt(args.blur) : 0;
    args.tag = document.getElementById(args.id);

    getImage(args.url, args)
}

/* 
 * base64 Encode
 * http://www.philten.com/us-xmlhttprequest-image/
 */
function base64Encode(inputStr) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        outputStr = "",
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
    return outputStr;
}

/* 
 * image blur base on canvasBlur
 */
function canvasBlur(ele, img) {
    this.element = ele;
    this.image = img;

    this.element.width = this.image.width;
    this.element.height = this.image.height;

    this.context = this.element.getContext('2d');
    
    this.context.drawImage(this.image,0,0)
}

canvasBlur.prototype.blur = function(i) {
    this.context.globalAlpha = 0.5;

    for (var y = -i; y <= i; y += 2) {
        for (var x = -i; x <= i; x += 2) {
            this.context.drawImage(this.element, x + 1, y + 1)

            if (x >= 0 && y >= 0) {
                this.context.drawImage(this.element, -(x-1), -(y-1))
            }
        }
    }

    this.context.globalAlpha = 1;
}

/*
 * full background
 */
function fullBg(id, w, h) {
	var _height = window.innerHeight,
	    _width = window.innerWidth,
        ratio = h / w;

	if (_height / _width > ratio) {
        id.style.height = _height +'px';
        id.style.width = _height / ratio +'px';
	} else {
        id.style.width = _width +'px';
        id.style.height = _width * ratio +'px';
	}

    id.style.position = 'relative';
    id.style.left = (_width - parseInt(id.style.width)) / 2 +'px';
    id.style.top = (_height - parseInt(id.style.height)) / 2 +'px';
}

/* 
 * get image form localStorage or url
 */
function getImage(url, args) {
    var imagesrc = window.localStorage.getItem('canvasimgsrc'),
        imagever = window.localStorage.getItem('canvasimgver'),
        img = new Image();

    if (parseInt(imagever) !== args.ver) {
        loadImage(url, args)
        return;
    }

    img.src = imagesrc;
    img.onerror = function() {
        loadImage(url, args)
    }

    img.onload = function() {
        var bg = new canvasBlur(args.tag, img);
        
        if (args.blur) bg.blur(args.blur);
    
        fullBg(args.tag, img.width, img.height)
        window.onresize = function() {
            fullBg(args.tag, img.width, img.height)
        }

        setTimeout(function() {
            args.tag.style.opacity = 1;
        }, 500)
    }
} 

/* 
 * image load progress
 * http://blogs.adobe.com/webplatform/2012/01/13/html5-image-progress-events/
 */
function loadImage(imageURI, args) {
    var request, loadtag;
                    
    request = new XMLHttpRequest();
                
    request.onloadstart = function() {
        args.tag.insertAdjacentHTML('afterend', '<div id="loading"></div>')
        loadtag = document.getElementById('loading');
    };

    request.onprogress = function(e) {
        loadtag.style.width = e.loaded / e.total * window.innerWidth +'px';
    };

    request.onload = function() {
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + base64Encode(request.responseText);
        window.localStorage.setItem('canvasimgsrc', img.src)
        window.localStorage.setItem('canvasimgver', args.ver)

        var bg = new canvasBlur(args.tag, img);
        
        if (args.blur) bg.blur(args.blur);
    
        fullBg(args.tag, img.width, img.height)
        window.onresize = function() {
            fullBg(args.tag, img.width, img.height)
        }

        setTimeout(function() {
            args.tag.style.opacity = 1;
        }, 500)
    };

    request.onloadend = function() {
        loadtag.parentNode.removeChild(loadtag)
    };
    
    request.open("GET", imageURI, true)
    request.overrideMimeType('text/plain; charset=x-user-defined')
    request.send(null)
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() { 
    CBFimg({
        id: 'canvas',
        url: 'jpg.jpg',
        ver: 0,
        blur: 5
    })
})
