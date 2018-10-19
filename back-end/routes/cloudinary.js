var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var express = require('express');
var multer = require('multer');
 
var app = express();
 
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'my-file-name');
  }
});
 
var parser = multer({ storage: storage });
 
app.post('/upload', parser.array('images', 10), function (req, res) {
  console.log(req.files);
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
