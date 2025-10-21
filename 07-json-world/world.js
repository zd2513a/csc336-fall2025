import fs from "fs";

let data = fs.readFileSync("world.json");
let world = JSON.parse(data);

console.log("Regions:");
world.regions.forEach(region => {
  console.log(`${region.name} (${region.climate})`);
});

console.log("\nTowns:");
world.regions.forEach(region => {
  region.towns.forEach(town => {
    console.log(`${town.name} — ${town.population}`);
  });
});

console.log("\nNotable people and their items:");
world.regions.forEach(region => {
  region.towns.forEach(town => {
    town.notable_people.forEach(person => {
      console.log(`${person.name} (${person.role}) Item: `);
      person.items.forEach(item =>
        console.log(` ${item.name} - ${item.rarity} - ${item.element}`)
      );
    });
  });
});