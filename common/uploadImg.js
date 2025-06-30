const multer  = require('multer')

module.exports.uploadImg = (fieldName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {           
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        },
    })
    const fileFilter = (req, file, cb) => {       
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload.single(fieldName)
}