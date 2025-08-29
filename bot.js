const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
} = require("@whiskeysockets/baileys");
const fs = require("fs");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // ⚡ QR MATI
    browser: Browsers.ubuntu("Chrome"),
  });

  // Pairing Code (bukan QR)
  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode("62xxxxxx"); // isi nomor lu
    console.log("⚡ Pairing Code:", code);
  }

  sock.ev.on("creds.update", saveCreds);

  // Auto baca perintah dari command.json
  setInterval(() => {
    if (fs.existsSync("command.json")) {
      const { type, nomor } = JSON.parse(fs.readFileSync("command.json"));
      runBug(sock, nomor, type);
      fs.unlinkSync("command.json");
    }
  }, 2000);

  return sock;
}

async function runBug(sock, nomor, type) {
  const func = require(`./functions/bug${capitalize(type)}.js`);
  await func(sock, nomor);
  console.log(`🔥 Bug ${type} berhasil dikirim ke ${nomor}`);
}

function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

startBot();
