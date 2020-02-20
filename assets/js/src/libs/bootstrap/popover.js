/*!
  * Bootstrap popover.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./tooltip.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './tooltip.js'], factory) :
  (global = global || self, global.Popover = factory(global.jQuery, global.Tooltip));
}(this, (function ($, Tooltip) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Tooltip = Tooltip && Tooltip.hasOwnProperty('default') ? Tooltip['default'] : Tooltip;

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

  var Default = _objectSpread2({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType = _objectSpread2({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector.CONTENT), content);
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3BvcG92ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC40LjEpOiBwb3BvdmVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAncG9wb3ZlcidcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC40LjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLnBvcG92ZXInXG5jb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5jb25zdCBDTEFTU19QUkVGSVggICAgICAgID0gJ2JzLXBvcG92ZXInXG5jb25zdCBCU0NMU19QUkVGSVhfUkVHRVggID0gbmV3IFJlZ0V4cChgKF58XFxcXHMpJHtDTEFTU19QUkVGSVh9XFxcXFMrYCwgJ2cnKVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gIHBsYWNlbWVudCA6ICdyaWdodCcsXG4gIHRyaWdnZXIgICA6ICdjbGljaycsXG4gIGNvbnRlbnQgICA6ICcnLFxuICB0ZW1wbGF0ZSAgOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICc8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiPjwvaDM+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+PC9kaXY+J1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgLi4uVG9vbHRpcC5EZWZhdWx0VHlwZSxcbiAgY29udGVudCA6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJ1xufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIEZBREUgOiAnZmFkZScsXG4gIFNIT1cgOiAnc2hvdydcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIFRJVExFICAgOiAnLnBvcG92ZXItaGVhZGVyJyxcbiAgQ09OVEVOVCA6ICcucG9wb3Zlci1ib2R5J1xufVxuXG5jb25zdCBFdmVudCA9IHtcbiAgSElERSAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElEREVOICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICBTSE9XICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICBTSE9XTiAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgSU5TRVJURUQgICA6IGBpbnNlcnRlZCR7RVZFTlRfS0VZfWAsXG4gIENMSUNLICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICBGT0NVU0lOICAgIDogYGZvY3VzaW4ke0VWRU5UX0tFWX1gLFxuICBGT0NVU09VVCAgIDogYGZvY3Vzb3V0JHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VFTlRFUiA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VMRUFWRSA6IGBtb3VzZWxlYXZlJHtFVkVOVF9LRVl9YFxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgUG9wb3ZlciBleHRlbmRzIFRvb2x0aXAge1xuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICByZXR1cm4gREFUQV9LRVlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRXZlbnQoKSB7XG4gICAgcmV0dXJuIEV2ZW50XG4gIH1cblxuICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICByZXR1cm4gRVZFTlRfS0VZXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgLy8gT3ZlcnJpZGVzXG5cbiAgaXNXaXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKVxuICB9XG5cbiAgYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpIHtcbiAgICAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5hZGRDbGFzcyhgJHtDTEFTU19QUkVGSVh9LSR7YXR0YWNobWVudH1gKVxuICB9XG5cbiAgZ2V0VGlwRWxlbWVudCgpIHtcbiAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdXG4gICAgcmV0dXJuIHRoaXMudGlwXG4gIH1cblxuICBzZXRDb250ZW50KCkge1xuICAgIGNvbnN0ICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKVxuXG4gICAgLy8gV2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRJVExFKSwgdGhpcy5nZXRUaXRsZSgpKVxuICAgIGxldCBjb250ZW50ID0gdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb250ZW50ID0gY29udGVudC5jYWxsKHRoaXMuZWxlbWVudClcbiAgICB9XG4gICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuQ09OVEVOVCksIGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5GQURFfSAke0NsYXNzTmFtZS5TSE9XfWApXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpIHx8XG4gICAgICB0aGlzLmNvbmZpZy5jb250ZW50XG4gIH1cblxuICBfY2xlYW5UaXBDbGFzcygpIHtcbiAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcbiAgICBjb25zdCB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpXG4gICAgaWYgKHRhYkNsYXNzICE9PSBudWxsICYmIHRhYkNsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICR0aXAucmVtb3ZlQ2xhc3ModGFiQ2xhc3Muam9pbignJykpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgUG9wb3Zlcih0aGlzLCBfY29uZmlnKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2VcbiQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQb3BvdmVyXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iXSwibmFtZXMiOlsiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIiQiLCJmbiIsIkNMQVNTX1BSRUZJWCIsIkJTQ0xTX1BSRUZJWF9SRUdFWCIsIlJlZ0V4cCIsIkRlZmF1bHQiLCJUb29sdGlwIiwicGxhY2VtZW50IiwidHJpZ2dlciIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsIkRlZmF1bHRUeXBlIiwiQ2xhc3NOYW1lIiwiRkFERSIsIlNIT1ciLCJTZWxlY3RvciIsIlRJVExFIiwiQ09OVEVOVCIsIkV2ZW50IiwiSElERSIsIkhJRERFTiIsIlNIT1dOIiwiSU5TRVJURUQiLCJDTElDSyIsIkZPQ1VTSU4iLCJGT0NVU09VVCIsIk1PVVNFRU5URVIiLCJNT1VTRUxFQVZFIiwiUG9wb3ZlciIsImlzV2l0aENvbnRlbnQiLCJnZXRUaXRsZSIsIl9nZXRDb250ZW50IiwiYWRkQXR0YWNobWVudENsYXNzIiwiYXR0YWNobWVudCIsImdldFRpcEVsZW1lbnQiLCJhZGRDbGFzcyIsInRpcCIsImNvbmZpZyIsInNldENvbnRlbnQiLCIkdGlwIiwic2V0RWxlbWVudENvbnRlbnQiLCJmaW5kIiwiY2FsbCIsImVsZW1lbnQiLCJyZW1vdmVDbGFzcyIsImdldEF0dHJpYnV0ZSIsIl9jbGVhblRpcENsYXNzIiwidGFiQ2xhc3MiLCJhdHRyIiwibWF0Y2giLCJsZW5ndGgiLCJqb2luIiwiX2pRdWVyeUludGVyZmFjZSIsImVhY2giLCJkYXRhIiwiX2NvbmZpZyIsInRlc3QiLCJUeXBlRXJyb3IiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiXSwibWFwcGluZ3MiOiI7Ozs7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
