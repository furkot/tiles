var _defaults = require('lodash.defaults');

module.exports = furkotTiles;

var type = {
};

function getTileUrl(options) {
  var prefix = options.url, suffix = '.' + (type[options.input] || options.input);
  if (options.key) {
    suffix += '?api_key=' + options.key;
  }
  return function (x, y, zoom) {
    return prefix + zoom + '/' + x + '/' + y + suffix;
  };
}

function furkotTiles(options) {
  var service;
  options.getTileUrl = getTileUrl(options);
  if (options.input === 'png') {
    service = require('./service/image');
  }
  return _defaults(service(options), options);
}
