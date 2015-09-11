'use strict';

function IntroState() {}

IntroState.prototype = {
  create: function () {
    var self = this;

    // prepare platforms
    self.platforms = self.game.add.group();
    self.platforms.enableBody = true;

    self.ground = self.platforms.create(0);
    self.ground.body.immovable = true;

    // prepare walls


    // setup player
    self.player = self.game.add.sprite(self.game.world.width/2, self.game.world.height - 150, 'dude');

    // enable physics for the player
    self.game.physics.arcade.enable(self.player);
    // append physics to player
    self.player.body.bounce.y = 0.2;
    self.player.body.gravity.y = 600;
    self.player.body.collideWorldBounds = true;

    // add self.player animations
    self.player.animations.add('left', [0, 1, 2, 3], 10, true);
    self.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // subscribe to cursor keys
    self.cursors = self.game.input.keyboard.createCursorKeys();
  },

  update: function () {
    var self = this;

    self.player.body.velocity.x = 0;

    // activate collisions between player and platforms
    self.game.physics.arcade.collide(self.player, self.platforms);

    if (self.cursors.left.isDown) {
      // move to the left
      self.player.body.velocity.x = -150;
      self.player.animations.play('left');
    } else if (self.cursors.right.isDown) {
      // move to the right
      self.player.body.velocity.x = 150;
      self.player.animations.play('right');
    } else {
      // dont move
      self.player.animations.stop();
      self.player.frame = 4;
    }

    if (self.cursors.up.isDown && self.player.body.touching.down) {
      self.player.body.velocity.y = -350;
    }
  }
};
