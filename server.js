const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Rota do chat (principal)
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Rota de login
app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "pages/login.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Agora esperamos um objeto: { user: 'nome', text: 'mensagem' }
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });
  
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
