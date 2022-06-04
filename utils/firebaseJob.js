const { db } = require('./firebase');
module.exports = async function firebaseJob({filename, mimetype}, traj='swing'){
    let jobData = {
        status: "QUEUED",
        fileName: filename,
        mimeType: mimetype,
        traj
    }
    return db.collection("jobs").add(jobData);
}