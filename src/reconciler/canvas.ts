import Reconciler from "react-reconciler";
import { ConcurrentRoot } from "react-reconciler/constants";
import { DefaultEventPriority } from "react-reconciler/constants";

export type InstanceProps = {
  [name: string]: any;
};

type Shape = "rectangle" | "square" | "span" | "div" | "p";

export type Instance = {
  type: Shape;
  children?: Instance[];
  config: InstanceProps;
};

type TextOrRegularInstance = TextInstance | Instance;

type Container = {
  children: TextOrRegularInstance[];
};

export type TextInstance = {
  type: "text";
  text: string;
};

export type HostContext = {};

export interface HostConfig {
  type: string;
  props: InstanceProps;
  container: Container;
  instance: Instance;
  textInstance: TextInstance;
  suspenseInstance: Instance;
  hydratableInstance: Instance;
  publicInstance: void;
  hostContext: HostContext;
  updatePayload: {};
  childSet: never;
  timeoutHandle: number | undefined;
  noTimeout: -1;
}

const createInstance = (
  type: string,
  props: InstanceProps,
  _root: Container,
  _hostContext: HostContext
): Instance => {
  if (type !== "square" && type !== "span" && type !== "div" && type !== "p") {
    throw new Error(`Unknown type: ${type}`);
  }

  return {
    type,
    config: props,
  };
};

const removeChild = (parent: Instance, child: Instance) => {
  if (parent.children == null) {
    throw new Error(`Unexpected null children in removeChild`);
  }

  parent.children = parent.children.filter((item) => item !== child);
};

const appendChild = (parent: Instance, child: Instance) => {
  if (parent.children == null) {
    throw new Error(`Unexpected null children in appendChild`);
  }

  parent.children.push(child);
};

const appendInitialChild = (parent: Instance, child: Instance) => {
  parent.children = [child];
};

const insertBefore = (
  parent: Instance,
  child: Instance,
  beforeChild: Instance
) => {
  if (parent.children == null) {
    throw new Error(`Unexpected null children in insertBefore`);
  }

  const beforeChildIndex = parent.children.indexOf(beforeChild);
  if (beforeChildIndex === -1) {
    throw new Error("beforeChild not found in insertBefore");
  }

  parent.children = parent.children.splice(beforeChildIndex, 0, child);
};

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
  appendInitialChild,
  insertBefore,
  supportsMutation: true,
  isPrimaryRenderer: true,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: -1,
  appendChildToContainer: (container, child) => {
    container.children.push(child);
  },
  removeChildFromContainer: (container, child) => {
    // todo
  },
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
  const cont = { children: [] };
  const root = reconciler.createContainer(
    cont,
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
      reconciler.updateContainer(whatToRender, root, null, () => {
        console.log("!!!cont", cont);
      });
    },
  };
}
