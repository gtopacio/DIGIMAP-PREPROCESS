const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
require('dotenv').config();

const creds = {
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
};

const app = initializeApp({credential: cert(creds)});
const db = getFirestore(app);
const storage = getStorage(app);
module.exports = { app, db, storage };