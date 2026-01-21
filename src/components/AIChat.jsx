import { useState } from "react";

const MY_DATA =
  "I am a junior developer skilled in React and Supabase. I built a Task App and a Weather App.";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // Prevent crash if key is missing
    if (!apiKey) {
      setAnswer("AI is not configured yet.");
      return;
    }

    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: `Answer questions about me using this info: ${MY_DATA}`,
              },
              {
                role: "user",
                content: question,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data?.choices?.length > 0) {
        setAnswer(data.choices[0].message.content);
      } else {
        setAnswer("No response from AI.");
      }
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg shadow-sm">
      <input
        className="border p-2 w-full rounded"
        placeholder="Ask about my skills..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
}
