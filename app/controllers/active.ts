import Controller from "@ember/controller";
import { filterBy } from "@ember-decorators/object/computed";
import { Todo } from "todomvc/services/repo";

export default class ActiveController extends Controller {
  @filterBy("model", "completed", false) todos!: Todo[];
}
