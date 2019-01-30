!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){return e.ui=e.ui||{},e.ui.version="1.12.1"}),
/*!
 * jQuery UI Effects 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){var t,n="ui-effects-",i="ui-effects-style",o="ui-effects-animated",r=e;return e.effects={effect:{}},
/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
function(e,t){function n(e,t,n){var i=d[t.type]||{};return null==e?n||!t.def?null:t.def:(e=i.floor?~~e:parseFloat(e),isNaN(e)?t.def:i.mod?(e+i.mod)%i.mod:0>e?0:i.max<e?i.max:e)}function i(t){var n=c(),i=n._rgba=[];return t=t.toLowerCase(),p(a,function(e,o){var r,s=o.re.exec(t),f=s&&o.parse(s),a=o.space||"rgba";if(f)return r=n[a](f),n[u[a].cache]=r[u[a].cache],i=n._rgba=r._rgba,!1}),i.length?("0,0,0,0"===i.join()&&e.extend(i,r.transparent),n):r[t]}function o(e,t,n){return 6*(n=(n+1)%1)<1?e+(t-e)*n*6:2*n<1?t:3*n<2?e+(t-e)*(2/3-n)*6:e}var r,s="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",f=/^([\-+])=\s*(\d+\.?\d*)/,a=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],c=e.Color=function(t,n,i,o){return new e.Color.fn.parse(t,n,i,o)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},l=c.support={},h=e("<p>")[0],p=e.each;h.style.cssText="background-color:rgba(1,1,1,.5)",l.rgba=h.style.backgroundColor.indexOf("rgba")>-1,p(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),c.fn=e.extend(c.prototype,{parse:function(o,s,f,a){if(o===t)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=e(o).css(s),s=t);var d=this,l=e.type(o),h=this._rgba=[];return s!==t&&(o=[o,s,f,a],l="array"),"string"===l?this.parse(i(o)||r._default):"array"===l?(p(u.rgba.props,function(e,t){h[t.idx]=n(o[t.idx],t)}),this):"object"===l?(p(u,o instanceof c?function(e,t){o[t.cache]&&(d[t.cache]=o[t.cache].slice())}:function(t,i){var r=i.cache;p(i.props,function(e,t){if(!d[r]&&i.to){if("alpha"===e||null==o[e])return;d[r]=i.to(d._rgba)}d[r][t.idx]=n(o[e],t,!0)}),d[r]&&e.inArray(null,d[r].slice(0,3))<0&&(d[r][3]=1,i.from&&(d._rgba=i.from(d[r])))}),this):void 0},is:function(e){var t=c(e),n=!0,i=this;return p(u,function(e,o){var r,s=t[o.cache];return s&&(r=i[o.cache]||o.to&&o.to(i._rgba)||[],p(o.props,function(e,t){if(null!=s[t.idx])return n=s[t.idx]===r[t.idx]})),n}),n},_space:function(){var e=[],t=this;return p(u,function(n,i){t[i.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var i=c(e),o=i._space(),r=u[o],s=0===this.alpha()?c("transparent"):this,f=s[r.cache]||r.to(s._rgba),a=f.slice();return i=i[r.cache],p(r.props,function(e,o){var r=o.idx,s=f[r],c=i[r],u=d[o.type]||{};null!==c&&(null===s?a[r]=c:(u.mod&&(c-s>u.mod/2?s+=u.mod:s-c>u.mod/2&&(s-=u.mod)),a[r]=n((c-s)*t+s,o)))}),this[o](a)},blend:function(t){if(1===this._rgba[3])return this;var n=this._rgba.slice(),i=n.pop(),o=c(t)._rgba;return c(e.map(n,function(e,t){return(1-i)*o[t]+i*e}))},toRgbaString:function(){var t="rgba(",n=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===n[3]&&(n.pop(),t="rgb("),t+n.join()+")"},toHslaString:function(){var t="hsla(",n=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&t<3&&(e=Math.round(100*e)+"%"),e});return 1===n[3]&&(n.pop(),t="hsl("),t+n.join()+")"},toHexString:function(t){var n=this._rgba.slice(),i=n.pop();return t&&n.push(~~(255*i)),"#"+e.map(n,function(e){return 1===(e=(e||0).toString(16)).length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),c.fn.parse.prototype=c.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,n,i=e[0]/255,o=e[1]/255,r=e[2]/255,s=e[3],f=Math.max(i,o,r),a=Math.min(i,o,r),c=f-a,u=f+a,d=.5*u;return t=a===f?0:i===f?60*(o-r)/c+360:o===f?60*(r-i)/c+120:60*(i-o)/c+240,n=0===c?0:d<=.5?c/u:c/(2-u),[Math.round(t)%360,n,d,null==s?1:s]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,n=e[1],i=e[2],r=e[3],s=i<=.5?i*(1+n):i+n-i*n,f=2*i-s;return[Math.round(255*o(f,s,t+1/3)),Math.round(255*o(f,s,t)),Math.round(255*o(f,s,t-1/3)),r]},p(u,function(i,o){var r=o.props,s=o.cache,a=o.to,u=o.from;c.fn[i]=function(i){if(a&&!this[s]&&(this[s]=a(this._rgba)),i===t)return this[s].slice();var o,f=e.type(i),d="array"===f||"object"===f?i:arguments,l=this[s].slice();return p(r,function(e,t){var i=d["object"===f?e:t.idx];null==i&&(i=l[t.idx]),l[t.idx]=n(i,t)}),u?((o=c(u(l)))[s]=l,o):c(l)},p(r,function(t,n){c.fn[t]||(c.fn[t]=function(o){var r,s=e.type(o),a="alpha"===t?this._hsla?"hsla":"rgba":i,c=this[a](),u=c[n.idx];return"undefined"===s?u:("function"===s&&(o=o.call(this,u),s=e.type(o)),null==o&&n.empty?this:("string"===s&&(r=f.exec(o))&&(o=u+parseFloat(r[2])*("+"===r[1]?1:-1)),c[n.idx]=o,this[a](c)))})})}),c.hook=function(t){var n=t.split(" ");p(n,function(t,n){e.cssHooks[n]={set:function(t,o){var r,s,f="";if("transparent"!==o&&("string"!==e.type(o)||(r=i(o)))){if(o=c(r||o),!l.rgba&&1!==o._rgba[3]){for(s="backgroundColor"===n?t.parentNode:t;(""===f||"transparent"===f)&&s&&s.style;)try{f=e.css(s,"backgroundColor"),s=s.parentNode}catch(a){}o=o.blend(f&&"transparent"!==f?f:"_default")}o=o.toRgbaString()}try{t.style[n]=o}catch(a){}}},e.fx.step[n]=function(t){t.colorInit||(t.start=c(t.elem,n),t.end=c(t.end),t.colorInit=!0),e.cssHooks[n].set(t.elem,t.start.transition(t.end,t.pos))}})},c.hook(s),e.cssHooks.borderColor={expand:function(e){var t={};return p(["Top","Right","Bottom","Left"],function(n,i){t["border"+i+"Color"]=e}),t}},r=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(r),function(){function t(t){var n,i,o=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,r={};if(o&&o.length&&o[0]&&o[o[0]])for(i=o.length;i--;)"string"==typeof o[n=o[i]]&&(r[e.camelCase(n)]=o[n]);else for(n in o)"string"==typeof o[n]&&(r[n]=o[n]);return r}function n(t,n){var i,o,r={};for(i in n)o=n[i],t[i]!==o&&(s[i]||!e.fx.step[i]&&isNaN(parseFloat(o))||(r[i]=o));return r}var i,o=["add","remove","toggle"],s={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(r.style(e.elem,n,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(i,r,s,f){var a=e.speed(r,s,f);return this.queue(function(){var r,s=e(this),f=s.attr("class")||"",c=a.children?s.find("*").addBack():s;c=c.map(function(){return{el:e(this),start:t(this)}}),(r=function(){e.each(o,function(e,t){i[t]&&s[t+"Class"](i[t])})})(),c=c.map(function(){return this.end=t(this.el[0]),this.diff=n(this.start,this.end),this}),s.attr("class",f),c=c.map(function(){var t=this,n=e.Deferred(),i=e.extend({},a,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,i),n.promise()}),e.when.apply(e,c.get()).done(function(){r(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),a.complete.call(s[0])})})},e.fn.extend({addClass:(i=e.fn.addClass,function(t,n,o,r){return n?e.effects.animateClass.call(this,{add:t},n,o,r):i.apply(this,arguments)}),removeClass:function(t){return function(n,i,o,r){return arguments.length>1?e.effects.animateClass.call(this,{remove:n},i,o,r):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(n,i,o,r,s){return"boolean"==typeof i||i===undefined?o?e.effects.animateClass.call(this,i?{add:n}:{remove:n},o,r,s):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:n},i,o,r)}}(e.fn.toggleClass),switchClass:function(t,n,i,o,r){return e.effects.animateClass.call(this,{add:n,remove:t},i,o,r)}})}(),function(){function t(t,n,i,o){return e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},null==n&&(n={}),e.isFunction(n)&&(o=n,i=null,n={}),("number"==typeof n||e.fx.speeds[n])&&(o=i,i=n,n={}),e.isFunction(i)&&(o=i,i=null),n&&e.extend(t,n),i=i||n.duration,t.duration=e.fx.off?0:"number"==typeof i?i:i in e.fx.speeds?e.fx.speeds[i]:e.fx.speeds._default,t.complete=o||n.complete,t}function r(t){return!(t&&"number"!=typeof t&&!e.fx.speeds[t])||("string"==typeof t&&!e.effects.effect[t]||(!!e.isFunction(t)||"object"==typeof t&&!t.effect))}function s(e,t){var n=t.outerWidth(),i=t.outerHeight(),o=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(e)||["",0,n,i,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?n:parseFloat(o[2]),bottom:"auto"===o[3]?i:parseFloat(o[3]),left:parseFloat(o[4])||0}}var f;e.expr&&e.expr.filters&&e.expr.filters.animated&&(e.expr.filters.animated=(f=e.expr.filters.animated,function(t){return!!e(t).data(o)||f(t)})),!1!==e.uiBackCompat&&e.extend(e.effects,{save:function(e,t){for(var i=0,o=t.length;i<o;i++)null!==t[i]&&e.data(n+t[i],e[0].style[t[i]])},restore:function(e,t){for(var i,o=0,r=t.length;o<r;o++)null!==t[o]&&(i=e.data(n+t[o]),e.css(t[o],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),float:t.css("float")},i=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),o={width:t.width(),height:t.height()},r=document.activeElement;try{r.id}catch(s){r=document.body}return t.wrap(i),(t[0]===r||e.contains(t[0],r))&&e(r).trigger("focus"),i=t.parent(),"static"===t.css("position")?(i.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,i){n[i]=t.css(i),isNaN(parseInt(n[i],10))&&(n[i]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(o),i.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).trigger("focus")),t}}),e.extend(e.effects,{version:"1.12.1",define:function(t,n,i){return i||(i=n,n="effect"),e.effects.effect[t]=i,e.effects.effect[t].mode=n,i},scaledDimensions:function(e,t,n){if(0===t)return{height:0,width:0,outerHeight:0,outerWidth:0};var i="horizontal"!==n?(t||100)/100:1,o="vertical"!==n?(t||100)/100:1;return{height:e.height()*o,width:e.width()*i,outerHeight:e.outerHeight()*o,outerWidth:e.outerWidth()*i}},clipToBox:function(e){return{width:e.clip.right-e.clip.left,height:e.clip.bottom-e.clip.top,left:e.clip.left,top:e.clip.top}},unshift:function(e,t,n){var i=e.queue();t>1&&i.splice.apply(i,[1,0].concat(i.splice(t,n))),e.dequeue()},saveStyle:function(e){e.data(i,e[0].style.cssText)},restoreStyle:function(e){e[0].style.cssText=e.data(i)||"",e.removeData(i)},mode:function(e,t){var n=e.is(":hidden");return"toggle"===t&&(t=n?"show":"hide"),(n?"hide"===t:"show"===t)&&(t="none"),t},getBaseline:function(e,t){var n,i;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":i=0;break;case"center":i=.5;break;case"right":i=1;break;default:i=e[1]/t.width}return{x:i,y:n}},createPlaceholder:function(t){var i,o=t.css("position"),r=t.position();return t.css({marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),/^(static|relative)/.test(o)&&(o="absolute",i=e("<"+t[0].nodeName+">").insertAfter(t).css({display:/^(inline|ruby)/.test(t.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight"),float:t.css("float")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),t.data(n+"placeholder",i)),t.css({position:o,left:r.left,top:r.top}),i},removePlaceholder:function(e){var t=n+"placeholder",i=e.data(t);i&&(i.remove(),e.removeData(t))},cleanUp:function(t){e.effects.restoreStyle(t),e.effects.removePlaceholder(t)},setTransition:function(t,n,i,o){return o=o||{},e.each(n,function(e,n){var r=t.cssUnit(n);r[0]>0&&(o[n]=r[0]*i+r[1])}),o}}),e.fn.extend({effect:function(){function n(t){function n(){a.removeData(o),e.effects.cleanUp(a),"hide"===i.mode&&a.hide(),f()}function f(){e.isFunction(c)&&c.call(a[0]),e.isFunction(t)&&t()}var a=e(this);i.mode=d.shift(),!1===e.uiBackCompat||s?"none"===i.mode?(a[u](),f()):r.call(a[0],i,n):(a.is(":hidden")?"hide"===u:"show"===u)?(a[u](),f()):r.call(a[0],i,f)}var i=t.apply(this,arguments),r=e.effects.effect[i.effect],s=r.mode,f=i.queue,a=f||"fx",c=i.complete,u=i.mode,d=[],l=function(t){var n=e(this),i=e.effects.mode(n,u)||s;n.data(o,!0),d.push(i),s&&("show"===i||i===s&&"hide"===i)&&n.show(),s&&"none"===i||e.effects.saveStyle(n),e.isFunction(t)&&t()};return e.fx.off||!r?u?this[u](i.duration,c):this.each(function(){c&&c.call(this)}):!1===f?this.each(l).each(n):this.queue(a,l).queue(a,n)},show:function(e){return function(n){if(r(n))return e.apply(this,arguments);var i=t.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(e.fn.show),hide:function(e){return function(n){if(r(n))return e.apply(this,arguments);var i=t.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(e.fn.hide),toggle:function(e){return function(n){if(r(n)||"boolean"==typeof n)return e.apply(this,arguments);var i=t.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(e.fn.toggle),cssUnit:function(t){var n=this.css(t),i=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(i=[parseFloat(n),t])}),i},cssClip:function(e){return e?this.css("clip","rect("+e.top+"px "+e.right+"px "+e.bottom+"px "+e.left+"px)"):s(this.css("clip"),this)},transfer:function(t,n){var i=e(this),o=e(t.to),r="fixed"===o.css("position"),s=e("body"),f=r?s.scrollTop():0,a=r?s.scrollLeft():0,c=o.offset(),u={top:c.top-f,left:c.left-a,height:o.innerHeight(),width:o.innerWidth()},d=i.offset(),l=e("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({top:d.top-f,left:d.left-a,height:i.innerHeight(),width:i.innerWidth(),position:r?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){l.remove(),e.isFunction(n)&&n()})}}),e.fx.step.clip=function(t){t.clipInit||(t.start=e(t.elem).cssClip(),"string"==typeof t.end&&(t.end=s(t.end,t.elem)),t.clipInit=!0),e(t.elem).cssClip({top:t.pos*(t.end.top-t.start.top)+t.start.top,right:t.pos*(t.end.right-t.start.right)+t.start.right,bottom:t.pos*(t.end.bottom-t.start.bottom)+t.start.bottom,left:t.pos*(t.end.left-t.start.left)+t.start.left})}}(),t={},e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?n(2*e)/2:1-n(-2*e+2)/2}}),e.effects}),
/*!
 * jQuery UI Effects Blind 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("blind","hide",function(t,n){var i={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},o=e(this),r=t.direction||"up",s=o.cssClip(),f={clip:e.extend({},s)},a=e.effects.createPlaceholder(o);f.clip[i[r][0]]=f.clip[i[r][1]],"show"===t.mode&&(o.cssClip(f.clip),a&&a.css(e.effects.clipToBox(f)),f.clip=s),a&&a.animate(e.effects.clipToBox(f),t.duration,t.easing),o.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Bounce 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("bounce",function(t,n){var i,o,r,s=e(this),f=t.mode,a="hide"===f,c="show"===f,u=t.direction||"up",d=t.distance,l=t.times||5,h=2*l+(c||a?1:0),p=t.duration/h,m=t.easing,g="up"===u||"down"===u?"top":"left",y="up"===u||"left"===u,v=0,b=s.queue().length;for(e.effects.createPlaceholder(s),r=s.css(g),d||(d=s["top"===g?"outerHeight":"outerWidth"]()/3),c&&((o={opacity:1})[g]=r,s.css("opacity",0).css(g,y?2*-d:2*d).animate(o,p,m)),a&&(d/=Math.pow(2,l-1)),(o={})[g]=r;v<l;v++)(i={})[g]=(y?"-=":"+=")+d,s.animate(i,p,m).animate(o,p,m),d=a?2*d:d/2;a&&((i={opacity:0})[g]=(y?"-=":"+=")+d,s.animate(i,p,m)),s.queue(n),e.effects.unshift(s,b,h+1)})}),
/*!
 * jQuery UI Effects Clip 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("clip","hide",function(t,n){var i,o={},r=e(this),s=t.direction||"vertical",f="both"===s,a=f||"horizontal"===s,c=f||"vertical"===s;i=r.cssClip(),o.clip={top:c?(i.bottom-i.top)/2:i.top,right:a?(i.right-i.left)/2:i.right,bottom:c?(i.bottom-i.top)/2:i.bottom,left:a?(i.right-i.left)/2:i.left},e.effects.createPlaceholder(r),"show"===t.mode&&(r.cssClip(o.clip),o.clip=i),r.animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Drop 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("drop","hide",function(t,n){var i,o=e(this),r="show"===t.mode,s=t.direction||"left",f="up"===s||"down"===s?"top":"left",a="up"===s||"left"===s?"-=":"+=",c="+="===a?"-=":"+=",u={opacity:0};e.effects.createPlaceholder(o),i=t.distance||o["top"===f?"outerHeight":"outerWidth"](!0)/2,u[f]=a+i,r&&(o.css(u),u[f]=c+i,u.opacity=1),o.animate(u,{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Explode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("explode","hide",function(t,n){function i(){v.push(this),v.length===d*l&&o()}function o(){h.css({visibility:"visible"}),e(v).remove(),n()}var r,s,f,a,c,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,l=d,h=e(this),p="show"===t.mode,m=h.show().css("visibility","hidden").offset(),g=Math.ceil(h.outerWidth()/l),y=Math.ceil(h.outerHeight()/d),v=[];for(r=0;r<d;r++)for(a=m.top+r*y,u=r-(d-1)/2,s=0;s<l;s++)f=m.left+s*g,c=s-(l-1)/2,h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-s*g,top:-r*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g,height:y,left:f+(p?c*g:0),top:a+(p?u*y:0),opacity:p?0:1}).animate({left:f+(p?0:c*g),top:a+(p?0:u*y),opacity:p?1:0},t.duration||500,t.easing,i)})}),
/*!
 * jQuery UI Effects Fade 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("fade","toggle",function(t,n){var i="show"===t.mode;e(this).css("opacity",i?0:1).animate({opacity:i?1:0},{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Fold 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("fold","hide",function(t,n){var i=e(this),o=t.mode,r="show"===o,s="hide"===o,f=t.size||15,a=/([0-9]+)%/.exec(f),c=!!t.horizFirst?["right","bottom"]:["bottom","right"],u=t.duration/2,d=e.effects.createPlaceholder(i),l=i.cssClip(),h={clip:e.extend({},l)},p={clip:e.extend({},l)},m=[l[c[0]],l[c[1]]],g=i.queue().length;a&&(f=parseInt(a[1],10)/100*m[s?0:1]),h.clip[c[0]]=f,p.clip[c[0]]=f,p.clip[c[1]]=0,r&&(i.cssClip(p.clip),d&&d.css(e.effects.clipToBox(p)),p.clip=l),i.queue(function(n){d&&d.animate(e.effects.clipToBox(h),u,t.easing).animate(e.effects.clipToBox(p),u,t.easing),n()}).animate(h,u,t.easing).animate(p,u,t.easing).queue(n),e.effects.unshift(i,g,4)})}),
/*!
 * jQuery UI Effects Highlight 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("highlight","show",function(t,n){var i=e(this),o={backgroundColor:i.css("backgroundColor")};"hide"===t.mode&&(o.opacity=0),e.effects.saveStyle(i),i.css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Size 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("size",function(t,n){var i,o,r,s=e(this),f=["fontSize"],a=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],u=t.mode,d="effect"!==u,l=t.scale||"both",h=t.origin||["middle","center"],p=s.css("position"),m=s.position(),g=e.effects.scaledDimensions(s),y=t.from||g,v=t.to||e.effects.scaledDimensions(s,0);e.effects.createPlaceholder(s),"show"===u&&(r=y,y=v,v=r),o={from:{y:y.height/g.height,x:y.width/g.width},to:{y:v.height/g.height,x:v.width/g.width}},"box"!==l&&"both"!==l||(o.from.y!==o.to.y&&(y=e.effects.setTransition(s,a,o.from.y,y),v=e.effects.setTransition(s,a,o.to.y,v)),o.from.x!==o.to.x&&(y=e.effects.setTransition(s,c,o.from.x,y),v=e.effects.setTransition(s,c,o.to.x,v))),"content"!==l&&"both"!==l||o.from.y!==o.to.y&&(y=e.effects.setTransition(s,f,o.from.y,y),v=e.effects.setTransition(s,f,o.to.y,v)),h&&(i=e.effects.getBaseline(h,g),y.top=(g.outerHeight-y.outerHeight)*i.y+m.top,y.left=(g.outerWidth-y.outerWidth)*i.x+m.left,v.top=(g.outerHeight-v.outerHeight)*i.y+m.top,v.left=(g.outerWidth-v.outerWidth)*i.x+m.left),s.css(y),"content"!==l&&"both"!==l||(a=a.concat(["marginTop","marginBottom"]).concat(f),c=c.concat(["marginLeft","marginRight"]),s.find("*[width]").each(function(){var n=e(this),i=e.effects.scaledDimensions(n),r={height:i.height*o.from.y,width:i.width*o.from.x,outerHeight:i.outerHeight*o.from.y,outerWidth:i.outerWidth*o.from.x},s={height:i.height*o.to.y,width:i.width*o.to.x,outerHeight:i.height*o.to.y,outerWidth:i.width*o.to.x};o.from.y!==o.to.y&&(r=e.effects.setTransition(n,a,o.from.y,r),s=e.effects.setTransition(n,a,o.to.y,s)),o.from.x!==o.to.x&&(r=e.effects.setTransition(n,c,o.from.x,r),s=e.effects.setTransition(n,c,o.to.x,s)),d&&e.effects.saveStyle(n),n.css(r),n.animate(s,t.duration,t.easing,function(){d&&e.effects.restoreStyle(n)})})),s.animate(v,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){var t=s.offset();0===v.opacity&&s.css("opacity",y.opacity),d||(s.css("position","static"===p?"relative":p).offset(t),e.effects.saveStyle(s)),n()}})})}),
/*!
 * jQuery UI Effects Scale 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect","./effect-size"],e):e(jQuery)}(function(e){return e.effects.define("scale",function(t,n){var i=e(this),o=t.mode,r=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"effect"!==o?0:100),s=e.extend(!0,{from:e.effects.scaledDimensions(i),to:e.effects.scaledDimensions(i,r,t.direction||"both"),origin:t.origin||["middle","center"]},t);t.fade&&(s.from.opacity=1,s.to.opacity=0),e.effects.effect.size.call(this,s,n)})}),
/*!
 * jQuery UI Effects Puff 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect","./effect-scale"],e):e(jQuery)}(function(e){return e.effects.define("puff","hide",function(t,n){var i=e.extend(!0,{},t,{fade:!0,percent:parseInt(t.percent,10)||150});e.effects.effect.scale.call(this,i,n)})}),
/*!
 * jQuery UI Effects Pulsate 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("pulsate","show",function(t,n){var i=e(this),o=t.mode,r="show"===o,s=r||"hide"===o,f=2*(t.times||5)+(s?1:0),a=t.duration/f,c=0,u=1,d=i.queue().length;for(!r&&i.is(":visible")||(i.css("opacity",0).show(),c=1);u<f;u++)i.animate({opacity:c},a,t.easing),c=1-c;i.animate({opacity:c},a,t.easing),i.queue(n),e.effects.unshift(i,d,f+1)})}),
/*!
 * jQuery UI Effects Shake 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("shake",function(t,n){var i=1,o=e(this),r=t.direction||"left",s=t.distance||20,f=t.times||3,a=2*f+1,c=Math.round(t.duration/a),u="up"===r||"down"===r?"top":"left",d="up"===r||"left"===r,l={},h={},p={},m=o.queue().length;for(e.effects.createPlaceholder(o),l[u]=(d?"-=":"+=")+s,h[u]=(d?"+=":"-=")+2*s,p[u]=(d?"-=":"+=")+2*s,o.animate(l,c,t.easing);i<f;i++)o.animate(h,c,t.easing).animate(p,c,t.easing);o.animate(h,c,t.easing).animate(l,c/2,t.easing).queue(n),e.effects.unshift(o,m,a+1)})}),
/*!
 * jQuery UI Effects Slide 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("slide","show",function(t,n){var i,o,r=e(this),s={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},f=t.mode,a=t.direction||"left",c="up"===a||"down"===a?"top":"left",u="up"===a||"left"===a,d=t.distance||r["top"===c?"outerHeight":"outerWidth"](!0),l={};e.effects.createPlaceholder(r),i=r.cssClip(),o=r.position()[c],l[c]=(u?-1:1)*d+o,l.clip=r.cssClip(),l.clip[s[a][1]]=l.clip[s[a][0]],"show"===f&&(r.cssClip(l.clip),r.css(c,l[c]),l.clip=i,l[c]=o),r.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:n})})}),
/*!
 * jQuery UI Effects Transfer 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){var t;return!1!==e.uiBackCompat&&(t=e.effects.define("transfer",function(t,n){e(this).transfer(t,n)})),t});