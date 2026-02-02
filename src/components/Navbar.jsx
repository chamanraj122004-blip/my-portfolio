import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data.session);
    };

    checkAdmin();
  }, []);
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-900 text-white">
      <h1 className="text-xl font-bold">My Portfolio</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>

        {/* Admin button – only visible if admin logged in */}
        {isAdmin && (
          <Link to="/admin/dashboard" className="px-4 py-2 bg-red-600 rounded">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}
