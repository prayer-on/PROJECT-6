const multer = require ('multer');


const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') 
        {
        callback(null, true);
    }
    else {
        callback(new Error('File format not supported'), false);
    }
}

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('image');