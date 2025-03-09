import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [newsInput, setNewsInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeNews = async () => {
        if (!newsInput.trim()) {
            toast.error("Please enter news text or a URL!");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const { data } = await axios.post("http://localhost:5000/api/news/analyze", { text: newsInput });
            setResult(data);
            toast.success("Analysis complete!");
        } catch (error) {
            toast.error("Failed to analyze news.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
                <h2 className="text-3xl font-bold text-center"> AI Fake News Detector</h2>
                <p className="text-center text-gray-500 mt-2">Enter news text or a URL to analyze its credibility.</p>

                <textarea
                    className="textarea textarea-bordered w-full mt-4"
                    placeholder="Paste news text or URL here..."
                    value={newsInput}
                    onChange={(e) => setNewsInput(e.target.value)}
                ></textarea>

                <button
                    className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
                    onClick={analyzeNews}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze News"}
                </button>

                {result && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-bold">Analysis Result:</h3>
                        <p className="text-gray-700 mt-2">{result.credibility || "Unknown credibility"}</p>
                        <span className={`badge ${result.finalScore > 50 ? "badge-success" : "badge-error"} mt-2`}>
                            Trust Score: {result.finalScore} / 100
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
