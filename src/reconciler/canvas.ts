import Reconciler from "react-reconciler";
import { ConcurrentRoot } from "react-reconciler/constants";
import { DefaultEventPriority } from "react-reconciler/constants";

// using typescript is fun...
// \\

export type InstanceProps = {
  [name: string]: any;
};

export type Instance = {
  type: string;
  children?: Instance[];
};

type Container = Instance;

export type TextInstance = {
  type: "text";
  text: string;
};

export type HostContext = {
  some?: string;
};

export interface HostConfig {
  type: string;
  props: InstanceProps;
  container: Instance;
  instance: Instance;
  textInstance: TextInstance;
  suspenseInstance: Instance;
  hydratableInstance: Instance;
  publicInstance: Instance;
  hostContext: HostContext;
  updatePayload: { inDefs: boolean };
  childSet: never;
  timeoutHandle: number | undefined;
  noTimeout: -1;
}

// const HostConfig22 = {
//   supportsMutation: true,

//   createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {

//   },
//   createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle){},
//   appendChildToContainer(container, child) {},
//   appendChild(parent, child) {},
//   appendInitialChild(parent, child) {},

//   removeChildFromContainer(container, child) {},
//   removeChild(parent, child) {},

//   insertInContainerBefore(container, child, before) {},
//   insertBefore(parent, child, before) {},

//   prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {

//   },

//   commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork) {

//   },

//   finilizeInitialChildren() {},
//   getChildHostContext() {},
//   getPublicInstance() {},
//   getRootHostContext() {},
//   prepareForCommit() {},
//   resetAfterCommit() {},
//   shouldSetTextContent() {
//     return false;
//   }

// };

const createInstance = (
  type: string,
  _props: InstanceProps,
  root: Instance,
  hostContext: HostContext
): Instance => {
  console.log("!!type", type);
  return {
    type: "aaaa",
  };
};

const removeChild = (parent: Instance, child: Instance) => {};

const appendChild = (parent: Instance, child: Instance) => {};

const insertBefore = (
  parent: Instance,
  child: Instance,
  beforeChild: Instance
) => {};

export const reconciler = Reconciler<
  HostConfig["type"],
  HostConfig["props"],
  HostConfig["container"],
  HostConfig["instance"],
  HostConfig["textInstance"],
  HostConfig["suspenseInstance"],
  HostConfig["hydratableInstance"],
  HostConfig["publicInstance"],
  HostConfig["hostContext"],
  HostConfig["updatePayload"],
  HostConfig["childSet"],
  HostConfig["timeoutHandle"],
  HostConfig["noTimeout"]
>({
  createInstance,
  removeChild,
  appendChild,
  appendInitialChild: appendChild,
  insertBefore,
  supportsMutation: true,
  isPrimaryRenderer: false,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: -1,
  appendChildToContainer: (container, child) => {},
  removeChildFromContainer: (container, child) => {},
  insertInContainerBefore: (container, child, beforeChild) => {},
  getRootHostContext: (root): HostContext => {
    return { some: "1" };
  },
  getChildHostContext: (parentHostContext, type) => {
    return parentHostContext;
  },
  finalizeInitialChildren() {
    return false;
  },
  prepareUpdate() {
    // todo
    return null;
  },
  commitUpdate() {
    // todo
  },
  commitTextUpdate(textInstance, _oldText: string, newText: string): void {
    // todo
  },
  commitMount() {},
  getPublicInstance: (instance) => instance!,
  prepareForCommit: () => null,
  preparePortalMount: () => {},
  resetAfterCommit: () => {},
  shouldSetTextContent: () => false,
  clearContainer: () => false,
  hideInstance() {},
  unhideInstance() {},
  createTextInstance: (text, container) => {
    return {
      text: text,
      type: "text",
    };
  },
  hideTextInstance: () => {},
  unhideTextInstance: () => {},
  getCurrentEventPriority: () => DefaultEventPriority,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  getInstanceFromNode: () => null,
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
});

export function createRoot() {
  const root = reconciler.createContainer(
    { type: "aaa" },
    ConcurrentRoot,
    null,
    false,
    null,
    "",
    () => {},
    null
  );

  return {
    render: (whatToRender: any) => {
      reconciler.updateContainer(whatToRender, root);
    },
  };
}
