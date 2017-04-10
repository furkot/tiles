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
  else {
    options.filter = [];
    if (options.input === 'topojson') {
      options.contentType = 'application/json';
      options.filter.push(require('./filter/topojson'));
    }
    if (options.output === 'svg') {
      options.filter.push(require('./filter/layers'));
      options.render = require('./render/svg');
    }
    service = require('./service/vector');
  }
  return _defaults(service(options), options);
}
