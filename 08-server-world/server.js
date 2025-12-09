import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.get("/world", async (req, res) => {
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject);
});

app.post("/update", async (req, res) => {
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    const world = JSON.parse(worldData);

    const AddRegion = req.body;
    
    for (let region of world.regions) {
        for (let city of region.towns) {
            for (let person of city.notable_people) {
                if (person.name === AddRegion.region) {
                    person.name += "!!!";
                }
            }
        }
    }

    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json(world);
});

app.listen(3000, () => console.log("Server running on http://localhost:3001"));