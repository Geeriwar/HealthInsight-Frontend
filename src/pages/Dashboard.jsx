import { useEffect, useState } from "react";
import {
  Database,
  Table,
  Activity,
  HardDrive,
  BarChart3,
  Layers,
  Users,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

import DashboardCharts from "../components/DashboardCharts";
import "../styles/dashboard.css";

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [gender, setGender] = useState([]);
  const [target, setTarget] = useState([]);
  const [age, setAge] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [preview, setPreview] = useState([]);
  const [features, setFeatures] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const urls = [
          "http://127.0.0.1:8000/api/eda/overview",
          "http://127.0.0.1:8000/api/eda/gender",
          "http://127.0.0.1:8000/api/eda/target",
          "http://127.0.0.1:8000/api/eda/age",
          "http://127.0.0.1:8000/api/eda/bmi",
          "http://127.0.0.1:8000/api/eda/preview",
          "http://127.0.0.1:8000/api/eda/features",
        ];

        const responses = await Promise.all(
          urls.map((url) => fetch(url))
        );

        const data = await Promise.all(
          responses.map((r) => r.json())
        );

        setOverview(data[0]);
        setGender(data[1]);
        setTarget(data[2]);
        setAge(data[3]);
        setBmi(data[4]);
        setPreview(data[5]);
        setFeatures(data[6]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading)
    return <h2 style={{ padding: 40 }}>Loading Dashboard...</h2>;

  if (error)
    return <h2 style={{ padding: 40 }}>{error}</h2>;

  const columnNames =
    preview.length > 0 ? Object.keys(preview[0]) : [];

  return (
    <main className="dashboard-container">

      <section className="summary-banner">

        <div>
          <h3>Total Records</h3>
          <p>{overview.rows}</p>
        </div>

        <div>
          <h3>Total Columns</h3>
          <p>{overview.columns}</p>
        </div>

        <div>
          <h3>Memory</h3>
          <p>{overview.memory_mb} MB</p>
        </div>

      </section>

      <section className="kpi-grid">

        <div className="kpi-card">
          <Database size={30}/>
          <h2>{overview.rows}</h2>
          <p>Total Records</p>
        </div>

        <div className="kpi-card">
          <Table size={30}/>
          <h2>{overview.columns}</h2>
          <p>Columns</p>
        </div>

        <div className="kpi-card">
          <BarChart3 size={30}/>
          <h2>{overview.numerical_columns}</h2>
          <p>Numerical</p>
        </div>

        <div className="kpi-card">
          <Layers size={30}/>
          <h2>{overview.categorical_columns}</h2>
          <p>Categorical</p>
        </div>

        <div className="kpi-card">
          <HardDrive size={30}/>
          <h2>{overview.memory_mb}</h2>
          <p>Memory MB</p>
        </div>

      </section>

      <DashboardCharts
        gender={gender}
        target={target}
        age={age}
        bmi={bmi}
      />

      <section className="dashboard-section">

        <h2>Feature Summary</h2>

        <div className="column-grid">

          {features.map((item) => (

            <div
              key={item.column}
              className="column-card"
            >

              <h3>{item.column}</h3>

              <p>Type : {item.datatype}</p>

              <p>Missing : {item.missing}</p>

              <p>Unique : {item.unique}</p>

            </div>

          ))}

        </div>

      </section>

      <section className="dashboard-section">

        <h2>Dataset Preview</h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                {columnNames.map((c) => (
                  <th key={c}>{c}</th>
                ))}

              </tr>

            </thead>

            <tbody>

              {preview.map((row, i) => (

                <tr key={i}>

                  {columnNames.map((c) => (
                    <td key={c}>{String(row[c])}</td>
                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;