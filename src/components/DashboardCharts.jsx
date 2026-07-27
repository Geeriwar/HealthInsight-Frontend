import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function DashboardCharts({
  gender,
  target,
  age,
  bmi,
}) {

  const genderData = gender.map((item) => ({
    name: item.gender,
    value: item.count,
  }));

  const diabetesData = target.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const ageData = age.map((item) => ({
    name: item.group,
    value: item.count,
  }));

  const bmiData = bmi.map((item) => ({
    name: item.category,
    value: item.count,
  }));

  return (
    <section className="charts-grid">

      <div className="chart-card">

        <h2>Gender Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              label
            >

              {genderData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip/>

            <Legend/>

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Target Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={diabetesData}
              dataKey="value"
              nameKey="name"
              label
            >

              {diabetesData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip/>

            <Legend/>

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Age Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={ageData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Bar dataKey="value">

              {ageData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>BMI Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={bmiData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Bar dataKey="value">

              {bmiData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}

export default DashboardCharts;