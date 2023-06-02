import request  from 'request';
const options = {
  method: 'POST',
  url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
  qs: {
    'to[0]': 'vi',
    'api-version': '3.0',
    profanityAction: 'NoAction', 
    textType: 'plain'
  },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '9691e91d12msh6059e05749e36c2p1bbb5djsn44753f227905',
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    useQueryString: true
  },
  body: [{Text: 'I would really like to drive your car around the block a few times.'}],
  json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
	console.log(body[0].detectedLanguage);

	console.log(body[0].translations);

});