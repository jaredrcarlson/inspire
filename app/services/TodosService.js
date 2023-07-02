import { AppState } from "../AppState.js";
import { Todo } from "../models/Todo.js";
import { api } from "./AxiosService.js";

class TodosService {

  async create(data) {
    const res = await api.post('api/todos', data)
    AppState.todos.push(new Todo(res.data))
    AppState.emit('todos')
  }

  async getAll() {
    const res = await api.get('api/todos')
    AppState.todos = res.data.map(obj => new Todo(obj))
  }

  async toggleStatus(id) {
    const todoItemIndex = AppState.todos.findIndex(td => td.id == id)
    if (todoItemIndex != -1) {
      const todoItem = AppState.todos[todoItemIndex]
      const res = await api.put(`api/todos/${id}`, { completed: !todoItem.completed })
      if (res.data) {
        AppState.todos.splice(todoItemIndex, 1, new Todo(res.data))
      }
    }
  }

  async delete(id) {
    const res = await api.delete(`api/todos/${id}`)
    if (res.data) {
      const todoItemIndex = AppState.todos.findIndex(td => td.id == id)
      if (todoItemIndex != -1) {
        AppState.todos.splice(todoItemIndex, 1)
        AppState.emit('todos')
      }
    }
  }

}

export const todosService = new TodosService()