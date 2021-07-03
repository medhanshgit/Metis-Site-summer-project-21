const express = require("express");
const path = require("path");

const app = express();
const port = 80;

app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req,res) =>{
	res.status(200).render('../index.pug');
});


app.listen(port, ()=>{
	console.log(`The application started successfully on port ${port}`);
});
