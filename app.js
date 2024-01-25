const apiKey = '970d587f393eafdffc284a76d86e4d4f'
let city = document.querySelector('.city');


const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

async function weatheApp() {

    // console.log(city.value)
    if (city.value === '') {
        return alert('enter the city')
    }
    city.value = ''

    try {

        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log(`Error ${response.status} - ${response.statusText}`)
            return;
        }
        const data = await response.json();
        console.log(data);


        const { name, main: { temp, feels_like } } = data;

        alert(`City: ${name}\nTemperature: ${temp}\nFeels Like: ${feels_like}`);

        // Clear the input after successful API call
        city.value = '';
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


