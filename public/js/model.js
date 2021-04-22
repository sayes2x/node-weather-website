import getImgFilename from './utils/imgFilename.js'
import { storage } from './utils/isSessionStorage.js'

let weatherData = []
let id = 0
let background = null

const saveWeather = forecast => {
  forecast.id = id
  weatherData.unshift(forecast)
  if (storage) {
    storage.setItem('weatherData', JSON.stringify(weatherData))
  }
  if (id === 0) saveBackground(forecast.icon)
}

const getWeather = () =>  weatherData

const retrieveWeather = () => {
  if (storage) {
    weatherData = JSON.parse(storage.getItem('weatherData'))
  }
}

const updateId = () => {
  id++
  if (storage) {
    storage.setItem('id', id)
  }
}

const retriveId = () => {
  let storageId
  if (storage) storageId = storage.getItem('id')
  // do not update id if storageId is undefined
  if (storageId) id = storageId
  return id
}

const saveBackground = (icon) => {
  background = `url('/img/backgrounds/${getImgFilename(icon)}.jpg')`
  if (storage) {
    storage.setItem('background', background)
  }
}

const getBackground = () => background

const retriveBackground = () =>{
  if (storage) {
    background = storage.getItem('background')
  }
  return background
}

const removeForecast = id => {
  // remove location from state
  const index = weatherData.findIndex(location => location.id === id)
  weatherData.splice(index, 1)

  // remove location from session storage
  if (storage) {
    storage.setItem('weatherData', JSON.stringify(weatherData))
  }
}

export { saveWeather, getWeather, retrieveWeather, updateId, retriveId, getBackground, retriveBackground, removeForecast }