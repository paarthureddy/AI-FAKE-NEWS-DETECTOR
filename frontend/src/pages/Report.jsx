import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Report() {
    const [newsText, setNewsText] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newsText.trim() || !reason.trim()) {
            toast.error("Please provide both news text and a reason!");
            return;
        }

        setLoading(true);

        try {
            await axios.post("http://localhost:5000/api/news/report", { newsText, reason });
            toast.success("Report submitted successfully!");
            setNewsText("");
            setReason("");
        } catch (error) {
            toast.error("Failed to submit report.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
                <h2 className="text-3xl font-bold text-center">Report Fake News</h2>
                <p className="text-center text-gray-500 mt-2">
                    Help improve the system by reporting fake news articles.
                </p>

                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="label">Fake News Text or URL</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter fake news text or URL..."
                        value={newsText}
                        onChange={(e) => setNewsText(e.target.value)}
                    ></textarea>

                    <label className="label mt-2">Reason for Reporting</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Why is this news fake?"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />

                    <button type="submit" className={`btn btn-error w-full mt-4 ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? "Submitting..." : "Report Fake News"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Report;
