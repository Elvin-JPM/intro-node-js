const multer = require("multer");

// declaro una configuracion de upload
const upload = multer({ dest: "uploads/" });

module.exports = upload;
