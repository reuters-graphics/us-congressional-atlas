const download = require('./download');
const resize = require('./resize');
const upload = require('./upload');
const { resizeDimensions } = require('./constants');

const getImages = async(members) => {
  const memberImages = {};
  for (const member of members) {
    const hasImage = await download(member.id);
    if (!hasImage) continue;
    await resize(member.id);
    memberImages[member.id] = {
      original: `https://graphics.thomsonreuters.com/data/us-congressional-atlas/${member.id}/original.jpg`,
    };
    for (const dimension of resizeDimensions) {
      const { width: w, height: h } = dimension;
      memberImages[member.id][`${w}x${h}`] = `https://graphics.thomsonreuters.com/data/us-congressional-atlas/${member.id}/${w}x${h}.jpg`;
    }
  }
  if (!process.env.TESTING) await upload();
  return memberImages;
};

module.exports = getImages;
