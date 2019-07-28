'use strict';

// DRAG N DROP ОКНА НАСТРОЕК ПЕРСОНАЖА

(function () {

  // Элемент, за который будем перетаскивать
  var dialogHandler = window.userDialog.querySelector('.setup input');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Записываем стартовые координаты
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    // При каждом движении мыши обновляем смещение относительно первоначальной точки
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
      window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';
    };

    // При отжатии кнопки мыши
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      if (dragged) {
        var onClickPreventDefault = function (preEvt) {
          preEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
