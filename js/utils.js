'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  window.utils = {
    SAVE_DATA_BANNER_MESSAGE: '<br>' + 'Параметры магов не отправлены',
    LOAD_DATA_BANNER_MESSAGE: '<br>' + 'Параметры магов не получены,',
    getMaxElement: function (arr, length) {
      var maxElement = arr[0];
      for (var i = 0; i < length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    getRandomElement: function (array) {
      return (array[Math.round(Math.random() * (array.length - 1))]);
    },
    getRandomArray: function (sourceArray, length) {
      var resultArray = [];
      var tempArray = sourceArray.slice();
      var pickedElement = [];
      for (var i = 0; i < length; i++) {
        pickedElement = tempArray.splice((Math.floor(Math.random() * tempArray.length)), 1);
        resultArray[i] = pickedElement[0];
      }
      return resultArray;
    },
    setElementAttributes: function (element, elementAttributes) {
      for (var elementAttribute in elementAttributes) {
        if (elementAttributes.hasOwnProperty(elementAttribute)) {
          element.setAttribute(elementAttribute, elementAttributes[elementAttribute]);
        }
      }
    },
    isEnterPressEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    isEscPressEvent: function (evt, action) {
      if (evt.keyCode === ESCAPE_KEY) {
        action();
      }
    },
    colorize: function (element, colors) {
      var color = window.utils.getRandomElement(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      return color;
    },
    createErrorBanner: function (errorMessage, bannerMessage) {
      var errorBanner = document.querySelector('.data-error-banner');
      if (!errorBanner) {
        errorBanner = document.createElement('div');
        errorBanner.setAttribute('class', 'data-error-banner');
        errorBanner.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        errorBanner.style.position = 'absolute';
        errorBanner.style.left = 0;
        errorBanner.style.right = 0;
        errorBanner.style.fontSize = '20px';
        errorBanner.innerHTML = errorMessage + bannerMessage;
        document.body.insertAdjacentElement('afterbegin', errorBanner);
      }
      errorBanner.innerHTML = errorMessage + bannerMessage;
    }
  };
})();
