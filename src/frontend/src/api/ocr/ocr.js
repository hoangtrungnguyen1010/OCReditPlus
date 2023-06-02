var createWorker = require('tesseract.js');
var xlsx = require('xlsx');

const xlsxToJson = (filePath, sheetName) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

const getAvailableLan = () =>{
  const jsonSheet = xlsxToJson('./lan.xlsx', 'Sheet1');
  console.log(jsonSheet)
  return jsonSheet

}

const OCRtoText = async(filename, lan = 'eng') => {

  const worker = await createWorker({
    // logger: m => console.log(m)
  });
  
  const res = (async () => {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    // console.log(text);
    await worker.terminate();
    return text;
  })();
  return res;
}

var filename = '579.jpg'
var t = OCRtoText(filename, 'vie')
console.log(t)

// Tesseract.recognize(filename)
//   .progress(function  (p) { console.log('progress', p)  })
//   .catch(err => console.error(err))
//   .then(function (result) {
//     console.log(result.text)
//     process.exit(0)
//   })
