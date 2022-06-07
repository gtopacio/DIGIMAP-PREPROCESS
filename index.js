const express = require('express');
const app = express();
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');

const firebaseJob = require('./utils/firebaseJob');
const uploadFile = require('./utils/upload');
const convertToJpg = require('./utils/convertToJpg');
const submitToSQS = require('./utils/submitToSQS');
const getPictureLink = require('./utils/getPictureLink');
const addPictureLink = require('./utils/addPictureLink');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

const acceptedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const acceptedTrajectories = ["zoom-in", "dolly-zoom-in", "circle", "swing"];

if (!fs.existsSync(process.env.UPLOAD_PATH)){
    fs.mkdirSync(process.env.UPLOAD_PATH);
}
const upload = multer({ dest: process.env.UPLOAD_PATH });

app.use(cors());

app.post("/jobs", upload.single('image'), async(req, res)=>{

    if(!req.file){
        return res.status(400).send({message: "No Picture"});
    }

    if(!acceptedMimeTypes.includes(req.file.mimetype)){
        res.status(400).send({message: "File type not supported"});
        fs.unlink(req.file.path, (err) => { if(err) console.error(err); });
        return;
    }

    if(!acceptedTrajectories.includes(req.body.traj)){
        res.status(400).send({message: "Invalid Trajectory"});
        fs.unlink(req.file.path, (err) => { if(err) console.error(err); });
        return;
    }

    let traj = req.body.traj || 'swing';

    try{
        let promises = [
            firebaseJob(req.file, traj),
            convertToJpg(req.file.path, req.file.mimetype)
        ];
        let [firestoreRes, sharpRes] = await Promise.all(promises);
        res.send({id: firestoreRes.id});
        await uploadFile(sharpRes, `${firestoreRes.id}.jpg`);
        promises = [
            getPictureLink(firestoreRes.id, 1440),
            submitToSQS(firestoreRes.id, traj),
        ]

        let [url] = await Promise.all(promises);

        await addPictureLink(firestoreRes.id, url);
        
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

app.get("/heartbeat", (req, res) => {
    res.status(200).send({ok:true});
});

app.listen(PORT, () => { console.log(`PORT: ${PORT}`) });