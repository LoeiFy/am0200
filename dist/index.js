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

  var list = function list(items) {
    return items.map(function (_ref) {
      var title = _ref.title,
          name = _ref.name,
          subtitle = _ref.subtitle,
          url = _ref.url;

      if (url) {
        return '\n        <a target="_blank" href="' + url + '" class="item">\n          <h3>' + title + '</h3>\n        </a>\n      ';
      }
      return '\n      <div data-name="' + name + '" class="item">\n        <h3>' + title + '</h3>\n        <p>' + subtitle + '</p>\n      </div>\n    ';
    }).join('');
  };

  var asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
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
      key: 'ready',
      value: function ready() {
        var _this = this;

        return new Promise(function (resolve) {
          document.addEventListener('DOMContentLoaded', function () {
            resolve(_this);
          });
        });
      }
    }]);
    return Query;
  }();

  var $ = (function (e) {
    return new Query(e);
  });

  var _class = function () {
    function _class(e) {
      classCallCheck(this, _class);
      this.urls = [{
        title: 'GitHub',
        url: 'https://github.com/loeify'
      }, {
        title: 'Email',
        url: 'mailto:loeify@gmail.com'
      }, {
        title: 'Blog',
        url: 'https://mirror.am0200.com'
      }];

      this.container = $(e);
    }

    createClass(_class, [{
      key: 'render',
      value: function render() {
        var _this = this;

        window.fetch('/json/portfolios.json').then(function (res) {
          return res.json();
        }).then(function (res) {
          return _this.urls.concat(res);
        }).then(function (res) {
          return list(res);
        }).then(function (res) {
          return _this.container.html(res);
        });
      }
    }]);
    return _class;
  }();

  var _this = undefined;

  var portfolios = new _class('.bottom');asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return $().ready();

          case 2:
            portfolios.render();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }))();

}());
