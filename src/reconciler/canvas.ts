import Reconciler from "react-reconciler";
import { ConcurrentRoot } from "react-reconciler/constants";
import { DefaultEventPriority } from "react-reconciler/constants";

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
  updatePayload: {};
  childSet: never;
  timeoutHandle: number | undefined;
  noTimeout: -1;
}

const createInstance = (
  type: string,
  _props: InstanceProps,
  root: Instance,
  hostContext: HostContext
): Instance => {
  console.log("!!type", type, _props);
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
  isPrimaryRenderer: true,
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
    console.log("!!!commitUpdate");
    // todo
  },
  commitTextUpdate(textInstance, _oldText: string, newText: string): void {
    // todo
  },
  commitMount() {
    console.log("!!!commitMount");
  },
  getPublicInstance: (instance) => instance!,
  prepareForCommit: function () {
    console.log("!!!prepareForCommit", Array.from(arguments));
    return null;
  },
  preparePortalMount: () => {},
  resetAfterCommit: () => {
    console.log("!!!resetAfterCommit");
  },
  shouldSetTextContent: () => false,
  clearContainer: () => false,
  hideInstance() {},
  unhideInstance() {},
  createTextInstance: (text, container) => {
    console.log(text, container);
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
