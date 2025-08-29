import express from "express"
import { WebSocket } from "ws"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.static("public"))
app.use(express.json())

// Kirim perintah ke bot lewat WebSocket
app.post("/send", (req, res) => {
    const { command } = req.body
    const ws = new WebSocket("ws://localhost:8080")
    ws.on("open", () => {
        ws.send(command)
        ws.close()
    })
    res.json({ status: "sent", command })
})

app.listen(port, () => console.log(`🌐 Panel running http://localhost:${port}`))
