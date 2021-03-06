// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
//Callback to debug
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//GET route that returns the projectData object
app.get('/retrieve', (req, res)=> {
    res.send(projectData);
  });

//POST route that adds incoming data to projectData
app.post('/', newPost);
    function newPost(req, res){
    projectData = req.body;
    console.log(projectData);
    res.send('good');
    }