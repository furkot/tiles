var _defaults = require('lodash.defaults');

module.exports = furkotTiles;

function furkotTiles(options) {
  var service;
  if (options.output === 'webgl') {
    options.render = require('./render/webgl');
  }
  if (options.overlay) {
    service = require('./service/overlay');
  }
  return _defaults(service(options), options);
}
