import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarizeBtn");
  const inputText = document.getElementById("inputText");
  const output = document.getElementById("output");

  summarizeBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();

    if (!text) {
      output.innerHTML = "⚠️ Please enter text.";
      return;
    }

    output.innerHTML = "⏳ Summarizing...";

    try {
      const res = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      output.innerHTML = data.summary || "❌ Error summarizing text.";
    } catch (err) {
      console.error(err);
      output.innerHTML = "❌ Error connecting to server.";
    }
  });
});
