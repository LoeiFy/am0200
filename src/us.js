
var _ = {};

// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

var property = function(key) {
return function(obj) {
  return obj == null ? void 0 : obj[key];
};
};

// Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
var length = getLength(collection);
return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

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

// Shuffle a collection.
_.shuffle = function(obj) {
return _.sample(obj, Infinity);
};

// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
_.sample = function(obj, n, guard) {
if (n == null || guard) {
  if (!isArrayLike(obj)) obj = _.values(obj);
  return obj[_.random(obj.length - 1)];
}
var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
var length = getLength(sample);
n = Math.max(Math.min(n, length), 0);
var last = length - 1;
for (var index = 0; index < n; index++) {
  var rand = _.random(index, last);
  var temp = sample[index];
  sample[index] = sample[rand];
  sample[rand] = temp;
}
return sample.slice(0, n);
};


// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
_.range = function(start, stop, step) {
if (stop == null) {
  stop = start || 0;
  start = 0;
}
if (!step) {
  step = stop < start ? -1 : 1;
}

var length = Math.max(Math.ceil((stop - start) / step), 0);
var range = Array(length);

for (var idx = 0; idx < length; idx++, start += step) {
  range[idx] = start;
}

return range;
};

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
  nativeKeys = Object.keys,
  nativeCreate = Object.create;

// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
_.isArray = nativeIsArray || function(obj) {
return toString.call(obj) === '[object Array]';
};

// Is a given variable an object?
_.isObject = function(obj) {
var type = typeof obj;
return type === 'function' || type === 'object' && !!obj;
};

// An internal function for creating assigner functions.
var createAssigner = function(keysFunc, defaults) {
return function(obj) {
  var length = arguments.length;
  if (defaults) obj = Object(obj);
  if (length < 2 || obj == null) return obj;
  for (var index = 1; index < length; index++) {
    var source = arguments[index],
        keys = keysFunc(source),
        l = keys.length;
    for (var i = 0; i < l; i++) {
      var key = keys[i];
      if (!defaults || obj[key] === void 0) obj[key] = source[key];
    }
  }
  return obj;
};
};

// Extend a given object with all the properties in passed-in object(s).
_.extend = createAssigner(_.allKeys);

// Create a (shallow-cloned) duplicate of an object.
_.clone = function(obj) {
if (!_.isObject(obj)) return obj;
return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};

