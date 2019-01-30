!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){return t.ui=t.ui||{},t.ui.version="1.12.1"}),
/*!
 * jQuery UI Effects 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}(function(t){var e,n="ui-effects-",r="ui-effects-style",i="ui-effects-animated",o=t;return t.effects={effect:{}},
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
function(t,e){function n(t,e,n){var r=l[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function r(e){var n=f(),r=n._rgba=[];return e=e.toLowerCase(),h(c,function(t,i){var o,s=i.re.exec(e),a=s&&i.parse(s),c=i.space||"rgba";if(a)return o=n[c](a),n[u[c].cache]=o[u[c].cache],r=n._rgba=o._rgba,!1}),r.length?("0,0,0,0"===r.join()&&t.extend(r,o.transparent),n):o[e]}function i(t,e,n){return 6*(n=(n+1)%1)<1?t+(e-t)*n*6:2*n<1?e:3*n<2?t+(e-t)*(2/3-n)*6:t}var o,s="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",a=/^([\-+])=\s*(\d+\.?\d*)/,c=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],f=t.Color=function(e,n,r,i){return new t.Color.fn.parse(e,n,r,i)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=f.support={},p=t("<p>")[0],h=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,h(u,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),f.fn=t.extend(f.prototype,{parse:function(i,s,a,c){if(i===e)return this._rgba=[null,null,null,null],this;(i.jquery||i.nodeType)&&(i=t(i).css(s),s=e);var l=this,d=t.type(i),p=this._rgba=[];return s!==e&&(i=[i,s,a,c],d="array"),"string"===d?this.parse(r(i)||o._default):"array"===d?(h(u.rgba.props,function(t,e){p[e.idx]=n(i[e.idx],e)}),this):"object"===d?(h(u,i instanceof f?function(t,e){i[e.cache]&&(l[e.cache]=i[e.cache].slice())}:function(e,r){var o=r.cache;h(r.props,function(t,e){if(!l[o]&&r.to){if("alpha"===t||null==i[t])return;l[o]=r.to(l._rgba)}l[o][e.idx]=n(i[t],e,!0)}),l[o]&&t.inArray(null,l[o].slice(0,3))<0&&(l[o][3]=1,r.from&&(l._rgba=r.from(l[o])))}),this):void 0},is:function(t){var e=f(t),n=!0,r=this;return h(u,function(t,i){var o,s=e[i.cache];return s&&(o=r[i.cache]||i.to&&i.to(r._rgba)||[],h(i.props,function(t,e){if(null!=s[e.idx])return n=s[e.idx]===o[e.idx]})),n}),n},_space:function(){var t=[],e=this;return h(u,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var r=f(t),i=r._space(),o=u[i],s=0===this.alpha()?f("transparent"):this,a=s[o.cache]||o.to(s._rgba),c=a.slice();return r=r[o.cache],h(o.props,function(t,i){var o=i.idx,s=a[o],f=r[o],u=l[i.type]||{};null!==f&&(null===s?c[o]=f:(u.mod&&(f-s>u.mod/2?s+=u.mod:s-f>u.mod/2&&(s-=u.mod)),c[o]=n((f-s)*e+s,i)))}),this[i](c)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),i=f(e)._rgba;return f(t.map(n,function(t,e){return(1-r)*i[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){return 1===(t=(t||0).toString(16)).length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,u.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,i=t[1]/255,o=t[2]/255,s=t[3],a=Math.max(r,i,o),c=Math.min(r,i,o),f=a-c,u=a+c,l=.5*u;return e=c===a?0:r===a?60*(i-o)/f+360:i===a?60*(o-r)/f+120:60*(r-i)/f+240,n=0===f?0:l<=.5?f/u:f/(2-u),[Math.round(e)%360,n,l,null==s?1:s]},u.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],o=t[3],s=r<=.5?r*(1+n):r+n-r*n,a=2*r-s;return[Math.round(255*i(a,s,e+1/3)),Math.round(255*i(a,s,e)),Math.round(255*i(a,s,e-1/3)),o]},h(u,function(r,i){var o=i.props,s=i.cache,c=i.to,u=i.from;f.fn[r]=function(r){if(c&&!this[s]&&(this[s]=c(this._rgba)),r===e)return this[s].slice();var i,a=t.type(r),l="array"===a||"object"===a?r:arguments,d=this[s].slice();return h(o,function(t,e){var r=l["object"===a?t:e.idx];null==r&&(r=d[e.idx]),d[e.idx]=n(r,e)}),u?((i=f(u(d)))[s]=d,i):f(d)},h(o,function(e,n){f.fn[e]||(f.fn[e]=function(i){var o,s=t.type(i),c="alpha"===e?this._hsla?"hsla":"rgba":r,f=this[c](),u=f[n.idx];return"undefined"===s?u:("function"===s&&(i=i.call(this,u),s=t.type(i)),null==i&&n.empty?this:("string"===s&&(o=a.exec(i))&&(i=u+parseFloat(o[2])*("+"===o[1]?1:-1)),f[n.idx]=i,this[c](f)))})})}),f.hook=function(e){var n=e.split(" ");h(n,function(e,n){t.cssHooks[n]={set:function(e,i){var o,s,a="";if("transparent"!==i&&("string"!==t.type(i)||(o=r(i)))){if(i=f(o||i),!d.rgba&&1!==i._rgba[3]){for(s="backgroundColor"===n?e.parentNode:e;(""===a||"transparent"===a)&&s&&s.style;)try{a=t.css(s,"backgroundColor"),s=s.parentNode}catch(c){}i=i.blend(a&&"transparent"!==a?a:"_default")}i=i.toRgbaString()}try{e.style[n]=i}catch(c){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=f(e.elem,n),e.end=f(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},f.hook(s),t.cssHooks.borderColor={expand:function(t){var e={};return h(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(o),function(){function e(e){var n,r,i=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(i&&i.length&&i[0]&&i[i[0]])for(r=i.length;r--;)"string"==typeof i[n=i[r]]&&(o[t.camelCase(n)]=i[n]);else for(n in i)"string"==typeof i[n]&&(o[n]=i[n]);return o}function n(e,n){var r,i,o={};for(r in n)i=n[r],e[r]!==i&&(s[r]||!t.fx.step[r]&&isNaN(parseFloat(i))||(o[r]=i));return o}var r,i=["add","remove","toggle"],s={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,n){t.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(o.style(t.elem,n,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(r,o,s,a){var c=t.speed(o,s,a);return this.queue(function(){var o,s=t(this),a=s.attr("class")||"",f=c.children?s.find("*").addBack():s;f=f.map(function(){return{el:t(this),start:e(this)}}),(o=function(){t.each(i,function(t,e){r[e]&&s[e+"Class"](r[e])})})(),f=f.map(function(){return this.end=e(this.el[0]),this.diff=n(this.start,this.end),this}),s.attr("class",a),f=f.map(function(){var e=this,n=t.Deferred(),r=t.extend({},c,{queue:!1,complete:function(){n.resolve(e)}});return this.el.animate(this.diff,r),n.promise()}),t.when.apply(t,f.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),c.complete.call(s[0])})})},t.fn.extend({addClass:(r=t.fn.addClass,function(e,n,i,o){return n?t.effects.animateClass.call(this,{add:e},n,i,o):r.apply(this,arguments)}),removeClass:function(e){return function(n,r,i,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:n},r,i,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(n,r,i,o,s){return"boolean"==typeof r||r===undefined?i?t.effects.animateClass.call(this,r?{add:n}:{remove:n},i,o,s):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:n},r,i,o)}}(t.fn.toggleClass),switchClass:function(e,n,r,i,o){return t.effects.animateClass.call(this,{add:n,remove:e},r,i,o)}})}(),function(){function e(e,n,r,i){return t.isPlainObject(e)&&(n=e,e=e.effect),e={effect:e},null==n&&(n={}),t.isFunction(n)&&(i=n,r=null,n={}),("number"==typeof n||t.fx.speeds[n])&&(i=r,r=n,n={}),t.isFunction(r)&&(i=r,r=null),n&&t.extend(e,n),r=r||n.duration,e.duration=t.fx.off?0:"number"==typeof r?r:r in t.fx.speeds?t.fx.speeds[r]:t.fx.speeds._default,e.complete=i||n.complete,e}function o(e){return!(e&&"number"!=typeof e&&!t.fx.speeds[e])||("string"==typeof e&&!t.effects.effect[e]||(!!t.isFunction(e)||"object"==typeof e&&!e.effect))}function s(t,e){var n=e.outerWidth(),r=e.outerHeight(),i=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t)||["",0,n,r,0];return{top:parseFloat(i[1])||0,right:"auto"===i[2]?n:parseFloat(i[2]),bottom:"auto"===i[3]?r:parseFloat(i[3]),left:parseFloat(i[4])||0}}var a;t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=(a=t.expr.filters.animated,function(e){return!!t(e).data(i)||a(e)})),!1!==t.uiBackCompat&&t.extend(t.effects,{save:function(t,e){for(var r=0,i=e.length;r<i;r++)null!==e[r]&&t.data(n+e[r],t[0].style[e[r]])},restore:function(t,e){for(var r,i=0,o=e.length;i<o;i++)null!==e[i]&&(r=t.data(n+e[i]),t.css(e[i],r))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var n={width:e.outerWidth(!0),height:e.outerHeight(!0),float:e.css("float")},r=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(s){o=document.body}return e.wrap(r),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),r=e.parent(),"static"===e.css("position")?(r.css({position:"relative"}),e.css({position:"relative"})):(t.extend(n,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,r){n[r]=e.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(i),r.css(n).show()},removeWrapper:function(e){var n=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===n||t.contains(e[0],n))&&t(n).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.1",define:function(e,n,r){return r||(r=n,n="effect"),t.effects.effect[e]=r,t.effects.effect[e].mode=n,r},scaledDimensions:function(t,e,n){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var r="horizontal"!==n?(e||100)/100:1,i="vertical"!==n?(e||100)/100:1;return{height:t.height()*i,width:t.width()*r,outerHeight:t.outerHeight()*i,outerWidth:t.outerWidth()*r}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,n){var r=t.queue();e>1&&r.splice.apply(r,[1,0].concat(r.splice(e,n))),t.dequeue()},saveStyle:function(t){t.data(r,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(r)||"",t.removeData(r)},mode:function(t,e){var n=t.is(":hidden");return"toggle"===e&&(e=n?"show":"hide"),(n?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createPlaceholder:function(e){var r,i=e.css("position"),o=e.position();return e.css({marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()),/^(static|relative)/.test(i)&&(i="absolute",r=t("<"+e[0].nodeName+">").insertAfter(e).css({display:/^(inline|ruby)/.test(e.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight"),float:e.css("float")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"),e.data(n+"placeholder",r)),e.css({position:i,left:o.left,top:o.top}),r},removePlaceholder:function(t){var e=n+"placeholder",r=t.data(e);r&&(r.remove(),t.removeData(e))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,n,r,i){return i=i||{},t.each(n,function(t,n){var o=e.cssUnit(n);o[0]>0&&(i[n]=o[0]*r+o[1])}),i}}),t.fn.extend({effect:function(){function n(e){function n(){c.removeData(i),t.effects.cleanUp(c),"hide"===r.mode&&c.hide(),a()}function a(){t.isFunction(f)&&f.call(c[0]),t.isFunction(e)&&e()}var c=t(this);r.mode=l.shift(),!1===t.uiBackCompat||s?"none"===r.mode?(c[u](),a()):o.call(c[0],r,n):(c.is(":hidden")?"hide"===u:"show"===u)?(c[u](),a()):o.call(c[0],r,a)}var r=e.apply(this,arguments),o=t.effects.effect[r.effect],s=o.mode,a=r.queue,c=a||"fx",f=r.complete,u=r.mode,l=[],d=function(e){var n=t(this),r=t.effects.mode(n,u)||s;n.data(i,!0),l.push(r),s&&("show"===r||r===s&&"hide"===r)&&n.show(),s&&"none"===r||t.effects.saveStyle(n),t.isFunction(e)&&e()};return t.fx.off||!o?u?this[u](r.duration,f):this.each(function(){f&&f.call(this)}):!1===a?this.each(d).each(n):this.queue(c,d).queue(c,n)},show:function(t){return function(n){if(o(n))return t.apply(this,arguments);var r=e.apply(this,arguments);return r.mode="show",this.effect.call(this,r)}}(t.fn.show),hide:function(t){return function(n){if(o(n))return t.apply(this,arguments);var r=e.apply(this,arguments);return r.mode="hide",this.effect.call(this,r)}}(t.fn.hide),toggle:function(t){return function(n){if(o(n)||"boolean"==typeof n)return t.apply(this,arguments);var r=e.apply(this,arguments);return r.mode="toggle",this.effect.call(this,r)}}(t.fn.toggle),cssUnit:function(e){var n=this.css(e),r=[];return t.each(["em","px","%","pt"],function(t,e){n.indexOf(e)>0&&(r=[parseFloat(n),e])}),r},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):s(this.css("clip"),this)},transfer:function(e,n){var r=t(this),i=t(e.to),o="fixed"===i.css("position"),s=t("body"),a=o?s.scrollTop():0,c=o?s.scrollLeft():0,f=i.offset(),u={top:f.top-a,left:f.left-c,height:i.innerHeight(),width:i.innerWidth()},l=r.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:l.top-a,left:l.left-c,height:r.innerHeight(),width:r.innerWidth(),position:o?"fixed":"absolute"}).animate(u,e.duration,e.easing,function(){d.remove(),t.isFunction(n)&&n()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=s(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),e={},t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,n){e[n]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,n){t.easing["easeIn"+e]=n,t.easing["easeOut"+e]=function(t){return 1-n(1-t)},t.easing["easeInOut"+e]=function(t){return t<.5?n(2*t)/2:1-n(-2*t+2)/2}}),t.effects}),
/*!
 * jQuery UI Effects Fold 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
function(t){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],t):t(jQuery)}(function(t){return t.effects.define("fold","hide",function(e,n){var r=t(this),i=e.mode,o="show"===i,s="hide"===i,a=e.size||15,c=/([0-9]+)%/.exec(a),f=!!e.horizFirst?["right","bottom"]:["bottom","right"],u=e.duration/2,l=t.effects.createPlaceholder(r),d=r.cssClip(),p={clip:t.extend({},d)},h={clip:t.extend({},d)},g=[d[f[0]],d[f[1]]],m=r.queue().length;c&&(a=parseInt(c[1],10)/100*g[s?0:1]),p.clip[f[0]]=a,h.clip[f[0]]=a,h.clip[f[1]]=0,o&&(r.cssClip(h.clip),l&&l.css(t.effects.clipToBox(h)),h.clip=d),r.queue(function(n){l&&l.animate(t.effects.clipToBox(p),u,e.easing).animate(t.effects.clipToBox(h),u,e.easing),n()}).animate(p,u,e.easing).animate(h,u,e.easing).queue(n),t.effects.unshift(r,m,4)})});