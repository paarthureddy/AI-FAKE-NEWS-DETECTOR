import { Link, useNavigate } from "react-router-dom";
import { getToken, logoutUser } from "../services/authService";
import toast from "react-hot-toast";

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!getToken(); 

    const handleLogout = () => {
        logoutUser();
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">AI Fake News Detector</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
                </ul>

                {isAuthenticated ? (
                    <button className="btn btn-error ml-4" onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login" className="btn btn-primary ml-4">Login</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
