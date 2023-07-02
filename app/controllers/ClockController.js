import { setHTML, setText } from "../utils/Writer.js"

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function _draw(now, format) {
  const ts = {
    hourm: `${now.hour}`.padStart(2, '0'),
    hour: `${now.hour == 0 ? 12 : now.hour > 12 ? now.hour - 12 : now.hour}`.padStart(2, '0'),
    minute: `${now.minute}`.padStart(2, '0'),
    second: `${now.second}`.padStart(2, '0')
  }
  const timeStd = `${ts.hour}:${ts.minute}:${ts.second} ${now.hour > 12 ? 'PM' : 'AM'}`
  const timeMil = `${ts.hourm}${ts.minute}${ts.second}`
  const day = `${now.day}`
  const date = `${now.month} ${now.date}${_ordinal(now.date)}, ${now.year}`
  const clockFormatSwitch = `${format == 'std' ?
    '<i class="mx-3 mdi mdi-toggle-switch-off-outline fs-4 pointer"></i>' :
    '<i class="mx-3 mdi mdi-toggle-switch-outline fs-4 pointer"></i>'}`

  setText('clockTime', format == 'mil' ? timeMil : timeStd)
  setText('clockDay', day)
  setText('clockDate', date)
  setHTML('clockFormatSwitch', clockFormatSwitch)
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


export class ClockController {
  constructor() {
    this.format = 'std'
    this.id = setInterval(function () {
      const dateNow = new Date()
      this.now = {
        day: dayLabels[dateNow.getDay()],
        month: monthLabels[dateNow.getMonth()],
        date: dateNow.getDate(),
        year: dateNow.getFullYear(),
        hour: dateNow.getHours(),
        minute: dateNow.getMinutes(),
        second: dateNow.getSeconds()
      }
      _draw(this.now, this.format)
    }.bind(this), 1000)
  }

  update() {
    _draw(this.now, this.format)
  }

  setFormat(format) {
    this.format = format
    this.update()
  }

  toggleFormat() {
    this.format = this.format == 'std' ? 'mil' : 'std'
    this.update()
  }

  static TimeOfDay() {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'morning'
    } else if (hour < 18) {
      return 'afternoon'
    } else {
      return 'evening'
    }
  }
}