var wrapLongitude = require('../util').wrapLongitude;

module.exports = init;

function init(options) {
  return {
    getTileUrl: function (x, y, zoom) {
      return options.getTileUrl(wrapLongitude(x, zoom), y, zoom);
    }
  };
}
