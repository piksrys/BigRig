/*!
  * Bootstrap collapse.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global = global || self, global.Collapse = factory(global.jQuery, global.Util));
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

  var NAME = 'collapse';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    toggle: true,
    parent: ''
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        var _config = _objectSpread2({}, Default, {}, $this.data(), {}, typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsYXBzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IGNvbGxhcHNlLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAnY29sbGFwc2UnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuNC4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5jb2xsYXBzZSdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICB0b2dnbGUgOiB0cnVlLFxuICBwYXJlbnQgOiAnJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgdG9nZ2xlIDogJ2Jvb2xlYW4nLFxuICBwYXJlbnQgOiAnKHN0cmluZ3xlbGVtZW50KSdcbn1cblxuY29uc3QgRXZlbnQgPSB7XG4gIFNIT1cgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICBTSE9XTiAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gIEhJREUgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICBISURERU4gICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBTSE9XICAgICAgIDogJ3Nob3cnLFxuICBDT0xMQVBTRSAgIDogJ2NvbGxhcHNlJyxcbiAgQ09MTEFQU0lORyA6ICdjb2xsYXBzaW5nJyxcbiAgQ09MTEFQU0VEICA6ICdjb2xsYXBzZWQnXG59XG5cbmNvbnN0IERpbWVuc2lvbiA9IHtcbiAgV0lEVEggIDogJ3dpZHRoJyxcbiAgSEVJR0hUIDogJ2hlaWdodCdcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIEFDVElWRVMgICAgIDogJy5zaG93LCAuY29sbGFwc2luZycsXG4gIERBVEFfVE9HR0xFIDogJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJ1xufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgQ29sbGFwc2Uge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZVxuICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICA9IGVsZW1lbnRcbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgIHRoaXMuX3RyaWdnZXJBcnJheSAgICA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGBbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtocmVmPVwiIyR7ZWxlbWVudC5pZH1cIl0sYCArXG4gICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJHtlbGVtZW50LmlkfVwiXWBcbiAgICApKVxuXG4gICAgY29uc3QgdG9nZ2xlTGlzdCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5EQVRBX1RPR0dMRSkpXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvZ2dsZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSB0b2dnbGVMaXN0W2ldXG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtKVxuICAgICAgY29uc3QgZmlsdGVyRWxlbWVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gICAgICAgIC5maWx0ZXIoKGZvdW5kRWxlbSkgPT4gZm91bmRFbGVtID09PSBlbGVtZW50KVxuXG4gICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwgJiYgZmlsdGVyRWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50ID8gdGhpcy5fZ2V0UGFyZW50KCkgOiBudWxsXG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLl9lbGVtZW50LCB0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgIHRoaXMudG9nZ2xlKClcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIC8vIFB1YmxpY1xuXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpXG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGFjdGl2ZXNcbiAgICBsZXQgYWN0aXZlc0RhdGFcblxuICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgIGFjdGl2ZXMgPSBbXS5zbGljZS5jYWxsKHRoaXMuX3BhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRVMpKVxuICAgICAgICAuZmlsdGVyKChlbGVtKSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcucGFyZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpID09PSB0aGlzLl9jb25maWcucGFyZW50XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgfSlcblxuICAgICAgaWYgKGFjdGl2ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGFjdGl2ZXMgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgIGFjdGl2ZXNEYXRhID0gJChhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLmRhdGEoREFUQV9LRVkpXG4gICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XKVxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlcykge1xuICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoYWN0aXZlcykubm90KHRoaXMuX3NlbGVjdG9yKSwgJ2hpZGUnKVxuICAgICAgaWYgKCFhY3RpdmVzRGF0YSkge1xuICAgICAgICAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpXG4gICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwXG5cbiAgICBpZiAodGhpcy5fdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgJCh0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG5cbiAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSlcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKVxuICAgIH1cblxuICAgIGNvbnN0IGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSlcbiAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YFxuICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXX1weGBcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fFxuICAgICAgISQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKVxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKVxuXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dfXB4YFxuXG4gICAgVXRpbC5yZWZsb3codGhpcy5fZWxlbWVudClcblxuICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORylcbiAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpXG4gICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICBjb25zdCB0cmlnZ2VyQXJyYXlMZW5ndGggPSB0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoXG4gICAgaWYgKHRyaWdnZXJBcnJheUxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpZ2dlckFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJBcnJheVtpXVxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0cmlnZ2VyKVxuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0ICRlbGVtID0gJChbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSlcbiAgICAgICAgICBpZiAoISRlbGVtLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgICAgJCh0cmlnZ2VyKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKVxuICAgICAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKVxuXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORylcbiAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgLnRyaWdnZXIoRXZlbnQuSElEREVOKVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG4gICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gIH1cblxuICBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGlzVHJhbnNpdGlvbmluZ1xuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG5cbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fcGFyZW50ICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl90cmlnZ2VyQXJyYXkgICAgPSBudWxsXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbFxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLi4uRGVmYXVsdCxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH1cbiAgICBjb25maWcudG9nZ2xlID0gQm9vbGVhbihjb25maWcudG9nZ2xlKSAvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlc1xuICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2dldERpbWVuc2lvbigpIHtcbiAgICBjb25zdCBoYXNXaWR0aCA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoRGltZW5zaW9uLldJRFRIKVxuICAgIHJldHVybiBoYXNXaWR0aCA/IERpbWVuc2lvbi5XSURUSCA6IERpbWVuc2lvbi5IRUlHSFRcbiAgfVxuXG4gIF9nZXRQYXJlbnQoKSB7XG4gICAgbGV0IHBhcmVudFxuXG4gICAgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5wYXJlbnQpKSB7XG4gICAgICBwYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50XG5cbiAgICAgIC8vIEl0J3MgYSBqUXVlcnkgb2JqZWN0XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5wYXJlbnQuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJlbnQgPSB0aGlzLl9jb25maWcucGFyZW50WzBdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fY29uZmlnLnBhcmVudClcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvciA9XG4gICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS1wYXJlbnQ9XCIke3RoaXMuX2NvbmZpZy5wYXJlbnR9XCJdYFxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICAkKGNoaWxkcmVuKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoXG4gICAgICAgIENvbGxhcHNlLl9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgW2VsZW1lbnRdXG4gICAgICApXG4gICAgfSlcblxuICAgIHJldHVybiBwYXJlbnRcbiAgfVxuXG4gIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZWxlbWVudCwgdHJpZ2dlckFycmF5KSB7XG4gICAgY29uc3QgaXNPcGVuID0gJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAkKHRyaWdnZXJBcnJheSlcbiAgICAgICAgLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQsICFpc09wZW4pXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfZ2V0VGFyZ2V0RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG4gICAgcmV0dXJuIHNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBudWxsXG4gIH1cblxuICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICBsZXQgZGF0YSAgICAgID0gJHRoaXMuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLiR0aGlzLmRhdGEoKSxcbiAgICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhICYmIF9jb25maWcudG9nZ2xlICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICBfY29uZmlnLnRvZ2dsZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IENvbGxhcHNlKHRoaXMsIF9jb25maWcpXG4gICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gcHJldmVudERlZmF1bHQgb25seSBmb3IgPGE+IGVsZW1lbnRzICh3aGljaCBjaGFuZ2UgdGhlIFVSTCkgbm90IGluc2lkZSB0aGUgY29sbGFwc2libGUgZWxlbWVudFxuICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBjb25zdCAkdHJpZ2dlciA9ICQodGhpcylcbiAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcbiAgY29uc3Qgc2VsZWN0b3JzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblxuICAkKHNlbGVjdG9ycykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQodGhpcylcbiAgICBjb25zdCBkYXRhICAgID0gJHRhcmdldC5kYXRhKERBVEFfS0VZKVxuICAgIGNvbnN0IGNvbmZpZyAgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdHJpZ2dlci5kYXRhKClcbiAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJHRhcmdldCwgY29uZmlnKVxuICB9KVxufSlcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIGpRdWVyeVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJC5mbltOQU1FXSA9IENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2VcbiQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDb2xsYXBzZVxuJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gKCkgPT4ge1xuICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gIHJldHVybiBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlXG4iXSwibmFtZXMiOlsiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkRBVEFfQVBJX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIiQiLCJmbiIsIkRlZmF1bHQiLCJ0b2dnbGUiLCJwYXJlbnQiLCJEZWZhdWx0VHlwZSIsIkV2ZW50IiwiU0hPVyIsIlNIT1dOIiwiSElERSIsIkhJRERFTiIsIkNMSUNLX0RBVEFfQVBJIiwiQ2xhc3NOYW1lIiwiQ09MTEFQU0UiLCJDT0xMQVBTSU5HIiwiQ09MTEFQU0VEIiwiRGltZW5zaW9uIiwiV0lEVEgiLCJIRUlHSFQiLCJTZWxlY3RvciIsIkFDVElWRVMiLCJEQVRBX1RPR0dMRSIsIkNvbGxhcHNlIiwiZWxlbWVudCIsImNvbmZpZyIsIl9pc1RyYW5zaXRpb25pbmciLCJfZWxlbWVudCIsIl9jb25maWciLCJfZ2V0Q29uZmlnIiwiX3RyaWdnZXJBcnJheSIsInNsaWNlIiwiY2FsbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwidG9nZ2xlTGlzdCIsImkiLCJsZW4iLCJsZW5ndGgiLCJlbGVtIiwic2VsZWN0b3IiLCJVdGlsIiwiZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCIsImZpbHRlckVsZW1lbnQiLCJmaWx0ZXIiLCJmb3VuZEVsZW0iLCJfc2VsZWN0b3IiLCJwdXNoIiwiX3BhcmVudCIsIl9nZXRQYXJlbnQiLCJfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzIiwiaGFzQ2xhc3MiLCJoaWRlIiwic2hvdyIsImFjdGl2ZXMiLCJhY3RpdmVzRGF0YSIsImdldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibm90IiwiZGF0YSIsInN0YXJ0RXZlbnQiLCJ0cmlnZ2VyIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiX2pRdWVyeUludGVyZmFjZSIsImRpbWVuc2lvbiIsIl9nZXREaW1lbnNpb24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwic3R5bGUiLCJhdHRyIiwic2V0VHJhbnNpdGlvbmluZyIsImNvbXBsZXRlIiwiY2FwaXRhbGl6ZWREaW1lbnNpb24iLCJ0b1VwcGVyQ2FzZSIsInNjcm9sbFNpemUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCIsIm9uZSIsIlRSQU5TSVRJT05fRU5EIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWZsb3ciLCJ0cmlnZ2VyQXJyYXlMZW5ndGgiLCIkZWxlbSIsImlzVHJhbnNpdGlvbmluZyIsImRpc3Bvc2UiLCJyZW1vdmVEYXRhIiwiQm9vbGVhbiIsInR5cGVDaGVja0NvbmZpZyIsImhhc1dpZHRoIiwiaXNFbGVtZW50IiwianF1ZXJ5IiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiZWFjaCIsIl9nZXRUYXJnZXRGcm9tRWxlbWVudCIsInRyaWdnZXJBcnJheSIsImlzT3BlbiIsInRvZ2dsZUNsYXNzIiwiJHRoaXMiLCJ0ZXN0IiwiVHlwZUVycm9yIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ0YWdOYW1lIiwicHJldmVudERlZmF1bHQiLCIkdHJpZ2dlciIsInNlbGVjdG9ycyIsIiR0YXJnZXQiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFVQTs7Ozs7O0VBTUEsSUFBTUEsSUFBSSxHQUFrQixVQUE1QjtFQUNBLElBQU1DLE9BQU8sR0FBZSxPQUE1QjtFQUNBLElBQU1DLFFBQVEsR0FBYyxhQUE1QjtFQUNBLElBQU1DLFNBQVMsU0FBaUJELFFBQWhDO0VBQ0EsSUFBTUUsWUFBWSxHQUFV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
