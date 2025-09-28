// backend/routes/upload.js
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage
const { uploadImage } = require('../controllers/uploadController');

router.post('/image', upload.single('file'), uploadImage);

module.exports = router;
