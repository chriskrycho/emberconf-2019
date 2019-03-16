import { assert } from "@ember/debug";
import Controller from "@ember/controller";
import { isBlank } from "@ember/utils";
import { action } from "@ember-decorators/object";
import { filterBy } from "@ember-decorators/object/computed";
import { inject as service } from "@ember-decorators/service";

import Repo, { Todo } from "todomvc/services/repo";
import ApplicationRoute from "todomvc/routes/application";

export default class extends Controller {
  model!: ModelFrom<ApplicationRoute>;

  @service repo!: Repo;

  @filterBy("model", "completed", false) remaining!: Todo[];
  @filterBy("model", "completed") completed!: Todo[];

  @action createTodo(e: KeyboardEvent) {
    assert("`e.target` is set correctly", e.target instanceof HTMLInputElement);
    const target = e.target as HTMLInputElement;

    if (e.keyCode === 13 && !isBlank(target.value)) {
      this.repo.add({ title: target.value.trim(), completed: false });
      target.value = "";
      this.send("reloadModel");
    }
  }

  @action clearCompleted() {
    this.repo.deleteMany(this.completed);
    this.send("reloadModel");
  }
}
