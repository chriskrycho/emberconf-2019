'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TemplateOnlyComponentDebugBucket = exports.ComponentStateBucket = undefined;

var _reference = require('@glimmer/reference');

var _env2 = require('@glimmer/env');

var _bounds = require('./bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _references = require('./references');

var _component = require('../addon/-private/component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComponentStateBucket {
    constructor(definition, args, owner, env) {
        let { ComponentClass, name } = definition;
        this.args = args;
        if (ComponentClass) {
            if (ComponentClass.class !== undefined) {
                ComponentClass = ComponentClass.class;
            }
            this.component = new ComponentClass(owner, this.namedArgsSnapshot());
            this.component.debugName = name;
        }
    }
    get tag() {
        return this.args.tag;
    }
    namedArgsSnapshot() {
        let snapshot = this.args.named.value();
        if (_env2.DEBUG) {
            Object.defineProperty(snapshot, _component.MAGIC_PROP, {
                enumerable: false,
                value: true
            });
        }
        return Object.freeze(snapshot);
    }
}
exports.ComponentStateBucket = ComponentStateBucket;
const EMPTY_SELF = new _references.RootReference(null);
/**
 * For performance reasons, we want to avoid instantiating component buckets for
 * components that don't have an associated component class that we would need
 * instantiate and invoke lifecycle hooks on.
 *
 * In development mode, however, we need to track some state about the component
 * in order to produce more useful error messages. This
 * TemplateOnlyComponentDebugBucket is only created in development mode to hold
 * that state.
 */
class TemplateOnlyComponentDebugBucket {
    constructor(definition) {
        this.definition = definition;
    }
}
exports.TemplateOnlyComponentDebugBucket = TemplateOnlyComponentDebugBucket;
class ComponentManager {
    static create(options) {
        return new ComponentManager(options);
    }
    constructor(options) {
        this.env = options.env;
    }
    prepareArgs(state, args) {
        return null;
    }
    getCapabilities(state) {
        return state.capabilities;
    }
    getJitStaticLayout(state, resolver) {
        let template = resolver.resolve(state.handle);
        let locator = template.meta;
        return resolver.compilable(locator).asLayout();
    }
    getAotStaticLayout({ name, handle, symbolTable }, resolver) {
        if (handle && symbolTable) {
            return {
                handle,
                symbolTable
            };
        }
        throw new Error('unimplemented getAotStaticLayout');
    }
    create(_env, definition, args, _dynamicScope, _caller, _hasDefaultBlock) {
        // In development mode, if a component is template-only, save off state
        // needed for error messages. This will get stripped in production mode and
        // no bucket will be instantiated.
        if (_env2.DEBUG && !definition.ComponentClass) {
            return new TemplateOnlyComponentDebugBucket(definition);
        }
        // Only create a state bucket if the component is actually stateful. We can
        // skip this for template-only components, which are pure functions.
        if (definition.ComponentClass) {
            let owner = this.env.getOwner();
            return new ComponentStateBucket(definition, args.capture(), owner, this.env);
        }
    }
    getSelf(bucket) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return new _references.TemplateOnlyComponentDebugReference(bucket.definition.name);
        }
        if (bucket) {
            return new _references.RootReference(bucket.component);
        }
        return EMPTY_SELF;
    }
    didCreateElement(bucket, element) {}
    didRenderLayout(bucket, bounds) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return;
        }
        if (!bucket) {
            return;
        }
        bucket.component.bounds = new _bounds2.default(bounds);
    }
    didCreate(bucket) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return;
        }
        if (!bucket) {
            return;
        }
        bucket.component.didInsertElement();
    }
    getTag(bucket) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return _reference.CONSTANT_TAG;
        }
        if (!bucket) {
            return _reference.CONSTANT_TAG;
        }
        return bucket.tag;
    }
    update(bucket, scope) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return;
        }
        if (!bucket) {
            return;
        }
        bucket.component.args = bucket.namedArgsSnapshot();
    }
    didUpdateLayout() {}
    didUpdate() {}
    getDestructor(bucket) {
        if (_env2.DEBUG && bucket instanceof TemplateOnlyComponentDebugBucket) {
            return NOOP_DESTROYABLE;
        }
        if (!bucket) {
            return NOOP_DESTROYABLE;
        }
        return {
            destroy() {
                bucket.component[_component.DESTROYING] = true;
                bucket.component.willDestroy();
                bucket.component[_component.DESTROYED] = true;
            }
        };
    }
}
exports.default = ComponentManager;
const NOOP_DESTROYABLE = { destroy() {} };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL2NvbXBvbmVudC9zcmMvY29tcG9uZW50LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBcUJBOztBQUlBOzs7O0FBQ0E7O0FBS0E7Ozs7QUFNTSxNQUFPLG9CQUFQLENBQTJCO0FBSy9CLGdCQUNFLFVBREYsRUFFRSxJQUZGLEVBR0UsS0FIRixFQUlFLEdBSkYsRUFJMkI7QUFFekIsWUFBSSxFQUFFLGNBQUYsRUFBa0IsSUFBbEIsS0FBMkIsVUFBL0I7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBRUEsWUFBSSxjQUFKLEVBQW9CO0FBQ2xCLGdCQUFJLGVBQWUsS0FBZixLQUF5QixTQUE3QixFQUF3QztBQUN0QyxpQ0FBaUIsZUFBZSxLQUFoQztBQUNEO0FBRUQsaUJBQUssU0FBTCxHQUFpQixJQUFJLGNBQUosQ0FBbUIsS0FBbkIsRUFBMEIsS0FBSyxpQkFBTCxFQUExQixDQUFqQjtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLElBQTNCO0FBQ0Q7QUFDRjtBQUVELFFBQUksR0FBSixHQUFPO0FBQ0wsZUFBTyxLQUFLLElBQUwsQ0FBVSxHQUFqQjtBQUNEO0FBRUQsd0JBQWlCO0FBQ2YsWUFBSSxXQUFXLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsS0FBaEIsRUFBZjtBQUVBLFlBQUksV0FBSixFQUFXO0FBQ1QsbUJBQU8sY0FBUCxDQUFzQixRQUF0QixFQUFnQyxxQkFBaEMsRUFBNEM7QUFDMUMsNEJBQVksS0FEOEI7QUFFMUMsdUJBQU87QUFGbUMsYUFBNUM7QUFJRDtBQUVELGVBQU8sT0FBTyxNQUFQLENBQWMsUUFBZCxDQUFQO0FBQ0Q7QUF2QzhCO1FBQXBCLG9CLEdBQUEsb0I7QUEwQ2IsTUFBTSxhQUFhLElBQUkseUJBQUosQ0FBa0IsSUFBbEIsQ0FBbkI7QUFFQTs7Ozs7Ozs7OztBQVVNLE1BQU8sZ0NBQVAsQ0FBdUM7QUFDM0MsZ0JBQW1C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RUFBaUU7QUFDL0Q7QUFDRDtBQUNELFlBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWDtBQUNEO0FBRUQsZUFBTyxTQUFQLENBQWlCLElBQWpCLEdBQXdCLE9BQU8saUJBQVAsRUFBeEI7QUFDRDtBQUVELHNCQUFlLENBQUs7QUFFcEIsZ0JBQVMsQ0FBSztBQUVkLGtCQUFjLE1BQWQsRUFBMEM7QUFDeEMsWUFBSSxlQUFTLGtCQUFrQixnQ0FBL0IsRUFBaUU7QUFDL0QsbUJBQU8sZ0JBQVA7QUFDRDtBQUNELFlBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWCxtQkFBTyxnQkFBUDtBQUNEO0FBRUQsZUFBTztBQUNMLHNCQUFPO0FBQ0wsdUJBQU8sU0FBUCxDQUFpQixxQkFBakIsSUFBK0IsSUFBL0I7QUFDQSx1QkFBTyxTQUFQLENBQWlCLFdBQWpCO0FBQ0EsdUJBQU8sU0FBUCxDQUFpQixvQkFBakIsSUFBOEIsSUFBOUI7QUFDRDtBQUxJLFNBQVA7QUFPRDtBQWxKa0M7a0JBQWhCLGdCO0FBcUpyQixNQUFNLG1CQUFtQixFQUFFLFVBQU8sQ0FBSyxDQUFkLEVBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3duZXIgfSBmcm9tICdAZ2xpbW1lci9kaSc7XG5pbXBvcnQgeyBUYWcgfSBmcm9tICdAZ2xpbW1lci9yZWZlcmVuY2UnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50TWFuYWdlciBhcyBWTUNvbXBvbmVudE1hbmFnZXIsXG4gIFJ1bnRpbWVSZXNvbHZlcixcbiAgQ29tcG9uZW50Q2FwYWJpbGl0aWVzLFxuICBDYXB0dXJlZEFyZ3VtZW50cyxcbiAgRGljdCxcbiAgT3B0aW9uLFxuICBJbnZvY2F0aW9uLFxuICBFbnZpcm9ubWVudCxcbiAgVk1Bcmd1bWVudHMsXG4gIFdpdGhBb3RTdGF0aWNMYXlvdXQsXG4gIER5bmFtaWNTY29wZSxcbiAgRGVzdHJveWFibGUsXG4gIEppdFJ1bnRpbWVSZXNvbHZlcixcbiAgQW90UnVudGltZVJlc29sdmVyLFxuICBDb21waWxhYmxlUHJvZ3JhbSxcbiAgQm91bmRzIGFzIFZNQm91bmRzLFxufSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFZlcnNpb25lZFBhdGhSZWZlcmVuY2UsIFBhdGhSZWZlcmVuY2UsIENPTlNUQU5UX1RBRyB9IGZyb20gJ0BnbGltbWVyL3JlZmVyZW5jZSc7XG5pbXBvcnQgeyBERUJVRyB9IGZyb20gJ0BnbGltbWVyL2Vudic7XG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVmaW5pdGlvblN0YXRlIH0gZnJvbSAnLi9jb21wb25lbnQtZGVmaW5pdGlvbic7XG5pbXBvcnQgQm91bmRzIGZyb20gJy4vYm91bmRzJztcbmltcG9ydCB7IFJvb3RSZWZlcmVuY2UsIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnUmVmZXJlbmNlIH0gZnJvbSAnLi9yZWZlcmVuY2VzJztcbmltcG9ydCBFeHRlbmRlZFRlbXBsYXRlTWV0YSBmcm9tICcuL3RlbXBsYXRlLW1ldGEnO1xuaW1wb3J0IHsgU2VyaWFsaXplZFRlbXBsYXRlV2l0aExhenlCbG9jayB9IGZyb20gJ0BnbGltbWVyL2FwcGxpY2F0aW9uL3NyYy9sb2FkZXJzL3J1bnRpbWUtY29tcGlsZXIvcmVzb2x2ZXInO1xuaW1wb3J0IHsgU3BlY2lmaWVyIH0gZnJvbSAnQGdsaW1tZXIvYXBwbGljYXRpb24vc3JjL2xvYWRlcnMvcnVudGltZS1jb21waWxlci9sb2FkZXInO1xuXG5pbXBvcnQgeyBNQUdJQ19QUk9QLCBERVNUUk9ZSU5HLCBERVNUUk9ZRUQgfSBmcm9tICcuLi9hZGRvbi8tcHJpdmF0ZS9jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnN0cnVjdG9yT3B0aW9ucyB7XG4gIGVudjogRW52aXJvbm1lbnRXaXRoT3duZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRTdGF0ZUJ1Y2tldCB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudDtcbiAgcHJpdmF0ZSBhcmdzOiBDYXB0dXJlZEFyZ3VtZW50cztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkZWZpbml0aW9uOiBEZWZpbml0aW9uU3RhdGUsXG4gICAgYXJnczogQ2FwdHVyZWRBcmd1bWVudHMsXG4gICAgb3duZXI6IE93bmVyLFxuICAgIGVudjogRW52aXJvbm1lbnRXaXRoT3duZXJcbiAgKSB7XG4gICAgbGV0IHsgQ29tcG9uZW50Q2xhc3MsIG5hbWUgfSA9IGRlZmluaXRpb247XG4gICAgdGhpcy5hcmdzID0gYXJncztcblxuICAgIGlmIChDb21wb25lbnRDbGFzcykge1xuICAgICAgaWYgKENvbXBvbmVudENsYXNzLmNsYXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgQ29tcG9uZW50Q2xhc3MgPSBDb21wb25lbnRDbGFzcy5jbGFzcztcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb21wb25lbnQgPSBuZXcgQ29tcG9uZW50Q2xhc3Mob3duZXIsIHRoaXMubmFtZWRBcmdzU25hcHNob3QoKSk7XG4gICAgICB0aGlzLmNvbXBvbmVudC5kZWJ1Z05hbWUgPSBuYW1lO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0YWcoKTogVGFnIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzLnRhZztcbiAgfVxuXG4gIG5hbWVkQXJnc1NuYXBzaG90KCk6IFJlYWRvbmx5PERpY3Q8dW5rbm93bj4+IHtcbiAgICBsZXQgc25hcHNob3QgPSB0aGlzLmFyZ3MubmFtZWQudmFsdWUoKTtcblxuICAgIGlmIChERUJVRykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNuYXBzaG90LCBNQUdJQ19QUk9QLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNuYXBzaG90KTtcbiAgfVxufVxuXG5jb25zdCBFTVBUWV9TRUxGID0gbmV3IFJvb3RSZWZlcmVuY2UobnVsbCk7XG5cbi8qKlxuICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIHdhbnQgdG8gYXZvaWQgaW5zdGFudGlhdGluZyBjb21wb25lbnQgYnVja2V0cyBmb3JcbiAqIGNvbXBvbmVudHMgdGhhdCBkb24ndCBoYXZlIGFuIGFzc29jaWF0ZWQgY29tcG9uZW50IGNsYXNzIHRoYXQgd2Ugd291bGQgbmVlZFxuICogaW5zdGFudGlhdGUgYW5kIGludm9rZSBsaWZlY3ljbGUgaG9va3Mgb24uXG4gKlxuICogSW4gZGV2ZWxvcG1lbnQgbW9kZSwgaG93ZXZlciwgd2UgbmVlZCB0byB0cmFjayBzb21lIHN0YXRlIGFib3V0IHRoZSBjb21wb25lbnRcbiAqIGluIG9yZGVyIHRvIHByb2R1Y2UgbW9yZSB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuIFRoaXNcbiAqIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnQnVja2V0IGlzIG9ubHkgY3JlYXRlZCBpbiBkZXZlbG9wbWVudCBtb2RlIHRvIGhvbGRcbiAqIHRoYXQgc3RhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU9ubHlDb21wb25lbnREZWJ1Z0J1Y2tldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWZpbml0aW9uOiBEZWZpbml0aW9uU3RhdGUpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsYWJsZVJ1bnRpbWVSZXNvbHZlciBleHRlbmRzIFJ1bnRpbWVSZXNvbHZlcjxFeHRlbmRlZFRlbXBsYXRlTWV0YT4ge1xuICBjb21waWxlVGVtcGxhdGUobmFtZTogc3RyaW5nLCBsYXlvdXQ6IE9wdGlvbjxudW1iZXI+KTogSW52b2NhdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnZpcm9ubWVudFdpdGhPd25lciBleHRlbmRzIEVudmlyb25tZW50IHtcbiAgZ2V0T3duZXIoKTogT3duZXI7XG4gIHNldE93bmVyKG9iajogT2JqZWN0LCBvd25lcjogT3duZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRNYW5hZ2VyXG4gIGltcGxlbWVudHNcbiAgICBWTUNvbXBvbmVudE1hbmFnZXI8XG4gICAgICBDb21wb25lbnRTdGF0ZUJ1Y2tldCB8IFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnQnVja2V0IHwgdm9pZCxcbiAgICAgIERlZmluaXRpb25TdGF0ZVxuICAgID4sXG4gICAgV2l0aEFvdFN0YXRpY0xheW91dDxcbiAgICAgIENvbXBvbmVudFN0YXRlQnVja2V0IHwgVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdCdWNrZXQgfCB2b2lkLFxuICAgICAgRGVmaW5pdGlvblN0YXRlLFxuICAgICAgQW90UnVudGltZVJlc29sdmVyXG4gICAgPiB7XG4gIHByaXZhdGUgZW52OiBFbnZpcm9ubWVudFdpdGhPd25lcjtcblxuICBzdGF0aWMgY3JlYXRlKG9wdGlvbnM6IENvbnN0cnVjdG9yT3B0aW9ucyk6IENvbXBvbmVudE1hbmFnZXIge1xuICAgIHJldHVybiBuZXcgQ29tcG9uZW50TWFuYWdlcihvcHRpb25zKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbnN0cnVjdG9yT3B0aW9ucykge1xuICAgIHRoaXMuZW52ID0gb3B0aW9ucy5lbnY7XG4gIH1cblxuICBwcmVwYXJlQXJncyhzdGF0ZTogRGVmaW5pdGlvblN0YXRlLCBhcmdzOiBWTUFyZ3VtZW50cyk6IG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0Q2FwYWJpbGl0aWVzKHN0YXRlOiBEZWZpbml0aW9uU3RhdGUpOiBDb21wb25lbnRDYXBhYmlsaXRpZXMge1xuICAgIHJldHVybiBzdGF0ZS5jYXBhYmlsaXRpZXM7XG4gIH1cblxuICBnZXRKaXRTdGF0aWNMYXlvdXQoc3RhdGU6IERlZmluaXRpb25TdGF0ZSwgcmVzb2x2ZXI6IEppdFJ1bnRpbWVSZXNvbHZlcik6IENvbXBpbGFibGVQcm9ncmFtIHtcbiAgICBsZXQgdGVtcGxhdGUgPSAocmVzb2x2ZXIucmVzb2x2ZShzdGF0ZS5oYW5kbGUpIGFzIHVua25vd24pIGFzIFNlcmlhbGl6ZWRUZW1wbGF0ZVdpdGhMYXp5QmxvY2s8XG4gICAgICBTcGVjaWZpZXJcbiAgICA+O1xuICAgIGxldCBsb2NhdG9yID0gdGVtcGxhdGUubWV0YTtcbiAgICByZXR1cm4gcmVzb2x2ZXIuY29tcGlsYWJsZShsb2NhdG9yKS5hc0xheW91dCgpO1xuICB9XG5cbiAgZ2V0QW90U3RhdGljTGF5b3V0KFxuICAgIHsgbmFtZSwgaGFuZGxlLCBzeW1ib2xUYWJsZSB9OiBEZWZpbml0aW9uU3RhdGUsXG4gICAgcmVzb2x2ZXI6IEFvdFJ1bnRpbWVSZXNvbHZlclxuICApOiBJbnZvY2F0aW9uIHtcbiAgICBpZiAoaGFuZGxlICYmIHN5bWJvbFRhYmxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoYW5kbGUsXG4gICAgICAgIHN5bWJvbFRhYmxlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQgZ2V0QW90U3RhdGljTGF5b3V0Jyk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgX2VudjogRW52aXJvbm1lbnQsXG4gICAgZGVmaW5pdGlvbjogRGVmaW5pdGlvblN0YXRlLFxuICAgIGFyZ3M6IFZNQXJndW1lbnRzLFxuICAgIF9keW5hbWljU2NvcGU6IER5bmFtaWNTY29wZSxcbiAgICBfY2FsbGVyOiBWZXJzaW9uZWRQYXRoUmVmZXJlbmNlPHVua25vd24+LFxuICAgIF9oYXNEZWZhdWx0QmxvY2s6IGJvb2xlYW5cbiAgKTogVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdCdWNrZXQgfCBDb21wb25lbnRTdGF0ZUJ1Y2tldCB8IHZvaWQge1xuICAgIC8vIEluIGRldmVsb3BtZW50IG1vZGUsIGlmIGEgY29tcG9uZW50IGlzIHRlbXBsYXRlLW9ubHksIHNhdmUgb2ZmIHN0YXRlXG4gICAgLy8gbmVlZGVkIGZvciBlcnJvciBtZXNzYWdlcy4gVGhpcyB3aWxsIGdldCBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uIG1vZGUgYW5kXG4gICAgLy8gbm8gYnVja2V0IHdpbGwgYmUgaW5zdGFudGlhdGVkLlxuICAgIGlmIChERUJVRyAmJiAhZGVmaW5pdGlvbi5Db21wb25lbnRDbGFzcykge1xuICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU9ubHlDb21wb25lbnREZWJ1Z0J1Y2tldChkZWZpbml0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IGNyZWF0ZSBhIHN0YXRlIGJ1Y2tldCBpZiB0aGUgY29tcG9uZW50IGlzIGFjdHVhbGx5IHN0YXRlZnVsLiBXZSBjYW5cbiAgICAvLyBza2lwIHRoaXMgZm9yIHRlbXBsYXRlLW9ubHkgY29tcG9uZW50cywgd2hpY2ggYXJlIHB1cmUgZnVuY3Rpb25zLlxuICAgIGlmIChkZWZpbml0aW9uLkNvbXBvbmVudENsYXNzKSB7XG4gICAgICBsZXQgb3duZXIgPSB0aGlzLmVudi5nZXRPd25lcigpO1xuICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRTdGF0ZUJ1Y2tldChkZWZpbml0aW9uLCBhcmdzLmNhcHR1cmUoKSwgb3duZXIsIHRoaXMuZW52KTtcbiAgICB9XG4gIH1cblxuICBnZXRTZWxmKGJ1Y2tldDogQ29tcG9uZW50U3RhdGVCdWNrZXQpOiBQYXRoUmVmZXJlbmNlIHtcbiAgICBpZiAoREVCVUcgJiYgYnVja2V0IGluc3RhbmNlb2YgVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdCdWNrZXQpIHtcbiAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdSZWZlcmVuY2UoYnVja2V0LmRlZmluaXRpb24ubmFtZSk7XG4gICAgfVxuICAgIGlmIChidWNrZXQpIHtcbiAgICAgIHJldHVybiBuZXcgUm9vdFJlZmVyZW5jZShidWNrZXQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIEVNUFRZX1NFTEY7XG4gIH1cblxuICBkaWRDcmVhdGVFbGVtZW50KGJ1Y2tldDogQ29tcG9uZW50U3RhdGVCdWNrZXQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7fVxuXG4gIGRpZFJlbmRlckxheW91dChidWNrZXQ6IENvbXBvbmVudFN0YXRlQnVja2V0LCBib3VuZHM6IFZNQm91bmRzKSB7XG4gICAgaWYgKERFQlVHICYmIGJ1Y2tldCBpbnN0YW5jZW9mIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnQnVja2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYnVja2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGJ1Y2tldC5jb21wb25lbnQuYm91bmRzID0gbmV3IEJvdW5kcyhib3VuZHMpO1xuICB9XG5cbiAgZGlkQ3JlYXRlKGJ1Y2tldDogQ29tcG9uZW50U3RhdGVCdWNrZXQpIHtcbiAgICBpZiAoREVCVUcgJiYgYnVja2V0IGluc3RhbmNlb2YgVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdCdWNrZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFidWNrZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYnVja2V0LmNvbXBvbmVudC5kaWRJbnNlcnRFbGVtZW50KCk7XG4gIH1cblxuICBnZXRUYWcoYnVja2V0OiBDb21wb25lbnRTdGF0ZUJ1Y2tldCk6IFRhZyB7XG4gICAgaWYgKERFQlVHICYmIGJ1Y2tldCBpbnN0YW5jZW9mIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnQnVja2V0KSB7XG4gICAgICByZXR1cm4gQ09OU1RBTlRfVEFHO1xuICAgIH1cbiAgICBpZiAoIWJ1Y2tldCkge1xuICAgICAgcmV0dXJuIENPTlNUQU5UX1RBRztcbiAgICB9XG4gICAgcmV0dXJuIGJ1Y2tldC50YWc7XG4gIH1cblxuICB1cGRhdGUoYnVja2V0OiBDb21wb25lbnRTdGF0ZUJ1Y2tldCwgc2NvcGU6IER5bmFtaWNTY29wZSkge1xuICAgIGlmIChERUJVRyAmJiBidWNrZXQgaW5zdGFuY2VvZiBUZW1wbGF0ZU9ubHlDb21wb25lbnREZWJ1Z0J1Y2tldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJ1Y2tldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJ1Y2tldC5jb21wb25lbnQuYXJncyA9IGJ1Y2tldC5uYW1lZEFyZ3NTbmFwc2hvdCgpO1xuICB9XG5cbiAgZGlkVXBkYXRlTGF5b3V0KCkge31cblxuICBkaWRVcGRhdGUoKSB7fVxuXG4gIGdldERlc3RydWN0b3IoYnVja2V0OiBDb21wb25lbnRTdGF0ZUJ1Y2tldCk6IERlc3Ryb3lhYmxlIHtcbiAgICBpZiAoREVCVUcgJiYgYnVja2V0IGluc3RhbmNlb2YgVGVtcGxhdGVPbmx5Q29tcG9uZW50RGVidWdCdWNrZXQpIHtcbiAgICAgIHJldHVybiBOT09QX0RFU1RST1lBQkxFO1xuICAgIH1cbiAgICBpZiAoIWJ1Y2tldCkge1xuICAgICAgcmV0dXJuIE5PT1BfREVTVFJPWUFCTEU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGJ1Y2tldC5jb21wb25lbnRbREVTVFJPWUlOR10gPSB0cnVlO1xuICAgICAgICBidWNrZXQuY29tcG9uZW50LndpbGxEZXN0cm95KCk7XG4gICAgICAgIGJ1Y2tldC5jb21wb25lbnRbREVTVFJPWUVEXSA9IHRydWU7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuY29uc3QgTk9PUF9ERVNUUk9ZQUJMRSA9IHsgZGVzdHJveSgpIHt9IH07XG4iXSwic291cmNlUm9vdCI6IiJ9