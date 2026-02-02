import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

import AIChat from "./components/AIChat";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";

/* ================= SUPABASE ================= */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

/* ================= PROTECTED ROUTE ================= */
function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
}

/* ================= HOME ================= */
function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false });

      setProjects(data || []);
    }
    getProjects();
  }, []);

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

        <motion.div
          className="relative z-10 px-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Chaman Raj
          </h1>

          <p className="mt-3 text-sm uppercase tracking-widest text-blue-400">
            FULL STACK DEVELOPER • AI Enthusiast • Problem Solver
          </p>
        </motion.div>
      </section>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-40">
        {/* ABOUT */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold">A Bit About Me</h2>
          <p className="text-slate-400">
            I am a passionate Full Stack Developer and AI/ML enthusiast
            currently pursuing my B.E. at Government Engineering College, Hassan
            (GECH). With a solid foundation from my Diploma at Rajeev
            Polytechnic and four specialized internships at SVL Technologies, I
            have developed a deep expertise in Java, Python, and React. My work
            focuses on building secure, intelligent applications—ranging from
            real-time weather intelligence to hybrid intrusion detection
            systems. I thrive at the intersection of clean code and complex
            problem-solving.
          </p>
        </section>

        <section
          id="skills"
          className="relative py-24 bg-slate-900 text-slate-200"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Heading */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Skills</h2>
              <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                Technologies and tools I use to build modern, scalable
                applications.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-blue-500/40 transition">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Frontend
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>⚛ React</li>
                  <li>🟨 JavaScript (ES6+)</li>
                  <li>🌐 HTML5 </li>
                  <li>🎨 Tailwind CSS</li>
                  <li>📱 Responsive Design</li>
                </ul>
              </div>

              {/* Backend & Tools */}
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/40 transition">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Backend & Tools
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>🛠 Supabase</li>
                  <li>🔗 REST APIs</li>
                  <li>🗄 PostgreSQL</li>
                  <li>🔧 Git & GitHub</li>
                  <li>🟢 Node.js</li>
                  <li>☕ Java</li>
                </ul>
              </div>

              {/* AI & Other */}
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-purple-500/40 transition">
                <h3 className="text-xl font-semibold text-white mb-4">
                  AI & Other
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li>🤖 AI Integrations</li>
                  <li>🧠 Prompt Engineering</li>
                  <li>📄 Resume-based AI Chat</li>
                  <li>🚀 Problem Solving</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="space-y-10">
          <h2 className="text-4xl font-bold text-center">Featured Projects</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                <a href={p.link} className="btn-outline">
                  View Project →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI CHAT */}
        <section className="glass-card p-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Ask My AI Assistant</h2>
          <p className="text-slate-400 mb-6">
            Ask about my skills and projects
          </p>
          <AIChat />
        </section>

        {/* CONTACT */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold">Let’s connect</h2>
            <p className="text-slate-400 mt-4">
              Open to React & AI opportunities
            </p>
            <p className="text-blue-400 mt-2 font-bold">
              <a href="mailto:chamanraj122004@gmail.com">
                chamanraj122004@gmail.com
              </a>
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
            <ContactForm />
          </div>
        </section>
        <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            {/* Social Links */}
            <div className="flex justify-center gap-12 mb-8 text-sm tracking-wide">
              <a
                href="https://www.linkedin.com/in/chaman-raj-800043297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-white transition duration-300"
              >
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/chamanraj_122004"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-white transition duration-300"
              >
                Instagram
              </a>
            </div>

            {/* Subtle divider dots */}
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
            </div>

            {/* Copyright */}
            <p className="text-xs text-white/70 tracking-wide">
              © 2026{" "}
              <span className="text-white font-semibold">Chaman Raj</span>. All
              rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </motion.div>
  );
}

/* ================= ADMIN DASHBOARD ================= */

/* ================= ROUTER ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
