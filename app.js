

async function getWeather() {
    const apiKey = '970d587f393eafdffc284a76d86e4d4f'
    const city = document.querySelector('.city').value;
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city}&appid=${apiKey}`

    if (city === '') {
        alert('Please enter a city name');
        return;
    }


    try {

        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log(`Error ${response.status} - ${response.statusText}`)
            alert(`${response.statusText}`)
            document.querySelector('.city').value = ''
            return;
        }
        const data = await response.json();
        console.log(data);


        const { name, main: { temp, feels_like, humidity }, wind: { deg, speed }, visibility } = data;
        console.log(speed.unit)

        document.querySelector('.city-name').textContent = `${name}`
        document.querySelector('.temperature').textContent = `${((temp) - (273.15)).toFixed(2)} ℃`
        document.querySelector('.wind').textContent = `: ${speed}`
        let weatheContainer = document.querySelector('.weather-content-container');
        let feelsLike = document.createElement('p');
        feelsLike.textContent = `Feelslike ${((feels_like) - (273.15)).toFixed(2)} ℃`
        feelsLike.classList.add('feels_like')
        weatheContainer.append(feelsLike);
        weatheContainer.style.display = 'block'
        document.querySelector('.city').value = ''

      
      

    } catch (error) {
        document.querySelector('.error-msg').textContent = `${error}`
        console.error('An error occurred:', error);
        document.querySelector('.city').value = ''
    }
}


// function displayCity() {
//     if (city.value === '') {
//         return alert('enter the city')
//     } else {
//         city.innerHTML = city.value;
//         city.value = ''
//         return;
//     }

// }

