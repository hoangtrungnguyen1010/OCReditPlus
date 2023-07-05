const express = require("express");
const multer = require('multer')

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {OCRtoText, getLanList} = require("../controllers/ocr");

router.post("/ocrtotext",upload.single('file'), OCRtoText);

router.get("/lanlist", getLanList);
module.exports = router;
