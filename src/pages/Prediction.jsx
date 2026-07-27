import { useState } from "react";
import { motion } from "framer-motion";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import "../styles/prediction.css";

function Prediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePrediction(formData) {
    try {
      setLoading(true);

      console.log("========== Sending To Backend ==========");
      console.log(formData);

      const response = await fetch(
        "http://127.0.0.1:8000/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data.result);
       console.log(data.result.probability);

      console.log("========== Backend Response ==========");
      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Prediction failed."
        );
      }

      // Store complete backend response
      setPrediction(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="prediction-page">

      <motion.section
        className="prediction-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1>AI Diabetes Prediction</h1>

          <p>
            Enter patient information below to predict
            diabetes risk using the trained Machine
            Learning model.
          </p>
        </div>

        <div className="ai-badge">
          AI Powered
        </div>
      </motion.section>

      <section className="prediction-layout">

        <motion.div
          className="prediction-card"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Patient Information</h2>

          <PredictionForm
            onSubmit={handlePrediction}
            loading={loading}
          />
        </motion.div>

        <motion.div
          className="result-card"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PredictionResult
            prediction={prediction}
            loading={loading}
          />
        </motion.div>

      </section>

    </main>
  );
}

export default Prediction;