async function startBot() {
  let res = await fetch("/start-bot");
  document.getElementById("status").innerText = await res.text();
}

async function sendBug() {
  let nomor = document.getElementById("nomor").value;
  let type = document.getElementById("type").value;
  let res = await fetch("/send-bug", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nomor, type })
  });
  document.getElementById("status").innerText = await res.text();
}
