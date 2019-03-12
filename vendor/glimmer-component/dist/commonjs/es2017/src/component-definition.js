'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _capabilities = require('./capabilities');

class ComponentDefinitionImpl {
    constructor(name, manager, ComponentClass, handle) {
        this.name = name;
        this.manager = manager;
        this.ComponentClass = ComponentClass;
        this.handle = handle;
        this.state = {
            name,
            capabilities: _capabilities.CAPABILITIES,
            ComponentClass,
            handle
        };
    }
    toJSON() {
        return { GlimmerDebug: `<component-definition name="${this.name}">` };
    }
}
exports.default = ComponentDefinitionImpl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL2NvbXBvbmVudC9zcmMvY29tcG9uZW50LWRlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQmMsTUFBTyx1QkFBUCxDQUE4QjtBQUUxQyxnQkFDUyxJQURULEVBRVMsT0FGVCxFQUdTLGNBSFQsRUFJUyxNQUpULEVBSXVCO0FBSGQsYUFBQSxJQUFBLEdBQUEsSUFBQTtBQUNBLGFBQUEsT0FBQSxHQUFBLE9BQUE7QUFDQSxhQUFBLGNBQUEsR0FBQSxjQUFBO0FBQ0EsYUFBQSxNQUFBLEdBQUEsTUFBQTtBQUVQLGFBQUssS0FBTCxHQUFhO0FBQ1gsZ0JBRFc7QUFFWCxvREFGVztBQUdYLDBCQUhXO0FBSVg7QUFKVyxTQUFiO0FBTUQ7QUFFRCxhQUFNO0FBQ0osZUFBTyxFQUFFLGNBQWMsK0JBQStCLEtBQUssSUFBSSxJQUF4RCxFQUFQO0FBQ0Q7QUFsQnlDO2tCQUF2Qix1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnRNYW5hZ2VyIGZyb20gJy4vY29tcG9uZW50LW1hbmFnZXInO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50Q2FwYWJpbGl0aWVzLFxuICBQcm9ncmFtU3ltYm9sVGFibGUsXG4gIENvbXBvbmVudERlZmluaXRpb24sXG59IGZyb20gJ0BnbGltbWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7IENBUEFCSUxJVElFUyBhcyBjYXBhYmlsaXRpZXMgfSBmcm9tICcuL2NhcGFiaWxpdGllcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVmaW5pdGlvblN0YXRlIHtcbiAgLyogTWFuYWdlci1yZWxhdGVkICovXG4gIGNhcGFiaWxpdGllczogQ29tcG9uZW50Q2FwYWJpbGl0aWVzO1xuXG4gIC8qIENvbXBvbmVudC1yZWxhdGVkICovXG4gIG5hbWU6IHN0cmluZztcbiAgQ29tcG9uZW50Q2xhc3M6IGFueTtcbiAgaGFuZGxlOiBudW1iZXI7XG4gIHN5bWJvbFRhYmxlPzogUHJvZ3JhbVN5bWJvbFRhYmxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnREZWZpbml0aW9uSW1wbCBpbXBsZW1lbnRzIENvbXBvbmVudERlZmluaXRpb24ge1xuICBzdGF0ZTogRGVmaW5pdGlvblN0YXRlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBtYW5hZ2VyOiBDb21wb25lbnRNYW5hZ2VyLFxuICAgIHB1YmxpYyBDb21wb25lbnRDbGFzczogQ29tcG9uZW50RmFjdG9yeSxcbiAgICBwdWJsaWMgaGFuZGxlOiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBjYXBhYmlsaXRpZXMsXG4gICAgICBDb21wb25lbnRDbGFzcyxcbiAgICAgIGhhbmRsZSxcbiAgICB9O1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB7IEdsaW1tZXJEZWJ1ZzogYDxjb21wb25lbnQtZGVmaW5pdGlvbiBuYW1lPVwiJHt0aGlzLm5hbWV9XCI+YCB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9