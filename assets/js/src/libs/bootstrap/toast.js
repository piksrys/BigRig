/*!
  * Bootstrap toast.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global = global || self, global.Toast = factory(global.jQuery, global.Util));
}(this, (function ($, Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'toast';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.toast';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Event = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY
  };
  var ClassName = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector = {
    DATA_DISMISS: '[data-dismiss="toast"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $.Event(Event.SHOW);
      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      if (this._config.animation) {
        this._element.classList.add(ClassName.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName.SHOWING);

        _this._element.classList.add(ClassName.SHOW);

        $(_this._element).trigger(Event.SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(ClassName.HIDE);

      Util.reflow(this._element);

      this._element.classList.add(ClassName.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(ClassName.SHOW)) {
        return;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName.SHOW)) {
        this._element.classList.remove(ClassName.SHOW);
      }

      $(this._element).off(Event.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, $(this._element).data(), {}, typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(ClassName.HIDE);

        $(_this3._element).trigger(Event.HIDDEN);
      };

      this._element.classList.remove(ClassName.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Toast._jQueryInterface;
  $.fn[NAME].Constructor = Toast;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Toast._jQueryInterface;
  };

  return Toast;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2FzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IHRvYXN0LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICd0b2FzdCdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjQuMSdcbmNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdicy50b2FzdCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbmNvbnN0IEV2ZW50ID0ge1xuICBDTElDS19ESVNNSVNTIDogYGNsaWNrLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICBISURFICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICBISURERU4gICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIFNIT1cgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gXG59XG5cbmNvbnN0IENsYXNzTmFtZSA9IHtcbiAgRkFERSAgICA6ICdmYWRlJyxcbiAgSElERSAgICA6ICdoaWRlJyxcbiAgU0hPVyAgICA6ICdzaG93JyxcbiAgU0hPV0lORyA6ICdzaG93aW5nJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYW5pbWF0aW9uIDogJ2Jvb2xlYW4nLFxuICBhdXRvaGlkZSAgOiAnYm9vbGVhbicsXG4gIGRlbGF5ICAgICA6ICdudW1iZXInXG59XG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGFuaW1hdGlvbiA6IHRydWUsXG4gIGF1dG9oaWRlICA6IHRydWUsXG4gIGRlbGF5ICAgICA6IDUwMFxufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgREFUQV9ESVNNSVNTIDogJ1tkYXRhLWRpc21pc3M9XCJ0b2FzdFwiXSdcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzIERlZmluaXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNsYXNzIFRvYXN0IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLl9jb25maWcgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbFxuICAgIHRoaXMuX3NldExpc3RlbmVycygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICAvLyBQdWJsaWNcblxuICBzaG93KCkge1xuICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVylcblxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDbGFzc05hbWUuRkFERSlcbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDbGFzc05hbWUuU0hPV0lORylcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDbGFzc05hbWUuU0hPVylcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmF1dG9oaWRlKSB7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENsYXNzTmFtZS5ISURFKVxuICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZS5TSE9XSU5HKVxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGUoKVxuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSlcblxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY2xvc2UoKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dClcbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbFxuXG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENsYXNzTmFtZS5TSE9XKVxuICAgIH1cblxuICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LkNMSUNLX0RJU01JU1MpXG5cbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB0aGlzLl9jb25maWcgID0gbnVsbFxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLi4uRGVmYXVsdCxcbiAgICAgIC4uLiQodGhpcy5fZWxlbWVudCkuZGF0YSgpLFxuICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICB9XG5cbiAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhcbiAgICAgIE5BTUUsXG4gICAgICBjb25maWcsXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlXG4gICAgKVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKFxuICAgICAgRXZlbnQuQ0xJQ0tfRElTTUlTUyxcbiAgICAgIFNlbGVjdG9yLkRBVEFfRElTTUlTUyxcbiAgICAgICgpID0+IHRoaXMuaGlkZSgpXG4gICAgKVxuICB9XG5cbiAgX2Nsb3NlKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZS5ISURFKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTilcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3NOYW1lLlNIT1cpXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkZWxlbWVudCA9ICQodGhpcylcbiAgICAgIGxldCBkYXRhICAgICAgID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IFRvYXN0KHRoaXMsIF9jb25maWcpXG4gICAgICAgICRlbGVtZW50LmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gICAgICAgICAgICAgPSBUb2FzdC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9hc3RcbiQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFRvYXN0Ll9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9hc3RcbiJdLCJuYW1lcyI6WyJOQU1FIiwiVkVSU0lPTiIsIkRBVEFfS0VZIiwiRVZFTlRfS0VZIiwiSlFVRVJZX05PX0NPTkZMSUNUIiwiJCIsImZuIiwiRXZlbnQiLCJDTElDS19ESVNNSVNTIiwiSElERSIsIkhJRERFTiIsIlNIT1ciLCJTSE9XTiIsIkNsYXNzTmFtZSIsIkZBREUiLCJTSE9XSU5HIiwiRGVmYXVsdFR5cGUiLCJhbmltYXRpb24iLCJhdXRvaGlkZSIsImRlbGF5IiwiRGVmYXVsdCIsIlNlbGVjdG9yIiwiREFUQV9ESVNNSVNTIiwiVG9hc3QiLCJlbGVtZW50IiwiY29uZmlnIiwiX2VsZW1lbnQiLCJfY29uZmlnIiwiX2dldENvbmZpZyIsIl90aW1lb3V0IiwiX3NldExpc3RlbmVycyIsInNob3ciLCJzaG93RXZlbnQiLCJ0cmlnZ2VyIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29tcGxldGUiLCJyZW1vdmUiLCJzZXRUaW1lb3V0IiwiaGlkZSIsIlV0aWwiLCJyZWZsb3ciLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCIsIm9uZSIsIlRSQU5TSVRJT05fRU5EIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJjb250YWlucyIsImhpZGVFdmVudCIsIl9jbG9zZSIsImRpc3Bvc2UiLCJjbGVhclRpbWVvdXQiLCJvZmYiLCJyZW1vdmVEYXRhIiwiZGF0YSIsInR5cGVDaGVja0NvbmZpZyIsImNvbnN0cnVjdG9yIiwib24iLCJfalF1ZXJ5SW50ZXJmYWNlIiwiZWFjaCIsIiRlbGVtZW50IiwiVHlwZUVycm9yIiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
