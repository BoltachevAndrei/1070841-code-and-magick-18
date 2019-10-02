'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  window.utils = {
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
    }
  };
})();
