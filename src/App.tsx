import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [arr, setArr] = React.useState<number[]>([]);

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {arr.map((i, k) => {
          return <div key={k}>{k}</div>;
        })}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
