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

  exports.bindEvents = function () {
    window.document.getElementById('lightbox-toggler').
        addEventListener('click', toggleBox);
    window.document.getElementById('lightbox-close-button').
        addEventListener('click', closeBox);
    window.document.getElementById('lightbox-left-button').
        addEventListener('click', moveLeft);
    window.document.getElementById('lightbox-right-button').
        addEventListener('click', moveRight);
  };
})(window.lightbox = window.lightbox || {});
