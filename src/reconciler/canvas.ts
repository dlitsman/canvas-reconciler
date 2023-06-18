import Reconciler from "react-reconciler";
import { ConcurrentRoot } from "react-reconciler/constants";
import { DefaultEventPriority } from "react-reconciler/constants";

export type InstanceProps = {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  padding?: number;
  backgroundColor?: string;
};

type Shape = "view";

export type Instance = {
  type: Shape;
  children?: TextOrRegularInstance[];
  config: InstanceProps;
  id: number;
};

export type TextOrRegularInstance = TextInstance | Instance;

export type Container = {
  children: TextOrRegularInstance[];
  onUpdate: () => void;
};

export type TextInstance = {
  type: "text";
  text: string;
  id: number;
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

let id = 0;
const createInstance = (
  type: string,
  props: InstanceProps,
  _root: Container,
  _hostContext: HostContext
): Instance => {
  if (type !== "view") {
    throw new Error(`Unknown type: ${type}`);
  }

  console.log("!!!createInstance", type, props);

  const { left, top, padding, backgroundColor, width, height } = props;

  return {
    type,
    id: ++id,
    config: {
      left,
      top,
      padding,
      backgroundColor,
      width,
      height,
    },
  };
};

const removeChild = (parent: Instance, child: Instance) => {
  if (parent.children == null) {
    throw new Error(`Unexpected null children in removeChild`);
  }
  console.log("!!!removeChild", parent, child);

  parent.children = parent.children.filter((item) => item !== child);
};

const appendChild = (parent: Instance, child: Instance | TextInstance) => {
  if (parent.children == null) {
    throw new Error(`Unexpected null children in appendChild`);
  }
  console.log("!!!appendChild", parent, child);

  parent.children.push(child);
};

const appendInitialChild = (
  parent: Instance,
  child: Instance | TextInstance
) => {
  if (parent.children == null) {
    parent.children = [];
  }
  console.log("!!!appendInitialChild", parent, child);

  appendChild(parent, child);
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

  console.log("!!!insertBefore", parent, child);

  parent.children.splice(beforeChildIndex, 0, child);
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
    container.children = container.children.filter((item) => item !== child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    console.log("!!insertInContainerBefore");
  },
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
    // todo change so we only return changed values
    return true;
  },
  commitUpdate(instance, payload, type, oldProps, newProps) {
    // todo fix to only read changed values
    const { left, top, padding, backgroundColor, width, height } = newProps;
    instance.config = { left, top, padding, backgroundColor, width, height };
  },
  commitTextUpdate(textInstance, _oldText: string, newText: string): void {
    textInstance.text = newText;
    // todo
  },
  commitMount() {
    console.log("!!!commitMount");
  },
  getPublicInstance: (instance) => instance!,
  prepareForCommit: function () {
    //console.log("!!!prepareForCommit", Array.from(arguments));
    return null;
  },
  preparePortalMount: () => {
    console.log("!!!preparePortalMount");
  },
  resetAfterCommit: (container) => {
    console.log("!!!resetAfterCommit", container);
    container.onUpdate();
  },
  shouldSetTextContent: () => false,
  clearContainer: () => false,
  hideInstance() {
    console.log("!!!hideInstance");
  },
  unhideInstance() {
    console.log("!!!unhideInstance");
  },
  createTextInstance: (text, container) => {
    return {
      text: text,
      type: "text",
      id: ++id,
    };
  },
  hideTextInstance: () => {
    console.log("!!!hideTextInstance");
  },
  unhideTextInstance: () => {
    console.log("!!!unhideTextInstance");
  },
  getCurrentEventPriority: () => DefaultEventPriority,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  getInstanceFromNode: () => {
    console.log("!!getInstanceFromNode");
    return null;
  },
  prepareScopeUpdate: () => {
    console.log("!!prepareScopeUpdate");
  },
  getInstanceFromScope: () => {
    console.log("!!getInstanceFromScope");
    return null;
  },
});

export function createRoot(container: Container) {
  const root = reconciler.createContainer(
    container,
    ConcurrentRoot,
    null,
    false,
    null,
    "",
    () => {},
    null
  );

  return {
    render: (
      toRender: React.ReactElement,
      callback?: (cont: Container) => void
    ) => {
      reconciler.updateContainer(toRender, root, null, () => {
        callback && callback(container);
      });
    },
  };
}
