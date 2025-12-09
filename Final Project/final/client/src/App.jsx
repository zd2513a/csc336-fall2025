import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-shell">
      <ToastContainer />

      {/* nav bar*/}
      <header className="navbar">
        <div className="nav-logo">🍳 Recipe Manager</div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/recipes" className="nav-link">
            Recipe List
          </Link>
          <Link to="/add" className="nav-link">
            Add Recipe
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;