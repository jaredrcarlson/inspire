import { setText } from "../utils/Writer.js"

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const format = { military: false }

function _draw(now) {
  const ts = {
    hourm: `${now.hour}`.padStart(2, '0'),
    hour: `${now.hour == 0 ? 12 : now.hour > 12 ? now.hour - 12 : now.hour}`.padStart(2, '0'),
    minute: `${now.minute}`.padStart(2, '0'),
    second: `${now.second}`.padStart(2, '0')
  }
  const timeString = `${ts.hour}:${ts.minute}:${ts.second} ${now.hour > 12 ? 'PM' : 'AM'}`
  const timeStringMilitary = `${ts.hourm}${ts.minute}${ts.second}`
  const dateString = `${now.day}, ${now.month} ${now.date} ${now.year}`

  setText('clockTime', format.military ? timeStringMilitary : timeString)

  setText('clockDate', dateString)
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

  toggleFormat() {
    format.military = !format.military
    _update()
  }
}