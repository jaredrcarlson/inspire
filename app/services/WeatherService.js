import { AppState } from "../AppState.js"
import { Weather } from "../models/Weather.js"
import { api } from "./AxiosService.js"

class WeatherService {
  async getWeather() {
    const res = await api.get('api/weather')
    if (res.data) {
      AppState.weather = new Weather(res.data)
    }
  }

  nextTemperatureDisplay() {
    AppState.weather.nextTemperatureDisplay()
    AppState.emit('weather')
  }
}

export const weatherService = new WeatherService()