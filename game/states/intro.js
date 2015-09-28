'use strict';

function IntroState() {}

IntroState.prototype = {
  create: function () {
    var self = this;

    // prepare tilemap
    self.map = self.game.add.tilemap('map1');
    self.map.addTilesetImage('simples_pimples', 'gameSprites');

    // extract objects from tilemap
    self.backgroundLayer = self.map.createLayer('backgroundLayer');
    self.blockedLayer = self.map.createLayer('blockedLayer');

    // collisions between player an blockedLayer
    self.map.setCollisionBetween(1, 2000, true, self.blockedLayer);

    self.backgroundLayer.resizeWorld();

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', this.map, 'objectLayer');
    self.player = self.game.add.sprite(playerSearch[0].x, playerSearch[0].x, 'player');

    // enable physics for the player
    self.game.physics.arcade.enable(self.player);
    // append physics characteristics to player
    self.player.body.bounce.y = 0.2;
    self.player.body.gravity.y = 600;
    self.player.body.collideWorldBounds = true;

    // add self.player animations
    //self.player.animations.add('left', [0, 1, 2, 3], 10, true);
    //self.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // follow player with camera
    self.game.camera.follow(self.player);

    // subscribe to cursor keys
    self.cursors = self.game.input.keyboard.createCursorKeys();
  },

  update: function () {
    var self = this;

    self.player.body.velocity.x = 0;

    // activate collisions between player and platforms from blockedLayer
    self.game.physics.arcade.collide(self.player, self.blockedLayer);

    if (self.cursors.left.isDown) {
      // move to the left
      self.player.body.velocity.x = -1 * ReachConfig.player.velocity;
      self.player.animations.play('left');
    } else if (self.cursors.right.isDown) {
      // move to the right
      self.player.body.velocity.x = ReachConfig.player.velocity;
      self.player.animations.play('right');
    } else {
      // dont move
      self.player.animations.stop();
      self.player.frame = 4;
    }
    if (self.cursors.up.isDown && self.player.body.onFloor()) {
      self.player.body.velocity.y = -1 * ReachConfig.player.jump;
    }
  }
};
