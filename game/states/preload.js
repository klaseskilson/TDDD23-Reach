'use strict';

function PreloadState() {}

PreloadState.prototype = {
  preload: function () {
    var self = this;
    self.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    self.game.time.advancedTiming = true;
  },

  create: function () {
    var self = this;

    // use arcade physics lib
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    self.game.state.start('intro');
  }
};
