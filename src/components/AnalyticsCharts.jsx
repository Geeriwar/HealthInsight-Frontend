import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

// Convert ugly sklearn feature names into readable labels
const formatFeatureName = (name) => {
  return name
    .replace("categorical__", "")
    .replace("numerical__", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

function AnalyticsCharts({
  matrix,
  importance,
  report,
}) {
  if (!matrix || !importance || !report) {
    return null;
  }

  const featureData = importance
    .slice(0, 10)
    .map((item) => ({
      ...item,
      feature: formatFeatureName(item.feature),
    }));

  return (
    <>
      {/* ===========================
          CONFUSION MATRIX
      ============================ */}

      <section className="analytics-section">

        <div className="section-header">
          <h2>Confusion Matrix</h2>
          <span>Model Prediction Summary</span>
        </div>

        <div className="confusion-grid">

          <div className="matrix-cell header"></div>

          <div className="matrix-cell header">
            Predicted No
          </div>

          <div className="matrix-cell header">
            Predicted Yes
          </div>

          <div className="matrix-cell header">
            Actual No
          </div>

          <div className="matrix-cell tn">
            <h2>{matrix.tn}</h2>
            <p>True Negative</p>
          </div>

          <div className="matrix-cell fp">
            <h2>{matrix.fp}</h2>
            <p>False Positive</p>
          </div>

          <div className="matrix-cell header">
            Actual Yes
          </div>

          <div className="matrix-cell fn">
            <h2>{matrix.fn}</h2>
            <p>False Negative</p>
          </div>

          <div className="matrix-cell tp">
            <h2>{matrix.tp}</h2>
            <p>True Positive</p>
          </div>

        </div>

      </section>

      {/* ===========================
          FEATURE IMPORTANCE
      ============================ */}

      <section className="analytics-section">

        <div className="section-header">
          <h2>Feature Importance</h2>
          <span>Random Forest</span>
        </div>

        <div className="chart-card">

          <ResponsiveContainer
            width="100%"
            height={520}
          >

            <BarChart
              data={featureData}
              layout="vertical"
              margin={{
                top: 20,
                right: 40,
                left: 120,
                bottom: 20,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                tick={{ fontSize: 13 }}
              />

              <YAxis
                type="category"
                dataKey="feature"
                width={260}
                tick={{
                  fontSize: 15,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  value.toFixed(4),
                  "Importance",
                ]}
              />

              <Bar
                dataKey="importance"
                radius={[0, 8, 8, 0]}
              >

                {featureData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* ===========================
          CLASSIFICATION REPORT
      ============================ */}

      <section className="analytics-section">

        <div className="section-header">
          <h2>Classification Report</h2>
          <span>Detailed Performance</span>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Class</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1 Score</th>
                <th>Support</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Non-Diabetic</td>
                <td>{report.non_diabetic.precision.toFixed(3)}</td>
                <td>{report.non_diabetic.recall.toFixed(3)}</td>
                <td>{report.non_diabetic["f1-score"].toFixed(3)}</td>
                <td>{report.non_diabetic.support}</td>
              </tr>

              <tr>
                <td>Diabetic</td>
                <td>{report.diabetic.precision.toFixed(3)}</td>
                <td>{report.diabetic.recall.toFixed(3)}</td>
                <td>{report.diabetic["f1-score"].toFixed(3)}</td>
                <td>{report.diabetic.support}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
}

export default AnalyticsCharts;