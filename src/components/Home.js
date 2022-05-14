import { useEffect, useState } from "react";
import logo from "./../logo.png";
import "./../styles/App.css";

const App = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch("http://localhost:8000/plants/");
      const result = await response.json(response);
      setPlants(result);
    };
    fetchPlants();
  }, []);

  return (
    <div className="app-content">
      <h1 className="main-heading">Idun & Jörd</h1>
      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmo4NGpL_-MhE3TxT2gpWurHla6r5a7_sPw&usqp=CAU"></img> */}
      <img src={logo} className="App-logo" alt="logo" />
      <div className="listings">
        {plants.map((plant) => (
          <a href={plant.name}>
            <div
              className="plant-listing"
              key={plant.name}
              style={{
                padding: 15,
                fontSize: 24,
                color: "green",
                borderRadius: 5,
                border: "2px solid green",
              }}
            >
              <img height="150px" src={plant.image}></img>
              {plant.name} - £{plant.price}
            </div>
          </a>
        ))}
      </div>
      <a href="new">
        <button className="button">New Plant</button>
      </a>
    </div>
  );
};

export default App;
