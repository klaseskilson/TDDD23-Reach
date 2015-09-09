'use strict';

function BootState() {};

BootState.prototype = {
  preload: function() {
    // custom game config
    this.reachConfig = {
      worldGravity: 300,
      mapWidth: 300,
      debug: true
    };
  },

  create: function() {
    var self = this;

    if (self.reachConfig.debug) {
      self.game.add.plugin(Phaser.Plugin.Debug);
    }

    self.game.state.start('preload');
  }
};
