'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 15;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_MAX_HEIGTH = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderResult = function (ctx, names, times, count) {
    var barHeight = times[count] * BAR_MAX_HEIGTH / window.utils.getMaxElement(times, Math.min(names.length, times.length));
    ctx.fillStyle = '#000';
    ctx.fillText(names[count], CLOUD_X + BAR_GAP * (count + 1) + BAR_WIDTH * count, CLOUD_Y + CLOUD_HEIGHT - GAP * 2);
    ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    if (names[count] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP * (count + 1) + BAR_WIDTH * count, CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - FONT_GAP - barHeight, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[count]), CLOUD_X + BAR_GAP * (count + 1) + BAR_WIDTH * count, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - FONT_GAP - barHeight);
  };

  var showResultText = function (ctx, string1, string2) {
    ctx.fillText(string1, CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP);
    ctx.fillText(string2, CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP * 2);
  };

  window.renderStatistics = function (ctx, names, times) {
    var barsCount = Math.min(names.length, times.length);
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    ctx.fillStyle = 'black';
    ctx.font = 'PT Mono 16px';
    if (names.length !== times.length) {
      showResultText(ctx, 'Ошибка входных данных: количество игроков', 'не равно количеству результатов!');
    } else {
      showResultText(ctx, 'Список результатов:', 'Ура вы победили!');
    }
    for (var i = 0; i < barsCount; i++) {
      renderResult(ctx, names, times, i);
    }
  };
})();
