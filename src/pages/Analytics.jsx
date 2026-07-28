import { useEffect, useState } from "react";
import {
  Activity,
  Target,
  ShieldCheck,
  TrendingUp,
  BarChart3,
} from "lucide-react";

import AnalyticsCharts from "../components/AnalyticsCharts";
import "../styles/analytics.css";

function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [importance, setImportance] = useState([]);
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [
          metricsResponse,
          matrixResponse,
          importanceResponse,
          reportResponse,
        ] = await Promise.all([
          fetch("https://healthinsight-backend-bvvk.onrender.com/api/analytics/metrics"),
fetch("https://healthinsight-backend-bvvk.onrender.com/api/analytics/confusion-matrix"),
fetch("https://healthinsight-backend-bvvk.onrender.com/api/analytics/feature-importance"),
fetch("https://healthinsight-backend-bvvk.onrender.com/api/analytics/classification-report"),
        ]);

        const metricsData = await metricsResponse.json();
        const matrixData = await matrixResponse.json();
        const importanceData = await importanceResponse.json();
        const reportData = await reportResponse.json();

        setMetrics(metricsData);
        setMatrix(matrixData);
        setImportance(importanceData);
        setReport(reportData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <main className="analytics-loading">
        <h2>Loading Model Analytics...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="analytics-loading">
        <h2>{error}</h2>
      </main>
    );
  }

  return (
    <main className="analytics-container">

      <section className="analytics-hero">

        <span className="analytics-badge">
          Machine Learning Performance
        </span>

        <h1>Random Forest Analytics</h1>

        <p>
          Evaluate the trained diabetes prediction model using
          classification metrics, confusion matrix, feature
          importance and detailed performance analysis.
        </p>

      </section>

      <section className="analytics-kpi-grid">

        <div className="analytics-card">
          <Activity size={32} />
          <h2>{(metrics.accuracy * 100).toFixed(2)}%</h2>
          <p>Accuracy</p>
        </div>

        <div className="analytics-card">
          <Target size={32} />
          <h2>{(metrics.precision * 100).toFixed(2)}%</h2>
          <p>Precision</p>
        </div>

        <div className="analytics-card">
          <ShieldCheck size={32} />
          <h2>{(metrics.recall * 100).toFixed(2)}%</h2>
          <p>Recall</p>
        </div>

        <div className="analytics-card">
          <TrendingUp size={32} />
          <h2>{(metrics.f1_score * 100).toFixed(2)}%</h2>
          <p>F1 Score</p>
        </div>

        <div className="analytics-card">
          <BarChart3 size={32} />
          <h2>{(metrics.roc_auc * 100).toFixed(2)}%</h2>
          <p>ROC-AUC</p>
        </div>

      </section>

      <AnalyticsCharts
        metrics={metrics}
        matrix={matrix}
        importance={importance}
        report={report}
      />

    </main>
  );
}

export default Analytics;