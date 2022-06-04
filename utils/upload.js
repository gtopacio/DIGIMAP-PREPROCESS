const { v4: uuidv4 } = require('uuid');
const { storage } = require('./firebase');
const storageRef = storage.bucket(`gs://digimap-3dp.appspot.com`);
module.exports = async function uploadFile(path, filename) {
    return storageRef.upload(path, {
        public: true,
        destination: `${filename}`,
    });
}