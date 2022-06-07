const { storage } = require('./firebase');
require('dotenv').config();
const storageRef = storage.bucket(process.env.FIREBASE_BUCKET);
module.exports = async function getImageLink(id, accessMinutes=15) {
    let fileBlob = storageRef.file(`${id}.jpg`);
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + accessMinutes * 60 * 1000, // 15 minutes
      };
      return fileBlob.getSignedUrl(options);
  
}