import GlimmerComponentManager from "@glimmer/component/addon/-private/component-manager";
import ApplicationInstance from "@ember/application/instance";
import GlimmerComponent from "@glimmer/component/addon";

declare module "@ember/component" {
  type ManagerFactory<ManagerDelegate> = (owner: unknown) => ManagerDelegate;

  export function setComponentManager<T extends object>(
    stringOrFunction: string | ManagerFactory<unknown>,
    obj: T
  ): T;

  export interface OptionalCapabilities {
    asyncLifecycleCallbacks?: boolean;
    destructor?: boolean;
  }

  export interface Capabilities {
    asyncLifeCycleCallbacks: boolean;
    destructor: boolean;
  }

  export function capabilities(
    managerAPI: "3.4",
    options?: OptionalCapabilities
  ): Capabilities;
}
