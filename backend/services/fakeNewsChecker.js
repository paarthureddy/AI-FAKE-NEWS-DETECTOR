import openai from "../config/openaiConfig.js";

export const checkFakeNews = async (text) => {
    try {
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `Analyze the credibility of this news: "${text}". Return a score between 0-100.`,
            max_tokens: 50
        });

        return parseFloat(response.choices[0].text.trim());

    } catch (error) {
        console.error("Error in AI analysis: ", error);
        return 50; //this is default score
    }
};

 