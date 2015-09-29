'use strict';

// Store common game state methods here, and extend it into the state's prototype
var ReachGameState = {
  createLevelTime: function (levelLightDuration) {
    var self = this;

    // setup time
    self.levelStartTime = (new Date()).getTime();
    self.leveLightDuration = levelLightDuration || ReachConfig.defaultLevelDuration;

    // setup global overlay
    self.shadowTexture = self.game.add.bitmapData(self.map.widthInPixels, self.map.heightInPixels);
    // add overlay to game
    self.shadowTextureSprite = self.game.add.image(0, 0, self.shadowTexture);
    // blend mode multiply will darken everything below this texture
    self.shadowTextureSprite.blendMode = Phaser.blendModes.MULTIPLY;
  },

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
    if (self.levelStartTime && self.leveLightDuration && self.shadowTexture) {
      var elapsed = (new Date()).getTime() - self.levelStartTime;
      var progress = (self.leveLightDuration - elapsed) / self.leveLightDuration;
      var cProg = parseInt(255 * progress);

      if (cProg < 0) {
        self.gameOver();
      }

      //console.log('Time progress:', progress, 'color progress:', cProg);
      self.shadowTexture.context.fillStyle = "rgb(" + cProg + "," + cProg + "," + cProg + ")";
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
  }
};
