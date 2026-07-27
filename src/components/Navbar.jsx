import { NavLink } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <div className="logo-icon">
          🏥
        </div>

        <span>HealthInsight</span>
      </NavLink>

      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Analytics
        </NavLink>

        <NavLink
          to="/prediction"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Prediction
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          About
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;