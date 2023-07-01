import { AppState } from "../AppState.js"
import { weatherService } from "../services/WeatherService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js"

function _draw() {
  setText('weather-temp', AppState.weather.temperatureDisplay)
  setText('weather-kind', AppState.weather.kind)
  setHTML('weather-icon', `<img class="weather-img" src="${AppState.weather.iconUrl}" alt="${AppState.weather.kind}">`)
}

export class WeatherController {
  constructor() {
    AppState.on('weather', _draw)
    this.getWeather()
  }

  async getWeather() {
    try {
      await weatherService.getWeather()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  nextTemperatureDisplay() {
    weatherService.nextTemperatureDisplay()
  }
}