'use strict';

function Level3State() {}

Level3State.prototype = _.defaults({
  create: function () {
    var self = this;

    // add background image
    var backgroundImage = self.game.add.image(0, 0, 'background');
    backgroundImage.fixedToCamera = true;
    var scaleFactor = ReachConfig.gameWidth / backgroundImage.texture.frame.width;
    backgroundImage.scale.setTo(scaleFactor, scaleFactor);

    self.setupMap('level3');
    self.fullLightIntensity = .8;
    self.setupInput({cursors: true});

    // setup player
    var playerSearch = ReachUtilities.findObjectsByType('playerStart', self.map, 'objectLayer');
    self.createPlayer(playerSearch[0]);

    self.foregroundLayer = self.map.createLayer('foreground');

    // setup level exit
    var doorSearch = ReachUtilities.findObjectsByType('mapExit', self.map, 'objectLayer');
    self.createLevelExit(doorSearch[0]);

    // prepare light & compensate for full intensity
    self.createDarkness(60 * 1000 / self.fullLightIntensity);
    var lightSearch = ReachUtilities.findObjectsByType('smallLight', self.map, 'objectLayer');
    self.createExtraLights(lightSearch, ReachConfig.smallLightRadius);

    var messageSearch = ReachUtilities.findObjectsByType('keyboardTrigger', self.map, 'objectLayer');
    self.createKeyboardTriggers(messageSearch, Phaser.Keyboard.E);

    var areaSearch = ReachUtilities.findObjectsByType('areaTrigger', self.map, 'objectLayer');
    self.createAreaTriggers(areaSearch);
  },

  update: function () {
    this.updatePlayer();
    this.updatePlayerProgress();
    this.updateLevelLight();
    this.detectPlayerMessages();
  },

  enableLantern: function () {
    this.lanternLightDuration = ReachConfig.lanternLightDuration;
    this.setupInput({spacebar: true});
  }
}, ReachStateCreate, ReachStateUpdate, ReachStateChange, ReachRender);
