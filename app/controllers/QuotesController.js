import { AppState } from "../AppState.js"
import { quotesService } from "../services/QuotesService.js"
import { Pop } from "../utils/Pop.js"
import { setText } from "../utils/Writer.js"

function _draw() {
  setText('quote', `"${AppState.quote.content}"`)
  setText('quote-author', `-- ${AppState.quote.author}`)
}

export class QuotesController {
  constructor() {
    AppState.on('quote', _draw)
    this.getRandomQuote()
  }

  async getRandomQuote() {
    try {
      await quotesService.getRandomQuote()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  show(elementId) {
    document.getElementById(elementId).style.display = 'block'
  }

  hide(elementId) {
    document.getElementById(elementId).style.display = 'none'
  }

}