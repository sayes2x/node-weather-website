const imgFilenames = {
  '01d': 'clear-sky-day',
  '02d': 'few-clouds-day',
  '03d': 'scattered-clouds-day',
  '04d': 'broken-clouds-day',
  '09d': 'shower-rain-day',
  '10d': 'rain-day',
  '11d': 'thunderstorm-day',
  '13d': 'snow-day',
  '50d': 'mist-day',
  '01n': 'clear-sky-night',
  '02n': 'few-clouds-night',
  '03n': 'scattered-clouds-night',
  '04n': 'broken-clouds-night',
  '09n': 'shower-rain-night',
  '10n': 'rain-night',
  '11n': 'thunderstorm-night',
  '13n': 'snow-night',
  '50n': 'mist-night'
}

const getImgFilename = code => imgFilenames[code]

export default getImgFilename