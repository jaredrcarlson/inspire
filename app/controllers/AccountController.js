import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { accountService } from "../services/AccountService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"
import { ClockController } from "./ClockController.js"

function _drawAccountEditForm() {
  setHTML('accountEdit', Account.AccountEditForm(AppState.account))
}

function _drawGreeting() {
  setHTML('greeting', `Good ${ClockController.TimeOfDay()}!`)
  setHTML('userName', `${AppState.account.name}`)
}

export class AccountController {
  constructor() {
    AppState.on('account', _drawGreeting)
    AppState.on('account', _drawAccountEditForm)
  }

  async update(event) {
    event.preventDefault()
    const data = getFormData(event.target)
    try {
      await accountService.editAccount(data)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}