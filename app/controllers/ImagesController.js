import { AppState } from "../AppState.js"
import { imagesService } from "../services/ImagesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _draw() {
  document.body.style.backgroundImage = `url(${AppState.image.largeImgUrl})`
  setHTML('imageAuthor', /*html*/`
    <div class="py-1 panel text-secondary rounded-pill d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center text-secondary">
        <i class="ms-4">Photo by:</i>
        <i class="ps-2 font-rh-display">${AppState.image.author}</i>
      </div>
        <i class="mdi mdi-refresh me-3 btn-custom fs-4" onclick="app.GeneralController.nextImageAndQuote()"></i>
      </div>
      `)
}

export class ImagesController {
  constructor() {
    AppState.on('image', _draw)
    this.getRandomImage()
  }

  async getRandomImage() {
    try {
      await imagesService.getRandomImage()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  addDarkFilter() {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${AppState.image.largeImgUrl})`
  }

  removeDarkFilter() {
    document.body.style.backgroundImage = `url(${AppState.image.largeImgUrl})`
  }

}