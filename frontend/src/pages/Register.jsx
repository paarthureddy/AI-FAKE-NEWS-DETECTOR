import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users/register", { username, email, password });
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleRegister} className="mt-4">
                    <label className="label">Username</label>
                    <input type="text" className="input input-bordered w-full" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label className="label mt-2">Email</label>
                    <input type="email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label className="label mt-2">Password</label>
                    <input type="password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
                </form>
                <p className="text-sm text-center mt-2">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
