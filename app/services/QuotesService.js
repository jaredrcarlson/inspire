import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";

class QuotesService {
  async getRandomQuote() {
    const res = await api.get('api/quotes')
    if (res.data) {
      AppState.quote = res.data
    }
  }
}

export const quotesService = new QuotesService();