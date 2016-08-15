
var _ = {};

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

