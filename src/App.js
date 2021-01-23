import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [planets, setPlanets] = useState({});
  const [residents, setResidents] = useState({});

  const fetchList = async (list) => {
    const data = await fetch(`http://swapi.dev/api/${list}/`);
    return await data.json();
  };

  const fetchPlanets = () => fetchList("planets");
  const fetchResidents = () => fetchList("people");

  useEffect(() => {
    let mounted = true;
    fetchPlanets().then((items) => {
      if (mounted) {
        setPlanets(items);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchResidents().then((items) => {
      if (mounted) {
        setResidents(items);
      }
    });
    return () => (mounted = false);
  }, []);

  if ("results" in planets) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Planets of Star Wars</h1>
          <tbody>
            <table>
              <tr>
                <th>Name</th>
                <th>Climate</th>
                <th>Known residents</th>
                <th>Terrain</th>
                <th>Population</th>
                <th>Percent surface area covered by water</th>
              </tr>
              {planets.results.map((item) => {
                return (
                  <tr>
                    <td>
                      <a
                        className="App-link"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                    </td>
                    <td>{item.climate}</td>
                    <td>
                      <ul>
                        {residents.results === undefined ? (
                          <div>
                            We encountered a problem while retrieving residents
                          </div>
                        ) : (
                          residents.results.map((item) => {
                            return <li>{item.name}</li>;
                          })
                        )}
                      </ul>
                    </td>
                    <td>{item.terrain}</td>
                    <td>{item.population}</td>
                    <td>{item.surface_water}</td>
                  </tr>
                );
              })}
            </table>
          </tbody>
        </header>
        <footer className="App-footer">
          <p>TrussWorks, Inc. FE work sample, January 2021</p>
        </footer>
      </div>
    );
  } else {
    return <div className="App-header">loading...</div>;
  }
}

export default App;
