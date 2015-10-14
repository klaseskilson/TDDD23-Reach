'use strict';

var ProgressControl = {
  _get: function (key, defaultResponse) {
    var obj = localStorage.getItem(key) || defaultResponse;
    return JSON.parse(obj);
  },

  _set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  unlockLevel: function (level) {
    var currentlySaved = ProgressControl._get('reachProgress', '[]');
    if (_.includes(currentlySaved, level)) {
      return currentlySaved;
    } else {
      currentlySaved.push(level);
      ProgressControl._set('reachProgress', currentlySaved);
      return currentlySaved;
    }
  },

  isUnlocked: function (level) {
    var currentlySaved = ProgressControl._get('reachProgress', '[]');
    return _.includes(currentlySaved, level);
  }
};
