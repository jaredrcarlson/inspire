import { AppState } from "../AppState.js"
import { weatherService } from "../services/WeatherService.js"
import { Pop } from "../utils/Pop.js"

function _draw() {
  console.log(AppState.weather)
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
}