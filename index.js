!function t(e,n,i){function r(a,s){if(!n[a]){if(!e[a]){var h="function"==typeof require&&require;if(!s&&h)return h(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return r(n?n:t)},u,u.exports,t,e,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!(x.length>=g)){var e=O.width,n=O.height,i=new z(A.random(n/y),A.random(e/y),t);i.createElectrons()}}function a(){M.paint(function(t,e){var n=e.width,i=e.height;t.fillStyle=w,t.fillRect(0,0,n,i)})}function s(){for(var t=Date.now(),e=0,n=x.length;e<n;e++){var i=x[e];t>=i.expireAt?(x.splice(e,1),e--,n--):i.paintNextTo(O)}}function h(){var t=Date.now();t<T||(T=t+A.random(300,1e3),o())}function l(){a(),O.paint(function(t,e){var n=e.width,i=e.height;t.fillStyle="#fff",t.fillRect(0,0,n,i)}),O.blendBackground(M.canvas,.9)}function u(){O.blendBackground(M.canvas),s(),h(),requestAnimationFrame(u)}var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),d=function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=3,f=10,p=20,m=2,g=3,y=p+m,w="#26303a",b="#d34b6a",k=window.devicePixelRatio||1,x=[],C=[[0,1],[0,-1],[1,0],[-1,0]].map(function(t){var e=d(t,2),n=e[0],i=e[1];return[n*y,i*y]}),E=[[0,0],[0,1],[1,0],[1,1]].map(function(t){var e=d(t,2),n=e[0],i=e[1];return[n*y-m/2,i*y-m/2]}),A={random:function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},debounce:function(t,e){var n=void 0,i=void 0,r=void 0,o=void 0,a=void 0,s=function s(){var h=Date.now-o;h<e&&h>=0?n=setTimeout(s,e-h):(n=null,a=t.apply(r,i),n||(r=i=null))};return function(){return r=this,i=arguments,o=Date.now,n||(n=setTimeout(s,e)),a}}},D=function(){function t(){var e=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];r(this,t);var n=document.createElement("canvas"),i=n.getContext("2d");this.canvas=n,this.context=i,this.disableScale=e,this.resizeHandlers=[],this.handleResize=A.debounce(this.handleResize.bind(this),100),this.adjust(),window.addEventListener("resize",this.handleResize)}return c(t,[{key:"adjust",value:function(){var t=this.canvas,e=this.context,n=this.disableScale,i=window,r=i.innerWidth,o=i.innerHeight;this.width=r,this.height=o;var a=n?1:k;this.realWidth=t.width=r*a,this.realHeight=t.height=o*a,t.style.width=r+"px",t.style.height=o+"px",e.scale(a,a)}},{key:"makeCallback",value:function(t){t(this.context,this)}},{key:"blendBackground",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?.05:arguments[1];return this.paint(function(n,i){var r=i.realWidth,o=i.realHeight,a=i.width,s=i.height;n.globalCompositeOperation="source-over",n.globalAlpha=e,n.drawImage(t,0,0,r,o,0,0,a,s)})}},{key:"paint",value:function(t){var e=this.context;return e.save(),this.makeCallback(t),e.restore(),this}},{key:"onResize",value:function(t){this.resizeHandlers.push(t)}},{key:"handleResize",value:function(){var t=this.resizeHandlers;t.length&&(this.adjust(),t.forEach(this.makeCallback.bind(this)))}},{key:"renderIntoView",value:function(){var t=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0],e=this.canvas;this.container=t,e.style.position="absolute",e.style.left="0px",e.style.top="0px",t.appendChild(e)}}]),t}(),R=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?0:arguments[1],i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=i.lifeTime,a=void 0===o?1e3*f:o,s=i.speed,h=void 0===s?v:s,l=i.color,u=void 0===l?b:l;r(this,t),this.lifeTime=a,this.expireAt=Date.now()+a,this.speed=h,this.color=u,this.radius=m/2,this.current=[e,n],this.visited={},this.setDest(this.randomPath())}return c(t,[{key:"randomPath",value:function(){var t=d(this.current,2),e=t[0],n=t[1],i=C.length,r=d(C[A.random(i-1)],2),o=r[0],a=r[1];return[e+o,n+a]}},{key:"composeCoord",value:function(t){return t.join(",")}},{key:"hasVisited",value:function(t){var e=this.composeCoord(t);return this.visited[e]}},{key:"setDest",value:function(t){this.destination=t,this.visited[this.composeCoord(t)]=!0}},{key:"next",value:function(){var t=this.speed,e=this.current,n=this.destination;if(Math.abs(e[0]-n[0])<=t/2&&Math.abs(e[1]-n[1])<=t/2){n=this.randomPath();for(var r=1,o=4;this.hasVisited(n)&&r<=o;)r++,n=this.randomPath();this.setDest(n)}var a=n[0]-e[0],s=n[1]-e[1];return a&&(e[0]+=a/Math.abs(a)*t),s&&(e[1]+=s/Math.abs(s)*t),[].concat(i(this.current))}},{key:"paintNextTo",value:function(){var t=arguments.length<=0||void 0===arguments[0]?new D:arguments[0],e=this.radius,n=this.color,i=this.expireAt,r=this.lifeTime,o=this.next(),a=d(o,2),s=a[0],h=a[1];t.paint(function(t){t.globalAlpha=Math.max(0,i-Date.now())/r,t.fillStyle=n,t.shadowColor=n,t.shadowBlur=5*e,t.globalCompositeOperation="lighter",t.beginPath(),t.arc(s,h,e,0,2*Math.PI),t.closePath(),t.fill()})}}]),t}(),z=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?0:arguments[1],i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=i.electronCount,a=void 0===o?A.random(1,4):o,s=i.background,h=void 0===s?b:s,l=i.forceElectrons,u=void 0!==l&&l,c=i.electronOptions,d=void 0===c?{}:c;r(this,t),this.background=h,this.electronOptions=d,this.forceElectrons=u,this.electronCount=Math.min(a,4),this.startY=e*y,this.startX=n*y}return c(t,[{key:"popRandom",value:function(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],e=A.random(t.length-1);return t.splice(e,1)[0]}},{key:"createElectrons",value:function(){var t=this.startX,e=this.startY,n=this.electronCount,r=this.electronOptions,o=this.forceElectrons;if(n)for(var a=[].concat(i(E)),s=o?n:Math.min(n,g-x.length),h=0;h<s;h++){var l=this.popRandom(a),u=d(l,2),c=u[0],v=u[1];x.push(new R(t+c,e+v,r))}}}]),t}(),M=new D,O=new D,T=void 0;M.onResize(a),O.onResize(l),O.renderIntoView(document.body),l(),u(),document.addEventListener("touchmove",function(t){return t.preventDefault()})},{}]},{},[1]);