'use strict';

var WIZARDS_COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var FORM_ATTRIBUTES = {
  method: 'post',
  enctype: 'multipart/form-data',
  action: 'https://js.dump.academy/code-and-magick',
  autocomplete: 'off'
};
var USERNAME_ATTRIBUTES = {
  minlength: '2',
  maxlength: '25',
  required: ''
};
var TABINDEX_ATTRIBUTE = {
  tabindex: '0'
};

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizards = [];
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var coatColorInput = setup.querySelector('input[name = coat-color]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var eyesColorInput = setup.querySelector('input[name = eyes-color]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var fireballColorInput = setup.querySelector('input[name = fireball-color]');

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

var renderWizards = function (wizardsCount) {
  var wizardElement;
  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = generateWizard();
    wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    fragment.appendChild(wizardElement);
  }
};

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

var changeWizardCoat = function () {
  var coatColor = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = coatColor;
  coatColorInput.value = coatColor;
};

var changeWizardEyes = function () {
  var eyesColor = getRandomElement(EYES_COLORS);
  wizardEyes.style.fill = eyesColor;
  eyesColorInput.value = eyesColor;
};

var changeWizardFireball = function () {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  wizardFireball.setAttribute('style', 'background-color: ' + fireballColor);
  fireballColorInput.value = fireballColor;
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESCAPE_KEY && evt.target !== setupUserName) {
    hideElement(setup);
  }
};

var onWizardCoatPress = function (evt) {
  if (evt.keyCode === ENTER_KEY && evt.target === wizardCoat) {
    changeWizardCoat();
  }
};

var onWizardEyesPress = function (evt) {
  if (evt.keyCode === ENTER_KEY && evt.target === wizardEyes) {
    changeWizardEyes();
  }
};

var onWizardFireballPress = function (evt) {
  if (evt.keyCode === ENTER_KEY && evt.target === wizardFireball) {
    changeWizardFireball();
  }
};

var showSetup = function () {
  showElement(setup);
  document.addEventListener('keydown', onSetupEscPress);
  document.addEventListener('keydown', onWizardCoatPress);
  document.addEventListener('keydown', onWizardEyesPress);
  document.addEventListener('keydown', onWizardFireballPress);
};

var hideSetup = function () {
  hideElement(setup);
  document.removeEventListener('keydown', onSetupEscPress);
  document.removeEventListener('keydown', onWizardCoatPress);
  document.removeEventListener('keydown', onWizardEyesPress);
  document.removeEventListener('keydown', onWizardFireballPress);
};

var renderElement = function (container, element) {
  container.appendChild(element);
};

var setElementAttributes = function (element, elementAttributes) {
  for (var elementAttribute in elementAttributes) {
    if (elementAttributes.hasOwnProperty(elementAttribute)) {
      element.setAttribute(elementAttribute, elementAttributes[elementAttribute]);
    }
  }
};

setupOpen.addEventListener('click', function () {
  showSetup();
});

setupClose.addEventListener('click', function () {
  hideSetup();
});

wizardCoat.addEventListener('click', function () {
  changeWizardCoat();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyes();
});

wizardFireball.addEventListener('click', function () {
  changeWizardFireball();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    showSetup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    hideSetup();
  }
});

renderWizards(WIZARDS_COUNT);
renderElement(setupSimilar.querySelector('.setup-similar-list'), fragment);
showElement(setupSimilar);
setElementAttributes(setupForm, FORM_ATTRIBUTES);
setElementAttributes(setupOpenIcon, TABINDEX_ATTRIBUTE);
setElementAttributes(setupClose, TABINDEX_ATTRIBUTE);
setElementAttributes(wizardCoat, TABINDEX_ATTRIBUTE);
setElementAttributes(wizardEyes, TABINDEX_ATTRIBUTE);
setElementAttributes(wizardFireball, TABINDEX_ATTRIBUTE);
setElementAttributes(setupUserName, USERNAME_ATTRIBUTES);
