import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../api";

const initialForm = {
  title: "",
  description: "",
  ingredients: "",
  steps: "",
  cookingTime: "",
  difficulty: "easy",
};

export default function AddRecipe() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!form.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    }
    if (!form.steps.trim()) {
      newErrors.steps = "Steps are required.";
    }

    if (!form.cookingTime) {
      newErrors.cookingTime = "Cooking time is required.";
    } else if (Number(form.cookingTime) <= 0) {
      newErrors.cookingTime = "Cooking time must be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || `Failed to save recipe (status ${res.status})`;
        throw new Error(msg);
      }

      await res.json();

      toast.success("Recipe saved!");

      setForm(initialForm);
      setErrors({});
      navigate("/recipes");
    } catch (err) {
      console.error("Error submitting recipe:", err);
      toast.error(err.message || "Failed to submit recipe.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1 className="page-title">Add a New Recipe</h1>
      <p className="page-subtitle">
        Fill in the form below to add a recipe to your collection.
      </p>

      <div className="form-card">
        <form className="recipe-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <div className="field-label">
              Title*{" "}
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                (e.g. Lemon Chicken Pasta)
              </span>
            </div>
            <input
              type="text"
              name="title"
              className="field-input"
              value={form.title}
              onChange={handleChange}
              disabled={submitting}
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <div className="field-label">Short Description</div>
            <input
              type="text"
              name="description"
              className="field-input"
              value={form.description}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>

          {/* Ingredients */}
          <div>
            <div className="field-label">
              Ingredients*{" "}
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                (separate with commas)
              </span>
            </div>
            <textarea
              name="ingredients"
              className="field-textarea"
              rows={3}
              value={form.ingredients}
              onChange={handleChange}
              disabled={submitting}
            />
            {errors.ingredients && (
              <p className="field-error">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <div className="field-label">
              Steps*{" "}
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>
                (you can write multiple lines)
              </span>
            </div>
            <textarea
              name="steps"
              className="field-textarea"
              rows={5}
              value={form.steps}
              onChange={handleChange}
              disabled={submitting}
            />
            {errors.steps && <p className="field-error">{errors.steps}</p>}
          </div>

          {/* Cooking time + difficulty */}
          <div className="form-row">
            <div>
              <div className="field-label">Cooking Time* (minutes)</div>
              <input
                type="number"
                name="cookingTime"
                className="field-input"
                value={form.cookingTime}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.cookingTime && (
                <p className="field-error">{errors.cookingTime}</p>
              )}
            </div>

            <div>
              <div className="field-label">Difficulty</div>
              <select
                name="difficulty"
                className="field-select"
                value={form.difficulty}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Recipe"}
          </button>
        </form>
      </div>
    </section>
  );
}