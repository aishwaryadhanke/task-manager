import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.access);

      setIsLoggedIn(true);

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-gray-400">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-[320px] text-center">
        
        <h2 className="text-2xl font-bold mb-6">Login 🔐</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-5 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ CLEAN ERROR MESSAGE (NO ALERT) */}
        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}

        <p
          onClick={() => setIsLoginPage(false)}
          className="text-blue-500 cursor-pointer mt-4"
        >
          Create new account
        </p>

      </div>
    </div>
  );
}

export default Login;