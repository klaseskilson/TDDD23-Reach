'use strict';

function PreloadState() {}

PreloadState.prototype = {
  preload: function () {
    var self = this;

    self.preloadBar = self.add.sprite(self.game.width/2, self.game.height/2, 'loader');
    self.preloadBar.anchor.setTo(0.5, 0.5);
    self.load.setPreloadSprite(self.preloadBar);

    self.game.load.tilemap('intro', 'assets/tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.tilemap('level3', 'assets/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.image('reachSprites', 'assets/images/reach_sprite.png');
    self.game.load.image('background', 'assets/images/dawn.png');
    self.game.load.image('menuBackground', 'assets/images/menu.png');
    self.game.load.image('arrow', 'assets/images/arrow.png');
    self.game.load.spritesheet('enabledButtons', 'assets/images/buttons_enabled.png', 20, 20);
    self.game.load.spritesheet('disabledButtons', 'assets/images/buttons_disabled.png', 20, 20);
    self.game.load.spritesheet('boy', 'assets/images/boy.png', 18, 29);
    self.game.load.spritesheet('lanternBoy', 'assets/images/boy_lantern.png', 18, 29);
    self.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png',
      'assets/fonts/carrier_command.xml');

    Phaser.Canvas.setSmoothingEnabled(self.game.canvas, false);
  },

  create: function () {
    this.game.state.start('menu');
  }
};
