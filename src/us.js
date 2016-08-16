
var _ = {};

// Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
// This accumulates the arguments passed into an array, after a given index.
var restArgs = function(func, startIndex) {
startIndex = startIndex == null ? func.length - 1 : +startIndex;
return function() {
  var length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
  for (; index < length; index++) {
    rest[index] = arguments[index + startIndex];
  }
  switch (startIndex) {
    case 0: return func.call(this, rest);
    case 1: return func.call(this, arguments[0], rest);
    case 2: return func.call(this, arguments[0], arguments[1], rest);
  }
  var args = Array(startIndex + 1);
  for (index = 0; index < startIndex; index++) {
    args[index] = arguments[index];
  }
  args[startIndex] = rest;
  return func.apply(this, args);
};
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
var timeout, result;

var later = function(context, args) {
  timeout = null;
  if (args) result = func.apply(context, args);
};

var debounced = restArgs(function(args) {
  if (timeout) clearTimeout(timeout);
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(this, args);
  } else {
    timeout = _.delay(later, wait, this, args);
  }

  return result;
});

debounced.cancel = function() {
  clearTimeout(timeout);
  timeout = null;
};

return debounced;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
_.delay = restArgs(function(func, wait, args) {
return setTimeout(function() {
  return func.apply(null, args);
}, wait);
});

// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var nodelist = root.document && root.document.childNodes;
if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
_.isFunction = function(obj) {
  return typeof obj == 'function' || false;
};
}

// Return a random integer between min and max (inclusive).
_.random = function(min, max) {
if (max == null) {
  max = min;
  min = 0;
}
return min + Math.floor(Math.random() * (max - min + 1));
};
