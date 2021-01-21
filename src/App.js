import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [planets, setPlanets] = useState({});
  // const [residents, setResidents] = useState([]);

  const getPlanets = () => {
    return fetch("http://swapi.dev/api/planets/").then((data) => data.json());
  };

  useEffect(() => {
    let mounted = true;
    getPlanets().then((items) => {
      if (mounted) {
        setPlanets(items);
      }
    });
    return () => (mounted = false);
  }, []);

  if ("results" in planets) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Planets of Star Wars</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Climate</th>
              <th>Residents</th>
              <th>Terrain</th>
              <th>Population</th>
              <th>Percent surface area covered by water</th>
            </tr>
            {planets.results.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.climate}</td>
                  <td>list residents</td>
                  <td>{item.terrain}</td>
                  <td>{item.population}</td>
                  <td>{item.surface_water}</td>
                </tr>
              );
            })}
          </table>
        </header>
        <footer className="App-footer">
          <p>TrussWorks, Inc. FE work sample, January 2021</p>
        </footer>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default App;
