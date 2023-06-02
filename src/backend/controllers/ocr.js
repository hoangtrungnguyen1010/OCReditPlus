const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Tesseract = require('tesseract.js')
const xlsx = require('xlsx');
// Set up multer storage


const xlsxToJson = (filePath, sheetName) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

const getAvailableLan = () =>{
  const jsonSheet = xlsxToJson('./storage/lan.xlsx', 'Sheet1');
  console.log(jsonSheet)
  return jsonSheet

}
const lanList = getAvailableLan();

// const OCRtoText = async(filename, lan = 'eng') => {

//   const worker = await createWorker({
//     logger: m => console.log(m)
//   });
  
//   const res = (async () => {
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//     // console.log(text);
//     await worker.terminate();
//     return text;
//   })();
//   return res;
// }

// var filename = '579.jpg'
// var t = OCRtoText(filename, 'vie')
// console.log(t)

// Tesseract.recognize(filename)
//   .progress(function  (p) { console.log('progress', p)  })
//   .catch(err => console.error(err))
//   .then(function (result) {
//     console.log(result.text)
//     process.exit(0)
//   })

async function performOCR(imagePath, language) {
  try {
    const result = await Tesseract.recognize(imagePath, language, {
      logger: m => console.log(m), // Optional logger for progress and debug information
    });

    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
};

// const imagePath = '579.jpg';
// const language = 'vie'; // Replace 'eng' with the desired language code (e.g., 'eng', 'fra', 'deu', etc.)

// performOCR(imagePath, language)
//   .then(ocrText => {
//     console.log('OCR Text:', ocrText);
//   })
//   .catch(error => {
//     console.error('OCR Error:', error);
//   });


const OCRtoText = asyncHandler(async (req, res) => {
  try {
    var file = req.file;
    console.log(req)
    console.log(file)
    // if (!file) {
    //   console.log('no files')
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }
    var lang = req.body.lan;
    if (!lang){
      lang = 'eng';
    }
    console.log(lang);
    console.log(lanList[0][lang]);

    performOCR(file.buffer, lanList[0][lang])
      .then(ocrText => {
        console.log(ocrText)
        res.json({
          resultText: ocrText
        })
      })
      .catch(error => {
        res.status(400)
        throw new Error(error)
      });

    } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  
});

const getLanList = ((req, res)=>{
  console.log(lanList[0])

  console.log(Object.keys(lanList[0]))
  res.json({
    lan: Object.keys(lanList[0])
  })
});



module.exports = {OCRtoText, getLanList};

  