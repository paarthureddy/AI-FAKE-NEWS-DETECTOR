import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });
            localStorage.setItem("token", data.token);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleLogin} className="mt-4">
                    <label className="label">Email</label>
                    <input type="email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label className="label mt-2">Password</label>
                    <input type="password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
                </form>
                <p className="text-sm text-center mt-2">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
