const express = require("express");
const path = require("path");
const request = require("request");
const {google} = require('googleapis');

var keys = require('./keys.json');


const app = express();
const port = 80;
// const STRAPI_API_URL = "http://localhost:1337";
const STRAPI_API_URL = "https://metisstrapi.herokuapp.com";
const DRIVE_URL = "https://drive.google.com/uc?export=view&id=";
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
// const client = new google.auth.JWT(
// 	process.env.client_email,
// 	null,
// 	process.env.private_key,
// 	['https://www.googleapis.com/auth/spreadsheets']
// );

// Active Member data from google sheets
async function gsrun(cl){	
	const gsapi = google.sheets({version: 'v4', auth: cl });
	
	const opt = {
		spreadsheetId: '1eTZLl7o5DUWmrSl6oHLL_OtHjMjV9eCi2lb2N7UElMw',
		range: 'Data!A2:C'
	};
	
	let data = await gsapi.spreadsheets.values.get(opt);
	let dtarr = data.data.values;
	
	// dtarr = dtarr.map(function(r){
	// 	while(r.length < 2){
	// 		r.push('');
	// 	}
	// 	return r;
	// });
	
	newdt = dtarr.sort(function(a,b){
		return b[2]-a[2];
	});
}

client.authorize(function(err, tokens){
	if(err){
		console.log('There is an error' + err);
		return;
	}else{
		// console.log('connected');
		gsrun(client)
	}
});


// ENDPOINTS

// Home Page
app.get('/', (req,res) =>{
	res.status(200).render('./index', {title: "Home"});
});

// Projects Page
app.get('/projects', (req,res) =>{
	request(`${STRAPI_API_URL}/projects`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('projects', {title: "Projects", content: parseBody, drive: DRIVE_URL});
		}
	})
});

// Team Metis
app.get('/team', (req,res) =>{
	request(`${STRAPI_API_URL}/members`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('./teamMetis', {title: "Team Metis", content: parseBody, drive: DRIVE_URL});
		}
	})
});


// Resources
app.get('/resources', (req,res) =>{
	request(`${STRAPI_API_URL}/resources`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('resources', {title: "Resources", content: parseBody, drive: DRIVE_URL});
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
			gsrun(client)
		}
	});

	res.status(200).render('activemem', {title: "Active Members", actdt: newdt.slice(0,10)});
		
		
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

// Events Page
app.get('/events', (req,res) =>{
	request(`${STRAPI_API_URL}/events`, function(error, response, body){
		
		if(!error && response.statusCode == 200){
			var parseBody = JSON.parse(body);
			res.status(200).render('events', {title: "Events", content: parseBody, drive: DRIVE_URL});
		}
	})
});


app.listen(process.env.PORT || port, ()=>{
	console.log(`The application started successfully on port ${port}`);
});
