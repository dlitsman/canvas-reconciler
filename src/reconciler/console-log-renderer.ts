import Reconciler from "react-reconciler";
import { ConcurrentRoot } from "react-reconciler/constants";
import { DefaultEventPriority } from "react-reconciler/constants";

export type InstanceProps = any;
export type Instance = any;
export type TextInstance = any;
export type HostContext = any;

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

const logFunctions: any = {};

[
  "createInstance",
  "removeChild",
  "appendChild",
  "appendInitialChild",
  "insertBefore",
  "appendChildToContainer",
  "removeChildFromContainer",
  "insertInContainerBefore",
  "getRootHostContext",
  "getChildHostContext",
  "finalizeInitialChildren",
  "prepareUpdate",
  "commitUpdate",
  "commitTextUpdate",
  "commitMount()",
  "getPublicInstance",
  "prepareForCommit",
  "preparePortalMount",
  "resetAfterCommit",
  "shouldSetTextContent",
  "clearContainer",
  "hideInstance",
  "unhideInstance",
  "createTextInstance",
  "hideTextInstance",
  "unhideTextInstance",
  "beforeActiveInstanceBlur",
  "afterActiveInstanceBlur",
  "detachDeletedInstance",
  "getInstanceFromNode",
  "prepareScopeUpdate",
  "getInstanceFromScope",
].forEach((name) => {
  logFunctions[name] = function () {
    console.log(`!${name}`, Array.from(arguments));
  };
});

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
  ...logFunctions,
  supportsMutation: true,
  isPrimaryRenderer: true,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: -1,
  getCurrentEventPriority: () => DefaultEventPriority,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
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
      reconciler.updateContainer(whatToRender, root, null, () => {
        console.log("!!!callback");
      });
    },
  };
}
