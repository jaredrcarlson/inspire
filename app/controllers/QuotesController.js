import { AppState } from "../AppState.js"
import { quotesService } from "../services/QuotesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _draw() {
  setHTML('quote', /*html*/`
    <div class="py-2 font-stroke d-flex justify-content-center pointer">
      <i class="font-rh-display fs-5 quote">"${AppState.quote.content}"</i>
      <i id="quoteAuthor" class="ms-3 font-rh-display fs-5 quote-author fade-in">-- ${AppState.quote.author}</i>
    </div>
  `)
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

}