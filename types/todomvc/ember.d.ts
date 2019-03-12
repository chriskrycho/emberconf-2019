/**
  This whole file is basically a hack to make the types in component-manager.ts
  work correctly, patching the Ember namespace and shoving `Meta` into the
  global namespace because somehow it's not correctly set up in the actual TS
  files.
 */

import Ember from "ember";

declare module "ember" {
  namespace Ember {
    export interface Meta {
      writeValues(subkey: string, value: any): void;
      peekValues(key: string): any;
      deleteFromValues(key: string): any;
      readInheritedValue(key: string, subkey: string): any;
      writeValue(obj: object, key: string, value: any): any;
      setSourceDestroying(): void;
      setSourceDestroyed(): void;
    }

    /**
        Retrieves the meta hash for an object. If `writable` is true ensures the
        hash is writable for this object as well.
        The meta object contains information about computed property descriptors as
        well as any watched properties and other information. You generally will
        not access this information directly but instead work with higher level
        methods that manipulate this hash indirectly.
        @method meta
        @for Ember
        @param {Object} obj The object to retrieve meta for
        @param {Boolean} [writable=true] Pass `false` if you do not intend to modify
          the meta hash, allowing the method to avoid making an unnecessary copy.
        @return {Object} the meta hash for an object
      */
    export function meta(obj: object): Meta;

    /**
        Tears down the meta on an object so that it can be garbage collected.
        Multiple calls will have no effect.
        @method deleteMeta
        @for Ember
        @param {Object} obj  the object to destroy
        @return {void}
      */
    export function destroy(obj: object): void;
  }
}

declare global {
  interface Meta extends Ember.Meta {}
}
