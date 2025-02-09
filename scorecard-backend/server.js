const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define Player Schema
const playerSchema = new mongoose.Schema({
  name: String,
  score: Number
});

const Player = mongoose.model("Player", playerSchema);

// Get all players
app.get("/api/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Add a player
app.post("/api/players", async (req, res) => {
  const newPlayer = new Player(req.body);
  await newPlayer.save();
  res.json(newPlayer);
});

// Update score
app.patch("/api/players/:id/score", async (req, res) => {
  const { delta } = req.body;
  const player = await Player.findById(req.params.id);
  if (player) {
    player.score += delta;
    await player.save();
    res.json(player);
  } else {
    res.status(404).send("Player not found");
  }
});

// Delete a player
app.delete("/api/players/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "Player removed" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
