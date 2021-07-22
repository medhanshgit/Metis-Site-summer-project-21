const express = require("express");
const path = require("path");
const request = require("request");
const {google} = require('googleapis');
const keys = require('./keys.json');


const app = express();
const port = 80;
const STRAPI_API_URL = "http://localhost:1337";

let newdt;


app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));


// Authorizing client for fetching data from google sheets
const client = new google.auth.JWT(
	keys.client_email,
	null,
	keys.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
	if(err){
		console.log('There is an error' + err);
		return;
	}else{
		// console.log('connected');
		gsrun(client)
	}
});

// Active Member data from google sheets
async function gsrun(cl){	
	const gsapi = google.sheets({version: 'v4', auth: cl });
	
	const opt = {
		spreadsheetId: '1eTZLl7o5DUWmrSl6oHLL_OtHjMjV9eCi2lb2N7UElMw',
		range: 'Data!A2:C'
	};
	
	let data = await gsapi.spreadsheets.values.get(opt);
	let dtarr = data.data.values;
	
	dtarr = dtarr.map(function(r){
		while(r.length < 2){
			r.push('');
		}
		return r;
	});
	
	newdt = dtarr.sort(function(a,b){
		return b[2]-a[2];
	});
}


// ENDPOINTS

// Home Page
app.get('/', (req,res) =>{
	res.status(200).render('./index', {title: "Home"});
});

// Projects Page
app.get('/projects', (req,res) =>{
	res.status(200).render('projects', {title: "Projects"});
});

// Team Metis
app.get('/team', (req,res) =>{
	request(`${STRAPI_API_URL}/members`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('./teamMetis', {title: "Team Metis", content: parseBody, strapiurl: STRAPI_API_URL});
		}
	})
});


// Resources
app.get('/resources', (req,res) =>{
	request(`${STRAPI_API_URL}/cards`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('resources.pug', {title: "Resources", content: parseBody, strapiurl: STRAPI_API_URL});
		}
	})
});


// Active Members page
app.get('/actmembers', (req,res) =>{

	client.authorize(function(err, tokens){
		if(err){
			console.log('There is an error' + err);
			return;
		}else{
			// console.log('connected');
			gsrun(client)
		}
	});

	// console.log(newdt);
	res.status(200).render('activemem.pug', {title: "Active Members", actdt: newdt.slice(0,10)});
		
		
	// To update data in sheet
	// const updtopt = {
		// 	spreadsheetId: '1eTZLl7o5DUWmrSl6oHLL_OtHjMjV9eCi2lb2N7UElMw',
		// 	range: 'Data!N2',
		// 	valueInputOption: 'USER_ENTERED',
		// 	resource: { values: newdt.slice(0,10) }
	// };

	// let res = await gsapi.spreadsheets.values.update(updtopt);
	// console.log(res);
	
});




app.listen(port, ()=>{
	console.log(`The application started successfully on port ${port}`);
});
