const express = require('express');
const app = express();
const multer  = require('multer');

require('dotenv').config();
const PORT = process.env.PORT || 8080

const upload = multer({ dest: process.env.UPLOAD_PATH });

app.post("/jobs", upload.single('avatar'), (req, res)=>{

});

app.listen(PORT, () => { console.log(`PORT: ${PORT}`) });