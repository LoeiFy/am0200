

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

var grid = [[0, 19], [0, 20], [0, 4]];
//var grid = [[0, 19], [0, 20], [0, 21], [0, 22], [0, 23], [0, 24], [0, 25], [0, 26], [0, 27], [0, 28], [0, 29]];

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

        html += '<div style="font-size:10px;float:left;width:30px;height:30px;" '+ mark +'>'+ bg +'</div>'

    }

}

document.getElementById('test').innerHTML = html;
document.getElementById('test').style.width = 31 * 30 +'px';
document.getElementById('test').style.height = 23 * 30 +'px';
    
