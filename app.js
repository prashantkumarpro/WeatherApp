

async function getWeather() {
    const apiKey = '970d587f393eafdffc284a76d86e4d4f'
    const city = document.querySelector('.city').value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city}&appid=${apiKey}`

    if (city === '') {
        alert('Please enter a city name');
        return;
    }


    try {
        console.log('Loading ...')
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log(`Error ${response.status} - ${response.statusText}`)
            alert(`${response.statusText}`)
            document.querySelector('.city').value = ''
            return;
        }
        const data = await response.json();
        console.log(data);
     

        const { name, main: { temp, feels_like, humidity }, wind: { deg, speed }, visibility, weather } = data;


        document.querySelector('.city-name').textContent = `${name}`
        document.querySelector('.temperature').textContent = `${Math.round(temp)}°`
        document.querySelector('.wind').textContent = `Wind:${speed} m/s`
        let weatheContainer = document.querySelector('.weather-content-container');
        let figure = document.querySelector('.weather-icons')
        let feelsLike = document.createElement('figcaption');
        feelsLike.textContent = ` ${weather[0].description}`
        feelsLike.classList.add('weather_description')
        figure.append(feelsLike);

        if (weather[0].main == 'Clear') {
            document.querySelector('.clear_sky').style.display = 'block'
        } else if (weather[0].main == 'Mist') {
            document.querySelector('.mist').style.display = 'block'
        } else if (weather[0].main == 'Rain') {
            document.querySelector('.rain').style.display = 'block'
        } else if (weather[0].main == 'Smoke') {
            document.querySelector('.smoke').style.display = 'block'
        }

        weatheContainer.style.display = 'block'
        document.querySelector('.city').value = ''

    } catch (error) {
        document.querySelector('.error-msg').textContent = `An error occurred`
        console.error('An error occurred:', error);
        document.querySelector('.city').value = ''
    }
}




