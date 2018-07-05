(function () {
  'use strict';

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

      if (e) {
        this.elements = Array.from(document.querySelectorAll(e));
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

    div.innerHTML = '<h3>LoeiFy</h3><p>Front-End Developer</p>';
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

    portfolios.render();
    top.render();
    konami.active = function () {
      return popup.open();
    };
  };

}());
