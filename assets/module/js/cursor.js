
// touch device

API.cursor = function(tag) {

    $(tag).on('mouseover', function(e) {

        var id = e.currentTarget.id,
            ex = e.pageX / window.innerWidth,
            ey = e.pageY / window.innerHeight;

        switch (id) {

            case 'home':
                $('#home').css('cursor', 's-resize')
            break;

            case 'portfolio':
                if (API.slider_pos == 0) {
                    if (ex > 0.5) {
                        $('#portfolio').css('cursor', 'e-resize')
                    } else {
                        if (ey > 1.5) {
                            $('#portfolio').css('cursor', 's-resize')
                        } else {
                            $('#portfolio').css('cursor', 'n-resize')
                        }
                    }
                } else if (API.slider_pos == $('.item').length - 1) {
                    if (ex < 0.5) {
                        $('#portfolio').css('cursor', 'w-resize')
                    } else {
                        if (ey > 1.5) {
                            $('#portfolio').css('cursor', 's-resize')
                        } else {
                            $('#portfolio').css('cursor', 'n-resize')
                        }
                    }
                } else {
                    if (ex > 0.5) {
                        $('#portfolio').css('cursor', 'e-resize')
                    } else {
                        $('#portfolio').css('cursor', 'w-resize')
                    }
                }
            break;

            case 'about':
                if (ey < 2.5)  {
                    $('#about').css('cursor', 'n-resize')
                } else {
                    $('#about').css('cursor', 'default')
                }
            break;

        }

    })

};
