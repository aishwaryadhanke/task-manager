import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useTasks() {
  const [tasks, setTasks] = useState([]);

  // ✅ move inside callback (no dependency issue)
  const fetchTasks = useCallback(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/tasks/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, fetchTasks };
}

export default useTasks;