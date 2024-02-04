

async function getWeather() {
    const apiKey = '970d587f393eafdffc284a76d86e4d4f'
    const city = document.querySelector('.city').value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`


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


        const {
            name,
            main: {
                temp,
                humidity,
                pressure
            },
            wind: {
                deg,
                speed
            },
            visibility,
            weather,
        } = data;

        let weatheContainer = document.querySelector('.weather-content-container');

        document.querySelector('.city-name').textContent = `${name}`
        document.querySelector('.temperature').textContent = `${Math.round(temp)}°`
        document.querySelector('.weather_description').textContent = ` ${weather[0].description}`;
        document.querySelector('.wind').textContent = `Wind ${speed} m/s`
        document.querySelector('.humidity').textContent = `Humidity ${humidity} %`
        document.querySelector('.visibility').textContent = `Visibility ${visibility} meter`
        document.querySelector('.pressure').textContent = `Pressure${pressure} hPa`



        if (weather[0].main == 'Clear') {
            document.querySelector('.clear').style.display = 'block'
        } else if (weather[0].main == 'Mist') {
            document.querySelector('.mist').style.display = 'block'
        } else if (weather[0].main == 'Rain') {
            document.querySelector('.rain').style.display = 'block'
        } else if (weather[0].main == 'Smoke') {
            document.querySelector('.smoke').style.display = 'block'
        } else if (weather[0].main == 'Clouds') {
            document.querySelector('.clouds').style.display = 'block'
        } else if (weather[0].main == 'Haze') {
            document.querySelector('.haze').style.display = 'block'
        } else if (weather[0].main == 'Drizzle') {
            document.querySelector('.drizzle').style.display = 'block'
        } else if (weather[0].main == 'Snow') {
            document.querySelector('.snow').style.display = 'block'
        } else if (weather[0].main == 'Thunderstorm') {
            document.querySelector('.thunderstorm').style.display = 'block'
        }

        weatheContainer.style.display = 'block'
        document.querySelector('.city').value = ''

    } catch (error) {
        document.querySelector('.error-msg').textContent = `An error occurred`
        console.error('An error occurred:', error);
        document.querySelector('.city').value = ''
    } finally {
        hideLoadingMsg(); // Hide loading message regardless of success or failure
    }
}


function showLoadingMsg() {
    document.querySelector('.loading_msg').style.display = 'block'
}

function hideLoadingMsg() {
    document.querySelector('.loading_msg').style.display = 'none'
}


