import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App({ name }: { name?: string }) {
  const [arr, setArr] = React.useState<number[]>([]);
  const [rnd, setRnd] = React.useState(Math.random());

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newArr = [...arr, arr.length];
      setArr(newArr);
    }, 10000000);

    return () => {
      clearInterval(interval);
    };
  }, [arr]);

  return (
    <div className="App">
      <span>{rnd}</span>
      {name && <p>{name}</p>}
    </div>
  );
}

export default App;
