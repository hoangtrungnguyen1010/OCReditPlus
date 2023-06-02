const express = require("express");
const router = express.Router();
const {saveDocument, getListOfDocumentNames, downloadDocument, deleteDocument} = require("../controllers/documentStorage");
// const { protect } = require("../middleware/authMiddleware");

router.post("/save", saveDocument);


router.get("/listdocuments/:id", getListOfDocumentNames);

router.get("/download/:id/:filename", downloadDocument);

router.get("/delete/:id/:filename", deleteDocument);

module.exports = router;
