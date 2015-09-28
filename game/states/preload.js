'use strict';

function PreloadState() {}

PreloadState.prototype = {
  preload: function () {
    var self = this;
    self.game.load.tilemap('map1', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    self.game.load.image('gameSprites', 'assets/images/simples_pimples.png');
    self.game.load.image('player', 'assets/images/player.png');
    self.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
  },

  create: function () {
    this.game.state.start('intro');
  }
};
