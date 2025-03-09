export const sanitizeText = (text) => {
    return text.replace(/[^a-zA-Z0-9\s]/g, "").trim();
};

export const generateTrustScore = (credibility, aiScore) => {
    return (credibility === "Unknown credibility") ? aiScore : (aiScore + 10);
};

