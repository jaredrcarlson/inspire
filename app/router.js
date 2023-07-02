import { ImagesController } from "./controllers/ImagesController.js";
import { TodosController } from "./controllers/TodosController.js";
import { QuotesController } from "./controllers/QuotesController.js";
import { WeatherController } from "./controllers/WeatherController.js";
import { DateController } from "./controllers/DateController.js";
import { ClockController } from "./controllers/ClockController.js";
import { AccountController } from "./controllers/AccountController.js";
import { GeneralController } from "./controllers/GeneralController.js";
import { MainView } from "./views/MainView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [
      ImagesController,
      TodosController,
      QuotesController,
      WeatherController,
      DateController,
      ClockController,
      AccountController,
      GeneralController
    ],
    view: MainView
  }
]

/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */