export class Weather {
  constructor(data) {
    this.temperature = {
      kelvin: Number(data.main.temp),
      celsius: Number(Weather.KelvinToCelsius(data.main.temp)),
      fahrenheit: Number(Weather.KelvinToFahrenheit(data.main.temp))
    }
    this.kind = data.weather['0'].main // Ex: Sunny, Cloudy, etc.
    this.iconUrl = data.weather.icon.replace('undefined', data.weather['0'].icon)
    this.temperatureDisplayQueue = [
      `${this.temperature.celsius.toFixed(0)} \xB0C`,
      `${this.temperature.fahrenheit.toFixed(0)} \xB0F`,
      `${this.temperature.kelvin.toFixed(0)} \xB0K`
    ]
    this.temperatureDisplay = null
    this.nextTemperatureDisplay()
  }

  nextTemperatureDisplay() {
    this.temperatureDisplay = this.temperatureDisplayQueue.shift()
    this.temperatureDisplayQueue.push(this.temperatureDisplay)
  }

  static KelvinToCelsius(k) {
    return Number(k) - 273.15
  }

  static KelvinToFahrenheit(k) {
    return Weather.KelvinToCelsius(k) * (9 / 5) + 32
  }

}