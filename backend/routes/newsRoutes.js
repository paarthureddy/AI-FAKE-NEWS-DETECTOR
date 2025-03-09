import express from "express";
import { analyzeNews } from "../controllers/newsController.js";
import NewsModel from "../models/News.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const news = await NewsModel.find(); 
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: "Error fetching news data" });
    }
});

router.post("/analyze", analyzeNews)

router.post("/report", async (req, res) => {
    try {
        const { newsText, reason } = req.body;

        if (!newsText || !reason) {
            return res.status(400).json({ error: "News text and reason are required" });
        }

        const newReport = new NewsModel({
            text: newsText,
            reason,
            reported: true,
            credibilityScore: 0 
        });

        await newReport.save();

        res.json({ success: true, message: "Report submitted successfully!" });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ error: "Failed to submit report" });
    }
});

export default router;