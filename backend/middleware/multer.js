const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Change this to your desired upload directory
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
