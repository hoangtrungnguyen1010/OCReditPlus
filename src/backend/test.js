var htmlToImage = require('html-to-image');

const htmlString = '<p>Hello, mình là Trung đây</p>';
// const htmlElement = stringToHTML(htmlString);

htmlToImage.toPng(htmlString)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });