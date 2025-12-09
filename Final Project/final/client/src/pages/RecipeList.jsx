import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/recipes`);
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return (
      <div>
        <h1 className="page-title">All Recipes</h1>
        <p className="page-subtitle" style={{ color: "red" }}>
          {error}
        </p>
      </div>
    );
  }

  function handleToggle(id) {
    setFlippedId((prev) => (prev === id ? null : id));
  }

  return (
    <section>
      <h1 className="page-title">All Recipes</h1>
      <p className="page-subtitle">
        Click a card to see ingredients and steps.
      </p>

      {recipes.length === 0 ? (
        <p>No recipes yet. Try adding one!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => {
            const isFlipped = flippedId === recipe.id;

            return (
              <div key={recipe.id} className="recipe-card">
                <div
                  className={`card-inner ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => handleToggle(recipe.id)}
                >
                  {/* Front side */}
                  <div className="card-face card-front">
                    <h2 style={{ margin: "0 0 4px" }}>{recipe.title}</h2>

                    {recipe.description && (
                      <p
                        style={{
                          margin: "0 0 10px",
                          fontStyle: "italic",
                          color: "var(--text-muted)",
                        }}
                      >
                        {recipe.description}
                      </p>
                    )}

                    <div className="recipe-meta">
                      <span className="recipe-pill">
                        ⏱ {recipe.cookingTime || 0} min
                      </span>
                      <span className="recipe-pill">
                        ⭐ {recipe.difficulty || "easy"}
                      </span>
                    </div>

                    <p
                      style={{
                        marginTop: "14px",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Click to view ingredients & steps →
                    </p>
                  </div>

                  {/* Back side */}
                  <div className="card-face card-back">
                    <h3 style={{ margin: "0 0 8px" }}>Ingredients</h3>
                    {recipe.ingredients ? (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "18px",
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {recipe.ingredients
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        No ingredients provided.
                      </p>
                    )}

                    <h3 style={{ margin: "14px 0 6px" }}>Steps</h3>
                    {recipe.steps ? (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {recipe.steps}
                      </p>
                    ) : (
                      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        No steps provided.
                      </p>
                    )}

                    <p
                      style={{
                        marginTop: "12px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Click again to flip back ↑
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}