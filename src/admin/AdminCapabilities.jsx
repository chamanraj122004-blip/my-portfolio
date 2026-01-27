export default function AdminCapabilities() {
  return (
    <div className="glass-card p-8 space-y-6">
      <h2 className="text-2xl font-bold">Admin Capabilities</h2>

      <ul className="space-y-3 text-slate-300">
        <li>✔ Add / Edit / Delete projects</li>
        <li>✔ Manage portfolio content (auto updates homepage)</li>
        <li>✔ View user messages from contact form</li>
        <li>✔ Secure admin authentication (Supabase)</li>
      </ul>

      <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-slate-400">
        <p>
          This admin panel allows full control over portfolio content without
          redeploying the application.
        </p>
        <p>All changes are reflected instantly using Supabase as backend.</p>
      </div>
    </div>
  );
}
