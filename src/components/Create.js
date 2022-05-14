import { useState } from "react";
import axios from "axios";
import "./../styles/App.css";
import { useParams, useNavigate } from "react-router-dom";

const CreatePlant = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Handling onChange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  // Handling the form submission
  const onSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:8000/plants/", formData);
      console.log(resp);
      setSubmitted(true);
      setError(false);
      navigate(`/${formData.name}/`);
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
        <h1>Plant added to site!</h1>
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
      <h1 className="main-heading">New Plant Details</h1>
      {errorMessage && <div className="failure">{errorMessage}</div>}
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Plant name"
          name="name"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          onChange={onChange}
        />
        <input
          type="number"
          placeholder="Plant height"
          name="height"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Watering frequency"
          name="watering_frequency"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Soil type"
          name="soil"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Light tolerance"
          name="light_tolerance"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Pot size"
          name="pot_size"
          onChange={onChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={onChange}
        />

        <button className="button" type="submit">
          Add plant
        </button>
      </form>
    </div>
  );
};

export default CreatePlant;
