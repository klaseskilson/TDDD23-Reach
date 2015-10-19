'use strict';

var ReachStateChange = {
  /**
   * function to call when game is over
   */
  gameOver: function () {
    var self = this;

    var mapTimeOut = self.levelTimer && !(self.levelTimer.duration > 0);
    var lanternTimeOut = true;
    if (self.lanternTimer) {
      lanternTimeOut = !(!self.lanternTimer.paused && self.lanternTimer.duration > 0);
    }
    if (mapTimeOut && lanternTimeOut) {
      window.alert("Game over!");
      console.log('Game over called from state', self.state.current);
      self.game.state.start(self.state.current);
    }
  },

  mapFinished: function (player, door) {
    var self = this;
    if (door.nextState) {
      ProgressControl.unlockLevel(door.nextState);
    }
    var timeout = 4000;
    self.displaySubTitle('Phew! We made it!', timeout);
    window.setTimeout(function () {
      self.game.state.start('menu');
    }, timeout);
  }
};
