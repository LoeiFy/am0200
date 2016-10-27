
var random = function(min, max) {
    if (!max) {
        max = min
        min = 0
    }

    return min + Math.floor(Math.random() * (max - min + 1))
}

var html = '{<p>Bio:<a>"Web/UI Designer and Front-end Developer"</a>,</p>\n<p>Email:<a>"LoeiFy@gmail.com"</a>,</p>\n<p>Github:<a>"https://github.com/LoeiFy"</a></p>\n}'

var style = '.me {\n    font-family: monospace;\n   font-size: 14px;\n  color: #d2dee8;\n}\n.me p {\n   margin-left: 40px;\n    line-height: 1.4;\n}\n.me a {\n    color: #93d7f7;\n    margin-left: 10px;\n}'

const CODE = document.querySelector('.object');
const CSS = document.querySelector('.css');
const DS = document.querySelector('.style');

let ct = 0;
let cy = 0;

function ity() {
    CSS.innerHTML = STYLE.substr(0, cy);

    cy ++;

    if (STYLE.length >= cy) {
        line()
        setTimeout(ity, 100)
    } else {
        CSS.setAttribute('contenteditable', true)
    }
}

function atb() {
    const a0 = CODE.children[1].querySelector('a');
    const a1 = CODE.children[2].querySelector('a');
    
    a0.setAttribute('target', '_blank')
    a0.setAttribute('href', 'mailto:LoeiFy@gmail.com')

    a1.setAttribute('target', '_blank')
    a1.setAttribute('href', 'https://github.com/LoeiFy')

    DS.style.top = _.random(8, 20) +'%';
    DS.style.right = _.random(6, 18) +'%';
    DS.style.display = 'block';
}

function itv() {
    CODE.innerHTML = HTML.substr(0, ct) +'<em>|</em>';

    ct ++;

    if (HTML.length >= ct) {
        setTimeout(itv, 100)
    } else {
        atb()
        ity()
    }
}

itv()

CSS.addEventListener('focus', e => {
    DS.style.background = '#262c2f';
})

CSS.addEventListener('blur', e => {
    DS.style.background = '#000';
    window.scroll(0, 0)
})

CSS.addEventListener('input', e => {
    line()
})

function line() {
    const line = document.querySelector('.line');
    const row = (CSS.offsetHeight - 2 * 14) / 16;

    let s = '';

    for (let i = 1; i <= row; i ++) {
        s += i +'<br />'
    }

    line.innerHTML = s
}

let offset = [];
let mouse = {};
let isDown = false;

DS.addEventListener('mousedown', e => {
    if (e.target.tagName == 'P') {
        isDown = true;
        offset = [
            DS.offsetLeft - e.clientX,
            DS.offsetTop - e.clientY,
        ];
    }
}, false)

DS.addEventListener('touchstart', e => {
    isDown = true;
    offset = [
        DS.offsetLeft - e.touches[0].clientX,
        DS.offsetTop - e.touches[0].clientY,
    ];
}, false)

document.addEventListener('mouseup', e => isDown = false)
document.addEventListener('touchend', e => isDown = false)

document.addEventListener('mousemove', e => {
    e.preventDefault()

    if (isDown) {
        mouse = {
            x: e.clientX,
            y: e.clientY
        }

        DS.style.right = 'auto';
        DS.style.left = (mouse.x + offset[0]) +'px';
        DS.style.top = (mouse.y + offset[1]) +'px';
    }
})

document.addEventListener('touchmove', e => {
    e.preventDefault()

    if (isDown) {
        mouse = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }

        DS.style.right = 'auto';
        DS.style.left = (mouse.x + offset[0]) +'px';
        DS.style.top = (mouse.y + offset[1]) +'px';
    }
})
