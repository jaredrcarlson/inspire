import { AppState } from "../AppState.js"
import { todosService } from "../services/TodosService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js"

function _draw() {
  let oncanvasTemplate = /*html*/`
  <div class="py-2 d-flex align-items-center justify-content-around text-bg-dark font-rh-mono fs-5 rounded-pill opacity-75">
    <div id="todosRemainingOncanvas" class="px-2 border border-2 border-secondary rounded-pill text-secondary">${_remainingCount()}</div>
    <div class="px-1 text-secondary">To-Do</div>
    <i class="mdi mdi-checkbox-marked-circle-plus-outline fs-3 btn-custom" data-bs-toggle="offcanvas" data-bs-target="#todoList" aria-controls="todoList"></i>
  </div>
  `

  let offcanvasTemplate = /*html*/`
    <div class="col-3 font-rh-display">
      <div id="todoList" class="p-3 text-bg-dark rounded offcanvas offcanvas-end">
        <div class="offcanvas-header font-rh-mono fs-5">
          <div id="todosRemainingOffcanvas" class="ms-2 px-2 border border-2 border-secondary rounded-pill text-secondary">${_remainingCount()}</div>
          <div class="text-secondary">To-Do Items</div>
          <button type="button" class="btn btn-dark rounded-pill fs-4" data-bs-dismiss="offcanvas"
            aria-label="Close"><i class="mdi mdi-arrow-right-thick"></i></button>
        </div>
        <div class="offcanvas-body">
          <form onsubmit="app.TodosController.create(event)"
            class="mb-3 d-flex align-items-center justify-content-between">
            <input type="text" class="form-control mx-2" placeholder="New Todo" maxlength="60" name="description"
              required aria-label="Description" aria-describedby="newTodoDescription">
            <button type="submit" class="mx-1 btn btn-success"><i class="mdi mdi-plus"></i></button>
          </form>
  `
  AppState.todos.forEach(td => offcanvasTemplate += td.ListTemplate)
  offcanvasTemplate += /*html*/`        
        </div>
      </div>
    </div>
  `
  setHTML('oncanvasTodoHeader', oncanvasTemplate)
  setHTML('offcanvasTodoList', offcanvasTemplate)
}

function _drawUpdatedTodoItem(id) {
  const item = AppState.todos.find(td => td.id == id)
  if (item) {
    setHTML(id, item.UpdateTemplate)
    setText('todosRemainingOffcanvas', _remainingCount())
    setText('todosRemainingOncanvas', _remainingCount())
  }
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
      _drawUpdatedTodoItem(id)
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