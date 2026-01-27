import dotenv from "dotenv";
dotenv.config({ path: "./src/backend/.env" });

import express from "express";
import cors from "cors";
import { createRequire } from "module";
import { createClient } from "@supabase/supabase-js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

// 🔎 Debug (IMPORTANT)
console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log("SERVICE_KEY =", process.env.SUPABASE_SERVICE_ROLE_KEY);

// ✅ Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// 🟢 POST API (THIS IS THE MAIN API)
app.post("/api/parseResume", async (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: "filePath is required" });
    }

    // 1️⃣ Get public URL from Supabase
    const { data } = supabase.storage.from("resumes").getPublicUrl(filePath);

    // 2️⃣ Download PDF
    const pdfRes = await fetch(data.publicUrl);
    const buffer = Buffer.from(await pdfRes.arrayBuffer());

    // 3️⃣ Parse PDF text
    const parsed = await pdfParse(buffer);

    res.json({
      success: true,
      text: parsed.text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
