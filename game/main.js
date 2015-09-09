'use strict';

function Reach() {};

Reach.prototype = {
  start: function () {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

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