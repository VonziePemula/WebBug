const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let botProcess = null;

// Jalankan bot
app.get("/start-bot", (req, res) => {
  if (botProcess) return res.send("Bot sudah jalan 🚀");
  botProcess = spawn("node", ["bot.js"], { stdio: "inherit" });
  res.send("Bot berhasil dijalankan ✅");
});

// Kirim command bug
app.post("/send-bug", (req, res) => {
  const { type, nomor } = req.body;
  if (!botProcess) return res.status(400).send("Bot belum dijalankan ❌");

  // Simpan ke temporary file agar dibaca oleh bot
  const fs = require("fs");
  fs.writeFileSync("command.json", JSON.stringify({ type, nomor }));
  res.send(`Bug ${type} dikirim ke ${nomor}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server jalan di http://localhost:${PORT}`));
