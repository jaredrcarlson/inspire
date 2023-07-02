import { setText } from "../utils/Writer.js"

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayLabelsSpa = ['domingo', 'lunes', 'martes', 'mi\xE9rcoles', 'jueves', 'viernes', 's\xE1bado']
const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthLabelsSpa = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const dayLabelsShort = dayLabels.map(dl => dl.substring(0, 3))
const monthLabelsShort = monthLabels.map(ml => ml.substring(0, 3))

function _draw(date) {
  setText('date', date.dateDisplay)
}

function _ordinal(num) {
  switch (num % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export class DateController {
  constructor() {
    const dateNow = new Date()
    const now = {
      dy: dateNow.getDay(),
      m: dateNow.getMonth(),
      dt: dateNow.getDate(),
      y: dateNow.getYear(),
      yy: dateNow.getFullYear()
    }
    this.dateDisplayQueue = [
      `${dayLabels[now.dy]}, ${monthLabels[now.m]} ${now.dt}${_ordinal(now.dt)}, ${now.yy}`,
      `${dayLabelsShort[now.dy]} ${monthLabelsShort[now.m]} ${now.dt} ${now.yy}`,
      `${monthLabels[now.m]} ${now.dt}${_ordinal(now.dt)}, ${now.yy}`,
      `${monthLabelsShort[now.m]} ${now.dt} ${now.yy}`,
      `${now.m + 1} / ${now.dt} / ${now.yy}`,
      `el ${dayLabelsSpa[now.dy]} ${now.dt} de ${monthLabelsSpa[now.m]} de ${now.yy}`
    ]
    this.dateDisplay = null
    this.nextDateDisplay()
    _draw(this)
  }

  nextDateDisplay() {
    this.dateDisplay = this.dateDisplayQueue.shift()
    this.dateDisplayQueue.push(this.dateDisplay)
    _draw(this)
  }
}