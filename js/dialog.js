'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var FORM_ATTRIBUTES = {
    method: 'post',
    enctype: 'multipart/form-data',
    action: 'https://js.dump.academy/code-and-magick',
    autocomplete: 'off'
  };
  var TABINDEX_ATTRIBUTE = {
    tabindex: '0'
  };
  var USERNAME_ATTRIBUTES = {
    minlength: '2',
    maxlength: '25',
    required: ''
  };
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.setupWindow.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupForm = window.setup.setupWindow.querySelector('.setup-wizard-form');
  var setupUserName = window.setup.setupWindow.querySelector('.setup-user-name');
  var setupWizard = window.setup.setupWindow.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var coatColorInput = window.setup.setupWindow.querySelector('input[name = coat-color]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var eyesColorInput = window.setup.setupWindow.querySelector('input[name = eyes-color]');
  var wizardFireball = window.setup.setupWindow.querySelector('.setup-fireball-wrap');
  var fireballColorInput = window.setup.setupWindow.querySelector('input[name = fireball-color]');
  var setupHandler = window.setup.setupWindow.querySelector('.upload');
  var setupDefaultPosition = {
    top: window.setup.setupWindow.style.top,
    left: window.setup.setupWindow.style.left
  };

  var changeWizardCoat = function () {
    var newColor = window.utils.colorize(wizardCoat, window.setup.COAT_COLORS);
    coatColorInput.value = newColor;
    return newColor;
  };

  var changeWizardEyes = function () {
    var newColor = window.utils.colorize(wizardEyes, window.setup.EYES_COLORS);
    eyesColorInput.value = newColor;
    return newColor;
  };

  var changeWizardFireball = function () {
    fireballColorInput.value = window.utils.colorize(wizardFireball, FIREBALL_COLORS);
  };

  var onSetupEscPress = function (evt) {
    if (evt.target !== setupUserName) {
      window.utils.isEscPressEvent(evt, window.setup.hideElement);
    }
  };

  var onWizardCoatPress = function (evt) {
    if (evt.target === wizardCoat) {
      window.utils.isEnterPressEvent(evt, changeWizardCoat);
    }
  };

  var onWizardEyesPress = function (evt) {
    if (evt.target === wizardEyes) {
      window.utils.isEnterPressEvent(evt, changeWizardEyes);
    }
  };

  var onWizardFireballPress = function (evt) {
    if (evt.target === wizardFireball) {
      window.utils.isEnterPressEvent(evt, changeWizardFireball);
    }
  };

  var setDefaultPosition = function (element, position) {
    element.style = {
      top: position.top,
      left: position.left
    };
  };

  var showSetup = function () {
    setDefaultPosition(window.setup.setupWindow, setupDefaultPosition);
    window.setup.showElement(window.setup.setupWindow);
    document.addEventListener('keydown', onSetupEscPress);
    document.addEventListener('keydown', onWizardCoatPress);
    document.addEventListener('keydown', onWizardEyesPress);
    document.addEventListener('keydown', onWizardFireballPress);
  };

  var hideSetup = function () {
    window.setup.hideElement(window.setup.setupWindow);
    document.removeEventListener('keydown', onSetupEscPress);
    document.removeEventListener('keydown', onWizardCoatPress);
    document.removeEventListener('keydown', onWizardEyesPress);
    document.removeEventListener('keydown', onWizardFireballPress);
  };

  setupOpen.addEventListener('click', function () {
    showSetup();
  });

  setupClose.addEventListener('click', function () {
    hideSetup();
  });

  wizardCoat.addEventListener('click', function () {
    var newColor = changeWizardCoat();
    window.setup.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = changeWizardEyes();
    window.setup.onEyesChange(newColor);
  });

  wizardFireball.addEventListener('click', function () {
    changeWizardFireball();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    window.utils.isEnterPressEvent(evt, showSetup);
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterPressEvent(evt, hideSetup);
  });

  setupHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };
      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.setup.setupWindow.style.top = (window.setup.setupWindow.offsetTop - shift.y) + 'px';
      window.setup.setupWindow.style.left = (window.setup.setupWindow.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (stopEvt) {
          stopEvt.preventDefault();
          setupHandler.removeEventListener('click', onClickPreventDefault);
        };
        setupHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onSaveDataSuccess = function () {
    hideSetup();
  };

  var onSaveDataError = function (errorMessage) {
    window.utils.createErrorBanner(errorMessage, window.utils.SAVE_DATA_BANNER_MESSAGE);
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(onSaveDataSuccess, onSaveDataError, new FormData(setupForm), window.backend.URL);
  });

  window.utils.setElementAttributes(setupForm, FORM_ATTRIBUTES);
  window.utils.setElementAttributes(setupOpenIcon, TABINDEX_ATTRIBUTE);
  window.utils.setElementAttributes(setupClose, TABINDEX_ATTRIBUTE);
  window.utils.setElementAttributes(wizardCoat, TABINDEX_ATTRIBUTE);
  window.utils.setElementAttributes(wizardEyes, TABINDEX_ATTRIBUTE);
  window.utils.setElementAttributes(wizardFireball, TABINDEX_ATTRIBUTE);
  window.utils.setElementAttributes(setupUserName, USERNAME_ATTRIBUTES);
})();
