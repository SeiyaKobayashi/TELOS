!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){return e.ui=e.ui||{},e.ui.version="1.12.1"}),
/*!
 * jQuery UI Scroll Parent 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){return e.fn.scrollParent=function(n){var t=this.css("position"),i="absolute"===t,o=n?/(auto|scroll|hidden)/:/(auto|scroll)/,r=this.parents().filter(function(){var n=e(this);return(!i||"static"!==n.css("position"))&&o.test(n.css("overflow")+n.css("overflow-y")+n.css("overflow-x"))}).eq(0);return"fixed"!==t&&r.length?r:e(this[0].ownerDocument||document)}});