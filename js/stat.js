'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var MAX_HIST_HEIGHT = 150;
  var TEXT_X = 310;
  var TEXT_Y = 30;

  // ОТРИСОВКА САМОГО ОКНА

  var renderCloud = function (ctx, x, y, color) {
    var coeff = 10;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(x + CLOUD_WIDTH / 2, y + coeff);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH - coeff, y + CLOUD_HEIGHT / 2);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH - CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - coeff);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + coeff, y + CLOUD_HEIGHT / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  // ПОЛУЧЕНИЕ ПРОМЕЖУТОЧНЫХ ДАННЫХ

  // Поиск максимального значения (самый высокий столбец)
  var getMaxElement = function (array) {
    var maxElement = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return Math.ceil(maxElement);
  };

  // Генерация рандомного синего цвета
  var getBarColor = function () {
    var BLUE_MIN = 10;
    var BLUE_MAX = 150;
    var COLOR_STEP = 10;
    // Генерируем случайное число от 10 до 150 (синий диапазон)
    var ran = Math.abs(Math.floor(Math.random() * (BLUE_MIN - BLUE_MAX) + COLOR_STEP));
    // Формируем вывод цвета в нужном формате rgba
    var color = 'rgba(' + ran + ', ' + ran + ', ' + '255, 1)';
    return color;
  };

  // ОТРИСОВКА ОКНА И ЕГО СОДЕРЖИМОГО

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    // Отрисовка текста в облаке
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.fillText('Ура, вы победили!', TEXT_X, TEXT_Y);
    ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + 20);

    // Гистограмма
    ctx.textAlign = 'left';
    ctx.textBaseline = 'baseline';
    ctx.font = '16px PT Mono';
    var maxTime = getMaxElement(times);
    // Отрисовка имён и столбиков гистограммы
    for (var i = 0; i < names.length; i++) {
      var cloudBottom = CLOUD_Y + CLOUD_HEIGHT;
      ctx.fillStyle = '#000000';
      ctx.fillText(
          names[i],
          CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
          cloudBottom - GAP * 3);
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = getBarColor();
      }
      ctx.fillRect(
          CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
          (cloudBottom) - (GAP * 3 + GAP) - (times[i] * MAX_HIST_HEIGHT) / maxTime,
          BAR_WIDTH,
          (times[i] * MAX_HIST_HEIGHT) / maxTime);
      ctx.fillStyle = '#000000';
      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
          cloudBottom - (GAP * 3 + GAP) - (times[i] * MAX_HIST_HEIGHT) / maxTime - GAP * 1.5);
    }
  };
})();
