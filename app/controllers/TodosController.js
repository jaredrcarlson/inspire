import { AppState } from "../AppState.js"
import { todosService } from "../services/TodosService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _draw() {
  let template = /*html*/`
    <p class="fs-5 p-2 text-secondary">${_remainingCount()} Todos remaining</p>
    <form onsubmit="app.TodosController.create(event)" class="mb-3 d-flex align-items-center justify-content-between">
      <input type="text" class="form-control mx-2" placeholder="New Todo" maxlength="60" name="description" required aria-label="Description" aria-describedby="newTodoDescription">
      <button type="submit" class="mx-1 btn btn-success"><i class="mdi mdi-plus"></i></button>
    </form>
  `
  AppState.todos.forEach(td => template += td.ListTemplate)
  setHTML('todo-list', template)
}

function _remainingCount() {
  let count = 0
  AppState.todos.forEach(td => count += td.completed ? 0 : 1)
  return count
}

export class TodosController {
  constructor() {
    AppState.on('account', this.getAll)
    AppState.on('account', _draw)
    AppState.on('todos', _draw)
  }

  reportError(error) {
    console.error(error)
    Pop.error(error.message)
  }

  async create(event) {
    event.preventDefault()
    try {
      const form = event.target
      const data = getFormData(form)
      await todosService.create(data)
      form.reset()
    } catch (error) {
      this.reportError(error)
    }
  }

  async getAll() {
    try {
      await todosService.getAll()
    } catch (error) {
      this.reportError(error)
    }
  }

  async toggleStatus(id) {
    try {
      await todosService.toggleStatus(id)
    } catch (error) {
      this.reportError(error)
    }
  }

  async delete(id) {
    if (await Pop.confirm()) {
      try {
        await todosService.delete(id)
      } catch (error) {
        this.reportError(error)
      }
    }
  }

}