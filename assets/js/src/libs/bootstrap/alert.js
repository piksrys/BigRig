/*!
  * Bootstrap alert.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global = global || self, global.Alert = factory(global.jQuery, global.Util));
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

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGVydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IGFsZXJ0LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAnYWxlcnQnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuNC4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5hbGVydCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgRElTTUlTUyA6ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBDTE9TRSAgICAgICAgICA6IGBjbG9zZSR7RVZFTlRfS0VZfWAsXG4gIENMT1NFRCAgICAgICAgIDogYGNsb3NlZCR7RVZFTlRfS0VZfWAsXG4gIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIEFMRVJUIDogJ2FsZXJ0JyxcbiAgRkFERSAgOiAnZmFkZScsXG4gIFNIT1cgIDogJ3Nob3cnXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBBbGVydCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgY2xvc2UoZWxlbWVudCkge1xuICAgIGxldCByb290RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcm9vdEVsZW1lbnQgPSB0aGlzLl9nZXRSb290RWxlbWVudChlbGVtZW50KVxuICAgIH1cblxuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gdGhpcy5fdHJpZ2dlckNsb3NlRXZlbnQocm9vdEVsZW1lbnQpXG5cbiAgICBpZiAoY3VzdG9tRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQocm9vdEVsZW1lbnQpXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcbiAgICBsZXQgcGFyZW50ICAgICA9IGZhbHNlXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgIHBhcmVudCA9ICQoZWxlbWVudCkuY2xvc2VzdChgLiR7Q2xhc3NOYW1lLkFMRVJUfWApWzBdXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgX3RyaWdnZXJDbG9zZUV2ZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSlcblxuICAgICQoZWxlbWVudCkudHJpZ2dlcihjbG9zZUV2ZW50KVxuICAgIHJldHVybiBjbG9zZUV2ZW50XG4gIH1cblxuICBfcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpXG5cbiAgICAkKGVsZW1lbnQpXG4gICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCwgZXZlbnQpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgfVxuXG4gIF9kZXN0cm95RWxlbWVudChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KVxuICAgICAgLmRldGFjaCgpXG4gICAgICAudHJpZ2dlcihFdmVudC5DTE9TRUQpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgICBsZXQgZGF0YSAgICAgICA9ICRlbGVtZW50LmRhdGEoREFUQV9LRVkpXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpXG4gICAgICAgICRlbGVtZW50LmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgZGF0YVtjb25maWddKHRoaXMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBfaGFuZGxlRGlzbWlzcyhhbGVydEluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cblxuICAgICAgYWxlcnRJbnN0YW5jZS5jbG9zZSh0aGlzKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpLm9uKFxuICBFdmVudC5DTElDS19EQVRBX0FQSSxcbiAgU2VsZWN0b3IuRElTTUlTUyxcbiAgQWxlcnQuX2hhbmRsZURpc21pc3MobmV3IEFsZXJ0KCkpXG4pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gICAgICAgICAgICAgPSBBbGVydC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnRcbiQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRcbiJdLCJuYW1lcyI6WyJOQU1FIiwiVkVSU0lPTiIsIkRBVEFfS0VZIiwiRVZFTlRfS0VZIiwiREFUQV9BUElfS0VZIiwiSlFVRVJZX05PX0NPTkZMSUNUIiwiJCIsImZuIiwiU2VsZWN0b3IiLCJESVNNSVNTIiwiRXZlbnQiLCJDTE9TRSIsIkNMT1NFRCIsIkNMSUNLX0RBVEFfQVBJIiwiQ2xhc3NOYW1lIiwiQUxFUlQiLCJGQURFIiwiU0hPVyIsIkFsZXJ0IiwiZWxlbWVudCIsIl9lbGVtZW50IiwiY2xvc2UiLCJyb290RWxlbWVudCIsIl9nZXRSb290RWxlbWVudCIsImN1c3RvbUV2ZW50IiwiX3RyaWdnZXJDbG9zZUV2ZW50IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiX3JlbW92ZUVsZW1lbnQiLCJkaXNwb3NlIiwicmVtb3ZlRGF0YSIsInNlbGVjdG9yIiwiVXRpbCIsImdldFNlbGVjdG9yRnJvbUVsZW1lbnQiLCJwYXJlbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbG9zZXN0IiwiY2xvc2VFdmVudCIsInRyaWdnZXIiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiX2Rlc3Ryb3lFbGVtZW50IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJvbmUiLCJUUkFOU0lUSU9OX0VORCIsImV2ZW50IiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJkZXRhY2giLCJyZW1vdmUiLCJfalF1ZXJ5SW50ZXJmYWNlIiwiY29uZmlnIiwiZWFjaCIsIiRlbGVtZW50IiwiZGF0YSIsIl9oYW5kbGVEaXNtaXNzIiwiYWxlcnRJbnN0YW5jZSIsInByZXZlbnREZWZhdWx0Iiwib24iLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQVVBOzs7Ozs7RUFNQSxJQUFNQSxJQUFJLEdBQWtCLE9BQTVCO0VBQ0EsSUFBTUMsT0FBTyxHQUFlLE9BQTVCO0VBQ0EsSUFBTUMsUUFBUSxHQUFjLFVBQTVCO0VBQ0EsSUFBTUMsU0FBUyxTQUFpQkQsUUFBaEM7RUFDQSxJQUFNRSxZQUFZLEdBQVUsV0FBNUI7RUFDQSxJQUFNQyxrQkFBa0IsR0FBSUMsQ0FBQyxDQUFDQyxFQUFGLENBQUtQLElBQUwsQ0FBNUI7RUFFQSxJQUFNUSxRQUFRLEdBQUc7RUFDZkMsRUFBQUEsT0FBTyxFQUFHO0VBREssQ0FBakI7RUFJQSxJQUFNQyxLQUFLLEdBQUc7RUFDWkMsRUFBQUEsS0FBSyxZQUFvQlIsU0FEYjtFQUVaUyxFQUFBQSxNQUFNLGFBQW9CVCxTQUZkO0VBR1pVLEVBQUFBLGNBQWMsWUFBV1YsU0FBWCxHQUF1QkM7RUFIekIsQ0FBZDtFQU1BLElBQU1VLFNBQVMsR0FBRztFQUNoQkMsRUFBQUEsS0FBSyxFQUFHLE9BRFE7RUFFaEJDLEVB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
