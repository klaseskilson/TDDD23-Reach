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
      //console.log(self.levelTimer.duration)
      var progress = self.levelTimer.duration / self.levelLightDuration;
      progress = parseInt(255 * progress);

      // update darkness
      //console.log('Time progress:', progress);
      self.shadowTexture.context.fillStyle = "rgb(" + progress + "," + progress + "," + progress + ")";
      self.shadowTexture.context.fillRect(0, 0, self.shadowTexture.width, self.shadowTexture.height);

      // detect if player light is activated
      if (self.lanternTimer && !self.lanternTimer.paused && self.lanternTimer.duration > 0) {
        var lanternProgress = 1 - self.lanternTimer.duration / self.lanternLightDuration;
        // calculate flickering (increasing as lantern drains)
        var maximumFlicker = 15;
        var radiusFlicker = self.game.rnd.integerInRange(0, parseInt(maximumFlicker * lanternProgress));
        var colorFlicker = lanternProgress * Math.random();
        var radius = ReachConfig.lanternRadius + radiusFlicker;
        var playerPos = {
          x: self.player.body.x,
          y: self.player.body.y
        };
        var gradient = self.shadowTexture.context.createRadialGradient(
          playerPos.x, playerPos.y, ReachConfig.lanternRadius * .75,
          playerPos.x, playerPos.y, radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, ' + (1.0 - colorFlicker) + ')');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        self.shadowTexture.context.beginPath();
        self.shadowTexture.context.fillStyle = gradient;
        self.shadowTexture.context.arc(playerPos.x, playerPos.y, radius, 0, Math.PI*2);
        self.shadowTexture.context.fill();
      }

      // ensure overlay gets redrawn
      self.shadowTexture.dirty = true;
    }
  },

  /**
   * function to call when game is over
   */
  gameOver: function () {
    var self = this;

    if (self. levelTimer && !(self.levelTimer.duration > 0)
        && self.lanternTimer && !(!self.lanternTimer.paused && self.lanternTimer.duration > 0)) {
      window.alert("Game over!");
      console.log('Game over called from state', self.state.current);
      self.game.state.start(self.state.current);
    }
  },

  updatePlayerProgress: function () {
    var self = this;
    self.game.physics.arcade.overlap(self.player, self.doors, self.mapFinished, null, self);
  },

  mapFinished: function (player, door) {
    var self = this;
    alert('Map finished!');
    // TODO: handle different doors differently
    console.log('Map finished! Called from state', self.state.current);
  },

  togglePlayerLight: function () {
    var self = this;
    if (self.lanternTimer) {
      if (self.lanternTimer.paused === false) {
        console.log('pausing player light');
        self.lanternTimer.pause();
        // the game might be over if the player chooses to turn of the light,
        // therefore we call self.gameOver to test this
        self.gameOver();
      } else {
        console.log('resuming player light');
        self.lanternTimer.resume();
      }
    }
  }
};
