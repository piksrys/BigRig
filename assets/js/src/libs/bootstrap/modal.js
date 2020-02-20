/*!
  * Bootstrap modal.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global = global || self, global.Modal = factory(global.jQuery, global.Util));
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

  var NAME = 'modal';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDE_PREVENTED: "hidePrevented" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    RESIZE: "resize" + EVENT_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show',
    STATIC: 'modal-static'
  };
  var Selector = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);
      $(this._element).removeClass(ClassName.SHOW);
      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event.FOCUSIN);
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $.Event(Event.HIDE_PREVENTED);
        $(this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.defaultPrevented) {
          return;
        }

        this._element.classList.add(ClassName.STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(ClassName.STATIC);
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $(this._element).hasClass(ClassName.FADE);
      var modalBody = this._dialog ? this._dialog.querySelector(Selector.MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName.SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $(_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $(document).off(Event.FOCUSIN) // Guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $(_this8._element).trigger(Event.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread2({}, Default, {}, $(this).data(), {}, typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
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

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : _objectSpread2({}, $(target).data(), {}, $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdtb2RhbCdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjQuMSdcbmNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdicy5tb2RhbCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuY29uc3QgRVNDQVBFX0tFWUNPREUgICAgID0gMjcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBiYWNrZHJvcCA6IHRydWUsXG4gIGtleWJvYXJkIDogdHJ1ZSxcbiAgZm9jdXMgICAgOiB0cnVlLFxuICBzaG93ICAgICA6IHRydWVcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGJhY2tkcm9wIDogJyhib29sZWFufHN0cmluZyknLFxuICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgZm9jdXMgICAgOiAnYm9vbGVhbicsXG4gIHNob3cgICAgIDogJ2Jvb2xlYW4nXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBISURFICAgICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElERV9QUkVWRU5URUQgICAgOiBgaGlkZVByZXZlbnRlZCR7RVZFTlRfS0VZfWAsXG4gIEhJRERFTiAgICAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIFNIT1cgICAgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICBTSE9XTiAgICAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gIEZPQ1VTSU4gICAgICAgICAgIDogYGZvY3VzaW4ke0VWRU5UX0tFWX1gLFxuICBSRVNJWkUgICAgICAgICAgICA6IGByZXNpemUke0VWRU5UX0tFWX1gLFxuICBDTElDS19ESVNNSVNTICAgICA6IGBjbGljay5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgS0VZRE9XTl9ESVNNSVNTICAgOiBga2V5ZG93bi5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VVUF9ESVNNSVNTICAgOiBgbW91c2V1cC5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VET1dOX0RJU01JU1MgOiBgbW91c2Vkb3duLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICBDTElDS19EQVRBX0FQSSAgICA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBTQ1JPTExBQkxFICAgICAgICAgOiAnbW9kYWwtZGlhbG9nLXNjcm9sbGFibGUnLFxuICBTQ1JPTExCQVJfTUVBU1VSRVIgOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICBCQUNLRFJPUCAgICAgICAgICAgOiAnbW9kYWwtYmFja2Ryb3AnLFxuICBPUEVOICAgICAgICAgICAgICAgOiAnbW9kYWwtb3BlbicsXG4gIEZBREUgICAgICAgICAgICAgICA6ICdmYWRlJyxcbiAgU0hPVyAgICAgICAgICAgICAgIDogJ3Nob3cnLFxuICBTVEFUSUMgICAgICAgICAgICAgOiAnbW9kYWwtc3RhdGljJ1xufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgRElBTE9HICAgICAgICAgOiAnLm1vZGFsLWRpYWxvZycsXG4gIE1PREFMX0JPRFkgICAgIDogJy5tb2RhbC1ib2R5JyxcbiAgREFUQV9UT0dHTEUgICAgOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICBEQVRBX0RJU01JU1MgICA6ICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLFxuICBGSVhFRF9DT05URU5UICA6ICcuZml4ZWQtdG9wLCAuZml4ZWQtYm90dG9tLCAuaXMtZml4ZWQsIC5zdGlja3ktdG9wJyxcbiAgU1RJQ0tZX0NPTlRFTlQgOiAnLnN0aWNreS10b3AnXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgICAgPSBlbGVtZW50XG4gICAgdGhpcy5fZGlhbG9nICAgICAgICAgICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5ESUFMT0cpXG4gICAgdGhpcy5fYmFja2Ryb3AgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pc1Nob3duICAgICAgICAgICAgID0gZmFsc2VcbiAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAgID0gZmFsc2VcbiAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgICAgID0gZmFsc2VcbiAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICAvLyBQdWJsaWNcblxuICB0b2dnbGUocmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3cocmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIHNob3cocmVsYXRlZFRhcmdldCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duIHx8IHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0XG4gICAgfSlcblxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICBpZiAodGhpcy5faXNTaG93biB8fCBzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlXG5cbiAgICB0aGlzLl9jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5fc2V0U2Nyb2xsYmFyKClcblxuICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG5cbiAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpXG4gICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5vbihcbiAgICAgIEV2ZW50LkNMSUNLX0RJU01JU1MsXG4gICAgICBTZWxlY3Rvci5EQVRBX0RJU01JU1MsXG4gICAgICAoZXZlbnQpID0+IHRoaXMuaGlkZShldmVudClcbiAgICApXG5cbiAgICAkKHRoaXMuX2RpYWxvZykub24oRXZlbnQuTU9VU0VET1dOX0RJU01JU1MsICgpID0+IHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50Lk1PVVNFVVBfRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXModGhpcy5fZWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLl9zaG93QmFja2Ryb3AoKCkgPT4gdGhpcy5fc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkpXG4gIH1cblxuICBoaWRlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGhpZGVFdmVudClcblxuICAgIGlmICghdGhpcy5faXNTaG93biB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZVxuICAgIGNvbnN0IHRyYW5zaXRpb24gPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKVxuXG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRFc2NhcGVFdmVudCgpXG4gICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKVxuXG4gICAgJChkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pXG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuQ0xJQ0tfRElTTUlTUylcbiAgICAkKHRoaXMuX2RpYWxvZykub2ZmKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTKVxuXG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uICA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5faGlkZU1vZGFsKGV2ZW50KSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZU1vZGFsKClcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIFt3aW5kb3csIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2RpYWxvZ11cbiAgICAgIC5mb3JFYWNoKChodG1sRWxlbWVudCkgPT4gJChodG1sRWxlbWVudCkub2ZmKEVWRU5UX0tFWSkpXG5cbiAgICAvKipcbiAgICAgKiBgZG9jdW1lbnRgIGhhcyAyIGV2ZW50cyBgRXZlbnQuRk9DVVNJTmAgYW5kIGBFdmVudC5DTElDS19EQVRBX0FQSWBcbiAgICAgKiBEbyBub3QgbW92ZSBgZG9jdW1lbnRgIGluIGBodG1sRWxlbWVudHNgIGFycmF5XG4gICAgICogSXQgd2lsbCByZW1vdmUgYEV2ZW50LkNMSUNLX0RBVEFfQVBJYCBldmVudCB0aGF0IHNob3VsZCByZW1haW5cbiAgICAgKi9cbiAgICAkKGRvY3VtZW50KS5vZmYoRXZlbnQuRk9DVVNJTilcblxuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9kaWFsb2cgICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuX2JhY2tkcm9wICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAgID0gbnVsbFxuICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBudWxsXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nICAgICA9IG51bGxcbiAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCAgICAgID0gbnVsbFxuICB9XG5cbiAgaGFuZGxlVXBkYXRlKCkge1xuICAgIHRoaXMuX2FkanVzdERpYWxvZygpXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5EZWZhdWx0LFxuICAgICAgLi4uY29uZmlnXG4gICAgfVxuICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIGNvbnN0IGhpZGVFdmVudFByZXZlbnRlZCA9ICQuRXZlbnQoRXZlbnQuSElERV9QUkVWRU5URUQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnRQcmV2ZW50ZWQpXG4gICAgICBpZiAoaGlkZUV2ZW50UHJldmVudGVkLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDbGFzc05hbWUuU1RBVElDKVxuXG4gICAgICBjb25zdCBtb2RhbFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3NOYW1lLlNUQVRJQylcbiAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChtb2RhbFRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cbiAgfVxuXG4gIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgY29uc3QgbW9kYWxCb2R5ID0gdGhpcy5fZGlhbG9nID8gdGhpcy5fZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTU9EQUxfQk9EWSkgOiBudWxsXG5cbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAvLyBEb24ndCBtb3ZlIG1vZGFsJ3MgRE9NIHBvc2l0aW9uXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCB0cnVlKVxuXG4gICAgaWYgKCQodGhpcy5fZGlhbG9nKS5oYXNDbGFzcyhDbGFzc05hbWUuU0NST0xMQUJMRSkgJiYgbW9kYWxCb2R5KSB7XG4gICAgICBtb2RhbEJvZHkuc2Nyb2xsVG9wID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbFRvcCA9IDBcbiAgICB9XG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgVXRpbC5yZWZsb3codGhpcy5fZWxlbWVudClcbiAgICB9XG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgdGhpcy5fZW5mb3JjZUZvY3VzKClcbiAgICB9XG5cbiAgICBjb25zdCBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgcmVsYXRlZFRhcmdldFxuICAgIH0pXG5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgfVxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93bkV2ZW50KVxuICAgIH1cblxuICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9kaWFsb2cpXG5cbiAgICAgICQodGhpcy5fZGlhbG9nKVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIHRyYW5zaXRpb25Db21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNpdGlvbkNvbXBsZXRlKClcbiAgICB9XG4gIH1cblxuICBfZW5mb3JjZUZvY3VzKCkge1xuICAgICQoZG9jdW1lbnQpXG4gICAgICAub2ZmKEV2ZW50LkZPQ1VTSU4pIC8vIEd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhcyhldmVudC50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgX3NldEVzY2FwZUV2ZW50KCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICAgICAgdGhpcy5fdHJpZ2dlckJhY2tkcm9wVHJhbnNpdGlvbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuS0VZRE9XTl9ESVNNSVNTKVxuICAgIH1cbiAgfVxuXG4gIF9zZXRSZXNpemVFdmVudCgpIHtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKEV2ZW50LlJFU0laRSwgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZVVwZGF0ZShldmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKVxuICAgIH1cbiAgfVxuXG4gIF9oaWRlTW9kYWwoKSB7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSlcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICB0aGlzLl9zaG93QmFja2Ryb3AoKCkgPT4ge1xuICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgICAgIHRoaXMuX3Jlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgdGhpcy5fcmVzZXRTY3JvbGxiYXIoKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTilcbiAgICB9KVxuICB9XG5cbiAgX3JlbW92ZUJhY2tkcm9wKCkge1xuICAgIGlmICh0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgJCh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlKClcbiAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIF9zaG93QmFja2Ryb3AoY2FsbGJhY2spIHtcbiAgICBjb25zdCBhbmltYXRlID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSlcbiAgICAgID8gQ2xhc3NOYW1lLkZBREUgOiAnJ1xuXG4gICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmJhY2tkcm9wKSB7XG4gICAgICB0aGlzLl9iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc05hbWUgPSBDbGFzc05hbWUuQkFDS0RST1BcblxuICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NMaXN0LmFkZChhbmltYXRlKVxuICAgICAgfVxuXG4gICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKVxuICAgICAgfSlcblxuICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgVXRpbC5yZWZsb3codGhpcy5fYmFja2Ryb3ApXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fYmFja2Ryb3ApLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoIWFuaW1hdGUpIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2JhY2tkcm9wKVxuXG4gICAgICAkKHRoaXMuX2JhY2tkcm9wKVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93biAmJiB0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgJCh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGNvbnN0IGNhbGxiYWNrUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVCYWNrZHJvcCgpXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgY29uc3QgYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2JhY2tkcm9wKVxuXG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApXG4gICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gdGhlIGZvbGxvd2luZyBtZXRob2RzIGFyZSB1c2VkIHRvIGhhbmRsZSBvdmVyZmxvd2luZyBtb2RhbHNcbiAgLy8gdG9kbyAoZmF0KTogdGhlc2Ugc2hvdWxkIHByb2JhYmx5IGJlIHJlZmFjdG9yZWQgb3V0IG9mIG1vZGFsLmpzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBfYWRqdXN0RGlhbG9nKCkge1xuICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9XG4gICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIGlmICghdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gYCR7dGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nICYmICFpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgXG4gICAgfVxuICB9XG5cbiAgX3Jlc2V0QWRqdXN0bWVudHMoKSB7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJ1xuICB9XG5cbiAgX2NoZWNrU2Nyb2xsYmFyKCkge1xuICAgIGNvbnN0IHJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgPSByZWN0LmxlZnQgKyByZWN0LnJpZ2h0IDwgd2luZG93LmlubmVyV2lkdGhcbiAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IHRoaXMuX2dldFNjcm9sbGJhcldpZHRoKClcbiAgfVxuXG4gIF9zZXRTY3JvbGxiYXIoKSB7XG4gICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nKSB7XG4gICAgICAvLyBOb3RlOiBET01Ob2RlLnN0eWxlLnBhZGRpbmdSaWdodCByZXR1cm5zIHRoZSBhY3R1YWwgdmFsdWUgb3IgJycgaWYgbm90IHNldFxuICAgICAgLy8gICB3aGlsZSAkKERPTU5vZGUpLmNzcygncGFkZGluZy1yaWdodCcpIHJldHVybnMgdGhlIGNhbGN1bGF0ZWQgdmFsdWUgb3IgMCBpZiBub3Qgc2V0XG4gICAgICBjb25zdCBmaXhlZENvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRklYRURfQ09OVEVOVCkpXG4gICAgICBjb25zdCBzdGlja3lDb250ZW50ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlNUSUNLWV9DT05URU5UKSlcblxuICAgICAgLy8gQWRqdXN0IGZpeGVkIGNvbnRlbnQgcGFkZGluZ1xuICAgICAgJChmaXhlZENvbnRlbnQpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFBhZGRpbmcgPSBlbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodFxuICAgICAgICBjb25zdCBjYWxjdWxhdGVkUGFkZGluZyA9ICQoZWxlbWVudCkuY3NzKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgIC5kYXRhKCdwYWRkaW5nLXJpZ2h0JywgYWN0dWFsUGFkZGluZylcbiAgICAgICAgICAuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYCR7cGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGp1c3Qgc3RpY2t5IGNvbnRlbnQgbWFyZ2luXG4gICAgICAkKHN0aWNreUNvbnRlbnQpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbE1hcmdpbiA9IGVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHRcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlZE1hcmdpbiA9ICQoZWxlbWVudCkuY3NzKCdtYXJnaW4tcmlnaHQnKVxuICAgICAgICAkKGVsZW1lbnQpXG4gICAgICAgICAgLmRhdGEoJ21hcmdpbi1yaWdodCcsIGFjdHVhbE1hcmdpbilcbiAgICAgICAgICAuY3NzKCdtYXJnaW4tcmlnaHQnLCBgJHtwYXJzZUZsb2F0KGNhbGN1bGF0ZWRNYXJnaW4pIC0gdGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgKVxuICAgICAgfSlcblxuICAgICAgLy8gQWRqdXN0IGJvZHkgcGFkZGluZ1xuICAgICAgY29uc3QgYWN0dWFsUGFkZGluZyA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0XG4gICAgICBjb25zdCBjYWxjdWxhdGVkUGFkZGluZyA9ICQoZG9jdW1lbnQuYm9keSkuY3NzKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICQoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLmRhdGEoJ3BhZGRpbmctcmlnaHQnLCBhY3R1YWxQYWRkaW5nKVxuICAgICAgICAuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYCR7cGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgfVxuXG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgfVxuXG4gIF9yZXNldFNjcm9sbGJhcigpIHtcbiAgICAvLyBSZXN0b3JlIGZpeGVkIGNvbnRlbnQgcGFkZGluZ1xuICAgIGNvbnN0IGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSlcbiAgICAkKGZpeGVkQ29udGVudCkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAkKGVsZW1lbnQpLmRhdGEoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgJChlbGVtZW50KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgIGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZyA/IHBhZGRpbmcgOiAnJ1xuICAgIH0pXG5cbiAgICAvLyBSZXN0b3JlIHN0aWNreSBjb250ZW50XG4gICAgY29uc3QgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCR7U2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlR9YCkpXG4gICAgJChlbGVtZW50cykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IG1hcmdpbiA9ICQoZWxlbWVudCkuZGF0YSgnbWFyZ2luLXJpZ2h0JylcbiAgICAgIGlmICh0eXBlb2YgbWFyZ2luICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAkKGVsZW1lbnQpLmNzcygnbWFyZ2luLXJpZ2h0JywgbWFyZ2luKS5yZW1vdmVEYXRhKCdtYXJnaW4tcmlnaHQnKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBSZXN0b3JlIGJvZHkgcGFkZGluZ1xuICAgIGNvbnN0IHBhZGRpbmcgPSAkKGRvY3VtZW50LmJvZHkpLmRhdGEoJ3BhZGRpbmctcmlnaHQnKVxuICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlRGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnXG4gIH1cblxuICBfZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7IC8vIHRoeCBkLndhbHNoXG4gICAgY29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLlNDUk9MTEJBUl9NRUFTVVJFUlxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KVxuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuICAvLyBTdGF0aWNcblxuICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcsIHJlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgLi4uRGVmYXVsdCxcbiAgICAgICAgLi4uJCh0aGlzKS5kYXRhKCksXG4gICAgICAgIC4uLnR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IE1vZGFsKHRoaXMsIF9jb25maWcpXG4gICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2NvbmZpZ10ocmVsYXRlZFRhcmdldClcbiAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5zaG93KSB7XG4gICAgICAgIGRhdGEuc2hvdyhyZWxhdGVkVGFyZ2V0KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICBsZXQgdGFyZ2V0XG4gIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgaWYgKHNlbGVjdG9yKSB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgfVxuXG4gIGNvbnN0IGNvbmZpZyA9ICQodGFyZ2V0KS5kYXRhKERBVEFfS0VZKVxuICAgID8gJ3RvZ2dsZScgOiB7XG4gICAgICAuLi4kKHRhcmdldCkuZGF0YSgpLFxuICAgICAgLi4uJCh0aGlzKS5kYXRhKClcbiAgICB9XG5cbiAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJ0EnIHx8IHRoaXMudGFnTmFtZSA9PT0gJ0FSRUEnKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgY29uc3QgJHRhcmdldCA9ICQodGFyZ2V0KS5vbmUoRXZlbnQuU0hPVywgKHNob3dFdmVudCkgPT4ge1xuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIC8vIE9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgICR0YXJnZXQub25lKEV2ZW50LkhJRERFTiwgKCkgPT4ge1xuICAgICAgaWYgKCQodGhpcykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0YXJnZXQpLCBjb25maWcsIHRoaXMpXG59KVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdID0gTW9kYWwuX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IE1vZGFsXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIE1vZGFsLl9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiJdLCJuYW1lcyI6WyJOQU1FIiwiVkVSU0lPTiIsIkRBVEFfS0VZIiwiRVZFTlRfS0VZIiwiREFUQV9BUElfS0VZIiwiSlFVRVJZX05PX0NPTkZMSUNUIiwiJCIsImZuIiwiRVNDQVBFX0tFWUNPREUiLCJEZWZhdWx0IiwiYmFja2Ryb3AiLCJrZXlib2FyZCIsImZvY3VzIiwic2hvdyIsIkRlZmF1bHRUeXBlIiwiRXZlbnQiLCJISURFIiwiSElERV9QUkVWRU5URUQiLCJISURERU4iLCJTSE9XIiwiU0hPV04iLCJGT0NVU0lOIiwiUkVTSVpFIiwiQ0xJQ0tfRElTTUlTUyIsIktFWURPV05fRElTTUlTUyIsIk1PVVNFVVBfRElTTUlTUyIsIk1PVVNFRE9XTl9ESVNNSVNTIiwiQ0xJQ0tfREFUQV9BUEkiLCJDbGFzc05hbWUiLCJTQ1JPTExBQkxFIiwiU0NST0xMQkFSX01FQVNVUkVSIiwiQkFDS0RST1AiLCJPUEVOIiwiRkFERSIsIlNUQVRJQyIsIlNlbGVjdG9yIiwiRElBTE9HIiwiTU9EQUxfQk9EWSIsIkRBVEFfVE9HR0xFIiwiREFUQV9ESVNNSVNTIiwiRklYRURfQ09OVEVOVCIsIlNUSUNLWV9DT05URU5UIiwiTW9kYWwiLCJlbGVtZW50IiwiY29uZmlnIiwiX2NvbmZpZyIsIl9nZXRDb25maWciLCJfZWxlbWVudCIsIl9kaWFsb2ciLCJxdWVyeVNlbGVjdG9yIiwiX2JhY2tkcm9wIiwiX2lzU2hvd24iLCJfaXNCb2R5T3ZlcmZsb3dpbmciLCJfaWdub3JlQmFja2Ryb3BDbGljayIsIl9pc1RyYW5zaXRpb25pbmciLCJfc2Nyb2xsYmFyV2lkdGgiLCJ0b2dnbGUiLCJyZWxhdGVkVGFyZ2V0IiwiaGlkZSIsImhhc0NsYXNzIiwic2hvd0V2ZW50IiwidHJpZ2dlciIsImlzRGVmYXVsdFByZXZlbnRlZCIsIl9jaGVja1Njcm9sbGJhciIsIl9zZXRTY3JvbGxiYXIiLCJfYWRqdXN0RGlhbG9nIiwiX3NldEVzY2FwZUV2ZW50IiwiX3NldFJlc2l6ZUV2ZW50Iiwib24iLCJldmVudCIsIm9uZSIsInRhcmdldCIsImlzIiwiX3Nob3dCYWNrZHJvcCIsIl9zaG93RWxlbWVudCIsInByZXZlbnREZWZhdWx0IiwiaGlkZUV2ZW50IiwidHJhbnNpdGlvbiIsImRvY3VtZW50Iiwib2ZmIiwicmVtb3ZlQ2xhc3MiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJVdGlsIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJUUkFOU0lUSU9OX0VORCIsIl9oaWRlTW9kYWwiLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsImRpc3Bvc2UiLCJ3aW5kb3ciLCJmb3JFYWNoIiwiaHRtbEVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiaGFuZGxlVXBkYXRlIiwidHlwZUNoZWNrQ29uZmlnIiwiX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24iLCJoaWRlRXZlbnRQcmV2ZW50ZWQiLCJkZWZhdWx0UHJldmVudGVkIiwiY2xhc3NMaXN0IiwiYWRkIiwibW9kYWxUcmFuc2l0aW9uRHVyYXRpb24iLCJyZW1vdmUiLCJtb2RhbEJvZHkiLCJwYXJlbnROb2RlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJkaXNwbGF5IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwic2Nyb2xsVG9wIiwicmVmbG93IiwiYWRkQ2xhc3MiLCJfZW5mb3JjZUZvY3VzIiwic2hvd25FdmVudCIsInRyYW5zaXRpb25Db21wbGV0ZSIsImhhcyIsImxlbmd0aCIsIndoaWNoIiwiX3Jlc2V0QWRqdXN0bWVudHMiLCJfcmVzZXRTY3JvbGxiYXIiLCJfcmVtb3ZlQmFja2Ryb3AiLCJjYWxsYmFjayIsImFuaW1hdGUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kVG8iLCJjdXJyZW50VGFyZ2V0IiwiYmFja2Ryb3BUcmFuc2l0aW9uRHVyYXRpb24iLCJjYWxsYmFja1JlbW92ZSIsImlzTW9kYWxPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJyaWdodCIsImlubmVyV2lkdGgiLCJfZ2V0U2Nyb2xsYmFyV2lkdGgiLCJmaXhlZENvbnRlbnQiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3RpY2t5Q29udGVudCIsImVhY2giLCJpbmRleCIsImFjdHVhbFBhZGRpbmciLCJjYWxjdWxhdGVkUGFkZGluZyIsImNzcyIsImRhdGEiLCJwYXJzZUZsb2F0IiwiYWN0dWFsTWFyZ2luIiwibWFyZ2luUmlnaHQiLCJjYWxjdWxhdGVkTWFyZ2luIiwicGFkZGluZyIsImVsZW1lbnRzIiwibWFyZ2luIiwic2Nyb2xsRGl2Iiwic2Nyb2xsYmFyV2lkdGgiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwicmVtb3ZlQ2hpbGQiLCJfalF1ZXJ5SW50ZXJmYWNlIiwiVHlwZUVycm9yIiwic2VsZWN0b3IiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50IiwidGFnTmFtZSIsIiR0YXJnZXQiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFVQTs7Ozs7O0VBTUEsSUFBTUEsSUFBSSxHQUFpQixPQUEzQjtFQUNBLElBQU1DLE9BQU8sR0FBYyxPQUEzQjtFQUNBLElBQU1DLFFBQVEsR0FBYSxVQUEzQjtFQUNBLElBQU1DLFNBQVMsU0FBZ0JELFFBQS9CO0VBQ0EsSUFBTUUsWUFBWSxHQUFTLFdBQTNCO0VBQ0EsSUFBTUMsa0JBQWtCLEdBQUdDLENBQUMsQ0FBQ0MsRUFBRixDQUFLUCxJQUFMLENBQTNCO0VBQ0EsSUFBTVEsY0FBYyxHQUFPLEVBQTNCOztFQUVBLElBQU1DLE9BQU8sR0FBRztFQUNkQyxFQUFBQSxRQUFRLEVBQUcsSUFERztFQUVkQyxFQUFBQSxRQUFRLEVBQUcsSUFGRztFQUdkQyxFQUFBQSxLQUFLLEVBQU0sSUFIRztFQUlkQyxFQUFBQSxJQUFJLEVBQU87RUFKRyxDQUFoQjtFQU9BLElBQU1DLFdBQVcsR0FBRztFQUNsQkosRUFBQUEsUUFBUSxFQUFHLGtCQURPO0VBRWxCQyxFQUFBQSxRQUFRLEVBQUcsU0FGTztFQUdsQkMsRUFBQUEsS0FBSyxFQUFNLFNBSE87RUFJbEJDLEVBQUFBLElBQUksRUFBTztFQUpPLENBQXBCO0VBT0EsSUFBTUUsS0FB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
