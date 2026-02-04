import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../services/task.api";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (err) {
      alert(err?.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim())
      return alert("Fill all fields");
    await createTask(formData);
    setFormData({ title: "", description: "" });
    fetchTasks();
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task._id, { isCompleted: !task.isCompleted });
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditData({ title: task.title, description: task.description });
  };

  const handleUpdate = async (id) => {
    await updateTask(id, editData);
    setEditingId(null);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-black text-indigo-600">TASKLY</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600 hidden sm:block text-sm">
            Logged in as{" "}
            <span className="font-bold text-gray-900">{user?.username}</span>
          </p>
          <button
            onClick={logout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creation Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-slate-800">New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 text-sm h-24"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                Create Task
              </button>
            </form>
          </div>
        </div>

        {/* Task Feed */}
        <div className="lg:col-span-8 space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`bg-white p-6 rounded-2xl border transition-all ${task.isCompleted ? "border-green-200 bg-green-50/30" : "border-slate-100 shadow-sm"}`}
            >
              {editingId === task._id ? (
                /* EDIT MODE UI */
                <div className="space-y-3">
                  <input
                    className="w-full px-3 py-1 border rounded-md font-bold"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full px-3 py-1 border rounded-md text-sm text-gray-600"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-200 px-4 py-1 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* DISPLAY MODE UI */
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`text-lg font-bold ${task.isCompleted ? "line-through text-slate-400" : "text-slate-800"}`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-slate-400 hover:text-indigo-600 p-1"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteTask(task._id).then(fetchTasks)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p
                    className={`text-sm mb-4 ${task.isCompleted ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition ${task.isCompleted ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600"}`}
                    >
                      {task.isCompleted ? "✓ Completed" : "Mark Complete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
