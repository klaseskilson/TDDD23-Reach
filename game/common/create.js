'use strict';

var ReachStateCreate = {
  /**
   * prepare the map
   * @param levelKey cache key to tilemap
   */
  setupMap: function (levelKey) {
    var self = this;
    // prepare tilemap
    self.map = self.game.add.tilemap(levelKey);
    self.map.addTilesetImage('reach_sprites', 'reachSprites');
    // extract objects from tilemap
    self.backgroundLayer = self.map.createLayer('distant');
    self.backgroundLayer = self.map.createLayer('background');
    self.blockedLayer = self.map.createLayer('blocked');
    // collisions between player an blockedLayer
    self.map.setCollisionBetween(1, 2000, true, self.blockedLayer);
    self.backgroundLayer.resizeWorld();
  },

  /**
   * initiate keyboard subscriptions
   * @param keys object containing the pre-defined keys you want to activate:
   * `cursors` - player movement
   * `spacebar` - light control
   */
  setupInput: function (keys) {
    var self = this;
    if (keys.cursors) {
      // subscribe to cursor keys
      self.cursors = self.game.input.keyboard.createCursorKeys();
    }

    if (keys.spacebar) {
      self.setupLantern();
    }
  },

  setupLantern: function () {
    var self = this;
    self.spacebar = self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    self.spacebar.onDown.add(self.togglePlayerLight, self);

    // setup user lantern
    self.lanternTimer = self.game.time.create();
    self.lanternTimer.add(self.lanternLightDuration, self.gameOver, self);
    self.lanternTimer.start();
    self.lanternTimer.pause();
  },

  createPlayer: function (playerOptions) {
    var self = this;
    self.player = self.game.add.sprite(playerOptions.x, playerOptions.y, 'boy');

    // enable physics for the player
    self.game.physics.arcade.enable(self.player);
    // append physics characteristics to player
    self.player.body.bounce.y = 0.2;
    self.player.body.gravity.y = 600;
    self.player.body.collideWorldBounds = true;

    // add self.player animations
    var playerFrameRate = 8;
    self.player.animations.add('left', [0, 1, 2, 3], playerFrameRate, true);
    self.player.animations.add('right', [5, 6, 7, 8], playerFrameRate, true);

    // follow player with camera
    self.game.camera.follow(self.player);
  },

  createDarkness: function (levelLightDuration) {
    var self = this;

    // setup global timer
    self.levelLightDuration = levelLightDuration || ReachConfig.defaultLevelDuration;
    self.levelTimer = self.game.time.create();
    self.levelTimer.add(self.levelLightDuration, self.gameOver, self);
    self.levelTimer.start();

    // setup global overlay
    self.shadowTexture = self.game.add.bitmapData(self.map.widthInPixels, self.map.heightInPixels);
    // add overlay to game
    self.shadowTextureSprite = self.game.add.image(0, 0, self.shadowTexture);
    // blend mode multiply will darken everything below this texture
    self.shadowTextureSprite.blendMode = Phaser.blendModes.MULTIPLY;
  },

  createExtraLights: function (lights, radius) {
    var self = this;

    self.extraLights = self.extraLights || [];

    lights.forEach(function (light) {
      var r = light.properties.radius || radius;
      self.extraLights.push({
        x: light.x,
        y: light.y,
        radius: r
      });
    });
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
