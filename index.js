
var random = function(min, max) {
    if (!max) {
        max = min
        min = 0
    }

    return min + Math.floor(Math.random() * (max - min + 1))
}

;(function() {
    var lastTime = 0
    var vendors = ['webkit', 'moz']

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16 - (currTime - lastTime))
            var id = window.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall)

            lastTime = currTime + timeToCall

            return id
        }
    }
}())

var html = '{<p>Blog:<a>"http://mirror.am0200.com"</a>,</p>\n<p>Email:<a>"LoeiFy@gmail.com"</a>,</p>\n<p>Github:<a>"https://github.com/LoeiFy"</a></p>\n}'

var css = '.me {\n    font-family: monospace;\n    font-size: 14px;\n    color: #5a666f;\n}\n.me p {\n    margin-left: 40px;\n    line-height: 1.4;\n}\n.me a {\n    color: #2d9cd0;\n    margin-left: 10px;\n}\n'

document.addEventListener('DOMContentLoaded', function() {
    var me = document.querySelector('.me')
    var code = document.querySelector('.code')
    var style = document.querySelector('.style')
    var line = document.querySelector('.line')

    var html_index = 0
    var css_index = 0
    var write_html

    var write_line = function() {
        var row = (code.offsetHeight - 2 * 14) / 16
        var nums = ''

        for (let i = 1; i <= row; i ++) {
            nums += i +'<br />'
        }

        line.innerHTML = nums
    }

    var write_css = function() {
        code.innerHTML = css.substr(0, css_index)
        css_index ++

        if (css.length >= css_index) {
            write_line()    
            //setTimeout(write_css, 100)
            requestAnimationFrame(write_css)
        } else {
            code.setAttribute('contenteditable', true)

            code.addEventListener('focus', function() {
                style.style.background = '#ebeeef';
            })

            code.addEventListener('blur', function() {
                style.style.background = '#fafafa';
                window.scroll(0, 0)
            })

            code.addEventListener('input', function() {
                write_line()
            })
        }
    }

    ;(write_html = function() {
        me.innerHTML = html.substr(0, html_index) +'<em>|</em>'
        html_index ++

        if (html.length >= html_index) {
            //setTimeout(write_html, 100)
            requestAnimationFrame(write_html)
        } else {
            var as = me.querySelectorAll('a')

            as[0].setAttribute('target', '_blank')
            as[0].setAttribute('href', 'http://mirror.am0200.com')

            as[1].setAttribute('target', '_blank')
            as[1].setAttribute('href', 'mailto:LoeiFy@gmail.com')

            as[2].setAttribute('target', '_blank')
            as[2].setAttribute('href', 'https://github.com/LoeiFy')

            style.style.top = random(8, 20) +'%'
            style.style.right = random(6, 18) +'%'
            style.style.display = 'block'

            write_css()
        }
    })()

    // title
    var titleDash = ':'
    var setTitle = function() {
        setTimeout(function() { 
            if (titleDash == ':') {
                titleDash = ' '
            } else {
                titleDash = ':'
            }

            document.title = 'AM 02' + titleDash + '00'
            setTitle()
        }, 1000)
    }
    setTitle()

    // drop
    var offset = []
    var isDown = false

    var setOffset = function(e) {
        isDown = true
        offset = [
            style.offsetLeft - (e.clientX || e.touches[0].clientX),
            style.offsetTop - (e.clientY || e.touches[0].clientY)
        ]
    }

    var setPosition = function(e) {
        if (isDown) {
            style.style.right = 'auto'
            style.style.left = ((e.clientX || e.touches[0].clientX) + offset[0]) +'px'
            style.style.top = ((e.clientY || e.touches[0].clientY) + offset[1]) +'px'
        }
    }

    style.addEventListener('mousedown', function(e) {
        if (e.target.tagName == 'P') {
            setOffset(e)
        }
    })

    style.addEventListener('touchstart', function(e) {
        setOffset(e)
    })

    document.addEventListener('mouseup', function() { isDown = false })
    document.addEventListener('touchend', function() { isDown = false })

    document.addEventListener('mousemove', function(e) {
        e.preventDefault()
        setPosition(e)
    })

    document.addEventListener('touchmove', function(e) {
        e.preventDefault()
        setPosition(e)
    })
})
