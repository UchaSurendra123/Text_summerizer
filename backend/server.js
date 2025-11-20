import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /summarize route
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ summary: "⚠️ Please provide text to summarize." });
    }

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Summarize the user's text in simple English." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();

    // Extract summary
    const summary = data?.choices?.[0]?.message?.content || "❌ Could not generate summary";

    // Send only the summary to frontend
    res.json({ summary });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ summary: "❌ Server error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
