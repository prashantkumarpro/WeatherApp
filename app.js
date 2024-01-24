const apiKey = '970d587f393eafdffc284a76d86e4d4f'
const city = 'patna'

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

async function weatheApp() {
 
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                console.log(`Error ${response.status} - ${response.statusText}`)
            }
            const data = await response.json();
            console.log(data);
            
            const { name, main: { temp, feels_like } } = data;
         
            alert(`feels_like ${feels_like}`,)
     

        } catch (error) {
            console.error('An error occurred:', error);
        }
  

}
