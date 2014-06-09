/**
 * change url
 *
 */

API.pushUrl = function(title, url, pos) {
    history.pushState({'pos': pos, 'title': title}, title, url);
	document.title = title;
};
