/* Global Variables */
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?zip=<ZIPCODE>,us&appid=<YOUR_API_key>&units=Metric
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let newZip;
let apiKey = ',us&appid=7910050025a2488eccff195e15ec2963&units=Metric';
let data = [];
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create a new date instance dynamically with JS

function goApi(e){
    fetch(baseURL+document.getElementById('zip').value+apiKey)
    .then(response => response.json())
    .then(response => {
        // response.json()
        return fetch('http://localhost:3000/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                temperature: response.main.temp,
                date: newDate,
                user_response: document.getElementById('feelings').value,
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
        console.log(response);
    })
}

//updateUI



document.getElementById('generate').addEventListener('click', goApi);