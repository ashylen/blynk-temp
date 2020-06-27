import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import https from "https";

const url = (token) => `http://blynk-cloud.com/${token}/project`;
const defaultToken = "ee4ea75d8dc543df979af396f9fffe22";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [input, setInput] = useState({ token: "" });
  const [APIToken, setAPIToken] = useState(defaultToken);

  const getData = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url(token), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
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

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setError("");
    if (input && input.token) {
      setAPIToken(input.token);
      getData(input.token);
    } else {
      getData(defaultToken);
    }

    setInput({ token: "" });
  };

  useEffect(() => {
    getData(APIToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && (
          <div className="img-wrapper">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        )}
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

        <div className="form-wrapper">
          <input
            type="text"
            name="token"
            onChange={handleInputChange}
            value={input.token}
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
