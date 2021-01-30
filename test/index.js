require('dotenv').config();
const UsCongressAtlas = require('../dist');
const expect = require('expect.js');

const usCongressAtlas = new UsCongressAtlas();

describe('test UsCongressAtlas', function() {
  this.timeout(10000);

  it('Should return regions', function() {
    expect(usCongressAtlas.run()).to.be('hello world');
  });
});
