'use strict';

var WIZARDS_COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizards = [];

var getRandomElement = function (array) {
  return (array[Math.round(Math.random() * (array.length - 1))]);
};

var generateWizard = function () {
  var wizard = {};

  wizard.name = getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(LAST_NAMES);
  wizard.coatColor = getRandomElement(COAT_COLORS);
  wizard.eyesColor = getRandomElement(EYES_COLORS);
  return wizard;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

var showElement = function (element) {
  element.classList.remove('hidden');
};

for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards[i] = generateWizard();
  fragment.appendChild(renderWizard(wizards[i]));
}

setupSimilar.querySelector('.setup-similar-list').appendChild(fragment);
showElement(setupSimilar);
showElement(userDialog);
