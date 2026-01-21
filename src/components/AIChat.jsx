import { useState } from 'react';

const MY_DATA = "I am a junior developer skilled in React and Supabase. I built a Task App and a Weather App.";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    // We use a free inference API like Groq or Hugging Face
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_FREE_GROQ_API_KEY`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: `Answer questions about me using this info: ${MY_DATA}` },
          { role: "user", content: question }
        ]
      })
    });
    const data = await response.json();
    setAnswer(data.choices[0].message.content);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <input 
        className="border p-2 w-full" 
        placeholder="Ask about my skills..." 
        onChange={(e) => setQuestion(e.target.value)} 
      />
      <button onClick={askAI} className="bg-blue-500 text-white p-2 mt-2">Ask AI</button>
      {answer && <p className="mt-4 text-gray-700">{answer}</p>}
    </div>
  );
}