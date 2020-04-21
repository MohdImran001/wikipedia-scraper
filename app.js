const express = require('express');

const routes = require('./routes/routes');

const app = express();

//set up view engine for rendering html pages
app.set('view engine', 'ejs');


//routes for handling requests
app.use(routes);


//starting server
app.listen(3000, () => {
	console.log(`server is running`);
});

