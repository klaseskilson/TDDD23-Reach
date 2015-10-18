'use strict';

// Store common game state methods here, and extend it into the state's prototype
var ReachStateUpdate = {
  updatePlayer: function () {
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
  },

  updateLevelLight: function () {
    var self = this;
    if (self.levelTimer && self.levelTimer.running && self.shadowTexture) {
      var fullLight = self.fullLightIntensity || 1.0;
      var progress = self.levelTimer.duration / self.levelLightDuration;
      progress = parseInt(255 * progress * fullLight);

      // update darkness
      //console.log('Time progress:', progress);
      self.shadowTexture.context.fillStyle = "rgb(" + progress + "," + progress + "," + progress + ")";
      self.shadowTexture.context.fillRect(0, 0, self.shadowTexture.width, self.shadowTexture.height);

      self.drawLantern();
      self.drawExtraLights();

      // ensure overlay gets redrawn
      self.shadowTexture.dirty = true;
    }
  },

  drawLantern: function () {
    var self = this;
    // detect if player light is activated
    if (self.lanternTimer && !self.lanternTimer.paused && self.lanternTimer.duration > 0) {
      // calculate the life of the lantern, the closer towards 0 the less life is there left
      var lanternProgress = 1 - self.lanternTimer.duration / self.lanternLightDuration;
      // calculate flickering (increasing as lantern drains)
      var maximumRadiusFlicker = 15;
      var radiusFlicker = self.game.rnd.integerInRange(0, parseInt(maximumRadiusFlicker * lanternProgress));
      var colorFlicker = lanternProgress * Math.random();
      var radius = ReachConfig.lanternRadius + radiusFlicker;
      var lightPos = {
        x: self.player.body.x + (self.player.body.width/2),
        y: self.player.body.y + (self.player.body.height/2)
      };
      self.createLightRadius(lightPos, ReachConfig.lanternRadius * .25, radius, (1.0 - colorFlicker));
    }
  },

  drawExtraLights: function () {
    var self = this;

    if (!self.extraLights || self.extraLights.length === 0) return;

    self.extraLights.forEach(function (light) {
      self.createLightRadius(light, light.radius * .25, light.radius, light.intensity);
    });
  },

  createLightRadius: function (position, innerRadius, outerRadius, intensity) {
    var self = this;

    if (!self.shadowTexture) return;

    var gradient = self.shadowTexture.context.createRadialGradient(
      position.x, position.y, innerRadius,
      position.x, position.y, outerRadius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + intensity + ')');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    self.shadowTexture.context.beginPath();
    self.shadowTexture.context.fillStyle = gradient;
    self.shadowTexture.context.arc(position.x, position.y, outerRadius, 0, Math.PI*2);
    self.shadowTexture.context.fill();
  },

  updatePlayerProgress: function () {
    this.game.physics.arcade.overlap(this.player, this.doors, this.mapFinished, null, this);
  },

  detectPlayerMessages: function () {
    if (!this.areaTriggers) return;
    this.game.physics.arcade.overlap(this.player, this.areaTriggers, this.displayMessages, null, this);
  },

  displayMessages: function (player, trigger) {
    this.displaySubTitle(trigger.message, 4*1000);
  },

  togglePlayerLight: function () {
    var self = this;
    if (typeof self.lanternTimer === "undefined") return;

    if (self.lanternTimer.paused === false) {
      console.log('pausing player light');
      self.lanternTimer.pause();
      self.player.loadTexture('boy');
      // the game might be over if the player chooses to turn of the light,
      // therefore we call self.gameOver to test this
      self.gameOver();
    } else {
      console.log('resuming player light');
      self.lanternTimer.resume();
      self.player.loadTexture('lanternBoy');
    }
  },

  handleKeyToggle: function () {
    var self = this.context;
    var key = this.key;

    if (self.triggerKeyAreas && self.triggerKeyAreas[key]) {
      _.forEach(self.triggerKeyAreas[key], function (area) {
        var yDist = Math.abs(self.player.y - area.y);
        var xDist = Math.abs(self.player.x - area.x);
        if (yDist < area.radius && xDist < area.radius) {
          self.displaySubTitle(area.message);
        }
      });
    }
  },

  displaySubTitle: function (text, timeout) {
    timeout = timeout || 7*1000;
    var self = this;
    if (self.subTitle)
      self.subTitle.destroy();

    text = text.replace('\\n', '\n');

    self.subTitle = self.game.add.bitmapText(self.game.width / 2, self.game.height, 'carrier_command', text, 6);
    self.subTitle.fixedToCamera = true;
    self.subTitle.anchor.x = 0.5;
    self.subTitle.anchor.y = 1;
    self.subTitle.align = 'center';

    window.setTimeout(function () {
      self.subTitle.destroy();
    }, timeout);
  }
};
