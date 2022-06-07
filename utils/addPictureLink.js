const { db } = require('./firebase');
module.exports = async function addPictureLink(id, url){
    return db.collection("jobs").doc(id).update({
        pictureLink: url
    });
}