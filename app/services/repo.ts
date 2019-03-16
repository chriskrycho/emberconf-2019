import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export class Todo {
  id: number;
  @tracked title: string;
  @tracked completed: boolean;

  constructor(title: string, id: number, completed = false) {
    this.title = title;
    this.completed = completed;
    this.id = id;
  }

  toJSON(_key: string) {
    const { id, title, completed } = this;
    return { id, title, completed };
  }
}

export default class Repo extends Service {
  lastId = 0;
  data!: Todo[]; // Initialized in `findAll` during app boot!

  findAll() {
    if (!this.data) {
      this.data = JSON.parse(window.localStorage.getItem("todos") || "[]");
    }

    return this.data;
  }

  add({ title, completed }: Pick<Todo, "title" | "completed">) {
    let todo = new Todo(title, this.lastId++, completed);
    this.data = [...this.data, todo];
    this.persist();
    return todo;
  }

  delete(todo: Todo) {
    this.data.removeObject(todo);
    this.persist();
  }

  deleteMany(todos: Todo[]) {
    this.data.removeObjects(todos);
    this.persist();
  }

  persist() {
    window.localStorage.setItem("todos", JSON.stringify(this.data));
  }
}
