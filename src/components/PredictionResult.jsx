import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function PredictionResult({ prediction, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <h3>Running AI Prediction...</h3>
        <p>Please wait...</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <>
        <h2>Prediction Result</h2>

        <div className="info-box">
          Fill in the patient information and click
          <strong> Predict Diabetes</strong>.
        </div>
      </>
    );
  }

  const result = prediction.result;

  const diabetic = result.prediction === 1;

  const confidence = result.confidence;

  return (
    <>
      <h2>Prediction Result</h2>

      <div className="gauge-wrapper">
        <CircularProgressbar
          value={confidence}
          text={`${confidence}%`}
        />
      </div>

      <div
        className={`result-status ${
          diabetic ? "status-high" : "status-low"
        }`}
      >
        {result.label}
      </div>

      <div className="probability">

        <p>
          <strong>Confidence</strong>
        </p>

        <h2>{result.confidence}%</h2>

        <p>
          <strong>Risk Level:</strong>{" "}
          {result.risk_level}
        </p>

      </div>

      <div className="recommendation">

        <strong>Recommendation</strong>

        {diabetic ? (
          <p>
            The patient has a high predicted risk of diabetes.
            Please consult a healthcare professional for
            laboratory confirmation and further evaluation.
          </p>
        ) : (
          <p>
            The patient currently has a low predicted risk.
            Continue maintaining a healthy lifestyle and
            regular health checkups.
          </p>
        )}

      </div>

      <div className="prediction-factors">

        <h3>Main Factors Influencing Prediction</h3>

        {result.factors.map((factor) => (

          <div
            className="factor-card"
            key={factor.name}
          >

            <div>

              <strong>{factor.name}</strong>

              <p>{factor.status}</p>

            </div>

            <h3>{factor.value}</h3>

          </div>

        ))}

      </div>

      <div className="model-card">

        <h3>Model Information</h3>

        <p>
          <strong>Model:</strong>{" "}
          {result.model.name}
        </p>

        <p>
          <strong>Accuracy:</strong>{" "}
          {result.model.accuracy}%
        </p>

        <p>
          <strong>ROC-AUC:</strong>{" "}
          {result.model.roc_auc}%
        </p>

      </div>
    </>
  );
}

export default PredictionResult;