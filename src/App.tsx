import React, { Suspense } from "react";
import "./App.css";

import { createElement } from "react";
import { InstanceProps } from "./reconciler/canvas";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

type BoxProps = InstanceProps & {
  children?: React.ReactNode;
};

function View({ children, ...props }: BoxProps) {
  return createElement("view", props, children);
}

const queryClient = new QueryClient();

function App({ name }: { name?: string }) {
  const [arr, setArr] = React.useState<number[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newArr = [...arr, arr.length];
      setArr(newArr);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [arr]);

  return (
    <View backgroundColor="red" padding={20}>
      <View padding={30} left={100} backgroundColor="green">
        {arr.length}
        {arr.length === 0 ? <View>13123</View> : <>2222</>}
        {/* todo doesn't work with more complex components... */}
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={"asdasdasdasdas"}>
            <Some />
          </Suspense>
        </QueryClientProvider>
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

function Some() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    suspense: true,
    queryFn: () =>
      fetch(
        `https://api.github.com/repos/tannerlinsley/react-query?date=${Date.now()}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <>Loading1!!...</>;

  if (error) return <>An error has occurred:</>;

  return (
    <View left={200} top={100} height={40} width={40} backgroundColor="purple">
      {data.full_name}
    </View>
  );
}

export default App;
