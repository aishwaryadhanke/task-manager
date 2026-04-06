import { useState, useEffect } from "react";
import axios from "axios";

function TaskList({ openModal, setOpenModal }) {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Personal",
    dueDate: ""
  });

  // ✅ FIXED API URL (IMPORTANT)
  const API = "http://98.94.56.218:8000";

  const getHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const handleAuthError = () => {
    alert("Session expired. Please login again");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchTasks = () => {
    axios
      .get(`${API}/tasks/`, getHeader())
      .then((res) => setTasks(res.data))
      .catch(handleAuthError);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddTask = () => {
    if (!form.title.trim()) return;

    if (editId) {
      axios.put(
        `${API}/tasks/${editId}/`,
        { ...form },
        getHeader()
      )
      .then(() => {
        fetchTasks();
        setToast("Task updated ✅");
        resetForm();
      })
      .catch(handleAuthError);

    } else {
      axios.post(
        `${API}/tasks/`,
        {
          id: Date.now(),
          ...form,
          completed: false,
          createdAt: new Date().toLocaleString()
        },
        getHeader()
      )
      .then(() => {
        fetchTasks();
        setToast("Task added successfully ✅");
        resetForm();
      })
      .catch(handleAuthError);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      category: "Personal",
      dueDate: ""
    });
    setEditId(null);
    setOpenModal(false);
  };

  const handleEdit = (t) => {
    setForm({
      title: t.title,
      description: t.description || "",
      priority: t.priority || "Medium",
      category: t.category || "Personal",
      dueDate: t.dueDate || ""
    });
    setEditId(t.id);
    setOpenModal(true);
  };

  const deleteTask = (id) => {
    axios
      .delete(`${API}/tasks/${id}/`, getHeader())
      .then(() => {
        fetchTasks();
        setToast("Task deleted ❌");
      })
      .catch(handleAuthError);
  };

  const toggleTask = (t) => {
    axios
      .put(
        `${API}/tasks/${t.id}/`,
        { ...t, completed: !t.completed },
        getHeader()
      )
      .then(() => fetchTasks())
      .catch(handleAuthError);
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-100 text-red-600";
    if (priority === "Low") return "bg-green-100 text-green-600";
    return "bg-yellow-100 text-yellow-700";
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "bg-gray-100 text-gray-500";

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) return "bg-red-100 text-red-600";
    if (due.getTime() === today.getTime()) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };

  const getDueLabel = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) return "Overdue";
    if (due.getTime() === today.getTime()) return "Today";
    return "";
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeTasks = filtered.filter((t) => !t.completed);
  const completedTasks = filtered.filter((t) => t.completed);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full">

      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <p className="mb-4 text-gray-600">
        Total: <b>{total}</b> | Completed: <b>{completed}</b>
      </p>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">Active Tasks</h2>

      {activeTasks.map((t) => (
        <div key={t.id} className="bg-white hover:shadow-xl transition rounded-xl p-4 mb-3 border">
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t)}
                className="w-4 h-4"
              />

              <div>
                <p className="font-semibold text-gray-800">{t.title}</p>

                <div className="flex flex-wrap gap-2 mt-1 text-xs">
                  <span className="text-gray-500">{t.createdAt}</span>

                  <span className={`px-2 py-1 rounded-full ${getPriorityColor(t.priority)}`}>
                    {t.priority}
                  </span>

                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {t.category}
                  </span>

                  {t.dueDate && (
                    <span className={`px-3 py-1 rounded-full font-semibold ${getDueDateColor(t.dueDate)}`}>
                      📅 {new Date(t.dueDate).toLocaleDateString()}{" "}
                      {getDueLabel(t.dueDate) && `(${getDueLabel(t.dueDate)})`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                Edit
              </button>

              <button onClick={() => deleteTask(t.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}

      <h2 className="text-lg font-semibold mt-6 mb-3 text-gray-700">Completed Tasks</h2>

      {completedTasks.map((t) => (
        <div key={t.id} className="bg-green-50 border hover:shadow-lg transition rounded-xl p-4 mb-3">
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t)}
              />

              <div>
                <p className="line-through text-gray-500">{t.title}</p>
                <p className="text-xs text-gray-400">{t.createdAt}</p>
              </div>
            </div>

            <button onClick={() => deleteTask(t.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
              Delete
            </button>

          </div>
        </div>
      ))}

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[350px] shadow-xl">

            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Task" : "Add Task"}
            </h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border mb-2 rounded-lg"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border mb-2 rounded-lg"
            />

            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full p-2 border mb-2 rounded-lg"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border mb-2 rounded-lg"
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Study</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full p-2 border mb-4 rounded-lg"
            />

            <div className="flex justify-between">
              <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">
                Cancel
              </button>

              <button onClick={handleAddTask} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                {editId ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default TaskList;
