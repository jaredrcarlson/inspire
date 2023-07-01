import { AppState } from "../AppState.js"
import { imagesService } from "../services/ImagesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _draw() {
  document.body.style.backgroundImage = `url(${AppState.image.largeImgUrl})`
  setHTML('imageAuthor', /*html*/`
    <div class="py-1 text-bg-dark rounded opacity-75">
      <i class="ps-3">Photo by: ${AppState.image.author}</i>
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
}