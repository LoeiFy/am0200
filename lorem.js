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
 * get image form localStorage or url
 */
function getImage(url) {
    var imgsrc = window.localStorage.getItem('image'),
        img = new Image();

    img.src = imgsrc;
    img.onerror = function() {
        loadImage(url)
    }
    console.log(img.width)
} 

/* 
 * image load progress
 * http://blogs.adobe.com/webplatform/2012/01/13/html5-image-progress-events/
 */
function loadImage(imageURI) {
    var request;
                    
    request = new XMLHttpRequest();
                
    request.onloadstart = function() {
        console.log('start')
    };

    request.onprogress = function(e) {
        console.log(e.loaded / e.total)
    };

    request.onload = function() {
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + base64Encode(request.responseText);
        console.log(img.width)
        window.localStorage.setItem('image', img.src)
    };

    request.onloadend = function() {
        console.log('done')
    };
    
    request.open("GET", imageURI, true)
    request.overrideMimeType('text/plain; charset=x-user-defined')
    request.send(null)
}

document.addEventListener('DOMContentLoaded', function() {
    //loadImage('jpg.jpg')
    getImage('jpg.jpg')
})









