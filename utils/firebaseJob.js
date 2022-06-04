const { db } = require('./firebase');
module.exports = async function firebaseJob({filename, mimetype}){
    let jobData = {
        status: "QUEUED",
        fileName: filename,
        mimeType: mimetype,
    }
    return db.collection("jobs").add(jobData);
}