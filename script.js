

window.onload = function() {

    document.getElementById('canvas').classList.add('image')

    console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy")
    console.log("%c loeify.github.com %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/loeify.github.com")
    console.log("%c particles.js %c","background:#24272A; color:#ffffff","","https://github.com/VincentGarreau/particles.js/")
    console.log("%c font %c","background:#24272A; color:#ffffff","","Sansation")

}

var gridWidth = 12,
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

        var mark = '', bg = '';

        for (var k = 0; k < grid.length; k ++) {
            if (i == grid[k][0] && j == grid[k][1]) {
                mark = 'class="tf"';
                bg = '<div style="background-position:'+ -j*30 +'px '+ -i*30 +'px"></div>';
                break;
            }
        }

        html += '<div id="w'+ i +'h'+ j +'" style="font-size:10px;float:left;width:30px;height:30px;" '+ mark +'>'+ bg +'</div>'

    }

}

document.getElementById('test').innerHTML = html;
document.getElementById('test').style.width = 31 * 30 +'px';
document.getElementById('test').style.height = 21 * 30 +'px';


/*
document.getElementById('test').addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('tf')) {
        e.target.classList.add('active')
    }
}, false)
*/

// shuffle Array
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

// return shuffle covers
grid = grid.shuffle();

var start = 0;

t()

function t() {
setTimeout(function() {
    document.getElementById('w'+ grid[start][0] +'h'+ grid[start][1]).classList.add('active')
    if (start < grid.length - 1) {
        start ++
        t()
    }
}, 100)
}
    
