"use strict";var precacheConfig=[["/RideHub/index.html","a0dcb041ff1c73ee43ab4c7d76a19924"],["/RideHub/static/css/main.b71a27a4.css","fc7070aa4cd697ee0a0ec6a285e1b0c2"],["/RideHub/static/js/main.becdfdb3.js","47c307d09f82df8c85d33d382b03cc3c"],["/RideHub/static/media/billboard-bg.d42d58ec.jpg","d42d58ec3dde3aa4c2b108ba73725bbf"],["/RideHub/static/media/defaultavatar.ab81fc39.png","ab81fc39e726fbd63bb902f9c54bf30a"],["/RideHub/static/media/filtersearch-bg.a23f62cf.jpg","a23f62cf9007a628adb11143746c29e3"],["/RideHub/static/media/loading-animation.63d8bbf2.gif","63d8bbf2d29d4e21beea0aa5188762cc"],["/RideHub/static/media/loading.80cada2b.gif","80cada2b89ab614605015115716ae0e1"],["/RideHub/static/media/logo.bcdb4717.png","bcdb47178f7484e2f25d7cad7bb032f2"],["/RideHub/static/media/maxresdefault.0d1f38ce.jpg","0d1f38cee4ca411c24e2a94a0a57bc50"],["/RideHub/static/media/newestthread-bg.a113ba8e.jpg","a113ba8ee61b915fd1da596c6b214462"],["/RideHub/static/media/recentactivities-bg.02af0544.jpg","02af054418b7dd680e82217385fbaa20"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/RideHub/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});