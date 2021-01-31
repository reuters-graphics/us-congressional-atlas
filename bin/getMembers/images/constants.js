const sharp = require('sharp');

const resizeDimensions = [{
  width: 225,
  height: 275,
}, {
  width: 75,
  height: 92,
  // fit: sharp.fit.cover,
  // position: sharp.gravity.north,
}, {
  width: 50,
  height: 50,
  // fit: sharp.fit.cover,
  // position: sharp.gravity.north,
}];

module.exports = {
  resizeDimensions,
};
