'use strict';

var game, player;

window.onload = function() {
  var methods = {
    preload: preload,
    create: create,
    update: update,
    render: render
  };
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', methods);
};
