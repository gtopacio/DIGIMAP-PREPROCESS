const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const creds = require('../creds/firebaseAdmin.json');

const app = initializeApp({credential: cert(creds)});
const db = getFirestore(app);
const storage = getStorage(app);
module.exports = { app, db, storage };