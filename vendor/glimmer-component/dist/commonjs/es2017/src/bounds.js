"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Contains the first and last DOM nodes in a component's rendered
 * template. These nodes can be used to traverse the section of DOM
 * that belongs to a particular component.
 *
 * Note that these nodes *can* change over the lifetime of a component
 * if the beginning or ending of the template is dynamic.
 */
class Bounds {
    constructor(_bounds) {
        this._bounds = _bounds;
    }
    get firstNode() {
        return this._bounds.firstNode();
    }
    get lastNode() {
        return this._bounds.lastNode();
    }
}
exports.default = Bounds;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL2NvbXBvbmVudC9zcmMvYm91bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFVYyxNQUFPLE1BQVAsQ0FBYTtBQUN6QixnQkFBb0IsT0FBcEIsRUFBcUM7QUFBakIsYUFBQSxPQUFBLEdBQUEsT0FBQTtBQUNuQjtBQUVELFFBQUksU0FBSixHQUFhO0FBQ1gsZUFBTyxLQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQVA7QUFDRDtBQUVELFFBQUksUUFBSixHQUFZO0FBQ1YsZUFBTyxLQUFLLE9BQUwsQ0FBYSxRQUFiLEVBQVA7QUFDRDtBQVZ3QjtrQkFBTixNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm91bmRzIGFzIFZNQm91bmRzIH0gZnJvbSAnQGdsaW1tZXIvaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIGZpcnN0IGFuZCBsYXN0IERPTSBub2RlcyBpbiBhIGNvbXBvbmVudCdzIHJlbmRlcmVkXG4gKiB0ZW1wbGF0ZS4gVGhlc2Ugbm9kZXMgY2FuIGJlIHVzZWQgdG8gdHJhdmVyc2UgdGhlIHNlY3Rpb24gb2YgRE9NXG4gKiB0aGF0IGJlbG9uZ3MgdG8gYSBwYXJ0aWN1bGFyIGNvbXBvbmVudC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlc2Ugbm9kZXMgKmNhbiogY2hhbmdlIG92ZXIgdGhlIGxpZmV0aW1lIG9mIGEgY29tcG9uZW50XG4gKiBpZiB0aGUgYmVnaW5uaW5nIG9yIGVuZGluZyBvZiB0aGUgdGVtcGxhdGUgaXMgZHluYW1pYy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYm91bmRzOiBWTUJvdW5kcykge1xuICB9XG5cbiAgZ2V0IGZpcnN0Tm9kZSgpOiBOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fYm91bmRzLmZpcnN0Tm9kZSgpIGFzIE5vZGU7XG4gIH1cblxuICBnZXQgbGFzdE5vZGUoKTogTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvdW5kcy5sYXN0Tm9kZSgpIGFzIE5vZGU7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9