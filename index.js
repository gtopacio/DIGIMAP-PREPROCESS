const express = require('express');
const app = express();
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');

const firebaseJob = require('./utils/firebaseJob');
const uploadFile = require('./utils/upload');
const convertToJpg = require('./utils/convertToJpg');
const submitToSQS = require('./utils/submitToSQS');

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
        fs.unlink(req.file.path, (err) => { if(err) console.error(err); });
        return;
    }

    try{
        let promises = [
            firebaseJob(req.file),
            convertToJpg(req.file.path, req.file.mimetype)
        ];
        let [firestoreRes, sharpRes] = await Promise.all(promises);
        res.send({id: firestoreRes.id});
        await uploadFile(sharpRes, `${firestoreRes.id}.jpg`);
        await submitToSQS(firestoreRes.id);
        
        if(req.file.mimetype === "image/png"){
            fs.unlink(sharpRes, (err) => { if(err) console.error(err); });
        }
    }
    catch(e){
        res.status(500);
        console.error(e);
    }
    finally{
        fs.unlink(req.file.path, (err) => { if(err) console.error(err); });
    }
});

app.listen(PORT, () => { console.log(`PORT: ${PORT}`) });