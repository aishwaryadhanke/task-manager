import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Login from "./Login";
import Register from "./Register";
import profilePic from "./assets/profile.jpg";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // ✅ FIX: check token properly on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">

      {!isLoggedIn ? (
        isLoginPage ? (
          <Login setIsLoggedIn={setIsLoggedIn} setIsLoginPage={setIsLoginPage} />
        ) : (
          <Register setIsLoginPage={setIsLoginPage} />
        )
      ) : (
        <div className="flex min-h-screen">

          {/* 🔵 SIDEBAR */}
          <div className="w-1/5 bg-white/70 backdrop-blur-xl shadow-lg p-6 flex flex-col items-center rounded-r-3xl border-r border-white/40">

            <img
              src={profilePic}
              alt="profile"
              className="w-24 h-24 rounded-full mb-4 border-4 border-blue-300 shadow-md object-cover"
            />

            <h2 className="text-lg font-semibold">Aishwarya</h2>
            <p className="text-gray-500 text-sm mb-6">Welcome back 👋</p>

            {/* ADD TASK */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-xl w-full mb-4 shadow-sm"
            >
              + Add Task
            </button>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refresh"); // ✅ IMPORTANT
                setIsLoggedIn(false);
              }}
              className="mt-auto bg-red-400 hover:bg-red-500 transition text-white px-4 py-2 rounded-xl w-full shadow-sm"
            >
              Logout
            </button>

          </div>

          {/* 🟡 MAIN CONTENT */}
          <div className="w-4/5 p-10">

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/40">

              <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
                Task Manager <span>✅</span>
              </h1>

              <p className="text-gray-500 mb-5 text-sm">
                Manage your daily tasks efficiently
              </p>

              <TaskList openModal={openModal} setOpenModal={setOpenModal} />

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;