const io = require("socket.io-client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const serverURL = "http://localhost:3000";
const socket = io(serverURL);

socket.on("connect", (data) => {
  console.log("Connected to the server!");

  rl.prompt();
});

socket.on("msgAll", (data) => {
  if (data.user != socket.id) {
    rl.pause();
    console.log(`[${data.user}]: ${data.msg}`);
  }
  rl.prompt();
});

rl.on("line", (line) => {
  socket.emit("msg", {
    user: socket.id,
    msg: line.trim(),
  });
  rl.prompt();
});

rl.on("close", () => {
  console.log("Bye 👋🏻");
  process.exit(0);
});
