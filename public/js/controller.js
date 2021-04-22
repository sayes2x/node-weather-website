import { saveWeather, getWeather, retrieveWeather, updateId, retriveId, getBackground, retriveBackground, removeForecast } from './model.js'
import { displayWeather, displayNotification } from './view.js'
import { weatherForm, search } from './utils/dom.js'

// function first called when weather page is loaded
const init = () => {
  // add event listener to 'Add Location' button
  weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    useSearch()
  })

  // if id is falsey ('0') there is no saved weather data, use Geolocation
  let id = retriveId()
  if (!id) return useGeolocation()

  // retrive saved weather data from browser storage and display it
  retriveBackground()
  retrieveWeather()
  displayWeather(getWeather(), getBackground())
}

// get weather using browser geolocation
const useGeolocation = () => {

// success function
  const success = async position => {
    displayNotification('Loading weather data...', 600)
    const response = await fetch(`/geolocation?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
    const { forecast } =  await response.json();

    // error code
    if (forecast.error) return displayNotification(forecast.error, 1000, 'error')

    // success code
    saveWeather(forecast)
    updateId()
    displayWeather(getWeather(), getBackground())
  }

  // error function
  const error = () => {
    displayNotification('Unable to retrieve your location', 1000, 'error')
  }

  if(!navigator.geolocation) {
    displayNotification('Geolocation is not supported by your browser', 1000, 'error')
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// event handler for form
const useSearch = () => {
  const searchLocation = search.value
  fetchWeather(searchLocation)
  search.value = ''
  search.focus()
}

// get weather when location is entered in weatherForm
const fetchWeather = async location => {
  displayNotification('Loading weather data...', 600)
  const response = await fetch(`/weather?address=${location}`)
  const data =  await response.json()

  // error code
  if (data.error) return displayNotification(data.error, 1000, 'error')

  // success code
  // remove 'United States' from location data
  const geoLocation = data.location.replace(', United States', '')
  // use location data from geolocation api instead of weather api
  data.forecast.location = geoLocation

  saveWeather(data.forecast)
  updateId()
  displayWeather(getWeather(), getBackground())
}

// called when close button is clicked
const clearCard = id => {
  removeForecast(id)
  displayWeather(getWeather())
  search.focus()
}

export { init, clearCard }