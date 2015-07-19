window.onload = function() {

    document.getElementById('canvas').classList.add('image')
    document.getElementsByTagName('article')[0].classList.add('font')

    particlesJS('canvas', {
        'particles': {
            'number': {
                'value': 200,
                'density': {
                    'enable': true,
                    'value_area': 500
                }
            },
            'color': {
                'value': '#fff'
            },
            'shape': {
                'type': 'circle'
            },
            'opacity': {
                'value': 1,
                'random': true
            },
            'size': {
                'value': 3,
                'random': true
            },
            'line_linked': {
                'enable': true,
                'distance': 100,
                'color': '#fff',
                'opacity': 1,
                'width': 1
            },
            'move': {
                'enable': true,
                'speed': 1,
                'direction': 'none',
                'random': true,
                'straight': false,
                'out_mode': 'bounce',
                'bounce': false
            }
        },
        'retina_detect': false
    })

    console.info('https://github.com/LoeiFy')
    console.info('particles.js => https://github.com/VincentGarreau/particles.js/')
    console.info('font => Sansation')
}

