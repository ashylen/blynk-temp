import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const url = (token) => `https://blynk-cloud.com/${token}/project`;

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [input, setInput] = useState({});
  const [token, setToken] = useState("ee4ea75d8dc543df979af396f9fffe22");

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url(token));
      setData(response.data);
    } catch (err) {
      console.log(err.response);
      setError(JSON.stringify(err));
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleButtonClick = (e) => {
    if (input && input.token) {
      setToken(input.token);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dane</h1>
        {data ? (
          <div>
            {data &&
              data.widgets &&
              data.widgets.map((widget) => (
                <p key={widget.id}>
                  {widget.label}: {widget.value}
                  {widget.valueFormatting.slice(-2)}
                </p>
              ))}
          </div>
        ) : (
          <p>Nie znaleziono danych</p>
        )}
        {isLoading && (
          <div>
            <p>Ładowanie...</p>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        )}

        <div className="form-wrapper">
          <input
            type="text"
            name="token"
            onChange={handleInputChange}
            placeholder="Wprowadź token"
          />
          <button onClick={handleButtonClick}>Pobierz dane</button>
        </div>

        {error && <span>{error}</span>}
      </header>
    </div>
  );
}

export default App;
