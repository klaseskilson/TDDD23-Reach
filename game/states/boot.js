'use strict';

function BootState() {};

BootState.prototype = {
  preload: function () {
    this.game.load.image('loader', 'assets/images/loader.png');
  },

  create: function() {
    var self = this;

    //self.game.stage.smoothed = false;

    //have the game centered horizontally
    self.scale.pageAlignHorizontally = true;
    self.scale.pageAlignVertically = true;

    if (ReachConfig.debug) {
      self.game.add.plugin(Phaser.Plugin.Debug);
    }

    // use arcade physics lib
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    var gameSize = Math.min(window.innerHeight, window.innerWidth);
    var pixelElem = document.getElementById("pixel");
    pixelElem.height = pixelElem.width = gameSize;
    var pixelContext = pixelElem.getContext("2d");
    Phaser.Canvas.setSmoothingEnabled(pixelContext, false);


    self.game.state.start('preload');
  }
};
