'use strict';
var WIZARD_NAMES = 4;

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');

var show = function (hiddenElement) {
  hiddenElement.classList.remove('hidden');
};
// show(userDialog);

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

setupOpen.addEventListener('click', function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      userDialog.classList.add('hidden');
    }
  });
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    userDialog.classList.remove('hidden');
  }
});

setupClose.addEventListener('click', function () {
  userDialog.classList.add('hidden');
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    userDialog.classList.add('hidden');
  }
});

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomValue = function (maxValue) {
  return Math.round(Math.random() * (maxValue));
};

var creatureWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_NAMES; i++) {
    wizards[i] = {
      fullName: names[getRandomValue(names.length - 1)] + ' ' + surnames[getRandomValue(surnames.length - 1)],
      coatColor: coats[getRandomValue(coats.length - 1)],
      eyesColor: eyes[getRandomValue(eyes.length - 1)]
    };
  }
  return wizards;
};

var addElement = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(creatureWizard(array[i]));
  }
  return fragment;
};

similarListElement.appendChild(addElement(generateWizards()));

show(userDialog.querySelector('.setup-similar'));

var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');

var getRandomColor = function (colorsList, colorsCount) {
  return colorsList[getRandomValue(colorsCount)];
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
