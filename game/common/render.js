'use strict';

var ReachRender = {
  render: function () {
    var pixelCanvas = document.getElementById("pixel");
    var pixelcontext = pixelCanvas.getContext("2d");
    var pixelwidth = pixelCanvas.width;
    var pixelheight = pixelCanvas.height;
    pixelcontext.drawImage(this.game.canvas, 0, 0, ReachConfig.gameWidth, ReachConfig.gameHeight, 0, 0, pixelwidth, pixelheight);
  }
};
