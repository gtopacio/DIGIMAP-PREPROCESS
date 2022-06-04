const { storage } = require('./firebase');
require('dotenv').config();
const storageRef = storage.bucket(process.env.FIREBASE_BUCKET);
module.exports = async function uploadFile(path, filename) {
    return storageRef.upload(path, {
        public: true,
        destination: `${filename}`,
    });
}