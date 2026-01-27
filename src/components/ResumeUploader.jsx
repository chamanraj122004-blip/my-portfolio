import { extractResume } from "../api/parseResume";

export default function ResumeUploader() {
  const handleClick = async () => {
    const data = await extractResume();
    console.log("Parsed Resume:", data);
  };

  return <button onClick={handleClick}>Extract Resume</button>;
}

await fetch("http://localhost:3001/parseResume", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    filePath: `resumes/myresume.pdf`,
  }),
});
