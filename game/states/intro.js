'use strict';

function IntroState() {}

IntroState.prototype = {
  create: function () {
    var self = this;

    // setup player
    self.player = self.game.add.sprite(32, self.game.world.height - 150, 'dude');

    // enable physics for the player
    self.game.physics.arcade.enable(self.player);
    // append physics to player
    self.player.body.bounce.y = 0.2;
    self.player.body.gravity.y = 600;
    self.player.body.collideWorldBounds = true;

    // add self.player animations
    self.player.animations.add('left', [0, 1, 2, 3], 10, true);
    self.player.animations.add('right', [5, 6, 7, 8], 10, true);
  },

  update: function () {
    this.player.animations.stop();
  }
};
