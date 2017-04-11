var vt = require('vector-tile');
var Protobuf = require('pbf');

function extract(response) {
  var data = new vt.VectorTile(new Protobuf(response));
  data.rawData = response;
  return data;
}

module.exports = extract;
