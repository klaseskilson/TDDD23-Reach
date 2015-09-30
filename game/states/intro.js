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

    // subscribe to cursor keys
    self.cursors = self.game.input.keyboard.createCursorKeys();

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    self.createPlayer(playerSearch[0]);

    var doorSearch = ReachUtilities.findObjectsByType('door', self.map, 'objectLayer');
    self.createLevelExit(doorSearch[0]);

    // prepare light
    self.createDarkness(60*1000);
  },

  update: function () {
    this.updatePlayer();
    this.updatePlayerProgress();
    this.updateLevelLight();
  }
}, ReachStateCreate, ReachStateUpdate);
