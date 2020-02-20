/*!
  * Bootstrap carousel.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global = global || self, global.Carousel = factory(global.jQuery, global.Util));
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

  var NAME = 'carousel';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event = {
    SLIDE: "slide" + EVENT_KEY,
    SLID: "slid" + EVENT_KEY,
    KEYDOWN: "keydown" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY,
    TOUCHSTART: "touchstart" + EVENT_KEY,
    TOUCHMOVE: "touchmove" + EVENT_KEY,
    TOUCHEND: "touchend" + EVENT_KEY,
    POINTERDOWN: "pointerdown" + EVENT_KEY,
    POINTERUP: "pointerup" + EVENT_KEY,
    DRAG_START: "dragstart" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector.ITEM_IMG)).on(Event.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName.POINTER_EVENT);
      } else {
        $(this._element).on(Event.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
        $(indicators).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
          $(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread2({}, Default, {}, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread2({}, _config, {}, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = _objectSpread2({}, $(target).data(), {}, $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
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

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYXJvdXNlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IGNhcm91c2VsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgPSAnY2Fyb3VzZWwnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgICAgID0gJzQuNC4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICAgICA9ICdicy5jYXJvdXNlbCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZICAgICAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgICAgID0gJC5mbltOQU1FXVxuY29uc3QgQVJST1dfTEVGVF9LRVlDT0RFICAgICA9IDM3IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGxlZnQgYXJyb3cga2V5XG5jb25zdCBBUlJPV19SSUdIVF9LRVlDT0RFICAgID0gMzkgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgcmlnaHQgYXJyb3cga2V5XG5jb25zdCBUT1VDSEVWRU5UX0NPTVBBVF9XQUlUID0gNTAwIC8vIFRpbWUgZm9yIG1vdXNlIGNvbXBhdCBldmVudHMgdG8gZmlyZSBhZnRlciB0b3VjaFxuY29uc3QgU1dJUEVfVEhSRVNIT0xEICAgICAgICA9IDQwXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGludGVydmFsIDogNTAwMCxcbiAga2V5Ym9hcmQgOiB0cnVlLFxuICBzbGlkZSAgICA6IGZhbHNlLFxuICBwYXVzZSAgICA6ICdob3ZlcicsXG4gIHdyYXAgICAgIDogdHJ1ZSxcbiAgdG91Y2ggICAgOiB0cnVlXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBpbnRlcnZhbCA6ICcobnVtYmVyfGJvb2xlYW4pJyxcbiAga2V5Ym9hcmQgOiAnYm9vbGVhbicsXG4gIHNsaWRlICAgIDogJyhib29sZWFufHN0cmluZyknLFxuICBwYXVzZSAgICA6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgd3JhcCAgICAgOiAnYm9vbGVhbicsXG4gIHRvdWNoICAgIDogJ2Jvb2xlYW4nXG59XG5cbmNvbnN0IERpcmVjdGlvbiA9IHtcbiAgTkVYVCAgICAgOiAnbmV4dCcsXG4gIFBSRVYgICAgIDogJ3ByZXYnLFxuICBMRUZUICAgICA6ICdsZWZ0JyxcbiAgUklHSFQgICAgOiAncmlnaHQnXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBTTElERSAgICAgICAgICA6IGBzbGlkZSR7RVZFTlRfS0VZfWAsXG4gIFNMSUQgICAgICAgICAgIDogYHNsaWQke0VWRU5UX0tFWX1gLFxuICBLRVlET1dOICAgICAgICA6IGBrZXlkb3duJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VFTlRFUiAgICAgOiBgbW91c2VlbnRlciR7RVZFTlRfS0VZfWAsXG4gIE1PVVNFTEVBVkUgICAgIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gLFxuICBUT1VDSFNUQVJUICAgICA6IGB0b3VjaHN0YXJ0JHtFVkVOVF9LRVl9YCxcbiAgVE9VQ0hNT1ZFICAgICAgOiBgdG91Y2htb3ZlJHtFVkVOVF9LRVl9YCxcbiAgVE9VQ0hFTkQgICAgICAgOiBgdG91Y2hlbmQke0VWRU5UX0tFWX1gLFxuICBQT0lOVEVSRE9XTiAgICA6IGBwb2ludGVyZG93biR7RVZFTlRfS0VZfWAsXG4gIFBPSU5URVJVUCAgICAgIDogYHBvaW50ZXJ1cCR7RVZFTlRfS0VZfWAsXG4gIERSQUdfU1RBUlQgICAgIDogYGRyYWdzdGFydCR7RVZFTlRfS0VZfWAsXG4gIExPQURfREFUQV9BUEkgIDogYGxvYWQke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gLFxuICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBDQVJPVVNFTCAgICAgIDogJ2Nhcm91c2VsJyxcbiAgQUNUSVZFICAgICAgICA6ICdhY3RpdmUnLFxuICBTTElERSAgICAgICAgIDogJ3NsaWRlJyxcbiAgUklHSFQgICAgICAgICA6ICdjYXJvdXNlbC1pdGVtLXJpZ2h0JyxcbiAgTEVGVCAgICAgICAgICA6ICdjYXJvdXNlbC1pdGVtLWxlZnQnLFxuICBORVhUICAgICAgICAgIDogJ2Nhcm91c2VsLWl0ZW0tbmV4dCcsXG4gIFBSRVYgICAgICAgICAgOiAnY2Fyb3VzZWwtaXRlbS1wcmV2JyxcbiAgSVRFTSAgICAgICAgICA6ICdjYXJvdXNlbC1pdGVtJyxcbiAgUE9JTlRFUl9FVkVOVCA6ICdwb2ludGVyLWV2ZW50J1xufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgQUNUSVZFICAgICAgOiAnLmFjdGl2ZScsXG4gIEFDVElWRV9JVEVNIDogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gIElURU0gICAgICAgIDogJy5jYXJvdXNlbC1pdGVtJyxcbiAgSVRFTV9JTUcgICAgOiAnLmNhcm91c2VsLWl0ZW0gaW1nJyxcbiAgTkVYVF9QUkVWICAgOiAnLmNhcm91c2VsLWl0ZW0tbmV4dCwgLmNhcm91c2VsLWl0ZW0tcHJldicsXG4gIElORElDQVRPUlMgIDogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgREFUQV9TTElERSAgOiAnW2RhdGEtc2xpZGVdLCBbZGF0YS1zbGlkZS10b10nLFxuICBEQVRBX1JJREUgICA6ICdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nXG59XG5cbmNvbnN0IFBvaW50ZXJUeXBlID0ge1xuICBUT1VDSCA6ICd0b3VjaCcsXG4gIFBFTiAgIDogJ3Blbidcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzIERlZmluaXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5jbGFzcyBDYXJvdXNlbCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHRoaXMuX2l0ZW1zICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faW50ZXJ2YWwgICAgICA9IG51bGxcbiAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuX2lzUGF1c2VkICAgICAgPSBmYWxzZVxuICAgIHRoaXMuX2lzU2xpZGluZyAgICAgPSBmYWxzZVxuICAgIHRoaXMudG91Y2hUaW1lb3V0ICAgPSBudWxsXG4gICAgdGhpcy50b3VjaFN0YXJ0WCAgICA9IDBcbiAgICB0aGlzLnRvdWNoRGVsdGFYICAgID0gMFxuXG4gICAgdGhpcy5fY29uZmlnICAgICAgICAgICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgID0gZWxlbWVudFxuICAgIHRoaXMuX2luZGljYXRvcnNFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLklORElDQVRPUlMpXG4gICAgdGhpcy5fdG91Y2hTdXBwb3J0ZWQgICAgPSAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMFxuICAgIHRoaXMuX3BvaW50ZXJFdmVudCAgICAgID0gQm9vbGVhbih3aW5kb3cuUG9pbnRlckV2ZW50IHx8IHdpbmRvdy5NU1BvaW50ZXJFdmVudClcblxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgbmV4dCgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLk5FWFQpXG4gICAgfVxuICB9XG5cbiAgbmV4dFdoZW5WaXNpYmxlKCkge1xuICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiZcbiAgICAgICgkKHRoaXMuX2VsZW1lbnQpLmlzKCc6dmlzaWJsZScpICYmICQodGhpcy5fZWxlbWVudCkuY3NzKCd2aXNpYmlsaXR5JykgIT09ICdoaWRkZW4nKSkge1xuICAgICAgdGhpcy5uZXh0KClcbiAgICB9XG4gIH1cblxuICBwcmV2KCkge1xuICAgIGlmICghdGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uUFJFVilcbiAgICB9XG4gIH1cblxuICBwYXVzZShldmVudCkge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTkVYVF9QUkVWKSkge1xuICAgICAgVXRpbC50cmlnZ2VyVHJhbnNpdGlvbkVuZCh0aGlzLl9lbGVtZW50KVxuICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgIH1cblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpXG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsXG4gIH1cblxuICBjeWNsZShldmVudCkge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpXG4gICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmludGVydmFsICYmICF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMubmV4dFdoZW5WaXNpYmxlIDogdGhpcy5uZXh0KS5iaW5kKHRoaXMpLFxuICAgICAgICB0aGlzLl9jb25maWcuaW50ZXJ2YWxcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB0byhpbmRleCkge1xuICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pXG5cbiAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9hY3RpdmVFbGVtZW50KVxuXG4gICAgaWYgKGluZGV4ID4gdGhpcy5faXRlbXMubGVuZ3RoIC0gMSB8fCBpbmRleCA8IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50LlNMSUQsICgpID0+IHRoaXMudG8oaW5kZXgpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLmN5Y2xlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGluZGV4ID4gYWN0aXZlSW5kZXhcbiAgICAgID8gRGlyZWN0aW9uLk5FWFRcbiAgICAgIDogRGlyZWN0aW9uLlBSRVZcblxuICAgIHRoaXMuX3NsaWRlKGRpcmVjdGlvbiwgdGhpcy5faXRlbXNbaW5kZXhdKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG4gICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuXG4gICAgdGhpcy5faXRlbXMgICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fY29uZmlnICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faW50ZXJ2YWwgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faXNQYXVzZWQgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faXNTbGlkaW5nICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fYWN0aXZlRWxlbWVudCAgICAgPSBudWxsXG4gICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSBudWxsXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5EZWZhdWx0LFxuICAgICAgLi4uY29uZmlnXG4gICAgfVxuICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2hhbmRsZVN3aXBlKCkge1xuICAgIGNvbnN0IGFic0RlbHRheCA9IE1hdGguYWJzKHRoaXMudG91Y2hEZWx0YVgpXG5cbiAgICBpZiAoYWJzRGVsdGF4IDw9IFNXSVBFX1RIUkVTSE9MRCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gYWJzRGVsdGF4IC8gdGhpcy50b3VjaERlbHRhWFxuXG4gICAgdGhpcy50b3VjaERlbHRhWCA9IDBcblxuICAgIC8vIHN3aXBlIGxlZnRcbiAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgdGhpcy5wcmV2KClcbiAgICB9XG5cbiAgICAvLyBzd2lwZSByaWdodFxuICAgIGlmIChkaXJlY3Rpb24gPCAwKSB7XG4gICAgICB0aGlzLm5leHQoKVxuICAgIH1cbiAgfVxuXG4gIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5vbihFdmVudC5LRVlET1dOLCAoZXZlbnQpID0+IHRoaXMuX2tleWRvd24oZXZlbnQpKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcucGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uKEV2ZW50Lk1PVVNFRU5URVIsIChldmVudCkgPT4gdGhpcy5wYXVzZShldmVudCkpXG4gICAgICAgIC5vbihFdmVudC5NT1VTRUxFQVZFLCAoZXZlbnQpID0+IHRoaXMuY3ljbGUoZXZlbnQpKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcudG91Y2gpIHtcbiAgICAgIHRoaXMuX2FkZFRvdWNoRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIF9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGlmICghdGhpcy5fdG91Y2hTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5fcG9pbnRlckV2ZW50ICYmIFBvaW50ZXJUeXBlW2V2ZW50Lm9yaWdpbmFsRXZlbnQucG9pbnRlclR5cGUudG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0WCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY2xpZW50WFxuICAgICAgfSBlbHNlIGlmICghdGhpcy5fcG9pbnRlckV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydFggPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgIC8vIGVuc3VyZSBzd2lwaW5nIHdpdGggb25lIHRvdWNoIGFuZCBub3QgcGluY2hpbmdcbiAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgJiYgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b3VjaERlbHRhWCA9IDBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudG91Y2hEZWx0YVggPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCAtIHRoaXMudG91Y2hTdGFydFhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLl9wb2ludGVyRXZlbnQgJiYgUG9pbnRlclR5cGVbZXZlbnQub3JpZ2luYWxFdmVudC5wb2ludGVyVHlwZS50b1VwcGVyQ2FzZSgpXSkge1xuICAgICAgICB0aGlzLnRvdWNoRGVsdGFYID0gZXZlbnQub3JpZ2luYWxFdmVudC5jbGllbnRYIC0gdGhpcy50b3VjaFN0YXJ0WFxuICAgICAgfVxuXG4gICAgICB0aGlzLl9oYW5kbGVTd2lwZSgpXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInKSB7XG4gICAgICAgIC8vIElmIGl0J3MgYSB0b3VjaC1lbmFibGVkIGRldmljZSwgbW91c2VlbnRlci9sZWF2ZSBhcmUgZmlyZWQgYXNcbiAgICAgICAgLy8gcGFydCBvZiB0aGUgbW91c2UgY29tcGF0aWJpbGl0eSBldmVudHMgb24gZmlyc3QgdGFwIC0gdGhlIGNhcm91c2VsXG4gICAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAgIC8vIGhlcmUsIHdlIGxpc3RlbiBmb3IgdG91Y2hlbmQsIGV4cGxpY2l0bHkgcGF1c2UgdGhlIGNhcm91c2VsXG4gICAgICAgIC8vIChhcyBpZiBpdCdzIHRoZSBzZWNvbmQgdGltZSB3ZSB0YXAgb24gaXQsIG1vdXNlZW50ZXIgY29tcGF0IGV2ZW50XG4gICAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgICAgLy8gZXZlbnRzIHRvIGZpcmUpIHdlIGV4cGxpY2l0bHkgcmVzdGFydCBjeWNsaW5nXG5cbiAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICAgIGlmICh0aGlzLnRvdWNoVGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoVGltZW91dClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvdWNoVGltZW91dCA9IHNldFRpbWVvdXQoKGV2ZW50KSA9PiB0aGlzLmN5Y2xlKGV2ZW50KSwgVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCArIHRoaXMuX2NvbmZpZy5pbnRlcnZhbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkKHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5JVEVNX0lNRykpLm9uKEV2ZW50LkRSQUdfU1RBUlQsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpXG4gICAgaWYgKHRoaXMuX3BvaW50ZXJFdmVudCkge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5QT0lOVEVSRE9XTiwgKGV2ZW50KSA9PiBzdGFydChldmVudCkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlBPSU5URVJVUCwgKGV2ZW50KSA9PiBlbmQoZXZlbnQpKVxuXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ2xhc3NOYW1lLlBPSU5URVJfRVZFTlQpXG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuVE9VQ0hTVEFSVCwgKGV2ZW50KSA9PiBzdGFydChldmVudCkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlRPVUNITU9WRSwgKGV2ZW50KSA9PiBtb3ZlKGV2ZW50KSlcbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuVE9VQ0hFTkQsIChldmVudCkgPT4gZW5kKGV2ZW50KSlcbiAgICB9XG4gIH1cblxuICBfa2V5ZG93bihldmVudCkge1xuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBBUlJPV19MRUZUX0tFWUNPREU6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5wcmV2KClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgQVJST1dfUklHSFRfS0VZQ09ERTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLm5leHQoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICB0aGlzLl9pdGVtcyA9IGVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICA/IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuSVRFTSkpXG4gICAgICA6IFtdXG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmluZGV4T2YoZWxlbWVudClcbiAgfVxuXG4gIF9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgY29uc3QgaXNOZXh0RGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVFxuICAgIGNvbnN0IGlzUHJldkRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVZcbiAgICBjb25zdCBhY3RpdmVJbmRleCAgICAgPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICBjb25zdCBsYXN0SXRlbUluZGV4ICAgPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxXG4gICAgY29uc3QgaXNHb2luZ1RvV3JhcCAgID0gaXNQcmV2RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNOZXh0RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSBsYXN0SXRlbUluZGV4XG5cbiAgICBpZiAoaXNHb2luZ1RvV3JhcCAmJiAhdGhpcy5fY29uZmlnLndyYXApIHtcbiAgICAgIHJldHVybiBhY3RpdmVFbGVtZW50XG4gICAgfVxuXG4gICAgY29uc3QgZGVsdGEgICAgID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFViA/IC0xIDogMVxuICAgIGNvbnN0IGl0ZW1JbmRleCA9IChhY3RpdmVJbmRleCArIGRlbHRhKSAlIHRoaXMuX2l0ZW1zLmxlbmd0aFxuXG4gICAgcmV0dXJuIGl0ZW1JbmRleCA9PT0gLTFcbiAgICAgID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV0gOiB0aGlzLl9pdGVtc1tpdGVtSW5kZXhdXG4gIH1cblxuICBfdHJpZ2dlclNsaWRlRXZlbnQocmVsYXRlZFRhcmdldCwgZXZlbnREaXJlY3Rpb25OYW1lKSB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgocmVsYXRlZFRhcmdldClcbiAgICBjb25zdCBmcm9tSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgodGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLkFDVElWRV9JVEVNKSlcbiAgICBjb25zdCBzbGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5TTElERSwge1xuICAgICAgcmVsYXRlZFRhcmdldCxcbiAgICAgIGRpcmVjdGlvbjogZXZlbnREaXJlY3Rpb25OYW1lLFxuICAgICAgZnJvbTogZnJvbUluZGV4LFxuICAgICAgdG86IHRhcmdldEluZGV4XG4gICAgfSlcblxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkZUV2ZW50KVxuXG4gICAgcmV0dXJuIHNsaWRlRXZlbnRcbiAgfVxuXG4gIF9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBbXS5zbGljZS5jYWxsKHRoaXMuX2luZGljYXRvcnNFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFKSlcbiAgICAgICQoaW5kaWNhdG9ycylcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgIGNvbnN0IG5leHRJbmRpY2F0b3IgPSB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5jaGlsZHJlbltcbiAgICAgICAgdGhpcy5fZ2V0SXRlbUluZGV4KGVsZW1lbnQpXG4gICAgICBdXG5cbiAgICAgIGlmIChuZXh0SW5kaWNhdG9yKSB7XG4gICAgICAgICQobmV4dEluZGljYXRvcikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfc2xpZGUoZGlyZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSlcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudClcbiAgICBjb25zdCBuZXh0RWxlbWVudCAgID0gZWxlbWVudCB8fCBhY3RpdmVFbGVtZW50ICYmXG4gICAgICB0aGlzLl9nZXRJdGVtQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBhY3RpdmVFbGVtZW50KVxuICAgIGNvbnN0IG5leHRFbGVtZW50SW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgobmV4dEVsZW1lbnQpXG4gICAgY29uc3QgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbClcblxuICAgIGxldCBkaXJlY3Rpb25hbENsYXNzTmFtZVxuICAgIGxldCBvcmRlckNsYXNzTmFtZVxuICAgIGxldCBldmVudERpcmVjdGlvbk5hbWVcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5MRUZUXG4gICAgICBvcmRlckNsYXNzTmFtZSA9IENsYXNzTmFtZS5ORVhUXG4gICAgICBldmVudERpcmVjdGlvbk5hbWUgPSBEaXJlY3Rpb24uTEVGVFxuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5SSUdIVFxuICAgICAgb3JkZXJDbGFzc05hbWUgPSBDbGFzc05hbWUuUFJFVlxuICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLlJJR0hUXG4gICAgfVxuXG4gICAgaWYgKG5leHRFbGVtZW50ICYmICQobmV4dEVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpKSB7XG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2xpZGVFdmVudCA9IHRoaXMuX3RyaWdnZXJTbGlkZUV2ZW50KG5leHRFbGVtZW50LCBldmVudERpcmVjdGlvbk5hbWUpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghYWN0aXZlRWxlbWVudCB8fCAhbmV4dEVsZW1lbnQpIHtcbiAgICAgIC8vIFNvbWUgd2VpcmRuZXNzIGlzIGhhcHBlbmluZywgc28gd2UgYmFpbFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5faXNTbGlkaW5nID0gdHJ1ZVxuXG4gICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudClcblxuICAgIGNvbnN0IHNsaWRFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0xJRCwge1xuICAgICAgcmVsYXRlZFRhcmdldDogbmV4dEVsZW1lbnQsXG4gICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgIGZyb206IGFjdGl2ZUVsZW1lbnRJbmRleCxcbiAgICAgIHRvOiBuZXh0RWxlbWVudEluZGV4XG4gICAgfSlcblxuICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TTElERSkpIHtcbiAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKG9yZGVyQ2xhc3NOYW1lKVxuXG4gICAgICBVdGlsLnJlZmxvdyhuZXh0RWxlbWVudClcblxuICAgICAgJChhY3RpdmVFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSlcbiAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuXG4gICAgICBjb25zdCBuZXh0RWxlbWVudEludGVydmFsID0gcGFyc2VJbnQobmV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWludGVydmFsJyksIDEwKVxuICAgICAgaWYgKG5leHRFbGVtZW50SW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRJbnRlcnZhbCA9IHRoaXMuX2NvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgfHwgdGhpcy5fY29uZmlnLmludGVydmFsXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbnRlcnZhbCA9IG5leHRFbGVtZW50SW50ZXJ2YWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbnRlcnZhbCA9IHRoaXMuX2NvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgfHwgdGhpcy5fY29uZmlnLmludGVydmFsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQoYWN0aXZlRWxlbWVudClcblxuICAgICAgJChhY3RpdmVFbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsICgpID0+IHtcbiAgICAgICAgICAkKG5leHRFbGVtZW50KVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGAke2RpcmVjdGlvbmFsQ2xhc3NOYW1lfSAke29yZGVyQ2xhc3NOYW1lfWApXG4gICAgICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcblxuICAgICAgICAgICQoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLkFDVElWRX0gJHtvcmRlckNsYXNzTmFtZX0gJHtkaXJlY3Rpb25hbENsYXNzTmFtZX1gKVxuXG4gICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudCksIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgICQoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgIH1cblxuICAgIGlmIChpc0N5Y2xpbmcpIHtcbiAgICAgIHRoaXMuY3ljbGUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICBsZXQgX2NvbmZpZyA9IHtcbiAgICAgICAgLi4uRGVmYXVsdCxcbiAgICAgICAgLi4uJCh0aGlzKS5kYXRhKClcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIF9jb25maWcgPSB7XG4gICAgICAgICAgLi4uX2NvbmZpZyxcbiAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhY3Rpb24gPSB0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyA/IGNvbmZpZyA6IF9jb25maWcuc2xpZGVcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgZGF0YS50byhjb25maWcpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVthY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7YWN0aW9ufVwiYClcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2FjdGlvbl0oKVxuICAgICAgfSBlbHNlIGlmIChfY29uZmlnLmludGVydmFsICYmIF9jb25maWcucmlkZSkge1xuICAgICAgICBkYXRhLnBhdXNlKClcbiAgICAgICAgZGF0YS5jeWNsZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBfZGF0YUFwaUNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSAkKHNlbGVjdG9yKVswXVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgISQodGFyZ2V0KS5oYXNDbGFzcyhDbGFzc05hbWUuQ0FST1VTRUwpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAuLi4kKHRhcmdldCkuZGF0YSgpLFxuICAgICAgLi4uJCh0aGlzKS5kYXRhKClcbiAgICB9XG4gICAgY29uc3Qgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICBjb25maWcuaW50ZXJ2YWwgPSBmYWxzZVxuICAgIH1cblxuICAgIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kKGRvY3VtZW50KVxuICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfU0xJREUsIENhcm91c2VsLl9kYXRhQXBpQ2xpY2tIYW5kbGVyKVxuXG4kKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICBjb25zdCBjYXJvdXNlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9SSURFKSlcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhcm91c2Vscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0ICRjYXJvdXNlbCA9ICQoY2Fyb3VzZWxzW2ldKVxuICAgIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpXG4gIH1cbn0pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWxcbiQuZm5bTkFNRV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICByZXR1cm4gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbFxuIl0sIm5hbWVzIjpbIk5BTUUiLCJWRVJTSU9OIiwiREFUQV9LRVkiLCJFVkVOVF9LRVkiLCJEQVRBX0FQSV9LRVkiLCJKUVVFUllfTk9fQ09ORkxJQ1QiLCIkIiwiZm4iLCJBUlJPV19MRUZUX0tFWUNPREUiLCJBUlJPV19SSUdIVF9LRVlDT0RFIiwiVE9VQ0hFVkVOVF9DT01QQVRfV0FJVCIsIlNXSVBFX1RIUkVTSE9MRCIsIkRlZmF1bHQiLCJpbnRlcnZhbCIsImtleWJvYXJkIiwic2xpZGUiLCJwYXVzZSIsIndyYXAiLCJ0b3VjaCIsIkRlZmF1bHRUeXBlIiwiRGlyZWN0aW9uIiwiTkVYVCIsIlBSRVYiLCJMRUZUIiwiUklHSFQiLCJFdmVudCIsIlNMSURFIiwiU0xJRCIsIktFWURPV04iLCJNT1VTRUVOVEVSIiwiTU9VU0VMRUFWRSIsIlRPVUNIU1RBUlQiLCJUT1VDSE1PVkUiLCJUT1VDSEVORCIsIlBPSU5URVJET1dOIiwiUE9JTlRFUlVQIiwiRFJBR19TVEFSVCIsIkxPQURfREFUQV9BUEkiLCJDTElDS19EQVRBX0FQSSIsIkNsYXNzTmFtZSIsIkNBUk9VU0VMIiwiQUNUSVZFIiwiSVRFTSIsIlBPSU5URVJfRVZFTlQiLCJTZWxlY3RvciIsIkFDVElWRV9JVEVNIiwiSVRFTV9JTUciLCJORVhUX1BSRVYiLCJJTkRJQ0FUT1JTIiwiREFUQV9TTElERSIsIkRBVEFfUklERSIsIlBvaW50ZXJUeXBlIiwiVE9VQ0giLCJQRU4iLCJDYXJvdXNlbCIsImVsZW1lbnQiLCJjb25maWciLCJfaXRlbXMiLCJfaW50ZXJ2YWwiLCJfYWN0aXZlRWxlbWVudCIsIl9pc1BhdXNlZCIsIl9pc1NsaWRpbmciLCJ0b3VjaFRpbWVvdXQiLCJ0b3VjaFN0YXJ0WCIsInRvdWNoRGVsdGFYIiwiX2NvbmZpZyIsIl9nZXRDb25maWciLCJfZWxlbWVudCIsIl9pbmRpY2F0b3JzRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfdG91Y2hTdXBwb3J0ZWQiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIm5hdmlnYXRvciIsIm1heFRvdWNoUG9pbnRzIiwiX3BvaW50ZXJFdmVudCIsIkJvb2xlYW4iLCJ3aW5kb3ciLCJQb2ludGVyRXZlbnQiLCJNU1BvaW50ZXJFdmVudCIsIl9hZGRFdmVudExpc3RlbmVycyIsIm5leHQiLCJfc2xpZGUiLCJuZXh0V2hlblZpc2libGUiLCJoaWRkZW4iLCJpcyIsImNzcyIsInByZXYiLCJldmVudCIsIlV0aWwiLCJ0cmlnZ2VyVHJhbnNpdGlvbkVuZCIsImN5Y2xlIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwidmlzaWJpbGl0eVN0YXRlIiwiYmluZCIsInRvIiwiaW5kZXgiLCJhY3RpdmVJbmRleCIsIl9nZXRJdGVtSW5kZXgiLCJsZW5ndGgiLCJvbmUiLCJkaXJlY3Rpb24iLCJkaXNwb3NlIiwib2ZmIiwicmVtb3ZlRGF0YSIsInR5cGVDaGVja0NvbmZpZyIsIl9oYW5kbGVTd2lwZSIsImFic0RlbHRheCIsIk1hdGgiLCJhYnMiLCJvbiIsIl9rZXlkb3duIiwiX2FkZFRvdWNoRXZlbnRMaXN0ZW5lcnMiLCJzdGFydCIsIm9yaWdpbmFsRXZlbnQiLCJwb2ludGVyVHlwZSIsInRvVXBwZXJDYXNlIiwiY2xpZW50WCIsInRvdWNoZXMiLCJtb3ZlIiwiZW5kIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlIiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXN0IiwidGFyZ2V0IiwidGFnTmFtZSIsIndoaWNoIiwicGFyZW50Tm9kZSIsInNsaWNlIiwiY2FsbCIsImluZGV4T2YiLCJfZ2V0SXRlbUJ5RGlyZWN0aW9uIiwiYWN0aXZlRWxlbWVudCIsImlzTmV4dERpcmVjdGlvbiIsImlzUHJldkRpcmVjdGlvbiIsImxhc3RJdGVtSW5kZXgiLCJpc0dvaW5nVG9XcmFwIiwiZGVsdGEiLCJpdGVtSW5kZXgiLCJfdHJpZ2dlclNsaWRlRXZlbnQiLCJyZWxhdGVkVGFyZ2V0IiwiZXZlbnREaXJlY3Rpb25OYW1lIiwidGFyZ2V0SW5kZXgiLCJmcm9tSW5kZXgiLCJzbGlkZUV2ZW50IiwiZnJvbSIsInRyaWdnZXIiLCJfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudCIsImluZGljYXRvcnMiLCJyZW1vdmVDbGFzcyIsIm5leHRJbmRpY2F0b3IiLCJjaGlsZHJlbiIsImFkZENsYXNzIiwiYWN0aXZlRWxlbWVudEluZGV4IiwibmV4dEVsZW1lbnQiLCJuZXh0RWxlbWVudEluZGV4IiwiaXNDeWNsaW5nIiwiZGlyZWN0aW9uYWxDbGFzc05hbWUiLCJvcmRlckNsYXNzTmFtZSIsImhhc0NsYXNzIiwiaXNEZWZhdWx0UHJldmVudGVkIiwic2xpZEV2ZW50IiwicmVmbG93IiwibmV4dEVsZW1lbnRJbnRlcnZhbCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiZGVmYXVsdEludGVydmFsIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJUUkFOU0lUSU9OX0VORCIsImVtdWxhdGVUcmFuc2l0aW9uRW5kIiwiX2pRdWVyeUludGVyZmFjZSIsImVhY2giLCJkYXRhIiwiYWN0aW9uIiwiVHlwZUVycm9yIiwicmlkZSIsIl9kYXRhQXBpQ2xpY2tIYW5kbGVyIiwic2VsZWN0b3IiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50Iiwic2xpZGVJbmRleCIsImNhcm91c2VscyIsImkiLCJsZW4iLCIkY2Fyb3VzZWwiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFVQTs7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
