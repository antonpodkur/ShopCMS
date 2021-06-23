const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png\gif/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb('ERROR: Images only', false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single('img');

const uploadHandler = function(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log('Multer Error\n\n\n\n\n');
        console.log(err);
        res.status(500).json({
          status: 500,
          message: err,
        });
        return;
    } else if (err) {
        // An unknown error occurred when uploading.
        console.log('Unknown error\n\n\n\n\n');
        console.log(err);
        res.status(500).json({
          status: 500,
          message: err,
        });
        return;
    }
    // Everything went fine. 
    next()
  });
}

module.exports = uploadHandler;
