import { AppState } from "../AppState.js"
import { imagesService } from "../services/ImagesService.js"
import { Pop } from "../utils/Pop.js"

function _draw() {
  document.body.style.backgroundImage = `url(${AppState.image.largeImgUrl})`
  document.getElementById('image-author').innerText = AppState.image.author
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
}