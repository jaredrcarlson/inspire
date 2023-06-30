export class Weather {
  constructor(data) {
    this.temperature = {
      kelvin: Number(data.main.temp),
      celsius: Number(Weather.KelvinToCelsius(data.main.temp).toFixed(2)),
      fahrenheit: Number(Weather.KelvinToFahrenheit(data.main.temp).toFixed(2))
    }
    this.dayType = data.weather['0'].main
    this.iconUrl = data.weather.icon.replace('undefined', data.weather['0'].icon)
  }

  static KelvinToCelsius(k) {
    return Number(k) - 273.15
  }

  static KelvinToFahrenheit(k) {
    return Weather.KelvinToCelsius(k) * (9 / 5) + 32
  }

}