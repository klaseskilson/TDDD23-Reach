'use strict';

var ReachUtilities = {
  /**
   * find objects with type 'type' from map 'map' in layer 'layer'
   * @param type
   * @param map
   * @param layer
   * @returns {Array}
   */
  findObjectsByType: function (type, map, layer) {
    var result = [];

    map.objects[layer].forEach(function (element) {
      if (element.properties.type === type) {
        // adjust position since tiled uses bottom left
        element.y -= map.tileHeight;
        result.push(element);
      }
    });

    return result;
  },

  createFromTiledObject: function (element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  }
};
