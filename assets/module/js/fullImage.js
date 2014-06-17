/**
 * full image 
 *
 */

API.fullImage = function(id, w, h) {

	var _height = window.innerHeight,
	    _width = window.innerWidth,
        ratio = h / w;

	if (_height / _width > ratio) {
		$(id).height(_height).width(_height / ratio)
	} else {
		$(id).width(_width).height(_width * ratio)
	}

	$(id).css('left', (_width - $(id).width()) / 2)
	$(id).css('top', (_height - $(id).height()) / 2)

};
