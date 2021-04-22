import { background } from './utils/dom.js'
import { retriveBackground } from './model.js'

background.style.backgroundImage = retriveBackground()
background.style.opacity = '1'
