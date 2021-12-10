/* Global Variables */
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let newZip;
const apiKey = ',us&appid=7910050025a2488eccff195e15ec2963&units=Metric';
let data = [];
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Create a new date instance dynamically with JS

function goApi(e){
    fetch(baseURL+document.getElementById('zip').value+apiKey)
        .then(response => response.json())
    .then(response => {
        return fetch('http://localhost:3000/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                temperature: response.main.temp,
                date: newDate,
                feeling: document.getElementById('feelings').value,
            }),
        });
    })
    .then(() =>{
        return fetch('http://localhost:3000/retrieve', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    })
    .then(response => response.json())
    .then(response => {
        document.getElementById('date').innerHTML = 'Date: ' + response.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + response.temperature + ' &#176C';
        document.getElementById('content').innerHTML = 'Feeling: ' + response.feeling;
    })
    .catch(error =>{
        document.getElementById('error').innerHTML = 'Please enter a valid US Zip Code. You can look for your Zip Code here: <a href="https://codigo-postal.co/en-us/usa/" target="_blank">https://codigo-postal.co/en-us/usa/</a>.';
    })
}

function updateUi(response){
    document.getElementById('date').innerHTML = 'Date: ' + response.date;
    document.getElementById('temp').innerHTML = 'Temperature: ' + response.temperature + ' &#176C';
    document.getElementById('content').innerHTML = 'Feeling: ' + response.feeling;
}

document.getElementById('generate').addEventListener('click', goApi);