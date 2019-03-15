import Component from "@ember/component";
import { assert } from "@ember/debug";
import { set } from "@ember/object";
import { tagName, classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import { inject } from "@ember-decorators/service";

import Repo, { Todo } from "todomvc/services/repo";

@tagName("section")
@classNames("main")
export default class TodoList extends Component {
  todos!: Todo[];

  @inject repo!: Repo;

  canToggle = true;

  @computed("todos.@each.completed")
  get allCompleted(): boolean {
    return this.todos.isEvery("completed");
  }

  init() {
    super.init();
    assert("`todos` is required", Array.isArray(this.todos));
  }

  @action enableToggle() {
    this.set("canToggle", true);
  }

  @action disableToggle() {
    this.set("canToggle", false);
  }

  @action toggleAll() {
    let allCompleted = this.allCompleted;
    this.todos.forEach(todo => set(todo, "completed", !allCompleted));
    this.repo.persist();
  }
}
