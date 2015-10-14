'use strict';

function Reach() {}

Reach.prototype = {
  start: function () {
    var windowAspectRatio = 1.0;
    var gameHeight = Math.round(ReachConfig.gameWidth * windowAspectRatio);
    var game = new Phaser.Game(ReachConfig.gameWidth, gameHeight, Phaser.AUTO, '', null, false, true);
    game.config.resolution = window.devicePixelRatio;

    game.state.add('boot', BootState);
    game.state.add('preload', PreloadState);
    game.state.add('intro', IntroState);
    game.state.add('level1', Level1State);

    game.state.start('boot');
  }
};

window.onload = function () {
  var game = new Reach();
  game.start();
};
