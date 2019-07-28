'use strict';

// НАСТРОЙКА ВНЕШНЕГО ВИДА МАГА

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // Настраиваемые элементы мага и скрытые поля
  var setupPlayer = window.userDialog.querySelector('.setup-player');

  var wizardCoatElement = setupPlayer.querySelector('.wizard-coat');
  var coatColorInput = document.getElementById('coat-color');

  var wizardEyesElement = setupPlayer.querySelector('.wizard-eyes');
  var eyesColorInput = document.getElementById('eyes-color');

  var setupFireballElement = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballColorInput = document.getElementById('fireball-color');

  // Функция для изменения цвета мантии при нажатии
  var coatClickHandler = function () {
    var newColor = window.util.getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    coatColorInput.value = newColor;
    window.coatColor = newColor;
    changeCoat();
  };

  var changeCoat = window.debounce(window.updateWizards);

  wizardCoatElement.addEventListener('click', coatClickHandler);

  // Изменение цвета глаз при нажатии
  var eyesClickHandler = function () {
    var newColor = window.util.getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    eyesColorInput.value = newColor;
    window.eyesColor = newColor;
    changeEyes();
  };

  var changeEyes = window.debounce(window.updateWizards);

  wizardEyesElement.addEventListener('click', eyesClickHandler);

  // Изменение цвета файербола при нажатии
  var fireballClickHandler = function () {
    var newColor = window.util.getRandomElement(FIREBALL_COLORS);
    setupFireballElement.style.backgroundColor = newColor;
    fireballColorInput.value = newColor;
    window.fireballColor = newColor;
    window.updateWizards();
  };

  setupFireballElement.addEventListener('click', fireballClickHandler);
})();
