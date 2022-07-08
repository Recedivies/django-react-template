import React, { useState } from "react";

import AxiosClient from "../api/axiosClient";
import logo from "../logo.svg";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = () => {
    AxiosClient.get(`/api/test?text=${textInput}`)
      .then((res) => {
        setOutput(res.data.text);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <pre>django-react-docker-heroku-template</pre>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <p>Test connection with API:</p>
          <label htmlFor="char-input">Make this text uppercase: </label>
          <input
            id="char-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <h3>{output}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
