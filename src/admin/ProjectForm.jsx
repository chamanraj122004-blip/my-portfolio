import { useState } from "react";

export default function ProjectForm({ onSave, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [link, setLink] = useState(initialData?.link || "");

  const submit = (e) => {
    e.preventDefault();
    onSave({ title, description, link });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Project link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <div className="flex gap-3">
        <button className="btn-primary">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
