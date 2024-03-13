

async function getWeather() {
    const apiKey = 'c4b687fe2aa8b63d72b92d97600d2c27'
    const city = document.querySelector('.city').value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    try {

        showLoadingMsg(); // Show loading message
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log(`Error ${response.status} - ${response.statusText}`)
            alert(`${response.statusText}`)
            document.querySelector('.city').value = ''
            return;
        }

        const data = await response.json();

        // Get the list of forecast data
        const forecastList = data.list;
        console.log(forecastList)
        // Get the current date and time
        const currentTime = new Date();
        // console.log("Current Time:", currentTime); // Log the current time

        // Find the forecast for the current time
        const currentForecast = forecastList.find(forecast => {
            // Convert forecast timestamp to Date object
            const forecastTime = new Date(forecast.dt * 1000); // Convert from seconds to milliseconds
            // console.log("Forecast Time:", forecastTime); // Log the forecast time

            // Check if forecast time is close to current time (within a certain threshold, e.g., 1 hour)
            return Math.abs(forecastTime - currentTime) <= (1 * 60 * 60 * 1000); // 1 hour threshold
        });

        // Print the forecast for the current time
        console.log("Forecast for current time:", currentForecast);


        // Update weather information based on the response data
        updateWeatherInformation(data);

        // Clear city input field after fetching data
        document.querySelector('.city').value = ''

    } catch (error) {
        document.querySelector('.error-msg').textContent = `An error occurred`
        console.error('An error occurred:', error);
        document.querySelector('.city').value = ''
    } finally {
        hideLoadingMsg(); // Hide loading message regardless of success or failure
    }
}

function updateWeatherInformation(data) {

    const {
        city: { name },

        list: [
            { main: { feels_like, grnd_level, humidity, pressure, sea_level, temp, temp_min },
                wind: { deg, speed },
                visibility,
                weather,
            }
        ],


    } = data;

    const forecasts = data.list.filter((forecast, index) => index % 8 === 0);
    let clutter = ''
    forecasts.forEach((forecast, index) => {
        let forecastTime = new Date((forecast.dt * 1000)+1)
        let formatedForecastTime = forecastTime.toLocaleDateString('en-Us', { weekday: "short",day: 'numeric', month: 'short',  })
       
        clutter += `<div class="dat-list">
                        <h4 id="date">${formatedForecastTime}</h4>
                    </div>`
    })
    document.querySelector('.forecast').innerHTML = clutter;





    let weatherContainer = document.querySelector('.weather-content-container');
    document.querySelector('.city-name').textContent = `${name}`;
    document.querySelector('.temperature').textContent = `${Math.round(temp)}°`;
    document.querySelector('.weather_description').textContent = ` ${weather[0].description}`;
    document.querySelector('.wind').textContent = `Wind ${speed} m/s`;
    document.querySelector('.humidity').textContent = `Humidity ${humidity} %`;
    document.querySelector('.visibility').textContent = `Visibility ${visibility} meter`;
    document.querySelector('.pressure').textContent = `Pressure${pressure} hPa`;




    // get weather icons 
    const weatherIcons = document.querySelector('.weather-icons').children;

    // Convert HTMLCollection to array using Array.from()
    const arr = Array.from(weatherIcons)
    arr.forEach((icon) => {

        // Show the appropriate weather condition image
        if (weather[0].main.toLowerCase() === icon.className) {
            icon.style.display = 'block'
        } else {
            // Hide all weather condition images
            icon.style.display = 'none'
        }
    })

    weatherContainer.style.display = 'block';
}

function showLoadingMsg() {
    document.querySelector('.loading_msg').style.display = 'block'
}

function hideLoadingMsg() {
    document.querySelector('.loading_msg').style.display = 'none'
}


// Fetch the 5-day forecast data
// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data.list[0].dt);
//         // Process the data here, such as extracting daily forecasts
//     })
//     .catch(error => {
//         console.error('There was a problem with your fetch operation:', error);
//     });


// const apiKeys = 'c4b687fe2aa8b63d72b92d97600d2c27'
// const cityName = "Purnia"

// // Construct the API URL
// const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeys}`;

// // Make the API call using fetch
// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {

//   })
//   .catch(error => {
//     console.error('Error fetching forecast:', error);
//   });

const now = new Date()

// get the month name
const monthNames = ["January", "February", "Mar", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const month = monthNames[now.getMonth()]
// console.log(month)

// get the day name 
const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const day = dayNames[now.getDay()]
// console.log(day)


// get the date num
let date = now.getDate()
if (date < 10) {
    date = "0" + date
    //    console.log(  date)
}
//  console.log(date)
let myDate = `${day},${month}${date}`
console.log(myDate)
// document.querySelector('#date').innerHTML = myDate

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
let formatedDate = tomorrow.toLocaleDateString('en-Us', { weekday: "long", month: 'short', day: 'numeric', year: 'numeric' })
console.log('tomorrow', formatedDate)








function updateTime() {
    // get the hour
    let hours = now.getHours().toString().padStart(2, '0');

    let minutes = now.getMinutes().toString().padStart(2, '0');

    let seconds = now.getSeconds().toString().padStart(2, '0');

    let timeNow = `${hours}:${minutes}:${seconds}`
    document.querySelector('.time').innerHTML = timeNow;
}


let interval = setInterval(updateTime, 1000)





// console.log(now.toDateString())
