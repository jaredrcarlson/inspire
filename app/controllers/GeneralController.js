import { ImagesController } from "./ImagesController.js"
import { QuotesController } from "./QuotesController.js"

function _nextImage() {
  new ImagesController().getRandomImage()
}

function _nextQuote() {
  new QuotesController().getRandomQuote()
}

export class GeneralController {
  constructor() {
  }

  nextImageAndQuote() {
    _nextImage()
    _nextQuote()
  }
}