const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Scott A Price'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Scott A Price'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Scott A Price'
  })
})

app.get('/geolocation', (req, res) => {
  if (!req.query.latitude) {
    return res.send({
      error: 'Unable to retrieve your location'
    })
  }

  forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
    if (error) return res.send({error})
    res.send({
      forecast: forecastData,
    })
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({error})
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({error})
      res.send({
        forecast: forecastData,
        location,
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    errorMessage: "I'm sorry, that page does not exist!",
    name: 'Scott A Price'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})