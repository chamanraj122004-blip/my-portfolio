import { useState } from "react";
import { supabase } from "./supabase";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch resume data from Supabase table
  const getResumeContext = async () => {
    const { data, error } = await supabase
      .from("resume")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      throw new Error("Resume data not found");
    }

    return `
Name: ${data.Name}
Role: ${data.Role}

Summary:
${data.Summary}

Skills:
${data.Skills}

Projects:
${data.Projects}

Education:
${data.Education}
    `;
  };

  // 🔹 Ask Groq AI
  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const resumeContext = await getResumeContext();

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content: `
You are an AI assistant for Chaman Raj's portfolio website.

Rules:
- Answer ONLY based on the resume data provided
- Speak in third person (he / his)
- Be professional and clear
- If information is missing, say "I'm not sure"

Resume Data:
${resumeContext}
                `,
              },
              {
                role: "user",
                content: question,
              },
            ],
          }),
        },
      );

      const result = await response.json();

      // ✅ SAFETY CHECK (fixes your previous crash)
      if (!result.choices || !result.choices.length) {
        console.error("Groq error:", result);
        throw new Error(result.error?.message || "AI failed to respond");
      }

      setAnswer(result.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setAnswer(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded-xl p-4 text-white"
          placeholder="Ask about Chaman Raj..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askAI}
          disabled={loading}
          className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {answer && (
        <div className="bg-white/5 p-6 rounded-xl text-slate-200">{answer}</div>
      )}
    </div>
  );
}
