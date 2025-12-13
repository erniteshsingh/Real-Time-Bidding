require("dotenv").config(); 
const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/db/db");
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
