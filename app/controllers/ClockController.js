import { setHTML, setText } from "../utils/Writer.js"

function _draw(data) {
  setText('clockTime', data.format == 'std' ? data.standard : data.military)
  setText('clockFormatLabelStd', data.formatLabelStd)
  setHTML('clockFormatSwitch', `<i class="mx-3 mdi mdi-${data.formatSwitchIcon} fs-4 pointer"></i>`)
  setText('clockFormatLabelMil', data.formatLabelMil)
}

function _build(clock) {
  const cs = {
    hour: (clock.format == 'std') ?
      `${clock.now.hour == 0 ? 12 : clock.now.hour > 12 ? clock.now.hour - 12 : clock.now.hour}`.padStart(2, '0') :
      `${clock.now.hour}`.padStart(2, '0'),
    minute: `${clock.now.minute}`.padStart(2, '0'),
    second: `${clock.now.second}`.padStart(2, '0'),
  }
  return {
    format: clock.format,
    formatLabelStd: '12HR',
    formatSwitchIcon: clock.format == 'std' ? 'toggle-switch-off-outline' : 'toggle-switch-outline',
    formatLabelMil: '24HR',
    standard: `${cs.hour}:${cs.minute}:${cs.second} ${clock.now.hour > 12 ? 'PM' : 'AM'}`,
    military: `${cs.hour}${cs.minute}${cs.second}`
  }
}

export class ClockController {
  constructor() {
    this.format = 'std'
    this.id = setInterval(function () {
      const dateNow = new Date()
      this.now = {
        hour: dateNow.getHours(),
        minute: dateNow.getMinutes(),
        second: dateNow.getSeconds()
      }
      this.update()
    }.bind(this), 1000)
  }

  update() {
    _draw(_build(this))
  }

  setTimeFormat(format) {
    this.format = format
    this.update()
  }

  toggleTimeFormat() {
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