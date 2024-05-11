import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        setCountries(res.data);
        setStates([]);
        setState("");
        setCities([]);
        setCity("");
        setIsCitySelected(false);
      })
      .catch((error) => console.log("Error while fetching countries", error));
  }, []);

  useEffect(() => {
    if (country) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        )
        .then((res) => {
          setStates(res.data);
          setState("");
          setCities([]);
          setCity("");
        })
        .catch((error) => console.log("Error while fetching states", error));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
        )
        .then((res) => setCities(res.data))
        .catch((error) => console.log("Error while fetching cities", error));
    }
  }, [country, state]);

  return (
    <div className="App">
      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setIsCitySelected(false);
        }}
      >
        <option value="" disabled selected>
          Select Country
        </option>
        {countries.map((con) => {
          return (
            <option value={con} key={con}>
              {con}
            </option>
          );
        })}
      </select>

      <select
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setIsCitySelected(false);
        }}
      >
        <option value="" disabled selected>
          Select State
        </option>
        {states.map((st) => {
          return (
            <option value={st} key={st}>
              {st}
            </option>
          );
        })}
      </select>

      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setIsCitySelected(true);
        }}
      >
        <option value="" disabled selected>
          Select City
        </option>
        {cities.map((ct) => {
          return (
            <option value={ct} key={ct}>
              {ct}
            </option>
          );
        })}
      </select>
{isCitySelected?
      <p>
        You selected <span className="city">{city}</span>,
        <span className="text-gray"> {state}</span>,
        <span className="text-gray"> {country}</span>
      </p>
      :<></>}
    </div>
  );
}

export default App;
