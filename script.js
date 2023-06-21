const API_KEY = "000fce730d7ca74b50a74195663fdf1d";

const searchBtn = document.getElementById("searchBtn");
const temparature = document.getElementById("temparature");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const city = document.getElementById("searchInput");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (city.lenth !== 0) {
        getWeatherData(city.value);
    }
});

async function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            weatherIcon.src = "./images/404.png";
        }

        let data = await response.json();
        

        if (data.cod == 404) {
            description.innerHTML = `<span class="text-danger">${data.message}!</span>`;
            temparature.innerText = "0";
            humidity.innerText = "0";
            wind.innerText = "0";
        } else {
            setWeatherIcon(data.weather[0].main);
            temparature.innerText = Math.round(data.main.temp - 273.15);
            description.innerText = data.weather[0].main;
            humidity.innerText = data.main.humidity;
            wind.innerText = data.wind.speed;
        }
    } catch (error) {
        console.error(error);
    }
}

function setWeatherIcon(status) {
    switch (status) {
        case "Clear":
            weatherIcon.src = "./images/clear.png";
            break;
        case "Clouds":
            weatherIcon.src = "./images/cloud.png";
            break;
        case "Haze":
            weatherIcon.src = "./images/haze.png";
            break;
        case "Mist":
            weatherIcon.src = "./images/mist.png";
            break;
        case "Rain":
            weatherIcon.src = "./images/rain.png";
            break;
        case "Snow":
            weatherIcon.src = "./images/snow.png";
            break;
        default:
            weatherIcon.src = "./images/404.png";
            break;
    }
}
