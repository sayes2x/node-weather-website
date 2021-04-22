import { clearCard } from './controller.js'
import getImgFilename from './utils/imgFilename.js'
import { background, main, notification } from './utils/dom.js'


const displayWeather = (weatherData, backgroundImage) => {
  main.style.opacity = '0'
  setTimeout(() => {
    main.innerHTML = ''
    // set background image
    if (backgroundImage) {
      background.style.backgroundImage = backgroundImage
      background.style.opacity = '1'
    }

    for (let forecast of weatherData) {
      // create card and set it's id
      let card = document.createElement('div')
          card.className = 'card'
      card.id = forecast.id

      // add content to card
      card.innerHTML = `
        <figure>
          <img src="/img/icons/${getImgFilename(forecast.icon)}.svg">
          <figcaption class="description">${forecast.description}</figcaption>
        </figure>
        <div class="forecast">
          <p class="temperature">${Math.round(forecast.temperature)}°</p>
          <div class="location">
            <img src="/img/icons/location.svg">
            <p>${forecast.location}</p>
          </div>
        </div>
        <p class="feels-like"><strong>Feels like:</strong> ${Math.round(forecast.feelsLike)}°</p>
      `
      // add close button so card can be removed from DOM
      let button = document.createElement('button')
      button.textContent = 'close'
      button.className = 'close'
      button.addEventListener('click', () => {
        clearCard(forecast.id)
      })
      card.append(button)

      // add card to webpage
        main.append(card)
    }
    main.style.opacity = '1'
  }, 200)
}

const displayNotification = (message, time, type) => {
  // set class name
  if (type === 'error') {
    notification.className = 'warning'
  } else {
    notification.className = 'notify'
  }
  // display notification
  notification.textContent = message
  notification.style.display = 'block'
  setTimeout(() => {
    notification.style.opacity = '0.9'
  }, 0)
  // remove notificaiton after time
  setTimeout(() => {
    notification.style.opacity = '0.0'
    notification.addEventListener('transitionend', setDisplayNone)
  }, time)
}

// removes notification from the dom
const setDisplayNone = () => {
  notification.style.display = 'none'
  notification.removeEventListener('transitionend', setDisplayNone)
}


export { displayWeather, displayNotification }