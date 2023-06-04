import React from "react";
import "./App.css";

import { createElement } from "react";
import { InstanceProps } from "./reconciler/canvas";

type BoxProps = InstanceProps & {
  children?: React.ReactNode;
};

function View({ children, ...props }: BoxProps) {
  return createElement("view", props, children);
}

function App({ name }: { name?: string }) {
  const [arr, setArr] = React.useState<number[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newArr = [...arr, arr.length];
      setArr(newArr);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [arr]);

  return (
    <View backgroundColor="red" padding={20}>
      <View padding={30} left={100} backgroundColor="green">
        {arr.length}
        <View
          left={100}
          top={50}
          height={20}
          width={20}
          backgroundColor="gray"
        />
      </View>
      {name}
    </View>
  );
}

export default App;
