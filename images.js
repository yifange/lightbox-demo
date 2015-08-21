'use strict';

(function (exports, undefined) {
  var images = [];
  var clientId = '22729e0c12254816aba48fcd8007d74c';
  var accessToken = null;

  var retrieveAccessToken = function () {
    if (accessToken !== null) {
      return;
    }
    if (window.location.hash) {
      accessToken = window.location.hash.substring(14);
    } else {
      auth();
    }
  };

  var auth = function () {
    var redirectTo = window.location.href;
    var hashIdx = redirectTo.indexOf('#');
    if (hashIdx > 0) {
      redirectTo = redirectTo.slice(0, hashIdx);
    }
    if (redirectTo[redirectTo.length - 1] === '/') {
      redirectTo = redirectTo.slice(0, redirectTo.length - 1);
    }
    window.location =
        'https://instagram.com/oauth/authorize/?client_id=' + clientId +
        '&redirect_uri=' + redirectTo + '&response_type=token';
  };

  // http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
  var jsonp = function (url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      window[callbackName] = undefined;
      try {
        delete window[callbackName];
      } catch (e) {}
      document.body.removeChild(script);
      callback(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  };

  exports.loadImages = function () {
    retrieveAccessToken();
    var req = new XMLHttpRequest();
    jsonp('https://api.instagram.com/v1/media/popular?access_token=' + accessToken, function (response) {
      if (response.meta.code === 400) {
        // invalid access token
        auth();
      }
      images = response.data;
      window.lightbox.setImages(images);
    });
  };

  exports.listImages = function () {
    return images;
  };

})(window.images = window.images || {});
