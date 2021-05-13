/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/scroll-out/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/scroll-out/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function clamp(v, min, max) {
  return min > v ? min : max < v ? max : v;
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function round(n) {
  return Math.round(n * 10000) / 10000;
}

var cache = {};

function replacer(match) {
  return '-' + match[0].toLowerCase();
}

function hyphenate(value) {
  return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
}
/** find elements */


function $(e, parent) {
  return !e || e.length === 0 ? // null or empty string returns empty array
  [] : e.nodeName ? // a single element is wrapped in an array
  [e] : // selector and NodeList are converted to Element[]
  [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
}

function setAttrs(el, attrs) {
  // tslint:disable-next-line:forin
  for (var key in attrs) {
    if (key.indexOf('_')) {
      el.setAttribute('data-' + hyphenate(key), attrs[key]);
    }
  }
}

function setProps(cssProps) {
  return function (el, props) {
    for (var key in props) {
      if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
        el.style.setProperty('--' + hyphenate(key), round(props[key]));
      }
    }
  };
}

var clearTask;
var subscribers = [];

function loop() {
  clearTask = 0;
  subscribers.slice().forEach(function (s2) {
    return s2();
  });
  enqueue();
}

function enqueue() {
  if (!clearTask && subscribers.length) {
    clearTask = requestAnimationFrame(loop);
  }
}

function subscribe(fn) {
  subscribers.push(fn);
  enqueue();
  return function () {
    subscribers = subscribers.filter(function (s) {
      return s !== fn;
    });

    if (!subscribers.length && clearTask) {
      cancelAnimationFrame(clearTask);
      clearTask = 0;
    }
  };
}

function unwrap(value, el, ctx, doc) {
  return typeof value === 'function' ? value(el, ctx, doc) : value;
}

function noop() {}
/**
 * Creates a new instance of ScrollOut that marks elements in the viewport with
 * an "in" class and marks elements outside of the viewport with an "out"
 */
// tslint:disable-next-line:no-default-export


function main(opts) {
  // Apply default options.
  opts = opts || {}; // Debounce onChange/onHidden/onShown.

  var onChange = opts.onChange || noop;
  var onHidden = opts.onHidden || noop;
  var onShown = opts.onShown || noop;
  var onScroll = opts.onScroll || noop;
  var props = opts.cssProps ? setProps(opts.cssProps) : noop;
  var se = opts.scrollingElement;
  var container = se ? $(se)[0] : window;
  var doc = se ? $(se)[0] : document.documentElement;
  var rootChanged = false;
  var scrollingElementContext = {};
  var elementContextList = [];
  var clientOffsetX, clientOffsety;
  var sub;

  function index() {
    elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) {
      return {
        element: el
      };
    });
  }

  function update() {
    // Calculate position, direction and ratio.
    var clientWidth = doc.clientWidth;
    var clientHeight = doc.clientHeight;
    var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
    var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
    var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
    var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1); // Detect if the root context has changed.

    rootChanged = rootChanged || scrollingElementContext.scrollDirX !== scrollDirX || scrollingElementContext.scrollDirY !== scrollDirY || scrollingElementContext.scrollPercentX !== scrollPercentX || scrollingElementContext.scrollPercentY !== scrollPercentY;
    scrollingElementContext.scrollDirX = scrollDirX;
    scrollingElementContext.scrollDirY = scrollDirY;
    scrollingElementContext.scrollPercentX = scrollPercentX;
    scrollingElementContext.scrollPercentY = scrollPercentY;
    var childChanged = false;

    for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
      var ctx = elementContextList[index_1];
      var element = ctx.element; // find the distance from the element to the scrolling container

      var target = element;
      var offsetX = 0;
      var offsetY = 0;

      do {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
        target = target.offsetParent;
      } while (target && target !== container); // Get element dimensions.


      var elementHeight = element.clientHeight || element.offsetHeight || 0;
      var elementWidth = element.clientWidth || element.offsetWidth || 0; // Find visible ratios for each element.

      var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) - clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) / elementWidth;
      var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) - clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) / elementHeight;
      var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
      var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
      var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
      var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
      var visible = void 0;

      if (opts.offset) {
        visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
      } else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
        visible = 1;
      } else {
        visible = 0;
      }

      var changedVisible = ctx.visible !== visible;
      var changed = ctx._changed || changedVisible || ctx.visibleX !== visibleX || ctx.visibleY !== visibleY || ctx.index !== index_1 || ctx.elementHeight !== elementHeight || ctx.elementWidth !== elementWidth || ctx.offsetX !== offsetX || ctx.offsetY !== offsetY || ctx.intersectX !== ctx.intersectX || ctx.intersectY !== ctx.intersectY || ctx.viewportX !== viewportX || ctx.viewportY !== viewportY;

      if (changed) {
        childChanged = true;
        ctx._changed = true;
        ctx._visibleChanged = changedVisible;
        ctx.visible = visible;
        ctx.elementHeight = elementHeight;
        ctx.elementWidth = elementWidth;
        ctx.index = index_1;
        ctx.offsetX = offsetX;
        ctx.offsetY = offsetY;
        ctx.visibleX = visibleX;
        ctx.visibleY = visibleY;
        ctx.intersectX = intersectX;
        ctx.intersectY = intersectY;
        ctx.viewportX = viewportX;
        ctx.viewportY = viewportY;
        ctx.visible = visible;
      }
    }

    if (!sub && (rootChanged || childChanged)) {
      sub = subscribe(render);
    }
  }

  function render() {
    maybeUnsubscribe(); // Update root attributes if they have changed.

    if (rootChanged) {
      rootChanged = false;
      setAttrs(doc, {
        scrollDirX: scrollingElementContext.scrollDirX,
        scrollDirY: scrollingElementContext.scrollDirY
      });
      props(doc, scrollingElementContext);
      onScroll(doc, scrollingElementContext, elementContextList);
    }

    var len = elementContextList.length;

    for (var x = len - 1; x > -1; x--) {
      var ctx = elementContextList[x];
      var el = ctx.element;
      var visible = ctx.visible;
      var justOnce = el.hasAttribute('scrollout-once') || false; // Once

      if (ctx._changed) {
        ctx._changed = false;
        props(el, ctx);
      }

      if (ctx._visibleChanged) {
        setAttrs(el, {
          scroll: visible ? 'in' : 'out'
        });
        onChange(el, ctx, doc);
        (visible ? onShown : onHidden)(el, ctx, doc);
      } // if this is shown multiple times, keep it in the list


      if (visible && (opts.once || justOnce)) {
        // or if this element just display it once
        elementContextList.splice(x, 1);
      }
    }
  }

  function maybeUnsubscribe() {
    if (sub) {
      sub();
      sub = undefined;
    }
  } // Run initialize index.


  index();
  update();
  render(); // Collapses sequential updates into a single update.

  var updateTaskId = 0;

  var onUpdate = function onUpdate() {
    updateTaskId = updateTaskId || setTimeout(function () {
      updateTaskId = 0;
      update();
    }, 0);
  }; // Hook up document listeners to automatically detect changes.


  window.addEventListener('resize', onUpdate);
  container.addEventListener('scroll', onUpdate);
  return {
    index: index,
    update: update,
    teardown: function teardown() {
      maybeUnsubscribe();
      window.removeEventListener('resize', onUpdate);
      container.removeEventListener('scroll', onUpdate);
    }
  };
}

module.exports = main;

/***/ }),

/***/ "./src/js/helpers/randomImg.js":
/*!*************************************!*\
  !*** ./src/js/helpers/randomImg.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function renderGalleryItem() {
  var _arguments = arguments;

  var _loop = function _loop(i) {
    var imageId = _arguments[i];
    var randomNumber = Math.floor(Math.random() * 242);
    fetch("https://source.unsplash.com/collection/1163637/1024x768/?sig=".concat(randomNumber)).then(function (response) {
      document.getElementById(imageId).src = response.url;
    });
  };

  for (var i = 0; i < arguments.length; i++) {
    _loop(i);
  }
} // export default test;


/* harmony default export */ __webpack_exports__["default"] = (renderGalleryItem);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-out */ "./node_modules/scroll-out/lib/index.js");
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_out__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_randomImg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/randomImg.js */ "./src/js/helpers/randomImg.js");
// import bootstrap from 'bootstrap';

 // //Add random unsplash images for development

Object(_helpers_randomImg_js__WEBPACK_IMPORTED_MODULE_1__["default"])('js-random-img-1', 'js-random-img-2', 'js-random-img-3', 'js-random-img-4'); //Confirm jquery is loaded (if necessary, delete for production)
// console.log($);
//This is for the Scroll Out package to properly function. This package makes elements appear on the screen when they come into view on scroll

scroll_out__WEBPACK_IMPORTED_MODULE_0___default()({
  threshold: 0.2,
  once: true
});
/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
// (function ($) {
//   var $window = $(window),
//     $body = $('body'),
//     $wrapper = $('#wrapper');
//   // Play initial animations on page load.
//   $window.on('load', function () {
//     window.setTimeout(function () {
//       $body.removeClass('is-preload');
//     }, 100);
//   });
// })(jQuery);
//Waypoints. This code is used to change navbar on scroll past banner.

var waypoint = new Waypoint({
  element: document.getElementById('js-navbar'),
  handler: function handler() {
    document.getElementById('nav').classList.add('bg-white');
    document.getElementById('nav').classList.remove('bg-transparent');
    var elements = document.getElementsByClassName('nav-link'); // get all elements

    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('text-white');
      elements[i].classList.add('text-dark');
    }
  }
}); // Multiple Carousel slides

$('#carousel-multi-image').on('slide.bs.carousel', function (e) {
  /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  console.log(idx);
  var itemsPerSlide = 4;
  var totalItems = $('#carousel-multi-image .carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);

    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('#carousel-multi-image .carousel-item').eq(i).appendTo('#carousel-multi-image .carousel-inner');
      } else {
        $('#carousel-multi-image .carousel-item').eq(0).appendTo('#carousel-multi-image .carousel-inner');
      }
    }
  }
});

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\John\Documents\webDevelopment\static-site\src\js\index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map