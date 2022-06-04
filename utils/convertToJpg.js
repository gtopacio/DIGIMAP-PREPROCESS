const sharp = require('sharp');
module.exports = async function convertToJpg(path, mimetype){
    if(mimetype !== "image/png")
        return path;
    
    let newPath = path + "_jpg";
    await sharp(path).toFormat("jpeg").jpeg({ force: true, mozjpeg: true }).toFile(newPath);
    return newPath;
}