import { makeAutoObservable } from 'mobx';
import { TTodo } from 'Root/types/todo';

class Todo {
  todos: Array<TTodo> = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: TTodo) {
    this.todos.push(todo);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  completeTodo(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  async fetchTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const json = await response.json();
    this.todos = [...this.todos, ...json];
  }
}

export default new Todo();
