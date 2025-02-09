const express = require("express");
const Score = require("../models/Score");

const router = express.Router();

// ✅ Create a new score
router.post("/", async (req, res) => {
  try {
    const { name, subject, score } = req.body;
    const newScore = new Score({ name, subject, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: "Failed to add score" });
  }
});

// ✅ Get all scores
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

// ✅ Update a score by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedScore = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ error: "Failed to update score" });
  }
});

// ✅ Delete a score by ID
router.delete("/:id", async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ message: "Score deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete score" });
  }
});

module.exports = router;
