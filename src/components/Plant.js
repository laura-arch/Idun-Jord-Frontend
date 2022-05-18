import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./../logo.png";
import "./../styles/App.css";

<link rel="stylesheet" href="./../App.css"></link>;

const Plant = () => {
  const { plantName } = useParams();
  const [plant, setPlant] = useState([]);
  const [plantId, setPlantId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      const response = await fetch(
        `http://localhost:8000/plants/${plantName}/`
      );
      const result = await response.json(response);
      setPlant(result);
      setPlantId(result.id);
    };
    fetchPlant();
  }, []);

  const handleUpdateClick = () => {
    navigate(`/${plantName}/update/`);
  };

  const handleDeleteClick = async () => {
    await axios.delete(`http://localhost:8000/plants/${plantId}/`);
    navigate("/");
  };

  return (
    <div className="app-content">
      <div className="columns-container">
        <img className="main-image" src={plant.image}></img>
        <div>
          <h1 className="main-heading">{plant.name}</h1>
          <p>
            Price: £{plant.price}
            <br />
            Category: {plant.category}
            <br />
            Height: {plant.height}cm
            <br />
            Pot-size: {plant.pot_size}cm
            <br />
            When to water: {plant.watering_frequency}
            <br />
            What soil I like: {plant.soil}
            <br />
            How much sun I need: {plant.light_tolerance}
          </p>
        </div>
      </div>
      <button className="button" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="update-button button" onClick={handleUpdateClick}>
        Update Plant
      </button>
      <button className="delete-button button" onClick={handleDeleteClick}>
        Delete Plant
      </button>
    </div>
  );
};

export default Plant;
