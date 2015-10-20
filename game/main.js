'use strict';

function Reach() {}

Reach.prototype = {
  start: function () {
    var game = new Phaser.Game(ReachConfig.gameWidth, ReachConfig.gameHeight, Phaser.AUTO, 'phaser', null, false, false);

    game.state.add('boot', BootState);
    game.state.add('preload', PreloadState);
    game.state.add('menu', MenuState);
    game.state.add('intro', IntroState);
    game.state.add('level1', Level1State);
    game.state.add('level2', Level2State);
    game.state.add('level3', Level3State);

    game.state.start('boot');
  }
};

window.onload = function () {
  var game = new Reach();
  game.start();
};
