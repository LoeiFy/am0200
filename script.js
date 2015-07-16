document.addEventListener('DOMContentLoaded', function() {

    particlesJS('canvas', {
        'particles': {
            'number': {
                'value': 100,
                'density': {
                    'enable': true,
                    'value_area': 700
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
                'distance': 130,
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
        'retina_detect': true
    })

})

// the PageVisibility API
