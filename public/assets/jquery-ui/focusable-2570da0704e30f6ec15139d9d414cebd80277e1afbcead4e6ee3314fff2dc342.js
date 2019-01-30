!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){return e.ui=e.ui||{},e.ui.version="1.12.1"}),
/*!
 * jQuery UI Focusable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){function i(e){for(var i=e.css("visibility");"inherit"===i;)i=(e=e.parent()).css("visibility");return"hidden"!==i}return e.ui.focusable=function(n,t){var u,r,o,a,s,f=n.nodeName.toLowerCase();return"area"===f?(r=(u=n.parentNode).name,!(!n.href||!r||"map"!==u.nodeName.toLowerCase())&&((o=e("img[usemap='#"+r+"']")).length>0&&o.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(f)?(a=!n.disabled)&&(s=e(n).closest("fieldset")[0])&&(a=!s.disabled):a="a"===f&&n.href||t,a&&e(n).is(":visible")&&i(e(n)))},e.extend(e.expr[":"],{focusable:function(i){return e.ui.focusable(i,null!=e.attr(i,"tabindex"))}}),e.ui.focusable});