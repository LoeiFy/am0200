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
