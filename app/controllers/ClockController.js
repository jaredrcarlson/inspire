import { setText } from "../utils/Writer.js"

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function _draw(now) {
  const timeString = `${now.hour < 13 ? now.hour : now.hour - 12}:${now.minute}.${now.second} ${now.hour < 13 ? 'AM' : 'PM'}`
  const dateString = `${now.day}, ${now.month} ${now.date} ${now.year}`
  setText('clock-time', timeString)
  setText('clock-date', dateString)
}

function _update() {
  const dateNow = new Date(Date.now())
  const now = {
    day: dayLabels[dateNow.getDay()],
    month: monthLabels[dateNow.getMonth()],
    date: dateNow.getDate(),
    year: dateNow.getFullYear(),
    hour: dateNow.getHours(),
    minute: dateNow.getMinutes(),
    second: dateNow.getSeconds()
  }
  _draw(now)
}

export class ClockController {
  constructor() {
    this.id = setInterval(_update, 1000)
  }
}