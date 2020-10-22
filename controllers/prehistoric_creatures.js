const express = require("express");
const router = express.Router();
const fs = require("fs");

app.get("/prehistoric_creatures", (req, res) => {
  let preHistCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(preHistCreatures);

  res.render("creature-index.ejs", { creatures: creatureData });
});

app.get("/prehistoric_creatures/new", (req, res) => {
  res.render("new-creature.ejs");
});

app.get("/prehistoric_creatures/:idx", (req, res) => {
  let preHistCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(preHistCreatures);
  let creatureIndex = parseInt(req.params.idx);

  res.render("show-creature.ejs", {
    creature: creatureData[creatureIndex],
    creatureID: creatureIndex,
  });
});

// -----> PREHISTORIC Show Route <-----
app.post("/prehistoric_creatures", (req, res) => {
  let preHistCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(preHistCreatures);
  creatureData.push(req.body);
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(creatureData)
  );
  res.redirect("/prehistoric_creatures");
});

app.listen(8000, () => {
  console.log("You're listening to the smooth sounds of port 8000.");
});
