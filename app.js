const express = require("express");
const path = require("path");
const request = require("request");


const app = express();
const port = 80;
const STRAPI_API_URL = "http://localhost:1337";


app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req,res) =>{
	res.status(200).render('../index');
});

app.get('/resources', (req,res) =>{
	request(`${STRAPI_API_URL}/cards`, function(error, response, body){
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('resources.pug', {content: parseBody, strapiurl: STRAPI_API_URL});
			// console.log(parseBody);

		}
		// console.log("check2");
	})
	// console.log("check3");

});


app.listen(port, ()=>{
	console.log(`The application started successfully on port ${port}`);
});
