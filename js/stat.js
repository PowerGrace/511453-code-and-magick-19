'use strict';
(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var MAX_BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_X = 150;
  var BAR_X_GAP = 50 + BAR_WIDTH;
  var TEXT_GAP = 20;
  var TEXT_WIDTH = 16;
  var NAME_Y = CLOUD_HEIGHT - TEXT_GAP;
  var BAR_Y = NAME_Y - TEXT_GAP;
  var MAX_TIME_Y = CLOUD_HEIGHT + CLOUD_Y - BAR_Y + TEXT_GAP;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxResult = function (results) {
    var maxResult = results[0];

    for (var i = 0; i < results.length; i++) {
      if (results[i] > maxResult) {
        maxResult = results[i];
      }
    }

    return maxResult;
  };

  var generateColor = function () {
    var color = 'hsl(240, ';

    color += Math.floor(Math.random() * 100);
    color += '%, 50%)';

    return color;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    ctx.fillStyle = '#000000';
    ctx.font = '16px "PT Mono"';
    ctx.fillText('Ура вы победили!', BAR_X, CLOUD_Y + TEXT_GAP);
    ctx.fillText('Список результатов:', BAR_X, CLOUD_Y + TEXT_GAP + TEXT_WIDTH);

    var maxTime = getMaxResult(times);

    for (var i = 0; i < names.length; i++) {
      var time = Math.trunc(times[i]);
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], BAR_X + BAR_X_GAP * i, NAME_Y);
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : generateColor();
      ctx.fillRect(BAR_X + BAR_X_GAP * i, BAR_Y, BAR_WIDTH, (MAX_BAR_HEIGHT * time / maxTime) * -1);
      ctx.fillStyle = '#000000';
      ctx.fillText(time, BAR_X + BAR_X_GAP * i, MAX_TIME_Y + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * time / maxTime));
    }
  };
})();
