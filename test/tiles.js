var furkotTiles = require('../lib/tiles');

describe('furkot-tiles node module', function () {
  it('image', function () {
    var tiles = furkotTiles({
      input: 'png'
    });
    tiles.should.have.property('getTileUrl');
  });
});
