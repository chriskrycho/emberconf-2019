var _a, _b;
import { DEBUG } from '@glimmer/env';
import { setOwner } from './owner';
const DESTROYING = Symbol('destroying');
const DESTROYED = Symbol('destroyed');
let MAGIC_PROP;
if (DEBUG) {
    MAGIC_PROP = Symbol('magic-prop');
}
export { DESTROYING, DESTROYED, MAGIC_PROP };
/**
 * The `Component` class defines an encapsulated UI element that is rendered to
 * the DOM. A component is made up of a template and, optionally, this component
 * object.
 *
 * ## Defining a Component
 *
 * To define a component, subclass `Component` and add your own properties,
 * methods and lifecycle hooks:
 *
 * ```ts
 * import Component from '@glimmer/component';
 *
 * export default class extends Component {
 * }
 * ```
 *
 * ## Lifecycle Hooks
 *
 * Lifecycle hooks allow you to respond to changes to a component, such as when
 * it gets created, rendered, updated or destroyed. To add a lifecycle hook to a
 * component, implement the hook as a method on your component subclass.
 *
 * For example, to be notified when Glimmer has rendered your component so you
 * can attach a legacy jQuery plugin, implement the `didInsertElement()` method:
 *
 * ```ts
 * import Component from '@glimmer/component';
 *
 * export default class extends Component {
 *   didInsertElement() {
 *     $(this.element).pickadate();
 *   }
 * }
 * ```
 *
 * ## Data for Templates
 *
 * `Component`s have two different kinds of data, or state, that can be
 * displayed in templates:
 *
 * 1. Arguments
 * 2. Properties
 *
 * Arguments are data that is passed in to a component from its parent
 * component. For example, if I have a `UserGreeting` component, I can pass it
 * a name and greeting to use:
 *
 * ```hbs
 * <UserGreeting @name="Ricardo" @greeting="Olá" />
 * ```
 *
 * Inside my `UserGreeting` template, I can access the `@name` and `@greeting`
 * arguments that I've been given:
 *
 * ```hbs
 * {{@greeting}}, {{@name}}!
 * ```
 *
 * Arguments are also available inside my component:
 *
 * ```ts
 * console.log(this.args.greeting); // prints "Olá"
 * ```
 *
 * Properties, on the other hand, are internal to the component and declared in
 * the class. You can use properties to store data that you want to show in the
 * template, or pass to another component as an argument.
 *
 * ```ts
 * import Component from '@glimmer/component';
 *
 * export default class extends Component {
 *   user = {
 *     name: 'Robbie'
 *   }
 * }
 * ```
 *
 * In the above example, we've defined a component with a `user` property that
 * contains an object with its own `name` property.
 *
 * We can render that property in our template:
 *
 * ```hbs
 * Hello, {{user.name}}!
 * ```
 *
 * We can also take that property and pass it as an argument to the
 * `UserGreeting` component we defined above:
 *
 * ```hbs
 * <UserGreeting @greeting="Hello" @name={{user.name}} />
 * ```
 *
 * ## Arguments vs. Properties
 *
 * Remember, arguments are data that was given to your component by its parent
 * component, and properties are data your component has defined for itself.
 *
 * You can tell the difference between arguments and properties in templates
 * because arguments always start with an `@` sign (think "A is for arguments"):
 *
 * ```hbs
 * {{@firstName}}
 * ```
 *
 * We know that `@firstName` came from the parent component, not the current
 * component, because it starts with `@` and is therefore an argument.
 *
 * On the other hand, if we see:
 *
 * ```hbs
 * {{name}}
 * ```
 *
 * We know that `name` is a property on the component. If we want to know where
 * the data is coming from, we can go look at our component class to find out.
 *
 * Inside the component itself, arguments always show up inside the component's
 * `args` property. For example, if `{{@firstName}}` is `Tom` in the template,
 * inside the component `this.args.firstName` would also be `Tom`.
 */
export default class GlimmerComponent {
    /**
     * Constructs a new component and assigns itself the passed properties. You
     * should not construct new components yourself. Instead, Glimmer will
     * instantiate new components automatically as it renders.
     *
     * @param owner
     * @param args
     */
    constructor(owner, args) {
        this[_a] = false;
        this[_b] = false;
        if (DEBUG &&
            !(owner !== null && typeof owner === 'object' && args[MAGIC_PROP] === true)) {
            throw new Error(`You must pass both the owner and args to super() in your component: ${this.constructor.name}. You can pass them directly, or use ...arguments to pass all arguments through.`);
        }
        this.args = args;
        setOwner(this, owner);
    }
    get isDestroying() {
        return this[DESTROYING];
    }
    get isDestroyed() {
        return this[DESTROYED];
    }
    /**
     * Called before the component has been removed from the DOM.
     */
    willDestroy() { }
}
_a = DESTROYING, _b = DESTROYED;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvQGdsaW1tZXIvY29tcG9uZW50L2FkZG9uLy1wcml2YXRlL2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRW5DLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEMsSUFBSSxVQUFrQixDQUFDO0FBRXZCLElBQUksS0FBSyxFQUFFO0lBQ1QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztDQUNuQztBQUVELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBIRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWdCO0lBQ25DOzs7Ozs7O09BT0c7SUFDSCxZQUFZLEtBQWMsRUFBRSxJQUFPO1FBMENuQyxRQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFFBQVcsR0FBRyxLQUFLLENBQUM7UUExQ2xCLElBQ0UsS0FBSztZQUNMLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSyxJQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQ3BGO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYix1RUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLGtGQUFrRixDQUNuRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixRQUFRLENBQUMsSUFBSSxFQUFFLEtBQVksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUErQkQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsS0FBSSxDQUFDO0NBQ2pCO0tBZkUsVUFBVSxPQUNWLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBERUJVRyB9IGZyb20gJ0BnbGltbWVyL2Vudic7XG5pbXBvcnQgeyBzZXRPd25lciB9IGZyb20gJy4vb3duZXInO1xuXG5jb25zdCBERVNUUk9ZSU5HID0gU3ltYm9sKCdkZXN0cm95aW5nJyk7XG5jb25zdCBERVNUUk9ZRUQgPSBTeW1ib2woJ2Rlc3Ryb3llZCcpO1xuXG5sZXQgTUFHSUNfUFJPUDogc3ltYm9sO1xuXG5pZiAoREVCVUcpIHtcbiAgTUFHSUNfUFJPUCA9IFN5bWJvbCgnbWFnaWMtcHJvcCcpO1xufVxuXG5leHBvcnQgeyBERVNUUk9ZSU5HLCBERVNUUk9ZRUQsIE1BR0lDX1BST1AgfTtcblxuLyoqXG4gKiBUaGUgYENvbXBvbmVudGAgY2xhc3MgZGVmaW5lcyBhbiBlbmNhcHN1bGF0ZWQgVUkgZWxlbWVudCB0aGF0IGlzIHJlbmRlcmVkIHRvXG4gKiB0aGUgRE9NLiBBIGNvbXBvbmVudCBpcyBtYWRlIHVwIG9mIGEgdGVtcGxhdGUgYW5kLCBvcHRpb25hbGx5LCB0aGlzIGNvbXBvbmVudFxuICogb2JqZWN0LlxuICpcbiAqICMjIERlZmluaW5nIGEgQ29tcG9uZW50XG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgQ29tcG9uZW50YCBhbmQgYWRkIHlvdXIgb3duIHByb3BlcnRpZXMsXG4gKiBtZXRob2RzIGFuZCBsaWZlY3ljbGUgaG9va3M6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCBDb21wb25lbnQgZnJvbSAnQGdsaW1tZXIvY29tcG9uZW50JztcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiAjIyBMaWZlY3ljbGUgSG9va3NcbiAqXG4gKiBMaWZlY3ljbGUgaG9va3MgYWxsb3cgeW91IHRvIHJlc3BvbmQgdG8gY2hhbmdlcyB0byBhIGNvbXBvbmVudCwgc3VjaCBhcyB3aGVuXG4gKiBpdCBnZXRzIGNyZWF0ZWQsIHJlbmRlcmVkLCB1cGRhdGVkIG9yIGRlc3Ryb3llZC4gVG8gYWRkIGEgbGlmZWN5Y2xlIGhvb2sgdG8gYVxuICogY29tcG9uZW50LCBpbXBsZW1lbnQgdGhlIGhvb2sgYXMgYSBtZXRob2Qgb24geW91ciBjb21wb25lbnQgc3ViY2xhc3MuXG4gKlxuICogRm9yIGV4YW1wbGUsIHRvIGJlIG5vdGlmaWVkIHdoZW4gR2xpbW1lciBoYXMgcmVuZGVyZWQgeW91ciBjb21wb25lbnQgc28geW91XG4gKiBjYW4gYXR0YWNoIGEgbGVnYWN5IGpRdWVyeSBwbHVnaW4sIGltcGxlbWVudCB0aGUgYGRpZEluc2VydEVsZW1lbnQoKWAgbWV0aG9kOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgQ29tcG9uZW50IGZyb20gJ0BnbGltbWVyL2NvbXBvbmVudCc7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICogICBkaWRJbnNlcnRFbGVtZW50KCkge1xuICogICAgICQodGhpcy5lbGVtZW50KS5waWNrYWRhdGUoKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogIyMgRGF0YSBmb3IgVGVtcGxhdGVzXG4gKlxuICogYENvbXBvbmVudGBzIGhhdmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiBkYXRhLCBvciBzdGF0ZSwgdGhhdCBjYW4gYmVcbiAqIGRpc3BsYXllZCBpbiB0ZW1wbGF0ZXM6XG4gKlxuICogMS4gQXJndW1lbnRzXG4gKiAyLiBQcm9wZXJ0aWVzXG4gKlxuICogQXJndW1lbnRzIGFyZSBkYXRhIHRoYXQgaXMgcGFzc2VkIGluIHRvIGEgY29tcG9uZW50IGZyb20gaXRzIHBhcmVudFxuICogY29tcG9uZW50LiBGb3IgZXhhbXBsZSwgaWYgSSBoYXZlIGEgYFVzZXJHcmVldGluZ2AgY29tcG9uZW50LCBJIGNhbiBwYXNzIGl0XG4gKiBhIG5hbWUgYW5kIGdyZWV0aW5nIHRvIHVzZTpcbiAqXG4gKiBgYGBoYnNcbiAqIDxVc2VyR3JlZXRpbmcgQG5hbWU9XCJSaWNhcmRvXCIgQGdyZWV0aW5nPVwiT2zDoVwiIC8+XG4gKiBgYGBcbiAqXG4gKiBJbnNpZGUgbXkgYFVzZXJHcmVldGluZ2AgdGVtcGxhdGUsIEkgY2FuIGFjY2VzcyB0aGUgYEBuYW1lYCBhbmQgYEBncmVldGluZ2BcbiAqIGFyZ3VtZW50cyB0aGF0IEkndmUgYmVlbiBnaXZlbjpcbiAqXG4gKiBgYGBoYnNcbiAqIHt7QGdyZWV0aW5nfX0sIHt7QG5hbWV9fSFcbiAqIGBgYFxuICpcbiAqIEFyZ3VtZW50cyBhcmUgYWxzbyBhdmFpbGFibGUgaW5zaWRlIG15IGNvbXBvbmVudDpcbiAqXG4gKiBgYGB0c1xuICogY29uc29sZS5sb2codGhpcy5hcmdzLmdyZWV0aW5nKTsgLy8gcHJpbnRzIFwiT2zDoVwiXG4gKiBgYGBcbiAqXG4gKiBQcm9wZXJ0aWVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGludGVybmFsIHRvIHRoZSBjb21wb25lbnQgYW5kIGRlY2xhcmVkIGluXG4gKiB0aGUgY2xhc3MuIFlvdSBjYW4gdXNlIHByb3BlcnRpZXMgdG8gc3RvcmUgZGF0YSB0aGF0IHlvdSB3YW50IHRvIHNob3cgaW4gdGhlXG4gKiB0ZW1wbGF0ZSwgb3IgcGFzcyB0byBhbm90aGVyIGNvbXBvbmVudCBhcyBhbiBhcmd1bWVudC5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IENvbXBvbmVudCBmcm9tICdAZ2xpbW1lci9jb21wb25lbnQnO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAqICAgdXNlciA9IHtcbiAqICAgICBuYW1lOiAnUm9iYmllJ1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBJbiB0aGUgYWJvdmUgZXhhbXBsZSwgd2UndmUgZGVmaW5lZCBhIGNvbXBvbmVudCB3aXRoIGEgYHVzZXJgIHByb3BlcnR5IHRoYXRcbiAqIGNvbnRhaW5zIGFuIG9iamVjdCB3aXRoIGl0cyBvd24gYG5hbWVgIHByb3BlcnR5LlxuICpcbiAqIFdlIGNhbiByZW5kZXIgdGhhdCBwcm9wZXJ0eSBpbiBvdXIgdGVtcGxhdGU6XG4gKlxuICogYGBgaGJzXG4gKiBIZWxsbywge3t1c2VyLm5hbWV9fSFcbiAqIGBgYFxuICpcbiAqIFdlIGNhbiBhbHNvIHRha2UgdGhhdCBwcm9wZXJ0eSBhbmQgcGFzcyBpdCBhcyBhbiBhcmd1bWVudCB0byB0aGVcbiAqIGBVc2VyR3JlZXRpbmdgIGNvbXBvbmVudCB3ZSBkZWZpbmVkIGFib3ZlOlxuICpcbiAqIGBgYGhic1xuICogPFVzZXJHcmVldGluZyBAZ3JlZXRpbmc9XCJIZWxsb1wiIEBuYW1lPXt7dXNlci5uYW1lfX0gLz5cbiAqIGBgYFxuICpcbiAqICMjIEFyZ3VtZW50cyB2cy4gUHJvcGVydGllc1xuICpcbiAqIFJlbWVtYmVyLCBhcmd1bWVudHMgYXJlIGRhdGEgdGhhdCB3YXMgZ2l2ZW4gdG8geW91ciBjb21wb25lbnQgYnkgaXRzIHBhcmVudFxuICogY29tcG9uZW50LCBhbmQgcHJvcGVydGllcyBhcmUgZGF0YSB5b3VyIGNvbXBvbmVudCBoYXMgZGVmaW5lZCBmb3IgaXRzZWxmLlxuICpcbiAqIFlvdSBjYW4gdGVsbCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGFyZ3VtZW50cyBhbmQgcHJvcGVydGllcyBpbiB0ZW1wbGF0ZXNcbiAqIGJlY2F1c2UgYXJndW1lbnRzIGFsd2F5cyBzdGFydCB3aXRoIGFuIGBAYCBzaWduICh0aGluayBcIkEgaXMgZm9yIGFyZ3VtZW50c1wiKTpcbiAqXG4gKiBgYGBoYnNcbiAqIHt7QGZpcnN0TmFtZX19XG4gKiBgYGBcbiAqXG4gKiBXZSBrbm93IHRoYXQgYEBmaXJzdE5hbWVgIGNhbWUgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudCwgbm90IHRoZSBjdXJyZW50XG4gKiBjb21wb25lbnQsIGJlY2F1c2UgaXQgc3RhcnRzIHdpdGggYEBgIGFuZCBpcyB0aGVyZWZvcmUgYW4gYXJndW1lbnQuXG4gKlxuICogT24gdGhlIG90aGVyIGhhbmQsIGlmIHdlIHNlZTpcbiAqXG4gKiBgYGBoYnNcbiAqIHt7bmFtZX19XG4gKiBgYGBcbiAqXG4gKiBXZSBrbm93IHRoYXQgYG5hbWVgIGlzIGEgcHJvcGVydHkgb24gdGhlIGNvbXBvbmVudC4gSWYgd2Ugd2FudCB0byBrbm93IHdoZXJlXG4gKiB0aGUgZGF0YSBpcyBjb21pbmcgZnJvbSwgd2UgY2FuIGdvIGxvb2sgYXQgb3VyIGNvbXBvbmVudCBjbGFzcyB0byBmaW5kIG91dC5cbiAqXG4gKiBJbnNpZGUgdGhlIGNvbXBvbmVudCBpdHNlbGYsIGFyZ3VtZW50cyBhbHdheXMgc2hvdyB1cCBpbnNpZGUgdGhlIGNvbXBvbmVudCdzXG4gKiBgYXJnc2AgcHJvcGVydHkuIEZvciBleGFtcGxlLCBpZiBge3tAZmlyc3ROYW1lfX1gIGlzIGBUb21gIGluIHRoZSB0ZW1wbGF0ZSxcbiAqIGluc2lkZSB0aGUgY29tcG9uZW50IGB0aGlzLmFyZ3MuZmlyc3ROYW1lYCB3b3VsZCBhbHNvIGJlIGBUb21gLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbGltbWVyQ29tcG9uZW50PFQgPSBvYmplY3Q+IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgY29tcG9uZW50IGFuZCBhc3NpZ25zIGl0c2VsZiB0aGUgcGFzc2VkIHByb3BlcnRpZXMuIFlvdVxuICAgKiBzaG91bGQgbm90IGNvbnN0cnVjdCBuZXcgY29tcG9uZW50cyB5b3Vyc2VsZi4gSW5zdGVhZCwgR2xpbW1lciB3aWxsXG4gICAqIGluc3RhbnRpYXRlIG5ldyBjb21wb25lbnRzIGF1dG9tYXRpY2FsbHkgYXMgaXQgcmVuZGVycy5cbiAgICpcbiAgICogQHBhcmFtIG93bmVyXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihvd25lcjogdW5rbm93biwgYXJnczogVCkge1xuICAgIGlmIChcbiAgICAgIERFQlVHICYmXG4gICAgICAhKG93bmVyICE9PSBudWxsICYmIHR5cGVvZiBvd25lciA9PT0gJ29iamVjdCcgJiYgKGFyZ3MgYXMgYW55KVtNQUdJQ19QUk9QXSA9PT0gdHJ1ZSlcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFlvdSBtdXN0IHBhc3MgYm90aCB0aGUgb3duZXIgYW5kIGFyZ3MgdG8gc3VwZXIoKSBpbiB5b3VyIGNvbXBvbmVudDogJHtcbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICAgICAgfS4gWW91IGNhbiBwYXNzIHRoZW0gZGlyZWN0bHksIG9yIHVzZSAuLi5hcmd1bWVudHMgdG8gcGFzcyBhbGwgYXJndW1lbnRzIHRocm91Z2guYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHNldE93bmVyKHRoaXMsIG93bmVyIGFzIGFueSk7XG4gIH1cblxuICAvKipcbiAgICogTmFtZWQgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGZyb20gaXRzIHBhcmVudCBjb21wb25lbnQuXG4gICAqIFRoZXkgY2FuIGJlIGFjY2Vzc2VkIGluIEphdmFTY3JpcHQgdmlhIGB0aGlzLmFyZ3MuYXJndW1lbnROYW1lYCBhbmQgaW4gdGhlIHRlbXBsYXRlIHZpYSBgQGFyZ3VtZW50TmFtZWAuXG4gICAqXG4gICAqIFNheSB5b3UgaGF2ZSB0aGUgZm9sbG93aW5nIGNvbXBvbmVudCwgd2hpY2ggd2lsbCBoYXZlIHR3byBgYXJnc2AsIGBmaXJzdE5hbWVgIGFuZCBgbGFzdE5hbWVgOlxuICAgKlxuICAgKiBgYGBoYnNcbiAgICogPG15LWNvbXBvbmVudCBAZmlyc3ROYW1lPVwiQXJ0aHVyXCIgQGxhc3ROYW1lPVwiRGVudFwiIC8+XG4gICAqIGBgYFxuICAgKlxuICAgKiBJZiB5b3UgbmVlZGVkIHRvIGNhbGN1bGF0ZSBgZnVsbE5hbWVgIGJ5IGNvbWJpbmluZyBib3RoIG9mIHRoZW0sIHlvdSB3b3VsZCBkbzpcbiAgICpcbiAgICogYGBgdHNcbiAgICogZGlkSW5zZXJ0RWxlbWVudCgpIHtcbiAgICogICBjb25zb2xlLmxvZyhgSGksIG15IGZ1bGwgbmFtZSBpcyAke3RoaXMuYXJncy5maXJzdE5hbWV9ICR7dGhpcy5hcmdzLmxhc3ROYW1lfWApO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBXaGlsZSBpbiB0aGUgdGVtcGxhdGUgeW91IGNvdWxkIGRvOlxuICAgKlxuICAgKiBgYGBoYnNcbiAgICogPHA+V2VsY29tZSwge3tAZmlyc3ROYW1lfX0ge3tAbGFzdE5hbWV9fSE8L3A+XG4gICAqIGBgYFxuICAgKi9cbiAgYXJnczogVDtcblxuICBbREVTVFJPWUlOR10gPSBmYWxzZTtcbiAgW0RFU1RST1lFRF0gPSBmYWxzZTtcblxuICBnZXQgaXNEZXN0cm95aW5nKCkge1xuICAgIHJldHVybiB0aGlzW0RFU1RST1lJTkddO1xuICB9XG5cbiAgZ2V0IGlzRGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzW0RFU1RST1lFRF07XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGJlZm9yZSB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgd2lsbERlc3Ryb3koKSB7fVxufVxuIl19