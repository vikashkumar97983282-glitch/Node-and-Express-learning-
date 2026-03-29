import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = "http://localhost:3000";

  /* ================= LOAD GROUPS ================= */
  const loadGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (err) {
      console.log("Error loading groups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  /* ================= CREATE GROUP ================= */
  const handleCreate = async () => {
    if (!name.trim() || !semester.trim()) {
      return alert("Please fill all fields");
    }

    try {
      await axios.post(`${API}/groups`, { name, semester });
      setName("");
      setSemester("");
      loadGroups();
    } catch (err) {
      console.log("Create error:", err);
    }
  };

  /* ================= DELETE GROUP ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`${API}/groups/${id}`);
      loadGroups();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  /* ================= FILTER (FIXED) ================= */
  const filtered = filter
    ? groups.filter((g) => {
        const search = filter.toLowerCase();
        return (
          g.name?.toLowerCase().includes(search) ||
          String(g.semester)?.toLowerCase().includes(search)
        );
      })
    : groups;

  return (
    <div className="flex h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-60 bg-blue-600 text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">StudentBuddy</h1>

        <nav className="space-y-3">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "block bg-blue-500 p-2 rounded"
                : "block p-2 rounded hover:bg-blue-500"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/groups"
            className="block p-2 rounded hover:bg-blue-500"
          >
            Groups
          </NavLink>

          <NavLink
            to="/chat"
            className="block p-2 rounded hover:bg-blue-500"
          >
            Chat
          </NavLink>

        </nav>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6 overflow-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <input
            placeholder="Search by name or semester..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* CREATE GROUP */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg mb-3 font-semibold">Create Group</h3>

          <div className="flex flex-col md:flex-row gap-2">
            <input
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded flex-1"
            />

            <input
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border p-2 rounded md:w-40"
            />

            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>

        {/* GROUP LIST */}
        {loading ? (
          <p className="text-center text-gray-500">Loading groups...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No groups found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((g) => (
              <div
                key={g._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">{g.name}</h3>
                <p className="text-gray-500">Semester {g.semester}</p>

                <div className="flex justify-between mt-4">

                  {/* OPEN */}
                  <button
                    onClick={() => navigate(`/group/${g._id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Open
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(g._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}