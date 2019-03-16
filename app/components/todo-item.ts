import { assert } from "@ember/debug";
import { action } from "@ember-decorators/object";
import { guidFor } from "@ember/object/internals";
import { scheduleOnce } from "@ember/runloop";
import { isBlank } from "@ember/utils";
import { inject } from "@ember-decorators/service";
import { Owner } from "@glimmer/di";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

import Repo, { Todo } from "todomvc/services/repo";

interface Args {
  todo: Todo;
  onStartEdit: () => void;
  onEndEdit: () => void;
}

export default class TodoItem extends Component<Args> {
  id: string;
  @inject repo!: Repo;

  @tracked editing = false;

  get classNames(): string {
    const editing = this.editing ? "editing" : "";
    const completed = this.args.todo.completed ? "completed" : "";
    return [editing, completed].join(" ");
  }

  constructor(owner: Owner, args: Args) {
    super(owner, args);
    assert("`todo` is required", typeof this.args.todo === "object");
    assert(
      "`onStartEdit` is required",
      typeof this.args.onStartEdit === "function"
    );

    this.id = guidFor(this);
  }

  @action startEditing() {
    this.args.onStartEdit();
    this.editing = true;
    scheduleOnce("afterRender", this, "focusInput");
  }

  @action doneEditing(todoTitle: string) {
    if (!this.editing) {
      return;
    }

    if (isBlank(todoTitle)) {
      this.removeTodo();
    } else {
      // NOTE: not DDAU!
      this.args.todo.title = todoTitle.trim();
      this.editing = false;
      this.args.onEndEdit();
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
      this.editing = false;
    }
  }

  @action toggleCompleted(e: KeyboardEvent) {
    assert("`e.target` is set correctly", e.target instanceof HTMLInputElement);
    const target = e.target as HTMLInputElement;

    this.args.todo.completed = target.checked;
    this.repo.persist();
  }

  @action removeTodo() {
    this.repo.delete(this.args.todo);
  }

  focusInput() {
    // Assert because if the ID is not present the template is badly formed.
    const edit = document.querySelector(this.id)!.querySelector("input.edit");
    assert("`input.edit` is an input", edit instanceof HTMLInputElement);
    (edit as HTMLInputElement).focus();
  }
}
