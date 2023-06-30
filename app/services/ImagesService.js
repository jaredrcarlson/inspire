import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class ImagesService {
  async getRandomImage() {
    const res = await api.get('api/images')
    if (res.data) {
      AppState.image = res.data
    }
  }
}

export const imagesService = new ImagesService();