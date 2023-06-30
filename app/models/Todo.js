export class Todo {
  constructor(data) {
    this.id = data.id
    this.completed = data.completed
    this.creatorId = data.creatorId
    this.description = data.description
  }

  get ListTemplate() {
    return /*html*/`
    <div class="mb-2 d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <input class="mx-3 selectable"${this.completed ? ' checked' : ''} type="checkbox" name="completed" onclick="app.TodosController.toggleStatus('${this.id}')">
        <p class="mb-1${this.completed ? ' todo-completed' : ' fw-bold'}">${this.description}</p>
      </div>
      <div class="d-flex align-items-center">
        <button class="me-2 btn btn-sm btn-danger selectable" onclick="app.TodosController.delete('${this.id}')"><i class="mdi mdi-delete"></i></button>
      </div>
    </div>
    `
  }
}