import { inject as service } from "@ember-decorators/service";
import Route from "@ember/routing/route";
import Repo from "todomvc/services/repo";
import { action } from "@ember-decorators/object";

export default class ApplicationRoute extends Route {
  @service repo!: Repo;

  model() {
    return this.repo.findAll();
  }

  @action reloadModel() {
    this.refresh();
  }
}
