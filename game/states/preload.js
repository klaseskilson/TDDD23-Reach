'use strict';

function PreloadState() {}

PreloadState.prototype = {
  preload: function () {
    var self = this;
    self.game.load.tilemap('map1', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.tilemap('intro', 'assets/tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.image('gameSprites', 'assets/images/simples_pimples.png');
    self.game.load.image('reachSprites', 'assets/images/reach_sprite.png');
    self.game.load.image('player', 'assets/images/player.png');
    self.game.load.spritesheet('boy', 'assets/images/boy.png', 21, 32);
  },

  create: function () {
    this.game.state.start('intro');
  }
};
