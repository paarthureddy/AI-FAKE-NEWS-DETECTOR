import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/news");
            setNewsList(data);
        } catch (error) {
            toast.error("Failed to fetch news data!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Analyzed News Dashboard</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : newsList.length === 0 ? (
                <p className="text-center text-gray-500">No news analyzed yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsList.map((news) => (
                        <div key={news._id} className="card bg-base-100 shadow-xl p-4">
                            <h3 className="font-bold">{news.text}</h3>
                            <p className="text-gray-500">{news.url ? `Source: ${news.url}` : "No URL provided"}</p>
                            <p className={`mt-2 badge ${news.credibilityScore > 50 ? "badge-success" : "badge-error"}`}>
                                Trust Score: {news.credibilityScore} / 100
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
