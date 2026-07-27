import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Database,
  ShieldCheck,
  ArrowRight,
  Server,
} from "lucide-react";

import "../styles/home.css";

function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [isOnline, setIsOnline] = useState(false);

 useEffect(() => {
  async function checkBackend() {
    try {
      const response = await fetch(
        "https://healthinsight-backend-bvvk.onrender.com/api/health"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setBackendStatus(data.status);
      setIsOnline(true);
    } catch {
      setBackendStatus("Offline");
      setIsOnline(false);
    }
  }

  checkBackend();
}, []);

  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-left">

          <motion.span
            className="hero-tag"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI Powered Healthcare Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
          >
            Predict Diabetes With
            <span> Artificial Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
          >
            HealthInsight is an intelligent healthcare platform
            built using Machine Learning, FastAPI and React.
            Analyze healthcare datasets, visualize insights,
            and predict diabetes risk instantly.
          </motion.p>

          <div className="hero-buttons">

            <Link
              to="/prediction"
              className="primary-btn"
            >
              Start Prediction
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/dashboard"
              className="secondary-btn"
            >
              View Dashboard
            </Link>

          </div>

          <div className="backend-card">

            <Server size={22} />

            <div>

              <h4>Backend Status</h4>

              <span>
                {backendStatus}
              </span>

            </div>

            <div
              className={
                isOnline
                  ? "status-online"
                  : "status-offline"
              }
            />

          </div>

        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <div className="dashboard-card">

            <h3>Healthcare Overview</h3>

            <div className="mini-grid">

              <div className="mini-card">
                <Database size={28} />
                <h2>96K+</h2>
                <p>Patients</p>
              </div>

              <div className="mini-card">
                <Brain size={28} />
                <h2>98%</h2>
                <p>Accuracy</p>
              </div>

              <div className="mini-card">
                <Activity size={28} />
                <h2>8.8%</h2>
                <p>Diabetic</p>
              </div>

              <div className="mini-card">
                <ShieldCheck size={28} />
                <h2>24/7</h2>
                <p>Monitoring</p>
              </div>

            </div>

          </div>

        </motion.div>

      </section>

      <section className="features-section">

        <h2>Platform Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <Brain size={36} />
            <h3>AI Prediction</h3>
            <p>
              Predict diabetes risk using an advanced
              machine learning model.
            </p>
          </div>

          <div className="feature-card">
            <Database size={36} />
            <h3>Dataset Dashboard</h3>
            <p>
              Explore records, statistics,
              distributions and data quality.
            </p>
          </div>

          <div className="feature-card">
            <Activity size={36} />
            <h3>Interactive Analytics</h3>
            <p>
              Visualize healthcare insights
              through professional charts.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;