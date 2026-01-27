import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AdminCapabilities from "../admin/AdminCapabilities";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH PROJECTS ================= */
  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    setProjects(data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= ADD / UPDATE PROJECT ================= */
  const saveProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      // UPDATE
      await supabase
        .from("projects")
        .update({ title, description, link })
        .eq("id", editingId);
    } else {
      // ADD
      await supabase.from("projects").insert([{ title, description, link }]);
    }

    setTitle("");
    setDescription("");
    setLink("");
    setEditingId(null);
    setLoading(false);
    fetchProjects();
  };

  /* ================= EDIT ================= */
  const editProject = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);

    document
      .getElementById("add-project")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const deleteProject = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto p-10 space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* WELCOME */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Admin 👋</h2>
          <p className="text-slate-400">
            You have full access to manage portfolio content and projects.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            className="btn-primary"
            onClick={() =>
              document
                .getElementById("add-project")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            ➕ Add Project
          </button>

          <a href="/" className="btn-outline text-center">
            🌐 View Portfolio
          </a>

          <button
            className="btn-outline"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            📂 Manage Projects
          </button>
        </div>

        {/* CAPABILITIES */}
        <AdminCapabilities />

        {/* ADD / EDIT PROJECT */}
        <div id="add-project" className="card p-6 max-w-xl">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <form onSubmit={saveProject} className="space-y-3">
            <input
              className="w-full p-3 rounded bg-slate-800"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="w-full p-3 rounded bg-slate-800"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              className="w-full p-3 rounded bg-slate-800"
              placeholder="Project Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />

            <button className="btn-primary w-full" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </form>
        </div>

        {/* PROJECT LIST */}
        <div id="projects" className="space-y-4">
          <h2 className="text-2xl font-bold">All Projects</h2>

          {projects.length === 0 && (
            <p className="text-slate-400">No projects added yet.</p>
          )}

          {projects.map((p) => (
            <div
              key={p.id}
              className="card p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm"
                >
                  {p.link}
                </a>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editProject(p)}
                  className="px-3 py-2 rounded bg-yellow-500 text-black text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(p.id)}
                  className="px-3 py-2 rounded bg-red-600 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
