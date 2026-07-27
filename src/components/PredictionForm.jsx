import { useState } from "react";

function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    gender: "Female",
    age: "",
    hypertension: 0,
    heart_disease: 0,
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-grid">

        <div className="form-group">
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age</label>

          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>BMI</label>

          <input
            type="number"
            step="0.1"
            name="bmi"
            required
            value={formData.bmi}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>HbA1c Level</label>

          <input
            type="number"
            step="0.1"
            name="HbA1c_level"
            required
            value={formData.HbA1c_level}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Blood Glucose</label>

          <input
            type="number"
            name="blood_glucose_level"
            required
            value={formData.blood_glucose_level}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hypertension</label>

          <select
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Heart Disease</label>

          <select
            name="heart_disease"
            value={formData.heart_disease}
            onChange={handleChange}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Smoking History</label>

          <select
            name="smoking_history"
            value={formData.smoking_history}
            onChange={handleChange}
          >
            <option value="never">Never</option>
            <option value="No Info">No Info</option>
            <option value="former">Former</option>
            <option value="current">Current</option>
            <option value="ever">Ever</option>
            <option value="not current">Not Current</option>
          </select>
        </div>

      </div>

      <button
        className="predict-btn"
        disabled={loading}
        type="submit"
      >
        {loading
          ? "Predicting..."
          : "Predict Diabetes"}
      </button>

    </form>
  );
}

export default PredictionForm;