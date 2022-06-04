const express = require('express');
const app = express();
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');
const sharp = require('sharp');

const { db } = require('./utils/firebase');
const uploadFile = require('./utils/upload');
const { resolve } = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

const acceptedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

if (!fs.existsSync(process.env.UPLOAD_PATH)){
    fs.mkdirSync(process.env.UPLOAD_PATH);
}
const upload = multer({ dest: process.env.UPLOAD_PATH });

app.use(cors());

app.post("/jobs", upload.single('image'), async(req, res)=>{

    if(!req.file){
        return res.status(400);
    }

    if(!acceptedMimeTypes.includes(req.file.mimetype)){
        res.status(400);
        fs.unlink(req.file.path);
        return;
    }

    try{
        let promises = [];
        if(req.file.mimetype === "image/png"){
            promises.push(
                sharp(req.file.buffer).jpeg({ force: true, mozjpeg: true })
            );
        }
        else{
            promises.push(new Promise((res, rej) => { res(null); }));
        }

        let jobData = {
            fileName: req.file.filename,
            mimeType: req.file.mimetype,
            //videoType: req.body.videoType
        }
        
        promises.push(db.collection("jobs").add(jobData));
        let [sharpRes, firestoreRes] = await Promise.all(promises);
        console.log("before");
        if(!sharpRes){
            sharpRes = req.file.buffer;
        }

        res.send({id: firestoreRes.id});
        await uploadFile(req.file.path, `${firestoreRes.id}.jpg`);
    }
    catch(e){
        res.status(500);
        console.error(e);
    }
    finally{
        fs.unlink(req.file.path, () => {});
    }
});

app.get("/", (req, res) => {
    res.send({id: "n"});
});

app.listen(PORT, () => { console.log(`PORT: ${PORT}`) });