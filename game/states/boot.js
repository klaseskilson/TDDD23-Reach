'use strict';

function BootState() {};

BootState.prototype = {
  create: function() {
    var self = this;
    self.game.stage.smoothed = false;

    //have the game centered horizontally
    self.scale.pageAlignHorizontally = true;
    self.scale.pageAlignVertically = true;

    if (ReachConfig.debug) {
      self.game.add.plugin(Phaser.Plugin.Debug);
    }

    // use arcade physics lib
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    self.game.state.start('preload');

    var gameSize = Math.min(window.innerHeight, window.innerWidth);
    var pixelElem = document.getElementById("pixel");
    pixelElem.height = pixelElem.width = gameSize;
    var pixelContext = pixelElem.getContext("2d");
    Phaser.Canvas.setSmoothingEnabled(pixelContext, false);
  }
};
