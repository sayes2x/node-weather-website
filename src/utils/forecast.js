const request = require('request')

const apiKey = process.env.OPENWEATHERMAP_API_KEY

const forecast = ( latitude, longitude, callback ) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.cod !== 200) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, {
        icon: body.weather[0].icon,
        description: body.weather[0].description,
        temperature: body.main.temp,
        feelsLike: body.main.feels_like,
        location: body.name,
        latitude,
        longitude
      })
    }
  })
}

module.exports = forecast