

window.onload = function() {

    document.getElementById('canvas').classList.add('image')

    console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy")
    console.log("%c loeify.github.com %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/loeify.github.com")
    console.log("%c particles.js %c","background:#24272A; color:#ffffff","","https://github.com/VincentGarreau/particles.js/")
    console.log("%c font %c","background:#24272A; color:#ffffff","","Sansation")

}

var gridWidth = 12,
    row = 31,
    col = 23;

var grid = [[0, 19], [0, 20], [0, 21], [0, 22], [0, 23], [0, 24], [0, 25], [0, 26], [0, 27], [0, 28], [0, 29]];

var html = '';

for (var i = 0; i < col; i ++) {

    for (var j = 0; j < row; j ++) {

        var mark = '#f9f9f9';

        for (var k = 0; k < grid.length; k ++) {
            if (i == grid[k][0] && j == grid[k][1]) {
                mark = 'grey';
                break;
            }
        }

        html += '<div style="font-size:10px;float:left;width:12px;height:12px;background:'+ mark +'"></div>'

    }

}

document.getElementById('test').innerHTML = html;
document.getElementById('test').style.width = 31 * 12 +'px';
document.getElementById('test').style.height = 23 * 12 +'px';
    
