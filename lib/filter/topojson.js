var topojson = require('topojson-client');

function extract(response) {
  return Object.keys(response.objects).reduce(function (data, key) {
    data[key] = topojson.feature(response, response.objects[key]);
    return data;
  }, {});
}

module.exports = extract;
