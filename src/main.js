const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const text = document.querySelector(".text");
const emoji = document.querySelector(".emoji");

const apiKey = "the api key";

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    
    const city = cityInput.value;
     
    if(city)
    {
       try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
       } 
        catch(err){
            console.log(err);
            displayError(err);

        }
    }
    
    else{
        displayError("please enter a city");
    }

})

async function getWeatherData(city) {
    
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    if(!response.ok)
    {
        throw new Error("couldn't fetch data");
    }

    return response.json();
}

function displayWeatherInfo(data){

    const {
        name : city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

        text.textContent = "";
        emoji.textContent = ""
        text.style.display = "flex";

        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity : ${humidity}%`
        descDisplay.textContent = `${description}`;
        weatherEmoji.textContent = getweatherEmoji(id);


        weatherEmoji.classList.add("weatherEmoji");
        
        text.appendChild(cityDisplay);
        text.appendChild(tempDisplay);
        text.appendChild(humidityDisplay);
        text.appendChild(descDisplay);
        emoji.appendChild(weatherEmoji);
        

}

function getweatherEmoji(weatherid){
   switch(true)
   {
     case (weatherid >= 200 && weatherid < 300) :
     return "⛈️";

     case (weatherid >= 300 && weatherid < 400) :
     return "🌦️";
    
     case (weatherid >= 500 && weatherid < 600) :
     return "🌧️";

     case (weatherid >= 600 && weatherid < 700) :
     return "🌨️";

     case (weatherid >= 700 && weatherid < 800) :
     return "🌫️";
 
     case (weatherid == 800) :
     return "☀️";
     
     case (weatherid >= 801 && weatherid < 804) :
     return "☁️";

     default:
        return "?";
   } 
}


function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    
    card.style.display = "flex";
    text.innerHTML = "";
    emoji.textContent = "";
    text.style.display = "flex";
    text.appendChild(errorDisplay);
}