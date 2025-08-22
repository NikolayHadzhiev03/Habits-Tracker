import express from "express";
import GenericData from "../modules/GenericData.js";
import { verifytoken } from "../middleware/verifytoken.js";

const router = express.Router();
router.post("/", verifytoken, async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;

  try {
    const entry = new GenericData({ payload, userId });
    await entry.save();
    res.status(201).json({ message: "✅ Data saved", id: entry._id });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await GenericData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch data" });
  }
});
router.get("/onlyOwnerones", verifytoken, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await GenericData.find({ userId: userId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const entry = await GenericData.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Not found" });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching entry" });
  }
});

router.put("/:id", verifytoken, async (req, res) => {
  try {
    const updated = await GenericData.findByIdAndUpdate(
      req.params.id,
      { "payload.done": req.body.done },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json({ message: "✅ Updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: "❌ Update failed" });
  }
});

router.delete("/:id", verifytoken, async (req, res) => {
  try {
    const entry = await GenericData.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: "Not found" });
    }

    if (entry.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "❌ Unauthorized: not your item" });
    }

    await entry.deleteOne();
    res.json({ message: "✅ Deleted" });
  } catch (error) {
    res.status(500).json({ error: "❌ Deletion failed" });
  }
});
export default router;
