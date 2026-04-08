import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ USE EC2 ELASTIC IP
  const BASE_URL = "http://52.45.97.28:8000";

  const handleLogin = () => {
    setError("");

    axios.post(`${BASE_URL}/login/`, {
      username,
      password
    })
    .then((res) => {
      localStorage.setItem("token", res.data.access);
      setIsLoggedIn(true);
    })
    .catch((err) => {
      console.log(err.response?.data);
      setError("Invalid username or password");
    });
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
          className="w-full bg-indigo-500 text-white py-2 rounded-lg"
        >
          Login
        </button>

        {/* ✅ ERROR MESSAGE */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

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