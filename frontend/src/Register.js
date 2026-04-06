
import { useState } from "react";
import axios from "axios";

function Register({ setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios.post("http://3.86.226.26:8000/register/", {   // ✅ CORRECT NEW IP
      username,
      password
    })
    .then((res) => {
      alert("User registered successfully ✅");
      setIsLoginPage(true);
    })
    .catch((err) => {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Error registering user");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-gray-400">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-[320px] text-center">
        
        <h2 className="text-2xl font-bold mb-6">Register 📝</h2>

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
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 rounded-lg"
        >
          Register
        </button>

        <p
          onClick={() => setIsLoginPage(true)}
          className="text-blue-500 cursor-pointer mt-4"
        >
          Already have account? Login
        </p>

      </div>
    </div>
  );
}

export default Register;
