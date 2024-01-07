const inputCity = document.querySelector("#inputCity");
const alertInfo = document.querySelector("#alertInfo")

const getWeatherData = async (city) => {
    const apiKey = "ba605efc18f1572f61892fe426f18a1a";
  
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const loadingElement = document.querySelector('.loading')

    loadingElement.style.display = 'flex'

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    loadingElement.style.display = 'none'

    return data;
};


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    const apiCountryURL = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
    const dataElement = document.querySelector("#data")
    const suggestionElement = document.querySelector("#suggestions")

    

    dataElement.style.display = 'flex'
    suggestionElement.style.display = 'none'
    alertInfo.style.display = 'none'

    const cityName = document.querySelector("#cityName");
    const countryIcon = document.querySelector("#countryIcon");
    const weatherTemp = document.querySelector("#weatherTemp");
    const weatherType = document.querySelector("#weatherType");
    const weatherImg = document.querySelector("#weatherImg");
    const humidityIfo = document.querySelector("#humidityIfo");
    const speedInfo = document.querySelector("#speedInfo");
    const tempMin = document.querySelector("#tempMin")
    const tempMax = document.querySelector("#tempMax")
 
    cityName.innerText = data.name;
    countryIcon.setAttribute("src", apiCountryURL);
    weatherTemp.innerText = `${parseInt(data.main.temp)}°C`;
    weatherType.innerText = `${data.weather[0].description}`;
    weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityIfo.innerText = `${data.main.humidity}%`
    speedInfo.innerText = `${data.wind.speed}km/h`
    tempMin.innerText = `Mínima: ${parseInt(data.main.temp_min)}°C`
    tempMax.innerText = `Máxima: ${parseInt(data.main.temp_max)}°C`
};


document.querySelector("#searchCity").addEventListener("click", async (e) => {
  e.preventDefault();

  const city = inputCity.value;

  showWeatherData(city);

  const data = await getWeatherData(city);
    if (data.cod === "404") {
      alertInfo.style.display = 'flex'
    } else if (data.cod === "400") {
      alertInfo.style.display = 'flex'
    }

  inputCity.value = ''
});

document.addEventListener("keyup", async (e) => {
  if (e.code === "Enter") {
    const city = inputCity.value;;

    showWeatherData(city);

    const data = await getWeatherData(city);
    if (data.cod === "404") {
        alertInfo.style.display = 'flex'
    } else if (data.cod === "400") {
        alertInfo.style.display = 'flex'
    }

    inputCity.value = ''
  }
});


function validityInput(input) {
    var regex = /[A-Za-z\s.,!?]+/;

    if (!regex.test(input.value)) {
        alertInfo.style.display = 'flex'
        inputCity.value = ''
    }
  }


document.querySelectorAll(".itens button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id")
    showWeatherData(city)
  })
})