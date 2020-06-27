import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const url =
    "https://blynk-cloud.com/ee4ea75d8dc543df979af396f9fffe22/project";
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dane</h1>
        {data ? (
          <div>
            {data &&
              data.widgets &&
              data.widgets.map((widget) => (
                <p>
                  {widget.label}: {widget.value}
                  {widget.valueFormatting.slice(-2)}
                </p>
              ))}
          </div>
        ) : (
          <p>Nie znaleziono danych</p>
        )}
      </header>
    </div>
  );
}

export default App;
