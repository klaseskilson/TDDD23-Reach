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

      //console.log('Time progress:', progress);
      self.shadowTexture.context.fillStyle = "rgb(" + progress + "," + progress + "," + progress + ")";
      self.shadowTexture.context.fillRect(0, 0, self.shadowTexture.width, self.shadowTexture.height);
      self.shadowTexture.dirty = true;
    }
  },

  /**
   * function to call when game is over
   * @param state
   */
  gameOver: function (gameState) {
    var self = this;
    console.log('Game over called from state', self.state.current);
    window.alert("Game over!");
    self.game.state.start(self.state.current);
  },

  updatePlayerProgress: function () {
    var self = this;
    self.game.physics.arcade.overlap(self.player, self.doors, self.mapFinished, null, self);
  },

  mapFinished: function (player, door) {
    var self = this;
    alert('Map finished!');
    console.log('Map finished! Called from state', self.state.current);
  }
};
