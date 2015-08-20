'use strict';

(function (exports, undefined) {
  var images = [];
  var currentIdx = 0;
  var isOpen = false;

  exports.setImages = function (resources) {
    console.log(resources);
    images = resources;
    window.document.getElementById('lightbox-toggler').disabled = false;
  };

  var setImage = function () {
    var imageContainer = window.document.getElementById('lightbox-image-container');
    var lightbox = window.document.getElementById('lightbox');
    var currentImage = images[currentIdx].images['standard_resolution'];
    console.log('set image', currentImage);
    imageContainer.style['background-image'] = 'url("' + currentImage.url + '")';
    imageContainer.style.height = currentImage.height + 'px';
    imageContainer.style.width = currentImage.width + 'px';
    lightbox.style.height = currentImage.height + 'px';
    lightbox.style.width = currentImage.width + 'px';
  };

  var openBox = function () {
    isOpen = true;
    window.document.getElementById('lightbox').style.display = 'block';
    setImage();
  };

  var closeBox = function () {
    isOpen = false;
    window.document.getElementById('lightbox').style.display = 'none';
  };

  var toggleBox = function () {
    if (isOpen) {
      closeBox();
    } else {
      openBox();
    }
  };

  var moveRight = function () {
    currentIdx = (currentIdx + 1) % images.length;
    setImage();
  };

  var moveLeft = function () {
    currentIdx = (currentIdx - 1 + images.length) % images.length;
    setImage();
  };

  var bindEvent = function (element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    } else {
      console.error('cannot bind event');
    }
  };

  exports.bindEvents = function () {
    bindEvent(window.document.getElementById('lightbox-toggler'),
        'click', toggleBox);
    bindEvent(window.document.getElementById('lightbox-close-button'),
        'click', closeBox);
    bindEvent(window.document.getElementById('lightbox-left-button'),
        'click', moveLeft);
    bindEvent(window.document.getElementById('lightbox-right-button'),
        'click', moveRight);
  };
})(window.lightbox = window.lightbox || {});
