import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./../logo.png";
import "./../styles/App.css";

const UpdatePlant = () => {
  const { plantName } = useParams();
  const [plant, setPlant] = useState([]);
  const [plantId, setPlantId] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      const response = await fetch(
        `http://localhost:8000/plants/${plantName}/`
      );
      const result = await response.json(response);
      setPlant(result);
      setPlantId(result.id);
      console.log(plantId);
      // Setting the form data with current plant values
      setFormData({ ...formData, name: plant.name });
      setFormData({ ...formData, image: plant.image });
      setFormData({ ...formData, category: plant.category });
      setFormData({ ...formData, height: plant.height });
      setFormData({
        ...formData,
        watering_frequency: plant.watering_frequency,
      });
      setFormData({ ...formData, soil: plant.soil });
      setFormData({ ...formData, light_tolerance: plant.light_tolerance });
      setFormData({ ...formData, pot_size: plant.pot_size });
      setFormData({ ...formData, price: plant.price });
      await console.log(formData);
    };
    fetchPlant();
  }, []);

  // Handling onChange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    setSubmitted(false);
  };

  // Handling the form submission
  const onSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const resp = await axios.put(
        `http://localhost:8000/plants/${plantId}/`,
        formData
      );
      console.log(resp);
      setSubmitted(true);
      setError(false);
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Plant updated!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="app-content">
      <h1 className="main-heading">{plantName}</h1>
      <img className="main-image" src={plant.image}></img>
      {errorMessage && <div className="failure">{errorMessage}</div>}
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Plant name"
          name="name"
          defaultValue={plant.name}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          defaultValue={plant.image}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          defaultValue={plant.category}
          onChange={onChange}
        />
        <input
          type="number"
          placeholder="Plant height"
          name="height"
          defaultValue={plant.height}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Watering frequency"
          name="watering_frequency"
          defaultValue={plant.watering_frequency}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Soil type"
          name="soil"
          defaultValue={plant.soil}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Light tolerance"
          name="light_tolerance"
          defaultValue={plant.light_tolerance}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Pot size"
          name="pot_size"
          defaultValue={plant.pot_size}
          onChange={onChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          defaultValue={plant.price}
          onChange={onChange}
        />

        <button className="button" type="submit">
          Update plant
        </button>
      </form>
    </div>
  );
};

export default UpdatePlant;
