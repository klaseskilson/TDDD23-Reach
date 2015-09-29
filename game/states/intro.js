'use strict';

function IntroState() {}

IntroState.prototype = _.assign({
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
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    console.log('player pos', playerSearch[0]);
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

    // prepare light
    self.createLevelTime();
  },

  update: function () {
    this.updatePlayer();
    this.updateLevelLight();
  }
}, ReachGameState);
