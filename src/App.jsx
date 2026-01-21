import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AIChat from './components/AIChat';

const supabase = createClient('YOUR_URL', 'YOUR_KEY');

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const { data } = await supabase.from('projects').select('*');
      setProjects(data);
    }
    getProjects();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold">My Portfolio</h1>
      <AIChat />
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Projects</h2>
        {projects.map(p => (
          <div key={p.id} className="p-4 border-b">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}