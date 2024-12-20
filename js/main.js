const apiKey = "74d0539f50e04176bd202805241812";
const btnSubmit = document.querySelector("#btnSubmit");
const inputSearch = document.querySelector("#btnSearch");
const todayDate = document.querySelector("#todayDate");
const dayName = document.querySelector("#dayName");
const dateNum = document.querySelector("#dateNum");
const dateMonth = document.querySelector("#dateMonth");
const todayLocation = document.querySelector("#todayLocation");
const todayTemp = document.querySelector("#todayTemp");
const todayImage = document.querySelector("#todayImage");
const todayText = document.querySelector("#todayText");
const contentImg = document.querySelector(".contentImg");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const windDirection = document.querySelector("#windDirection");
const alertError = document.querySelector("#alertError");

// nextday
let nextDayName = document.querySelectorAll(".nextDayName");
let nextImg = document.querySelectorAll(".nextImg");
let nextMaxTemp = document.querySelectorAll(".nextMaxTemp");
let nextMinTemp = document.querySelectorAll(".nextMinTemp");
let nextText = document.querySelectorAll(".nextText");

async function addForcast(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=74d0539f50e04176bd202805241812&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

function displayTodayWeather(data) {
  let todaYDate = new Date();
  dayName.innerHTML = todaYDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  dateNum.innerHTML = todaYDate.getDate();
  dateMonth.innerHTML = todaYDate.toLocaleDateString("en-US", {
    month: "long",
  });
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImage.setAttribute("src", data.current.condition.icon);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_mph + "m/h";
  windDirection.innerHTML = data.current.wind_dir;
}

function displayNextdayWeather(data) {
  let forcastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forcastData[i + 1].date);
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextImg[i].setAttribute("src", forcastData[i + 1].day.condition.icon);
    nextMaxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c;
    nextText[i].innerHTML = forcastData[i + 1].day.condition.text;
  }
}

async function add(city = "Cairo") {
  let weatherData = await addForcast(city);
  console.log(weatherData);
  if (weatherData.error) {
    alertError.classList.remove("d-none");
  } else {
    alertError.classList.add("d-none");
    displayTodayWeather(weatherData);
    displayNextdayWeather(weatherData);
  }
}
add();

// inputSearch.addEventListener("input", function () {
//   add(inputSearch.value);
// });

btnSubmit.addEventListener("click", function () {
  add(inputSearch.value);
});
