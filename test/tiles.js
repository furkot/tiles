var furkotTiles = require('../lib/tiles');

describe('furkot-tiles node module', function () {

  it('overlay', function () {
    var tiles = furkotTiles({
      overlay: true,
      render: function () {}
    });
    tiles.should.have.property('render');
  });
});
