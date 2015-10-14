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
    if (door.nextState) {
      ProgressControl.unlockLevel(door.nextState);
      this.game.state.start(door.nextState);
      console.log('go to next map:', door.nextState);
    } else {
      console.log('go to menu');
    }
  }
};
