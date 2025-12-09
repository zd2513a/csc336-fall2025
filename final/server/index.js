const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");

function readRecipes() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data.json:", err);
    return [];
  }
}

function writeRecipes(recipes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2), "utf-8");
}

app.get("/api/recipes", (req, res) => {
  const recipes = readRecipes();
  res.json(recipes);
});

app.post("/api/recipes", (req, res) => {
  const recipes = readRecipes();
  const body = req.body;

  if (!body.title || !body.ingredients || !body.steps) {
    return res
      .status(400)
      .json({ error: "title, ingredients and steps are required." });
  }

  // generate new id
  const maxId = recipes.length > 0 ? Math.max(...recipes.map((r) => r.id)) : 0;

  const newRecipe = {
    id: maxId + 1,
    title: body.title,
    description: body.description || "",
    ingredients: body.ingredients,
    steps: body.steps,
    cookingTime: Number(body.cookingTime) || 0,
    difficulty: body.difficulty || "easy",
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);

  res.status(201).json(newRecipe);
});

// Deleted recipes
app.delete("/api/recipes/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid recipe id." });
  }

  const recipes = readRecipes();
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Recipe not found." });
  }

  const deleted = recipes[index];
  recipes.splice(index, 1);
  writeRecipes(recipes);

  res.json({ message: "Recipe deleted", deleted });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});