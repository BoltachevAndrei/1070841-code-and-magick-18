'use strict';
(function () {
  var WIZARDS_COUNT = 4;
  var setupWindow = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('template').content.querySelector('.setup-similar-item');

  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    setupWindow: setupWindow,
    playerCoatColor: '',
    playerEyesColor: '',
    wizards: [],
    showElement: function (element) {
      if (!element) {
        element = setupWindow;
      }
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      if (!element) {
        element = setupWindow;
      }
      element.classList.add('hidden');
    },
    updateWizards: function () {
      renderWizards(window.setup.wizards.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = compareNames(left.name, right.name);
        }
        return rankDiff;
      }));
    },
    onCoatChange: window.debounce(function (color) {
      window.setup.playerCoatColor = color;
      window.setup.updateWizards();
    }),
    onEyesChange: window.debounce(function (color) {
      window.setup.playerEyesColor = color;
      window.setup.updateWizards();
    })
  };

  var renderWizard = function (data) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data['name'];
    wizardElement.querySelector('.wizard-eyes').style.fill = data['colorEyes'];
    wizardElement.querySelector('.wizard-coat').style.fill = data['colorCoat'];
    return wizardElement;
  };

  var renderWizards = function (data) {
    var fragment = document.createDocumentFragment();
    setupSimilarList.innerHTML = '';
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    renderElement(setupSimilarList, fragment);
    showElement(setupSimilar);
  };

  var onLoadDataSuccess = function (data) {
    window.setup.wizards = data;
    window.setup.updateWizards();
  };

  var onLoadDataError = function (errorMessage) {
    window.utils.createErrorBanner(errorMessage, window.utils.LOAD_DATA_BANNER_MESSAGE);
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var renderElement = function (container, element) {
    container.appendChild(element);
  };

  var getRank = function (data) {
    var rank = 0;
    if (data.colorCoat === window.setup.playerCoatColor) {
      rank += 2;
    }
    if (data.colorEyes === window.setup.playerEyesColor) {
      rank += 1;
    }
    return rank;
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.backend.load(onLoadDataSuccess, onLoadDataError, window.backend.URL);
})();
