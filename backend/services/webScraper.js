import axios from "axios";
import * as cheerio from 'cheerio';

const scrapeWebsite = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        
        const title = $("title").text();
        const description = $('meta[name="description"]').attr("content");

        return { title, description };
    } catch (error) {
        console.error("Web scraping failed:", error);
        return { error: "Failed to scrape website" };
    }
};

export default scrapeWebsite