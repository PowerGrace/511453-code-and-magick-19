// Файл util.js
'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var getRandomValue = function (maxValue) {
    return Math.round(Math.random() * (maxValue));
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomValue: getRandomValue,
  };
})();
