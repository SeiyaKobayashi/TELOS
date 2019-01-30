!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){return e.ui=e.ui||{},e.ui.version="1.12.1"}),function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){return e.ui.escapeSelector=(n=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,function(e){return e.replace(n,"\\$1")});var n}),
/*!
 * jQuery UI Labels 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./version","./escape-selector"],e):e(jQuery)}(function(e){return e.fn.labels=function(){var n,i,t,r,s;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(r=this.eq(0).parents("label"),(t=this.attr("id"))&&(s=(n=this.eq(0).parents().last()).add(n.length?n.siblings():this.siblings()),i="label[for='"+e.ui.escapeSelector(t)+"']",r=r.add(s.find(i).addBack(i))),this.pushStack(r))}});