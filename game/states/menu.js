'use strict';

function MenuState() {}

MenuState.prototype = _.defaults({
  create: function () {
    var self = this;

    self.game.add.image(0, 0, 'menuBackground');

    self.startPoint = { x: 35, y: 65 };
    self.buttonSize = 20;
    self.buttonPadding = { x: 3, y: 3 };
    self.perColumn = 4;

    self.game.add.button(self.startPoint.x, self.startPoint.y, 'enabledButtons', undefined, self, 1, 1, 1, 1);

    for (var i = 1; i < 6; ++i) {
      var y = self.startPoint.y + (i % self.perColumn) * (self.buttonSize + self.buttonPadding.y);
      var x = self.startPoint.x + Math.floor(i / self.perColumn) * (self.buttonSize + self.buttonPadding.x) * 2;
      var spriteMap = ProgressControl.isUnlocked('level' + i) ? 'enabledButtons' : 'disabledButtons';
      self.game.add.button(x, y, spriteMap, undefined, self, i+1, i+1, i+1, i+1);
    }

    self.arrow = self.game.add.image(self.startPoint.x + self.buttonSize + self.buttonPadding.x, self.startPoint.y, 'arrow');
    self.chosen = 0;
    self.canMove = true;
    self.cursors = self.game.input.keyboard.createCursorKeys();

    self.spacebar = self.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    self.spacebar.onDown.add(self.chooseLevel, self);
  },

  update: function () {
    this.handleCursors();
    this.moveArrow();
  },

  handleCursors: function () {
    var self = this;

    if (!self.canMove) return;

    var opt = self.chosen;
    if (self.cursors.down.isDown) {
      opt += 1;
    } else if (self.cursors.up.isDown) {
      opt -= 1;
    } else if (self.cursors.right.isDown) {
      opt += self.perColumn;
    } else if (self.cursors.left.isDown) {
      opt -= self.perColumn;
    }

    // lock cursor keys
    if (opt !== self.chosen) {
      self.canMove = false;
      self.game.time.events.add(150, function () {
        this.canMove = true;
      }, self);
    }

    if (opt >= 0 && opt <= 5) {
      self.chosen = opt;
    }
  },

  moveArrow: function () {
    var self = this;

    var y = self.startPoint.y
      + (self.chosen % self.perColumn) * (self.buttonSize + self.buttonPadding.y);
    var x = self.startPoint.x + self.buttonSize + self.buttonPadding.x
      + Math.floor(self.chosen / self.perColumn) * (self.buttonSize + self.buttonPadding.x) * 2;

    self.arrow.position.x = x;
    self.arrow.position.y = y;
  },

  chooseLevel: function () {
    var self = this;

    if (self.chosen > 0 ) {
      if (ProgressControl.isUnlocked('level' + self.chosen)) {
        self.game.state.start('level' + self.chosen);
      }
    } else {
      self.game.state.start('intro');
    }
  }
}, ReachRender);
