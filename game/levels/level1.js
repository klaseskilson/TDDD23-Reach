'use strict';

function Level1State() {}

Level1State.prototype = _.defaults({
  create: function () {
    var self = this;

    // add background image
    var backgroundImage = self.game.add.image(0, 0, 'background');
    backgroundImage.fixedToCamera = true;
    var scaleFactor = ReachConfig.gameWidth / backgroundImage.texture.frame.width;
    backgroundImage.scale.setTo(scaleFactor, scaleFactor);

    self.setupMap('level1');
    self.fullLightIntensity = .8;
    // config lantern light duration
    self.lanternLightDuration = ReachConfig.lanternLightDuration;
    //self.setupInput({cursors: true, spacebar: true});
    self.setupInput({cursors: true});

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    self.createPlayer(playerSearch[0]);

    self.foregroundLayer = self.map.createLayer('foreground');

    // setup level exit
    var doorSearch = ReachUtilities.findObjectsByType('mapExit', self.map, 'objectLayer');
    self.createLevelExit(doorSearch[0]);

    // prepare light - give the player long time
    self.createDarkness(20 * 60 * 1000);
    var lightSearch = ReachUtilities.findObjectsByType('smallLight', self.map, 'objectLayer');
    self.createExtraLights(lightSearch, ReachConfig.smallLightRadius);
  },

  update: function () {
    this.updatePlayer();
    this.updatePlayerProgress();
    this.updateLevelLight();
  }
}, ReachStateCreate, ReachStateUpdate, ReachStateChange);
