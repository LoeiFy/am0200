(function () {
  'use strict';

  (function(self) {

    if (self.fetch) {
      return
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && (function() {
        try {
          new Blob();
          return true
        } catch(e) {
          return false
        }
      })(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
      var viewClasses = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
      ];

      var isDataView = function(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj)
      };

      var isArrayBufferView = ArrayBuffer.isView || function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name')
      }
      return name.toLowerCase()
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value}
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator
        };
      }

      return iterator
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function(value, name) {
          this.append(name, value);
        }, this);
      } else if (Array.isArray(headers)) {
        headers.forEach(function(header) {
          this.append(header[0], header[1]);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function(name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue+','+value : value;
    };

    Headers.prototype['delete'] = function(name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function(name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name))
    };

    Headers.prototype.set = function(name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function(callback, thisArg) {
      for (var name in this.map) {
        if (this.map.hasOwnProperty(name)) {
          callback.call(thisArg, this.map[name], name, this);
        }
      }
    };

    Headers.prototype.keys = function() {
      var items = [];
      this.forEach(function(value, name) { items.push(name); });
      return iteratorFor(items)
    };

    Headers.prototype.values = function() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      return iteratorFor(items)
    };

    Headers.prototype.entries = function() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      return iteratorFor(items)
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'))
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function(resolve, reject) {
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = function() {
          reject(reader.error);
        };
      })
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }
      return chars.join('')
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0)
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function(body) {
        this._bodyInit = body;
        if (!body) {
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          // IE 10-11 can't handle a DataView body.
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          throw new Error('unsupported BodyInit type')
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob)
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]))
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob')
          } else {
            return Promise.resolve(new Blob([this._bodyText]))
          }
        };

        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
          } else {
            return this.blob().then(readBlobAsArrayBuffer)
          }
        };
      }

      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      };

      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode)
        };
      }

      this.json = function() {
        return this.text().then(JSON.parse)
      };

      return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return (methods.indexOf(upcased) > -1) ? upcased : method
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError('Already read')
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = String(input);
      }

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests')
      }
      this._initBody(body);
    }

    Request.prototype.clone = function() {
      return new Request(this, { body: this._bodyInit })
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
      // https://tools.ietf.org/html/rfc7230#section-3.2
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
      preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status === undefined ? 200 : options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = 'statusText' in options ? options.statusText : 'OK';
      this.headers = new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function() {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      })
    };

    Response.error = function() {
      var response = new Response(null, {status: 0, statusText: ''});
      response.type = 'error';
      return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function(url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code')
      }

      return new Response(null, {status: status, headers: {location: url}})
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function(input, init) {
      return new Promise(function(resolve, reject) {
        var request = new Request(input, init);
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function() {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      })
    };
    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : undefined);

  var dash = ':';

  var title = function title() {
    setTimeout(function () {
      dash = dash === ':' ? ' ' : ':';
      document.title = 'AM 02' + dash + '00';
      title();
    }, 1000);
  };

  title();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _class = function () {
    function _class() {
      classCallCheck(this, _class);

      this.konami = '38,38,40,40,37,39,37,39,66,65';
      this.keys = [];
      this.callback = function () {
        return null;
      };
      this.init();
    }

    createClass(_class, [{
      key: 'init',
      value: function init() {
        var _this = this;

        window.onkeydown = function (_ref) {
          var keyCode = _ref.keyCode;

          if (keyCode === 38 && _this.keys[0] !== 38) {
            _this.keys = [];
          }
          _this.keys.push(keyCode);
          if (_this.keys.length === 10) {
            if (_this.konami === _this.keys.join()) {
              _this.callback();
            }
            _this.keys = [];
          }
        };
      }
    }, {
      key: 'active',
      set: function set$$1(fn) {
        this.callback = fn;
      }
    }]);
    return _class;
  }();

  function detail (item) {
    var title = item.title,
        description = item.description,
        _item$skills = item.skills,
        skills = _item$skills === undefined ? [] : _item$skills,
        _item$images = item.images,
        images = _item$images === undefined ? [] : _item$images,
        url = item.url;

    var skillsTpl = skills.map(function (skill) {
      return '<li>' + skill + '</li>';
    }).join('');
    var imagesTpl = images.map(function (image) {
      return '<img src="' + image + '" />';
    }).join('');
    var urlTpl = url.map(function (u) {
      if ((typeof u === 'undefined' ? 'undefined' : _typeof(u)) === 'object') {
        var k = Object.keys(u)[0];
        var v = Object.values(u)[0];
        return '<a href="' + v + '" target="_blank">' + k + '</a>';
      }
      if (u.indexOf('.png') > -1 || u.indexOf('.jpg') > -1) {
        return '<img src="' + u + '" />';
      }
      return '<a target="_blank" href="' + u + '">' + u + '</a>';
    }).join('');
    var descriptionTpl = Array.isArray(description) ? description.map(function (d) {
      return '<p>' + d + '</p>';
    }).join('') : '<p>' + description + '</p>';

    return '\n    <div class="detail">\n      <h2>' + title + '</h2>\n      <div class="info">\n        <ul>' + skillsTpl + '</ul>\n        <div>' + descriptionTpl + '</div>\n      </div>\n      <div class="url">' + urlTpl + '</div>\n      <div class="images">' + imagesTpl + '</div>\n    </div>\n  ';
  }

  var Query = function () {
    function Query(e) {
      classCallCheck(this, Query);

      var regex = /HTML.*?Element/;
      if (e) {
        var type = Object.prototype.toString.call(e);
        this.elements = regex.test(type) ? [e] : Array.from(document.querySelectorAll(e));
      }
    }

    createClass(Query, [{
      key: 'html',
      value: function html(content) {
        this.elements.forEach(function (e) {
          e.innerHTML = content;
        });
        return this;
      }
    }, {
      key: 'addClass',
      value: function addClass(name) {
        this.elements.forEach(function (e) {
          return e.classList.add(name);
        });
        return this;
      }
    }, {
      key: 'hasClass',
      value: function hasClass(name) {
        return this.elements[0].classList.contains(name);
      }
    }, {
      key: 'css',
      value: function css(styles) {
        this.elements.forEach(function (e) {
          Object.keys(styles).forEach(function (key) {
            e.style[key] = styles[key];
          });
        });
        return this;
      }
    }, {
      key: 'on',
      value: function on(events, callback) {
        var evs = events.split(',').map(function (ev) {
          return ev.trim();
        });

        this.elements.forEach(function (e) {
          evs.forEach(function (ev) {
            e.addEventListener(ev, callback, false);
          });
        });

        return this;
      }
    }, {
      key: 'removeClass',
      value: function removeClass(name) {
        this.elements.forEach(function (e) {
          return e.classList.remove(name);
        });
        return this;
      }
    }, {
      key: 'append',
      value: function append(items) {
        var _this = this;

        if (Array.isArray(items)) {
          items.forEach(function (item) {
            return _this.elements[0].appendChild(item);
          });
          return this;
        }
        this.elements[0].appendChild(items);
        return this;
      }
    }, {
      key: 'context',
      get: function get$$1() {
        return this.elements[0];
      }
    }]);
    return Query;
  }();

  var $ = (function (e) {
    return new Query(e);
  });

  var _class$1 = function () {
    function _class(e) {
      classCallCheck(this, _class);

      this.container = $(e);
    }

    createClass(_class, [{
      key: 'setImgs',
      value: function setImgs(imgs) {
        var _$ = $(imgs),
            elements = _$.elements;

        for (var i = 0; i < elements.length; i += 1) {
          elements[i].onload = function load() {
            var width = this.width,
                height = this.height;

            $(this).css({
              display: 'inline-block',
              width: width * 0.5 + 'px',
              height: height * 0.5 + 'px'
            });
          };
        }
        return this;
      }
    }, {
      key: 'render',
      value: function render(name, callback) {
        var _this = this;

        this.container.addClass('loading');

        window.fetch('/json/' + name + '.json').then(function (res) {
          return res.json();
        }).then(function (res) {
          return detail(res);
        }).then(function (res) {
          setTimeout(function () {
            _this.container.removeClass('loading');
            _this.container.html(res);
            _this.setImgs('.detail img');
            callback();
          }, 500);
        });
      }
    }]);
    return _class;
  }();

  var portfolio = new _class$1('.right');

  var loading = false;

  function list(items) {
    return items.sort(function (a, b) {
      return a.order - b.order;
    }).map(function (_ref) {
      var title = _ref.title,
          name = _ref.name,
          subtitle = _ref.subtitle;

      var e = document.createElement('div');

      e.className = 'item';
      e.innerHTML = '<h3>' + title + '</h3><p>' + subtitle + '</p>';
      e.onclick = function () {
        $('.left').removeClass('active');

        if (loading || e.classList.contains('active')) {
          return;
        }

        loading = true;

        portfolio.render(name, function () {
          loading = false;
          $('.item').removeClass('active');
          $('.top > div').removeClass('active');
          e.classList.add('active');
        });
      };

      return e;
    });
  }

  function user() {
    var container = document.createElement('div');
    var img = document.createElement('img');
    var div = document.createElement('div');

    div.innerHTML = '<h3>LoeiFy</h3><p>Software Engineer</p>';
    img.src = 'https://avatars2.githubusercontent.com/u/2193211';
    img.onclick = function (e) {
      e.stopPropagation();
      var ts = $('#toast');
      if (!ts.hasClass('active')) {
        ts.addClass('active');
        setTimeout(function () {
          ts.removeClass('active');
        }, 1000);
      }
    };
    container.appendChild(img);
    container.appendChild(div);
    container.onclick = function () {
      $('.left').removeClass('active');

      if (loading || container.classList.contains('active')) {
        return;
      }

      loading = true;

      portfolio.render('default', function () {
        loading = false;
        $('.item').removeClass('active');
        container.classList.add('active');
      });
    };

    return container;
  }

  var _class$2 = function () {
    function _class(e) {
      classCallCheck(this, _class);

      this.container = $(e);
    }

    createClass(_class, [{
      key: 'render',
      value: function render() {
        var _this = this;

        window.fetch('/json/portfolios.json').then(function (res) {
          return res.json();
        }).then(function (res) {
          return list(res);
        }).then(function (res) {
          return _this.container.append(res);
        });
      }
    }]);
    return _class;
  }();

  var _class$3 = function () {
    function _class(e) {
      classCallCheck(this, _class);

      this.container = $(e);
    }

    createClass(_class, [{
      key: 'render',
      value: function render() {
        this.container.append(user());
      }
    }, {
      key: 'start',
      value: function start() {
        $('.top > div').context.click();
        return this;
      }
    }]);
    return _class;
  }();

  var _class$4 = function () {
    function _class() {
      classCallCheck(this, _class);

      this.e = $('#popup');
      this.init();
    }

    createClass(_class, [{
      key: 'open',
      value: function open() {
        this.e.addClass('active');
      }
    }, {
      key: 'init',
      value: function init() {
        var _this = this;

        this.e.on('click', function (_ref) {
          var target = _ref.target;

          if (target.id === 'popup') {
            _this.e.removeClass('active');
          }
        });
        window.onkeyup = function (_ref2) {
          var keyCode = _ref2.keyCode;

          if (keyCode === 27) {
            _this.e.removeClass('active');
          }
        };
      }
    }]);
    return _class;
  }();

  window.onload = function () {
    var popup = new _class$4();
    var portfolios = new _class$2('.bottom');
    var top = new _class$3('.top');
    var konami = new _class();

    konami.active = function () {
      return popup.open();
    };
    portfolios.render();
    top.render();
    top.start();

    $('#menu').on('click', function () {
      return $('.left').addClass('active');
    });
  };

}());
