var furkotTiles = require('../lib/tiles');

describe('furkot-tiles node module', function () {
  it('image', function () {
    var tiles = furkotTiles({
      input: 'png'
    });
    tiles.should.have.property('getTileUrl');
  });

  it('topjson -> svg', function () {
    var tiles = furkotTiles({
      service: 'mapzen',
      input: 'topojson',
      output: 'svg',
      tileSize: [512, 256]
    });
    tiles.should.have.property('getTile');
    tiles.should.have.property('releaseTile');
  });
});
