const { db } = require('./firebase');
module.exports = async function firebaseJob({filename, mimetype}, traj='swing'){
    let jobCounterRef = db.collection("shards").doc("jobCounter");
    let jobNumber = -1;
    await db.runTransaction(async (t) => {
        const doc = await t.get(jobCounterRef);
        jobNumber = doc.data().value + 1;
        t.update(jobCounterRef, {value: jobNumber});
    });
    let jobData = {
        status: "QUEUED",
        fileName: filename,
        mimeType: mimetype,
        traj,
        jobNumber
    }
    return db.collection("jobs").add(jobData);
}