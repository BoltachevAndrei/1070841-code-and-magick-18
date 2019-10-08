'use strict';
(function () {
  var WIZARDS_COUNT = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var setupWindow = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var wizardTemplate = document.querySelector('template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  window.setup = {
    setupWindow: setupWindow,
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
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
    }
  };

  var generateRandomWizard = function () {
    var wizard = {};
    var wizardElement = wizardTemplate.cloneNode(true);
    wizard.name = window.utils.getRandomElement(FIRST_NAMES) + ' ' + window.utils.getRandomElement(LAST_NAMES);
    wizard.coatColor = window.utils.getRandomElement(COAT_COLORS);
    wizard.eyesColor = window.utils.getRandomElement(EYES_COLORS);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    fragment.appendChild(wizardElement);
    return fragment;
  };

  var generateWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'];
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard['colorEyes'];
    wizardElement.querySelector('.wizard-coat').style.fill = wizard['colorCoat'];
    fragment.appendChild(wizardElement);
    return fragment;
  };

  var onLoadDataSuccess = function (wizards) {
    wizards = window.utils.getRandomArray(wizards, WIZARDS_COUNT);
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      generateWizard(wizards[i]);
    }
    renderElement(setupSimilar.querySelector('.setup-similar-list'), fragment);
    showElement(setupSimilar);
  };

  var onLoadDataError = function (errorMessage) {
    window.utils.createErrorBanner(errorMessage, window.utils.LOAD_DATA_BANNER_MESSAGE);
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      generateRandomWizard();
    }
    renderElement(setupSimilar.querySelector('.setup-similar-list'), fragment);
    showElement(setupSimilar);
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var renderElement = function (container, element) {
    container.appendChild(element);
  };

  window.backend.load(window.backend.URL, onLoadDataSuccess, onLoadDataError);
})();
