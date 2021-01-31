
const path = require('path');
const sharp = require('sharp');
const { resizeDimensions } = require('./constants');
const smartcrop = require('smartcrop-sharp');

const IMAGE_DIR = path.resolve(__dirname, '../../../data/images');

const crop = async(bioguideId, imagePath, dimension) => {
  const { width, height } = dimension;
  const { topCrop: crop } = await smartcrop.crop(imagePath, { width, height });
  await sharp(imagePath)
    .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
    .resize(dimension)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.resolve(IMAGE_DIR, `${bioguideId}/${dimension.width}x${dimension.height}.jpg`));
};

const resizeImage = async(bioguideId) => {
  const imagePath = path.resolve(IMAGE_DIR, `${bioguideId}/original.jpg`);

  for (const dimension of resizeDimensions) {
    await crop(bioguideId, imagePath, dimension);
  }
};

module.exports = resizeImage;
