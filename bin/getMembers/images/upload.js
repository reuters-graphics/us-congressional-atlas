const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const AWS = require('aws-sdk');
const glob = require('glob');

const IMAGE_DIR = path.resolve(__dirname, '../../../data/images');

const s3 = new AWS.S3({ region: 'us-east-1' });

const BUCKET_NAME = 'graphics.thomsonreuters.com';

const BUCKET_ROOT = path.join('data/us-congressional-atlas');

const uploadFile = async(filePath, publishPath) => {
  const fileContent = fs.readFileSync(filePath);

  const bucketPath = path.join(BUCKET_ROOT, publishPath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: bucketPath,
    Body: fileContent,
    CacheControl: 'max-age=3600',
    ContentType: mime.contentType(path.extname(bucketPath)),
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, function(err, data) {
      if (err) reject(err);
      resolve();
    });
  });
};

const uploadFiles = async() => {
  console.log('> > > Uploading all images...');
  const files = glob.sync('**/*.jpg', {
    cwd: IMAGE_DIR,
  });

  return Promise.all(files.map(file => uploadFile(path.join(IMAGE_DIR, file), file)));
};

module.exports = uploadFiles;
