const credibilityScoreMap = {
    "True": 90,
    "Mostly True": 75,
    "Half True": 50,
    "False": 20,
    "No fact-check available": 50, 
    "Unknown credibility": 50,
    "Error checking credibility": 50
};

const checkCredibility = async (query) => {
    try {
        const apiKey = process.env.GOOGLE_FACT_CHECK_API_KEY;
        const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${apiKey}`;

        const { data } = await axios.get(url);
        if (data.claims && data.claims.length > 0) {
            const textualRating = data.claims[0].textualRating || "Unknown credibility";
            return credibilityScoreMap[textualRating] || 50; 
        } else {
            return 50; 
        }
    } catch (error) {
        console.error("Fact-checking failed:", error);
        return 50; 
    }
};

export default checkCredibility;
