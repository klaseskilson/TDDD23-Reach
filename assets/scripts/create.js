'use strict';

var create = function () {
  // use arcade physics lib
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // setup player
  player = game.add.sprite(32, game.world.height - 150, 'dude');

  // enable the player
  game.physics.arcade.enable(player);
  // append physics to player
  player.body.bounce.y = .2;
  player.body.gravity.y = 600;
  player.body.collideWorldBounds = true;

  // add player animations
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
};
