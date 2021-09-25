import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const evtSource = new EventSource("http://127.0.0.1:8000/stream");

function App() {
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    evtSource.addEventListener("new_message", function (event) {
      // Logic to handle status updates
      setMessage((messages) => [...messages, event.data]);
    });

    evtSource.addEventListener("end_event", function (event) {
      setMessage((messages) => [...messages, event.data]);
      evtSource.close();
    });

    return () => {
      evtSource.close();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {messages.map((el) => (
          <p>{el}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
