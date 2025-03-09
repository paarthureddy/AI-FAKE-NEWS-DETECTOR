import NewsModel from "../models/News.js";
import { checkFakeNews } from "../services/fakeNewsChecker.js";
import scrapeWebsite from "../services/webScraper.js";
import checkCredibility from "../services/credibilityChecker.js";
import { sanitizeText, generateTrustScore } from "../utils/helpers.js";

export const analyzeNews = async (req, res) => {
    try {
        let { text, url } = req.body;

        if (url) {
            const scrapedData = await scrapeWebsite(url);
            text = scrapedData.title || scrapedData.description || text;
        }

        text = sanitizeText(text);
        const aiScore = await checkFakeNews(text);
        const credibility = await checkCredibility(text);
        const finalScore = generateTrustScore(credibility, aiScore);

        const newNews = new NewsModel({ text, url, credibilityScore: finalScore });
        await newNews.save();

        res.json({ success: true, credibility, finalScore });
    } catch (error) {
        res.status(500).json({ error: "Error analyzing news." });
    }
};

