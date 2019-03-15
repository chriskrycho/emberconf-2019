import { set } from "@ember/object";
import { isBlank } from "@ember/utils";
import { scheduleOnce } from "@ember/runloop";
import Component from "@ember/component";
import { action } from "@ember-decorators/object";
import { alias } from "@ember-decorators/object/computed";
import { assert } from "@ember/debug";
import { className, tagName } from "@ember-decorators/component";
import { inject } from "@ember-decorators/service";

import Repo, { Todo } from "todomvc/services/repo";

@tagName("li")
export default class TodoItem extends Component {
  todo!: Todo;
  onStartEdit!: () => void;
  onEndEdit!: () => void;

  @inject repo!: Repo;

  @className @alias("todo.completed") completed!: boolean;
  @className editing = false;

  init() {
    super.init();
    assert("`todo` is required", typeof this.todo === "object");
    assert("`onStartEdit` is required", typeof this.onStartEdit === "function");
  }

  @action startEditing() {
    this.onStartEdit();
    this.set("editing", true);
    scheduleOnce("afterRender", this, "focusInput");
  }

  @action doneEditing(todoTitle: string) {
    if (!this.editing) {
      return;
    }
    if (isBlank(todoTitle)) {
      this.send("removeTodo");
    } else {
      set(this.todo, "title", todoTitle.trim());
      this.set("editing", false);
      this.onEndEdit();
    }
  }

  @action handleKeydown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      assert(
        "`e.target` is set correctly",
        e.target instanceof HTMLInputElement
      );
      (e.target as HTMLInputElement).blur();
    } else if (e.keyCode === 27) {
      this.set("editing", false);
    }
  }

  @action toggleCompleted(e: KeyboardEvent) {
    assert("`e.target` is set correctly", e.target instanceof HTMLInputElement);
    set(this.todo, "completed", (e.target as HTMLInputElement).checked);
    this.repo.persist();
  }

  @action removeTodo() {
    this.repo.delete(this.todo);
  }

  focusInput() {
    const edit = this.element.querySelector("input.edit");
    assert("input `input.edit` is defined", edit instanceof HTMLInputElement);
    (edit as HTMLInputElement).focus();
  }
}
