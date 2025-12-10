import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const worldPath = path.join(__dirname, "world.json");

// Web Page
app.get("/", (req, res) => {
  console.log("GET /");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get world.json
app.get("/world", async (req, res) => {
  console.log("GET /world");
  const data = await fs.readFile(worldPath, "utf-8");
  res.json(JSON.parse(data));
});

// Update world
app.post("/update", async (req, res) => {
  console.log("POST /update", req.body);

  const { regionName, townName, personName, personRole } = req.body;

  const world = JSON.parse(await fs.readFile(worldPath, "utf-8"));

  const region = world.regions.find(r => r.name === regionName);
  const town = region.towns.find(t => t.name === townName);

  town.notable_people.push({
    name: personName,
    role: personRole,
    items: []
  });

  await fs.writeFile(worldPath, JSON.stringify(world, null, 2));
  res.json(world);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});