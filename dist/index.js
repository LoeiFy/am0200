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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var a = { b: 1 };
  var c = _extends({ d: 1 }, a);

  var A = function () {
    function A() {
      classCallCheck(this, A);
      this.state = null;
    }

    createClass(A, [{
      key: 'render',
      value: function render() {
        return this;
      }
    }]);
    return A;
  }();

  var s = new A();

  s.render();

  console.log(c);

}());
