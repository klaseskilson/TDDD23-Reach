'use strict';

function IntroState() {}

IntroState.prototype = _.defaults({
  create: function () {
    var self = this;

    // add background image
    var backgroundImage = self.game.add.image(0, 0, 'background');
    backgroundImage.fixedToCamera = true;
    var scaleFactor = ReachConfig.gameWidth / backgroundImage.texture.frame.width;
    backgroundImage.scale.setTo(scaleFactor, scaleFactor);

    self.setupMap('intro');

    // config lantern light duration
    self.lanternLightDuration = ReachConfig.lanternLightDuration;
    self.setupInput({cursors: true, spacebar: true});

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    self.createPlayer(playerSearch[0]);

    // setup level exit
    var doorSearch = ReachUtilities.findObjectsByType('mapExit', self.map, 'objectLayer');
    self.createLevelExit(doorSearch[0]);

    // prepare light
    self.createDarkness();
    var lightSearch = ReachUtilities.findObjectsByType('smallLight', self.map, 'objectLayer');
    self.createExtraLights(lightSearch, ReachConfig.smallLightRadius);
  },

  update: function () {
    this.updatePlayer();
    this.updatePlayerProgress();
    this.updateLevelLight();
  }
}, ReachStateCreate, ReachStateUpdate, ReachStateChange);
