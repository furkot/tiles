var request = require('../request');
var util = require('../util');

module.exports = init;

function init(options) {
  var render = options.render(options);

  return {
    getTile: function (x, y, zoom, document) {
      var node;
      node = document.createElement('div');
      node.setAttribute('class', 'tile');

      x = util.wrapLongitude(x, zoom);
      request({
        url: options.getTileUrl(x, y, zoom),
        contentType: options.contentType
      }, function (err, response) {
        var features;
        if (err) {
          return ;
        }

        if (options.filter) {
          features = options.filter.reduce(function (result, filter) {
            return filter(result, x, y, zoom);
          }, response);
        }

        node.appendChild(render(features, x, y, zoom, document));
      });

      return node;
    },
    releaseTile: function () {
    }
  };
}
