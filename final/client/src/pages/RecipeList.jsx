import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import { toast } from "react-toastify";

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

  async function handleDelete(e, id) {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || `Failed to delete (status ${res.status})`;
        throw new Error(msg);
      }

      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      if (flippedId === id) {
        setFlippedId(null);
      }

      toast.success("Recipe deleted.");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      toast.error(err.message || "Failed to delete recipe.");
    }
  }

  return (
    <section>
      <h1 className="page-title">All Recipes</h1>
      <p className="page-subtitle">
        Click a card to see ingredients and steps. Use delete to remove a recipe.
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
                      <p
                        style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                      >
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
                      <p
                        style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                      >
                        No steps provided.
                      </p>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDelete(e, recipe.id)}
                      style={{
                        marginTop: "12px",
                        alignSelf: "flex-end",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        background: "#fee2e2",
                        color: "#b91c1c",
                      }}
                    >
                      Delete
                    </button>

                    <p
                      style={{
                        marginTop: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Click empty area to flip back ↑
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