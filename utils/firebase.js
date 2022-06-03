import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCBpTIdmZXuZvKyYdIfGUY-t_JVg-Cemc",
  authDomain: "digimap-3dp.firebaseapp.com",
  projectId: "digimap-3dp",
  storageBucket: "digimap-3dp.appspot.com",
  messagingSenderId: "386026440323",
  appId: "1:386026440323:web:11212a14bfd293d79f7db6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = { app, db };