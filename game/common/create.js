'use strict';

var ReachStateCreate = {
  createPlayer: function (playerOptions) {
    var self = this;
    self.player = self.game.add.sprite(playerOptions.x, playerOptions.y, 'player');

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
  },

  createDarkness: function (levelLightDuration, lanternLightDuration) {
    var self = this;

    // setup global timer
    self.levelLightDuration = levelLightDuration || ReachConfig.defaultLevelDuration;
    self.levelTimer = self.game.time.create();
    self.levelTimer.add(self.levelLightDuration, self.gameOver, self);
    self.levelTimer.start();

    // setup user lantern
    self.lanternLightDuration = lanternLightDuration || ReachConfig.lanternLightDuration;
    self.lanternTimer = self.game.time.create();
    self.lanternTimer.add(self.lanternLightDuration, self.gameOver, self);
    self.lanternTimer.start();
    self.lanternTimer.pause();

    // setup global overlay
    self.shadowTexture = self.game.add.bitmapData(self.map.widthInPixels, self.map.heightInPixels);
    // add overlay to game
    self.shadowTextureSprite = self.game.add.image(0, 0, self.shadowTexture);
    // blend mode multiply will darken everything below this texture
    self.shadowTextureSprite.blendMode = Phaser.blendModes.MULTIPLY;
  },

  /**
   * setup where the current level is finished
   *
   * @param goalObject object containing x & y where
   */
  createLevelExit: function (goalObject) {
    var self = this;

    self.doors = self.game.add.group();
    self.doors.enableBody = true;

    ReachUtilities.createFromTiledObject(goalObject, self.doors);
  }
};
