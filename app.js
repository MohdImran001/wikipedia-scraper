const https = require('https');
const cheerio = require('cheerio');

function searchPerson(name) {
	const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${name}&limit=1&namespace=0&format=json`;
	https.get(url, (res) => {
		let body = [];
		res.on('data', (chunk) => {
			body.push(chunk);
		})
		res.on('end', () => {
			body = Buffer.concat(body).toString();
			console.log(body);
			fetchContent(body);
		})
	})
}

function fetchContent(body) {
	//parsing url
	let jsonData = JSON.parse(body);
	const url = jsonData[jsonData.length-1][0];

	https.get(url, (res) => {
		let html = '';
		res.on('data', (chunk) => {
			html += chunk;
		})
		res.on('end', ()=> {
			loadCheerio(html);
		})
	})
}

function loadCheerio(html) {
	const $ = cheerio.load(html);
	let obj = {};
	$('.infobox tr').each(function(i, el) {
		if(i > 1) {
			let th = $(this).find('th').text();
			let td = $(this).find('td').text();
			obj[th] = td;
		}
	});
	delete obj[''];
	delete obj['Signature'];
	console.log(obj);
}


searchPerson("obama");	