const sharp = require('sharp');
module.exports = async function convertToJpg(path, mimetype){
    let newPath = path + "_jpg";
    await sharp(path).toFormat("jpeg").jpeg({ force: true, mozjpeg: true }).withMetadata().toFile(newPath);
    return newPath;
}