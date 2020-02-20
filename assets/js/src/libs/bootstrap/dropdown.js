/*!
  * Bootstrap dropdown.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util.js'], factory) :
  (global = global || self, global.Dropdown = factory(global.jQuery, global.Popper, global.Util));
}(this, (function ($, Popper, Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
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

  var NAME = 'dropdown';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED) || $(this._menu).hasClass(ClassName.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED) || !$(this._menu).hasClass(ClassName.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, $(this._element).data(), {}, config);
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _objectSpread2({}, popperConfig, {}, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
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

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS)).filter(function (item) {
        return $(item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kcm9wZG93bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjQuMSk6IGRyb3Bkb3duLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICAgICAgID0gJ2Ryb3Bkb3duJ1xuY29uc3QgVkVSU0lPTiAgICAgICAgICAgICAgICAgID0gJzQuNC4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICAgICAgID0gJ2JzLmRyb3Bkb3duJ1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IERBVEFfQVBJX0tFWSAgICAgICAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgICAgICAgPSAkLmZuW05BTUVdXG5jb25zdCBFU0NBUEVfS0VZQ09ERSAgICAgICAgICAgPSAyNyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5jb25zdCBTUEFDRV9LRVlDT0RFICAgICAgICAgICAgPSAzMiAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBzcGFjZSBrZXlcbmNvbnN0IFRBQl9LRVlDT0RFICAgICAgICAgICAgICA9IDkgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdGFiIGtleVxuY29uc3QgQVJST1dfVVBfS0VZQ09ERSAgICAgICAgID0gMzggLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdXAgYXJyb3cga2V5XG5jb25zdCBBUlJPV19ET1dOX0tFWUNPREUgICAgICAgPSA0MCAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBkb3duIGFycm93IGtleVxuY29uc3QgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMyAvLyBNb3VzZUV2ZW50LndoaWNoIHZhbHVlIGZvciB0aGUgcmlnaHQgYnV0dG9uIChhc3N1bWluZyBhIHJpZ2h0LWhhbmRlZCBtb3VzZSlcbmNvbnN0IFJFR0VYUF9LRVlET1dOICAgICAgICAgICA9IG5ldyBSZWdFeHAoYCR7QVJST1dfVVBfS0VZQ09ERX18JHtBUlJPV19ET1dOX0tFWUNPREV9fCR7RVNDQVBFX0tFWUNPREV9YClcblxuY29uc3QgRXZlbnQgPSB7XG4gIEhJREUgICAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gIEhJRERFTiAgICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgU0hPVyAgICAgICAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgU0hPV04gICAgICAgICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gIENMSUNLICAgICAgICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICBDTElDS19EQVRBX0FQSSAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgS0VZRE9XTl9EQVRBX0FQSSA6IGBrZXlkb3duJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgS0VZVVBfREFUQV9BUEkgICA6IGBrZXl1cCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBESVNBQkxFRCAgICAgICAgOiAnZGlzYWJsZWQnLFxuICBTSE9XICAgICAgICAgICAgOiAnc2hvdycsXG4gIERST1BVUCAgICAgICAgICA6ICdkcm9wdXAnLFxuICBEUk9QUklHSFQgICAgICAgOiAnZHJvcHJpZ2h0JyxcbiAgRFJPUExFRlQgICAgICAgIDogJ2Ryb3BsZWZ0JyxcbiAgTUVOVVJJR0hUICAgICAgIDogJ2Ryb3Bkb3duLW1lbnUtcmlnaHQnLFxuICBNRU5VTEVGVCAgICAgICAgOiAnZHJvcGRvd24tbWVudS1sZWZ0JyxcbiAgUE9TSVRJT05fU1RBVElDIDogJ3Bvc2l0aW9uLXN0YXRpYydcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIERBVEFfVE9HR0xFICAgOiAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nLFxuICBGT1JNX0NISUxEICAgIDogJy5kcm9wZG93biBmb3JtJyxcbiAgTUVOVSAgICAgICAgICA6ICcuZHJvcGRvd24tbWVudScsXG4gIE5BVkJBUl9OQVYgICAgOiAnLm5hdmJhci1uYXYnLFxuICBWSVNJQkxFX0lURU1TIDogJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xufVxuXG5jb25zdCBBdHRhY2htZW50TWFwID0ge1xuICBUT1AgICAgICAgOiAndG9wLXN0YXJ0JyxcbiAgVE9QRU5EICAgIDogJ3RvcC1lbmQnLFxuICBCT1RUT00gICAgOiAnYm90dG9tLXN0YXJ0JyxcbiAgQk9UVE9NRU5EIDogJ2JvdHRvbS1lbmQnLFxuICBSSUdIVCAgICAgOiAncmlnaHQtc3RhcnQnLFxuICBSSUdIVEVORCAgOiAncmlnaHQtZW5kJyxcbiAgTEVGVCAgICAgIDogJ2xlZnQtc3RhcnQnLFxuICBMRUZURU5EICAgOiAnbGVmdC1lbmQnXG59XG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIG9mZnNldCAgICAgICA6IDAsXG4gIGZsaXAgICAgICAgICA6IHRydWUsXG4gIGJvdW5kYXJ5ICAgICA6ICdzY3JvbGxQYXJlbnQnLFxuICByZWZlcmVuY2UgICAgOiAndG9nZ2xlJyxcbiAgZGlzcGxheSAgICAgIDogJ2R5bmFtaWMnLFxuICBwb3BwZXJDb25maWcgOiBudWxsXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBvZmZzZXQgICAgICAgOiAnKG51bWJlcnxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgZmxpcCAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICBib3VuZGFyeSAgICAgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIHJlZmVyZW5jZSAgICA6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgZGlzcGxheSAgICAgIDogJ3N0cmluZycsXG4gIHBvcHBlckNvbmZpZyA6ICcobnVsbHxvYmplY3QpJ1xufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgRHJvcGRvd24ge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICB0aGlzLl9lbGVtZW50ICA9IGVsZW1lbnRcbiAgICB0aGlzLl9wb3BwZXIgICA9IG51bGxcbiAgICB0aGlzLl9jb25maWcgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgdGhpcy5fbWVudSAgICAgPSB0aGlzLl9nZXRNZW51RWxlbWVudCgpXG4gICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKVxuXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50LmRpc2FibGVkIHx8ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaXNBY3RpdmUgPSAkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgRHJvcGRvd24uX2NsZWFyTWVudXMoKVxuXG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNob3codHJ1ZSlcbiAgfVxuXG4gIHNob3codXNlUG9wcGVyID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudC5kaXNhYmxlZCB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkgfHwgJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgfVxuICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldClcbiAgICBjb25zdCBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICQocGFyZW50KS50cmlnZ2VyKHNob3dFdmVudClcblxuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIERpc2FibGUgdG90YWxseSBQb3BwZXIuanMgZm9yIERyb3Bkb3duIGluIE5hdmJhclxuICAgIGlmICghdGhpcy5faW5OYXZiYXIgJiYgdXNlUG9wcGVyKSB7XG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIGZvciBQb3BwZXIgZGVwZW5kZW5jeVxuICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgUG9wcGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXBcXCdzIGRyb3Bkb3ducyByZXF1aXJlIFBvcHBlci5qcyAoaHR0cHM6Ly9wb3BwZXIuanMub3JnLyknKVxuICAgICAgfVxuXG4gICAgICBsZXQgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSBwYXJlbnRcbiAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnJlZmVyZW5jZSkpIHtcbiAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VcblxuICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGpRdWVyeSBlbGVtZW50XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnJlZmVyZW5jZS5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VbMF1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBib3VuZGFyeSBpcyBub3QgYHNjcm9sbFBhcmVudGAsIHRoZW4gc2V0IHBvc2l0aW9uIHRvIGBzdGF0aWNgXG4gICAgICAvLyB0byBhbGxvdyB0aGUgbWVudSB0byBcImVzY2FwZVwiIHRoZSBzY3JvbGwgcGFyZW50J3MgYm91bmRhcmllc1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8yNDI1MVxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ib3VuZGFyeSAhPT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICAgICAgJChwYXJlbnQpLmFkZENsYXNzKENsYXNzTmFtZS5QT1NJVElPTl9TVEFUSUMpXG4gICAgICB9XG4gICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHRoaXMuX2dldFBvcHBlckNvbmZpZygpKVxuICAgIH1cblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxuICAgICAgICAkKHBhcmVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZCQVJfTkFWKS5sZW5ndGggPT09IDApIHtcbiAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vbignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICQodGhpcy5fbWVudSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgJChwYXJlbnQpXG4gICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAudHJpZ2dlcigkLkV2ZW50KEV2ZW50LlNIT1dOLCByZWxhdGVkVGFyZ2V0KSlcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpIHx8ICEkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9XG4gICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCByZWxhdGVkVGFyZ2V0KVxuICAgIGNvbnN0IHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgJChwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKVxuICAgIH1cblxuICAgICQodGhpcy5fbWVudSkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgJChwYXJlbnQpXG4gICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAudHJpZ2dlcigkLkV2ZW50KEV2ZW50LkhJRERFTiwgcmVsYXRlZFRhcmdldCkpXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB0aGlzLl9tZW51ID0gbnVsbFxuICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgIHRoaXMuX3BvcHBlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKVxuICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5zY2hlZHVsZVVwZGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICB0aGlzLnRvZ2dsZSgpXG4gICAgfSlcbiAgfVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLi4udGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LFxuICAgICAgLi4uJCh0aGlzLl9lbGVtZW50KS5kYXRhKCksXG4gICAgICAuLi5jb25maWdcbiAgICB9XG5cbiAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhcbiAgICAgIE5BTUUsXG4gICAgICBjb25maWcsXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlXG4gICAgKVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2dldE1lbnVFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5fbWVudSkge1xuICAgICAgY29uc3QgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fbWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk1FTlUpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tZW51XG4gIH1cblxuICBfZ2V0UGxhY2VtZW50KCkge1xuICAgIGNvbnN0ICRwYXJlbnREcm9wZG93biA9ICQodGhpcy5fZWxlbWVudC5wYXJlbnROb2RlKVxuICAgIGxldCBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkJPVFRPTVxuXG4gICAgLy8gSGFuZGxlIGRyb3B1cFxuICAgIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BVUCkpIHtcbiAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuVE9QXG4gICAgICBpZiAoJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlRPUEVORFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QUklHSFQpKSB7XG4gICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlJJR0hUXG4gICAgfSBlbHNlIGlmICgkcGFyZW50RHJvcGRvd24uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BMRUZUKSkge1xuICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5MRUZUXG4gICAgfSBlbHNlIGlmICgkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5NRU5VUklHSFQpKSB7XG4gICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLkJPVFRPTUVORFxuICAgIH1cbiAgICByZXR1cm4gcGxhY2VtZW50XG4gIH1cblxuICBfZGV0ZWN0TmF2YmFyKCkge1xuICAgIHJldHVybiAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoJy5uYXZiYXInKS5sZW5ndGggPiAwXG4gIH1cblxuICBfZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHt9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5vZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9mZnNldC5mbiA9IChkYXRhKSA9PiB7XG4gICAgICAgIGRhdGEub2Zmc2V0cyA9IHtcbiAgICAgICAgICAuLi5kYXRhLm9mZnNldHMsXG4gICAgICAgICAgLi4udGhpcy5fY29uZmlnLm9mZnNldChkYXRhLm9mZnNldHMsIHRoaXMuX2VsZW1lbnQpIHx8IHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQub2Zmc2V0ID0gdGhpcy5fY29uZmlnLm9mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRcbiAgfVxuXG4gIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgY29uc3QgcG9wcGVyQ29uZmlnID0ge1xuICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBvZmZzZXQ6IHRoaXMuX2dldE9mZnNldCgpLFxuICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5fY29uZmlnLmZsaXBcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuX2NvbmZpZy5ib3VuZGFyeVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSBQb3BwZXIuanMgaWYgd2UgaGF2ZSBhIHN0YXRpYyBkaXNwbGF5XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5kaXNwbGF5ID09PSAnc3RhdGljJykge1xuICAgICAgcG9wcGVyQ29uZmlnLm1vZGlmaWVycy5hcHBseVN0eWxlID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5wb3BwZXJDb25maWcsXG4gICAgICAuLi50aGlzLl9jb25maWcucG9wcGVyQ29uZmlnXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcywgX2NvbmZpZylcbiAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBfY2xlYXJNZW51cyhldmVudCkge1xuICAgIGlmIChldmVudCAmJiAoZXZlbnQud2hpY2ggPT09IFJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCB8fFxuICAgICAgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC53aGljaCAhPT0gVEFCX0tFWUNPREUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0b2dnbGVzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0b2dnbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodG9nZ2xlc1tpXSlcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAkKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpXG4gICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0b2dnbGVzW2ldXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQuY2xpY2tFdmVudCA9IGV2ZW50XG4gICAgICB9XG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkcm9wZG93bk1lbnUgPSBjb250ZXh0Ll9tZW51XG4gICAgICBpZiAoISQocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50ICYmIChldmVudC50eXBlID09PSAnY2xpY2snICYmXG4gICAgICAgICAgL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkgfHwgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC53aGljaCA9PT0gVEFCX0tFWUNPREUpICYmXG4gICAgICAgICAgJC5jb250YWlucyhwYXJlbnQsIGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCByZWxhdGVkVGFyZ2V0KVxuICAgICAgJChwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9mZignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgICAgfVxuXG4gICAgICB0b2dnbGVzW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG5cbiAgICAgIGlmIChjb250ZXh0Ll9wb3BwZXIpIHtcbiAgICAgICAgY29udGV4dC5fcG9wcGVyLmRlc3Ryb3koKVxuICAgICAgfVxuXG4gICAgICAkKGRyb3Bkb3duTWVudSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAkKHBhcmVudClcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KEV2ZW50LkhJRERFTiwgcmVsYXRlZFRhcmdldCkpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgbGV0IHBhcmVudFxuICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudCB8fCBlbGVtZW50LnBhcmVudE5vZGVcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gIHN0YXRpYyBfZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gSWYgbm90IGlucHV0L3RleHRhcmVhOlxuICAgIC8vICAtIEFuZCBub3QgYSBrZXkgaW4gUkVHRVhQX0tFWURPV04gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIC8vIElmIGlucHV0L3RleHRhcmVhOlxuICAgIC8vICAtIElmIHNwYWNlIGtleSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgLy8gIC0gSWYga2V5IGlzIG90aGVyIHRoYW4gZXNjYXBlXG4gICAgLy8gICAgLSBJZiBrZXkgaXMgbm90IHVwIG9yIGRvd24gPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIC8vICAgIC0gSWYgdHJpZ2dlciBpbnNpZGUgdGhlIG1lbnUgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKVxuICAgICAgPyBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSB8fCBldmVudC53aGljaCAhPT0gRVNDQVBFX0tFWUNPREUgJiZcbiAgICAgIChldmVudC53aGljaCAhPT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGV2ZW50LndoaWNoICE9PSBBUlJPV19VUF9LRVlDT0RFIHx8XG4gICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFNlbGVjdG9yLk1FTlUpLmxlbmd0aCkgOiAhUkVHRVhQX0tFWURPV04udGVzdChldmVudC53aGljaCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgJCh0aGlzKS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnQgICA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzKVxuICAgIGNvbnN0IGlzQWN0aXZlID0gJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSAmJiBldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghaXNBY3RpdmUgfHwgaXNBY3RpdmUgJiYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSB8fCBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSkpIHtcbiAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuREFUQV9UT0dHTEUpXG4gICAgICAgICQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9XG5cbiAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlZJU0lCTEVfSVRFTVMpKVxuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gJChpdGVtKS5pcygnOnZpc2libGUnKSlcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KVxuXG4gICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19VUF9LRVlDT0RFICYmIGluZGV4ID4gMCkgeyAvLyBVcFxuICAgICAgaW5kZXgtLVxuICAgIH1cblxuICAgIGlmIChldmVudC53aGljaCA9PT0gQVJST1dfRE9XTl9LRVlDT0RFICYmIGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkgeyAvLyBEb3duXG4gICAgICBpbmRleCsrXG4gICAgfVxuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaW5kZXggPSAwXG4gICAgfVxuXG4gICAgaXRlbXNbaW5kZXhdLmZvY3VzKClcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpXG4gIC5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcilcbiAgLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLk1FTlUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpXG4gIC5vbihgJHtFdmVudC5DTElDS19EQVRBX0FQSX0gJHtFdmVudC5LRVlVUF9EQVRBX0FQSX1gLCBEcm9wZG93bi5fY2xlYXJNZW51cylcbiAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICd0b2dnbGUnKVxuICB9KVxuICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkZPUk1fQ0hJTEQsIChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICB9KVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdID0gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93blxuIl0sIm5hbWVzIjpbIk5BTUUiLCJWRVJTSU9OIiwiREFUQV9LRVkiLCJFVkVOVF9LRVkiLCJEQVRBX0FQSV9LRVkiLCJKUVVFUllfTk9fQ09ORkxJQ1QiLCIkIiwiZm4iLCJFU0NBUEVfS0VZQ09ERSIsIlNQQUNFX0tFWUNPREUiLCJUQUJfS0VZQ09ERSIsIkFSUk9XX1VQX0tFWUNPREUiLCJBUlJPV19ET1dOX0tFWUNPREUiLCJSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0giLCJSRUdFWFBfS0VZRE9XTiIsIlJlZ0V4cCIsIkV2ZW50IiwiSElERSIsIkhJRERFTiIsIlNIT1ciLCJTSE9XTiIsIkNMSUNLIiwiQ0xJQ0tfREFUQV9BUEkiLCJLRVlET1dOX0RBVEFfQVBJIiwiS0VZVVBfREFUQV9BUEkiLCJDbGFzc05hbWUiLCJESVNBQkxFRCIsIkRST1BVUCIsIkRST1BSSUdIVCIsIkRST1BMRUZUIiwiTUVOVVJJR0hUIiwiTUVOVUxFRlQiLCJQT1NJVElPTl9TVEFUSUMiLCJTZWxlY3RvciIsIkRBVEFfVE9HR0xFIiwiRk9STV9DSElMRCIsIk1FTlUiLCJOQVZCQVJfTkFWIiwiVklTSUJMRV9JVEVNUyIsIkF0dGFjaG1lbnRNYXAiLCJUT1AiLCJUT1BFTkQiLCJCT1RUT00iLCJCT1RUT01FTkQiLCJSSUdIVCIsIlJJR0hURU5EIiwiTEVGVCIsIkxFRlRFTkQiLCJEZWZhdWx0Iiwib2Zmc2V0IiwiZmxpcCIsImJvdW5kYXJ5IiwicmVmZXJlbmNlIiwiZGlzcGxheSIsInBvcHBlckNvbmZpZyIsIkRlZmF1bHRUeXBlIiwiRHJvcGRvd24iLCJlbGVtZW50IiwiY29uZmlnIiwiX2VsZW1lbnQiLCJfcG9wcGVyIiwiX2NvbmZpZyIsIl9nZXRDb25maWciLCJfbWVudSIsIl9nZXRNZW51RWxlbWVudCIsIl9pbk5hdmJhciIsIl9kZXRlY3ROYXZiYXIiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJ0b2dnbGUiLCJkaXNhYmxlZCIsImhhc0NsYXNzIiwiaXNBY3RpdmUiLCJfY2xlYXJNZW51cyIsInNob3ciLCJ1c2VQb3BwZXIiLCJyZWxhdGVkVGFyZ2V0Iiwic2hvd0V2ZW50IiwicGFyZW50IiwiX2dldFBhcmVudEZyb21FbGVtZW50IiwidHJpZ2dlciIsImlzRGVmYXVsdFByZXZlbnRlZCIsIlBvcHBlciIsIlR5cGVFcnJvciIsInJlZmVyZW5jZUVsZW1lbnQiLCJVdGlsIiwiaXNFbGVtZW50IiwianF1ZXJ5IiwiYWRkQ2xhc3MiLCJfZ2V0UG9wcGVyQ29uZmlnIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbG9zZXN0IiwibGVuZ3RoIiwiYm9keSIsImNoaWxkcmVuIiwib24iLCJub29wIiwiZm9jdXMiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVDbGFzcyIsImhpZGUiLCJoaWRlRXZlbnQiLCJkZXN0cm95IiwiZGlzcG9zZSIsInJlbW92ZURhdGEiLCJvZmYiLCJ1cGRhdGUiLCJzY2hlZHVsZVVwZGF0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJ0eXBlQ2hlY2tDb25maWciLCJxdWVyeVNlbGVjdG9yIiwiX2dldFBsYWNlbWVudCIsIiRwYXJlbnREcm9wZG93biIsInBhcmVudE5vZGUiLCJwbGFjZW1lbnQiLCJfZ2V0T2Zmc2V0Iiwib2Zmc2V0cyIsIm1vZGlmaWVycyIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZGFyaWVzRWxlbWVudCIsImFwcGx5U3R5bGUiLCJfalF1ZXJ5SW50ZXJmYWNlIiwiZWFjaCIsIndoaWNoIiwidHlwZSIsInRvZ2dsZXMiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbiIsImNvbnRleHQiLCJjbGlja0V2ZW50IiwiZHJvcGRvd25NZW51IiwidGVzdCIsInRhcmdldCIsInRhZ05hbWUiLCJjb250YWlucyIsInJlbW92ZUNsYXNzIiwic2VsZWN0b3IiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50IiwiX2RhdGFBcGlLZXlkb3duSGFuZGxlciIsIml0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsImlzIiwiaW5kZXgiLCJpbmRleE9mIiwiZSIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFXQTs7Ozs7O0VBTUEsSUFBTUEsSUFBSSxHQUF1QixVQUFqQztFQUNBLElBQU1DLE9BQU8sR0FBb0IsT0FBakM7RUFDQSxJQUFNQyxRQUFRLEdBQW1CLGFBQWpDO0VBQ0EsSUFBTUMsU0FBUyxTQUFzQkQsUUFBckM7RUFDQSxJQUFNRSxZQUFZLEdBQWUsV0FBakM7RUFDQSxJQUFNQyxrQkFBa0IsR0FBU0MsQ0FBQyxDQUFDQyxFQUFGLENBQUtQLElBQUwsQ0FBakM7RUFDQSxJQUFNUSxjQUFjLEdBQWEsRUFBakM7O0VBQ0EsSUFBTUMsYUFBYSxHQUFjLEVBQWpDOztFQUNBLElBQU1DLFdBQVcsR0FBZ0IsQ0FBakM7O0VBQ0EsSUFBTUMsZ0JBQWdCLEdBQVcsRUFBakM7O0VBQ0EsSUFBTUMsa0JBQWtCLEdBQVMs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
