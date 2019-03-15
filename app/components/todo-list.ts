import { assert } from "@ember/debug";
import { action } from "@ember-decorators/object";
import { inject } from "@ember-decorators/service";
import Component from "@glimmer/component";
import { Owner } from "@glimmer/di";
import { tracked } from "@glimmer/tracking";

import Repo, { Todo } from "todomvc/services/repo";

type Args = {
  todos: Todo[];
};

export default class TodoList extends Component<Args> {
  @inject repo!: Repo;

  @tracked canToggle = true;

  get allCompleted(): boolean {
    return this.args.todos.isEvery("completed");
  }

  constructor(owner: Owner, args: Args) {
    super(owner, args);
    assert("`todos` is required", Array.isArray(args.todos));
  }

  @action enableToggle() {
    this.canToggle = true;
  }

  @action disableToggle() {
    this.canToggle = false;
  }

  @action toggleAll() {
    let allCompleted = this.allCompleted;
    this.args.todos.forEach(todo => (todo.completed = !allCompleted));
    this.repo.persist();
  }
}
