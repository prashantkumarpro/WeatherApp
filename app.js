

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
        console.log(data);

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
       city:{name},

       list:[
        {main:{feels_like, grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max,temp_min},
        wind: { deg, speed},
        visibility,
        weather,}
       ],
       
       
    } = data;

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

// const apiKey = 'c4b687fe2aa8b63d72b92d97600d2c27'
// const cityName = "Bhagalpur"



    
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
    