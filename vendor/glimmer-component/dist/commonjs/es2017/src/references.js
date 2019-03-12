'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TemplateOnlyComponentDebugReference = exports.ConditionalReference = exports.UpdatableReference = exports.NestedPropertyReference = exports.RootPropertyReference = exports.PropertyReference = exports.RootReference = exports.CachedReference = exports.ComponentPathReference = undefined;

var _util = require('@glimmer/util');

var _reference = require('@glimmer/reference');

var _runtime = require('@glimmer/runtime');

var _tracking = require('@glimmer/tracking');

/**
 * The base PathReference.
 */
class ComponentPathReference {
    get(key) {
        return PropertyReference.create(this, key);
    }
}
exports.ComponentPathReference = ComponentPathReference;
class CachedReference extends ComponentPathReference {
    constructor() {
        super(...arguments);
        this._lastRevision = null;
        this._lastValue = null;
    }
    value() {
        let { tag, _lastRevision, _lastValue } = this;
        if (!_lastRevision || !tag.validate(_lastRevision)) {
            _lastValue = this._lastValue = this.compute();
            this._lastRevision = tag.value();
        }
        return _lastValue;
    }
}
exports.CachedReference = CachedReference;
class RootReference extends _reference.ConstReference {
    constructor() {
        super(...arguments);
        this.children = (0, _util.dict)();
    }
    get(propertyKey) {
        let ref = this.children[propertyKey];
        if (!ref) {
            ref = this.children[propertyKey] = new RootPropertyReference(this.inner, propertyKey);
        }
        return ref;
    }
}
exports.RootReference = RootReference;
class PropertyReference extends CachedReference {
    static create(parentReference, propertyKey) {
        if ((0, _reference.isConst)(parentReference)) {
            return new RootPropertyReference(parentReference.value(), propertyKey);
        } else {
            return new NestedPropertyReference(parentReference, propertyKey);
        }
    }
    get(key) {
        return new NestedPropertyReference(this, key);
    }
}
exports.PropertyReference = PropertyReference;
class RootPropertyReference extends PropertyReference {
    constructor(parentValue, propertyKey) {
        super();
        this._parentValue = parentValue;
        this._propertyKey = propertyKey;
        this.tag = (0, _tracking.tagForProperty)(parentValue, propertyKey);
    }
    compute() {
        return this._parentValue[this._propertyKey];
    }
}
exports.RootPropertyReference = RootPropertyReference;
class NestedPropertyReference extends PropertyReference {
    constructor(parentReference, propertyKey) {
        super();
        let parentReferenceTag = parentReference.tag;
        let parentObjectTag = _reference.UpdatableTag.create(_reference.CONSTANT_TAG);
        this._parentReference = parentReference;
        this._parentObjectTag = parentObjectTag;
        this._propertyKey = propertyKey;
        this.tag = (0, _reference.combine)([parentReferenceTag, parentObjectTag]);
    }
    compute() {
        let { _parentReference, _parentObjectTag, _propertyKey } = this;
        let parentValue = _parentReference.value();
        _parentObjectTag.inner.update((0, _tracking.tagForProperty)(parentValue, _propertyKey));
        if (typeof parentValue === 'string' && _propertyKey === 'length') {
            return parentValue.length;
        }
        if (typeof parentValue === 'object' && parentValue) {
            return parentValue[_propertyKey];
        } else {
            return undefined;
        }
    }
}
exports.NestedPropertyReference = NestedPropertyReference;
class UpdatableReference extends ComponentPathReference {
    constructor(value) {
        super();
        this.tag = _reference.DirtyableTag.create();
        this._value = value;
    }
    value() {
        return this._value;
    }
    update(value) {
        let { _value } = this;
        if (value !== _value) {
            this.tag.inner.dirty();
            this._value = value;
        }
    }
}
exports.UpdatableReference = UpdatableReference;
class ConditionalReference extends _runtime.ConditionalReference {
    static create(reference) {
        if ((0, _reference.isConst)(reference)) {
            let value = reference.value();
            return _runtime.PrimitiveReference.create(value);
        }
        return new _runtime.ConditionalReference(reference);
    }
}
exports.ConditionalReference = ConditionalReference;
class TemplateOnlyComponentDebugReference extends _reference.ConstReference {
    constructor(name) {
        super(undefined);
        this.name = name;
    }
    get(propertyKey) {
        throw new Error(`You tried to reference {{${propertyKey}}} from the ${this.name} template, which doesn't have an associated component class. Template-only components can only access args passed to them. Did you mean {{@${propertyKey}}}?`);
    }
}
exports.TemplateOnlyComponentDebugReference = TemplateOnlyComponentDebugReference;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL2NvbXBvbmVudC9zcmMvcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFXQTs7QUFJQTs7QUFFQTs7O0FBR00sTUFBZ0Isc0JBQWhCLENBQXNDO0FBSTFDLFFBQUksR0FBSixFQUFlO0FBQ2IsZUFBTyxrQkFBa0IsTUFBbEIsQ0FBeUIsSUFBekIsRUFBK0IsR0FBL0IsQ0FBUDtBQUNEO0FBTnlDO1FBQXRCLHNCLEdBQUEsc0I7QUFTaEIsTUFBZ0IsZUFBaEIsU0FBMkMsc0JBQTNDLENBQW9FO0FBQTFFLGtCQUFBOztBQUNVLGFBQUEsYUFBQSxHQUErQixJQUEvQjtBQUNBLGFBQUEsVUFBQSxHQUFrQixJQUFsQjtBQWNUO0FBVkMsWUFBSztBQUNILFlBQUksRUFBRSxHQUFGLEVBQU8sYUFBUCxFQUFzQixVQUF0QixLQUFxQyxJQUF6QztBQUVBLFlBQUksQ0FBQyxhQUFELElBQWtCLENBQUMsSUFBSSxRQUFKLENBQWEsYUFBYixDQUF2QixFQUFvRDtBQUNsRCx5QkFBYSxLQUFLLFVBQUwsR0FBa0IsS0FBSyxPQUFMLEVBQS9CO0FBQ0EsaUJBQUssYUFBTCxHQUFxQixJQUFJLEtBQUosRUFBckI7QUFDRDtBQUVELGVBQU8sVUFBUDtBQUNEO0FBZnVFO1FBQXBELGUsR0FBQSxlO0FBa0JoQixNQUFPLGFBQVAsU0FBNkIseUJBQTdCLENBQW1EO0FBQXpELGtCQUFBOztBQUNVLGFBQUEsUUFBQSxHQUFXLGlCQUFYO0FBV1Q7QUFUQyxRQUFJLFdBQUosRUFBdUI7QUFDckIsWUFBSSxNQUFNLEtBQUssUUFBTCxDQUFjLFdBQWQsQ0FBVjtBQUVBLFlBQUksQ0FBQyxHQUFMLEVBQVU7QUFDUixrQkFBTSxLQUFLLFFBQUwsQ0FBYyxXQUFkLElBQTZCLElBQUkscUJBQUosQ0FBMEIsS0FBSyxLQUEvQixFQUFzQyxXQUF0QyxDQUFuQztBQUNEO0FBRUQsZUFBTyxHQUFQ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LEtBQVYsRUFBWjtBQUNBLG1CQUFPLDRCQUFtQixNQUFuQixDQUEwQixLQUExQixDQUFQO0FBQ0Q7QUFFRCxlQUFPLElBQUksNkJBQUosQ0FBZ0MsU0FBaEMsQ0FBUDtBQUNEO0FBUmtFO1FBQXhELG9CLEdBQUEsb0I7QUFXUCxNQUFPLG1DQUFQLFNBQW1ELHlCQUFuRCxDQUF1RTtBQUMzRSxnQkFBc0IsSUFBdEIsRUFBa0M7QUFDaEMsY0FBTSxTQUFOO0FBRG9CLGFBQUEsSUFBQSxHQUFBLElBQUE7QUFFckI7QUFFRCxRQUFJLFdBQUosRUFBdUI7QUFDckIsY0FBTSxJQUFJLEtBQUosQ0FDSiw0QkFBNEIsV0FBVyxlQUNyQyxLQUFLLElBQ1AsOElBQThJLFdBQVcsS0FIckosQ0FBTjtBQUtEO0FBWDBFO1FBQWhFLG1DLEdBQUEsbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaWN0IH0gZnJvbSAnQGdsaW1tZXIvdXRpbCc7XG5pbXBvcnQge1xuICBQYXRoUmVmZXJlbmNlLFxuICBDT05TVEFOVF9UQUcsXG4gIENvbnN0UmVmZXJlbmNlLFxuICBEaXJ0eWFibGVUYWcsXG4gIFVwZGF0YWJsZVRhZyxcbiAgY29tYmluZSxcbiAgaXNDb25zdCxcbiAgVGFnLFxuICBUYWdXcmFwcGVyLFxufSBmcm9tICdAZ2xpbW1lci9yZWZlcmVuY2UnO1xuaW1wb3J0IHtcbiAgQ29uZGl0aW9uYWxSZWZlcmVuY2UgYXMgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlLFxuICBQcmltaXRpdmVSZWZlcmVuY2UsXG59IGZyb20gJ0BnbGltbWVyL3J1bnRpbWUnO1xuaW1wb3J0IHsgdGFnRm9yUHJvcGVydHkgfSBmcm9tICdAZ2xpbW1lci90cmFja2luZyc7XG5cbi8qKlxuICogVGhlIGJhc2UgUGF0aFJlZmVyZW5jZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudFBhdGhSZWZlcmVuY2U8VD4gaW1wbGVtZW50cyBQYXRoUmVmZXJlbmNlPFQ+IHtcbiAgYWJzdHJhY3QgdmFsdWUoKTogVDtcbiAgYWJzdHJhY3QgZ2V0IHRhZygpOiBUYWc7XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogUGF0aFJlZmVyZW5jZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvcGVydHlSZWZlcmVuY2UuY3JlYXRlKHRoaXMsIGtleSk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhY2hlZFJlZmVyZW5jZTxUPiBleHRlbmRzIENvbXBvbmVudFBhdGhSZWZlcmVuY2U8VD4ge1xuICBwcml2YXRlIF9sYXN0UmV2aXNpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9sYXN0VmFsdWU6IGFueSA9IG51bGw7XG5cbiAgYWJzdHJhY3QgY29tcHV0ZSgpOiBUO1xuXG4gIHZhbHVlKCkge1xuICAgIGxldCB7IHRhZywgX2xhc3RSZXZpc2lvbiwgX2xhc3RWYWx1ZSB9ID0gdGhpcztcblxuICAgIGlmICghX2xhc3RSZXZpc2lvbiB8fCAhdGFnLnZhbGlkYXRlKF9sYXN0UmV2aXNpb24pKSB7XG4gICAgICBfbGFzdFZhbHVlID0gdGhpcy5fbGFzdFZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICB0aGlzLl9sYXN0UmV2aXNpb24gPSB0YWcudmFsdWUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2xhc3RWYWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdFJlZmVyZW5jZSBleHRlbmRzIENvbnN0UmVmZXJlbmNlPG9iamVjdD4ge1xuICBwcml2YXRlIGNoaWxkcmVuID0gZGljdDxSb290UHJvcGVydHlSZWZlcmVuY2U+KCk7XG5cbiAgZ2V0KHByb3BlcnR5S2V5OiBzdHJpbmcpOiBSb290UHJvcGVydHlSZWZlcmVuY2Uge1xuICAgIGxldCByZWYgPSB0aGlzLmNoaWxkcmVuW3Byb3BlcnR5S2V5XTtcblxuICAgIGlmICghcmVmKSB7XG4gICAgICByZWYgPSB0aGlzLmNoaWxkcmVuW3Byb3BlcnR5S2V5XSA9IG5ldyBSb290UHJvcGVydHlSZWZlcmVuY2UodGhpcy5pbm5lciwgcHJvcGVydHlLZXkpO1xuICAgIH1cblxuICAgIHJldHVybiByZWY7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5UmVmZXJlbmNlIGV4dGVuZHMgQ2FjaGVkUmVmZXJlbmNlPGFueT4ge1xuICBzdGF0aWMgY3JlYXRlKHBhcmVudFJlZmVyZW5jZTogUGF0aFJlZmVyZW5jZTxhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgaWYgKGlzQ29uc3QocGFyZW50UmVmZXJlbmNlKSkge1xuICAgICAgcmV0dXJuIG5ldyBSb290UHJvcGVydHlSZWZlcmVuY2UocGFyZW50UmVmZXJlbmNlLnZhbHVlKCksIHByb3BlcnR5S2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBOZXN0ZWRQcm9wZXJ0eVJlZmVyZW5jZShwYXJlbnRSZWZlcmVuY2UsIHByb3BlcnR5S2V5KTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBQYXRoUmVmZXJlbmNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgTmVzdGVkUHJvcGVydHlSZWZlcmVuY2UodGhpcywga2V5KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdFByb3BlcnR5UmVmZXJlbmNlIGV4dGVuZHMgUHJvcGVydHlSZWZlcmVuY2Uge1xuICB0YWc6IFRhZztcbiAgcHJpdmF0ZSBfcGFyZW50VmFsdWU6IG9iamVjdDtcbiAgcHJpdmF0ZSBfcHJvcGVydHlLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJlbnRWYWx1ZTogb2JqZWN0LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3BhcmVudFZhbHVlID0gcGFyZW50VmFsdWU7XG4gICAgdGhpcy5fcHJvcGVydHlLZXkgPSBwcm9wZXJ0eUtleTtcbiAgICB0aGlzLnRhZyA9IHRhZ0ZvclByb3BlcnR5KHBhcmVudFZhbHVlLCBwcm9wZXJ0eUtleSk7XG4gIH1cblxuICBjb21wdXRlKCk6IGFueSB7XG4gICAgcmV0dXJuICh0aGlzLl9wYXJlbnRWYWx1ZSBhcyBhbnkpW3RoaXMuX3Byb3BlcnR5S2V5XTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTmVzdGVkUHJvcGVydHlSZWZlcmVuY2UgZXh0ZW5kcyBQcm9wZXJ0eVJlZmVyZW5jZSB7XG4gIHB1YmxpYyB0YWc6IFRhZztcbiAgcHJpdmF0ZSBfcGFyZW50UmVmZXJlbmNlOiBQYXRoUmVmZXJlbmNlPGFueT47XG4gIHByaXZhdGUgX3BhcmVudE9iamVjdFRhZzogVGFnV3JhcHBlcjxVcGRhdGFibGVUYWc+O1xuICBwcml2YXRlIF9wcm9wZXJ0eUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudFJlZmVyZW5jZTogUGF0aFJlZmVyZW5jZTxhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGxldCBwYXJlbnRSZWZlcmVuY2VUYWcgPSBwYXJlbnRSZWZlcmVuY2UudGFnO1xuICAgIGxldCBwYXJlbnRPYmplY3RUYWcgPSBVcGRhdGFibGVUYWcuY3JlYXRlKENPTlNUQU5UX1RBRyk7XG5cbiAgICB0aGlzLl9wYXJlbnRSZWZlcmVuY2UgPSBwYXJlbnRSZWZlcmVuY2U7XG4gICAgdGhpcy5fcGFyZW50T2JqZWN0VGFnID0gcGFyZW50T2JqZWN0VGFnO1xuICAgIHRoaXMuX3Byb3BlcnR5S2V5ID0gcHJvcGVydHlLZXk7XG5cbiAgICB0aGlzLnRhZyA9IGNvbWJpbmUoW3BhcmVudFJlZmVyZW5jZVRhZywgcGFyZW50T2JqZWN0VGFnXSk7XG4gIH1cblxuICBjb21wdXRlKCkge1xuICAgIGxldCB7IF9wYXJlbnRSZWZlcmVuY2UsIF9wYXJlbnRPYmplY3RUYWcsIF9wcm9wZXJ0eUtleSB9ID0gdGhpcztcblxuICAgIGxldCBwYXJlbnRWYWx1ZSA9IF9wYXJlbnRSZWZlcmVuY2UudmFsdWUoKTtcblxuICAgIF9wYXJlbnRPYmplY3RUYWcuaW5uZXIudXBkYXRlKHRhZ0ZvclByb3BlcnR5KHBhcmVudFZhbHVlLCBfcHJvcGVydHlLZXkpKTtcblxuICAgIGlmICh0eXBlb2YgcGFyZW50VmFsdWUgPT09ICdzdHJpbmcnICYmIF9wcm9wZXJ0eUtleSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXJlbnRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgcGFyZW50VmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWx1ZVtfcHJvcGVydHlLZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRhYmxlUmVmZXJlbmNlPFQ+IGV4dGVuZHMgQ29tcG9uZW50UGF0aFJlZmVyZW5jZTxUPiB7XG4gIHB1YmxpYyB0YWc6IFRhZ1dyYXBwZXI8RGlydHlhYmxlVGFnPjtcbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50YWcgPSBEaXJ0eWFibGVUYWcuY3JlYXRlKCk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZTogVCkge1xuICAgIGxldCB7IF92YWx1ZSB9ID0gdGhpcztcblxuICAgIGlmICh2YWx1ZSAhPT0gX3ZhbHVlKSB7XG4gICAgICB0aGlzLnRhZy5pbm5lci5kaXJ0eSgpO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsUmVmZXJlbmNlIGV4dGVuZHMgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlIHtcbiAgc3RhdGljIGNyZWF0ZShyZWZlcmVuY2U6IFBhdGhSZWZlcmVuY2U8YW55Pikge1xuICAgIGlmIChpc0NvbnN0KHJlZmVyZW5jZSkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHJlZmVyZW5jZS52YWx1ZSgpO1xuICAgICAgcmV0dXJuIFByaW1pdGl2ZVJlZmVyZW5jZS5jcmVhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgR2xpbW1lckNvbmRpdGlvbmFsUmVmZXJlbmNlKHJlZmVyZW5jZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlT25seUNvbXBvbmVudERlYnVnUmVmZXJlbmNlIGV4dGVuZHMgQ29uc3RSZWZlcmVuY2U8dm9pZD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGdldChwcm9wZXJ0eUtleTogc3RyaW5nKTogUGF0aFJlZmVyZW5jZTx1bmtub3duPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFlvdSB0cmllZCB0byByZWZlcmVuY2Uge3ske3Byb3BlcnR5S2V5fX19IGZyb20gdGhlICR7XG4gICAgICAgIHRoaXMubmFtZVxuICAgICAgfSB0ZW1wbGF0ZSwgd2hpY2ggZG9lc24ndCBoYXZlIGFuIGFzc29jaWF0ZWQgY29tcG9uZW50IGNsYXNzLiBUZW1wbGF0ZS1vbmx5IGNvbXBvbmVudHMgY2FuIG9ubHkgYWNjZXNzIGFyZ3MgcGFzc2VkIHRvIHRoZW0uIERpZCB5b3UgbWVhbiB7e0Ake3Byb3BlcnR5S2V5fX19P2BcbiAgICApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9