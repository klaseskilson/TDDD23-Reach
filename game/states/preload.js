'use strict';

function PreloadState() {}

PreloadState.prototype = {
  preload: function () {
    var self = this;
    self.game.load.tilemap('intro', 'assets/tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.image('reachSprites', 'assets/images/reach_sprite.png');
    self.game.load.image('background', 'assets/images/dawn.png');
    self.game.load.spritesheet('boy', 'assets/images/boy.png', 18, 29);
    self.game.load.spritesheet('lanternBoy', 'assets/images/boy_lantern.png', 18, 29);
  },

  create: function () {
    this.game.state.start('level1');
  }
};
