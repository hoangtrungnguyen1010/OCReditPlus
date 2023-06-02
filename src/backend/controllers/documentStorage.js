const express = require('express');
const multer = require('multer');
const asyncHandler = require('express-async-handler')

const Document = require('../models/documentModel'); // Import the file model


const saveDocument = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { user_uid, fileName, content } = req.body;

  const document = {
    user_uid: user_uid,
    fileName: fileName,
    content: content
  }

  console.log(document)
  newDoc = await Document.create(document);
  // Document.insertOne(document, function (err, result) {
  // if (err) {
  //   console.error('Error inserting document:', err);
  //   return;
  // }

})

const getListOfDocumentNames = asyncHandler(async (req, res) => {
  const user_uid = req.params.id;
  console.log(user_uid);
  const Documents = await Document.find({ user_uid: user_uid });

  // const listOfName = Documents.map(doc => ({
  //   fileName: doc.fileName
  // }));

  if (Documents) {
    res.status(200).json(Documents);
  } else {
    res.status(400);
    throw new Error("Invalid");
  }

})

const downloadDocument = asyncHandler(async (req, res) => {
  const user_uid = req.params.id;
  const fileName = req.params.filename;
  console.log(req.params)
  const Documents = await Document.find({ user_uid: user_uid, fileName });
  console.log(Documents);

  if (Documents.length==1){
    res.status(200).json(Documents[0].content);
  }

  else {
    res.status(400);
    throw new Error("Invalid");
  }
})

const deleteDocument = asyncHandler(async (req, res) => {
  const user_uid = req.params.id;
  const fileName = req.params.filename;
  console.log(req.params)
  try {
    const result = await Document.deleteOne({ user_uid: user_uid, fileName: fileName});
    res.status(200).json(`The document deleted`);
    console.log(result); // Optional: log the delete operation result
  } catch (error) {
    res.status(400).json(`Error deleting document: ${error}`);
  }
})


module.exports = { saveDocument, getListOfDocumentNames, downloadDocument, deleteDocument };
