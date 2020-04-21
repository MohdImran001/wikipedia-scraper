const crawler = require('../crawler/script');

exports.getIndexPage = (req, res, next) => {
	res.render('index');
}

exports.searchPerson = (req, res, next) => {
	const name = req.body.name;
	if(name.length <= 0) 
		return res.status(422).json({ "error" : "please enter a valid name"});

	crawler.searchPerson(name, (err, data) => {
		if(err) {
			res.status(500).json({
				"error" : err
			})
		}
		else
			res.status(200).json(data);
	});
}