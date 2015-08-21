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
      console.log('access token:', accessToken);
    } else {
      auth();
    }
  };

  var auth = function () {
    var redirectTo = window.location.href;
    if (redirectTo[redirectTo.length - 1] === '/') {
      redirectTo = redirectTo.slice(0, redirectTo.length - 1);
    }
    console.log( 'https://instagram.com/oauth/authorize/?client_id=' + clientId +
        '&redirect_uri=' + redirectTo + '&response_type=token');
    window.location.href =
        'https://instagram.com/oauth/authorize/?client_id=' + clientId +
        '&redirect_uri=' + redirectTo + '&response_type=token';
  };

  // http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
  var jsonp = function (url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      window[callbackname] = undefined;
      try {
        delete window[callbackName];
      } catch (e) {
        console.warn('cannot delete property from window');
      }
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
      images = response.data;
      window.lightbox.setImages(images);
    });
  };

  exports.listImages = function () {
    return images;
  };

})(window.images = window.images || {});
