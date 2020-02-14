// Файл dialog.js
'use strict';
(function () {
  var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyes = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupWizard = userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');

  var dialogHandler = userDialog.querySelector('.upload');

  setupOpen.addEventListener('click', function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        userDialog.classList.add('hidden');
      }
    });
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      userDialog.classList.remove('hidden');
    }
  });

  setupClose.addEventListener('click', function () {
    userDialog.classList.add('hidden');
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      userDialog.classList.add('hidden');
    }
  });

  var getRandomColor = function (colorsList, colorsCount) {
    return colorsList[window.util.getRandomValue(colorsCount)];
  };

  var clickOnWizardCoat = function () {
    var generatedColor = getRandomColor(coats, 5);
    var coatColorInput = userDialog.querySelector('.setup-coat-color');
    wizardCoat.style.fill = generatedColor;
    coatColorInput.value = generatedColor;
  };

  var clickOnWizardEyes = function () {
    var generatedColor = getRandomColor(eyes, 5);
    var coatColorInput = userDialog.querySelector('.setup-eyes-color');
    wizardEyes.style.fill = generatedColor;
    coatColorInput.value = generatedColor;
  };

  var clickOnFireball = function () {
    var generatedColor = getRandomColor(fireballs, 4);
    var fireballColorInput = userDialog.querySelector('.setup-fireball-color');
    fireball.style.backgroundColor = generatedColor;
    fireballColorInput.value = generatedColor;
  };

  wizardCoat.addEventListener('click', function () {
    clickOnWizardCoat();
  });

  wizardEyes.addEventListener('click', function () {
    clickOnWizardEyes();
  });

  fireball.addEventListener('click', function () {
    clickOnFireball();
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
