const express = require("express");
const router = express.Router();
const {saveDocument, getListOfDocumentNames, downloadDocument, deleteDocument} = require("../controllers/documentStorage");

router.post("/save", saveDocument);


router.get("/listdocuments/:id", getListOfDocumentNames);

router.get("/download/:id/:filename", downloadDocument);

router.post("/delete", deleteDocument);

module.exports = router;
