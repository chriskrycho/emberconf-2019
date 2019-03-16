import Service from "@ember/service";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

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
    let todo = { title, completed, id: this.lastId++ };
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
