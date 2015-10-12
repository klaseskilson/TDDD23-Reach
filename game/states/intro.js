'use strict';

function IntroState() {}

IntroState.prototype = _.defaults({
  create: function () {
    var self = this;

    // prepare tilemap
    self.map = self.game.add.tilemap('intro');
    self.map.addTilesetImage('reach_sprites', 'reachSprites');

    // extract objects from tilemap
    self.backgroundLayer = self.map.createLayer('background');
    self.blockedLayer = self.map.createLayer('blocked');

    // collisions between player an blockedLayer
    self.map.setCollisionBetween(1, 2000, true, self.blockedLayer);

    self.backgroundLayer.resizeWorld();

    // config lantern light duration
    self.lanternLightDuration = ReachConfig.lanternLightDuration;
    self.setupInput({cursors: true, spacebar: true});

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    self.createPlayer(playerSearch[0]);

    var doorSearch = ReachUtilities.findObjectsByType('mapExit', self.map, 'objectLayer');
    self.createLevelExit(doorSearch[0]);

    // prepare light
    self.createDarkness();
  },

  update: function () {
    this.updatePlayer();
    this.updatePlayerProgress();
    this.updateLevelLight();
  }
}, ReachStateCreate, ReachStateUpdate);
