const fs = require('fs');
const path = require('path');
const axios = require('axios');

const ensureDir = (filePath) => {
  if (!fs.existsSync(path.dirname(filePath))) fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const IMAGE_DIR = path.resolve(__dirname, '../../../data/images');

if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

function checkForLocalCopy(bioguideId) {
  const localPath = path.resolve(__dirname, `../../../images/${bioguideId}.jpg`);
  if (!fs.existsSync(localPath)) return false;
  const imgPath = path.join(IMAGE_DIR, `${bioguideId}/original.jpg`);
  ensureDir(imgPath);
  fs.copyFileSync(localPath, imgPath);
  return true;
}

async function downloadImage(bioguideId) {
  const hasLocalCopy = checkForLocalCopy(bioguideId);
  if (hasLocalCopy) return true;

  const imagePath = path.resolve(IMAGE_DIR, `${bioguideId}/original.jpg`);

  if (fs.existsSync(imagePath)) return true;
  ensureDir(imagePath);

  const url = `https://theunitedstates.io/images/congress/original/${bioguideId}.jpg`;

  try {
    console.log(`> > > Downloading: ${bioguideId}`);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(true));
      writer.on('error', () => {
        resolve(false);
      });
    });
  } catch {
    return false;
  }
}

module.exports = downloadImage;
