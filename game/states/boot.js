'use strict';

function BootState() {};

BootState.prototype = {
  create: function() {
    var self = this;
    self.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    self.scale.pageAlignHorizontally = true;
    self.scale.pageAlignVertically = true;

    if (ReachConfig.debug) {
      self.game.add.plugin(Phaser.Plugin.Debug);
    }

    // use arcade physics lib
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    self.game.state.start('preload');
  }
};
