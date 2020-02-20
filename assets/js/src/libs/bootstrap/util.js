/*!
  * Bootstrap util.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, global.Util = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  return Util;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3V0aWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC40LjEpOiB1dGlsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCdcbmNvbnN0IE1BWF9VSUQgPSAxMDAwMDAwXG5jb25zdCBNSUxMSVNFQ09ORFNfTVVMVElQTElFUiA9IDEwMDBcblxuLy8gU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuZnVuY3Rpb24gdG9UeXBlKG9iaikge1xuICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpXG59XG5cbmZ1bmN0aW9uIGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gIHJldHVybiB7XG4gICAgYmluZFR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgIGRlbGVnYXRlVHlwZTogVFJBTlNJVElPTl9FTkQsXG4gICAgaGFuZGxlKGV2ZW50KSB7XG4gICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgIHJldHVybiBldmVudC5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmRFbXVsYXRvcihkdXJhdGlvbikge1xuICBsZXQgY2FsbGVkID0gZmFsc2VcblxuICAkKHRoaXMpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoKSA9PiB7XG4gICAgY2FsbGVkID0gdHJ1ZVxuICB9KVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMpXG4gICAgfVxuICB9LCBkdXJhdGlvbilcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpIHtcbiAgJC5mbi5lbXVsYXRlVHJhbnNpdGlvbkVuZCA9IHRyYW5zaXRpb25FbmRFbXVsYXRvclxuICAkLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KClcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUHVibGljIFV0aWwgQXBpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFV0aWwgPSB7XG5cbiAgVFJBTlNJVElPTl9FTkQ6ICdic1RyYW5zaXRpb25FbmQnLFxuXG4gIGdldFVJRChwcmVmaXgpIHtcbiAgICBkbyB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKSAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgfSB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4KSlcbiAgICByZXR1cm4gcHJlZml4XG4gIH0sXG5cbiAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgbGV0IHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgICAgY29uc3QgaHJlZkF0dHIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICBzZWxlY3RvciA9IGhyZWZBdHRyICYmIGhyZWZBdHRyICE9PSAnIycgPyBocmVmQXR0ci50cmltKCkgOiAnJ1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPyBzZWxlY3RvciA6IG51bGxcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICBsZXQgdHJhbnNpdGlvbkR1cmF0aW9uID0gJChlbGVtZW50KS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nKVxuICAgIGxldCB0cmFuc2l0aW9uRGVsYXkgPSAkKGVsZW1lbnQpLmNzcygndHJhbnNpdGlvbi1kZWxheScpXG5cbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiA9IHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpXG5cbiAgICAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG4gICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbi5zcGxpdCgnLCcpWzBdXG4gICAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF1cblxuICAgIHJldHVybiAocGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pICsgcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSXG4gIH0sXG5cbiAgcmVmbG93KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgfSxcblxuICB0cmlnZ2VyVHJhbnNpdGlvbkVuZChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS50cmlnZ2VyKFRSQU5TSVRJT05fRU5EKVxuICB9LFxuXG4gIC8vIFRPRE86IFJlbW92ZSBpbiB2NVxuICBzdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oVFJBTlNJVElPTl9FTkQpXG4gIH0sXG5cbiAgaXNFbGVtZW50KG9iaikge1xuICAgIHJldHVybiAob2JqWzBdIHx8IG9iaikubm9kZVR5cGVcbiAgfSxcblxuICB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gY29uZmlnVHlwZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnVHlwZXMsIHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldXG4gICAgICAgIGNvbnN0IHZhbHVlICAgICAgICAgPSBjb25maWdbcHJvcGVydHldXG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSAgICAgPSB2YWx1ZSAmJiBVdGlsLmlzRWxlbWVudCh2YWx1ZSlcbiAgICAgICAgICA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSlcblxuICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpfTogYCArXG4gICAgICAgICAgICBgT3B0aW9uIFwiJHtwcm9wZXJ0eX1cIiBwcm92aWRlZCB0eXBlIFwiJHt2YWx1ZVR5cGV9XCIgYCArXG4gICAgICAgICAgICBgYnV0IGV4cGVjdGVkIHR5cGUgXCIke2V4cGVjdGVkVHlwZXN9XCIuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBmaW5kU2hhZG93Um9vdChlbGVtZW50KSB7XG4gICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoU2hhZG93KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIENhbiBmaW5kIHRoZSBzaGFkb3cgcm9vdCBvdGhlcndpc2UgaXQnbGwgcmV0dXJuIHRoZSBkb2N1bWVudFxuICAgIGlmICh0eXBlb2YgZWxlbWVudC5nZXRSb290Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKVxuICAgICAgcmV0dXJuIHJvb3QgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gcm9vdCA6IG51bGxcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gd2hlbiB3ZSBkb24ndCBmaW5kIGEgc2hhZG93IHJvb3RcbiAgICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gVXRpbC5maW5kU2hhZG93Um9vdChlbGVtZW50LnBhcmVudE5vZGUpXG4gIH0sXG5cbiAgalF1ZXJ5RGV0ZWN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YgJCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkuIGpRdWVyeSBtdXN0IGJlIGluY2x1ZGVkIGJlZm9yZSBCb290c3RyYXBcXCdzIEphdmFTY3JpcHQuJylcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gJC5mbi5qcXVlcnkuc3BsaXQoJyAnKVswXS5zcGxpdCgnLicpXG4gICAgY29uc3QgbWluTWFqb3IgPSAxXG4gICAgY29uc3QgbHRNYWpvciA9IDJcbiAgICBjb25zdCBtaW5NaW5vciA9IDlcbiAgICBjb25zdCBtaW5QYXRjaCA9IDFcbiAgICBjb25zdCBtYXhNYWpvciA9IDRcblxuICAgIGlmICh2ZXJzaW9uWzBdIDwgbHRNYWpvciAmJiB2ZXJzaW9uWzFdIDwgbWluTWlub3IgfHwgdmVyc2lvblswXSA9PT0gbWluTWFqb3IgJiYgdmVyc2lvblsxXSA9PT0gbWluTWlub3IgJiYgdmVyc2lvblsyXSA8IG1pblBhdGNoIHx8IHZlcnNpb25bMF0gPj0gbWF4TWFqb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGF0IGxlYXN0IGpRdWVyeSB2MS45LjEgYnV0IGxlc3MgdGhhbiB2NC4wLjAnKVxuICAgIH1cbiAgfVxufVxuXG5VdGlsLmpRdWVyeURldGVjdGlvbigpXG5zZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpXG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxcbiJdLCJuYW1lcyI6WyJUUkFOU0lUSU9OX0VORCIsIk1BWF9VSUQiLCJNSUxMSVNFQ09ORFNfTVVMVElQTElFUiIsInRvVHlwZSIsIm9iaiIsInRvU3RyaW5nIiwiY2FsbCIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50IiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJldmVudCIsIiQiLCJ0YXJnZXQiLCJpcyIsImhhbmRsZU9iaiIsImhhbmRsZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInRyYW5zaXRpb25FbmRFbXVsYXRvciIsImR1cmF0aW9uIiwiY2FsbGVkIiwib25lIiwiVXRpbCIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyVHJhbnNpdGlvbkVuZCIsInNldFRyYW5zaXRpb25FbmRTdXBwb3J0IiwiZm4iLCJlbXVsYXRlVHJhbnNpdGlvbkVuZCIsInNwZWNpYWwiLCJnZXRVSUQiLCJwcmVmaXgiLCJNYXRoIiwicmFuZG9tIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldFNlbGVjdG9yRnJvbUVsZW1lbnQiLCJlbGVtZW50Iiwic2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJocmVmQXR0ciIsInRyaW0iLCJxdWVyeVNlbGVjdG9yIiwiZXJyIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjc3MiLCJ0cmFuc2l0aW9uRGVsYXkiLCJmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJmbG9hdFRyYW5zaXRpb25EZWxheSIsInNwbGl0IiwicmVmbG93Iiwib2Zmc2V0SGVpZ2h0IiwidHJpZ2dlciIsInN1cHBvcnRzVHJhbnNpdGlvbkVuZCIsIkJvb2xlYW4iLCJpc0VsZW1lbnQiLCJub2RlVHlwZSIsInR5cGVDaGVja0NvbmZpZyIsImNvbXBvbmVudE5hbWUiLCJjb25maWciLCJjb25maWdUeXBlcyIsInByb3BlcnR5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJleHBlY3RlZFR5cGVzIiwidmFsdWUiLCJ2YWx1ZVR5cGUiLCJSZWdFeHAiLCJ0ZXN0IiwiRXJyb3IiLCJ0b1VwcGVyQ2FzZSIsImZpbmRTaGFkb3dSb290IiwiZG9jdW1lbnRFbGVtZW50IiwiYXR0YWNoU2hhZG93IiwiZ2V0Um9vdE5vZGUiLCJyb290IiwiU2hhZG93Um9vdCIsInBhcmVudE5vZGUiLCJqUXVlcnlEZXRlY3Rpb24iLCJUeXBlRXJyb3IiLCJ2ZXJzaW9uIiwianF1ZXJ5IiwibWluTWFqb3IiLCJsdE1ham9yIiwibWluTWlub3IiLCJtaW5QYXRjaCIsIm1heE1ham9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBQUE7Ozs7OztBQU9BLEVBRUE7Ozs7OztFQU1BLElBQU1BLGNBQWMsR0FBRyxlQUF2QjtFQUNBLElBQU1DLE9BQU8sR0FBRyxPQUFoQjtFQUNBLElBQU1DLHVCQUF1QixHQUFHLElBQWhDOztFQUdBLFNBQVNDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0VBQ25CLFNBQU8sR0FBR0MsUUFBSCxDQUFZQyxJQUFaLENBQWlCRixHQUFqQixFQUFzQkcsS0FBdEIsQ0FBNEIsYUFBNUIsRUFBMkMsQ0FBM0MsRUFBOENDLFdBQTlDLEVBQVA7RUFDRDs7RUFFRCxTQUFTQyw0QkFBVCxHQUF3QztFQUN0QyxTQUFPO0VBQ0xDLElBQUFBLFFBQVEsRUFB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
