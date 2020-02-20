/*!
  * Bootstrap tooltip.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util.js'], factory) :
  (global = global || self, global.Tooltip = factory(global.jQuery, global.Popper, global.Util));
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
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
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
  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: Selector.ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _objectSpread2({}, defaultBsConfig, {}, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $(_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _objectSpread2({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread2({}, this.constructor.Default, {}, dataAttributes, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
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

    _createClass(Tooltip, null, [{
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

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3Rvb2xzL3Nhbml0aXplci5qcyIsIi4uL3NyYy90b29sdGlwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuNC4xKTogdG9vbHMvc2FuaXRpemVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCB1cmlBdHRycyA9IFtcbiAgJ2JhY2tncm91bmQnLFxuICAnY2l0ZScsXG4gICdocmVmJyxcbiAgJ2l0ZW10eXBlJyxcbiAgJ2xvbmdkZXNjJyxcbiAgJ3Bvc3RlcicsXG4gICdzcmMnLFxuICAneGxpbms6aHJlZidcbl1cblxuY29uc3QgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiA9IC9eYXJpYS1bXFx3LV0qJC9pXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0V2hpdGVsaXN0ID0ge1xuICAvLyBHbG9iYWwgYXR0cmlidXRlcyBhbGxvd2VkIG9uIGFueSBzdXBwbGllZCBlbGVtZW50IGJlbG93LlxuICAnKic6IFsnY2xhc3MnLCAnZGlyJywgJ2lkJywgJ2xhbmcnLCAncm9sZScsIEFSSUFfQVRUUklCVVRFX1BBVFRFUk5dLFxuICBhOiBbJ3RhcmdldCcsICdocmVmJywgJ3RpdGxlJywgJ3JlbCddLFxuICBhcmVhOiBbXSxcbiAgYjogW10sXG4gIGJyOiBbXSxcbiAgY29sOiBbXSxcbiAgY29kZTogW10sXG4gIGRpdjogW10sXG4gIGVtOiBbXSxcbiAgaHI6IFtdLFxuICBoMTogW10sXG4gIGgyOiBbXSxcbiAgaDM6IFtdLFxuICBoNDogW10sXG4gIGg1OiBbXSxcbiAgaDY6IFtdLFxuICBpOiBbXSxcbiAgaW1nOiBbJ3NyYycsICdhbHQnLCAndGl0bGUnLCAnd2lkdGgnLCAnaGVpZ2h0J10sXG4gIGxpOiBbXSxcbiAgb2w6IFtdLFxuICBwOiBbXSxcbiAgcHJlOiBbXSxcbiAgczogW10sXG4gIHNtYWxsOiBbXSxcbiAgc3BhbjogW10sXG4gIHN1YjogW10sXG4gIHN1cDogW10sXG4gIHN0cm9uZzogW10sXG4gIHU6IFtdLFxuICB1bDogW11cbn1cblxuLyoqXG4gKiBBIHBhdHRlcm4gdGhhdCByZWNvZ25pemVzIGEgY29tbW9ubHkgdXNlZnVsIHN1YnNldCBvZiBVUkxzIHRoYXQgYXJlIHNhZmUuXG4gKlxuICogU2hvdXRvdXQgdG8gQW5ndWxhciA3IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi83LjIuNC9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vdXJsX3Nhbml0aXplci50c1xuICovXG5jb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPzooPzpodHRwcz98bWFpbHRvfGZ0cHx0ZWx8ZmlsZSk6fFteJjovPyNdKig/OlsvPyNdfCQpKS9naVxuXG4vKipcbiAqIEEgcGF0dGVybiB0aGF0IG1hdGNoZXMgc2FmZSBkYXRhIFVSTHMuIE9ubHkgbWF0Y2hlcyBpbWFnZSwgdmlkZW8gYW5kIGF1ZGlvIHR5cGVzLlxuICpcbiAqIFNob3V0b3V0IHRvIEFuZ3VsYXIgNyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvNy4yLjQvcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL3VybF9zYW5pdGl6ZXIudHNcbiAqL1xuY29uc3QgREFUQV9VUkxfUEFUVEVSTiA9IC9eZGF0YTooPzppbWFnZVxcLyg/OmJtcHxnaWZ8anBlZ3xqcGd8cG5nfHRpZmZ8d2VicCl8dmlkZW9cXC8oPzptcGVnfG1wNHxvZ2d8d2VibSl8YXVkaW9cXC8oPzptcDN8b2dhfG9nZ3xvcHVzKSk7YmFzZTY0LFthLXowLTkrL10rPSokL2lcblxuZnVuY3Rpb24gYWxsb3dlZEF0dHJpYnV0ZShhdHRyLCBhbGxvd2VkQXR0cmlidXRlTGlzdCkge1xuICBjb25zdCBhdHRyTmFtZSA9IGF0dHIubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXG4gIGlmIChhbGxvd2VkQXR0cmlidXRlTGlzdC5pbmRleE9mKGF0dHJOYW1lKSAhPT0gLTEpIHtcbiAgICBpZiAodXJpQXR0cnMuaW5kZXhPZihhdHRyTmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihhdHRyLm5vZGVWYWx1ZS5tYXRjaChTQUZFX1VSTF9QQVRURVJOKSB8fCBhdHRyLm5vZGVWYWx1ZS5tYXRjaChEQVRBX1VSTF9QQVRURVJOKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY29uc3QgcmVnRXhwID0gYWxsb3dlZEF0dHJpYnV0ZUxpc3QuZmlsdGVyKChhdHRyUmVnZXgpID0+IGF0dHJSZWdleCBpbnN0YW5jZW9mIFJlZ0V4cClcblxuICAvLyBDaGVjayBpZiBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB2YWxpZGF0ZXMgdGhlIGF0dHJpYnV0ZS5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWdFeHAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGF0dHJOYW1lLm1hdGNoKHJlZ0V4cFtpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbCwgd2hpdGVMaXN0LCBzYW5pdGl6ZUZuKSB7XG4gIGlmICh1bnNhZmVIdG1sLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bnNhZmVIdG1sXG4gIH1cblxuICBpZiAoc2FuaXRpemVGbiAmJiB0eXBlb2Ygc2FuaXRpemVGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBzYW5pdGl6ZUZuKHVuc2FmZUh0bWwpXG4gIH1cblxuICBjb25zdCBkb21QYXJzZXIgPSBuZXcgd2luZG93LkRPTVBhcnNlcigpXG4gIGNvbnN0IGNyZWF0ZWREb2N1bWVudCA9IGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcodW5zYWZlSHRtbCwgJ3RleHQvaHRtbCcpXG4gIGNvbnN0IHdoaXRlbGlzdEtleXMgPSBPYmplY3Qua2V5cyh3aGl0ZUxpc3QpXG4gIGNvbnN0IGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChjcmVhdGVkRG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZWwgPSBlbGVtZW50c1tpXVxuICAgIGNvbnN0IGVsTmFtZSA9IGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKClcblxuICAgIGlmICh3aGl0ZWxpc3RLZXlzLmluZGV4T2YoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGNvbnN0IGF0dHJpYnV0ZUxpc3QgPSBbXS5zbGljZS5jYWxsKGVsLmF0dHJpYnV0ZXMpXG4gICAgY29uc3Qgd2hpdGVsaXN0ZWRBdHRyaWJ1dGVzID0gW10uY29uY2F0KHdoaXRlTGlzdFsnKiddIHx8IFtdLCB3aGl0ZUxpc3RbZWxOYW1lXSB8fCBbXSlcblxuICAgIGF0dHJpYnV0ZUxpc3QuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgaWYgKCFhbGxvd2VkQXR0cmlidXRlKGF0dHIsIHdoaXRlbGlzdGVkQXR0cmlidXRlcykpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIubm9kZU5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUxcbn1cbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuNC4xKTogdG9vbHRpcC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IHtcbiAgRGVmYXVsdFdoaXRlbGlzdCxcbiAgc2FuaXRpemVIdG1sXG59IGZyb20gJy4vdG9vbHMvc2FuaXRpemVyJ1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICA9ICd0b29sdGlwJ1xuY29uc3QgVkVSU0lPTiAgICAgICAgICAgICAgID0gJzQuNC4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICAgID0gJ2JzLnRvb2x0aXAnXG5jb25zdCBFVkVOVF9LRVkgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgID0gJC5mbltOQU1FXVxuY29uc3QgQ0xBU1NfUFJFRklYICAgICAgICAgID0gJ2JzLXRvb2x0aXAnXG5jb25zdCBCU0NMU19QUkVGSVhfUkVHRVggICAgPSBuZXcgUmVnRXhwKGAoXnxcXFxccykke0NMQVNTX1BSRUZJWH1cXFxcUytgLCAnZycpXG5jb25zdCBESVNBTExPV0VEX0FUVFJJQlVURVMgPSBbJ3Nhbml0aXplJywgJ3doaXRlTGlzdCcsICdzYW5pdGl6ZUZuJ11cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGFuaW1hdGlvbiAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICB0ZW1wbGF0ZSAgICAgICAgICA6ICdzdHJpbmcnLFxuICB0aXRsZSAgICAgICAgICAgICA6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgdHJpZ2dlciAgICAgICAgICAgOiAnc3RyaW5nJyxcbiAgZGVsYXkgICAgICAgICAgICAgOiAnKG51bWJlcnxvYmplY3QpJyxcbiAgaHRtbCAgICAgICAgICAgICAgOiAnYm9vbGVhbicsXG4gIHNlbGVjdG9yICAgICAgICAgIDogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICBwbGFjZW1lbnQgICAgICAgICA6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gIG9mZnNldCAgICAgICAgICAgIDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIGNvbnRhaW5lciAgICAgICAgIDogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKScsXG4gIGZhbGxiYWNrUGxhY2VtZW50IDogJyhzdHJpbmd8YXJyYXkpJyxcbiAgYm91bmRhcnkgICAgICAgICAgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIHNhbml0aXplICAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICBzYW5pdGl6ZUZuICAgICAgICA6ICcobnVsbHxmdW5jdGlvbiknLFxuICB3aGl0ZUxpc3QgICAgICAgICA6ICdvYmplY3QnLFxuICBwb3BwZXJDb25maWcgICAgICA6ICcobnVsbHxvYmplY3QpJ1xufVxuXG5jb25zdCBBdHRhY2htZW50TWFwID0ge1xuICBBVVRPICAgOiAnYXV0bycsXG4gIFRPUCAgICA6ICd0b3AnLFxuICBSSUdIVCAgOiAncmlnaHQnLFxuICBCT1RUT00gOiAnYm90dG9tJyxcbiAgTEVGVCAgIDogJ2xlZnQnXG59XG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGFuaW1hdGlvbiAgICAgICAgIDogdHJ1ZSxcbiAgdGVtcGxhdGUgICAgICAgICAgOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gIHRyaWdnZXIgICAgICAgICAgIDogJ2hvdmVyIGZvY3VzJyxcbiAgdGl0bGUgICAgICAgICAgICAgOiAnJyxcbiAgZGVsYXkgICAgICAgICAgICAgOiAwLFxuICBodG1sICAgICAgICAgICAgICA6IGZhbHNlLFxuICBzZWxlY3RvciAgICAgICAgICA6IGZhbHNlLFxuICBwbGFjZW1lbnQgICAgICAgICA6ICd0b3AnLFxuICBvZmZzZXQgICAgICAgICAgICA6IDAsXG4gIGNvbnRhaW5lciAgICAgICAgIDogZmFsc2UsXG4gIGZhbGxiYWNrUGxhY2VtZW50IDogJ2ZsaXAnLFxuICBib3VuZGFyeSAgICAgICAgICA6ICdzY3JvbGxQYXJlbnQnLFxuICBzYW5pdGl6ZSAgICAgICAgICA6IHRydWUsXG4gIHNhbml0aXplRm4gICAgICAgIDogbnVsbCxcbiAgd2hpdGVMaXN0ICAgICAgICAgOiBEZWZhdWx0V2hpdGVsaXN0LFxuICBwb3BwZXJDb25maWcgICAgICA6IG51bGxcbn1cblxuY29uc3QgSG92ZXJTdGF0ZSA9IHtcbiAgU0hPVyA6ICdzaG93JyxcbiAgT1VUICA6ICdvdXQnXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBISURFICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICBISURERU4gICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIFNIT1cgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICBJTlNFUlRFRCAgIDogYGluc2VydGVkJHtFVkVOVF9LRVl9YCxcbiAgQ0xJQ0sgICAgICA6IGBjbGljayR7RVZFTlRfS0VZfWAsXG4gIEZPQ1VTSU4gICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gIEZPQ1VTT1VUICAgOiBgZm9jdXNvdXQke0VWRU5UX0tFWX1gLFxuICBNT1VTRUVOVEVSIDogYG1vdXNlZW50ZXIke0VWRU5UX0tFWX1gLFxuICBNT1VTRUxFQVZFIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gXG59XG5cbmNvbnN0IENsYXNzTmFtZSA9IHtcbiAgRkFERSA6ICdmYWRlJyxcbiAgU0hPVyA6ICdzaG93J1xufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgVE9PTFRJUCAgICAgICA6ICcudG9vbHRpcCcsXG4gIFRPT0xUSVBfSU5ORVIgOiAnLnRvb2x0aXAtaW5uZXInLFxuICBBUlJPVyAgICAgICAgIDogJy5hcnJvdydcbn1cblxuY29uc3QgVHJpZ2dlciA9IHtcbiAgSE9WRVIgIDogJ2hvdmVyJyxcbiAgRk9DVVMgIDogJ2ZvY3VzJyxcbiAgQ0xJQ0sgIDogJ2NsaWNrJyxcbiAgTUFOVUFMIDogJ21hbnVhbCdcbn1cblxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgVG9vbHRpcCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIGlmICh0eXBlb2YgUG9wcGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyB0b29sdGlwcyByZXF1aXJlIFBvcHBlci5qcyAoaHR0cHM6Ly9wb3BwZXIuanMub3JnLyknKVxuICAgIH1cblxuICAgIC8vIHByaXZhdGVcbiAgICB0aGlzLl9pc0VuYWJsZWQgICAgID0gdHJ1ZVxuICAgIHRoaXMuX3RpbWVvdXQgICAgICAgPSAwXG4gICAgdGhpcy5faG92ZXJTdGF0ZSAgICA9ICcnXG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IHt9XG4gICAgdGhpcy5fcG9wcGVyICAgICAgICA9IG51bGxcblxuICAgIC8vIFByb3RlY3RlZFxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmNvbmZpZyAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgIHRoaXMudGlwICAgICA9IG51bGxcblxuICAgIHRoaXMuX3NldExpc3RlbmVycygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICByZXR1cm4gREFUQV9LRVlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRXZlbnQoKSB7XG4gICAgcmV0dXJuIEV2ZW50XG4gIH1cblxuICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICByZXR1cm4gRVZFTlRfS0VZXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuX2lzRW5hYmxlZCA9IHRydWVcbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIHRvZ2dsZUVuYWJsZWQoKSB7XG4gICAgdGhpcy5faXNFbmFibGVkID0gIXRoaXMuX2lzRW5hYmxlZFxuICB9XG5cbiAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChldmVudCkge1xuICAgICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcbiAgICAgIGxldCBjb250ZXh0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpXG4gICAgICAgIClcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2sgPSAhY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGlja1xuXG4gICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgIGNvbnRleHQuX2VudGVyKG51bGwsIGNvbnRleHQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0Ll9sZWF2ZShudWxsLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoJCh0aGlzLmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHRoaXMuX2xlYXZlKG51bGwsIHRoaXMpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbnRlcihudWxsLCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpXG5cbiAgICAkLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuXG4gICAgJCh0aGlzLmVsZW1lbnQpLm9mZih0aGlzLmNvbnN0cnVjdG9yLkVWRU5UX0tFWSlcbiAgICAkKHRoaXMuZWxlbWVudCkuY2xvc2VzdCgnLm1vZGFsJykub2ZmKCdoaWRlLmJzLm1vZGFsJywgdGhpcy5faGlkZU1vZGFsSGFuZGxlcilcblxuICAgIGlmICh0aGlzLnRpcCkge1xuICAgICAgJCh0aGlzLnRpcCkucmVtb3ZlKClcbiAgICB9XG5cbiAgICB0aGlzLl9pc0VuYWJsZWQgICAgID0gbnVsbFxuICAgIHRoaXMuX3RpbWVvdXQgICAgICAgPSBudWxsXG4gICAgdGhpcy5faG92ZXJTdGF0ZSAgICA9IG51bGxcbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0gbnVsbFxuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICB9XG5cbiAgICB0aGlzLl9wb3BwZXIgPSBudWxsXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuY29uZmlnICA9IG51bGxcbiAgICB0aGlzLnRpcCAgICAgPSBudWxsXG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICgkKHRoaXMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdXNlIHNob3cgb24gdmlzaWJsZSBlbGVtZW50cycpXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1cpXG4gICAgaWYgKHRoaXMuaXNXaXRoQ29udGVudCgpICYmIHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgICBjb25zdCBzaGFkb3dSb290ID0gVXRpbC5maW5kU2hhZG93Um9vdCh0aGlzLmVsZW1lbnQpXG4gICAgICBjb25zdCBpc0luVGhlRG9tID0gJC5jb250YWlucyhcbiAgICAgICAgc2hhZG93Um9vdCAhPT0gbnVsbCA/IHNoYWRvd1Jvb3QgOiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIHRoaXMuZWxlbWVudFxuICAgICAgKVxuXG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB0aXAgICA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgICBjb25zdCB0aXBJZCA9IFV0aWwuZ2V0VUlEKHRoaXMuY29uc3RydWN0b3IuTkFNRSlcblxuICAgICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZClcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgdGhpcy5zZXRDb250ZW50KClcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgICAkKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBsYWNlbWVudCAgPSB0eXBlb2YgdGhpcy5jb25maWcucGxhY2VtZW50ID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdGhpcy5jb25maWcucGxhY2VtZW50LmNhbGwodGhpcywgdGlwLCB0aGlzLmVsZW1lbnQpXG4gICAgICAgIDogdGhpcy5jb25maWcucGxhY2VtZW50XG5cbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSB0aGlzLl9nZXRBdHRhY2htZW50KHBsYWNlbWVudClcbiAgICAgIHRoaXMuYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpXG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2dldENvbnRhaW5lcigpXG4gICAgICAkKHRpcCkuZGF0YSh0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKVxuXG4gICAgICBpZiAoISQuY29udGFpbnModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLnRpcCkpIHtcbiAgICAgICAgJCh0aXApLmFwcGVuZFRvKGNvbnRhaW5lcilcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5JTlNFUlRFRClcblxuICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcih0aGlzLmVsZW1lbnQsIHRpcCwgdGhpcy5fZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpKVxuXG4gICAgICAkKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vbignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgICAgIHRoaXMuX2ZpeFRyYW5zaXRpb24oKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZIb3ZlclN0YXRlID0gdGhpcy5faG92ZXJTdGF0ZVxuICAgICAgICB0aGlzLl9ob3ZlclN0YXRlICAgICA9IG51bGxcblxuICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1dOKVxuXG4gICAgICAgIGlmIChwcmV2SG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5PVVQpIHtcbiAgICAgICAgICB0aGlzLl9sZWF2ZShudWxsLCB0aGlzKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLnRpcClcblxuICAgICAgICAkKHRoaXMudGlwKVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoaWRlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGlwICAgICAgID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSElERSlcbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9ob3ZlclN0YXRlICE9PSBIb3ZlclN0YXRlLlNIT1cgJiYgdGlwLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGlwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGlwKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9jbGVhblRpcENsYXNzKClcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5ISURERU4pXG4gICAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG5cbiAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgJChkb2N1bWVudC5ib2R5KS5jaGlsZHJlbigpLm9mZignbW91c2VvdmVyJywgbnVsbCwgJC5ub29wKVxuICAgIH1cblxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5DTElDS10gPSBmYWxzZVxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5GT0NVU10gPSBmYWxzZVxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5IT1ZFUl0gPSBmYWxzZVxuXG4gICAgaWYgKCQodGhpcy50aXApLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aXApXG5cbiAgICAgICQodGlwKVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfVxuXG4gICAgdGhpcy5faG92ZXJTdGF0ZSA9ICcnXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9wcGVyLnNjaGVkdWxlVXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvLyBQcm90ZWN0ZWRcblxuICBpc1dpdGhDb250ZW50KCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0VGl0bGUoKSlcbiAgfVxuXG4gIGFkZEF0dGFjaG1lbnRDbGFzcyhhdHRhY2htZW50KSB7XG4gICAgJCh0aGlzLmdldFRpcEVsZW1lbnQoKSkuYWRkQ2xhc3MoYCR7Q0xBU1NfUFJFRklYfS0ke2F0dGFjaG1lbnR9YClcbiAgfVxuXG4gIGdldFRpcEVsZW1lbnQoKSB7XG4gICAgdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAkKHRoaXMuY29uZmlnLnRlbXBsYXRlKVswXVxuICAgIHJldHVybiB0aGlzLnRpcFxuICB9XG5cbiAgc2V0Q29udGVudCgpIHtcbiAgICBjb25zdCB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJCh0aXAucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5UT09MVElQX0lOTkVSKSksIHRoaXMuZ2V0VGl0bGUoKSlcbiAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLkZBREV9ICR7Q2xhc3NOYW1lLlNIT1d9YClcbiAgfVxuXG4gIHNldEVsZW1lbnRDb250ZW50KCRlbGVtZW50LCBjb250ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0JyAmJiAoY29udGVudC5ub2RlVHlwZSB8fCBjb250ZW50LmpxdWVyeSkpIHtcbiAgICAgIC8vIENvbnRlbnQgaXMgYSBET00gbm9kZSBvciBhIGpRdWVyeVxuICAgICAgaWYgKHRoaXMuY29uZmlnLmh0bWwpIHtcbiAgICAgICAgaWYgKCEkKGNvbnRlbnQpLnBhcmVudCgpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICRlbGVtZW50LmVtcHR5KCkuYXBwZW5kKGNvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRlbGVtZW50LnRleHQoJChjb250ZW50KS50ZXh0KCkpXG4gICAgICB9XG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5odG1sKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuc2FuaXRpemUpIHtcbiAgICAgICAgY29udGVudCA9IHNhbml0aXplSHRtbChjb250ZW50LCB0aGlzLmNvbmZpZy53aGl0ZUxpc3QsIHRoaXMuY29uZmlnLnNhbml0aXplRm4pXG4gICAgICB9XG5cbiAgICAgICRlbGVtZW50Lmh0bWwoY29udGVudClcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsZW1lbnQudGV4dChjb250ZW50KVxuICAgIH1cbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIGxldCB0aXRsZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuXG4gICAgaWYgKCF0aXRsZSkge1xuICAgICAgdGl0bGUgPSB0eXBlb2YgdGhpcy5jb25maWcudGl0bGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB0aGlzLmNvbmZpZy50aXRsZS5jYWxsKHRoaXMuZWxlbWVudClcbiAgICAgICAgOiB0aGlzLmNvbmZpZy50aXRsZVxuICAgIH1cblxuICAgIHJldHVybiB0aXRsZVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRQb3BwZXJDb25maWcoYXR0YWNobWVudCkge1xuICAgIGNvbnN0IGRlZmF1bHRCc0NvbmZpZyA9IHtcbiAgICAgIHBsYWNlbWVudDogYXR0YWNobWVudCxcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBvZmZzZXQ6IHRoaXMuX2dldE9mZnNldCgpLFxuICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgYmVoYXZpb3I6IHRoaXMuY29uZmlnLmZhbGxiYWNrUGxhY2VtZW50XG4gICAgICAgIH0sXG4gICAgICAgIGFycm93OiB7XG4gICAgICAgICAgZWxlbWVudDogU2VsZWN0b3IuQVJST1dcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbkNyZWF0ZTogKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgIT09IGRhdGEucGxhY2VtZW50KSB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKGRhdGEpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblVwZGF0ZTogKGRhdGEpID0+IHRoaXMuX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShkYXRhKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZWZhdWx0QnNDb25maWcsXG4gICAgICAuLi50aGlzLmNvbmZpZy5wb3BwZXJDb25maWdcbiAgICB9XG4gIH1cblxuICBfZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHt9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2Zmc2V0LmZuID0gKGRhdGEpID0+IHtcbiAgICAgICAgZGF0YS5vZmZzZXRzID0ge1xuICAgICAgICAgIC4uLmRhdGEub2Zmc2V0cyxcbiAgICAgICAgICAuLi50aGlzLmNvbmZpZy5vZmZzZXQoZGF0YS5vZmZzZXRzLCB0aGlzLmVsZW1lbnQpIHx8IHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQub2Zmc2V0ID0gdGhpcy5jb25maWcub2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgX2dldENvbnRhaW5lcigpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY29udGFpbmVyID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHlcbiAgICB9XG5cbiAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5jb25maWcuY29udGFpbmVyKSkge1xuICAgICAgcmV0dXJuICQodGhpcy5jb25maWcuY29udGFpbmVyKVxuICAgIH1cblxuICAgIHJldHVybiAkKGRvY3VtZW50KS5maW5kKHRoaXMuY29uZmlnLmNvbnRhaW5lcilcbiAgfVxuXG4gIF9nZXRBdHRhY2htZW50KHBsYWNlbWVudCkge1xuICAgIHJldHVybiBBdHRhY2htZW50TWFwW3BsYWNlbWVudC50b1VwcGVyQ2FzZSgpXVxuICB9XG5cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLm9uKFxuICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuRXZlbnQuQ0xJQ0ssXG4gICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZShldmVudClcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSBUcmlnZ2VyLk1BTlVBTCkge1xuICAgICAgICBjb25zdCBldmVudEluID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUlxuICAgICAgICAgID8gdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUVOVEVSXG4gICAgICAgICAgOiB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTSU5cbiAgICAgICAgY29uc3QgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSXG4gICAgICAgICAgPyB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFTEVBVkVcbiAgICAgICAgICA6IHRoaXMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNPVVRcblxuICAgICAgICAkKHRoaXMuZWxlbWVudClcbiAgICAgICAgICAub24oXG4gICAgICAgICAgICBldmVudEluLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2VudGVyKGV2ZW50KVxuICAgICAgICAgIClcbiAgICAgICAgICAub24oXG4gICAgICAgICAgICBldmVudE91dCxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdG9yLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9sZWF2ZShldmVudClcbiAgICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuX2hpZGVNb2RhbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgJCh0aGlzLmVsZW1lbnQpLmNsb3Nlc3QoJy5tb2RhbCcpLm9uKFxuICAgICAgJ2hpZGUuYnMubW9kYWwnLFxuICAgICAgdGhpcy5faGlkZU1vZGFsSGFuZGxlclxuICAgIClcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3Rvcikge1xuICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLFxuICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICAgICAgc2VsZWN0b3I6ICcnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpeFRpdGxlKClcbiAgICB9XG4gIH1cblxuICBfZml4VGl0bGUoKSB7XG4gICAgY29uc3QgdGl0bGVUeXBlID0gdHlwZW9mIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuXG4gICAgaWYgKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHwgdGl0bGVUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLFxuICAgICAgICB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8ICcnXG4gICAgICApXG5cbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJycpXG4gICAgfVxuICB9XG5cbiAgX2VudGVyKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKFxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpXG4gICAgICApXG4gICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbXG4gICAgICAgIGV2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXG4gICAgICBdID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICgkKGNvbnRleHQuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykgfHwgY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5TSE9XXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dClcblxuICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1dcblxuICAgIGlmICghY29udGV4dC5jb25maWcuZGVsYXkgfHwgIWNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpIHtcbiAgICAgIGNvbnRleHQuc2hvdygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgIGNvbnRleHQuc2hvdygpXG4gICAgICB9XG4gICAgfSwgY29udGV4dC5jb25maWcuZGVsYXkuc2hvdylcbiAgfVxuXG4gIF9sZWF2ZShldmVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZXG4gICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgKVxuICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgfVxuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW1xuICAgICAgICBldmVudC50eXBlID09PSAnZm9jdXNvdXQnID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJcbiAgICAgIF0gPSBmYWxzZVxuICAgIH1cblxuICAgIGlmIChjb250ZXh0Ll9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dChjb250ZXh0Ll90aW1lb3V0KVxuXG4gICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuT1VUXG5cbiAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5oaWRlKSB7XG4gICAgICBjb250ZXh0LmhpZGUoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgIGNvbnRleHQuaGlkZSgpXG4gICAgICB9XG4gICAgfSwgY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSlcbiAgfVxuXG4gIF9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkge1xuICAgIGZvciAoY29uc3QgdHJpZ2dlciBpbiB0aGlzLl9hY3RpdmVUcmlnZ2VyKSB7XG4gICAgICBpZiAodGhpcy5fYWN0aXZlVHJpZ2dlclt0cmlnZ2VyXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25zdCBkYXRhQXR0cmlidXRlcyA9ICQodGhpcy5lbGVtZW50KS5kYXRhKClcblxuICAgIE9iamVjdC5rZXlzKGRhdGFBdHRyaWJ1dGVzKVxuICAgICAgLmZvckVhY2goKGRhdGFBdHRyKSA9PiB7XG4gICAgICAgIGlmIChESVNBTExPV0VEX0FUVFJJQlVURVMuaW5kZXhPZihkYXRhQXR0cikgIT09IC0xKSB7XG4gICAgICAgICAgZGVsZXRlIGRhdGFBdHRyaWJ1dGVzW2RhdGFBdHRyXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgY29uZmlnID0ge1xuICAgICAgLi4udGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LFxuICAgICAgLi4uZGF0YUF0dHJpYnV0ZXMsXG4gICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBjb25maWcuZGVsYXksXG4gICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnRpdGxlID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlLnRvU3RyaW5nKClcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLmNvbnRlbnQgPSBjb25maWcuY29udGVudC50b1N0cmluZygpXG4gICAgfVxuXG4gICAgVXRpbC50eXBlQ2hlY2tDb25maWcoXG4gICAgICBOQU1FLFxuICAgICAgY29uZmlnLFxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZVxuICAgIClcblxuICAgIGlmIChjb25maWcuc2FuaXRpemUpIHtcbiAgICAgIGNvbmZpZy50ZW1wbGF0ZSA9IHNhbml0aXplSHRtbChjb25maWcudGVtcGxhdGUsIGNvbmZpZy53aGl0ZUxpc3QsIGNvbmZpZy5zYW5pdGl6ZUZuKVxuICAgIH1cblxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7fVxuXG4gICAgaWYgKHRoaXMuY29uZmlnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgICBpZiAodGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2tleV0gIT09IHRoaXMuY29uZmlnW2tleV0pIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHRoaXMuY29uZmlnW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9jbGVhblRpcENsYXNzKCkge1xuICAgIGNvbnN0ICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKVxuICAgIGNvbnN0IHRhYkNsYXNzID0gJHRpcC5hdHRyKCdjbGFzcycpLm1hdGNoKEJTQ0xTX1BSRUZJWF9SRUdFWClcbiAgICBpZiAodGFiQ2xhc3MgIT09IG51bGwgJiYgdGFiQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAkdGlwLnJlbW92ZUNsYXNzKHRhYkNsYXNzLmpvaW4oJycpKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UocG9wcGVyRGF0YSkge1xuICAgIGNvbnN0IHBvcHBlckluc3RhbmNlID0gcG9wcGVyRGF0YS5pbnN0YW5jZVxuICAgIHRoaXMudGlwID0gcG9wcGVySW5zdGFuY2UucG9wcGVyXG4gICAgdGhpcy5fY2xlYW5UaXBDbGFzcygpXG4gICAgdGhpcy5hZGRBdHRhY2htZW50Q2xhc3ModGhpcy5fZ2V0QXR0YWNobWVudChwb3BwZXJEYXRhLnBsYWNlbWVudCkpXG4gIH1cblxuICBfZml4VHJhbnNpdGlvbigpIHtcbiAgICBjb25zdCB0aXAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgIGNvbnN0IGluaXRDb25maWdBbmltYXRpb24gPSB0aGlzLmNvbmZpZy5hbmltYXRpb25cblxuICAgIGlmICh0aXAuZ2V0QXR0cmlidXRlKCd4LXBsYWNlbWVudCcpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gZmFsc2VcbiAgICB0aGlzLmhpZGUoKVxuICAgIHRoaXMuc2hvdygpXG4gICAgdGhpcy5jb25maWcuYW5pbWF0aW9uID0gaW5pdENvbmZpZ0FuaW1hdGlvblxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcblxuICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBfY29uZmlnKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2VcbiQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUb29sdGlwXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFRvb2x0aXAuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwXG4iXSwibmFtZXMiOlsidXJpQXR0cnMiLCJBUklBX0FUVFJJQlVURV9QQVRURVJOIiwiRGVmYXVsdFdoaXRlbGlzdCIsImEiLCJhcmVhIiwiYiIsImJyIiwiY29sIiwiY29kZSIsImRpdiIsImVtIiwiaHIiLCJoMSIsImgyIiwiaDMiLCJoNCIsImg1IiwiaDYiLCJpIiwiaW1nIiwibGkiLCJvbCIsInAiLCJwcmUiLCJzIiwic21hbGwiLCJzcGFuIiwic3ViIiwic3VwIiwic3Ryb25nIiwidSIsInVsIiwiU0FGRV9VUkxfUEFUVEVSTiIsIkRBVEFfVVJMX1BBVFRFUk4iLCJhbGxvd2VkQXR0cmlidXRlIiwiYXR0ciIsImFsbG93ZWRBdHRyaWJ1dGVMaXN0IiwiYXR0ck5hbWUiLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsIkJvb2xlYW4iLCJub2RlVmFsdWUiLCJtYXRjaCIsInJlZ0V4cCIsImZpbHRlciIsImF0dHJSZWdleCIsIlJlZ0V4cCIsImwiLCJsZW5ndGgiLCJzYW5pdGl6ZUh0bWwiLCJ1bnNhZmVIdG1sIiwid2hpdGVMaXN0Iiwic2FuaXRpemVGbiIsImRvbVBhcnNlciIsIndpbmRvdyIsIkRPTVBhcnNlciIsImNyZWF0ZWREb2N1bWVudCIsInBhcnNlRnJvbVN0cmluZyIsIndoaXRlbGlzdEtleXMiLCJPYmplY3QiLCJrZXlzIiwiZWxlbWVudHMiLCJzbGljZSIsImNhbGwiLCJib2R5IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbiIsImVsIiwiZWxOYW1lIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYXR0cmlidXRlTGlzdCIsImF0dHJpYnV0ZXMiLCJ3aGl0ZWxpc3RlZEF0dHJpYnV0ZXMiLCJjb25jYXQiLCJmb3JFYWNoIiwicmVtb3ZlQXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIiQiLCJmbiIsIkNMQVNTX1BSRUZJWCIsIkJTQ0xTX1BSRUZJWF9SRUdFWCIsIkRJU0FMTE9XRURfQVRUUklCVVRFUyIsIkRlZmF1bHRUeXBlIiwiYW5pbWF0aW9uIiwidGVtcGxhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJkZWxheSIsImh0bWwiLCJzZWxlY3RvciIsInBsYWNlbWVudCIsIm9mZnNldCIsImNvbnRhaW5lciIsImZhbGxiYWNrUGxhY2VtZW50IiwiYm91bmRhcnkiLCJzYW5pdGl6ZSIsInBvcHBlckNvbmZpZyIsIkF0dGFjaG1lbnRNYXAiLCJBVVRPIiwiVE9QIiwiUklHSFQiLCJCT1RUT00iLCJMRUZUIiwiRGVmYXVsdCIsIkhvdmVyU3RhdGUiLCJTSE9XIiwiT1VUIiwiRXZlbnQiLCJISURFIiwiSElEREVOIiwiU0hPV04iLCJJTlNFUlRFRCIsIkNMSUNLIiwiRk9DVVNJTiIsIkZPQ1VTT1VUIiwiTU9VU0VFTlRFUiIsIk1PVVNFTEVBVkUiLCJDbGFzc05hbWUiLCJGQURFIiwiU2VsZWN0b3IiLCJUT09MVElQIiwiVE9PTFRJUF9JTk5FUiIsIkFSUk9XIiwiVHJpZ2dlciIsIkhPVkVSIiwiRk9DVVMiLCJNQU5VQUwiLCJUb29sdGlwIiwiZWxlbWVudCIsImNvbmZpZyIsIlBvcHBlciIsIlR5cGVFcnJvciIsIl9pc0VuYWJsZWQiLCJfdGltZW91dCIsIl9ob3ZlclN0YXRlIiwiX2FjdGl2ZVRyaWdnZXIiLCJfcG9wcGVyIiwiX2dldENvbmZpZyIsInRpcCIsIl9zZXRMaXN0ZW5lcnMiLCJlbmFibGUiLCJkaXNhYmxlIiwidG9nZ2xlRW5hYmxlZCIsInRvZ2dsZSIsImV2ZW50IiwiZGF0YUtleSIsImNvbnN0cnVjdG9yIiwiY29udGV4dCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhIiwiX2dldERlbGVnYXRlQ29uZmlnIiwiY2xpY2siLCJfaXNXaXRoQWN0aXZlVHJpZ2dlciIsIl9lbnRlciIsIl9sZWF2ZSIsImdldFRpcEVsZW1lbnQiLCJoYXNDbGFzcyIsImRpc3Bvc2UiLCJjbGVhclRpbWVvdXQiLCJyZW1vdmVEYXRhIiwib2ZmIiwiY2xvc2VzdCIsIl9oaWRlTW9kYWxIYW5kbGVyIiwicmVtb3ZlIiwiZGVzdHJveSIsInNob3ciLCJjc3MiLCJFcnJvciIsInNob3dFdmVudCIsImlzV2l0aENvbnRlbnQiLCJzaGFkb3dSb290IiwiVXRpbCIsImZpbmRTaGFkb3dSb290IiwiaXNJblRoZURvbSIsImNvbnRhaW5zIiwib3duZXJEb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImlzRGVmYXVsdFByZXZlbnRlZCIsInRpcElkIiwiZ2V0VUlEIiwic2V0QXR0cmlidXRlIiwic2V0Q29udGVudCIsImFkZENsYXNzIiwiYXR0YWNobWVudCIsIl9nZXRBdHRhY2htZW50IiwiYWRkQXR0YWNobWVudENsYXNzIiwiX2dldENvbnRhaW5lciIsImFwcGVuZFRvIiwiX2dldFBvcHBlckNvbmZpZyIsImRvY3VtZW50IiwiY2hpbGRyZW4iLCJvbiIsIm5vb3AiLCJjb21wbGV0ZSIsIl9maXhUcmFuc2l0aW9uIiwicHJldkhvdmVyU3RhdGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCIsIm9uZSIsIlRSQU5TSVRJT05fRU5EIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJoaWRlIiwiY2FsbGJhY2siLCJoaWRlRXZlbnQiLCJfY2xlYW5UaXBDbGFzcyIsInJlbW92ZUNsYXNzIiwidXBkYXRlIiwic2NoZWR1bGVVcGRhdGUiLCJnZXRUaXRsZSIsInNldEVsZW1lbnRDb250ZW50IiwiJGVsZW1lbnQiLCJjb250ZW50Iiwibm9kZVR5cGUiLCJqcXVlcnkiLCJwYXJlbnQiLCJpcyIsImVtcHR5IiwiYXBwZW5kIiwidGV4dCIsImdldEF0dHJpYnV0ZSIsImRlZmF1bHRCc0NvbmZpZyIsIm1vZGlmaWVycyIsIl9nZXRPZmZzZXQiLCJmbGlwIiwiYmVoYXZpb3IiLCJhcnJvdyIsInByZXZlbnRPdmVyZmxvdyIsImJvdW5kYXJpZXNFbGVtZW50Iiwib25DcmVhdGUiLCJvcmlnaW5hbFBsYWNlbWVudCIsIl9oYW5kbGVQb3BwZXJQbGFjZW1lbnRDaGFuZ2UiLCJvblVwZGF0ZSIsIm9mZnNldHMiLCJpc0VsZW1lbnQiLCJmaW5kIiwidG9VcHBlckNhc2UiLCJ0cmlnZ2VycyIsInNwbGl0IiwiZXZlbnRJbiIsImV2ZW50T3V0IiwiX2ZpeFRpdGxlIiwidGl0bGVUeXBlIiwidHlwZSIsInNldFRpbWVvdXQiLCJkYXRhQXR0cmlidXRlcyIsImRhdGFBdHRyIiwidG9TdHJpbmciLCJ0eXBlQ2hlY2tDb25maWciLCJrZXkiLCIkdGlwIiwidGFiQ2xhc3MiLCJqb2luIiwicG9wcGVyRGF0YSIsInBvcHBlckluc3RhbmNlIiwiaW5zdGFuY2UiLCJwb3BwZXIiLCJpbml0Q29uZmlnQW5pbWF0aW9uIiwiX2pRdWVyeUludGVyZmFjZSIsImVhY2giLCJfY29uZmlnIiwidGVzdCIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTs7Ozs7O0VBT0EsSUFBTUEsUUFBUSxHQUFHLENBQ2YsWUFEZSxFQUVmLE1BRmUsRUFHZixNQUhlLEVBSWYsVUFKZSxFQUtmLFVBTGUsRUFNZixRQU5lLEVBT2YsS0FQZSxFQVFmLFlBUmUsQ0FBakI7RUFXQSxJQUFNQyxzQkFBc0IsR0FBRyxnQkFBL0I7QUFFQSxFQUFPLElBQU1DLGdCQUFnQixHQUFHO0VBQzlCO0VBQ0EsT0FBSyxDQUFDLE9B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
