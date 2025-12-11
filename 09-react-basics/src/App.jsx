import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import WeatherPage from "./WeatherPage";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/weather" className="nav-link">
              Weather
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="main-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;